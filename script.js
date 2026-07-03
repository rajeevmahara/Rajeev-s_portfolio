/* ============ NAVBAR: mobile toggle + scrolled state ============ */
const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open");
});

// close mobile menu when a link is clicked
navLinks.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.classList.remove("open");
    });
});

/* ============ SCROLL PROGRESS BAR ============ */
const scrollProgress = document.getElementById("scrollProgress");
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + "%";
}
window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
});

/* ============ ACTIVE LINK ON SCROLL ============ */
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

function setActiveLink() {
    const scrollPos = window.scrollY + 160;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                navLinkEls.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        }
    });
}
window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

/* ============ SCROLL REVEAL (Intersection Observer) ============ */
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ============ BACK TO TOP ============ */
const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============ CONTACT FORM VALIDATION ============ */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all fields.";
        formStatus.style.color = "#e07b7b";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.style.color = "#e07b7b";
        return;
    }

    // NOTE: this only validates the form. To actually send messages,
    // connect this to EmailJS or your own backend endpoint here.
    formStatus.textContent = "Message sent! I'll get back to you soon.";
    formStatus.style.color = "#f2b25c";
    contactForm.reset();
});

/* ============ HERO: ROLE ROTATOR (type / delete loop) ============ */
const roleEl = document.getElementById("roleRotator");
const roles = ["Frontend Developer", "Full Stack Developer"];
let roleIndex = 0, charIndex = roles[0].length, typingForward = false;

function tickRole() {
    const current = roles[roleIndex];
    if (!typingForward) {
        // deleting
        charIndex--;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex <= 0) {
            typingForward = true;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(tickRole, 400);
            return;
        }
        setTimeout(tickRole, 35);
    } else {
        // typing
        charIndex++;
        const next = roles[roleIndex];
        roleEl.textContent = next.slice(0, charIndex);
        if (charIndex >= next.length) {
            typingForward = false;
            setTimeout(tickRole, 1800);
            return;
        }
        setTimeout(tickRole, 60);
    }
}
if (roleEl) setTimeout(tickRole, 1800);

/* ============ HERO PHOTO: TILT ON MOUSE MOVE ============ */
const tiltFrame = document.getElementById("tiltFrame");
if (tiltFrame && window.matchMedia("(hover: hover)").matches) {
    tiltFrame.addEventListener("mousemove", (e) => {
        const rect = tiltFrame.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        tiltFrame.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`;
    });
    tiltFrame.addEventListener("mouseleave", () => {
        tiltFrame.style.transform = "rotateY(0) rotateX(0) scale(1)";
    });
}

/* ============ MAGNETIC BUTTONS ============ */
if (window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".magnetic").forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0,0)";
        });
    });
}
