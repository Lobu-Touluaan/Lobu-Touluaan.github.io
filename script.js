// --- 1. DATA DESA (DATABASE SIMULASI) ---
const initialData = {
    hero: {
        title: "Selamat Datang di Desa Lobu",
        subtitle: "Menikmati Keindahan Alam, Sejarah, dan Kearifan Lokal.",
        image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1473&auto=format&fit=crop"
    },
    sejarah: {
        title: "Sejarah Desa Lobu",
        content: "Desa Lobu didirikan pada tahun 1920 oleh para leluhur yang membuka lahan pertanian di lembah subur ini. Nama 'Lobu' diambil dari bahasa lokal yang berarti 'Lumbung'. Seiring berjalannya waktu, Desa Lobu berkembang dari pemukiman petani sederhana menjadi desa wisata yang menjunjung tinggi adat istiadat.",
        image: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=1469&auto=format&fit=crop"
    },
    wisata: [
        { id: 1, title: "Air Terjun Lobu Asri", desc: "Air terjun setinggi 20 meter dengan kolam alami yang jernih.", image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1470&auto=format&fit=crop" },
        { id: 2, title: "Bukit Pandang Senja", desc: "Spot terbaik untuk melihat matahari terbenam dan hamparan sawah.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&auto=format&fit=crop" },
        { id: 3, title: "Kampung Budaya Tua", desc: "Area pelestarian rumah adat dan kerajinan tangan warga lokal.", image: "https://images.unsplash.com/photo-1596401057633-565652ca65a0?q=80&w=1470&auto=format&fit=crop" }
    ],
    komoditas: [
        { id: 1, title: "Kopi Robusta Lobu", desc: "Kopi dengan cita rasa khas tanah vulkanik, dipetik merah.", icon: "coffee" },
        { id: 2, title: "Cengkeh Super", desc: "Komoditas unggulan yang telah diekspor ke berbagai daerah.", icon: "flower" },
        { id: 3, title: "Gula Aren Murni", desc: "Diproduksi secara tradisional tanpa bahan pengawet.", icon: "package" }
    ]
};

// State Aplikasi
let appData = initialData;
let currentTab = 'beranda';
let isAdmin = false;
let editTarget = null; // Menyimpan info apa yang sedang diedit

// --- 2. FUNGSI NAVIGASI & RENDER ---

function navigate(tabName) {
    currentTab = tabName;
    
    // Update Active Link Styling
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('text-green-700', 'bg-green-50');
        btn.classList.add('text-gray-600');
        if(btn.innerText.toLowerCase() === tabName) {
            btn.classList.remove('text-gray-600');
            btn.classList.add('text-green-700', 'bg-green-50');
        }
    });

    // Tutup mobile menu jika terbuka
    document.getElementById('mobile-menu').classList.add('hidden');

    renderPage();
}

// --- FUNGSI MOBILE MENU ---
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Toggle class 'hidden' (jika ada dihapus, jika tidak ada ditambahkan)
    mobileMenu.classList.toggle('hidden');
}

