/* ------------------------------------
    Smooth Scrolling for Navigation
------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

/* ------------------------------------
    Resume Download Button
------------------------------------ */
const downloadBtn = document.getElementById("#downloadResume");

if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
        const link = document.createElement("a");
        link.href = "NitheshKumar.pdf";  
        link.download = "Nithesh_Kumar_Resume.pdf";
        link.click();
    });
}

/* ------------------------------------
    Update Active Nav Link on Scroll
------------------------------------ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ------------------------------------
    Scroll Header Background Change
------------------------------------ */
const header = document.querySelector('.header');
const html = document.documentElement;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = html.getAttribute('data-theme') === 'light'
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
    } else {
        header.style.backgroundColor = html.getAttribute('data-theme') === 'light'
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = 'none';
    }
});

/* ------------------------------------
    Theme Toggle (Dark / Light)
------------------------------------ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeIcon) return;

    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

/* ------------------------------------
    Scroll Animation for Cards & Tags
------------------------------------ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.project-card-new, .tech-tag').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ------------------------------------
    Contact Form Validation
------------------------------------ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email.');
            return;
        }

        alert("Thank you for your message! I'll get back to you soon.");
        contactForm.reset();
    });
}
