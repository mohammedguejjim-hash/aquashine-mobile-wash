// AquaShine — shared interactions
document.addEventListener('DOMContentLoaded', () => {
  // mobile nav
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) burger.addEventListener('click', () => links.classList.toggle('open'));

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
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
