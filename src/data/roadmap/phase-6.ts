import type { RoadmapPhase } from "@/types";

export const PHASE_6_TRAIN_YOUR_OWN_LLM: RoadmapPhase = {
  id: "phase-6",
  slug: "phase-6-train-your-own-llm",
  phase: 6,
  code: "P6",
  title: "Train Your Own LLM",
  shortDescription:
    "Engineer end-to-end dataset pipelines, pretraining loops, evaluation suites, and reproducible packaging to train your own GPT-style language model from random weights.",
  purpose:
    "Train your own GPT-style language model from random weights using your own training pipeline.",
  estimatedWeeks: 10,
  difficulty: "advanced",
  difficultyLabel: "Advanced",
  prerequisites: [
    {
      phaseNumber: 4,
      phaseId: "phase-4",
      label: "Phase 4: BPE Tokenization & Perplexity Evaluation",
    },
    {
      phaseNumber: 5,
      phaseId: "phase-5",
      label: "Phase 5: Transformers From Scratch (Mini GPT Architecture)",
    },
  ],
  learningObjectives: [
    "Engineer a clean, deduplicated, packed, and memory-mapped pretraining dataset pipeline with clear provenance and licensing.",
    "Implement a production-grade LLM pretraining loop with gradient accumulation, AdamW decoupled weight decay, linear warmup + cosine decay, mixed precision, and fault-tolerant checkpointing.",
    "Train small language models at hardware-appropriate educational scales (e.g., 100K–1M, 5M–20M, or 30M–100M parameters) and understand how loss scales with compute and data.",
    "Evaluate pretrained models rigorously on validation perplexity, memorization vs. generalization, contamination checks, and package `MyLLM v1` with a reproducible model card and inference CLI.",
  ],
  modules: [
    {
      id: "p6-m1",
      code: "6.1",
      title: "Dataset Engineering",
      description:
        "Corpus curation, licensing, cleaning, deduplication, PII filtering, tokenization, sequence packing, and memory-mapped binary streaming.",
      estimatedEffort: "2 weeks · ~30–35 hours",
      whatYouWillLearn:
        "You will learn how raw text collections are transformed into high-signal binary token shards (`uint16` memory-mapped arrays): verifying open licenses, cleaning extraction artifacts, deduplicating documents, filtering personal information, and packing tokenized sequences with `<|eos|>` separators.",
      whyItMatters:
        "Data quality dictates model quality: a clean, deduplicated 1-billion-token educational corpus consistently outperforms a noisy, repetitive 5-billion-token scrape and trains 5× faster.",
      learningObjectives: [
        "Curate and clean a pretraining text dataset with verified licensing and provenance.",
        "Apply exact and near-duplicate filtering, language identification, and PII scrubbing.",
        "Tokenize and pack documents into contiguous `np.memmap` binary shards (`train.bin`, `val.bin`) for zero-RAM-overhead streaming.",
      ],
      keyConcepts: [
        "Data provenance & permissive licensing",
        "MinHash / exact deduplication",
        "PII & quality filtering",
        "Sequence packing with <|eos|>",
        "Memory-mapped (np.memmap) binary shards",
      ],
      topics: [
        {
          id: "p6-m1-dataset-collection",
          title: "Dataset collection",
          explanation:
            "Sourcing domain-appropriate text corpora—such as TinyStories, FineWeb-Edu subsets, open-access textbooks, or permissive code repositories—matched to your target model size and compute budget.",
          keyConcepts: ["Signal-to-noise ratio", "Domain mixture weighting", "Matching token budget to parameter count"],
          learningOutcome: "Select and download an appropriate open pretraining corpus for your hardware budget.",
        },
        {
          id: "p6-m1-licensing",
          title: "Licensing",
          explanation:
            "Inspecting dataset licenses (CC-BY, CC0, MIT, Apache-2.0 vs. non-commercial or restrictive terms) so you know what rights apply to models trained on the corpus.",
          keyConcepts: ["Permissive open licenses", "Attribution requirements", "Respecting opt-out & terms"],
          learningOutcome: "Document the license of every data source in your training manifest.",
        },
        {
          id: "p6-m1-data-provenance",
          title: "Data provenance",
          explanation:
            "Recording the exact origin URL, snapshot date, hash checksum, and preprocessing script version for every shard entering your training set.",
          keyConcepts: ["SHA-256 checksums", "Data lineage tracking", "Reproducible download scripts"],
          learningOutcome: "Maintain a verifiable provenance manifest for your pretraining data.",
        },
        {
          id: "p6-m1-text-extraction",
          title: "Text extraction",
          explanation:
            "Extracting clean prose and code from raw HTML, Markdown, or PDF sources while stripping navigation menus, ads, and broken markup.",
          keyConcepts: ["Boilerplate removal", "Preserving code blocks & math formulas"],
          learningOutcome: "Extract clean text passages from structured document formats.",
        },
        {
          id: "p6-m1-data-cleaning",
          title: "Data cleaning",
          explanation:
            "Applying heuristic quality filters (symbol-to-word ratios, stop-word presence, line-length distributions) to discard gibberish, machine-generated spam, and corrupted encodings.",
          keyConcepts: ["Heuristic quality filters (Gopher / FineWeb rules)", "Encoding repair"],
          learningOutcome: "Implement document-level quality filters that discard low-quality text.",
        },
        {
          id: "p6-m1-deduplication",
          title: "Deduplication",
          explanation:
            "Removing exact duplicate documents/paragraphs (via SHA-256 hashes) and near-duplicates (via MinHash LSH) prevents the model from memorizing repeated boilerplate and reduces train-test leakage.",
          keyConcepts: ["Exact hash deduplication", "MinHash LSH near-deduplication", "Preventing verbatim memorization"],
          learningOutcome: "Deduplicate a text corpus and measure the percentage of redundant tokens removed.",
        },
        {
          id: "p6-m1-language-id",
          title: "Language identification",
          explanation:
            "Filtering documents by target language probability using fast classifiers so a small model does not waste capacity across dozens of unintended scripts.",
          keyConcepts: ["Fast n-gram language classifiers", "Confidence thresholds"],
          learningOutcome: "Filter a corpus to your intended target language(s).",
        },
        {
          id: "p6-m1-pii-filtering",
          title: "Personal-information filtering",
          explanation:
            "Redacting email addresses, phone numbers, IP addresses, and secret API keys using regex patterns before tokenization.",
          keyConcepts: ["Regex redaction of emails/phones/keys", "Privacy-preserving replacement tokens"],
          learningOutcome: "Implement a PII and credential scrubbing pass in your data pipeline.",
        },
        {
          id: "p6-m1-splits",
          title: "Train/validation/test splits",
          explanation:
            "Splitting at the document level (never slicing inside a single document!) after deduplication so validation perplexity measures true generalization to unseen documents.",
          keyConcepts: ["Document-level splitting", "Zero cross-split document overlap"],
          learningOutcome: "Create leak-free document-level train, validation, and test shards.",
        },
        {
          id: "p6-m1-tokenization-pipeline",
          title: "Tokenization",
          explanation:
            "Encoding millions of documents in parallel across CPU worker processes into compact `uint16` (for $V < 65536$) or `uint32` integer arrays.",
          keyConcepts: ["Multiprocessing tokenization", "uint16 binary storage (2 bytes/token)"],
          learningOutcome: "Tokenize a multi-megabyte or gigabyte corpus into binary integer files.",
        },
        {
          id: "p6-m1-dataset-packing",
          title: "Dataset packing",
          explanation:
            "Concatenating tokenized documents separated by `<|eos|>` into a single continuous stream and slicing fixed-length `block_size` windows eliminates wasted `<|pad|>` compute during pretraining.",
          keyConcepts: ["Concatenate-and-chunk packing", "<|eos|> document boundary token", "100% non-padded token utilization"],
          learningOutcome: "Pack variable-length documents into dense, pad-free training sequences.",
        },
        {
          id: "p6-m1-dataset-streaming",
          title: "Dataset streaming",
          explanation:
            "Using `np.memmap('train.bin', dtype=np.uint16, mode='r')` maps binary token files directly from disk into virtual address space, letting you train on datasets larger than system RAM.",
          keyConcepts: ["OS virtual memory paging (np.memmap)", "Instant startup & constant RAM usage"],
          learningOutcome: "Stream random batches from a disk-backed `np.memmap` binary shard.",
          formulaOrCode: "data = np.memmap('train.bin', dtype=np.uint16, mode='r')\nix = torch.randint(len(data) - block_size, (batch_size,))",
        },
        {
          id: "p6-m1-dataset-versioning",
          title: "Dataset versioning",
          explanation:
            "Recording the tokenizer hash, shard checksums, total token counts, and filtering statistics in a `dataset_card.json` alongside the binary shards.",
          keyConcepts: ["Shard metadata manifest", "Tokenizer-dataset compatibility checks"],
          learningOutcome: "Version your tokenized shards with metadata verification.",
        },
      ],
      practicalExercises: [
        "Build a complete data preparation script that cleans, deduplicates, splits, tokenizes, and writes `train.bin`, `val.bin`, and `meta.json` using `np.memmap`.",
      ],
      completionMilestone:
        "Produce clean, deduplicated, memory-mapped `train.bin` and `val.bin` pretraining shards.",
      recommendedResources: [
        {
          title: "Stanford CS336 — Language Modeling from Scratch (Data Lectures)",
          provider: "Stanford University",
          url: "https://cs336.stanford.edu/spring2025/",
        },
      ],
    },
    {
      id: "p6-m2",
      code: "6.2",
      title: "Pretraining Fundamentals",
      description:
        "Random weight initialization, token-budget batch sizing, gradient accumulation, AdamW decoupled weight decay, warmup-cosine schedules, gradient clipping, and fault-tolerant checkpointing.",
      estimatedEffort: "2.5 weeks · ~38–45 hours",
      whatYouWillLearn:
        "You will engineer the complete pretraining loop used to train modern GPT models from random weights—simulating large effective token batch sizes on a single GPU or CPU via gradient accumulation, scheduling learning rates with linear warmup and cosine decay, clipping gradient spikes, and saving resumable checkpoints.",
      whyItMatters:
        "A Transformer architecture only learns well when paired with a disciplined optimization recipe: decoupled weight decay (`AdamW`), gradient accumulation to reach stable tokens-per-step, warmup-cosine scheduling, and gradient norm clipping.",
      learningObjectives: [
        "Calculate tokens-per-step (`micro_batch_size * seq_len * grad_accum_steps`) and implement gradient accumulation.",
        "Configure `AdamW` with decoupled weight decay applied only to 2D weight matrices (excluding biases and LayerNorm/RMSNorm).",
        "Implement linear warmup + cosine learning-rate decay, global gradient norm clipping, and fault-tolerant checkpoint recovery.",
      ],
      keyConcepts: [
        "Tokens-per-step budget & gradient accumulation",
        "AdamW decoupled weight decay parameter groups",
        "Linear warmup + cosine decay schedule",
        "Global gradient norm clipping (1.0)",
        "Resumable checkpoint serialization",
      ],
      topics: [
        {
          id: "p6-m2-random-init",
          title: "Random initialization",
          explanation:
            "Verifying that at step 0 with random $\\mathcal{N}(0, 0.02)$ weights, initial loss is $\\approx \\ln(V)$ (e.g., $\\ln(8192) \\approx 9.01$)—confirming there are no initialization scale bugs before spending hours training.",
          keyConcepts: ["Step-0 sanity check L_0 ≈ ln(V)", "Residual projection 1/sqrt(2L) scaling"],
          learningOutcome: "Verify step-0 loss against theoretical $\\ln(V)$ before starting a pretraining run.",
        },
        {
          id: "p6-m2-autoregressive-training",
          title: "Autoregressive training",
          explanation:
            "Every token in a `(B, T)` window simultaneously acts as a training target for its prefix, providing $B \\times T$ dense supervisory signals per forward pass.",
          keyConcepts: ["B × T tokens per micro-step", "Dense supervision efficiency"],
          learningOutcome: "Measure training progress in total tokens processed rather than arbitrary epochs.",
        },
        {
          id: "p6-m2-next-token-pretrain",
          title: "Next-token prediction",
          explanation:
            "Predicting `y = x[:, 1:]` from `x[:, :-1]` across packed document streams motivates the model to learn syntax, facts, and reasoning solely to compress the training distribution.",
          keyConcepts: ["Compression as intelligence", "Self-supervised next-token objective"],
          learningOutcome: "Trace how minimizing next-token uncertainty teaches grammar and world structure.",
        },
        {
          id: "p6-m2-cross-entropy-pretrain",
          title: "Cross-entropy",
          explanation:
            "Tracking both raw cross-entropy (in nats) and bits-per-byte ($\\text{BPB} = \\frac{L}{\\ln 2} \\times \\frac{\\text{tokens}}{\\text{bytes}}$) to monitor compression progress accurately.",
          keyConcepts: ["Nats vs bits-per-byte (BPB)", "Loss curve smoothing"],
          learningOutcome: "Log both cross-entropy loss and bits-per-byte during pretraining.",
        },
        {
          id: "p6-m2-batch-size",
          title: "Batch size",
          explanation:
            "In LLM pretraining, batch size is measured in total tokens per optimizer update ($B_{\\text{tokens}} = B_{\\text{micro}} \\times T \\times K_{\\text{accum}}$); too small makes gradients noisy, while larger token batches stabilize updates.",
          keyConcepts: ["Micro-batch size (VRAM limit)", "Effective token batch size"],
          learningOutcome: "Select micro-batch and effective token batch sizes suited to your hardware.",
        },
        {
          id: "p6-m2-sequence-length",
          title: "Sequence length",
          explanation:
            "Context length $T$ (`block_size`, e.g., $256$, $512$, or $1024$) determines the maximum range of dependencies the model can attend over during pretraining.",
          keyConcepts: ["Context length vs VRAM tradeoff", "Positional embedding range"],
          learningOutcome: "Balance sequence length $T$ against micro-batch size within available memory.",
        },
        {
          id: "p6-m2-gradient-accumulation",
          title: "Gradient accumulation",
          explanation:
            "Running $K$ forward and backward micro-steps (dividing each micro-step's loss by $K$!) before calling `optimizer.step()` and `optimizer.zero_grad()` lets a modest GPU or CPU simulate any large batch size.",
          keyConcepts: ["loss = loss / grad_accum_steps", "Accumulating .grad over K micro-steps", "Hardware-independent batch sizing"],
          learningOutcome: "Implement exact gradient accumulation with `loss / grad_accum_steps` scaling.",
          formulaOrCode: "for micro_step in range(grad_accum_steps):\n    loss = model(x, y) / grad_accum_steps\n    loss.backward()\nclip_grad_norm_(model.parameters(), 1.0)\noptimizer.step()\noptimizer.zero_grad(set_to_none=True)",
        },
        {
          id: "p6-m2-adamw",
          title: "AdamW",
          explanation:
            "Loshchilov & Hutter showed that standard $L_2$ regularization inside Adam interacts poorly with adaptive second moments; `AdamW` decouples weight decay ($\\theta \\leftarrow (1 - \\eta \\lambda)\\theta - \\eta \\hat{m}_t / \\sqrt{\\hat{v}_t}$) with $\\beta_1=0.9, \\beta_2=0.95$.",
          keyConcepts: ["Decoupled weight decay", "(β₁=0.9, β₂=0.95) LLM standard", "Fused AdamW kernel"],
          learningOutcome: "Configure `torch.optim.AdamW` with LLM-standard betas `(0.9, 0.95)`.",
        },
        {
          id: "p6-m2-weight-decay",
          title: "Weight decay",
          explanation:
            "Only 2D weight matrices (linear projections and embeddings) should receive weight decay (e.g., `0.1`); 1D biases and LayerNorm/RMSNorm scale parameters must have `weight_decay = 0.0`.",
          keyConcepts: ["2D matrices decayed (p.dim() >= 2)", "1D biases & norms excluded (p.dim() < 2)"],
          learningOutcome: "Split model parameters into decayed and non-decayed optimizer parameter groups.",
        },
        {
          id: "p6-m2-warmup",
          title: "Warmup",
          explanation:
            "At step 0, Adam's second-moment variance estimates $v_t$ are uncalibrated. Ramping the learning rate linearly from $0$ to $\\eta_{\\max}$ over the first 2%–5% of steps prevents early divergence spikes.",
          keyConcepts: ["Linear warmup phase", "Stabilizing early Adam variance estimates"],
          learningOutcome: "Explain why Transformer pretraining requires a linear learning-rate warmup.",
        },
        {
          id: "p6-m2-cosine-decay",
          title: "Cosine learning-rate decay",
          explanation:
            "After warmup, smoothly decaying the learning rate along a half-cosine curve down to $\\eta_{\\min} = 0.1 \\eta_{\\max}$ lets the model settle into flat, well-generalizing minima.",
          keyConcepts: ["0.5 * (1 + cos(π * progress))", "Minimum learning rate floor (10% of peak)"],
          learningOutcome: "Implement a step-wise `get_lr(step)` function combining linear warmup and cosine decay.",
        },
        {
          id: "p6-m2-gradient-clipping",
          title: "Gradient clipping",
          explanation:
            "Clipping the global $L_2$ norm of all parameter gradients (`torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)`) prevents rare unlucky batches from causing catastrophic weight updates, while logging the pre-clip `grad_norm` provides an early health indicator.",
          keyConcepts: ["Global L2 norm clipping at 1.0", "Monitoring grad_norm for spikes"],
          learningOutcome: "Apply global gradient norm clipping and log gradient norms at every step.",
        },
        {
          id: "p6-m2-checkpoint-recovery",
          title: "Checkpoint saving and recovery",
          explanation:
            "Atomically saving model weights, optimizer state, step counter, RNG states, and config JSON so any interrupted run resumes from the exact step without loss spikes.",
          keyConcepts: ["Atomic checkpoint writes", "Saving optimizer & RNG state", "Deterministic resumption"],
          learningOutcome: "Verify that stopping and resuming a training run at step 200 produces an identical loss curve to an uninterrupted run.",
        },
      ],
      practicalExercises: [
        "Implement and plot the `get_lr(step)` schedule over 5,000 steps with 200 warmup steps, peak LR `6e-4`, and min LR `6e-5`.",
      ],
      completionMilestone:
        "Implement a complete, resumable pretraining loop with gradient accumulation, AdamW parameter groups, warmup-cosine scheduling, and gradient clipping.",
    },
    {
      id: "p6-m3",
      code: "6.3",
      title: "Train Models of Increasing Size",
      description:
        "Progressive pretraining experiments across Model A (100K–1M params), Model B (5M–20M params), and Model C (30M–100M params), tailored to your available hardware.",
      estimatedEffort: "2.5 weeks · ~38–45 hours",
      whatYouWillLearn:
        "You will practice the engineering discipline of scaling up systematically: first debugging your entire pipeline in minutes on a tiny Model A (100K–1M parameters), then training a coherent domain model at Model B (5M–20M parameters), and optionally scaling to Model C (30M–100M parameters) if you have GPU access.",
      whyItMatters:
        "In real LLM research, engineers never launch a large run first. They validate data, loss curves, and hyperparameters on tiny proxy models before scaling compute. Note: these parameter tiers are educational targets and hardware-dependent—you do NOT need to train the largest model to complete Phase 6.",
      learningObjectives: [
        "Configure, train, and debug Model A (100K–1M parameters) on CPU or any laptop GPU in minutes.",
        "Scale to Model B (5M–20M parameters) on a single consumer/cloud GPU and observe qualitative leaps in grammar and coherence.",
        "Understand the compute, VRAM, and Chinchilla token-budget tradeoffs for Model C (30M–100M parameters) without requiring expensive hardware.",
      ],
      keyConcepts: [
        "Model A (100K–1M): Pipeline verification & CPU-friendly training",
        "Model B (5M–20M): Coherent domain generation on a single GPU",
        "Model C (30M–100M): Scaling laws & compute budgeting (optional hardware tier)",
        "Chinchilla ~20 tokens per parameter rule of thumb",
        "VRAM accounting (weights + gradients + optimizer states + activations)",
      ],
      topics: [
        {
          id: "p6-m3-model-a",
          title: "Model A: 100K–1M parameters",
          explanation:
            "A compact 2-to-4 layer Transformer (`d_model=64..128`, `n_head=4`, `block_size=128..256`) that trains in minutes on a laptop CPU or basic GPU. Ideal for verifying that loss drops smoothly from $\\ln(V)$ and generating simple domain text.",
          keyConcepts: ["Fast iteration cycle", "Overfit-single-batch sanity test", "Laptop CPU / free tier friendly"],
          learningOutcome: "Train Model A (100K–1M parameters) to convergence and verify every component of your pipeline.",
        },
        {
          id: "p6-m3-model-b",
          title: "Model B: 5M–20M parameters",
          explanation:
            "A 6-to-8 layer Transformer (`d_model=256..384`, `n_head=6..8`, `block_size=256..512`) trained on 100M–400M tokens (e.g., TinyStories or curated educational text) on a single GPU, producing grammatically consistent multi-paragraph completions.",
          keyConcepts: ["Single-GPU BF16/FP16 sweet spot", "Emergence of multi-sentence coherence", "Validation loss scaling"],
          learningOutcome: "Configure and train (or profile) a 5M–20M parameter model and compare its validation perplexity against Model A.",
        },
        {
          id: "p6-m3-model-c",
          title: "Model C: 30M–100M parameters",
          explanation:
            "An 8-to-12 layer GPT-2-small-scale architecture (`d_model=512..768`, `n_head=8..12`, `block_size=512..1024`). Completing this tier on full token budgets is optional and hardware-dependent; all learners learn to calculate its exact VRAM footprint (~16 bytes/param in mixed-precision AdamW plus activations) and Chinchilla-optimal token budget (~20 tokens per parameter).",
          keyConcepts: ["16 bytes/param AdamW memory rule", "Chinchilla token-to-parameter ratio (~20:1)", "Hardware-dependent optional training tier"],
          learningOutcome: "Calculate exact memory, FLOPs ($C \\approx 6 N D$), and optimal token budgets for 30M–100M parameter runs.",
        },
      ],
      practicalExercises: [
        "Run the 'overfit a single batch to ~0.00 loss' sanity check on Model A, then train Model A (and Model B if GPU is available) while logging validation perplexity across checkpoints.",
      ],
      completionMilestone:
        "Successfully train a small language model from random initialization at a scale suited to your hardware and plot its scaling behavior.",
    },
    {
      id: "p6-m4",
      code: "6.4",
      title: "Evaluation",
      description:
        "Training vs. validation loss, perplexity, baselines, memorization vs. generalization, data contamination, hallucinations, robustness, speed/memory profiling, and ablations.",
      estimatedEffort: "1.5 weeks · ~22–28 hours",
      whatYouWillLearn:
        "You will learn how to evaluate a pretrained language model with scientific rigor: comparing validation perplexity against baselines, testing whether generated text is genuinely novel or memorized verbatim from training shards, auditing for benchmark contamination, and running controlled ablation studies.",
      whyItMatters:
        "A low training loss means nothing if the model memorized duplicate documents or leaked the validation split. Rigorous evaluation separates real scientific progress from illusions.",
      learningObjectives: [
        "Evaluate training loss, validation loss, and perplexity against N-gram and smaller-model baselines.",
        "Measure n-gram overlap between generated outputs and training data to distinguish generalization from memorization.",
        "Run a controlled ablation study (e.g., RoPE vs. learned positions, or RMSNorm vs. LayerNorm) holding compute constant.",
      ],
      keyConcepts: [
        "Train vs validation perplexity curves",
        "N-gram overlap memorization checks",
        "Train-test data contamination audits",
        "Hallucination & calibration analysis",
        "Controlled single-variable ablations",
      ],
      topics: [
        {
          id: "p6-m4-training-loss",
          title: "Training loss",
          explanation:
            "Tracks optimization progress on seen batches; sudden spikes indicate learning-rate instability or corrupted data batches.",
          keyConcepts: ["EMA-smoothed step loss", "Diagnosing loss spikes"],
          learningOutcome: "Monitor and interpret training loss and gradient norm telemetry.",
        },
        {
          id: "p6-m4-validation-loss",
          title: "Validation loss",
          explanation:
            "Evaluated periodically over a fixed held-out set of batches (`eval_iters = 100`) under `torch.no_grad()`, providing the ground-truth signal for generalization.",
          keyConcepts: ["Fixed validation evaluation seeds", "Detecting overfitting on small corpora"],
          learningOutcome: "Compute low-variance validation loss estimates over multiple held-out batches.",
        },
        {
          id: "p6-m4-perplexity-eval",
          title: "Perplexity",
          explanation:
            "Converting validation cross-entropy to $\\text{PPL} = e^L$ (and bits-per-byte) to compare models trained on the same validation corpus.",
          keyConcepts: ["Validation PPL trajectory", "Bits-per-byte (BPB) across tokenizers"],
          learningOutcome: "Report validation perplexity and bits-per-byte across model checkpoints.",
        },
        {
          id: "p6-m4-baseline-comparisons",
          title: "Baseline comparisons",
          explanation:
            "Comparing your Transformer's perplexity against a smoothed trigram model, an MLP character/subword model, and smaller parameter tiers.",
          keyConcepts: ["Trigram baseline", "MLP baseline", "Compute-matched comparisons"],
          learningOutcome: "Benchmark your pretrained Transformer against simpler baselines on the exact same split.",
        },
        {
          id: "p6-m4-memorization",
          title: "Memorization",
          explanation:
            "Checking whether generated completions copy long verbatim spans (e.g., 13-grams) directly from the training corpus rather than composing novel sequences.",
          keyConcepts: ["Verbatim n-gram overlap ratio", "Effect of dataset repetition on memorization"],
          learningOutcome: "Measure the fraction of generated 8-grams and 13-grams that appear verbatim in the training set.",
        },
        {
          id: "p6-m4-generalization-eval",
          title: "Generalization",
          explanation:
            "Testing the model on held-out prompts and novel combinations of concepts to verify it learned composable grammatical and domain rules.",
          keyConcepts: ["Compositional prompt probes", "Held-out domain evaluation"],
          learningOutcome: "Design qualitative and quantitative probes for compositional generalization.",
        },
        {
          id: "p6-m4-data-contamination",
          title: "Data contamination",
          explanation:
            "Occurs when evaluation benchmarks or validation passages accidentally appear inside the pretraining corpus, artificially inflating scores.",
          keyConcepts: ["13-gram decontamination check", "Benchmark leakage invalidation"],
          learningOutcome: "Run an n-gram decontamination check between your validation prompts and training shards.",
        },
        {
          id: "p6-m4-hallucinations",
          title: "Hallucinations",
          explanation:
            "Autoregressive models sample plausible-sounding token sequences based on statistical patterns, not a verified truth database—explaining why base models confidently fabricate facts, citations, or arithmetic.",
          keyConcepts: ["Plausibility vs factual truth", "Exposure to uncertain tail tokens", "Why base LLMs are next-token predictors, not knowledge bases"],
          learningOutcome: "Explain the mathematical root cause of hallucinations in autoregressive language models.",
        },
        {
          id: "p6-m4-robustness-testing",
          title: "Robustness testing",
          explanation:
            "Testing sensitivity to typos, whitespace variations, prompt formatting changes, and edge-case context lengths.",
          keyConcepts: ["Prompt perturbation sensitivity", "Boundary context length tests"],
          learningOutcome: "Evaluate model stability under input perturbations and edge cases.",
        },
        {
          id: "p6-m4-inference-speed",
          title: "Inference speed",
          explanation:
            "Measuring Time-To-First-Token (TTFT in ms during prefill) and Inter-Token Latency (tokens/sec during KV-cached decoding).",
          keyConcepts: ["Prefill TTFT (compute-bound)", "Decode tokens/sec (memory-bandwidth-bound)"],
          learningOutcome: "Benchmark prefill latency and decode throughput in tokens per second.",
        },
        {
          id: "p6-m4-memory-usage",
          title: "Memory usage",
          explanation:
            "Measuring parameter memory, KV-cache memory growth across sequence length, and peak activation memory during training and inference.",
          keyConcepts: ["Parameter footprint", "KV cache bytes = 2 * L * H * d_k * T * bytes_per_elem"],
          learningOutcome: "Calculate and measure exact parameter and KV-cache memory consumption.",
        },
        {
          id: "p6-m4-ablation-experiments",
          title: "Ablation experiments",
          explanation:
            "Changing exactly one architectural or optimization variable at a time (e.g., removing weight decay or swapping GELU for SwiGLU) under identical seed and token budgets to prove its causal impact.",
          keyConcepts: ["Single-variable control", "Identical random seeds & token budgets", "Ablation tables"],
          learningOutcome: "Conduct and document a clean two-run ablation experiment.",
        },
      ],
      practicalExercises: [
        "Generate 20 completions from your trained model, compute their 8-gram overlap with the training set, and record a 2-variant ablation table in your evaluation report.",
      ],
      completionMilestone:
        "Produce a comprehensive evaluation report covering validation perplexity, baselines, memorization checks, latency, and an ablation study.",
    },
    {
      id: "p6-m5",
      code: "6.5",
      title: "Model Packaging",
      description:
        "Serializing model weights, tokenizer artifacts, configuration JSONs, model cards, and standalone CLI inference scripts for reproducible distribution.",
      estimatedEffort: "1.5 weeks · ~18–22 hours",
      whatYouWillLearn:
        "You will package your self-trained language model (`MyLLM v1`) into a clean, self-contained artifact bundle containing weights, tokenizer merge tables, architecture configuration, a transparent Model Card, and a one-command inference script.",
      whyItMatters:
        "A model checkpoint without its exact `GPTConfig`, tokenizer vocabulary, and documented training details cannot be loaded or trusted by anyone—including your future self.",
      learningObjectives: [
        "Export clean inference checkpoints (`model.pt` / `safetensors`), `config.json`, and `tokenizer.json`.",
        "Write a standalone CLI inference script that loads `MyLLM v1` and streams generated tokens to the terminal.",
        "Author an honest, comprehensive Model Card documenting architecture, training data, loss curves, and known limitations.",
      ],
      keyConcepts: [
        "Inference-only weight serialization",
        "Self-describing config.json",
        "Tokenizer artifact bundling",
        "Model Card transparency",
        "Streaming CLI inference script",
      ],
      topics: [
        {
          id: "p6-m5-saving-checkpoints",
          title: "Saving checkpoints",
          explanation:
            "Exporting a lightweight inference checkpoint (stripping optimizer moments to cut file size by 3×) alongside full training checkpoints.",
          keyConcepts: ["Stripping optimizer states for inference", "Safe tensor serialization"],
          learningOutcome: "Export compact inference-ready weight files.",
        },
        {
          id: "p6-m5-saving-tokenizers",
          title: "Saving tokenizers",
          explanation:
            "Serializing the ordered BPE merge rules, vocabulary dictionary, and special token IDs so `Tokenizer.from_pretrained(dir)` reconstructs identical token IDs.",
          keyConcepts: ["Deterministic merge & vocab JSON", "Versioned tokenizer artifacts"],
          learningOutcome: "Save and reload your custom tokenizer from a directory bundle.",
        },
        {
          id: "p6-m5-config-files",
          title: "Configuration files",
          explanation:
            "Storing `vocab_size`, `block_size`, `n_layer`, `n_head`, `n_embd`, and normalization/activation choices in `config.json` to instantiate the exact `GPT` class automatically.",
          keyConcepts: ["Dataclass to/from JSON", "Architecture version tagging"],
          learningOutcome: "Instantiate your `GPT` model dynamically from a saved `config.json`.",
        },
        {
          id: "p6-m5-reproducibility",
          title: "Reproducibility",
          explanation:
            "Pinning random seeds (`torch.manual_seed`), recording Git commit hashes, hardware specs, and exact command-line arguments so another engineer can reproduce your run.",
          keyConcepts: ["Seed pinning", "Run manifest logging", "Deterministic eval"],
          learningOutcome: "Create a single-command reproducible training and evaluation recipe.",
        },
        {
          id: "p6-m5-model-cards",
          title: "Model cards",
          explanation:
            "Writing a structured `MODEL_CARD.md` specifying parameter count, training corpus, token budget, validation perplexity, intended educational use, and explicit limitations.",
          keyConcepts: ["Architecture & data transparency", "Intended use vs out-of-scope use", "Honest limitation reporting"],
          learningOutcome: "Write a complete, candid Model Card for `MyLLM v1`.",
        },
        {
          id: "p6-m5-inference-scripts",
          title: "Inference scripts",
          explanation:
            "Building a clean `generate.py --checkpoint ./myllm_v1 --prompt '...' --temperature 0.8 --top-p 0.9` CLI that streams tokens to stdout in real time.",
          keyConcepts: ["argparse CLI interface", "Token-by-token stdout flushing", "Device auto-detection"],
          learningOutcome: "Build a polished command-line inference utility for your trained model.",
        },
        {
          id: "p6-m5-documentation",
          title: "Documentation",
          explanation:
            "Documenting setup instructions, directory structure, training curves, and sample outputs clearly in your project repository.",
          keyConcepts: ["Architecture diagrams", "Loss curve plots", "Quickstart commands"],
          learningOutcome: "Publish clear engineering documentation for your complete pretraining pipeline.",
        },
      ],
      practicalExercises: [
        "Complete Primary Project Milestone #11 (`MyLLM v1`): Package your trained model, tokenizer, config, evaluation report, model card, and CLI inference script into a reproducible release folder.",
      ],
      completionMilestone:
        "Deliver `MyLLM v1`—a complete, packaged, self-trained decoder-only language model (Milestone #11).",
    },
  ],
  assignments: [
    "Curate, clean, deduplicate, and tokenize an open text corpus into memory-mapped train.bin and val.bin shards.",
    "Implement the complete pretraining pipeline with gradient accumulation, AdamW decoupled weight decay, warmup-cosine LR, and checkpointing.",
    "Train Model A (100K–1M params) and, if hardware permits, Model B (5M–20M params) from random initialization.",
    "Generate a full evaluation report comparing validation perplexity against baselines and checking n-gram memorization.",
    "Package MyLLM v1 with its custom tokenizer, config.json, checkpoints, Model Card, and CLI inference script.",
  ],
  primaryProjects: [
    {
      id: "milestone-11-pretrained-mini-llm",
      milestoneNumber: 11,
      title: "Pretrained Mini LLM",
      phase: 6,
      shortDescription:
        "MyLLM v1 — Train your own decoder-only GPT language model from randomly initialized weights using your custom BPE tokenizer, memory-mapped dataset pipeline, AdamW + cosine schedule pretraining loop, and evaluation suite.",
      skillsPracticed: [
        "Dataset cleaning, deduplication & binary packing",
        "Mixed-precision pretraining with gradient accumulation",
        "Warmup-cosine LR scheduling & checkpoint recovery",
        "Perplexity evaluation, ablation & Model Card packaging",
      ],
      expectedOutcome:
        "A self-trained, reproducibly packaged language model (MyLLM v1) with full training telemetry and CLI inference.",
      difficulty: "advanced",
      difficultyLabel: "Advanced · Capstone",
      deliverables: [
        "Custom tokenizer",
        "GPT-style architecture",
        "Training pipeline",
        "Model checkpoints",
        "Evaluation report",
        "Inference script",
        "Reproducible documentation",
      ],
    },
  ],
  completionCriteriaSummary:
    "Successfully train and evaluate a small model from randomly initialized weights and explain the complete training pipeline.",
  completionChecklist: [
    {
      id: "p6-check-concepts",
      question: "Can you explain every stage of the pretraining pipeline from raw text deduplication to AdamW parameter updates?",
      detail: "Including why 1D norms/biases are excluded from weight decay and why warmup is needed.",
    },
    {
      id: "p6-check-exercises",
      question: "Have you prepared leak-free, memory-mapped train.bin and val.bin shards using your custom tokenizer?",
      detail: "Splitting at the document level after deduplication.",
    },
    {
      id: "p6-check-implementation",
      question: "Have you trained MyLLM v1 (Milestone #11) from random weights at a scale suited to your hardware?",
      detail: "Verifying initial loss ≈ ln(V) and smooth validation perplexity improvement.",
    },
    {
      id: "p6-check-testing",
      question: "Have you produced all 7 MyLLM v1 deliverables, including the evaluation report and standalone inference script?",
      detail: "Testing that your packaged checkpoint reloads and generates text deterministically.",
    },
    {
      id: "p6-check-limitations",
      question: "Can you explain why a base pretrained model simply continues documents rather than acting as a helpful question-answering assistant?",
      detail: "Motivating Post-Training, Instruction Tuning (SFT), and Alignment in Phase 7.",
    },
  ],
};
