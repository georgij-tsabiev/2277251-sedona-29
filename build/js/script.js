/* Мобильная навигация */

let nav = document.querySelector('.nav');
let navToggle = document.querySelector('.nav__toggle');
let navListWrapper = document.querySelector('.nav__list-wrapper');

nav.classList.remove("nav--no-js");
navToggle.classList.remove('nav__toggle--no-js');

navToggle.addEventListener('click', function () {
  if (nav.classList.contains('nav--closed')) {
    nav.classList.remove('nav--closed');
    nav.classList.add('nav--opened');
  } else {
    nav.classList.add('nav--closed');
    nav.classList.remove('nav--opened');
  }
});

/* Модальное окно */

const modal = document.querySelector('.modal');
const btn = document.querySelector('.review-form__send-review-button');
const closeBtn = Array.from(document.querySelectorAll('.modal__close-button'));

btn.addEventListener('click', (evt) => {
  modal.style.display = "flex";
});

closeBtn.forEach(closeBtn => {
  closeBtn.addEventListener('click', (event) => {
    modal.style.display = "none";
  });
});

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    modal.style.display = "none";
  }
});
