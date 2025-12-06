document.addEventListener("DOMContentLoaded", function() {
    // 1. Load Navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            // Tempelkan navbar ke elemen dengan id "navbar-placeholder"
            document.getElementById('navbar-placeholder').innerHTML = data;

            // 2. Inisialisasi Icon Lucide (Karena elemen baru ditambahkan)
            lucide.createIcons();

            // 3. Setup Mobile Menu (Logic dipindah kesini karena menunggu navbar dimuat dulu)
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            if(mobileMenuBtn){
                mobileMenuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // 4. Set Active Link (Mewarnai menu yang sedang aktif)
            setActiveLink();
        })
        .catch(error => console.error('Gagal memuat navbar:', error));

    // Update Tahun Footer
    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.innerText = new Date().getFullYear();
});

function setActiveLink() {
    // Ambil nama file saat ini (misal: index.html atau wisata.html)
    let currentPage = window.location.pathname.split("/").pop();
    
    // Jika kosong (halaman root), anggap index.html
    if (currentPage === "") currentPage = "index.html";

    // Cari semua link di navbar
    const links = document.querySelectorAll('.nav-link, .mobile-link');

    links.forEach(link => {
        // Ambil href dari link (misal: wisata.html)
        const linkPage = link.getAttribute('href');

        // Jika cocok dengan halaman saat ini
        if (linkPage === currentPage) {
            // Hapus kelas default (abu-abu)
            link.classList.remove('text-gray-600', 'hover:text-green-600');
            
            // Tambah kelas aktif (Hijau & Background Hijau Tipis)
            link.classList.add('text-green-700', 'bg-green-50');
        }
    });
}