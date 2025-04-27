document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("player-form");
  const tbody = document.getElementById("roster-table-body");
  let editingId = null;

  // Load players
  async function loadRoster() {
    const res = await fetch("/api/roster");
    const players = await res.json();
    tbody.innerHTML = "";
    players.forEach(player => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="photos/${player.photo || 'nophoto.jpg'}" alt="${player.name}" width="50"/></td>
        <td>${player.playernumber}</td>
        <td>${player.name}</td>
        <td>${player.hometown}</td>
        <td>${player.birthyear}</td>
        <td>
          <button onclick="editPlayer('${player._id}')">Edit</button>
          <button onclick="deletePlayer('${player._id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  // Save (add or update)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      playernumber: form.playerNumber.value,
      name: form.playerName.value,
      hometown: form.playerHometown.value,
      birthyear: form.playerBirthYear.value,
      photo: form.playerPicture.value || 'nophoto.jpg' // pull string value
    };

    if (editingId) {
      await fetch(`/api/roster/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      editingId = null;
    } else {
      await fetch("/api/roster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    }

    form.reset();
    loadRoster();
  });

  window.editPlayer = async function (id) {
    const res = await fetch(`/api/roster`);
    const players = await res.json();
    const player = players.find(p => p._id === id);
    if (!player) return;
    form.playerNumber.value = player.playernumber;
    form.playerName.value = player.name;
    form.playerHometown.value = player.hometown;
    form.playerBirthYear.value = player.birthyear;
    form.playerPicture.value = player.photo || '';  // prefill filename
    editingId = id;
  };

  window.deletePlayer = async function (id) {
    if (confirm("Are you sure?")) {
      await fetch(`/api/roster/${id}`, { method: "DELETE" });
      loadRoster();
    }
  };

  loadRoster();
});
