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

    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) {
        nav?.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        toggle?.setAttribute('aria-expanded', 'false');
        header.querySelectorAll('.nav-item.has-dropdown').forEach((item) => item.classList.remove('is-open'));
      }
    });
  });

  document.querySelectorAll('form[data-formspree-placeholder]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (form.dataset.ready !== 'true') {
        event.preventDefault();
        alert('Replace YOUR_FORM_ID in the form action with your Formspree form ID before going live.');
      }
    });
  });

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();