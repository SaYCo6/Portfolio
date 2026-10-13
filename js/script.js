
    const navbar = document.getElementById("navbar");
    const navLinks = document.getElementById("navLinks");
    const navToggle = document.getElementById("navToggle");
    const allNavLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);

      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
          currentSection = section.id;
        }
      });

      allNavLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + currentSection
        );
      });
    });

    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    allNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    const revealElements = document.querySelectorAll(".reveal");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      revealElements.forEach((element) => observer.observe(element));
    } else {
      revealElements.forEach((element) => element.classList.add("visible"));
    }

    const typingText = document.getElementById("typingText");
    const words = ["Creative Learner", "Web Enthusiast"];
    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (deleting) {
        typingText.textContent = currentWord.substring(0, letterIndex--);
      } else {
        typingText.textContent = currentWord.substring(0, letterIndex++);
      }

      let speed = deleting ? 55 : 95;

      if (!deleting && letterIndex > currentWord.length) {
        speed = 1400;
        deleting = true;
      }

      if (deleting && letterIndex < 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        letterIndex = 0;
        speed = 350;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();

    /* Hero name multi-language cycle: English / Arabic / Japanese */
    const heroName = document.getElementById("heroName");
    const greetingName = document.getElementById("greetingName");
    const nameVariants = [
      { text: "Mohamed El Sayed", cls: "" },
      { text: "محمد السيد", cls: "lang-ar" },
      { text: "モハメド・エルサイード", cls: "lang-ja" }
    ];
    let nameIndex = 0;

    function cycleName() {
      heroName.classList.add("fading");
      greetingName.classList.add("fading");
      setTimeout(() => {
        nameIndex = (nameIndex + 1) % nameVariants.length;
        const variant = nameVariants[nameIndex];
        heroName.textContent = variant.text;
        heroName.className = "hero-name" + (variant.cls ? " " + variant.cls : "");
        heroName.classList.remove("fading");
        greetingName.textContent = variant.text;
        greetingName.className = variant.cls || "";
        greetingName.classList.remove("fading");
      }, 350);
    }

    setInterval(cycleName, 2600);

    /* Matrix rain background */
    (function initMatrix() {
      const canvas = document.getElementById("matrixCanvas");
      const ctx = canvas.getContext("2d");
      let width, height, columns, drops;
      const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789MOHAMEDELSAYED<>/{}";

      function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        const fontSize = 15;
        columns = Math.floor(width / fontSize);
        drops = new Array(columns).fill(1);
      }

      resize();
      window.addEventListener("resize", resize);

      function draw() {
        ctx.fillStyle = "rgba(8, 9, 15, 0.08)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#5eff8f";
        ctx.font = "15px monospace";

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * 15;
          const y = drops[i] * 15;
          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setInterval(draw, 60);
      }
    })();
