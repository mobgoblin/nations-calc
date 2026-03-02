fetch("data.csv")
  .then(res => res.text())
  .then(text => init(text));

function init(csv) {
  const rows = csv.trim().split("\n").map(r => r.split(","));
  const headers = rows.shift();

  const data = rows.map(row => {
    return {
      nation: row[0],
      gamesWon: +row[1],
      riot: +row[2],
      bands: +row[3],
      powerballs: +row[4],
      cheers1: +row[5],
      cheers2: +row[6],
      misc: +row[7]
    };
  });

  data.forEach(d => {
    d.total =
      d.riot +
      d.bands +
      d.powerballs * 50 +
      d.cheers1 * 100 +
      d.cheers2 * 100 +
      d.misc;
  });

  data.sort((a, b) => b.total - a.total);

  renderTable(data);
}

function renderTable(data) {
  const table = document.getElementById("results-table");
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");

  thead.innerHTML = `
    <tr>
      <th>Rank</th>
      <th>Nation</th>
      <th>Total</th>
    </tr>
  `;

  tbody.innerHTML = data.map((d, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${d.nation}</td>
      <td>${d.total.toFixed(2)}</td>
    </tr>
  `).join("");
}

