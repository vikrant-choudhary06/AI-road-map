import type {
  AudienceProfileItem,
  FeatureHighlightItem,
  FreeResourcePreviewItem,
  HeroDiagramNode,
  HowItWorksStep,
  JourneyPhasePreview,
  LandingProjectPreview,
} from "@/types";

export const HERO_CURRICULUM_LABELS = [
  {
    id: "phases",
    label: "9 Learning Phases",
    detail: "Phase 0 – Phase 8",
  },
  {
    id: "projects",
    label: "14 Hands-on Projects",
    detail: "From matrices to LLMs",
  },
  {
    id: "resources",
    label: "Free Learning Resources",
    detail: "Open lectures & textbooks",
  },
] as const;

export const HERO_DIAGRAM_NODES: HeroDiagramNode[] = [
  {
    id: "python",
    stepNumber: "00",
    label: "Python",
    shortLabel: "Python",
    phaseRange: "Phase 0",
    category: "Foundations",
    summary:
      "Master clean Python syntax, data structures, object-oriented design, and vectorized array programming with NumPy.",
    keyArtifact: "Vectorized tensor & array routines without C-loops",
    outcome: "Write clean, reproducible scientific Python code.",
  },
  {
    id: "mathematics",
    stepNumber: "01",
    label: "Mathematics",
    shortLabel: "Mathematics",
    phaseRange: "Phase 1",
    category: "Foundations",
    summary:
      "Build geometric and analytical intuition for vector spaces, eigenvalues, matrix calculus, gradients, and probability distributions.",
    keyArtifact: "Pure-Python Matrix & Eigen-Decomposition Engine",
    outcome: "Read and derive machine learning equations with confidence.",
  },
  {
    id: "machine-learning",
    stepNumber: "02",
    label: "Machine Learning",
    shortLabel: "Machine Learning",
    phaseRange: "Phase 2",
    category: "Core ML & DL",
    summary:
      "Understand loss landscapes, convex optimization, stochastic gradient descent, regularization, and statistical generalization.",
    keyArtifact: "Linear & Logistic Regression trained via custom SGD",
    outcome: "Diagnose bias, variance, overfitting, and optimization dynamics.",
  },
  {
    id: "deep-learning",
    stepNumber: "03",
    label: "Deep Learning",
    shortLabel: "Deep Learning",
    phaseRange: "Phase 3",
    category: "Core ML & DL",
    summary:
      "Construct computation graphs, reverse-mode automatic differentiation, multilayer perceptrons, and modern weight initializations.",
    keyArtifact: "Scalar & Tensor Autograd Engine + Multi-Layer Perceptron",
    outcome: "Understand every gradient flowing backward through a network.",
  },
  {
    id: "nlp",
    stepNumber: "04",
    label: "NLP",
    shortLabel: "NLP",
    phaseRange: "Phase 4",
    category: "Core ML & DL",
    summary:
      "Progress from n-gram language models and Byte-Pair Encoding (BPE) tokenizers to dense vector embeddings and sequence architectures.",
    keyArtifact: "Custom BPE Tokenizer & Autoregressive Sequence Model",
    outcome: "Convert raw text corpora into dense token representations.",
  },
  {
    id: "transformers",
    stepNumber: "05",
    label: "Transformers",
    shortLabel: "Transformers",
    phaseRange: "Phase 5",
    category: "LLM Engineering",
    summary:
      "Implement scaled dot-product self-attention, multi-head causal masking, RoPE positional encodings, RMSNorm, and SwiGLU blocks.",
    keyArtifact: "Decoder-Only Mini GPT Architecture from Scratch",
    outcome: "Assemble a complete autoregressive Transformer block by block.",
  },
  {
    id: "llm-training",
    stepNumber: "06",
    label: "LLM Training",
    shortLabel: "LLM Training",
    phaseRange: "Phase 6",
    category: "LLM Engineering",
    summary:
      "Design pre-training data pipelines, mixed-precision (BF16) training loops, cosine learning rate schedules, and gradient accumulation.",
    keyArtifact: "Pretrained Custom Language Model on Curated Corpora",
    outcome: "Train, checkpoint, and monitor a language model from random weights.",
  },
  {
    id: "alignment",
    stepNumber: "07",
    label: "Alignment",
    shortLabel: "Alignment",
    phaseRange: "Phase 7",
    category: "LLM Engineering",
    summary:
      "Transform base pretrained models into helpful assistants using Supervised Fine-Tuning (SFT), LoRA/QLoRA, and Direct Preference Optimization (DPO).",
    keyArtifact: "Instruction-Tuned & DPO-Aligned Assistant Model",
    outcome: "Adapt and align open models on single-GPU hardware.",
  },
  {
    id: "advanced-systems",
    stepNumber: "08",
    label: "Advanced Systems",
    shortLabel: "Advanced Systems",
    phaseRange: "Phase 8",
    category: "LLM Engineering",
    summary:
      "Master KV-cache optimization, quantization (GGUF/AWQ), speculative decoding, evaluation harnesses, and reasoning-oriented inference.",
    keyArtifact: "Quantized High-Throughput Inference & Evaluation Suite",
    outcome: "Evaluate, optimize, and deploy production-grade LLM systems.",
  },
];

