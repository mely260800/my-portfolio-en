document.addEventListener("DOMContentLoaded", () => {
  // Elementos
  const projectDisplay = document.getElementById("projectDisplay");
  const sectionButtons = document.querySelectorAll(".console-btn");
  const languageSelect = document.getElementById("languageSelect");
  const headerTitle = document.querySelector(".header h1");
  const subtitleEl = document.querySelector(".subtitle");
  const footerContactTitle = document.querySelector(".footer h2");
  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");
  const upBtn = document.getElementById("upBtn");
  const downBtn = document.getElementById("downBtn");

  // Datos de proyectos
  const projects = {
    web: [
      {
        title: { en: "Portfolio Website", es: "Portafolio Web" },
        img: "img/WebApp-Portfolio.png",
        desc: {
          en: "Personal portfolio showcasing my web projects.",
          es: "Portafolio personal con mis proyectos web."
        },
        tools: ["HTML", "CSS", "JavaScript"]
      },
    ],
    mobile: [
      {
        title: { en: "Paws-App", es: "Aplicación móvil Paws-App" },
        img: "img/Paws-App.png",
        desc: {
          en: "Mobile app for pet adoption and care.",
          es: "Aplicación móvil para adopción y cuidado de mascotas."
        },
        tools: ["Swift", "XCode"]
      },
    ],
    uiux: [
      {
        title: { en: "Paws-App UI/UX Design", es: "Paws-App Diseño UI/UX" },
        img: "img/Paws-App-Wireframes.png",
        desc: {
          en: "Wireframes and prototypes designed in Figma.",
          es: "Wireframes y prototipos diseñados en Figma."
        },
        tools: ["Figma", "Prototyping", "User Flow"]
      },
    ],
  };

  // Textos por idioma
  const UI_TEXTS = {
    en: {
      headerName: "Melany Chuquimbalqui",
      subtitle: "Frontend & Mobile Developer | UI/UX Designer",
      contactTitle: "Contact",
      welcome: "Select a category to start 🎮",
      loading: (s) => `Loading ${s}...`,
      btns: { web: "🌐 Web Apps", mobile: "📱 Mobile Apps", uiux: "🎨 UI/UX Design" },
      toolsLabel: "Tools",
      tooltips: {
        up: "Show description",
        down: "Hide description",
        left: "Previous",
        right: "Next"
      }
    },
    es: {
      headerName: "Melany Chuquimbalqui",
      subtitle: "Desarrolladora Frontend & Mobile | Diseñadora UI/UX",
      contactTitle: "Contacto",
      welcome: "Selecciona una categoría para empezar 🎮",
      loading: (s) => `Cargando ${s}...`,
      btns: { web: "🌐 Web Apps", mobile: "📱 Apps Móviles", uiux: "🎨 Diseño UI/UX" },
      toolsLabel: "Herramientas",
      tooltips: {
        up: "Mostrar descripción",
        down: "Ocultar descripción",
        left: "Anterior",
        right: "Siguiente"
      }
    }
  };

  // Estado
  let currentSection = null;
  let currentIndex = 0;
  let lang = localStorage.getItem("siteLang") || "en";

  // Idioma
  if (languageSelect) {
    languageSelect.value = lang;
    languageSelect.addEventListener("change", (e) => {
      lang = e.target.value;
      localStorage.setItem("siteLang", lang);
      applyLanguage();
    });
  }

  function applyLanguage() {
    const t = UI_TEXTS[lang];
    headerTitle.textContent = t.headerName;
    subtitleEl.textContent = t.subtitle;
    footerContactTitle.textContent = t.contactTitle;

    const screen = document.getElementById("consoleScreen");
    screen.classList.add("flash");
    setTimeout(() => screen.classList.remove("flash"), 400);

    sectionButtons.forEach(btn => {
      const key = btn.dataset.section;
      if (key && t.btns[key]) btn.textContent = t.btns[key];
    });

    document.getElementById("upBtn").setAttribute("data-tooltip", t.tooltips.up);
    document.getElementById("downBtn").setAttribute("data-tooltip", t.tooltips.down);
    document.getElementById("leftBtn").setAttribute("data-tooltip", t.tooltips.left);
    document.getElementById("rightBtn").setAttribute("data-tooltip", t.tooltips.right);

    if (!currentSection) {
      projectDisplay.innerHTML = `<p class="welcome-text">${t.welcome}</p>`;
    } else {
      showProject(currentSection, currentIndex, true);
    }
  }

  function showProject(section, index, skipLoading = false) {
    const arr = projects[section];
    if (!arr || !arr.length) return;
    const project = arr[index];
    const titleText = project.title[lang];
    const descText = project.desc[lang];
    const t = UI_TEXTS[lang];

    projectDisplay.style.opacity = 0;
    setTimeout(() => {
      try {
        projectDisplay.innerHTML = `
        <div class="project-content">
          <img src="${project.img}" alt="${titleText}">
          <p class="project-title">${titleText}</p>
          <div class="project-description" style="display:none;">
            <p>${descText}</p>
            <p><strong>${t.toolsLabel}:</strong> ${project.tools.join(", ")}</p>
          </div>
        </div>
      `;
        projectDisplay.style.opacity = 1;
      } catch (error) {
        console.error("Error rendering project:", error);
        projectDisplay.innerHTML = `<p class="welcome-text">Oops! Something went wrong 😢</p>`;
      }
    }, skipLoading ? 0 : 300);
  }

  // Navegación por flechas
  leftBtn.addEventListener("click", () => {
    if (!currentSection) return;
    currentIndex = (currentIndex - 1 + projects[currentSection].length) % projects[currentSection].length;
    showProject(currentSection, currentIndex);
  });

  rightBtn.addEventListener("click", () => {
    if (!currentSection) return;
    currentIndex = (currentIndex + 1) % projects[currentSection].length;
    showProject(currentSection, currentIndex);
  });

  upBtn.addEventListener("click", () => {
    const desc = projectDisplay.querySelector(".project-description");
    if (desc) desc.style.display = "block";
  });

  downBtn.addEventListener("click", () => {
    const desc = projectDisplay.querySelector(".project-description");
    if (desc) desc.style.display = "none";
  });

  // Categorías
  sectionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section;
      if (!projects[section]?.length) {
        projectDisplay.innerHTML = `<p class="welcome-text">${UI_TEXTS[lang].welcome}</p>`;
        currentSection = null;
        return;
      }
      currentSection = section;
      currentIndex = 0;
      showProject(currentSection, currentIndex);
    });
  });

  document.querySelectorAll(".dpad-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("spark");
      setTimeout(() => btn.classList.remove("spark"), 600);
    });
  });

  applyLanguage();
});