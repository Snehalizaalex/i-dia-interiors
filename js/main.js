/**
 * Idia Interiors - Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navigation Header
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Intersection Observer for fade-in elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToObserve = document.querySelectorAll('.fade-in-section, .pop-up');
  elementsToObserve.forEach(element => {
    observer.observe(element);
  });

  // SPA Navigation Logic
  const navLinks = document.querySelectorAll('.nav-link, .btn-primary, .btn-outline');
  const spaPages = document.querySelectorAll('.spa-page');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      // Only intercept internal links (e.g. #about)
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();

        // Remove active class from all pages and nav links
        spaPages.forEach(page => page.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));

        // Add active class to target page and triggered navlink
        const targetPage = document.querySelector(targetId);
        if (targetPage) {
          targetPage.classList.add('active');
          window.scrollTo(0, 0); // scroll to top nicely
        }

        // Update nav links to Active
        document.querySelectorAll(`.nav-link[href="${targetId}"]`).forEach(nav => nav.classList.add('active'));
      }
    });
  });

  // Modal Logic
  const quoteBtn = document.getElementById('quoteBtn');
  const quoteModal = document.getElementById('quoteModal');
  const closeModal = document.querySelector('.close-modal');

  if (quoteBtn && quoteModal && closeModal) {
    quoteBtn.addEventListener('click', () => {
      quoteModal.style.setProperty('display', 'block', 'important');
    });

    closeModal.addEventListener('click', () => {
      quoteModal.style.setProperty('display', 'none', 'important');
    });

    window.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        quoteModal.style.setProperty('display', 'none', 'important');
      }
    });
  }
});
