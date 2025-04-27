document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("game-form");
    const tbody = document.getElementById("schedule-table-body");  // Use correct ID
    let editingId = null;

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
                    <button onclick="deleteGame('${game._id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
            date: form.gameDate.value,
            time: form.gameTime.value,
            opponent: form.gameOpponent.value,
            location: form.gameLocation.value,
            winloss: form.gameResult.value,
            score: form.gameScore.value
        };

        if (editingId) {
            await fetch(`/api/schedule/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            editingId = null;
        } else {
            await fetch("/api/schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        }

        form.reset();
        loadSchedule();
    });

    window.editGame = async function (id) {
        const res = await fetch("/api/schedule");
        const games = await res.json();
        const game = games.find(g => g._id === id);
        if (!game) return;
        form.gameDate.value = new Date(game.date).toISOString().split('T')[0];
        form.gameTime.value = game.time;
        form.gameOpponent.value = game.opponent;
        form.gameLocation.value = game.location;
        form.gameResult.value = game.winloss || '';
        form.gameScore.value = game.score || '';
        editingId = id;
    };

    window.deleteGame = async function (id) {
        if (confirm("Are you sure you want to delete this game?")) {
            await fetch(`/api/schedule/${id}`, { method: "DELETE" });
            loadSchedule();
        }
    };

    loadSchedule();  // Make sure to load immediately when DOM ready
});
