/* ============================================
   AI GAME PORTFOLIO — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Mobile Nav Toggle ---
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Active Nav Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Nav Scroll Effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // --- Scroll-Triggered Fade-In Animations ---
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger animation for sibling elements
            const delay = Array.from(fadeElements).indexOf(entry.target) % 4 * 100;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(el => observer.observe(el));
  }

  // --- Contact Form Validation ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Reset errors
      contactForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });

      // Validate name
      const name = contactForm.querySelector('#name');
      if (name && name.value.trim() === '') {
        name.closest('.form-group').classList.add('error');
        valid = false;
      }

      // Validate email
      const email = contactForm.querySelector('#email');
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '' || !emailRegex.test(email.value.trim())) {
          email.closest('.form-group').classList.add('error');
          valid = false;
        }
      }

      // Validate message
      const message = contactForm.querySelector('#message');
      if (message && message.value.trim() === '') {
        message.closest('.form-group').classList.add('error');
        valid = false;
      }

      if (valid) {
        const btn = contactForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
        btn.disabled = true;

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }
    });

    // Clear error on input
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('error');
      });
    });
  }

  // --- Typing Effect for Hero ---
  const typingEl = document.querySelector('.hero__typing');
  if (typingEl) {
    const texts = JSON.parse(typingEl.dataset.texts || '[]');
    if (texts.length > 0) {
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function type() {
        const current = texts[textIndex];
        if (isDeleting) {
          typingEl.textContent = current.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingEl.textContent = current.substring(0, charIndex + 1);
          charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === current.length) {
          speed = 2000;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          speed = 400;
        }

        setTimeout(type, speed);
      }

      type();
    }
  }

  // --- Gallery Filter ---
  const filterButtons = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            // Re-trigger fade-in
            item.classList.remove('visible');
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                item.classList.add('visible');
              });
            });
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Keyboard Shortcuts (Linear-style) ---
  document.addEventListener('keydown', (e) => {
    // Don't trigger when typing in form fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key.toLowerCase()) {
      case 'p':
        window.location.href = 'projects.html';
        break;
      case 'g':
        window.location.href = 'gallery.html';
        break;
      case 'a':
        window.location.href = 'about.html';
        break;
      case 'c':
        window.location.href = 'contact.html';
        break;
      case 'h':
        window.location.href = 'index.html';
        break;
    }
  });

})();
