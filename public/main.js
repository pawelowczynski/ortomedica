document.addEventListener('DOMContentLoaded', () => {
  // 1. Lucide icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

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
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function setMenuOpen(open) {
    if (!menuBtn || !mobileMenu) return;
    isMenuOpen = open;
    if (open) {
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden');
      menuBtn.innerHTML = '<i data-lucide="x" class="w-8 h-8"></i>';
    } else {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
      menuBtn.innerHTML = '<i data-lucide="menu" class="w-8 h-8"></i>';
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
        if (isMenuOpen) setMenuOpen(false);
      });
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) setMenuOpen(false);
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

  // 5. Cookie banner + map
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const loadMapBtn = document.getElementById('load-map-btn');
  const mapContainer = document.getElementById('map-container');

  const MAP_IFRAME_HTML =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2489.349635741639!2d16.2007481!3d51.3907722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470f1359c63c5d6f%3A0xc3c9f8016594270b!2sPawia%2067%2C%2059-300%20Lubin!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl" class="w-full h-full border-0 absolute inset-0 rounded-[2rem]" allowfullscreen="" loading="lazy"></iframe>';

  function loadGoogleMap() {
    if (mapContainer && !mapContainer.querySelector('iframe')) {
      mapContainer.innerHTML = MAP_IFRAME_HTML;
    }
  }

  function setupMapObserver() {
    if (!mapContainer || !('IntersectionObserver' in window)) return;
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && localStorage.getItem('cookiesAccepted')) {
          loadGoogleMap();
          mapObserver.disconnect();
        }
      });
    });
    mapObserver.observe(mapContainer);
  }

  /** GA4 + Meta Pixel — tylko po zgodzie (RODO); ID z layout (build-time PUBLIC_*) */
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.async = true;
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('script load failed'));
      document.head.appendChild(s);
    });
  }

  function initMarketingAnalytics() {
    const cfg = window.__ORTHOMEDICA_ANALYTICS__;
    if (!cfg) return;

    const gaId = cfg.gaMeasurementId;
    if (gaId && !window.__orthomedicaGaLoaded) {
      window.__orthomedicaGaLoaded = true;
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`)
        .then(() => {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', gaId);
        })
        .catch(() => {});
    }

    const fbId = cfg.fbPixelId;
    if (fbId && !window.__orthomedicaFbLoaded) {
      window.__orthomedicaFbLoaded = true;
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      if (window.fbq) {
        window.fbq('init', fbId);
        window.fbq('track', 'PageView');
      }
    }
  }

  function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    if (cookieBanner) cookieBanner.classList.add('hidden-banner');
    loadGoogleMap();
    initMarketingAnalytics();
  }

  function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => {
        if (cookieBanner) cookieBanner.classList.remove('hidden-banner');
      }, 1000);
    } else {
      setupMapObserver();
      initMarketingAnalytics();
    }
  }

  if (acceptBtn) acceptBtn.addEventListener('click', acceptCookies);
  if (loadMapBtn) {
    loadMapBtn.addEventListener('click', () => {
      acceptCookies();
    });
  }
  checkCookies();

  // 6. Before/after slider
  const sliders = document.querySelectorAll('.ba-container');
  sliders.forEach((slider) => {
    let isDown = false;
    const beforeLayer = slider.querySelector('.ba-before');
    const handle = slider.querySelector('.ba-slider-handle');
    if (!beforeLayer || !handle) return;

    const moveSlider = (e) => {
      if (!isDown) return;
      const rect = slider.getBoundingClientRect();
      const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
      if (clientX == null) return;
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percent = (x / rect.width) * 100;
      beforeLayer.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      handle.style.left = `${percent}%`;
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
          button.classList.toggle('bg-gold', active);
          button.classList.toggle('text-white', active);
          button.classList.toggle('bg-white/10', !active);
          button.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        processTabContents.forEach((panel) => {
          const shouldShow = panel.id === `timeline-${target}`;
          panel.classList.toggle('is-active', shouldShow);
          panel.classList.toggle('hidden', !shouldShow);
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 9. Contact form validation
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

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
        formFeedback.innerHTML =
          "<i data-lucide='alert-circle' class='inline w-4 h-4 mr-1 mb-0.5'></i> Proszę poprawnie wypełnić wymagane pola (np. nr telefonu min. 9 cyfr).";
        formFeedback.classList.remove('hidden');
        formFeedback.classList.add('bg-red-50', 'text-red-600', 'border-red-200');
        refreshIcons();
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

      const showErr = (msg) => {
        formFeedback.innerHTML =
          "<i data-lucide='alert-circle' class='inline w-4 h-4 mr-1 mb-0.5'></i> " + msg;
        formFeedback.classList.remove('hidden');
        formFeedback.classList.add('bg-red-50', 'text-red-600', 'border-red-200');
        refreshIcons();
      };

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
              'Serwer nie zwrócił poprawnej odpowiedzi (np. brak PHP przy astro dev). Wgraj build na hosting z PHP, aby formularz wysyłał e-maile.'
            );
            return;
          }

          if (!res.ok || !data || !data.ok) {
            showErr((data && data.message) || 'Nie udało się wysłać formularza. Spróbuj ponownie lub zadzwoń.');
            return;
          }

          formFeedback.innerHTML =
            "<i data-lucide='check-circle' class='inline w-4 h-4 mr-1 mb-0.5'></i> " +
            (data.message || 'Wiadomość została wysłana! Odezwiemy się niezwłocznie.');
          formFeedback.classList.remove('hidden');
          formFeedback.classList.add('bg-green-50', 'text-green-600', 'border-green-200');
          refreshIcons();
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

