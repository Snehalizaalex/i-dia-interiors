const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. the hero section should be wrapped in spa-page active
html = html.replace('<section id="home" class="hero">', '<div id="home" class="spa-page active">\n  <section class="hero">');
// end of hero
html = html.replace('  </section>\n\n  <section id="about"', '  </section>\n</div>\n\n  <section id="about"');

// 2. About section
html = html.replace('<section id="about" class="section"', '<div id="about" class="spa-page">\n  <section class="section"');
html = html.replace('  </section>\n  <section id="services"', '  </section>\n</div>\n  <section id="services"');

// 3. Services section
html = html.replace('<section id="services" class="section"', '<div id="services" class="spa-page">\n  <section class="section"');
html = html.replace('  </section>\n  <section id="works"', '  </section>\n</div>\n  <section id="works"');

// 4. Works section
html = html.replace('<section id="works" class="section"', '<div id="works" class="spa-page">\n  <section class="section"');
html = html.replace('  </section>\n  <section id="contact"', '  </section>\n</div>\n  <section id="contact"');

// 5. Contact section
html = html.replace('<section id="contact" class="section"', '<div id="contact" class="spa-page">\n  <section class="section"');
html = html.replace('    </div>\n  </section>\n\n  <footer>', '    </div>\n  </section>\n</div>\n\n  <footer>');

fs.writeFileSync('index.html', html);
console.log('Wrapped sections safely.');
