import type { CourseResource } from "@/types";

/**
 * Canonical learning resources originating in Phases 5 through 8.
 * Multi-phase resources (such as Stanford CS336, nanoGPT, and Full Stack Deep Learning)
 * are defined once here and associated across all relevant phases via `phases`
 * and `phasePlacements`.
 */
export const RESOURCES_PHASES_5_TO_8: CourseResource[] = [
  // ============================================================================
  // PHASE 5 — TRANSFORMERS FROM SCRATCH (including Multi-Phase CS336 & nanoGPT)
  // ============================================================================
  {
    id: "stanford-cs336",
    slug: "stanford-cs336-language-modeling-from-scratch",
    title: "CS336 — Language Modeling from Scratch",
    provider: "Stanford University",
    providerGroup: "Stanford",
    providerMonogram: "SU",
    description:
      "Graduate-level Stanford course walking through every aspect of building language models from scratch: Transformer architecture, tokenization, pretraining data pipelines, GPU systems, parallelism, and scaling laws.",
    detailedDescription:
      "Stanford CS336 (Spring 2025) is the definitive university engineering curriculum for building Large Language Models from first principles without relying on opaque high-level wrappers. Across its lectures and hands-on programming assignments, students implement a BPE tokenizer, a modern Transformer (RMSNorm, RoPE, SwiGLU), FlashAttention/Triton kernels, distributed multi-GPU training (DDP/FSDP/tensor parallelism), compute-optimal scaling laws, pretraining data curation/deduplication, and RLHF/DPO alignment.",
    primaryPhase: 6,
    phases: [5, 6, 8],
    relevantModuleIds: [
      "p5-m1",
      "p5-m2",
      "p5-m3",
      "p5-m4",
      "p6-m1",
      "p6-m2",
      "p6-m3",
      "p6-m4",
      "p8-m1",
      "p8-m2",
      "p8-m3",
    ],
    phasePlacements: [
      {
        phase: 5,
        catalogCode: "5.2",
        role: "additional_learning",
        phaseGuidance:
          "Study the Architecture lectures and Assignment 1 (implementing Byte-Pair Encoding, RMSNorm, RoPE, SwiGLU, Multi-Head Causal Self-Attention, and the full Transformer block from scratch).",
        moduleIds: ["p5-m1", "p5-m2", "p5-m3", "p5-m4"],
      },
      {
        phase: 6,
        catalogCode: "6.1",
        role: "start_here",
        isRecommendedStart: true,
        phaseGuidance:
          "Start Phase 6 here! Focus on the lectures and assignments covering Pretraining Data Pipelines (filtering, MinHash deduplication, quality classifiers), Mixed-Precision Training Loops, and Chinchilla Scaling Laws.",
        moduleIds: ["p6-m1", "p6-m2", "p6-m3", "p6-m4"],
      },
      {
        phase: 8,
        catalogCode: "8.1",
        phaseSpecificTitle: "CS336 — Advanced Language Modeling Systems",
        role: "start_here",
        isRecommendedStart: true,
        phaseGuidance:
          "Co-recommended starting point for Phase 8. Study the Systems & Parallelism lectures and Assignment 2 (GPU memory hierarchy, roofline arithmetic intensity, Triton kernels, FlashAttention-2, and distributed multi-GPU training).",
        moduleIds: ["p8-m1", "p8-m2", "p8-m3"],
      },
    ],
    resourceType: "Full Course",
    formatSubtitle: "University Course Materials",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://cs336.stanford.edu/spring2025/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "Course syllabus, detailed lecture slides/notes, reading lists, and comprehensive open-source assignment repositories on GitHub are publicly accessible.",
    prerequisites: [
      "Strong Python & PyTorch fluency, linear algebra, calculus, and foundational deep learning (Phases 0–4).",
    ],
    learningObjectives: [
      "Implement modern decoder-only Transformer architectures (RoPE, RMSNorm, SwiGLU) from scratch in PyTorch.",
      "Engineer web-scale pretraining dataset curation, deduplication, and compute-optimal training runs.",
      "Optimize GPU arithmetic intensity, custom Triton/FlashAttention kernels, and distributed multi-GPU training.",
    ],
    suggestedLearningPosition:
      "Primary Systems & Pretraining Spine across Phase 5 (Architecture), Phase 6 (Pretraining), and Phase 8 (Advanced LLM Systems)",
    recommendedOrder: 27,
    isRecommended: true,
    tags: [
      "Stanford",
      "CS336",
      "Language Modeling",
      "Pretraining",
      "Scaling Laws",
      "Transformers",
      "FlashAttention",
      "Distributed Training",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on cs336.stanford.edu/spring2025/ (canonical shared record for 5.2, 6.1, and 8.1).",
    },
    relatedResourceIds: [
      "karpathy-zero-to-hero",
      "karpathy-nanogpt",
      "gpu-mode-lectures",
      "triton-programming-tutorials",
    ],
  },
  {
    id: "harvard-annotated-transformer",
    slug: "the-annotated-transformer-harvard-nlp",
    title: "The Annotated Transformer",
    provider: "Harvard NLP",
    providerGroup: "Harvard",
    providerMonogram: "HU",
    description:
      "Line-by-line PyTorch implementation and mathematical walkthrough of the original 'Attention Is All You Need' Transformer paper.",
    detailedDescription:
      "Written by Sasha Rush and collaborators at Harvard NLP (updated to modern PyTorch), The Annotated Transformer presents the seminal 2017 Vaswani et al. paper as an executable literacy document. Every mathematical equation for scaled dot-product attention, multi-head projection, positional encoding, residual layer normalization, and label smoothing is immediately followed by clean PyTorch code.",
    primaryPhase: 5,
    phases: [5],
    relevantModuleIds: ["p5-m1", "p5-m2", "p5-m3"],
    phasePlacements: [
      {
        phase: 5,
        catalogCode: "5.3",
        role: "practice_and_reference",
        phaseGuidance:
          "Read alongside Modules 5.1–5.3 and the 'Attention Is All You Need' paper to see how every equation maps line-by-line into PyTorch tensor operations.",
        moduleIds: ["p5-m1", "p5-m2", "p5-m3"],
      },
    ],
    resourceType: "Tutorial",
    formatSubtitle: "Technical Tutorial",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://nlp.seas.harvard.edu/annotated-transformer/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free open-source technical article and executable Jupyter notebook.",
    prerequisites: [
      "PyTorch `nn.Module` fluency and matrix multiplication broadcasting (Phases 1 & 3).",
    ],
    learningObjectives: [
      "Translate scaled dot-product and multi-head attention equations directly into batched PyTorch tensor code.",
      "Understand attention masking, positional encodings, and encoder-decoder vs. decoder-only stacks.",
      "Trace tensor shapes `[B, H, T, d_k]` through every projection and residual connection.",
    ],
    suggestedLearningPosition:
      "Phase 5 Line-by-Line Code & Paper Companion (Modules 5.1–5.3)",
    recommendedOrder: 28,
    isRecommended: false,
    tags: [
      "Harvard NLP",
      "Annotated Transformer",
      "Self-Attention",
      "Multi-Head Attention",
      "PyTorch",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on nlp.seas.harvard.edu/annotated-transformer/.",
    },
    relatedResourceIds: [
      "attention-is-all-you-need-paper",
      "karpathy-zero-to-hero",
      "karpathy-nanogpt",
    ],
  },
  {
    id: "karpathy-nanogpt",
    slug: "andrej-karpathy-nanogpt-repository",
    title: "nanoGPT",
    provider: "Andrej Karpathy",
    providerGroup: "Andrej Karpathy",
    providerMonogram: "AK",
    description:
      "The simplest, fastest, and most readable open-source repository for training and fine-tuning medium-sized GPT language models (~300 lines of model code and ~300 lines of training loop).",
    detailedDescription:
      "Andrej Karpathy's `nanoGPT` strips away framework bloat and implements the complete GPT-2 architecture in a single readable `model.py` file (~300 lines) and a production-capable distributed mixed-precision training loop in `train.py` (~300 lines). It serves as both a Phase 5 architectural blueprint and a Phase 6 pretraining reference implementation.",
    primaryPhase: 5,
    phases: [5, 6],
    relevantModuleIds: [
      "p5-m2",
      "p5-m3",
      "p5-m4",
      "p5-m5",
      "p6-m2",
      "p6-m3",
      "p6-m5",
    ],
    phasePlacements: [
      {
        phase: 5,
        catalogCode: "5.4",
        role: "practice_and_reference",
        phaseGuidance:
          "Study `model.py` line by line while building Milestone #10 (Mini GPT Language Model) in Modules 5.2–5.5.",
        moduleIds: ["p5-m2", "p5-m3", "p5-m4", "p5-m5"],
      },
      {
        phase: 6,
        catalogCode: "6.3",
        phaseSpecificTitle: "nanoGPT Training Implementation",
        role: "practice_and_reference",
        phaseGuidance:
          "Study `train.py` and `data/openwebtext/prepare.py` during Modules 6.1–6.3 to see how memory-mapped `.bin` token shards, gradient accumulation, BF16 autocast, cosine learning rate warmup, and DDP work in practice.",
        moduleIds: ["p6-m2", "p6-m3", "p6-m5"],
      },
    ],
    resourceType: "GitHub Repository",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://github.com/karpathy/nanoGPT",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote: "100% free MIT-licensed open-source GitHub repository.",
    prerequisites: [
      "PyTorch fundamentals and understanding of causal self-attention (Phases 3–5).",
    ],
    learningObjectives: [
      "Read and write a complete GPT decoder architecture (`CausalSelfAttention`, `MLP`, `Block`, `GPT`) in ~300 lines of clean PyTorch.",
      "Configure AdamW parameter groups (separating weight-decayed 2D matrices from 1D biases/LayerNorms).",
      "Implement mixed-precision training (`torch.amp.autocast`), gradient clipping, and memory-mapped dataset loading.",
    ],
    suggestedLearningPosition:
      "Reference Codebase for Phase 5 (`model.py`) and Phase 6 (`train.py`)",
    recommendedOrder: 29,
    isRecommended: false,
    tags: [
      "nanoGPT",
      "Andrej Karpathy",
      "GPT-2",
      "PyTorch",
      "Pretraining",
      "GitHub Repository",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on github.com/karpathy/nanoGPT (canonical shared record for 5.4 and 6.3).",
    },
    relatedResourceIds: [
      "karpathy-zero-to-hero",
      "karpathy-lets-build-gpt-lecture",
      "stanford-cs336",
    ],
  },
  {
    id: "attention-is-all-you-need-paper",
    slug: "attention-is-all-you-need-vaswani-et-al-paper",
    title: "Attention Is All You Need",
    provider: "Original Research Authors",
    providerGroup: "arXiv / Research Papers",
    providerMonogram: "AX",
    description:
      "The landmark 2017 research paper by Vaswani et al. that introduced the Transformer architecture based entirely on self-attention mechanisms, replacing recurrence and convolutions.",
    detailedDescription:
      "Published at NeurIPS 2017 by Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, and Illia Polosukhin, 'Attention Is All You Need' is the foundational paper of modern AI. Reading the original 15-page paper after implementing attention in Phase 5 reveals how simple and clean the core equations (`Attention(Q,K,V) = softmax(QK^T / sqrt(d_k))V`), multi-head projections, and complexity tradeoffs truly are.",
    primaryPhase: 5,
    phases: [5],
    relevantModuleIds: ["p5-m1", "p5-m2", "p5-m3"],
    phasePlacements: [
      {
        phase: 5,
        catalogCode: "5.5",
        role: "advanced_reading",
        phaseGuidance:
          "Read Sections 1–4 of the paper during Modules 5.1–5.3 after you have coded scaled dot-product attention so every equation feels familiar.",
        moduleIds: ["p5-m1", "p5-m2", "p5-m3"],
      },
    ],
    resourceType: "Research Paper",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://arxiv.org/abs/1706.03762",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free open-access PDF and HTML paper on arXiv (arXiv:1706.03762).",
    prerequisites: [
      "Matrix multiplication, softmax, and neural network layers (Phases 1, 3 & 4).",
    ],
    learningObjectives: [
      "Understand why scaled dot-product attention divides by `sqrt(d_k)` to prevent softmax saturation.",
      "Compare the per-layer computational complexity, sequential operations, and maximum path length of Self-Attention vs. RNNs.",
      "Analyze how multi-head attention attends to information from different representation subspaces.",
    ],
    suggestedLearningPosition:
      "Phase 5 Foundational Research Paper (Modules 5.1–5.3)",
    recommendedOrder: 30,
    isRecommended: false,
    tags: [
      "Research Paper",
      "arXiv",
      "Attention Is All You Need",
      "Transformers",
      "Self-Attention",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on arxiv.org/abs/1706.03762.",
    },
    relatedResourceIds: [
      "harvard-annotated-transformer",
      "karpathy-zero-to-hero",
      "stanford-cs336",
    ],
  },

  // ============================================================================
  // PHASE 6 — TRAIN YOUR OWN LLM
  // ============================================================================
  {
    id: "karpathy-lets-build-gpt-lecture",
    slug: "andrej-karpathy-lets-build-gpt-from-scratch-lecture",
    title: "Let's Build GPT: From Scratch",
    provider: "Andrej Karpathy",
    providerGroup: "Andrej Karpathy",
    providerMonogram: "AK",
    description:
      "Standalone 2-hour hands-on video lecture building and training a generative pretrained Transformer (GPT) from an empty Python script.",
    detailedDescription:
      "In this famous standalone coding lecture, Andrej Karpathy starts with a blank file, loads the TinyShakespeare dataset, constructs a baseline bigram language model, writes the training and evaluation loop, and incrementally builds up self-attention, multi-head causal attention, feed-forward blocks, residual connections, LayerNorm, and autoregressive token generation.",
    primaryPhase: 6,
    phases: [5, 6],
    relevantModuleIds: ["p5-m4", "p5-m5", "p6-m2", "p6-m3", "p6-m5"],
    phasePlacements: [
      {
        phase: 6,
        catalogCode: "6.2",
        role: "additional_learning",
        phaseGuidance:
          "Follow along and code every line before scaling up your Phase 6 pretraining pipeline (`MyLLM v1`).",
        moduleIds: ["p6-m2", "p6-m3", "p6-m5"],
      },
    ],
    resourceType: "Video Lecture",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://www.youtube.com/watch?v=kCc8FmEb1nY",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free full-length video lecture on YouTube with open-source Colab notebook and GitHub code (`ng-video-lecture`).",
    prerequisites: [
      "PyTorch fundamentals and autoregressive language modeling (Phases 3 & 4).",
    ],
    learningObjectives: [
      "Write a clean batch sampler, training loop, and validation loss estimator for causal language modeling.",
      "Assemble a complete decoder-only Transformer and verify loss decreases at each architectural step.",
      "Generate new text autoregressively from your trained checkpoint.",
    ],
    suggestedLearningPosition:
      "Phase 5–6 Bridge Video Lecture (Building & Training GPT End-to-End)",
    estimatedDuration: "1h 56m video lecture",
    recommendedOrder: 31,
    isRecommended: false,
    tags: [
      "Andrej Karpathy",
      "GPT",
      "Video Lecture",
      "Pretraining",
      "PyTorch",
      "From Scratch",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on youtube.com/watch?v=kCc8FmEb1nY.",
    },
    relatedResourceIds: [
      "karpathy-zero-to-hero",
      "karpathy-nanogpt",
      "stanford-cs336",
    ],
  },
  {
    id: "huggingface-datasets-module",
    slug: "hugging-face-datasets-course-material",
    title: "Hugging Face Datasets Course Material",
    provider: "Hugging Face",
    providerGroup: "Hugging Face",
    providerMonogram: "HF",
    description:
      "Dedicated course chapter on loading, slicing, filtering, deduplicating, streaming, and memory-mapping massive text datasets using Apache Arrow and Hugging Face Datasets.",
    detailedDescription:
      "Pretraining a language model requires processing gigabytes or terabytes of text without running out of system RAM. Chapter 5 of the Hugging Face LLM Course teaches you how Apache Arrow memory-mapping works under the hood, how to stream multi-hundred-gigabyte corpora without downloading them to disk, and how to apply parallelized `.map()` and `.filter()` transformations for dataset curation.",
    primaryPhase: 6,
    phases: [6],
    relevantModuleIds: ["p6-m1"],
    phasePlacements: [
      {
        phase: 6,
        catalogCode: "6.4",
        role: "practice_and_reference",
        phaseGuidance:
          "Study directly alongside Module 6.1 (Dataset Engineering) to build memory-mapped and streaming data pipelines for `MyLLM v1`.",
        moduleIds: ["p6-m1"],
      },
    ],
    resourceType: "Interactive Course",
    formatSubtitle: "Course Module",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://huggingface.co/learn/llm-course/chapter5/1",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free interactive chapters and code notebooks on Hugging Face.",
    prerequisites: ["Python, Pandas, and Phase 4 tokenization basics."],
    learningObjectives: [
      "Load, filter, clean, and shard large text corpora using memory-mapped Arrow tables.",
      "Stream web-scale datasets on the fly without exhausting local disk or RAM.",
      "Create custom dataset splits and tokenize corpora in parallel batches.",
    ],
    suggestedLearningPosition:
      "Phase 6 Module 6.1 (Dataset Engineering & Sharding)",
    recommendedOrder: 32,
    isRecommended: false,
    tags: [
      "Datasets",
      "Data Engineering",
      "Memory Mapping",
      "Streaming",
      "Pretraining Data",
      "Hugging Face",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on huggingface.co/learn/llm-course/chapter5/1.",
    },
    relatedResourceIds: [
      "huggingface-llm-course",
      "huggingface-tokenizers-module",
      "stanford-cs336",
    ],
  },
  {
    id: "full-stack-deep-learning",
    slug: "full-stack-deep-learning-course",
    title: "Full Stack Deep Learning",
    provider: "Full Stack Deep Learning",
    providerGroup: "Full Stack Deep Learning",
    providerMonogram: "FS",
    description:
      "Comprehensive engineering course covering the end-to-end lifecycle of production deep learning and LLM systems: data management, experiment tracking, troubleshooting, testing, deployment, and continual learning.",
    detailedDescription:
      "Taught by Sergey Karayev, Josh Tobin, and Pieter Abbeel (originating at UC Berkeley), Full Stack Deep Learning focuses on the critical engineering practices that turn research models into reliable systems: setting up reproducible project structures, managing datasets, diagnosing training failures, running systematic ablations, CI/CD testing for ML models, and deploying/monitoring models in production.",
    primaryPhase: 6,
    phases: [6, 8],
    relevantModuleIds: ["p6-m1", "p6-m3", "p6-m4", "p6-m5", "p8-m4", "p8-m5"],
    phasePlacements: [
      {
        phase: 6,
        catalogCode: "6.5",
        role: "additional_learning",
        phaseGuidance:
          "Use the lectures on Data Management, Troubleshooting & Testing, and Experiment Management during Modules 6.3–6.5 to structure your `MyLLM v1` training runs cleanly.",
        moduleIds: ["p6-m1", "p6-m3", "p6-m4", "p6-m5"],
      },
      {
        phase: 8,
        catalogCode: "8.5",
        role: "additional_learning",
        phaseGuidance:
          "In Phase 8, study the lectures on Infrastructure & Tooling, Deployment, Continual Learning, and Foundation Model Systems alongside Modules 8.4 and 8.5.",
        moduleIds: ["p8-m4", "p8-m5"],
      },
    ],
    resourceType: "Full Course",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://fullstackdeeplearning.com/course/2022/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "All lecture videos, full written lecture notes, slides, and Jupyter lab repositories are 100% free and openly accessible.",
    prerequisites: [
      "PyTorch training experience and deep learning fundamentals (Phases 3–5).",
    ],
    learningObjectives: [
      "Design reproducible ML/LLM codebases with config-driven experiment tracking and automated tests.",
      "Systematically debug training instabilities, data pipeline bottlenecks, and evaluation regressions.",
      "Understand deployment architectures, latency/throughput tradeoffs, and production monitoring.",
    ],
    suggestedLearningPosition:
      "Engineering Lifecycle Course across Phase 6 (Training & Packaging) and Phase 8 (Deployment & Systems)",
    recommendedOrder: 33,
    isRecommended: false,
    tags: [
      "Full Stack Deep Learning",
      "MLOps",
      "Experiment Tracking",
      "Deployment",
      "Testing",
      "LLM Engineering",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on fullstackdeeplearning.com/course/2022/ (canonical shared record for 6.5 and 8.5).",
    },
    relatedResourceIds: [
      "stanford-cs336",
      "vllm-documentation",
      "pytorch-distributed-tutorials",
    ],
  },

  // ============================================================================
  // PHASE 7 — FINE-TUNING, RLHF & ALIGNMENT
  // ============================================================================
  {
    id: "huggingface-smol-course",
    slug: "hugging-face-smol-course-fine-tuning-language-models",
    title: "smol-course — Fine-Tuning Language Models",
    provider: "Hugging Face",
    providerGroup: "Hugging Face",
    providerMonogram: "HF",
    description:
      "Practical hands-on course focused on post-training small and medium open-weight language models: chat templates, Supervised Fine-Tuning (SFT), LoRA/QLoRA parameter-efficient adaptation, preference alignment (DPO/ORPO), and evaluation.",
    detailedDescription:
      "The Hugging Face `smol-course` is purpose-built for Phase 7 of this roadmap. Designed so every exercise runs on consumer or free cloud GPUs, it guides you step by step through formatting multi-turn instruction datasets with chat templates, running Supervised Fine-Tuning (SFT), applying Low-Rank Adaptation (LoRA and 4-bit QLoRA), aligning models with Direct Preference Optimization (DPO), and evaluating instruction-following quality.",
    primaryPhase: 7,
    phases: [7],
    relevantModuleIds: ["p7-m1", "p7-m2", "p7-m3", "p7-m4", "p7-m5"],
    phasePlacements: [
      {
        phase: 7,
        catalogCode: "7.1",
        role: "start_here",
        isRecommendedStart: true,
        phaseGuidance:
          "Start Phase 7 here! Work through the units on Chat Templates & SFT, Parameter-Efficient Fine-Tuning (LoRA/QLoRA), and Preference Alignment (DPO) as you build Milestone #12 (Instruction-Tuned Assistant Model).",
        moduleIds: ["p7-m1", "p7-m2", "p7-m3", "p7-m4", "p7-m5"],
      },
    ],
    resourceType: "Interactive Course",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://huggingface.co/learn/smol-course/unit0/1",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free open-source interactive course and GitHub notebooks on Hugging Face.",
    prerequisites: [
      "Pretrained Transformer fundamentals and PyTorch training loops (Phases 5 & 6).",
    ],
    learningObjectives: [
      "Format instruction and multi-turn conversation datasets with special control tokens and assistant-only loss masking.",
      "Fine-tune language models on single-GPU hardware using LoRA and 4-bit QLoRA.",
      "Align SFT models on chosen vs. rejected preference pairs using Direct Preference Optimization (DPO).",
    ],
    suggestedLearningPosition:
      "Phase 7 Primary Starting Course (Modules 7.1–7.5)",
    recommendedOrder: 34,
    isRecommended: true,
    tags: [
      "smol-course",
      "SFT",
      "Supervised Fine-Tuning",
      "LoRA",
      "QLoRA",
      "DPO",
      "Alignment",
      "Hugging Face",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on huggingface.co/learn/smol-course/unit0/1.",
    },
    relatedResourceIds: [
      "huggingface-trl-documentation",
      "huggingface-alignment-handbook",
      "huggingface-fine-tuning-module",
    ],
  },
  {
    id: "huggingface-fine-tuning-module",
    slug: "hugging-face-course-fine-tuning-pretrained-models",
    title: "Fine-Tuning LLMs — Hugging Face Course",
    provider: "Hugging Face",
    providerGroup: "Hugging Face",
    providerMonogram: "HF",
    description:
      "Foundational course module covering dataset preprocessing, dynamic padding, the Trainer API, custom PyTorch fine-tuning loops, and learning rate schedules for adapting pretrained Transformers.",
    detailedDescription:
      "Chapter 3 of the Hugging Face LLM Course introduces the mechanics of adapting a pretrained Transformer checkpoint to downstream tasks. Crucially, it teaches both the high-level `Trainer` workflow and how to strip away the wrapper to write a native PyTorch + `Accelerate` fine-tuning loop with AdamW and linear warmup/decay.",
    primaryPhase: 7,
    phases: [7],
    relevantModuleIds: ["p7-m1", "p7-m2"],
    phasePlacements: [
      {
        phase: 7,
        catalogCode: "7.2",
        role: "additional_learning",
        phaseGuidance:
          "Review during Modules 7.1 and 7.2 for clear coverage of dynamic batch collation, padding masks, and native PyTorch fine-tuning loops.",
        moduleIds: ["p7-m1", "p7-m2"],
      },
    ],
    resourceType: "Interactive Course",
    formatSubtitle: "Course Module",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://huggingface.co/learn/llm-course/chapter3/1",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free interactive web module with runnable Colab notebooks.",
    prerequisites: [
      "PyTorch training loops and Transformer basics (Phases 3–5).",
    ],
    learningObjectives: [
      "Prepare and dynamically pad batched token sequences for fine-tuning.",
      "Write custom PyTorch fine-tuning loops with learning rate schedulers and evaluation hooks.",
      "Compare full-parameter fine-tuning against frozen-backbone adaptation.",
    ],
    suggestedLearningPosition:
      "Phase 7 Modules 7.1 & 7.2 Fine-Tuning Foundations",
    recommendedOrder: 35,
    isRecommended: false,
    tags: ["Fine-Tuning", "PyTorch", "Hugging Face", "Dynamic Padding", "SFT"],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on huggingface.co/learn/llm-course/chapter3/1.",
    },
    relatedResourceIds: [
      "huggingface-smol-course",
      "huggingface-llm-course",
      "huggingface-trl-documentation",
    ],
  },
  {
    id: "huggingface-trl-documentation",
    slug: "hugging-face-trl-transformer-reinforcement-learning-docs",
    title: "TRL Documentation and Tutorials",
    provider: "Hugging Face",
    providerGroup: "Hugging Face",
    providerMonogram: "HF",
    description:
      "Official documentation and technical guides for TRL (Transformer Reinforcement Learning), covering `SFTTrainer`, `RewardTrainer`, `PPOTrainer`, `DPOTrainer`, and `GRPOTrainer`.",
    detailedDescription:
      "TRL is the industry-standard open-source library for post-training and aligning language models in PyTorch. Its documentation provides mathematical explanations, configuration guides, and runnable scripts for Supervised Fine-Tuning (`SFTTrainer`), Reward Modeling (`RewardTrainer`), Proximal Policy Optimization (`PPOTrainer`), Direct Preference Optimization (`DPOTrainer`), and Group Relative Policy Optimization (`GRPOTrainer`) for reasoning models.",
    primaryPhase: 7,
    phases: [7],
    relevantModuleIds: ["p7-m1", "p7-m3", "p7-m4"],
    phasePlacements: [
      {
        phase: 7,
        catalogCode: "7.3",
        role: "practice_and_reference",
        phaseGuidance:
          "Use as your primary API and mathematical reference during Modules 7.1, 7.3, and 7.4 when running SFT, DPO, PPO, and GRPO experiments.",
        moduleIds: ["p7-m1", "p7-m3", "p7-m4"],
      },
    ],
    resourceType: "Documentation",
    formatSubtitle: "Documentation / Tutorials",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://huggingface.co/docs/trl/index",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote: "100% free open-source documentation and example scripts.",
    prerequisites: [
      "PyTorch, LoRA/PEFT, and understanding of cross-entropy and KL divergence (Phases 1, 5 & 7).",
    ],
    learningObjectives: [
      "Configure `SFTTrainer` with assistant-only loss completion masks and sequence packing.",
      "Train preference-aligned models with `DPOTrainer` and tune the KL penalty coefficient `beta`.",
      "Understand `PPOTrainer` and `GRPOTrainer` workflows for reward-guided and reasoning-oriented RL.",
    ],
    suggestedLearningPosition:
      "Phase 7 Core Technical Reference (Modules 7.1, 7.3 & 7.4)",
    recommendedOrder: 36,
    isRecommended: false,
    tags: ["TRL", "SFT", "DPO", "RLHF", "PPO", "GRPO", "Alignment"],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on huggingface.co/docs/trl/index.",
    },
    relatedResourceIds: [
      "huggingface-smol-course",
      "huggingface-alignment-handbook",
      "huggingface-deep-rl-course",
    ],
  },
  {
    id: "huggingface-alignment-handbook",
    slug: "hugging-face-alignment-handbook-repository",
    title: "Alignment Handbook",
    provider: "Hugging Face",
    providerGroup: "Hugging Face",
    providerMonogram: "HF",
    description:
      "Production recipes, hyperparameter configurations, and open-source training scripts for aligning language models (such as Zephyr and SmolLM-Instruct) using SFT, LoRA/QLoRA, and DPO.",
    detailedDescription:
      "Maintained by the Hugging Face H4 team, the Alignment Handbook contains the exact reproducible recipes, YAML hyperparameter configs, and multi-GPU/QLoRA scripts used to train top-performing open instruction models. It demonstrates why learning rates must drop an order of magnitude from SFT to DPO, how chat templates are validated, and how to prevent catastrophic forgetting during post-training.",
    primaryPhase: 7,
    phases: [7],
    relevantModuleIds: ["p7-m1", "p7-m2", "p7-m3", "p7-m5"],
    phasePlacements: [
      {
        phase: 7,
        catalogCode: "7.4",
        role: "practice_and_reference",
        phaseGuidance:
          "Inspect the `recipes/` directory when choosing learning rates, LoRA ranks, and DPO `beta` hyperparameters for your Phase 7 assistant model.",
        moduleIds: ["p7-m1", "p7-m2", "p7-m3", "p7-m5"],
      },
    ],
    resourceType: "GitHub Repository",
    formatSubtitle: "GitHub Repository / Handbook",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://github.com/huggingface/alignment-handbook",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free Apache-2.0 licensed open-source GitHub repository and technical handbook.",
    prerequisites: [
      "Familiarity with SFT, LoRA/QLoRA, and DPO concepts (Modules 7.1–7.3).",
    ],
    learningObjectives: [
      "Apply battle-tested hyperparameter recipes for SFT, QLoRA, and DPO post-training.",
      "Structure multi-stage alignment pipelines (Base -> SFT -> DPO) reproducibly.",
      "Diagnose and prevent alignment tax, reward over-optimization, and catastrophic forgetting.",
    ],
    suggestedLearningPosition:
      "Phase 7 Production Recipe Codebase (Modules 7.1–7.5)",
    recommendedOrder: 37,
    isRecommended: false,
    tags: [
      "Alignment Handbook",
      "Zephyr",
      "SFT",
      "DPO",
      "QLoRA",
      "GitHub Repository",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on github.com/huggingface/alignment-handbook.",
    },
    relatedResourceIds: [
      "huggingface-smol-course",
      "huggingface-trl-documentation",
    ],
  },
  {
    id: "huggingface-deep-rl-course",
    slug: "hugging-face-deep-reinforcement-learning-course",
    title: "Deep Reinforcement Learning Course",
    provider: "Hugging Face",
    providerGroup: "Hugging Face",
    providerMonogram: "HF",
    description:
      "Free interactive course teaching foundational and advanced Reinforcement Learning: Markov Decision Processes, Policy Gradients, Actor-Critic methods, and Proximal Policy Optimization (PPO).",
    detailedDescription:
      "To deeply understand RLHF (PPO) and modern reasoning reinforcement learning (RLVR / GRPO) in Modules 7.3 and 7.4, you need solid intuition for policy gradients, value functions, advantage estimation, and clipped objective ratios. The Hugging Face Deep RL Course teaches these foundations from scratch with clear theory chapters and PyTorch implementations.",
    primaryPhase: 7,
    phases: [7],
    relevantModuleIds: ["p7-m3", "p7-m4"],
    phasePlacements: [
      {
        phase: 7,
        catalogCode: "7.5",
        role: "advanced_reading",
        phaseGuidance:
          "Focus on Unit 1 (Introduction to RL), Unit 4 (Policy Gradient), Unit 6 (Actor-Critic), and Unit 8 (Proximal Policy Optimization — PPO) alongside Modules 7.3 and 7.4.",
        moduleIds: ["p7-m3", "p7-m4"],
      },
    ],
    resourceType: "Interactive Course",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://huggingface.co/learn/deep-rl-course/unit0/introduction",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free interactive web units and Colab notebooks on Hugging Face.",
    prerequisites: [
      "PyTorch, probability distributions, and gradient optimization (Phases 1 & 3).",
    ],
    learningObjectives: [
      "Understand states, actions, rewards, policies, and value functions in reinforcement learning.",
      "Derive policy gradient theorem updates and variance reduction via advantage functions.",
      "Master Proximal Policy Optimization (PPO) clipped objectives and see how they apply to LLM alignment.",
    ],
    suggestedLearningPosition:
      "Phase 7 RL Theory & PPO Deep Dive (Modules 7.3 & 7.4)",
    recommendedOrder: 38,
    isRecommended: false,
    tags: [
      "Reinforcement Learning",
      "PPO",
      "Policy Gradients",
      "Actor-Critic",
      "RLHF",
      "Hugging Face",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on huggingface.co/learn/deep-rl-course/unit0/introduction.",
    },
    relatedResourceIds: [
      "huggingface-trl-documentation",
      "huggingface-smol-course",
    ],
  },

  // ============================================================================
  // PHASE 8 — ADVANCED LLM SYSTEMS & RESEARCH
  // ============================================================================
  {
    id: "gpu-mode-lectures",
    slug: "gpu-mode-programming-and-kernel-lectures",
    title: "GPU Programming Lectures",
    provider: "GPU MODE",
    providerGroup: "GPU MODE",
    providerMonogram: "GM",
    description:
      "Community-driven advanced research and engineering lecture series covering GPU hardware architecture, CUDA kernels, Triton, FlashAttention, quantization, and PyTorch compiler internals.",
    detailedDescription:
      "GPU MODE is an open research and systems engineering community featuring deep technical lectures by leading kernel engineers, PyTorch core developers, and LLM systems researchers. Topics span SRAM vs. HBM memory hierarchies, roofline profiling, custom CUDA and Triton kernels, FlashAttention algorithms, FP8/INT4 quantization, and distributed ring/tensor parallelism.",
    primaryPhase: 8,
    phases: [8],
    relevantModuleIds: ["p8-m1", "p8-m2", "p8-m4"],
    phasePlacements: [
      {
        phase: 8,
        catalogCode: "8.6",
        role: "start_here",
        isRecommendedStart: true,
        phaseGuidance:
          "Co-recommended starting point for Phase 8 (alongside Stanford CS336). Watch the foundational lectures on GPU Architecture, Profiling, Triton Kernels, FlashAttention, and Quantization during Modules 8.1 and 8.4.",
        moduleIds: ["p8-m1", "p8-m2", "p8-m4"],
      },
    ],
    resourceType: "Video Series",
    formatSubtitle: "Video Lectures",
    difficulty: "research",
    difficultyLabel: "Research",
    language: "English",
    url: "https://www.youtube.com/@GPUMODE",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free full-length technical lectures and open-source companion repositories.",
    prerequisites: [
      "Strong PyTorch fluency, Transformer architecture mastery, and systems fundamentals (Phases 5–6).",
    ],
    learningObjectives: [
      "Understand GPU Streaming Multiprocessors (SMs), Tensor Cores, HBM bandwidth, and on-chip SRAM tiling.",
      "Profile memory-bound vs. compute-bound LLM operations and understand kernel fusion.",
      "Explore state-of-the-art quantization (INT8/INT4/FP8) and attention kernel optimizations.",
    ],
    suggestedLearningPosition:
      "Phase 8 Co-Primary Starting Resource (Modules 8.1, 8.2 & 8.4)",
    recommendedOrder: 39,
    isRecommended: true,
    tags: [
      "GPU MODE",
      "CUDA",
      "Triton",
      "FlashAttention",
      "GPU Architecture",
      "Quantization",
      "Kernels",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on youtube.com/@GPUMODE.",
    },
    relatedResourceIds: [
      "stanford-cs336",
      "triton-programming-tutorials",
      "nvidia-cuda-programming-resources",
    ],
  },
  {
    id: "nvidia-cuda-programming-resources",
    slug: "nvidia-cuda-educator-and-programming-resources",
    title: "CUDA Programming Resources",
    provider: "NVIDIA",
    providerGroup: "NVIDIA",
    providerMonogram: "NV",
    description:
      "Official NVIDIA Developer & Educator teaching kits, university course materials, and technical resources on parallel computing and CUDA GPU programming.",
    detailedDescription:
      "NVIDIA's Educator and Developer portal provides curated university teaching materials, parallel programming slides, and reference guides on thread hierarchies (grids, blocks, warps), shared memory tiling, coalesced global memory access, and hardware profiling.",
    primaryPhase: 8,
    phases: [8],
    relevantModuleIds: ["p8-m1"],
    phasePlacements: [
      {
        phase: 8,
        catalogCode: "8.2",
        role: "additional_learning",
        phaseGuidance:
          "Use during Module 8.1 (GPU & Training Systems) to understand thread blocks, warps, shared memory SRAM, and memory coalescing.",
        moduleIds: ["p8-m1"],
      },
    ],
    resourceType: "Documentation",
    formatSubtitle: "Training Resources",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://developer.nvidia.com/educators/existing-courses",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "Publicly accessible university curriculum materials and CUDA programming references on NVIDIA Developer.",
    prerequisites: [
      "Basic C/Python systems concepts and matrix multiplication (Phases 0–1).",
    ],
    learningObjectives: [
      "Understand the CUDA execution model: threads, warps, thread blocks, and Streaming Multiprocessors.",
      "Distinguish high-bandwidth memory (HBM) from fast on-chip shared memory (SRAM).",
      "Analyze memory bandwidth bottlenecks and parallel reduction patterns.",
    ],
    suggestedLearningPosition:
      "Phase 8 Module 8.1 GPU Hardware & CUDA Reference",
    recommendedOrder: 40,
    isRecommended: false,
    tags: ["NVIDIA", "CUDA", "Parallel Computing", "GPU Memory", "Kernels"],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on developer.nvidia.com/educators/existing-courses.",
    },
    relatedResourceIds: [
      "gpu-mode-lectures",
      "triton-programming-tutorials",
      "nvidia-online-training-catalog",
    ],
  },
  {
    id: "nvidia-online-training-catalog",
    slug: "nvidia-deep-learning-institute-online-training-catalog",
    title: "NVIDIA Online Training Catalog",
    provider: "NVIDIA",
    providerGroup: "NVIDIA",
    providerMonogram: "NV",
    description:
      "NVIDIA Deep Learning Institute (DLI) self-paced training catalog featuring both free introductory courses and paid hands-on GPU cluster labs on CUDA, accelerated computing, and LLM deployment.",
    detailedDescription:
      "The NVIDIA Deep Learning Institute (DLI) self-paced catalog offers browser-accessible technical modules on accelerated computing, CUDA Python/C++, multi-GPU scaling, and TensorRT-LLM inference. Important Access Note: This is a mixed free and paid training catalog—not every course in the catalog is free. Filter by 'Free' inside the NVIDIA catalog to access complimentary self-paced modules.",
    primaryPhase: 8,
    phases: [8],
    relevantModuleIds: ["p8-m1", "p8-m2", "p8-m4"],
    phasePlacements: [
      {
        phase: 8,
        catalogCode: "8.3",
        role: "additional_learning",
        phaseGuidance:
          "Optional supplementary catalog for Phase 8. Note: This is a mixed free/paid catalog—filter for free self-paced courses if you want zero-cost modules on CUDA and accelerated AI.",
        moduleIds: ["p8-m1", "p8-m2", "p8-m4"],
      },
    ],
    resourceType: "Documentation",
    formatSubtitle: "Mixed Free/Paid Training Catalog",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://www.nvidia.com/en-us/training/online/",
    isFreeLearningMaterial: false,
    accessTier: "mixed_free_and_paid",
    accessNote:
      "Mixed Free & Paid Catalog: Contains complimentary introductory self-paced courses alongside paid cloud-GPU lab courses. Use the catalog's price filter to select free modules.",
    certificateCostNote:
      "Paid DLI courses and certification exams carry a fee; free introductory modules do not require payment.",
    prerequisites: [
      "Python, PyTorch, and GPU computing fundamentals (Phases 3–8).",
    ],
    learningObjectives: [
      "Locate official NVIDIA self-paced modules on CUDA acceleration and multi-GPU workflows.",
      "Explore hardware-specific optimization techniques for NVIDIA Tensor Core architectures.",
    ],
    suggestedLearningPosition:
      "Phase 8 Supplementary Mixed Catalog (Modules 8.1, 8.2 & 8.4)",
    recommendedOrder: 41,
    isRecommended: false,
    tags: [
      "NVIDIA",
      "DLI",
      "Training Catalog",
      "CUDA",
      "Accelerated Computing",
    ],
    verification: {
      status: "verified_redirect",
      checkedDate: "2026-11-09",
      resolvedUrl: "https://www.nvidia.com/en-us/training/self-paced-courses/",
      note: "Verified HTTP 200 (official redirect to /en-us/training/self-paced-courses/). Marked accurately as mixed free/paid catalog.",
    },
    relatedResourceIds: [
      "nvidia-cuda-programming-resources",
      "gpu-mode-lectures",
      "pytorch-distributed-tutorials",
    ],
  },
  {
    id: "pytorch-distributed-tutorials",
    slug: "pytorch-distributed-training-tutorials",
    title: "Distributed Training Tutorials",
    provider: "PyTorch",
    providerGroup: "PyTorch",
    providerMonogram: "PT",
    description:
      "Official PyTorch documentation and step-by-step tutorials for DistributedDataParallel (DDP), Fully Sharded Data Parallel (FSDP2), Tensor Parallelism, and multi-GPU collective communication.",
    detailedDescription:
      "When a language model or its optimizer states exceed the VRAM of a single GPU, training must be parallelized across devices. The official PyTorch Distributed Overview and tutorial suite teach collective primitives (`AllReduce`, `AllGather`, `ReduceScatter`), `DistributedDataParallel` (DDP), `FullyShardedDataParallel` (FSDP / ZeRO-3 sharding), and Pipeline/Tensor Parallelism.",
    primaryPhase: 8,
    phases: [8],
    relevantModuleIds: ["p8-m2"],
    phasePlacements: [
      {
        phase: 8,
        catalogCode: "8.4",
        role: "practice_and_reference",
        phaseGuidance:
          "Core technical reference for Module 8.2 (Distributed Training). Work through the DDP and FSDP tutorials.",
        moduleIds: ["p8-m2"],
      },
    ],
    resourceType: "Documentation",
    formatSubtitle: "Documentation / Tutorials",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://docs.pytorch.org/tutorials/distributed.html",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote: "100% free official PyTorch distributed training tutorials.",
    prerequisites: [
      "Single-GPU PyTorch pretraining loops and GPU memory math (Phases 6 & 8.1).",
    ],
    learningObjectives: [
      "Understand collective communication operations (`AllReduce`, `AllGather`, `ReduceScatter`).",
      "Convert a single-GPU PyTorch training script to multi-GPU `DistributedDataParallel` (DDP).",
      "Shard model parameters, gradients, and optimizer states across GPUs with FSDP / ZeRO.",
    ],
    suggestedLearningPosition:
      "Phase 8 Module 8.2 Core Reference (Distributed Training)",
    recommendedOrder: 42,
    isRecommended: false,
    tags: [
      "PyTorch",
      "Distributed Training",
      "DDP",
      "FSDP",
      "ZeRO",
      "Tensor Parallelism",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on docs.pytorch.org/tutorials/distributed.html.",
    },
    relatedResourceIds: [
      "stanford-cs336",
      "gpu-mode-lectures",
      "triton-programming-tutorials",
    ],
  },
  {
    id: "triton-programming-tutorials",
    slug: "triton-gpu-kernel-programming-tutorials",
    title: "Triton Programming Tutorials",
    provider: "Triton",
    providerGroup: "Triton / OpenAI",
    providerMonogram: "TR",
    description:
      "Official hands-on tutorials for OpenAI's Triton language: vector addition, fused softmax, tiled matrix multiplication, LayerNorm, and FlashAttention kernels in Python.",
    detailedDescription:
      "Triton allows AI engineers to write high-efficiency block-tiled GPU kernels directly in Python without managing low-level CUDA warp synchronization manually. The official Triton tutorial sequence walks from a simple vector addition kernel to a fused row-wise softmax (demonstrating massive memory-bandwidth speedups over naive PyTorch), tiled matrix multiplication in SRAM, fused LayerNorm, and FlashAttention.",
    primaryPhase: 8,
    phases: [8],
    relevantModuleIds: ["p8-m1", "p8-m3"],
    phasePlacements: [
      {
        phase: 8,
        catalogCode: "8.7",
        role: "practice_and_reference",
        phaseGuidance:
          "Work through Tutorials 01 (Vector Add), 02 (Fused Softmax), 03 (Matrix Multiplication), and 06 (Fused Attention) during Modules 8.1 and 8.3.",
        moduleIds: ["p8-m1", "p8-m3"],
      },
    ],
    resourceType: "Tutorial",
    formatSubtitle: "Technical Tutorials",
    difficulty: "research",
    difficultyLabel: "Research",
    language: "English",
    url: "https://triton-lang.org/main/getting-started/tutorials/index.html",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free open-source documentation and executable Python kernel scripts.",
    prerequisites: [
      "GPU memory hierarchy (SRAM vs. HBM) and Transformer attention math (Phases 5 & 8.1).",
    ],
    learningObjectives: [
      "Write block-tiled GPU kernels in Python using `tl.load`, `tl.store`, and `tl.dot`.",
      "Implement a fused softmax kernel that keeps intermediate reductions in on-chip SRAM.",
      "Understand how FlashAttention tiles `Q`, `K`, and `V` blocks using online softmax.",
    ],
    suggestedLearningPosition:
      "Phase 8 Hands-On Kernel Engineering (Modules 8.1 & 8.3)",
    recommendedOrder: 43,
    isRecommended: false,
    tags: [
      "Triton",
      "GPU Kernels",
      "Fused Softmax",
      "FlashAttention",
      "SRAM Tiling",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on triton-lang.org tutorials.",
    },
    relatedResourceIds: [
      "gpu-mode-lectures",
      "stanford-cs336",
      "vllm-documentation",
    ],
  },
  {
    id: "vllm-documentation",
    slug: "vllm-high-throughput-inference-documentation",
    title: "vLLM Documentation",
    provider: "vLLM",
    providerGroup: "vLLM",
    providerMonogram: "VL",
    description:
      "Official documentation for vLLM, the high-throughput open-source LLM inference and serving engine powered by PagedAttention, continuous batching, speculative decoding, and quantized kernels.",
    detailedDescription:
      "Originating from UC Berkeley Sky Computing Lab research, vLLM is the leading open-source LLM serving engine. Its documentation explains how PagedAttention eliminates KV-cache fragmentation by managing attention keys and values like OS virtual memory pages, how continuous iteration-level batching maximizes GPU utilization, and how to benchmark quantized (AWQ, GPTQ, FP8) and speculative decoding deployments.",
    primaryPhase: 8,
    phases: [8],
    relevantModuleIds: ["p8-m4"],
    phasePlacements: [
      {
        phase: 8,
        catalogCode: "8.8",
        role: "practice_and_reference",
        phaseGuidance:
          "Study alongside Module 8.4 (Inference & Optimization) and Milestone #13 (Quantized & Optimized Inference Benchmark).",
        moduleIds: ["p8-m4"],
      },
    ],
    resourceType: "Documentation",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://docs.vllm.ai/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free open-source Apache-2.0 documentation and benchmarking guides.",
    prerequisites: [
      "KV caching, Transformer autoregressive decoding, and GPU memory bandwidth concepts (Phases 5 & 8.1).",
    ],
    learningObjectives: [
      "Understand how PagedAttention manages non-contiguous KV-cache blocks to increase serving batch sizes.",
      "Compare static batching vs. continuous iteration-level batching for Time-To-First-Token (TTFT) and throughput.",
      "Deploy and benchmark quantized models (AWQ, GPTQ, FP8) and speculative decoding.",
    ],
    suggestedLearningPosition:
      "Phase 8 Module 8.4 Inference Serving & Quantization Reference",
    recommendedOrder: 44,
    isRecommended: false,
    tags: [
      "vLLM",
      "PagedAttention",
      "KV Cache",
      "Continuous Batching",
      "Inference",
      "Quantization",
      "Speculative Decoding",
    ],
    verification: {
      status: "verified_redirect",
      checkedDate: "2026-11-09",
      resolvedUrl: "https://docs.vllm.ai/en/latest/",
      note: "Verified HTTP 200 (official redirect to docs.vllm.ai/en/latest/).",
    },
    relatedResourceIds: [
      "stanford-cs336",
      "gpu-mode-lectures",
      "triton-programming-tutorials",
    ],
  },
];
