// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage('Por favor, insira um email válido.', 'error');
        return;
    }

    // Simulate form submission (in a real app, you'd send to server)
    showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    contactForm.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

// Product modal functionality
const productCards = document.querySelectorAll('.product-card');
const modal = document.createElement('div');
modal.className = 'product-modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <img id="modal-image" src="" alt="">
        <h3 id="modal-title"></h3>
        <p id="modal-description"></p>
    </div>
`;
document.body.appendChild(modal);

productCards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;

        document.getElementById('modal-image').src = img;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-description').textContent = desc;

        modal.style.display = 'block';
    });
});

modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Typing effect for hero text
const heroText = document.querySelector('.hero-content h1');
const originalText = heroText.textContent;
heroText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        heroText.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

setTimeout(typeWriter, 1000);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});
