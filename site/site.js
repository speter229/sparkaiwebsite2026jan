/* Spark AI Flow — interactions */
(function () {
  // sticky nav background
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // scroll reveal — gate hidden state behind a class so content is never stuck hidden
  document.documentElement.classList.add('reveal-ready');
  const reveals = document.querySelectorAll('.reveal');
  const revealAll = () => reveals.forEach((el) => el.classList.add('in'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => {
      // reveal anything already in view right away
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95) el.classList.add('in');
      else io.observe(el);
    });
    // safety net: never leave content hidden
    setTimeout(revealAll, 1600);
  } else {
    revealAll();
  }

  // smooth-scroll offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
