import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  ArrowUp,
  Calendar,
  CalendarClock,
  CheckCircle,
  ChevronRight,
  Clock,
  ExternalLink,
  Mail,
  Map,
  MapPin,
  Menu,
  Phone,
  PhoneCall,
  Plus,
  ScanLine,
  Star,
  Tag,
  X,
  createIcons,
} from 'lucide';

const iconSet = {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  ArrowUp,
  Calendar,
  CalendarClock,
  CheckCircle,
  ChevronRight,
  Clock,
  ExternalLink,
  Mail,
  Map,
  MapPin,
  Menu,
  Phone,
  PhoneCall,
  Plus,
  ScanLine,
  Star,
  Tag,
  X,
};

document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('main');
  if (mainContent) {
    if (!mainContent.id) mainContent.id = 'main-content';
    mainContent.tabIndex = -1;
  }

  // 1. Lucide icons
  createIcons({ icons: iconSet });

  // 2. Nav scroll behavior
  const nav = document.getElementById('main-nav');
  if (nav) {
    const updateNav = () => {
      const isHome =
        window.location.pathname === '/' ||
        window.location.pathname === '/index' ||
        window.location.pathname === '/index.html';
      const shouldBeScrolled = window.scrollY > 50 || !isHome;

      if (shouldBeScrolled) {
        nav.classList.add('scrolled');
        nav.classList.remove('text-white', 'py-5');
        nav.classList.add('py-3');
      } else {
        nav.classList.remove('scrolled');
        nav.classList.add('text-white', 'py-5');
        nav.classList.remove('py-3');
      }
    };

    // Ustaw odpowiedni stan od razu po załadowaniu strony
    updateNav();
    window.addEventListener('scroll', updateNav);
  }

  // 3. Mobile menu (drawer z prawej; belka nawigacji zostaje nad panelem)
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  let isMenuOpen = false;

  function refreshIcons() {
    createIcons({ icons: iconSet });
  }

  function setMenuOpen(open, restoreFocus = true) {
    if (!menuBtn || !mobileMenu) return;
    isMenuOpen = open;
    if (open) {
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      mobileMenu.inert = false;
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden');
      menuBtn.innerHTML = '<i data-lucide="x" class="w-8 h-8"></i>';
      window.setTimeout(() => {
        mobileMenu.querySelector('.mobile-link')?.focus();
      }, 50);
    } else {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.inert = true;
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
      menuBtn.innerHTML = '<i data-lucide="menu" class="w-8 h-8"></i>';
      if (restoreFocus) menuBtn.focus();
    }
    refreshIcons();
  }

  function toggleMenu() {
    if (!menuBtn || !mobileMenu) return;
    setMenuOpen(!isMenuOpen);
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', () => {
        if (isMenuOpen) setMenuOpen(false);
      });
    }
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (isMenuOpen) setMenuOpen(false, false);
      });
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) setMenuOpen(false);
      if (e.key === 'Tab' && isMenuOpen) {
        const focusable = [...mobileMenu.querySelectorAll('a[href], button:not([disabled])')]
          .filter((element) => element instanceof HTMLElement && element.tabIndex >= 0);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // 4. Doctor photo observer (if used)
  const doctorImg = document.getElementById('doctor-img');
  if (doctorImg && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { root: null, threshold: 0.5 }
    );
    observer.observe(doctorImg);
  }

  // 5. Mapa Google — ładowana wyłącznie po świadomym kliknięciu użytkownika.
  const loadMapBtn = document.getElementById('load-map-btn');
  const mapContainer = document.getElementById('map-container');

  const MAP_IFRAME_HTML =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2489.349635741639!2d16.2007481!3d51.3907722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470f1359c63c5d6f%3A0xc3c9f8016594270b!2sPawia%2067%2C%2059-300%20Lubin!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl" class="w-full h-full border-0 absolute inset-0 rounded-[2rem]" allowfullscreen="" loading="lazy"></iframe>';

  function loadGoogleMap() {
    if (mapContainer && !mapContainer.querySelector('iframe')) {
      mapContainer.innerHTML = MAP_IFRAME_HTML;
    }
  }

  if (loadMapBtn) {
    loadMapBtn.addEventListener('click', loadGoogleMap);
  }

  // 6. Before/after slider
  const sliders = document.querySelectorAll('.ba-container');
  sliders.forEach((slider) => {
    let isDown = false;
    const beforeLayer = slider.querySelector('.ba-before');
    const handle = slider.querySelector('.ba-slider-handle');
    if (!beforeLayer || !handle) return;

    const setSliderPercent = (value) => {
      const percent = Math.max(0, Math.min(value, 100));
      beforeLayer.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      handle.style.left = `${percent}%`;
      slider.setAttribute('aria-valuenow', String(Math.round(percent)));
      slider.setAttribute('aria-valuetext', `${Math.round(percent)}% zdjęcia przed leczeniem`);
    };

    const moveSlider = (e) => {
      if (!isDown) return;
      const rect = slider.getBoundingClientRect();
      const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
      if (clientX == null) return;
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      setSliderPercent((x / rect.width) * 100);
    };

    const startSlide = (e) => {
      isDown = true;
      handle.style.transform = 'translate(-50%, -50%) scale(0.9)';
      moveSlider(e);
    };

    const endSlide = () => {
      isDown = false;
      handle.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    slider.addEventListener('mousedown', startSlide);
    slider.addEventListener('touchstart', startSlide, { passive: true });
    window.addEventListener('mouseup', endSlide);
    window.addEventListener('touchend', endSlide);
    window.addEventListener('mousemove', (e) => {
      if (isDown) moveSlider(e);
    });
    window.addEventListener(
      'touchmove',
      (e) => {
        if (isDown) moveSlider(e);
      },
      { passive: true }
    );
    slider.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const current = Number(slider.getAttribute('aria-valuenow')) || 50;
      if (event.key === 'Home') setSliderPercent(0);
      if (event.key === 'End') setSliderPercent(100);
      if (event.key === 'ArrowLeft') setSliderPercent(current - 5);
      if (event.key === 'ArrowRight') setSliderPercent(current + 5);
    });
  });

  // 7. Back to top
  const processTabButtons = document.querySelectorAll('.process-tab-btn');
  const processTabContents = document.querySelectorAll('.process-tab-content');
  if (processTabButtons.length && processTabContents.length) {
    processTabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        if (!target) return;

        processTabButtons.forEach((button) => {
          const active = button === btn;
          button.classList.toggle('is-active', active);
          button.classList.toggle('bg-brand-gold', active);
          button.classList.toggle('border-brand-gold', active);
          button.classList.toggle('text-white', active);
          button.classList.toggle('text-brand-steel', !active);
          button.classList.toggle('bg-white', !active);
          button.classList.toggle('border', !active);
          button.classList.toggle('border-gray-200', !active);
          button.setAttribute('aria-selected', active ? 'true' : 'false');
          button.tabIndex = active ? 0 : -1;
        });

        processTabContents.forEach((panel) => {
          const shouldShow = panel.id === `timeline-${target}`;
          panel.classList.toggle('is-active', shouldShow);
          panel.classList.toggle('hidden', !shouldShow);
        });
      });
      btn.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const buttons = [...processTabButtons];
        const currentIndex = buttons.indexOf(btn);
        let nextIndex = currentIndex;
        if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % buttons.length;
        if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = buttons.length - 1;
        buttons[nextIndex].focus();
        buttons[nextIndex].click();
      });
    });
  }

  // 7b. FAQ accordion — tylko jedno otwarte <details> naraz
  const faqRoot = document.getElementById('faq');
  if (faqRoot) {
    const faqDetails = faqRoot.querySelectorAll('details');
    faqDetails.forEach((detail) => {
      detail.addEventListener('toggle', () => {
        if (!detail.open) return;
        faqDetails.forEach((other) => {
          if (other !== detail) other.open = false;
        });
      });
    });
  }

  // 8. Back to top (hidden at top; show after scroll — lower threshold on mobile)
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    const backToTopThreshold = () => (window.matchMedia('(max-width: 767px)').matches ? 120 : 380);

    const updateBackToTop = () => {
      if (window.scrollY > backToTopThreshold()) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    updateBackToTop();
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    window.addEventListener('resize', updateBackToTop, { passive: true });
    backToTopBtn.addEventListener('click', () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  // 9. Contact form validation
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const showFormFeedback = (type, message) => {
    const icon = type === 'success' ? 'check-circle' : 'alert-circle';
    const tone =
      type === 'success'
        ? ['bg-green-50', 'text-green-600', 'border-green-200']
        : ['bg-red-50', 'text-red-600', 'border-red-200'];

    formFeedback.innerHTML =
      "<i data-lucide='" +
      icon +
      "' class='inline w-4 h-4 mr-1 mb-0.5'></i> " +
      escapeHtml(message);
    formFeedback.classList.remove('hidden');
    formFeedback.classList.remove('bg-red-50', 'text-red-600', 'border-red-200', 'bg-green-50', 'text-green-600', 'border-green-200');
    formFeedback.classList.add(...tone);
    refreshIcons();
  };

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formFeedback.className = 'p-4 rounded-xl text-xs font-bold border mt-2 transition-all';
      formFeedback.classList.add('hidden');

      const botCheck = document.getElementById('bot_check');
      if (botCheck && botCheck.value) {
        console.warn('Wykryto bota.');
        return;
      }

      if (!contactForm.checkValidity()) {
        showFormFeedback(
          'error',
          'Proszę poprawnie wypełnić wymagane pola (np. nr telefonu min. 9 cyfr).'
        );
        contactForm.reportValidity();
        const firstInvalidField = contactForm.querySelector(':invalid');
        if (firstInvalidField instanceof HTMLElement) firstInvalidField.focus();
        return;
      }

      const btn = contactForm.querySelector('button[type=\"submit\"]');
      if (!btn) return;
      const originalText = btn.textContent;
      btn.textContent = 'Wysyłanie...';
      btn.disabled = true;
      btn.classList.add('opacity-70');

      const resetBtn = () => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('opacity-70');
      };

      const showErr = (msg) => showFormFeedback('error', msg);

      (async () => {
        try {
          const fd = new FormData(contactForm);
          const res = await fetch('/contact.php', {
            method: 'POST',
            body: fd,
            headers: { Accept: 'application/json' },
            credentials: 'same-origin',
          });

          let data = null;
          const text = await res.text();
          try {
            data = text ? JSON.parse(text) : null;
          } catch {
            showErr(
              'Formularz jest chwilowo niedostępny. Spróbuj ponownie później albo skontaktuj się telefonicznie.'
            );
            return;
          }

          if (!res.ok || !data || !data.ok) {
            showErr((data && data.message) || 'Nie udało się wysłać formularza. Spróbuj ponownie lub zadzwoń.');
            return;
          }

          showFormFeedback(
            'success',
            data.message || 'Wiadomość została wysłana do rejestracji.'
          );
          contactForm.reset();
        } catch {
          showErr('Brak połączenia z serwerem. Sprawdź internet lub zadzwoń do rejestracji.');
        } finally {
          resetBtn();
        }
      })();
    });
  }
});
