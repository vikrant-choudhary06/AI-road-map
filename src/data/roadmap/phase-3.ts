import type { RoadmapPhase } from "@/types";

export const PHASE_3_DEEP_LEARNING: RoadmapPhase = {
  id: "phase-3",
  slug: "phase-3-deep-learning-neural-networks",
  phase: 3,
  code: "P3",
  title: "Deep Learning & Neural Networks",
  shortDescription:
    "Implement multi-layer neural networks, reverse-mode automatic differentiation, and PyTorch training pipelines from the ground up.",
  purpose:
    "Implement neural networks and understand their internal training mechanisms.",
  estimatedWeeks: 8,
  difficulty: "intermediate",
  difficultyLabel: "Intermediate → Advanced",
  prerequisites: [
    {
      phaseNumber: 1,
      phaseId: "phase-1",
      label: "Phase 1: Mathematics for AI (Matrix Calculus, Chain Rule, Gradients)",
    },
    {
      phaseNumber: 2,
      phaseId: "phase-2",
      label: "Phase 2: Machine Learning From Scratch (Loss Functions & Optimization)",
    },
  ],
  learningObjectives: [
    "Explain and implement forward propagation, activation functions, and backpropagation across multi-layer networks.",
    "Build a micrograd-style reverse-mode automatic differentiation engine in pure Python.",
    "Master PyTorch tensors, autograd, nn.Module layers, DataLoaders, checkpointing, and mixed-precision training loops.",
    "Understand the inductive biases of CNNs, RNNs, LSTMs, Autoencoders, and Reinforcement Learning.",
  ],
  modules: [
    {
      id: "p3-m1",
      code: "3.1",
      title: "Neural Network Fundamentals",
      description:
        "Neurons, feedforward layers, modern activations (ReLU, GELU, SiLU), forward/backward passes, initialization, normalization, and residual streams.",
      estimatedEffort: "2.5 weeks · ~38–45 hours",
      whatYouWillLearn:
        "You will learn how stacking linear matrix transformations with non-linear activation functions enables neural networks to approximate arbitrary functions, and how initialization, normalization, and residual connections keep gradients healthy across deep layers.",
      whyItMatters:
        "Without non-linear activations, a 100-layer network collapses into a single linear matrix multiplication. Without proper initialization, normalization, and residual connections, deep networks fail to train due to vanishing or exploding gradients.",
      learningObjectives: [
        "Implement forward and backward passes for linear layers and modern activations (ReLU, GELU, SiLU, Softmax).",
        "Explain why Xavier/He weight initialization and Layer/Batch Normalization stabilize activation variance.",
        "Trace how residual connections ($y = x + F(x)$) create an unimpeded gradient highway during backpropagation.",
      ],
      keyConcepts: [
        "Affine layers + non-linearities",
        "ReLU, GELU & SiLU activations",
        "Forward & backward propagation",
        "Xavier / He initialization",
        "Normalization & residual highways",
      ],
      topics: [
        {
          id: "p3-m1-artificial-neurons",
          title: "Artificial neurons",
          explanation:
            "A computational unit that computes a weighted sum of inputs plus a bias ($z = w^T x + b$) and applies a non-linear activation function $a = \\phi(z)$.",
          keyConcepts: ["Pre-activation z", "Post-activation a", "Geometrical half-space"],
          learningOutcome: "Implement a single artificial neuron forward and backward step.",
        },
        {
          id: "p3-m1-perceptrons",
          title: "Perceptrons",
          explanation:
            "Rosenblatt's classical binary threshold classifier; its inability to solve non-linearly separable tasks like XOR proved the necessity of multi-layer networks with smooth differentiable activations.",
          keyConcepts: ["Step threshold function", "Linear separability limit (XOR)", "Historical motivation for MLPs"],
          learningOutcome: "Demonstrate why a single perceptron cannot separate XOR and how a 2-layer network solves it.",
        },
        {
          id: "p3-m1-weights-biases",
          title: "Weights and biases",
          explanation:
            "For a layer mapping $d_{\\text{in}} \\to d_{\\text{out}}$, the weight matrix $W \\in \\mathbb{R}^{d_{\\text{in}} \\times d_{\\text{out}}}$ rotates/scales inputs and the bias vector $b \\in \\mathbb{R}^{d_{\\text{out}}}$ shifts activation thresholds.",
          keyConcepts: ["Parameter tensor shapes", "Broadcast addition of bias", "Total parameter calculation"],
          learningOutcome: "Calculate exact weight and bias shapes for any multi-layer architecture.",
        },
        {
          id: "p3-m1-feedforward-networks",
          title: "Feedforward networks",
          explanation:
            "Multi-Layer Perceptrons (MLPs) compose sequential layers $h^{(l)} = \\phi(h^{(l-1)} W^{(l)} + b^{(l)})$ without feedback loops, forming both standalone classifiers and the FFN sublayer inside every Transformer block.",
          keyConcepts: ["Hidden layer representations", "Universal Approximation Theorem", "Depth vs width"],
          learningOutcome: "Assemble multi-layer feedforward networks from modular layer objects.",
        },
        {
          id: "p3-m1-fully-connected-layers",
          title: "Fully connected layers",
          explanation:
            "Dense linear projections (`nn.Linear`) where every output unit connects to every input unit, executing batched matrix multiplication $Y = XW + b$ accompanied by backward gradients $dX = dY \\cdot W^T$ and $dW = X^T \\cdot dY$.",
          keyConcepts: ["Forward Y = XW + b", "Input gradient dX = dY @ Wᵀ", "Weight gradient dW = Xᵀ @ dY"],
          learningOutcome: "Code a `Linear` layer class with explicit `forward()` and `backward()` methods.",
          formulaOrCode: "dX = dY @ W.T\ndW = X.T @ dY\ndb = dY.sum(axis=0)",
        },
        {
          id: "p3-m1-activation-functions",
          title: "Activation functions",
          explanation:
            "Element-wise non-linear functions that break linearity between matrix multiplications so stacked layers learn hierarchical features.",
          keyConcepts: ["Why linearity collapses (W₁W₂ = W₃)", "Saturation & vanishing gradients", "Smooth vs piecewise linear"],
          learningOutcome: "Prove algebraically that stacking linear layers without activations equals a single linear layer.",
        },
        {
          id: "p3-m1-sigmoid",
          title: "Sigmoid",
          explanation:
            "$\\sigma(x) = \\frac{1}{1 + e^{-x}} \\in (0, 1)$ has derivative $\\sigma(x)(1 - \\sigma(x)) \\le 0.25$, which saturates near 0 and 1 and causes vanishing gradients in deep hidden layers, though it remains ideal for binary gates.",
          keyConcepts: ["Range (0, 1)", "Maximum derivative 0.25", "Tail saturation"],
          learningOutcome: "Explain why sigmoid causes vanishing gradients when stacked across many layers.",
        },
        {
          id: "p3-m1-tanh",
          title: "Tanh",
          explanation:
            "$\\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}} \\in (-1, 1)$ is zero-centered with derivative $1 - \\tanh^2(x) \\le 1$, improving over sigmoid for hidden states in RNNs/LSTMs.",
          keyConcepts: ["Zero-centered outputs", "Derivative 1 - tanh²(x)", "Tail saturation"],
          learningOutcome: "Compare tanh and sigmoid activation dynamics and derivatives.",
        },
        {
          id: "p3-m1-relu",
          title: "ReLU",
          explanation:
            "Rectified Linear Unit $\\text{ReLU}(x) = \\max(0, x)$ has derivative $1$ for $x > 0$ and $0$ for $x < 0$, eliminating positive-side saturation at the risk of 'dead ReLUs' when units stay negative.",
          keyConcepts: ["max(0, x)", "Non-saturating positive gradient", "Dying ReLU phenomenon"],
          learningOutcome: "Implement ReLU forward and backward passes using boolean masks.",
        },
        {
          id: "p3-m1-gelu",
          title: "GELU",
          explanation:
            "Gaussian Error Linear Unit $\\text{GELU}(x) = x \\Phi(x)$ smoothly weights inputs by their Gaussian cumulative probability, serving as the standard activation in GPT-2, BERT, and Vision Transformers.",
          keyConcepts: ["Smooth probabilistic gating", "Non-zero gradient for slightly negative x", "Tanh approximation"],
          learningOutcome: "Implement GELU and compare its smooth curvature near zero against ReLU.",
        },
        {
          id: "p3-m1-silu",
          title: "SiLU",
          explanation:
            "Sigmoid Linear Unit (Swish) $\\text{SiLU}(x) = x \\cdot \\sigma(x)$ pairs with gating in SwiGLU feed-forward networks used across modern LLaMA, Mistral, and DeepSeek LLMs.",
          keyConcepts: ["x * sigmoid(x)", "Smooth self-gated activation", "Foundation of SwiGLU"],
          learningOutcome: "Implement SiLU and its analytical derivative in NumPy and PyTorch.",
        },
        {
          id: "p3-m1-softmax",
          title: "Softmax",
          explanation:
            "Converts a vector of arbitrary real logits $z \\in \\mathbb{R}^V$ into a normalized probability distribution $p_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}$ summing to 1.",
          keyConcepts: ["Simplex normalization", "Temperature scaling z / T", "Shift invariance"],
          learningOutcome: "Compute softmax probabilities over vocabulary logits.",
        },
        {
          id: "p3-m1-cross-entropy-nn",
          title: "Cross-entropy",
          explanation:
            "Combining Softmax and Negative Log-Likelihood into a single fused operation yields the clean upstream logit gradient $\\frac{\\partial L}{\\partial z_i} = p_i - y_i$.",
          keyConcepts: ["Fused log-softmax + NLL", "Analytical gradient p - one_hot(y)"],
          learningOutcome: "Implement fused Softmax + Cross-Entropy forward and backward passes.",
        },
        {
          id: "p3-m1-forward-propagation",
          title: "Forward propagation",
          explanation:
            "Sequentially passing input tensors through each layer while caching intermediate activations needed later during the backward pass.",
          keyConcepts: ["Activation caching", "Inference mode (no caching needed) vs training mode"],
          learningOutcome: "Trace activation shapes and cached intermediates through a multi-layer forward pass.",
        },
        {
          id: "p3-m1-backpropagation",
          title: "Backpropagation",
          explanation:
            "Propagating upstream loss sensitivities $\\frac{\\partial L}{\\partial a^{(l)}}$ backward from the output layer to the first layer using cached forward activations and local Jacobians.",
          keyConcepts: ["Reverse-mode chain rule", "Reusing cached activations", "Linear memory & compute cost"],
          learningOutcome: "Implement manual backpropagation across a 3-layer MLP without autograd.",
        },
        {
          id: "p3-m1-weight-initialization",
          title: "Weight initialization",
          explanation:
            "Initializing weights all to zero causes symmetry (every neuron learns the same thing); too large causes exploding activations; Xavier ($1/\\sqrt{d_{\\text{in}}}$) and He ($\\sqrt{2/d_{\\text{in}}}$) preserve activation and gradient variance across depth.",
          keyConcepts: ["Symmetry breaking", "Xavier / Glorot initialization", "Kaiming / He initialization for ReLU"],
          learningOutcome: "Initialize layer weights with Kaiming/Xavier scaling and verify constant activation variance across 20 layers.",
        },
        {
          id: "p3-m1-dropout",
          title: "Dropout",
          explanation:
            "Randomly zeroes a fraction $p$ of activations during training and scales remaining activations by $\\frac{1}{1-p}$ (inverted dropout) to prevent co-adaptation, while acting as an identity pass during inference.",
          keyConcepts: ["Inverted dropout scaling 1/(1-p)", "Train vs eval mode behavior", "Regularization effect"],
          learningOutcome: "Implement inverted Dropout with distinct training and evaluation behavior.",
        },
        {
          id: "p3-m1-normalization",
          title: "Normalization",
          explanation:
              "BatchNorm normalizes across the batch dimension for CNNs; LayerNorm and RMSNorm normalize across the feature dimension independently for each token, making them standard in Transformers.",
          keyConcepts: ["BatchNorm vs LayerNorm vs RMSNorm", "Learnable scale γ and shift β", "Stabilizing deep training"],
          learningOutcome: "Implement LayerNorm from scratch and explain why Transformers use LayerNorm/RMSNorm instead of BatchNorm.",
        },
        {
          id: "p3-m1-residual-connections",
          title: "Residual connections",
          explanation:
            "Skip connections $y = x + F(x)$ have gradient $\\frac{\\partial y}{\\partial x} = I + \\frac{\\partial F}{\\partial x}$, ensuring gradients flow unimpeded through the identity term $I$ even in 100-layer networks.",
          keyConcepts: ["Identity skip pathway", "Gradient highway", "Residual stream view of Transformers"],
          learningOutcome: "Explain mathematically why residual connections prevent vanishing gradients in deep architectures.",
        },
      ],
      practicalExercises: [
        "Implement a modular NumPy neural network with `Linear`, `ReLU`, `GELU`, `LayerNorm`, and `SoftmaxCrossEntropy` layers.",
        "Plot activation histograms across a 10-layer MLP under naive `N(0, 1)` initialization vs. He `N(0, sqrt(2/d_in))` initialization.",
      ],
      completionMilestone:
        "Implement forward and backward propagation across a multi-layer neural network in pure NumPy (Milestone #5).",
    },
    {
      id: "p3-m2",
      code: "3.2",
      title: "Automatic Differentiation",
      description:
        "Building a dynamic reverse-mode autodiff engine (micrograd-style) with computational graphs, topological sorting, and gradient accumulation.",
      estimatedEffort: "2 weeks · ~30–35 hours",
      whatYouWillLearn:
        "You will demystify PyTorch's `loss.backward()` by building your own reverse-mode automatic differentiation engine from scratch—tracking parent nodes in a dynamic DAG, writing local backward closures, and propagating gradients in reverse topological order.",
      whyItMatters:
        "Once you have built an autograd engine yourself, `requires_grad=True`, `loss.backward()`, and `optimizer.zero_grad()` cease to be magic incantations—you understand every pointer and gradient accumulation step.",
      learningObjectives: [
        "Build a micrograd-style automatic differentiation engine in pure Python.",
        "Explain why reverse-mode autodiff computes gradients with respect to millions of inputs in a single backward pass.",
        "Explain why gradients must be accumulated (`+=`) when a node is used multiple times in a graph.",
      ],
      keyConcepts: [
        "Dynamic DAG construction",
        "Operator overloading (__add__, __mul__, __pow__)",
        "Topological sorting",
        "Reverse-mode Vector-Jacobian Products",
        "Gradient accumulation (+=)",
      ],
      topics: [
        {
          id: "p3-m2-computational-graphs",
          title: "Computational graphs",
          explanation:
            "Every mathematical expression evaluated during a forward pass constructs a Directed Acyclic Graph (DAG) where leaves are parameters/inputs and internal nodes are elementary operations.",
          keyConcepts: ["Leaf vs internal nodes", "Parent pointers (_prev)", "Operation labels (_op)"],
          learningOutcome: "Construct and inspect dynamic expression graphs in Python.",
        },
        {
          id: "p3-m2-scalar-operations",
          title: "Scalar operations",
          explanation:
            "Overloading `+`, `*`, `-`, `/`, `**`, `exp()`, and `tanh()` on a `Value` wrapper object records the operation history alongside the computed numerical value.",
          keyConcepts: ["Python dunder overloading", "Reverse operands (__radd__, __rmul__)", "Elementary local derivatives"],
          learningOutcome: "Implement a `Value` class supporting arithmetic and non-linear operations.",
        },
        {
          id: "p3-m2-gradient-tracking",
          title: "Gradient tracking",
          explanation:
            "Each node stores a `.data` attribute (forward value) and a `.grad` attribute initialized to `0.0` that holds $\\frac{\\partial L}{\\partial \\text{node}}$ after the backward pass.",
          keyConcepts: ["Forward .data vs backward .grad", "Zeroing gradients before each pass"],
          learningOutcome: "Track and reset `.grad` buffers cleanly across training steps.",
        },
        {
          id: "p3-m2-chain-rule-autodiff",
            title: "Chain rule",
            explanation:
              "Each operation defines a `_backward()` closure that multiplies its own upstream gradient `out.grad` by the local derivative and adds the result into each parent's `.grad`.",
            keyConcepts: ["Upstream gradient * local derivative", "Closure capture"],
            learningOutcome: "Write exact `_backward()` closures for addition, multiplication, power, exp, and ReLU.",
        },
        {
          id: "p3-m2-reverse-mode-autodiff",
          title: "Reverse-mode automatic differentiation",
          explanation:
            "Forward-mode autodiff requires one pass per input parameter, whereas reverse-mode autodiff computes derivatives of a single scalar loss with respect to all $N$ parameters in a single backward sweep.",
          keyConcepts: ["1 scalar output vs N parameters", "O(1) backward cost relative to forward pass"],
          learningOutcome: "Explain why deep learning uses reverse-mode rather than forward-mode differentiation.",
        },
        {
          id: "p3-m2-backward-passes",
          title: "Backward passes",
          explanation:
            "Running Depth-First Search (DFS) topological sort from the loss node ensures every node's upstream consumers have finished propagating gradients before the node itself runs `_backward()`.",
          keyConcepts: ["Topological sort via DFS", "Seeding loss.grad = 1.0", "Reversed topological iteration"],
          learningOutcome: "Implement `backward()` using DFS topological ordering.",
        },
        {
          id: "p3-m2-gradient-accumulation",
          title: "Gradient accumulation",
          explanation:
            "When a variable $x$ is used along multiple paths (e.g., $y = x + x$ or weight sharing), multivariate chain rule sums the contributions (`self.grad += ...`). Using `=` instead of `+=` silently overwrites gradients.",
          keyConcepts: ["Multivariate chain rule sum", "+= accumulation requirement", "Why zero_grad() is necessary"],
          learningOutcome: "Prove why `+=` is mandatory when a variable branches in a computational graph.",
        },
        {
          id: "p3-m2-numerical-grad-check",
          title: "Numerical gradient checking",
          explanation:
            "Comparing every `.grad` produced by your autograd engine against centered finite differences (`(f(x+h) - f(x-h)) / 2h`) or PyTorch `torch.Tensor` gradients to guarantee 100% correctness.",
          keyConcepts: ["Automated parity tests against PyTorch", "Finite-difference verification"],
          learningOutcome: "Verify your custom autograd engine against PyTorch on complex multi-layer expressions.",
        },
      ],
      practicalExercises: [
        "Complete Primary Project Milestone #4: Build a complete micrograd-style `Value` (and/or 2D `Tensor`) autograd engine with `Neuron`, `Layer`, and `MLP` classes.",
        "Write a `pytest` suite that constructs a 3-layer MLP in your engine and verifies every parameter gradient matches PyTorch to within `1e-7`.",
      ],
      completionMilestone:
        "Build and test a working reverse-mode automatic differentiation engine in pure Python (Milestone #4).",
      recommendedResources: [
        {
          title: "Andrej Karpathy — The spelled-out intro to neural networks and backpropagation: building micrograd",
          provider: "Andrej Karpathy",
          url: "https://karpathy.ai/zero-to-hero.html",
        },
      ],
    },
    {
      id: "p3-m3",
      code: "3.3",
      title: "PyTorch Fundamentals",
      description:
        "PyTorch tensors, GPU acceleration, autograd mechanics, nn.Module architecture, DataLoaders, checkpointing, and mixed precision.",
      estimatedEffort: "2 weeks · ~30–35 hours",
      whatYouWillLearn:
        "You will transition from your custom NumPy/autograd engines to idiomatic PyTorch—mastering device placement (`cpu`/`cuda`), custom `nn.Module` layers, `Dataset`/`DataLoader` pipelines, training/validation loops, checkpointing, and `torch.amp` mixed precision.",
      whyItMatters:
        "PyTorch is the foundational framework used to implement, pretrain, and fine-tune modern Transformers and Large Language Models in Phases 5–8.",
      learningObjectives: [
        "Create, reshape, and move tensors across CPU and GPU devices cleanly.",
        "Build custom `nn.Module` neural architectures and train them with `torch.optim.AdamW`.",
        "Write production-grade training and validation loops with checkpointing and mixed precision.",
      ],
      keyConcepts: [
        "torch.Tensor & device placement",
        "requires_grad & torch.no_grad()",
        "nn.Module & nn.Parameter",
        "Dataset & DataLoader batching",
        "Checkpointing & mixed precision",
      ],
      topics: [
        {
          id: "p3-m3-tensors",
          title: "Tensors",
          explanation:
            "`torch.Tensor` mirrors NumPy's `ndarray` API (`view`, `reshape`, `transpose`, `@`, broadcasting) while adding GPU execution and automatic differentiation tracking.",
          keyConcepts: ["Strides & contiguous()", "view() vs reshape()", "Zero-copy NumPy bridge"],
          learningOutcome: "Manipulate PyTorch tensors fluently across arbitrary dimensions.",
        },
        {
          id: "p3-m3-cpu-gpu-tensors",
          title: "CPU and GPU tensors",
          explanation:
            "Moving models and batches to accelerator memory (`.to(device)`) enables massive parallel execution; operations require all participating tensors to reside on the same device.",
          keyConcepts: ["torch.device('cuda' if ... else 'cpu')", "Device mismatch errors", "Non-blocking host-to-device transfers"],
          learningOutcome: "Write device-agnostic PyTorch code that runs seamlessly on CPU or GPU.",
        },
        {
          id: "p3-m3-autograd",
          title: "Autograd",
          explanation:
            "Tensors with `requires_grad=True` record operations onto a dynamic tape; calling `loss.backward()` populates `.grad` attributes, while `with torch.no_grad():` disables graph construction during evaluation.",
          keyConcepts: ["requires_grad", "loss.backward()", "torch.no_grad() & detach()", "In-place modification errors"],
          learningOutcome: "Control PyTorch autograd graph construction and memory usage during training and inference.",
        },
        {
          id: "p3-m3-nn-module",
          title: "nn.Module",
          explanation:
            "`torch.nn.Module` is the base class for all neural network layers and models, automatically registering submodules, managing `.train()`/`.eval()` modes, and exporting `.state_dict()`.",
          keyConcepts: ["Submodule registration", "forward() definition", "model.train() vs model.eval()"],
          learningOutcome: "Implement custom neural network layers and architectures by subclassing `nn.Module`.",
        },
        {
          id: "p3-m3-trainable-parameters",
          title: "Trainable parameters",
          explanation:
            "`nn.Parameter` wraps tensors so they automatically appear in `model.parameters()` and `model.named_parameters()` for optimizer updates and parameter counting.",
          keyConcepts: ["nn.Parameter", "Counting total vs trainable parameters", "Freezing layers (requires_grad = False)"],
          learningOutcome: "Inspect, count, and selectively freeze or unfreeze model parameters.",
          formulaOrCode: "num_params = sum(p.numel() for p in model.parameters() if p.requires_grad)",
        },
        {
          id: "p3-m3-optimizers",
          title: "Optimizers",
          explanation:
            "`torch.optim.SGD` and `torch.optim.AdamW` manage parameter groups, momentum buffers, decoupled weight decay, and step updates (`optimizer.zero_grad(set_to_none=True)`, `optimizer.step()`).",
          keyConcepts: ["optimizer.zero_grad(set_to_none=True)", "optimizer.step()", "Parameter groups for weight decay"],
          learningOutcome: "Configure `AdamW` with separate weight-decay and non-weight-decay parameter groups.",
        },
        {
          id: "p3-m3-dataset-dataloader",
          title: "Dataset and DataLoader",
          explanation:
            "`Dataset` defines `__len__` and `__getitem__`; `DataLoader` handles shuffling, mini-batch collation, multiprocessing workers (`num_workers`), and pinned memory (`pin_memory`).",
          keyConcepts: ["Custom Dataset class", "Collate functions", "Shuffling train vs sequential eval"],
          learningOutcome: "Build custom PyTorch `Dataset` and `DataLoader` pipelines.",
        },
        {
          id: "p3-m3-loss-functions",
          title: "Loss functions",
          explanation:
            "`F.cross_entropy` expects unnormalized logits `(B, C)` and integer class indices `(B,)` (applying fused `log_softmax` internally)—passing already-softmaxed probabilities is a common beginner bug.",
          keyConcepts: ["F.cross_entropy expects raw logits", "ignore_index for padding tokens", "Reduction modes (mean, sum, none)"],
          learningOutcome: "Apply `F.cross_entropy` and `F.mse_loss` with correct tensor shapes and reductions.",
        },
        {
          id: "p3-m3-training-loops",
          title: "Training loops",
          explanation:
            "The canonical 5-step training iteration: set `model.train()`, fetch batch, compute forward pass & loss, call `optimizer.zero_grad()`, `loss.backward()`, optional `clip_grad_norm_`, and `optimizer.step()`.",
          keyConcepts: ["Canonical 5-step update", "Gradient norm clipping", "Step-level loss logging"],
          learningOutcome: "Write clean, bug-free PyTorch training loops from memory.",
        },
        {
          id: "p3-m3-validation-loops",
          title: "Validation loops",
          explanation:
            "Switching to `model.eval()` (disabling Dropout and locking BatchNorm stats) inside `with torch.no_grad():` computes unbiased validation loss and accuracy without allocating autograd graphs.",
          keyConcepts: ["model.eval() + torch.no_grad()", "Restoring model.train() afterward", "Best-validation tracking"],
          learningOutcome: "Implement memory-efficient validation loops that accurately track generalization.",
        },
        {
          id: "p3-m3-checkpointing",
          title: "Checkpointing",
          explanation:
            "Saving a dictionary containing `model.state_dict()`, `optimizer.state_dict()`, `step`, and `val_loss` via `torch.save` allows resuming interrupted runs without losing optimizer momentum.",
          keyConcepts: ["state_dict serialization", "Saving optimizer & scheduler state", "Resuming training cleanly"],
          learningOutcome: "Save and resume complete training checkpoints in PyTorch.",
        },
        {
          id: "p3-m3-mixed-precision",
          title: "Mixed precision",
          explanation:
            "`torch.amp.autocast` runs matrix multiplications in 16-bit (`bfloat16` or `float16`) for 2×–3× higher throughput and lower VRAM while keeping master weights and reductions in `float32`.",
          keyConcepts: ["torch.amp.autocast", "BF16 dynamic range advantage over FP16", "GradScaler for FP16"],
          learningOutcome: "Integrate `torch.amp.autocast` into training loops for faster execution.",
        },
        {
          id: "p3-m3-basic-profiling",
          title: "Basic profiling",
          explanation:
            "Measuring step time, tokens/samples per second, and peak memory (`torch.cuda.max_memory_allocated()`) reveals whether training is bottlenecked by CPU data loading or GPU compute.",
          keyConcepts: ["Throughput (samples/sec)", "Data-loading vs compute bottlenecks", "Memory profiling"],
          learningOutcome: "Measure training throughput and identify pipeline bottlenecks.",
        },
      ],
      practicalExercises: [
        "Re-implement your Phase 3 NumPy MLP as a clean `torch.nn.Module` and verify both models reach comparable validation accuracy on MNIST.",
        "Write a checkpoint manager that saves the best validation model and resumes training from an arbitrary epoch.",
      ],
      completionMilestone:
        "Build, train, validate, checkpoint, and profile neural networks in PyTorch (Milestone #6).",
    },
    {
      id: "p3-m4",
      code: "3.4",
      title: "Other Deep Learning Architectures",
      description:
        "Convolutional Neural Networks (CNNs), Recurrent Neural Networks (RNNs), LSTMs, Autoencoders, Generative Models, and Reinforcement Learning fundamentals.",
      estimatedEffort: "1.5 weeks · ~22–28 hours",
      whatYouWillLearn:
        "You will understand how different neural architectures encode domain-specific inductive biases—spatial translation invariance in CNNs, sequential recurrence in RNNs/LSTMs, bottleneck compression in Autoencoders, distribution learning in Generative Models, and reward maximization in Reinforcement Learning.",
      whyItMatters:
        "Not every AI problem uses a Transformer. Understanding CNNs (used in multimodal vision encoders), RNNs/LSTMs (the historical predecessor to attention), Autoencoders (used in latent diffusion), and RL (used in RLHF and reasoning models) gives you complete architectural literacy.",
      learningObjectives: [
        "Explain the inductive biases of CNNs, RNNs/LSTMs, and Autoencoders.",
        "Build and train an image classification model (Milestone #6: Image Classifier).",
        "Understand the core MDP formulation of Reinforcement Learning (states, actions, rewards, policies) needed later for RLHF in Phase 7.",
      ],
      keyConcepts: [
        "Spatial convolutions (CNNs)",
        "Recurrent hidden states (RNN / LSTM)",
        "Encoder-bottleneck-decoder Autoencoders",
        "Generative distribution modeling",
        "RL agents, policies & rewards",
      ],
      topics: [
        {
          id: "p3-m4-cnns",
          title: "Convolutional neural networks",
          explanation:
            "CNNs slide shared local filters ($K \\times K$ kernels) across spatial grids, enforcing locality and translation equivariance with far fewer parameters than dense layers—powering image classifiers and vision encoders.",
          keyConcepts: ["Local receptive fields", "Weight sharing across space", "Stride, padding & channels", "Pooling & ResNets"],
          learningOutcome: "Implement a 2D convolutional network in PyTorch for image classification.",
        },
        {
          id: "p3-m4-rnns",
          title: "Recurrent neural networks",
          explanation:
            "RNNs process variable-length sequences step by step via $h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b)$, sharing weights across time but suffering from vanishing/exploding gradients over long horizons during Backpropagation Through Time (BPTT).",
          keyConcepts: ["Hidden state recurrence h_t", "Backpropagation Through Time (BPTT)", "Sequential bottleneck (no time parallelization)"],
          learningOutcome: "Explain how RNNs maintain sequential state and why BPTT struggles over long sequences.",
        },
        {
          id: "p3-m4-lstms",
          title: "LSTMs",
          explanation:
            "Long Short-Term Memory networks introduce an additive cell state $c_t$ regulated by learnable forget, input, and output sigmoid gates, mitigating vanishing gradients over medium-length sequences.",
          keyConcepts: ["Additive cell state highway", "Forget, input, and output gates", "GRU simplification"],
          learningOutcome: "Trace how gated additive updates in LSTMs preserve gradient flow across time steps.",
        },
        {
          id: "p3-m4-autoencoders",
          title: "Autoencoders",
          explanation:
            "An encoder compresses input $x$ into a low-dimensional latent bottleneck $z = f(x)$, and a decoder reconstructs $\\hat{x} = g(z)$ by minimizing reconstruction loss—learning compact nonlinear representations.",
          keyConcepts: ["Encoder-bottleneck-decoder", "Reconstruction loss", "Denoising & Variational Autoencoders (VAE)"],
          learningOutcome: "Build an autoencoder and inspect its learned low-dimensional latent space.",
        },
        {
          id: "p3-m4-generative-models",
          title: "Generative models introduction",
          explanation:
            "Whereas discriminative models estimate $P(y \\mid x)$, generative models learn the data distribution $P(x)$ so new samples can be synthesized—via autoregressive factorization (LLMs), VAEs, or iterative denoising (Diffusion).",
          keyConcepts: ["Discriminative P(y|x) vs Generative P(x)", "Autoregressive, VAE, and Diffusion families"],
          learningOutcome: "Categorize modern generative modeling paradigms and their training objectives.",
        },
        {
          id: "p3-m4-rl-fundamentals",
          title: "Reinforcement learning fundamentals",
          explanation:
            "An agent with policy $\\pi_\\theta(a \\mid s)$ interacts with an environment to maximize expected cumulative reward. Policy gradient methods increase the probability of actions that yield positive advantage—the mechanism behind RLHF and reasoning RL in Phase 7.",
          keyConcepts: ["State, Action, Reward, Policy π(a|s)", "Return & Value functions", "Policy gradient intuition"],
          learningOutcome: "Formulate sequential decision-making with states, actions, policies, and rewards.",
        },
      ],
      practicalExercises: [
        "Complete Primary Project Milestone #6: Train and compare both a NumPy/PyTorch MLP and a PyTorch CNN on MNIST handwritten digit classification.",
        "Train a small Convolutional Autoencoder on MNIST and visualize latent space interpolations between digit classes.",
      ],
      completionMilestone:
        "Train an Image Classifier (Milestone #6) and articulate the tradeoffs between MLP, CNN, RNN, and Autoencoder architectures.",
    },
  ],
  assignments: [
    "Build a micrograd-style reverse-mode automatic differentiation engine in pure Python and verify against PyTorch.",
    "Implement a multi-layer neural network with Linear, ReLU/GELU, LayerNorm, and SoftmaxCrossEntropy in pure NumPy.",
    "Train an MNIST handwritten digit classifier using both your NumPy network and a PyTorch CNN/MLP.",
    "Implement checkpoint saving, validation tracking, and learning-rate warmup in PyTorch.",
  ],
  primaryProjects: [
    {
      id: "milestone-04-autograd-engine",
      milestoneNumber: 4,
      title: "Automatic Differentiation Engine",
      phase: 3,
      shortDescription:
        "Build a dynamic reverse-mode autodiff engine in pure Python that constructs computational DAGs, performs topological sorting, and backpropagates exact gradients through multi-layer perceptrons.",
      skillsPracticed: [
        "Dynamic computational graph construction",
        "Reverse-mode chain rule & topological sort",
        "Gradient accumulation (+=) handling",
        "Parity testing against torch.autograd",
      ],
      expectedOutcome:
        "A working micrograd-style autodiff engine capable of training a multi-layer neural network from scratch.",
      difficulty: "intermediate",
      difficultyLabel: "Intermediate",
    },
    {
      id: "milestone-05-neural-network-scratch",
      milestoneNumber: 5,
      title: "Neural Network From Scratch",
      phase: 3,
      shortDescription:
        "Implement a vectorized multi-layer neural network in pure NumPy with forward activation caching, explicit backward pass Jacobians, He initialization, Dropout, LayerNorm, and Adam optimization.",
      skillsPracticed: [
        "Vectorized Linear, ReLU, GELU, and Softmax layers",
        "Explicit matrix backpropagation (dX, dW, db)",
        "He/Xavier initialization & LayerNorm",
        "Finite-difference gradient verification",
      ],
      expectedOutcome:
        "A modular NumPy deep learning library that trains multi-layer networks without PyTorch or TensorFlow.",
      difficulty: "intermediate",
      difficultyLabel: "Intermediate → Advanced",
    },
    {
      id: "milestone-06-image-classifier",
      milestoneNumber: 6,
      title: "Image Classifier",
      phase: 3,
      shortDescription:
        "Build, train, and evaluate an MNIST handwritten digit and image classification pipeline in PyTorch comparing MLP and CNN architectures with checkpointing and confusion matrix diagnostics.",
      skillsPracticed: [
        "PyTorch nn.Module, Dataset & DataLoader",
        "MLP vs 2D Convolutional Neural Networks",
        "Training/validation loops & checkpointing",
        "Per-class error & misclassified sample analysis",
      ],
      expectedOutcome:
        "A reproducible PyTorch vision classifier achieving >98.5% test accuracy on MNIST with diagnostic visualization.",
      difficulty: "intermediate",
      difficultyLabel: "Intermediate",
    },
  ],
  supplementaryProjects: [
    {
      title: "PyTorch Neural Network & Activation Telemetry Lab",
      description:
        "Diagnostic experiment comparing activation distributions and gradient norms across 15 layers with and without Residual Connections and LayerNorm.",
    },
  ],
  completionCriteriaSummary:
    "Explain and implement forward propagation, backward propagation, loss calculation, and parameter updates.",
  completionChecklist: [
    {
      id: "p3-check-concepts",
      question: "Can you explain how forward activation caching, reverse-mode autodiff, and residual connections work?",
      detail: "Including why y = x + F(x) prevents vanishing gradients.",
    },
    {
      id: "p3-check-exercises",
      question: "Have you built both the pure-Python Autograd Engine (Milestone #4) and the NumPy Neural Network (Milestone #5)?",
      detail: "Verifying every backward gradient against numerical finite differences or PyTorch.",
    },
    {
      id: "p3-check-implementation",
      question: "Can you write the forward and backward equations for a Linear layer (dX = dY @ Wᵀ, dW = Xᵀ @ dY) from memory?",
      detail: "Checking that all matrix dimensions align.",
    },
    {
      id: "p3-check-testing",
      question: "Have you trained and evaluated your PyTorch Image Classifier (Milestone #6) with proper train/eval mode switching?",
      detail: "Using model.eval() and torch.no_grad() during validation.",
    },
    {
      id: "p3-check-limitations",
      question: "Can you explain why standard fixed-size MLPs and CNNs struggle with variable-length text sequences?",
      detail: "Setting up the transition to tokenization and sequence modeling in Phase 4.",
    },
  ],
};
