import type { RoadmapPhase } from "@/types";

export const PHASE_8_ADVANCED_SYSTEMS_RESEARCH: RoadmapPhase = {
  id: "phase-8",
  slug: "phase-8-advanced-llm-systems-research",
  phase: 8,
  code: "P8",
  title: "Advanced LLM Systems & Research",
  shortDescription:
    "Master GPU kernel architecture, distributed multi-GPU training, Mixture-of-Experts and GQA architectures, high-throughput inference serving, and rigorous AI research methodology.",
  purpose:
    "Understand large-scale training systems, model optimization, inference infrastructure, and experimental research.",
  estimatedWeeks: 16,
  difficulty: "research",
  difficultyLabel: "Advanced → Research",
  prerequisites: [
    {
      phaseNumber: 5,
      phaseId: "phase-5",
      label: "Phase 5: Transformers From Scratch",
    },
    {
      phaseNumber: 6,
      phaseId: "phase-6",
      label: "Phase 6: Train Your Own LLM",
    },
    {
      phaseNumber: 7,
      phaseId: "phase-7",
      label: "Phase 7: Post-training & Alignment",
    },
  ],
  learningObjectives: [
    "Understand GPU memory hierarchies (HBM vs. SRAM), arithmetic intensity, kernel fusion, FlashAttention, and Triton kernels.",
    "Understand distributed training strategies across multiple GPUs/nodes: DDP, FSDP / ZeRO, Tensor Parallelism, and Pipeline Parallelism.",
    "Analyze frontier architectures including Grouped-Query Attention (GQA), Mixture of Experts (MoE), long-context RoPE scaling, Multimodal VLM/Audio models, and Diffusion.",
    "Build a high-throughput LLM Inference Server (Milestone #13) and execute a rigorous Research Reproduction study (Milestone #14).",
  ],
  modules: [
    {
      id: "p8-m1",
      code: "8.1",
      title: "GPU Computing",
      description:
        "GPU hardware architecture, CUDA execution hierarchy, HBM vs. SRAM memory bandwidth, kernel fusion, FP16/BF16, activation checkpointing, FlashAttention, Triton, and PyTorch Profiler.",
      estimatedEffort: "3.5 weeks · ~50–60 hours",
      whatYouWillLearn:
        "You will understand how modern GPUs execute tensor operations: why memory bandwidth between HBM (VRAM) and on-chip SRAM—not raw FLOPs—is the bottleneck of naive attention and normalization layers, and how kernel fusion, `torch.compile`, Triton, and FlashAttention eliminate redundant HBM round-trips.",
      whyItMatters:
        "A naive PyTorch Transformer utilizes less than 20% of a GPU's peak FLOPs because it repeatedly reads and writes large intermediate tensors to slow HBM memory. Systems-aware engineers achieve 3×–5× speedups on the exact same hardware.",
      learningObjectives: [
        "Explain the GPU memory hierarchy (Registers, Shared Memory / SRAM, L2 Cache, HBM) and the Roofline Model (compute-bound vs. memory-bandwidth-bound).",
        "Explain how FlashAttention tiles $Q, K, V$ blocks in SRAM using online softmax to compute exact attention in $O(T)$ HBM memory instead of $O(T^2)$.",
        "Use `torch.profiler`, `torch.compile`, activation checkpointing, and Triton to optimize Transformer workloads.",
      ],
      keyConcepts: [
        "SMs, Tensor Cores & HBM vs SRAM bandwidth",
        "Roofline model & arithmetic intensity (FLOPs / Byte)",
        "Kernel fusion & torch.compile",
        "FlashAttention online softmax tiling",
        "Activation (gradient) checkpointing",
      ],
      topics: [
        {
          id: "p8-m1-gpu-architecture",
          title: "GPU architecture",
          explanation:
            "GPUs consist of dozens of Streaming Multiprocessors (SMs) containing specialized Tensor Cores for matrix multiply-accumulate ($D = A B + C$) alongside high-bandwidth off-chip HBM memory.",
          keyConcepts: ["Streaming Multiprocessors (SMs)", "Tensor Cores vs CUDA cores", "SIMT warp execution (32 threads)"],
          learningOutcome: "Relate matrix dimensions (multiples of 64/128) to Tensor Core hardware utilization.",
        },
        {
          id: "p8-m1-cuda-fundamentals",
          title: "CUDA fundamentals",
          explanation:
            "The parallel programming model organizing threads into warps, thread blocks (scheduled onto a single SM), and grids, indexing tensors via `blockIdx.x * blockDim.x + threadIdx.x`.",
          keyConcepts: ["Grid -> Block -> Thread hierarchy", "Asynchronous kernel launches", "Memory coalescing"],
          learningOutcome: "Explain how a parallel GPU kernel maps thread blocks across tensor dimensions.",
        },
        {
          id: "p8-m1-gpu-memory-hierarchy",
          title: "GPU memory hierarchy",
          explanation:
            "Off-chip HBM is large (16–80+ GB) but relatively slow (~1–3 TB/s), whereas on-chip SRAM / Shared Memory is tiny (~20–50 MB across SMs) but ~10× faster (~19+ TB/s).",
          keyConcepts: ["HBM capacity vs SRAM bandwidth", "Arithmetic intensity (FLOPs per byte transferred)", "Memory-bound elementwise ops vs compute-bound matmuls"],
          learningOutcome: "Classify Transformer operations as compute-bound or memory-bandwidth-bound using the Roofline model.",
        },
        {
          id: "p8-m1-gpu-kernels",
          title: "GPU kernels",
          explanation:
            "Every un-fused PyTorch operation (`x * 0.5`, `torch.tanh`, `+`) launches a separate GPU kernel that reads inputs from HBM, computes in registers, and writes outputs back to HBM.",
          keyConcepts: ["Kernel launch overhead", "HBM read/write round-trips"],
          learningOutcome: "Identify redundant HBM memory round-trips in eager PyTorch code.",
        },
        {
          id: "p8-m1-kernel-fusion",
          title: "Kernel fusion",
          explanation:
            "Combining sequences of element-wise and reduction operations (like `RMSNorm` or `GeLU`) into a single GPU kernel so intermediate values stay in ultra-fast registers/SRAM (`torch.compile`).",
          keyConcepts: ["Operator fusion", "Single HBM read + single HBM write", "torch.compile Inductor backend"],
          learningOutcome: "Apply `torch.compile` and benchmark the speedup on RMSNorm and SwiGLU layers.",
        },
        {
          id: "p8-m1-mixed-precision-gpu",
          title: "Mixed precision",
          explanation:
            "Performing matrix multiplications in 16-bit precision on Tensor Cores while accumulating products and maintaining master weights in FP32.",
          keyConcepts: ["Tensor Core throughput multiplier", "FP32 master weight accumulation"],
          learningOutcome: "Calculate the memory and throughput gains of mixed-precision training.",
        },
        {
          id: "p8-m1-fp16",
          title: "FP16",
          explanation:
            "IEEE 16-bit float (1 sign, 5 exponent, 10 mantissa bits): high precision but narrow dynamic range (max value `65,504`), requiring dynamic loss scaling (`GradScaler`) to prevent small gradients from underflowing to zero.",
          keyConcepts: ["5 exponent bits (narrow range)", "Dynamic loss scaling (GradScaler)", "Overflow above 65,504"],
          learningOutcome: "Configure FP16 mixed precision with `GradScaler` and detect overflow step skips.",
        },
        {
          id: "p8-m1-bf16",
          title: "BF16",
          explanation:
            "Brain Float 16 (1 sign, 8 exponent, 7 mantissa bits): matches FP32's exact 8-bit exponent dynamic range, eliminating `GradScaler` and overflow headaches during LLM pretraining.",
          keyConcepts: ["8 exponent bits (same range as FP32)", "Drop-in stability for LLM pretraining"],
          learningOutcome: "Explain why BF16 is preferred over FP16 for Large Language Model training.",
        },
        {
          id: "p8-m1-gradient-checkpointing",
          title: "Gradient checkpointing",
          explanation:
            "Activation checkpointing discards intermediate sublayer activations during the forward pass and recomputes them on the fly during the backward pass—trading ~25–33% extra compute to reduce activation VRAM by 4×–8×.",
          keyConcepts: ["Compute-for-memory tradeoff", "torch.utils.checkpoint", "Enabling longer context lengths & larger batches"],
          learningOutcome: "Enable activation checkpointing in your Transformer and measure peak VRAM reduction.",
        },
        {
          id: "p8-m1-flashattention",
          title: "FlashAttention",
          explanation:
            "Tiles $Q, K, V$ into SRAM blocks and uses the online softmax rescaling trick to compute exact attention without ever materializing the $O(T^2)$ attention matrix in HBM (`F.scaled_dot_product_attention`).",
          keyConcepts: ["SRAM block tiling", "Online softmax running max & sum", "O(T) memory instead of O(T²)", "Exact (non-approximate) output"],
          learningOutcome: "Explain the online softmax tiling algorithm behind FlashAttention and use `F.scaled_dot_product_attention`.",
        },
        {
          id: "p8-m1-triton",
          title: "Triton",
          explanation:
            "A Python-based GPU kernel language that operates on tile blocks (`tl.load`, `tl.store`, `tl.dot`) rather than individual scalar threads, making custom fused kernels (fused softmax, RMSNorm, cross-entropy) accessible without raw C++ CUDA.",
          keyConcepts: ["Block-level programming model", "tl.program_id & pointer arithmetic", "Writing fused softmax / RMSNorm"],
          learningOutcome: "Read and write a basic block-tiled vector addition or fused row-wise softmax kernel in Triton.",
        },
        {
          id: "p8-m1-pytorch-profiling",
          title: "PyTorch profiling",
          explanation:
            "Using `torch.profiler` and Chrome trace timelines (`trace.json`) to inspect GPU kernel occupancy, CPU launch gaps, and memory allocation lifecycles.",
          keyConcepts: ["torch.profiler.profile", "Identifying CPU-bound gaps between GPU kernels", "Model FLOPs Utilization (MFU)"],
          learningOutcome: "Profile a Transformer training step and compute its Model FLOPs Utilization (MFU).",
        },
      ],
      practicalExercises: [
        "Implement the online single-pass softmax algorithm in Python/NumPy and verify it produces identical probabilities to standard two-pass softmax while updating running max and sum in a single loop.",
        "Benchmark your Phase 5 `MiniGPT` attention module against `F.scaled_dot_product_attention` (FlashAttention) across sequence lengths 256, 1024, and 2048.",
      ],
      completionMilestone:
        "Explain GPU memory hierarchies and FlashAttention online softmax tiling, and profile Transformer MFU.",
    },
    {
      id: "p8-m2",
      code: "8.2",
      title: "Distributed Training",
      description:
        "Scaling training across multiple GPUs and nodes: DDP, FSDP (ZeRO-1/2/3), Tensor Parallelism, Pipeline Parallelism, collective communication primitives, and fault tolerance.",
      estimatedEffort: "3 weeks · ~45–55 hours",
      whatYouWillLearn:
        "You will understand how frontier language models are trained when a single model or batch no longer fits on one GPU: replicating weights with Distributed Data Parallel (DDP), sharding optimizer states, gradients, and weights with FSDP (ZeRO), and splitting individual layers across GPUs via Tensor and Pipeline Parallelism.",
      whyItMatters:
        "Understanding collective communication (`AllReduce`, `AllGather`, `ReduceScatter`) and 3D parallelism (Data + Tensor + Pipeline) is the foundation of modern AI infrastructure engineering.",
      learningObjectives: [
        "Distinguish Data Parallelism (DDP), Fully Sharded Data Parallel (FSDP / ZeRO-1/2/3), Tensor Parallelism, and Pipeline Parallelism.",
        "Explain collective communication primitives (`AllReduce`, `AllGather`, `ReduceScatter`, `Broadcast`) and how `AllReduce` decomposes into `ReduceScatter + AllGather`.",
        "Calculate per-GPU memory consumption under DDP vs. ZeRO-1, ZeRO-2, and ZeRO-3 (FSDP) across $W$ workers.",
      ],
      keyConcepts: [
        "DDP gradient AllReduce overlap",
        "FSDP / ZeRO-1, ZeRO-2, ZeRO-3 state sharding",
        "Megatron-style column & row Tensor Parallelism",
        "Pipeline Parallelism micro-batching (1F1B)",
        "AllReduce = ReduceScatter + AllGather",
      ],
      topics: [
        {
          id: "p8-m2-data-parallelism",
          title: "Data parallelism",
          explanation:
            "Each GPU holds a full copy of the model, processes a distinct shard of the mini-batch, and averages gradients across all GPUs before taking an identical optimizer step.",
          keyConcepts: ["Replicated model weights", "Sharded input batch", "Linear throughput scaling when compute > comm"],
          learningOutcome: "Trace how data parallelism scales effective batch size across $W$ GPUs.",
        },
        {
          id: "p8-m2-ddp",
          title: "Distributed Data Parallel",
          explanation:
            "`torch.nn.parallel.DistributedDataParallel` groups gradients into buckets during `backward()` and overlaps asynchronous `AllReduce` communication with ongoing backward computation of earlier layers.",
          keyConcepts: ["Gradient bucketing", "Computation-communication overlap", "Single-process-per-GPU (torchrun)"],
          learningOutcome: "Write a multi-GPU ready training script using `torch.distributed` and `DDP`.",
        },
        {
          id: "p8-m2-fsdp",
          title: "Fully Sharded Data Parallel",
          explanation:
            "Based on ZeRO: instead of every GPU duplicating all 16 bytes/param of model state, FSDP shards optimizer states (ZeRO-1), gradients (ZeRO-2), and parameters (ZeRO-3) across $W$ GPUs, gathering full layer weights on the fly just before each layer's forward/backward pass.",
          keyConcepts: ["ZeRO-1 (optimizer sharding)", "ZeRO-2 (+ gradient sharding)", "ZeRO-3 / FSDP (+ weight sharding)", "16/W bytes per parameter memory reduction"],
          learningOutcome: "Calculate exact per-GPU memory savings for a 7B model across 8 GPUs under DDP vs. ZeRO-1/2/3.",
        },
        {
          id: "p8-m2-tensor-parallelism",
          title: "Tensor parallelism",
          explanation:
            "Splits individual weight matrices across GPUs within a high-speed NVLink node (Megatron-LM style): splitting the first MLP projection column-wise and the second row-wise requires only a single `AllReduce` per block.",
          keyConcepts: ["Column-parallel followed by row-parallel linear layers", "Splitting attention heads across GPUs", "High intra-node bandwidth (NVLink) requirement"],
          learningOutcome: "Show algebraically how pairing a column-parallel matrix with a row-parallel matrix avoids intermediate communication.",
        },
        {
          id: "p8-m2-pipeline-parallelism",
          title: "Pipeline parallelism",
          explanation:
            "Assigns contiguous groups of Transformer layers (stages) to different GPUs/nodes and splits each mini-batch into micro-batches scheduled via One-Forward-One-Backward (1F1B) to minimize idle 'pipeline bubble' time.",
          keyConcepts: ["Layer-wise stage partitioning", "Pipeline bubble fraction (P-1)/M", "1F1B micro-batch schedule"],
          learningOutcome: "Calculate the pipeline bubble overhead for $P$ stages and $M$ micro-batches.",
        },
        {
          id: "p8-m2-collective-communication",
          title: "Collective communication",
          explanation:
            "NCCL hardware primitives coordinating multi-GPU tensor transfers: `Broadcast`, `Reduce`, `AllGather` (collect shards), `ReduceScatter` (sum and shard), and `AllReduce` (`ReduceScatter` + `AllGather`).",
          keyConcepts: ["AllGather vs ReduceScatter", "Ring AllReduce bandwidth optimality", "NCCL backend"],
          learningOutcome: "Diagram how `AllGather` and `ReduceScatter` operate across 4 GPUs in FSDP.",
        },
        {
          id: "p8-m2-synchronization",
          title: "Synchronization",
          explanation:
            "Avoiding unnecessary `torch.cuda.synchronize()` or `.item()` calls inside the training step loop that stall the CPU and drain the asynchronous GPU command queue.",
          keyConcepts: ["Asynchronous CUDA streams", "Avoiding per-step .item() sync stalls", "Barrier synchronization"],
          learningOutcome: "Eliminate host-device synchronization stalls in PyTorch training loops.",
        },
        {
          id: "p8-m2-memory-optimization",
          title: "Memory optimization",
          explanation:
            "Combining FSDP sharding, selective activation checkpointing, 8-bit/CPU-offloaded optimizer states, and fused cross-entropy kernels to fit large models into limited VRAM.",
          keyConcepts: ["Selective activation checkpointing", "Fused linear + cross-entropy (avoiding B*T*V logit materialization)"],
          learningOutcome: "Diagnose and eliminate peak memory spikes in large-vocabulary LM heads.",
        },
        {
          id: "p8-m2-distributed-checkpoints",
          title: "Distributed checkpoints",
          explanation:
            "Saving and loading sharded state dicts in parallel across ranks (`torch.distributed.checkpoint`) without gathering the entire multi-gigabyte model onto Rank 0's RAM.",
          keyConcepts: ["Sharded checkpoint I/O", "Topology-independent resharding"],
          learningOutcome: "Explain how sharded checkpointing avoids Rank-0 out-of-memory errors.",
        },
        {
          id: "p8-m2-fault-tolerance",
          title: "Fault tolerance",
          explanation:
            "At cluster scale, hardware failures, straggler nodes, and silent data corruption occur regularly—requiring automated health checks, watchdog timeouts, and fast checkpoint recovery.",
          keyConcepts: ["NCCL watchdog timeouts", "Automated elastic restart", "Step-deterministic data loaders"],
          learningOutcome: "Design training loops with deterministic data resumption after mid-epoch restarts.",
        },
      ],
      practicalExercises: [
        "Write a memory calculator script that takes `(params_B, n_gpus, seq_len, micro_batch, d_model, n_layers)` and outputs exact per-GPU VRAM requirements for DDP, ZeRO-1, ZeRO-2, and ZeRO-3.",
      ],
      completionMilestone:
        "Master the principles of DDP, FSDP/ZeRO, Tensor Parallelism, and collective communication.",
    },
    {
      id: "p8-m3",
      code: "8.3",
      title: "Advanced Architectures",
      description:
        "Mixture of Experts (MoE), Grouped-Query Attention (GQA), Multi-Query Attention (MQA), long-context modeling, Multimodal Vision/Audio Transformers, Diffusion fundamentals, and Scaling Laws.",
      estimatedEffort: "3.5 weeks · ~50–60 hours",
      whatYouWillLearn:
        "You will explore the architectural innovations powering frontier AI systems: reducing KV-cache memory with Multi-Query and Grouped-Query Attention (MQA/GQA), decoupling total parameter capacity from per-token FLOPs with sparse Mixture of Experts (MoE), extending context windows to 128K+ tokens, bridging vision/audio modalities, and applying Chinchilla Scaling Laws.",
      whyItMatters:
        "Almost all modern production LLMs use GQA for fast inference and sparse MoE for compute-efficient capacity, while multimodal encoders and diffusion models extend deep learning across images, video, and audio.",
      learningObjectives: [
        "Implement Grouped-Query Attention (GQA) and calculate its KV-cache reduction factor ($H_Q / H_{KV}$).",
        "Implement a sparse Mixture of Experts (MoE) layer with Top-$k$ router gating and load-balancing auxiliary loss.",
        "Explain Multimodal Vision-Language architectures (ViT patch embeddings + projector + LLM), Diffusion denoising, and Chinchilla compute-optimal scaling laws.",
      ],
      keyConcepts: [
        "Multi-Query (MQA) & Grouped-Query Attention (GQA)",
        "Sparse Mixture of Experts (MoE) & Top-k routing",
        "Long-context RoPE scaling & sparse/ring attention",
        "Multimodal Vision-Language & Audio Transformers",
        "Diffusion models & Chinchilla Scaling Laws",
      ],
      topics: [
        {
          id: "p8-m3-moe",
          title: "Mixture of Experts",
          explanation:
            "Replaces the dense FFN sublayer with $E$ parallel expert FFNs and a lightweight learned router $G(x) = \\text{TopK}(\\text{softmax}(x W_g))$ that activates only $k$ experts (e.g., $k=2$ out of $E=8$ or $64$) per token—scaling total parameters without increasing per-token FLOPs.",
          keyConcepts: ["Sparse conditional computation", "Active parameters vs total parameters", "Load-balancing auxiliary loss & expert capacity"],
          learningOutcome: "Implement a Top-$k$ routed Mixture-of-Experts FFN module in PyTorch.",
        },
        {
          id: "p8-m3-gqa",
          title: "Grouped-query attention",
          explanation:
            "Divides $H_Q$ query heads into $G$ groups where each group shares a single Key and Value head ($1 < G < H_Q$), slashing KV-cache memory and bandwidth by $H_Q / G$ (e.g., 4× or 8×) with negligible quality loss.",
          keyConcepts: ["Sharing K/V heads across query groups", "repeat_interleave for group broadcast", "Standard in LLaMA-3, Mistral & Qwen"],
          learningOutcome: "Modify your Multi-Head Attention module to support Grouped-Query Attention (`n_kv_heads`).",
          formulaOrCode: "# Repeat K and V heads to match Query head count (n_rep = n_heads // n_kv_heads)\nk = k.repeat_interleave(self.n_rep, dim=1)\nv = v.repeat_interleave(self.n_rep, dim=1)",
        },
        {
          id: "p8-m3-mqa",
          title: "Multi-query attention",
          explanation:
            "The extreme case of GQA where all $H_Q$ query heads share a single Key head and a single Value head ($G = 1$), maximizing KV-cache compression.",
          keyConcepts: ["Single K and V head across all queries", "MHA -> GQA -> MQA spectrum"],
          learningOutcome: "Compare memory bandwidth and accuracy across MHA, GQA, and MQA.",
        },
        {
          id: "p8-m3-long-context",
          title: "Long-context modeling",
          explanation:
            "Extending context windows from 4K to 32K–1M+ tokens via RoPE base frequency scaling (NTK-aware / YaRN interpolation), continual long-context pretraining, and Ring Attention across devices.",
          keyConcepts: ["RoPE theta base adjustment", "NTK-aware & YaRN frequency scaling", "Needle-in-a-haystack retrieval evaluation"],
          learningOutcome: "Explain how RoPE base frequency scaling extends context length beyond initial pretraining bounds.",
        },
        {
          id: "p8-m3-sparse-attention",
          title: "Sparse attention",
          explanation:
            "Restricting attention patterns to local sliding windows (e.g., last 4096 tokens) plus selected global or strided tokens to bound compute and KV cache on ultra-long sequences.",
          keyConcepts: ["Sliding Window Attention (SWA)", "Interleaved local + full attention layers"],
          learningOutcome: "Construct a sliding-window causal attention mask.",
        },
        {
          id: "p8-m3-modern-pos-reps",
          title: "Modern position representations",
          explanation:
            "Comparing RoPE, ALiBi (Attention with Linear Biases subtracting distance penalties from attention scores), and NoPE (implicit positional tracking via causal masking).",
          keyConcepts: ["RoPE vs ALiBi distance penalties", "Length extrapolation behavior"],
          learningOutcome: "Implement ALiBi distance bias matrices and compare them with RoPE.",
        },
        {
          id: "p8-m3-multimodal-transformers",
          title: "Multimodal Transformers",
          explanation:
            "Tokenizing non-text modalities (image patches, audio spectrograms, video frames) into continuous embedding vectors projected into the same $d_{\\text{model}}$ residual stream as text tokens.",
          keyConcepts: ["Unified token stream vs cross-attention", "Modality projection adapters"],
          learningOutcome: "Trace how continuous visual or audio embeddings are interleaved with discrete text tokens.",
        },
        {
          id: "p8-m3-vlms",
          title: "Vision-language models",
          explanation:
            "Splits an image into $P \\times P$ patches via a Vision Transformer (ViT / SigLIP), projects patch tokens through an MLP connector into the LLM's embedding space, and trains autoregressively on image-text conversations.",
          keyConcepts: ["Patchified image tokens (Conv2d patch embedding)", "Vision encoder + MLP connector + LLM backbone"],
          learningOutcome: "Implement a ViT image-patch embedding layer and connector projection in PyTorch.",
        },
        {
          id: "p8-m3-speech-audio",
          title: "Speech and audio modeling",
          explanation:
            "Converting raw waveforms into log-Mel spectrograms (for Whisper-style speech encoders) or discrete neural audio codec tokens (RVQ) for end-to-end spoken language modeling.",
          keyConcepts: ["Log-Mel spectrograms", "Neural audio codecs & discrete acoustic tokens"],
          learningOutcome: "Explain how speech is represented for audio-to-text and native speech-to-speech models.",
        },
        {
          id: "p8-m3-diffusion-fundamentals",
          title: "Diffusion model fundamentals",
          explanation:
            "A distinct non-autoregressive generative paradigm that corrupts data with Gaussian noise over $T$ forward steps and trains a denoising network (U-Net or Diffusion Transformer / DiT) to iteratively predict and remove noise.",
          keyConcepts: ["Forward noise schedule", "Reverse denoising objective ||ε - ε_θ(x_t, t)||²", "Autoregressive vs Diffusion generation"],
          learningOutcome: "Contrast iterative diffusion denoising across space with autoregressive token-by-token generation.",
        },
        {
          id: "p8-m3-scaling-laws",
          title: "Scaling laws",
          explanation:
            "Kaplan et al. and Hoffmann et al. (Chinchilla) demonstrated that cross-entropy test loss follows a smooth power law $L(N, D) = E + A N^{-\\alpha} + B D^{-\\beta}$ as a function of model parameters $N$ and training tokens $D$.",
          keyConcepts: ["Power-law loss decay", "Irreducible entropy floor E", "Predicting large-run loss from small proxy runs"],
          learningOutcome: "Fit power-law scaling curves to small training runs and interpret the irreducible entropy term $E$.",
        },
        {
          id: "p8-m3-compute-optimal",
          title: "Compute-optimal training",
          explanation:
            "Under a fixed FLOP budget $C \\approx 6 N D$, Chinchilla scaling shows $N$ and $D$ should scale in equal proportion (~20 tokens per parameter), whereas inference-heavy deployments intentionally 'over-train' smaller models on 100–1000+ tokens per parameter to minimize serving cost.",
          keyConcepts: ["C ≈ 6ND FLOP formula", "Chinchilla train-optimal (~20 tokens/param)", "Inference-optimal over-training (LLaMA/Qwen paradigm)"],
          learningOutcome: "Distinguish train-compute-optimal sizing from inference-cost-optimal over-training.",
        },
      ],
      practicalExercises: [
        "Upgrade your `MiniGPT` attention module to Grouped-Query Attention (GQA) and implement a 4-expert Top-2 Mixture-of-Experts FFN layer.",
      ],
      completionMilestone:
        "Implement GQA and Mixture-of-Experts modules and master multimodal and scaling-law principles.",
    },
    {
      id: "p8-m4",
      code: "8.4",
      title: "Inference Optimization",
      description:
        "Post-training quantization (INT8, INT4, AWQ, GGUF), KV cache management, continuous batching, PagedAttention, speculative decoding, serving APIs, observability, and cost optimization.",
      estimatedEffort: "3 weeks · ~45–55 hours",
      whatYouWillLearn:
        "You will master the systems engineering that makes LLM serving fast and affordable in production: compressing weights with INT8/INT4 quantization, eliminating KV-cache fragmentation with PagedAttention, scheduling dynamic requests via continuous batching, accelerating token generation with speculative decoding, and building an HTTP streaming inference server.",
      whyItMatters:
        "During autoregressive decoding, generating each token requires reading every model weight from HBM for just a handful of sequences—making LLM decoding heavily memory-bandwidth-bound. Quantization, continuous batching, and speculative decoding directly attack this bottleneck.",
      learningObjectives: [
        "Implement symmetric and asymmetric weight quantization (`int8` / `int4` group-wise) from scratch in PyTorch.",
        "Explain continuous batching, PagedAttention virtual memory blocks, and lossless speculative decoding.",
        "Build a streaming LLM Inference Server (Milestone #13) reporting TTFT, tokens/sec throughput, and p95 latency.",
      ],
      keyConcepts: [
        "Memory-bandwidth bottleneck of autoregressive decode",
        "INT8 / INT4 group-wise quantization (AWQ, GPTQ, GGUF)",
        "Continuous iteration-level batching",
        "PagedAttention block table KV management",
        "Lossless speculative decoding (draft + target verification)",
      ],
      topics: [
        {
          id: "p8-m4-quantization",
          title: "Quantization",
          explanation:
            "Mapping 16-bit floating-point weights to 8-bit or 4-bit integers using per-channel or per-group scale factors ($q = \\text{round}(w / s)$, $\\hat{w} = q \\cdot s$), reducing weight memory and HBM bandwidth by 2×–4×.",
          keyConcepts: ["Absmax symmetric vs zero-point asymmetric", "Group-wise quantization (group_size=128)", "Activation-aware weight protection (AWQ)"],
          learningOutcome: "Implement per-channel `int8` and group-wise `int4` weight quantization and dequantization in PyTorch.",
          formulaOrCode: "scale = weight.abs().amax(dim=-1, keepdim=True) / 127.0\nq_weight = torch.clamp((weight / scale).round(), -127, 127).to(torch.int8)",
        },
        {
          id: "p8-m4-kv-caching-opt",
          title: "KV caching",
          explanation:
            "For long contexts and large batch sizes, the KV cache ($2 \\times L \\times H_{KV} \\times d_k \\times T \\times B$) grows to tens of gigabytes—requiring GQA, KV-cache quantization (FP8/INT8), or sliding-window eviction.",
          keyConcepts: ["KV cache memory formula", "FP8 / INT8 KV quantization", "Prefix caching across shared system prompts"],
          learningOutcome: "Compute KV-cache memory requirements and implement shared prefix caching.",
        },
        {
          id: "p8-m4-continuous-batching",
          title: "Continuous batching",
          explanation:
            "Static batching waits for the longest sequence in a batch to finish before accepting new requests; continuous (iteration-level) batching evicts completed sequences immediately at the token step they emit `<|eos|>` and inserts waiting requests.",
          keyConcepts: ["Static batching padding waste", "Iteration-level scheduling", "Chunked prefill"],
          learningOutcome: "Explain how continuous batching increases multi-user serving throughput by 5×–10×.",
        },
        {
          id: "p8-m4-paged-attention",
          title: "Paged attention",
          explanation:
            "Inspired by OS virtual memory (vLLM): instead of pre-allocating contiguous `max_seq_len` KV buffers per request (which wastes 60%+ of VRAM to internal fragmentation), PagedAttention allocates fixed-size non-contiguous KV blocks on demand via a block table.",
          keyConcepts: ["Eliminating internal/external KV fragmentation", "Fixed-size KV pages & logical-to-physical block tables", "Copy-on-write prefix sharing"],
          learningOutcome: "Trace how a PagedAttention block table maps logical token positions to physical KV memory blocks.",
        },
        {
          id: "p8-m4-speculative-decoding",
          title: "Speculative decoding",
          explanation:
            "A fast, tiny draft model proposes $\\gamma$ candidate tokens autoregressively, and the large target model verifies all $\\gamma$ tokens in a single parallel forward pass using rejection sampling—achieving 2×–3× faster decoding with mathematically identical output distributions.",
          keyConcepts: ["Draft-then-verify paradigm", "Parallel target verification pass", "Lossless rejection sampling"],
          learningOutcome: "Implement speculative decoding with draft proposal and target rejection sampling.",
        },
        {
          id: "p8-m4-inference-throughput",
          title: "Inference throughput",
          explanation:
            "Total generated tokens per second across all concurrent users—maximized by increasing batch size until the GPU transitions from memory-bandwidth-bound to compute-bound.",
          keyConcepts: ["Total tokens/sec across concurrent requests", "Batching arithmetic intensity gain"],
          learningOutcome: "Measure total system throughput across concurrency levels 1, 4, 16, and 32.",
        },
        {
          id: "p8-m4-latency",
          title: "Latency",
          explanation:
            "Tracking Time-To-First-Token (TTFT, governed by prefill compute) and Time-Per-Output-Token (TPOT / Inter-Token Latency, governed by decode memory bandwidth) at p50, p95, and p99 percentiles.",
          keyConcepts: ["TTFT vs TPOT", "p50 / p95 / p99 tail latency", "Throughput-latency tradeoff curve"],
          learningOutcome: "Plot the throughput vs. p95 TPOT latency frontier for an inference endpoint.",
        },
        {
          id: "p8-m4-model-serving",
          title: "Model serving",
          explanation:
            "Exposing a language model via an asynchronous HTTP API with Server-Sent Events (SSE) token streaming, request queuing, and token-budget validation.",
          keyConcepts: ["Server-Sent Events (SSE) streaming", "Async request queues", "Graceful backpressure"],
          learningOutcome: "Build a streaming HTTP inference server for your language model (Milestone #13).",
        },
        {
          id: "p8-m4-observability",
          title: "Observability",
          explanation:
            "Logging structured metrics per request: prompt tokens, completion tokens, TTFT, TPOT, KV-cache utilization percentage, and queue wait time.",
          keyConcepts: ["Per-request telemetry", "KV cache pressure monitoring"],
          learningOutcome: "Instrument an inference server with structured latency and token-throughput telemetry.",
        },
        {
          id: "p8-m4-reliability",
          title: "Reliability",
          explanation:
            "Enforcing `max_tokens` limits, request timeouts, out-of-memory guards, and deterministic health checks so a single huge prompt cannot crash the serving process.",
          keyConcepts: ["Input length validation", "Timeout & cancellation handling", "OOM prevention"],
          learningOutcome: "Add input bounds, cancellation handling, and health endpoints to a serving pipeline.",
        },
        {
          id: "p8-m4-cost-optimization",
          title: "Cost optimization",
          explanation:
            "Calculating cost per 1M tokens from GPU hourly cost and sustained token throughput, and combining quantization, prefix caching, and model routing to reduce serving cost.",
          keyConcepts: ["$/1M tokens calculation", "Prefix cache hit rate", "Small-model routing"],
          learningOutcome: "Calculate $/1M tokens from hardware throughput benchmarks.",
        },
      ],
      practicalExercises: [
        "Complete Primary Project Milestone #13: Build an `LLM Inference Server` featuring `int8` weight quantization, KV caching, streaming SSE responses, and a load-testing benchmark script reporting TTFT, TPOT, and tokens/sec.",
      ],
      completionMilestone:
        "Implement weight quantization and build a benchmarked, streaming LLM Inference Server (Milestone #13).",
    },
    {
      id: "p8-m5",
      code: "8.5",
      title: "Research Methods",
      description:
        "Reading AI research papers critically, formulating testable hypotheses, establishing fair baselines, controlled ablations, statistical rigor, and reproducing published results.",
      estimatedEffort: "3 weeks · ~45–55 hours",
      whatYouWillLearn:
        "You will learn how to read machine learning papers like an empirical scientist, design controlled experiments that isolate a single causal factor under matched FLOPs/tokens, avoid p-hacking and hyperparameter bias, and complete a full Research Reproduction capstone.",
      whyItMatters:
        "Having built every layer from Python matrices to quantized LLM servers, you now have the foundation to read frontier research papers, verify their claims empirically in code, and contribute original findings.",
      learningObjectives: [
        "Deconstruct ML research papers using a structured three-pass methodology (claim, mathematical mechanism, baseline fairness, ablation completeness).",
        "Design FLOP-matched and parameter-matched controlled comparisons with proper random-seed variance reporting.",
        "Complete Primary Project Milestone #14: Reproduce a manageable research claim or architectural comparison end-to-end and write a clear technical report.",
      ],
      keyConcepts: [
        "Three-pass paper reading methodology",
        "Falsifiable hypothesis formulation",
        "Compute-matched & tuned baselines",
        "Multi-seed variance & statistical significance",
        "Reproducible code & artifact publication",
      ],
      topics: [
        {
          id: "p8-m5-reading-papers",
          title: "Reading research papers",
          explanation:
            "Applying Keshav's three-pass method: Pass 1 scans abstract, figures, and conclusions; Pass 2 traces every equation and ablation table; Pass 3 mentally (and in code) re-implements the paper from scratch to uncover unstated assumptions.",
          keyConcepts: ["Three-pass reading method", "Separating core mechanism from marketing prose", "Checking appendix hyperparameters"],
          learningOutcome: "Deconstruct any ML/LLM paper into its core mathematical delta, assumptions, and empirical evidence.",
        },
        {
          id: "p8-m5-forming-hypotheses",
          title: "Forming hypotheses",
          explanation:
            "Framing research questions as falsifiable predictions: e.g., 'Replacing learned positional embeddings with RoPE in a 10M-parameter model trained on 200M tokens reduces validation perplexity at sequence length $2 \\times T_{\\text{train}}$ by at least 15%.'",
          keyConcepts: ["Falsifiable predictions", "Independent vs dependent variables", "Pre-registering evaluation metrics"],
          learningOutcome: "Formulate specific, falsifiable experimental hypotheses before running training jobs.",
        },
        {
          id: "p8-m5-establishing-baselines",
          title: "Establishing baselines",
          explanation:
            "A new method is only meaningful if the baseline is given equal hyperparameter tuning care, identical data order, and matched FLOPs and parameter count.",
          keyConcepts: ["Tuning symmetry", "FLOP-matched and parameter-matched baselines", "Avoiding strawman baselines"],
          learningOutcome: "Construct strong, fairly tuned baselines for architectural experiments.",
        },
        {
          id: "p8-m5-reproducing-experiments",
          title: "Reproducing experiments",
          explanation:
            "Translating a paper's mathematical description into working code on a scaled-down compute budget and verifying whether the directional claim holds.",
          keyConcepts: ["Scaled-down proxy reproduction", "Identifying undocumented implementation details", "Verifying directional claims"],
          learningOutcome: "Reproduce a published architectural or optimization finding from scratch (Milestone #14).",
        },
        {
          id: "p8-m5-controlled-comparisons",
          title: "Controlled comparisons",
          explanation:
            "Holding dataset shards, batch order, tokenizer, parameter count, and wall-clock/FLOP budget strictly constant so any metric difference is attributable solely to the experimental variable.",
          keyConcepts: ["Identical data loader seed", "Matched parameter & FLOP budgets"],
          learningOutcome: "Audit an experimental setup for confounding variables.",
        },
        {
          id: "p8-m5-ablation-studies-research",
          title: "Ablation studies",
          explanation:
            "When proposing a multi-part system ($A + B + C$), systematically removing one component at a time (or adding one at a time from the baseline) to prove which component actually drives the gain.",
          keyConcepts: ["Leave-one-out vs add-one-in ablations", "Identifying dead-weight complexity"],
          learningOutcome: "Design a multi-row ablation table isolating the contribution of each architectural change.",
        },
        {
          id: "p8-m5-experiment-tracking",
          title: "Experiment tracking",
          explanation:
            "Logging commit hash, full config diff, loss curves, gradient norms, MFU, and hardware telemetry for every run so no negative or positive result is lost.",
          keyConcepts: ["Structured JSONL / dashboard run logs", "Config-to-metric provenance"],
          learningOutcome: "Maintain a disciplined experiment log across all research runs.",
        },
        {
          id: "p8-m5-statistical-interpretation",
          title: "Statistical interpretation",
          explanation:
            "Running experiments across at least 3 random seeds (`seed=42, 43, 44`) to verify that an observed 0.03 perplexity improvement exceeds random initialization noise ($\\mu \\pm \\sigma$).",
          keyConcepts: ["Multi-seed mean ± std", "Initialization & data-order variance", "Bootstrap confidence intervals"],
          learningOutcome: "Report multi-seed confidence intervals and distinguish signal from seed noise.",
        },
        {
          id: "p8-m5-reporting-results",
          title: "Reporting results",
          explanation:
            "Writing clear, honest technical reports that include negative results, failure cases, compute costs, and regimes where the baseline outperforms the proposed method.",
          keyConcepts: ["Reporting negative results", "Clear loss/scaling plots", "Explicit scope & limitations"],
          learningOutcome: "Author a publication-grade technical report on your experimental findings.",
        },
        {
          id: "p8-m5-reproducibility-research",
          title: "Reproducibility",
          explanation:
            "Publishing a clean repository with a single script (`reproduce.sh`) that downloads data, runs baseline and experimental seeds, and regenerates every table and figure in your report.",
          keyConcepts: ["End-to-end reproduction script", "Pinned environment lockfile", "Self-contained figure generation"],
          learningOutcome: "Package your research experiment so any engineer can reproduce your tables and plots.",
        },
      ],
      practicalExercises: [
        "Complete Primary Project Milestone #14: Design, execute, and document a reproducible research reproduction or controlled architectural ablation study across 3 random seeds.",
      ],
      completionMilestone:
        "Complete and publish a reproducible Research Reproduction study (Milestone #14).",
    },
  ],
  assignments: [
    "Optimize a small attention module using FlashAttention / torch.compile and profile its HBM bandwidth and MFU.",
    "Implement INT8 and group-wise INT4 weight quantization from scratch and measure perplexity vs. memory savings.",
    "Build and benchmark a streaming LLM Inference Server reporting TTFT, TPOT, and throughput.",
    "Execute and document a controlled multi-seed Research Reproduction study on a Transformer architecture or optimization paper.",
  ],
  primaryProjects: [
    {
      id: "milestone-13-llm-inference-server",
      milestoneNumber: 13,
      title: "LLM Inference Server",
      phase: 8,
      shortDescription:
        "Build a high-throughput, quantized LLM inference engine and streaming HTTP server supporting INT8/INT4 weight quantization, KV-cache management, speculative decoding, and real-time latency/throughput telemetry.",
      skillsPracticed: [
        "INT8 / INT4 weight quantization",
        "KV-cache prefix reuse & memory management",
        "Speculative decoding & streaming HTTP/SSE API",
        "TTFT, TPOT & concurrency load benchmarking",
      ],
      expectedOutcome:
        "A production-style inference serving engine with full latency-throughput benchmark reports.",
      difficulty: "research",
      difficultyLabel: "Advanced",
    },
    {
      id: "milestone-14-research-reproduction",
      milestoneNumber: 14,
      title: "Research Reproduction",
      phase: 8,
      shortDescription:
        "Select a foundational LLM architecture or optimization paper (e.g., RoPE vs. ALiBi, GQA vs. MHA, SwiGLU vs. GELU, or Muon/AdamW), reproduce its core experiment at a manageable scale across multiple seeds, and publish a rigorous technical report.",
      skillsPracticed: [
        "Paper deconstruction & hypothesis formulation",
        "FLOP-matched & parameter-matched experimental design",
        "Multi-seed statistical evaluation & ablation tables",
        "Reproducible research code & technical writing",
      ],
      expectedOutcome:
        "A complete, reproducible research repository and technical paper validating an empirical LLM hypothesis.",
      difficulty: "research",
      difficultyLabel: "Advanced → Research",
    },
  ],
  supplementaryProjects: [
    {
      title: "Online Softmax & Attention Kernel Benchmark",
      description:
        "Implementation and profiling of tiled online softmax vs. naive materialized softmax across increasing context lengths.",
    },
  ],
  completionCriteriaSummary:
    "Design, implement, measure, and explain an advanced language-model system or research experiment.",
  completionChecklist: [
    {
      id: "p8-check-concepts",
      question: "Can you explain the GPU memory hierarchy (HBM vs. SRAM), why decoding is memory-bandwidth-bound, and how FlashAttention and GQA work?",
      detail: "Connecting hardware physics directly to Transformer architecture design.",
    },
    {
      id: "p8-check-exercises",
      question: "Can you explain how FSDP (ZeRO-1/2/3), Tensor Parallelism, and Pipeline Parallelism partition training across multiple GPUs?",
      detail: "Including the collective operations (AllGather, ReduceScatter, AllReduce) used by each.",
    },
    {
      id: "p8-check-implementation",
      question: "Have you built and benchmarked Milestone #13 (LLM Inference Server) with weight quantization and KV caching?",
      detail: "Measuring Time-To-First-Token (TTFT) and Time-Per-Output-Token (TPOT).",
    },
    {
      id: "p8-check-testing",
      question: "Have you completed Milestone #14 (Research Reproduction) with a controlled baseline and multi-seed evaluation?",
      detail: "Holding token budget, data order, and parameter count constant.",
    },
    {
      id: "p8-check-limitations",
      question: "Can you critically read a new LLM research paper, identify its core mathematical change, and design an ablation to test its claims?",
      detail: "Completing the journey from AI beginner to independent AI & LLM engineer.",
    },
  ],
};