export const LEARNING_JOURNEY_PHASES: JourneyPhasePreview[] = [
  {
    phase: 0,
    code: "P0",
    slug: "phase-0-programming-foundations",
    title: "Programming Foundations",
    oneSentenceExplanation:
      "Develop fluency in Python, algorithmic thinking, data structures, and vectorized numerical computing with NumPy.",
    estimatedWeeks: 4,
    visualIdentifier: "py · ndarray",
    difficulty: "foundational",
    keyTopics: [
      "Python memory model, generators, and object-oriented design",
      "Vectorized broadcasting and memory layout in NumPy",
      "Testing, profiling, and reproducible scientific environments",
    ],
    milestoneDeliverable: "Vectorized Data & Tensor Utility Toolkit",
    prerequisites: "No prior AI experience required",
  },
  {
    phase: 1,
    code: "P1",
    slug: "phase-1-mathematics-for-ai",
    title: "Mathematics for AI",
    oneSentenceExplanation:
      "Master the linear algebra, multivariable calculus, and probability theory that govern how neural networks represent and update knowledge.",
    estimatedWeeks: 8,
    visualIdentifier: "∇f · A = UΣVᵀ",
    difficulty: "foundational",
    keyTopics: [
      "Vector spaces, matrix multiplication, projections, and SVD",
      "Partial derivatives, Jacobians, Hessians, and the chain rule",
      "Probability distributions, maximum likelihood, and cross-entropy",
    ],
    milestoneDeliverable: "Project 01: Matrix Operations Engine",
    prerequisites: "Phase 0 · Programming Foundations",
  },
  {
    phase: 2,
    code: "P2",
    slug: "phase-2-machine-learning-from-scratch",
    title: "Machine Learning",
    oneSentenceExplanation:
      "Build classical supervised and unsupervised learning algorithms from first principles to understand optimization and generalization.",
    estimatedWeeks: 8,
    visualIdentifier: "θ ← θ − η∇L",
    difficulty: "foundational",
    keyTopics: [
      "Linear & logistic regression, loss surfaces, and gradient descent",
      "Regularization (L1/L2), bias-variance tradeoff, and cross-validation",
      "Decision trees, ensembles, and evaluation metrics",
    ],
    milestoneDeliverable: "Project 02: Linear Regression From Scratch",
    prerequisites: "Phase 1 · Mathematics for AI",
  },
  {
    phase: 3,
    code: "P3",
    slug: "phase-3-deep-learning-neural-networks",
    title: "Deep Learning",
    oneSentenceExplanation:
      "Implement computational graphs, backpropagation, and multi-layer neural networks before transitioning to PyTorch internals.",
    estimatedWeeks: 8,
    visualIdentifier: "∂L/∂W · MLP",
    difficulty: "intermediate",
    keyTopics: [
      "Dynamic computation graphs and reverse-mode autodiff",
      "Activation functions, He/Xavier initialization, and normalization",
      "Optimizers (SGD with Momentum, RMSProp, AdamW) and PyTorch tensors",
    ],
    milestoneDeliverable:
      "Projects 03 & 04: Autograd Engine & Neural Network From Scratch",
    prerequisites: "Phase 2 · Machine Learning",
  },
  {
    phase: 4,
    code: "P4",
    slug: "phase-4-nlp-language-modeling",
    title: "NLP & Language Modeling",
    oneSentenceExplanation:
      "Explore how raw human text is tokenized, embedded into continuous vector spaces, and modeled autoregressively.",
    estimatedWeeks: 6,
    visualIdentifier: "P(wₜ | w₍₁:ₜ₋₁₎)",
    difficulty: "intermediate",
    keyTopics: [
      "Byte-Pair Encoding (BPE) and subword tokenization algorithms",
      "Word embeddings, distributed representations, and cosine geometry",
      "N-gram models, recurrent bottlenecks, and perplexity evaluation",
    ],
    milestoneDeliverable: "Custom BPE Tokenizer & Character/Subword Language Model",
    prerequisites: "Phase 3 · Deep Learning",
  },
  {
    phase: 5,
    code: "P5",
    slug: "phase-5-transformers-from-scratch",
    title: "Transformers From Scratch",
    oneSentenceExplanation:
      "Dissect and implement every component of modern decoder-only Transformer architectures in clean PyTorch.",
    estimatedWeeks: 10,
    visualIdentifier: "softmax(QKᵀ/√d)V",
    difficulty: "advanced",
    keyTopics: [
      "Scaled dot-product attention, causal masking, and multi-head projection",
      "Rotary Positional Embeddings (RoPE), Pre-LN / RMSNorm, and SwiGLU",
      "Residual stream dynamics, KV caching, and parameter accounting",
    ],
    milestoneDeliverable: "Project 05: Mini GPT Architecture",
    prerequisites: "Phase 4 · NLP & Language Modeling",
  },
  {
    phase: 6,
    code: "P6",
    slug: "phase-6-train-your-own-llm",
    title: "Training Your Own LLM",
    oneSentenceExplanation:
      "Engineer end-to-end pre-training pipelines, dataset tokenization workflows, and mixed-precision training loops.",
    estimatedWeeks: 10,
    visualIdentifier: "BF16 · Chinchilla",
    difficulty: "advanced",
    keyTopics: [
      "Corpus curation, deduplication, and memory-mapped token shards",
      "Mixed precision (BF16/FP16), gradient clipping, and warmup-cosine schedules",
      "Compute-optimal scaling laws, loss spike diagnosis, and checkpointing",
    ],
    milestoneDeliverable: "Project 06: Your Own Pretrained LLM",
    prerequisites: "Phase 5 · Transformers From Scratch",
  },
  {
    phase: 7,
    code: "P7",
    slug: "phase-7-post-training-alignment",
    title: "Fine-Tuning & Alignment",
    oneSentenceExplanation:
      "Adapt pretrained base models into instruction-following assistants using parameter-efficient fine-tuning and preference optimization.",
    estimatedWeeks: 8,
    visualIdentifier: "LoRA · SFT · DPO",
    difficulty: "advanced",
    keyTopics: [
      "Instruction formatting, chat templates, and Supervised Fine-Tuning (SFT)",
      "Low-Rank Adaptation (LoRA) and quantized QLoRA memory math",
      "Direct Preference Optimization (DPO) and RLHF reward formulations",
    ],
    milestoneDeliverable: "LoRA & DPO Aligned Instruction Model",
    prerequisites: "Phase 6 · Training Your Own LLM",
  },
  {
    phase: 8,
    code: "P8",
    slug: "phase-8-advanced-llm-systems-research",
    title: "Advanced LLM Systems",
    oneSentenceExplanation:
      "Master post-training quantization, high-throughput inference engines, rigorous evaluation harnesses, and reasoning architectures.",
    estimatedWeeks: 16,
    visualIdentifier: "KV-Cache · INT4",
    difficulty: "research",
    keyTopics: [
      "Post-training quantization (AWQ, GPTQ, GGUF) and speculative decoding",
      "PagedAttention, continuous batching, and hardware memory bandwidth",
      "Contamination-free evaluation, tool use, and test-time reasoning compute",
    ],
    milestoneDeliverable: "Quantized Inference Engine & Evaluation Benchmark Suite",
    prerequisites: "Phase 7 · Fine-Tuning & Alignment",
  },
];

