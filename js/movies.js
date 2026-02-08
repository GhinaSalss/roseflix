import { api, IMAGE_BASE_URL } from "./api.js";
import storage from "./storage.js";
import Navbar from "../components/navbar.js";

const trendingContainer = document.getElementById("trending-container");
const movieGrid = document.getElementById("movie-grid");
const searchInput = document.getElementById("search-input");
const welcomeName = document.getElementById("welcome-name");
const tabButtons = document.querySelectorAll(".tab-item");

let currentMovies = [];

// Initialize Home Page
async function init() {
  Navbar.render("film");
  updateWelcomeName();
  await loadTrending();
  await loadMovies("trending");
  setupEventListeners();
}

function updateWelcomeName() {
  const user = storage.getUser();
  welcomeName.textContent = user.name;
}

async function loadTrending() {
  const data = await api.getTrending();
  if (data && data.results) {
    trendingContainer.innerHTML = data.results
      .slice(0, 5)
      .map(
        (movie) => `
            <div class="min-w-[85%] snap-center relative aspect-[16/9] overflow-hidden rounded-[2.5rem] glass" onclick="location.href='detail.html?id=${movie.id}'">
                <img src="${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}" class="w-full h-full object-cover" alt="${movie.title}">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="bg-pink-500 text-[8px] font-black px-2 py-1 rounded-lg uppercase">Hot</span>
                        <span class="text-[10px] text-gray-300 font-medium">${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</span>
                    </div>
                    <h4 class="text-xl font-black leading-tight mb-1 truncate">${movie.title}</h4>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-star text-pink-500 text-xs"></i>
                        <span class="text-xs font-bold">${movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");
  }
}

async function loadMovies(type) {
  movieGrid.innerHTML = `
        <div class="aspect-[2/3] bg-white/5 animate-pulse rounded-3xl"></div>
        <div class="aspect-[2/3] bg-white/5 animate-pulse rounded-3xl"></div>
    `;

  let data;
  switch (type) {
    case "trending":
      data = await api.getTrending();
      break;
    case "popular":
      data = await api.getPopular();
      break;
    case "top_rated":
      data = await api.getTopRated();
      break;
    case "latest":
      data = await api.getLatest();
      break;
  }

  if (data && data.results) {
    currentMovies = data.results;
    renderMovieGrid(currentMovies);
  }
}

function renderMovieGrid(movies) {
  if (movies.length === 0) {
    movieGrid.innerHTML =
      '<div class="col-span-2 py-10 text-center text-gray-500">No movies found.</div>';
    return;
  }

  movieGrid.innerHTML = movies
    .map((movie) => {
      const isFavorited = storage.isInWishlist(movie.id);
      return `
            <div class="group relative bg-white/5 rounded-[2rem] overflow-hidden border border-white/5 hover:border-pink-500/50 transition-all duration-300" onclick="location.href='detail.html?id=${movie.id}'">
                <div class="relative aspect-[2/3] overflow-hidden">
                    <img src="${IMAGE_BASE_URL}${movie.poster_path}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="${movie.title}">
                    <div class="absolute top-4 right-4 z-10">
                        <button onclick="event.stopPropagation(); window.toggleFavorite(${movie.id})" class="w-10 h-10 rounded-full glass backdrop-blur-md flex items-center justify-center text-sm ${isFavorited ? "text-pink-500" : "text-white"} hover:bg-pink-500 transition-all">
                            <i class="${isFavorited ? "fas" : "far"} fa-heart"></i>
                        </button>
                    </div>
                    <div class="absolute top-4 left-4 z-10">
                        <div class="bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1">
                            <i class="fas fa-star text-pink-500 text-[10px]"></i>
                            <span class="text-[10px] font-bold">${movie.vote_average.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
                <div class="p-4 space-y-1">
                    <h4 class="text-sm font-bold truncate leading-snug">${movie.title}</h4>
                    <p class="text-[10px] text-gray-500 font-medium">${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
                </div>
            </div>
        `;
    })
    .join("");
}

function setupEventListeners() {
  // Search
  let searchTimeout;
  searchInput.oninput = (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value;
    if (query.length < 3) {
      if (query.length === 0) loadMovies("trending");
      return;
    }

    searchTimeout = setTimeout(async () => {
      const data = await api.searchMovies(query);
      if (data && data.results) {
        renderMovieGrid(data.results);
      }
    }, 500);
  };

  // Tabs
  tabButtons.forEach((btn) => {
    btn.onclick = () => {
      tabButtons.forEach((b) => {
        b.classList.remove("active-tab", "text-white");
        b.classList.add("text-gray-500");
      });
      btn.classList.add("active-tab", "text-white");
      btn.classList.remove("text-gray-500");
      loadMovies(btn.dataset.tab);
    };
  });

  // Make toggleFavorite available globally
  window.toggleFavorite = (id) => {
    const movie = currentMovies.find((m) => m.id === id);
    if (movie) {
      storage.toggleWishlist(movie);
      renderMovieGrid(currentMovies);
    }
  };
}

init();
