# 🌸 DramaBloom

A modern, beautiful Progressive Web App (PWA) for exploring Chinese dramas with a premium pink aesthetic.

![DramaBloom](https://img.shields.io/badge/PWA-Ready-pink?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-pink?style=for-the-badge)

## ✨ Features

- 🎬 **Catalog of 12 Chinese Dramas** with detailed information
- 💖 **Favorites System** - Save your favorite dramas
- 🔍 **Real-time Search** - Find dramas instantly
- 🏷️ **Genre Filtering** - Browse by category (Youth, Romance, Fantasy)
- 📊 **Smart Sorting** - Sort by Latest or Trending
- 🎥 **YouTube Integration** - Watch drama trailers directly
- 💎 **Simulated Purchase Flow** - Demo of premium content access
- 📱 **Installable PWA** - Works offline and can be installed on mobile devices
- 🎨 **Modern Glassmorphism UI** - Beautiful frosted glass effects
- 💾 **State Persistence** - Your preferences are saved across sessions

## 🎨 Design Features

- **Soft Pink Gradient Background** - Dreamy and romantic aesthetic
- **Landscape Cards (16:9)** - Modern, premium card layout
- **Glassmorphism Effects** - Frosted glass with backdrop blur
- **Smooth Animations** - Polished hover and transition effects
- **Responsive Design** - Optimized for mobile viewing
- **Cute & Modern UI** - Perfect girly aesthetic

## 🛠️ Tech Stack

| Technology             | Purpose                  |
| ---------------------- | ------------------------ |
| HTML5                  | Structure & Semantics    |
| Tailwind CSS           | Styling Framework        |
| JavaScript ES6 Modules | Logic & State Management |
| Lucide Icons           | Icon Library             |
| LocalStorage           | Client-side Persistence  |
| Service Worker         | Offline Caching          |
| YouTube Embed API      | Video Playback           |

## 📂 Project Structure

```
dramabloom/
├── index.html              # Homepage
├── detail.html            # Drama detail page
├── favorites.html         # Favorites page
├── manifest.json          # PWA manifest
├── service-worker.js      # Offline caching
├── data/
│   └── dramas.js         # Drama catalog data
├── js/
│   ├── home.js           # Homepage logic
│   ├── detail.js         # Detail page logic
│   ├── favorites.js      # Favorites page logic
│   └── storage.js        # LocalStorage utilities
└── assets/
    ├── icon-192.svg      # PWA icon (192x192)
    ├── icon-512.svg      # PWA icon (512x512)
    └── pic*.jpg          # Drama thumbnails
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3 (for local development server)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/GhinaSalss/dramabloom.git
   cd dramabloom
   ```

2. **Start a local server**

   ```bash
   python3 -m http.server 8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

### PWA Installation (Mobile)

1. Open the app in your mobile browser
2. Tap the menu button (three dots)
3. Select "Add to Home Screen" or "Install App"
4. The app will be installed and can be used offline!

## 📱 Usage

### Homepage

- **Search**: Type in the search bar to filter dramas
- **Filter by Genre**: Select a genre from the dropdown
- **Sort**: Choose between "Latest" or "Trending"
- **Add to Favorites**: Click the heart icon on any card

### Detail Page

- **Watch Trailers**: Click "Tonton Sekarang" for free dramas
- **Purchase**: Simulate buying premium dramas
- **Toggle Favorite**: Save or remove from favorites

### Favorites Page

- View all your favorited dramas in one place
- Click any card to view details

## 🎯 Key Features Explained

### State Persistence

All your preferences are saved using LocalStorage:

- Favorite dramas
- Purchased dramas
- Search queries
- Filter selections
- Sort preferences

### Offline Support

The Service Worker caches all essential files, allowing the app to work even without an internet connection.

### Glassmorphism Design

Modern frosted glass effect achieved with:

- `backdrop-blur` CSS property
- Semi-transparent backgrounds
- Layered shadows and borders
- Gradient overlays

## 🌟 Screenshots

The app features a beautiful pink aesthetic with landscape drama cards, glassmorphism effects, and smooth animations throughout.

## 👩‍💻 Author

**Ghina Salsabila Santoso**  
Prodi Bisnis Digital  
Universitas Sugeng Hartono

## 📄 License

This project is licensed under the MIT License - feel free to use it for learning and portfolio purposes.

## 🙏 Acknowledgments

- Drama data and trailers from YouTube
- Icons from [Lucide Icons](https://lucide.dev/)
- Styling powered by [Tailwind CSS](https://tailwindcss.com/)

## 🔮 Future Enhancements

Potential features for future development:

- User authentication
- Review and rating system
- Watch history tracking
- Social sharing functionality
- Advanced filtering (year, rating, actors)
- Dark mode toggle
- Backend integration for real purchases

---

Made with 💖 for learning and portfolio development
