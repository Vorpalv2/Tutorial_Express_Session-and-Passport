const hamburgerButton = document.querySelector(".hamburger-menu button");
const navLinks = document.querySelector(".nav-links");

hamburgerButton.addEventListener("click", () => {
  navLinks.classList.toggle("show"); // Add/remove 'show' class to toggle visibility
});

console.log("hello from fronendjs");
