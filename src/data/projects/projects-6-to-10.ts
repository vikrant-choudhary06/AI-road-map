import type { CurriculumProject } from "@/types";

export const PROJECTS_6_TO_10: CurriculumProject[] = [
  // ============================================================================
  // PROJECT 6 — IMAGE CLASSIFIER
  // ============================================================================
  {
    id: "milestone-06-image-classifier",
    slug: "image-classifier",
    milestoneNumber: 6,
    title: "Image Classifier",
    subtitle:
      "Train, evaluate, checkpoint, and diagnose an image classification pipeline in PyTorch",
    shortDescription:
      "Train a handwritten digit recognizer or image classification model in PyTorch—implementing dataset normalization, DataLoaders, network architecture, training/validation loops, confusion matrix diagnostics, failure inspection, and checkpoint save/load inference.",
    detailedOverview:
      "Having built automatic differentiation (Project 4) and a NumPy neural network from scratch (Project 5), you now have the conceptual foundation to use PyTorch with complete understanding of what happens inside `loss.backward()` and `optimizer.step()`. In this project, you will build a reproducible computer vision training and evaluation pipeline on a classic benchmark such as MNIST or Fashion-MNIST. You will explore class distributions, normalize pixel intensities, wrap splits in `DataLoader` batches, compare a flattened MLP against a Convolutional Neural Network (`Conv2d`), track training and validation metrics, plot a 10×10 confusion matrix, inspect the highest-confidence misclassifications, and serialize/reload model checkpoints for standalone inference.",
    whyThisProjectMatters:
      "This project establishes the canonical PyTorch engineering workflow (`Dataset` -> `DataLoader` -> `nn.Module` -> `train/eval` loop -> `state_dict` checkpointing) that you will reuse for language modeling, Transformers, and LLM pretraining in Phases 4–8.",
    phase: 3,
    difficulty: "intermediate",
    difficultyFilter: "Intermediate",
    difficultyLabel: "Intermediate",
    estimatedEffort: "10–14 hours · 1–2 weeks",
    technologies: ["PyTorch", "NumPy", "Matplotlib"],
    prerequisites: [
      "Project 5 (Neural Network From Scratch) and Phase 3 PyTorch fundamentals",
      "Understanding of `torch.Tensor`, `nn.Module`, `DataLoader`, and `model.train()` vs `model.eval()`",
    ],
    requiredMathConcepts: [
      "Channel-wise pixel standardization: x_norm = (x - μ) / σ",
      "2D spatial convolution and receptive fields: H_out = ⌊(H + 2P - K)/S⌋ + 1",
      "Multi-class Cross-Entropy loss over C = 10 class logits",
      "10×10 Confusion Matrix where entry M_{i,j} counts true class i predicted as class j",
    ],
    learningObjectives: [
      "Load, inspect, and normalize an image dataset and construct batched PyTorch `DataLoader` pipelines.",
      "Implement a clean `nn.Module` architecture (MLP and/or CNN) and separate `train_one_epoch` and `evaluate` functions.",
      "Generate a 10×10 confusion matrix and visually inspect misclassified images to diagnose failure patterns.",
      "Save model weights and metadata with `torch.save(state_dict)` and reload them into a fresh model instance for deterministic inference.",
    ],
    skillsPracticed: [
      "PyTorch `Dataset` & `DataLoader` pipelines",
      "MLP vs CNN (`Conv2d`, `BatchNorm2d`, `MaxPool2d`) architecture design",
      "Confusion matrix & visual error analysis",
      "Model checkpointing (`state_dict`) & inference reloading",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "Dataset Exploration, Normalization & DataLoaders",
        summary:
          "Load MNIST/Fashion-MNIST, inspect class balance and sample grids, normalize pixel tensors, and create DataLoaders.",
        taskIds: ["p6-t01", "p6-t02", "p6-t03", "p6-t04"],
      },
      {
        stageNumber: 2,
        title: "Network Architecture, Training Loop & Validation",
        summary:
          "Define the `nn.Module` classifier and implement reproducible training and `torch.no_grad()` validation loops.",
        taskIds: ["p6-t05", "p6-t06", "p6-t07"],
      },
      {
        stageNumber: 3,
        title: "Accuracy Evaluation, Confusion Matrix & Error Analysis",
        summary:
          "Compute test accuracy, build a 10×10 confusion matrix, and visualize misclassified examples.",
        taskIds: ["p6-t08", "p6-t09", "p6-t10"],
      },
      {
        stageNumber: 4,
        title: "Checkpoint Serialization & Standalone Inference",
        summary:
          "Save best checkpoints and verify reloading into a fresh model for single-image inference.",
        taskIds: ["p6-t11", "p6-t12"],
      },
    ],
    tasks: [
      {
        id: "p6-t01",
        stepNumber: 1,
        title: "Load an image dataset such as MNIST",
        explanation:
          "MNIST (`28×28` grayscale handwritten digits `0–9`) or Fashion-MNIST provides 60,000 training images and 10,000 test images that train rapidly on CPU or GPU.",
        instructions:
          "Load MNIST (or Fashion-MNIST) and split the 60,000 training images into 50,000 training and 10,000 validation examples, keeping the 10,000 test set strictly held out.",
        expectedOutcome:
          "Three distinct dataset splits: `train_ds` (50k), `val_ds` (10k), and `test_ds` (10k).",
        acceptanceCriteria:
          "Fixed random seed (`torch.manual_seed(42)`) ensures reproducible train/val splitting.",
        difficulty: "Core",
      },
      {
        id: "p6-t02",
        stepNumber: 2,
        title: "Explore data distributions",
        explanation:
          "Checking label counts and plotting a grid of raw images ensures labels align with visual content.",
        instructions:
          "Count samples per digit class `0–9` and save a `4×8` Matplotlib grid displaying sample images with their ground-truth labels.",
        expectedOutcome:
          "Class distribution summary and sample visualization grid.",
        acceptanceCriteria:
          "Verifies image tensor shape `(1, 28, 28)` and pixel range.",
        difficulty: "Core",
      },
      {
        id: "p6-t03",
        stepNumber: 3,
        title: "Normalize input images",
        explanation:
          "Scaling uint8 pixels `[0, 255]` to zero-mean, unit-variance float32 tensors stabilizes gradient magnitudes in the first layer.",
        instructions:
          "Convert images to `float32` in `[0.0, 1.0]` and normalize using the training set's mean (`0.1307` for MNIST) and standard deviation (`0.3081`).",
        expectedOutcome:
          "Normalized input tensors have mean `~0.0` and std `~1.0` across the training split.",
        acceptanceCriteria:
          "Validation and test splits use the exact same normalization constants.",
        difficulty: "Core",
      },
      {
        id: "p6-t04",
        stepNumber: 4,
        title: "Create data loaders",
        explanation:
          "PyTorch `DataLoader` handles mini-batching and per-epoch shuffling automatically.",
        instructions:
          "Wrap `train_ds`, `val_ds`, and `test_ds` in `DataLoader` instances (`batch_size=64` or `128`), enabling `shuffle=True` for `train_loader` and `shuffle=False` for `val_loader` and `test_loader`.",
        expectedOutcome:
          "Iterating `next(iter(train_loader))` yields `(images, labels)` of shapes `(B, 1, 28, 28)` and `(B,)`.",
        acceptanceCriteria:
          "Validation and test loaders do not shuffle examples.",
        difficulty: "Core",
      },
      {
        id: "p6-t05",
        stepNumber: 5,
        title: "Define the network architecture",
        explanation:
          "Subclassing `torch.nn.Module` lets you define either a flattened MLP or a spatial CNN (`Conv2d -> ReLU -> MaxPool2d -> Linear`) that outputs 10 raw class logits.",
        instructions:
          "Implement `DigitClassifier(nn.Module)` in `vision/model.py`. Return raw unnormalized logits of shape `(B, 10)` from `forward(x)` (do not apply `Softmax` inside `forward` since `nn.CrossEntropyLoss` expects raw logits).",
        expectedOutcome:
          "Passing a dummy tensor `torch.randn(8, 1, 28, 28)` outputs logits of shape `(8, 10)`.",
        acceptanceCriteria:
          "Includes a helper function counting total trainable parameters (`sum(p.numel() for p in model.parameters() if p.requires_grad)`).",
        difficulty: "Core",
      },
      {
        id: "p6-t06",
        stepNumber: 6,
        title: "Implement a training loop",
        explanation:
          "Each training batch follows the five-step PyTorch rhythm: `model.train()`, forward pass, loss calculation, `optimizer.zero_grad()`, `loss.backward()`, and `optimizer.step()`.",
        instructions:
          "Implement `train_one_epoch(model, loader, criterion, optimizer, device)` that computes average batch loss and training accuracy across the epoch.",
        expectedOutcome:
          "Returns `(avg_train_loss, train_accuracy)` for each epoch.",
        acceptanceCriteria:
          "Explicitly sets `model.train()` at the start of the function.",
        difficulty: "Core",
      },
      {
        id: "p6-t07",
        stepNumber: 7,
        title: "Implement validation",
        explanation:
          "During validation, we disable gradient tracking (`with torch.no_grad():`) and set `model.eval()` so Dropout and BatchNorm use evaluation behavior.",
        instructions:
          "Implement `evaluate(model, loader, criterion, device)` decorated with `@torch.no_grad()` and calling `model.eval()`.",
        expectedOutcome:
          "Fast, memory-efficient evaluation returning `(val_loss, val_accuracy)`.",
        acceptanceCriteria:
          "No gradients are allocated during validation.",
        difficulty: "Core",
      },
      {
        id: "p6-t08",
        stepNumber: 8,
        title: "Evaluate model accuracy",
        explanation:
          "After selecting the best model checkpoint based on validation accuracy, final performance is measured once on the held-out 10,000-image test set.",
        instructions:
          "Train for 5–10 epochs, log train/val loss and accuracy curves, and evaluate overall test accuracy and per-class accuracy on `test_loader`.",
        expectedOutcome:
          "Test accuracy `>= 97.5%` (MLP) or `>= 99.0%` (CNN) on MNIST.",
        acceptanceCriteria:
          "Reports both overall test accuracy and accuracy for each digit `0–9`.",
        difficulty: "Core",
      },
      {
        id: "p6-t09",
        stepNumber: 9,
        title: "Generate a confusion matrix",
        explanation:
          "A 10×10 confusion matrix reveals which digit pairs are most frequently confused (such as `4` vs `9` or `3` vs `5`).",
        instructions:
          "Compute a `10×10` integer confusion matrix `cm[true_label, pred_label]` over the test set and render it as an annotated heatmap using Matplotlib.",
        expectedOutcome:
          "Saved `plots/confusion_matrix.png` showing diagonal dominance and off-diagonal confusions.",
        acceptanceCriteria:
          "Sum of all entries in the confusion matrix equals `len(test_ds)` (`10,000`).",
        difficulty: "Core",
      },
      {
        id: "p6-t10",
        stepNumber: 10,
        title: "Analyze incorrect predictions",
        explanation:
          "Visualizing the model's top mistakes alongside their predicted softmax probabilities reveals ambiguous handwriting or systematic model blind spots.",
        instructions:
          "Collect misclassified test samples, sort them by highest wrong-class confidence, and plot the top 12 errors showing `True: y | Pred: ŷ (p=...)`.",
        expectedOutcome:
          "Saved figure `plots/top_misclassifications.png` and written failure analysis.",
        acceptanceCriteria:
          "Displays the actual image, true label, predicted label, and softmax confidence.",
        difficulty: "Core",
      },
      {
        id: "p6-t11",
        stepNumber: 11,
        title: "Save model checkpoints",
        explanation:
          "Saving `model.state_dict()` along with configuration metadata allows resuming training or deploying the model without retraining.",
        instructions:
          "Whenever validation accuracy improves, save a checkpoint dictionary `{'model_state_dict': model.state_dict(), 'val_acc': val_acc, 'epoch': epoch, 'config': config}` to `checkpoints/best_model.pt`.",
        expectedOutcome:
          "Persisted `.pt` checkpoint file containing weights and validation metadata.",
        acceptanceCriteria:
          "Uses `state_dict()` rather than pickling the entire class instance.",
        difficulty: "Core",
      },
      {
        id: "p6-t12",
        stepNumber: 12,
        title: "Load a model for inference",
        explanation:
          "An inference function instantiates a fresh model, loads `state_dict`, sets `model.eval()`, and returns the predicted class and probability distribution for a single image.",
        instructions:
          "Implement `predict_single_image(checkpoint_path, image_tensor)` and write a test verifying that the reloaded model produces identical logits (`torch.allclose`) to the original trained model.",
        expectedOutcome:
          "Reloaded model outputs exact same predictions and probabilities as before saving.",
        acceptanceCriteria:
          "Automated test verifies `torch.allclose(logits_before, logits_after)`.",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "Dataset normalized using training statistics and wrapped in train/val/test DataLoaders.",
      "Training and `torch.no_grad()` validation loops implemented with `model.train()` and `model.eval()`.",
      "10×10 confusion matrix and visual analysis of misclassified examples generated.",
      "Model checkpoint saved via `state_dict` and verified to produce identical inference outputs when reloaded.",
    ],
    testingGuide: {
      summary:
        "Test forward output shapes, single-batch overfitting sanity check, and checkpoint save/load determinism.",
      verificationCommand: "pytest tests/test_image_classifier.py -v",
      testCases: [
        {
          title: "Single-Batch Overfit Sanity Check",
          purpose:
            "Verify that the model and optimizer can drive training loss near zero on a single mini-batch of 16 images.",
          verificationSteps:
            "Take 1 batch of 16 images, run 50 optimizer steps, and check final accuracy on that batch.",
          expectedResult: "Batch accuracy reaches 100% and loss drops below 0.02.",
        },
        {
          title: "Checkpoint Save & Reload Logit Equivalence",
          purpose:
            "Confirm that `state_dict` serialization preserves exact model behavior in `eval()` mode.",
          verificationSteps:
            "Save `model.state_dict()` to a temporary path, instantiate a fresh `DigitClassifier`, call `load_state_dict`, and compare outputs on a test batch.",
          expectedResult: "`torch.allclose(out1, out2, atol=1e-6)` is True.",
        },
      ],
    },
    codeExamples: [
      {
        title: "PyTorch Evaluation Loop & Checkpoint Save/Reload Pattern",
        language: "python",
        purpose:
          "Demonstrates the standard `@torch.no_grad()` evaluation function and `state_dict` checkpointing.",
        code: `import torch
import torch.nn as nn
from torch.utils.data import DataLoader

@torch.no_grad()
def evaluate(
    model: nn.Module,
    loader: DataLoader,
    criterion: nn.Module,
    device: torch.device,
) -> tuple[float, float, torch.Tensor]:
    model.eval()
    total_loss = 0.0
    correct = 0
    total = 0
    confusion = torch.zeros(10, 10, dtype=torch.int64)

    for images, labels in loader:
        images, labels = images.to(device), labels.to(device)
        logits = model(images)
        loss = criterion(logits, labels)

        total_loss += loss.item() * images.size(0)
        preds = logits.argmax(dim=1)
        correct += int((preds == labels).sum().item())
        total += images.size(0)

        for t, p in zip(labels.view(-1), preds.view(-1)):
            confusion[int(t), int(p)] += 1

    return total_loss / total, correct / total, confusion`,
      },
    ],
    hints: [
      {
        id: "p6-h1",
        title: "Do Not Apply `Softmax` Before `nn.CrossEntropyLoss`",
        category: "Common Mistake",
        content:
          "In PyTorch, `nn.CrossEntropyLoss()` internally applies `F.log_softmax` followed by `F.nll_loss`. If your model's `forward()` already applies `F.softmax(x)`, you are taking the softmax of probabilities twice, which severely compresses gradients and stalls learning! Always return raw logits from `forward()`.",
      },
      {
        id: "p6-h2",
        title: "Why `model.eval()` Matters Even Without `Dropout`",
        category: "Debugging Technique",
        content:
          "If your CNN includes `nn.BatchNorm2d`, leaving the model in `.train()` mode during single-image inference normalizes using that single image's batch statistics instead of the learned running mean and variance. Always call `model.eval()` before inference.",
      },
    ],
    optionalChallenges: [
      {
        id: "p6-oc1",
        title: "MLP vs. CNN Parameter-Efficiency Benchmark",
        description:
          "Compare a 2-layer MLP against a 2-layer CNN with fewer total parameters, measuring test accuracy and robustness to 2-pixel image shifts.",
        whatYouLearn:
          "Why translation equivariance and weight sharing in convolutions outperform dense layers on spatial grids.",
      },
      {
        id: "p6-oc2",
        title: "First-Layer Convolutional Filter & Feature Map Visualization",
        description:
          "Plot the learned `3×3` or `5×5` convolutional kernels of `conv1` and the resulting activation maps on a test digit.",
        whatYouLearn:
          "How early CNN layers learn edge, stroke, and corner detectors.",
      },
    ],
    expectedDeliverable:
      "A trained image classifier and reproducible evaluation report.",
    deliverablesList: [
      "PyTorch image classification pipeline (`vision/model.py`, `vision/train.py`)",
      "10×10 confusion matrix and top-misclassifications diagnostic plots",
      "Saved model checkpoint and standalone inference verification test",
    ],
    learningOutcomes: [
      "Build end-to-end PyTorch data pipelines with normalization and batched `DataLoader` splits.",
      "Train and validate deep neural networks using proper `model.train()`, `model.eval()`, and `torch.no_grad()` semantics.",
      "Diagnose classification performance using per-class accuracy, confusion matrices, and visual error inspection.",
      "Serialize and reload trained model checkpoints (`state_dict`) for reproducible inference.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "pytorch-image-classifier",
      recommendedStructure: [
        "vision/model.py",
        "vision/train.py",
        "vision/infer.py",
        "plots/confusion_matrix.png",
        "tests/test_image_classifier.py",
        "README.md",
      ],
      readmeChecklist: [
        "Architecture summary and trainable parameter count",
        "Training/validation curves and 10×10 confusion matrix",
        "Misclassification analysis and inference usage instructions",
      ],
    },
    relatedResourceIds: [
      "pytorch-beginner-tutorials",
      "stanford-cs231n",
      "fastai-practical-deep-learning",
    ],
    relatedModuleIds: ["p3-m3", "p3-m4"],
    relatedProjectIds: [
      "milestone-05-neural-network-scratch",
      "milestone-07-character-language-model",
      "milestone-10-mini-gpt-architecture",
    ],
  },

  // ============================================================================
  // PROJECT 7 — CHARACTER LANGUAGE MODEL
  // ============================================================================
  {
    id: "milestone-07-character-language-model",
    slug: "character-language-model",
    milestoneNumber: 7,
    title: "Character Language Model",
    subtitle:
      "Train an autoregressive character-level language model and generate text",
    shortDescription:
      "Train a character-level language model capable of generating short text—building a character vocabulary, context-target sliding windows, a bigram baseline, a neural language model, perplexity tracking, and temperature/top-k sampling.",
    detailedOverview:
      "Autoregressive language modeling—predicting the probability distribution of the next token given the preceding context `P(x_t | x_{<t})`—is the foundational objective behind GPT-4, Claude, and Llama. Before scaling to subword BPE vocabularies and multi-layer Transformers, you can experience the entire lifecycle of generative language modeling at the character level (`vocab_size ≈ 65`). Inspired by Andrej Karpathy's `makemore`, you will prepare a text corpus, encode characters to integer IDs, slice `(X, Y)` context windows, build a count-based bigram baseline, train a neural character language model (embedding + MLP or RNN/GRU) using Cross-Entropy loss, evaluate validation perplexity `exp(loss)`, and generate text using multinomial temperature and Top-k sampling.",
    whyThisProjectMatters:
      "Every data formatting, loss computation, and sampling concept in this project—input/target shifting by 1 position, `nn.Embedding`, cross-entropy over vocabulary logits, perplexity, and temperature-scaled `torch.multinomial`—carries over unchanged to Project 10 (Mini GPT) and Project 11 (Pretrained Mini LLM).",
    phase: 4,
    difficulty: "intermediate",
    difficultyFilter: "Intermediate",
    difficultyLabel: "Intermediate → Advanced",
    estimatedEffort: "12–16 hours · 1–2 weeks",
    technologies: ["Python", "NumPy", "PyTorch"],
    prerequisites: [
      "Project 6 (PyTorch training loops, `nn.Module`, `CrossEntropyLoss`)",
      "Phase 4 Module 4.1 & 4.3 (Tokenization, Embeddings, and Autoregressive Language Modeling)",
    ],
    requiredMathConcepts: [
      "Chain rule of probability for sequences: P(x₁,…,x_T) = ∏_{t=1}^T P(x_t | x₁,…,x_{t-1})",
      "Negative Log-Likelihood (Cross-Entropy) loss: L = -(1/T) ∑_t log P_θ(x_t | x_{<t})",
      "Perplexity: PPL = exp(L) (effective branching factor per character)",
      "Temperature-scaled Softmax: P_i = exp(z_i / τ) / ∑_j exp(z_j / τ)",
    ],
    learningObjectives: [
      "Build a bidirectional character vocabulary (`stoi` and `itos`) and construct shifted `(context, target)` training tensors.",
      "Implement a count-based or lookup bigram baseline to establish a concrete validation loss benchmark.",
      "Build and train a neural character language model with `nn.Embedding` that beats the bigram baseline on held-out validation loss.",
      "Implement autoregressive text generation comparing greedy decoding, temperature scaling (`τ = 0.5, 0.8, 1.2`), and Top-k sampling.",
    ],
    skillsPracticed: [
      "Character vocabulary & shifted sequence slicing",
      "Bigram vs Neural Language Model benchmarking",
      "Cross-Entropy loss & Perplexity (`exp(loss)`) evaluation",
      "Autoregressive decoding with temperature & Top-k sampling",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "Corpus Preparation, Vocabulary & Sequence Slicing",
        summary:
          "Load a text dataset, build `stoi`/`itos` mappings, and construct shifted input-target sequences.",
        taskIds: ["p7-t01", "p7-t02", "p7-t03", "p7-t04"],
      },
      {
        stageNumber: 2,
        title: "Bigram Baseline & Neural Language Model Architecture",
        summary:
          "Implement a simple character-level baseline, then build a neural language model with learned embeddings.",
        taskIds: ["p7-t05", "p7-t06", "p7-t07"],
      },
      {
        stageNumber: 3,
        title: "Training, Validation Perplexity & Autoregressive Generation",
        summary:
          "Train the model, track validation loss/perplexity, and implement autoregressive sampling strategies.",
        taskIds: ["p7-t08", "p7-t09", "p7-t10", "p7-t11", "p7-t12"],
      },
    ],
    tasks: [
      {
        id: "p7-t01",
        stepNumber: 1,
        title: "Prepare a suitable text corpus",
        explanation:
          "A cohesive public-domain text file (such as TinyShakespeare ~1MB or a list of 32,000 names) has clear orthographic and structural patterns that a small character model can learn quickly.",
        instructions:
          "Load a clean UTF-8 text corpus (`data/input.txt`), inspect its total character length, and split it into 90% training and 10% validation text.",
        expectedOutcome:
          "Contiguous `train_text` and `val_text` splits.",
        acceptanceCriteria:
          "Corpus is split before creating sliding windows so adjacent overlapping windows do not leak across train and val.",
        difficulty: "Core",
      },
      {
        id: "p7-t02",
        stepNumber: 2,
        title: "Build a character vocabulary",
        explanation:
          "Every unique character in the corpus gets a deterministic integer index `0 .. vocab_size - 1`.",
        instructions:
          "Extract `chars = sorted(list(set(text)))`, build `stoi = {ch: i for i, ch in enumerate(chars)}` and `itos = {i: ch for i, ch in enumerate(chars)}`, and record `vocab_size = len(chars)`.",
        expectedOutcome:
          "Deterministic `stoi` and `itos` dictionaries covering all characters in the corpus.",
        acceptanceCriteria:
          "`len(stoi) == len(itos) == vocab_size`.",
        difficulty: "Core",
      },
      {
        id: "p7-t03",
        stepNumber: 3,
        title: "Convert characters into IDs",
        explanation:
          "Neural networks ingest integer token ID tensors (`torch.long`), not Python strings.",
        instructions:
          "Implement `encode(s: str) -> list[int]` and `decode(ids: list[int]) -> str` and convert `train_text` and `val_text` into 1D `torch.long` tensors.",
        expectedOutcome:
          "`decode(encode('hello')) == 'hello'` and `train_data` is a `torch.int64` tensor.",
        acceptanceCriteria:
          "Round-trip `decode(encode(s))` is 100% lossless for any string composed of vocabulary characters.",
        difficulty: "Core",
      },
      {
        id: "p7-t04",
        stepNumber: 4,
        title: "Create input-target training sequences",
        explanation:
          "In next-token prediction with context length `block_size`, a single chunk of `block_size + 1` tokens provides `block_size` supervised training examples simultaneously.",
        instructions:
          "Implement `get_batch(data, block_size, batch_size)` (or a sliding-window builder) where `x = data[i : i + block_size]` and `y = data[i + 1 : i + block_size + 1]` (or `y = data[i + block_size]` for fixed-window MLP).",
        expectedOutcome:
          "Batch tensors `X` and `Y` where every target `Y` is the immediate next character after the context in `X`.",
        acceptanceCriteria:
          "Unit test verifies that for every position `t`, `Y` equals the character immediately following `X` in the source corpus.",
        difficulty: "Core",
      },
      {
        id: "p7-t05",
        stepNumber: 5,
        title: "Implement a simple character-level baseline",
        explanation:
          "A bigram model predicts the next character using only the single current character `P(x_t | x_{t-1})`. Measuring its validation loss gives you a concrete floor that your neural model must beat.",
        instructions:
          "Implement a `BigramBaseline` (either via a smoothed `vocab_size × vocab_size` count matrix or a single `nn.Embedding(vocab_size, vocab_size)` lookup table) and record its validation Cross-Entropy loss and perplexity.",
        expectedOutcome:
          "Baseline validation loss recorded (e.g., `~2.45–2.50` nats on TinyShakespeare/names, far better than uniform random `-ln(1/65) ≈ 4.17`).",
        acceptanceCriteria:
          "Also verifies that an untrained uniform model has loss `≈ ln(vocab_size)`.",
        difficulty: "Core",
      },
      {
        id: "p7-t06",
        stepNumber: 6,
        title: "Create a neural language model",
        explanation:
          "Conditioning on `block_size > 1` previous characters via learned dense embeddings (`nn.Embedding(vocab_size, d_emb)`) and hidden non-linear layers allows the model to learn syllable structure, words, and punctuation.",
        instructions:
          "Implement `CharNeuralLM(nn.Module)` using `nn.Embedding(vocab_size, d_emb)` followed by either a concatenated multi-layer perceptron (`Linear -> Tanh/GELU -> Linear`) or a multi-layer `GRU`/`LSTM` projecting to `vocab_size` logits.",
        expectedOutcome:
          "Forward pass accepts `(B, T)` token IDs and outputs next-character logits.",
        acceptanceCriteria:
          "Initial output layer weights are scaled small so initial loss starts near `-ln(1/vocab_size)` rather than a high hockey-stick spike.",
        difficulty: "Intermediate",
      },
      {
        id: "p7-t07",
        stepNumber: 7,
        title: "Implement the training objective",
        explanation:
          "Minimizing Cross-Entropy over the vocabulary logits maximizes the log-likelihood assigned to the true next character.",
        instructions:
          "Compute `F.cross_entropy(logits.view(-1, vocab_size), targets.view(-1))` and verify that initial loss at step 0 is close to `math.log(vocab_size)`.",
        expectedOutcome:
          "Scalar Cross-Entropy loss ready for `.backward()`.",
        acceptanceCriteria:
          "Correctly reshapes 3D `(B, T, V)` logits and 2D `(B, T)` targets when training across all sequence positions.",
        difficulty: "Core",
      },
      {
        id: "p7-t08",
        stepNumber: 8,
        title: "Train the model",
        explanation:
          "Training with `AdamW` over several thousand mini-batches progressively lowers training and validation cross-entropy.",
        instructions:
          "Train `CharNeuralLM` using `torch.optim.AdamW` for 3,000–5,000 steps, periodically evaluating average loss over 100 training and validation batches.",
        expectedOutcome:
          "Smooth decrease in training and validation loss clearly outperforming the bigram baseline.",
        acceptanceCriteria:
          "Validation loss is strictly lower than the Task 5 bigram baseline.",
        difficulty: "Core",
      },
      {
        id: "p7-t09",
        stepNumber: 9,
        title: "Evaluate validation loss",
        explanation:
          "Perplexity `PPL = exp(cross_entropy_loss)` measures how many characters the model is effectively choosing among at each step.",
        instructions:
          "Compute and log both validation Cross-Entropy loss (in nats) and validation Perplexity `math.exp(val_loss)` for the uniform baseline, bigram baseline, and trained neural LM.",
        expectedOutcome:
          "Quantitative comparison table of Loss and Perplexity across all 3 models.",
        acceptanceCriteria:
          "Evaluated inside `with torch.no_grad():` and `model.eval()`.",
        difficulty: "Core",
      },
      {
        id: "p7-t10",
        stepNumber: 10,
        title: "Implement text generation",
        explanation:
          "Autoregressive generation feeds a context sequence into the model, takes the logits for the final step, converts them to probabilities via Softmax, samples 1 character ID, appends it to the sequence, and repeats.",
        instructions:
          "Implement `generate(model, prompt_ids, max_new_tokens, temperature=1.0, top_k=None)` that autoregressively samples `max_new_tokens` characters and decodes them to a string.",
        expectedOutcome:
          "Model generates coherent word-like structures, line breaks, and punctuation matching the corpus style.",
        acceptanceCriteria:
          "Crops the running context to the last `block_size` tokens at each step if using a fixed context window.",
        difficulty: "Intermediate",
      },
      {
        id: "p7-t11",
        stepNumber: 11,
        title: "Compare generation strategies",
        explanation:
          "Temperature `τ → 0` (greedy) often gets stuck in repetitive loops, `τ = 0.8` with `top_k = 10` balances coherence and diversity, and `τ = 1.5` produces chaotic spelling.",
        instructions:
          "Generate 200-character samples using greedy decoding, `temperature=0.5`, `temperature=0.8` (`top_k=10`), and `temperature=1.4` from the same seed prompt and compare them side-by-side.",
        expectedOutcome:
          "Side-by-side generated samples illustrating the entropy-coherence tradeoff.",
        acceptanceCriteria:
          "Includes deterministic greedy mode as well as temperature/top-k sampling.",
        difficulty: "Core",
      },
      {
        id: "p7-t12",
        stepNumber: 12,
        title: "Document limitations",
        explanation:
          "Character-level models must spend sequence length and model capacity spelling individual words letter-by-letter, resulting in short effective semantic context.",
        instructions:
          "Document your perplexity results, generated samples, and why subword tokenization (Project 8: BPE) and self-attention (Projects 9–10) are needed to scale further.",
        expectedOutcome:
          "Comprehensive README with perplexity benchmarks and qualitative generation samples.",
        acceptanceCriteria:
          "Explains the memory/compute tradeoff between character vocabularies (`V ≈ 65`, long `T`) and BPE vocabularies (`V ≈ 32k`, short `T`).",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "Bidirectional character vocabulary and shifted `(X, Y)` sequence slicing implemented and tested.",
      "Bigram baseline validation loss and perplexity recorded.",
      "Neural character language model trained to achieve lower validation perplexity than the bigram baseline.",
      "Autoregressive text generation implemented with greedy, temperature, and Top-k sampling comparisons.",
    ],
    testingGuide: {
      summary:
        "Verify lossless encode/decode round-trips, target sequence alignment, initial uniform loss check, and generation output lengths.",
      verificationCommand: "pytest tests/test_char_lm.py -v",
      testCases: [
        {
          title: "Shifted Context-Target Alignment Test",
          purpose:
            "Ensure `y[b, t]` is always the exact next token `x[b, t + 1]` in the raw stream.",
          verificationSteps:
            "Construct a batch `(x, y)` from `[10, 20, 30, 40, 50]` with `block_size=4`.",
          expectedResult: "`x` is `[10, 20, 30, 40]` and `y` is `[20, 30, 40, 50]`.",
        },
        {
          title: "Autoregressive Generation Length & Temperature Test",
          purpose:
            "Confirm `generate()` appends exactly `max_new_tokens` valid token IDs without index errors.",
          verificationSteps:
            "Pass a 3-character prompt with `max_new_tokens=25`, `temperature=0.8`, `top_k=5`.",
          expectedResult: "Output tensor has length `28` and decodes to a valid 28-character string.",
        },
      ],
    },
    codeExamples: [
      {
        title: "Autoregressive Sampling Loop with Temperature & Top-k Filtering",
        language: "python",
        purpose:
          "Shows how to sample tokens one step at a time with temperature scaling and optional Top-k logit masking.",
        code: `import torch
import torch.nn.functional as F

@torch.no_grad()
def generate_characters(
    model: torch.nn.Module,
    idx: torch.Tensor,
    max_new_tokens: int,
    block_size: int,
    temperature: float = 1.0,
    top_k: int | None = None,
) -> torch.Tensor:
    model.eval()
    for _ in range(max_new_tokens):
        idx_cond = idx[:, -block_size:]
        logits = model(idx_cond)          # Shape: (B, T, V) or (B, V)
        if logits.ndim == 3:
            logits = logits[:, -1, :]     # Take final time-step: (B, V)
        logits = logits / max(temperature, 1e-5)

        if top_k is not None:
            v, _ = torch.topk(logits, min(top_k, logits.size(-1)))
            logits[logits < v[:, [-1]]] = -float("Inf")

        probs = F.softmax(logits, dim=-1)
        idx_next = torch.multinomial(probs, num_samples=1)
        idx = torch.cat((idx, idx_next), dim=1)
    return idx`,
      },
    ],
    hints: [
      {
        id: "p7-h1",
        title: "Initial Loss Sanity Check: `-ln(1 / vocab_size)`",
        category: "Mathematical Formula",
        content:
          "Before training step 1, if your vocabulary has `V = 65` characters, a well-initialized model should assign roughly `1/65` probability to each character, giving an initial Cross-Entropy loss of `-ln(1/65) ≈ 4.174`. If your initial loss is `15.0` or `25.0`, your final linear layer weights are initialized with too large a standard deviation—scale them by `0.01`!",
      },
      {
        id: "p7-h2",
        title: "Slicing `idx[:, -block_size:]` During Generation",
        category: "Common Mistake",
        content:
          "If your model uses a fixed context window or positional embedding table of size `block_size`, passing a sequence longer than `block_size` during generation will cause a shape or index out-of-bounds error. Always slice `idx[:, -block_size:]` before calling `model(idx_cond)`.",
      },
    ],
    optionalChallenges: [
      {
        id: "p7-oc1",
        title: "2D Character Embedding Visualization (t-SNE / PCA)",
        description:
          "Project the learned `vocab_size × d_emb` character embedding matrix down to 2D and plot where vowels, consonants, digits, and punctuation cluster.",
        whatYouLearn:
          "How distributional similarity emerges automatically in learned embedding tables.",
      },
      {
        id: "p7-oc2",
        title: "WaveNet-Style Hierarchical Dilated Convolutions",
        description:
          "Fuse pairs of adjacent characters hierarchically across layers (following Karpathy's `makemore` Part 3/5) to expand context length to `16` or `32` characters.",
        whatYouLearn:
          "How hierarchical sequence composition bridges simple MLPs and full self-attention.",
      },
    ],
    expectedDeliverable: "A functioning character-level language model.",
    deliverablesList: [
      "Character vocabulary encoder/decoder and shifted batch loader",
      "Bigram baseline and `CharNeuralLM` PyTorch implementation",
      "Validation perplexity comparison and multi-temperature generation showcase",
    ],
    learningOutcomes: [
      "Formulate text generation as autoregressive next-token probability estimation trained with Cross-Entropy loss.",
      "Construct shifted `(context, target)` sequences and evaluate language models using validation Perplexity.",
      "Build and train an embedding-based neural language model that outperforms a count-based bigram baseline.",
      "Implement autoregressive decoding with greedy search, temperature scaling, and Top-k sampling.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "character-language-model-pytorch",
      recommendedStructure: [
        "char_lm/dataset.py",
        "char_lm/model.py",
        "char_lm/generate.py",
        "tests/test_char_lm.py",
        "README.md",
      ],
      readmeChecklist: [
        "Loss & Perplexity comparison table (Uniform vs Bigram vs Neural LM)",
        "Generated text samples across temperatures τ = 0.5, 0.8, 1.2",
        "Analysis of character-level context limitations",
      ],
    },
    relatedResourceIds: [
      "karpathy-zero-to-hero",
      "pytorch-char-rnn-tutorial",
      "stanford-cs224n",
    ],
    relatedModuleIds: ["p4-m1", "p4-m3", "p4-m4"],
    relatedProjectIds: [
      "milestone-08-bpe-tokenizer",
      "milestone-10-mini-gpt-architecture",
      "milestone-11-pretrained-mini-llm",
    ],
  },

  // ============================================================================
  // PROJECT 8 — BPE TOKENIZER
  // ============================================================================
  {
    id: "milestone-08-bpe-tokenizer",
    slug: "bpe-tokenizer",
    milestoneNumber: 8,
    title: "BPE Tokenizer",
    subtitle:
      "Implement a trainable byte-level Byte Pair Encoding tokenizer from scratch in Python",
    shortDescription:
      "Implement Byte Pair Encoding (BPE) tokenization from scratch in Python—starting from raw UTF-8 bytes, iteratively merging the most frequent adjacent token pairs, building a deterministic merge vocabulary, handling special tokens, and verifying 100% lossless encode/decode round trips.",
    detailedOverview:
      "Large Language Models do not read raw characters or whitespace-split words; they read subword tokens produced by Byte Pair Encoding (BPE). Starting from a base vocabulary of the 256 raw UTF-8 byte values (`0..255`), byte-level BPE iteratively counts adjacent token pairs across a training corpus, mints a new token ID (`256, 257, ...`) for the most frequent pair, and records the merge rule `(p0, p1) -> new_id`. Because every UTF-8 string is a sequence of bytes, a byte-level BPE tokenizer can encode and decode ANY text—including multilingual scripts, source code indentation, math symbols, and emojis—with zero `<unk>` out-of-vocabulary failures. In this project, you will implement a standalone, trainable BPE tokenizer from scratch in pure Python.",
    whyThisProjectMatters:
      "Tokenization directly governs an LLM's context window efficiency, arithmetic behavior, code formatting, and multilingual token fertility. Furthermore, you will use your custom BPE tokenizer directly in Project 11 to tokenize the pretraining corpus for `MyLLM v1`.",
    phase: 4,
    difficulty: "advanced",
    difficultyFilter: "Advanced",
    difficultyLabel: "Advanced",
    estimatedEffort: "14–18 hours · 1–2 weeks",
    technologies: ["Python", "Unicode / UTF-8"],
    prerequisites: [
      "Python `str.encode('utf-8')`, `bytes.decode('utf-8', errors='replace')`, dictionaries, and regular expressions",
      "Phase 4 Module 4.1 & 4.2 (Tokenization & Subword Vocabulary Construction)",
    ],
    requiredMathConcepts: [
      "UTF-8 variable-length (1 to 4 bytes) character encoding",
      "Greedy iterative pair frequency maximization: (a*, b*) = argmax_{(a,b)} count(a, b)",
      "Compression ratio (bytes per token) and token fertility (tokens per word)",
      "Priority ordering of merge rules during deterministic encoding",
    ],
    learningObjectives: [
      "Convert arbitrary Unicode strings into raw UTF-8 byte sequences (`0..255`) and explain why byte-level BPE eliminates `<unk>` tokens.",
      "Implement pair frequency counting, iterative merge execution, and vocabulary construction (`vocab: dict[int, bytes]` and `merges: dict[tuple[int, int], int]`).",
      "Implement deterministic `.encode(text)` (applying learned merges in priority order) and `.decode(ids)` (concatenating byte chunks and decoding UTF-8 safely).",
      "Support regex pre-tokenization splits and special control tokens (`<|endoftext|>`, `<|pad|>`) and verify lossless round-trip encoding/decoding across diverse inputs.",
    ],
    skillsPracticed: [
      "UTF-8 byte-level text representation",
      "Iterative BPE merge table training",
      "Deterministic merge-priority encoding & safe UTF-8 decoding",
      "Regex pre-tokenization & special token registration",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "UTF-8 Byte Representation & Pair Frequency Counting",
        summary:
          "Convert text to UTF-8 byte integers (`0..255`), count adjacent pairs, and implement the single-step pair replacement primitive.",
        taskIds: ["p8-t01", "p8-t02", "p8-t03", "p8-t04", "p8-t05", "p8-t06"],
      },
      {
        stageNumber: 2,
        title: "Merge Vocabulary Training, Encoding & Decoding",
        summary:
          "Train the ordered merge table up to target `vocab_size`, build byte vocabularies, and implement `.encode()` and `.decode()`.",
        taskIds: ["p8-t07", "p8-t08", "p8-t09"],
      },
      {
        stageNumber: 3,
        title: "Edge Cases, Unicode Safety, Special Tokens & Round-Trip Tests",
        summary:
          "Handle pre-tokenization regex splits, special tokens, arbitrary Unicode, round-trip tests, and comparison against `tiktoken`.",
        taskIds: ["p8-t10", "p8-t11", "p8-t12", "p8-t13", "p8-t14"],
      },
    ],
    tasks: [
      {
        id: "p8-t01",
        stepNumber: 1,
        title: "Understand text encoding",
        explanation:
          "Python strings are sequences of Unicode code points (`ord(ch)`), while `.encode('utf-8')` maps them into raw bytes (`0..255`).",
        instructions:
          "Write an exploratory script/module demonstrating how ASCII characters use 1 UTF-8 byte while accented letters, CJK characters, and emojis use 2–4 bytes, and why a raw Unicode code-point vocabulary would exceed 150,000 entries.",
        expectedOutcome:
          "Helper functions converting `str -> list[int]` (`list(text.encode('utf-8'))`) and `bytes -> str`.",
        acceptanceCriteria:
          "Correctly handles multi-byte UTF-8 sequences like `'Hello 世界 🚀'`.",
        difficulty: "Core",
      },
      {
        id: "p8-t02",
        stepNumber: 2,
        title: "Prepare a text corpus",
        explanation:
          "Training a representative BPE merge table requires a corpus containing prose, punctuation, numbers, and code or dialogue.",
        instructions:
          "Prepare a training corpus (`data/tokenizer_corpus.txt`) and a diverse evaluation test suite containing English prose, Python code snippets, numbers, whitespace runs, and multilingual Unicode strings.",
        expectedOutcome:
          "Training text corpus and structured test fixture strings.",
        acceptanceCriteria:
          "Test fixtures include edge cases: empty string `''`, single characters, repeated spaces, and emojis.",
        difficulty: "Core",
      },
      {
        id: "p8-t03",
        stepNumber: 3,
        title: "Choose the initial token representation",
        explanation:
          "Initializing token IDs `0..255` to the 256 single-byte values `bytes([i])` guarantees completeness over all valid UTF-8 strings.",
        instructions:
          "Initialize `self.vocab: dict[int, bytes] = {idx: bytes([idx]) for idx in range(256)}`.",
        expectedOutcome:
          "Base vocabulary of size 256 mapping each integer `0..255` to its 1-byte `bytes` object.",
        acceptanceCriteria:
          "Any raw byte sequence can be decoded immediately before any merges are trained.",
        difficulty: "Core",
      },
      {
        id: "p8-t04",
        stepNumber: 4,
        title: "Count adjacent token pairs",
        explanation:
          "At each step of BPE training, we count how often every adjacent pair `(ids[i], ids[i+1])` appears across the corpus.",
        instructions:
          "Implement `get_pair_stats(ids: list[int], counts: dict[tuple[int, int], int] | None = None) -> dict[tuple[int, int], int]` that tallies frequencies of all consecutive pairs.",
        expectedOutcome:
          "For `[1, 2, 3, 1, 2]`, `get_pair_stats` returns `{(1, 2): 2, (2, 3): 1, (3, 1): 1}`.",
        acceptanceCriteria:
          "Supports accumulating counts across multiple pre-tokenized text chunks.",
        difficulty: "Core",
      },
      {
        id: "p8-t05",
        stepNumber: 5,
        title: "Identify merge candidates",
        explanation:
          "Selecting the pair with the highest count (with deterministic tie-breaking) ensures reproducible tokenizer training.",
        instructions:
          "Find the most frequent pair `top_pair = max(stats, key=lambda p: (stats[p], -p[0], -p[1]))` and stop early if the maximum pair count is `< 2` or no pairs remain.",
        expectedOutcome:
          "Deterministic selection of the next merge pair `(p0, p1)`.",
        acceptanceCriteria:
          "Running training twice on the same corpus produces the exact same sequence of merges.",
        difficulty: "Core",
      },
      {
        id: "p8-t06",
        stepNumber: 6,
        title: "Implement merge operations",
        explanation:
          "Given a sequence `ids`, a target `pair = (p0, p1)`, and a new token ID `new_id`, `merge_ids(ids, pair, new_id)` replaces all non-overlapping occurrences of `(p0, p1)` from left to right with `new_id`.",
        instructions:
          "Implement `merge_ids(ids: list[int], pair: tuple[int, int], new_id: int) -> list[int]` using a `while i < len(ids)` pointer loop.",
        expectedOutcome:
          "`merge_ids([5, 6, 6, 7, 9, 1], (6, 7), 99)` returns `[5, 6, 99, 9, 1]`.",
        acceptanceCriteria:
          "Correctly handles overlapping triples like `[6, 6, 6]` with pair `(6, 6)` -> `[99, 6]`.",
        difficulty: "Core",
      },
      {
        id: "p8-t07",
        stepNumber: 7,
        title: "Build a merge vocabulary",
        explanation:
          "Each merge mints token ID `256 + step` whose byte sequence is the concatenation `vocab[p0] + vocab[p1]`.",
        instructions:
          "Implement `BPETokenizer.train(text: str, vocab_size: int)` running `num_merges = vocab_size - 256` iterations, recording `self.merges[(p0, p1)] = new_id` and `self.vocab[new_id] = self.vocab[p0] + self.vocab[p1]`.",
        expectedOutcome:
          "Trained tokenizer with `vocab_size` entries and ordered `merges` dictionary.",
        acceptanceCriteria:
          "Supports saving and loading the trained `.json` vocabulary and merge table to disk.",
        difficulty: "Intermediate",
      },
      {
        id: "p8-t08",
        stepNumber: 8,
        title: "Implement encoding",
        explanation:
          "During `.encode(text)`, you MUST apply merges in the order they were learned (lowest merge index `self.merges[pair]` first), NOT by most frequent pair inside the test string!",
        instructions:
          "Implement `encode(self, text: str) -> list[int]`: convert `text` to UTF-8 byte IDs, repeatedly find the adjacent pair in `ids` with the lowest rank in `self.merges`, and merge it until no mergeable pairs remain.",
        expectedOutcome:
          "Encodes any string into a compressed list of subword integer IDs.",
        acceptanceCriteria:
          "Encoding an empty string `''` returns `[]`; encoding a single byte returns `[byte_val]`.",
        hint: "In each pass of `encode`, compute `stats = get_pair_stats(ids)` and pick `pair = min(stats, key=lambda p: self.merges.get(p, float('inf')))`. If `pair not in self.merges`, `break`!",
        difficulty: "Advanced",
      },
      {
        id: "p8-t09",
        stepNumber: 9,
        title: "Implement decoding",
        explanation:
          "Decoding maps each integer token ID `idx` to its `bytes` chunk `self.vocab[idx]`, joins them with `b''.join(...)`, and decodes UTF-8.",
        instructions:
          "Implement `decode(self, ids: list[int]) -> str` using `b''.join(self.vocab[i] for i in ids).decode('utf-8', errors='replace')`.",
        expectedOutcome:
          "Reconstructs the original Python string from a list of token IDs.",
        acceptanceCriteria:
          "Uses `errors='replace'` so partial multi-byte UTF-8 tokens sampled by an untrained model never raise `UnicodeDecodeError`.",
        difficulty: "Core",
      },
      {
        id: "p8-t10",
        stepNumber: 10,
        title: "Handle unknown or unusual text",
        explanation:
          "Regex pre-tokenization (like GPT-2 / GPT-4's split pattern) prevents BPE from merging across word boundaries and punctuation (e.g., preventing `'dog.'`, `'dog!'`, and `'dog?'` from becoming 3 unrelated tokens).",
        instructions:
          "Add regex pre-tokenization splitting text into words, numbers, punctuation, and whitespace chunks before applying byte-level merges within each chunk, and support special tokens (e.g., `<|endoftext|>`, `<|pad|>`, `<|user|>`, `<|assistant|>`).",
        expectedOutcome:
          "Punctuation and contractions split cleanly, and registered special tokens encode to single dedicated IDs.",
        acceptanceCriteria:
          "Never produces an `<unk>` token on unseen words, emojis, or control strings.",
        difficulty: "Advanced",
      },
      {
        id: "p8-t11",
        stepNumber: 11,
        title: "Handle Unicode correctly",
        explanation:
          "Multi-byte Unicode characters (emojis, accented characters, non-Latin scripts) split into 2–4 raw UTF-8 bytes that recombine seamlessly during `b''.join` decoding.",
        instructions:
          "Test encoding and decoding strings containing emojis (`'🤖🧠🔥'`), mathematical symbols (`'∇L(θ) ∈ ℝⁿ'`), and multilingual text (`'こんにちは世界'`).",
        expectedOutcome:
          "100% exact string restoration across all Unicode test cases.",
        acceptanceCriteria:
          "`tokenizer.decode(tokenizer.encode(s)) == s` holds for all valid UTF-8 strings.",
        difficulty: "Core",
      },
      {
        id: "p8-t12",
        stepNumber: 12,
        title: "Test encode/decode round trips",
        explanation:
          "The fundamental correctness invariant of a lossless tokenizer is `decode(encode(text)) == text`.",
        instructions:
          "Write an automated `pytest` suite (`tests/test_bpe_tokenizer.py`) testing round-trip identity on empty strings, ASCII, Unicode, Python source code with indentation, and strings containing special tokens.",
        expectedOutcome:
          "All round-trip identity assertions pass.",
        acceptanceCriteria:
          "Also asserts compression ratio (`len(utf8_bytes) / len(encoded_ids) > 1.5`) on held-out prose.",
        difficulty: "Core",
      },
      {
        id: "p8-t13",
        stepNumber: 13,
        title: "Compare with an existing tokenizer",
        explanation:
          "Comparing your tokenizer's token boundaries and compression ratio against GPT-2 / GPT-4 (`tiktoken` or Hugging Face `tokenizers`) highlights how vocabulary size (`512` vs `50,257`) affects sequence length.",
        instructions:
          "Write a comparison script measuring token count and bytes-per-token on sample paragraphs and Python code for your trained BPE tokenizer vs a reference tokenizer configuration.",
        expectedOutcome:
          "Quantitative table of token counts, compression ratios, and visual token boundary splits.",
        acceptanceCriteria:
          "Shows exact subword segmentation on sample English and Python code strings.",
        difficulty: "Core",
      },
      {
        id: "p8-t14",
        stepNumber: 14,
        title: "Document tokenizer limitations",
        explanation:
          "BPE tokenization introduces well-known LLM quirks: inconsistent integer splitting (`'12345'`), trailing-space sensitivity (`'hello '` vs `' hello'`), and higher token fertility on non-English languages.",
        instructions:
          "Document your tokenizer's architecture, merge examples, compression ratio, and known BPE failure modes (e.g., trailing whitespace, arithmetic digit grouping, multilingual fertility) in `README.md`.",
        expectedOutcome:
          "Complete technical documentation of your standalone BPE tokenizer.",
        acceptanceCriteria:
          "Demonstrates at least 2 concrete examples of tokenization quirks (such as trailing whitespace or multi-digit numbers).",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "The tokenizer demonstrates reliable, 100% lossless round-trip encoding and decoding (`decode(encode(s)) == s`) for all declared supported UTF-8 inputs.",
      "Base 256 byte vocabulary and iterative pair merges implemented from scratch in pure Python.",
      "Encoding applies merges strictly in learned priority order rather than test-string frequency order.",
      "Includes automated round-trip tests covering ASCII, multi-byte Unicode, source code, and special tokens.",
    ],
    testingGuide: {
      summary:
        "Verify pair frequency counting, overlapping merge edge cases, merge-priority encoding order, and lossless round-trip identity across ASCII and Unicode.",
      verificationCommand: "pytest tests/test_bpe_tokenizer.py -v",
      testCases: [
        {
          title: "Lossless Encode/Decode Round-Trip Across Unicode & Code",
          purpose:
            "Prove `decode(encode(s)) == s` across ASCII, multi-byte UTF-8 emojis/math, and indented Python code.",
          verificationSteps:
            "Train tokenizer (`vocab_size=320`) on sample corpus, then test round-trip on 10 diverse strings including `'def f(x):\\n    return x 🚀 ∑'`.",
          expectedResult: "`decode(encode(s)) == s` is True for 100% of test strings.",
        },
        {
          title: "Overlapping Pair Merge Invariant (`[6, 6, 6]`) ",
          purpose:
            "Ensure left-to-right non-overlapping replacement handles consecutive identical tokens properly.",
          verificationSteps:
            "Call `merge_ids([6, 6, 6, 6], (6, 6), 256)` and `merge_ids([6, 6, 6], (6, 6), 256)`.",
          expectedResult: "Returns `[256, 256]` and `[256, 6]` respectively.",
        },
      ],
    },
    codeExamples: [
      {
        title: "Core Byte-Level BPE Merge & Priority-Ordered Encoding",
        language: "python",
        purpose:
          "Shows the exact left-to-right `merge_ids` primitive and rank-ordered `.encode()` loop.",
        code: `def get_pair_stats(ids: list[int]) -> dict[tuple[int, int], int]:
    counts: dict[tuple[int, int], int] = {}
    for pair in zip(ids, ids[1:]):
        counts[pair] = counts.get(pair, 0) + 1
    return counts

def merge_ids(ids: list[int], pair: tuple[int, int], new_id: int) -> list[int]:
    new_ids: list[int] = []
    i = 0
    while i < len(ids):
        if i < len(ids) - 1 and ids[i] == pair[0] and ids[i + 1] == pair[1]:
            new_ids.append(new_id)
            i += 2
        else:
            new_ids.append(ids[i])
            i += 1
    return new_ids

def encode_bytes(raw_bytes: bytes, merges: dict[tuple[int, int], int]) -> list[int]:
    ids = list(raw_bytes)
    while len(ids) >= 2:
        stats = get_pair_stats(ids)
        pair = min(stats, key=lambda p: merges.get(p, float("inf")))
        if pair not in merges:
            break
        ids = merge_ids(ids, pair, merges[pair])
    return ids`,
      },
    ],
    hints: [
      {
        id: "p8-h1",
        title: "Critical Bug: Merging by Frequency During `.encode()` Instead of Merge Rank",
        category: "Common Mistake",
        content:
          "During `.train()`, you merge the most frequent pair in the training corpus. During `.encode(text)` at inference time, you must NOT merge the most frequent pair in `text`—you must find the pair in `text` that has the LOWEST token ID (earliest learned rank) in `self.merges`! Otherwise, later merges that depend on earlier sub-merges can never trigger.",
      },
      {
        id: "p8-h2",
        title: "Why `errors='replace'` Is Needed in `.decode()`",
        category: "Debugging Technique",
        content:
          "Every valid UTF-8 string encodes to valid bytes, so `decode(encode(s))` is always valid UTF-8. However, when an untrained LLM samples random token IDs `[195, 40]`, that arbitrary byte sequence might be an incomplete multi-byte UTF-8 sequence. Using `.decode('utf-8', errors='replace')` inserts `` instead of crashing the generation loop.",
      },
    ],
    optionalChallenges: [
      {
        id: "p8-oc1",
        title: "Compare Tokenizer Vocabulary Sizes (512 vs 2,048 vs 8,192)",
        description:
          "Train 3 tokenizers with vocabulary sizes 512, 2,048, and 8,192 on the same corpus and plot the compression ratio (bytes/token) and encoding speed.",
        whatYouLearn:
          "How increasing `vocab_size` trades embedding table parameters `(V × d_model)` for shorter sequence lengths `T`.",
      },
      {
        id: "p8-oc2",
        title: "Individual Digit Splitting Rule (Llama-3 / GPT-4 Style)",
        description:
          "Add a regex rule that prevents numbers longer than 1 or 3 digits from merging together, and explain why this helps LLMs perform multi-digit addition.",
        whatYouLearn:
          "How pre-tokenization regex design directly impacts LLM mathematical reasoning.",
      },
    ],
    expectedDeliverable: "A standalone trainable BPE tokenizer.",
    deliverablesList: [
      "Pure-Python `BPETokenizer` with `.train()`, `.encode()`, `.decode()`, `.save()`, and `.load()`",
      "Regex pre-tokenization and special control token support",
      "Automated round-trip test suite across ASCII, Unicode, and source code",
    ],
    learningOutcomes: [
      "Explain why byte-level BPE over UTF-8 bytes (`0..255`) achieves open-vocabulary coverage without `<unk>` tokens.",
      "Implement iterative BPE pair counting and merge table construction from scratch in Python.",
      "Implement rank-ordered BPE encoding, regex pre-tokenization, special token handling, and fault-tolerant UTF-8 decoding.",
      "Analyze how vocabulary size and pre-tokenization rules impact compression ratio and LLM behavior.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "bpe-tokenizer-from-scratch",
      recommendedStructure: [
        "tokenizer/bpe.py",
        "tokenizer/regex_patterns.py",
        "tests/test_bpe_tokenizer.py",
        "README.md",
      ],
      readmeChecklist: [
        "Explanation of UTF-8 byte-level BPE training and encoding priority",
        "Compression ratio and vocabulary size benchmark table",
        "Examples of subword segmentation and known BPE edge cases",
      ],
    },
    relatedResourceIds: [
      "huggingface-tokenizers-module",
      "karpathy-zero-to-hero",
      "stanford-cs336",
    ],
    relatedModuleIds: ["p4-m1", "p4-m2"],
    relatedProjectIds: [
      "milestone-07-character-language-model",
      "milestone-10-mini-gpt-architecture",
      "milestone-11-pretrained-mini-llm",
    ],
  },

  // ============================================================================
  // PROJECT 9 — SELF-ATTENTION ENGINE
  // ============================================================================
  {
    id: "milestone-09-self-attention-engine",
    slug: "self-attention-engine",
    milestoneNumber: 9,
    title: "Self-Attention Engine",
    subtitle:
      "Implement causal scaled dot-product attention and multi-head attention in PyTorch",
    shortDescription:
      "Implement causal self-attention and multi-head attention from scratch in PyTorch—including Q, K, V projections, √d_k variance scaling, upper-triangular causal masking, attention softmax probabilities, head splitting/concatenation, and causality unit tests.",
    detailedOverview:
      "Self-attention is the mathematical heart of the Transformer architecture. Unlike recurrent networks that compress history sequentially, self-attention allows every token position `t` in a sequence of length `T` to directly query and route information from any preceding token `j ≤ t` in parallel via matrix multiplication: `Attention(Q, K, V) = softmax(QKᵀ / √d_k + M)V`. In this project, you will build both single-head and multi-head causal self-attention modules from scratch in PyTorch using only basic linear layers and tensor operations (never calling `nn.MultiheadAttention` inside your module). You will trace every 4D tensor reshape `(B, T, H, d_k) -> (B, H, T, d_k)`, verify that future token perturbations have zero effect on past outputs (strict causality test), and confirm numerical parity against PyTorch's reference implementation.",
    whyThisProjectMatters:
      "Mastering the exact tensor shapes and causal masking mechanics of Multi-Head Attention (`(B, H, T, T)`) makes building the full Mini GPT architecture (Project 10) and KV-cached inference (Project 13) straightforward.",
    phase: 5,
    difficulty: "advanced",
    difficultyFilter: "Advanced",
    difficultyLabel: "Advanced",
    estimatedEffort: "12–16 hours · 1–2 weeks",
    technologies: ["PyTorch", "NumPy"],
    prerequisites: [
      "Phase 1 Linear Algebra (dot products, batched matrix multiplication) & Phase 3 PyTorch",
      "Phase 5 Module 5.1 & 5.2 (Scaled Dot-Product Attention & Multi-Head Causal Attention)",
    ],
    requiredMathConcepts: [
      "Query, Key, Value linear projections: Q = XW_Q, K = XW_K, V = XW_V",
      "Scaled Dot-Product Attention: Attention(Q, K, V) = softmax((QKᵀ) / √d_k + M) V",
      "Variance scaling derivation: if q_i, k_i ~ N(0, 1), Var(q · k) = d_k ⇒ divide by √d_k",
      "Causal upper-triangular mask: M_{i,j} = 0 if j ≤ i else -∞",
      "Multi-head decomposition: d_model = H × d_k and output projection W_O ∈ ℝ^{d_model×d_model}",
    ],
    learningObjectives: [
      "Implement Q, K, and V projections, `1 / √d_k` scaling, causal `-inf` masking, and value aggregation from scratch in PyTorch.",
      "Reshape and transpose 3D sequence tensors `(B, T, d_model)` into 4D multi-head tensors `(B, H, T, d_k)` and recombine heads cleanly.",
      "Write a strict causality unit test proving that changing input tokens at positions `> t` alters outputs at positions `≤ t` by `0.0`.",
      "Verify forward and backward numerical equivalence against `torch.nn.functional.scaled_dot_product_attention(..., is_causal=True)`.",
    ],
    skillsPracticed: [
      "Scaled dot-product causal self-attention",
      "4D multi-head tensor reshaping (`view` & `transpose(1, 2)`)",
      "Causal mask buffer registration (`register_buffer`)",
      "Strict causality & reference parity testing",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "Embeddings, Q/K/V Projections & Scaled Attention Scores",
        summary:
          "Project input embeddings into Queries, Keys, and Values and compute scaled pairwise compatibility scores.",
        taskIds: ["p9-t01", "p9-t02", "p9-t03", "p9-t04"],
      },
      {
        stageNumber: 2,
        title: "Causal Masking, Softmax Probabilities & Value Mixing",
        summary:
          "Apply upper-triangular `-inf` masking, compute row-wise softmax weights, and aggregate Value vectors.",
        taskIds: ["p9-t05", "p9-t06", "p9-t07"],
      },
      {
        stageNumber: 3,
        title: "Multi-Head Splitting, Concatenation & Output Projection",
        summary:
          "Generalize to `H` parallel attention heads with fused QKV projection and final output projection `W_O`.",
        taskIds: ["p9-t08", "p9-t09", "p9-t10"],
      },
      {
        stageNumber: 4,
        title: "Shape Verification, Causality Proof & Reference Comparison",
        summary:
          "Assert tensor shapes at every intermediate line, prove zero future leakage, and verify parity with PyTorch SDPA.",
        taskIds: ["p9-t11", "p9-t12", "p9-t13"],
      },
    ],
    tasks: [
      {
        id: "p9-t01",
        stepNumber: 1,
        title: "Create token embeddings",
        explanation:
          "Self-attention operates on a batch of continuous token representations `X` of shape `(B, T, d_model)`.",
        instructions:
          "Create an input embedding module combining `nn.Embedding(vocab_size, d_model)` and positional embeddings `(T, d_model)` to produce input tensor `x` of shape `(B, T, d_model)`.",
        expectedOutcome:
          "Input batch of token IDs `(B, T)` maps to continuous embeddings `(B, T, d_model)`.",
        acceptanceCriteria:
          "Asserts `T <= max_seq_len` and `d_model % num_heads == 0`.",
        difficulty: "Core",
      },
      {
        id: "p9-t02",
        stepNumber: 2,
        title: "Implement Q, K, and V projections",
        explanation:
          "Separate linear projections allow each token to ask a question (`Q`), advertise its content (`K`), and pass along payload information (`V`).",
        instructions:
          "Implement either three `nn.Linear(d_model, d_model)` layers (`q_proj`, `k_proj`, `v_proj`) or a single fused `c_attn = nn.Linear(d_model, 3 * d_model)` split via `.chunk(3, dim=-1)`.",
        expectedOutcome:
          "Produces `q`, `k`, and `v` tensors of shape `(B, T, d_model)` (or `(B, T, d_k)` for a single head).",
        acceptanceCriteria:
          "Supports optional `bias=False` matching modern LLM conventions.",
        difficulty: "Core",
      },
      {
        id: "p9-t03",
        stepNumber: 3,
        title: "Calculate attention scores",
        explanation:
          "Batched matrix multiplication `q @ k.transpose(-2, -1)` computes the raw dot-product similarity between every query `i` and every key `j`.",
        instructions:
          "Compute `scores = q @ k.transpose(-2, -1)` and verify the output shape is `(B, T, T)` (single-head) or `(B, H, T, T)` (multi-head).",
        expectedOutcome:
          "Pairwise score matrix of shape `(..., T, T)`.",
        acceptanceCriteria:
          "Uses `.transpose(-2, -1)` so batch and head dimensions are preserved.",
        difficulty: "Core",
      },
      {
        id: "p9-t04",
        stepNumber: 4,
        title: "Apply scaling",
        explanation:
          "Without dividing by `√d_k`, dot products grow in variance as `d_k` increases, pushing Softmax into flat saturation regions where gradients vanish.",
        instructions:
          "Multiply `scores` by `1.0 / math.sqrt(d_k)` where `d_k = d_model // num_heads`.",
        expectedOutcome:
          "Scaled logits retain unit variance when `q` and `k` have unit variance.",
        acceptanceCriteria:
          "Scales by `√d_k` (head dimension), NOT `√d_model`!",
        difficulty: "Core",
      },
      {
        id: "p9-t05",
        stepNumber: 5,
        title: "Apply causal masking",
        explanation:
          "In autoregressive language modeling, position `t` must never attend to future tokens `j > t`. Setting upper-triangular entries to `-inf` before Softmax drives their attention probabilities to exact `0.0`.",
        instructions:
          "Register a lower-triangular causal buffer `self.register_buffer('causal_mask', torch.tril(torch.ones(max_seq_len, max_seq_len)))` and apply `scores = scores.masked_fill(self.causal_mask[:T, :T] == 0, float('-inf'))`.",
        expectedOutcome:
          "All entries above the main diagonal (`j > i`) equal `-inf`.",
        acceptanceCriteria:
          "Mask is registered with `register_buffer` so `model.to(device)` moves it automatically without treating it as a trainable parameter.",
        difficulty: "Intermediate",
      },
      {
        id: "p9-t06",
        stepNumber: 6,
        title: "Calculate softmax probabilities",
        explanation:
          "Applying Softmax along the last dimension (`dim=-1`, the Key dimension) turns each Query row into a valid probability distribution summing to `1.0`.",
        instructions:
          "Compute `attn_weights = F.softmax(scores, dim=-1)` and optionally store or return `attn_weights` for visualization.",
        expectedOutcome:
          "Lower-triangular stochastic attention matrix where every row sums to `1.0` and all entries `j > i` are `0.0`.",
        acceptanceCriteria:
          "`torch.allclose(attn_weights.sum(dim=-1), torch.ones_like(attn_weights.sum(dim=-1)))` is True.",
        difficulty: "Core",
      },
      {
        id: "p9-t07",
        stepNumber: 7,
        title: "Produce weighted values",
        explanation:
          "Multiplying the `(..., T, T)` attention probabilities by `V` of shape `(..., T, d_k)` blends Value vectors according to their relevance to each Query.",
        instructions:
          "Compute `context = attn_weights @ v`.",
        expectedOutcome:
          "Per-head context tensor of shape `(B, H, T, d_k)`.",
        acceptanceCriteria:
          "Position `t=0` output equals `v[:, :, 0, :]` exactly since it can only attend to itself.",
        difficulty: "Core",
      },
      {
        id: "p9-t08",
        stepNumber: 8,
        title: "Implement multi-head attention",
        explanation:
          "Splitting `d_model` into `H` subspaces of size `d_k = d_model // H` lets different heads simultaneously attend to syntactic, positional, and semantic relationships.",
        instructions:
          "Reshape `q, k, v` from `(B, T, d_model)` to `(B, T, H, d_k)` and call `.transpose(1, 2)` so the head dimension `H` becomes a batch-like dimension `(B, H, T, d_k)`.",
        expectedOutcome:
          "All `H` heads compute scaled dot-product attention in parallel in a single batched matmul.",
        acceptanceCriteria:
          "No Python `for` loop over heads `0..H-1`; uses 4D batched tensor operations.",
        difficulty: "Intermediate",
      },
      {
        id: "p9-t09",
        stepNumber: 9,
        title: "Concatenate head outputs",
        explanation:
          "After attention, the `H` head outputs `(B, H, T, d_k)` are transposed back to `(B, T, H, d_k)` and flattened into `(B, T, d_model)`.",
        instructions:
          "Compute `context = context.transpose(1, 2).contiguous().view(B, T, d_model)`.",
        expectedOutcome:
          "Combined multi-head representation of shape `(B, T, d_model)`.",
        acceptanceCriteria:
          "Calls `.contiguous()` before `.view(B, T, d_model)` so non-contiguous strides after `.transpose(1, 2)` never raise a `RuntimeError`.",
        difficulty: "Core",
      },
      {
        id: "p9-t10",
        stepNumber: 10,
        title: "Add output projection",
        explanation:
          "Concatenating heads simply stacks them side-by-side; the output projection `W_O` (`nn.Linear(d_model, d_model)`) mixes information across all `H` heads.",
        instructions:
          "Apply `out = self.c_proj(context)` (with optional attention/residual dropout).",
        expectedOutcome:
          "Final output tensor of shape `(B, T, d_model)`.",
        acceptanceCriteria:
          "Input and output shapes of `CausalMultiHeadAttention` are identical `(B, T, d_model)`.",
        difficulty: "Core",
      },
      {
        id: "p9-t11",
        stepNumber: 11,
        title: "Verify tensor shapes",
        explanation:
          "Explicit shape assertions catch subtle broadcasting bugs (like forgetting `.transpose(1, 2)`).",
        instructions:
          "Add shape verification tests across multiple `(B, T, d_model, H)` configurations, including variable sequence lengths `T = 1`, `T = 17`, and `T = max_seq_len`.",
        expectedOutcome:
          "All intermediate and output shapes verified.",
        acceptanceCriteria:
          "Raises `ValueError` if `d_model % num_heads != 0`.",
        difficulty: "Core",
      },
      {
        id: "p9-t12",
        stepNumber: 12,
        title: "Test causal behavior",
        explanation:
          "The definitive test of causal self-attention is prefix invariance: mutating tokens at positions `t+1 .. T-1` must have ZERO effect on the output at positions `0 .. t`.",
        instructions:
          "Write `test_strict_causality()`: run `out1 = attn(x1)`, clone `x2 = x1.clone()`, overwrite `x2[:, 4:, :] = torch.randn_like(x2[:, 4:, :])`, run `out2 = attn(x2)`, and assert `torch.allclose(out1[:, :4, :], out2[:, :4, :], atol=1e-7)`.",
        expectedOutcome:
          "Prefix positions `0, 1, 2, 3` remain bit-for-bit identical when tokens `4..T-1` are randomized.",
        acceptanceCriteria:
          "Also verifies that if the causal mask is disabled, mutating future tokens DOES change prefix outputs.",
        difficulty: "Advanced",
      },
      {
        id: "p9-t13",
        stepNumber: 13,
        title: "Compare against a reference implementation",
        explanation:
          "PyTorch 2.0+ provides `F.scaled_dot_product_attention(q, k, v, is_causal=True)`. Comparing your manual attention math against it verifies 100% numerical accuracy.",
        instructions:
          "Write a parity test comparing your manual `(q @ k.T / sqrt(d_k) + mask).softmax() @ v` against `F.scaled_dot_product_attention(q, k, v, is_causal=True)` on both forward outputs and backward `.grad` tensors.",
        expectedOutcome:
          "Forward outputs and backward gradients match PyTorch's reference SDPA within `1e-6`.",
        acceptanceCriteria:
          "Automated pytest suite passes all shape, causality, and reference parity tests.",
        difficulty: "Intermediate",
      },
    ],
    acceptanceCriteria: [
      "Single-head and multi-head causal self-attention implemented from scratch in PyTorch without calling `nn.MultiheadAttention`.",
      "4D tensor reshapes `(B, H, T, d_k)`, `1/√d_k` scaling, lower-triangular causal masking, and `W_O` output projection verified.",
      "Strict causality unit test proves zero information leakage from future positions `j > i`.",
      "Forward and backward parity verified against `F.scaled_dot_product_attention(..., is_causal=True)`.",
    ],
    testingGuide: {
      summary:
        "Run tensor shape checks, attention weight row-sum & upper-triangle zero checks, prefix causality invariance tests, and PyTorch SDPA parity tests.",
      verificationCommand: "pytest tests/test_self_attention.py -v",
      testCases: [
        {
          title: "Prefix Causality Invariance Test",
          purpose:
            "Prove that token position `t` cannot see or be influenced by any token at position `> t`.",
          verificationSteps:
            "Compare `attn(x)[:, :t, :]` before and after replacing `x[:, t:, :]` with random noise in `eval()` mode.",
          expectedResult: "Max absolute difference on positions `0..t-1` is `< 1e-7`.",
        },
        {
          title: "Attention Matrix Row-Stochastic & Upper-Triangle Zero Test",
          purpose:
            "Verify that post-softmax attention weights sum to 1.0 per row and are strictly 0.0 for `j > i`.",
          verificationSteps:
            "Inspect `attn_weights` of shape `(B, H, T, T)`: check `torch.triu(attn_weights, diagonal=1).abs().max()` and `attn_weights.sum(dim=-1)`.",
          expectedResult: "Upper triangle max is `0.0` and all row sums equal `1.0`.",
        },
      ],
    },
    codeExamples: [
      {
        title: "Multi-Head Causal Self-Attention in PyTorch",
        language: "python",
        purpose:
          "Shows the canonical 4D tensor reshape, `1/√d_k` scaling, `register_buffer` causal mask, and head recombination.",
        code: `import math
import torch
import torch.nn as nn
import torch.nn.functional as F

class CausalMultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, num_heads: int, max_seq_len: int = 1024) -> None:
        super().__init__()
        if d_model % num_heads != 0:
            raise ValueError(f"d_model ({d_model}) must be divisible by num_heads ({num_heads})")
        self.d_model = d_model
        self.num_heads = num_heads
        self.head_dim = d_model // num_heads

        self.c_attn = nn.Linear(d_model, 3 * d_model)
        self.c_proj = nn.Linear(d_model, d_model)
        self.register_buffer(
            "causal_mask",
            torch.tril(torch.ones(max_seq_len, max_seq_len)).view(1, 1, max_seq_len, max_seq_len),
        )

    def forward(self, x: torch.Tensor) -> tuple[torch.Tensor, torch.Tensor]:
        B, T, C = x.size()
        qkv = self.c_attn(x)
        q, k, v = qkv.split(self.d_model, dim=2)

        # Reshape (B, T, C) -> (B, H, T, d_k)
        q = q.view(B, T, self.num_heads, self.head_dim).transpose(1, 2)
        k = k.view(B, T, self.num_heads, self.head_dim).transpose(1, 2)
        v = v.view(B, T, self.num_heads, self.head_dim).transpose(1, 2)

        scores = (q @ k.transpose(-2, -1)) * (1.0 / math.sqrt(self.head_dim))
        scores = scores.masked_fill(self.causal_mask[:, :, :T, :T] == 0, float("-inf"))
        attn_weights = F.softmax(scores, dim=-1)

        out = attn_weights @ v  # (B, H, T, d_k)
        out = out.transpose(1, 2).contiguous().view(B, T, C)
        return self.c_proj(out), attn_weights`,
      },
    ],
    hints: [
      {
        id: "p9-h1",
        title: "Masking with `0.0` vs `-inf` Before Softmax",
        category: "Common Mistake",
        content:
          "Never mask future attention scores by setting them to `0.0` before Softmax! Since `exp(0.0) = 1.0`, setting masked logits to `0.0` gives future tokens a positive non-zero probability after Softmax. Always fill masked positions with `float('-inf')` before `F.softmax`, because `exp(-inf) = 0.0`.",
      },
      {
        id: "p9-h2",
        title: "Why `.view(B, H, T, d_k)` Directly Without `.transpose(1, 2)` Is Wrong",
        category: "Expected Tensor Shapes",
        content:
          "A tensor of shape `(B, T, C)` has sequence steps `T` before channels `C = H * d_k` in memory. Calling `.view(B, H, T, d_k)` directly mixes tokens from different time steps into the same head! You must first `.view(B, T, H, d_k)` to split the channel dimension, and then `.transpose(1, 2)` to swap `T` and `H`.",
      },
    ],
    optionalChallenges: [
      {
        id: "p9-oc1",
        title: "Implement Rotary Positional Embeddings (RoPE)",
        description:
          "Implement 2D complex-plane rotation of Query and Key vectors (`apply_rope(q, k, cos, sin)`) so attention scores depend purely on relative token distance `i - j`.",
        whatYouLearn:
          "How modern open-weights LLMs (Llama, Mistral, Qwen, Gemma) encode relative position directly inside self-attention.",
      },
      {
        id: "p9-oc2",
        title: "Grouped-Query Attention (GQA)",
        description:
          "Extend your module to support `num_kv_heads < num_query_heads` (sharing Key and Value heads across groups of Query heads) to reduce KV-cache memory.",
        whatYouLearn:
          "How Grouped-Query Attention reduces inference memory bandwidth while preserving model quality.",
      },
    ],
    expectedDeliverable: "A reusable causal attention module.",
    deliverablesList: [
      "Standalone `SingleHeadCausalAttention` and `CausalMultiHeadAttention` PyTorch modules",
      "Strict prefix causality and PyTorch SDPA reference parity test suite",
      "Attention heatmap visualization utility",
    ],
    learningOutcomes: [
      "Derive and implement scaled dot-product causal self-attention `softmax(QKᵀ/√d_k + M)V` in PyTorch.",
      "Track and transform 4D tensors `(B, H, T, d_k)` across multi-head splitting and concatenation without memory-layout bugs.",
      "Prove strict autoregressive causality using prefix perturbation unit tests.",
      "Explain why `1/√d_k` scaling and `-inf` pre-softmax masking are essential for stable Transformer training.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "causal-self-attention-engine",
      recommendedStructure: [
        "attention/mha.py",
        "attention/visualize.py",
        "tests/test_self_attention.py",
        "README.md",
      ],
      readmeChecklist: [
        "Step-by-step tensor shape trace from `(B, T, d_model)` through `(B, H, T, T)`",
        "Instructions to run causality and PyTorch SDPA parity tests",
        "Sample causal attention heatmap plot",
      ],
    },
    relatedResourceIds: [
      "attention-is-all-you-need-paper",
      "harvard-annotated-transformer",
      "karpathy-lets-build-gpt-lecture",
    ],
    relatedModuleIds: ["p5-m1", "p5-m2"],
    relatedProjectIds: [
      "milestone-10-mini-gpt-architecture",
      "milestone-11-pretrained-mini-llm",
      "milestone-13-llm-inference-server",
    ],
  },

  // ============================================================================
  // PROJECT 10 — MINI GPT ARCHITECTURE
  // ============================================================================
  {
    id: "milestone-10-mini-gpt-architecture",
    slug: "mini-gpt-architecture",
    milestoneNumber: 10,
    title: "Mini GPT Architecture",
    subtitle:
      "Build a complete decoder-only Transformer architecture from scratch in PyTorch",
    shortDescription:
      "Build a complete decoder-only Transformer (Mini GPT) from scratch in PyTorch—including token and positional embeddings, Pre-Norm residual Transformer blocks, causal multi-head attention, MLP feed-forward networks, language modeling head, training loop, checkpointing, and autoregressive generation.",
    detailedOverview:
      "In this milestone project, you will assemble every component of a modern decoder-only Large Language Model (`GPT`) from scratch in PyTorch. Using the causal multi-head self-attention engine you built in Project 9, you will construct a Pre-LayerNorm `TransformerBlock` (`x = x + attn(ln1(x))`, `x = x + mlp(ln2(x))`), stack `N` blocks atop token and positional embeddings, apply final normalization and the language-model output head (`lm_head`), implement scaled residual weight initialization (`0.02 / √(2N)`), and verify the complete architecture by overfitting a tiny batch to near-zero loss and generating text autoregressively.",
    whyThisProjectMatters:
      "Once you complete Project 10, you have built the exact architectural blueprint of GPT-2/GPT-3/Llama from scratch. In Project 11, you will pair this architecture with your Project 8 BPE tokenizer and a pretraining data pipeline to train `MyLLM v1`.",
    phase: 5,
    difficulty: "advanced",
    difficultyFilter: "Advanced",
    difficultyLabel: "Advanced",
    estimatedEffort: "18–24 hours · 2 weeks",
    technologies: ["PyTorch"],
    prerequisites: [
      "Project 7 (Character Language Model) and Project 9 (Self-Attention Engine)",
      "Phase 5 Modules 5.3, 5.4, & 5.5 (Transformer Block, Decoder-Only Architecture, Sampling)",
    ],
    requiredMathConcepts: [
      "Pre-Norm Residual Stream: h_l = x_l + MHA(LN(x_l)), x_{l+1} = h_l + FFN(LN(h_l))",
      "Position-wise Feed-Forward Network: FFN(x) = W₂ · GELU(W₁ x + b₁) + b₂ with d_ff = 4 d_model",
      "Layer Normalization / RMSNorm across channel dimension d_model",
      "Residual depth scaling initialization: σ_proj = 0.02 / √(2 · n_layers)",
      "Weight tying between input token embedding W_E and output projection W_head = W_Eᵀ",
    ],
    learningObjectives: [
      "Define a clean `GPTConfig` dataclass encapsulating `vocab_size`, `block_size`, `n_layer`, `n_head`, `n_embd`, and `dropout`.",
      "Implement the Pre-Norm `TransformerBlock` combining `CausalMultiHeadAttention`, `LayerNorm` (or `RMSNorm`), and `MLP` (`4 × n_embd` expansion with `GELU`/`SwiGLU`) around residual pathways.",
      "Assemble the full `MiniGPT` model with embeddings, stacked blocks, `lm_head` weight tying, scaled initialization, and Cross-Entropy loss.",
      "Verify the architecture with forward-shape checks, initial loss checks (`-ln(1/V)`), single-batch overfit debugging, checkpoint save/load, and autoregressive generation.",
    ],
    skillsPracticed: [
      "Pre-LN Transformer block & residual stream assembly",
      "Position-wise GELU / SwiGLU feed-forward networks",
      "Residual projection weight initialization & embedding weight tying",
      "Autoregressive Top-k / Top-p (nucleus) generation & checkpointing",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "Embeddings, Feed-Forward MLP & Pre-LN Transformer Block",
        summary:
          "Implement token/positional embeddings, LayerNorm, position-wise MLP, and residual Pre-Norm Transformer blocks.",
        taskIds: ["p10-t01", "p10-t02", "p10-t03", "p10-t04", "p10-t05", "p10-t06", "p10-t07"],
      },
      {
        stageNumber: 2,
        title: "Full Decoder Stack, Language Model Head & Cross-Entropy Loss",
        summary:
          "Stack `n_layer` Transformer blocks, add final LayerNorm and weight-tied `lm_head`, and compute sequence Cross-Entropy loss.",
        taskIds: ["p10-t08", "p10-t09", "p10-t10"],
      },
      {
        stageNumber: 3,
        title: "Training Loop, Autoregressive Generation & Checkpointing",
        summary:
          "Implement the training step, autoregressive token generation, and checkpoint serialization.",
        taskIds: ["p10-t11", "p10-t12", "p10-t13"],
      },
      {
        stageNumber: 4,
        title: "Shape Validation, Mask Checks & Short Training Run Verification",
        summary:
          "Validate tensor shapes and causal masks and run a short training / single-batch overfit verification test.",
        taskIds: ["p10-t14", "p10-t15"],
      },
    ],
    tasks: [
      {
        id: "p10-t01",
        stepNumber: 1,
        title: "Create token embeddings",
        explanation:
          "The token embedding table `wte = nn.Embedding(vocab_size, n_embd)` maps integer token IDs `(B, T)` into vectors `(B, T, n_embd)`.",
        instructions:
          "Define `GPTConfig` dataclass and initialize `wte = nn.Embedding(config.vocab_size, config.n_embd)` in `minigpt/model.py`.",
        expectedOutcome:
          "Token IDs `(B, T)` map to `(B, T, n_embd)` embeddings.",
        acceptanceCriteria:
          "Raises an assertion error if any input token ID is `< 0` or `>= vocab_size`.",
        difficulty: "Core",
      },
      {
        id: "p10-t02",
        stepNumber: 2,
        title: "Implement position information",
        explanation:
          "Dot-product attention is permutation-equivariant without positional information; learned positional embeddings `wpe = nn.Embedding(block_size, n_embd)` (or RoPE) inject sequence order `0..T-1`.",
        instructions:
          "Create `wpe = nn.Embedding(config.block_size, config.n_embd)`, generate position indices `pos = torch.arange(0, T, dtype=torch.long, device=idx.device)`, and sum `x = wte(idx) + wpe(pos)`.",
        expectedOutcome:
          "Position embeddings `(T, n_embd)` broadcast across batch size `B` and add to token embeddings.",
        acceptanceCriteria:
          "Asserts `T <= config.block_size` with a clear error message.",
        difficulty: "Core",
      },
      {
        id: "p10-t03",
        stepNumber: 3,
        title: "Implement causal multi-head attention",
        explanation:
          "Integrate the `CausalMultiHeadAttention` module from Project 9 as the communication sublayer of each Transformer block.",
        instructions:
          "Wire `CausalMultiHeadAttention(config)` into your `minigpt` package so it accepts `(B, T, n_embd)` and returns `(B, T, n_embd)`.",
        expectedOutcome:
          "Self-attention sublayer mixes contextual information across past tokens `≤ t`.",
        acceptanceCriteria:
          "Preserves strict causal masking for any sequence length `T <= block_size`.",
        difficulty: "Core",
      },
      {
        id: "p10-t04",
        stepNumber: 4,
        title: "Implement feed-forward networks",
        explanation:
          "While self-attention routes information across token positions, the position-wise MLP (`n_embd -> 4 * n_embd -> n_embd` with `GELU`) processes each token representation independently.",
        instructions:
          "Implement `FeedForwardMLP(config)` with `c_fc = nn.Linear(n_embd, 4 * n_embd)`, `nn.GELU()`, `c_proj = nn.Linear(4 * n_embd, n_embd)`, and optional dropout.",
        expectedOutcome:
          "Processes `(B, T, n_embd)` -> `(B, T, 4 * n_embd)` -> `(B, T, n_embd)`.",
        acceptanceCriteria:
          "Applies identical weights independently at every sequence position `t`.",
        difficulty: "Core",
      },
      {
        id: "p10-t05",
        stepNumber: 5,
        title: "Add normalization",
        explanation:
          "Applying `LayerNorm` (or `RMSNorm`) before each sublayer (`Pre-LN`) keeps activation variances stable and leaves the residual stream unobstructed for gradient flow.",
        instructions:
          "Add `ln_1 = nn.LayerNorm(n_embd)` before self-attention, `ln_2 = nn.LayerNorm(n_embd)` before the MLP inside each block, and a final `ln_f = nn.LayerNorm(n_embd)` after the last block.",
        expectedOutcome:
          "Activations entering every attention and MLP sublayer have zero mean and unit variance.",
        acceptanceCriteria:
          "Follows the Pre-Norm order (`x + sublayer(ln(x))`), NOT Post-Norm (`ln(x + sublayer(x))`).",
        difficulty: "Core",
      },
      {
        id: "p10-t06",
        stepNumber: 6,
        title: "Add residual connections",
        explanation:
          "Residual connections `x = x + sublayer(x)` act as a gradient superhighway: during `.backward()`, `∂(x + f(x))/∂x = I + ∂f/∂x`, allowing gradients to flow directly from the loss to the earliest layers.",
        instructions:
          "In `TransformerBlock.forward(x)`, implement `x = x + self.attn(self.ln_1(x))` followed by `x = x + self.mlp(self.ln_2(x))`.",
        expectedOutcome:
          "Unbroken additive residual stream through the block.",
        acceptanceCriteria:
          "Scale residual output projections (`c_proj`) by `0.02 / math.sqrt(2 * config.n_layer)` at initialization so residual stream variance does not grow with depth.",
        difficulty: "Core",
      },
      {
        id: "p10-t07",
        stepNumber: 7,
        title: "Construct Transformer blocks",
        explanation:
          "Combining `ln_1`, `attn`, `ln_2`, and `mlp` forms a self-contained `TransformerBlock(nn.Module)`.",
        instructions:
          "Complete `class TransformerBlock(nn.Module)` and verify that passing `(B, T, n_embd)` returns `(B, T, n_embd)`.",
        expectedOutcome:
          "Reusable `TransformerBlock` module.",
        acceptanceCriteria:
          "Unit test verifies forward and backward pass on a single `TransformerBlock`.",
        difficulty: "Core",
      },
      {
        id: "p10-t08",
        stepNumber: 8,
        title: "Stack multiple blocks",
        explanation:
          "Using `nn.ModuleList([TransformerBlock(config) for _ in range(config.n_layer)])` registers all `n_layer` blocks properly with PyTorch's parameter system.",
        instructions:
          "Create `self.blocks = nn.ModuleList(...)` in `MiniGPT` and iterate `for block in self.blocks: x = block(x)` during `forward`.",
        expectedOutcome:
          "Configurable depth (`n_layer = 4, 6, 12`) decoder stack.",
        acceptanceCriteria:
          "Uses `nn.ModuleList` (never a plain Python `list`, which hides parameters from `model.parameters()`!).",
        difficulty: "Core",
      },
      {
        id: "p10-t09",
        stepNumber: 9,
        title: "Implement the output language-model head",
        explanation:
          "The final linear projection `lm_head = nn.Linear(n_embd, vocab_size, bias=False)` maps normalized hidden states `(B, T, n_embd)` to vocabulary logits `(B, T, vocab_size)`.",
        instructions:
          "Add `self.lm_head = nn.Linear(config.n_embd, config.vocab_size, bias=False)` and tie its weights with the input token embedding (`self.wte.weight = self.lm_head.weight`).",
        expectedOutcome:
          "Output logits of shape `(B, T, vocab_size)` with shared input/output embedding parameters.",
        acceptanceCriteria:
          "Weight tying verified via `assert model.wte.weight is model.lm_head.weight`.",
        difficulty: "Intermediate",
      },
      {
        id: "p10-t10",
        stepNumber: 10,
        title: "Implement cross-entropy loss",
        explanation:
          "When `targets` of shape `(B, T)` are provided to `MiniGPT.forward(idx, targets)`, the model computes `F.cross_entropy(logits.view(-1, vocab_size), targets.view(-1))`.",
        instructions:
          "Accept optional `targets: torch.Tensor | None = None` in `MiniGPT.forward` and return `(logits, loss)`.",
        expectedOutcome:
          "Returns `(logits, scalar_loss)` during training and `(logits, None)` during inference.",
        acceptanceCriteria:
          "At initialization before training, `loss.item()` is within `0.15` of `math.log(config.vocab_size)`.",
        difficulty: "Core",
      },
      {
        id: "p10-t11",
        stepNumber: 11,
        title: "Implement a training loop",
        explanation:
          "Training a Transformer uses `AdamW(model.parameters(), lr=3e-4, betas=(0.9, 0.95), weight_decay=0.1)` and gradient norm clipping (`clip_grad_norm_(model.parameters(), 1.0)`).",
        instructions:
          "Implement a clean training step in `minigpt/train.py` with `AdamW`, `clip_grad_norm_`, and separate weight decay parameter groups (applying weight decay only to 2D weight matrices, not 1D biases or LayerNorm scales).",
        expectedOutcome:
          "Stable Transformer optimization loop.",
        acceptanceCriteria:
          "1D parameters (`bias`, `LayerNorm`, `RMSNorm`) are excluded from L2 weight decay.",
        difficulty: "Intermediate",
      },
      {
        id: "p10-t12",
        stepNumber: 12,
        title: "Implement autoregressive generation",
        explanation:
          "During `.generate(idx, max_new_tokens, temperature, top_k, top_p)`, the model crops `idx` to `block_size`, computes logits for the last token `logits[:, -1, :]`, applies temperature and Top-k/Top-p filtering, and appends the sampled token.",
        instructions:
          "Implement `MiniGPT.generate(...)` supporting greedy decoding (`temperature=0.0`), temperature scaling, Top-k, and Top-p (nucleus) sampling.",
        expectedOutcome:
          "Autoregressive generation method on `MiniGPT`.",
        acceptanceCriteria:
          "Decorated with `@torch.no_grad()` and handles `idx` longer than `block_size` by slicing `idx[:, -self.config.block_size:]`.",
        difficulty: "Intermediate",
      },
      {
        id: "p10-t13",
        stepNumber: 13,
        title: "Add checkpoint saving and loading",
        explanation:
          "Saving both `config` (`asdict(model.config)`) and `model.state_dict()` allows reconstructing the exact `MiniGPT` architecture and weights from a single file.",
        instructions:
          "Implement `save_checkpoint(model, optimizer, step, path)` and `load_checkpoint(path, device)` returning the reconstructed `MiniGPT` instance.",
        expectedOutcome:
          "Self-contained checkpoint save and load utilities.",
        acceptanceCriteria:
          "Reloaded model produces bit-identical logits in `eval()` mode.",
        difficulty: "Core",
      },
      {
        id: "p10-t14",
        stepNumber: 14,
        title: "Validate tensor shapes and masks",
        explanation:
          "Verifying shapes across varied `(B, T)` inputs and confirming prefix causality across the full multi-layer stack ensures no block leaks future information.",
        instructions:
          "Write `tests/test_minigpt.py` testing forward output shapes `(B, T, V)`, parameter count calculation, initial loss `≈ ln(V)`, and multi-layer prefix causality invariance.",
        expectedOutcome:
          "Automated architecture verification test suite passing.",
        acceptanceCriteria:
          "Prefix causality holds across all `n_layer` stacked Transformer blocks.",
        difficulty: "Core",
      },
      {
        id: "p10-t15",
        stepNumber: 15,
        title: "Test short training runs",
        explanation:
          "Overfitting a single mini-batch of 4–8 sequences to near-zero loss (`< 0.05`) in 50 steps is the gold-standard debugging test before launching a long pretraining run.",
        instructions:
          "Write a single-batch overfit test and a short training run on a small text fixture, verifying that loss drops rapidly and `.generate()` reproduces memorized sequences from the prompt.",
        expectedOutcome:
          "Single-batch overfit test drives loss from `~4.2` to `< 0.05` in `< 60` steps.",
        acceptanceCriteria:
          "Included in automated tests and documented in `README.md`.",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "Complete decoder-only `MiniGPT` architecture implemented from scratch in PyTorch.",
      "Pre-Norm residual `TransformerBlock`, `CausalMultiHeadAttention`, `FeedForwardMLP`, weight tying, and scaled initialization verified.",
      "Forward shapes, multi-layer causal masking, initial loss sanity check, and checkpoint save/load verified by unit tests.",
      "Single-batch overfitting test drives training loss near zero and generates expected continuations.",
    ],
    testingGuide: {
      summary:
        "Run forward shape checks, initial loss sanity check (`≈ ln(V)`), multi-layer causality test, checkpoint reload test, and the 50-step single-batch overfit test.",
      verificationCommand: "pytest tests/test_minigpt.py -v",
      testCases: [
        {
          title: "Initial Untrained Loss Sanity Check (`≈ ln(vocab_size)`)",
          purpose:
            "Confirm weight initialization is properly scaled so initial predictions are near-uniform.",
          verificationSteps:
            "Instantiate `MiniGPT(GPTConfig(vocab_size=256, block_size=32, n_layer=4, n_head=4, n_embd=64))` and compute loss on random tokens.",
          expectedResult: "Initial loss is between `5.40` and `5.70` (`ln(256) ≈ 5.545`).",
        },
        {
          title: "Single-Batch Overfitting Debugging Exercise",
          purpose:
            "Prove the entire forward, loss, backward, and AdamW pipeline is wired without gradient bugs.",
          verificationSteps:
            "Train on a fixed `(4, 16)` batch for 50 steps with `lr=1e-3`.",
          expectedResult: "Loss decreases from `~5.5` to `< 0.05`.",
        },
      ],
    },
    codeExamples: [
      {
        title: "Pre-LN Transformer Block & MiniGPT Core Forward Pass",
        language: "python",
        purpose:
          "Shows the clean Pre-LayerNorm residual block structure and weight-tied decoder forward pass.",
        code: `from dataclasses import dataclass
import torch
import torch.nn as nn
import torch.nn.functional as F

@dataclass
class GPTConfig:
    vocab_size: int = 512
    block_size: int = 128
    n_layer: int = 4
    n_head: int = 4
    n_embd: int = 128

class TransformerBlock(nn.Module):
    def __init__(self, config: GPTConfig) -> None:
        super().__init__()
        self.ln_1 = nn.LayerNorm(config.n_embd)
        self.attn = CausalMultiHeadAttention(config.n_embd, config.n_head, config.block_size)
        self.ln_2 = nn.LayerNorm(config.n_embd)
        self.mlp = nn.Sequential(
            nn.Linear(config.n_embd, 4 * config.n_embd),
            nn.GELU(),
            nn.Linear(4 * config.n_embd, config.n_embd),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        attn_out, _ = self.attn(self.ln_1(x))
        x = x + attn_out
        x = x + self.mlp(self.ln_2(x))
        return x`,
      },
    ],
    hints: [
      {
        id: "p10-h1",
        title: "Never Store Layers in a Plain Python List `self.blocks = [...]`",
        category: "Common Mistake",
        content:
          "If you write `self.blocks = [TransformerBlock(cfg) for _ in range(cfg.n_layer)]` using a standard Python list instead of `nn.ModuleList(...)`, PyTorch will NOT register the blocks' parameters in `model.parameters()` or move them to GPU on `model.to(device)`! Always use `nn.ModuleList`.",
      },
      {
        id: "p10-h2",
        title: "Always Overfit 1 Tiny Batch Before Full Training",
        category: "Testing Strategy",
        content:
          "If your `MiniGPT` cannot memorize a single batch of 4 sequences of length 16 to `< 0.05` loss within 50 AdamW steps, there is a bug in your forward pass, target shifting, or optimizer setup. Always pass the 1-batch overfit test first.",
      },
    ],
    optionalChallenges: [
      {
        id: "p10-oc1",
        title: "Compare Positional Encodings: Learned `wpe` vs Sinusoidal vs RoPE",
        description:
          "Make the positional encoding strategy configurable in `GPTConfig` (`'learned' | 'sinusoidal' | 'rope'`) and compare validation loss and length generalization beyond `block_size`.",
        whatYouLearn:
          "Why modern LLMs transitioned from learned absolute positional embeddings to Rotary Positional Embeddings (RoPE).",
      },
      {
        id: "p10-oc2",
        title: "Modern Llama-Style Upgrades: `RMSNorm` & `SwiGLU` FFN",
        description:
          "Replace `LayerNorm` with root-mean-square normalization (`RMSNorm`) and replace the standard 2-layer `GELU` MLP with a 3-matrix gated `SwiGLU` feed-forward network.",
        whatYouLearn:
          "How the GPT-2 architecture evolved into the modern Llama/Mistral/Qwen block architecture.",
      },
    ],
    expectedDeliverable:
      "A trainable GPT-style model with randomly initialized parameters.",
    deliverablesList: [
      "Complete `MiniGPT` decoder-only Transformer (`minigpt/model.py`)",
      "AdamW training step, checkpoint manager, and Top-k / Top-p `.generate()` method",
      "Automated test suite verifying shapes, causality, initial loss, and single-batch overfitting",
    ],
    learningOutcomes: [
      "Explain causal self-attention and how Pre-Norm residual connections stabilize deep Transformer stacks.",
      "Implement Transformer blocks combining `LayerNorm`, `CausalMultiHeadAttention`, and position-wise `MLP` sublayers.",
      "Track token and tensor dimensions (`(B, T)`, `(B, T, n_embd)`, `(B, H, T, T)`, `(B, T, vocab_size)`) across the entire model.",
      "Train a decoder-only language model from random initialization and verify it by overfitting a single batch.",
      "Generate text autoregressively using temperature, Top-k, and Top-p nucleus sampling.",
      "Debug basic training and inference problems including initial loss spikes, mask alignment, and checkpoint reloading.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "mini-gpt-from-scratch",
      recommendedStructure: [
        "minigpt/config.py",
        "minigpt/model.py",
        "minigpt/train.py",
        "tests/test_minigpt.py",
        "README.md",
      ],
      readmeChecklist: [
        "Architecture diagram & parameter count breakdown by component",
        "Single-batch overfitting verification curve",
        "Checkpoint save/load and generation examples",
      ],
    },
    relatedResourceIds: [
      "karpathy-lets-build-gpt-lecture",
      "karpathy-nanogpt",
      "harvard-annotated-transformer",
      "attention-is-all-you-need-paper",
    ],
    relatedModuleIds: ["p5-m3", "p5-m4", "p5-m5"],
    relatedProjectIds: [
      "milestone-09-self-attention-engine",
      "milestone-11-pretrained-mini-llm",
      "milestone-12-instruction-tuned-assistant",
    ],
  },
];
