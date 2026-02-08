import { dramas } from "../data/dramas.js";
import {
  toggleFavorite,
  isFavorite,
  isPurchased,
  addPurchased,
} from "./storage.js";

// Get drama ID from URL
const urlParams = new URLSearchParams(window.location.search);
const dramaId = urlParams.get("id");

// DOM Elements
const loadingState = document.getElementById("loadingState");
const dramaContent = document.getElementById("dramaContent");
const errorState = document.getElementById("errorState");
const favoriteBtn = document.getElementById("favoriteBtn");
const actionBtn = document.getElementById("actionBtn");
const purchaseModal = document.getElementById("purchaseModal");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");
const thumbnailSection = document.getElementById("thumbnailSection");
const playerSection = document.getElementById("playerSection");

// Current drama
let currentDrama = null;
let isUnlocked = false;

// Initialize
function init() {
  if (!dramaId) {
    showError();
    return;
  }

  currentDrama = dramas.find((d) => d.youtubeId === dramaId);

  if (!currentDrama) {
    showError();
    return;
  }

  // Check if unlocked (free or purchased)
  isUnlocked = currentDrama.price === 0 || isPurchased(dramaId);

  renderDrama();

  // Update favorite button after Lucide Icons are initialized (called in renderDrama)
  setTimeout(() => updateFavoriteButton(), 100);

  // Event listeners
  favoriteBtn.addEventListener("click", handleFavoriteToggle);
  actionBtn.addEventListener("click", handleAction);
  cancelBtn.addEventListener("click", closeModal);
  confirmBtn.addEventListener("click", handlePurchase);
}

function showError() {
  loadingState.classList.add("hidden");
  errorState.classList.remove("hidden");
}

function renderDrama() {
  loadingState.classList.add("hidden");
  dramaContent.classList.remove("hidden");

  // Thumbnail
  document.getElementById("dramaThumbnail").src = currentDrama.thumbnail;
  document.getElementById("dramaThumbnail").alt = currentDrama.title;

  // Badge
  const badge = document.getElementById("dramaBadge");
  if (currentDrama.price === 0) {
    badge.className =
      "absolute top-4 right-4 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-600";
    badge.textContent = "FREE";
  } else {
    badge.className =
      "absolute top-4 right-4 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-rose-600";
    badge.textContent = `Rp ${currentDrama.price.toLocaleString("id-ID")}`;
  }

  // Info
  document.getElementById("dramaTitle").textContent = currentDrama.title;
  document.getElementById("dramaGenre").textContent = currentDrama.genre;
  document.getElementById("dramaViews").textContent =
    formatViews(currentDrama.views) + " views";
  document.getElementById("dramaDate").textContent = formatDate(
    currentDrama.createdAt,
  );
  document.getElementById("dramaDescription").textContent =
    currentDrama.description;

  // Action button
  updateActionButton();

  // Re-initialize icons
  lucide.createIcons();
}

function updateActionButton() {
  if (isUnlocked) {
    actionBtn.className =
      "w-full py-4 rounded-2xl text-white font-bold shadow-lg flex items-center justify-center gap-2 btn-success";
    actionBtn.innerHTML =
      '<i data-lucide="play-circle" class="w-6 h-6"></i><span id="btnText">Tonton Sekarang</span>';
  } else {
    actionBtn.className =
      "w-full py-4 rounded-2xl text-white font-bold shadow-lg flex items-center justify-center gap-2 btn-primary";
    actionBtn.innerHTML = `<i data-lucide="lock" class="w-6 h-6"></i><span id="btnText">Beli Drama - Rp ${currentDrama.price.toLocaleString("id-ID")}</span>`;
  }

  lucide.createIcons();
}

function handleAction() {
  if (isUnlocked) {
    showPlayer();
  } else {
    showPurchaseModal();
  }
}

function showPlayer() {
  // Hide thumbnail, show player
  thumbnailSection.classList.add("hidden");
  playerSection.classList.remove("hidden");

  // Load YouTube embed
  const iframe = document.getElementById("youtubePlayer");
  iframe.src = `https://www.youtube.com/embed/${currentDrama.youtubeId}?autoplay=1`;

  // Update button to scroll to player
  actionBtn.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showPurchaseModal() {
  document.getElementById("modalPrice").textContent =
    `Rp ${currentDrama.price.toLocaleString("id-ID")}`;
  purchaseModal.classList.add("active");
  lucide.createIcons();
}

function closeModal() {
  purchaseModal.classList.remove("active");
}

function handlePurchase() {
  // Simulate purchase
  addPurchased(dramaId);
  isUnlocked = true;

  closeModal();
  updateActionButton();

  // Show success message
  alert("✅ Pembelian berhasil! Drama sekarang bisa ditonton.");
}

function updateFavoriteButton() {
  const icon = favoriteBtn.querySelector("svg");
  const isFav = isFavorite(dramaId);

  if (icon) {
    if (isFav) {
      icon.classList.add("fill-pink-500", "text-pink-500");
      icon.classList.remove("text-gray-600");
    } else {
      icon.classList.remove("fill-pink-500", "text-pink-500");
      icon.classList.add("text-gray-600");
    }
  }
}

function handleFavoriteToggle() {
  toggleFavorite(dramaId);

  // Update button after a short delay to ensure SVG is rendered
  setTimeout(() => updateFavoriteButton(), 50);

  const isFav = isFavorite(dramaId);
  const message = isFav
    ? "💕 Ditambahkan ke favorit!"
    : "💔 Dihapus dari favorit";

  // Simple toast notification
  const toast = document.createElement("div");
  toast.className =
    "fixed top-20 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-2xl shadow-xl z-50 font-medium text-gray-800";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2000);
}

function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(0) + "K";
  }
  return views.toString();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}

// Start
init();
