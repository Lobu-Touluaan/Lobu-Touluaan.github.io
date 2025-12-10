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
