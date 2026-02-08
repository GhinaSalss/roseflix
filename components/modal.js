const Modal = {
  showPayment(movie, price, onPay) {
    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300";
    modal.id = "payment-modal";

    modal.innerHTML = `
            <div class="bg-gray-900/90 border border-white/10 backdrop-blur-2xl w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-white">Unlock Trailer</h3>
                    <button onclick="document.getElementById('payment-modal').remove()" class="text-gray-400 hover:text-white transition-colors">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>

                <div class="mb-6 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="w-16 h-24 object-cover rounded-xl shadow-lg" alt="${movie.title}">
                    <div>
                        <p class="text-xs text-pink-500 font-semibold uppercase tracking-wider mb-1">Payment for</p>
                        <h4 class="text-white font-bold leading-tight">${movie.title}</h4>
                        <p class="text-lg font-black text-white mt-1">${price}</p>
                    </div>
                </div>

                <form id="payment-form" class="space-y-4">
                    <div>
                        <label class="block text-xs font-medium text-gray-400 mb-2 ml-1">Full Name</label>
                        <input type="text" required placeholder="Alex Rivera" class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-pink-500 transition-colors">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-400 mb-2 ml-1">Email Address</label>
                        <input type="email" required placeholder="alex@gmail.com" class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-pink-500 transition-colors">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-400 mb-2 ml-1">Payment Method</label>
                        <div class="grid grid-cols-2 gap-3">
                            ${["Debit Card", "ShopeePay", "QRIS", "Dana"]
                              .map(
                                (method) => `
                                <label class="relative flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors has-[:checked]:border-pink-500 has-[:checked]:bg-pink-500/10">
                                    <input type="radio" name="paymentMethod" value="${method}" class="hidden" required>
                                    <span class="text-xs text-white">${method}</span>
                                </label>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>

                    <button type="submit" id="pay-button" class="w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_-10px_#ec4899] transition-all active:scale-95 flex items-center justify-center gap-2 mt-4">
                        Pay Now
                    </button>
                </form>
            </div>
        `;

    document.body.appendChild(modal);

    modal.querySelector("#payment-form").onsubmit = (e) => {
      e.preventDefault();
      const btn = modal.querySelector("#pay-button");
      const data = new FormData(e.target);
      const method = data.get("paymentMethod");

      btn.disabled = true;
      btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processing Payment...`;

      setTimeout(() => {
        onPay(method);
        modal.remove();
      }, 2000);
    };
  },

  showTrailer(videoId) {
    const modal = document.createElement("div");

    modal.className =
      "fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300";

    modal.id = "trailer-modal";

    modal.innerHTML = `
    <!-- Overlay -->
    <div class="absolute inset-0 overlay"></div>

    <!-- Wrapper -->
    <div class="relative w-full max-w-4xl z-50">

      <!-- Close Button Row (Right aligned) -->
      <div class="flex justify-end mb-4">
        <button
          class="close-btn
          w-12 h-12 rounded-full
          bg-white/10 border border-white/20
          backdrop-blur-xl
          flex items-center justify-center
          text-white hover:text-pink-400
          hover:bg-pink-500/20
          transition-all active:scale-95"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>

      <!-- Video Frame -->
      <div
        class="w-full aspect-video rounded-3xl overflow-hidden
        border border-white/10 shadow-2xl glass"
      >
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/${videoId}?autoplay=1"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  `;

    document.body.appendChild(modal);

    // ✅ Close function
    const closeModal = () => modal.remove();

    // ✅ Button close
    modal.querySelector(".close-btn").onclick = closeModal;

    // ✅ Click outside closes
    modal.querySelector(".overlay").onclick = closeModal;

    // ❌ Prevent inside click from closing
    modal.querySelector(".glass").onclick = (e) => e.stopPropagation();
  },
};

export default Modal;
