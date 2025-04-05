document.addEventListener("DOMContentLoaded", function () {
    const rosterForm = document.getElementById("roster-form");
    const playerTable = document.getElementById("roster-body");
    let editMode = false;
    let currentEditRow = null;

    // Handle form submission
    rosterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const playerPic = document.getElementById("player-pic").value;
        const playerNumber = document.getElementById("player-number").value;
        const playerName = document.getElementById("player-name").value;
        const playerHometown = document.getElementById("player-hometown").value;
        const playerBirthYear = document.getElementById("player-birthyear").value;

        if (editMode && currentEditRow) {
            // Update existing row
            currentEditRow.cells[0].innerHTML = `<img src="${playerPic}" alt="Player">`;
            currentEditRow.cells[1].innerText = playerNumber;
            currentEditRow.cells[2].innerText = playerName;
            currentEditRow.cells[3].innerText = playerHometown;
            currentEditRow.cells[4].innerText = playerBirthYear;
        } else {
            // Create new row
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td><img src="${playerPic}" alt="Player"></td>
                <td>${playerNumber}</td>
                <td>${playerName}</td>
                <td>${playerHometown}</td>
                <td>${playerBirthYear}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            playerTable.appendChild(newRow);
        }

        resetForm();
    });

    // Handle edit and delete actions
    playerTable.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-btn")) {
            const row = event.target.closest("tr");
            editPlayer(row);
        } else if (event.target.classList.contains("delete-btn")) {
            event.target.closest("tr").remove();
        }
    });

    function editPlayer(row) {
        document.getElementById("player-pic").value = row.cells[0].querySelector("img").src;
        document.getElementById("player-number").value = row.cells[1].innerText;
        document.getElementById("player-name").value = row.cells[2].innerText;
        document.getElementById("player-hometown").value = row.cells[3].innerText;
        document.getElementById("player-birthyear").value = row.cells[4].innerText;
        
        editMode = true;
        currentEditRow = row;
    }

    function resetForm() {
        rosterForm.reset();
        editMode = false;
        currentEditRow = null;
    }
});
