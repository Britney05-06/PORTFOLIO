document.addEventListener("DOMContentLoaded", function () {

  /* TRANSITION DE PAGE */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';

  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 30);
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || link.hasAttribute('download')) return;

    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = href;
      }, 320);
    });
  });


  /* CURSEUR CUSTOM */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower) {
    let mx = 0, my = 0;
    let followerSize = 36;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = (mx - 5) + 'px';
      cursor.style.top = (my - 5) + 'px';
      follower.style.left = (mx - followerSize / 2) + 'px';
      follower.style.top = (my - followerSize / 2) + 'px';
    });

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        followerSize = 56;
        follower.style.width = '56px';
        follower.style.height = '56px';
        follower.style.opacity = '0.3';
      });
      el.addEventListener('mouseleave', () => {
        followerSize = 36;
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.opacity = '0.5';
      });
    });
  }


  /* DARK MODE */
  const darkBtn = document.getElementById('dark-toggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (darkBtn) darkBtn.textContent = '☀️';
  } else {
    if (darkBtn) darkBtn.textContent = '🌙';
  }

  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      darkBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }


  /* burger */
  const burger = document.getElementById('burger');
  const menu = document.querySelector('.navbar__menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }


  /* NAVBAR AU SCROLL */
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }, { passive: true });
  }


  /* SCROLL REVEAL */
  const revealTargets = document.querySelectorAll(
    '.about-intro__photo, .about-intro__content, .about-intro__text, ' +
    '.about-infos__card, ' +
    '.skills-group, ' +
    '.extra-card, .extra-block, .extra-intro, ' +
    '.card, ' +
    '.contact-info, .contact-form-wrap'
  );

  if (revealTargets.length > 0) {
    revealTargets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealTargets.forEach(el => revealObserver.observe(el));
  }

  const heroContent = document.querySelector('.hero__content');
  const heroPhoto = document.querySelector('.hero__photo');
  if (heroContent) heroContent.style.animation = 'fadeUp 0.8s ease forwards';
  if (heroPhoto) heroPhoto.style.animation = 'fadeLeft 0.9s ease 0.15s both';


  /* TYPING EFFECT (index) */
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const phrases = [
      'Designer UX/UI',
      'Développeuse Web',
      'Future Product Manager',
      'Créatrice de solutions'
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
      const phrase = phrases[pi];
      if (!deleting) {
        typingEl.textContent = phrase.slice(0, ++ci);
        if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
      } else {
        typingEl.textContent = phrase.slice(0, --ci);
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
      }
      setTimeout(type, deleting ? 50 : 85);
    }
    setTimeout(type, 800);
  }


  /* CAROUSEL PROJETS (swipe horizontal) */
  const track = document.getElementById('projects-track');
  const dotsContainer = document.getElementById('proj-dots');
  const btnPrev = document.getElementById('proj-prev');
  const btnNext = document.getElementById('proj-next');

  if (track) {
    const cards = Array.from(track.querySelectorAll('.project-card'));
    let current = 0;

    // créer les dots
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'projects-dot' + (i === 0 ? ' projects-dot--active' : '');
      dot.setAttribute('aria-label', `Projet ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      current = Math.max(0, Math.min(index, cards.length - 1));
      const cardWidth = cards[0].offsetWidth + 32; // 32 = gap 2rem
      track.style.transform = `translateX(-${current * cardWidth}px)`;

      // mettre à jour les dots
      dotsContainer.querySelectorAll('.projects-dot').forEach((d, i) => {
        d.classList.toggle('projects-dot--active', i === current);
      });

      // opacité des flèches aux extrémités
      btnPrev.style.opacity = current === 0 ? '0.25' : '1';
      btnPrev.style.pointerEvents = current === 0 ? 'none' : '';
      btnNext.style.opacity = current === cards.length - 1 ? '0.25' : '1';
      btnNext.style.pointerEvents = current === cards.length - 1 ? 'none' : '';
    }

    btnPrev.addEventListener('click', () => goTo(current - 1));
    btnNext.addEventListener('click', () => goTo(current + 1));

    // swipe tactile
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });

    // drag souris
    let isDragging = false, dragStartX = 0;
    track.addEventListener('mousedown', e => { isDragging = true; dragStartX = e.clientX; track.style.cursor = 'grabbing'; });
    window.addEventListener('mouseup', e => {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = '';
      const diff = dragStartX - e.clientX;
      if (Math.abs(diff) > 60) goTo(diff > 0 ? current + 1 : current - 1);
    });

    goTo(0);
  }


  /* IMAGE STACK */
  document.querySelectorAll('.img-stack').forEach(stack => {
    const items = Array.from(stack.querySelectorAll('.img-stack__item'));

    function applyStack() {
      const offsets = [
        { top: '0px',  left: '0px',  z: items.length,     shadow: '0 8px 24px rgba(45,27,20,0.22)' },
        { top: '24px', left: '28px', z: items.length - 1, shadow: '0 4px 12px rgba(45,27,20,0.12)' },
        { top: '44px', left: '52px', z: items.length - 2, shadow: '0 2px 8px rgba(45,27,20,0.07)' },
      ];

      items.forEach((el, i) => {
        const o = offsets[i] || { top: (i*20)+'px', left: (i*24)+'px', z: items.length - i, shadow: 'none' };
        el.style.zIndex = o.z;
        el.style.top = o.top;
        el.style.left = o.left;
        el.style.transform = 'none';
        el.style.boxShadow = o.shadow;
      });
    }

    applyStack();

    stack.addEventListener('click', () => {
      const first = items.shift();
      items.push(first);

      first.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
      first.style.transform = 'translate(-20px, -20px) scale(0.9)';
      first.style.opacity = '0.3';

      setTimeout(() => {
        first.style.transition = 'none';
        first.style.transform = 'none';
        first.style.opacity = '1';
        applyStack();
        setTimeout(() => {
          items.forEach(el => {
            el.style.transition = 'top 0.4s ease, left 0.4s ease, box-shadow 0.4s ease';
          });
        }, 20);
      }, 350);
    });
  });


  /* FORMULAIRE CONTACT */
  const form = document.getElementById("contact-form");
  if (form) {
    emailjs.init("AJw-oqjCRj00BXGMH");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        reply_to: document.getElementById("email").value
      };
      emailjs.send("service_y8i8y4l", "template_5th8hsu", templateParams)
        .then(
          () => { window.location.href = "index.html"; form.reset(); },
          () => { alert("Oups, une erreur est survenue. Essaie à nouveau."); }
        );
    });
  }

});