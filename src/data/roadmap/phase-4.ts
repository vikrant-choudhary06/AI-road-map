import type { RoadmapPhase } from "@/types";

export const PHASE_4_NLP_LANGUAGE_MODELING: RoadmapPhase = {
  id: "phase-4",
  slug: "phase-4-nlp-language-modeling",
  phase: 4,
  code: "P4",
  title: "NLP & Language Modeling",
  shortDescription:
    "Understand how raw human text is normalized, tokenized into subword integer IDs, embedded into dense vectors, and modeled autoregressively.",
  purpose:
    "Understand how language is converted into numerical representations and modeled statistically.",
  estimatedWeeks: 6,
  difficulty: "intermediate",
  difficultyLabel: "Intermediate → Advanced",
  prerequisites: [
    {
      phaseNumber: 1,
      phaseId: "phase-1",
      label: "Phase 1: Probability, Cross-Entropy, and Vector Spaces",
    },
    {
      phaseNumber: 3,
      phaseId: "phase-3",
      label: "Phase 3: Deep Learning & PyTorch Fundamentals",
    },
  ],
  learningObjectives: [
    "Process Unicode/UTF-8 text and understand why modern LLMs operate on subword tokens rather than raw characters or whole words.",
    "Implement a complete Byte Pair Encoding (BPE) tokenizer from scratch with `encode()` and `decode()` methods.",
    "Explain how dense word/token embeddings capture semantic similarity in continuous vector spaces.",
    "Train autoregressive language models using next-token cross-entropy loss, evaluate them with perplexity, and understand why recurrent models bottleneck on long contexts.",
  ],
  modules: [
    {
      id: "p4-m1",
      code: "4.1",
      title: "Text Processing",
      description:
        "Unicode code points, UTF-8 byte streams, normalization forms, sentence segmentation, corpus cleaning, and vocabulary construction.",
      estimatedEffort: "1 week · ~14–16 hours",
      whatYouWillLearn:
        "You will learn how computers represent human writing systems as Unicode code points and variable-length UTF-8 byte sequences, how Unicode normalization prevents duplicate token representations, and how raw text corpora are cleaned and indexed into vocabularies.",
      whyItMatters:
        "Modern byte-level BPE tokenizers (used in GPT-2/3/4 and LLaMA-3) operate directly over UTF-8 byte streams so they can represent any character, emoji, or code symbol on Earth without ever producing an `<unk>` unknown token.",
      learningObjectives: [
        "Inspect Unicode code points (`ord`, `chr`) and variable-length UTF-8 byte encodings (`.encode('utf-8')`).",
        "Apply Unicode normalization (NFC / NFKC) and clean noisy text corpora without destroying code or math syntax.",
        "Build deterministic token-to-ID (`stoi`) and ID-to-token (`itos`) lookup tables.",
      ],
      keyConcepts: [
        "Unicode code points vs UTF-8 bytes",
        "NFC / NFKC normalization",
        "Corpus cleaning & segmentation",
        "stoi / itos vocabulary mapping",
        "Unknown (<unk>) token handling",
      ],
      topics: [
        {
          id: "p4-m1-unicode",
          title: "Unicode",
          explanation:
            "The Unicode standard assigns a unique integer code point (`U+0000` to `U+10FFFF`) to over 150,000 characters across human scripts, mathematical symbols, and emojis.",
          keyConcepts: ["Code points (ord() / chr())", "Multilingual scripts", "Combining characters"],
          learningOutcome: "Inspect Unicode code points of multilingual strings in Python.",
        },
        {
          id: "p4-m1-utf8",
          title: "UTF-8",
          explanation:
            "A variable-width encoding that represents every Unicode code point as 1 to 4 bytes (`0`–`255`), preserving 1-byte ASCII compatibility while enabling byte-level tokenization with a base vocabulary of just 256 byte values.",
          keyConcepts: ["1-to-4 byte variable width", "Base vocabulary of 256 bytes", "list(text.encode('utf-8'))"],
          learningOutcome: "Convert strings to raw UTF-8 byte lists and decode byte sequences back to strings.",
          formulaOrCode: "raw_bytes = list('Hello 🌍!'.encode('utf-8')) # integers in 0..255",
        },
        {
          id: "p4-m1-text-normalization",
          title: "Text normalization",
          explanation:
            "Visually identical characters (like `é` as a single code point vs. `e` + combining acute accent) have different byte sequences unless canonicalized via Unicode normalization (`unicodedata.normalize('NFC', text)`).",
          keyConcepts: ["NFC vs NFKC canonicalization", "Whitespace standardization", "When NOT to lowercase (code & proper nouns)"],
          learningOutcome: "Normalize Unicode strings consistently before tokenization.",
        },
        {
          id: "p4-m1-sentence-segmentation",
          title: "Sentence segmentation",
          explanation:
            "Splitting documents into sentences or semantic paragraphs while handling abbreviations (`Dr.`, `e.g.`, `3.14`) and code blocks accurately.",
          keyConcepts: ["Boundary disambiguation", "Document & paragraph chunking"],
          learningOutcome: "Segment raw documents into clean sentence and paragraph units.",
        },
        {
          id: "p4-m1-text-cleaning",
          title: "Text cleaning",
          explanation:
            "Removing broken HTML markup, control characters, and boilerplate navigation text while carefully preserving indentation and punctuation needed for code and prose.",
          keyConcepts: ["Stripping markup artifacts", "Preserving structural whitespace", "Filtering corrupted records"],
          learningOutcome: "Build reproducible text-cleaning pipelines for raw web or book corpora.",
        },
        {
          id: "p4-m1-vocabulary-construction",
          title: "Vocabulary construction",
          explanation:
            "Collecting unique tokens from a training corpus, sorting or ranking them by frequency, and assigning contiguous integer IDs `0 .. V-1` via bidirectional `stoi` and `itos` maps.",
          keyConcepts: ["Frequency thresholding", "Bijective stoi and itos dictionaries", "Vocabulary size V"],
          learningOutcome: "Construct deterministic vocabulary lookup tables from a training corpus.",
        },
        {
          id: "p4-m1-unknown-tokens",
          title: "Unknown tokens",
          explanation:
            "Word-level vocabularies map out-of-vocabulary (OOV) words to a shared `<unk>` token, destroying information—a flaw solved by character-level or byte-level subword tokenization.",
          keyConcepts: ["Out-of-vocabulary (OOV) problem", "<unk> information loss", "Why byte-level BPE eliminates <unk>"],
          learningOutcome: "Handle OOV tokens in word-level models and explain how byte-level subwords eliminate them.",
        },
      ],
      practicalExercises: [
        "Inspect the UTF-8 byte lengths of English, Devanagari, CJK, mathematical symbols, and emojis, verifying why `len(text)` differs from `len(text.encode('utf-8'))`.",
      ],
      completionMilestone:
        "Process multilingual UTF-8 text and construct deterministic vocabulary lookup tables.",
    },
    {
      id: "p4-m2",
      code: "4.2",
      title: "Traditional NLP",
      description:
        "Bag of Words, TF-IDF weighting, N-gram statistical language models with smoothing, and dense static embeddings (Word2Vec, GloVe).",
      estimatedEffort: "1 week · ~15–18 hours",
      whatYouWillLearn:
        "You will trace the evolution of text representation from sparse high-dimensional count vectors (Bag of Words, TF-IDF) and count-based N-gram transition tables to dense distributed word embeddings (Word2Vec, GloVe) where semantic similarity corresponds to vector geometry.",
      whyItMatters:
        "Understanding N-gram sparsity motivates neural language models, and understanding static word embeddings sets the stage for contextual Transformer embeddings.",
      learningObjectives: [
        "Build TF-IDF document representations and N-gram language models with Laplace/Kneser-Ney smoothing.",
        "Explain the distributional hypothesis and how Word2Vec (Skip-gram / CBOW) learns dense embeddings.",
        "Measure semantic similarity and analogies in embedding space using cosine similarity.",
      ],
      keyConcepts: [
        "Sparse Bag-of-Words & TF-IDF",
        "Markov N-gram language models",
        "Add-k / Laplace smoothing",
        "Word2Vec & GloVe embeddings",
        "Distributional semantic geometry",
      ],
      topics: [
        {
          id: "p4-m2-bag-of-words",
          title: "Bag of Words",
          explanation:
            "Represents a document as a sparse vector of length $V$ counting how many times each vocabulary word appears, discarding word order and grammar.",
          keyConcepts: ["Sparse count vector", "Loss of word order", "High dimensionality |V|"],
          learningOutcome: "Construct Bag-of-Words document-term matrices from raw text.",
        },
        {
          id: "p4-m2-tf-idf",
          title: "TF-IDF",
          explanation:
            "Multiplies Term Frequency ($\\text{TF}$) by Inverse Document Frequency ($\\log \\frac{N}{\\text{df}_t}$), down-weighting ubiquitous stop words ('the', 'is') and highlighting discriminative domain terms.",
          keyConcepts: ["Term frequency", "Inverse document frequency log(N / df)", "Lexical search baseline (BM25 precursor)"],
          learningOutcome: "Implement a vectorized TF-IDF document retriever using cosine similarity.",
        },
        {
          id: "p4-m2-ngram-models",
          title: "N-gram models",
          explanation:
            "Approximates $P(w_t \\mid w_{1:t-1}) \\approx P(w_t \\mid w_{t-n+1:t-1})$ by counting contiguous $n$-token sequences (bigrams, trigrams) in a corpus.",
          keyConcepts: ["Markov assumption", "Bigram & trigram count tables", "Exponential state explosion |V|^n"],
          learningOutcome: "Build a bigram and trigram language model that samples text from empirical count tables.",
        },
        {
          id: "p4-m2-smoothing",
          title: "Smoothing",
          explanation:
            "Any valid $n$-gram missing from the training corpus receives probability $0$ (and infinite perplexity) unless probability mass is reserved via Laplace ($+\\alpha$) smoothing or backoff.",
          keyConcepts: ["Zero-count catastrophe", "Add-alpha smoothing", "Interpolation & backoff"],
          learningOutcome: "Apply additive smoothing to N-gram count tables so unseen transitions have non-zero probability.",
        },
        {
          id: "p4-m2-word2vec",
          title: "Word2Vec",
          explanation:
            "Trains shallow neural networks to predict surrounding context words from a center word (Skip-gram) or vice versa (CBOW) using negative sampling, mapping words with similar contexts to nearby points in $\\mathbb{R}^d$.",
          keyConcepts: ["Distributional hypothesis", "Skip-gram & CBOW", "Negative sampling objective"],
          learningOutcome: "Implement Skip-gram with negative sampling to learn dense word embeddings on a small corpus.",
        },
        {
          id: "p4-m2-glove",
          title: "GloVe",
          explanation:
            "Global Vectors factorizes the log of the global word-word co-occurrence matrix so that dot products $w_i^T \\tilde{w}_j$ approximate log co-occurrence probabilities.",
          keyConcepts: ["Global co-occurrence matrix factorization", "Weighted least-squares objective"],
          learningOutcome: "Contrast local context-window prediction (Word2Vec) with global co-occurrence factorization (GloVe).",
        },
        {
          id: "p4-m2-word-embeddings",
          title: "Word embeddings",
          explanation:
            "An embedding layer (`nn.Embedding(V, d_model)`) is a lookup table matrix $E \\in \\mathbb{R}^{V \\times d}$ where integer token ID $i$ selects row $E[i]$—mathematically equivalent to multiplying a one-hot vector by $E$ without wasting compute on zeros.",
          keyConcepts: ["Lookup table E[token_id]", "Equivalence to one_hot @ E", "Static vs contextual embeddings"],
          learningOutcome: "Use `nn.Embedding` lookup tables and explain why static embeddings assign the same vector to polysemous words like 'bank'.",
        },
        {
          id: "p4-m2-semantic-similarity",
          title: "Semantic similarity",
            explanation:
              "In learned embedding spaces, synonyms cluster together with high cosine similarity and linear directions encode relational analogies ($v_{\\text{king}} - v_{\\text{man}} + v_{\\text{woman}} \\approx v_{\\text{queen}}$).",
            keyConcepts: ["Nearest-neighbor cosine retrieval", "Linear relational offsets"],
            learningOutcome: "Query nearest neighbors and vector analogies in an embedding matrix.",
        },
      ],
      practicalExercises: [
        "Build a Bigram and Trigram text generator with add-$k$ smoothing and evaluate its validation perplexity across different values of $k$.",
      ],
      completionMilestone:
        "Implement an N-gram text generator and explain how dense embedding lookup tables overcome N-gram sparsity.",
    },
    {
      id: "p4-m3",
      code: "4.3",
      title: "Tokenization",
      description:
        "Character, word, and subword tokenization; Byte Pair Encoding (BPE), WordPiece, Unigram, vocabulary sizing, and special control tokens.",
      estimatedEffort: "1.5 weeks · ~22–28 hours",
      whatYouWillLearn:
        "You will understand the fundamental tradeoff between sequence length and vocabulary size, compare character, word, and subword tokenization schemes, and implement a complete Byte Pair Encoding (BPE) tokenizer from scratch.",
      whyItMatters:
        "Tokenization defines the atomic units an LLM sees and generates. Poor tokenization inflates sequence lengths, wastes context windows, and impairs arithmetic and code generation.",
      learningObjectives: [
        "Implement a BPE tokenizer from scratch (Milestone #8) supporting `train()`, `encode()`, and `decode()`.",
        "Compare Byte Pair Encoding (BPE), WordPiece, and Unigram subword algorithms.",
        "Register and handle special control tokens (`<|bos|>`, `<|eos|>`, `<|pad|>`, `<|im_start|>`).",
      ],
      keyConcepts: [
        "Character vs Word vs Subword tradeoffs",
        "Byte Pair Encoding (BPE) merge loop",
        "WordPiece & Unigram LM tokenizers",
        "Vocabulary size vs sequence compression",
        "Special control tokens",
      ],
      topics: [
        {
          id: "p4-m3-char-tokenization",
          title: "Character-level tokenization",
          explanation:
            "Maps each individual character to an ID: tiny vocabulary ($V \\approx 65$–$256$), zero unknown tokens, but produces very long token sequences where each token carries minimal semantic meaning.",
          keyConcepts: ["Tiny vocabulary", "Long sequence length T", "Ideal for toy educational models"],
          learningOutcome: "Build a character-level tokenizer for initial neural language modeling experiments.",
        },
        {
          id: "p4-m3-word-tokenization",
          title: "Word-level tokenization",
          explanation:
            "Splits on whitespace/punctuation: short sequences, but requires massive vocabularies ($V > 500\\text{K}$), fails on morphological variants ('run', 'running', 'ran'), and collapses rare words into `<unk>`.",
          keyConcepts: ["Vocabulary explosion", "Morphological blindness", "OOV failure mode"],
          learningOutcome: "Explain why modern LLMs abandoned pure word-level tokenization.",
        },
        {
          id: "p4-m3-subword-tokenization",
          title: "Subword tokenization",
          explanation:
            "Keeps frequent words as single tokens ('the', 'function') while decomposing rare or compound words into meaningful subword morphemes ('token' + 'ization'), achieving both compact vocabularies and lossless coverage.",
          keyConcepts: ["Frequency-driven decomposition", "Morpheme sharing", "Optimal fertility (tokens per word)"],
          learningOutcome: "Explain how subword tokenization balances vocabulary size and sequence length.",
        },
        {
          id: "p4-m3-bpe",
          title: "Byte Pair Encoding",
          explanation:
            "Starts from individual UTF-8 bytes (`0..255`) and iteratively merges the most frequent adjacent pair of tokens into a new token ID until reaching target vocabulary size $V$, recording the ordered merge rules.",
          keyConcepts: ["Base 256 UTF-8 bytes", "Iterative most-frequent pair merge", "Deterministic merge priority during encode()"],
          learningOutcome: "Implement byte-level BPE training, encoding, and decoding from scratch in Python (Milestone #8).",
          formulaOrCode: "# Merge most frequent pair (p0, p1) -> new_id = 256 + step\nstats = get_pair_counts(token_ids)\nbest_pair = max(stats, key=stats.get)\ntoken_ids = merge_pair(token_ids, best_pair, new_id)",
        },
        {
          id: "p4-m3-wordpiece",
          title: "WordPiece",
          explanation:
            "Used in BERT; similar to BPE but selects merges that maximize corpus likelihood $\\frac{\\text{count}(ab)}{\\text{count}(a)\\text{count}(b)}$ rather than raw frequency, marking continuation subwords with `##`.",
          keyConcepts: ["Likelihood-ratio merge score", "## continuation prefix", "Greedy longest-match-first encoding"],
          learningOutcome: "Distinguish BPE frequency merges from WordPiece point-wise mutual information merges.",
        },
        {
          id: "p4-m3-unigram-tokenization",
          title: "Unigram tokenization",
          explanation:
            "Used in SentencePiece / T5; starts with a large candidate vocabulary and iteratively prunes subwords that least reduce overall corpus log-likelihood under a unigram language model.",
          keyConcepts: ["Top-down vocabulary pruning", "Viterbi most-likely segmentation", "Subword regularization"],
          learningOutcome: "Compare bottom-up BPE against top-down Unigram vocabulary construction.",
        },
        {
          id: "p4-m3-token-ids",
          title: "Token IDs",
          explanation:
            "The integer sequence $[t_1, t_2, \\dots, t_T] \\in \\{0, \\dots, V-1\\}^T$ fed as `torch.long` (`int64`) input into the model's embedding layer.",
          keyConcepts: ["int64 tensor inputs", "Out-of-bounds index assertions (< V)"],
          learningOutcome: "Convert tokenized text into batched `torch.long` tensors.",
        },
        {
          id: "p4-m3-vocabulary-sizes",
          title: "Vocabulary sizes",
          explanation:
            "Choosing $V$ (e.g., $32\\text{K}$, $50\\text{K}$, or $128\\text{K}$ in modern LLMs) trades off shorter sequences (faster attention) against a larger embedding & output projection matrix ($2 \\times V \\times d_{\\text{model}}$ parameters).",
          keyConcepts: ["Compression ratio (bytes per token)", "Embedding + LM head parameter cost", "Padding V to multiples of 64 for GPU Tensor Cores"],
          learningOutcome: "Analyze how vocabulary size $V$ impacts sequence length, VRAM, and LM head FLOPs.",
        },
        {
          id: "p4-m3-special-tokens",
          title: "Special tokens",
          explanation:
            "Reserved control tokens (`<|bos|>`, `<|eos|>`, `<|pad|>`, `<|im_start|>`, `<|im_end|>`) delineate document boundaries, padding masks, and multi-turn chat roles, and must never be split into subwords.",
          keyConcepts: ["Document boundary <eos>", "Padding token ignore_index", "Chat delimiter tokens"],
          learningOutcome: "Extend a BPE tokenizer to register and preserve atomic special tokens.",
        },
        {
          id: "p4-m3-encoding-decoding",
          title: "Encoding and decoding",
          explanation:
            "`encode(text) -> list[int]` applies pre-tokenization regex splits and learned merges in priority order; `decode(ids) -> str` concatenates token byte sequences and decodes UTF-8 (`errors='replace'`).",
          keyConcepts: ["Round-trip identity decode(encode(text)) == text", "Regex pre-tokenization splits", "Handling partial multi-byte UTF-8 sequences"],
          learningOutcome: "Verify lossless round-trip `decode(encode(text)) == text` across multilingual and code test suites.",
        },
      ],
      practicalExercises: [
        "Complete Primary Project Milestone #8: Implement a byte-level BPE Tokenizer from scratch, train it to vocabulary size 512 on a text corpus, and verify lossless round-trip encoding/decoding.",
      ],
      completionMilestone:
        "Implement a working Byte Pair Encoding (BPE) tokenizer from scratch with special token support (Milestone #8).",
      recommendedResources: [
        {
          title: "Andrej Karpathy — Let's build the GPT Tokenizer",
          provider: "Andrej Karpathy",
          url: "https://karpathy.ai/zero-to-hero.html",
        },
      ],
    },
    {
      id: "p4-m4",
      code: "4.4",
      title: "Language Modeling",
      description:
        "Autoregressive next-token prediction, conditional probability factorization, cross-entropy training, perplexity evaluation, and sampling.",
      estimatedEffort: "1.5 weeks · ~20–25 hours",
      whatYouWillLearn:
        "You will learn how raw token sequences are sliced into shifted `(input, target)` training pairs, how neural language models output next-token probability distributions trained via cross-entropy loss, and how perplexity measures predictive uncertainty.",
      whyItMatters:
        "Autoregressive next-token prediction is the exact training objective of GPT, LLaMA, Claude, and Gemini. Mastering input-target shifting and perplexity here applies directly to Transformer pretraining in Phases 5 and 6.",
      learningObjectives: [
        "Construct shifted `(x = tokens[:-1], y = tokens[1:])` autoregressive training examples.",
        "Explain how a model predicts a probability distribution over the vocabulary and minimizes negative log-likelihood / cross-entropy.",
        "Compute Perplexity ($\\text{PPL} = \\exp(L)$) and interpret it as the effective branching factor.",
      ],
      keyConcepts: [
        "Autoregressive chain-rule factorization",
        "Shifted (x, y) context-target slicing",
        "Next-token Cross-Entropy / NLL",
        "Perplexity = exp(cross_entropy)",
        "Multinomial temperature sampling",
      ],
      educationalExample: {
        title: "Autoregressive Next-Token Training Example",
        expression: "Input: \"The sky is\"   →   Target: \"blue\"",
        symbolBreakdown: [
          {
            symbol: "Context x = [\"The\", \"sky\", \"is\"]",
            meaning: "Input token sequence fed into the language model.",
          },
          {
            symbol: "Logits z ∈ ℝ^|V|",
            meaning: "Unnormalized score vector produced by the model for every token in vocabulary V.",
          },
          {
            symbol: "P(w_next | \"The sky is\") = softmax(z)",
            meaning: "Predicted probability distribution over all possible next words (e.g., P(\"blue\") = 0.62, P(\"clear\") = 0.18, …).",
          },
          {
            symbol: "Target y = ID(\"blue\")",
            meaning: "Ground-truth next token from the corpus; loss L = -log P(\"blue\" | \"The sky is\") pushes P(\"blue\") toward 1.",
          },
        ],
        takeaway:
          "A single sequence of length T+1 simultaneously provides T training examples: predicting token 2 from [1], token 3 from [1, 2], and token T+1 from [1..T].",
      },
      topics: [
        {
          id: "p4-m4-autoregressive-lm",
          title: "Autoregressive language modeling",
          explanation:
            "Predicts future tokens strictly from past tokens, generating sequences one token at a time by feeding each newly sampled token back into the context.",
          keyConcepts: ["Causal left-to-right generation", "Self-supervised training on raw text", "Context window slicing"],
          learningOutcome: "Slice raw token arrays into batched `(B, T)` inputs `x` and shifted `(B, T)` targets `y`.",
          formulaOrCode: "x = data[i : i + block_size]\ny = data[i + 1 : i + block_size + 1]",
        },
        {
          id: "p4-m4-conditional-prob-lm",
          title: "Conditional probability",
          explanation:
            "By the chain rule of probability, the joint probability of any document is exact: $P(w_1, \\dots, w_T) = \\prod_{t=1}^T P(w_t \\mid w_1, \\dots, w_{t-1})$.",
          keyConcepts: ["Exact chain-rule factorization", "Log-probability sum ∑ log P(w_t | w_<t)"],
          learningOutcome: "Compute the exact log-probability of a token sequence under an autoregressive model.",
        },
        {
          id: "p4-m4-next-token-prediction",
          title: "Next-token prediction",
          explanation:
            "Given context tokens, the model outputs logits of shape `(B, T, V)` where position `t` predicts the categorical distribution for token `t + 1`.",
          keyConcepts: ["Logit projection (d_model -> V)", "Parallel teacher-forced training across T positions"],
          learningOutcome: "Reshape `(B, T, V)` logits and `(B, T)` targets to compute token-level loss in a single call.",
        },
        {
          id: "p4-m4-mle-lm",
          title: "Maximum likelihood",
          explanation:
            "Adjusting model weights $\\theta$ to maximize the likelihood assigned to the real training corpus under the model's conditional distributions.",
          keyConcepts: ["Corpus likelihood maximization", "Empirical distribution matching"],
          learningOutcome: "Connect next-token training directly to Maximum Likelihood Estimation.",
        },
        {
          id: "p4-m4-nll",
          title: "Negative log-likelihood",
          explanation:
            "$\\text{NLL} = -\\frac{1}{T} \\sum_{t=1}^T \\log P_\\theta(w_t \\mid w_{<t})$ converts products of tiny probabilities into an average of positive losses measured in nats per token.",
          keyConcepts: ["Nats per token", "Random uniform initialization baseline = log(V)"],
          learningOutcome: "Verify that an untrained model with vocabulary size $V$ starts at loss $\\approx \\ln(V)$.",
        },
        {
          id: "p4-m4-cross-entropy-lm",
          title: "Cross-entropy",
          explanation:
            "For one-hot ground-truth next tokens, average token cross-entropy equals Negative Log-Likelihood (`F.cross_entropy(logits.view(-1, V), targets.view(-1))`).",
          keyConcepts: ["Flattening (B*T, V) for F.cross_entropy", "Bits-per-byte normalization across tokenizers"],
          learningOutcome: "Compute token-level cross-entropy and convert it to tokenizer-independent bits-per-byte.",
        },
        {
          id: "p4-m4-perplexity",
          title: "Perplexity",
          explanation:
            "$\\text{PPL} = \\exp(\\text{CrossEntropy})$ represents the effective number of equally likely tokens the model is choosing among at each step (lower is better; uniform random guessing gives $\\text{PPL} = V$).",
          keyConcepts: ["PPL = exp(loss)", "Effective branching factor intuition", "Why PPL cannot be compared across different vocabularies"],
          learningOutcome: "Calculate validation perplexity and explain why perplexity comparisons require identical tokenizers.",
        },
        {
          id: "p4-m4-sampling-lm",
          title: "Sampling",
          explanation:
            "Autoregressively generating text by taking the last time step's logits `logits[:, -1, :]`, scaling by temperature, converting to probabilities with softmax, and drawing the next token via `torch.multinomial`.",
          keyConcepts: ["Autoregressive generation loop", "Temperature scaling", "torch.multinomial"],
          learningOutcome: "Implement an autoregressive `generate()` method for any neural language model.",
        },
      ],
      practicalExercises: [
        "Complete Primary Project Milestone #7: Build and train a Character-Level Neural Language Model (MLP / Bengio-style embedding + hidden layer) and verify its initial loss matches $\\ln(V)$ before training.",
      ],
      completionMilestone:
        "Build and train a Character Language Model (Milestone #7), evaluate validation perplexity, and sample coherent text.",
    },
    {
      id: "p4-m5",
      code: "4.5",
      title: "Sequential Neural Models",
      description:
        "Recurrent Neural Networks (RNNs), LSTMs, teacher forcing, seq2seq encoder-decoders, and the information & parallelization bottlenecks that led to Transformers.",
      estimatedEffort: "1 week · ~14–18 hours",
      whatYouWillLearn:
        "You will implement recurrent sequence models (RNNs and LSTMs) for text generation, understand teacher forcing during training, examine sequence-to-sequence encoder-decoder architectures, and analyze the two fundamental bottlenecks of recurrence.",
      whyItMatters:
        "To deeply appreciate why the Transformer's self-attention mechanism revolutionized AI in 2017, you must first see firsthand how RNNs/LSTMs compress entire histories into a fixed-size vector and prevent parallel training across time steps.",
      learningObjectives: [
        "Train an RNN or LSTM language model using teacher forcing.",
        "Explain the fixed-vector information bottleneck in seq2seq encoder-decoder models.",
        "Articulate the two core limitations of recurrence: sequential O(T) training unroll and long-range gradient decay.",
      ],
      keyConcepts: [
        "Recurrent hidden-state unrolling",
        "LSTM gating in language modeling",
        "Teacher forcing vs free-running",
        "Seq2Seq encoder-decoder bottleneck",
        "Why recurrence cannot parallelize over time T",
      ],
      topics: [
        {
          id: "p4-m5-rnns-nlp",
          title: "RNNs",
          explanation:
            "Processes tokens sequentially $t = 1 \\dots T$, updating $h_t = \\tanh(W_{xh} x_t + W_{hh} h_{t-1} + b)$ and projecting $h_t$ to vocabulary logits at every step.",
          keyConcepts: ["Step-by-step unrolling", "Shared temporal weights", "Hidden state dimension"],
          learningOutcome: "Implement a vanilla RNN language model cell in PyTorch.",
        },
        {
          id: "p4-m5-lstms-nlp",
          title: "LSTMs",
          explanation:
            "Replaces the simple recurrent update with gated cell and hidden states $(c_t, h_t)$, allowing the model to selectively retain syntax and context across tens or hundreds of tokens.",
          keyConcepts: ["Forget/input/output gates", "nn.LSTM usage", "State tuple (h_t, c_t) detachment across batches"],
          learningOutcome: "Train a multi-layer LSTM text generator in PyTorch.",
        },
        {
          id: "p4-m5-teacher-forcing",
          title: "Teacher forcing",
          explanation:
            "Feeding the ground-truth token $w_t^*$ (rather than the model's own sampled prediction $\\hat{w}_t$) as input at step $t+1$ during training stabilizes learning and avoids compounding early errors.",
          keyConcepts: ["Ground-truth context during training", "Exposure bias between training and free-running inference"],
          learningOutcome: "Explain teacher forcing and the exposure bias between training and autoregressive generation.",
        },
        {
          id: "p4-m5-encoder-decoder",
          title: "Encoder-decoder architecture",
          explanation:
            "Reads an input sequence (e.g., French sentence) with an Encoder RNN into a final hidden vector $h_T$ and generates an output sequence (e.g., English translation) with a Decoder RNN initialized from $h_T$.",
          keyConcepts: ["Source encoder & target decoder", "Conditional sequence generation"],
          learningOutcome: "Trace tensor flow through an encoder-decoder sequence model.",
        },
        {
          id: "p4-m5-seq2seq",
          title: "Sequence-to-sequence modeling",
          explanation:
            "Maps variable-length input sequences to variable-length output sequences (translation, summarization) where input and output lengths $T_{\\text{in}} \\ne T_{\\text{out}}$ differ.",
          keyConcepts: ["Variable-length input/output mapping", "<bos> and <eos> stopping criteria"],
          learningOutcome: "Formulate translation and summarization as sequence-to-sequence tasks.",
        },
        {
          id: "p4-m5-limitations-recurrence",
          title: "Limitations of recurrence",
          explanation:
            "Recurrence has two fatal flaws at scale: (1) computing $h_t$ requires waiting for $h_{t-1}$, preventing GPU parallelization across sequence length $T$; and (2) compressing arbitrary-length history into a single fixed-size vector $h_t$ loses fine-grained distant details.",
          keyConcepts: ["Sequential O(T) latency during training", "Fixed-size hidden state bottleneck", "Direct motivation for Self-Attention"],
          learningOutcome: "Explain the exact computational and representational bottlenecks of RNNs that motivated the Transformer.",
        },
      ],
      practicalExercises: [
        "Train an LSTM text generator on a literary corpus and measure how training throughput degrades as sequence length $T$ increases due to sequential unrolling.",
      ],
      completionMilestone:
        "Implement a neural language model and articulate why eliminating recurrence in favor of direct token-to-token attention unlocks modern LLMs.",
    },
  ],
  assignments: [
    "Build an N-gram text generator with additive smoothing and compute its validation perplexity.",
    "Implement a complete Byte Pair Encoding (BPE) tokenizer from scratch with train(), encode(), and decode().",
    "Build and train a Character-Level Neural Language Model in PyTorch.",
    "Train an RNN or LSTM text generator and compare its validation perplexity against your N-gram and MLP models.",
  ],
  primaryProjects: [
    {
      id: "milestone-07-character-language-model",
      milestoneNumber: 7,
      title: "Character Language Model",
      phase: 4,
      shortDescription:
        "Build and train an autoregressive character-level neural language model in PyTorch using token embeddings, context-window slicing, cross-entropy loss, perplexity tracking, and temperature-controlled multinomial sampling.",
      skillsPracticed: [
        "Shifted (x, y) autoregressive batch construction",
        "nn.Embedding lookup tables & hidden projections",
        "Cross-entropy loss & Perplexity evaluation",
        "Autoregressive sampling with temperature",
      ],
      expectedOutcome:
        "A neural language model that learns spelling, word structure, and stylistic patterns directly from raw text.",
      difficulty: "intermediate",
      difficultyLabel: "Intermediate",
    },
    {
      id: "milestone-08-bpe-tokenizer",
      milestoneNumber: 8,
      title: "BPE Tokenizer",
      phase: 4,
      shortDescription:
        "Implement a byte-level Byte Pair Encoding (BPE) tokenizer from scratch in Python capable of training merge tables on any UTF-8 corpus, registering special tokens, and performing lossless encode/decode round-trips.",
      skillsPracticed: [
        "UTF-8 byte stream manipulation",
        "Iterative pair-frequency counting & merging",
        "Priority-ordered merge application in encode()",
        "Special token (<|bos|>, <|eos|>) handling",
      ],
      expectedOutcome:
        "A reusable, GPT-compatible BPE tokenizer ready to tokenize datasets for your Mini GPT in Phase 5 and Pretrained LLM in Phase 6.",
      difficulty: "intermediate",
      difficultyLabel: "Intermediate → Advanced",
    },
  ],
  supplementaryProjects: [
    {
      title: "N-Gram Statistical Text Generator",
      description:
        "Bigram and trigram Markov language model with Laplace smoothing and perplexity benchmarking.",
    },
    {
      title: "RNN / LSTM Sequential Text Generator",
      description:
        "Multi-layer recurrent neural language model demonstrating teacher forcing and hidden-state carry-over.",
    },
  ],
  completionCriteriaSummary:
    "Understand the full process of converting text into tokens, learning token probabilities, and generating sequences.",
  completionChecklist: [
    {
      id: "p4-check-concepts",
      question: "Can you explain how UTF-8 byte-level BPE eliminates unknown (<unk>) tokens?",
      detail: "Starting from 256 base byte values and iteratively merging frequent pairs.",
    },
    {
      id: "p4-check-exercises",
      question: "Have you implemented both Milestone #7 (Character Language Model) and Milestone #8 (BPE Tokenizer)?",
      detail: "Including lossless decode(encode(text)) == text verification.",
    },
    {
      id: "p4-check-implementation",
      question: "Can you explain how an input sequence is shifted by one position to create autoregressive (input, target) pairs?",
      detail: "For example, Input: 'The sky is' -> Target: 'blue' across all prefix positions simultaneously.",
    },
    {
      id: "p4-check-testing",
      question: "Have you verified that your untrained language model starts at loss ≈ ln(V) and improves perplexity on a validation split?",
      detail: "Confirming your loss calculation and logit shapes are bug-free.",
    },
    {
      id: "p4-check-limitations",
      question: "Can you explain the two main limitations of RNNs/LSTMs that led to the invention of the Transformer?",
      detail: "Sequential O(T) unrolling preventing GPU parallelization, and the fixed-size hidden state bottleneck.",
    },
  ],
};
