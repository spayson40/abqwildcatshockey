document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("game-form");
    const tbody = document.getElementById("schedule-table-body");
    let editingId = null;
  
    // Load games
    async function loadSchedule() {
      const res = await fetch("/api/schedule");
      const games = await res.json();
      tbody.innerHTML = "";
      games.forEach(game => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${new Date(game.date).toLocaleDateString()}</td>
          <td>${game.time}</td>
          <td>${game.opponent}</td>
          <td>${game.location}</td>
          <td>${game.winloss || ''}</td>
          <td>${game.score || ''}</td>
          <td>
            <button onclick="editGame('${game._id}')">Edit</button>
            <button onclick
  