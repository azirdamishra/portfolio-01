import { honeywell } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
    python,
    java,
    webpack,
    docker,
    kubernetes,
    fastapi,
    tensorflow,
    redis,
    postgresql,
    mlflow,
    keras,
    axios,
    pandas,
    numpy,
    databricks,
    microsoftazure,
    openai,
    apachemaven
} from "../assets/icons";

export const skills = [
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Programming",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Programming",
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Programming",
    },
    {
        imageUrl: java,
        name: "Java",
        type: "Programming",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: fastapi,
        name: "FastAPI",
        type: "Backend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: axios,
        name: "Axios",
        type: "Frontend",
    },
    {
        imageUrl: webpack,
        name: "Webpack",
        type: "Build & Tooling",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: docker,
        name: "Docker",
        type: "DevOps",
    },
    {
        imageUrl: kubernetes,
        name: "Kubernetes",
        type: "DevOps",
    },
    {
        imageUrl: microsoftazure,
        name: "Azure",
        type: "Cloud",
    },
    {
        imageUrl: redis,
        name: "Redis",
        type: "Database",
    },
    {
        imageUrl: postgresql,
        name: "PostgreSQL",
        type: "Database",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: tensorflow,
        name: "TensorFlow",
        type: "ML & Data",
    },
    {
        imageUrl: keras,
        name: "Keras",
        type: "ML & Data",
    },
    {
        imageUrl: mlflow,
        name: "MLflow",
        type: "ML & Data",
    },
    {
        imageUrl: databricks,
        name: "Databricks",
        type: "ML & Data",
    },
    {
        imageUrl: pandas,
        name: "Pandas",
        type: "ML & Data",
    },
    {
        imageUrl: numpy,
        name: "NumPy",
        type: "ML & Data",
    },
    {
        imageUrl: openai,
        name: "OpenAI",
        type: "AI",
    },
    {
        imageUrl: apachemaven,
        name: "Maven",
        type: "Build & Tooling",
    },
    {
        imageUrl: motion,
        name: "Motion",
        type: "Animation",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
];

export const experiences = [
    {
        title: "Software Engineer II",
        company_name: "Honeywell",
        icon: honeywell,
        iconBg: "#ffffff",
        date: "July 2023 - Present",
        points: [
            "ML orchestration platform on Databricks — 100+ models, 20+ clients, 80% less manual setup.",
            "Patented ML security pipeline integrating 5 scanning tools; cut validation to <10 min and caught 40+ critical vulnerabilities.",
            "Containerized model deployment pipeline for Kubernetes & Databricks — 3 days to 30 min, 35% cost reduction.",
            "Inference service powering 10K+ daily predictions across 50+ models at sub-100ms latency.",
            "Led QA for Honeywell's flagship LLM assistant — won company bug bash; testing whitepaper led to patent submissions.",
            "Automated test suite (WebDriverIO + Behave) — 150+ scenarios, 90% coverage, regression time cut from 40 hrs to 5 per sprint.",
        ],
        tools: "MLFlow, FastAPI, Databricks, Unity Catalog, TensorFlow, Coverity, ModelScan, Twistlock, Black Duck Hub, Azure Cloud, Postgres, Azure Delta Lake, Kubernetes, Python Behave",
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/YourGitHubUsername',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/YourLinkedInUsername',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'Eatery Recommender',
        description: 'Built a group-based restaurant recommendation app that picks spots based on everyone’s location and suggests must-try dishes using OpenAI. FastAPI powers the backend, React + Tailwind handles the UI, and everything runs through a Dockerized CI/CD setup.',
        link: 'https://github.com/adrianhajdin/pricewise',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'Lox Interpreter (from Crafting Interpreters)',
        description: 'Built a full Java-based interpreter for Lox, a dynamically typed scripting language, by following Crafting Interpreters. Implemented scanning, parsing, AST generation, and a tree-walk evaluator from scratch, a deep dive into how programming languages actually work. Extended it with better error reporting, a small standard library, and an interactive REPL to make it more practical and user-friendly.',
        link: 'https://github.com/adrianhajdin/threads',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'HylyTool Chrome Extension',
        description: 'Built a lightweight, privacy-first Chrome extension to make studying and reading online more focused. With just a click, you can blur out distracting content or highlight important text using custom colors. Features a clean popup UI, persistent settings with Chrome Sync, and a snappy user experience, keeping speed and simplicity in mind.',
        link: 'https://github.com/adrianhajdin/project_next13_car_showcase',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Weekend Activity Aggregator',
        description: 'Built a fast, async-powered tool that crawls popular event listing sites to find fun things to do over the weekend: gigs, workshops, meetups etc. Might turn it into a simple web dashboard but for now, it gives me a quick weekend gameplan with just one command.',
        link: 'https://github.com/adrianhajdin/social_media_app',
    }
];