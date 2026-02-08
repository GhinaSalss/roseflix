const Toast = {
  show(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `fixed top-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full shadow-2xl backdrop-blur-xl border flex items-center gap-3 animate-in slide-in-from-top-10 duration-500 ${
      type === "success"
        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
        : "bg-rose-500/20 border-rose-500/50 text-rose-400"
    }`;

    const icon =
      type === "success" ? "fa-check-circle" : "fa-exclamation-circle";

    toast.innerHTML = `
            <i class="fas ${icon} text-lg"></i>
            <span class="text-sm font-semibold">${message}</span>
        `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("animate-out", "fade-out", "slide-out-to-top-10");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  },
};

export default Toast;
