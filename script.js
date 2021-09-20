'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();

if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      console.log(id);
      document.querySelector(id).scrollIntoView({behavior: 'smooth'});
};
});

// Tabbed component 

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  
  // Guard clause
  if (!clicked) return;

  // Removing active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tab => tab.classList.remove('operations__content--active'))

  //Active tab and content area
  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})



// Menu fade animation

const nav = document.querySelector('.nav');


const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    
    siblings.forEach( el => {
      if (el !== link) 
        el.style.opacity = this;
    })
      logo.style.opacity = this;
      }
}


// Passing 'argument' into handler

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));



// The intersection observer API for sticky navigation

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;


const stickyNav = function(entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(header);


 // The intersection observer API for section reveal

const allSections = document.querySelectorAll('.section');

const revealSection = function( entries, observer) {
   const [entry] = entries;
  //  console.log(entry);

   if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
   };


const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach( function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


// The intersection observer API for lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replacing src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0
});

imgTargets.forEach( img => imgObserver.observe(img));



// Slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currSlide = 0;
const maxSlide = slides.length -1;
console.log(maxSlide);


const goToSlide = function(slide) {
  slides.forEach((slide, i) => (slide.style.transform = `translateX(${(i - currSlide) *100}%)`));
};

goToSlide(0);

// Next slide 

const nextSlide = function() {
  if (currSlide === maxSlide) {
    currSlide = 0;
  } else {
    currSlide++;
  }
goToSlide(currSlide);
}

const prevSlide = function() {
  if (currSlide === 0) {
    currSlide = maxSlide
  } else {
  currSlide--;
  }
  goToSlide(currSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);