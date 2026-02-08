# RoseFlix 🌹🎬

RoseFlix is a premium, mobile-first Movie Unlock Trailer Platform PWA. Built for movie enthusiasts, it allows users to discover movies, manage a wishlist, and "unlock" premium trailers through a simulated payment experience.

## ✨ Key Features

- **🎬 Movie Discovery**: Browse trending, popular, top-rated, and now-playing movies using the TMDB API.
- **🔍 Real-time Search**: Find any movie instantly with a responsive search bar.
- **🔐 Unlock Trailer Logic**: Movies are dynamically categorized as FREE or PAID based on their budget.
- **💰 Dynamic Pricing**: Automatic price calculation following the rule: `Price = Budget / 1000` formatted in Rupiah.
- **💳 Payment Simulation**: Experience a sleek glassmorphism checkout modal with various dummy payment methods (Dana, ShopeePay, QRIS, etc.).
- **💖 Personalization**: Save movies to your Wishlist and track your unlocked trailers in the Purchase History.
- **📱 PWA Ready**: Installable on mobile and desktop, featuring a Service Worker for offline resilience.
- **🎨 Premium UI**: Modern "Pinky Dark" glassmorphism theme with smooth animations and a native-app feel.

## 🛠️ Tech Stack

- **HTML5**: Pure multi-page structure.
- **Tailwind CSS**: Rapid UI development via CDN.
- **Vanilla JavaScript**: Modular, clean, and refactored code without heavy frameworks.
- **TMDB API**: Serving high-quality movie data, posters, and trailers.
- **LocalStorage**: Persistence for user profile, wishlist, and purchase history.
- **FontAwesome**: Modern iconography via CDN.

## 📁 Project Structure

```text
/
├── assets/           # Icons and screenshots
├── components/       # Reusable UI components (Navbar, Modal, Toast)
├── js/               # Core logic (API, Storage, PWA, Page scripts)
├── index.html        # Home Page
├── detail.html       # Movie Details & Unlock Page
├── wishlist.html     # Favorites Page
├── history.html      # Purchase History Page
├── settings.html     # User Profile Page
├── manifest.json     # PWA Configuration
└── sw.js             # Service Worker for Offline Support
```

## 🚀 Getting Started

1. **Clone the repository**.
2. **API Key**: Obtain an API key from [TheMovieDB](https://www.themoviedb.org/settings/api).
3. **Setup**: Open `js/api.js` and replace the placeholder with your actual key.
4. **Run**: Simply open `index.html` in any modern web browser or serve it using a local development server.

## 📝 Credits

Dibuat oleh **Ghina Salsabila**, Bisnis Digital, Universitas Sugeng Hartono.
