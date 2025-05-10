// toggle class aktif
const navbarNav = document.querySelector
('.navbar-nav');

// ketika humberger di klik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// menghilankan nav
const hamburger = document.querySelector
('#hamburger-menu');

document.addEventListener('click', function(e) {
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active')
    }
});