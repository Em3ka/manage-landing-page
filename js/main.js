const navToggle = document.querySelector('[aria-controls="primary-nav"]');
const overlay = document.querySelector('.overlay');
const primaryNav = document.getElementById('primary-nav');
const MOBILE_BREAKPOINT = 870;

new Glide('.glide', {
  type: 'carousel',
  perView: 3,
  autoplay: 3000,
  animationDuration: 800,
  gap: 30,
  peek: { before: -120, after: -120 },
  breakpoints: {
    1110: {
      perView: 2,
      peek: 0,
    },

    870: {
      perView: 1,
      peek: 0,
    },
  },
}).mount();

const setOverlayState = function (state) {
  overlay.toggleAttribute('hidden', state);
  [document.body, document.documentElement].forEach((el) => {
    el.classList.toggle('no-scroll-y', !state);
  });
};

navToggle.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !isExpanded);
  navToggle.setAttribute(
    'aria-label',
    !isExpanded ? 'close main menu' : 'open main menu'
  );
  setOverlayState(isExpanded);
});

const resizeObserver = new ResizeObserver(() => {
  document.body.classList.add('resizing');
  const isNavOpen = navToggle.getAttribute('aria-expanded') === 'true';

  // Desktop: no overlay needed when nav is open
  if (window.innerWidth >= MOBILE_BREAKPOINT && isNavOpen) {
    setOverlayState(isNavOpen);
  }

  // Mobile: show overlay when nav is open to block background scrolling
  if (window.innerWidth < MOBILE_BREAKPOINT && isNavOpen) {
    setOverlayState(!isNavOpen);
  }

  requestAnimationFrame(() => {
    document.body.classList.remove('resizing');
  });
});

resizeObserver.observe(document.body);
