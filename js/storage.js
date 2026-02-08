const storage = {
  get(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  // User Profile
  getUser() {
    return this.get("user_profile", { name: "User" });
  },
  setUser(name) {
    this.set("user_profile", { name });
  },

  // Wishlist
  getWishlist() {
    return this.get("wishlist", []);
  },
  toggleWishlist(movie) {
    let list = this.getWishlist();
    const index = list.findIndex((m) => m.id === movie.id);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      });
    }
    this.set("wishlist", list);
    return index === -1; // returns true if added, false if removed
  },
  isInWishlist(id) {
    return this.getWishlist().some((m) => m.id === id);
  },

  // Purchase History
  getHistory() {
    return this.get("purchase_history", []);
  },
  addToHistory(movie, price, method) {
    const history = this.getHistory();
    const invoice = `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(history.length + 1).padStart(3, "0")}`;
    const item = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      price: price,
      paymentMethod: method,
      date: new Date().toLocaleDateString("id-ID"),
      invoice: invoice,
    };
    history.push(item);
    this.set("purchase_history", history);
  },
  isUnlocked(id) {
    return this.getHistory().some((m) => m.id === id);
  },
};

export default storage;
