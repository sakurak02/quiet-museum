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
    {
      id: "D001",
      image: "images/type-d/D001-KLARA-AND-THE-SUN.webp",
      title: "KLARA AND THE SUN"
    },
    {
      id: "D002",
      image: "images/type-d/D002-NIGHT-ON-THE-GALACTIC-RAILROAD.webp",
      title: "NIGHT ON THE GALACTIC RAILROAD"
    },
    {
      id: "A007",
      image: "images/type-a/A007.webp"
    },
    {
      id: "B003",
      image: "images/type-b/B003.webp"
    },
    {
      id: "D003",
      image: "images/type-d/D003-FLOWERS-FOR-ALGERNON.webp",
      title: "FLOWERS FOR ALGERNON"
    },
    {
      id: "A008",
      image: "images/type-a/A008.webp"
    },
    {
      id: "D004",
      image: "images/type-d/D004-1-THE-DEATH-OF-A-GOVERNMENT-CLERK.webp",
      title: "1 THE DEATH OF A GOVERNMENT CLERK"
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
