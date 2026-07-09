(function () {
  const TYPES = {
    A: {
      label: "Type A",
      name: "AI Abstract",
      description: "100% AIによる抽象画"
    },
    B: {
      label: "Type B",
      name: "AI × Keiko",
      description: "AIが下絵を作成し、Keikoがペン画として仕上げた共同制作作品"
    },
    C: {
      label: "Type C",
      name: "Keiko Drawing",
      description: "Keikoによるオリジナル作品"
    }
  };

  const ARTWORKS = [
    {
      id: "A001",
      type: "A",
      title: "Silent Form",
      image: "images/type-a/A001.png",
      memo: "淡い余白の中に、静かに浮かぶかたちを置いた抽象作品です。"
    },
    {
      id: "B001",
      type: "B",
      title: "Line Garden",
      image: "images/type-b/B001.png",
      memo: "AIの下絵をもとに、Keikoが線の重なりで庭のような気配を描いた共同制作作品です。"
    },
    {
      id: "C001",
      type: "C",
      title: "Small Breath",
      image: "images/type-c/C001.png",
      memo: "日々の中にある小さな呼吸を、ペンの線で静かに写し取った作品です。"
    }
  ];

  window.QuietMuseum = {
    types: TYPES,
    artworks: ARTWORKS,
    findArtwork(id) {
      return ARTWORKS.find((artwork) => artwork.id === id);
    },
    getTypeLabel(type) {
      const item = TYPES[type];
      return item ? `${item.label} / ${item.name}` : type;
    }
  };
})();
