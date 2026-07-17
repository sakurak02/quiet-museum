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
      id: "B001",
      image: "images/type-b/B001.webp"
    },
    {
      id: "A003",
      image: "images/type-a/A003.webp"
    },
    {
      id: "C002",
      image: "images/type-c/C002.webp"
    },
    {
      id: "C003",
      image: "images/type-c/C003.webp"
    },
    {
      id: "A004",
      image: "images/type-a/A004.webp"
    },
    {
      id: "B002",
      image: "images/type-b/B002.webp"
    },
    {
      id: "A005",
      image: "images/type-a/A005.webp"
    },
    {
      id: "A006",
      image: "images/type-a/A006.webp"
    },
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
