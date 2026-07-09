(function () {
  const grid = document.getElementById("gallery-grid");
  const museum = window.QuietMuseum;

  if (!grid || !museum) {
    return;
  }

  const fragment = document.createDocumentFragment();

  museum.artworks.forEach((artwork) => {
    const card = document.createElement("a");
    card.className = "artwork-card";
    card.href = `artwork.html?id=${encodeURIComponent(artwork.id)}`;

    const imageWrap = document.createElement("div");
    imageWrap.className = "card-image";

    const image = document.createElement("img");
    image.src = artwork.image;
    image.alt = `${artwork.id} ${artwork.title}`;
    image.loading = "lazy";
    imageWrap.appendChild(image);

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.innerHTML = `
      <span class="artwork-number">${artwork.id}</span>
      <span class="artwork-type">${museum.getTypeLabel(artwork.type)}</span>
      <h2 class="artwork-title">${artwork.title}</h2>
    `;

    card.append(imageWrap, meta);
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
})();
