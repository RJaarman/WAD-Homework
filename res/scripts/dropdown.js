const profileBtn = document.getElementById("profile-btn");
const dropdown = document.getElementById("profile-dropdown");

if (profileBtn && dropdown) {
    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => {
        dropdown.classList.remove("show");
    });

    dropdown.addEventListener("click", (e) => e.stopPropagation());
}