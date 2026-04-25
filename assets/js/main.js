(function () {
  const headers = document.querySelectorAll('.site-header');

  headers.forEach((header) => {
    const nav = header.querySelector('.site-nav');
    const navList = header.querySelector('.nav-list');
    const pill = header.querySelector('.nav-pill');
    const items = header.querySelectorAll('.nav-item[data-pill]');
    const toggle = header.querySelector('.nav-toggle');
    const current = header.querySelector('.nav-item.is-current[data-pill]');

    const movePill = (target) => {
      if (!pill || !target || window.innerWidth <= 900) return;
      const listBox = navList.getBoundingClientRect();
      const box = target.getBoundingClientRect();
      const left = box.left - listBox.left;
      pill.style.width = `${box.width}px`;
      pill.style.transform = `translateX(${left}px)`;
      pill.style.opacity = '1';
    };

    const resetPill = () => {
      if (current) {
        movePill(current);
      } else if (pill) {
        pill.style.opacity = '0';
      }
    };

    items.forEach((item) => {
      const link = item.querySelector('.nav-link');
      if (!link) return;
      item.addEventListener('mouseenter', () => {
        items.forEach((el) => el.classList.remove('is-hovered'));
        item.classList.add('is-hovered');
        movePill(item);
      });
      item.addEventListener('mouseleave', () => {
        item.classList.remove('is-hovered');
      });
      link.addEventListener('focus', () => {
        items.forEach((el) => el.classList.remove('is-hovered'));
        item.classList.add('is-hovered');
        movePill(item);
      });
    });

    if (navList) navList.addEventListener('mouseleave', resetPill);
    window.addEventListener('resize', resetPill);
    resetPill();

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('menu-open', open);
        if (!open) {
          header.querySelectorAll('.nav-item.has-dropdown').forEach((item) => item.classList.remove('is-open'));
        }
      });
    }

    header.querySelectorAll('.nav-item.has-dropdown > .nav-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (window.innerWidth > 900) return;
        const item = link.closest('.nav-item');
        if (!item) return;
        const isOpen = item.classList.contains('is-open');
        const href = link.getAttribute('href');

        if (!isOpen) {
          event.preventDefault();
          header.querySelectorAll('.nav-item.has-dropdown').forEach((other) => {
            if (other !== item) other.classList.remove('is-open');
          });
          item.classList.add('is-open');
        } else if (!href || href === '#') {
          event.preventDefault();
        }
      });
    });

    header.querySelectorAll('.site-nav a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          nav?.classList.remove('is-open');
          document.body.classList.remove('menu-open');
          toggle?.setAttribute('aria-expanded', 'false');
          header.querySelectorAll('.nav-item.has-dropdown').forEach((item) => item.classList.remove('is-open'));
        }
      });
    });

    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) {
        nav?.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        toggle?.setAttribute('aria-expanded', 'false');
        header.querySelectorAll('.nav-item.has-dropdown').forEach((item) => item.classList.remove('is-open'));
      }
    });
  });



  const parallaxSections = document.querySelectorAll('[data-parallax]');
  if (parallaxSections.length) {
    const updateParallax = () => {
      parallaxSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const viewport = window.innerHeight || 1;
        const progress = Math.max(-viewport, Math.min(viewport, rect.top));
        section.style.setProperty('--parallax-offset', `${progress * -0.12}px`);
      });
    };

    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax);
  }

  document.querySelectorAll('[data-ajax-form]').forEach((form) => {
    const status = form.querySelector('.form-status') || form.parentElement?.querySelector('.form-status');
    const submitButton = form.querySelector('button[type="submit"]');

    const setStatus = (message, type) => {
      if (!status) return;
      status.textContent = message;
      status.classList.remove('is-success', 'is-error');
      status.classList.add('is-visible', type === 'success' ? 'is-success' : 'is-error');
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const originalButtonText = submitButton ? submitButton.textContent : '';
      form.classList.add('is-submitting');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          setStatus(form.dataset.successMessage || 'Thanks — your message has been sent.', 'success');
          form.reset();
        } else {
          setStatus('Something went wrong. Please try again, or email directly instead.', 'error');
        }
      } catch (error) {
        setStatus('Unable to send right now. Please check your connection and try again.', 'error');
      } finally {
        form.classList.remove('is-submitting');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
  });

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();