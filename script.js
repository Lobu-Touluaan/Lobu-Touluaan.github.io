// Inisialisasi Icon Lucide
lucide.createIcons();


// Fungsi Toggle Menu Mobile
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if(mobileMenuBtn && mobileMenu){
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Logic Slider Sederhana
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        // Reset index jika melebihi batas (Looping)
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Loop semua slide untuk mengatur visibility
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.remove('opacity-0', 'z-0');
                slide.classList.add('opacity-100', 'z-10');
            } else {
                slide.classList.remove('opacity-100', 'z-10');
                slide.classList.add('opacity-0', 'z-0');
            }
        });

        // Update indikator dots (jika ada)
        if(dots.length > 0) {
            dots.forEach((dot, i) => {
                if (i === currentSlide) {
                    dot.classList.remove('bg-white/50');
                    dot.classList.add('bg-white', 'opacity-100');
                } else {
                    dot.classList.add('bg-white/50');
                    dot.classList.remove('bg-white', 'opacity-100');
                }
            });
        }
    }

    // Fungsi dipanggil oleh tombol panah
    function changeSlide(direction) {
        showSlide(currentSlide + direction);
    }