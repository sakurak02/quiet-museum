const fs = require("node:fs");
const path = require("node:path");

const repositoryRoot = path.resolve(__dirname, "..");
const imagesDirectory = path.join(repositoryRoot, "images");
const artworksFile = path.join(repositoryRoot, "js", "artworks.js");
const galleryFile = path.join(repositoryRoot, "gallery.html");
const sitemapFile = path.join(repositoryRoot, "sitemap.xml");
const artworkFileNamePattern = /^([ABC])(\d{3})\.webp$/;
const siteBaseUrl = "https://sakurak02.github.io/quiet-museum";
const galleryStartMarker = "<!-- ARTWORKS_START -->";
const galleryEndMarker = "<!-- ARTWORKS_END -->";

function findImageFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return findImageFiles(entryPath);
    }

    return entry.isFile() ? [entryPath] : [];
  });
}

function getArtworkImages() {
  const artworksById = new Map();

  for (const absolutePath of findImageFiles(imagesDirectory)) {
    const fileName = path.basename(absolutePath);
    const match = artworkFileNamePattern.exec(fileName);

    if (!match) {
      continue;
    }

    const [, type, number] = match;
    const id = `${type}${number}`;
    const imagePath = path.relative(repositoryRoot, absolutePath).split(path.sep).join("/");

    if (artworksById.has(id)) {
      throw new Error(
        `Duplicate artwork ID ${id}: ${artworksById.get(id)} and ${imagePath}`
      );
    }

    artworksById.set(id, imagePath);
  }

  return artworksById;
}

function getExistingOrder(source) {
  const artworksBlock = source.match(/const ARTWORKS = \[([\s\S]*?)\n  \];/);

  if (!artworksBlock) {
    throw new Error("Could not find the ARTWORKS array in js/artworks.js");
  }

  return [...artworksBlock[1].matchAll(/\bid:\s*"([ABC]\d{3})"/g)].map(
    (match) => match[1]
  );
}

function orderArtworkIds(artworksById, existingOrder) {
  const existingIds = existingOrder.filter((id) => artworksById.has(id));
  const existingIdSet = new Set(existingIds);
  const newIds = [...artworksById.keys()]
    .filter((id) => !existingIdSet.has(id))
    .sort((left, right) => left.localeCompare(right, "en"));

  return [...existingIds, ...newIds];
}

function renderArtworks(artworksById, orderedIds) {
  const entries = orderedIds
    .map(
      (id) => `    {
      id: "${id}",
      image: "${artworksById.get(id)}"
    },`
    )
    .join("\n");

  return `(function () {
  const ARTWORKS = [
${entries}
  ];

  function getTypeFolder(id) {
    const prefix = id.charAt(0).toLowerCase();
    return prefix ? \`type-\${prefix}\` : "";
  }

  window.QuietMuseum = {
    artworks: ARTWORKS,
    findArtwork(id) {
      return ARTWORKS.find((artwork) => artwork.id === id);
    },
    getTypeFolder
  };
})();
`;
}

function renderSitemap(orderedIds) {
  const urls = [
    `${siteBaseUrl}/`,
    `${siteBaseUrl}/gallery.html`,
    ...orderedIds.map((id) => `${siteBaseUrl}/artwork.html?id=${id}`)
  ];
  const uniqueUrls = [...new Set(urls)];
  const entries = uniqueUrls
    .map(
      (url) => `  <url>
    <loc>${url}</loc>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function normalizeLineEndings(source) {
  return source.replaceAll("\r\n", "\n");
}

function renderGalleryArtworks(artworksById, orderedIds) {
  const galleryIds = [...orderedIds].reverse();
  const cards = galleryIds
    .map((id, index) => {
      const escapedId = escapeHtml(id);
      const escapedImagePath = escapeHtml(artworksById.get(id));
      const type = escapeHtml(id.charAt(0));
      const galleryNumber = String(galleryIds.length - index).padStart(3, "0");

      return `      <a class="artwork-card" href="artwork.html?id=${escapedId}" data-artwork-type="${type}" aria-label="${escapedId}（分類 ${type}）">
        <span class="gallery-number">${galleryNumber}</span>
        <div class="card-image">
          <img src="${escapedImagePath}" alt="${escapedId}" loading="lazy">
        </div>
        <div class="card-meta">
          <span class="artwork-number">${escapedId}</span>
        </div>
      </a>`;
    })
    .join("\n");

  return `${galleryStartMarker}
${cards}
      ${galleryEndMarker}`;
}

function replaceGalleryArtworks(source, artworksById, orderedIds) {
  const startIndex = source.indexOf(galleryStartMarker);
  const endIndex = source.indexOf(galleryEndMarker);

  if (
    startIndex < 0 ||
    endIndex < 0 ||
    endIndex < startIndex ||
    source.indexOf(galleryStartMarker, startIndex + galleryStartMarker.length) >= 0 ||
    source.indexOf(galleryEndMarker, endIndex + galleryEndMarker.length) >= 0
  ) {
    throw new Error("gallery.html must contain exactly one valid artwork marker pair");
  }

  const afterMarkers = endIndex + galleryEndMarker.length;
  const generatedGalleryBlock = renderGalleryArtworks(artworksById, orderedIds);

  return source.slice(0, startIndex) + generatedGalleryBlock + source.slice(afterMarkers);
}

const currentArtworksSource = fs.readFileSync(artworksFile, "utf8");
const currentGallerySource = fs.readFileSync(galleryFile, "utf8");
const currentSitemapSource = fs.readFileSync(sitemapFile, "utf8");
const artworksById = getArtworkImages();
const orderedIds = orderArtworkIds(artworksById, getExistingOrder(currentArtworksSource));
const generatedArtworksSource = renderArtworks(artworksById, orderedIds);
const generatedGallerySource = normalizeLineEndings(
  replaceGalleryArtworks(currentGallerySource, artworksById, orderedIds)
);
const generatedSitemapSource = renderSitemap(orderedIds);
const checkOnly = process.argv.includes("--check");
const generatedFiles = [
  {
    label: "js/artworks.js",
    path: artworksFile,
    currentSource: currentArtworksSource,
    generatedSource: generatedArtworksSource
  },
  {
    label: "gallery.html",
    path: galleryFile,
    currentSource: currentGallerySource,
    generatedSource: generatedGallerySource
  },
  {
    label: "sitemap.xml",
    path: sitemapFile,
    currentSource: currentSitemapSource,
    generatedSource: generatedSitemapSource
  }
];
const outdatedFiles = generatedFiles.filter(
  ({ currentSource, generatedSource }) =>
    normalizeLineEndings(currentSource) !== normalizeLineEndings(generatedSource)
);

if (checkOnly) {
  if (outdatedFiles.length > 0) {
    console.error(
      `${outdatedFiles.map(({ label }) => label).join(", ")} not up to date. ` +
        "Run this script without --check."
    );
    process.exitCode = 1;
  } else {
    console.log(`Generated files are up to date (${orderedIds.length} artworks).`);
  }
} else {
  for (const { path: filePath, generatedSource } of outdatedFiles) {
    fs.writeFileSync(filePath, generatedSource, "utf8");
  }

  if (outdatedFiles.length > 0) {
    console.log(
      `Updated ${outdatedFiles.map(({ label }) => label).join(", ")} ` +
        `(${orderedIds.length} artworks).`
    );
  } else {
    console.log(`Generated files are already up to date (${orderedIds.length} artworks).`);
  }
}
