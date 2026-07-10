import { doc, increment, setDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { db } from "./firebase-config.js";

const ID_PATTERN = /^[ABC][0-9]{3}$/;

function storageKey(artworkId) {
  return `quietMuseum.likes.v1.${artworkId}`;
}

function getArtworkId(button) {
  const idFromButton = button?.dataset.artworkId || "";

  if (idFromButton) {
    return idFromButton;
  }

  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "";
}

function hasLiked(artworkId) {
  return localStorage.getItem(storageKey(artworkId)) === "true";
}

function markLiked(artworkId) {
  localStorage.setItem(storageKey(artworkId), "true");
}

function renderButton(button, liked) {
  button.textContent = liked ? "❤" : "♡";
  button.setAttribute("aria-pressed", String(liked));
  button.setAttribute(
    "aria-label",
    liked ? "この作品には♡をつけています" : "この作品に♡をつける"
  );
}

function initLikeButton() {
  const button = document.querySelector(".like-button");

  if (!button || button.dataset.likeInitialized === "true") {
    return;
  }

  const artworkId = getArtworkId(button);

  if (!ID_PATTERN.test(artworkId)) {
    console.error("Invalid artwork ID for like button:", artworkId);
    return;
  }

  button.dataset.likeInitialized = "true";
  renderButton(button, hasLiked(artworkId));

  button.addEventListener("click", async () => {
    if (hasLiked(artworkId)) {
      renderButton(button, true);
      return;
    }

    button.disabled = true;

    try {
      await setDoc(
        doc(db, "likes", artworkId),
        { count: increment(1) },
        { merge: true }
      );

      markLiked(artworkId);
      renderButton(button, true);
    } catch (error) {
      console.error("Failed to save artwork like:", error);
      renderButton(button, false);
    } finally {
      button.disabled = false;
    }
  });
}

document.addEventListener("quietMuseum:artworkRendered", initLikeButton);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLikeButton);
} else {
  initLikeButton();
}
