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


/* =========================================================
   Case-study diagram enhancement
   Turns raw ASCII workflow blocks into polished visual flows.
   ========================================================= */
(function enhanceCaseStudyDiagrams(){
  if (!document.body.classList.contains('project-page')) return;

  const clean = (value) => value
    .replace(/[│┃]/g,' ')
    .replace(/[┌┐└┘├┤┬┴┼]/g,' ')
    .replace(/\s+/g,' ')
    .replace(/^[\s\-_.]+|[\s\-_.]+$/g,'')
    .trim();

  document.querySelectorAll('.project-section pre').forEach((pre) => {
    const raw = pre.textContent.trim();
    if (!raw) return;

    const isFlow = /[↓→↘]|\n\s*[│┃▼]/.test(raw) ||
      /candidate|calendar|gmail|whatsapp|google sheets|gemini|n8n|postgres|drive|webhook|router/i.test(raw);

    if (!isFlow) {
      pre.classList.add('case-code-block');
      return;
    }

    const lines = raw.split('\n').map(clean).filter(Boolean);
    const meaningful = [];
    lines.forEach((line) => {
      if (/^(↓|▼|→|↔|\|)+$/.test(line)) return;
      if (/^[^A-Za-z0-9]+$/.test(line)) return;
      if (!meaningful.includes(line)) meaningful.push(line);
    });

    if (!meaningful.length) return;
    const flow = document.createElement('div');
    flow.className = 'case-flow';
    flow.innerHTML = '<div class="case-flow-label">SYSTEM FLOW · VISUALIZED</div><div class="case-flow-track"></div>';
    const track = flow.querySelector('.case-flow-track');

    meaningful.slice(0, 12).forEach((item, index) => {
      const node = document.createElement('div');
      const isResult = /^(gmail|whatsapp|google sheets|schedule|store|notification|multi-channel)/i.test(item) || index === meaningful.length - 1;
      const isCore = /^(n8n|gemini|ai|ai agent|switch|status check|postgres|google calendar|google drive|webhook)/i.test(item);
      node.className = 'case-flow-node' + (isResult ? ' case-flow-result' : '') + (isCore ? ' accent' : '');
      node.innerHTML = '<strong>' + item.replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</strong>' +
        (index === 0 ? '<small>Input / trigger</small>' : index === meaningful.length - 1 ? '<small>Automated outcome</small>' : '<small>Workflow step</small>');
      track.appendChild(node);
      if (index < Math.min(meaningful.length, 12) - 1) {
        const arrow = document.createElement('span');
        arrow.className = 'case-flow-arrow';
        arrow.textContent = '→';
        track.appendChild(arrow);
      }
    });
    pre.replaceWith(flow);
  });
})();
