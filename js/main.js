/* ============================================================
   BABA ADVERTISERS SRINAGAR — Global JavaScript  (v2)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── PRELOADER (0.10 s) ────────────────────────────────────
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 2500);
    });
  }

  // ── NAV ACTIVE STATE ───────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage ||
        (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── NAV SCROLL SHRINK ──────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── HAMBURGER ─────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── AOS-STYLE SCROLL REVEAL ───────────────────────────────
  const allReveal = [
    ...document.querySelectorAll('[data-aos]'),
    ...document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  ];
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.aosDelay || el.dataset.delay || 0);
        setTimeout(() => el.classList.add('aos-animate', 'visible'), delay);
        revealIO.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  allReveal.forEach((el, i) => {
    if (!el.dataset.aosDelay && !el.dataset.delay) el.dataset.delay = (i % 5) * 70;
    revealIO.observe(el);
  });

  // ── BACK TO TOP ───────────────────────────────────────────
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400), { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── FOOTER YEAR ───────────────────────────────────────────
  const yr = document.getElementById('footerYear');
  if (yr) yr.textContent = new Date().getFullYear();

  // ── PASSPORT IMAGE ────────────────────────────────────────
  document.querySelectorAll('.passport-img-target').forEach(wrap => {
    const img = new Image();
    img.onload = () => {
      wrap.innerHTML = `<img src="images/passport.png" alt="Mohammad Yamin Baba" style="width:100%;height:100%;object-fit:cover;">`;
    };
    img.src = 'images/passport.png';
  });

  // ── CONTACT FORM ──────────────────────────────────────────
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
    });
  }

  // ── COUNTER ANIMATION ─────────────────────────────────────
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = 'true';
        const target = parseInt(e.target.dataset.target, 10);
        const suffix = e.target.dataset.suffix || '';
        const step = target / (1400 / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          e.target.textContent = Math.floor(current) + suffix;
        }, 16);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => counterIO.observe(el));

  // ── GALLERY LIGHTBOX ──────────────────────────────────────
  const glb      = document.getElementById('glb');
  const glbImg   = document.getElementById('glbImg');
  const glbClose = document.getElementById('glbClose');
  const glbPrev  = document.getElementById('glbPrev');
  const glbNext  = document.getElementById('glbNext');
  const glbCtr   = document.getElementById('glbCounter');

  if (glb && glbImg) {
    const items = [...document.querySelectorAll('.gallery-item')];
    let idx = 0;

    const open = (i) => {
      idx = i;
      glbImg.src = items[i].dataset.src;
      glbImg.classList.remove('fade');
      glb.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (glbCtr) glbCtr.textContent = `${i + 1} / ${items.length}`;
    };
    const close = () => { glb.classList.remove('open'); document.body.style.overflow = ''; };
    const goTo = (i) => {
      idx = (i + items.length) % items.length;
      glbImg.classList.add('fade');
      setTimeout(() => {
        glbImg.src = items[idx].dataset.src;
        glbImg.classList.remove('fade');
        if (glbCtr) glbCtr.textContent = `${idx + 1} / ${items.length}`;
      }, 200);
    };

    items.forEach((item, i) => item.addEventListener('click', () => open(i)));
    if (glbClose) glbClose.addEventListener('click', close);
    glb.addEventListener('click', e => { if (e.target === glb) close(); });
    if (glbPrev) glbPrev.addEventListener('click', () => goTo(idx - 1));
    if (glbNext) glbNext.addEventListener('click', () => goTo(idx + 1));

    document.addEventListener('keydown', e => {
      if (!glb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goTo(idx - 1);
      if (e.key === 'ArrowRight') goTo(idx + 1);
    });

    let tx = 0;
    glb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    glb.addEventListener('touchend', e => {
      const d = tx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 50) goTo(idx + (d > 0 ? 1 : -1));
    });
  }

  // ── FAQ ACCORDION ────────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-q').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.style.maxHeight = '0';
      });
      if (!isOpen) { btn.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

});
