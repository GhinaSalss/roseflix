const TMDB_API_KEY = "10c4750ad0b7b3f10b3595eab98c5dd9"; // Replace with your actual key
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const api = {
  async fetchMovies(endpoint, params = {}) {
    const queryParams = new URLSearchParams({
      api_key: TMDB_API_KEY,
      ...params,
    }).toString();

    try {
      const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return (await response.ok) ? response.json() : null;
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  },

  getTrending() {
    return this.fetchMovies("/trending/movie/day");
  },

  getPopular() {
    return this.fetchMovies("/movie/popular");
  },

  getTopRated() {
    return this.fetchMovies("/movie/top_rated");
  },

  getLatest() {
    return this.fetchMovies("/movie/now_playing");
  },

  searchMovies(query) {
    return this.fetchMovies("/search/movie", { query });
  },

  getMovieDetail(id) {
    return this.fetchMovies(`/movie/${id}`, {
      append_to_response: "videos,credits",
    });
  },
};

export { api, IMAGE_BASE_URL };
