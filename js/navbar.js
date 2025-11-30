const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const icon = document.querySelector("i");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      icon.classList.replace("fa-bars", "fa-xmark");
    } else {
      icon.classList.replace("fa-xmark", "fa-bars");
    }
  });
}

// Remove 'active' class on window resize if desktop
function handleResize() {
  if (window.innerWidth >= 768) {
    navLinks.classList.remove("active");
    icon.classList.replace("fa-xmark", "fa-bars");
  }
}

window.addEventListener("resize", handleResize);
