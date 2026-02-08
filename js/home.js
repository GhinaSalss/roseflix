import { dramas } from "../data/dramas.js";
import {
  getFavorites,
  isFavorite,
  toggleFavorite,
  saveSearchState,
  getSearchState,
} from "./storage.js";

// DOM Elements
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const sortSelect = document.getElementById("sortSelect");
const dramaGrid = document.getElementById("dramaGrid");

// State
let currentSearch = "";
let currentGenre = "all";
let currentSort = "latest";

// Initialize
function init() {
  // Restore previous state
  const savedState = getSearchState();
  currentSearch = savedState.searchQuery;
  currentGenre = savedState.selectedGenre;
  currentSort = savedState.selectedSort;

  searchInput.value = currentSearch;
  genreFilter.value = currentGenre;
  sortSelect.value = currentSort;

  // Event Listeners
  searchInput.addEventListener("input", handleSearch);
  genreFilter.addEventListener("change", handleGenreChange);
  sortSelect.addEventListener("change", handleSortChange);

  // Initial render
  renderDramas();
}

// Search Handler
function handleSearch(e) {
  currentSearch = e.target.value.toLowerCase();
  saveState();
  renderDramas();
}

// Genre Filter Handler
function handleGenreChange(e) {
  currentGenre = e.target.value;
  saveState();
  renderDramas();
}

// Sort Handler
function handleSortChange(e) {
  currentSort = e.target.value;
  saveState();
  renderDramas();
}

// Save state to localStorage
function saveState() {
  saveSearchState(currentSearch, currentGenre, currentSort);
}

// Filter and Sort Dramas
function getFilteredDramas() {
  let filtered = [...dramas];

  // Apply search filter
  if (currentSearch) {
    filtered = filtered.filter((drama) =>
      drama.title.toLowerCase().includes(currentSearch),
    );
  }

  // Apply genre filter
  if (currentGenre !== "all") {
    filtered = filtered.filter((drama) => drama.genre === currentGenre);
  }

  // Apply sorting
  if (currentSort === "latest") {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (currentSort === "trending") {
    filtered.sort((a, b) => b.views - a.views);
  }

  return filtered;
}

// Format views
function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(0) + "K";
  }
  return views.toString();
}

// Render dramas
function renderDramas() {
  const filtered = getFilteredDramas();

  if (filtered.length === 0) {
    dramaGrid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <i data-lucide="search-x" class="w-16 h-16 text-pink-300 mx-auto mb-4"></i>
        <p class="text-gray-500 text-lg">Tidak ada drama yang ditemukan</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  dramaGrid.innerHTML = filtered
    .map(
      (drama) => `
      <div class="drama-card group cursor-pointer" onclick="window.location.href='detail.html?id=${drama.youtubeId}'">
        <!-- Glassmorphism Card Container -->
        <div class="relative rounded-3xl overflow-hidden backdrop-blur-md bg-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50">
          
          <!-- 16:9 Image Container -->
          <div class="relative w-full" style="aspect-ratio: 16/9;">
            <img 
              src="${drama.thumbnail}" 
              alt="${drama.title}"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <!-- Favorite Icon - Top Left -->
            <button class="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all ${isFavorite(drama.youtubeId) ? "text-pink-500" : "text-gray-400"}" onclick="event.stopPropagation(); toggleFavorite('${drama.youtubeId}'); location.reload();">
              <i data-lucide="heart" class="w-4 h-4 ${isFavorite(drama.youtubeId) ? "fill-current" : ""}"></i>
            </button>
            
            <!-- Badge - Top Right -->
            <div class="absolute top-3 right-3">
  ${
    drama.price === 0
      ? `
        <span class="
          px-3 py-1.5 
          rounded-full 
          text-xs font-bold 
          text-white 
          bg-white/20 
          backdrop-blur-xl 
          border border-white/30
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        ">
          ✨ FREE
        </span>
      `
      : `
        <span class="
          px-3 py-1.5 
          rounded-full 
          text-xs font-bold 
          text-white 
          bg-white/20 
          backdrop-blur-xl 
          border border-white/30
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        ">
          💎 Rp ${drama.price.toLocaleString("id-ID")}
        </span>
      `
  }
</div>

            
            <!-- Info Overlay - Bottom -->
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <h3 class="font-bold text-white text-base mb-1.5 line-clamp-1 drop-shadow-lg">${drama.title}</h3>
              <div class="flex items-center gap-3 text-xs text-white/90">
                <div class="flex items-center gap-1">
                  <i data-lucide="tag" class="w-3.5 h-3.5"></i>
                  <span>${drama.genre}</span>
                </div>
                <div class="flex items-center gap-1">
                  <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                  <span>${formatViews(drama.views)}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    `,
    )
    .join("");

  lucide.createIcons();
}

// Start app
init();
