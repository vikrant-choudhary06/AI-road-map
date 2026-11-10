import type { CurriculumProject } from "@/types";

export const PROJECTS_11_TO_14: CurriculumProject[] = [
  {
    id: "milestone-11-pretrained-mini-llm",
    slug: "pretrained-mini-llm",
    milestoneNumber: 11,
    title: "Pretrained Mini LLM",
    subtitle:
      "MyLLM v1 — Train your own decoder-only GPT language model from randomly initialized weights using your custom BPE tokenizer, memory-mapped dataset pipeline, and full pretraining engine",
    shortDescription:
      "Train and evaluate a small GPT-style language model from randomly initialized weights using your own dataset pipeline, custom BPE tokenizer, AdamW + cosine decay pretraining loop, and evaluation harness.",
    detailedOverview:
      "This is the capstone engineering milestone of Phase 6 (`MyLLM v1`). You will bring together your custom BPE tokenizer (Project 8) and your Mini GPT architecture (Project 10) to train a complete decoder-only language model from randomly initialized weights. You will curate and clean a text dataset, perform document-level deduplication, split into leak-free train/validation/test sets, encode and pack documents into memory-mapped binary shards (`train.bin`, `val.bin`), run a mixed-precision pretraining loop with gradient accumulation, linear warmup + cosine learning rate decay, and checkpoint recovery, evaluate validation perplexity and sample generation across training steps, run a controlled ablation study, and package `MyLLM v1` with a Model Card and standalone CLI inference script.",
    whyThisProjectMatters:
      "Most developers only call hosted APIs or fine-tune existing checkpoints. Training `MyLLM v1` from random weights—watching cross-entropy loss drop from `ln(V)` (~9.0) down to coherent domain prose (~2.1), debugging learning rate warmup spikes, and verifying zero train-validation contamination—gives you end-to-end ownership of how foundation models are born.",
    phase: 6,
    difficulty: "advanced",
    difficultyFilter: "Advanced",
    difficultyLabel: "Advanced · Capstone",
    estimatedEffort: "25–40 hours",
    educationalScaleNote:
      "Choose a model scale matched to your hardware budget: (1) Tiny Educational Model (100K–1M parameters, e.g., 4 layers, d_model=128) for CPU or integrated laptops; (2) Small Single-GPU Model (5M–20M parameters, e.g., 6–8 layers, d_model=384) for consumer GPUs or free cloud notebooks; or (3) Optional Extended Model (30M–100M parameters, e.g., 12 layers, d_model=768) for dedicated GPU workstations. The exact same pipeline scales across all three tiers.",
    technologies: [
      "Python",
      "PyTorch",
      "NumPy (memmap)",
      "Custom BPE Tokenizer",
      "Mixed Precision (BF16/FP16)",
      "AdamW & Cosine LR Schedule",
    ],
    prerequisites: [
      "Phase 4 Project: BPE Tokenizer (`milestone-08-bpe-tokenizer`)",
      "Phase 5 Project: Mini GPT Architecture (`milestone-10-mini-gpt-architecture`)",
      "Phase 6 Modules 6.1–6.5: Dataset Engineering, Pretraining Pipeline, and Packaging",
    ],
    requiredMathConcepts: [
      "Autoregressive next-token cross-entropy loss and validation perplexity: PPL = exp(L_val)",
      "Initial uniform random loss baseline: L_0 = ln(V)",
      "Effective batch size in tokens: B_tokens = B_micro * GradAccumSteps * T",
      "Linear warmup + cosine learning-rate decay schedule",
      "Decoupled AdamW weight decay (2D matrix weights vs. 1D biases/norms)",
    ],
    learningObjectives: [
      "Curate, clean, deduplicate, and split a raw text corpus at the document level without train-validation leakage.",
      "Tokenize and pack documents with `<|eos|>` separators into contiguous `np.memmap` (`uint16`) binary shards.",
      "Engineer a fault-tolerant PyTorch pretraining loop with gradient accumulation, mixed precision, gradient clipping, and checkpoint resumption.",
      "Evaluate pretrained checkpoints quantitatively via validation perplexity, baseline comparisons, and controlled ablation experiments.",
      "Package `MyLLM v1` with weights, tokenizer artifacts, `config.json`, a transparent Model Card, and a streaming CLI inference script.",
    ],
    skillsPracticed: [
      "Corpus cleaning, SHA-256 deduplication & leak-free document splitting",
      "Memory-mapped (`np.memmap`) binary token shard streaming",
      "AdamW parameter group splitting, cosine LR warmup & gradient accumulation",
      "Validation perplexity tracking, ablation design & `MyLLM v1` packaging",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "Dataset Curation, Cleaning, Deduplication & Binary Sharding",
        summary:
          "Select an open text corpus, clean extraction artifacts, deduplicate documents, create document-level splits, and pack tokenized IDs into memory-mapped binary files.",
        taskIds: ["p11-t01", "p11-t02", "p11-t03", "p11-t04", "p11-t05", "p11-t06"],
      },
      {
        stageNumber: 2,
        title: "Model Configuration & Optimizer Setup",
        summary:
          "Define hardware-matched model configurations, separate 2D vs. 1D parameter groups for AdamW, and implement the warmup-cosine learning rate scheduler.",
        taskIds: ["p11-t07", "p11-t08", "p11-t09", "p11-t10"],
      },
      {
        stageNumber: 3,
        title: "Pretraining Loop, Checkpointing & Live Telemetry",
        summary:
          "Implement the main training loop with gradient accumulation, mixed precision, gradient norm clipping, periodic validation evaluation, and resumable checkpoints.",
        taskIds: ["p11-t11", "p11-t12", "p11-t13", "p11-t14", "p11-t15"],
      },
      {
        stageNumber: 4,
        title: "Evaluation, Ablation Study & MyLLM v1 Packaging",
        summary:
          "Compare validation perplexity against baselines, run a controlled ablation study, and export the self-contained `MyLLM v1` release bundle.",
        taskIds: ["p11-t16", "p11-t17", "p11-t18", "p11-t19"],
      },
    ],
    tasks: [
      {
        id: "p11-t01",
        stepNumber: 1,
        title: "Select and collect an open pretraining text dataset",
        explanation:
          "A cohesive domain corpus (such as TinyStories, open educational textbooks, Project Gutenberg literature, or permissive Python files) allows a small model to learn grammar and domain structure rapidly.",
        instructions:
          "Download an openly licensed text dataset (at least 5–50 MB of raw text for laptop/single-GPU scales) and record its source URL, license, and SHA-256 hash in `data/manifest.json`.",
        expectedOutcome:
          "Raw dataset downloaded locally with a documented provenance manifest.",
        acceptanceCriteria:
          "`data/manifest.json` records dataset name, license, file count, and byte size.",
        difficulty: "Core",
      },
      {
        id: "p11-t02",
        stepNumber: 2,
        title: "Clean text documents and normalize encoding",
        explanation:
          "Corrupted UTF-8 bytes, HTML boilerplate, and repetitive control characters waste vocabulary capacity and distort loss.",
        instructions:
          "Write a cleaning pass in `data/prepare_data.py` that normalizes UTF-8 text, strips broken markup, and filters out documents shorter than 32 characters or with abnormal symbol-to-word ratios.",
        expectedOutcome:
          "Clean document iterator yielding high-signal text records.",
        acceptanceCriteria:
          "Cleaning script logs the total documents inspected, kept, and filtered.",
        difficulty: "Core",
      },
      {
        id: "p11-t03",
        stepNumber: 3,
        title: "Deduplicate documents and split train/validation/test sets",
        explanation:
          "Splitting must occur at the document level after deduplication so identical passages never appear in both `train` and `val`.",
        instructions:
          "Compute a SHA-256 digest of each normalized document to remove exact duplicates, shuffle documents with a fixed seed (`seed=42`), and partition into 90% train, 5% validation, and 5% test documents.",
        expectedOutcome:
          "Three disjoint document collections with zero cross-split overlap.",
        acceptanceCriteria:
          "Set intersection of document hashes between `train`, `val`, and `test` is strictly `0`.",
        difficulty: "Core",
      },
      {
        id: "p11-t04",
        stepNumber: 4,
        title: "Train or load your custom BPE tokenizer on the training split",
        explanation:
          "Fitting the tokenizer strictly on the training split prevents vocabulary leakage from held-out validation documents.",
        instructions:
          "Train your BPE tokenizer (e.g., `vocab_size=4096` or `8192`) on the training split including `<|endoftext|>` (`<|eos|>`), and save `tokenizer.json`.",
        expectedOutcome:
          "Serialized BPE tokenizer tailored to your corpus.",
        acceptanceCriteria:
          "Tokenizer encodes and decodes sample validation documents with 100% round-trip accuracy and reports characters-per-token compression.",
        difficulty: "Core",
      },
      {
        id: "p11-t05",
        stepNumber: 5,
        title: "Tokenize and pack documents into memory-mapped binary shards",
        explanation:
          "Concatenating tokenized documents separated by `<|eos|>` and writing them to disk as `uint16` binary arrays allows `np.memmap` to stream any dataset size with near-zero RAM.",
        instructions:
          "Encode all documents in `train`, `val`, and `test`, append `<|eos|>` after each document, and write `train.bin`, `val.bin`, and `test.bin` as contiguous `np.uint16` arrays alongside `dataset_meta.json`.",
        expectedOutcome:
          "Compact binary shards on disk ready for zero-copy streaming.",
        acceptanceCriteria:
          "`train.bin` and `val.bin` load instantaneously via `np.memmap(..., dtype=np.uint16, mode='r')`.",
        difficulty: "Intermediate",
      },
      {
        id: "p11-t06",
        stepNumber: 6,
        title: "Implement the memory-mapped batch loader (`get_batch`)",
        explanation:
          "Each training step samples `batch_size` random starting offsets `i` in `data` and slices `x = data[i : i + T]` and `y = data[i + 1 : i + T + 1]`.",
        instructions:
          "Write `get_batch(split, batch_size, block_size, device)` that opens the `np.memmap` shard and returns pinned, device-transferred `(x, y)` `torch.long` tensors.",
        expectedOutcome:
          "Fast batch sampler supporting arbitrary context lengths `T`.",
        acceptanceCriteria:
          "`x.shape == (B, T)`, `y.shape == (B, T)`, and `torch.equal(x[:, 1:], y[:, :-1])` is `True`.",
        difficulty: "Core",
      },
      {
        id: "p11-t07",
        stepNumber: 7,
        title: "Configure your GPT model architecture for your hardware tier",
        explanation:
          "Matching parameter count (`100K–1M`, `5M–20M`, or `30M–100M`) and context length (`T=256` or `512`) to your hardware ensures fast iteration.",
        instructions:
          "Create preset YAML/JSON configs (`configs/tiny_1m.json`, `configs/small_15m.json`) and verify parameter count and analytic `ln(vocab_size)` initial loss at step 0.",
        expectedOutcome:
          "Instantiated GPT model with verified parameter budget and healthy step-0 loss.",
        acceptanceCriteria:
          "Untrained model initial loss on a random batch is within `±0.15` of `math.log(vocab_size)`.",
        difficulty: "Core",
      },
      {
        id: "p11-t08",
        stepNumber: 8,
        title: "Configure AdamW with decoupled weight-decay parameter groups",
        explanation:
          "Weight decay should regularize 2D projection/embedding matrices (`weight_decay=0.1`) but never 1D layer-norm scales or biases (`weight_decay=0.0`).",
        instructions:
          "Implement `configure_optimizers(model, weight_decay, learning_rate, betas)` that partitions parameters by `p.dim() >= 2` vs `p.dim() < 2` and logs total parameter counts in each group.",
        expectedOutcome:
          "Properly partitioned `torch.optim.AdamW` optimizer.",
        acceptanceCriteria:
          "100% of trainable parameters belong to exactly one group, and all `LayerNorm`/`RMSNorm` and bias tensors have `weight_decay == 0.0`.",
        difficulty: "Intermediate",
      },
      {
        id: "p11-t09",
        stepNumber: 9,
        title: "Implement linear warmup and cosine learning-rate decay schedule",
        explanation:
          "Warming up the learning rate linearly from `0` to `max_lr` over the first 2–5% of steps prevents early Adam variance spikes from diverging random weights.",
        instructions:
          "Write `get_lr(step, warmup_steps, max_steps, max_lr, min_lr)` and unit-test its output at step `0`, `warmup_steps`, and `max_steps`.",
        expectedOutcome:
          "Deterministic step-wise learning rate schedule function.",
        acceptanceCriteria:
          "LR rises linearly during warmup, follows a smooth cosine curve to `min_lr = 0.1 * max_lr`, and stays at `min_lr` thereafter.",
        difficulty: "Core",
      },
      {
        id: "p11-t10",
        stepNumber: 10,
        title: "Run the single-batch overfitting sanity check",
        explanation:
          "Before launching a multi-hour pretraining run, verifying that the pipeline can memorize a single fixed batch down to `loss < 0.05` catches bugs in loss shifting, optimizer stepping, or masking.",
        instructions:
          "Add a `--sanity-overfit-one-batch` flag to `train.py` that trains on one static batch for 200 steps and asserts final loss `< 0.05`.",
        expectedOutcome:
          "Verified gradient flow and optimization loop.",
        acceptanceCriteria:
          "Single-batch loss drops monotonically from `~ln(V)` to `< 0.05` within 200 updates.",
        difficulty: "Core",
      },
      {
        id: "p11-t11",
        stepNumber: 11,
        title: "Implement gradient accumulation and mixed-precision training",
        explanation:
          "Gradient accumulation simulates a large effective token batch size (`B_micro * grad_accum_steps * T`) on limited VRAM, while `torch.amp.autocast` (`bfloat16`/`float16`) accelerates matmuls.",
        instructions:
          "In `train.py`, loop over `grad_accum_steps` micro-batches, divide each micro-batch loss by `grad_accum_steps` before `.backward()`, and wrap the forward pass in `torch.amp.autocast`.",
        expectedOutcome:
          "Memory-efficient training step supporting arbitrary effective token batch sizes.",
        acceptanceCriteria:
          "Accumulated gradients over `K` micro-batches of size `B` match a single batch of size `K * B` within floating-point tolerance.",
        difficulty: "Advanced",
      },
      {
        id: "p11-t12",
        stepNumber: 12,
        title: "Add global gradient norm clipping and telemetry logging",
        explanation:
          "Clipping global gradient norm at `1.0` protects against unlucky data batches, and logging pre-clip `grad_norm` diagnoses training stability.",
        instructions:
          "Call `grad_norm = torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)` before `optimizer.step()` and log `step`, `train_loss`, `lr`, `grad_norm`, and `tokens_per_sec` to `runs/metrics.jsonl`.",
        expectedOutcome:
          "Structured JSONL training telemetry for every step.",
        acceptanceCriteria:
          "`runs/metrics.jsonl` records valid JSON lines with step, loss, perplexity, LR, grad_norm, and throughput.",
        difficulty: "Core",
      },
      {
        id: "p11-t13",
        stepNumber: 13,
        title: "Implement periodic multi-batch validation perplexity evaluation",
        explanation:
          "A single validation batch is noisy; averaging loss over `eval_iters` (e.g., 50 batches) in `model.eval()` + `torch.no_grad()` provides a reliable validation perplexity curve.",
        instructions:
          "Write `estimate_loss(model, eval_iters=50)` that computes mean loss and perplexity (`math.exp(loss)`) on both `train` and `val` splits every `eval_interval` steps.",
        expectedOutcome:
          "Low-variance train and validation perplexity checkpoints.",
        acceptanceCriteria:
          "Validation evaluation restores `model.train()` mode afterwards and logs `val_loss` and `val_ppl`.",
        difficulty: "Core",
      },
      {
        id: "p11-t14",
        stepNumber: 14,
        title: "Implement fault-tolerant checkpoint saving and resumption",
        explanation:
          "Saving model weights, optimizer states, step counter, RNG states, and config allows training to resume seamlessly after preemption.",
        instructions:
          "Save `ckpt_latest.pt` and `ckpt_best.pt` (when `val_loss` improves) and implement `--resume` to continue training from the exact step and learning rate.",
        expectedOutcome:
          "Resumable training checkpoints.",
        acceptanceCriteria:
          "Resuming from step `k` produces the exact same step `k+1` learning rate and continues the loss curve smoothly.",
        difficulty: "Intermediate",
      },
      {
        id: "p11-t15",
        stepNumber: 15,
        title: "Log periodic qualitative text generations across training checkpoints",
        explanation:
          "Sampling from a fixed set of 5 benchmark prompts at step 0, 25%, 50%, 75%, and 100% visually demonstrates the progression from random token salad to coherent prose.",
        instructions:
          "At each validation interval, generate 100 tokens from 5 fixed prompts (`temperature=0.8, top_p=0.9`) and append them to `runs/generations_log.md`.",
        expectedOutcome:
          "Side-by-side chronological log of model generations across training.",
        acceptanceCriteria:
          "`runs/generations_log.md` shows clear progression from random characters/subwords at step 0 to syntactically coherent continuations at convergence.",
        difficulty: "Core",
      },
      {
        id: "p11-t16",
        stepNumber: 16,
        title: "Evaluate test-set perplexity and compare against baselines",
        explanation:
          "Comparing your trained model's test perplexity against a random uniform baseline (`V`) and a unigram/bigram frequency baseline proves how much structure the Transformer learned.",
        instructions:
          "Write `evaluate.py` to compute test-set perplexity for `ckpt_best.pt`, compare it against uniform random (`PPL = V`) and unigram token frequency baselines, and check 8-gram overlap with `train.bin`.",
        expectedOutcome:
          "Quantitative evaluation report table.",
        acceptanceCriteria:
          "Trained `MyLLM v1` achieves dramatically lower test perplexity than unigram/random baselines and generates novel sentences not copied verbatim from `train.bin`.",
        difficulty: "Intermediate",
      },
      {
        id: "p11-t17",
        stepNumber: 17,
        title: "Conduct a controlled ablation study (e.g., Context Length, LR, or Architecture)",
        explanation:
          "Running two controlled training runs where only one hyperparameter changes (e.g., `block_size=128 vs 256` or `RoPE vs learned positional embeddings`) teaches scientific LLM experimentation.",
        instructions:
          "Run a short controlled ablation (at least 1,000 steps) comparing two configurations with identical data seed and parameter budget, and plot/tabulate their validation loss curves.",
        expectedOutcome:
          "Documented ablation experiment table and loss comparison.",
        acceptanceCriteria:
          "Ablation section in the evaluation report clearly states the hypothesis, controlled variables, and final validation perplexity of both runs.",
        difficulty: "Advanced",
      },
      {
        id: "p11-t18",
        stepNumber: 18,
        title: "Build the standalone CLI inference script (`generate.py`)",
        explanation:
          "Anyone cloning your repository should be able to generate text from your trained model with a single terminal command.",
        instructions:
          "Create `generate.py --model-dir ./myllm_v1 --prompt '...' --max-tokens 150 --temperature 0.8 --top-k 40 --top-p 0.9` that loads `config.json`, `tokenizer.json`, and `model.pt` and streams generated tokens to stdout.",
        expectedOutcome:
          "Self-contained CLI generator script.",
        acceptanceCriteria:
          "Running `python generate.py --model-dir ./myllm_v1 --prompt 'Once upon a time'` streams generated tokens without importing training dependencies.",
        difficulty: "Core",
      },
      {
        id: "p11-t19",
        stepNumber: 19,
        title: "Package the complete `MyLLM v1` release bundle and Model Card",
        explanation:
          "A complete LLM release includes inference weights (stripped of optimizer state), `config.json`, `tokenizer.json`, evaluation report, and `MODEL_CARD.md`.",
        instructions:
          "Export the final release directory `myllm_v1/` and author `MODEL_CARD.md` documenting architecture specs, training corpus, token budget, validation/test perplexity, ablation findings, and known limitations.",
        expectedOutcome:
          "Complete, reproducible `MyLLM v1` release artifact.",
        acceptanceCriteria:
          "All 7 required `MyLLM v1` deliverables exist in the repository and pass reload verification.",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "Dataset pipeline deduplicates at the document level and verifies zero document overlap between `train.bin`, `val.bin`, and `test.bin`.",
      "Pretraining pipeline verifies initial step-0 loss `≈ ln(vocab_size)` and passes the single-batch overfit sanity check (`loss < 0.05`).",
      "Training loop implements AdamW 2D/1D parameter groups, linear warmup + cosine decay, gradient accumulation, and gradient norm clipping.",
      "`MyLLM v1` is packaged with custom tokenizer, `config.json`, inference weights, evaluation + ablation report, `MODEL_CARD.md`, and `generate.py` CLI.",
    ],
    testingGuide: {
      summary:
        "Verify leak-free dataset sharding, gradient accumulation equivalence, single-batch memorization, and standalone `MyLLM v1` checkpoint reloading.",
      testCases: [
        {
          title: "Zero Train/Validation Document Leakage Check",
          purpose:
            "Ensure validation perplexity reflects true generalization rather than duplicate documents.",
          verificationSteps:
            "Compute SHA-256 hashes of all raw documents in train and val splits and assert `len(train_hashes & val_hashes) == 0`.",
          expectedResult: "Zero shared documents between splits.",
        },
        {
          title: "Gradient Accumulation Equivalence Test",
          purpose:
            "Verify that accumulating gradients over 4 micro-batches of size 2 equals 1 batch of size 8.",
          verificationSteps:
            "Fix RNG seed, run 1 step with `(B=8, accum=1)` in FP32 and 1 step with `(B=2, accum=4)`, and compare parameter gradients.",
          expectedResult: "`torch.allclose(g1, g2, atol=1e-6)` is `True`.",
        },
        {
          title: "Standalone Release Reload & Generation Test",
          purpose:
            "Confirm the exported `myllm_v1/` bundle can be loaded in a fresh Python process.",
          verificationSteps:
            "Load `myllm_v1/` via `generate.py` with `temperature=0.0` (greedy) twice on the same prompt.",
          expectedResult: "Both runs produce identical, coherent token sequences.",
        },
      ],
      verificationCommand: "pytest tests/test_pretraining_pipeline.py -v",
    },
    codeExamples: [
      {
        title: "AdamW 2D vs. 1D Parameter Group Partitioning & Warmup-Cosine LR",
        language: "python",
        purpose:
          "Reference implementation for separating weight-decayed matrix parameters from non-decayed norms/biases and computing cosine learning rate.",
        code: `import math
import torch
import torch.nn as nn

def configure_optimizers(model: nn.Module, weight_decay: float, lr: float, betas=(0.9, 0.95)):
    param_dict = {pn: p for pn, p in model.named_parameters() if p.requires_grad}
    decay_params = [p for n, p in param_dict.items() if p.dim() >= 2]
    nodecay_params = [p for n, p in param_dict.items() if p.dim() < 2]
    optim_groups = [
        {"params": decay_params, "weight_decay": weight_decay},
        {"params": nodecay_params, "weight_decay": 0.0},
    ]
    return torch.optim.AdamW(optim_groups, lr=lr, betas=betas)

def get_cosine_lr(step: int, warmup_steps: int, max_steps: int, max_lr: float, min_lr: float) -> float:
    if step < warmup_steps:
        return max_lr * (step + 1) / max(1, warmup_steps)
    if step >= max_steps:
        return min_lr
    decay_ratio = (step - warmup_steps) / max(1, (max_steps - warmup_steps))
    coeff = 0.5 * (1.0 + math.cos(math.pi * decay_ratio))
    return min_lr + coeff * (max_lr - min_lr)`,
      },
    ],
    hints: [
      {
        id: "p11-h1",
        title: "Dividing Loss by `grad_accum_steps`",
        category: "Common Mistake",
        content:
          "Because cross-entropy loss averages over the micro-batch, calling `loss.backward()` `K` times sums `K` means. Always compute `(loss / grad_accum_steps).backward()` so the accumulated gradient is properly averaged.",
      },
      {
        id: "p11-h2",
        title: "Choosing Token Budget Relative to Parameters",
        category: "Testing Strategy",
        content:
          "A 5M-parameter model trained on 100M clean tokens (20 tokens/parameter, Chinchilla-optimal ratio) will produce much more coherent text and lower perplexity than a 50M-parameter model under-trained on only 10M tokens.",
      },
    ],
    optionalChallenges: [
      {
        id: "p11-oc1",
        title: "Scaling Law Mini-Sweep (3 Model Sizes)",
        description:
          "Train 3 model sizes (e.g., 500K, 2M, and 8M parameters) on the same dataset and plot final validation loss against total training FLOPs ($C \\approx 6 N D$).",
        whatYouLearn:
          "Empirical power-law scaling curves ($L(C)$) and compute-optimal allocation.",
      },
      {
        id: "p11-oc2",
        title: "MinHash Near-Duplicate Filtering",
        description:
          "Upgrade your exact SHA-256 deduplicator to a 5-gram MinHash LSH near-deduplicator that catches documents with >85% Jaccard similarity.",
        whatYouLearn:
          "Web-scale fuzzy deduplication algorithms used in FineWeb and Dolma.",
      },
    ],
    expectedDeliverable:
      "`MyLLM v1` — A complete self-trained language model release containing your custom BPE tokenizer, GPT architecture, data & pretraining pipeline, trained checkpoints, evaluation & ablation report, Model Card, and CLI inference script.",
    deliverablesList: [
      "Custom tokenizer (`tokenizer.json`) & memory-mapped dataset preparation script (`prepare_data.py`)",
      "GPT-style architecture (`model.py`) & configuration files (`config.json`)",
      "Pretraining pipeline (`train.py`) with AdamW, cosine LR, gradient accumulation, and checkpointing",
      "Trained model checkpoints (`myllm_v1/model.pt`)",
      "Quantitative evaluation & ablation report (`EVALUATION_REPORT.md`)",
      "Standalone streaming CLI inference script (`generate.py`)",
      "Reproducible documentation & transparent Model Card (`MODEL_CARD.md`)",
    ],
    learningOutcomes: [
      "Engineer a leak-free, deduplicated, memory-mapped pretraining dataset pipeline.",
      "Train a GPT-style language model from random weights to coherent text generation.",
      "Diagnose training curves, gradient norms, learning rate warmup, and validation perplexity.",
      "Design and interpret controlled ablation experiments and package reproducible LLM artifacts.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "myllm-v1-pretraining-from-scratch",
      recommendedStructure: [
        "data/prepare_data.py",
        "myllm/model.py",
        "myllm/train.py",
        "myllm/evaluate.py",
        "generate.py",
        "myllm_v1/config.json",
        "myllm_v1/MODEL_CARD.md",
        "EVALUATION_REPORT.md",
        "tests/test_pretraining_pipeline.py",
        "README.md",
      ],
      readmeChecklist: [
        "Include the training and validation loss/perplexity curve plot.",
        "Show chronological sample generations from step 0, 25%, 50%, and 100%.",
        "Include the ablation study comparison table.",
        "Provide a single-command quickstart for `python generate.py`.",
      ],
    },
    relatedResourceIds: [
      "stanford-cs336",
      "karpathy-nanogpt",
      "karpathy-lets-build-gpt-lecture",
      "huggingface-smol-course",
    ],
    relatedModuleIds: ["p6-m1", "p6-m2", "p6-m3", "p6-m4", "p6-m5"],
    relatedProjectIds: [
      "milestone-08-bpe-tokenizer",
      "milestone-10-mini-gpt-architecture",
      "milestone-12-instruction-tuned-assistant",
    ],
  },
  {
    id: "milestone-12-instruction-tuned-assistant",
    slug: "instruction-tuned-assistant",
    milestoneNumber: 12,
    title: "Instruction-Tuned Assistant",
    subtitle:
      "Transform a base pretrained language model into a multi-turn instruction-following assistant using ChatML formatting, assistant-masked SFT, LoRA from scratch, and DPO alignment",
    shortDescription:
      "Convert a base pretrained language model into an instruction-following conversational assistant using custom ChatML templates, prompt-masked Supervised Fine-Tuning (SFT), Low-Rank Adaptation (LoRA), and Direct Preference Optimization (DPO).",
    detailedOverview:
      "A base pretrained language model (like `MyLLM v1` or a small open-weight base model) only knows how to continue documents—if you ask it a question, it often generates three more questions. In this project, you will build the complete post-training and alignment pipeline that turns a base model into a helpful assistant. You will implement ChatML turn serialization with special delimiters (`<|im_start|>`, `<|im_end|>`), build an SFT data collator that masks system and user prompt tokens with `-100` so cross-entropy loss trains strictly on assistant completions, implement `LoRALinear` ($W_0 x + \\frac{\\alpha}{r} BAx$) from scratch in PyTorch, run Supervised Fine-Tuning, optionally apply Direct Preference Optimization (DPO) on `(prompt, chosen, rejected)` pairs, and evaluate the model before and after post-training.",
    whyThisProjectMatters:
      "Post-training (SFT + LoRA + DPO) is the bridge between raw foundation models and real-world AI assistants. Implementing assistant-only loss masking, custom LoRA adapters, weight merging, and DPO log-ratio losses directly in PyTorch removes all mystery from modern alignment frameworks.",
    phase: 7,
    difficulty: "advanced",
    difficultyFilter: "Advanced",
    difficultyLabel: "Advanced",
    estimatedEffort: "18–26 hours",
    technologies: [
      "Python",
      "PyTorch",
      "ChatML Templates",
      "Supervised Fine-Tuning (SFT)",
      "LoRA (Low-Rank Adaptation)",
      "Direct Preference Optimization (DPO)",
    ],
    prerequisites: [
      "Phase 5 Project: Mini GPT Architecture (`milestone-10-mini-gpt-architecture`)",
      "Phase 6 Project: Pretrained Mini LLM (`milestone-11-pretrained-mini-llm`)",
      "Phase 7 Modules 7.1–7.3: Instruction Tuning, PEFT (LoRA/QLoRA), and Preference Alignment",
    ],
    requiredMathConcepts: [
      "Assistant-only masked cross-entropy loss (`ignore_index = -100` on prompt tokens)",
      "Low-Rank Adaptation: h = W_0 x + (alpha / r) B (A x), with B initialized to 0",
      "LoRA weight merging: W_merged = W_0 + (alpha / r) B A",
      "DPO objective: L_DPO = -log sigma(beta * ((log pi_theta(y_w|x) - log pi_ref(y_w|x)) - (log pi_theta(y_l|x) - log pi_ref(y_l|x))))",
    ],
    learningObjectives: [
      "Format single-turn and multi-turn conversation datasets into deterministic ChatML token sequences.",
      "Construct an SFT collator that masks `system` and `user` tokens with `-100` so gradients only update on `assistant` responses and `<|im_end|>` stop tokens.",
      "Implement `LoRALinear` from scratch in PyTorch, verify zero-initialization identity behavior, and merge trained adapters back into base weights.",
      "Implement the Direct Preference Optimization (DPO) sequence log-probability loss and compare base vs. SFT vs. DPO responses.",
    ],
    skillsPracticed: [
      "ChatML template serialization & turn-boundary stopping",
      "Assistant-only loss masking (`labels = -100`) & SFT collator engineering",
      "From-scratch `LoRALinear` implementation & zero-overhead weight merging",
      "DPO preference alignment & before/after rubric evaluation",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "ChatML Serialization & Assistant-Masked SFT Collator",
        summary:
          "Define chat control tokens, format multi-turn dialogues, and build the SFT batch collator with `-100` prompt masking.",
        taskIds: ["p12-t01", "p12-t02", "p12-t03"],
      },
      {
        stageNumber: 2,
        title: "Low-Rank Adaptation (`LoRALinear`) From Scratch",
        summary:
          "Implement `LoRALinear`, inject adapters into attention/MLP projections, verify VRAM/parameter savings, and implement adapter weight merging.",
        taskIds: ["p12-t04", "p12-t05", "p12-t06"],
      },
      {
        stageNumber: 3,
        title: "Supervised Fine-Tuning (SFT) & Multi-Turn Chat CLI",
        summary:
          "Curate a high-quality instruction dataset, run the SFT training loop, and build an interactive multi-turn chat loop that stops cleanly at `<|im_end|>`.",
        taskIds: ["p12-t07", "p12-t08", "p12-t09"],
      },
      {
        stageNumber: 4,
        title: "Direct Preference Optimization (DPO) & Before/After Evaluation",
        summary:
          "Implement the DPO loss function on pairwise preference data and evaluate base vs. SFT vs. DPO completions on a held-out test suite.",
        taskIds: ["p12-t10", "p12-t11", "p12-t12"],
      },
    ],
    tasks: [
      {
        id: "p12-t01",
        stepNumber: 1,
        title: "Implement the ChatML conversation template serializer",
        explanation:
          "Structured role delimiters (`<|im_start|>system`, `<|im_start|>user`, `<|im_start|>assistant`, `<|im_end|>`) give the model unambiguous turn boundaries.",
        instructions:
          "Write `format_chatml(messages)` in `sft/chat_template.py` that serializes a list of `{'role': ..., 'content': ...}` dicts and supports `add_generation_prompt=True` for inference.",
        expectedOutcome:
          "Deterministic ChatML formatter and parser.",
        acceptanceCriteria:
          "Formatted conversation ends with `<|im_start|>assistant\\n` when `add_generation_prompt=True`.",
        difficulty: "Core",
      },
      {
        id: "p12-t02",
        stepNumber: 2,
        title: "Implement assistant-only loss masking (`labels = -100`)",
        explanation:
          "During SFT, the model should be trained to predict the assistant's answer given the user's prompt—not penalized for failing to predict what question the user will ask.",
        instructions:
          "Tokenize each turn separately; set `labels = -100` for all `system` and `user` tokens, and set `labels = token_ids` strictly for `assistant` content tokens plus the closing `<|im_end|>` token.",
        expectedOutcome:
          "Token-level `(input_ids, labels)` builder with exact assistant-turn masking.",
        acceptanceCriteria:
          "Unit test confirms every non-`-100` label corresponds to an assistant response token or its `<|im_end|>` delimiter.",
        difficulty: "Core",
      },
      {
        id: "p12-t03",
        stepNumber: 3,
        title: "Build the dynamic-padding SFT batch collator",
        explanation:
          "Instruction examples vary in length; padding `input_ids` with `pad_id` and `labels` with `-100` up to the longest example in the batch prevents wasted compute.",
        instructions:
          "Implement `SFTDataCollator` that right-pads `input_ids` with `pad_token_id`, pads `labels` with `-100`, and shifts `inputs = input_ids[:, :-1]`, `targets = labels[:, 1:]`.",
        expectedOutcome:
          "Batch collator ready for `torch.utils.data.DataLoader`.",
        acceptanceCriteria:
          "Padding tokens never contribute to `F.cross_entropy(logits, targets, ignore_index=-100)`.",
        difficulty: "Intermediate",
      },
      {
        id: "p12-t04",
        stepNumber: 4,
        title: "Implement `LoRALinear` from scratch in PyTorch",
        explanation:
          "LoRA freezes the pretrained weight $W_0 \\in \\mathbb{R}^{d_{\\text{out}} \\times d_{\\text{in}}}$ and adds a trainable low-rank update $\\frac{\\alpha}{r} B A x$ where $A \\sim \\mathcal{N}(0, \\sigma^2)$ and $B = 0$.",
        instructions:
          "Create `LoRALinear(base_layer, r=8, alpha=16, dropout=0.05)` in `sft/lora.py` with `base_layer.weight.requires_grad = False`, `lora_A = nn.Parameter(torch.randn(r, in_features) * 0.02)`, and `lora_B = nn.Parameter(torch.zeros(out_features, r))`.",
        expectedOutcome:
          "From-scratch LoRA wrapper module.",
        acceptanceCriteria:
          "At initialization (step 0), `LoRALinear(x)` matches `base_layer(x)` with `0.0` exact difference because `lora_B == 0`.",
        difficulty: "Intermediate",
      },
      {
        id: "p12-t05",
        stepNumber: 5,
        title: "Write recursive LoRA injection and trainable parameter accounting",
        explanation:
          "Replacing target linear layers (`q_proj`, `k_proj`, `v_proj`, `o_proj`, `up_proj`, `down_proj`) with `LoRALinear` freezes >98% of model parameters.",
        instructions:
          "Write `inject_lora(model, target_modules, r, alpha)` that swaps matching `nn.Linear` submodules and prints total vs. trainable parameter counts and percentage.",
        expectedOutcome:
          "Automated LoRA adapter injection utility.",
        acceptanceCriteria:
          "Trainable parameter ratio is `< 3%` of total parameters, and `base_layer` weights have `requires_grad == False`.",
        difficulty: "Intermediate",
      },
      {
        id: "p12-t06",
        stepNumber: 6,
        title: "Implement LoRA weight merging (`merge_and_unload`) and adapter saving",
        explanation:
          "After training, folding $\\Delta W = \\frac{\\alpha}{r} B A$ directly into $W_0$ eliminates the adapter branch and restores zero-overhead inference.",
        instructions:
          "Implement `save_lora_adapters(model, path)` (saving only `lora_A` and `lora_B` tensors) and `merge_lora_weights(model)` ($W_0 \\leftarrow W_0 + \\frac{\\alpha}{r} B A$).",
        expectedOutcome:
          "Lightweight adapter checkpointing and exact weight merging.",
        acceptanceCriteria:
          "Output of the merged `nn.Linear` model matches the unmerged `LoRALinear` model within `1e-5` max difference.",
        difficulty: "Advanced",
      },
      {
        id: "p12-t07",
        stepNumber: 7,
        title: "Curate and audit an instruction-tuning dataset",
        explanation:
          "Following the LIMA principle, a clean, formatting-consistent dataset of 1,000–5,000 instruction-response pairs teaches reliable assistant behavior without degrading base fluency.",
        instructions:
          "Load or curate a JSONL instruction dataset (e.g., SmolTalk subset, Alpaca-cleaned subset, or domain Q&A), filter empty or malformed records, and split into 95% train and 5% validation.",
        expectedOutcome:
          "Audited `sft_train.jsonl` and `sft_val.jsonl` splits.",
        acceptanceCriteria:
          "Dataset statistics script reports example count, average prompt tokens, and average assistant response tokens.",
        difficulty: "Core",
      },
      {
        id: "p12-t08",
        stepNumber: 8,
        title: "Run Supervised Fine-Tuning (SFT) on your base model",
        explanation:
          "Fine-tuning for 1–3 epochs with a low learning rate (e.g., `2e-4` for LoRA or `2e-5` for full SFT) adapts the model to follow instructions and emit `<|im_end|>` at the end of its answer.",
        instructions:
          "Train your Phase 6 `MyLLM v1` (or a small open-weight base model such as SmolLM2-135M / Qwen2.5-0.5B-Base) using your SFT collator and LoRA layers, logging train and validation masked loss.",
        expectedOutcome:
          "Trained SFT adapter checkpoint.",
        acceptanceCriteria:
          "Validation assistant-token loss decreases steadily and the model stops generating immediately upon emitting `<|im_end|>`.",
        difficulty: "Advanced",
      },
      {
        id: "p12-t09",
        stepNumber: 9,
        title: "Build an interactive multi-turn CLI chat assistant (`chat.py`)",
        explanation:
          "Multi-turn chat appends each user message and assistant reply to the conversation history, formatting the growing transcript with ChatML on each turn.",
        instructions:
          "Create `chat.py` that maintains the message history list, formats it with `format_chatml(..., add_generation_prompt=True)`, streams tokens until `<|im_end|>` is generated, and supports `/reset` and `/system` commands.",
        expectedOutcome:
          "Interactive terminal chat interface.",
        acceptanceCriteria:
          "Assistant maintains context across multi-turn follow-up questions and stops cleanly at `<|im_end|>`.",
        difficulty: "Core",
      },
      {
        id: "p12-t10",
        stepNumber: 10,
        title: "Implement sequence log-probability computation for DPO",
        explanation:
          "Direct Preference Optimization requires summing the per-token log-probabilities $\\log \\pi(y \\mid x) = \\sum_{t \\in \\text{response}} \\log P(y_t \\mid x, y_{<t})$ over the unmasked assistant tokens.",
        instructions:
          "Write `get_batch_logps(logits, labels)` in `sft/dpo.py` that gathers token log-probabilities at target indices and sums them strictly over positions where `labels != -100`.",
        expectedOutcome:
          "Exact response log-probability aggregator.",
        acceptanceCriteria:
          "Prompt tokens (`labels == -100`) contribute `0.0` to the returned sequence log-probability.",
        difficulty: "Advanced",
      },
      {
        id: "p12-t11",
        stepNumber: 11,
        title: "Implement the Direct Preference Optimization (DPO) loss and training step",
        explanation:
          "DPO aligns the policy model $\\pi_\\theta$ against a frozen reference SFT model $\\pi_{\\text{ref}}$ on `(prompt, chosen, rejected)` triples without training a separate reward model.",
        instructions:
          "Implement `dpo_loss(policy_chosen_logps, policy_rejected_logps, ref_chosen_logps, ref_rejected_logps, beta=0.1)` returning `loss`, `chosen_rewards`, `rejected_rewards`, and `reward_accuracy` (fraction where chosen > rejected).",
        expectedOutcome:
          "Tested DPO loss function and alignment loop.",
        acceptanceCriteria:
          "At step 0 when `policy == ref`, `dpo_loss` equals `math.log(2.0)` (`≈ 0.6931`) and reward margin is `0.0`.",
        difficulty: "Advanced",
      },
      {
        id: "p12-t12",
        stepNumber: 12,
        title: "Evaluate Base vs. SFT vs. DPO on a 20-prompt benchmark rubric",
        explanation:
          "Side-by-side comparison on held-out prompts (question answering, summarization, formatting constraints, refusal of nonsensical premises) proves what each stage achieved.",
        instructions:
          "Run `evaluate_assistant.py` across 20 held-out test prompts using the Base model, SFT model, and DPO-aligned model; score instruction adherence, formatting accuracy, and stopping cleanliness in `ALIGNMENT_REPORT.md`.",
        expectedOutcome:
          "Comprehensive qualitative and quantitative post-training comparison report.",
        acceptanceCriteria:
          "Report includes side-by-side outputs for Base, SFT, and DPO models alongside reward-accuracy metrics.",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "SFT collator masks 100% of `system`, `user`, and `pad` tokens with `-100` so loss is computed exclusively on `assistant` tokens.",
      "`LoRALinear` produces exact zero delta at initialization (`B = 0`) and merges cleanly into `nn.Linear` with `< 1e-5` discrepancy.",
      "DPO loss equals `ln(2)` when policy and reference log-probabilities are identical and increases `reward_accuracy` during preference training.",
      "Repository includes side-by-side Base vs. SFT vs. DPO evaluation results on held-out prompts.",
    ],
    testingGuide: {
      summary:
        "Verify prompt loss masking, LoRA zero-init and merge equivalence, and DPO step-0 analytical loss.",
      testCases: [
        {
          title: "Prompt Loss Masking Invariance Test",
          purpose:
            "Prove that corrupting logits on user prompt positions does not change the SFT loss.",
          verificationSteps:
            "Randomize logits at all positions where `labels == -100` and recompute cross-entropy loss.",
          expectedResult: "Loss value and gradients on assistant tokens remain 100% identical.",
        },
        {
          title: "LoRA Merge Equivalence Test",
          purpose:
            "Confirm `W_merged = W_0 + (alpha/r) * B @ A` produces identical outputs to the unmerged branch.",
          verificationSteps:
            "Randomize `lora_A` and `lora_B`, compute `y_unmerged = lora_layer(x)`, call `merge_lora_weights()`, and compute `y_merged = merged_layer(x)`.",
          expectedResult: "`torch.allclose(y_unmerged, y_merged, atol=1e-5)` is `True`.",
        },
        {
          title: "DPO Reference Identity Test",
          purpose:
            "Verify mathematical correctness of the DPO objective when policy equals reference.",
          verificationSteps:
            "Pass identical tensors for `policy_*_logps` and `ref_*_logps` into `dpo_loss`.",
          expectedResult: "`loss.item()` equals `math.log(2)` (`0.693147`) to 6 decimal places.",
        },
      ],
      verificationCommand: "pytest tests/test_sft_lora_dpo.py -v",
    },
    codeExamples: [
      {
        title: "LoRALinear & Direct Preference Optimization (DPO) Loss in PyTorch",
        language: "python",
        purpose:
          "Clean from-scratch implementation of a mergeable LoRA linear layer and the DPO preference loss.",
        code: `import torch
import torch.nn as nn
import torch.nn.functional as F

class LoRALinear(nn.Module):
    def __init__(self, base: nn.Linear, r: int = 8, alpha: float = 16.0):
        super().__init__()
        self.base = base
        self.base.weight.requires_grad_(False)
        if self.base.bias is not None:
            self.base.bias.requires_grad_(False)
        self.r = r
        self.scaling = alpha / r
        self.lora_A = nn.Parameter(torch.randn(r, base.in_features) * 0.02)
        self.lora_B = nn.Parameter(torch.zeros(base.out_features, r))

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.base(x) + (x @ self.lora_A.T @ self.lora_B.T) * self.scaling

    @torch.no_grad()
    def merge(self) -> nn.Linear:
        self.base.weight.add_((self.lora_B @ self.lora_A) * self.scaling)
        return self.base

def dpo_loss(pi_win: torch.Tensor, pi_lose: torch.Tensor, ref_win: torch.Tensor, ref_lose: torch.Tensor, beta: float = 0.1):
    chosen_logratios = pi_win - ref_win
    rejected_logratios = pi_lose - ref_lose
    logits = chosen_logratios - rejected_logratios
    loss = -F.logsigmoid(beta * logits).mean()
    acc = (logits > 0).float().mean()
    return loss, acc`,
      },
    ],
    hints: [
      {
        id: "p12-h1",
        title: "Including `<|im_end|>` in Unmasked Labels",
        category: "Common Mistake",
        content:
          "If you accidentally mask the closing `<|im_end|>` token with `-100` on assistant turns, the model never learns when to stop talking and will ramble until `max_new_tokens`.",
      },
      {
        id: "p12-h2",
        title: "Summing vs. Averaging Log-Probabilities in DPO",
        category: "Mathematical Formula",
        content:
          "In standard DPO, sequence log-probability $\\log \\pi(y \\mid x)$ is the **sum** of token log-probabilities over the response (where `labels != -100`), not the mean.",
      },
    ],
    optionalChallenges: [
      {
        id: "p12-oc1",
        title: "LoRA Rank & Target Module Ablation",
        description:
          "Compare LoRA ranks `r = 4, 16, 64` applied to attention-only (`q_proj, v_proj`) vs. all linear layers (`q, k, v, o, up, down`) on validation SFT loss and peak VRAM.",
        whatYouLearn:
          "Why targeting all linear layers with moderate rank outperforms high-rank attention-only adapters.",
      },
      {
        id: "p12-oc2",
        title: "Verifiable Math Reasoning Mini-Loop (GRPO)",
        description:
          "Implement a miniature Group Relative Policy Optimization (GRPO) loop on synthetic arithmetic word problems using a deterministic regex answer grader.",
        whatYouLearn:
          "How Reinforcement Learning with Verifiable Rewards (RLVR) trains `<think>...</think>` reasoning traces.",
      },
    ],
    expectedDeliverable:
      "An instruction-tuned and DPO-aligned conversational assistant with from-scratch `LoRALinear` adapters, interactive `chat.py` CLI, and a Base vs. SFT vs. DPO evaluation report.",
    deliverablesList: [
      "`sft/chat_template.py` & `sft/collator.py` with ChatML formatting and `-100` prompt masking",
      "`sft/lora.py` implementing `LoRALinear`, recursive injection, and weight merging",
      "`sft/dpo.py` implementing sequence log-probabilities and DPO preference loss",
      "Interactive multi-turn CLI assistant (`chat.py`)",
      "Before-and-after Base vs. SFT vs. DPO benchmark evaluation (`ALIGNMENT_REPORT.md`)",
    ],
    learningOutcomes: [
      "Serialize multi-turn conversations into ChatML tokens and mask prompt tokens with `-100`.",
      "Implement, train, save, and merge Low-Rank Adaptation (`LoRALinear`) layers from scratch.",
      "Implement Direct Preference Optimization (DPO) and explain how it aligns model preferences without a separate reward model.",
      "Evaluate post-trained assistants systematically against base pretrained models.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "instruction-tuned-assistant-lora-dpo",
      recommendedStructure: [
        "sft/__init__.py",
        "sft/chat_template.py",
        "sft/collator.py",
        "sft/lora.py",
        "sft/dpo.py",
        "train_sft.py",
        "train_dpo.py",
        "chat.py",
        "ALIGNMENT_REPORT.md",
        "tests/test_sft_lora_dpo.py",
        "README.md",
      ],
      readmeChecklist: [
        "Include a table showing total parameters vs. trainable LoRA parameters.",
        "Show side-by-side Base vs. SFT vs. DPO completions on 5 example prompts.",
        "Provide a sample multi-turn terminal transcript from `python chat.py`.",
      ],
    },
    relatedResourceIds: [
      "huggingface-llm-course",
      "huggingface-fine-tuning-module",
      "huggingface-trl-documentation",
      "huggingface-alignment-handbook",
    ],
    relatedModuleIds: ["p7-m1", "p7-m2", "p7-m3", "p7-m4", "p7-m5"],
    relatedProjectIds: [
      "milestone-11-pretrained-mini-llm",
      "milestone-13-llm-inference-server",
    ],
  },
  {
    id: "milestone-13-llm-inference-server",
    slug: "llm-inference-server",
    milestoneNumber: 13,
    title: "LLM Inference Server",
    subtitle:
      "Build a high-throughput, quantized LLM inference engine and streaming HTTP server with KV-cache management, INT8/INT4 quantization, and real-time latency telemetry",
    shortDescription:
      "Build a production-grade LLM inference engine and streaming HTTP/SSE server featuring prefill/decode KV-cache management, INT8/INT4 weight quantization, speculative decoding, security guardrails, and TTFT/TPOT benchmarking.",
    detailedOverview:
      "Serving a Large Language Model in production is fundamentally different from training it: prefill is compute-bound, while autoregressive token decoding is strictly memory-bandwidth-bound by loading model weights and KV caches from GPU HBM at every step. In this project, you will build a high-performance LLM Inference Engine and streaming HTTP server. You will separate prefill and decode phases with pre-allocated KV-cache buffers and system-prompt prefix caching, implement absmax INT8 and group-wise INT4 weight-only quantization from scratch, implement speculative decoding with a draft model for lossless 2× speedups, expose a streaming Server-Sent Events (SSE) HTTP API with strict input validation, rate limiting, and timeout handling, and benchmark Time-To-First-Token (TTFT), Time-Per-Output-Token (TPOT), and concurrent throughput.",
    whyThisProjectMatters:
      "Understanding why naive `model.generate()` recalculates $O(T^2)$ attention on every token—and how KV caching, INT8/INT4 quantization, dynamic batching, and speculative decoding cut latency and memory by 3×–8×—is essential for AI systems and inference engineers.",
    phase: 8,
    difficulty: "research",
    difficultyFilter: "Advanced",
    difficultyLabel: "Advanced",
    estimatedEffort: "22–32 hours",
    securityRequirementsNote:
      "Your inference server must implement production security guardrails: strict request schema validation (Pydantic), maximum prompt character/token length enforcement, maximum output token caps (`max_new_tokens <= 1024`), per-client rate limiting, request timeout handling, and structured JSON error responses that never leak internal stack traces.",
    technologies: [
      "Python",
      "PyTorch",
      "FastAPI / Uvicorn (SSE Streaming)",
      "KV-Cache Engine",
      "INT8 / INT4 Quantization",
      "Asyncio & Load Benchmarking",
    ],
    prerequisites: [
      "Phase 5 Project: Mini GPT Architecture (`milestone-10-mini-gpt-architecture`)",
      "Phase 6 Project: Pretrained Mini LLM (`milestone-11-pretrained-mini-llm`)",
      "Phase 8 Modules 8.1 & 8.4: GPU Memory Hierarchy and Inference & Deployment",
    ],
    requiredMathConcepts: [
      "KV-Cache memory footprint: 2 * n_layers * n_kv_heads * d_head * seq_len * bytes_per_elem",
      "Symmetric absmax INT8 quantization: s = max(|W|) / 127, W_q = round(W / s), W_hat = s * W_q",
      "Group-wise INT4 asymmetric quantization with group size g = 64 or 128",
      "Speculative decoding acceptance probability: min(1, p_target(x) / p_draft(x))",
      "Latency percentiles (P50, P95, P99) for TTFT and TPOT (ITL)",
    ],
    learningObjectives: [
      "Implement a stateful KV-Cache manager supporting prefill, single-token decode, and shared system-prompt prefix reuse.",
      "Implement symmetric INT8 per-channel and group-wise INT4 weight quantization and measure VRAM reduction vs. perplexity delta.",
      "Implement speculative decoding using a small draft model and verify mathematically lossless target distribution sampling.",
      "Build a streaming FastAPI Server-Sent Events (SSE) endpoint hardened with input validation, rate limiting, token caps, and timeouts.",
      "Benchmark TTFT, TPOT, peak VRAM, and tokens/sec across batch sizes and quantization modes.",
    ],
    skillsPracticed: [
      "Pre-allocated KV-cache management & system-prompt prefix caching",
      "From-scratch INT8 / group-wise INT4 weight quantization",
      "Speculative decoding verification loop",
      "Hardened FastAPI SSE token streaming & TTFT/TPOT load testing",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "KV-Cache Engine, Prefill/Decode Split & Prefix Caching",
        summary:
          "Eliminate $O(T^2)$ redundant recomputation during decoding by pre-allocating KV cache tensors and caching shared system prompts.",
        taskIds: ["p13-t01", "p13-t02", "p13-t03", "p13-t04"],
      },
      {
        stageNumber: 2,
        title: "INT8 & Group-Wise INT4 Weight Quantization",
        summary:
          "Quantize linear layer weights to 8-bit and 4-bit integers and measure memory footprint savings and perplexity preservation.",
        taskIds: ["p13-t05", "p13-t06", "p13-t07"],
      },
      {
        stageNumber: 3,
        title: "Batched Scheduling & Speculative Decoding",
        summary:
          "Support continuous/dynamic multi-request batching and speculative draft-then-verify decoding.",
        taskIds: ["p13-t08", "p13-t09", "p13-t10"],
      },
      {
        stageNumber: 4,
        title: "Hardened Streaming HTTP Server & Latency Benchmarks",
        summary:
          "Expose a streaming SSE API with full security guardrails and run an automated load benchmark suite.",
        taskIds: ["p13-t11", "p13-t12", "p13-t13", "p13-t14", "p13-t15"],
      },
    ],
    tasks: [
      {
        id: "p13-t01",
        stepNumber: 1,
        title: "Implement pre-allocated KV-Cache buffers for attention layers",
        explanation:
          "Calling `torch.cat` on every generated token allocates new GPU tensors repeatedly; pre-allocating `(B, n_kv_heads, max_seq_len, d_head)` buffers writes new K/V slices in-place.",
        instructions:
          "Create `KVCache` in `server/kv_cache.py` with `.update(layer_idx, k_val, v_val, start_pos)` and integrate it into your Transformer attention block.",
        expectedOutcome:
          "Zero-allocation in-place KV cache updater.",
        acceptanceCriteria:
          "Decoding 100 tokens with `KVCache` produces bit-for-bit (or `1e-5` float) identical logits to full-sequence recomputation.",
        difficulty: "Core",
      },
      {
        id: "p13-t02",
        stepNumber: 2,
        title: "Separate the `prefill` and `decode_one_token` execution paths",
        explanation:
          "Prefill processes all `L_prompt` tokens in parallel (`q_len = L_prompt`), while each subsequent decode step passes only the newly sampled token `(B, 1)` with `start_pos = current_len`.",
        instructions:
          "Implement `engine.prefill(prompt_ids)` and `engine.decode_step(last_token_id, kv_cache)` and benchmark the speedup over naive full-prefix recomputation at sequence length 512.",
        expectedOutcome:
          "O(1) per-step query projection during autoregressive decoding.",
        acceptanceCriteria:
          "KV-cached decoding is at least 4×–10× faster than uncached generation at 256+ generated tokens.",
        difficulty: "Core",
      },
      {
        id: "p13-t03",
        stepNumber: 3,
        title: "Implement KV-Cache memory calculator and capacity enforcement",
        explanation:
          "KV cache grows linearly with batch size and sequence length; pre-computing exact byte footprint prevents out-of-memory (OOM) crashes.",
        instructions:
          "Write `compute_kv_cache_bytes(config, batch_size, seq_len, dtype)` and enforce a configurable maximum concurrent KV slot pool.",
        expectedOutcome:
          "Deterministic KV memory budget tracker.",
        acceptanceCriteria:
          "Calculator accurately reports MB/GB required per request and rejects or queues requests when slots are full.",
        difficulty: "Intermediate",
      },
      {
        id: "p13-t04",
        stepNumber: 4,
        title: "Implement system-prompt prefix KV caching",
        explanation:
          "When thousands of requests share the same system prompt, pre-computing its KV cache once and cloning/reusing that prefix cuts Time-To-First-Token (TTFT).",
        instructions:
          "Add a hash-keyed prefix cache to `InferenceEngine` that stores prefilled KV states for common system prompts and slices them into new request caches.",
        expectedOutcome:
          "Prefix cache hit/miss tracking and reduced TTFT on repeated system prompts.",
        acceptanceCriteria:
          "Second request sharing a 200-token system prompt skips prefill on those 200 tokens and produces identical first-token logits.",
        difficulty: "Advanced",
      },
      {
        id: "p13-t05",
        stepNumber: 5,
        title: "Implement symmetric per-channel INT8 weight-only quantization",
        explanation:
          "Storing linear weights as `int8` with a per-output-channel FP16/FP32 scale $s_i = \\max_j |W_{i,j}| / 127$ cuts model weight memory by 2×–4×.",
        instructions:
          "Implement `Int8Linear(nn.Module)` in `server/quantization.py` that quantizes an `nn.Linear` layer's weights to `torch.int8` and dequantizes during forward multiplication.",
        expectedOutcome:
          "Drop-in `Int8Linear` module.",
        acceptanceCriteria:
          "Weight tensor storage drops by ~50% compared to FP16 (~75% vs FP32) and cosine similarity with full-precision output is `> 0.998`.",
        difficulty: "Intermediate",
      },
      {
        id: "p13-t06",
        stepNumber: 6,
        title: "Implement group-wise INT4 weight quantization (`group_size=64`)",
        explanation:
          "Packing two 4-bit integers (`[-8, 7]` or `[0, 15]`) into a single `uint8` byte with per-group scales and zero-points compresses weights by 4× over FP16 while isolating outlier channels.",
        instructions:
          "Implement `Int4GroupLinear(nn.Module)` that reshapes weights into groups of 64, computes per-group scale/zero-point, packs two 4-bit values per `uint8` byte, and unpacks during forward.",
        expectedOutcome:
          "Bit-packed 4-bit quantized linear layer.",
        acceptanceCriteria:
          "Packed weight tensor uses 0.5 bytes per parameter (plus group scales) and reconstructs weights accurately.",
        difficulty: "Advanced",
      },
      {
        id: "p13-t07",
        stepNumber: 7,
        title: "Evaluate FP32/BF16 vs. INT8 vs. INT4 perplexity and memory footprint",
        explanation:
          "Quantization is only useful if model quality holds up; measuring validation perplexity across all three precisions quantifies the accuracy-memory Pareto frontier.",
        instructions:
          "Write `benchmark_quantization.py` that evaluates your model in FP32/BF16, INT8, and INT4 on `val.bin` and outputs a comparison table of model size (MB) vs. validation perplexity.",
        expectedOutcome:
          "Empirical quantization tradeoff table.",
        acceptanceCriteria:
          "INT8 validation perplexity degradation is `< 1%`, and INT4 degradation is documented clearly.",
        difficulty: "Intermediate",
      },
      {
        id: "p13-t08",
        stepNumber: 8,
        title: "Implement speculative decoding with a draft model",
        explanation:
          "A tiny draft model proposes $K=4$ candidate tokens cheaply; the target model verifies all $K$ tokens in a single parallel forward pass using rejection sampling.",
        instructions:
          "Implement `speculative_generate(target_model, draft_model, prompt_ids, K=4)` that accepts draft tokens with probability $\\min(1, p_{\\text{target}}(x) / p_{\\text{draft}}(x))$ and always produces at least 1 valid token per target call.",
        expectedOutcome:
          "Lossless speculative decoding generator.",
        acceptanceCriteria:
          "Greedy (`temperature=0`) speculative decoding produces 100% identical token sequences to standard target-only greedy decoding while calling `target_model` fewer times than tokens generated.",
        difficulty: "Advanced",
      },
      {
        id: "p13-t09",
        stepNumber: 9,
        title: "Implement multi-request dynamic batching with left-padding and per-row stopping",
        explanation:
          "Batching multiple concurrent user prompts together amortizes weight loading across requests.",
        instructions:
          "Implement `generate_batch(prompts, max_new_tokens)` using left-padding (so all sequences align at the right-most next token), adjusted position IDs, attention masks, and per-sequence EOS tracking.",
        expectedOutcome:
          "Multi-request batched inference runner.",
        acceptanceCriteria:
          "Batched generation of 4 different-length prompts matches single-request generation for each prompt.",
        difficulty: "Advanced",
      },
      {
        id: "p13-t10",
        stepNumber: 10,
        title: "Implement streaming token generator yielding real-time telemetry",
        explanation:
          "Streaming tokens as an async generator allows HTTP clients to render words immediately upon first-token completion.",
        instructions:
          "Write `engine.stream_generate(request)` yielding token chunks along with `ttft_ms` on the first token and `tpot_ms` / `tokens_per_sec` in the final completion event.",
        expectedOutcome:
          "Async token iterator with built-in timing instrumentation.",
        acceptanceCriteria:
          "First yielded chunk includes measured `ttft_ms`, and final summary event includes total tokens and average `tpot_ms`.",
        difficulty: "Core",
      },
      {
        id: "p13-t11",
        stepNumber: 11,
        title: "Build the FastAPI server with Server-Sent Events (SSE) streaming",
        explanation:
          "Exposing `POST /v1/generate` (and `/v1/generate/stream`) via SSE (`text/event-stream`) matches industry-standard LLM serving APIs.",
        instructions:
          "Create `server/app.py` with `GET /health`, `GET /v1/metrics`, `POST /v1/generate`, and `POST /v1/generate/stream` returning `data: {...}\\n\\n` SSE chunks.",
        expectedOutcome:
          "Streaming HTTP inference API.",
        acceptanceCriteria:
          "Streaming endpoint flushes each token immediately and terminates with `data: [DONE]\\n\\n`.",
        difficulty: "Core",
      },
      {
        id: "p13-t12",
        stepNumber: 12,
        title: "Enforce strict input validation, prompt length caps, and max output token limits",
        explanation:
          "Unbounded prompts or `max_new_tokens=1000000` can trigger instant GPU OOM or denial of service.",
        instructions:
          "Define Pydantic request schemas enforcing non-empty prompts, `len(prompt) <= 4096` chars, `prompt_tokens <= model.block_size - 16`, `1 <= max_new_tokens <= 512`, `0.0 <= temperature <= 2.0`, and `0.0 < top_p <= 1.0`.",
        expectedOutcome:
          "Strict schema validation returning HTTP 422 on out-of-bounds parameters.",
        acceptanceCriteria:
          "Oversized prompts or invalid sampling parameters are rejected before touching the GPU.",
        difficulty: "Core",
      },
      {
        id: "p13-t13",
        stepNumber: 13,
        title: "Implement rate limiting, request timeouts, and structured error handling",
        explanation:
          "Production inference servers must protect against request floods, cancel stalled generations, and return safe JSON error envelopes.",
        instructions:
          "Add a token-bucket/sliding-window rate limiter middleware (HTTP 429), wrap generation in `asyncio.wait_for(..., timeout=30.0)` (HTTP 504), and install global exception handlers that return `{error: {code, message}}` without stack traces.",
        expectedOutcome:
          "Hardened HTTP serving layer.",
        acceptanceCriteria:
          "Automated tests verify HTTP 422 on invalid input, HTTP 429 when rate limit is exceeded, and HTTP 504 on simulated timeout.",
        difficulty: "Intermediate",
      },
      {
        id: "p13-t14",
        stepNumber: 14,
        title: "Build the concurrent load and latency benchmarking tool (`bench_server.py`)",
        explanation:
          "Measuring P50/P95/P99 Time-To-First-Token (TTFT), Time-Per-Output-Token (TPOT), and aggregate tokens/sec across concurrency levels (`c = 1, 4, 8, 16`) reveals the server's saturation point.",
        instructions:
          "Write `bench_server.py` using `httpx.AsyncClient` or `aiohttp` to send concurrent streaming requests, record per-request TTFT and TPOT distributions, and output a Markdown benchmark report.",
        expectedOutcome:
          "Reproducible load testing tool and latency-throughput table.",
        acceptanceCriteria:
          "Benchmark script outputs P50/P95 TTFT (ms), P50/P95 TPOT (ms), and total system throughput (tokens/sec).",
        difficulty: "Intermediate",
      },
      {
        id: "p13-t15",
        stepNumber: 15,
        title: "Author the complete Systems & Quantization Benchmark Report",
        explanation:
          "Synthesize your measurements comparing uncached vs. KV-cached decoding, FP32/BF16 vs. INT8 vs. INT4 memory/perplexity, speculative decoding acceptance rate, and concurrent server latency.",
        instructions:
          "Document all benchmark tables and architecture diagrams in `INFERENCE_BENCHMARK_REPORT.md`.",
        expectedOutcome:
          "Comprehensive engineering benchmark report.",
        acceptanceCriteria:
          "Report includes real measured numbers from your hardware for KV cache speedup, quantization memory/perplexity, and SSE server TTFT/TPOT.",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "KV-cached decoding matches uncached logits while achieving multi-fold speedup on long sequences.",
      "From-scratch INT8 and group-wise INT4 weight quantizers compress linear weights by ~2× and ~4× (vs FP16) with documented perplexity impact.",
      "Speculative decoding produces identical greedy outputs to standard decoding with fewer target model forward passes.",
      "FastAPI SSE server enforces input length caps, max output tokens, rate limiting (HTTP 429), and timeouts (HTTP 504) with structured error responses.",
    ],
    testingGuide: {
      summary:
        "Run unit and integration tests covering KV-cache equivalence, INT8/INT4 quantization accuracy, speculative decoding correctness, and HTTP security guardrails.",
      testCases: [
        {
          title: "KV-Cache Logit Equivalence Test",
          purpose:
            "Confirm prefill + step-by-step KV-cached decoding matches full-sequence forward passes.",
          verificationSteps:
            "Generate 32 tokens greedily with `use_kv_cache=True` and `use_kv_cache=False` from the same prompt.",
          expectedResult: "Generated token ID sequences and step logits match.",
        },
        {
          title: "Speculative Decoding Greedy Exactness Test",
          purpose:
            "Verify that speculative decoding never alters greedy target model outputs.",
          verificationSteps:
            "Run `speculative_generate(..., temperature=0.0, K=4)` and compare against standard target greedy decoding.",
          expectedResult: "Exact 100% token sequence match with `< N` target forward calls for `N` tokens.",
        },
        {
          title: "Server Security Guardrails Test (`TestClient`)",
          purpose:
            "Verify input bounds, rate limiting, and structured error envelopes.",
          verificationSteps:
            "Send requests with `max_new_tokens=99999` (expect 422), empty prompt (expect 422), and burst above rate limit (expect 429).",
          expectedResult: "All security status codes and structured JSON error schemas pass.",
        },
      ],
      verificationCommand: "pytest tests/test_inference_server.py -v",
    },
    codeExamples: [
      {
        title: "Symmetric Per-Channel INT8 Linear Quantization & KV-Cache Buffer",
        language: "python",
        purpose:
          "Core implementation of weight-only INT8 quantization and a pre-allocated KV-cache tensor buffer.",
        code: `import torch
import torch.nn as nn
import torch.nn.functional as F

class Int8Linear(nn.Module):
    def __init__(self, linear: nn.Linear):
        super().__init__()
        w = linear.weight.data.float()
        scale = w.abs().amax(dim=1, keepdim=True).clamp(min=1e-8) / 127.0
        self.register_buffer("weight_int8", torch.round(w / scale).to(torch.int8))
        self.register_buffer("scale", scale.to(linear.weight.dtype))
        self.bias = linear.bias

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        w_dequant = self.weight_int8.to(x.dtype) * self.scale
        return F.linear(x, w_dequant, self.bias)

class LayerKVCache:
    def __init__(self, batch_size: int, n_heads: int, max_seq_len: int, head_dim: int, dtype: torch.dtype, device: torch.device):
        self.k = torch.zeros((batch_size, n_heads, max_seq_len, head_dim), dtype=dtype, device=device)
        self.v = torch.zeros((batch_size, n_heads, max_seq_len, head_dim), dtype=dtype, device=device)
        self.seq_len = 0

    def update(self, k_new: torch.Tensor, v_new: torch.Tensor):
        t = k_new.size(2)
        self.k[:, :, self.seq_len : self.seq_len + t, :] = k_new
        self.v[:, :, self.seq_len : self.seq_len + t, :] = v_new
        self.seq_len += t
        return self.k[:, :, :self.seq_len, :], self.v[:, :, :self.seq_len, :]`,
      },
    ],
    hints: [
      {
        id: "p13-h1",
        title: "Causal Masking During Single-Token KV-Cached Decode",
        category: "Expected Tensor Shapes",
        content:
          "During `decode_step`, query $Q$ has shape `(B, H, 1, d_k)` while cached $K, V$ have shape `(B, H, T_cur, d_k)`. Because the single query token is at the final position `T_cur - 1`, it is allowed to attend to **all** `T_cur` cached keys—no upper-triangular mask is needed for the decode step!",
      },
      {
        id: "p13-h2",
        title: "Left-Padding for Batched Autoregressive Decoding",
        category: "Debugging Technique",
        content:
          "Unlike training (which uses right-padding), batched autoregressive generation requires **left-padding** so the final token of every prompt sits at index `-1`, allowing `logits[:, -1, :]` to sample the next token for all requests simultaneously.",
      },
    ],
    optionalChallenges: [
      {
        id: "p13-oc1",
        title: "Paged KV-Cache Block Allocator",
        description:
          "Replace contiguous `(B, H, max_seq_len, D)` KV buffers with fixed-size 16-token physical memory blocks mapped via a logical block table (inspired by vLLM PagedAttention).",
        whatYouLearn:
          "How production serving engines eliminate external and internal KV memory fragmentation.",
      },
      {
        id: "p13-oc2",
        title: "INT8 KV-Cache Quantization",
        description:
          "Quantize the cached $K$ and $V$ tensors dynamically to `int8` per token head to cut long-context KV memory by 2×.",
        whatYouLearn:
          "Combined weight + activation/KV-cache quantization for long-context serving.",
      },
    ],
    expectedDeliverable:
      "A high-throughput LLM Inference Engine and hardened FastAPI SSE streaming server supporting KV caching, INT8/INT4 quantization, speculative decoding, and TTFT/TPOT load benchmarking.",
    deliverablesList: [
      "`server/kv_cache.py` & `server/engine.py` with prefill/decode split and prefix caching",
      "`server/quantization.py` with INT8 per-channel and group-wise INT4 weight quantization",
      "`server/speculative.py` implementing draft-and-verify speculative decoding",
      "`server/app.py` FastAPI SSE streaming server with validation, rate limiting, and timeouts",
      "`bench_server.py` & `INFERENCE_BENCHMARK_REPORT.md` with P50/P95 TTFT, TPOT, and quantization metrics",
    ],
    learningOutcomes: [
      "Implement pre-allocated KV-cache management and system-prompt prefix caching.",
      "Quantize LLM weights to INT8 and group-wise INT4 from scratch and measure perplexity vs. memory.",
      "Implement lossless speculative decoding to accelerate memory-bandwidth-bound token generation.",
      "Build, secure, and load-test a streaming HTTP/SSE LLM inference server.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "llm-inference-server-from-scratch",
      recommendedStructure: [
        "server/__init__.py",
        "server/kv_cache.py",
        "server/quantization.py",
        "server/speculative.py",
        "server/engine.py",
        "server/app.py",
        "bench_server.py",
        "INFERENCE_BENCHMARK_REPORT.md",
        "tests/test_inference_server.py",
        "README.md",
      ],
      readmeChecklist: [
        "Include the KV-cached vs. uncached latency speedup chart across sequence lengths.",
        "Show the FP32/BF16 vs. INT8 vs. INT4 model memory and validation perplexity table.",
        "Include P50/P95 TTFT and TPOT results from `bench_server.py`.",
      ],
    },
    relatedResourceIds: [
      "stanford-cs336",
      "gpu-mode-lectures",
      "vllm-documentation",
      "triton-programming-tutorials",
    ],
    relatedModuleIds: ["p8-m1", "p8-m3", "p8-m4"],
    relatedProjectIds: [
      "milestone-10-mini-gpt-architecture",
      "milestone-11-pretrained-mini-llm",
      "milestone-14-research-reproduction",
    ],
  },
  {
    id: "milestone-14-research-reproduction",
    slug: "research-reproduction",
    milestoneNumber: 14,
    title: "Research Reproduction",
    subtitle:
      "Select a foundational LLM architecture or optimization paper, design a parameter- and FLOP-matched multi-seed experiment from scratch, and publish a reproducible technical report",
    shortDescription:
      "Deconstruct a foundational AI/LLM research paper, formulate a falsifiable hypothesis, run a parameter- and FLOP-matched experimental study across multiple random seeds, and author a publication-grade technical report.",
    detailedOverview:
      "The final milestone of the AI Roadmap transitions you from an AI builder to an independent AI researcher. You will select a foundational Transformer architecture, positional encoding, normalization, or optimization paper (for example: RoPE vs. Learned/ALiBi Positional Embeddings; SwiGLU vs. GELU Feed-Forward Networks; Grouped-Query Attention vs. Multi-Head Attention; RMSNorm + QK-Norm vs. LayerNorm; or Muon/Lion vs. AdamW), translate its mathematical formulation into your own clean PyTorch implementation, design a strictly controlled experiment holding dataset order, tokenizer, parameter count, and FLOP budget constant, run both baseline and experimental variants across at least 3 random seeds (`seed=42, 43, 44`), execute a multi-row ablation table, and publish a transparent, one-command reproducible research repository and technical report.",
    whyThisProjectMatters:
      "Reading papers passively creates an illusion of understanding; reproducing a paper's claims at a scaled-down compute budget—discovering which hyperparameters actually drive the improvement, measuring seed variance ($\\mu \\pm \\sigma$), and reporting negative or boundary regimes honestly—is the exact skill practiced at frontier AI research labs.",
    phase: 8,
    difficulty: "research",
    difficultyFilter: "Research",
    difficultyLabel: "Research · Capstone",
    estimatedEffort: "25–40 hours",
    technologies: [
      "Python",
      "PyTorch",
      "Controlled Experimental Design",
      "Multi-Seed Statistical Analysis",
      "Matplotlib / Publication Figures",
      "Reproducible Research Shell Scripts",
    ],
    prerequisites: [
      "Phase 5 Project: Mini GPT Architecture (`milestone-10-mini-gpt-architecture`)",
      "Phase 6 Project: Pretrained Mini LLM (`milestone-11-pretrained-mini-llm`)",
      "Phase 8 Modules 8.3 & 8.5: Advanced Architectures and Research & Experimentation",
    ],
    requiredMathConcepts: [
      "Parameter-matched architectural scaling (e.g., d_ff = (8/3) d_model for SwiGLU 3-matrix FFN vs 4 d_model for 2-matrix GELU FFN)",
      "Iso-FLOP training budget calculation: C ≈ 6 N D",
      "Multi-seed sample mean and standard deviation: mu ± sigma across K >= 3 random seeds",
      "Signal-to-noise ratio: |mu_exp - mu_base| / sqrt(sigma_exp^2 + sigma_base^2)",
    ],
    learningObjectives: [
      "Deconstruct a primary LLM research paper into its exact mathematical delta over a standard baseline.",
      "Design a confound-free experimental protocol matching parameter count, token budget, batch ordering, and FLOPs.",
      "Execute multi-seed runs (`seed=42, 43, 44`) to separate genuine architectural/ algorithmic improvements from random initialization noise.",
      "Design and run a systematic ablation table isolating sub-component contributions and boundary failure modes.",
      "Author a publication-grade technical report and a single-command `reproduce.sh` pipeline.",
    ],
    skillsPracticed: [
      "Research paper deconstruction & falsifiable hypothesis formulation",
      "Iso-parameter & iso-FLOP controlled experimental design",
      "Multi-seed (`N >= 3`) statistical evaluation & ablation matrices",
      "Publication-grade technical writing & one-command reproducibility",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "Paper Selection, Mathematical Deconstruction & Hypothesis Formulation",
        summary:
          "Select a concrete paper, isolate its exact mathematical equations, and write a falsifiable pre-registered experimental hypothesis.",
        taskIds: ["p14-t01", "p14-t02", "p14-t03"],
      },
      {
        stageNumber: 2,
        title: "Iso-Parameter & Iso-FLOP Baseline vs. Experimental Implementation",
        summary:
          "Implement the baseline and paper variant in a unified codebase, enforcing identical parameter counts, data ordering, and unit tests.",
        taskIds: ["p14-t04", "p14-t05", "p14-t06", "p14-t07"],
      },
      {
        stageNumber: 3,
        title: "Multi-Seed Experiments, Ablation Study & Stress Testing",
        summary:
          "Run 3 random seeds for baseline and proposed methods, execute component ablations, and test an extreme stress regime.",
        taskIds: ["p14-t08", "p14-t09", "p14-t10", "p14-t11"],
      },
      {
        stageNumber: 4,
        title: "Statistical Analysis, Publication Figures & Technical Report",
        summary:
          "Compute mean ± std metrics, generate publication-quality plots, package `reproduce.sh`, and write the final research paper.",
        taskIds: ["p14-t12", "p14-t13", "p14-t14", "p14-t15"],
      },
    ],
    tasks: [
      {
        id: "p14-t01",
        stepNumber: 1,
        title: "Select a target research paper and define your scaled-down proxy setup",
        explanation:
          "A great reproduction study chooses a clear, focused paper claim that can be tested cleanly on a 5M–25M parameter Transformer.",
        instructions:
          "Choose one paper topic (e.g., RoPE vs. Learned PosEmbed + length extrapolation; SwiGLU vs. GELU FFN; GQA vs. MHA KV-bandwidth vs. perplexity; QK-Norm stability at high learning rates; or Muon vs. AdamW) and document the citation and core claim in `PROPOSAL.md`.",
        expectedOutcome:
          "Focused research topic and scaled proxy specification.",
        acceptanceCriteria:
          "`PROPOSAL.md` states the paper title, authors, year, equations under test, and target proxy scale.",
        difficulty: "Core",
      },
      {
        id: "p14-t02",
        stepNumber: 2,
        title: "Formulate a falsifiable hypothesis and primary/secondary metrics",
        explanation:
          "Scientific rigor requires specifying what outcome would confirm or refute the hypothesis *before* looking at final test curves.",
        instructions:
          "Write a quantitative hypothesis (e.g., 'Parameter-matched SwiGLU achieves lower validation perplexity than GELU across 3 seeds at equal FLOPs, with effect size > 2 standard deviations') and list primary (`val_ppl`) and secondary (`tokens_per_sec`, `peak_vram_mb`) metrics.",
        expectedOutcome:
          "Pre-registered hypothesis and metric definitions.",
        acceptanceCriteria:
          "Hypothesis specifies the independent variable, dependent metrics, and falsification threshold.",
        difficulty: "Core",
      },
      {
        id: "p14-t03",
        stepNumber: 3,
        title: "Audit and eliminate confounding variables (Iso-Parameter & Iso-FLOP design)",
        explanation:
          "A naive SwiGLU layer with $d_{\\text{ff}} = 4 d_{\\text{model}}$ has 3 matrices instead of 2 (50% more FFN parameters than GELU!). Fair comparisons must scale $d_{\\text{ff}} = \\frac{2}{3}(4 d_{\\text{model}})$ rounded to a multiple of 64.",
        instructions:
          "Write `experiments/verify_parity.py` that instantiates both baseline and experimental models and verifies parameter counts match within `< 0.5%` and batch data iterators yield identical token sequences for a given seed.",
        expectedOutcome:
          "Automated parity audit script.",
        acceptanceCriteria:
          "`verify_parity.py` asserts parameter parity (`< 0.5%` delta) and identical batch token IDs across baseline and experimental configs.",
        difficulty: "Intermediate",
      },
      {
        id: "p14-t04",
        stepNumber: 4,
        title: "Implement the reference baseline architecture/method cleanly",
        explanation:
          "Your baseline must be well-tuned and bug-free so the proposed method does not win simply because the baseline was misconfigured.",
        instructions:
          "Implement the baseline variant in `src/models.py` with clean configuration flags and verify its step-0 loss and training stability.",
        expectedOutcome:
          "Verified baseline implementation.",
        acceptanceCriteria:
          "Baseline passes all shape, gradient, and initial loss (`≈ ln(V)`) checks.",
        difficulty: "Core",
      },
      {
        id: "p14-t05",
        stepNumber: 5,
        title: "Implement the paper's proposed method from scratch",
        explanation:
          "Translate the paper's mathematical equations directly into modular PyTorch code within the same repository.",
        instructions:
          "Implement the paper's mechanism (e.g., `RotaryEmbedding`, `SwiGLUFFN`, `GroupedQueryAttention`, or `QKNorm`) and expose a single config switch (`method: 'baseline' | 'proposed'`).",
        expectedOutcome:
          "Clean toggleable implementation of the paper's method.",
        acceptanceCriteria:
          "Switching from `baseline` to `proposed` changes only the targeted module while keeping everything else identical.",
        difficulty: "Advanced",
      },
      {
        id: "p14-t06",
        stepNumber: 6,
        title: "Write unit tests verifying mathematical properties of the paper's mechanism",
        explanation:
          "For example, RoPE dot products must depend only on relative distance $m - n$; GQA with $G = H$ must equal MHA exactly.",
        instructions:
          "Create `tests/test_paper_mechanism.py` testing the mathematical invariants of your implemented method.",
        expectedOutcome:
          "Automated unit test suite for the research mechanism.",
        acceptanceCriteria:
          "All mathematical invariant tests pass under `pytest`.",
        difficulty: "Intermediate",
      },
      {
        id: "p14-t07",
        stepNumber: 7,
        title: "Implement structured experiment tracking and deterministic seeding",
        explanation:
          "Every run must log its git commit hash, config JSON, random seed, hardware device, step-by-step loss/throughput telemetry, and wall-clock time.",
        instructions:
          "Build `src/experiment_runner.py` that pins `random`, `numpy`, and `torch` seeds and writes structured logs to `results/<exp_name>_seed<seed>.jsonl`.",
        expectedOutcome:
          "Reproducible experiment harness.",
        acceptanceCriteria:
          "Running the same config with `seed=42` twice produces identical step-by-step training losses.",
        difficulty: "Core",
      },
      {
        id: "p14-t08",
        stepNumber: 8,
        title: "Execute multi-seed baseline runs (`seed=42, 43, 44`)",
        explanation:
          "Running 3 independent seeds establishes the mean and standard deviation ($\\mu_{\\text{base}} \\pm \\sigma_{\\text{base}}$) of the baseline.",
        instructions:
          "Run the baseline configuration across seeds `42`, `43`, and `44` for your full token budget and record all validation checkpoints.",
        expectedOutcome:
          "Three complete baseline telemetry logs.",
        acceptanceCriteria:
          "`results/` contains complete JSONL logs for `baseline_seed42`, `baseline_seed43`, and `baseline_seed44`.",
        difficulty: "Intermediate",
      },
      {
        id: "p14-t09",
        stepNumber: 9,
        title: "Execute multi-seed experimental runs (`seed=42, 43, 44`)",
        explanation:
          "Using the exact same 3 seeds guarantees that each seed pair (`baseline_seed42` vs `proposed_seed42`) sees the exact same mini-batch sequence.",
        instructions:
          "Run the proposed configuration across seeds `42`, `43`, and `44` and record validation loss, perplexity, throughput, and peak memory.",
        expectedOutcome:
          "Three complete proposed-method telemetry logs.",
        acceptanceCriteria:
          "`results/` contains complete JSONL logs for `proposed_seed42`, `proposed_seed43`, and `proposed_seed44`.",
        difficulty: "Intermediate",
      },
      {
        id: "p14-t10",
        stepNumber: 10,
        title: "Design and execute a multi-row component ablation study",
        explanation:
          "Ablations isolate *why* the method works (e.g., in SwiGLU: testing SiLU activation alone vs. gating alone vs. full SwiGLU; in GQA: testing `kv_heads = 8, 4, 2, 1`).",
        instructions:
          "Run at least 2–3 ablation variants isolating intermediate design choices or hyperparameter sensitivities.",
        expectedOutcome:
          "Complete ablation experiment logs and comparison table.",
        acceptanceCriteria:
          "Ablation table compares Baseline, intermediate ablations, and Full Proposed method across identical token budgets.",
        difficulty: "Advanced",
      },
      {
        id: "p14-t11",
        stepNumber: 11,
        title: "Conduct a boundary or stress-regime experiment (finding where the method breaks or shines)",
        explanation:
          "Every architectural choice has tradeoffs—for example, testing length extrapolation at $2\\times$ training context length, or testing stability at $3\\times$ higher learning rate.",
        instructions:
          "Run one targeted stress test evaluating both baseline and proposed models outside the standard training regime and document the result honestly (including negative results if the method fails).",
        expectedOutcome:
          "Boundary/stress-test empirical measurement.",
        acceptanceCriteria:
          "Stress test results are logged and analyzed without cherry-picking.",
        difficulty: "Advanced",
      },
      {
        id: "p14-t12",
        stepNumber: 12,
        title: "Compute statistical summaries ($\\mu \\pm \\sigma$) and confidence intervals",
        explanation:
          "Reporting `21.42 ± 0.18` across 3 seeds shows whether an observed improvement exceeds random seed variance.",
        instructions:
          "Write `scripts/analyze_results.py` that reads all `results/*.jsonl` files and generates Markdown tables with `mean ± std`, relative delta `%`, and paired seed comparisons.",
        expectedOutcome:
          "Automated statistical summary script and Markdown results table.",
        acceptanceCriteria:
          "Script outputs formatted tables with mean, standard deviation, and per-seed breakdown.",
        difficulty: "Core",
      },
      {
        id: "p14-t13",
        stepNumber: 13,
        title: "Generate publication-quality loss curves and ablation figures",
        explanation:
          "Visualizing mean validation loss curves with $\\pm 1\\sigma$ shaded error bands communicates convergence speed and stability immediately.",
        instructions:
          "Write `scripts/plot_figures.py` to generate high-resolution PNG/SVG plots showing (1) multi-seed validation loss curves with shaded error bands, and (2) the ablation / stress-test comparison bar or line chart.",
        expectedOutcome:
          "Saved publication figures in `figures/`.",
        acceptanceCriteria:
          "Figures have clear axis labels, legends, units, and multi-seed error bands.",
        difficulty: "Core",
      },
      {
        id: "p14-t14",
        stepNumber: 14,
        title: "Create the single-command reproduction script (`reproduce.sh`)",
        explanation:
          "True reproducible research allows any engineer to run one script that prepares data, runs tests, executes experiments, and regenerates all tables and figures.",
        instructions:
          "Write `reproduce.sh` (with a `--quick` flag for fast verification and `--full` for full 3-seed reproduction) and pin dependencies in `requirements.txt` / `pyproject.toml`.",
        expectedOutcome:
          "End-to-end executable reproduction script.",
        acceptanceCriteria:
          "`bash reproduce.sh --quick` runs cleanly from a fresh state and outputs summary tables.",
        difficulty: "Core",
      },
      {
        id: "p14-t15",
        stepNumber: 15,
        title: "Author the complete Research Reproduction Technical Report (`PAPER_REPORT.md`)",
        explanation:
          "Structure your report like a clean ML conference workshop paper: Abstract, Paper Summary & Equations, Experimental Setup & Parity Controls, Multi-Seed Results, Ablation Study, Stress-Test & Limitations, and Reproducibility Guide.",
        instructions:
          "Write `PAPER_REPORT.md` embedding your statistical tables, generated figures, and candid discussion of where your scaled-down findings agreed with or diverged from the original paper.",
        expectedOutcome:
          "Publication-grade technical research report.",
        acceptanceCriteria:
          "`PAPER_REPORT.md` contains all 6 sections, multi-seed `mean ± std` tables, embedded figures, and limitations analysis.",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "`verify_parity.py` confirms baseline and experimental models match parameter counts within `< 0.5%` and receive identical mini-batch sequences per seed.",
      "Both baseline and proposed methods are evaluated across at least 3 random seeds (`seed=42, 43, 44`) with reported `mean ± std` metrics.",
      "Repository includes a multi-row ablation study and a stress-regime test.",
      "`PAPER_REPORT.md` and `reproduce.sh` provide a complete, self-contained, reproducible research package.",
    ],
    testingGuide: {
      summary:
        "Verify parameter and data-order parity, mathematical invariants of the reproduced mechanism, and deterministic seed reproducibility.",
      testCases: [
        {
          title: "Iso-Parameter & Data-Order Parity Test",
          purpose:
            "Ensure experimental differences cannot be caused by accidental parameter bloat or different batch ordering.",
          verificationSteps:
            "Run `pytest tests/test_parity.py` comparing parameter counts and first-10-batch token IDs of baseline vs. proposed configs at `seed=42`.",
          expectedResult: "Parameter delta `< 0.5%` and batch token IDs match 100%.",
        },
        {
          title: "Deterministic Seed Reproducibility Test",
          purpose:
            "Confirm that two runs with `seed=42` produce identical loss trajectories.",
          verificationSteps:
            "Run 20 training steps twice with `seed=42` on the same device and compare logged losses.",
          expectedResult: "Step losses match within `1e-6`.",
        },
        {
          title: "Statistical Aggregator Verification",
          purpose:
            "Ensure `analyze_results.py` computes sample mean and standard deviation accurately.",
          verificationSteps:
            "Run `python scripts/analyze_results.py` on synthetic seed logs and verify computed `mean ± std`.",
          expectedResult: "Exact match with `numpy.mean` and `numpy.std(ddof=1)`.",
        },
      ],
      verificationCommand: "pytest tests/test_paper_mechanism.py tests/test_parity.py -v",
    },
    codeExamples: [
      {
        title: "Iso-Parameter SwiGLU vs. GELU FFN & Multi-Seed Statistical Aggregator",
        language: "python",
        purpose:
          "Example showing how to match parameter counts between a 2-matrix GELU FFN and a 3-matrix SwiGLU FFN and compute multi-seed confidence intervals.",
        code: `import numpy as np
import torch.nn as nn
import torch.nn.functional as F

class GELUFFN(nn.Module):
    def __init__(self, d_model: int):
        super().__init__()
        d_ff = 4 * d_model
        self.fc1 = nn.Linear(d_model, d_ff, bias=False)
        self.fc2 = nn.Linear(d_ff, d_model, bias=False)

    def forward(self, x):
        return self.fc2(F.gelu(self.fc1(x)))

class IsoParamSwiGLUFFN(nn.Module):
    def __init__(self, d_model: int, multiple_of: int = 32):
        super().__init__()
        # 2/3 of 4*d_model keeps 3-matrix parameter count equal to 2-matrix 4*d_model
        hidden = int(2 * (4 * d_model) / 3)
        d_ff = multiple_of * ((hidden + multiple_of - 1) // multiple_of)
        self.w_gate = nn.Linear(d_model, d_ff, bias=False)
        self.w_up = nn.Linear(d_model, d_ff, bias=False)
        self.w_down = nn.Linear(d_ff, d_model, bias=False)

    def forward(self, x):
        return self.w_down(F.silu(self.w_gate(x)) * self.w_up(x))

def summarize_seeds(values: list[float]) -> str:
    arr = np.asarray(values, dtype=np.float64)
    return f"{arr.mean():.4f} ± {arr.std(ddof=1):.4f} (n={len(arr)})"`,
      },
    ],
    hints: [
      {
        id: "p14-h1",
        title: "Matching Parameter Count When Comparing SwiGLU vs. GELU",
        category: "Mathematical Formula",
        content:
          "A standard FFN has two matrices of size $d \\times 4d$ ($8d^2$ params). SwiGLU has three matrices (`w_gate`, `w_up`, `w_down`). Setting $d_{\\text{ff}} = \\frac{8}{3} d$ gives $3 \\times d \\times \\frac{8}{3}d = 8d^2$ parameters—ensuring an exact iso-parameter comparison.",
      },
      {
        id: "p14-h2",
        title: "Why Paired Seeds Matter in Small-Scale Reproductions",
        category: "Testing Strategy",
        content:
          "When `baseline_seed42` and `proposed_seed42` use the exact same data-loader RNG stream, both models encounter the exact same sequence of hard and easy training batches at every step—dramatically reducing variance in paired comparisons.",
      },
    ],
    optionalChallenges: [
      {
        id: "p14-oc1",
        title: "Compute-Optimal Scaling Curve Comparison (3 Compute Budgets)",
        description:
          "Compare the baseline and proposed method across 3 token budgets (e.g., 10M, 25M, 50M tokens) to measure the compute multiplier ($C_{\\text{base}} / C_{\\text{proposed}}$ to reach equal validation loss).",
        whatYouLearn:
          "How frontier labs measure architectural efficiency in 'effective compute multipliers' rather than single-point loss deltas.",
      },
      {
        id: "p14-oc2",
        title: "LaTeX Technical Report Compilation",
        description:
          "Typeset your `PAPER_REPORT.md` into a 4–6 page NeurIPS/ICLR-style PDF paper with vector matplotlib figures and BibTeX references.",
        whatYouLearn:
          "Academic and industrial AI research communication standards.",
      },
    ],
    expectedDeliverable:
      "A complete, one-command reproducible AI research repository (`reproduce.sh`) and publication-grade technical report (`PAPER_REPORT.md`) validating an empirical LLM hypothesis across multiple random seeds.",
    deliverablesList: [
      "`PROPOSAL.md` with mathematical paper deconstruction and pre-registered hypothesis",
      "`src/models.py` & `experiments/verify_parity.py` enforcing iso-parameter and data-order parity",
      "Multi-seed (`seed=42, 43, 44`) experiment logs for baseline, proposed method, and ablations",
      "`scripts/analyze_results.py`, `scripts/plot_figures.py`, and `reproduce.sh`",
      "Publication-grade technical report (`PAPER_REPORT.md`) with `mean ± std` tables and figures",
    ],
    learningOutcomes: [
      "Translate mathematical formulations from ML research papers directly into PyTorch code.",
      "Design rigorous iso-parameter and iso-FLOP controlled experiments free of confounding variables.",
      "Evaluate deep learning hypotheses statistically across multiple random seeds and ablation matrices.",
      "Publish transparent, reproducible AI research with candid analysis of limitations and negative results.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "llm-research-reproduction-study",
      recommendedStructure: [
        "PROPOSAL.md",
        "PAPER_REPORT.md",
        "reproduce.sh",
        "src/models.py",
        "src/experiment_runner.py",
        "experiments/verify_parity.py",
        "scripts/analyze_results.py",
        "scripts/plot_figures.py",
        "figures/",
        "tests/test_paper_mechanism.py",
        "tests/test_parity.py",
        "README.md",
      ],
      readmeChecklist: [
        "State the reproduced paper citation and the exact hypothesis tested.",
        "Embed the primary multi-seed validation loss figure (`mean ± std`).",
        "Include the multi-row ablation and parity verification table.",
        "Provide the single-command `bash reproduce.sh` instructions.",
      ],
    },
    relatedResourceIds: [
      "stanford-cs336",
      "attention-is-all-you-need-paper",
      "harvard-annotated-transformer",
      "karpathy-nanogpt",
    ],
    relatedModuleIds: ["p8-m3", "p8-m5"],
    relatedProjectIds: [
      "milestone-10-mini-gpt-architecture",
      "milestone-11-pretrained-mini-llm",
      "milestone-13-llm-inference-server",
    ],
  },
];
