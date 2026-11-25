// Project cards. To swap in real screenshots, drop an image into
// assets/projects/ and update the `image` path below.
const projects = [
  {
    name: "Pipeline RCA Agent",
    role: "McLane",
    year: "2026",
    logo: { text: "M", color: "#c8102e" },
    image: "assets/projects/rca-agent.svg",
    href: null,
    description:
      "AI agent that triages Airflow DAG failures and explains the root cause. Cut triage time by 96%, with alerts in email and Teams.",
  },
  {
    name: "DJira",
    role: "Solo Project",
    year: "2025",
    logo: { text: "DJ", color: "#5865f2" },
    image: "assets/projects/djira.svg",
    href: "https://djira-web.vercel.app",
    description:
      "Discord bot that turns messages into structured Jira tickets with Groq. Used across 100+ servers, each with its own Jira auth.",
  },
  {
    name: "ROMO",
    role: "Code for the Community",
    year: "2026",
    logo: { text: "R", color: "#2e9d6a" },
    image: "assets/projects/romo.svg",
    href: null,
    description:
      "Location-aware search for 20+ community resources across San Francisco. Cut search times by 41%.",
  },
  {
    name: "United2Heal",
    role: "Code for the Community",
    year: "2026",
    logo: { text: "U2", color: "#d9485f" },
    image: "assets/projects/united2heal.svg",
    href: null,
    description:
      "Weekly inventory snapshots built on AWS Lambda, summarizing 250+ items and cutting manual review time by 85%.",
  },
  {
    name: "Companion",
    role: "Founder & PM",
    year: "2025",
    logo: { text: "C", color: "#f0a030" },
    image: "assets/projects/companion.svg",
    href: null,
    description:
      "Healthcare app for caregivers. Spring Boot + MySQL backend with OpenAI and Google TTS, deployed on GCP with a team of 3.",
  },
  {
    name: "RosterAI",
    role: "Hackathon",
    year: "2025",
    logo: { text: "R", color: "#1f8fff" },
    image: "assets/projects/rosterai.svg",
    href: "https://devpost.com/software/roster-ai",
    description:
      "React Native app that imports your NFL fantasy roster and scores live news sentiment with Gemini.",
  },
];

const arrowSvg =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function renderProjects() {
  const grid = document.getElementById("projects");
  grid.innerHTML = projects
    .map((p) => {
      const linkAttrs = p.href
        ? `href="${p.href}" target="_blank" rel="noopener noreferrer"`
        : "";
      const tag = p.href ? "a" : "div";
      return `
      <article class="reveal card">
        <${tag} class="preview" ${linkAttrs} ${p.href ? `aria-label="Open ${escapeHtml(p.name)}"` : ""}>
          <img src="${p.image}" alt="${escapeHtml(p.name)} preview" loading="lazy" />
        </${tag}>
        <div class="meta">
          <div class="meta-row">
            <span class="meta-icon">
              <span class="logo" style="--c:${p.logo.color}">${escapeHtml(p.logo.text)}</span>
              <span class="arrow">${arrowSvg}</span>
            </span>
            <h3>${p.href ? `<a ${linkAttrs}>${escapeHtml(p.name)}</a>` : escapeHtml(p.name)}</h3>
            <span class="meta-role">- ${escapeHtml(p.role)}</span>
            <span class="meta-year">${p.year}</span>
          </div>
          <p>${escapeHtml(p.description)}</p>
        </div>
      </article>`;
    })
    .join("");
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  // Stagger the above-the-fold intro items.
  let i = 0;
  items.forEach((el) => {
    if (!el.closest(".grid")) el.style.setProperty("--d", `${Math.min(i++, 12) * 70}ms`);
  });
  // Stagger cards in pairs (one row at a time on desktop).
  document.querySelectorAll(".grid .reveal").forEach((el, idx) => {
    el.style.setProperty("--d", `${(idx % 2) * 100}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => io.observe(el));
}

renderProjects();
setupReveal();
