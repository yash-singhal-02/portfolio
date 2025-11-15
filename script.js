// Skill Bar Animation
window.addEventListener("scroll", () => {
    const skills = document.querySelectorAll(".progress");

    skills.forEach(skill => {
        const position = skill.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 50) {
            skill.style.width = skill.getAttribute("data-width");
        }
    });
});