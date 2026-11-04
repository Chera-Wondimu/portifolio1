document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. INITIALIZE JS LAYOUT SAFETY STATE ---
  document.body.classList.add("js-enabled");

  // --- 2. GLASSMORPHIC NAVBAR CONTROLLER ---
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // --- 3. MOBILE RESPONSIVE DRAWER OVERLAY ---
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-active");
    });
    
    // Auto-collapse layout when selecting targets
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-active");
      });
    });
  }

  // --- 4. DYNAMIC AUTOMATED TYPEWRITER CORE ---
  const typewriterElement = document.getElementById("typewriter");
  const roles = [
    "Software Engineering Student",
    "Competitive Programmer",
    "Python Developer",
    "Problem Solver"
  ];
  
  let roleIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function handleTypewriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      characterIndex--;
      typeSpeed = 40; // Accelerated reversal rate
    } else {
      characterIndex++;
      typeSpeed = 80;  // Standard typing rate
    }

    typewriterElement.textContent = currentRole.substring(0, characterIndex);

    if (!isDeleting && characterIndex === currentRole.length) {
      typeSpeed = 1800; // Hold full sentence on screen
      isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Idle pause before restarting compilation loop
    }

    setTimeout(handleTypewriter, typeSpeed);
  }
  
  if (typewriterElement) handleTypewriter();

  // --- 5. SECURE LAYOUT SCROLL ENGINE ---
  const revealElements = document.querySelectorAll(".scroll-reveal");

  function evaluateScrollReveal() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const triggerThreshold = window.innerHeight * 0.88;

      if (elementTop < triggerThreshold) {
        element.classList.add("active");
      }
    });
  }

  // Run initial pass to instantly uncover headers/home parameters
  evaluateScrollReveal();
  window.addEventListener("scroll", evaluateScrollReveal);

  // Fallback override validation for layout anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        setTimeout(() => {
          targetSection.classList.add("active");
          evaluateScrollReveal();
        }, 400);
      }
    });
  });

});