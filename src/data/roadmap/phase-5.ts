import type { RoadmapPhase } from "@/types";

export const PHASE_5_TRANSFORMERS_FROM_SCRATCH: RoadmapPhase = {
  id: "phase-5",
  slug: "phase-5-transformers-from-scratch",
  phase: 5,
  code: "P5",
  title: "Transformers From Scratch",
  shortDescription:
    "Understand and implement every component of modern GPT-style decoder-only Transformer architectures from first principles in PyTorch.",
  purpose:
    "Understand and implement the architecture underlying GPT-style language models.",
  estimatedWeeks: 10,
  difficulty: "advanced",
  difficultyLabel: "Advanced",
  prerequisites: [
    {
      phaseNumber: 1,
      phaseId: "phase-1",
      label: "Phase 1: Matrix Multiplication, Transposes, and Scaling Variance",
    },
    {
      phaseNumber: 3,
      phaseId: "phase-3",
      label: "Phase 3: Deep Learning, Residual Streams, LayerNorm, and PyTorch",
    },
    {
      phaseNumber: 4,
      phaseId: "phase-4",
      label: "Phase 4: BPE Tokenization and Autoregressive Language Modeling",
    },
  ],
  learningObjectives: [
    "Derive and implement Scaled Dot-Product Attention with causal masking and explain every tensor dimension.",
    "Build Multi-Head Attention, Rotary Position Embeddings (RoPE), RMSNorm/LayerNorm, and SwiGLU/GELU Feed-Forward blocks.",
    "Compare Encoder-only (BERT), Decoder-only (GPT/LLaMA), and Encoder-Decoder (T5) Transformer architectures.",
    "Assemble a complete GPT-style decoder-only Transformer from scratch in PyTorch and implement KV-cached autoregressive decoding with Temperature, Top-k, and Top-p sampling.",
  ],
  modules: [
    {
      id: "p5-m1",
      code: "5.1",
      title: "Attention Fundamentals",
      description:
        "Why attention replaced recurrence, Queries/Keys/Values, scaled dot-product attention, softmax normalization, and causal lower-triangular masking.",
      estimatedEffort: "2 weeks · ~30–35 hours",
      whatYouWillLearn:
        "You will understand how self-attention allows every token in a sequence to directly route information from any preceding token in O(1) sequential path length, and you will implement the exact Scaled Dot-Product Attention equation with causal masking.",
      whyItMatters:
        "Scaled dot-product self-attention is the central routing mechanism of every Transformer language model. Understanding its tensor shapes and $1/\\sqrt{d_k}$ variance scaling is essential for LLM engineering.",
      learningObjectives: [
        "Explain why attention was introduced to eliminate the recurrent bottleneck.",
        "Explain the distinct roles and tensor dimensions of Queries ($Q$), Keys ($K$), and Values ($V$).",
        "Implement `Attention(Q, K, V) = softmax(QKᵀ / sqrt(d_k))V` with causal upper-triangular `-inf` masking.",
      ],
      keyConcepts: [
        "Direct token-to-token routing",
        "Query (Q), Key (K), Value (V) projections",
        "1 / sqrt(d_k) variance preservation",
        "Causal lower-triangular mask",
        "T × T attention weight matrices",
      ],
      educationalExample: {
        title: "Scaled Dot-Product Attention & Tensor Dimensions",
        expression: "Attention(Q, K, V) = softmax( (Q Kᵀ) / √d_k + M ) V",
        symbolBreakdown: [
          {
            symbol: "Q ∈ ℝ^(B × H × T × d_k)",
            meaning: "Query tensor: what each token position t is looking for in prior context.",
          },
          {
            symbol: "K ∈ ℝ^(B × H × T × d_k)",
            meaning: "Key tensor: the searchable descriptor advertised by each token position.",
          },
          {
            symbol: "Q Kᵀ ∈ ℝ^(B × H × T × T)",
            meaning: "Pairwise compatibility score matrix between every query position i and key position j.",
          },
          {
            symbol: "√d_k",
            meaning: "Scaling factor that keeps dot products at unit variance so softmax does not saturate into one-hot gradients.",
          },
          {
            symbol: "M ∈ {0, -∞}^(T × T)",
            meaning: "Causal mask setting future positions (j > i) to -∞ so softmax assigns exactly 0 weight to future tokens.",
          },
          {
            symbol: "V ∈ ℝ^(B × H × T × d_v)",
            meaning: "Value tensor: the payload vectors aggregated according to the normalized attention probabilities.",
          },
        ],
        takeaway:
          "Multiplying attention weights (B, H, T, T) by Values (B, H, T, d_v) produces an output of shape (B, H, T, d_v) where each token is a context-sensitive weighted average of preceding tokens.",
      },
      topics: [
        {
          id: "p5-m1-why-attention",
          title: "Why attention was introduced",
          explanation:
            "Originally introduced to let seq2seq translation models look back at all source tokens without compressing a whole sentence into a single vector, before Vaswani et al. (2017) showed that self-attention alone ('Attention Is All You Need') eliminates recurrence entirely.",
          keyConcepts: ["Eliminating fixed-vector compression", "O(1) path length between any two tokens", "Full GPU parallelization across T"],
          learningOutcome: "Contrast O(T) sequential recurrent paths with O(1) direct attention paths.",
        },
        {
          id: "p5-m1-queries",
          title: "Queries",
          explanation:
            "Projected from token representations via $Q = X W_Q$, a Query vector $q_t \\in \\mathbb{R}^{d_k}$ represents the question or lookup criteria issued by token position $t$.",
          keyConcepts: ["Linear projection W_Q", "Lookup request representation"],
          learningOutcome: "Compute Query projections $Q = X W_Q$ and verify their tensor shape.",
        },
        {
          id: "p5-m1-keys",
          title: "Keys",
          explanation:
            "Projected via $K = X W_K$, a Key vector $k_j \\in \\mathbb{R}^{d_k}$ represents the label or address advertised by token position $j$ to match against incoming Queries.",
          keyConcepts: ["Linear projection W_K", "Matching dimension d_k with Queries"],
          learningOutcome: "Compute Key projections $K = X W_K$ and align axes for $Q K^T$.",
        },
        {
          id: "p5-m1-values",
          title: "Values",
          explanation:
            "Projected via $V = X W_V$, a Value vector $v_j \\in \\mathbb{R}^{d_v}$ contains the actual semantic content contributed by token $j$ once its Key matches a Query.",
          keyConcepts: ["Linear projection W_V", "Information payload routed to output"],
          learningOutcome: "Distinguish between routing address matching ($Q K^T$) and content aggregation ($\\text{weights} \\cdot V$).",
        },
        {
          id: "p5-m1-attention-scores",
          title: "Attention scores",
          explanation:
            "The raw matrix product $S = Q K^T$ of shape `(B, H, T, T)` where entry $S_{i,j} = q_i \\cdot k_j$ measures raw affinity between query token $i$ and key token $j$.",
          keyConcepts: ["Batched transpose K.transpose(-2, -1)", "O(T²) pairwise score matrix"],
          learningOutcome: "Compute batched raw attention score matrices in PyTorch.",
        },
        {
          id: "p5-m1-scaled-dot-product",
          title: "Scaled dot-product attention",
          explanation:
            "When $q$ and $k$ have zero mean and unit variance, their dot product has variance $d_k$. Dividing by $\\sqrt{d_k}$ restores unit variance so softmax inputs do not grow large and push gradients to zero.",
          keyConcepts: ["Variance of sum of d_k products", "1 / math.sqrt(d_k) scaling", "Preventing softmax saturation"],
          learningOutcome: "Implement scaled dot-product attention and prove why $1/\\sqrt{d_k}$ prevents vanishing softmax gradients.",
          formulaOrCode: "Attention(Q,K,V) = softmax(QKᵀ / sqrt(d_k))V",
        },
        {
          id: "p5-m1-softmax-attn",
          title: "Softmax",
          explanation:
            "Applied row-wise along the last dimension (`dim=-1`) of the scaled score matrix so that for each query token $i$, the attention weights over all attended keys $j$ are non-negative and sum to $1.0$.",
          keyConcepts: ["Row-wise normalization (dim=-1)", "Convex combination of Values"],
          learningOutcome: "Verify that every row of the post-softmax attention matrix sums to 1.0.",
        },
        {
          id: "p5-m1-causal-masks",
          title: "Causal masks",
          explanation:
            "In autoregressive language modeling, token $i$ must never peek at future tokens $j > i$. Using `torch.tril` and `masked_fill(mask == 0, float('-inf'))` before softmax forces future weights to $\\exp(-\\infty) = 0$.",
          keyConcepts: ["Lower-triangular mask torch.tril", "Setting upper triangle to -inf BEFORE softmax", "Preventing future token leakage"],
          learningOutcome: "Implement causal masking with `register_buffer` and verify that changing future tokens never alters past outputs.",
        },
        {
          id: "p5-m1-attention-matrices",
          title: "Attention matrices",
          explanation:
            "Visualizing the $T \\times T$ attention matrix reveals interpretable routing patterns—such as induction heads, previous-token heads, and delimiter-attending heads.",
          keyConcepts: ["T × T heatmaps", "Previous-token & induction heads", "Quadratic O(T²) memory footprint"],
          learningOutcome: "Plot and interpret $T \\times T$ causal attention weight heatmaps.",
        },
      ],
      practicalExercises: [
        "Complete Primary Project Milestone #9: Implement a standalone `SelfAttentionEngine` in PyTorch, plot causal attention heatmaps, and write a causality unit test verifying zero future leakage.",
      ],
      completionMilestone:
        "Implement Scaled Dot-Product Causal Self-Attention from scratch and verify all tensor shapes (Milestone #9).",
    },
    {
      id: "p5-m2",
      code: "5.2",
      title: "Transformer Components",
      description:
        "Multi-head attention, positional representations (sinusoidal, learned, RoPE), FFN blocks (GELU, SwiGLU), Pre-LN LayerNorm & RMSNorm, residual connections, weight tying, and initialization.",
      estimatedEffort: "2.5 weeks · ~38–45 hours",
      whatYouWillLearn:
        "You will build every structural block of a modern Transformer: splitting $d_{\\text{model}}$ into $H$ parallel attention heads, injecting token order via learned or Rotary Position Embeddings (RoPE), processing features through position-wise Feed-Forward Networks, stabilizing training with Pre-Norm RMSNorm/LayerNorm, and tying input-output embedding matrices.",
      whyItMatters:
        "The difference between the original 2017 Transformer and modern frontier architectures (LLaMA, Mistral, Qwen, DeepSeek) lies in these component refinements: Pre-Norm RMSNorm, RoPE, and SwiGLU.",
      learningObjectives: [
        "Implement Multi-Head Attention by splitting and recombining head dimensions `(B, T, H, d_k) <-> (B, H, T, d_k)`.",
        "Compare absolute positional encodings with Rotary Position Embeddings (RoPE).",
        "Implement Pre-LN LayerNorm, RMSNorm, GELU/SwiGLU Feed-Forward layers, and residual stream scaling.",
      ],
      keyConcepts: [
        "Multi-Head subspace projection",
        "Learned vs Rotary Position Embeddings (RoPE)",
        "Position-wise Feed-Forward Networks (MLP / SwiGLU)",
        "Pre-Norm LayerNorm & RMSNorm",
        "Weight tying & residual depth scaling",
      ],
      topics: [
        {
          id: "p5-m2-single-head-attention",
          title: "Single-head attention",
          explanation:
            "Computes a single attention distribution per token, forcing one weighted average to simultaneously capture syntax, coreference, and adjacent token context.",
          keyConcepts: ["Single routing distribution bottleneck", "Projection matrices W_Q, W_K, W_V"],
          learningOutcome: "Implement a single-head self-attention module and identify its expressive limit.",
        },
        {
          id: "p5-m2-multi-head-attention",
          title: "Multi-head attention",
          explanation:
            "Splits $d_{\\text{model}}$ into $H$ parallel heads of dimension $d_k = d_{\\text{model}} / H$, allowing each head to attend to different syntactic or semantic relationships simultaneously before concatenating and projecting via $W_O$.",
          keyConcepts: ["d_model = H * d_k", "Batched single fused QKV projection", "Concatenation + output projection W_O"],
          learningOutcome: "Implement fused Multi-Head Attention in PyTorch using `.view(B, T, H, d_k).transpose(1, 2)`.",
        },
        {
          id: "p5-m2-self-attention",
          title: "Self-attention",
          explanation:
            "Queries, Keys, and Values all originate from the same sequence representation $X$, enabling tokens within a document to contextualize one another.",
          keyConcepts: ["Q, K, V from same sequence X", "Intra-sequence contextualization"],
          learningOutcome: "Trace how self-attention updates token vectors with surrounding context.",
        },
        {
          id: "p5-m2-cross-attention",
          title: "Cross-attention",
          explanation:
            "Queries come from the decoder sequence while Keys and Values come from an encoder representation (e.g., source language text or vision/audio encoder patches), bridging two modalities or sequences.",
          keyConcepts: ["Q from decoder, K & V from encoder", "Shape (T_dec × T_enc) attention matrix", "No causal mask needed on encoder keys"],
          learningOutcome: "Distinguish self-attention from cross-attention and their attention matrix dimensions.",
        },
        {
          id: "p5-m2-positional-encoding",
          title: "Positional encoding",
          explanation:
            "Without positional information, self-attention is permutation-equivariant (a bag of words). Sinusoidal or learned positional embeddings $P \\in \\mathbb{R}^{T_{\\max} \\times d_{\\text{model}}}$ are added to token embeddings to inject absolute order.",
          keyConcepts: ["Permutation invariance of raw attention", "Learned wpe (GPT-2)", "Sinusoidal frequencies"],
          learningOutcome: "Add learned positional embeddings to token embeddings and understand their context-length bound $T_{\\max}$.",
        },
        {
          id: "p5-m2-rope",
          title: "Rotary position embeddings",
          explanation:
            "RoPE rotates pairs of Query and Key dimensions in the 2D complex plane by angle $m \\theta_i$ proportional to token position $m$, so the dot product $q_m^T k_n$ depends purely on relative distance $(m - n)$.",
          keyConcepts: ["2D coordinate rotation of Q and K", "Relative distance invariance (m - n)", "Standard in LLaMA, Mistral & Qwen"],
          learningOutcome: "Implement Rotary Position Embeddings (RoPE) and apply them to Query and Key tensors.",
        },
        {
          id: "p5-m2-ffn-layers",
          title: "Feed-forward layers",
          explanation:
            "Applied independently to each token position after attention, expanding dimension $d_{\\text{model}} \\to 4 d_{\\text{model}}$ (or $\\frac{8}{3} d_{\\text{model}}$ in SwiGLU) with a non-linearity before projecting back to $d_{\\text{model}}$.",
          keyConcepts: ["Position-wise MLP", "4x hidden expansion or SwiGLU gating", "Key-value memory interpretation of FFN weights"],
          learningOutcome: "Implement both standard GELU MLP and gated SwiGLU Feed-Forward sublayers.",
        },
        {
          id: "p5-m2-layernorm",
          title: "LayerNorm",
          explanation:
            "Normalizes each token's $d_{\\text{model}}$ vector to zero mean and unit variance (`(x - mean) / sqrt(var + eps) * gamma + beta`); placed before each sublayer (Pre-LN) in modern Transformers for stable gradient flow.",
          keyConcepts: ["Per-token feature normalization", "Pre-LN vs Post-LN placement", "Affine parameters γ and β"],
          learningOutcome: "Explain why Pre-LN placement eliminates the fragile warmup sensitivity of Post-LN Transformers.",
        },
        {
          id: "p5-m2-rmsnorm",
          title: "RMSNorm",
          explanation:
            "Root Mean Square Layer Normalization drops mean-centering and divides directly by $\\text{RMS}(x) = \\sqrt{\\frac{1}{d} \\sum x_i^2 + \\epsilon}$ scaled by $\\gamma$, achieving equal stability to LayerNorm with ~10–15% less compute.",
          keyConcepts: ["x / sqrt(mean(x²) + eps) * weight", "Zero mean-centering overhead", "Standard in modern open-weight LLMs"],
          learningOutcome: "Implement `RMSNorm` in 6 lines of PyTorch.",
          formulaOrCode: "norm_x = x * torch.rsqrt(x.pow(2).mean(-1, keepdim=True) + self.eps)\nreturn norm_x * self.weight",
        },
        {
          id: "p5-m2-residual-connections-tf",
          title: "Residual connections",
          explanation:
            "Each Transformer sublayer adds its output back into the residual stream: `x = x + attn(norm1(x))` followed by `x = x + ffn(norm2(x))`.",
          keyConcepts: ["Pre-norm residual stream", "Additive communication channel across layers"],
          learningOutcome: "Wire Pre-Norm residual connections around attention and FFN sublayers.",
        },
        {
          id: "p5-m2-embeddings-tf",
          title: "Embeddings",
          explanation:
            "The token embedding matrix $W_E \\in \\mathbb{R}^{V \\times d_{\\text{model}}}$ maps discrete token IDs into the initial residual stream.",
          keyConcepts: ["Input embedding lookup", "Residual stream initialization"],
          learningOutcome: "Configure input token embeddings and calculate their memory footprint.",
        },
        {
          id: "p5-m2-weight-tying",
          title: "Weight tying",
          explanation:
            "Sharing the exact same parameter tensor between the input token embedding (`wte.weight`) and the final output language modeling head (`lm_head.weight`) saves $V \\times d_{\\text{model}}$ parameters and improves perplexity on small-to-medium models.",
          keyConcepts: ["model.lm_head.weight = model.wte.weight", "Parameter savings in small LLMs", "Semantic symmetry between input & output"],
          learningOutcome: "Tie input embedding and output projection weights in a PyTorch GPT model.",
        },
        {
          id: "p5-m2-parameter-initialization",
          title: "Parameter initialization",
          explanation:
            "Initializing linear weights with $\\mathcal{N}(0, 0.02)$ and scaling residual output projections ($W_O$ and FFN down-projections) by $\\frac{1}{\\sqrt{2 N_{\\text{layers}}}}$ prevents residual stream variance from growing linearly with depth.",
          keyConcepts: ["N(0, 0.02) base initialization", "1 / sqrt(2 * n_layers) residual projection scaling"],
          learningOutcome: "Implement custom `_init_weights` with residual depth scaling in PyTorch.",
        },
      ],
      practicalExercises: [
        "Implement a complete `TransformerBlock` combining `RMSNorm`, `CausalMultiHeadAttention` (with RoPE), and `SwiGLU` / `GELU` MLP.",
      ],
      completionMilestone:
        "Implement and unit-test Multi-Head Attention, RoPE, RMSNorm, and a complete Pre-LN Transformer Block.",
    },
    {
      id: "p5-m3",
      code: "5.3",
      title: "Transformer Architectures",
      description:
        "Comparing Encoder-only (BERT), Decoder-only (GPT/LLaMA), and Encoder-Decoder (T5) architectures, attention masking patterns, and block stacking.",
      estimatedEffort: "1.5 weeks · ~20–24 hours",
      whatYouWillLearn:
        "You will understand the three major families of Transformer architectures, how their attention masks differ (bidirectional vs. causal lower-triangular vs. prefix/cross), and why the Decoder-only GPT architecture became the dominant paradigm for Large Language Models.",
      whyItMatters:
        "Choosing between an embedding encoder (like BERT/RoBERTa) and an autoregressive generator (like GPT/LLaMA) depends entirely on understanding bidirectional vs. causal attention masks.",
      learningObjectives: [
        "Compare Encoder-only, Decoder-only, and Encoder-Decoder Transformer families.",
        "Explain why Decoder-only architectures excel at unified in-context learning and scaling.",
        "Calculate the exact parameter count and activation memory of a stacked $L$-layer Transformer.",
      ],
      keyConcepts: [
        "Bidirectional Encoder-only (BERT)",
        "Causal Decoder-only (GPT / LLaMA)",
        "Encoder-Decoder (original Transformer / T5)",
        "Attention masking patterns",
        "Parameter & FLOP accounting across L blocks",
      ],
      topics: [
        {
          id: "p5-m3-encoder-only",
          title: "Encoder-only Transformers",
          explanation:
            "Use unmasked bidirectional self-attention where every token attends to both left and right context simultaneously; trained via Masked Language Modeling (BERT) for embeddings, classification, and reranking.",
          keyConcepts: ["Full bidirectional attention", "Masked Language Modeling (MLM)", "Ideal for embeddings & retrieval"],
          learningOutcome: "Explain why Encoder-only models excel at bidirectional representation learning but cannot autoregressively generate text out of the box.",
        },
        {
          id: "p5-m3-decoder-only",
          title: "Decoder-only Transformers",
          explanation:
            "Use causal self-attention where every token attends only to itself and preceding tokens, training with next-token prediction across every position in parallel.",
          keyConcepts: ["Causal left-to-right attention", "Dense training signal on every token", "Unified prompt + completion paradigm"],
          learningOutcome: "Explain why Decoder-only architectures dominate modern generative LLMs.",
        },
        {
          id: "p5-m3-encoder-decoder",
          title: "Encoder-decoder Transformers",
          explanation:
            "Combine a bidirectional Encoder stack with a causal Decoder stack connected via Cross-Attention (original 2017 Transformer, T5, Whisper speech-to-text).",
          keyConcepts: ["Bidirectional encoder + causal decoder", "Cross-attention bridge", "Seq2Seq & multimodal audio/vision encoding"],
          learningOutcome: "Identify when an Encoder-Decoder architecture (such as Whisper or T5) is advantageous.",
        },
        {
          id: "p5-m3-gpt-architecture",
          title: "GPT-style architecture",
          explanation:
            "Token Embeddings + Positional Representations $\\to$ $L$ identical Pre-LN Decoder Blocks (Causal MHA + FFN) $\\to$ Final Norm $\\to$ Linear Language Model Head projecting to $V$ vocabulary logits.",
          keyConcepts: ["End-to-end decoder pipeline", "Pre-LN block ordering", "Final LayerNorm/RMSNorm before LM head"],
          learningOutcome: "Draw and specify the complete architecture diagram of a GPT-style language model.",
        },
        {
          id: "p5-m3-attention-masking",
          title: "Attention masking",
          explanation:
            "Controlling information flow via mask matrices: causal triangular masks prevent future peeking, padding masks ignore `<pad>` tokens, and document masks prevent cross-document bleeding in packed sequences.",
          keyConcepts: ["Causal mask", "Padding mask", "Intra-document block-diagonal mask"],
          learningOutcome: "Construct boolean and additive attention masks for causal and padded batches.",
        },
        {
          id: "p5-m3-repeated-blocks",
          title: "Repeated Transformer blocks",
          explanation:
            "Stacking $L$ blocks (`nn.ModuleList([TransformerBlock(config) for _ in range(config.n_layer)])`) progressively refines token representations from surface syntax in early layers to abstract semantics in deep layers.",
          keyConcepts: ["nn.ModuleList stacking", "12 d_model² parameters per block rule of thumb", "Depth vs width scaling"],
          learningOutcome: "Derive the $\\approx 12 L d_{\\text{model}}^2$ parameter formula for a standard Transformer.",
        },
      ],
      practicalExercises: [
        "Write a parameter-accounting script that takes `(vocab_size, n_layer, d_model, n_head)` and verifies that its analytical formula matches `sum(p.numel() for p in model.parameters())` to the exact integer.",
      ],
      completionMilestone:
        "Specify the complete GPT-style architecture and verify exact parameter and tensor shape formulas.",
    },
    {
      id: "p5-m4",
      code: "5.4",
      title: "Implement GPT Architecture",
      description:
        "Hands-on PyTorch implementation of a complete GPT-style language model from scratch—from embeddings and attention blocks to loss calculation, training loop, and generation.",
      estimatedEffort: "2.5 weeks · ~40–48 hours",
      whatYouWillLearn:
        "You will assemble every component you have studied into a clean, self-contained PyTorch GPT implementation (`MiniGPT`), verify its initial loss and backward pass, train it on a text dataset, and generate coherent text—without importing any pretrained Transformer classes.",
      whyItMatters:
        "Implementing the entire GPT model yourself in ~250 lines of readable PyTorch permanently removes the black box around Large Language Models.",
      learningObjectives: [
        "Implement a complete GPT model in PyTorch using tensor operations and `nn.Module` primitives.",
        "Verify forward logit shapes `(B, T, V)`, cross-entropy loss calculation, and weight tying.",
        "Train the model end-to-end on a text dataset and sample generated completions.",
      ],
      keyConcepts: [
        "GPTConfig dataclass",
        "Token & positional embeddings",
        "CausalSelfAttention & MLP modules",
        "End-to-end GPT nn.Module",
        "Training loop & autoregressive generation",
      ],
      topics: [
        {
          id: "p5-m4-tokenizer-integration",
          title: "Tokenizer",
          explanation:
            "Connecting your Phase 4 BPE or character tokenizer to convert raw training text into contiguous integer token arrays.",
          keyConcepts: ["Corpus encoding", "Vocab size synchronization with GPTConfig"],
          learningOutcome: "Connect your custom tokenizer directly to your GPT model configuration.",
        },
        {
          id: "p5-m4-token-embedding",
          title: "Token embedding",
          explanation:
            "`self.wte = nn.Embedding(config.vocab_size, config.n_embd)` maps input indices `(B, T)` to dense vectors `(B, T, n_embd)`.",
          keyConcepts: ["nn.Embedding lookup", "Output shape (B, T, n_embd)"],
          learningOutcome: "Implement the input token embedding layer and verify its output dimensions.",
        },
        {
          id: "p5-m4-positional-representation",
          title: "Positional representation",
          explanation:
            "Applying either learned positional embeddings `self.wpe(torch.arange(T))` or precomputed Rotary Position Embeddings (RoPE) `cos, sin` buffers across sequence positions `0 .. T-1`.",
          keyConcepts: ["Position index arange(0, T)", "Broadcasting across batch B", "RoPE complex rotation"],
          learningOutcome: "Inject positional information cleanly across variable sequence lengths $T \\le \\text{block\\_size}$.",
        },
        {
          id: "p5-m4-causal-self-attention-impl",
          title: "Causal self-attention",
          explanation:
            "Implementing the QKV linear projection, causal mask buffer, scaled dot-product softmax, and dropout inside a reusable `CausalSelfAttention` module.",
          keyConcepts: ["c_attn = nn.Linear(n_embd, 3 * n_embd)", "Causal mask buffer", "Attention dropout"],
          learningOutcome: "Code a bug-free `CausalSelfAttention` module from scratch.",
        },
        {
          id: "p5-m4-mha-impl",
          title: "Multi-head attention",
          explanation:
            "Splitting the `3 * n_embd` projection into `q, k, v` of shape `(B, n_head, T, head_dim)`, running attention in parallel across heads, and reassembling `(B, T, n_embd)` via `.transpose(1, 2).contiguous().view(B, T, C)`.",
          keyConcepts: ["Head splitting & transposition", ".contiguous().view(B, T, C)", "c_proj output linear layer"],
          learningOutcome: "Execute multi-head tensor reshaping and output projection without shape errors.",
        },
        {
          id: "p5-m4-ffn-impl",
          title: "Feed-forward network",
          explanation:
            "Implementing the position-wise `MLP` block (`Linear(C, 4*C) -> GELU -> Linear(4*C, C)` or `SwiGLU`) that processes each token representation after attention.",
          keyConcepts: ["Expansion & contraction projections", "Non-linear activation", "Residual dropout"],
          learningOutcome: "Implement the Transformer Feed-Forward sublayer module.",
        },
        {
          id: "p5-m4-transformer-block-impl",
          title: "Transformer block",
          explanation:
            "Combining `ln_1`, `attn`, `ln_2`, and `mlp` with residual additions: `x = x + self.attn(self.ln_1(x))` and `x = x + self.mlp(self.ln_2(x))`.",
          keyConcepts: ["Pre-Norm residual wiring", "Clean modular composition"],
          learningOutcome: "Build and test a complete `Block(nn.Module)` class.",
        },
        {
          id: "p5-m4-gpt-model-impl",
          title: "GPT model",
          explanation:
            "Assembling embeddings, `nn.ModuleList` of $L$ `Block`s, final normalization `ln_f`, and the `lm_head` linear layer with weight tying and custom scaled parameter initialization.",
          keyConcepts: ["Full GPT nn.Module", "Weight tying", "Custom _init_weights"],
          learningOutcome: "Instantiate a complete `GPT` model from a `GPTConfig` dataclass (Milestone #10).",
        },
        {
          id: "p5-m4-loss-calculation",
          title: "Loss calculation",
          explanation:
            "Computing `F.cross_entropy(logits.view(-1, logits.size(-1)), targets.view(-1))` when `targets` are provided, or returning only the last position's logits `logits[:, [-1], :]` during inference for efficiency.",
          keyConcepts: ["Flattened cross-entropy loss", "Inference-time last-token optimization"],
          learningOutcome: "Implement dual training/inference forward pass logic in `GPT.forward()`.",
        },
        {
          id: "p5-m4-training-loop-impl",
          title: "Training loop",
          explanation:
            "Training your `GPT` model with `AdamW`, gradient clipping (`clip_grad_norm_(1.0)`), and periodic validation loss evaluation.",
          keyConcepts: ["Batch sampling", "Gradient clipping", "Validation loss monitoring"],
          learningOutcome: "Train your custom GPT model from random initialization and watch loss decrease smoothly.",
        },
        {
          id: "p5-m4-text-generation-impl",
          title: "Text generation",
          explanation:
            "Cropping context to `block_size`, running the forward pass, dividing logits by temperature, optionally filtering to top-k/top-p, applying softmax, and appending the sampled token with `torch.cat`.",
          keyConcepts: ["Context window cropping idx[:, -block_size:]", "Multinomial sampling", "Autoregressive append loop"],
          learningOutcome: "Generate multi-line text completions from your trained Mini GPT model.",
        },
      ],
      practicalExercises: [
        "Complete Primary Project Milestone #10: Build and train your complete `MiniGPT` architecture from scratch in PyTorch.",
      ],
      completionMilestone:
        "Implement a complete, working GPT architecture in PyTorch from scratch without pretrained model libraries (Milestone #10).",
      recommendedResources: [
        {
          title: "Andrej Karpathy — Let's build GPT: from scratch, in code, spelled out",
          provider: "Andrej Karpathy",
          url: "https://karpathy.ai/zero-to-hero.html",
        },
      ],
    },
    {
      id: "p5-m5",
      code: "5.5",
      title: "Text Generation",
      description:
        "Decoding strategies (greedy, temperature, top-k, top-p nucleus sampling), context window limits, stopping criteria, KV caching, and repetition mitigation.",
      estimatedEffort: "1.5 weeks · ~20–25 hours",
      whatYouWillLearn:
        "You will master the algorithms that turn next-token probability distributions into fluent generated text, and implement a Key-Value (KV) Cache that reduces generation complexity from quadratic $O(T^2)$ per step to linear $O(T)$.",
      whyItMatters:
        "How you decode from a language model dramatically affects output quality and latency: greedy decoding loops repetitively, high temperature hallucinates, and generating without a KV cache recomputes every past token's Keys and Values redundantly.",
      learningObjectives: [
        "Implement Greedy, Temperature, Top-k, and Top-p (Nucleus) decoding strategies.",
        "Implement a Key-Value (KV) Cache with prefill and decode stages and benchmark its speedup.",
        "Configure stopping criteria (`<|eos|>`, max new tokens, stop strings) and repetition penalties.",
      ],
      keyConcepts: [
        "Greedy vs stochastic decoding",
        "Temperature logit scaling",
        "Top-k & Top-p (Nucleus) truncation",
        "Prefill vs KV-cached token decoding",
        "Stopping criteria & repetition penalty",
      ],
      topics: [
        {
          id: "p5-m5-greedy-decoding",
          title: "Greedy decoding",
          explanation:
            "Always selecting $\\arg\\max_w P(w \\mid w_{<t})$ (equivalent to $T \\to 0$). Deterministic and useful for factual or math tasks, but prone to degenerate repetitive loops in open-ended generation.",
          keyConcepts: ["argmax selection", "Determinism", "Repetition trap in open text"],
          learningOutcome: "Implement greedy decoding and observe when deterministic argmax enters repetitive loops.",
        },
        {
          id: "p5-m5-temperature",
          title: "Temperature",
          explanation:
            "Dividing logits by $\\tau$ before softmax ($\\text{softmax}(z / \\tau)$): $\\tau < 1$ sharpens the distribution toward high-probability tokens; $\\tau > 1$ flattens the distribution to increase diversity.",
          keyConcepts: ["Logit scaling z / τ", "Entropy control", "Limiting behavior as τ -> 0"],
          learningOutcome: "Apply temperature scaling and plot how $\\tau \\in \\{0.2, 0.7, 1.0, 1.5\\}$ reshapes token probabilities.",
        },
        {
          id: "p5-m5-top-k",
          title: "Top-k sampling",
          explanation:
            "Zeroes out all probabilities outside the $k$ highest-logit tokens (e.g., $k=50$) before renormalizing, preventing the model from ever sampling the long tail of absurd low-probability tokens.",
          keyConcepts: ["torch.topk filtering", "Setting tail logits to -inf", "Fixed-k limitation on peaked vs flat distributions"],
          learningOutcome: "Implement Top-k logit filtering in 4 lines of PyTorch.",
        },
        {
          id: "p5-m5-top-p",
          title: "Top-p sampling",
          explanation:
            "Nucleus sampling sorts tokens by descending probability and keeps the smallest prefix whose cumulative probability exceeds $p$ (e.g., $p=0.9$), dynamically adapting the candidate pool size to the model's certainty.",
          keyConcepts: ["Cumulative probability torch.cumsum", "Dynamic candidate set size", "Combining temperature + top-p"],
          learningOutcome: "Implement Top-p (nucleus) sampling using `torch.sort` and `torch.cumsum`.",
        },
        {
          id: "p5-m5-context-windows",
          title: "Context windows",
          explanation:
            "The maximum sequence length $T_{\\max}$ a model was trained to attend over; exceeding $T_{\\max}$ requires sliding-window cropping or RoPE frequency scaling.",
          keyConcepts: ["Maximum sequence length block_size", "Sliding window truncation", "Quadratic memory growth with context"],
          learningOutcome: "Manage prompt + generation lengths within a model's context window.",
        },
        {
          id: "p5-m5-stopping-criteria",
          title: "Generation stopping criteria",
          explanation:
            "Halting generation immediately when the model emits the end-of-sequence token (`<|eos|>`), reaches `max_new_tokens`, or matches a user-specified stop string.",
          keyConcepts: ["EOS token detection", "max_new_tokens budget", "Stop-sequence matching"],
          learningOutcome: "Implement clean generation stopping conditions for single and batched requests.",
        },
        {
          id: "p5-m5-kv-caching",
          title: "KV caching",
          explanation:
            "In causal attention, past tokens' Keys $K_{1:t-1}$ and Values $V_{1:t-1}$ never change as new tokens are generated. Caching them in a buffer means step $t$ only computes $q_t, k_t, v_t$ for the single new token (`(B, 1, C)`), turning $O(T^3)$ total generation compute into $O(T^2)$.",
          keyConcepts: ["Prefill phase vs decode phase", "Appending k_t, v_t to cache buffer", "Massive latency reduction"],
          learningOutcome: "Add a KV Cache to `CausalSelfAttention` and measure the tokens/sec speedup as sequence length grows.",
        },
        {
          id: "p5-m5-repetition-effects",
          title: "Repetition effects",
          explanation:
            "Autoregressive self-reinforcement causes models to repeat phrases they have already generated; repetition and frequency penalties discount logits of tokens already present in the context.",
          keyConcepts: ["Self-reinforcing attention loops", "Presence & frequency logit penalties"],
          learningOutcome: "Implement a frequency/repetition penalty during autoregressive decoding.",
        },
      ],
      practicalExercises: [
        "Implement a unified `generate()` method supporting greedy decoding, temperature, top-k, top-p, `<|eos|>` stopping, and KV caching, and benchmark generation time for 256 tokens with vs. without the KV cache.",
      ],
      completionMilestone:
        "Implement KV-cached decoding with Temperature, Top-k, and Top-p sampling on your Mini GPT model.",
    },
  ],
  assignments: [
    "Implement Scaled Dot-Product Attention and verify causal masking prevents future token leakage.",
    "Implement Multi-Head Attention and Rotary Position Embeddings (RoPE).",
    "Implement a Pre-LN Transformer Block with RMSNorm/LayerNorm and GELU/SwiGLU FFN.",
    "Assemble and train a complete Mini GPT model from random initialization in PyTorch.",
    "Add Top-k, Top-p, Temperature, and KV Caching to your Mini GPT text generator.",
  ],
  primaryProjects: [
    {
      id: "milestone-09-self-attention-engine",
      milestoneNumber: 9,
      title: "Self-Attention Engine",
      phase: 5,
      shortDescription:
        "Implement single-head and multi-head causal scaled dot-product attention from scratch in PyTorch with RoPE positional rotations, attention matrix visualization, and causality unit tests.",
      skillsPracticed: [
        "Scaled dot-product attention QKᵀ / √d_k",
        "Causal lower-triangular masking",
        "Multi-head tensor splitting & merging",
        "Rotary Position Embeddings (RoPE)",
      ],
      expectedOutcome:
        "A standalone, unit-tested attention module with visual attention-head heatmap diagnostics.",
      difficulty: "advanced",
      difficultyLabel: "Advanced",
    },
    {
      id: "milestone-10-mini-gpt-architecture",
      milestoneNumber: 10,
      title: "Mini GPT Architecture",
      phase: 5,
      shortDescription:
        "Build a complete decoder-only Transformer (Mini GPT) from scratch in PyTorch—including embeddings, stacked Pre-LN Transformer blocks, weight tying, scaled initialization, and KV-cached Top-k/Top-p generation.",
      skillsPracticed: [
        "End-to-end decoder-only Transformer assembly",
        "RMSNorm / LayerNorm & SwiGLU / GELU FFN blocks",
        "Weight tying & residual depth initialization",
        "KV-cached autoregressive sampling (Top-k / Top-p)",
      ],
      expectedOutcome:
        "A complete, trainable GPT model written entirely in clean PyTorch tensor operations.",
      difficulty: "advanced",
      difficultyLabel: "Advanced",
    },
  ],
  supplementaryProjects: [
    {
      title: "Multi-Head Attention & KV-Cache Benchmark Lab",
      description:
        "Empirical latency and memory profiler comparing naive recomputation vs. KV-cached autoregressive generation across sequence lengths 64 to 2048.",
    },
  ],
  completionCriteriaSummary:
    "Build a functional decoder-only Transformer that can be trained from random initialization.",
  completionChecklist: [
    {
      id: "p5-check-concepts",
      question: "Can you write Attention(Q,K,V) = softmax(QKᵀ / sqrt(d_k))V and state the shape of every tensor?",
      detail: "Including why dividing by sqrt(d_k) keeps softmax from saturating.",
    },
    {
      id: "p5-check-exercises",
      question: "Have you built both Milestone #9 (Self-Attention Engine) and Milestone #10 (Mini GPT Architecture)?",
      detail: "Using your own PyTorch tensor code without importing pretrained Transformer classes.",
    },
    {
      id: "p5-check-implementation",
      question: "Can you explain how the causal mask, Pre-Norm residual stream, and weight tying work in your code?",
      detail: "Tracing a batch from token IDs (B, T) to output logits (B, T, V).",
    },
    {
      id: "p5-check-testing",
      question: "Have you verified that KV-cached decoding produces the exact same logits as full-sequence recomputation while running significantly faster?",
      detail: "Testing prefill + token-by-token decode parity.",
    },
    {
      id: "p5-check-limitations",
      question: "Can you explain why attention memory and compute scale quadratically O(T²) with sequence length T?",
      detail: "Understanding the hardware implications before scaling pretraining in Phase 6.",
    },
  ],
};
