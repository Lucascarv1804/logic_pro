const rankingTable = document.getElementById("ranking-table");
const rankingBody = document.getElementById("ranking-body");
const ranking = JSON.parse(localStorage.getItem("ranking"));

ranking.forEach((usuario, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${usuario.nome}</td>
    <td>${usuario.score}</td>
  `;
  rankingBody.appendChild(row);
});