// AquaShine — shared interactions
document.addEventListener('DOMContentLoaded', () => {
  // mobile nav
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) burger.addEventListener('click', () => links.classList.toggle('open'));

  // scroll reveal — text rises from the bottom, cards slide in alternating from left/right
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  const slide = (el, cls) => { el.classList.remove('rv'); el.classList.add(cls); io.observe(el); };
  // card groups: alternate left / right with a stagger
  document.querySelectorAll('.steps, .pkgs').forEach(g => {
    [...g.children].forEach((c, i) => { c.style.transitionDelay = (i * 0.12) + 's'; slide(c, i % 2 ? 'rv-r' : 'rv-l'); });
  });
  document.querySelectorAll('.menu-cat, .info-card').forEach((c, i) => {
    c.style.transitionDelay = ((i % 3) * 0.1) + 's'; slide(c, i % 2 ? 'rv-r' : 'rv-l');
  });
  document.querySelectorAll('.faq-item').forEach((c, i) => {
    c.style.transitionDelay = Math.min(i * 0.07, 0.35) + 's'; slide(c, i % 2 ? 'rv-r' : 'rv-l');
  });
  // feature rows: image and text sweep in from opposite sides, alternating per row
  document.querySelectorAll('.feat').forEach((row, i) => {
    row.classList.remove('rv');
    const pic = row.querySelector('.pic');
    const txt = [...row.children].find(x => x !== pic);
    const picLeft = i % 2 === 0;
    if (pic) { pic.classList.add(picLeft ? 'rv-l' : 'rv-r'); io.observe(pic); }
    if (txt) { txt.classList.add(picLeft ? 'rv-r' : 'rv-l'); io.observe(txt); }
  });
  // everything else keeps rising from the bottom
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  // faq accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  // booking form -> composes a WhatsApp message
  const form = document.getElementById('book-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const msg =
        'Hi AquaShine! I would like to book a wash.\n' +
        'Name: ' + (d.get('name') || '-') + '\n' +
        'Phone: ' + (d.get('phone') || '-') + '\n' +
        'Vehicle: ' + (d.get('vehicle') || '-') + '\n' +
        'Package: ' + (d.get('package') || '-') + '\n' +
        'Preferred date: ' + (d.get('date') || '-') + '\n' +
        'Area: ' + (d.get('area') || '-') + '\n' +
        'Notes: ' + (d.get('notes') || '-');
      window.open('https://wa.me/15551234567?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  // footer year
  const y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();
});
