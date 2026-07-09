(function () {
  const ARTWORKS = [
    {
      id: "A001",
      image: "images/type-a/A001.png"
    },
    {
      id: "C001",
      image: "images/type-b/C001.JPG"
    },
    {
      id: "A002",
      image: "images/type-c/A002.png"
    },
    {
      id: "C002",
      image: "images/type-c/C002.jpg"
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
