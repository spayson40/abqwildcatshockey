// public/scripts/admin.js

// Check if the user is authenticated
if (!sessionStorage.getItem("isAdmin")) {
    window.location.href = "admin-login.html";
}

// Placeholder for MongoDB connection
const API_BASE_URL = "http://localhost:5000"; 

// Get and display roster
async function fetchRoster() {
    const response = await fetch(`${API_BASE_URL}/roster`);
    const players = await response.json();
    
    const tableBody = document.getElementById("roster-table-body");
    tableBody.innerHTML = "";
    
    players.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${player.picture}" alt="Player"></td>
            <td>${player.number}</td>
            <td>${player.name}</td>
            <td>${player.hometown}</td>
            <td>${player.birthYear}</td>
            <td>
                <button onclick="editPlayer('${player._id}')">Edit</button>
                <button onclick="deletePlayer('${player._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// add or update player
async function submitRoster(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const playerData = Object.fromEntries(formData.entries());
    const method = playerData.id ? "PUT" : "POST";
    const url = playerData.id ? `${API_BASE_URL}/roster/${playerData.id}` : `${API_BASE_URL}/roster`;
    
    await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerData)
    });
    
    fetchRoster();
}

// Function to delete a player
async function deletePlayer(playerId) {
    await fetch(`${API_BASE_URL}/roster/${playerId}`, { method: "DELETE" });
    fetchRoster();
}

// Function to edit a player
async function editPlayer(playerId) {
    const response = await fetch(`${API_BASE_URL}/roster/${playerId}`);
    const player = await response.json();
    
    document.getElementById("player-id").value = player._id;
    document.getElementById("player-number").value = player.number;
    document.getElementById("player-name").value = player.name;
    document.getElementById("player-hometown").value = player.hometown;
    document.getElementById("player-birthYear").value = player.birthYear;
    document.getElementById("player-picture").value = player.picture;
}

// Load roster on page load
document.addEventListener("DOMContentLoaded", fetchRoster);
