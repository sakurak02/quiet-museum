(function () {
  const container = document.getElementById("artwork-view");
  const museum = window.QuietMuseum;

  if (!container || !museum) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const currentId = params.get("id") || museum.artworks[0]?.id;
  const currentIndex = museum.artworks.findIndex((artwork) => artwork.id === currentId);
  const artwork = currentIndex >= 0 ? museum.artworks[currentIndex] : null;

  if (!artwork) {
    container.innerHTML = `
      <div class="empty-state">
        <p>作品が見つかりませんでした。</p>
        <a class="button" href="gallery.html">作品一覧へ戻る</a>
      </div>
    `;
    return;
  }

  const previous = museum.artworks[currentIndex - 1];
  const next = museum.artworks[currentIndex + 1];
  const liked = window.QuietMuseumLikes?.isLiked(artwork.id) || false;

  document.title = `${artwork.id} | Quiet Museum`;

  container.innerHTML = `
    <article class="artwork-layout">
      <div class="artwork-image-wrap">
        <img src="${artwork.image}" alt="${artwork.id}">
      </div>
      <section class="artwork-detail">
        <p class="artwork-detail-number">${artwork.id}</p>
        <button class="like-button" type="button" aria-label="お気に入り" aria-pressed="${liked}">${liked ? "❤" : "♡"}</button>
        <nav class="artwork-nav" aria-label="作品移動">
          ${previous ? `<a class="button" href="artwork.html?id=${encodeURIComponent(previous.id)}">Previous</a>` : `<span class="button disabled" aria-disabled="true">Previous</span>`}
          ${next ? `<a class="button" href="artwork.html?id=${encodeURIComponent(next.id)}">Next</a>` : `<span class="button disabled" aria-disabled="true">Next</span>`}
          <a class="button back-link" href="gallery.html">Back to Gallery</a>
        </nav>
      </section>
    </article>
  `;

  const likeButton = container.querySelector(".like-button");
  likeButton.addEventListener("click", () => {
    const isLiked = window.QuietMuseumLikes.toggle(artwork.id);
    likeButton.textContent = isLiked ? "❤" : "♡";
    likeButton.setAttribute("aria-pressed", String(isLiked));
  });
})();
