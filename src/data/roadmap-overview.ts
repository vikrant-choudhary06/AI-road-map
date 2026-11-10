import type { RoadmapPhaseSummary } from "@/types";

/**
 * Architectural index of the 9-Phase AI & LLM Learning Curriculum (Phase 0 – Phase 8).
 */
export const ROADMAP_PHASE_OVERVIEW: RoadmapPhaseSummary[] = [
  {
    phase: 0,
    slug: "phase-0-programming-foundations",
    code: "P0",
    title: "Programming Foundations",
    subtitle:
      "Develop fluency in Python, algorithmic thinking, data structures, and vectorized numerical computing with NumPy.",
    difficulty: "foundational",
    coreFocus: "4 Weeks · Python · Data Structures · NumPy",
  },
  {
    phase: 1,
    slug: "phase-1-mathematics-for-ai",
    code: "P1",
    title: "Mathematics for AI",
    subtitle:
      "Master the linear algebra, multivariable calculus, and probability theory that govern neural representations.",
    difficulty: "foundational",
    coreFocus: "8 Weeks · Linear Algebra · Calculus · Probability",
  },
  {
    phase: 2,
    slug: "phase-2-machine-learning-from-scratch",
    code: "P2",
    title: "Machine Learning From Scratch",
    subtitle:
      "Build classical supervised and unsupervised learning algorithms from first principles to understand optimization.",
    difficulty: "foundational",
    coreFocus: "8 Weeks · Loss Landscapes · SGD · Regularization",
  },
  {
    phase: 3,
    slug: "phase-3-deep-learning-neural-networks",
    code: "P3",
    title: "Deep Learning & Neural Networks",
    subtitle:
      "Implement computational graphs, backpropagation, and multi-layer neural networks before transitioning to PyTorch.",
    difficulty: "intermediate",
    coreFocus: "8 Weeks · Autograd · Backprop · PyTorch Tensors",
  },
  {
    phase: 4,
    slug: "phase-4-nlp-language-modeling",
    code: "P4",
    title: "NLP & Language Modeling",
    subtitle:
      "Explore how raw human text is tokenized, embedded into continuous vector spaces, and modeled autoregressively.",
    difficulty: "intermediate",
    coreFocus: "6 Weeks · BPE Tokenizers · Embeddings · Perplexity",
  },
  {
    phase: 5,
    slug: "phase-5-transformers-from-scratch",
    code: "P5",
    title: "Transformers From Scratch",
    subtitle:
      "Dissect and implement every component of modern decoder-only Transformer architectures in clean PyTorch.",
    difficulty: "advanced",
    coreFocus: "10 Weeks · Causal Attention · RoPE · RMSNorm · SwiGLU",
  },
  {
    phase: 6,
    slug: "phase-6-train-your-own-llm",
    code: "P6",
    title: "Train Your Own LLM",
    subtitle:
      "Engineer end-to-end pre-training pipelines, dataset tokenization workflows, and mixed-precision training loops.",
    difficulty: "advanced",
    coreFocus: "10 Weeks · Pretraining · BF16 · Scaling Laws",
  },
  {
    phase: 7,
    slug: "phase-7-post-training-alignment",
    code: "P7",
    title: "Post-training & Alignment",
    subtitle:
      "Adapt pretrained base models into instruction-following assistants using LoRA/QLoRA, SFT, and DPO.",
    difficulty: "advanced",
    coreFocus: "8 Weeks · SFT · LoRA / QLoRA · DPO · Alignment",
  },
  {
    phase: 8,
    slug: "phase-8-advanced-llm-systems-research",
    code: "P8",
    title: "Advanced LLM Systems & Research",
    subtitle:
      "Master post-training quantization, high-throughput inference engines, evaluation harnesses, and reasoning models.",
    difficulty: "research",
    coreFocus: "16 Weeks · Quantization · KV Cache · Reasoning",
  },
];
