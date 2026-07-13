(function () {
  const grid = document.getElementById("gallery-grid");
  const museum = window.QuietMuseum;

  if (!grid || !museum) {
    return;
  }

  const fragment = document.createDocumentFragment();
  const galleryArtworks = [...museum.artworks].reverse();

  galleryArtworks.forEach((artwork, index) => {
    const card = document.createElement("a");
    card.className = "artwork-card";
    card.href = `artwork.html?id=${encodeURIComponent(artwork.id)}`;

    const imageWrap = document.createElement("div");
    imageWrap.className = "card-image";

    const image = document.createElement("img");
    image.src = artwork.image;
    image.alt = artwork.id;
    image.loading = "lazy";
    imageWrap.appendChild(image);

    const galleryNumber = document.createElement("span");
    galleryNumber.className = "gallery-number";
    galleryNumber.textContent = String(index + 1).padStart(3, "0");

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.innerHTML = `
      <span class="artwork-number">${artwork.id}</span>
    `;

    card.append(galleryNumber, imageWrap, meta);
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
})();
