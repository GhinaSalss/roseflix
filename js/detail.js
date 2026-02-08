import { api, IMAGE_BASE_URL } from "./api.js";
import storage from "./storage.js";
import Modal from "../components/modal.js";
import Toast from "../components/toast.js";

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const elements = {
  poster: document.getElementById("movie-poster"),
  title: document.getElementById("movie-title"),
  year: document.getElementById("movie-year"),
  genres: document.getElementById("movie-genres"),
  rating: document.getElementById("movie-rating"),
  ratingCircle: document.getElementById("rating-circle"),
  budget: document.getElementById("movie-budget"),
  revenue: document.getElementById("movie-revenue"),
  popularity: document.getElementById("movie-popularity"),
  overview: document.getElementById("movie-overview"),
  castContainer: document.getElementById("cast-container"),
  unlockBtn: document.getElementById("unlock-btn"),
  btnText: document.getElementById("btn-text"),
  favoriteBtn: document.getElementById("favorite-btn"),
};

let currentMovie = null;

async function init() {
  if (!movieId) {
    window.location.href = "index.html";
    return;
  }

  const movie = await api.getMovieDetail(movieId);
  if (!movie) {
    Toast.show("Movie data not found", "error");
    return;
  }

  currentMovie = movie;
  renderDetail(movie);
  updateFavoriteUI();
  updateUnlockUI();
  setupEventListeners();
}

function calculatePrice(budget) {
  if (budget === 0) return "FREE";
  return "Rp " + (budget / 1000).toLocaleString("id-ID");
}

function renderDetail(movie) {
  elements.poster.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
  elements.title.textContent = movie.title;
  elements.year.textContent = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  elements.genres.textContent = movie.genres
    .map((g) => g.name)
    .slice(0, 2)
    .join(" / ");
  elements.rating.textContent = movie.vote_average.toFixed(1);

  // Rating Circle Animation
  const offset = 175.9 - (175.9 * movie.vote_average) / 10;
  setTimeout(() => {
    elements.ratingCircle.style.strokeDashoffset = offset;
  }, 100);

  elements.budget.textContent = movie.budget
    ? `$${(movie.budget / 1000000).toFixed(0)}M`
    : "N/A";
  elements.revenue.textContent = movie.revenue
    ? `$${(movie.revenue / 1000000).toFixed(0)}M`
    : "N/A";
  elements.popularity.textContent = movie.popularity.toFixed(1) + "%";
  elements.overview.textContent = movie.overview;

  // Cast
  if (movie.credits && movie.credits.cast) {
    elements.castContainer.innerHTML = movie.credits.cast
      .slice(0, 10)
      .map(
        (person) => `
            <div class="flex-shrink-0 w-20 text-center space-y-2">
                <div class="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-white/10 p-[2px]">
                    <img src="${IMAGE_BASE_URL}${person.profile_path}" class="w-full h-full object-cover rounded-full bg-gray-900" 
                         onerror="this.src='https://api.dicebear.com/7.x/initials/svg?seed=${person.name}'">
                </div>
                <p class="text-[9px] font-bold text-white truncate px-1">${person.name}</p>
                <p class="text-[8px] text-gray-500 truncate px-1">${person.character}</p>
            </div>
        `,
      )
      .join("");
  }
}

function updateFavoriteUI() {
  const isFavorited = storage.isInWishlist(parseInt(movieId));
  const icon = elements.favoriteBtn.querySelector("i");
  if (isFavorited) {
    icon.className = "fas fa-heart text-pink-500";
  } else {
    icon.className = "far fa-heart text-white";
  }
}

function updateUnlockUI() {
  const budget = currentMovie.budget || 0;
  const isPaid = budget > 0;
  const isUnlocked = storage.isUnlocked(parseInt(movieId));

  if (!isPaid || isUnlocked) {
    elements.unlockBtn.disabled = false;
    elements.btnText.textContent = "Watch Trailer";
    elements.unlockBtn.classList.remove("opacity-50", "grayscale");
  } else {
    elements.btnText.textContent = `Unlock Required (${calculatePrice(budget)})`;
    // We don't disable it, because clicking it should trigger the payment modal
  }
}

function setupEventListeners() {
  elements.favoriteBtn.onclick = () => {
    storage.toggleWishlist(currentMovie);
    updateFavoriteUI();
    Toast.show(
      storage.isInWishlist(currentMovie.id)
        ? "Added to Wishlist"
        : "Removed from Wishlist",
    );
  };

  elements.unlockBtn.onclick = () => {
    const budget = currentMovie.budget || 0;
    const isPaid = budget > 0;
    const isUnlocked = storage.isUnlocked(currentMovie.id);

    if (!isPaid || isUnlocked) {
      // Find YouTube Trailer
      const trailer = currentMovie.videos.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube",
      );
      if (trailer) {
        Modal.showTrailer(trailer.key);
      } else {
        Toast.show("No trailer available for this movie", "error");
      }
    } else {
      // Show Payment Modal
      Modal.showPayment(currentMovie, calculatePrice(budget), (method) => {
        storage.addToHistory(currentMovie, calculatePrice(budget), method);
        updateUnlockUI();
        Toast.show("Payment Successful! Trailer Unlocked");
      });
    }
  };
}

init();
