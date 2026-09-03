/* =========================================================
   TYPING ANIMATION
========================================================= */

const typingText = document.getElementById("typingText");

const words = [
    "Java Developer",
    "Python Developer",
    "Web Developer",
    "Programmer",
    "ICE Student"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;


        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }


    const speed = deleting ? 50 : 100;

    setTimeout(typeEffect, speed);

}


typeEffect();



/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon =
        menuBtn.querySelector("i");


    if (navLinks.classList.contains("show")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});



/* Close mobile menu */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon =
            menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navItems =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;


        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});



/* =========================================================
   GITHUB PROJECTS
========================================================= */

const githubUsername =
    "mrttanzim76-cmd";


const projectsContainer =
    document.getElementById("github-projects");



/*
    Custom descriptions for your existing repositories.
*/

const projectDescriptions = {

    "AirlineReservationSystem":

        "A Django-based Airline Reservation System featuring flight search, booking, online check-in, flight tracking, price maps, e-ticket PDF generation and QR verification.",


    "ICE-3206-B":

        "An academic web development project created for ICE coursework using HTML and CSS.",


    "student-profile-portal":

        "A student profile portal website featuring a clean profile interface built with HTML and CSS.",


    "travel-explorer-bd":

        "A Bangladesh travel exploration website featuring destinations, travel packages, gallery and contact pages with a responsive interface.",


    "TechSphere":

        "A technology-focused multi-page website covering technologies, products, innovation and related information."

};



/* =========================================================
   PROJECT NAME
========================================================= */

function formatProjectName(name) {

    const names = {

        "AirlineReservationSystem":
            "SkyLedger Airline Reservation System",

        "ICE-3206-B":
            "ICE-3206-B Web Project",

        "student-profile-portal":
            "Student Profile Portal",

        "travel-explorer-bd":
            "Travel Explorer BD",

        "TechSphere":
            "TechSphere"

    };


    return names[name] || name;

}



/* =========================================================
   PROJECT ICON
========================================================= */

function getProjectIcon(repo) {

    const name =
        repo.name.toLowerCase();


    if (
        name.includes("airline") ||
        name.includes("reservation")
    ) {

        return "fa-plane";

    }


    if (
        name.includes("travel") ||
        name.includes("explorer")
    ) {

        return "fa-map-location-dot";

    }


    if (
        name.includes("student") ||
        name.includes("profile")
    ) {

        return "fa-user-graduate";

    }


    if (
        name.includes("tech")
    ) {

        return "fa-microchip";

    }


    return "fa-code";

}



/* =========================================================
   CREATE PROJECT CARD
========================================================= */

function createProjectCard(repo) {

    const card =
        document.createElement("div");

    card.className = "project-card";


    const description =
        projectDescriptions[repo.name] ||

        repo.description ||

        "A project developed as part of my programming and development journey.";


    const language =
        repo.language || "Code";


    const icon =
        getProjectIcon(repo);


    card.innerHTML = `

        <div class="project-top">

            <div class="project-icon">

                <i class="fa-solid ${icon}"></i>

            </div>

            <span class="project-language">

                ${language}

            </span>

        </div>


        <h3>

            ${formatProjectName(repo.name)}

        </h3>


        <p class="project-description">

            ${description}

        </p>


        <div class="project-meta">

            <span>

                <i class="fa-regular fa-star"></i>

                ${repo.stargazers_count} stars

            </span>


            <span>

                <i class="fa-solid fa-code-branch"></i>

                ${repo.forks_count} forks

            </span>

        </div>


        <a
            href="${repo.html_url}"
            target="_blank"
            rel="noopener noreferrer"
            class="project-link">

            View on GitHub

            <i class="fa-solid fa-arrow-up-right-from-square"></i>

        </a>

    `;


    return card;

}



/* =========================================================
   LOAD GITHUB PROJECTS
========================================================= */

async function loadGitHubProjects() {

    try {

        const response = await fetch(

            `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`

        );


        if (!response.ok) {

            throw new Error(
                "GitHub API request failed"
            );

        }


        const repos =
            await response.json();


        /*
            Sort by recently updated.
        */

        repos.sort(

            (a, b) =>

                new Date(b.updated_at) -
                new Date(a.updated_at)

        );


        /*
            Remove loading screen.
        */

        projectsContainer.innerHTML = "";


        /*
            No repositories.
        */

        if (repos.length === 0) {

            projectsContainer.innerHTML = `

                <div class="loading-projects">

                    <p>
                        No public projects found.
                    </p>

                </div>

            `;

            return;

        }


        /*
            Create project cards.
        */

        repos.forEach(repo => {

            const card =
                createProjectCard(repo);

            projectsContainer.appendChild(card);

        });

    }


    catch (error) {

        console.error(
            "GitHub Error:",
            error
        );


        projectsContainer.innerHTML = `

            <div class="loading-projects">

                <i
                    class="fa-brands fa-github"
                    style="
                        font-size:35px;
                        margin-bottom:15px;
                    ">
                </i>


                <p>
                    Unable to load GitHub projects right now.
                </p>


                <a
                    href="https://github.com/${githubUsername}?tab=repositories"
                    target="_blank"
                    class="project-link"
                    style="margin-top:12px;">

                    View Projects on GitHub

                    <i class="fa-solid fa-arrow-up-right-from-square"></i>

                </a>

            </div>

        `;

    }

}


loadGitHubProjects();



/* =========================================================
   PROFILE IMAGE FALLBACK
========================================================= */

const profileImage =
    document.querySelector(".profile-image");


profileImage.addEventListener("error", () => {

    profileImage.style.display = "none";


    const frame =
        document.querySelector(".image-frame");


    const placeholder =
        document.createElement("div");


    placeholder.style.position = "absolute";

    placeholder.style.inset = "0";

    placeholder.style.display = "flex";

    placeholder.style.alignItems = "center";

    placeholder.style.justifyContent = "center";

    placeholder.style.flexDirection = "column";

    placeholder.style.gap = "12px";

    placeholder.style.color = "#a78bfa";


    placeholder.innerHTML = `

        <i
            class="fa-solid fa-user"
            style="font-size:70px;">
        </i>

        <span
            style="
                font-size:13px;
                color:#888894;
            ">

            Add your photo

        </span>

    `;


    frame.appendChild(placeholder);

});