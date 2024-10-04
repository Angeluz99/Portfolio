document.addEventListener("mousemove", function (e) {
  const about = document.querySelector(".ThisIs");
  const photo = document.querySelector("#myPhoto");
  const { clientX: x, clientY: y } = e;
  const { left, top, width, height } = about.getBoundingClientRect();
  const calcX = -(x - (left + width / 2)) / 20;
  const calcY = -(y - (top + height / 2)) / 20;
  about.style.textShadow = `${calcX}px ${calcY}px 4px rgba(0,0,0,0.8)`;
  photo.style.boxShadow = `${calcX}px ${calcY}px 4px rgba(0,0,0,0.5)`;
});

//WORK CARDS SLIDE
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll(".gridWorks section").forEach((section) => {
  observer.observe(section);
});

//copy email to clipboard
document.getElementById("copyEmail").addEventListener("click", function () {
  const email = "angelgldiaz@gmail.com";

  // Use the Clipboard API to copy the text
  navigator.clipboard.writeText(email);

  // Display a confirmation message
  const atIcon = document.getElementById("bi-at");
  const confirmationMessage = document.getElementById("confirmationMessage");
  atIcon.style.display = "none";

  confirmationMessage.textContent = "Email copied!";
  confirmationMessage.style.display = "block";
  // Remove the message after 2 seconds
  setTimeout(function () {
    confirmationMessage.style.display = "none";
    atIcon.style.display = "block";
  }, 1200);
});

//video
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".gridWorks section");

  sections.forEach((section) => {
    const video = section.querySelector(".videoWork");

    section.addEventListener("mouseover", function () {
      video.play();
    });

    section.addEventListener("mouseout", function () {
      video.pause();
      // video.currentTime = 0; // Opcional: restablecer el video al inicio
    });
  });
});

//blur certification backg
const certificationImg = document.querySelector(".certificationImg");
const elementsToBlur = document.querySelectorAll(".skillsSub, .CV, .stack");

certificationImg.addEventListener("mouseover", () => {
  elementsToBlur.forEach((element) => {
    element.style.filter = "blur(5px)";
  });
});

certificationImg.addEventListener("mouseout", () => {
  elementsToBlur.forEach((element) => {
    element.style.filter = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the user agent string
  var userAgent = navigator.userAgent;

  // Function to detect if the Facebook in-app browser is being used
  function isFacebookInAppBrowser() {
    return (
      userAgent.includes("FBAN") ||
      userAgent.includes("FBAV") ||
      userAgent.includes("FBIOS")
    );
  }

  // Function to detect the current browser and return the corresponding image source and alt text
  function getCurrentBrowserImage() {
    if (isFacebookInAppBrowser()) {
      return { src: "facebook.png", alt: "Facebook in-app browser" };
    } else if (userAgent.includes("Chrome")) {
      return { src: "chrome.png", alt: "Google Chrome" };
    } else if (userAgent.includes("Safari")) {
      return { src: "safari.png", alt: "Safari" };
    } else if (userAgent.includes("Firefox")) {
      const aside = document.querySelector("#aside");
      aside.style.backgroundColor = "#1b0c3d";
      // document.getElementById('nav').classList.remove('fader');
      document.getElementById("nav").style.top = "29vh";

      return { src: "firefox.png", alt: "Firefox" };
    } else {
      return { src: "unknown.png", alt: "Por Angel Diaz." };
    }
  }

  var browserInfo = getCurrentBrowserImage();
  var browserImage = document.createElement("img");
  browserImage.src = browserInfo.src;
  browserImage.alt = browserInfo.alt;

  // Insert the image into the span element
  var browserInfoSpan = document.getElementById("browserInfo");
  browserInfoSpan.appendChild(browserImage);
});

//VIEWPORT tracker

// Verificar el archivo HTML actual
let isSpanish = window.location.pathname.includes("indexEsp.html");

// Definir los nombres de las secciones en ambos idiomas
const translations = {
  about: isSpanish ? "Portada" : "About",
  works: isSpanish ? "Trabajos" : "Works",
  skills: isSpanish ? "Habilidades" : "Skills",
  contact: isSpanish ? "Contacto" : "Contact",
};

const sections = ["about", "works", "skills", "contact"];

let sectionTimes = {};

// Inicializar el seguimiento de tiempo para cada sección
sections.forEach((section) => {
  sectionTimes[section] = {
    startTime: null,
    totalTime: 0,
  };
});

const viewer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const section = entry.target.id;
      if (entry.isIntersecting) {
        sectionTimes[section].startTime = new Date();
      } else if (sectionTimes[section].startTime) {
        const endTime = new Date();
        const timeSpent = (endTime - sectionTimes[section].startTime) / 1000;
        sectionTimes[section].totalTime += timeSpent;
        sectionTimes[section].startTime = null;
      }
    });
  },
  { threshold: 0.5 }
);

// Observar todas las secciones
sections.forEach((section) => {
  const sectionElement = document.getElementById(section);
  if (sectionElement) {
    viewer.observe(sectionElement);
  }
});

// Mostrar el reporte al hacer clic en el botón
document.getElementById("showReportBtn").addEventListener("click", () => {
  let reportText = "";
  sections.forEach((section) => {
    const timeSpent = sectionTimes[section].totalTime.toFixed(2);
    reportText += `${translations[section]}: ${timeSpent} Sec.<br>`;
  });
  document.getElementById("reportText").innerHTML = reportText;
  document.getElementById("reportOverlay").style.display = "flex";
});

// Cerrar el reporte y recargar la página
document.getElementById("closeReportBtn").addEventListener("click", () => {
  location.reload();
});
