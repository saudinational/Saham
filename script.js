const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

// نموذج الواجهة جاهز، لكن يحتاج ربط خدمة استقبال رسائل حتى تصل البيانات إلى البريد.
// بعد إنشاء نموذج في Formspree، ضعي الرابط الذي توفره الخدمة هنا.
const FORMSPREE_ENDPOINT = '';
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!FORMSPREE_ENDPOINT) {
    status.textContent = 'النموذج جاهز من ناحية التصميم، لكن يلزم ربطه بخدمة استقبال الرسائل حتى تصل البيانات إلى فريق سهم. يمكنك التواصل مباشرة عبر واتساب.';
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true; button.textContent = 'جارٍ الإرسال...'; status.textContent = '';
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
    if (!response.ok) throw new Error('send_failed');
    form.reset(); status.textContent = 'تم إرسال رسالتك بنجاح، شكرًا لتواصلك مع سهم.';
  } catch {
    status.textContent = 'تعذر إرسال الرسالة الآن. يرجى التواصل معنا عبر واتساب.';
  } finally { button.disabled = false; button.textContent = 'إرسال الاستفسار'; }
});