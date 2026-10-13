export interface Experience {
  company: string;
  role: string;
  date: string;
  details: string[];
  tags: string[];
}

export interface Project {
  category: string;
  title: string;
  desc: string;
  tags: string[];
  color: string;
}

export const experiences: Experience[] = [
  {
    company: "Articulate",
    role: "Founder",
    date: "Present",
    details: [
      "Building automatic construction issue detection software — using computer vision and AI to identify defects, safety hazards, and quality issues on construction sites in real time",
    ],
    tags: ["Computer Vision", "AI/ML", "Full-Stack"],
  },
  {
    company: "Sarvaj.ai",
    role: "Co-founder / ML Engineer",
    date: "May 2025 — Aug 2025",
    details: [
      "Built backend infrastructure for real-time deepfake inference — file upload APIs with Supabase (500+ uploads/min), Redis BullMQ job queues with 200 concurrent inferences, and PostgreSQL schema for media/job records",
      "End-to-end deepfake detection pipeline: generated 1M+ deepfakes via Hugging Face APIs, trained XceptionNet model, deployed AWS SageMaker endpoints with 96% accuracy",
      "Created full-stack AI analysis platform with Next.js, React, TypeScript, and Vercel with real-time dashboard, auth, and paywall",
    ],
    tags: ["Next.js", "Python", "AWS SageMaker", "Redis", "PostgreSQL", "Supabase"],
  },
  {
    company: "Sandia National Laboratories",
    role: "Software Research & Development Intern",
    date: "Aug 2023 — Aug 2024",
    details: [
      "Engineered a scalable file upload system in Django for high-volume audio ingestion, handling files >2GB through chunking and memory-efficient streaming for AI audio scanning",
      "Adapted single-core radiation-hardened chip to dual-core system using Verilog and C with I2C communication; deployed on radiation-heavy weapons systems",
      "Integrated firmware for quantum-resistant root of trust on FPGA with RISC-V, implementing AES/SPHINCS+ crypto and a lifecycle manager with 5+ device states at 60ms latency",
    ],
    tags: ["Verilog", "C", "Django", "FPGA", "RISC-V", "Cryptography"],
  },
  {
    company: "Target",
    role: "Software Engineer",
    date: "Jun 2023 — Aug 2023",
    details: [
      "Engineered a filtering system to remove incomplete data before pipeline ingestion using Apache Spark, Scala, and Kafka — saving 1 petabyte and $150K/year",
      "Upgraded data processing pipeline to Apache Spark 3, reducing latency by 30%",
    ],
    tags: ["Scala", "Apache Spark", "Kafka", "Data Engineering"],
  },
  {
    company: "Xclusive Sports Management",
    role: "Machine Learning Engineer",
    date: "May 2022 — Aug 2022",
    details: [
      "Analyzed 100K+ database entries and trained AI model using H2O GBM to predict MLB recruiting outcomes",
      "Built Python web scraping pipeline using BeautifulSoup/Selenium to scrape 10+ sites for 3K+ datapoints/min",
    ],
    tags: ["Python", "H2O", "Selenium", "Pandas"],
  },
];

export const projects: Project[] = [
  {
    category: "AI / Startup",
    title: "Articulate",
    desc: "Automatic construction issue detection software — using computer vision and AI to identify defects, safety hazards, and quality issues on construction sites in real time. Currently building.",
    tags: ["Computer Vision", "AI/ML", "Python", "Full-Stack"],
    color: "#e85d3a",
  },
  {
    category: "AI / Startup",
    title: "Sarvaj.ai",
    desc: "Co-founded a deepfake detection platform through Vercel's AI accelerator. Built real-time inference backend processing 500+ uploads/min with 96% detection accuracy using XceptionNet.",
    tags: ["Next.js", "TypeScript", "Python", "AWS SageMaker", "Redis"],
    color: "#f47350",
  },
  {
    category: "Systems",
    title: "GoatOS",
    desc: "Custom Linux-based operating system built from scratch — interrupt/global descriptor tables, EXT2 filesystem, virtualization, paging, hardware drivers, and round-robin scheduling across 3 terminals with 6 concurrent processes.",
    tags: ["C", "x86 Assembly", "Linux", "OS Design"],
    color: "#3a7ee8",
  },
  {
    category: "LLM / Full-Stack",
    title: "Stocks Research Agent",
    desc: "LLM-powered research agent that extracts stock tickers from queries, scrapes Reddit and Quora via Browserbase headless browsing, and summarizes sentiment using GPT-4 or Gemini with model-swapping support.",
    tags: ["Next.js", "TypeScript", "OpenAI", "Gemini", "Browserbase"],
    color: "#3ae87b",
  },
  {
    category: "Hardware",
    title: "GoatMicroprocessor",
    desc: "Custom CPU designed in SystemVerilog featuring a complete instruction set, 2700KB memory, I/O interfaces, and full pipeline architecture. Built from transistor-level logic to working processor.",
    tags: ["SystemVerilog", "Vivado", "CPU Design"],
    color: "#3a7ee8",
  },
  {
    category: "AI / GPU",
    title: "GPU Accelerated CNN",
    desc: "Parallelized convolutional neural network for image classification using CUDA and NVIDIA RSI. Optimized GPU kernel execution for significant speedups over CPU-only training.",
    tags: ["CUDA", "C++", "NVIDIA RSI", "PyTorch"],
    color: "#e85d3a",
  },
  {
    category: "Robotics",
    title: "Robot Arm Sorter",
    desc: "Computer vision system using OpenCV and ROS for UR3 robotic arm — color thresholding, blob detection, and pixel-to-world transformation achieving 99% accuracy at 15+ FPS object sorting.",
    tags: ["Python", "OpenCV", "ROS", "Computer Vision"],
    color: "#e8c43a",
  },
  {
    category: "Quantum",
    title: "Quantum Options Pricing",
    desc: "Options pricing model using quantum Monte Carlo simulation with IBM Qiskit. Explored quantum advantage in financial derivative valuation through amplitude estimation.",
    tags: ["Qiskit", "Python", "Quantum Computing"],
    color: "#3ae8d4",
  },
  {
    category: "Blockchain",
    title: "Subscribe Kadena",
    desc: "NFT-based subscription model on Kadena blockchain. Smart contracts in Pact enable recurring subscription payments through tokenized access — a Web3 alternative to traditional SaaS billing.",
    tags: ["Pact", "React", "Node.js", "Blockchain"],
    color: "#8a3ae8",
  },
];
