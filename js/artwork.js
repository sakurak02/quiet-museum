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

  const type = museum.types[artwork.type];
  const previous = museum.artworks[currentIndex - 1];
  const next = museum.artworks[currentIndex + 1];
  const liked = window.QuietMuseumLikes?.isLiked(artwork.id) || false;

  document.title = `${artwork.id} ${artwork.title} | Quiet Museum`;

  container.innerHTML = `
    <article class="artwork-layout">
      <div class="artwork-image-wrap">
        <img src="${artwork.image}" alt="${artwork.id} ${artwork.title}">
      </div>
      <section class="artwork-detail">
        <div class="detail-meta">
          <span class="artwork-number">${artwork.id}</span>
          <span class="artwork-type">${museum.getTypeLabel(artwork.type)}</span>
        </div>
        <h1>${artwork.title}</h1>
        <p class="memo">${artwork.memo}</p>
        ${type ? `<p class="memo">${type.description}</p>` : ""}
        <button class="like-button" type="button" aria-label="お気に入り" aria-pressed="${liked}">${liked ? "❤" : "♡"}</button>
        <nav class="artwork-nav" aria-label="作品移動">
          ${previous ? `<a class="button" href="artwork.html?id=${encodeURIComponent(previous.id)}">前へ</a>` : `<span class="button disabled" aria-disabled="true">前へ</span>`}
          ${next ? `<a class="button" href="artwork.html?id=${encodeURIComponent(next.id)}">次へ</a>` : `<span class="button disabled" aria-disabled="true">次へ</span>`}
          <a class="button back-link" href="gallery.html">作品一覧へ戻る</a>
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
