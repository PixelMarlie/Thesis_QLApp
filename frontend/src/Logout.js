function logout() {
    fetch('/logout/', { 
        method: 'POST',
        credentials: 'include' 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); 
        localStorage.clear(); 
        window.location.href = "/login"; 
    })
    .catch(error => console.error("Logout failed:", error));
}