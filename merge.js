const fs = require('fs');

function extractSections(filePath, type) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Extract sections
  let sections = [];
  let sectionMatch;
  let sectionRegex = /<section[\s\S]*?<\/section>/g;

  while ((sectionMatch = sectionRegex.exec(content)) !== null) {
    sections.push(sectionMatch[0]);
  }

  if (sections.length > 0) {
    // Add ID to the first section
    sections[0] = sections[0].replace('<section ', `<section id="${type}" `);

    // Custom adjustments
    if (type === 'contact') {
      // Apply the background image to the contact sections (actually, maybe just the first one)
      // or maybe wrap it in a div? CSS scroll snapping applies to each section. 
      // It's better to add the background to all sections in contact.
      for (let i = 0; i < sections.length; i++) {
        sections[i] = sections[i].replace('<section class="', `<section style="background: linear-gradient(rgba(14, 14, 14, 0.8), rgba(14, 14, 14, 0.95)), url('contact us pic.png') center/cover fixed;" class="`);
      }
    }
  }

  return sections.join('\n\n');
}

// 1. Read index
let indexContent = fs.readFileSync('index.html', 'utf-8');

// replace the links in head
indexContent = indexContent.replace(
  /<li><a href="index\.html".*?<\/li>\s*<li><a href="about\.html".*?<\/li>\s*<li><a href="services\.html".*?<\/li>\s*<li><a href="works\.html".*?<\/li>\s*<li><a href="contact\.html".*?<\/li>/s,
  `<li><a href="#home" class="nav-link active">Home</a></li>
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#services" class="nav-link">Services</a></li>
          <li><a href="#works" class="nav-link">Works</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>`
);
// replace href="index.html" in the brand logo
indexContent = indexContent.replace('<a href="index.html" class="logo"', '<a href="#home" class="logo"');
indexContent = indexContent.replace('<a href="works.html" class="btn btn-primary">Explore Our Works</a>', '<a href="#works" class="btn btn-primary">Explore Our Works</a>');
indexContent = indexContent.replace('<a href="contact.html" class="btn btn-outline">Get in Touch</a>', '<a href="#contact" class="btn btn-outline">Get in Touch</a>');

// give the hero an id #home
indexContent = indexContent.replace('<section class="hero">', '<section id="home" class="hero">');

// Find where the other sections start (after hero)
let heroEnd = indexContent.indexOf('</section>', indexContent.indexOf('class="hero"')) + 10;
let footerStart = indexContent.indexOf('<footer>');

let prefix = indexContent.substring(0, heroEnd) + '\n';
let postfix = '\n  ' + indexContent.substring(footerStart);

let aboutSections = extractSections('about.html', 'about');
let servicesSections = extractSections('services.html', 'services');

// services has a call to action at the end which is redundant with contact, let's remove the "Have a specific project in mind?" section from services if it exists
let serviceArray = extractSections('services.html', 'services').split('\n\n');
servicesSections = serviceArray.filter(s => !s.includes('Have a specific project in mind?')).join('\n\n');

let worksSections = extractSections('works.html', 'works');
let contactSections = extractSections('contact.html', 'contact');

let newIndex = prefix + '\n' + aboutSections + '\n' + servicesSections + '\n' + worksSections + '\n' + contactSections + '\n' + postfix;

fs.writeFileSync('index.html', newIndex);

// Update active state based on scroll in main.js
let mainJs = fs.readFileSync('js/main.js', 'utf-8');
if (!mainJs.includes('navLinks.forEach')) {
  mainJs += `

  // Scroll Nav Active Class
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
`;
  fs.writeFileSync('js/main.js', mainJs);
}

console.log('Merge complete!');
