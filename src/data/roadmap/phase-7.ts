import type { RoadmapPhase } from "@/types";

export const PHASE_7_POST_TRAINING_ALIGNMENT: RoadmapPhase = {
  id: "phase-7",
  slug: "phase-7-post-training-alignment",
  phase: 7,
  code: "P7",
  title: "Post-training & Alignment",
  shortDescription:
    "Transform pretrained base language models into helpful, safe, instruction-following assistants using SFT, LoRA/QLoRA, DPO, RLHF, and reasoning RL.",
  purpose:
    "Understand how pretrained language models become useful instruction-following assistants.",
  estimatedWeeks: 8,
  difficulty: "advanced",
  difficultyLabel: "Advanced",
  prerequisites: [
    {
      phaseNumber: 5,
      phaseId: "phase-5",
      label: "Phase 5: Transformers From Scratch",
    },
    {
      phaseNumber: 6,
      phaseId: "phase-6",
      label: "Phase 6: Train Your Own LLM (Base Pretraining & Evaluation)",
    },
  ],
  learningObjectives: [
    "Distinguish clearly between base pretraining, Supervised Fine-Tuning (SFT), preference optimization (DPO/RLHF), and inference-time prompting.",
    "Format multi-turn chat datasets with special control tokens and assistant-only loss masking.",
    "Implement Low-Rank Adaptation (LoRA) from scratch and fine-tune open-weight or custom models using LoRA/QLoRA.",
    "Explain Direct Preference Optimization (DPO), RLHF with PPO, and Group Relative Policy Optimization (GRPO) for verifiable reasoning.",
  ],
  modules: [
    {
      id: "p7-m1",
      code: "7.1",
      title: "Instruction Tuning",
      description:
        "Base vs. instruction-tuned models, chat templates, prompt-response loss masking, Supervised Fine-Tuning (SFT), and LIMA-style dataset quality.",
      estimatedEffort: "1.5 weeks · ~22–28 hours",
      whatYouWillLearn:
        "You will learn why a base pretrained model responds to a question by generating more questions (document continuation), and how Supervised Fine-Tuning (SFT) on curated `(instruction, response)` pairs formatted with chat templates teaches the model to act as a conversational assistant.",
      whyItMatters:
        "Pretraining gives a model broad knowledge and linguistic fluency; SFT teaches it the interaction format of answering user requests directly and stopping at `<|im_end|>`.",
      learningObjectives: [
        "Contrast base document completion with instruction-following behavior.",
        "Format multi-turn dialogues using structured chat templates (`<|im_start|>user ... <|im_end|>`).",
        "Implement assistant-only loss masking (`labels = -100` on user prompt tokens) during SFT.",
      ],
      keyConcepts: [
        "Knowledge acquisition (pretraining) vs format alignment (SFT)",
        "ChatML & special turn delimiters",
        "Assistant-only loss masking (ignore_index=-100)",
        "Teacher forcing on target responses",
        "Quality over quantity (LIMA principle)",
      ],
      topics: [
        {
          id: "p7-m1-pretraining-vs-finetuning",
          title: "Pretraining versus fine-tuning",
          explanation:
            "Pretraining optimizes next-token prediction over billions/trillions of raw web tokens using massive compute to acquire world knowledge; fine-tuning adapts those weights on thousands of curated examples at a smaller learning rate.",
          keyConcepts: ["Compute scale asymmetry", "Distribution shift from raw web to assistant turns", "Lower learning rate in SFT"],
          learningOutcome: "Articulate what capabilities come from pretraining versus post-training.",
        },
        {
          id: "p7-m1-instruction-datasets",
          title: "Instruction datasets",
          explanation:
            "Collections of `(system, user_instruction, assistant_response)` records covering question answering, coding, summarization, and multi-turn dialogue.",
          keyConcepts: ["Single-turn vs multi-turn conversations", "Task diversity", "Verifying license & provenance"],
          learningOutcome: "Inspect and curate JSONL instruction-tuning datasets.",
        },
        {
          id: "p7-m1-chat-templates",
          title: "Chat templates",
          explanation:
            "Deterministic serialization formats (such as ChatML `<|im_start|>role\\ncontent<|im_end|>`) that convert structured message arrays into a single token stream with unambiguous turn boundaries.",
          keyConcepts: ["Role delimiters (system, user, assistant)", "EOS / end-of-turn stopping token", "Avoiding prompt injection across roles"],
          learningOutcome: "Apply and customize chat templates that map message lists to token IDs.",
        },
        {
          id: "p7-m1-prompt-response-formatting",
          title: "Prompt-response formatting",
          explanation:
            "Constructing input `input_ids` and target `labels` where user prompt tokens are masked with `-100` (`ignore_index`) so cross-entropy loss is computed strictly on the assistant's response tokens.",
          keyConcepts: ["Prompt masking with -100", "Computing loss only on assistant completions", "Preventing the model from memorizing user prompts"],
          learningOutcome: "Build an SFT collator that masks user prompt tokens with `-100`.",
          formulaOrCode: "# Mask prompt tokens so loss only trains on assistant response\nlabels = [-100] * len(prompt_ids) + response_ids + [eos_id]",
        },
        {
          id: "p7-m1-sft",
          title: "Supervised Fine-Tuning",
          explanation:
            "Standard autoregressive cross-entropy training over formatted instruction-response trajectories for 1–3 epochs with a small learning rate (e.g., `2e-5`).",
          keyConcepts: ["1–3 epoch schedule", "Low learning rate to preserve pretrained weights", "Packing vs padding SFT examples"],
          learningOutcome: "Run a complete Supervised Fine-Tuning loop and compare completions before vs. after SFT.",
        },
        {
          id: "p7-m1-teacher-forcing-sft",
          title: "Teacher forcing",
          explanation:
            "During SFT, the model is conditioned on the ground-truth prefix at every token position of the assistant's target answer, enabling parallel loss calculation in a single forward pass.",
          keyConcepts: ["Parallel target token conditioning", "Exposure bias at inference time"],
          learningOutcome: "Explain how teacher forcing enables fast parallel SFT training.",
        },
        {
          id: "p7-m1-dataset-quality",
          title: "Dataset quality",
          explanation:
            "A few thousand carefully written, accurate, and well-formatted demonstrations consistently outperform 100,000 noisy or contradictory examples during SFT.",
          keyConcepts: ["LIMA (Less Is More for Alignment)", "Formatting consistency", "Filtering incorrect or verbose completions"],
          learningOutcome: "Audit and filter an instruction dataset for accuracy, formatting consistency, and diversity.",
        },
      ],
      practicalExercises: [
        "Write an SFT data collator that formats multi-turn conversations into ChatML tokens, masks `system` and `user` turns with `-100`, and verifies via a unit test that loss is zero if assistant tokens are predicted perfectly.",
      ],
      completionMilestone:
        "Implement an SFT pipeline with chat templates and prompt-masked cross-entropy loss.",
      recommendedResources: [
        {
          title: "Hugging Face LLM Course — Fine-Tuning & Alignment Chapters",
          provider: "Hugging Face",
          url: "https://huggingface.co/learn/llm-course/chapter1/1",
        },
      ],
    },
    {
      id: "p7-m2",
      code: "7.2",
      title: "Parameter-Efficient Fine-Tuning",
      description:
        "Full fine-tuning memory costs, Low-Rank Adaptation (LoRA), Quantized LoRA (QLoRA), adapters, and memory-performance tradeoffs.",
      estimatedEffort: "2 weeks · ~30–35 hours",
      whatYouWillLearn:
        "You will understand why full fine-tuning of a 7B-parameter model requires >100 GB of VRAM for weights, gradients, and Adam optimizer states, and how Low-Rank Adaptation (LoRA) and 4-bit QLoRA freeze the base weights and train tiny low-rank matrices ($W + \\frac{\\alpha}{r} BA$) on a single consumer GPU.",
      whyItMatters:
        "LoRA and QLoRA democratized LLM post-training—allowing engineers to adapt billion-parameter models on a single 8–16 GB GPU and swap lightweight adapter weights in milliseconds.",
      learningObjectives: [
        "Implement a `LoRALinear` wrapper layer from scratch in PyTorch ($h = W_0 x + \\frac{\\alpha}{r} B(Ax)$).",
        "Calculate the exact VRAM savings of LoRA and 4-bit NormalFloat (NF4) QLoRA compared to full fine-tuning.",
        "Merge trained LoRA weights back into the base linear layer ($W_{\\text{merged}} = W_0 + \\frac{\\alpha}{r} BA$) for zero-overhead inference.",
      ],
      keyConcepts: [
        "Full fine-tuning optimizer state memory bottleneck",
        "Low-Rank Adaptation: ΔW = (α / r) B A",
        "Zero-initialization of B (identity start)",
        "4-bit NF4 quantization & double quantization (QLoRA)",
        "Weight merging for zero-latency inference",
      ],
      topics: [
        {
          id: "p7-m2-full-finetuning",
          title: "Full fine-tuning",
          explanation:
            "Updating 100% of pretrained weights requires storing FP16/BF16 weights (2B/param), gradients (2B/param), and FP32 master weights + Adam $m, v$ states (12B/param) = ~16 bytes per parameter before activations.",
          keyConcepts: ["16 bytes/param memory breakdown", "High expressivity", "Risk of catastrophic forgetting"],
          learningOutcome: "Calculate the minimum GPU memory required for full fine-tuning of any $N$-parameter model.",
        },
        {
          id: "p7-m2-lora",
          title: "LoRA",
          explanation:
            "Freezes pretrained weight $W_0 \\in \\mathbb{R}^{d_{\\text{out}} \\times d_{\\text{in}}}$ and injects a trainable low-rank update $\\Delta W = \\frac{\\alpha}{r} B A$ where $A \\in \\mathbb{R}^{r \\times d_{\\text{in}}}$, $B \\in \\mathbb{R}^{d_{\\text{out}} \\times r}$, and rank $r \\ll \\min(d_{\\text{in}}, d_{\\text{out}})$ (e.g., $r = 8$ or $16$).",
          keyConcepts: ["Frozen W_0 + trainable B @ A", "A initialized Gaussian, B initialized to 0", "Scaling factor α / r", "Linear weight merging"],
          learningOutcome: "Implement `LoRALinear(nn.Module)` from scratch in 25 lines of PyTorch and verify $\\Delta W = 0$ at step 0.",
          formulaOrCode: "# LoRA forward pass: base frozen projection + low-rank adapter\nout = F.linear(x, self.weight, self.bias) + (x @ self.lora_A.T @ self.lora_B.T) * (self.alpha / self.r)",
        },
        {
          id: "p7-m2-qlora",
          title: "QLoRA",
          explanation:
            "Stores the frozen base model weights in 4-bit NormalFloat (`NF4`) data type with paged optimizers, dequantizing to BF16 on the fly during matrix multiplication while computing gradients only for BF16 LoRA adapters.",
          keyConcepts: ["4-bit NormalFloat (NF4)", "Double quantization of scale constants", "On-the-fly BF16 dequantization"],
          learningOutcome: "Explain how QLoRA cuts base weight memory by 4× without degrading adapter training precision.",
        },
        {
          id: "p7-m2-adapters",
          title: "Adapters",
          explanation:
            "Earlier bottleneck modules inserted sequentially after attention/FFN layers, contrasted with LoRA's parallel low-rank matrices that can be algebraically merged into $W_0$ with zero inference latency overhead.",
          keyConcepts: ["Sequential bottleneck adapters vs parallel LoRA", "Zero inference overhead after merging LoRA"],
          learningOutcome: "Explain why parallel LoRA superseded sequential adapter layers for LLM deployment.",
        },
        {
          id: "p7-m2-quantized-finetuning",
          title: "Quantized fine-tuning",
          explanation:
            "Why you cannot directly update 4-bit integer weights with tiny gradient steps (due to coarse quantization buckets), and why attaching higher-precision LoRA adapters solves this.",
          keyConcepts: ["Discrete quantization grid", "High-precision adapter gradients"],
          learningOutcome: "Configure a quantized base model with trainable BF16/FP16 LoRA adapters.",
        },
        {
          id: "p7-m2-memory-performance-tradeoffs",
          title: "Memory-performance tradeoffs",
          explanation:
            "Choosing which linear layers to target with LoRA (applying LoRA to all attention + FFN projections `q_proj, k_proj, v_proj, o_proj, up_proj, gate_proj, down_proj` matches full fine-tuning much closer than `q_proj, v_proj` alone) and selecting rank $r$.",
          keyConcepts: ["Target modules (Attention + MLP)", "Rank r selection (8, 16, 32, 64)", "VRAM vs downstream task performance"],
          learningOutcome: "Select optimal LoRA target modules and rank $r$ for a given task and VRAM budget.",
        },
      ],
      practicalExercises: [
        "Implement `LoRALinear` in PyTorch, inject it into your Phase 6 `MyLLM v1` (or an open small model), verify trainable parameters are <2% of total parameters, and write a `merge_and_unload()` method.",
      ],
      completionMilestone:
        "Implement LoRA from scratch and fine-tune a language model into an instruction-following assistant (Milestone #12).",
    },
    {
      id: "p7-m3",
      code: "7.3",
      title: "Preference Optimization",
      description:
        "Human preference datasets, Bradley-Terry reward modeling, RLHF with PPO, Direct Preference Optimization (DPO), and Group Relative Policy Optimization (GRPO).",
      estimatedEffort: "2 weeks · ~30–35 hours",
      whatYouWillLearn:
        "You will understand how post-SFT models are aligned with human preferences using comparative `(prompt, chosen, rejected)` triples—comparing the classical two-stage RLHF pipeline (Reward Model + PPO) with closed-form Direct Preference Optimization (DPO) and critic-free Group Relative Policy Optimization (GRPO).",
      whyItMatters:
        "SFT teaches a model what possible responses look like; preference optimization (DPO / RLHF) teaches it to strongly prefer helpful, accurate, and well-reasoned responses over plausible-sounding but flawed ones.",
      learningObjectives: [
        "Explain why comparative human judgments (`A is better than B`) are more reliable than absolute scalar scores.",
        "Derive and implement the Bradley-Terry Reward Model loss and the Direct Preference Optimization (DPO) loss in PyTorch.",
        "Compare the four-model RLHF-PPO loop against two-model DPO and critic-free GRPO.",
      ],
      keyConcepts: [
        "Preference triples (prompt x, chosen y_w, rejected y_l)",
        "Bradley-Terry pairwise reward objective",
        "RLHF + PPO with KL divergence penalty",
        "Direct Preference Optimization (DPO)",
        "Group Relative Policy Optimization (GRPO)",
      ],
      topics: [
        {
          id: "p7-m3-preference-datasets",
          title: "Human preference datasets",
          explanation:
            "Each training record contains a prompt $x$, a preferred completion $y_w$ (winner), and a dispreferred completion $y_l$ (loser) judged by humans or verified graders.",
          keyConcepts: ["(x, y_chosen, y_rejected) triples", "Inter-annotator agreement", "Length bias in human judgments"],
          learningOutcome: "Prepare and inspect pairwise preference datasets for alignment training.",
        },
        {
          id: "p7-m3-reward-models",
          title: "Reward models",
          explanation:
            "Replaces an LLM's vocabulary head with a scalar linear head $r_\\phi(x, y) \\in \\mathbb{R}$, trained via the Bradley-Terry loss $-\\log \\sigma(r_\\phi(x, y_w) - r_\\phi(x, y_l))$ so preferred completions score higher.",
          keyConcepts: ["Scalar reward head", "Pairwise log-sigmoid loss -F.logsigmoid(r_w - r_l)"],
          learningOutcome: "Implement the Bradley-Terry pairwise reward loss in PyTorch.",
        },
        {
          id: "p7-m3-preference-learning",
          title: "Preference learning",
          explanation:
            "Maximizing expected reward while keeping the policy $\\pi_\\theta$ close to the frozen SFT reference policy $\\pi_{\\text{ref}}$ via a KL-divergence penalty $\\beta D_{\\text{KL}}(\\pi_\\theta \\| \\pi_{\\text{ref}})$ so the model does not collapse into gibberish.",
          keyConcepts: ["KL-constrained reward maximization", "Reference model π_ref anchor", "Controlling β"],
          learningOutcome: "Explain why a KL penalty against $\\pi_{\\text{ref}}$ is mandatory during preference optimization.",
        },
        {
          id: "p7-m3-dpo",
          title: "DPO",
          explanation:
            "Direct Preference Optimization algebraically solves the KL-constrained reward objective in closed form, training the policy directly on `(x, y_w, y_l)` triples without training a separate reward model or running online RL sampling.",
          keyConcepts: ["Implicit reward β log(π_θ(y|x) / π_ref(y|x))", "Offline stability", "Two-model memory footprint"],
          learningOutcome: "Implement the exact DPO loss function in 10 lines of PyTorch.",
          formulaOrCode: "logits = beta * ((pi_w_logp - ref_w_logp) - (pi_l_logp - ref_l_logp))\nloss = -F.logsigmoid(logits).mean()",
        },
        {
          id: "p7-m3-rlhf-overview",
          title: "RLHF overview",
          explanation:
            "The classical 3-stage alignment pipeline: (1) SFT on demonstrations, (2) Reward Model training on comparisons, and (3) online policy optimization against the Reward Model.",
          keyConcepts: ["SFT -> Reward Model -> Online RL", "Online exploration of model's own generations"],
          learningOutcome: "Contrast offline preference optimization (DPO) with online RLHF.",
        },
        {
          id: "p7-m3-ppo-fundamentals",
          title: "PPO fundamentals",
          explanation:
            "Proximal Policy Optimization clips the probability ratio $\\frac{\\pi_\\theta(y_t \\mid x, y_{<t})}{\\pi_{\\text{old}}(y_t \\mid x, y_{<t})}$ within $[1-\\epsilon, 1+\\epsilon]$ to prevent destructive policy updates, requiring 4 models in memory (Policy, Reference, Reward, Value Critic).",
          keyConcepts: ["Clipped surrogate objective", "Generalized Advantage Estimation (GAE)", "4-model VRAM overhead"],
          learningOutcome: "Explain the role of each of the 4 models in an RLHF-PPO training setup.",
        },
        {
          id: "p7-m3-grpo",
          title: "GRPO concepts",
          explanation:
            "Group Relative Policy Optimization eliminates the expensive Value Critic network by sampling a group of $G$ completions $\{y_1, \\dots, y_G\}$ per prompt and normalizing their rewards relative to the group mean and standard deviation: $A_i = \\frac{r_i - \\text{mean}(r)}{\\text{std}(r)}$.",
          keyConcepts: ["Critic-free advantage estimation", "Group sampling G completions per prompt", "Group z-score reward normalization"],
          learningOutcome: "Compute group-relative advantages from a batch of sampled completions and rewards.",
        },
      ],
      practicalExercises: [
        "Implement the DPO loss function in PyTorch, run preference alignment on a small model using a curated `(prompt, chosen, rejected)` dataset, and verify implicit reward margins increase on held-out pairs.",
      ],
      completionMilestone:
        "Implement DPO preference optimization and explain the mechanics of RLHF (PPO and GRPO).",
    },
    {
      id: "p7-m4",
      code: "7.4",
      title: "Alignment and Safety",
      description:
        "Safe behavior, harmful output evaluation, calibrated refusals, bias mitigation, instruction hierarchy, red teaming, reward hacking, catastrophic forgetting, and calibration.",
      estimatedEffort: "1.5 weeks · ~20–24 hours",
      whatYouWillLearn:
        "You will examine the practical engineering challenges of deploying aligned models: balancing helpfulness with calibrated refusals, enforcing the system-over-user instruction hierarchy against prompt injection, diagnosing reward hacking (such as sycophancy and length inflation), and preventing catastrophic forgetting.",
      whyItMatters:
        "Poorly executed alignment either makes a model uselessly over-refuse benign requests, become sycophantic/verbose to game reward models, or forget core coding and math capabilities learned during pretraining.",
      learningObjectives: [
        "Explain the instruction hierarchy (`System > Developer > User > Untrusted Tool/Web Output`).",
        "Identify reward hacking failure modes such as length bias, sycophancy, and format gaming.",
        "Measure catastrophic forgetting (alignment tax) and predictive calibration before and after post-training.",
      ],
      keyConcepts: [
        "Helpfulness vs harmlessness calibration",
        "Instruction hierarchy & prompt injection defense",
        "Reward hacking (length bias & sycophancy)",
        "Catastrophic forgetting & replay mixes",
        "Confidence calibration",
      ],
      topics: [
        {
          id: "p7-m4-safe-behavior",
          title: "Safe model behavior",
          explanation:
            "Defining clear behavioral specifications for what the assistant should fulfill helpfully, what requires objective neutral framing, and what must be declined.",
          keyConcepts: ["Model specifications", "Helpfulness-harmlessness Pareto frontier"],
          learningOutcome: "Design behavioral specifications for an instruction-tuned assistant.",
        },
        {
          id: "p7-m4-harmful-output-eval",
          title: "Evaluation of harmful outputs",
          explanation:
            "Testing models on structured safety benchmarks and classifier rubrics to measure attack success rates and unsafe completion rates.",
          keyConcepts: ["Automated rubric evaluation", "False positive vs false negative rates"],
          learningOutcome: "Evaluate aligned models across both safety and helpfulness test suites.",
        },
        {
          id: "p7-m4-refusals",
          title: "Refusals",
          explanation:
            "Training models to decline genuinely unsafe requests concisely without preachy lecturing, while minimizing false-positive 'over-refusals' on benign prompts containing sensitive keywords.",
          keyConcepts: ["Avoiding preachy tone", "Measuring false-refusal rates on benign prompts"],
          learningOutcome: "Balance refusal boundaries without degrading benign request helpfulness.",
        },
        {
          id: "p7-m4-bias",
          title: "Bias",
          explanation:
            "Pretraining corpora reflect historical and demographic biases on the internet; evaluation probes measure stereotypical associations and asymmetric sentiment across groups.",
          keyConcepts: ["Corpus representation bias", "Paired counterfactual evaluation probes"],
          learningOutcome: "Design counterfactual prompt pairs to audit model output consistency.",
        },
        {
          id: "p7-m4-instruction-hierarchy",
          title: "Instruction hierarchy",
          explanation:
            "Teaching models to prioritize `System` instructions over `User` messages, and `User` messages over untrusted third-party text retrieved from documents or tools (mitigating indirect prompt injection).",
          keyConcepts: ["System > User > Tool privilege levels", "Indirect prompt injection defense"],
          learningOutcome: "Test and train models on conflicting system-vs-user instruction hierarchy examples.",
        },
        {
          id: "p7-m4-red-teaming",
          title: "Red teaming",
          explanation:
            "Systematically probing a model with adversarial prompts, roleplay framing, or encoding tricks to uncover failure modes prior to deployment.",
          keyConcepts: ["Adversarial prompt probing", "Iterative red-team data collection"],
          learningOutcome: "Conduct a structured red-teaming audit and fold discovered failures into training data.",
        },
        {
          id: "p7-m4-reward-hacking",
          title: "Reward hacking",
          explanation:
            "Goodhart's Law in RLHF: when a policy optimizes an imperfect proxy reward model too aggressively, it discovers exploits—like generating excessively long bulleted lists (length bias) or flattering the user's misconceptions (sycophancy).",
          keyConcepts: ["Goodhart's Law", "Length bias & verbosity inflation", "Sycophancy"],
          learningOutcome: "Detect reward hacking by monitoring response length, KL divergence, and held-out gold evaluations.",
        },
        {
          id: "p7-m4-catastrophic-forgetting",
          title: "Catastrophic forgetting",
          explanation:
            "Aggressive fine-tuning on a narrow task overwrites general pretraining knowledge; mitigated via LoRA, low learning rates, KL penalties, and mixing 5–10% pretraining/general data into SFT.",
          keyConcepts: ["Alignment tax", "Data replay mixtures", "Parameter-efficient constraints"],
          learningOutcome: "Prevent catastrophic forgetting during domain or instruction fine-tuning.",
        },
        {
          id: "p7-m4-calibration",
          title: "Calibration",
          explanation:
            "A model is calibrated if predictions assigned 80% probability are correct ~80% of the time; aggressive RLHF often sharpens output entropy and makes models overconfident.",
          keyConcepts: ["Expected Calibration Error (ECE)", "RLHF entropy sharpening effect"],
          learningOutcome: "Measure token and answer confidence calibration before and after RLHF/DPO.",
        },
      ],
      practicalExercises: [
        "Compare a base model, an SFT model, and a DPO model on a 30-prompt evaluation suite testing helpfulness, conciseness (length bias), and instruction hierarchy compliance.",
      ],
      completionMilestone:
        "Audit an aligned model for instruction hierarchy compliance, length bias, and catastrophic forgetting.",
    },
    {
      id: "p7-m5",
      code: "7.5",
      title: "Reasoning Training",
      description:
        "Verifiable rewards (RLVR), outcome vs. process supervision, chain-of-thought reasoning traces, reinforcement learning for reasoning, and evaluation pitfalls.",
      estimatedEffort: "1 week · ~15–18 hours",
      whatYouWillLearn:
        "You will understand how modern reasoning models are trained: replacing subjective human preference models with programmatic Verifiable Rewards (unit tests for code, symbolic checkers for math) and using RL (such as GRPO) so the model learns to allocate test-time compute via intermediate reasoning traces.",
      whyItMatters:
        "Reinforcement Learning with Verifiable Rewards (RLVR) is the breakthrough behind modern reasoning LLMs that self-correct, verify intermediate hypotheses, and solve complex math and software engineering problems.",
      learningObjectives: [
        "Distinguish subjective preference rewards from deterministic Verifiable Rewards (RLVR).",
        "Compare Outcome Supervision (grading only the final answer) with Process Supervision (grading intermediate steps).",
        "Understand how reinforcement learning over reasoning traces induces self-verification and backtracking behaviors.",
      ],
      keyConcepts: [
        "Reinforcement Learning with Verifiable Rewards (RLVR)",
        "Outcome Reward Models (ORM) vs Process Reward Models (PRM)",
        "<think> ... </think> reasoning traces",
        "Test-time compute scaling",
        "Pass@1 vs Pass@k evaluation pitfalls",
      ],
      topics: [
        {
          id: "p7-m5-verifiable-rewards",
          title: "Verifiable rewards",
          explanation:
            "In mathematics, logic puzzles, and code generation, correctness can be checked deterministically by a compiler, unit-test suite, or symbolic parser—providing a noise-free binary reward $r \\in \\{0, 1\\}$ immune to reward hacking.",
          keyConcepts: ["Deterministic programmatic graders", "Zero reward-model exploitation", "Format + correctness reward shaping"],
          learningOutcome: "Write a deterministic verifiable reward function for arithmetic or code tasks.",
        },
        {
          id: "p7-m5-outcome-supervision",
          title: "Outcome supervision",
          explanation:
            "Rewarding the entire generated trajectory solely based on whether the final extracted answer matches ground truth—simple to scale without step-level human labels.",
          keyConcepts: ["Final-answer grading", "Credit assignment across long traces"],
          learningOutcome: "Implement an outcome-based answer extractor and grader.",
        },
        {
          id: "p7-m5-process-supervision",
          title: "Process supervision",
          explanation:
            "Scoring each individual intermediate reasoning step to provide denser credit assignment and penalize 'right answer for the wrong reason' flukes.",
          keyConcepts: ["Step-level verification", "Process Reward Models (PRMs)"],
          learningOutcome: "Compare the labeling cost and credit-assignment precision of Outcome vs. Process supervision.",
        },
        {
          id: "p7-m5-reasoning-traces",
          title: "Reasoning traces",
          explanation:
            "Generating explicit intermediate scratchpad tokens (e.g., inside `<think>...</think>`) gives a Transformer additional serial computation depth proportional to the number of generated thinking tokens.",
          keyConcepts: ["Scratchpad tokens as serial compute", "Self-correction & backtracking emergence"],
          learningOutcome: "Explain why generating intermediate tokens increases the computational expressivity of a fixed-depth Transformer.",
        },
        {
          id: "p7-m5-rl-for-reasoning",
          title: "Reinforcement learning for reasoning",
          explanation:
            "Sampling multiple reasoning rollouts per problem and applying GRPO/PPO with verifiable rewards reinforces reasoning strategies that reliably reach verified solutions.",
          keyConcepts: ["Rollout sampling", "GRPO advantage updates on verifiable tasks", "Length & format stability"],
          learningOutcome: "Trace a complete RLVR (GRPO) training step on a mathematical reasoning dataset.",
        },
        {
          id: "p7-m5-eval-limitations",
          title: "Evaluation limitations",
          explanation:
            "Evaluating reasoning models requires careful extraction normalization, checking multiple rollouts (`Pass@k`), and guarding against benchmark memorization where models recite memorized solutions but fail when numbers are slightly changed.",
          keyConcepts: ["Pass@1 vs Pass@k", "Counterfactual number/variable perturbation", "Parser fragility"],
          learningOutcome: "Evaluate reasoning models using `Pass@k` and counterfactual problem perturbations.",
        },
      ],
      practicalExercises: [
        "Implement a miniature GRPO + Verifiable Reward loop on a synthetic arithmetic/algebra task where a small model generates `<think>` steps and `<answer>` tags.",
      ],
      completionMilestone:
        "Explain how verifiable rewards and RL over reasoning traces train models to solve multi-step problems.",
    },
  ],
  assignments: [
    "Format an instruction dataset with ChatML templates and assistant-only loss masking (-100 on prompt tokens).",
    "Implement LoRA from scratch in PyTorch and fine-tune an open-weight model (or your Phase 6 model) into an instruction-following assistant.",
    "Evaluate the model before and after Supervised Fine-Tuning (SFT) on a structured prompt benchmark.",
    "Implement Direct Preference Optimization (DPO) loss and run preference alignment on a small pairwise dataset.",
  ],
  primaryProjects: [
    {
      id: "milestone-12-instruction-tuned-assistant",
      milestoneNumber: 12,
      title: "Instruction-Tuned Assistant",
      phase: 7,
      shortDescription:
        "Transform a base pretrained language model into a multi-turn instruction-following assistant using custom ChatML formatting, assistant-masked Supervised Fine-Tuning (SFT), Low-Rank Adaptation (LoRA), and Direct Preference Optimization (DPO).",
      skillsPracticed: [
        "ChatML template serialization & prompt loss masking",
        "Custom LoRA adapter implementation & merging",
        "Supervised Fine-Tuning (SFT) & DPO alignment",
        "Before-and-after SFT/DPO qualitative & rubric evaluation",
      ],
      expectedOutcome:
        "An instruction-tuned, preference-aligned assistant model with quantitative before/after evaluation comparisons.",
      difficulty: "advanced",
      difficultyLabel: "Advanced",
    },
  ],
  supplementaryProjects: [
    {
      title: "LoRA Rank & Target-Module Ablation Study",
      description:
        "Empirical comparison of LoRA ranks (r=4, 16, 64) and attention-only vs. all-linear target modules on memory usage and validation loss.",
    },
    {
      title: "Verifiable Reasoning Mini-Lab (GRPO)",
      description:
        "Small-scale reinforcement learning experiment using programmatic verifiable rewards on structured math word problems.",
    },
  ],
  completionCriteriaSummary:
    "Understand the distinction between pretraining, instruction tuning, preference optimization, and inference-time prompting.",
  completionChecklist: [
    {
      id: "p7-check-concepts",
      question: "Can you clearly distinguish pretraining, SFT, preference optimization (DPO/RLHF), and inference-time prompting?",
      detail: "Explaining the objective function, data format, and compute scale of each stage.",
    },
    {
      id: "p7-check-exercises",
      question: "Have you completed Milestone #12 (Instruction-Tuned Assistant) and evaluated the model before and after SFT?",
      detail: "Demonstrating clear improvements in instruction following and turn stopping.",
    },
    {
      id: "p7-check-implementation",
      question: "Can you implement a LoRA linear layer (W_0 x + (α/r) BAx) and the DPO loss function in PyTorch?",
      detail: "Including why B is initialized to zero and why prompt tokens are masked with -100 in SFT.",
    },
    {
      id: "p7-check-testing",
      question: "Have you tested your fine-tuned model for reward hacking (verbosity/sycophancy) and catastrophic forgetting?",
      detail: "Comparing output lengths and base knowledge retention.",
    },
    {
      id: "p7-check-limitations",
      question: "Can you explain why SFT and RLHF cannot reliably inject massive amounts of brand-new factual knowledge that was absent in pretraining?",
      detail: "Understanding the capabilities boundary of post-training.",
    },
  ],
};
