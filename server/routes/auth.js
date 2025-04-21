async function checkLogin() {
    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;
  
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  
    if (res.ok) {
      sessionStorage.setItem("isAdmin", "true");
      window.location.href = "admin-dashboard.html";
    } else {
      document.getElementById("error-message").innerText = "Incorrect username or password!";
    }
  }
  