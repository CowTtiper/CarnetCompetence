// Fonctionnalité du menu mobile
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Ferme le menu mobile en cliquant sur un lien
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Ferme le menu mobile en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    // Ajout d'une vérification pour ne s'exécuter que si le menu est ouvert
    if (mobileMenu.classList.contains('active') && 
        !mobileMenuToggle.contains(e.target) && 
        !mobileMenu.contains(e.target)) {
        
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Effet de défilement sur la Navbar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    // Vérifie d'abord si la navbar existe
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Intersection Observer pour les animations au défilement
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Animation décalée pour les items du portfolio (Compétences)
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.portfolio-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            });
            // On arrête d'observer une fois l'animation lancée
            portfolioObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe tous les éléments d'animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Cible TOUTES les grilles, pas juste la première
    const portfolioGrids = document.querySelectorAll('.portfolio-grid');
    portfolioGrids.forEach(grid => {
        if (grid) {
            portfolioObserver.observe(grid);
        }
    });
});

// Défilement fluide pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Offset pour la navbar fixe
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Accessibilité : Navigation au clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});