export const TOTAL_ROADMAP_WEEKS = LEARNING_JOURNEY_PHASES.reduce(
  (sum, phase) => sum + phase.estimatedWeeks,
  0
);

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    stepNumber: "01",
    title: "Follow Your Path",
    subtitle: "Prerequisite-Ordered Curriculum",
    description:
      "Explore structured AI learning phases arranged in prerequisite order so you never encounter unexplained mathematical symbols or architectural leaps.",
    artifactTitle: "Dependency Chain Verification",
    artifactItems: [
      {
        label: "Phase 1 · Matrix Calculus & Gradients",
        detail: "Prerequisite for Backpropagation",
        status: "ready",
      },
      {
        label: "Phase 3 · Reverse-Mode Autodiff",
        detail: "Prerequisite for Transformer Training",
        status: "active",
      },
      {
        label: "Phase 5 · Causal Self-Attention",
        detail: "Unlocks Pretraining & Alignment",
        status: "locked",
      },
    ],
  },
  {
    stepNumber: "02",
    title: "Learn for Free",
    subtitle: "Open-Access University & Research Materials",
    description:
      "Access carefully curated free courses, lectures, documentation, and educational resources from leading universities and AI researchers.",
    artifactTitle: "Verified Open Syllabus Index",
    artifactItems: [
      {
        label: "MIT 18.06SC Linear Algebra",
        detail: "Full video lectures & problem sets · Free",
        status: "ready",
      },
      {
        label: "Karpathy · Neural Networks: Zero to Hero",
        detail: "Code-first deep learning series · Free",
        status: "ready",
      },
      {
        label: "Stanford CS336 · Language Modeling",
        detail: "Lecture notes & system assignments · Free",
        status: "ready",
      },
    ],
  },
  {
    stepNumber: "03",
    title: "Build Real Projects",
    subtitle: "From-Scratch Engineering Implementations",
    description:
      "Practice what you learn through coding projects, from basic mathematical models to your own Transformer, without hiding behind high-level wrappers.",
    artifactTitle: "Implementation Verification Spec",
    artifactItems: [
      {
        label: "01 · Pure-Python Matrix Engine",
        detail: "Zero external ML libraries",
        status: "ready",
      },
      {
        label: "03 · Scalar & Tensor Autograd Engine",
        detail: "Custom backward() pass verification",
        status: "active",
      },
      {
        label: "05 · Decoder-Only Mini GPT",
        detail: "Causal Multi-Head Attention + RoPE",
        status: "locked",
      },
    ],
  },
  {
    stepNumber: "04",
    title: "Track Your Progress",
    subtitle: "Milestones & Concept Checklists",
    description:
      "Use interactive checklists and learning milestones to stay organized across long-horizon study sessions.",
    artifactTitle: "Phase Milestone Ledger",
    artifactItems: [
      {
        label: "Derive scaled dot-product attention gradients",
        detail: "Phase 5 · Mathematical Checkpoint",
        status: "ready",
      },
      {
        label: "Verify causal mask prevents future token leakage",
        detail: "Phase 5 · Implementation Unit Test",
        status: "ready",
      },
      {
        label: "Train 25M parameter model to target validation loss",
        detail: "Phase 6 · Pretraining Milestone",
        status: "active",
      },
    ],
  },
];

