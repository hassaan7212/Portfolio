const nav = document.getElementById("navLinks");
const menu = document.getElementById("menuToggle");
const progress = document.getElementById("scrollProgress");

if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    if (nav) nav.classList.remove("open");
    if (menu) menu.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;

  const sections = [...document.querySelectorAll("main section[id]")];
  const current = sections.find(section => {
    const r = section.getBoundingClientRect();
    return r.top <= 120 && r.bottom >= 120;
  });

  document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
  if (current) {
    const active = document.querySelector(`.nav-links a[href="#${current.id}"]`);
    if (active) active.classList.add("active");
  }
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
