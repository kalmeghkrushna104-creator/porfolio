import { PortfolioData } from "./types";

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Krushna Arun Kalmegh",
    title: "Full-Stack Developer & MCA Student",
    company: "HVPM's Degree College, Amravati",
    location: "Amravati, Maharashtra, India",
    bio: "I am an MCA (Semester II) student who prefers building complete, working applications over just following tutorials. Comfortable across the entire stack: from Python cybersecurity game engines and computer vision face trackers, to full-stack React/Node.js web portals and PHP/MySQL systems. I enjoy creating practical, well-architected applications that solve real-world problems.",
    heroGreeting: "Hello, I'm Krushna. I build working applications from concept to completion.",
    email: "kalmeghkrushna104@gmail.com",
    github: "https://github.com/kalmeghkrushna104-creator",
    linkedin: "https://linkedin.com/in/krushna-kalmegh-8106583aa",
    twitter: "",
    resumeUrl: "#"
  },
  projects: [
    {
      id: "proj-1",
      title: "Placement.AI — AI-Powered Placement Platform",
      description: "A collaborative hackathon platform featuring Express REST APIs and MongoDB, finishing in the Top 50 teams at the Grand Finale.",
      longDescription: "Placement.AI is an AI-powered placement assistance system built with a 4-person team (Team TechRock) during a high-energy hackathon. I led backend systems engineering, designing and setting up the Node.js/Express APIs, configuring authentication routes, and connecting the backend services directly to MongoDB database clusters. Out of all participating entries, our platform placed in the Top 50 teams at the hackathon Grand Finale.",
      tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "Hackathon"],
      category: "Full-Stack SaaS",
      role: "Backend API Developer",
      year: "2026",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
      demoUrl: "",
      githubUrl: "https://github.com/kalmeghkrushna104-creator",
      highlights: [
        "Collaborated in a fast-paced 4-person hackathon squad (Team TechRock) to design clean system architecture.",
        "Built and validated secure Node.js/Express REST endpoints handling candidate registration and mock assessments.",
        "Placed in the Top 50 teams at the Grand Finale hosted at P.R. Pote Patil College of Engineering, Amravati."
      ]
    },
    {
      id: "proj-2",
      title: "Cyber Defence Simulation Game",
      description: "An immersive 2D Python/Pygame game engine featuring 7 cybersecurity rooms and a live Linux terminal challenge shell.",
      longDescription: "A self-initiated computer security simulation game. Built with Pygame, it offers an educational layout consisting of 7 distinct rooms, an XP leveling engine, and a fully interactive terminal challenge shell. Players solve authentic command-line challenges that simulate real Linux server terminal interactions, with all state, progression, and high scores persistent using an integrated SQLite3 local storage system.",
      tags: ["Python", "Pygame", "SQLite", "Cybersecurity", "Terminal Simulation", "Git"],
      category: "Desktop & Games",
      role: "Solo Developer",
      year: "2025",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      demoUrl: "",
      githubUrl: "https://github.com/kalmeghkrushna104-creator/cyber-defence-game",
      highlights: [
        "Independently planned, designed, and coded a 7-stage interactive cyber defence training simulator in Pygame.",
        "Engineered a simulated Linux terminal parser executing and validating actual command-line challenge strings.",
        "Implemented lightweight persistence via SQLite3 for saving user progress across system reboots."
      ]
    },
    {
      id: "proj-3",
      title: "Webcam Face Recognition Attendance System",
      description: "An automated real-time computer vision system that captures and logs student attendance directly to CSV spreadsheets.",
      longDescription: "A webcam-based vision system built to automate classroom roll-calls. Utilizing OpenCV and the face_recognition Python library, it captures live camera streams, matches facial descriptors with high-dimensional encodings of enrolled users in real-time, and logs corresponding timestamps and attendance records straight to a local CSV file.",
      tags: ["Python", "OpenCV", "Face Recognition", "Computer Vision", "Spreadsheet Logging"],
      category: "Computer Vision",
      role: "Solo Developer",
      year: "2025",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80",
      demoUrl: "",
      githubUrl: "https://github.com/kalmeghkrushna104-creator",
      highlights: [
        "Programmed a live webcam feed analyzer that dynamically detects, highlights, and labels matched faces in milliseconds.",
        "Structured accurate face-match scoring parameters to operate reliably in fluctuating indoor lighting environments.",
        "Created an automated CSV writer script that writes verified student records without any manual intervention."
      ]
    },
    {
      id: "proj-4",
      title: "Online Examination Portal",
      description: "A full-featured PHP/MySQL learning and assessment platform with secure student sessions and timed exams.",
      longDescription: "A full-stack student assessment and test portal created on XAMPP stack. It includes distinct administrative and student logins, interactive MCQ tests, countdown timers for exams, and automatic score calculations with database persistence.",
      tags: ["PHP", "MySQL", "XAMPP", "HTML", "CSS", "Database Normalization"],
      category: "Full-Stack Web",
      role: "Solo Developer",
      year: "2025",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      demoUrl: "",
      githubUrl: "https://github.com/kalmeghkrushna104-creator",
      highlights: [
        "Formulated the relational database models for holding questions, secure users, and individual attempt statistics.",
        "Built PHP session filters preventing unauthorized URL access, duplicate submissions, and page refreshes during exams.",
        "Created a student progress panel compiling grades and timed accuracy analytics dynamically."
      ]
    }
  ],
  skills: [
    { name: "Python (Pygame, OpenCV)", category: "Programming Languages", level: 90, iconName: "Terminal" },
    { name: "Java / SQL", category: "Programming Languages", level: 85, iconName: "Cpu" },
    { name: "JavaScript / C / PHP", category: "Programming Languages", level: 88, iconName: "Code2" },
    { name: "React", category: "Web Technologies", level: 75, iconName: "Layers" },
    { name: "Node.js / Express", category: "Web Technologies", level: 82, iconName: "Server" },
    { name: "HTML & CSS", category: "Web Technologies", level: 90, iconName: "Palette" },
    { name: "MySQL & SQLite", category: "Databases", level: 88, iconName: "Database" },
    { name: "MongoDB", category: "Databases", level: 80, iconName: "HardDrive" },
    { name: "Git & GitHub", category: "Version Control", level: 90, iconName: "GitBranch" },
    { name: "Linux CLI", category: "Operating Systems", level: 82, iconName: "Terminal" }
  ],
  experience: [
    {
      id: "exp-1",
      role: "MCA Student (Semester II)",
      company: "HVPM's Degree College of Physical Education, Amravati",
      period: "2025 - Present",
      description: "Pursuing Master of Computer Applications (MCA) with a focus on core software engineering principles, distributed systems, web architectures, and hands-on application cycles.",
      points: [
        "Maintaining a 6.25 CGPA through Semester II.",
        "Undertook intense self-directed coding courses to bridge classroom theory with production-ready software solutions.",
        "Built complex security simulators, vision-based attendance captures, and database engines."
      ]
    },
    {
      id: "exp-2",
      role: "Java Full Stack Developer Trainee",
      company: "Swami Logipool Infotech, Pune (In collaboration with HVPM)",
      period: "Feb 16 - Mar 14, 2026",
      description: "Participated in an intensive, 60-hour professional development and coding program specialized in enterprise Java architectures.",
      points: [
        "Crafted robust, scalable REST APIs using Spring Boot framework architectures.",
        "Gained hands-on proficiency writing database procedures, constraints, and standard query commands in MySQL.",
        "Established collaborative repository standards utilizing Git branching models."
      ]
    },
    {
      id: "exp-3",
      role: "BCA Graduate",
      company: "GH Raisoni University, Amravati",
      period: "Completed June 2025",
      description: "Graduated with a Bachelor of Computer Applications, acquiring foundational knowledge in algorithm structures, systems analysis, OOP concepts, and SQL database systems.",
      points: [
        "Graduated with a Semester VI CGPA of 7.58 (SGPA of 7.00).",
        "Participated in multiple inter-college hackathons and code bug finding competitions.",
        "Built full-stack academic examination applications using PHP and MySQL."
      ]
    }
  ]
};