export const FEATURE_SHOWCASE_ITEMS: FeatureHighlightItem[] = [
  {
    id: "structured-roadmap",
    eyebrow: "01 · Curriculum Architecture",
    title: "Structured Roadmap",
    description:
      "A progressive curriculum with prerequisites and detailed objectives that connects foundational mathematics directly to modern Transformer engineering.",
    stageAvailability: "Core Architecture · Full View in Stage 3",
    spanClass: "lg:col-span-7",
    previewType: "roadmap-graph",
  },
  {
    id: "curated-free-courses",
    eyebrow: "02 · Open Education",
    title: "Curated Free Courses",
    description:
      "High-quality free learning resources from institutions and educators such as Harvard, MIT, Stanford, Google, Hugging Face, and Andrej Karpathy.",
    stageAvailability: "Verified Links · Full Library in Stage 4",
    spanClass: "lg:col-span-5",
    previewType: "course-providers",
  },
  {
    id: "hands-on-projects",
    eyebrow: "03 · Implementation First",
    title: "Hands-on Projects",
    description:
      "Practical implementations that teach users how algorithms and architectures work internally—building matrices, autograd, and attention from scratch.",
    stageAvailability: "14 Projects · Full Specs in Stage 6",
    spanClass: "lg:col-span-5",
    previewType: "project-internals",
  },
  {
    id: "interactive-checklists",
    eyebrow: "04 · Granular Mastery",
    title: "Interactive Checklists",
    description:
      "Track completed lessons, modules, courses, and projects with fine-grained topic verification checklists.",
    stageAvailability: "Planned Feature · Stage 3 & 5",
    spanClass: "lg:col-span-7",
    previewType: "checklist-items",
  },
  {
    id: "personalized-learning",
    eyebrow: "05 · Adaptive Pacing",
    title: "Personalized Learning",
    description:
      "Plan learning based on study hours and experience level—whether you are starting with Python or skipping ahead to Transformer internals.",
    stageAvailability: "Planned Feature · Stage 5",
    spanClass: "lg:col-span-6",
    previewType: "study-planner",
  },
  {
    id: "learning-dashboard",
    eyebrow: "06 · Milestone Telemetry",
    title: "Learning Dashboard",
    description:
      "Monitor milestones, project progress, and completed learning phases in a calm, distraction-free study workspace.",
    stageAvailability: "Planned Feature · Stage 5",
    spanClass: "lg:col-span-6",
    previewType: "milestone-tracker",
  },
];

