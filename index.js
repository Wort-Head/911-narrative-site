const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTe8fVErZdZX_A9ypryzdKCAOcftjmQQBBdu9vxwUzcjvatt7De7jtzALKO4-Pqgk4SJVyS0Vj0fYY7/pub?output=csv";
const narrativeContainer = document.getElementById('narrative');

fetch(sheetURL)
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch Google Sheet.");
    return res.text();
  })
  .then(csv => {
    const parsed = Papa.parse(csv, { header: true });
    const rows = parsed.data;

    narrativeContainer.innerHTML = ""; // Clear "loading..."

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

      narrativeContainer.appendChild(block);
    });
  })
  .catch(err => {
    narrativeContainer.innerHTML = `<p style="color:red;">⚠️ Error loading narrative: ${err.message}</p>`;
  });
