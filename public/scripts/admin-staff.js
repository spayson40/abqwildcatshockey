document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("staff-form");
    const tbody = document.getElementById("staff-table-body");
    let editingId = null;

    async function loadStaff() {
        const res = await fetch("/api/staff");
        const staff = await res.json();
        tbody.innerHTML = "";
        staff.forEach(member => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${member.photo || 'photos/nophoto.jpg'}" alt="${member.name}" width="50"></td>
                <td>${member.position}</td>
                <td>${member.name}</td>
                <td>${member.hometown}</td>
                <td><a href="mailto:${member.email}">${member.email}</a></td>
                <td>
                    <button onclick="editStaff('${member._id}')">Edit</button>
                    <button onclick="deleteStaff('${member._id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
            photo: form.staffPicture.value,
            position: form.staffPosition.value,
            name: form.staffName.value,
            hometown: form.staffHometown.value,
            email: form.staffEmail.value
        };

        if (editingId) {
            await fetch(`/api/staff/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            editingId = null;
        } else {
            await fetch("/api/staff", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        }

        form.reset();
        loadStaff();
    });

    window.editStaff = async function (id) {
        const res = await fetch("/api/staff");
        const staff = await res.json();
        const member = staff.find(m => m._id === id);
        if (!member) return;
        form.staffPicture.value = member.photo;
        form.staffPosition.value = member.position;
        form.staffName.value = member.name;
        form.staffHometown.value = member.hometown;
        form.staffEmail.value = member.email;
        editingId = id;
    };

    window.deleteStaff = async function (id) {
        if (confirm("Are you sure you want to delete this staff member?")) {
            await fetch(`/api/staff/${id}`, { method: "DELETE" });
            loadStaff();
        }
    };

    loadStaff();
});
