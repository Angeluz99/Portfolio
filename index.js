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

// VIEWPORT tracker

// Verificar el archivo HTML actual
let isSpanish = window.location.pathname.includes("indexEsp.html");

// Definir los nombres de las secciones en ambos idiomas
const translations = {
  about: isSpanish ? "Portada" : "About",
  works: isSpanish ? "Trabajos" : "Works",
  skills: isSpanish ? "Habilidades" : "Skills",
  contact: isSpanish ? "Contacto" : "Contact",
};

// Secciones a observar
const sections = ["about", "works", "skills", "contact"];

let sectionTimes = {};

// Inicializar el seguimiento de tiempo para cada sección
sections.forEach((section) => {
  sectionTimes[section] = {
    startTime: null,
    totalTime: 0,
  };
});

// Rastreo de tiempo total en la página
let pageStartTime = new Date(); // Tiempo en el que se cargó la página
let totalPageTime = 0; // Acumulador de tiempo total en la página

// Función para animar el conteo de tiempo
function animateCounter(element, start, end, duration, formatFn = null) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // Progress between 0 and 1
    const value = start + progress * (end - start);

    // Format the value if formatFn is provided
    const displayValue = formatFn
      ? formatFn(value)
      : `${value.toFixed(2)} Sec.`;
    element.innerHTML = displayValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Configurar IntersectionObserver
const viewer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const section = entry.target.id;
      if (entry.isIntersecting) {
        sectionTimes[section].startTime = new Date();
        console.log(`Entering ${section}: Tracking started.`);
      } else if (sectionTimes[section].startTime) {
        const endTime = new Date();
        const timeSpent = (endTime - sectionTimes[section].startTime) / 1000;
        sectionTimes[section].totalTime += timeSpent;
        sectionTimes[section].startTime = null;
        console.log(
          `Exiting ${section}: ${timeSpent.toFixed(
            2
          )}s added. Total: ${sectionTimes[section].totalTime.toFixed(2)}s.`
        );
      }
    });
  },
  { threshold: 0.5 } // Adjust threshold for better accuracy
);

// Observar todas las secciones
sections.forEach((section) => {
  const sectionElement = document.getElementById(section);
  if (sectionElement) {
    viewer.observe(sectionElement);
  }
});

// Formatear el tiempo
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds.toFixed(1)}s`;
}

// Mostrar el reporte al hacer clic en el botón
document.getElementById("showReportBtn").addEventListener("click", () => {
  // Stop tracking the Contact section if it's currently being tracked
  if (sectionTimes.contact.startTime) {
    const endTime = new Date();
    const timeSpent = (endTime - sectionTimes.contact.startTime) / 1000;
    sectionTimes.contact.totalTime += timeSpent;
    sectionTimes.contact.startTime = null;
    console.log(
      `Manually exiting Contact: ${timeSpent.toFixed(
        2
      )}s added. Total: ${sectionTimes.contact.totalTime.toFixed(2)}s.`
    );
  }

  // Calculate total page time
  const pageEndTime = new Date();
  totalPageTime = (pageEndTime - pageStartTime) / 1000;

  // Generate and display the report
  const reportText = document.getElementById("reportText");

  sections.forEach((section) => {
    const timeSpent = sectionTimes[section].totalTime.toFixed(1);

    const sectionReport = document.createElement("div");
    const sectionName = document.createElement("strong");
    sectionName.textContent = `${translations[section]}: `;

    const timeElement = document.createElement("span");
    timeElement.textContent = `${timeSpent} Sec.`;

    sectionReport.appendChild(sectionName);
    sectionReport.appendChild(timeElement);
    reportText.appendChild(sectionReport);

    // Animate the displayed time
    animateCounter(timeElement, 0, sectionTimes[section].totalTime, 500);
  });

  // Add total time spent on the page to the report
  const totalTimeElement = document.createElement("div");
  const totalTimeLabel = document.createElement("strong");
  totalTimeLabel.textContent = isSpanish
    ? "Tiempo total en la página: "
    : "Total Time on Page: ";

  const totalTimeValue = document.createElement("span");
  totalTimeValue.textContent = formatTime(totalPageTime);

  totalTimeElement.appendChild(totalTimeLabel);
  totalTimeElement.appendChild(totalTimeValue);
  reportText.appendChild(totalTimeElement);

  // Animate the total page time
  animateCounter(totalTimeValue, 0, totalPageTime, 500, formatTime);

  // Show the report
  document.getElementById("reportOverlay").style.display = "flex";
});

// Cerrar el reporte y recargar la página
document.getElementById("closeReportBtn").addEventListener("click", () => {
  location.reload();
});
