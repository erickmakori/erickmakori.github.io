/*==========================================================
  Eric Makori Portfolio
  main.js
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*====================================
      Elements
    ====================================*/

    const header = document.querySelector(".header");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");
    const themeToggle = document.getElementById("themeToggle");

    /*====================================
      Sticky Header
    ====================================*/

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

    /*====================================
      Active Navigation
    ====================================*/

    function updateNavigation() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 140;

            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateNavigation);

    /*====================================
      Scroll Reveal
    ====================================*/

    const revealItems = document.querySelectorAll(
        ".hero-card,.stat,.timeline-item,.skill-card,.project-card,.blog-card,.section-title"
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    revealItems.forEach(item => {

        item.classList.add("hidden");

        observer.observe(item);

    });

    /*====================================
      Counter Animation
    ====================================*/

    const counters = document.querySelectorAll(".stat h2");

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const text = counter.textContent;

            const value = parseInt(text.replace(/\D/g, ""));

            if (!value) return;

            let current = 0;

            const increment = Math.ceil(value / 50);

            const timer = setInterval(() => {

                current += increment;

                if (current >= value) {

                    current = value;

                    clearInterval(timer);

                }

                if (text.includes("+")) {

                    counter.textContent = current + "+";

                } else if (text.includes("★")) {

                    counter.textContent = current / 10 + "★";

                } else {

                    counter.textContent = current;

                }

            }, 25);

            counterObserver.unobserve(counter);

        });

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /*====================================
      Dark / Light Mode
    ====================================*/

    const root = document.documentElement;

    const darkTheme = {

        "--primary": "#2563eb",
        "--primary-light": "#60a5fa",
        "--dark": "#0f172a",
        "--dark-2": "#1e293b",
        "--light": "#ffffff",
        "--gray": "#64748b",
        "--gray-light": "#e2e8f0"

    };

    const lightTheme = {

        "--primary": "#2563eb",
        "--primary-light": "#3b82f6",
        "--dark": "#111827",
        "--dark-2": "#ffffff",
        "--light": "#f8fafc",
        "--gray": "#475569",
        "--gray-light": "#dbe4ef"

    };

    let darkMode = true;

    themeToggle.addEventListener("click", () => {

        const theme = darkMode ? lightTheme : darkTheme;

        Object.entries(theme).forEach(([key, value]) => {

            root.style.setProperty(key, value);

        });

        document.body.classList.toggle("light-mode");

        themeToggle.textContent = darkMode ? "☀️" : "🌙";

        localStorage.setItem(
            "theme",
            darkMode ? "light" : "dark"
        );

        darkMode = !darkMode;

    });

    /*====================================
      Restore Theme
    ====================================*/

    if (localStorage.getItem("theme") === "light") {

        themeToggle.click();

    }

    /*====================================
      Smooth Button Hover
    ====================================*/

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "translateY(-4px) scale(1.02)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "translateY(0) scale(1)";

        });

    });

    /*====================================
      Hero Image Animation
    ====================================*/

    const profile = document.querySelector(".profile-image");

    if (profile) {

        profile.addEventListener("mousemove", e => {

            const rect = profile.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateY = (x - rect.width / 2) / 18;

            const rotateX = (rect.height / 2 - y) / 18;

            profile.style.transform =
                `perspective(600px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.04)`;

        });

        profile.addEventListener("mouseleave", () => {

            profile.style.transform =
                "perspective(600px) rotateX(0) rotateY(0) scale(1)";

        });

    }

    /*====================================
      Back To Top Button
    ====================================*/

    const topButton = document.createElement("button");

    topButton.className = "top-button";

    topButton.innerHTML = "↑";

    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topButton.classList.add("visible");

        } else {

            topButton.classList.remove("visible");

        }

    });

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /*====================================
      Project Card Tilt Effect
    ====================================*/

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateX = (rect.height / 2 - y) / 25;

            const rotateY = (x - rect.width / 2) / 25;

            card.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

});