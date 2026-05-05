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
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
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
    postgresql,
    mlflow,
    axios,
    pandas,
    numpy,
    databricks,
    microsoftazure,
    openai,
    apachemaven,
    springboot
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
        imageUrl: postgresql,
        name: "PostgreSQL",
        type: "Database",
    },
    {
        imageUrl: tensorflow,
        name: "TensorFlow",
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
        imageUrl: springboot,
        name: "Spring Boot",
        type: "Backend",
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
];

export const experiences = [
    {
        title: "Software Engineer II",
        company_name: "Honeywell",
        icon: honeywell,
        iconBg: "#ffffff",
        date: "July 2023 - Present",
        points: [
            { heading: "AI-Driven Rule Translation Pipeline" },
            "Designed an agentic RAG pipeline to replace a legacy SkySpark dependency — translates 500+ building energy rules from AXON to a proprietary DSL using layered retrieval across 4 indexes and ANTLR grammar constraints to suppress LLM hallucinations.",
            "Fine-tuned Vertex AI Gemini (JSONL/GCP) on top of the RAG baseline; correction feedback loops back into the knowledge base; shipped as a FastAPI async service with PostgreSQL-backed versioned prompt management, eliminating the SkySpark vendor dependency entirely.",
            { heading: "ML Training Orchestration & Inference Platform" },
            "ML training orchestration on Databricks for 100+ models across 20+ multi-tenant clients using MLFlow — reduced manual setup 80%, maintained 99.5% job success rate.",
            "FastAPI async inference layer processing 10K+ daily predictions across 50+ models at sub-100ms latency; async Delta Lake writes and drift detection cut debugging cycles 60%.",
            "Containerized model deployment pipeline dispatching to Kubernetes or Databricks — cut deploy time from 3 days to 30 minutes, reduced infra costs 35%.",
            { heading: "Security, Quality & LLM Testing" },
            "Security validation pipeline across 5 tools (Coverity, ModelScan, Twistlock, Black Duck Hub, Malware Scan) — caught 40+ vulnerabilities, maintained 100% SOC 2 compliance.",
            "Won company-wide bug bash on Honeywell's flagship LLM assistant; authored LLM testing whitepaper yielding multiple patent submissions; automated 150+ test scenarios, compressing regression from 40 hrs to 5 hrs/sprint.",
        ],
        tools: "MLFlow, FastAPI, Databricks, Unity Catalog, TensorFlow, Vertex AI, GCP, Coverity, ModelScan, Twistlock, Black Duck Hub, Azure Cloud, PostgreSQL, Azure Delta Lake, Kubernetes, Python Behave, TypeScript, WebDriverIO",
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
//    {
//        iconUrl: pricewise,
//        theme: 'btn-back-red',
//        name: 'Eatery Recommender',
//        description: 'Built a group-based restaurant recommendation app that picks spots based on everyone’s location and suggests must-try dishes using OpenAI. FastAPI powers the backend, React + Tailwind handles the UI, and everything runs through a Dockerized CI/CD setup.',
//        link: 'https://github.com/adrianhajdin/pricewise',
//    },

    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'Lox Interpreter (from Crafting Interpreters)',
        description: 'Built a full Java-based interpreter for Lox, a dynamically typed scripting language, by following Crafting Interpreters. Implemented scanning, parsing, AST generation, and a tree-walk evaluator from scratch, a deep dive into how programming languages actually work. Extended it with better error reporting, a small standard library, and an interactive REPL to make it more practical and user-friendly.',
        link: '/interpreter',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'HylyTool Chrome Extension',
        description: 'Built a lightweight, privacy-first Chrome extension to make studying and reading online more focused. With just a click, you can blur out distracting content or highlight important text using custom colors. Features a clean popup UI, persistent settings with Chrome Sync, and a snappy user experience, keeping speed and simplicity in mind.',
        link: 'https://chromewebstore.google.com/detail/hylytool/nobfjmbpgjmimofjmgomnnojenplfmgm',
    },
    // {
    //     iconUrl: snapgram,
    //     theme: 'btn-back-pink',
    //     name: 'Weekend Activity Aggregator',
    //     description: 'Built a fast, async-powered tool that crawls popular event listing sites to find fun things to do over the weekend: gigs, workshops, meetups etc. Might turn it into a simple web dashboard but for now, it gives me a quick weekend gameplan with just one command.',
    //     link: 'https://github.com/adrianhajdin/social_media_app',
    // }
];