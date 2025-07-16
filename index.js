const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTe8fVErZdZX_A9ypryzdKCAOcftjmQQBBdu9vxwUzcjvatt7De7jtzALKO4-Pqgk4SJVyS0Vj0fYY7/pub?output=csv";

fetch(sheetURL)
  .then(res => res.text())
  .then(csvText => {
    const results = Papa.parse(csvText, { header: true }); // header:true to skip first row automatically
    const wrapper = document.getElementById('narrative-wrapper');

    results.data.forEach(row => {
      const paragraph = row['paragraph']; // or the exact header name in your CSV
      const heading = row['heading'] || '';

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

      wrapper.appendChild(block);
    });
  });


const section = document.querySelector('.narrative-section');
const progress = document.querySelector('.progress');

section.addEventListener('scroll', () => {
  const scrollTop = section.scrollTop;
  const scrollHeight = section.scrollHeight - section.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  progress.style.width = `${scrolled}%`;
});
