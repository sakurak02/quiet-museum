(function () {
  const STORAGE_KEY = "quietMuseum.likes";

  function readLikes() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (error) {
      return {};
    }
  }

  function writeLikes(likes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
  }

  window.QuietMuseumLikes = {
    isLiked(id) {
      return Boolean(readLikes()[id]);
    },
    toggle(id) {
      const likes = readLikes();
      likes[id] = !likes[id];

      if (!likes[id]) {
        delete likes[id];
      }

      writeLikes(likes);
      return Boolean(likes[id]);
    }
  };
})();
