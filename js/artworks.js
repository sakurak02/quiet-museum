(function () {
  const ARTWORKS = [
    {
      id: "A001",
      image: "images/type-a/A001.png"
    },
    {
      id: "B001",
      image: "images/type-b/B001.png"
    },
    {
      id: "C001",
      image: "images/type-c/C001.png"
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
