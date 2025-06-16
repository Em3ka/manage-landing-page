const primaryNav = document.getElementById('primary-nav');
const navToggle = document.querySelector('[aria-controls="primary-nav"]');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.footer__form');
const emailInputEl = document.getElementById('email');
const emailErrorEl = document.getElementById('error-email');

let currentError = '';
let resizeScheduled = false;
const MOBILE_BREAKPOINT = 870;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,4}$/;

new Glide('.glide', {
  type: 'carousel',
  perView: 3,
  autoplay: 4000,
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

const getErrorMessage = function () {
  const value = emailInputEl.value.trim();
  if (!value) return 'Email is required';
  if (!EMAIL_REGEX.test(value)) return 'Please insert a valid email';
  return '';
};

const setError = function (message) {
  if (!message) {
    emailErrorEl.textContent = '';
    emailErrorEl.setAttribute('aria-hidden', 'true');
    return;
  }

  emailErrorEl.textContent = message;
  emailErrorEl.removeAttribute('aria-hidden');
};

emailInputEl.addEventListener('input', () => {
  currentError = getErrorMessage();
  setError(currentError);
});

emailInputEl.addEventListener('blur', () => {
  currentError = getErrorMessage();
  setError(currentError);
});

form.addEventListener('submit', (e) => {
  if (currentError) {
    e.preventDefault();
    setError(currentError);
    return;
  }

  // Hurrah! form submitted 🎉
  setError('');
});

const isNavOpen = () => navToggle.getAttribute('aria-expanded') === 'true';

const updateOverlay = function (state) {
  overlay.toggleAttribute('hidden', !state);
  [document.body, document.documentElement].forEach((el) => {
    el.classList.toggle('no-scroll-y', state);
  });
};

navToggle.addEventListener('click', () => {
  const isExpanded = !isNavOpen();
  navToggle.setAttribute('aria-expanded', isExpanded);
  navToggle.setAttribute(
    'aria-label',
    isExpanded ? 'close main menu' : 'open main menu'
  );
  updateOverlay(isExpanded);
});

//Sync overlay state based on current viewport + nav state
const syncOverlay = function () {
  if (window.innerWidth >= MOBILE_BREAKPOINT) {
    updateOverlay(false); // always hide overlay on desktop
  } else {
    updateOverlay(isNavOpen()); // show overlay if nav is open on mobile
  }
};

const resizeObserver = new ResizeObserver(() => {
  if (!resizeScheduled) {
    resizeScheduled = true;
    document.body.classList.add('resizing');
    requestAnimationFrame(() => {
      syncOverlay();
      document.body.classList.remove('resizing');
      resizeScheduled = false;
    });
  }
});

resizeObserver.observe(document.documentElement);

// Disconnect the observer before page unload
window.addEventListener('beforeunload', () => {
  resizeObserver.disconnect();
});
