const portfolioInfo = {
    name: "Arjun Vijay Prakash",
    personalBrand: 'ArjunCodess',
    title: "Full Stack Developer",
    about: "I'm a 14-year-old full-stack developer, aspiring writer and student who loves to design & build stuff.",
    summary: "I'm Arjun Vijay Prakash, a 14-year-old full-stack developer, technical writer and student from India. I've been building websites and apps since I was young. I love turning ideas into reality through code. I've already shipped over 20 projects and even made some money freelancing. I share my coding journey on my blog, where I've built a community of over 30,000 followers. I'm actively looking to collaborate on projects, as well as on my blog.",
    skills: [
        "Clerk", "Cloudinary", "Drizzle ORM", "Express.js", "GSAP", "JavaScript",
        "MongoDB", "Next.js", "Node.js", "Python", "React.js", "Shadcn/UI",
        "SQL", "Tailwind CSS", "Typescript"
    ],
    experience: [
        {
            company: "Self Employed",
            position: "Full Stack Developer",
            duration: "2020 - Present",
            description: "I have profound skills in Full-Stack Web Application Development and a little bit in design too. I have built projects ranging from simple games and mini implementations of data tools to more complex applications like social media platforms, e-commerce stores, and popular app clones. I'm learning new things all the time, so it's a mix of good and bad code on my GitHub."
        }
    ],
    education: [
        {
            school: "City Montessori School",
            degree: "Intermediate +2 Course",
            duration: "2012 - 2028"
        }
    ],
    contact: "email: arjunv.prakash12345@gmail.com | tel: +91 8601404303",
    certificates: {
        cs50: [
            "CS50x Ready Player 50 Winner",
            "CS50 Technology Completion",
            "CS50x Completion",
            "CS50x Puzzle Day 2024 Winner Team"
        ],
        freeCodeCamp: [
            "Frontend Development Libraries Completion",
            "College Algebra with Python",
            "Responsive Web Design"
        ]
    }
};

const asciiBanner = `
▄▀█ █▀█ ░░█ █░█ █▄░█ █▀▀ █▀█ █▀▄░█▀▀ █▀ █▀
█▀█ █▀▄ █▄█ █▄█ █░▀█ █▄▄░█▄█ █▄▀ ██▄ ▄█░▄█
`;

let commandHistory = [];

const terminalOutput = document.getElementById('terminal-output');
const commandInput = document.getElementById('command-input');

function initializeTerminal() {
    commandHistory = [
        centerASCII(asciiBanner),
        "Type 'help' for available commands.",
    ];
    updateTerminal();
}

function centerASCII(art) {
    const lines = art.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    return lines.map(line => line.padStart(line.length + Math.floor((maxLength - line.length) / 2)).padEnd(maxLength)).join('\n');
}

function updateTerminal() {
    terminalOutput.innerHTML = commandHistory.map(line => 
        `<div${line.startsWith('$') ? ' style="margin-top: 1rem;"' : ''}>${line}</div>`
    ).join('');
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function executeCommand(command) {
    const [cmd, ...args] = command.trim().split(" ");
    let output = "";

    switch (cmd.toLowerCase()) {
        case "about":
            output = getAboutInfo();
            break;
        case "skills":
            output = getSkillsInfo();
            break;
        case "experience":
            output = getExperienceInfo();
            break;
        case "education":
            output = getEducationInfo();
            break;
        case "contact":
            output = getContactInfo();
            break;
        case "clear":
            clearTerminal();
            return;
        case "help":
            output = getHelpInfo();
            break;
        case "certificates":
            output = getCertificatesInfo();
            break;
        default:
            output = `Command not recognized: ${cmd}. Type 'help' for available commands.`;
    }

    commandHistory.push(`$ ${command}`, output, "");
    updateTerminal();
}

function getAboutInfo() {
    return `Name: ${portfolioInfo.name}\nPersonal Brand: ${portfolioInfo.personalBrand}\nTitle: ${portfolioInfo.title}\n\n${portfolioInfo.about}\n\n${portfolioInfo.summary}`;
}

function getSkillsInfo() {
    return portfolioInfo.skills.join(", ");
}

function getExperienceInfo() {
    return "Professional Experience:\n\n" + portfolioInfo.experience.map(exp =>
        `${exp.position} (${exp.duration})\n${exp.company}\n${exp.description}\n`
    ).join("\n");
}

function getEducationInfo() {
    return portfolioInfo.education.map(edu => `${edu.degree}\n${edu.school}\n${edu.duration}\n`).join("\n");
}

function getContactInfo() {
    return portfolioInfo.contact;
}

function getCertificatesInfo() {
    let output = "";
    output += "CS50:\n" + portfolioInfo.certificates.cs50.map(cert => `- ${cert}`).join('\n') + "\n\n";
    output += "freeCodeCamp:\n" + portfolioInfo.certificates.freeCodeCamp.map(cert => `- ${cert}`).join('\n');
    return output;
}

function getHelpInfo() {
    return "Available commands:\n\n" +
        "about        - Display personal information\n" +
        "skills       - List technical skills\n" +
        "experience   - Show work experience\n" +
        "education    - Display educational background\n" +
        "certificates - Display CS50 and freeCodeCamp certificates\n" +
        "contact      - Show contact information\n" +
        "clear        - Clear the terminal\n" +
        "help         - Show this help message";
}

function clearTerminal() {
    commandHistory = [
        centerASCII(asciiBanner),
        "Terminal cleared. Type 'help' for available commands.",
    ];
    updateTerminal();
}

function handleUserInput(e) {
    if (e.key === "Enter" && commandInput.value.trim()) {
        executeCommand(commandInput.value);
        commandInput.value = "";
    }
}

function generateStars(count) {
    const starsContainer = document.getElementById('stars-container');
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        const size = `${Math.random() * 3 + 1}px`;
        star.style.width = size;
        star.style.height = size;
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animation = `twinkle ${Math.random() * 5 + 3}s linear infinite`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }
}

function init() {
    commandInput.addEventListener('keydown', handleUserInput);
    generateStars(200);
    initializeTerminal();
}

init();