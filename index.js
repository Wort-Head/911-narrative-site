const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTe8fVErZdZX_A9ypryzdKCAOcftjmQQBBdu9vxwUzcjvatt7De7jtzALKO4-Pqgk4SJVyS0Vj0fYY7/pub?output=csv";

const narrativeSection = document.querySelector('.narrative-lock-section');
const narrativeWrapper = document.getElementById('narrative-wrapper');
const progress = document.querySelector('.progress');

// LOCK BODY SCROLL INITIALLY
document.body.classList.add('lock-scroll');

// Fetch and parse CSV with PapaParse
fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const parsed = Papa.parse(csv, { header: true });
    const rows = parsed.data;

    rows.forEach(row => {
      const paragraph = row['Paragraph']?.trim();
      const heading = row['Heading']?.trim();

      if (!paragraph) return;

      const block = document.createElement('div');
      block.className = 'narrative-block';

      if (heading) {
        const h3 = document.createElement('h3');
        h3.textContent = heading;
        block.appendChild(h3);
      }

      const p = document.createElement('p');
      p.textContent = paragraph;
      block.appendChild(p);

      narrativeWrapper.appendChild(block);
    });
  });

// Track scroll progress
narrativeSection.addEventListener('scroll', () => {
  const scrollTop = narrativeSection.scrollTop;
  const scrollHeight = narrativeSection.scrollHeight - narrativeSection.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  progress.style.width = `${scrolled}%`;

  // Unlock scroll when narrative is complete
  if (scrolled >= 99) {
    document.body.classList.remove('lock-scroll');
  }
});
