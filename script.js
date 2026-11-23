document.addEventListener('DOMContentLoaded', () => {
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
menuBtn.addEventListener('click', () => {
navLinks.classList.toggle('open');
});
}
const themeBtn = document.getElementById('themeBtn');
const body = document.body;
if (localStorage.getItem('theme') === 'light') {
body.classList.add('light');
}
if (themeBtn) {
themeBtn.addEventListener('click', () => {
body.classList.toggle('light');
if (body.classList.contains('light')) {
localStorage.setItem('theme', 'light');
} else {
localStorage.setItem('theme', 'dark');
}
});
}
const observerOptions = {
threshold: 0.1
};
const revealObserver = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('show');
observer.unobserve(entry.target);
}
});
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => {
revealObserver.observe(el);
});
const fillObserver = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const fill = entry.target;
const level = fill.getAttribute('data-level');
if (level) {
fill.style.width = level;
}
observer.unobserve(fill);
}
});
}, observerOptions);
document.querySelectorAll('.fill').forEach(el => {
fillObserver.observe(el);
});
document.querySelectorAll('.faq-q').forEach(q => {
q.addEventListener('click', () => {
const faqItem = q.closest('.faq-item');
if (faqItem) {
faqItem.classList.toggle('open');
}
});
});
const contactForm = document.getElementById('contactForm');
if (contactForm) {
contactForm.addEventListener('submit', (e) => {
e.preventDefault();
let isValid = true;
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameErr = document.getElementById('nameErr');
const emailErr = document.getElementById('emailErr');
const messageErr = document.getElementById('messageErr');
const successMsg = document.getElementById('successMsg');
if (nameErr) nameErr.textContent = '';
if (emailErr) emailErr.textContent = '';
if (messageErr) messageErr.textContent = '';
if (successMsg) successMsg.style.display = 'none';
if (!nameInput || nameInput.value.trim() === '') {
if (nameErr) nameErr.textContent = 'Name is required.';
isValid = false;
}
if (!emailInput || emailInput.value.trim() === '') {
if (emailErr) emailErr.textContent = 'Email is required.';
isValid = false;
} else {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(emailInput.value.trim())) {
if (emailErr) emailErr.textContent = 'Invalid email format.';
isValid = false;
}
}
if (!messageInput || messageInput.value.trim() === '') {
if (messageErr) messageErr.textContent = 'Message is required.';
isValid = false;
}
if (isValid) {
if (successMsg) {
successMsg.style.display = 'block';
}
contactForm.reset();
}
});
}
});