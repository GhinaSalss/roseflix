const Navbar = {
  render(activeTab) {
    const nav = document.createElement("nav");
    nav.className =
      "fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/40 backdrop-blur-xl border border-white/20 rounded-full h-18 flex items-center justify-around px-6 z-50 shadow-2xl";

    const tabs = [
      { id: "film", icon: "fa-film", label: "Films", link: "index.html" },
      {
        id: "wishlist",
        icon: "fa-heart",
        label: "Wishlist",
        link: "wishlist.html",
      },
      {
        id: "history",
        icon: "fa-history",
        label: "History",
        link: "history.html",
      },
      {
        id: "settings",
        icon: "fa-cog",
        label: "Settings",
        link: "settings.html",
      },
    ];

    nav.innerHTML = tabs
      .map(
        (tab) => `
            <a href="${tab.link}" class="flex flex-col py-2 items-center justify-center space-y-1 transition-all duration-300 ${activeTab === tab.id ? "text-pink-500 scale-110" : "text-gray-900 opacity-60 hover:opacity-100"}">
                <div class="relative">
                    <i class="fas ${tab.icon} text-lg"></i>
                </div>
                <span class="text-[10px] font-medium uppercase tracking-wider">${tab.label}</span>
            </a>
        `,
      )
      .join("");

    document.body.appendChild(nav);
  },
};

export default Navbar;
