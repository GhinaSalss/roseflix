// LocalStorage utility functions for DramaBloom

// Favorites Management
export function getFavorites() {
  const favorites = localStorage.getItem("dramabloom_favorites");
  return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(youtubeId) {
  const favorites = getFavorites();
  if (!favorites.includes(youtubeId)) {
    favorites.push(youtubeId);
    localStorage.setItem("dramabloom_favorites", JSON.stringify(favorites));
  }
}

export function removeFavorite(youtubeId) {
  const favorites = getFavorites();
  const updated = favorites.filter((id) => id !== youtubeId);
  localStorage.setItem("dramabloom_favorites", JSON.stringify(updated));
}

export function isFavorite(youtubeId) {
  return getFavorites().includes(youtubeId);
}

export function toggleFavorite(youtubeId) {
  if (isFavorite(youtubeId)) {
    removeFavorite(youtubeId);
    return false;
  } else {
    addFavorite(youtubeId);
    return true;
  }
}

// Purchased Dramas Management
export function getPurchased() {
  const purchased = localStorage.getItem("dramabloom_purchased");
  return purchased ? JSON.parse(purchased) : [];
}

export function addPurchased(youtubeId) {
  const purchased = getPurchased();
  if (!purchased.includes(youtubeId)) {
    purchased.push(youtubeId);
    localStorage.setItem("dramabloom_purchased", JSON.stringify(purchased));
  }
}

export function isPurchased(youtubeId) {
  return getPurchased().includes(youtubeId);
}

// Search, Filter, Sort State
export function saveSearchState(searchQuery, selectedGenre, selectedSort) {
  const state = { searchQuery, selectedGenre, selectedSort };
  localStorage.setItem("dramabloom_search_state", JSON.stringify(state));
}

export function getSearchState() {
  const state = localStorage.getItem("dramabloom_search_state");
  return state
    ? JSON.parse(state)
    : {
        searchQuery: "",
        selectedGenre: "all",
        selectedSort: "latest",
      };
}
