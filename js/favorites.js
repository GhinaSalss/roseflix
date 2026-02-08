import { dramas } from "../data/dramas.js";
import { getFavorites } from "./storage.js";

// DOM Elements
const dramaGrid = document.getElementById("dramaGrid");
const emptyState = document.getElementById("emptyState");

// Format views
function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(0) + "K";
  }
  return views.toString();
}

// Render favorites
function renderFavorites() {
  const favoriteIds = getFavorites();

  if (favoriteIds.length === 0) {
    dramaGrid.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }

  // Filter dramas by favorites
  const favoriteDramas = dramas.filter((drama) =>
    favoriteIds.includes(drama.youtubeId),
  );

  dramaGrid.classList.remove("hidden");
  emptyState.classList.add("hidden");

  dramaGrid.innerHTML = favoriteDramas
    .map((drama) => {
      const badgeClass =
        drama.price === 0
          ? "bg-gradient-to-r from-green-500 to-emerald-600"
          : "bg-gradient-to-r from-pink-500 to-rose-600";
      const badgeText =
        drama.price === 0
          ? "FREE"
          : `Rp ${drama.price.toLocaleString("id-ID")}`;

      return `
      <div class="drama-card bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer" 
           onclick="location.href='detail.html?id=${drama.youtubeId}'">
        <!-- Thumbnail -->
        <div class="relative aspect-[3/4] bg-gradient-to-br from-pink-200 to-rose-300 overflow-hidden">
          <img 
            src="${drama.thumbnail}" 
            alt="${drama.title}"
            class="w-full h-full object-cover"
            onerror="this.style.display='none'"
          >
          <!-- Badge -->
          <div class="absolute top-3 right-3 ${badgeClass} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            ${badgeText}
          </div>
          <!-- Heart Icon (always filled on favorites page) -->
          <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
            <i data-lucide="heart" class="w-4 h-4 text-pink-500 fill-pink-500"></i>
          </div>
        </div>
        
        <!-- Info -->
        <div class="p-4">
          <h3 class="font-bold text-gray-800 text-sm line-clamp-2 mb-2 leading-tight">
            ${drama.title}
          </h3>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <div class="flex items-center gap-1">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              <span>${formatViews(drama.views)}</span>
            </div>
            <span class="text-pink-400">•</span>
            <span class="px-2 py-0.5 bg-pink-50 text-pink-600 rounded-full font-medium">
              ${drama.genre}
            </span>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  // Re-initialize icons
  lucide.createIcons();
}

// Initialize
renderFavorites();
