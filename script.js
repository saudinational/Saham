
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#form-note').textContent =
    'النموذج تجريبي حاليًا. سيتم تفعيل استقبال الرسائل بعد ربط خدمة البريد الإلكتروني.';
});
