// Inisialisasi Icon Lucide
lucide.createIcons();

// Update Tahun di Footer otomatis
document.getElementById('year').innerText = new Date().getFullYear();

// Fungsi Toggle Menu Mobile
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if(mobileMenuBtn){
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}