function renderPage() {
    const container = document.getElementById('app-content');
    let html = '';

    switch(currentTab) {
        case 'beranda':
            html = `
            <div class="fade-in relative h-[500px] flex items-center justify-center text-center text-white">
                <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('${appData.hero.image}')">
                    <div class="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                <div class="relative z-10 px-4 max-w-4xl mx-auto">
                    <div class="relative inline-block">
                        <h1 class="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">${appData.hero.title}</h1>
                        <button onclick="openEdit('hero')" class="admin-only absolute -top-6 -right-6 bg-white text-gray-800 p-2 rounded-full shadow hover:bg-gray-100">
                            <i data-lucide="edit-2" class="h-4 w-4"></i>
                        </button>
                    </div>
                    <p class="text-xl md:text-2xl mb-8 font-light drop-shadow-md block">${appData.hero.subtitle}</p>
                    <button onclick="navigate('wisata')" class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105 shadow-lg">Jelajahi Desa</button>
                </div>
            </div>
            <div class="bg-white py-12">
                <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div class="p-6 bg-green-50 rounded-xl">
                        <i data-lucide="mountain" class="h-10 w-10 text-green-600 mx-auto mb-4"></i>
                        <h3 class="text-lg font-bold mb-2">Alam Asri</h3>
                        <p class="text-gray-600">Udara sejuk dan pemandangan hijau.</p>
                    </div>
                    <div class="p-6 bg-green-50 rounded-xl">
                        <i data-lucide="history" class="h-10 w-10 text-green-600 mx-auto mb-4"></i>
                        <h3 class="text-lg font-bold mb-2">Kaya Sejarah</h3>
                        <p class="text-gray-600">Nilai historis yang dijaga turun-temurun.</p>
                    </div>
                    <div class="p-6 bg-green-50 rounded-xl">
                        <i data-lucide="leaf" class="h-10 w-10 text-green-600 mx-auto mb-4"></i>
                        <h3 class="text-lg font-bold mb-2">Tanah Subur</h3>
                        <p class="text-gray-600">Hasil bumi melimpah kualitas unggul.</p>
                    </div>
                </div>
            </div>`;
            break;

        case 'sejarah':
            html = `
            <div class="fade-in max-w-7xl mx-auto px-4 py-16">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div class="relative">
                        <img src="${appData.sejarah.image}" class="rounded-lg shadow-xl w-full h-96 object-cover">
                        <div class="absolute -bottom-6 -right-6 bg-yellow-100 p-4 rounded-lg shadow-lg hidden md:block border-2 border-white">
                            <p class="text-yellow-800 font-bold text-xl">Est. 1920</p>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between items-start mb-6">
                            <h2 class="text-3xl font-bold text-green-800">${appData.sejarah.title}</h2>
                            <button onclick="openEdit('sejarah')" class="admin-only text-green-600 hover:bg-green-50 p-2 rounded-full"><i data-lucide="edit-2" class="h-5 w-5"></i></button>
                        </div>
                        <p class="text-gray-600 text-lg leading-relaxed mb-6">${appData.sejarah.content}</p>
                        <div class="border-l-4 border-green-500 pl-4 italic text-gray-500">"Merawat masa lalu untuk masa depan."</div>
                    </div>
                </div>
            </div>`;
            break;

        case 'wisata':
            html = `
            <div class="fade-in bg-green-50 py-16 min-h-screen">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-green-800">Potensi Wisata</h2>
                        <p class="text-gray-600 mt-2">Destinasi favorit di Desa Lobu</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${appData.wisata.map(item => `
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden relative group hover:shadow-2xl transition duration-300">
                                <div class="h-48 overflow-hidden">
                                    <img src="${item.image}" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                                </div>
                                <div class="p-6">
                                    <h3 class="text-xl font-bold text-gray-800 mb-2">${item.title}</h3>
                                    <p class="text-gray-600 text-sm mb-4">${item.desc}</p>
                                    <button class="text-green-600 font-semibold text-sm flex items-center">Lihat Detail <i data-lucide="chevron-right" class="h-4 w-4 ml-1"></i></button>
                                </div>
                                <button onclick="openEdit('wisata', ${item.id})" class="admin-only absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 text-gray-800"><i data-lucide="edit-2" class="h-4 w-4"></i></button>
                            </div>
                        `).join('')}
                        <div class="admin-only border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-8 text-gray-400 hover:border-green-500 hover:text-green-500 cursor-pointer transition-colors bg-white bg-opacity-50">
                            <i data-lucide="plus" class="h-12 w-12 mb-2"></i>
                            <span class="font-medium">Tambah Wisata</span>
                        </div>
                    </div>
                </div>
            </div>`;
            break;

        case 'komoditas':
            html = `
            <div class="fade-in max-w-7xl mx-auto px-4 py-16">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-green-800">Komoditas Unggulan</h2>
                    <p class="text-gray-600 mt-2">Produk asli hasil bumi masyarakat</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${appData.komoditas.map(item => `
                        <div class="border border-green-100 rounded-lg p-6 hover:bg-green-50 transition-colors relative">
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                                <i data-lucide="${item.icon}" class="h-6 w-6"></i>
                            </div>
                            <h3 class="text-lg font-bold text-gray-800 mb-2">${item.title}</h3>
                            <p class="text-gray-600 text-sm">${item.desc}</p>
                            <button onclick="openEdit('komoditas', ${item.id})" class="admin-only absolute top-4 right-4 text-gray-400 hover:text-green-600"><i data-lucide="edit-2" class="h-4 w-4"></i></button>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-12 bg-green-800 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-xl">
                    <div class="mb-6 md:mb-0">
                        <h3 class="text-2xl font-bold mb-2">Tertarik produk kami?</h3>
                        <p class="text-green-100">Dukung petani lokal dengan membeli produk asli desa.</p>
                    </div>
                    <button class="bg-white text-green-800 font-bold py-3 px-6 rounded-lg hover:bg-green-50 transition">Hubungi BUMDes</button>
                </div>
            </div>`;
            break;

        case 'kontak':
            html = `
            <div class="fade-in max-w-4xl mx-auto px-4 py-16">
                <h2 class="text-3xl font-bold text-center text-green-800 mb-10">Hubungi Kami</h2>
                <div class="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
                    <div class="bg-green-700 p-8 text-white md:w-1/3">
                        <h3 class="text-xl font-bold mb-6">Kantor Desa</h3>
                        <div class="space-y-6">
                            <div class="flex items-start"><i data-lucide="map-pin" class="h-5 w-5 mr-3 mt-1"></i><p class="text-sm">Jl. Raya Desa Lobu No. 1</p></div>
                            <div class="flex items-center"><i data-lucide="phone" class="h-5 w-5 mr-3"></i><p class="text-sm">+62 812 3456 7890</p></div>
                            <div class="flex items-center"><i data-lucide="mail" class="h-5 w-5 mr-3"></i><p class="text-sm">admin@desalobu.id</p></div>
                        </div>
                    </div>
                    <div class="p-8 md:w-2/3">
                        <form onsubmit="event.preventDefault(); alert('Pesan terkirim!');" class="space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div><label class="text-sm font-medium">Nama</label><input type="text" class="mt-1 w-full rounded border-gray-300 border p-2 bg-gray-50"></div>
                                <div><label class="text-sm font-medium">Email</label><input type="email" class="mt-1 w-full rounded border-gray-300 border p-2 bg-gray-50"></div>
                            </div>
                            <div><label class="text-sm font-medium">Pesan</label><textarea class="mt-1 w-full rounded border-gray-300 border p-2 bg-gray-50 h-32"></textarea></div>
                            <button class="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition">Kirim Pesan</button>
                        </form>
                    </div>
                </div>
            </div>`;
            break;
    }

    container.innerHTML = html;
    lucide.createIcons(); // Refresh icons
}

// --- 3. FITUR ADMIN & EDIT ---

// DATABASE ADMIN (Array: Menyimpan banyak akun)
let adminList = [
    { username: "admin", password: "123" } // Akun bawaan
];

// Toggle Masuk/Keluar Mode Admin
function toggleAdminMode() {
    if (isAdmin) {
        performLogout();
    } else {
        openLoginModal();
    }
}

// --- LOGIKA LOGIN (MASUK) ---
function openLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    // Reset form
    document.getElementById('login-user').value = '';
    document.getElementById('login-pass').value = '';
    document.getElementById('login-user').focus();
}

function closeLoginModal() {
    document.getElementById('login-modal').classList.add('hidden');
    document.getElementById('login-modal').classList.remove('flex');
}

function processLogin() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    // Cek apakah username & password ada di dalam daftar adminList
    const foundAdmin = adminList.find(data => data.username === user && data.password === pass);

    if (foundAdmin) {
        isAdmin = true;
        updateAdminUI();
        closeLoginModal();
        alert(`Login Berhasil! Selamat datang, ${foundAdmin.username}.`);
    } else {
        alert("Username atau Password salah!");
        document.getElementById('login-pass').value = '';
        document.getElementById('login-pass').focus();
    }
}

function performLogout() {
    if (confirm("Apakah Anda yakin ingin keluar dari Mode Admin?")) {
        isAdmin = false;
        updateAdminUI();
        // Sembunyikan mobile menu jika sedang terbuka agar rapi
        document.getElementById('mobile-menu').classList.add('hidden');
    }
}

// --- LOGIKA TAMBAH ADMIN BARU ---
function openAddAdminModal() {
    const modal = document.getElementById('add-admin-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    // Reset form
    document.getElementById('new-admin-user').value = '';
    document.getElementById('new-admin-pass').value = '';
    document.getElementById('new-admin-user').focus();
}

function closeAddAdminModal() {
    document.getElementById('add-admin-modal').classList.add('hidden');
    document.getElementById('add-admin-modal').classList.remove('flex');
}

function addNewAdmin() {
    const newUser = document.getElementById('new-admin-user').value;
    const newPass = document.getElementById('new-admin-pass').value;

    // Validasi 1: Cek apakah username sudah dipakai
    const isExist = adminList.some(data => data.username === newUser);
    if (isExist) {
        alert("Username ini sudah digunakan! Silakan pilih yang lain.");
        return;
    }

    // Validasi 2: Minimal karakter
    if (newUser.length < 3 || newPass.length < 3) {
        alert("Username dan Password minimal 3 karakter.");
        return;
    }

    // Simpan ke Array
    adminList.push({ username: newUser, password: newPass });

    closeAddAdminModal();
    alert(`Sukses! Admin '${newUser}' telah ditambahkan. Silakan coba login dengan akun baru tersebut.`);
    
    // (Opsional) Cek di console browser untuk memastikan data masuk
    console.log("Database Admin Terkini:", adminList);
}

// --- FUNGSI UI & EDIT KONTEN ---

function updateAdminUI() {
    const body = document.body;
    const btn = document.getElementById('admin-btn');
    
    if (isAdmin) {
        // Mode Admin AKTIF
        body.classList.add('admin-active'); // Class ini memunculkan tombol edit & tambah admin
        btn.classList.remove('bg-gray-800');
        btn.classList.add('bg-red-600', 'hover:bg-red-700');
        btn.innerHTML = `<i data-lucide="unlock" class="h-4 w-4"></i> Keluar Admin`;
    } else {
        // Mode User BIASA
        body.classList.remove('admin-active');
        btn.classList.remove('bg-red-600', 'hover:bg-red-700');
        btn.classList.add('bg-gray-800');
        btn.innerHTML = `<i data-lucide="lock" class="h-4 w-4"></i> Masuk Admin`;
    }
    lucide.createIcons(); // Refresh ikon agar tampil
}

function openEdit(section, id = null) {
    editTarget = { section, id };
    const modal = document.getElementById('edit-modal');
    const titleInput = document.getElementById('modal-title');
    const descInput = document.getElementById('modal-desc');

    let data;
    if (id) {
        data = appData[section].find(item => item.id === id);
    } else {
        data = appData[section];
    }

    titleInput.value = data.title;
    if (section === 'hero') descInput.value = data.subtitle;
    else if (section === 'sejarah') descInput.value = data.content;
    else descInput.value = data.desc;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() { // Menutup modal EDIT KONTEN
    document.getElementById('edit-modal').classList.add('hidden');
    document.getElementById('edit-modal').classList.remove('flex');
    editTarget = null;
}

function saveChanges() {
    if (!editTarget) return;

    const newTitle = document.getElementById('modal-title').value;
    const newDesc = document.getElementById('modal-desc').value;
    const { section, id } = editTarget;

    if (id) {
        const index = appData[section].findIndex(item => item.id === id);
        if (index !== -1) {
            appData[section][index].title = newTitle;
            appData[section][index].desc = newDesc;
        }
    } else {
        appData[section].title = newTitle;
        if (section === 'hero') appData[section].subtitle = newDesc;
        else if (section === 'sejarah') appData[section].content = newDesc;
    }

    closeModal();
    renderPage();
    alert('Perubahan konten berhasil disimpan!');
}

// --- 4. INISIALISASI ---
document.getElementById('year').innerText = new Date().getFullYear();

// Render halaman pertama kali
renderPage();