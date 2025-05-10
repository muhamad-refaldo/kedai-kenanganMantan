// toggle class aktif hamburger
const navbarNav = document.querySelector
('.navbar-nav');

// ketika humberger di klik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};


const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const shoppingCart = document.querySelector('.shopping-cart')

// search
document.querySelector('#search-btn').onclick =(e) => {
    searchForm.classList.toggle('active');
    searchBox.focus()
    e.preventDefault();
}

// buat shoping cart
document.querySelector('#shopping-cart-btn').onclick =(e) => {
    shoppingCart.classList.toggle('active');
    shoppingCart.focus()
    e.preventDefault();
}
// menghilankan nav
const hamburger = document.querySelector
('#hamburger-menu');
const sb = document.querySelector('#search-btn');
const sc = document.querySelector('#shopping-cart-btn');

document.addEventListener('click', function(e) {
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active')
    }

    if(!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active')
    }

    if(!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active')
    }
});

// toggle clas active search

// modal box

// Pilih semua tombol detail produk
const itemDetailBtns = document.querySelectorAll('.item-detail-btn');
// Pilih semua elemen modal
const modals = document.querySelectorAll('.modal');

// Fungsi untuk menampilkan modal tertentu dan menyembunyikan modal lain
function showModal(modalId) {
    // Sembunyikan semua modal terlebih dahulu
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    // Cari modal berdasarkan ID
    const modal = document.getElementById(modalId);
    // Jika modal ditemukan, tampilkan
    if (modal) {
        modal.style.display = 'flex'; // Gunakan flex untuk centering
    }
}

// Event listener untuk setiap tombol detail
itemDetailBtns.forEach(btn => {
    btn.onclick = (e) => {
        // Ambil ID modal dari atribut data-modal
        const modalId = btn.dataset.modal;
        // Tampilkan modal yang sesuai
        showModal(modalId);
        // Cegah aksi default link (#)
        e.preventDefault();
    };
});

// Event listener untuk tombol close di setiap modal
document.querySelectorAll('.modal .close-item').forEach(closeBtn => {
    closeBtn.onclick = (e) => {
        // Temukan modal terdekat dari tombol close
        const modal = closeBtn.closest('.modal');
        // Jika modal ditemukan, sembunyikan
        if (modal) {
            modal.style.display = 'none';
        }
        // Cegah aksi default link (#)
        e.preventDefault();
    };
});

// Event listener untuk menutup modal ketika diklik di luar modal-container
window.onclick = (e) => {
    // Jika target klik memiliki class 'modal' (yaitu area overlay di luar container)
    if (e.target.classList.contains('modal')) {
        // Sembunyikan modal yang diklik
        e.target.style.display = 'none';
    }
};
