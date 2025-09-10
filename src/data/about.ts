// data/aboutData.ts
import { CurrentActivity, Track } from "../types/about";

export const personalInfo = {
  location: "Durg, India",
  description:
    "Backend engineer, system designer, and open-source enthusiast building scalable solutions.",
};

export const bioData = {
  paragraphs: [
    "I'm a B.Tech student at IIT Bhilai passionate about backend systems and infrastructure. I love building tools that solve real problems - from API gateways and service meshes to community platforms for my university.",
    "As Coordinator of OpenLake (our open-source club), I help fellow students contribute to meaningful projects. I've also worked with organizations like MOSIP and IIT Bombay, developing systems for digital identity and computational tools.",
    "When I'm not coding, you'll find me exploring new technologies, solving competitive programming problems, or thinking about how to make complex systems more elegant and efficient.",
  ],
};

export const journeyData = {
  paragraphs: [
    "My development journey started during 11th and 12th grade when I chose Computer Science and got my first taste of programming with Python. Those early experiences sparked something that would soon become a passion.",

    "When I entered IIT Bhilai in my first semester, I dove headfirst into C and C++, focusing intensively on competitive programming and data structures & algorithms. The logical problem-solving aspect of CP became addictive, and I spent countless hours perfecting my approach to algorithmic challenges.",

    "Everything changed in my second semester when I discovered web development. I started with the fundamentals - HTML, CSS, and JavaScript - before diving into the MERN stack. Suddenly, I could build things that people could actually use and interact with. The transition from console applications to full-stack web applications opened up a whole new world of possibilities.",

    "The summer after my first year was transformative. I landed an internship under IBITF working on a library automation project, where I got hands-on experience with NextJS and NestJS. This was also when I explored ElectronJS, fascinated by the idea of building desktop applications with web technologies. But I didn't stop there - I also delved into machine learning, studied operating systems through the famous OSTEP book, and even picked up Flutter in the final month of summer break. This period taught me the value of continuous learning and exploring diverse technologies.",

    "Third semester marked a major shift in my development philosophy. I learned Golang and built AcadMap, but more importantly, I joined OpenLake as a core member and started contributing to open source. This was when I truly fell in love with collaborative development and the open source ethos. I also studied Deep Learning and data processing, learned Docker for containerization, and picked up Django. The combination of systems knowledge and ML started shaping my technical interests.",

    "Fourth semester was when everything accelerated. I got selected for MOSIP as part of the C4GT sprint, which introduced me to Spring Boot and enterprise-level development. I dove deeper into data science, learned FastAPI, and completed projects like Spotify analysis and Reddit analysis. But the real game-changer was getting more involved in open source - I applied for and became OpenLake coordinator, a role that would define much of my subsequent journey.",

    "The summer after my second year was intense and rewarding. I interned at FOSSEE (IIT Bombay) working with React and Django, while simultaneously being selected for C4GT DMP with MOSIP again. This period marked my entry into DevOps and my growing interest in low-level systems. I made open source contributions in Go, built my own BitTorrent client from scratch, and started reading about databases at the lowest level. Taking on the role of Coordinator, I was now leading one of IIT Bhilai’s largest student-driven open-source clubs, managing ~15 projects, setting technical roadmaps, and mentoring juniors. This was my first real experience blending leadership with engineering.",

    "Currently in my fifth semester, I've started focusing seriously on low-level design patterns and system architecture. I'm working on the Meta Learning Adaptive Learned Index project as part of my ML course, which perfectly combines my interests in machine learning and database systems. Alongside research, I’ve been diving deeper into low-level systems, Rust, and distributed databases. My current goal is to bridge the gap between systems performance and intelligent automation.",
  ],
};

export const skillsData = [
  {
    title: "Backend Development",
    description:
      "Building scalable APIs, microservices, and distributed systems with modern tech stacks.",
  },
  {
    title: "System Design",
    description:
      "Architecting robust systems with service meshes, API gateways, and monitoring solutions.",
  },
  {
    title: "Open Source",
    description:
      "Contributing to community projects and leading open-source initiatives at university.",
  },
  {
    title: "Research",
    description:
      "Working on ML-based database optimization and adaptive model selection for learned indexes.",
  },
];

export const beyondCodeData = {
  content:
    "I believe great engineers are also lifelong learners and community builders. I use Zettelkasten methods to organize knowledge and always look for ways to help fellow developers grow. Outside of tech, I’m a curious data geek who loves diving into music, exploring the world of Pokémon, and unwinding with Minecraft — little escapes that keep me inspired and creative.",
};

export const getMockCurrentActivity = (): CurrentActivity => ({
  status: "researching",
  project: "MetaIndex",
  link: "https://github.com/amaydixit11/DSL501_ML_Project",
  language: "Python",
});

export const getMockCurrentTrack = (): Track => ({
  name: "Weightless",
  artist: "Marconi Union",
  album: "Ambient Soundscapes",
  isPlaying: true,
});

export const achievementsData = [
  "Selected for MOSIP Internship",
  "Coordinator @ OpenLake",
  "Codeforces Rating: 1320",
];

export const learningData = [
  "Meta Learning",
  "Databases",
  "Rust",
  "Distributed Systems",
];

export const quickLinksData = [
  {
    href: "https://github.com/amaydixit11",
    label: "GitHub Profile",
    icon: "github" as const,
    external: true,
  },
  {
    href: "https://codeforces.com/profile/amaydixit11",
    label: "Codeforces",
    icon: "code" as const,
    external: true,
  },
  {
    label: "Always up for coffee ☕",
    icon: "coffee" as const,
  },
];