export const LANDING_PROJECTS_PREVIEW: LandingProjectPreview[] = [
  {
    id: "matrix-operations-engine",
    number: "Project 01",
    title: "Matrix Operations Engine",
    difficulty: "foundational",
    difficultyLabel: "Beginner · Foundational",
    technologies: ["Python", "Pure Math", "Unit Testing"],
    learningObjective:
      "Implement 2D matrix multiplication, transposes, dot products, and Gaussian elimination in pure Python without external libraries.",
    phase: 1,
    phaseLabel: "Phase 1 · Mathematics for AI",
    complexityTier: 1,
    architectureNote: "O(n³) gemm · shape validation · numerical stability",
  },
  {
    id: "linear-regression-from-scratch",
    number: "Project 02",
    title: "Linear Regression From Scratch",
    difficulty: "foundational",
    difficultyLabel: "Beginner · Foundational",
    technologies: ["Python", "NumPy", "Gradient Descent"],
    learningObjective:
      "Derive and code analytical normal equations alongside batch and mini-batch gradient descent with L2 regularization.",
    phase: 2,
    phaseLabel: "Phase 2 · Machine Learning",
    complexityTier: 1,
    architectureNote: "MSE loss surface · analytical vs iterative convergence",
  },
  {
    id: "automatic-differentiation-engine",
    number: "Project 03",
    title: "Automatic Differentiation Engine",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    technologies: ["Python", "Computational Graphs", "Backpropagation"],
    learningObjective:
      "Build a dynamic reverse-mode autodiff engine that tracks operations on a directed acyclic graph and computes exact gradients via the chain rule.",
    phase: 3,
    phaseLabel: "Phase 3 · Deep Learning",
    complexityTier: 2,
    architectureNote: "Topological sort · local Jacobian-vector products",
  },
  {
    id: "neural-network-from-scratch",
    number: "Project 04",
    title: "Neural Network From Scratch",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    technologies: ["NumPy", "Activation Functions", "Cross-Entropy"],
    learningObjective:
      "Construct a multi-layer perceptron with ReLU/GELU activations, He initialization, softmax cross-entropy loss, and momentum optimizers.",
    phase: 3,
    phaseLabel: "Phase 3 · Deep Learning",
    complexityTier: 2,
    architectureNote: "Forward caching · vectorized backward pass · weight decay",
  },
  {
    id: "mini-gpt-architecture",
    number: "Project 05",
    title: "Mini GPT Architecture",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    technologies: ["PyTorch", "Multi-Head Attention", "RoPE", "BPE Tokenizer"],
    learningObjective:
      "Implement a complete decoder-only Transformer with causal multi-head self-attention, rotary embeddings, RMSNorm, and autoregressive sampling.",
    phase: 5,
    phaseLabel: "Phase 5 · Transformers From Scratch",
    complexityTier: 3,
    architectureNote: "[B, T, d_model] residual stream · causal mask · KV cache",
  },
  {
    id: "your-own-pretrained-llm",
    number: "Project 06",
    title: "Your Own Pretrained LLM",
    difficulty: "research",
    difficultyLabel: "Advanced · Capstone",
    technologies: [
      "PyTorch",
      "Mixed Precision (BF16)",
      "Cosine LR",
      "Token Shards",
    ],
    learningObjective:
      "Pretrain a custom language model from random initialization on a curated text corpus with gradient accumulation, checkpointing, and perplexity tracking.",
    phase: 6,
    phaseLabel: "Phase 6 · Training Your Own LLM",
    complexityTier: 3,
    architectureNote: "End-to-end pretraining loop · validation loss curves",
  },
];

