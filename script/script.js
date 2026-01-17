// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navbar = document.querySelector(".navbar");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    const isExpanded = navbar.classList.contains("active");
    navbar.classList.toggle("active");
    mobileMenuToggle.setAttribute("aria-expanded", !isExpanded);

    const icon = mobileMenuToggle.querySelector("i");
    if (navbar.classList.contains("active")) {
      icon.classList.remove("bx-menu");
      icon.classList.add("bx-x");
    } else {
      icon.classList.remove("bx-x");
      icon.classList.add("bx-menu");
    }
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      mobileMenuToggle.setAttribute("aria-expanded", false);
      const icon = mobileMenuToggle.querySelector("i");
      icon.classList.remove("bx-x");
      icon.classList.add("bx-menu");
    });
  });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.startsWith("#")) {
      e.preventDefault();

      // Update active nav link
      document.querySelectorAll(".navbar a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Active nav link on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// GitHub API Integration for Projects Page
if (document.getElementById("projects-container")) {
  const username = "SuneethaBandaru";
  const projectsContainer = document.getElementById("projects-container");
  const loading = document.getElementById("loading");
  const errorMessage = document.getElementById("error-message");

  async function fetchGitHubProjects() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const repos = await response.json();
      loading.style.display = "none";

      if (repos.length === 0) {
        errorMessage.style.display = "block";
        errorMessage.querySelector("p").textContent = "No projects found.";
        return;
      }

      repos.forEach((repo) => {
        const projectCard = createProjectCard(repo);
        projectsContainer.appendChild(projectCard);
      });
    } catch (error) {
      console.error("Error fetching GitHub projects:", error);
      loading.style.display = "none";
      errorMessage.style.display = "block";
    }
  }

  function createProjectCard(repo) {
    const card = document.createElement("div");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = repo.name;

    const description = document.createElement("p");
    description.textContent = repo.description || "No description available";

    const language = document.createElement("span");
    language.className = "project-language";
    language.textContent = repo.language || "Not specified";

    const linksContainer = document.createElement("div");
    linksContainer.className = "project-links";

    // GitHub Link - Always present
    const githubLink = document.createElement("a");
    githubLink.href = repo.html_url;
    githubLink.className = "project-link";
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    githubLink.innerHTML = '<i class="bx bxl-github"></i> GitHub';
    linksContainer.appendChild(githubLink);

    // Live Demo Link
    if (repo.homepage && repo.homepage.trim() !== "") {
      const liveLink = document.createElement("a");
      liveLink.href = repo.homepage;
      liveLink.className = "project-link";
      liveLink.target = "_blank";
      liveLink.rel = "noopener noreferrer";
      liveLink.innerHTML = '<i class="bx bx-link-external"></i> Live Demo';
      linksContainer.appendChild(liveLink);
    } else {
      // If no homepage, create a GitHub Pages link
      const pagesLink = document.createElement("a");
      pagesLink.href = `https://${username}.github.io/${repo.name}`;
      pagesLink.className = "project-link";
      pagesLink.target = "_blank";
      pagesLink.rel = "noopener noreferrer";
      pagesLink.innerHTML = '<i class="bx bx-link-external"></i> Live Demo';
      linksContainer.appendChild(pagesLink);
    }

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(language);
    card.appendChild(linksContainer);

    return card;
  }

  // Fetch projects when page loads
  fetchGitHubProjects();
}

// Contact Form Handling with mailto
if (document.getElementById("contact-form")) {
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Basic validation
    if (!name || !email || !subject || !message) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    // Create mailto link
    const mailtoLink = `mailto:sidda24suneetha@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(
      `Name:  ${name}\nEmail:  ${email}\nSubject:  ${subject}\nMessage:  ${message}`,
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    showMessage("Opening your email client...", "success");

    // Reset form
    contactForm.reset();
  });

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none";
    }, 5000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded successfully!");
});
