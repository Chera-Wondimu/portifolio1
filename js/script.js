/* =========================================
   CHERA WONDIMU — PORTFOLIO
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.classList.add("js-enabled");

    // 1. Mobile Navigation
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navLinks?.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Open navigation menu");
    }

    menuToggle?.addEventListener("click", () => {
        if (!navLinks) return;

        const isOpen = navLinks.classList.toggle("open");

        document.body.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navItems.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (
            navLinks?.classList.contains("open") &&
            !navLinks.contains(event.target) &&
            !menuToggle?.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    // 2. Header, Back to Top, and Theme Toggle
    const header = document.getElementById("header");
    const backToTop = document.getElementById("backToTop");
    const themeBtn = document.getElementById("theme-btn");

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            try {
                localStorage.setItem("theme", newTheme);
            } catch (e) {}
        });
    }

    if (backToTop) {
        backToTop.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 3. Active Navigation
    const sections = document.querySelectorAll("main section[id]");

    function updateActiveNavigation() {
        let currentSection = "hero";

        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= 160) {
                currentSection = section.id;
            }
        });

        navItems.forEach((link) => {
            const isActive =
                link.getAttribute("href") === `#${currentSection}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    let ticking = false;

    function handleScroll() {
        if (ticking) return;

        ticking = true;

        requestAnimationFrame(() => {
            const scrollPosition = window.scrollY;

            header?.classList.toggle("scrolled", scrollPosition > 30);
            backToTop?.classList.toggle("visible", scrollPosition > 450);

            updateActiveNavigation();
            ticking = false;
        });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 4. Typewriter Effect
    const typewriter = document.getElementById("typewriter");

    const roles = [
        "backend systems",
        "full-stack applications",
        "REST APIs",
        "software solutions",
        "algorithmic solutions"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function typeEffect() {
        if (!typewriter) return;

        const currentRole = roles[roleIndex];

        if (!deleting) {
            characterIndex++;

            typewriter.textContent = currentRole.substring(
                0,
                characterIndex
            );

            if (characterIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeEffect, 1400);
                return;
            }
        } else {
            characterIndex--;

            typewriter.textContent = currentRole.substring(
                0,
                characterIndex
            );

            if (characterIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(typeEffect, deleting ? 40 : 80);
    }

    if (typewriter) {
        if (reducedMotion) {
            typewriter.textContent = roles[0];
        } else {
            typeEffect();
        }
    }

    // 5. Scroll Reveal
    const revealElements = document.querySelectorAll(".reveal");

    if (!reducedMotion && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.10,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("active");
        });
    }

    // 6. Footer Year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // 7. Shared Statistics Helpers
    const REFRESH_INTERVAL = 5 * 60 * 1000;

    function getTimeLabel() {
        return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    async function fetchJSON(url) {
        const response = await fetch(url, {
            signal: AbortSignal.timeout(15000),
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
    }

    // 8. LeetCode Statistics
    async function loadLeetCodeStats() {
        const totalElement = document.getElementById("leetcode-total");
        const easyElement = document.getElementById("leetcode-easy");
        const mediumElement = document.getElementById("leetcode-medium");
        const hardElement = document.getElementById("leetcode-hard");
        const statusElement = document.getElementById("leetcode-status");

        const easyBar = document.getElementById("easy-bar");
        const mediumBar = document.getElementById("medium-bar");
        const hardBar = document.getElementById("hard-bar");

        if (!totalElement) return;

        const username = "Chera_Wondimu";

        const endpoint =
            `https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(username)}`;

        if (statusElement) {
            statusElement.textContent = "Loading LeetCode statistics...";
        }

        try {
            const data = await fetchJSON(endpoint);

            if (
                data.status !== "success" ||
                typeof data.totalSolved !== "number"
            ) {
                throw new Error("Invalid LeetCode response.");
            }

            const easy = Number(data.easySolved) || 0;
            const medium = Number(data.mediumSolved) || 0;
            const hard = Number(data.hardSolved) || 0;
            const total = Number(data.totalSolved) || 0;

            totalElement.textContent = total;

            if (easyElement) easyElement.textContent = easy;
            if (mediumElement) mediumElement.textContent = medium;
            if (hardElement) hardElement.textContent = hard;

            const denominator = easy + medium + hard || 1;

            if (easyBar) {
                easyBar.style.width = `${(easy / denominator) * 100}%`;
            }

            if (mediumBar) {
                mediumBar.style.width = `${(medium / denominator) * 100}%`;
            }

            if (hardBar) {
                hardBar.style.width = `${(hard / denominator) * 100}%`;
            }

            if (statusElement) {
                statusElement.textContent =
                    `Live statistics updated at ${getTimeLabel()}`;
            }

        } catch (error) {
            console.error("LeetCode API error:", error);

            if (statusElement) {
                statusElement.textContent =
                    "LeetCode statistics temporarily unavailable.";
            }
        }
    }

    // 9. Codeforces Statistics
    async function loadCodeforcesStats() {
        const solvedElement = document.getElementById("cf-solved");
        const ratingElement = document.getElementById("cf-rating");
        const maxRatingElement = document.getElementById("cf-max-rating");
        const rankElement = document.getElementById("cf-rank");
        const statusElement = document.getElementById("codeforces-status");

        if (!ratingElement && !solvedElement) return;

        const username = "chera.wondimu17";

        const userEndpoint =
            `https://codeforces.com/api/user.info?handles=${encodeURIComponent(username)}`;

        const submissionsEndpoint =
            `https://codeforces.com/api/user.status?handle=${encodeURIComponent(username)}`;

        if (statusElement) {
            statusElement.textContent = "Loading Codeforces statistics...";
        }

        try {
            const [profileData, submissionsData] = await Promise.all([
                fetchJSON(userEndpoint),
                fetchJSON(submissionsEndpoint)
            ]);

            if (
                profileData.status !== "OK" ||
                !Array.isArray(profileData.result) ||
                profileData.result.length === 0
            ) {
                throw new Error("Invalid Codeforces profile response.");
            }

            if (
                submissionsData.status !== "OK" ||
                !Array.isArray(submissionsData.result)
            ) {
                throw new Error("Invalid Codeforces submissions response.");
            }

            const user = profileData.result[0];

            const solvedProblems = new Set();

            submissionsData.result.forEach((submission) => {
                if (
                    submission.verdict === "OK" &&
                    submission.problem &&
                    submission.problem.contestId !== undefined &&
                    submission.problem.index
                ) {
                    const problemKey =
                        `${submission.problem.contestId}-${submission.problem.index}`;

                    solvedProblems.add(problemKey);
                }
            });

            if (solvedElement) {
                solvedElement.textContent = solvedProblems.size;
            }

            if (ratingElement) {
                ratingElement.textContent =
                    typeof user.rating === "number"
                        ? user.rating
                        : "Unrated";
            }

            if (maxRatingElement) {
                maxRatingElement.textContent =
                    typeof user.maxRating === "number"
                        ? user.maxRating
                        : "—";
            }

            if (rankElement) {
                rankElement.textContent = user.rank || "Not rated yet";
            }

            if (statusElement) {
                statusElement.textContent =
                    `Live statistics updated at ${getTimeLabel()}`;
            }

        } catch (error) {
            console.error("Codeforces API error:", error);

            if (statusElement) {
                statusElement.textContent =
                    "Codeforces statistics temporarily unavailable.";
            }
        }
    }

    // 10. Initialize and Automatically Refresh Statistics
    async function refreshStatistics() {
        await Promise.all([
            loadLeetCodeStats(),
            loadCodeforcesStats()
        ]);
    }

    refreshStatistics();

    setInterval(refreshStatistics, REFRESH_INTERVAL);
});