export const FREE_RESOURCES_PREVIEW: FreeResourcePreviewItem[] = [
  {
    id: "harvard-cs50-python",
    title: "Harvard CS50 Python",
    provider: "Harvard University",
    phaseLabel: "Phase 0 · Programming Foundations",
    description:
      "An rigorous introduction to programming using Python, covering functions, exceptions, unit testing, file I/O, and object-oriented design.",
    url: "https://cs50.harvard.edu/python/",
    formatLabel: "Lectures & Problem Sets",
  },
  {
    id: "mit-linear-algebra",
    title: "MIT Linear Algebra",
    provider: "MIT OpenCourseWare (Gilbert Strang)",
    phaseLabel: "Phase 1 · Mathematics for AI",
    description:
      "The definitive university course on matrix theory, vector spaces, orthogonality, eigenvalues, and singular value decomposition.",
    url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
    formatLabel: "Full University Course",
  },
  {
    id: "google-ml-crash-course",
    title: "Google Machine Learning Crash Course",
    provider: "Google Developers",
    phaseLabel: "Phase 2 · Machine Learning",
    description:
      "A fast-paced, practical introduction to machine learning fundamentals, loss functions, gradient descent, generalization, and neural networks.",
    url: "https://developers.google.com/machine-learning/crash-course",
    formatLabel: "Interactive Modules & Exercises",
  },
  {
    id: "karpathy-zero-to-hero",
    title: "Andrej Karpathy — Neural Networks: Zero to Hero",
    provider: "Andrej Karpathy",
    phaseLabel: "Phases 3–5 · Deep Learning & Transformers",
    description:
      "Hands-on coding lectures building micrograd, makemore, backpropagation internals, tokenizers, and GPT-2 from scratch in PyTorch.",
    url: "https://karpathy.ai/zero-to-hero.html",
    formatLabel: "Code-First Video Series",
  },
  {
    id: "hugging-face-llm-course",
    title: "Hugging Face LLM Course",
    provider: "Hugging Face",
    phaseLabel: "Phases 4 & 7 · NLP & Fine-Tuning",
    description:
      "Practical open-source guides covering tokenization pipelines, Transformer architectures, dataset curation, LoRA fine-tuning, and alignment.",
    url: "https://huggingface.co/learn/llm-course/chapter1/1",
    formatLabel: "Open Interactive Textbook",
  },
  {
    id: "stanford-cs336",
    title: "Stanford CS336 — Language Modeling from Scratch",
    provider: "Stanford University",
    phaseLabel: "Phases 5–6 · Transformer Systems & Pretraining",
    description:
      "Graduate-level engineering course walking through every aspect of building language models from scratch: architecture, data, systems, and scaling laws.",
    url: "https://cs336.stanford.edu/spring2025/",
    formatLabel: "Lectures & Systems Assignments",
  },
];

