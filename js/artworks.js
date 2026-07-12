(function () {
  const ARTWORKS = [
    {
      id: "A001",
      image: "images/type-a/A001.webp"
    },
    {
      id: "C001",
      image: "images/type-c/C001.webp"
    },
    {
      id: "A002",
      image: "images/type-a/A002.webp"
    },
    {
      id: "C002",
      image: "images/type-c/C002.webp"
    }
  ];

  function getTypeFolder(id) {
    const prefix = id.charAt(0).toLowerCase();
    return prefix ? `type-${prefix}` : "";
  }

  window.QuietMuseum = {
    artworks: ARTWORKS,
    findArtwork(id) {
      return ARTWORKS.find((artwork) => artwork.id === id);
    },
    getTypeFolder
  };
})();
