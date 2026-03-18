// script.js

// 1. Typing Effect Logic
const typingText = document.getElementById("typing-text");
const words = ["Data Science Enthusiast", "Building Insights with Data", "ML & Analytics"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Ensure DOM is fully loaded before executing typing
document.addEventListener("DOMContentLoaded", () => {
    if(typingText) setTimeout(typeEffect, 1000);
});

// 2. Sticky Header Logic
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if(!header) return;
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// 3. Mobile Navigation Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if(hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = hamburger.querySelector('i');
        if(navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}

// Close mobile menu when nav item clicked
const navItems = document.querySelectorAll(".nav-links a");
navItems.forEach(item => {
    item.addEventListener("click", () => {
        if(navLinks) navLinks.classList.remove("active");
        if(hamburger) {
            const icon = hamburger.querySelector('i');
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
});

// 4. Update active nav link on scroll
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute("id");
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href").includes(current)) {
            item.classList.add("active");
        }
    });
});

// 5. Scroll Reveal Intersection Observer
const revealElements = document.querySelectorAll(".reveal");

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add("active");
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// 6. Dark/Light Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    
    // Check for saved theme
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") {
        body.classList.add("light-mode");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-mode");
        if (body.classList.contains("light-mode")) {
            localStorage.setItem("portfolio-theme", "light");
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            localStorage.setItem("portfolio-theme", "dark");
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });
}

// 7. Interactive Custom Cursor
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");

if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.top = `${posY}px`;
        cursorDot.style.left = `${posX}px`;
        
        cursorOutline.style.top = `${posY}px`;
        cursorOutline.style.left = `${posX}px`;
        
        // Add hover effects for buttons and links
        const target = e.target;
        if (target.tagName.toLowerCase() === 'a' || 
            target.tagName.toLowerCase() === 'button' || 
            target.closest('a') || 
            target.closest('button')) {
            cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1.3)";
        } else {
            cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        }
    });
}

// 8. Interactive Background Canvas Animation
const canvas = document.getElementById("bg-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = {
        x: null,
        y: null,
        radius: (canvas.height / 80) * (canvas.width / 80)
    };

    window.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        mouse.radius = (canvas.height / 80) * (canvas.width / 80);
        init();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            const isLight = document.body.classList.contains("light-mode");
            ctx.fillStyle = isLight ? "rgba(0, 102, 255, 0.5)" : "rgba(0, 240, 255, 0.5)";
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            this.x += this.directionX;
            this.y += this.directionY;

            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        
        // Cap max particles to ensure smooth performance
        if (numberOfParticles > 120) numberOfParticles = 120;

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5;
            let directionY = (Math.random() * 1) - 0.5;

            particlesArray.push(new Particle(x, y, directionX, directionY, size));
        }
    }

    function connect() {
        const nodes = [...particlesArray];
        let hasMousePos = false;
        if (mouse.x !== null && mouse.y !== null) {
            nodes.push({ x: mouse.x, y: mouse.y });
            hasMousePos = true;
        }
        
        const isLight = document.body.classList.contains("light-mode");
        const maxDistSq = 180 * 180; // connection radius threshold

        for (let a = 0; a < nodes.length; a++) {
            for (let b = a + 1; b < nodes.length; b++) {
                let dx = nodes[a].x - nodes[b].x;
                let dy = nodes[a].y - nodes[b].y;
                let distanceSq = dx * dx + dy * dy;
                
                if (distanceSq < maxDistSq) {
                    let opacityValue = 1 - (distanceSq / maxDistSq);
                    
                    // Highlight connection to the mouse node
                    let isMouseConnection = hasMousePos && (a === nodes.length - 1 || b === nodes.length - 1);
                    opacityValue *= isMouseConnection ? 0.8 : 0.4;
                    
                    ctx.strokeStyle = isLight 
                        ? `rgba(138, 43, 226, ${opacityValue})` 
                        : `rgba(0, 240, 255, ${opacityValue})`;
                    ctx.lineWidth = isMouseConnection ? 1.5 : 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[a].x, nodes[a].y);
                    ctx.lineTo(nodes[b].x, nodes[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    init();
    animate();
}

// 9. 3D Card Hover Tilt Effect for Achievements
const achievementCards = document.querySelectorAll('.achievement-card');

achievementCards.forEach(card => {
    // Inject glare element contextually
    const glareWrapper = document.createElement('div');
    glareWrapper.classList.add('glare-wrapper');
    const glare = document.createElement('div');
    glare.classList.add('glare');
    glareWrapper.appendChild(glare);
    card.appendChild(glareWrapper);

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Tilt range calculation (Max tilt 10 degrees)
        const tiltX = ((y - centerY) / centerY) * -10; 
        const tiltY = ((x - centerX) / centerX) * 10;
        
        // Glare angle calculation
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) - 90;
        glare.style.transform = `rotate(${angle}deg) translate(-50%, -50%)`;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        // Smooth return reset
        card.style.transition = `transform 0.5s ease`;
        
        setTimeout(() => {
            card.style.transition = ``; // Revert back to CSS stylesheet transition
        }, 500);
    });
    
    card.addEventListener('mouseenter', () => {
        // Remove ease duration for snappy mouse tracking
        card.style.transition = `transform 0.1s ease-out`;
    });
});

// 10. Certificates Carousel Drag to Scroll
const carousel = document.querySelector('.certificates-carousel');
if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.scrollSnapType = 'none'; // Disable snapping while gracefully dragging
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.scrollSnapType = 'x mandatory';
    });
    
    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.scrollSnapType = 'x mandatory';
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Tracking scroll speed
        carousel.scrollLeft = scrollLeft - walk;
    });
}

// 11. Projects Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    // slight delay to allow display: flex to apply before opacity transitions if any
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'none';
                    }, 10);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
}