export const AUDIENCE_PROFILES: AudienceProfileItem[] = [
  {
    id: "complete-beginners",
    title: "Complete beginners who know nothing about AI",
    currentBackground: "Starting from zero programming or calculus experience",
    howRoadmapHelps:
      "Starts at Phase 0 with Python fundamentals and builds mathematical intuition step by step before introducing a single neural network layer.",
    recommendedEntry: "Start at Phase 0 · Programming Foundations",
  },
  {
    id: "programmers-transitioning",
    title: "Programmers transitioning into machine learning",
    currentBackground: "Experienced in software engineering, web, or backend systems",
    howRoadmapHelps:
      "Bridges the gap between traditional deterministic software and probabilistic optimization, linear algebra, and tensor computation.",
    recommendedEntry: "Start at Phase 1 · Mathematics for AI",
  },
  {
    id: "students-research",
    title: "Students interested in AI research",
    currentBackground: "Studying computer science, mathematics, physics, or engineering",
    howRoadmapHelps:
      "Connects textbook derivations directly to clean, readable PyTorch implementations of attention, autograd, and pretraining loops.",
    recommendedEntry: "Start at Phase 2 or Phase 3 based on math background",
  },
  {
    id: "api-developers",
    title: "Developers who use AI APIs but want to understand the underlying technology",
    currentBackground: "Building applications with prompt engineering or LLM SDKs",
    howRoadmapHelps:
      "Opens the black box—showing how tokenization, KV caching, RoPE, temperature sampling, and fine-tuning actually work under the hood.",
    recommendedEntry: "Start at Phase 3 · Deep Learning Internals",
  },
  {
    id: "custom-llm-engineers",
    title: "Engineers who want to build and train custom language models",
    currentBackground: "Familiar with PyTorch and basic deep learning concepts",
    howRoadmapHelps:
      "Focuses deeply on decoder-only Transformer architecture, data curation, BF16 pretraining, LoRA/DPO alignment, and quantized inference.",
    recommendedEntry: "Start at Phase 5 · Transformers From Scratch",
  },
];

export const DASHBOARD_PREVIEW_DEMO = {
  bannerNote: "Illustrative Sample Preview · Open Dashboard for Live Tracking",
  currentMilestone: {
    phaseCode: "Phase 5",
    title: "Implementing Causal Multi-Head Self-Attention & RoPE",
    moduleProgress: "Module 3 of 5 · 68% Complete",
    nextAction: "Verify causal attention mask tensor shapes on sequence length T=512",
  },
  phaseCompletion: [
    { code: "P0", label: "Python", percent: 100, status: "completed" as const },
    { code: "P1", label: "Math", percent: 100, status: "completed" as const },
    { code: "P2", label: "Classical ML", percent: 100, status: "completed" as const },
    { code: "P3", label: "Deep Learning", percent: 100, status: "completed" as const },
    { code: "P4", label: "NLP & Tokens", percent: 100, status: "completed" as const },
    { code: "P5", label: "Transformers", percent: 68, status: "active" as const },
    { code: "P6", label: "Pretraining", percent: 0, status: "upcoming" as const },
    { code: "P7", label: "Alignment", percent: 0, status: "upcoming" as const },
    { code: "P8", label: "LLM Systems", percent: 0, status: "upcoming" as const },
  ],
  projectChecklist: [
    {
      title: "Matrix Operations Engine",
      phase: "P1",
      done: true,
    },
    {
      title: "Linear Regression From Scratch",
      phase: "P2",
      done: true,
    },
    {
      title: "Automatic Differentiation Engine",
      phase: "P3",
      done: true,
    },
    {
      title: "Neural Network From Scratch",
      phase: "P3",
      done: true,
    },
    {
      title: "Mini GPT Architecture (In Progress)",
      phase: "P5",
      done: false,
      active: true,
    },
    {
      title: "Your Own Pretrained LLM",
      phase: "P6",
      done: false,
    },
  ],
  courseIndicators: [
    {
      title: "Karpathy — Neural Networks: Zero to Hero",
      provider: "Andrej Karpathy",
      completedUnits: "6 / 7 lectures",
      percent: 86,
    },
    {
      title: "Stanford CS336 — Language Modeling from Scratch",
      provider: "Stanford University",
      completedUnits: "4 / 12 lectures",
      percent: 33,
    },
  ],
  weeklyOverview: {
    targetHours: "10.0 hrs / wk",
    loggedDemoHours: "9.5 hrs (Sample)",
    days: [
      { day: "Mon", hours: 1.5, focus: "Theory" },
      { day: "Tue", hours: 2.0, focus: "PyTorch Lab" },
      { day: "Wed", hours: 1.0, focus: "Lecture" },
      { day: "Thu", hours: 2.0, focus: "Attention Math" },
      { day: "Fri", hours: 1.0, focus: "Review" },
      { day: "Sat", hours: 2.0, focus: "Mini GPT" },
      { day: "Sun", hours: 0.0, focus: "Rest" },
    ],
  },
} as const;
