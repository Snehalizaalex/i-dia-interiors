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

  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('open');
      navMenu.classList.toggle('active');
    });
  }

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

        // If on mobile, close the menu when clicked
        if (mobileMenuBtn && navMenu) {
          mobileMenuBtn.classList.remove('open');
          navMenu.classList.remove('active');
        }
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

  // Enquiry Modal Logic
  const enquiryBtn = document.getElementById('enquiryBtn');
  const enquiryModal = document.getElementById('enquiryModal');
  const closeEnquiryModal = document.querySelector('.close-enquiry-modal');

  if (enquiryBtn && enquiryModal && closeEnquiryModal) {
    enquiryBtn.addEventListener('click', () => {
      enquiryModal.style.setProperty('display', 'block', 'important');
    });

    closeEnquiryModal.addEventListener('click', () => {
      enquiryModal.style.setProperty('display', 'none', 'important');
    });

    window.addEventListener('click', (e) => {
      if (e.target === enquiryModal) {
        enquiryModal.style.setProperty('display', 'none', 'important');
      }
    });
  }
});

// Handle the complex Enquiry Form Submission
window.handleEnquiryForm = function (event) {
  event.preventDefault();

  const name = document.getElementById('enq-name').value;
  const phone = document.getElementById('enq-phone').value;
  const email = document.getElementById('enq-email').value;
  const profession = document.getElementById('enq-profession').value;
  const projectType = document.getElementById('enq-ptype').value;
  const projectSize = document.getElementById('enq-size').value || 'Not specified';
  const message = document.getElementById('enq-message').value;

  // Gather Checkboxes
  const services = [];
  if (document.getElementById('enq-service-2d').checked) services.push('2D Drawings');
  if (document.getElementById('enq-service-3d').checked) services.push('3D Design');
  if (document.getElementById('enq-service-cutlist').checked) services.push('Cutlist');
  if (document.getElementById('enq-service-site').checked) services.push('Site Execution Support');

  const servicesString = services.length > 0 ? services.join(', ') : 'None selected';

  // Check if a file was uploaded (we can't send the file via URL, but we notify you that they have one ready)
  const fileInput = document.getElementById('enq-file');
  const hasFile = fileInput.files.length > 0 ? `Yes (${fileInput.files[0].name})` : 'No';

  // Build the WhatsApp message string
  const waMessage = `*New Service Enquiry*

*Contact Info*
Name: ${name}
Phone: ${phone}
Email: ${email}
Profession: ${profession}

*Project Details*
Services Required: ${servicesString}
Project Type: ${projectType}
Project Size: ${projectSize}

*Message*
${message}

*Has Reference File?* ${hasFile}`;

  const encodedMessage = encodeURIComponent(waMessage);
  window.open(`https://wa.me/919995442552?text=${encodedMessage}`, '_blank');

  // Close the modal
  document.getElementById('enquiryModal').style.setProperty('display', 'none', 'important');
};
