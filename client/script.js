const closeButton = document.querySelector('#close-menu')
const mobileMenu = document.querySelector('.header-hidden-desktop')

closeButton.addEventListener('click', () => {
    closeButton.classList.toggle('open')
    mobileMenu.classList.toggle('open')
})