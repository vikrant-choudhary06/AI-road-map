import type { RoadmapPhase } from "@/types";

export const PHASES_0_TO_2: RoadmapPhase[] = [
  // ============================================================================
  // PHASE 0 — PROGRAMMING FOUNDATIONS
  // ============================================================================
  {
    id: "phase-0",
    slug: "phase-0-programming-foundations",
    phase: 0,
    code: "P0",
    title: "Programming Foundations",
    shortDescription:
      "Develop the Python, algorithmic, and numerical computing fluency required to implement machine learning algorithms from first principles.",
    purpose:
      "Develop the Python and numerical programming skills required to understand and implement machine-learning algorithms.",
    estimatedWeeks: 4,
    difficulty: "foundational",
    difficultyLabel: "Beginner",
    prerequisites: [
      {
        label:
          "Basic computer literacy and high-school algebra; no prior AI or programming experience required.",
      },
    ],
    learningObjectives: [
      "Write clean, modular, type-annotated Python programs independently.",
      "Understand how Python manages memory, references, mutability, and iteration under the hood.",
      "Manipulate multi-dimensional vectors, matrices, and tensors using NumPy broadcasting and vectorization.",
      "Use professional data science and engineering workflows including Pandas, Matplotlib, Git, virtual environments, and pytest.",
    ],
    modules: [
      {
        id: "p0-m1",
        code: "0.1",
        title: "Python Fundamentals",
        description:
          "Core syntax, data structures, object-oriented abstractions, functional generators, and testing discipline in modern Python.",
        estimatedEffort: "1.5 weeks · ~22–28 hours",
        whatYouWillLearn:
          "You will master the building blocks of Python—from primitive types, control structures, and collections to classes, generators, decorators, file I/O, static type hints, and automated unit testing.",
        whyItMatters:
          "Python is the universal host language of modern AI research and production engineering. Clean abstractions, type hints, and unit tests prevent silent tensor-shape bugs when building neural network pipelines.",
        learningObjectives: [
          "Write clean Python programs independently.",
          "Select the appropriate collection type (list, tuple, set, dict) based on lookup and mutability needs.",
          "Design reusable classes and functions with explicit type annotations and unit tests.",
        ],
        keyConcepts: [
          "Primitive types & control flow",
          "Hash maps (dict) & sets",
          "Comprehensions & generators",
          "Object-oriented classes",
          "Type hints & pytest",
        ],
        topics: [
          {
            id: "p0-m1-variables-data-types",
            title: "Variables and data types",
            explanation:
              "Variables bind names to objects in memory. Core scalar types include integers (`int`), IEEE-754 floating-point numbers (`float`), booleans (`bool`), and Unicode strings (`str`).",
            keyConcepts: ["Dynamic typing", "int vs float precision", "Boolean truthiness", "String formatting"],
            learningOutcome: "Declare, inspect, and convert scalar data types without implicit type-coercion bugs.",
            formulaOrCode: "learning_rate: float = 3e-4\nbatch_size: int = 32",
          },
          {
            id: "p0-m1-control-flow",
            title: "Control flow",
            explanation:
              "Conditional branches (`if`, `elif`, `else`) and loops (`for`, `while`, `break`, `continue`) direct execution order—such as iterating over training epochs and stopping early when validation loss plateaus.",
            keyConcepts: ["Conditional branching", "for/while loops", "enumerate() & zip()", "Early termination"],
            learningOutcome: "Structure multi-step iterative algorithms such as training loops and convergence checks.",
          },
          {
            id: "p0-m1-functions",
            title: "Functions",
            explanation:
              "Functions encapsulate reusable logic with explicit inputs, default parameters, keyword arguments, and return values, keeping data preprocessing and mathematical formulas modular.",
            keyConcepts: ["Positional vs keyword args", "Default parameters", "Pure functions", "Variable scope (LEGB)"],
            learningOutcome: "Decompose complex mathematical procedures into small, testable pure functions.",
          },
          {
            id: "p0-m1-collections",
            title: "Lists, tuples, sets, dictionaries",
            explanation:
              "Lists store ordered mutable sequences; tuples represent fixed immutable records (like tensor shapes `(batch, seq_len, d_model)`); sets track unique tokens; dictionaries map keys to values in O(1) average time (like token-to-ID vocabularies).",
            keyConcepts: ["List indexing & slicing", "Immutable tuples for shapes", "O(1) set membership", "Dictionary hash tables"],
            learningOutcome: "Build token vocabularies and dataset indexes using optimal built-in data structures.",
            formulaOrCode: "vocab: dict[str, int] = {'<pad>': 0, '<bos>': 1, 'ai': 2}\ntensor_shape: tuple[int, int, int] = (4, 128, 768)",
          },
          {
            id: "p0-m1-comprehensions",
            title: "List and dictionary comprehensions",
            explanation:
              "Comprehensions provide a concise, readable syntax for transforming and filtering sequences or inverting token-to-ID lookup tables in a single expression.",
            keyConcepts: ["List comprehension", "Filtering predicates", "Dictionary inversion", "Set comprehension"],
            learningOutcome: "Transform datasets and invert vocabulary mappings cleanly without verbose boilerplate loops.",
            formulaOrCode: "id_to_token = {idx: tok for tok, idx in vocab.items()}",
          },
          {
            id: "p0-m1-classes-objects",
            title: "Classes and objects",
            explanation:
              "Classes bundle state (attributes like layer weights and biases) with behavior (methods like `forward()` and `parameters()`). Every PyTorch `nn.Module` you write later is a Python class.",
            keyConcepts: ["__init__ constructor", "Instance attributes (self)", "Dunder methods (__call__, __repr__)", "Inheritance"],
            learningOutcome: "Model stateful components such as neural network layers, optimizers, and tokenizers as classes.",
          },
          {
            id: "p0-m1-iterators-generators",
            title: "Iterators and generators",
            explanation:
              "Generators use `yield` to produce items lazily one batch at a time rather than loading terabytes of training text into RAM all at once.",
            keyConcepts: ["Lazy evaluation", "yield keyword", "Generator expressions", "Streaming data batches"],
            learningOutcome: "Write memory-efficient data loaders that stream batches from large files.",
          },
          {
            id: "p0-m1-decorators",
            title: "Decorators",
            explanation:
              "Decorators wrap functions to add cross-cutting behavior—such as timing execution, caching results, or disabling gradient tracking with `@torch.no_grad()`.",
            keyConcepts: ["Higher-order functions", "Closures", "@functools.wraps", "Execution timing wrappers"],
            learningOutcome: "Create and apply decorators for profiling, logging, and state management.",
          },
          {
            id: "p0-m1-error-handling",
            title: "Error handling",
            explanation:
              "Structured `try/except/finally` blocks and custom `ValueError` assertions catch mismatched matrix dimensions or corrupted dataset rows immediately with informative diagnostics.",
            keyConcepts: ["Exception hierarchy", "Raising ValueError on shape mismatch", "Context managers (with)", "Fail-fast validation"],
            learningOutcome: "Guard mathematical functions with explicit shape and domain validations.",
          },
          {
            id: "p0-m1-modules-packages",
            title: "Modules and packages",
            explanation:
              "Organizing code across separate `.py` modules and packages (`__init__.py`) separates model definitions, data pipelines, training loops, and evaluation suites.",
            keyConcepts: ["Absolute vs relative imports", "Package structure", "__name__ == '__main__'", "Namespace hygiene"],
            learningOutcome: "Structure multi-file Python projects cleanly instead of working in a single script.",
          },
          {
            id: "p0-m1-file-handling",
            title: "File handling",
            explanation:
              "Context managers (`with open(...)`) and `pathlib.Path` safely read and write UTF-8 text corpora, JSON configurations, and binary model checkpoints.",
            keyConcepts: ["pathlib.Path", "Context managers", "UTF-8 encoding", "JSON & binary serialization"],
            learningOutcome: "Read training corpora and persist configuration files safely across operating systems.",
          },
          {
            id: "p0-m1-type-hints",
            title: "Type hints",
            explanation:
              "Static type annotations (`def matmul(a: list[list[float]], b: list[list[float]]) -> list[list[float]]:`) document contracts and catch bugs before a long training run starts.",
            keyConcepts: ["Function signatures", "Generic collections", "Optional & Union types", "Static type checking"],
            learningOutcome: "Annotate functions and classes so inputs, outputs, and collection types are self-documenting.",
          },
          {
            id: "p0-m1-testing-debugging",
            title: "Testing and debugging",
            explanation:
              "Unit tests (`pytest`), assertions, and interactive debuggers (`pdb` / IDE breakpoints) verify that custom mathematical implementations match analytical reference values.",
            keyConcepts: ["pytest assertions", "Edge-case testing", "Floating-point approximate equality", "Stack trace inspection"],
            learningOutcome: "Write automated unit tests that verify mathematical correctness and edge cases.",
          },
        ],
        practicalExercises: [
          "Write a type-annotated `Matrix` class in pure Python supporting shape inspection, transpose, and element-wise addition.",
          "Build a lazy generator `batch_iterable(items, batch_size)` that yields fixed-size chunks from a large text file.",
          "Write a `pytest` suite verifying your `Matrix` class against hand-calculated 2×3 and 3×2 examples.",
        ],
        completionMilestone:
          "Write clean Python programs independently with classes, generators, type hints, and unit tests.",
        recommendedResources: [
          {
            title: "Harvard CS50's Introduction to Programming with Python",
            provider: "Harvard University",
            url: "https://cs50.harvard.edu/python/",
          },
        ],
      },
      {
        id: "p0-m2",
        code: "0.2",
        title: "Python Internals",
        description:
          "How Python represents objects in memory, reference semantics, mutability pitfalls, and algorithmic complexity.",
        estimatedEffort: "0.5 weeks · ~8–10 hours",
        whatYouWillLearn:
          "You will understand how Python binds names to heap objects, why mutating a shared list or tensor in-place can corrupt training state, how the iterator protocol works, and how to analyze Big-O time and space complexity.",
        whyItMatters:
          "In-place tensor mutations (`x += 1` vs `x = x + 1`) and unintended shallow copies are among the most common causes of broken gradient computation in PyTorch.",
        learningObjectives: [
          "Understand how Python programs manage data and where performance costs arise.",
          "Distinguish object identity (`is`), value equality (`==`), shallow copies, and deep copies.",
          "Analyze the time and space complexity of data preprocessing and matrix algorithms.",
        ],
        keyConcepts: [
          "Heap references & object identity",
          "In-place mutation vs new allocation",
          "Reference counting & GC",
          "__iter__ and __next__",
          "Big-O time & space complexity",
        ],
        topics: [
          {
            id: "p0-m2-objects-references",
            title: "Objects and references",
            explanation:
              "In Python, variables do not store raw values directly; they store references (pointers) to objects allocated in memory. Assigning `b = a` aliases the same underlying object.",
            keyConcepts: ["id() inspection", "is vs ==", "Aliasing", "Pointer semantics"],
            learningOutcome: "Predict when two variables point to the same underlying memory buffer.",
          },
          {
            id: "p0-m2-mutability-immutability",
            title: "Mutability and immutability",
            explanation:
              "Lists, dicts, sets, and NumPy/PyTorch arrays are mutable (can be modified in-place), whereas ints, floats, strings, and tuples are immutable. Mutating a shared buffer affects all references to it.",
            keyConcepts: ["In-place modification", "Shallow vs deep copy", "Hashability requirement for dict keys", "Immutable tuples"],
            learningOutcome: "Avoid accidental state corruption caused by mutating shared lists or array views.",
          },
          {
            id: "p0-m2-memory-management",
            title: "Memory management fundamentals",
            explanation:
              "CPython uses reference counting paired with a cyclic garbage collector. Holding lingering references to intermediate computation graphs in a training loop causes memory leaks (OOM).",
            keyConcepts: ["Reference counting", "Cyclic garbage collection", "Memory footprint of Python objects vs C arrays", "Preventing training loop leaks"],
            learningOutcome: "Identify and eliminate unintended reference retention in iterative loops.",
          },
          {
            id: "p0-m2-iteration-protocol",
            title: "Iteration protocol",
            explanation:
              "Any object implementing `__iter__()` and `__next__()` (raising `StopIteration` when exhausted) integrates seamlessly with `for` loops, unpacking, and PyTorch `DataLoader` pipelines.",
            keyConcepts: ["Iterable vs Iterator", "__iter__ & __next__", "StopIteration", "Custom dataset iterators"],
            learningOutcome: "Implement custom iterable dataset classes that follow Python's iteration protocol.",
          },
          {
            id: "p0-m2-function-arguments",
            title: "Function arguments",
            explanation:
              "Python passes object references by value ('pass-by-object-reference'). Using a mutable default argument like `def add_item(x, buf=[]):` persists state across calls—a classic bug.",
            keyConcepts: ["Pass-by-object-reference", "Mutable default argument trap", "*args and **kwargs unpacking", "Keyword-only arguments"],
            learningOutcome: "Design safe function signatures using `None` sentinels instead of mutable defaults.",
          },
          {
            id: "p0-m2-performance-analysis",
            title: "Basic performance analysis",
            explanation:
              "Pure Python `for` loops incur interpreter type-checking and boxing overhead on every iteration, whereas vectorized C/Fortran routines operate on contiguous raw memory.",
            keyConcepts: ["Interpreter dispatch overhead", "time.perf_counter()", "cProfile basics", "Contiguous memory buffers"],
            learningOutcome: "Benchmark Python code accurately and pinpoint interpreter bottlenecks.",
          },
          {
            id: "p0-m2-time-space-complexity",
            title: "Time and space complexity",
            explanation:
              "Big-O notation characterizes how runtime and memory scale with input size—such as O(N²) memory and compute in standard self-attention across sequence length N, or O(N³) in naive matrix multiplication.",
            keyConcepts: ["O(1), O(N), O(N log N), O(N²), O(N³)", "Asymptotic scaling", "Memory vs compute tradeoffs", "Sequence length scaling"],
            learningOutcome: "Estimate runtime and memory growth before running algorithms on large datasets.",
          },
        ],
        practicalExercises: [
          "Demonstrate the mutable default argument bug in a 10-line script and fix it using an immutable `None` sentinel.",
          "Benchmark a pure-Python triple-nested loop for 200×200 matrix multiplication using `time.perf_counter()` and calculate its operations per second.",
        ],
        completionMilestone:
          "Understand how Python programs manage data and where performance costs arise.",
      },
      {
        id: "p0-m3",
        code: "0.3",
        title: "Numerical Computing",
        description:
          "Vectorized array manipulation, broadcasting rules, dimensional shapes, and floating-point precision with NumPy.",
        estimatedEffort: "1 week · ~16–20 hours",
        whatYouWillLearn:
          "You will learn how n-dimensional arrays (`ndarray`) store contiguous typed values in memory, how to slice, reshape, transpose, and broadcast arrays of different ranks, and how to replace slow Python loops with vectorized matrix operations.",
        whyItMatters:
          "NumPy's array mental model (shapes, axes, broadcasting, and dtype precision) is identical to PyTorch tensors. Mastering NumPy makes tensor manipulation in deep learning second nature.",
        learningObjectives: [
          "Manipulate vectors, matrices, and tensors using Python.",
          "Predict the output shape of any broadcasting or matrix multiplication expression before running it.",
          "Choose appropriate numerical data types (`float32`, `float64`, `int64`) and understand precision limits.",
        ],
        keyConcepts: [
          "Contiguous n-dimensional arrays",
          "Shape tuples & axis reductions",
          "Broadcasting rules",
          "Vectorization vs loops",
          "Matrix multiplication (@)",
        ],
        topics: [
          {
            id: "p0-m3-numpy-arrays",
            title: "NumPy arrays",
            explanation:
              "A NumPy `ndarray` is a homogeneous, contiguous block of C memory paired with shape and stride metadata, enabling SIMD hardware acceleration.",
            keyConcepts: ["np.array, np.zeros, np.ones, np.arange", "Homogeneous buffers", "Strides & views", "Random number generation (np.random.default_rng)"],
            learningOutcome: "Construct and initialize 1D vectors, 2D matrices, and 3D tensors cleanly.",
          },
          {
            id: "p0-m3-shapes-dimensions",
            title: "Array shapes and dimensions",
            explanation:
              "Every tensor has a rank (`ndim`) and a `shape` tuple—for example, a batch of token embeddings has shape `(batch_size, seq_len, d_model)`.",
            keyConcepts: ["ndim, shape, size", "Axis numbering (axis=0, axis=1, axis=-1)", "Keepdims in reductions", "Singleton dimensions"],
            learningOutcome: "Track tensor shapes across reductions (`sum`, `mean`, `max`) along specific axes.",
            formulaOrCode: "x = np.zeros((4, 128, 64)) # (batch, seq_len, d_model)\nmean_per_token = x.mean(axis=-1, keepdims=True) # shape: (4, 128, 1)",
          },
          {
            id: "p0-m3-indexing-slicing",
            title: "Indexing and slicing",
            explanation:
              "Slicing (`x[:, :t, :]`), boolean masks (`x[x > 0]`), and integer array indexing extract or modify sub-tensors—such as masking future tokens or looking up token embeddings by integer ID.",
            keyConcepts: ["Multi-axis slicing", "Views vs copies", "Boolean masking", "Fancy integer indexing (embedding lookup)"],
            learningOutcome: "Extract batches, context windows, and masked elements without loops.",
          },
          {
            id: "p0-m3-broadcasting",
            title: "Broadcasting",
            explanation:
              "Broadcasting aligns trailing dimensions so arrays of compatible shapes (such as adding a `(d_model,)` bias vector to a `(batch, d_model)` activation matrix) combine without duplicating memory.",
            keyConcepts: ["Right-aligned dimension matching", "Size-1 dimension stretching", "np.newaxis / None", "Avoiding unintended outer products"],
            learningOutcome: "Apply broadcasting rules intentionally and prevent silent shape-broadcasting bugs.",
            formulaOrCode: "# (32, 64) + (64,) -> broadcasts bias across all 32 batch rows -> (32, 64)\nout = activations + bias",
          },
          {
            id: "p0-m3-vectorized-operations",
            title: "Vectorized operations",
            explanation:
              "Universal functions (`np.exp`, `np.log`, `np.maximum`, element-wise `*`) execute in compiled C loops over contiguous memory, achieving 50×–200× speedups over Python loops.",
            keyConcepts: ["Element-wise ufuncs", "Eliminating Python for-loops", "Vectorized ReLU & sigmoid", "Reductions"],
            learningOutcome: "Rewrite iterative mathematical formulas as single vectorized array expressions.",
          },
          {
            id: "p0-m3-matrix-multiplication",
            title: "Matrix multiplication",
            explanation:
              "The `@` operator (`np.matmul`) computes inner products between rows of the left matrix `(M, K)` and columns of the right matrix `(K, N)` to produce an `(M, N)` result, plus batched matmul over leading dimensions.",
            keyConcepts: ["Inner dimension alignment (M, K) @ (K, N) -> (M, N)", "Element-wise * vs matrix @", "Batched matmul (B, T, D) @ (B, D, T)"],
            learningOutcome: "Distinguish element-wise multiplication from matrix multiplication and verify inner dimensions.",
          },
          {
            id: "p0-m3-dtypes-precision",
            title: "Data types and numerical precision",
            explanation:
              "Floating-point numbers (`float64`, `float32`, `float16`) have finite mantissa bits and exponent ranges; large exponentials can overflow (`inf`) and tiny probabilities can underflow (`0.0`).",
            keyConcepts: ["float32 vs float64", "int32 vs int64 for token IDs", "Overflow and underflow", "astype() casting"],
            learningOutcome: "Inspect and control array `dtype` to balance memory footprint and numerical accuracy.",
          },
          {
            id: "p0-m3-reshaping-transposing",
            title: "Reshaping and transposing arrays",
            explanation:
              "Reshaping (`reshape`) and permuting axes (`transpose`, `swapaxes`, `.T`) reorganize how dimensions are indexed—essential when splitting an embedding dimension into multiple attention heads.",
            keyConcepts: ["reshape(-1, D)", "Matrix transpose .T", "Permuting 3D/4D axes for multi-head attention", "Contiguity"],
            learningOutcome: "Reshape and transpose multi-dimensional tensors to split and merge attention heads.",
          },
        ],
        practicalExercises: [
          "Implement matrix multiplication first with triple-nested Python lists and then with NumPy `@`, verifying outputs match with `np.allclose`.",
          "Given a tensor of shape `(batch=2, seq_len=6, d_model=8)`, reshape and transpose it into `(batch=2, n_heads=2, seq_len=6, head_dim=4)` and back.",
        ],
        completionMilestone:
          "Manipulate vectors, matrices, and tensors using Python without relying on explicit element-by-element loops.",
      },
      {
        id: "p0-m4",
        code: "0.4",
        title: "Data and Development Tools",
        description:
          "Tabular data manipulation with Pandas, scientific plotting with Matplotlib, version control with Git, and reproducible Python environments.",
        estimatedEffort: "1 week · ~14–18 hours",
        whatYouWillLearn:
          "You will learn to inspect, filter, and clean structured datasets in Pandas, visualize mathematical functions and training loss curves in Matplotlib, manage reproducible virtual environments, and version your code with Git.",
        whyItMatters:
          "Every machine learning experiment relies on clean input data, visual inspection of loss curves and distributions, and reproducible environments.",
        learningObjectives: [
          "Load, inspect, filter, and clean CSV and JSON datasets using Pandas.",
          "Plot mathematical functions, derivatives, and loss curves clearly with Matplotlib.",
          "Manage isolated Python environments, dependencies, Git commits, and automated unit tests.",
        ],
        keyConcepts: [
          "DataFrames & Series",
          "Missing value imputation",
          "Matplotlib diagnostic plots",
          "venv / uv & Git",
          "Automated pytest suites",
        ],
        topics: [
          {
            id: "p0-m4-pandas-fundamentals",
            title: "Pandas fundamentals",
            explanation:
              "Pandas `Series` and `DataFrame` objects provide labeled tabular indexing, summary statistics (`.describe()`, `.info()`), and vectorized column operations for exploratory data analysis.",
            keyConcepts: ["Series & DataFrame", "loc vs iloc indexing", "Summary statistics", "Column transformations"],
            learningOutcome: "Explore tabular datasets and compute summary statistics across columns.",
          },
          {
            id: "p0-m4-csv-json",
            title: "Reading CSV and JSON",
            explanation:
              "Datasets arrive as CSV tables, JSON Lines (`.jsonl`) instruction records, or Parquet shards. Parsing schemas, encodings, and malformed lines cleanly is the first step of any pipeline.",
            keyConcepts: ["pd.read_csv", "JSON Lines (.jsonl) streaming", "Schema & dtype enforcement", "Exporting cleaned splits"],
            learningOutcome: "Ingest and export CSV and JSON/JSONL datasets reliably.",
          },
          {
            id: "p0-m4-data-filtering-cleaning",
            title: "Data filtering and cleaning",
            explanation:
              "Real-world datasets contain missing (`NaN`) values, duplicate rows, outliers, and inconsistent text casing that must be filtered or imputed before converting to numerical tensors.",
            keyConcepts: ["Boolean row filtering", "Handling NaN / missing values", "Deduplication (drop_duplicates)", "Converting DataFrames to NumPy arrays"],
            learningOutcome: "Clean raw tabular datasets into normalized numerical matrices ready for training.",
          },
          {
            id: "p0-m4-matplotlib",
            title: "Matplotlib",
            explanation:
              "Visualizing functions, numerical derivatives, feature distributions, and training vs. validation loss curves over steps is essential for diagnosing learning behavior.",
            keyConcepts: ["fig, ax = plt.subplots()", "Line plots & scatter plots", "Histograms of activations/weights", "Axis labels, legends & log scales"],
            learningOutcome: "Create publication-clean diagnostic plots of mathematical functions and training curves.",
          },
          {
            id: "p0-m4-jupyter-notebooks",
            title: "Jupyter notebooks",
            explanation:
              "Interactive notebooks combine executable code cells, plots, and Markdown derivations for rapid prototyping, while core reusable logic belongs in imported `.py` modules.",
            keyConcepts: ["Interactive cell execution", "Hidden state pitfalls (restart & run all)", "Extracting reusable code to .py modules"],
            learningOutcome: "Use notebooks effectively for exploration while keeping core library code modular and testable.",
          },
          {
            id: "p0-m4-git-github",
            title: "Git and GitHub",
            explanation:
              "Version control tracks code evolution, experiment branches, and configuration changes while `.gitignore` prevents accidentally committing multi-gigabyte datasets or checkpoints.",
            keyConcepts: ["Commits, branches & merges", "Proper ML .gitignore", "Reproducible commit history", "README documentation"],
            learningOutcome: "Maintain clean Git repositories for all roadmap projects and experiments.",
          },
          {
            id: "p0-m4-virtual-environments",
            title: "Python virtual environments",
            explanation:
              "Isolated environments (`python -m venv` or `uv venv`) prevent conflicting package versions across projects and keep system Python untouched.",
            keyConcepts: ["Environment isolation", "Activating venv", "Interpreter selection in IDEs"],
            learningOutcome: "Create and manage isolated virtual environments for every project.",
          },
          {
            id: "p0-m4-dependency-management",
            title: "Dependency management",
            explanation:
              "Pinning dependencies in `pyproject.toml` or `requirements.txt` ensures that experiments can be reproduced months later with identical library versions.",
            keyConcepts: ["pyproject.toml & requirements.txt", "Semantic versioning", "Lockfiles"],
            learningOutcome: "Declare and lock project dependencies for deterministic setups.",
          },
          {
            id: "p0-m4-unit-testing",
            title: "Unit testing",
            explanation:
              "Writing `pytest` suites that test matrix shapes, numerical gradients, and data transformations protects against regressions as your codebase grows.",
            keyConcepts: ["Test discovery", "Fixtures & parametrized tests", "np.testing.assert_allclose"],
            learningOutcome: "Verify numerical functions automatically using `pytest` and `np.testing.assert_allclose`.",
          },
        ],
        practicalExercises: [
          "Load a raw CSV dataset with missing values and duplicate rows, clean and normalize its numerical columns, and export the result as a NumPy `.npy` matrix.",
          "Plot $f(x) = x^3 - 3x$ alongside its numerical finite-difference derivative $[f(x+h) - f(x-h)] / (2h)$ on the same Matplotlib figure.",
        ],
        completionMilestone:
          "Set up a reproducible Python repository with virtual environments, clean a dataset, plot mathematical functions, and pass an automated pytest suite.",
      },
    ],
    assignments: [
      "Implement matrix multiplication without NumPy.",
      "Implement matrix multiplication using NumPy.",
      "Build vector operations.",
      "Write a simple numerical derivative calculator.",
      "Read and clean a CSV dataset.",
      "Plot mathematical functions and derivatives.",
      "Build a small reusable matrix operations library.",
    ],
    primaryProjects: [
      {
        id: "milestone-01-matrix-operations-engine",
        milestoneNumber: 1,
        title: "Matrix Operations Engine",
        phase: 0,
        shortDescription:
          "Build a complete pure-Python linear algebra engine implementing vector addition, scalar multiplication, dot products, 2D matrix multiplication, transposes, and automated verification against NumPy.",
        skillsPracticed: [
          "2D matrix multiplication & transposes",
          "Vector addition, scaling & dot products",
          "Shape validation & dimension error handling",
          "Automated verification against NumPy",
        ],
        expectedOutcome:
          "A self-contained, unit-tested Python matrix operations library verified against NumPy.",
        difficulty: "foundational",
        difficultyLabel: "Beginner",
      },
    ],
    supplementaryProjects: [
      {
        title: "Reusable Vector & Matrix Operations Toolkit",
        description:
          "A tested Python + NumPy package implementing dot products, matrix multiplication, finite-difference derivatives, and diagnostic plotting (prepares directly for Milestone 1 in Phase 1).",
      },
    ],
    completionCriteriaSummary:
      "User should be able to explain array shapes, matrix multiplication, and numerical computing without blindly relying on libraries.",
    completionChecklist: [
      {
        id: "p0-check-concepts",
        question: "Can you explain array shapes, broadcasting rules, and matrix multiplication inner dimensions without guessing?",
        detail: "Verify you can predict the output shape of (B, T, D) @ (B, D, V) + (V,) on paper.",
      },
      {
        id: "p0-check-exercises",
        question: "Have you completed all 7 Phase 0 practical assignments?",
        detail: "Including both pure-Python and NumPy matrix multiplication, CSV cleaning, and derivative plotting.",
      },
      {
        id: "p0-check-implementation",
        question: "Can you implement vector dot products and 2D matrix multiplication independently in pure Python?",
        detail: "Without looking up loop indices or relying on external libraries.",
      },
      {
        id: "p0-check-testing",
        question: "Have you written automated unit tests comparing your pure-Python matrix routines against NumPy?",
        detail: "Using pytest and floating-point tolerance assertions.",
      },
      {
        id: "p0-check-limitations",
        question: "Can you explain why pure-Python nested loops are orders of magnitude slower than vectorized NumPy operations?",
        detail: "Referencing interpreter dispatch, object boxing, and contiguous C memory buffers.",
      },
    ],
  },

  // ============================================================================
  // PHASE 1 — MATHEMATICS FOR AI
  // ============================================================================
  {
    id: "phase-1",
    slug: "phase-1-mathematics-for-ai",
    phase: 1,
    code: "P1",
    title: "Mathematics for AI",
    shortDescription:
      "Master the linear algebra, multivariable calculus, probability theory, and numerical optimization that govern how neural networks represent and learn.",
    purpose:
      "Understand the mathematics behind machine learning, optimization, and neural networks.",
    estimatedWeeks: 8,
    difficulty: "foundational",
    difficultyLabel: "Beginner → Intermediate",
    prerequisites: [
      {
        phaseNumber: 0,
        phaseId: "phase-0",
        label: "Phase 0: Programming Foundations (Python & NumPy arrays)",
      },
    ],
    learningObjectives: [
      "Represent data features, neural layer weights, and linear transformations using vectors, matrices, and tensors.",
      "Derive partial derivatives, gradients, and chain-rule expressions for multivariable loss functions.",
      "Model uncertainty and next-token prediction using probability distributions, maximum likelihood, entropy, and cross-entropy.",
      "Implement gradient-based optimization algorithms (SGD, Momentum, RMSProp, Adam) and verify gradients numerically.",
    ],
    modules: [
      {
        id: "p1-m1",
        code: "1.1",
        title: "Linear Algebra",
        description:
          "Vector spaces, dot products, matrix multiplication, projections, norms, cosine similarity, eigendecomposition, and SVD.",
        estimatedEffort: "2.5 weeks · ~40–45 hours",
        whatYouWillLearn:
          "You will learn how vectors and matrices act as geometric transformations, how dot products and cosine similarity measure directional alignment in high-dimensional embedding spaces, and how matrices decompose via eigenvalues and Singular Value Decomposition (SVD).",
        whyItMatters:
          "Every forward pass in a neural network or Transformer attention head is a sequence of linear combinations, dot products, and matrix multiplications interleaved with simple non-linearities.",
        learningObjectives: [
          "Compute dot products, matrix-vector products, and matrix-matrix products by hand and in code.",
          "Explain how neurons compute weighted sums of inputs plus a bias term.",
          "Measure vector magnitude and directional similarity using L2 norms, Euclidean distance, and cosine similarity.",
          "Understand matrix rank, orthogonality, projections, eigenvectors, and low-rank approximations via SVD.",
        ],
        keyConcepts: [
          "Weighted sums & hyperplanes",
          "Dot products & cosine similarity",
          "Linear transformations & rank",
          "Orthogonal projections",
          "Eigenvalues & SVD",
        ],
        educationalExample: {
          title: "How an Artificial Neuron Uses a Weighted Sum",
          expression: "z = w₁·x₁ + w₂·x₂ + b  =  wᵀx + b",
          symbolBreakdown: [
            {
              symbol: "x = [x₁, x₂]ᵀ",
              meaning: "Input feature vector representing measurable properties of a data sample.",
            },
            {
              symbol: "w = [w₁, w₂]ᵀ",
              meaning: "Learnable weight vector controlling how strongly each input feature influences the output.",
            },
            {
              symbol: "w₁·x₁ + w₂·x₂ (or wᵀx)",
              meaning: "The dot product (weighted sum) measuring alignment between the input vector x and weight vector w.",
            },
            {
              symbol: "b",
              meaning: "Scalar bias term that shifts the activation threshold unabhängig of the origin.",
            },
            {
              symbol: "z",
              meaning: "Pre-activation scalar score before passing through a non-linear activation function.",
            },
          ],
          takeaway:
            "A single neuron is simply a dot product plus a bias; a full layer of M neurons computes Z = XW + b across an entire batch of inputs simultaneously using matrix multiplication.",
        },
        topics: [
          {
            id: "p1-m1-scalars-vectors-matrices-tensors",
            title: "Scalars, vectors, matrices, and tensors",
            explanation:
              "A scalar is a single number (0D); a vector is an ordered 1D array of numbers; a matrix is a 2D grid of rows and columns; a tensor generalizes arrays to 3 or more axes (such as `[batch, seq_len, d_model]`).",
            keyConcepts: ["Rank / order of a tensor", "Column vs row vectors", "Dimension indexing", "Batch tensors"],
            learningOutcome: "Identify the rank and dimensional semantics of scalars, vectors, matrices, and higher-order tensors.",
          },
          {
            id: "p1-m1-vector-spaces",
            title: "Vector spaces",
            explanation:
              "A vector space $\\mathbb{R}^n$ is a collection of $n$-dimensional vectors closed under vector addition and scalar multiplication, serving as the coordinate system where feature representations and embeddings live.",
            keyConcepts: ["Closure under addition & scaling", "Basis vectors", "Span and dimensionality", "Feature spaces"],
            learningOutcome: "Interpret data samples and word embeddings as points and directions in an $n$-dimensional vector space.",
          },
          {
            id: "p1-m1-vector-addition",
            title: "Vector addition",
            explanation:
              "Adding two vectors of the same dimension sums their corresponding components ($u + v = [u_1+v_1, \\dots, u_n+v_n]^T$), geometrically translating one vector along the other—used directly in residual connections (`x + sublayer(x)`).",
            keyConcepts: ["Component-wise sum", "Tip-to-tail geometric rule", "Residual stream addition"],
            learningOutcome: "Compute vector sums algebraically and interpret them geometrically.",
          },
          {
            id: "p1-m1-scalar-multiplication",
            title: "Scalar multiplication",
            explanation:
              "Multiplying a vector by a scalar $c$ stretches or shrinks its magnitude by $|c|$ (and reverses its direction if $c < 0$) without changing the line it lies on.",
            keyConcepts: ["Magnitude scaling", "Direction reversal", "Learning rate scaling of gradient vectors"],
            learningOutcome: "Scale vectors and understand how scalar factors affect magnitude and direction.",
          },
          {
            id: "p1-m1-linear-combinations",
            title: "Linear combinations",
            explanation:
              "A linear combination $c_1 v_1 + c_2 v_2 + \\dots + c_k v_k$ blends multiple vectors using scalar weights. In self-attention, every output token is a weighted linear combination of Value vectors.",
            keyConcepts: ["Weighted sums of vectors", "Linear independence", "Span of a set of vectors", "Attention value mixing"],
            learningOutcome: "Express matrix-vector products and attention outputs as linear combinations of columns or rows.",
          },
          {
            id: "p1-m1-dot-products",
            title: "Dot products",
            explanation:
              "The dot product $u \\cdot v = \\sum_{i=1}^n u_i v_i = \\|u\\| \\|v\\| \\cos(\\theta)$ combines algebraic multiplication with geometric angle: it is positive when vectors point in similar directions, zero when orthogonal, and negative when opposed.",
            keyConcepts: ["Algebraic definition", "Geometric cosine relationship", "Pre-activation neuron score", "Query-Key attention score"],
            learningOutcome: "Calculate dot products and interpret them as unnormalized similarity scores.",
            formulaOrCode: "z = w1 * x1 + w2 * x2 + b  # Dot product w·x plus bias b",
          },
          {
            id: "p1-m1-matrix-multiplication",
            title: "Matrix multiplication",
            explanation:
              "For $A \\in \\mathbb{R}^{m \\times k}$ and $B \\in \\mathbb{R}^{k \\times n}$, entry $(i, j)$ of $C = AB$ is the dot product of row $i$ of $A$ with column $j$ of $B$, transforming a batch of $m$ input vectors of dimension $k$ into dimension $n$.",
            keyConcepts: ["Row-by-column dot products", "Column-space view", "Non-commutativity (AB != BA)", "Linear layer forward pass X @ W"],
            learningOutcome: "Perform matrix multiplication by hand and explain why inner dimensions must match.",
          },
          {
            id: "p1-m1-matrix-transpose",
            title: "Matrix transpose",
            explanation:
              "The transpose $A^T$ swaps rows and columns ($(A^T)_{ij} = A_{ji}$) and satisfies $(AB)^T = B^T A^T$—used constantly when computing attention scores $QK^T$ and weight gradients during backpropagation.",
            keyConcepts: ["Row-column swap", "Product transpose rule (AB)ᵀ = BᵀAᵀ", "Symmetric matrices (A = Aᵀ)"],
            learningOutcome: "Apply matrix transposes to align dimensions in forward and backward passes.",
          },
          {
            id: "p1-m1-matrix-inverse",
            title: "Matrix inverse",
            explanation:
              "A square matrix $A$ is invertible if there exists $A^{-1}$ such that $AA^{-1} = I$. In practice, explicit inversion is numerically unstable and avoided in favor of solving linear systems $Ax = b$ or gradient optimization.",
            keyConcepts: ["Identity matrix I", "Singular (non-invertible) matrices", "Solving Ax = b vs computing A⁻¹"],
            learningOutcome: "Explain when a matrix inverse exists and why numerical solvers avoid explicit matrix inversion.",
          },
          {
            id: "p1-m1-matrix-rank",
            title: "Matrix rank",
            explanation:
              "The rank of a matrix is the number of linearly independent rows or columns—the true dimensionality of the subspace onto which the matrix maps inputs. Low-Rank Adaptation (LoRA) exploits low-rank weight updates.",
            keyConcepts: ["Full rank vs rank-deficient", "Column space dimension", "Low-rank decomposition (B @ A where r << d)"],
            learningOutcome: "Determine matrix rank and explain how low-rank factorizations compress parameter updates.",
          },
          {
            id: "p1-m1-linear-transformations",
            title: "Linear transformations",
            explanation:
              "Every matrix represents a linear transformation that maps vectors from one space to another while preserving grid lines parallel and evenly spaced (rotations, reflections, shears, projections).",
            keyConcepts: ["Matrices as functions", "Where basis vectors land", "Composition of transformations via matrix product"],
            learningOutcome: "Visualize neural network weight matrices as geometric transformations of space.",
          },
          {
            id: "p1-m1-orthogonality-projections",
            title: "Orthogonality and projections",
            explanation:
              "Two vectors are orthogonal if $u \\cdot v = 0$. Orthogonal projection finds the closest point in a subspace to a target vector, forming the geometric foundation of least-squares linear regression.",
            keyConcepts: ["u · v = 0", "Orthonormal bases (QᵀQ = I)", "Projection formula", "Least-squares error vector"],
            learningOutcome: "Project vectors onto subspaces and explain why the residual error is orthogonal to the subspace.",
          },
          {
            id: "p1-m1-vector-norms",
            title: "Vector norms",
            explanation:
              "Norms measure vector magnitude: the $L_1$ norm ($\\sum |x_i|$) promotes sparsity, the $L_2$ Euclidean norm ($\\sqrt{\\sum x_i^2}$) measures straight-line length and powers weight decay and gradient clipping, and $L_\\infty$ tracks the maximum absolute entry.",
            keyConcepts: ["L1 norm (Manhattan)", "L2 norm (Euclidean)", "Frobenius matrix norm", "Gradient norm clipping"],
            learningOutcome: "Compute L1 and L2 norms and apply them to regularization and vector normalization.",
          },
          {
            id: "p1-m1-euclidean-distance",
            title: "Euclidean distance",
            explanation:
              "The Euclidean distance $\\|u - v\\|_2 = \\sqrt{\\sum (u_i - v_i)^2}$ measures straight-line separation between two points in feature space, used in k-nearest neighbors and k-means clustering.",
            keyConcepts: ["||u - v||₂", "Sensitivity to vector scale", "Squared Euclidean distance in MSE"],
            learningOutcome: "Compute pairwise Euclidean distances between feature vectors in vectorized form.",
          },
          {
            id: "p1-m1-cosine-similarity",
            title: "Cosine similarity",
            explanation:
              "Cosine similarity $\\frac{u \\cdot v}{\\|u\\|_2 \\|v\\|_2} \\in [-1, 1]$ normalizes the dot product by vector lengths, measuring pure directional alignment between semantic embeddings regardless of magnitude.",
            keyConcepts: ["Unit vector normalization", "Angle invariance to scaling", "Embedding retrieval similarity"],
            learningOutcome: "Implement vectorized cosine similarity to compare high-dimensional embeddings.",
          },
          {
            id: "p1-m1-eigenvalues-eigenvectors",
            title: "Eigenvalues and eigenvectors",
            explanation:
              "An eigenvector $v$ of square matrix $A$ only gets scaled (not rotated) when multiplied by $A$: $Av = \\lambda v$. Eigenvalues $\\lambda$ reveal variance directions in PCA and curvature in Hessian matrices.",
            keyConcepts: ["Av = λv", "Characteristic equation", "Spectral theorem for symmetric matrices", "Principal directions"],
            learningOutcome: "Explain what eigenvectors and eigenvalues represent geometrically and algebraically.",
          },
          {
            id: "p1-m1-svd",
            title: "Singular Value Decomposition",
            explanation:
              "Any $m \\times n$ matrix factors as $A = U \\Sigma V^T$ into orthogonal rotation $V^T$, diagonal scaling $\\Sigma$ (singular values), and orthogonal rotation $U$—enabling dimensionality reduction and low-rank matrix approximation.",
            keyConcepts: ["A = UΣVᵀ", "Singular values", "Eckart-Young low-rank approximation", "Connection to PCA and LoRA"],
            learningOutcome: "Decompose matrices with SVD and construct rank-$k$ approximations.",
          },
        ],
        practicalExercises: [
          "Compute $z = w_1 x_1 + w_2 x_2 + b$ by hand and in Python for a 3-sample batch, then generalize to $Z = XW + b$.",
          "Implement a cosine similarity search function that ranks 5 candidate embedding vectors against a query vector.",
          "Use SVD (`np.linalg.svd`) to compress a 2D grayscale image matrix using only its top $k=15$ singular values.",
        ],
        completionMilestone:
          "Perform vector and matrix operations fluently, explain weighted sums in neurons, and implement Project Milestone 1 (Matrix Operations Engine).",
        recommendedResources: [
          {
            title: "MIT 18.06SC Linear Algebra (Gilbert Strang)",
            provider: "MIT OpenCourseWare",
            url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
          },
        ],
      },
      {
        id: "p1-m2",
        code: "1.2",
        title: "Calculus",
        description:
          "Derivatives, the chain rule, partial derivatives, gradients, Jacobians, Hessians, and the mathematical mechanics of gradient descent.",
        estimatedEffort: "2 weeks · ~30–35 hours",
        whatYouWillLearn:
          "You will learn how derivatives measure local sensitivity, how the chain rule propagates rates of change through nested composite functions, and how the gradient vector points in the direction of steepest ascent on a multivariable loss surface.",
        whyItMatters:
          "Backpropagation in deep neural networks and Transformers is nothing more than a systematic application of the multivariable chain rule to compute gradients of a scalar loss with respect to millions or billions of weights.",
        learningObjectives: [
          "Compute analytical derivatives using the power, product, quotient, and chain rules.",
          "Derive partial derivatives and assemble the gradient vector $\\nabla_\\theta L$ for multivariable functions.",
          "Explain every symbol in the gradient descent parameter update rule.",
        ],
        keyConcepts: [
          "Instantaneous rate of change",
          "Composite functions & chain rule",
          "Partial derivatives & gradients",
          "Jacobian & Hessian matrices",
          "Steepest descent updates",
        ],
        educationalExample: {
          title: "The Gradient Descent Parameter Update Rule",
          expression: "w_new = w_old - learning_rate * gradient",
          symbolBreakdown: [
            {
              symbol: "w_old",
              meaning: "Current value of the model parameter (weight or bias) before the update step.",
            },
            {
              symbol: "gradient (∂L / ∂w)",
              meaning: "Derivative of the loss L with respect to w, indicating how the loss changes if w increases slightly.",
            },
            {
              symbol: "learning_rate (η)",
              meaning: "Positive hyperparameter controlling the step size taken along the slope.",
            },
            {
              symbol: "- (minus sign)",
              meaning: "Moves parameters opposite to the gradient (which points uphill) so the loss decreases downhill.",
            },
            {
              symbol: "w_new",
              meaning: "Updated parameter value that yields a lower loss on the local linear approximation.",
            },
          ],
          takeaway:
            "Every neural network optimizer—from basic SGD to AdamW used in LLM pretraining—is built around stepping opposite the gradient to minimize loss.",
        },
        topics: [
          {
            id: "p1-m2-functions-graphs",
            title: "Functions and graphs",
            explanation:
              "Functions map inputs to outputs ($y = f(x)$); loss landscapes are multivariable surfaces mapping parameter vectors to a scalar error height.",
            keyConcepts: ["Domain & range", "Monotonicity", "Convex vs non-convex surfaces", "Local vs global minima"],
            learningOutcome: "Visualize loss functions as geometric surfaces over model parameters.",
          },
          {
            id: "p1-m2-limits",
            title: "Limits",
            explanation:
              "Limits describe how a function behaves as an input perturbation $h \\to 0$, providing the rigorous definition of continuity and instantaneous derivatives.",
            keyConcepts: ["Difference quotient [f(x+h) - f(x)] / h", "Continuity", "Asymptotic behavior"],
            learningOutcome: "Connect finite-difference approximations to exact analytical derivatives via limits.",
          },
          {
            id: "p1-m2-derivatives",
            title: "Derivatives",
            explanation:
              "The derivative $f'(x) = \\frac{df}{dx}$ is the slope of the tangent line at $x$—measuring how much the output changes per unit change in the input.",
            keyConcepts: ["Tangent slope", "Derivatives of polynomials, exp(x), log(x)", "Critical points (f'(x) = 0)"],
            learningOutcome: "Differentiate standard algebraic, exponential, and logarithmic functions.",
          },
          {
            id: "p1-m2-product-rule",
            title: "Product rule",
            explanation:
              "When two functions multiply, $(u \\cdot v)' = u'v + uv'$, allowing differentiation of gated architectures like SwiGLU and LSTM cells.",
            keyConcepts: ["(uv)' = u'v + uv'", "Differentiating gated products"],
            learningOutcome: "Differentiate products of functions accurately.",
          },
          {
            id: "p1-m2-chain-rule",
            title: "Chain rule",
            explanation:
              "For nested composite functions $L = f(g(h(x)))$, the derivative multiplies local derivatives along the path: $\\frac{dL}{dx} = \\frac{df}{dg} \\cdot \\frac{dg}{dh} \\cdot \\frac{dh}{dx}$. This is the core mathematical law of backpropagation.",
            keyConcepts: ["Composite function differentiation", "Multiplying local sensitivities", "Summing over multiple paths"],
            learningOutcome: "Apply the chain rule through multi-step composite expressions.",
          },
          {
            id: "p1-m2-partial-derivatives",
            title: "Partial derivatives",
            explanation:
              "A partial derivative $\\frac{\\partial L}{\\partial w_i}$ measures how a multivariable loss $L(w_1, \\dots, w_n)$ changes when a single weight $w_i$ is nudged while holding all other weights constant.",
            keyConcepts: ["Holding other variables constant", "Sensitivity per parameter"],
            learningOutcome: "Compute partial derivatives of multivariable functions with respect to each variable.",
          },
          {
            id: "p1-m2-multivariable-calculus",
            title: "Multivariable calculus",
            explanation:
              "Total differentials and the multivariable chain rule track how changes propagate when an intermediate layer vector depends on multiple upstream parameters.",
            keyConcepts: ["Multivariable chain rule", "Contour lines / level sets", "First-order Taylor approximation"],
            learningOutcome: "Trace sensitivities through vector-valued intermediate variables.",
          },
          {
            id: "p1-m2-gradients",
            title: "Gradients",
            explanation:
              "The gradient $\\nabla_w L = [\\frac{\\partial L}{\\partial w_1}, \\dots, \\frac{\\partial L}{\\partial w_n}]^T$ collects all partial derivatives into a vector pointing in the direction of steepest increase of $L$ and orthogonal to contour lines.",
            keyConcepts: ["Gradient vector", "Direction of steepest ascent", "Negative gradient for steepest descent"],
            learningOutcome: "Assemble partial derivatives into gradient vectors and interpret their geometric direction.",
          },
          {
            id: "p1-m2-directional-derivatives",
            title: "Directional derivatives",
            explanation:
              "The rate of change of $f$ along unit direction $u$ is $\\nabla f(x) \\cdot u$, proving via Cauchy-Schwarz that $-\\nabla f(x) / \\|\\nabla f(x)\\|$ minimizes the function locally fastest.",
            keyConcepts: ["D_u f = ∇f · u", "Proof that -∇f is steepest descent"],
            learningOutcome: "Explain mathematically why stepping in the direction of $-\\nabla L$ decreases loss fastest.",
          },
          {
            id: "p1-m2-jacobian-matrices",
            title: "Jacobian matrices",
            explanation:
              "For a vector-to-vector function $f: \\mathbb{R}^n \\to \\mathbb{R}^m$ (like a softmax layer), the Jacobian $J \\in \\mathbb{R}^{m \\times n}$ contains all partial derivatives $J_{ij} = \\frac{\\partial f_i}{\\partial x_j}$.",
            keyConcepts: ["Matrix of partial derivatives", "Vector-Jacobian Products (VJP) in reverse-mode autodiff"],
            learningOutcome: "Construct Jacobian matrices for vector-valued layers and relate them to backward passes.",
          },
          {
            id: "p1-m2-hessian-matrices",
            title: "Introduction to Hessian matrices",
            explanation:
              "The Hessian $H_{ij} = \\frac{\\partial^2 L}{\\partial w_i \\partial w_j}$ captures second-order curvature—distinguishing local minima, maxima, and saddle points, and explaining why poorly conditioned curvature slows down gradient descent.",
            keyConcepts: ["Second partial derivatives", "Curvature & condition number", "Saddle points in high dimensions"],
            learningOutcome: "Interpret second-order curvature and recognize saddle points vs local minima.",
          },
          {
            id: "p1-m2-gradient-descent",
            title: "Gradient descent",
            explanation:
              "Iteratively updating $w_{\\text{new}} = w_{\\text{old}} - \\eta \\nabla_w L$ steps down the loss surface until gradients approach zero.",
            keyConcepts: ["Update loop", "Step size / learning rate η", "Convergence vs divergence when η is too large"],
            learningOutcome: "Implement gradient descent from scratch to minimize 1D and multivariable functions.",
            formulaOrCode: "w_new = w_old - learning_rate * gradient",
          },
        ],
        practicalExercises: [
          "Derive $\\frac{\\partial L}{\\partial w}$ and $\\frac{\\partial L}{\\partial b}$ by hand for $L(w, b) = (wx + b - y)^2$ and verify against finite differences.",
          "Implement 2D gradient descent in Python to minimize Rosenbrock's function and plot the optimization trajectory over contour lines.",
        ],
        completionMilestone:
          "Derive multivariable gradients using the chain rule and implement gradient descent from scratch.",
      },
      {
        id: "p1-m3",
        code: "1.3",
        title: "Probability and Statistics",
        description:
          "Probability distributions, Bayes' theorem, expectation, variance, maximum likelihood estimation, entropy, cross-entropy, and KL divergence.",
        estimatedEffort: "2 weeks · ~30–35 hours",
        whatYouWillLearn:
          "You will master conditional probability, discrete and continuous distributions, expectation and variance, Maximum Likelihood Estimation (MLE), and information-theoretic measures (entropy, cross-entropy, KL divergence)—including how language models predict probability distributions over next tokens.",
        whyItMatters:
          "Language models are probabilistic machines: at every step they output a categorical probability distribution $P(x_t \\mid x_{<t})$ over the vocabulary and are trained by minimizing cross-entropy loss (equivalent to maximizing log-likelihood).",
        learningObjectives: [
          "Apply conditional probability, the chain rule of probability, and Bayes' theorem.",
          "Explain how language models learn probability distributions over next tokens.",
          "Derive the relationship between Maximum Likelihood Estimation, negative log-likelihood, cross-entropy, and KL divergence.",
        ],
        keyConcepts: [
          "Conditional probability & chain rule",
          "Bernoulli, Categorical & Gaussian distributions",
          "Maximum Likelihood Estimation (MLE)",
          "Shannon entropy & cross-entropy",
          "KL divergence",
        ],
        educationalExample: {
          title: "How Language Models Learn Next-Token Probability Distributions",
          expression: "P(x₁, x₂, …, x_T) = ∏_{t=1}^T P_θ(x_t | x₁, …, x_{t-1})",
          symbolBreakdown: [
            {
              symbol: "x₁, …, x_{t-1}",
              meaning: "Context sequence of preceding tokens already observed.",
            },
            {
              symbol: "P_θ(x_t | x_{<t})",
              meaning: "Categorical probability distribution over the entire vocabulary V output by the model's softmax layer.",
            },
            {
              symbol: "-log P_θ(x_t* | x_{<t})",
              meaning: "Cross-entropy loss for the true next token x_t*, penalizing the model heavily when it assigns low probability to the observed token.",
            },
          ],
          takeaway:
            "Training an LLM minimizes the average cross-entropy loss across tokens, which is mathematically identical to Maximum Likelihood Estimation and minimizing the KL divergence between the empirical text distribution and the model's predicted distribution.",
        },
        topics: [
          {
            id: "p1-m3-probability-fundamentals",
            title: "Probability fundamentals",
            explanation:
              "Sample spaces, events, Kolmogorov axioms ($0 \\le P(E) \\le 1$, $\\sum P(\\omega) = 1$), and joint vs marginal probabilities.",
            keyConcepts: ["Sample space", "Joint & marginal probability", "Sum & product rules"],
            learningOutcome: "Manipulate joint and marginal probabilities accurately.",
          },
          {
            id: "p1-m3-conditional-probability",
            title: "Conditional probability",
            explanation:
              "$P(A \\mid B) = \\frac{P(A, B)}{P(B)}$ quantifies the probability of $A$ given that $B$ has occurred, and expands into the chain rule $P(x_1, \\dots, x_T) = \\prod_t P(x_t \\mid x_{<t})$ powering autoregressive LLMs.",
            keyConcepts: ["P(A|B) = P(A,B)/P(B)", "Independence", "Chain rule of probability for sequences"],
            learningOutcome: "Factorize sequence probabilities into products of conditional next-token probabilities.",
          },
          {
            id: "p1-m3-bayes-theorem",
            title: "Bayes' theorem",
            explanation:
              "$P(H \\mid D) = \\frac{P(D \\mid H) P(H)}{P(D)}$ updates prior beliefs $P(H)$ with observed data likelihood $P(D \\mid H)$ to yield the posterior probability—the basis of Naive Bayes classifiers and Bayesian inference.",
            keyConcepts: ["Prior, Likelihood, Evidence, Posterior", "Updating beliefs from data"],
            learningOutcome: "Apply Bayes' theorem to classification and diagnostic reasoning problems.",
          },
          {
            id: "p1-m3-random-variables",
            title: "Random variables",
            explanation:
              "Discrete random variables take countable values (like token IDs $0 \\dots V-1$ via a Probability Mass Function), while continuous random variables take real values (via a Probability Density Function).",
            keyConcepts: ["Discrete PMF", "Continuous PDF", "Cumulative Distribution Function (CDF)"],
            learningOutcome: "Distinguish discrete probability mass functions from continuous density functions.",
          },
          {
            id: "p1-m3-probability-distributions",
            title: "Probability distributions",
            explanation:
              "Parametric families of distributions model different data-generating processes—binary outcomes, categorical token choices, or continuous activations.",
            keyConcepts: ["Distribution parameters", "Simplex constraint (probabilities sum to 1)", "Categorical distribution"],
            learningOutcome: "Select the appropriate probability distribution to model binary, categorical, or real-valued targets.",
          },
          {
            id: "p1-m3-bernoulli-distribution",
            title: "Bernoulli distribution",
            explanation:
              "Models a single binary trial $y \\in \\{0, 1\\}$ with success probability $p$: $P(y) = p^y (1-p)^{1-y}$, forming the probabilistic foundation of logistic regression and binary cross-entropy.",
            keyConcepts: ["Binary outcomes", "Sigmoid parametrization", "Log-likelihood of Bernoulli"],
            learningOutcome: "Derive binary cross-entropy loss directly from the Bernoulli likelihood.",
          },
          {
            id: "p1-m3-binomial-distribution",
            title: "Binomial distribution",
            explanation:
              "Models the number of successes in $n$ independent Bernoulli trials with probability $p$, useful for evaluating classification error confidence intervals.",
            keyConcepts: ["n independent trials", "Combinatorial coefficient", "Mean np and variance np(1-p)"],
            learningOutcome: "Calculate probabilities and variance of repeated binary trials.",
          },
          {
            id: "p1-m3-gaussian-distribution",
            title: "Gaussian distribution",
            explanation:
              "The normal distribution $\\mathcal{N}(\\mu, \\sigma^2)$ governs weight initialization (`torch.randn`), noise modeling in regression, and diffusion models.",
            keyConcepts: ["Bell curve PDF", "Standard normal N(0, 1)", "Central Limit Theorem", "Gaussian noise and MSE equivalence"],
            learningOutcome: "Sample from Gaussian distributions and explain why Gaussian noise leads to Mean Squared Error.",
          },
          {
            id: "p1-m3-mean-median-variance",
            title: "Mean, median, and variance",
            explanation:
              "Mean measures center of mass, median provides outlier-resistant centrality, and variance $\\text{Var}(X) = \\mathbb{E}[(X - \\mu)^2]$ measures spread—crucial for LayerNorm and BatchNorm.",
            keyConcepts: ["Sample mean", "Outlier robustness of median", "Variance calculation"],
            learningOutcome: "Compute mean and variance across tensor axes to normalize neural activations.",
          },
          {
            id: "p1-m3-standard-deviation",
            title: "Standard deviation",
            explanation:
              "$\\sigma = \\sqrt{\\text{Var}(X)}$ expresses dispersion in the same units as the data; dividing by $\\sqrt{\\text{Var}(X) + \\epsilon}$ standardizes features and hidden states to unit variance.",
            keyConcepts: ["z-score standardization (x - μ) / σ", "Variance-preserving weight initialization (1/√d)"],
            learningOutcome: "Standardize features and explain why attention scores are scaled by $1/\\sqrt{d_k}$ to preserve unit variance.",
          },
          {
            id: "p1-m3-covariance",
            title: "Covariance",
            explanation:
              "Covariance $\\text{Cov}(X, Y) = \\mathbb{E}[(X - \\mu_X)(Y - \\mu_Y)]$ and covariance matrices capture how pairs of features co-vary together, driving Principal Component Analysis (PCA).",
            keyConcepts: ["Positive vs negative covariance", "Covariance matrix Σ = (1/n) XᵀX", "Pearson correlation"],
            learningOutcome: "Compute empirical covariance matrices from centered data matrices.",
          },
          {
            id: "p1-m3-expectation",
            title: "Expectation",
            explanation:
              "Expected value $\\mathbb{E}_{x \\sim P}[f(x)] = \\sum_x P(x) f(x)$ is the probability-weighted average; empirical training loss is an expectation approximated over mini-batches.",
            keyConcepts: ["Linearity of expectation", "Monte Carlo estimation via mini-batches"],
            learningOutcome: "Manipulate expectations using linearity and approximate them via sampling.",
          },
          {
            id: "p1-m3-sampling",
            title: "Sampling",
            explanation:
              "Drawing realizations from a probability distribution—such as sampling the next token ID from a softmax distribution using multinomial sampling during LLM text generation.",
            keyConcepts: ["Inverse transform sampling", "Multinomial sampling", "Deterministic seed control"],
            learningOutcome: "Sample discrete tokens from categorical probability distributions.",
          },
          {
            id: "p1-m3-law-of-large-numbers",
            title: "Law of large numbers",
            explanation:
              "As sample size $N \\to \\infty$, the empirical average converges to the true expected value $\\mathbb{E}[X]$—justifying why mini-batch gradients provide unbiased estimates of the full dataset gradient.",
            keyConcepts: ["Empirical mean convergence", "Unbiased mini-batch gradient estimation"],
            learningOutcome: "Explain why stochastic mini-batch averages reliably approximate population expectations.",
          },
          {
            id: "p1-m3-mle",
            title: "Maximum likelihood estimation",
            explanation:
              "MLE selects model parameters $\\theta^*$ that maximize the probability (or equivalently minimize the negative log-probability) of observing the training data: $\\theta^* = \\arg\\min_\\theta \\sum_i -\\log P_\\theta(y_i \\mid x_i)$.",
            keyConcepts: ["Likelihood function", "Log-likelihood trick (products become sums)", "Negative Log-Likelihood (NLL)"],
            learningOutcome: "Formulate model training as minimizing Negative Log-Likelihood.",
          },
          {
            id: "p1-m3-entropy",
            title: "Entropy",
            explanation:
              "Shannon entropy $H(P) = -\\sum_x P(x) \\log P(x)$ measures the average uncertainty or information content of a distribution: peaked distributions have low entropy; uniform distributions have maximum entropy.",
            keyConcepts: ["Information content -log P(x)", "Peaked vs uniform distributions", "Uncertainty in token predictions"],
            learningOutcome: "Calculate Shannon entropy and interpret high- vs low-entropy model predictions.",
          },
          {
            id: "p1-m3-cross-entropy",
            title: "Cross-entropy",
            explanation:
              "Cross-entropy $H(P, Q) = -\\sum_x P(x) \\log Q(x)$ measures the average cost of encoding true distribution $P$ using predicted distribution $Q$. For a one-hot target token $y$, it simplifies to $-\\log Q(y)$.",
            keyConcepts: ["H(P, Q) = -∑ P(x) log Q(x)", "One-hot target simplification -log Q(y)", "Standard classification & LLM loss"],
            learningOutcome: "Compute cross-entropy loss from raw logits and target indices.",
          },
          {
            id: "p1-m3-kl-divergence",
            title: "KL divergence",
            explanation:
              "Kullback-Leibler divergence $D_{\\text{KL}}(P \\| Q) = \\sum_x P(x) \\log \\frac{P(x)}{Q(x)} = H(P, Q) - H(P) \\ge 0$ measures how much predicted distribution $Q$ diverges from reference distribution $P$—used in VAEs, knowledge distillation, and RLHF/DPO alignment.",
            keyConcepts: ["Non-negativity (D_KL >= 0)", "Asymmetry D_KL(P||Q) != D_KL(Q||P)", "KL penalty in RLHF"],
            learningOutcome: "Compute KL divergence between two discrete distributions and explain its role in model alignment.",
          },
        ],
        practicalExercises: [
          "Write a Python function that takes raw logits `[2.1, 0.5, -1.2, 3.4]`, applies softmax to get a probability distribution, and computes Shannon entropy and cross-entropy for target index `3`.",
          "Show empirically in NumPy that if $X, Y \\sim \\mathcal{N}(0, 1)$ have dimension $d=64$, their dot product $X \\cdot Y$ has variance $64$, and dividing by $\\sqrt{64}$ restores variance to $1$.",
        ],
        completionMilestone:
          "Explain how language models output probability distributions over tokens and derive cross-entropy loss from Maximum Likelihood Estimation.",
      },
      {
        id: "p1-m4",
        code: "1.4",
        title: "Optimization and Numerical Computing",
        description:
          "SGD, mini-batching, Momentum, RMSProp, Adam, learning-rate schedules, numerical stability, log-sum-exp, finite-difference gradient checking, and computational graphs.",
        estimatedEffort: "1.5 weeks · ~22–28 hours",
        whatYouWillLearn:
          "You will understand how modern optimizers accelerate convergence across noisy, poorly scaled loss surfaces, how floating-point overflow/underflow is prevented with the log-sum-exp trick, and how to verify analytical gradients using finite-difference checks.",
        whyItMatters:
          "Training deep networks and LLMs fails immediately without adaptive optimizers (Adam/AdamW), warmup-cosine learning-rate schedules, and numerically stable softmax/cross-entropy formulations.",
        learningObjectives: [
          "Implement SGD, Momentum, RMSProp, and Adam parameter updates in NumPy.",
          "Prevent NaN/Inf explosions in softmax and log-probabilities using the log-sum-exp trick.",
          "Validate analytical gradient derivations using centered finite-difference gradient checking.",
        ],
        keyConcepts: [
          "Mini-batch SGD",
          "Momentum & adaptive second moments (Adam)",
          "Log-Sum-Exp numerical stability",
          "Centered finite-difference check",
          "Computational graphs",
        ],
        topics: [
          {
            id: "p1-m4-gradient-descent-opt",
            title: "Gradient descent",
            explanation:
              "Full-batch gradient descent computes the exact gradient over all $N$ training examples before taking a single step—accurate but computationally infeasible when $N$ is millions of documents.",
            keyConcepts: ["Full-batch objective", "Step size selection", "Condition number sensitivity"],
            learningOutcome: "Contrast full-batch gradient descent against stochastic approximations.",
          },
          {
            id: "p1-m4-sgd",
            title: "Stochastic gradient descent",
            explanation:
              "SGD estimates the gradient using a single randomly sampled example per step, enabling immediate updates with high variance.",
            keyConcepts: ["Unbiased gradient estimate", "Gradient noise & escaping shallow local minima"],
            learningOutcome: "Explain the speed vs. variance tradeoff of stochastic updates.",
          },
          {
            id: "p1-m4-mini-batch",
            title: "Mini-batch optimization",
            explanation:
              "Mini-batch optimization averages gradients over a batch of $B$ examples (e.g., $B=32$ or $64$), balancing low gradient variance with high GPU matrix-multiplication throughput.",
            keyConcepts: ["Batch size B", "Throughput vs gradient noise", "Shuffling epochs"],
            learningOutcome: "Structure mini-batch optimization loops over shuffled training data.",
          },
          {
            id: "p1-m4-momentum",
            title: "Momentum",
            explanation:
              "Momentum maintains an exponentially decaying moving average of past gradients ($v_t = \\beta v_{t-1} + g_t$), dampening oscillations across steep ravines and accelerating progress along consistent downhill directions.",
            keyConcepts: ["Exponential moving average (EMA)", "Velocity buffer v_t", "Damping oscillations"],
            learningOutcome: "Implement SGD with Momentum and visualize how it smooths zig-zagging trajectories.",
          },
          {
            id: "p1-m4-rmsprop",
            title: "RMSProp",
            explanation:
              "RMSProp tracks an exponential moving average of squared gradients ($s_t = \\beta_2 s_{t-1} + (1-\\beta_2) g_t^2$) and divides each parameter's step by $\\sqrt{s_t} + \\epsilon$, normalizing step sizes across parameters with different gradient scales.",
            keyConcepts: ["Per-parameter adaptive scaling", "Running average of squared gradients", "Epsilon stability term"],
            learningOutcome: "Implement RMSProp and explain how it adapts to per-parameter curvature.",
          },
          {
            id: "p1-m4-adam",
            title: "Adam",
            explanation:
              "Adam combines first-moment momentum ($m_t$) and second-moment squared gradient scaling ($v_t$) with bias correction ($\\hat{m}_t, \\hat{v}_t$), serving as the foundation of AdamW in modern Transformer training.",
            keyConcepts: ["First moment m_t (mean)", "Second moment v_t (uncentered variance)", "Bias correction at early steps"],
            learningOutcome: "Implement the complete Adam optimizer with bias correction from scratch.",
          },
          {
            id: "p1-m4-lr-schedules",
            title: "Learning-rate schedules",
            explanation:
              "Varying the learning rate over time—starting with linear warmup to prevent early instability and decaying smoothly via a cosine curve—improves final convergence.",
            keyConcepts: ["Linear warmup", "Cosine annealing decay", "Step decay"],
            learningOutcome: "Write a warmup + cosine decay learning-rate scheduler function.",
          },
          {
            id: "p1-m4-numerical-stability",
            title: "Numerical stability",
            explanation:
              "Reformulating mathematical expressions so intermediate quantities never overflow to `Inf`, underflow to `0`, or divide by zero (`+ 1e-8`).",
            keyConcepts: ["Avoiding exp() overflow", "Safe log(x + eps)", "Conditioning"],
            learningOutcome: "Audit mathematical code for potential `NaN` and `Inf` failure modes.",
          },
          {
            id: "p1-m4-floating-point",
            title: "Floating-point limitations",
            explanation:
              "IEEE-754 floats represent real numbers with sign, exponent, and mantissa bits; `float32` overflows above $\\approx 3.4 \\times 10^{38}$ (so $\\exp(89)$ overflows!) and loses precision when adding tiny numbers to large ones.",
            keyConcepts: ["Sign, exponent, mantissa", "exp(89) overflow in float32", "Catastrophic cancellation"],
            learningOutcome: "Predict when `exp()` or `log()` will overflow or underflow in 32-bit and 16-bit floats.",
          },
          {
            id: "p1-m4-log-sum-exp",
            title: "Log-sum-exp",
            explanation:
              "Subtracting $c = \\max_i z_i$ before exponentiating keeps the largest exponent at $\\exp(0) = 1$: $\\log \\sum_i e^{z_i} = c + \\log \\sum_i e^{z_i - c}$, making softmax and log-softmax completely immune to overflow.",
            keyConcepts: ["Shift invariance of softmax", "Subtracting max logit", "Fused log-softmax"],
            learningOutcome: "Implement numerically stable `softmax` and `log_softmax` using the max-subtraction trick.",
            formulaOrCode: "shifted = logits - np.max(logits, axis=-1, keepdims=True)\nprobs = np.exp(shifted) / np.sum(np.exp(shifted), axis=-1, keepdims=True)",
          },
          {
            id: "p1-m4-gradient-checking",
            title: "Finite-difference gradient checking",
            explanation:
              "Approximating $\\frac{\\partial L}{\\partial \\theta_i} \\approx \\frac{L(\\theta_i + \\epsilon) - L(\\theta_i - \\epsilon)}{2\\epsilon}$ provides an O($\\epsilon^2$)-accurate numerical reference to verify every custom backward pass you write.",
            keyConcepts: ["Centered difference formula", "Relative error check", "Choosing epsilon = 1e-5"],
            learningOutcome: "Write a generic numerical gradient checker to validate analytical gradient implementations.",
          },
          {
            id: "p1-m4-computational-graphs",
            title: "Computational graphs",
            explanation:
              "Representing complex equations as directed acyclic graphs (DAGs) of elementary nodes (`+`, `*`, `matmul`, `exp`) prepares for automatic differentiation in Phase 3.",
            keyConcepts: ["Forward evaluation nodes", "Local derivatives on edges", "Topological ordering"],
            learningOutcome: "Draw the computational graph for a linear or logistic model and trace forward/backward values.",
          },
        ],
        practicalExercises: [
          "Show that naive `np.exp([1000.0, 1001.0])` produces `inf`/`nan`, then fix it with the max-shift log-sum-exp trick.",
          "Implement a centered finite-difference gradient checker and use it to verify your analytical gradients for logistic regression.",
        ],
        completionMilestone:
          "Implement numerically stable softmax/cross-entropy, gradient descent optimizers, and finite-difference gradient verification.",
      },
    ],
    assignments: [
      "Implement vector and matrix operations.",
      "Calculate cosine similarity.",
      "Write numerical derivatives.",
      "Implement gradient descent.",
      "Implement linear regression mathematically.",
      "Implement logistic regression and manually calculate gradients.",
      "Compare analytical and numerical gradients.",
    ],
    primaryProjects: [
      {
        id: "milestone-02-linear-regression",
        milestoneNumber: 2,
        title: "Linear Regression From Scratch",
        phase: 1,
        shortDescription:
          "Train a regression model without using a predefined machine-learning estimator—deriving analytical MSE gradients manually, implementing gradient descent, plotting loss convergence, and evaluating on held-out data.",
        skillsPracticed: [
          "Vectorized MSE loss & analytical gradients",
          "Gradient descent & learning rate schedules",
          "Loss curve visualization & convergence",
          "Held-out evaluation & library comparison",
        ],
        expectedOutcome:
          "A complete linear regression training pipeline with derived gradients and diagnostic plots.",
        difficulty: "foundational",
        difficultyLabel: "Beginner → Intermediate",
      },
    ],
    completionCriteriaSummary:
      "Explain derivatives, gradients, matrix operations, probability distributions, and how parameters are updated during training.",
    completionChecklist: [
      {
        id: "p1-check-concepts",
        question: "Can you explain the geometric meaning of dot products, gradients, and cross-entropy loss?",
        detail: "Including why neurons use z = w·x + b and why language models minimize negative log-likelihood.",
      },
      {
        id: "p1-check-exercises",
        question: "Have you completed all 7 Phase 1 mathematical assignments?",
        detail: "Covering cosine similarity, numerical derivatives, gradient descent, and manual logistic gradients.",
      },
      {
        id: "p1-check-implementation",
        question: "Can you write the gradient descent update w_new = w_old - lr * grad and stable softmax from memory?",
        detail: "Including the max-logit shift that prevents floating-point overflow.",
      },
      {
        id: "p1-check-testing",
        question: "Have you verified your analytical gradients against centered finite-difference numerical gradients?",
        detail: "Achieving relative error below 1e-6.",
      },
      {
        id: "p1-check-limitations",
        question: "Can you explain Milestone #1 (Matrix Operations Engine) and how its O(N³) complexity scales?",
        detail: "Understanding both algorithmic correctness and memory layout.",
      },
    ],
  },

  // ============================================================================
  // PHASE 2 — MACHINE LEARNING FROM SCRATCH
  // ============================================================================
  {
    id: "phase-2",
    slug: "phase-2-machine-learning-from-scratch",
    phase: 2,
    code: "P2",
    title: "Machine Learning From Scratch",
    shortDescription:
      "Understand how algorithms learn patterns from data, optimize loss functions, avoid overfitting and data leakage, and generalize to unseen examples.",
    purpose:
      "Understand how algorithms learn patterns and generalize to unseen data.",
    estimatedWeeks: 8,
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    prerequisites: [
      {
        phaseNumber: 0,
        phaseId: "phase-0",
        label: "Phase 0: Programming Foundations",
      },
      {
        phaseNumber: 1,
        phaseId: "phase-1",
        label: "Phase 1: Mathematics for AI (Linear Algebra, Gradients, Probability)",
      },
    ],
    learningObjectives: [
      "Distinguish supervised, unsupervised, and self-supervised learning paradigms.",
      "Implement linear and logistic regression from scratch using NumPy and gradient-based training.",
      "Implement classical ML algorithms (KNN, Decision Trees, Naive Bayes, K-Means, PCA) in NumPy before comparing with scikit-learn.",
      "Design leak-free train/validation/test splits and evaluate models with precision, recall, F1, ROC-AUC, and RMSE.",
    ],
    modules: [
      {
        id: "p2-m1",
        code: "2.1",
        title: "ML Fundamentals",
        description:
          "Learning paradigms, train/validation/test splits, parameters vs. hyperparameters, overfitting, the bias-variance tradeoff, regularization, and data leakage prevention.",
        estimatedEffort: "2 weeks · ~30–35 hours",
        whatYouWillLearn:
          "You will learn the foundational principles of statistical learning: how models generalize beyond their training set, why separate validation and test splits are mandatory, how bias and variance trade off, and how regularization penalizes excessive model complexity.",
        whyItMatters:
          "Every failure mode of classical ML—overfitting, distribution shift, hyperparameter over-tuning, and train-test contamination—reappears at massive scale when pretraining and evaluating Large Language Models.",
        learningObjectives: [
          "Distinguish supervised, unsupervised, and self-supervised learning (the paradigm behind LLM pretraining).",
          "Diagnose high bias (underfitting) versus high variance (overfitting) from training and validation learning curves.",
          "Prevent data leakage when scaling features or selecting hyperparameters.",
        ],
        keyConcepts: [
          "Supervised vs self-supervised learning",
          "Train / validation / test splits",
          "Parameters vs hyperparameters",
          "Bias-variance tradeoff",
          "L1/L2 regularization & data leakage",
        ],
        topics: [
          {
            id: "p2-m1-what-is-ml",
            title: "What is machine learning?",
            explanation:
              "Rather than hand-coding explicit decision rules, machine learning optimizes parameterized mathematical functions so they extract statistical regularities directly from data.",
            keyConcepts: ["Data-driven parameter estimation", "Task, performance measure, experience", "ML vs rule-based software"],
            learningOutcome: "Articulate when a problem calls for machine learning versus deterministic programming.",
          },
          {
            id: "p2-m1-supervised-learning",
            title: "Supervised learning",
            explanation:
              "Learning a mapping $f_\\theta: X \\to Y$ from labeled input-output pairs $(x_i, y_i)$—predicting continuous targets (regression) or discrete categories (classification).",
            keyConcepts: ["Labeled datasets", "Regression vs classification", "Empirical risk minimization"],
            learningOutcome: "Formulate regression and classification tasks with explicit input features and target labels.",
          },
          {
            id: "p2-m1-unsupervised-learning",
            title: "Unsupervised learning",
            explanation:
              "Discovering latent structure, clusters, or low-dimensional manifolds in unlabeled data $X$ without human annotations (clustering, dimensionality reduction, density estimation).",
            keyConcepts: ["Unlabeled data", "Clustering", "Latent representations"],
            learningOutcome: "Identify structure discovery tasks where ground-truth labels do not exist.",
          },
          {
            id: "p2-m1-self-supervised-learning",
            title: "Self-supervised learning",
            explanation:
              "Generating supervisory labels automatically from the structure of raw data itself—such as predicting the next token from preceding tokens in raw text corpora, enabling LLM pretraining on trillions of words without human labeling.",
            keyConcepts: ["Pretext tasks from raw data", "Next-token prediction as self-supervision", "Scaling without manual labels"],
            learningOutcome: "Explain why self-supervised learning unlocked modern foundation models and LLMs.",
          },
          {
            id: "p2-m1-features-labels",
            title: "Features and labels",
            explanation:
              "Features ($X \\in \\mathbb{R}^{N \\times d}$) are the measurable input attributes of each example; labels ($y$) are the target outcomes the model is trained to predict.",
            keyConcepts: ["Design matrix X", "Target vector y", "Numerical vs categorical features"],
            learningOutcome: "Construct clean feature matrices $X$ and target vectors $y$ from raw domain records.",
          },
          {
            id: "p2-m1-train-val-test",
            title: "Training, validation, and testing",
            explanation:
              "The training set fits parameters $\\theta$; the validation set tunes hyperparameters and selects architectures; the held-out test set is evaluated once at the end to measure unbiased generalization.",
            keyConcepts: ["Three-way dataset partitioning", "Stratified splitting", "Temporal splitting for time series"],
            learningOutcome: "Partition datasets into train, validation, and test splits appropriately for the domain.",
          },
          {
            id: "p2-m1-model-parameters",
            title: "Model parameters",
            explanation:
              "Parameters (weights $W$ and biases $b$) are internal variables updated automatically by optimization algorithms during training.",
            keyConcepts: ["Weights & biases", "Parameter count", "Learned state"],
            learningOutcome: "Calculate the exact number of trainable parameters in linear and neural models.",
          },
          {
            id: "p2-m1-hyperparameters",
            title: "Hyperparameters",
            explanation:
              "Hyperparameters (learning rate $\\eta$, regularization strength $\\lambda$, polynomial degree, number of layers) are configuration choices set prior to training and tuned on the validation split.",
            keyConcepts: ["Learning rate", "Regularization strength", "Grid & random search on validation set"],
            learningOutcome: "Distinguish trainable parameters from hyperparameters and tune them systematically.",
          },
          {
            id: "p2-m1-overfitting",
            title: "Overfitting",
            explanation:
              "Overfitting occurs when a model memorizes noise and idiosyncrasies in the training set, achieving low training loss but high validation/test loss.",
            keyConcepts: ["Memorization vs learning", "Diverging train and validation loss curves", "Excessive capacity"],
            learningOutcome: "Detect overfitting early by comparing training and validation loss curves.",
          },
          {
            id: "p2-m1-underfitting",
            title: "Underfitting",
            explanation:
              "Underfitting occurs when a model is too simple or insufficiently trained to capture the underlying signal, resulting in high error on both training and validation data.",
            keyConcepts: ["Insufficient model capacity", "High training loss", "Feature poverty"],
            learningOutcome: "Diagnose underfitting and remedy it by increasing model capacity or improving features.",
          },
          {
            id: "p2-m1-bias-variance",
            title: "Bias-variance tradeoff",
            explanation:
              "Expected generalization error decomposes into Bias² (systematic error from overly restrictive assumptions), Variance (sensitivity to fluctuations in the training sample), and irreducible noise.",
            keyConcepts: ["Error = Bias² + Variance + Noise", "Model complexity spectrum", "Sweet spot of generalization"],
            learningOutcome: "Explain the bias-variance decomposition and how model complexity shifts the balance.",
          },
          {
            id: "p2-m1-generalization",
            title: "Generalization",
            explanation:
              "Generalization is a model's ability to perform accurately on new, unseen examples drawn from the same underlying distribution.",
            keyConcepts: ["In-distribution generalization", "Out-of-distribution (OOD) shift", "Inductive bias"],
            learningOutcome: "Measure and reason about a model's generalization gap.",
          },
          {
            id: "p2-m1-data-leakage",
            title: "Data leakage",
            explanation:
              "Data leakage happens when information from the validation or test set inadvertently enters training—such as computing normalization mean/std across the whole dataset before splitting, or target leakage in features.",
            keyConcepts: ["Fit scaler on train only", "Target leakage", "Duplicate examples across splits (contamination)"],
            learningOutcome: "Audit ML pipelines to guarantee zero information leakage from validation/test splits.",
          },
          {
            id: "p2-m1-feature-scaling",
            title: "Feature scaling",
            explanation:
              "Standardizing features to zero mean and unit variance ($z = (x - \\mu_{\\text{train}})/\\sigma_{\\text{train}}$) or min-max scaling transforms elongated loss contours into circular ones so gradient descent converges rapidly.",
            keyConcepts: ["Z-score standardization", "Min-max normalization", "Effect on gradient descent conditioning"],
            learningOutcome: "Implement leak-free feature standardization fitting statistics strictly on the training split.",
          },
          {
            id: "p2-m1-regularization",
            title: "Regularization",
            explanation:
              "Adding a complexity penalty to the loss—$L_2$ Ridge ($\\lambda \\|w\\|_2^2$, equivalent to weight decay) or $L_1$ Lasso ($\\lambda \\|w\\|_1$, inducing sparse zero weights)—constrains parameter magnitude to reduce variance.",
            keyConcepts: ["L2 Ridge (weight decay)", "L1 Lasso (sparsity)", "Early stopping"],
            learningOutcome: "Derive and implement L1 and L2 regularization penalties in loss and gradient calculations.",
          },
          {
            id: "p2-m1-cross-validation",
            title: "Cross-validation",
            explanation:
              "$K$-fold cross-validation partitions training data into $K$ folds, training $K$ times while rotating the validation fold to obtain a low-variance estimate of generalization performance.",
            keyConcepts: ["K-fold rotation", "Stratified K-fold", "Hyperparameter selection stability"],
            learningOutcome: "Implement $K$-fold cross-validation from scratch in NumPy.",
          },
        ],
        practicalExercises: [
          "Fit polynomial regression models of degrees 1, 3, and 15 on noisy synthetic data and plot training vs. validation error to visualize underfitting, optimal fit, and overfitting.",
          "Demonstrate how fitting a `StandardScaler` before train/test splitting leaks test statistics, and implement the leak-free pipeline.",
        ],
        completionMilestone:
          "Design leak-free train/validation/test pipelines, diagnose bias vs. variance, and apply L2 regularization.",
        recommendedResources: [
          {
            title: "Google Machine Learning Crash Course",
            provider: "Google Developers",
            url: "https://developers.google.com/machine-learning/crash-course",
          },
        ],
      },
      {
        id: "p2-m2",
        code: "2.2",
        title: "Regression and Classification",
        description:
          "Mathematical formulation and NumPy implementation of linear regression, logistic regression, MSE, binary cross-entropy, and decision boundaries.",
        estimatedEffort: "2 weeks · ~30–35 hours",
        whatYouWillLearn:
          "You will derive and implement both linear regression (continuous prediction with Mean Squared Error) and logistic regression (probabilistic classification with sigmoid and Binary Cross-Entropy) using vectorized gradient descent.",
        whyItMatters:
          "Logistic regression is a single-layer neural network. Understanding how linear scores pass through a sigmoid/softmax function into a cross-entropy loss with gradient $(p - y)x$ is the exact foundation of deep neural classifiers and LLM output heads.",
        learningObjectives: [
          "Implement multivariable linear regression via both normal equations and gradient descent.",
          "Derive and implement binary and multiclass logistic regression from scratch.",
          "Plot and interpret linear and polynomial decision boundaries.",
        ],
        keyConcepts: [
          "Linear regression & Normal Equations",
          "Sigmoid & Softmax probabilities",
          "Mean Squared Error (MSE)",
          "Binary Cross-Entropy (BCE)",
          "Decision boundaries",
        ],
        topics: [
          {
            id: "p2-m2-linear-regression",
            title: "Linear regression",
            explanation:
              "Models a continuous target as an affine combination of features $\\hat{y} = Xw + b$, solvable either analytically via $\\hat{w} = (X^T X)^{-1} X^T y$ or iteratively via gradient descent.",
            keyConcepts: ["Affine prediction Xw + b", "Closed-form Normal Equation", "Iterative SGD scaling to large N"],
            learningOutcome: "Implement multivariable linear regression and compare closed-form vs. gradient descent solutions.",
          },
          {
            id: "p2-m2-logistic-regression",
            title: "Logistic regression",
            explanation:
              "Squashes a linear logit $z = w^T x + b$ through the sigmoid function $\\sigma(z) = \\frac{1}{1 + e^{-z}} \\in (0, 1)$ to model the posterior probability $P(y=1 \\mid x)$.",
            keyConcepts: ["Log-odds (logits)", "Sigmoid function σ(z)", "Probabilistic classification"],
            learningOutcome: "Implement binary logistic regression with numerically stable sigmoid and cross-entropy.",
          },
          {
            id: "p2-m2-loss-functions",
            title: "Loss functions",
            explanation:
              "Loss functions quantify how far predictions $\\hat{y}$ deviate from ground-truth targets $y$, providing a smooth, differentiable objective for gradient descent.",
            keyConcepts: ["Surrogate differentiable losses", "Zero-one accuracy vs smooth cross-entropy", "Robust Huber/MAE loss"],
            learningOutcome: "Choose and justify loss functions based on target distribution and outlier sensitivity.",
          },
          {
            id: "p2-m2-mse",
            title: "Mean squared error",
            explanation:
              "$\\text{MSE} = \\frac{1}{N} \\sum_{i=1}^N (\\hat{y}_i - y_i)^2$ penalizes large errors quadratically and has gradient $\\nabla_w \\text{MSE} = \\frac{2}{N} X^T (Xw + b - y)$.",
            keyConcepts: ["Quadratic penalty on outliers", "Vectorized gradient (2/N) Xᵀ(ŷ - y)", "MLE under Gaussian noise"],
            learningOutcome: "Derive and code vectorized MSE loss and its analytical weight/bias gradients.",
          },
          {
            id: "p2-m2-bce",
            title: "Binary cross-entropy",
            explanation:
              "$\\text{BCE} = -\\frac{1}{N} \\sum_{i=1}^N [y_i \\log \\hat{p}_i + (1-y_i) \\log(1-\\hat{p}_i)]$ is convex with respect to linear logits and yields the remarkably clean gradient $\\nabla_w \\text{BCE} = \\frac{1}{N} X^T (\\hat{p} - y)$.",
            keyConcepts: ["Convexity vs non-convex MSE on sigmoid", "Clean gradient (1/N) Xᵀ(p - y)", "Logit-based formulation"],
            learningOutcome: "Derive $\\frac{\\partial \\text{BCE}}{\\partial z} = \\sigma(z) - y$ and implement it in NumPy.",
          },
          {
            id: "p2-m2-gradient-training",
            title: "Gradient-based training",
            explanation:
              "Combining forward prediction, loss evaluation, vectorized gradient computation, L2 weight decay, and parameter updates across epochs until validation loss converges.",
            keyConcepts: ["Epoch & mini-batch training loop", "Loss curve monitoring", "Convergence criteria"],
            learningOutcome: "Write complete, reusable `fit()` and `predict()` training loops in NumPy.",
          },
          {
            id: "p2-m2-decision-boundaries",
            title: "Decision boundaries",
            explanation:
              "The set of points where $P(y=1 \\mid x) = 0.5$ (i.e., $w^T x + b = 0$) forms a hyperplane separating classes in feature space.",
            keyConcepts: ["Hyperplane wᵀx + b = 0", "Weight vector orthogonal to boundary", "Non-linear boundaries via feature expansion"],
            learningOutcome: "Visualize 2D decision boundaries and explain how feature transformations bend them.",
          },
          {
            id: "p2-m2-feature-engineering",
            title: "Feature engineering",
            explanation:
              "Constructing interaction terms ($x_1 x_2$), polynomial features, log transforms, and one-hot encodings allows linear models to capture non-linear domain relationships.",
            keyConcepts: ["Polynomial interaction terms", "One-hot encoding", "Domain-informed representations"],
            learningOutcome: "Transform raw tabular and text attributes into informative numerical features.",
          },
        ],
        practicalExercises: [
          "Complete Primary Project Milestone #2: Implement `LinearRegressionFromScratch` with L2 regularization, learning-rate scheduling, and validation tracking.",
          "Implement `LogisticRegressionFromScratch` in NumPy and plot its 2D decision boundary on a binary classification dataset.",
        ],
        completionMilestone:
          "Implement linear and logistic regression from scratch in NumPy and verify convergence on real datasets.",
      },
      {
        id: "p2-m3",
        code: "2.3",
        title: "Classical ML Algorithms",
        description:
          "K-Nearest Neighbors, Decision Trees, Random Forests, Naive Bayes, SVMs, K-Means Clustering, PCA, and Gradient Boosting.",
        estimatedEffort: "2.5 weeks · ~38–45 hours",
        whatYouWillLearn:
          "You will understand the geometric, probabilistic, and information-theoretic principles behind the major classical ML families—implementing KNN, Naive Bayes, K-Means, and PCA directly in NumPy before using library implementations.",
        whyItMatters:
          "KNN powers modern vector database retrieval (RAG); Naive Bayes introduces log-probability token classification; K-Means underpins vector quantization; and PCA connects eigendecomposition to low-dimensional representation learning.",
        learningObjectives: [
          "Implement selected algorithms with NumPy before using library implementations.",
          "Build a multinomial Naive Bayes classifier with Laplace smoothing for spam/text classification.",
          "Implement K-Means clustering and Principal Component Analysis (PCA) using NumPy linear algebra.",
        ],
        keyConcepts: [
          "Distance-based KNN retrieval",
          "Entropy splits in Decision Trees & Ensembles",
          "Multinomial Naive Bayes in log-space",
          "Maximum-margin SVMs",
          "K-Means & PCA dimensionality reduction",
        ],
        topics: [
          {
            id: "p2-m3-knn",
            title: "K-nearest neighbors",
            explanation:
              "A non-parametric method that predicts a query's label by finding the $k$ closest training vectors by Euclidean or cosine distance—the exact core operation of vector search in Retrieval-Augmented Generation (RAG).",
            keyConcepts: ["Vectorized pairwise distance matrix", "Choosing k (bias-variance)", "Curse of dimensionality"],
            learningOutcome: "Implement vectorized KNN in NumPy without looping over training samples.",
          },
          {
            id: "p2-m3-decision-trees",
            title: "Decision trees",
            explanation:
              "Recursively partitions feature space along axis-aligned thresholds chosen to maximize Information Gain (reduction in Shannon entropy or Gini impurity).",
            keyConcepts: ["Gini impurity & Shannon entropy", "Information gain split search", "Depth pruning to prevent overfitting"],
            learningOutcome: "Calculate information gain and implement a recursive decision tree split finder.",
          },
          {
            id: "p2-m3-random-forests",
            title: "Random forests",
            explanation:
              "Trains an ensemble of decorrelated decision trees using bootstrap resampling (bagging) and random feature subsets at each split, dramatically reducing variance.",
            keyConcepts: ["Bootstrap aggregating (bagging)", "Feature subsampling", "Variance reduction via averaging"],
            learningOutcome: "Explain why averaging decorrelated high-variance trees yields a strong low-variance ensemble.",
          },
          {
            id: "p2-m3-naive-bayes",
            title: "Naive Bayes",
            explanation:
              "Applies Bayes' theorem under conditional feature independence ($P(x_1, \\dots, x_d \\mid y) = \\prod_j P(x_j \\mid y)$), computing log-probabilities with Laplace smoothing to prevent zero-probability underflow on unseen words.",
            keyConcepts: ["Conditional independence assumption", "Sum of log-probabilities", "Laplace (+1) smoothing"],
            learningOutcome: "Implement a Multinomial Naive Bayes text classifier from scratch (Milestone #3: Spam Classifier).",
          },
          {
            id: "p2-m3-svm",
            title: "Support Vector Machines",
            explanation:
              "Finds the hyperplane that maximizes the geometric margin $\\frac{2}{\\|w\\|}$ between classes using hinge loss $\\max(0, 1 - y_i(w^T x_i + b))$.",
            keyConcepts: ["Maximum margin principle", "Support vectors", "Hinge loss & soft-margin C parameter"],
            learningOutcome: "Formulate linear SVMs via hinge loss + L2 regularization and optimize with subgradient descent.",
          },
          {
            id: "p2-m3-kmeans",
            title: "K-means clustering",
            explanation:
              "Alternates between assigning each point to its nearest centroid and recomputing centroids as cluster means (Lloyd's algorithm), used in dataset deduplication and vector quantization.",
            keyConcepts: ["Expectation-Maximization alternation", "Within-cluster sum of squares (inertia)", "k-means++ initialization"],
            learningOutcome: "Implement K-Means clustering in NumPy and diagnose sensitivity to centroid initialization.",
          },
          {
            id: "p2-m3-pca",
            title: "Principal Component Analysis",
            explanation:
              "Projects centered data onto the top $k$ eigenvectors (or right singular vectors from SVD) of the covariance matrix, preserving maximum variance in minimal dimensions.",
            keyConcepts: ["Mean centering", "SVD of centered data matrix", "Explained variance ratio"],
            learningOutcome: "Implement PCA via SVD in 6 lines of NumPy and project high-dimensional data to 2D.",
          },
          {
            id: "p2-m3-gradient-boosting",
            title: "Introduction to gradient boosting",
            explanation:
              "Sequentially trains shallow weak learners where each new tree fits the negative gradient (pseudo-residuals) of the loss function with respect to the ensemble's current predictions.",
            keyConcepts: ["Boosting vs bagging", "Fitting pseudo-residuals", "Shrinkage learning rate"],
            learningOutcome: "Explain how boosting performs functional gradient descent in prediction space.",
          },
        ],
        practicalExercises: [
          "Implement KNN, K-Means, and PCA in pure NumPy before comparing outputs with `scikit-learn`.",
          "Complete Primary Project Milestone #3: Build a Multinomial Naive Bayes + Logistic Regression Spam Classification System.",
        ],
        completionMilestone:
          "Implement classical ML algorithms in NumPy and understand their geometric and probabilistic foundations.",
      },
      {
        id: "p2-m4",
        code: "2.4",
        title: "Model Evaluation",
        description:
          "Classification and regression metrics, confusion matrices, precision-recall tradeoffs, ROC-AUC, baseline comparisons, and leakage detection.",
        estimatedEffort: "1.5 weeks · ~20–25 hours",
        whatYouWillLearn:
          "You will learn why raw accuracy is misleading on imbalanced datasets, how to compute Precision, Recall, F1, and ROC-AUC across classification thresholds, how to compare MAE vs. RMSE in regression, and how to establish rigorous baselines.",
        whyItMatters:
          "Without rigorous evaluation metrics and trivial baselines, it is easy to fool yourself into thinking a complex model works when it is merely exploiting class imbalance or data leakage.",
        learningObjectives: [
          "Compute confusion matrices, Precision, Recall, F1, and ROC-AUC from scratch.",
          "Select decision thresholds based on domain false-positive vs. false-negative costs.",
          "Always benchmark complex models against trivial majority/mean baselines and linear baselines.",
        ],
        keyConcepts: [
          "Confusion matrix (TP, FP, TN, FN)",
          "Precision, Recall & F1 score",
          "ROC curve & AUC",
          "MAE, MSE & RMSE",
          "Baseline discipline & leakage audits",
        ],
        topics: [
          {
            id: "p2-m4-accuracy",
            title: "Accuracy",
            explanation:
              "The fraction of correct predictions $\\frac{TP + TN}{N}$. On a 99%-negative dataset, a dummy classifier predicting all-negative achieves 99% accuracy while catching 0% of positives.",
            keyConcepts: ["Class imbalance trap", "When accuracy is valid vs misleading"],
            learningOutcome: "Identify when class imbalance makes accuracy an invalid metric.",
          },
          {
            id: "p2-m4-precision",
            title: "Precision",
            explanation:
              "$\\text{Precision} = \\frac{TP}{TP + FP}$ answers: 'Out of all items the model flagged as positive, what fraction were genuinely positive?'—critical when false positives are costly (e.g., marking legitimate email as spam).",
            keyConcepts: ["TP / (TP + FP)", "Minimizing false alarms"],
            learningOutcome: "Compute precision and optimize classification thresholds for high-precision regimes.",
          },
          {
            id: "p2-m4-recall",
            title: "Recall",
            explanation:
              "$\\text{Recall} = \\frac{TP}{TP + FN}$ (Sensitivity / True Positive Rate) answers: 'Out of all truly positive items, what fraction did the model successfully detect?'—critical in safety and medical screening.",
            keyConcepts: ["TP / (TP + FN)", "Minimizing missed detections"],
            learningOutcome: "Compute recall and analyze the inverse tradeoff between precision and recall.",
          },
          {
            id: "p2-m4-f1-score",
            title: "F1 score",
            explanation:
              "The harmonic mean $F_1 = \\frac{2 \\cdot \\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}$ penalizes extreme imbalance between precision and recall.",
            keyConcepts: ["Harmonic mean vs arithmetic mean", "Macro vs micro F1 for multiclass"],
            learningOutcome: "Calculate binary and macro-averaged F1 scores in NumPy.",
          },
          {
            id: "p2-m4-confusion-matrix",
            title: "Confusion matrix",
            explanation:
              "A $C \\times C$ table cross-tabulating true labels against predicted classes, revealing exactly which categories the model confuses with one another.",
            keyConcepts: ["TP, FP, FN, TN quadrant analysis", "Multiclass error patterns"],
            learningOutcome: "Construct and inspect confusion matrices to guide targeted error analysis.",
          },
          {
            id: "p2-m4-roc-auc",
            title: "ROC-AUC",
            explanation:
              "Plots True Positive Rate vs. False Positive Rate across all possible probability thresholds; the Area Under the Curve (AUC) equals the probability that a random positive example receives a higher score than a random negative example.",
            keyConcepts: ["Threshold-independent ranking quality", "Random classifier AUC = 0.5", "PR-AUC for severe imbalance"],
            learningOutcome: "Compute ROC curves and AUC scores from predicted probabilities.",
          },
          {
            id: "p2-m4-mae",
            title: "MAE",
            explanation:
              "Mean Absolute Error $\\frac{1}{N} \\sum |\\hat{y}_i - y_i|$ measures average error in target units and grows linearly with outliers.",
            keyConcepts: ["L1 error in target units", "Robustness to extreme outliers"],
            learningOutcome: "Compare MAE and RMSE to diagnose the presence of large outlier errors.",
          },
          {
            id: "p2-m4-mse-eval",
            title: "MSE",
            explanation:
              "Mean Squared Error $\\frac{1}{N} \\sum (\\hat{y}_i - y_i)^2$ heavily penalizes large deviations in squared target units.",
            keyConcepts: ["Squared error penalty", "Variance of residuals"],
            learningOutcome: "Use MSE for differentiable training and residual variance analysis.",
          },
          {
            id: "p2-m4-rmse",
            title: "RMSE",
            explanation:
              "Root Mean Squared Error $\\sqrt{\\text{MSE}}$ restores MSE back to the original units of the target variable $y$ while retaining sensitivity to large errors.",
            keyConcepts: ["Interpretability in target units", "RMSE >= MAE relationship"],
            learningOutcome: "Report regression accuracy in interpretable domain units via RMSE and $R^2$.",
          },
          {
            id: "p2-m4-cv-eval",
            title: "Cross-validation",
            explanation:
              "Reporting mean $\\pm$ standard deviation of metrics across $K$ folds ensures an observed improvement is statistically meaningful rather than a lucky split.",
            keyConcepts: ["Mean ± std across folds", "Paired comparison across identical folds"],
            learningOutcome: "Report cross-validated metric intervals rather than single-split point estimates.",
          },
          {
            id: "p2-m4-baselines",
            title: "Baseline comparisons",
            explanation:
              "Before celebrating any model, compare it against a zero-rule baseline (predicting the mean or majority class) and a simple linear/logistic model.",
            keyConcepts: ["Zero-rule dummy baseline", "Simple linear baseline", "Complexity justification"],
            learningOutcome: "Establish trivial and linear baselines before introducing complex models.",
          },
          {
            id: "p2-m4-leakage-detection",
            title: "Data leakage detection",
            explanation:
              "Suspiciously near-perfect validation metrics, post-event features, or duplicate records shared between train and test splits signal data leakage that invalidates evaluation.",
            keyConcepts: ["Suspiciously high validation accuracy", "Near-duplicate hash checks across splits", "Temporal causal ordering"],
            learningOutcome: "Run automated duplicate and feature-correlation audits across train/test splits.",
          },
        ],
        practicalExercises: [
          "Implement `confusion_matrix`, `precision_score`, `recall_score`, `f1_score`, and `roc_auc_score` in pure NumPy and verify against `scikit-learn`.",
          "Evaluate your Spam Classifier across probability thresholds from 0.1 to 0.9 and choose a threshold that achieves >98% precision.",
        ],
        completionMilestone:
          "Evaluate regression and classification models rigorously with confusion matrices, precision/recall tradeoffs, ROC-AUC, and leak-free baselines.",
      },
    ],
    assignments: [
      "Implement multivariable linear regression with MSE loss and L2 regularization in NumPy.",
      "Implement binary logistic regression with BCE loss and gradient descent in NumPy.",
      "Implement K-Nearest Neighbors, K-Means, and PCA in NumPy.",
      "Build a complete Spam Classification pipeline comparing Multinomial Naive Bayes and Logistic Regression.",
      "Produce a full evaluation report with confusion matrices, Precision, Recall, F1, and ROC-AUC.",
    ],
    primaryProjects: [
      {
        id: "milestone-03-spam-classifier",
        milestoneNumber: 3,
        title: "Spam Classifier",
        phase: 2,
        shortDescription:
          "Build an end-to-end email/SMS spam classification system implementing text preprocessing, Bag-of-Words/TF-IDF feature extraction, and a Naive Bayes or Logistic Regression classifier from scratch.",
        skillsPracticed: [
          "Text preprocessing, tokenization & TF-IDF",
          "Log-space Naive Bayes & Logistic Regression",
          "Precision, Recall, and F1 evaluation",
          "Error analysis & scikit-learn baseline comparison",
        ],
        expectedOutcome:
          "A working text classification system with precision, recall, F1, and misclassification analysis.",
        difficulty: "intermediate",
        difficultyLabel: "Intermediate",
      },
    ],
    supplementaryProjects: [
      {
        title: "Logistic Regression Classifier & Decision Boundary Visualizer",
        description:
          "Standalone binary and multiclass (softmax) logistic classifier with 2D contour plotting of linear and polynomial decision boundaries.",
      },
    ],
    completionCriteriaSummary:
      "Train, evaluate, and compare classical machine-learning models, including at least one manually implemented classifier.",
    completionChecklist: [
      {
        id: "p2-check-concepts",
        question: "Can you explain the bias-variance tradeoff, data leakage, and why self-supervised learning powers LLMs?",
        detail: "Contrasting supervised labeled tasks with next-token self-supervision.",
      },
      {
        id: "p2-check-exercises",
        question: "Have you implemented linear regression, logistic regression, and Naive Bayes in NumPy?",
        detail: "Without relying on scikit-learn's .fit() for the core algorithms.",
      },
      {
        id: "p2-check-implementation",
        question: "Can you derive and code the vectorized gradients for MSE and Binary Cross-Entropy?",
        detail: "Showing why both reduce to forms of (1/N) Xᵀ(prediction - target).",
      },
      {
        id: "p2-check-testing",
        question: "Have you evaluated your Spam Classifier using Precision, Recall, F1, and ROC-AUC rather than raw accuracy alone?",
        detail: "Including a comparison against a majority-class dummy baseline.",
      },
      {
        id: "p2-check-limitations",
        question: "Can you explain why linear classifiers fail on non-linearly separable patterns (like XOR) without manual feature engineering?",
        detail: "Motivating the transition to multi-layer neural networks in Phase 3.",
      },
    ],
  },
];
