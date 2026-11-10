import type { CurriculumProject } from "@/types";

export const PROJECTS_1_TO_5: CurriculumProject[] = [
  // ============================================================================
  // PROJECT 1 — MATRIX OPERATIONS ENGINE
  // ============================================================================
  {
    id: "milestone-01-matrix-operations-engine",
    slug: "matrix-operations-engine",
    milestoneNumber: 1,
    title: "Matrix Operations Engine",
    subtitle: "Build a pure-Python linear algebra library verified against NumPy",
    shortDescription:
      "Build a small linear algebra library using pure Python implementing vectors, matrices, dimension validation, dot products, transposes, and matrix multiplication, verified numerically against NumPy.",
    detailedOverview:
      "Every forward and backward pass in modern deep learning and Large Language Models is built on vector dot products, matrix transpositions, and matrix multiplications. Before relying on C++/CUDA-accelerated libraries like NumPy or PyTorch, you will implement a clean, reusable linear algebra library in pure Python from first principles. You will design explicit Vector and Matrix data structures, enforce strict shape invariants, implement O(n³) matrix multiplication with nested loops, and write an automated test suite comparing your outputs against NumPy within floating-point tolerances.",
    whyThisProjectMatters:
      "When debugging tensor shape mismatches in multi-head self-attention or backpropagation, engineers who have written matrix multiplication and transposition from scratch can immediately trace which inner dimensions must align and why incompatible shapes fail.",
    phase: 0,
    difficulty: "foundational",
    difficultyFilter: "Beginner",
    difficultyLabel: "Beginner",
    estimatedEffort: "8–12 hours · 1–2 weeks",
    technologies: ["Python", "NumPy", "pytest"],
    prerequisites: [
      "Core Python syntax: lists, nested loops, functions, classes, and custom exceptions",
      "Basic understanding of 1D arrays (vectors) and 2D grids (matrices)",
    ],
    requiredMathConcepts: [
      "Vectors and vector dimensions (ℝⁿ)",
      "Matrices and matrix dimensions (ℝᵐˣⁿ)",
      "Elementwise addition, subtraction, and scalar multiplication",
      "Inner (dot) product of two equal-length vectors",
      "Matrix multiplication rule (Cᵢⱼ = ∑ₖ Aᵢₖ Bₖⱼ) and inner dimension compatibility",
      "Matrix transposition ((Aᵀ)ᵢⱼ = Aⱼᵢ)",
      "Floating-point precision and relative/absolute numerical tolerance",
    ],
    learningObjectives: [
      "Design clean, immutable or well-validated Vector and Matrix classes in pure Python.",
      "Enforce strict dimensionality checks and raise descriptive ValueError exceptions on shape mismatches.",
      "Implement vector addition, scalar multiplication, dot products, matrix addition, transpose, and matrix multiplication without external libraries.",
      "Verify numerical correctness across edge cases (rectangular, square, identity, and zero matrices) against NumPy.",
    ],
    skillsPracticed: [
      "Pure-Python data structure design",
      "Matrix dimension & shape invariant validation",
      "Triple-loop O(m·k·n) matrix multiplication",
      "Automated numerical unit testing with pytest & NumPy",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "Core Data Structures & Shape Validation",
        summary:
          "Define Vector and Matrix representations and validate row/column regularity.",
        taskIds: ["p1-t01", "p1-t02"],
      },
      {
        stageNumber: 2,
        title: "Vector Operations & Inner Products",
        summary:
          "Implement elementwise vector arithmetic, scalar scaling, and dot products.",
        taskIds: ["p1-t03", "p1-t04", "p1-t05"],
      },
      {
        stageNumber: 3,
        title: "Matrix Arithmetic, Transpose & Multiplication",
        summary:
          "Build 2D matrix addition, transposition, and pure-Python matrix multiplication with dimension guards.",
        taskIds: ["p1-t06", "p1-t07", "p1-t08", "p1-t09"],
      },
      {
        stageNumber: 4,
        title: "NumPy Verification, Unit Testing & Documentation",
        summary:
          "Verify outputs against NumPy, build a comprehensive pytest suite, and document your API.",
        taskIds: ["p1-t10", "p1-t11", "p1-t12"],
      },
    ],
    tasks: [
      {
        id: "p1-t01",
        stepNumber: 1,
        title: "Create vector and matrix data structures",
        explanation:
          "A reliable linear algebra library starts with clear representations for 1D vectors (`list[float]`) and 2D matrices (`list[list[float]]`) that expose `.shape` properties.",
        instructions:
          "Create `Vector` and `Matrix` classes (or structured types) in `linalg/core.py`. Store elements as floats, implement `__repr__`, `__len__`, indexing (`__getitem__`), and a `.shape` property returning `(n,)` for vectors and `(rows, cols)` for matrices.",
        expectedOutcome:
          "Instantiating `Vector([1, 2, 3])` exposes `.shape == (3,)` and `Matrix([[1, 2], [3, 4]])` exposes `.shape == (2, 2)`.",
        acceptanceCriteria:
          "Both classes defensive-copy input lists so mutating the caller's list does not corrupt internal matrix state.",
        difficulty: "Core",
      },
      {
        id: "p1-t02",
        stepNumber: 2,
        title: "Validate matrix dimensions",
        explanation:
          "Jagged nested lists like `[[1, 2], [3]]` are not valid matrices and will cause index errors during multiplication.",
        instructions:
          "In `Matrix.__init__`, check that the input is non-empty, contains only numeric values (`int` or `float`), and that every row has the exact same length. Raise a descriptive `ValueError` if any row length differs.",
        expectedOutcome:
          "Passing a ragged list `[[1, 2, 3], [4, 5]]` immediately raises `ValueError` with a message explaining the row length mismatch.",
        acceptanceCriteria:
          "All invalid shapes (empty list `[]`, empty row `[[]]`, jagged rows) are rejected at construction time.",
        difficulty: "Core",
      },
      {
        id: "p1-t03",
        stepNumber: 3,
        title: "Implement vector addition",
        explanation:
          "Vector addition combines two vectors of equal dimension component-by-component: `(u + v)_i = u_i + v_i`. It is used in bias addition and residual connections.",
        instructions:
          "Implement `vector_add(u: Vector, v: Vector) -> Vector` (and ` vector_sub`) in pure Python. Verify that `u.shape == v.shape` before summing corresponding elements.",
        expectedOutcome:
          "`vector_add(Vector([1.0, -2.0, 3.5]), Vector([4.0, 2.0, 0.5]))` returns `Vector([5.0, 0.0, 4.0])`.",
        acceptanceCriteria:
          "Adding two vectors of different lengths raises a `ValueError`.",
        difficulty: "Core",
      },
      {
        id: "p1-t04",
        stepNumber: 4,
        title: "Implement scalar multiplication",
        explanation:
          "Multiplying a vector or matrix by a scalar `alpha` scales every entry by `alpha` without changing its dimensions.",
        instructions:
          "Implement `scalar_multiply_vector(alpha: float, v: Vector) -> Vector` and `scalar_multiply_matrix(alpha: float, m: Matrix) -> Matrix`.",
        expectedOutcome:
          "Scaling `Matrix([[1, -2], [3, 0]])` by `2.5` returns `Matrix([[2.5, -5.0], [7.5, 0.0]])`.",
        acceptanceCriteria:
          "Multiplying by `0.0` yields a zero vector/matrix of identical shape; multiplying by `1.0` preserves all entries.",
        difficulty: "Core",
      },
      {
        id: "p1-t05",
        stepNumber: 5,
        title: "Implement dot product",
        explanation:
          "The dot product `u · v = ∑ u_i * v_i` measures alignment between two vectors and forms the core computation of every artificial neuron and matrix multiply.",
        instructions:
          "Implement `dot(u: Vector, v: Vector) -> float`. Validate equal lengths, multiply paired components, and return the accumulated float sum.",
        expectedOutcome:
          "`dot(Vector([1, 3, -5]), Vector([4, -2, -1]))` returns `3.0`.",
        acceptanceCriteria:
          "Orthogonal vectors return `0.0`; mismatched vector lengths raise `ValueError`.",
        hint: "Use `sum(a * b for a, b in zip(u.data, v.data))` after checking `len(u) == len(v)`.",
        difficulty: "Core",
      },
      {
        id: "p1-t06",
        stepNumber: 6,
        title: "Implement matrix addition",
        explanation:
          "Two matrices `A` and `B` can be added or subtracted if and only if they have identical `(rows, cols)` dimensions.",
        instructions:
          "Implement `matrix_add(A: Matrix, B: Matrix) -> Matrix` and `matrix_sub(A: Matrix, B: Matrix) -> Matrix`. Check `A.shape == B.shape` and return a new `Matrix` containing the elementwise sum or difference.",
        expectedOutcome:
          "Elementwise sum of two `(2, 3)` matrices produces a new `(2, 3)` matrix with exact sums.",
        acceptanceCriteria:
          "Attempting to add a `(2, 3)` matrix and a `(3, 2)` matrix raises `ValueError`.",
        difficulty: "Core",
      },
      {
        id: "p1-t07",
        stepNumber: 7,
        title: "Implement matrix transpose",
        explanation:
          "Transposing an `(m, n)` matrix flips its rows and columns into an `(n, m)` matrix where `(Aᵀ)_{j,i} = A_{i,j}`.",
        instructions:
          "Implement `transpose(A: Matrix) -> Matrix` (and `.T` property). Ensure rectangular matrices of shape `(m, n)` become `(n, m)`.",
        expectedOutcome:
          "Transposing a `(2, 4)` matrix yields a `(4, 2)` matrix; transposing twice `A.T.T` restores `A`.",
        acceptanceCriteria:
          "Works for square `(n, n)`, row `(1, n)`, and column `(n, 1)` matrices.",
        difficulty: "Core",
      },
      {
        id: "p1-t08",
        stepNumber: 8,
        title: "Implement matrix multiplication without NumPy",
        explanation:
          "For `A` of shape `(m, k)` and `B` of shape `(k, n)`, entry `(i, j)` of `C = A @ B` is the dot product of row `i` of `A` with column `j` of `B`, producing an `(m, n)` matrix.",
        instructions:
          "Implement `matmul(A: Matrix, B: Matrix) -> Matrix` using pure Python loops (no NumPy). Pre-transpose `B` or iterate over `i in range(m)`, `j in range(n)`, `p in range(k)` to compute each entry.",
        expectedOutcome:
          "Multiplying a `(3, 4)` matrix by a `(4, 2)` matrix produces the exact `(3, 2)` product matrix.",
        acceptanceCriteria:
          "Multiplying any matrix `A` by the appropriate identity matrix `I` returns `A` unchanged.",
        hint: "Pre-computing `B_T = B.transpose()` lets you compute `C[i][j]` as the dot product of `A.row(i)` and `B_T.row(j)` cleanly.",
        difficulty: "Intermediate",
      },
      {
        id: "p1-t09",
        stepNumber: 9,
        title: "Handle incompatible dimensions gracefully",
        explanation:
          "Clear dimension error messages save hours of debugging when chaining linear transformations.",
        instructions:
          "Audit all vector and matrix operations (`vector_add`, `dot`, `matrix_add`, `matmul`) so that any shape mismatch raises a `ValueError` that includes both actual shapes in the error string (e.g., `Cannot multiply (2, 3) by (2, 3): inner dimensions 3 != 2`).",
        expectedOutcome:
          "Every invalid operation raises a descriptive `ValueError` instead of a generic `IndexError`.",
        acceptanceCriteria:
          "Unit tests explicitly assert that `pytest.raises(ValueError)` triggers on incompatible shapes.",
        difficulty: "Core",
      },
      {
        id: "p1-t10",
        stepNumber: 10,
        title: "Compare outputs with NumPy",
        explanation:
          "Floating-point arithmetic can differ by ~1e-15 due to operation ordering. Comparing against `numpy` with `np.allclose` validates numerical accuracy.",
        instructions:
          "Write a verification helper `verify_against_numpy()` that generates random rectangular, square, identity, and zero matrices, runs your pure-Python operations, and compares the output against `np.dot`, `np.matmul`, and `.T` using `np.testing.assert_allclose(..., rtol=1e-6, atol=1e-8)`.",
        expectedOutcome:
          "100% of randomized and edge-case comparisons match NumPy within `1e-6` relative tolerance.",
        acceptanceCriteria:
          "NumPy is imported only inside test/verification files, keeping the core library 100% pure Python.",
        difficulty: "Core",
      },
      {
        id: "p1-t11",
        stepNumber: 11,
        title: "Write unit tests",
        explanation:
          "A structured test suite ensures edge cases remain unbroken as you extend your library.",
        instructions:
          "Create `tests/test_linalg.py` using `pytest`. Include tests for rectangular `(2, 5) @ (5, 3)`, square `(4, 4)`, identity `I_n`, zero matrices, negative numbers, and invalid dimension exceptions.",
        expectedOutcome:
          "Running `pytest` executes all test cases with 0 failures.",
        acceptanceCriteria:
          "At least 12 distinct test functions covering valid math, boundary shapes `(1, 1)`, and shape errors.",
        difficulty: "Core",
      },
      {
        id: "p1-t12",
        stepNumber: 12,
        title: "Document the implementation",
        explanation:
          "Clear docstrings and complexity notes make your library reusable in later phases.",
        instructions:
          "Add type annotations, docstrings specifying input/output shapes and time complexity (`O(n)` for dot product, `O(m·k·n)` for matmul), and a `README.md` showing usage examples and benchmark comparisons against NumPy.",
        expectedOutcome:
          "A complete, well-documented Python package with usage examples and complexity analysis.",
        acceptanceCriteria:
          "`README.md` includes installation/test instructions and a brief explanation of why vectorized C buffers in NumPy outperform pure Python loops.",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "Correct results for all valid vector and matrix input shapes.",
      "Clear, descriptive ValueError exceptions raised for any incompatible shapes.",
      "Automated unit tests covering rectangular, square, identity, and zero matrices.",
      "Numerical verification against NumPy passing with `np.testing.assert_allclose`.",
    ],
    testingGuide: {
      summary:
        "Run your pytest suite to verify algebraic identities, shape error handling, and floating-point equivalence against NumPy.",
      verificationCommand: "pytest tests/test_linalg.py -v",
      testCases: [
        {
          title: "Identity Matrix Multiplication Invariant",
          purpose:
            "Verify that multiplying an (m, n) matrix A by I_n on the right and I_m on the left returns A.",
          verificationSteps:
            "Construct a (3, 5) matrix A and 5x5 identity matrix I_5. Compute matmul(A, I_5) and assert equality with A.",
          expectedResult: "Output shape is (3, 5) and all elements exactly equal A.",
        },
        {
          title: "Incompatible Inner Dimensions Guard",
          purpose:
            "Confirm that matmul((2, 3), (2, 3)) fails cleanly before partial computation.",
          verificationSteps:
            "Call matmul(Matrix([[1, 2, 3], [4, 5, 6]]), Matrix([[1, 2, 3], [4, 5, 6]])) inside pytest.raises(ValueError).",
          expectedResult: "Raises ValueError mentioning inner dimensions 3 and 2.",
        },
        {
          title: "Rectangular Matrix Multiplication vs NumPy",
          purpose:
            "Validate triple-loop indexing on non-square dimensions (4, 7) @ (7, 2).",
          verificationSteps:
            "Generate random floats for A (4, 7) and B (7, 2), compute matmul(A, B), and compare with np.matmul(A_np, B_np).",
          expectedResult: "Maximum absolute difference < 1e-12.",
        },
      ],
    },
    codeExamples: [
      {
        title: "Shape Validation & Pure-Python Matrix Multiplication Skeleton",
        language: "python",
        purpose:
          "Demonstrates how to validate 2D matrix regularity and structure the inner dimension check for matrix multiplication.",
        code: `class Matrix:
    def __init__(self, rows: list[list[float]]) -> None:
        if not rows or not rows[0]:
            raise ValueError("Matrix must contain at least one non-empty row.")
        num_cols = len(rows[0])
        cleaned: list[list[float]] = []
        for r_idx, row in enumerate(rows):
            if len(row) != num_cols:
                raise ValueError(
                    f"Row {r_idx} has length {len(row)}, expected {num_cols}."
                )
            cleaned.append([float(val) for val in row])
        self._data = cleaned
        self.shape = (len(cleaned), num_cols)

    def matmul(self, other: "Matrix") -> "Matrix":
        m, k1 = self.shape
        k2, n = other.shape
        if k1 != k2:
            raise ValueError(
                f"Incompatible shapes for matmul: {self.shape} and {other.shape} (inner dims {k1} != {k2})"
            )
        # Compute C[i][j] = sum_p A[i][p] * B[p][j]
        result = [
            [
                sum(self._data[i][p] * other._data[p][j] for p in range(k1))
                for j in range(n)
            ]
            for i in range(m)
        ]
        return Matrix(result)`,
      },
    ],
    hints: [
      {
        id: "p1-h1",
        title: "Matrix Multiplication Dimension Formula",
        category: "Mathematical Formula",
        content:
          "If A has shape (m, k) and B has shape (k, n), their product C = AB is defined if and only if the inner dimensions match (k == k). The resulting matrix C always has outer dimensions (m, n), and entry C[i][j] = sum_{p=0}^{k-1} A[i][p] * B[p][j].",
      },
      {
        id: "p1-h2",
        title: "Avoiding Shared Row References Bug",
        category: "Common Mistake",
        content:
          "Never initialize a 2D zero matrix in Python using `[[0.0] * cols] * rows`! That creates `rows` references to the exact same inner list, so modifying `M[0][1]` mutates every row simultaneously. Always use a list comprehension: `[[0.0 for _ in range(cols)] for _ in range(rows)]`.",
      },
    ],
    optionalChallenges: [
      {
        id: "p1-oc1",
        title: "Support Batched 3D Matrix Multiplication",
        description:
          "Extend your engine to multiply batched 3D tensors of shape (B, M, K) and (B, K, N) producing (B, M, N), mirroring how Transformer attention processes batches of sequences.",
        whatYouLearn:
          "How batch dimensions wrap standard 2D linear algebra operations in deep learning.",
      },
      {
        id: "p1-oc2",
        title: "Vector Norms & Cosine Similarity",
        description:
          "Implement L1 norm, L2 Euclidean norm, and cosine similarity `cos(θ) = (u · v) / (||u||_2 ||v||_2)` with zero-norm guards.",
        whatYouLearn:
          "How embedding similarity search and vector databases compare semantic representations.",
      },
    ],
    expectedDeliverable: "A reusable Python matrix operations library.",
    deliverablesList: [
      "Pure-Python `linalg` module with `Vector` and `Matrix` classes",
      "Automated `pytest` verification suite comparing outputs with NumPy",
      "README documentation with API examples and complexity analysis",
    ],
    learningOutcomes: [
      "Implement vector addition, scalar multiplication, dot products, transposes, and matrix multiplication from scratch in pure Python.",
      "Predict output dimensions and diagnose shape mismatches across chained linear transformations.",
      "Write automated numerical unit tests using floating-point tolerances against a reference library.",
      "Explain why contiguous C memory buffers in NumPy outperform pure-Python nested loops.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "matrix-operations-engine",
      recommendedStructure: [
        "linalg/__init__.py",
        "linalg/core.py",
        "tests/test_linalg.py",
        "README.md",
      ],
      readmeChecklist: [
        "Overview of implemented vector and matrix operations",
        "How to run the pytest verification suite against NumPy",
        "Time complexity table and pure-Python vs NumPy timing comparison",
      ],
    },
    relatedResourceIds: [
      "harvard-cs50-python",
      "numpy-learning-resources",
      "mit-18-06sc-linear-algebra",
      "3blue1brown-essence-of-linear-algebra",
    ],
    relatedModuleIds: ["p0-m1", "p0-m3", "p1-m1"],
    relatedProjectIds: [
      "milestone-02-linear-regression",
      "milestone-04-autograd-engine",
      "milestone-05-neural-network-scratch",
    ],
  },

  // ============================================================================
  // PROJECT 2 — LINEAR REGRESSION FROM SCRATCH
  // ============================================================================
  {
    id: "milestone-02-linear-regression",
    slug: "linear-regression-from-scratch",
    milestoneNumber: 2,
    title: "Linear Regression From Scratch",
    subtitle:
      "Derive analytical gradients and train a regression model via gradient descent",
    shortDescription:
      "Train a regression model without using a predefined machine-learning estimator—implementing linear predictions, Mean Squared Error loss, manual analytical gradients, gradient descent optimization, loss curve visualization, and held-out evaluation.",
    detailedOverview:
      "Linear regression is the foundational prototype of supervised machine learning: you define a parameterized hypothesis `ŷ = Xw + b`, measure prediction error with a differentiable loss function (Mean Squared Error), derive the partial derivatives `∂L/∂w` and `∂L/∂b` using multivariable calculus, and iteratively step weights opposite the gradient until the loss converges. In this project, you will implement the entire training, validation, and diagnostic visualization pipeline from scratch using Python, NumPy, and Matplotlib—without calling `sklearn.linear_model` during training.",
    whyThisProjectMatters:
      "The training loop you build here—forward prediction, scalar loss computation, analytical gradient computation, parameter update `θ ← θ - η∇L`, and held-out validation tracking—is identical in structure to the training loop of a 70-billion-parameter language model.",
    phase: 1,
    difficulty: "foundational",
    difficultyFilter: "Beginner",
    difficultyLabel: "Beginner → Intermediate",
    estimatedEffort: "10–14 hours · 1–2 weeks",
    technologies: ["Python", "NumPy", "Matplotlib"],
    prerequisites: [
      "Project 1 (Matrix Operations Engine) or fluency with NumPy array shapes and dot products",
      "Partial derivatives and the chain rule from Phase 1 Calculus",
    ],
    requiredMathConcepts: [
      "Linear hypothesis function: ŷ = Xw + b",
      "Mean Squared Error (MSE): L(w, b) = (1/N) ∑ᵢ (ŷᵢ - yᵢ)²",
      "Analytical weight gradient: ∂L/∂w = (2/N) Xᵀ(Xw + b - y)",
      "Analytical bias gradient: ∂L/∂b = (2/N) ∑ᵢ (ŷᵢ - yᵢ)",
      "Gradient descent update rule and learning rate η sensitivity",
      "Train/validation split and feature standardization",
    ],
    learningObjectives: [
      "Derive and implement the exact vectorized gradients of Mean Squared Error with respect to weights and bias.",
      "Build an iterative gradient descent optimizer and diagnose convergence, underfitting, and divergence across learning rates.",
      "Plot training and validation loss curves and regression fit lines using Matplotlib.",
      "Verify your trained parameters and held-out MSE/R² metrics against a reference library implementation.",
    ],
    skillsPracticed: [
      "Analytical gradient derivation & vectorization",
      "Iterative gradient descent optimization",
      "Learning rate experimentation & loss curve plotting",
      "Held-out evaluation & finite-difference gradient checking",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "Data Generation, Exploration & Visualization",
        summary:
          "Create or load a regression dataset, split into train/validation sets, and visualize feature-target relationships.",
        taskIds: ["p2-t01", "p2-t02"],
      },
      {
        stageNumber: 2,
        title: "Forward Model, MSE Loss & Manual Gradient Derivation",
        summary:
          "Implement vectorized linear predictions, MSE loss, and exact analytical gradients.",
        taskIds: ["p2-t03", "p2-t04", "p2-t05"],
      },
      {
        stageNumber: 3,
        title: "Gradient Descent Training & Loss Curve Diagnostics",
        summary:
          "Implement the gradient descent loop, train the model, and plot training/validation loss convergence.",
        taskIds: ["p2-t06", "p2-t07", "p2-t08"],
      },
      {
        stageNumber: 4,
        title: "Held-Out Evaluation, Library Comparison & LR Experiments",
        summary:
          "Evaluate on unseen test data, compare against closed-form/scikit-learn baselines, test learning rate regimes, and document derivations.",
        taskIds: ["p2-t09", "p2-t10", "p2-t11", "p2-t12"],
      },
    ],
    tasks: [
      {
        id: "p2-t01",
        stepNumber: 1,
        title: "Generate or load a small dataset",
        explanation:
          "Starting with a synthetic dataset with known ground-truth weights `w_true` and Gaussian noise `ε` lets you verify whether your optimizer recovers the exact underlying parameters.",
        instructions:
          "Generate a reproducible synthetic dataset `y = X @ w_true + b_true + noise` using `np.random.default_rng(42)` (and optionally load a real tabular CSV dataset). Split the data into 80% training and 20% validation/test sets, and standardize features using training-set mean and standard deviation only.",
        expectedOutcome:
          "Clean `X_train, y_train, X_val, y_val` arrays with zero data leakage between splits.",
        acceptanceCriteria:
          "Validation features are normalized using `mean(X_train)` and `std(X_train)`, never `mean(X_val)`.",
        difficulty: "Core",
      },
      {
        id: "p2-t02",
        stepNumber: 2,
        title: "Visualize the data",
        explanation:
          "Inspecting raw scatter plots reveals scale differences, outliers, and linear trends before training begins.",
        instructions:
          "Use Matplotlib to plot feature vs. target scatter plots and target value histograms, saving the figure to `plots/data_distribution.png`.",
        expectedOutcome:
          "Readable scatter plot with labeled axes, legend, and title.",
        acceptanceCriteria:
          "Plot clearly distinguishes training points from validation points.",
        difficulty: "Core",
      },
      {
        id: "p2-t03",
        stepNumber: 3,
        title: "Implement the prediction function",
        explanation:
          "The linear hypothesis computes `ŷ = X @ w + b` across a batch of `N` examples and `D` features simultaneously.",
        instructions:
          "Implement `predict(X: np.ndarray, w: np.ndarray, b: float) -> np.ndarray` returning a 1D array of shape `(N,)`.",
        expectedOutcome:
          "For `X` of shape `(100, 3)` and `w` of shape `(3,)`, `predict(X, w, b)` returns shape `(100,)`.",
        acceptanceCriteria:
          "No Python `for` loops over samples; uses vectorized matrix-vector multiplication.",
        difficulty: "Core",
      },
      {
        id: "p2-t04",
        stepNumber: 4,
        title: "Implement MSE loss",
        explanation:
          "Mean Squared Error `L = (1/N) ∑ (ŷ_i - y_i)²` penalizes large residuals quadratically and has a unique global minimum for linear models.",
        instructions:
          "Implement `mse_loss(y_pred: np.ndarray, y_true: np.ndarray) -> float` using vectorized array operations.",
        expectedOutcome:
          "Returns `0.0` when `y_pred == y_true` and strictly positive float otherwise.",
        acceptanceCriteria:
          "Matches `np.mean((y_pred - y_true) ** 2)` to machine precision.",
        difficulty: "Core",
      },
      {
        id: "p2-t05",
        stepNumber: 5,
        title: "Derive gradients manually",
        explanation:
          "Applying the chain rule to `L(w, b) = (1/N) ||Xw + b - y||₂²` yields the exact gradient vector `dw` and scalar `db`.",
        instructions:
          "Derive `∂L/∂w = (2/N) X.T @ (y_pred - y_true)` and `∂L/∂b = (2/N) np.sum(y_pred - y_true)` on paper/markdown, then implement `compute_gradients(X, y_true, y_pred) -> tuple[np.ndarray, float]`. Verify your analytical gradients against central finite differences `[L(θ+ε) - L(θ-ε)] / (2ε)`.",
        expectedOutcome:
          "`dw` has shape `(D,)`, `db` is a scalar float, and relative error vs finite differences is `< 1e-7`.",
        acceptanceCriteria:
          "Includes a finite-difference gradient check test confirming the manual derivation is bug-free.",
        hint: "Let `error = y_pred - y_true` of shape `(N,)`. Then `dw = (2.0 / N) * (X.T @ error)` and `db = (2.0 / N) * float(np.sum(error))`.",
        difficulty: "Intermediate",
      },
      {
        id: "p2-t06",
        stepNumber: 6,
        title: "Implement gradient descent",
        explanation:
          "Gradient descent iteratively updates parameters opposite the gradient: `w ← w - lr * dw`, `b ← b - lr * db`.",
        instructions:
          "Implement a `LinearRegressionScratch` class or `fit_gradient_descent(X_train, y_train, X_val, y_val, lr, epochs)` function that initializes `w = np.zeros(D)` and `b = 0.0`, computes gradients each epoch, updates parameters, and records train/val MSE history.",
        expectedOutcome:
          "Returns trained `(w, b)` and lists `train_losses`, `val_losses` of length `epochs`.",
        acceptanceCriteria:
          "Training loss decreases monotonically when given a well-chosen learning rate.",
        difficulty: "Core",
      },
      {
        id: "p2-t07",
        stepNumber: 7,
        title: "Train the model",
        explanation:
          "Running the training loop to convergence on standardized features recovers the true linear relationship.",
        instructions:
          "Train your model on the training split for 500–1,000 epochs and print periodic progress logs (`Epoch | Train MSE | Val MSE`).",
        expectedOutcome:
          "Trained weights `w` and bias `b` converge closely to the ground-truth data generating parameters.",
        acceptanceCriteria:
          "Final training MSE is within 1% of the irreducible noise variance `σ²` on synthetic data.",
        difficulty: "Core",
      },
      {
        id: "p2-t08",
        stepNumber: 8,
        title: "Plot the loss curve",
        explanation:
          "Loss curves immediately reveal whether optimization converged smoothly, plateaued early, or diverged.",
        instructions:
          "Plot `train_losses` and `val_losses` vs. epoch number on a Matplotlib figure, along with a plot of the fitted regression line over the data points. Save to `plots/loss_curve.png`.",
        expectedOutcome:
          "Clean two-panel diagnostic plot showing exponential loss decay and final regression fit.",
        acceptanceCriteria:
          "Both training and validation curves are labeled and plotted on the same axes.",
        difficulty: "Core",
      },
      {
        id: "p2-t09",
        stepNumber: 9,
        title: "Evaluate on held-out data",
        explanation:
          "Reporting MSE, Root Mean Squared Error (RMSE), Mean Absolute Error (MAE), and R² coefficient of determination on unseen data measures true generalization.",
        instructions:
          "Implement `evaluate_metrics(y_true, y_pred)` computing MSE, RMSE, MAE, and `R² = 1 - SS_res / SS_tot` on the held-out test set.",
        expectedOutcome:
          "Structured evaluation dictionary/report printed for the held-out test set.",
        acceptanceCriteria:
          "Metrics are computed strictly on held-out data not used during gradient updates.",
        difficulty: "Core",
      },
      {
        id: "p2-t10",
        stepNumber: 10,
        title: "Compare with a library implementation",
        explanation:
          "Comparing your gradient-descent solution with the closed-form Normal Equation `w = (XᵀX)⁻¹Xᵀy` or `np.linalg.lstsq` / `scikit-learn` confirms your optimizer reached the global optimum.",
        instructions:
          "Fit `np.linalg.lstsq` (or `sklearn.linear_model.LinearRegression`) on the same training split and compare learned weights `w`, bias `b`, and validation MSE against your gradient descent model.",
        expectedOutcome:
          "Learned parameters `(w, b)` match the closed-form/library solution within `1e-4`.",
        acceptanceCriteria:
          "Comparison table printed in terminal and documented in README.",
        difficulty: "Core",
      },
      {
        id: "p2-t11",
        stepNumber: 11,
        title: "Test different learning rates",
        explanation:
          "If `η` is too small, training crawls; if `η > 2 / λ_max(XᵀX/N)`, gradient descent oscillates and diverges to `NaN`/`Inf`.",
        instructions:
          "Run an experiment with 4 learning rates (e.g., `1e-4`, `1e-2`, `1e-1`, and an unstable large rate like `1.5`) and plot all 4 loss trajectories on a single comparison chart.",
        expectedOutcome:
          "Multi-curve plot demonstrating slow convergence, optimal convergence, and oscillatory divergence.",
        acceptanceCriteria:
          "Document why the largest learning rate overshoots the quadratic bowl minimum.",
        difficulty: "Intermediate",
      },
      {
        id: "p2-t12",
        stepNumber: 12,
        title: "Document mathematical derivations",
        explanation:
          "Writing out the matrix calculus derivation cements your understanding before moving to multilayer backpropagation.",
        instructions:
          "Document the step-by-step derivation of `∂L/∂w` and `∂L/∂b`, your finite-difference check results, and your learning rate sensitivity findings in `README.md`.",
        expectedOutcome:
          "Comprehensive documentation combining mathematical derivations, plots, and evaluation tables.",
        acceptanceCriteria:
          "Includes explicit tensor shapes for `X`, `w`, `b`, `y`, `dw`, and `db`.",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "Linear prediction, MSE loss, and gradient descent implemented from scratch without predefined ML estimators.",
      "Analytical gradients verified against numerical finite differences within 1e-7.",
      "Loss curve and regression fit visualizations generated and saved.",
      "Trained weights and test MSE verified against closed-form lstsq or scikit-learn baseline.",
    ],
    testingGuide: {
      summary:
        "Verify analytical gradient accuracy via finite differences and assert that gradient descent recovers exact synthetic parameters.",
      verificationCommand: "pytest tests/test_linear_regression.py -v",
      testCases: [
        {
          title: "Finite-Difference Gradient Verification",
          purpose:
            "Prove that analytical dw and db match numerical central differences.",
          verificationSteps:
            "Perturb each weight w[j] by ±eps (eps=1e-6), compute (L_plus - L_minus)/(2*eps), and compare with dw[j].",
          expectedResult: "Relative error between analytical and numerical gradients < 1e-7.",
        },
        {
          title: "Noiseless Parameter Recovery Test",
          purpose:
            "Confirm optimizer converges to exact ground-truth weights when noise is zero.",
          verificationSteps:
            "Generate y = X @ [3.5, -1.2] + 0.75 with zero noise. Train for 800 epochs at lr=0.1.",
          expectedResult: "Recovered w matches [3.5, -1.2] and b matches 0.75 within 1e-4; MSE < 1e-8.",
        },
      ],
    },
    codeExamples: [
      {
        title: "Vectorized MSE Loss & Analytical Gradients in NumPy",
        language: "python",
        purpose:
          "Shows the exact vectorized forward pass, MSE computation, and analytical gradient equations.",
        code: `import numpy as np

def forward_and_gradients(
    X: np.ndarray, y: np.ndarray, w: np.ndarray, b: float
) -> tuple[float, np.ndarray, float]:
    """
    X: (N, D) feature matrix
    y: (N,) target vector
    w: (D,) weight vector
    b: scalar bias
    """
    n_samples = X.shape[0]
    y_pred = X @ w + b                      # Shape: (N,)
    residuals = y_pred - y                  # Shape: (N,)
    loss = float(np.mean(residuals ** 2))   # Scalar MSE
    dw = (2.0 / n_samples) * (X.T @ residuals)  # Shape: (D,)
    db = (2.0 / n_samples) * float(np.sum(residuals))
    return loss, dw, db`,
      },
    ],
    hints: [
      {
        id: "p2-h1",
        title: "Why Feature Standardization Dramatically Speeds Up Convergence",
        category: "Mathematical Formula",
        content:
          "When one feature has range [0, 1] and another has range [0, 10000], the MSE loss surface forms a steep, elongated canyon. Gradient descent bounces across the narrow walls unless the learning rate is tiny. Standardizing each feature to zero mean and unit variance makes the loss contours nearly spherical.",
      },
      {
        id: "p2-h2",
        title: "Accidental 2D Broadcast Shape Bug `(N, 1) - (N,)`",
        category: "Common Mistake",
        content:
          "In NumPy, subtracting a 1D array of shape `(N,)` from a 2D column vector of shape `(N, 1)` broadcasts into an `(N, N)` matrix! Always keep both `y_pred` and `y_true` consistently shaped as 1D `(N,)` arrays (or both `(N, 1)`).",
      },
    ],
    optionalChallenges: [
      {
        id: "p2-oc1",
        title: "Add L2 (Ridge) and L1 (Lasso) Regularization",
        description:
          "Extend your loss and gradient functions to support L2 penalty `λ||w||₂²` (`dw += 2λw`) and L1 subgradient penalty `λ||w||₁` (`dw += λ * np.sign(w)`).",
        whatYouLearn:
          "How weight decay prevents overfitting on collinear or high-dimensional features.",
      },
      {
        id: "p2-oc2",
        title: "Mini-Batch Stochastic Gradient Descent",
        description:
          "Implement shuffled mini-batch iteration (`batch_size=32`) and compare its noisy loss trajectory against full-batch gradient descent.",
        whatYouLearn:
          "How stochastic mini-batching works in deep neural network training loops.",
      },
    ],
    expectedDeliverable: "A complete linear regression training pipeline.",
    deliverablesList: [
      "From-scratch NumPy linear regression trainer with gradient checking",
      "Diagnostic loss curve and learning-rate comparison plots",
      "Evaluation report comparing custom gradient descent against closed-form/library baseline",
    ],
    learningOutcomes: [
      "Derive and vectorize analytical gradients of Mean Squared Error loss with respect to weights and biases.",
      "Implement gradient descent from scratch and verify gradients using central finite differences.",
      "Diagnose learning-rate instability, feature scaling effects, and train vs. validation generalization.",
      "Compare iterative gradient-based optimization against closed-form linear algebra solutions.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "linear-regression-from-scratch",
      recommendedStructure: [
        "regression/model.py",
        "regression/metrics.py",
        "plots/loss_curve.png",
        "tests/test_linear_regression.py",
        "README.md",
      ],
      readmeChecklist: [
        "Mathematical derivation of ∂L/∂w and ∂L/∂b",
        "Loss convergence plot and learning-rate sensitivity chart",
        "Held-out MSE/R² comparison table against closed-form / scikit-learn",
      ],
    },
    relatedResourceIds: [
      "mit-18-02sc-multivariable-calculus",
      "3blue1brown-essence-of-calculus",
      "mathematics-for-machine-learning-book",
      "matplotlib-tutorials",
    ],
    relatedModuleIds: ["p1-m2", "p1-m4", "p2-m2"],
    relatedProjectIds: [
      "milestone-01-matrix-operations-engine",
      "milestone-03-spam-classifier",
      "milestone-05-neural-network-scratch",
    ],
  },

  // ============================================================================
  // PROJECT 3 — SPAM CLASSIFIER
  // ============================================================================
  {
    id: "milestone-03-spam-classifier",
    slug: "spam-classifier",
    milestoneNumber: 3,
    title: "Spam Classifier",
    subtitle:
      "Build an end-to-end text classification pipeline with Precision, Recall, and F1 analysis",
    shortDescription:
      "Create a supervised classifier that identifies spam messages—implementing text cleaning, Bag-of-Words / TF-IDF feature extraction, Multinomial Naive Bayes or Logistic Regression from scratch, and full classification error analysis.",
    detailedOverview:
      "Before deep neural networks, statistical text classification powered spam filters, document routing, and sentiment analysis—and its core concepts (tokenization, vocabulary indexing, log-probabilities, binary cross-entropy, and Precision/Recall tradeoffs) remain essential in modern LLM pipelines. In this project, you will build a complete spam classification system from raw text messages to calibrated probability predictions. You will preprocess text, extract Bag-of-Words or TF-IDF features, implement Multinomial Naive Bayes (with Laplace smoothing in log-space) or binary Logistic Regression from scratch in NumPy, evaluate Precision, Recall, and F1 on a stratified test split, inspect false positives and false negatives, and benchmark against `scikit-learn`.",
    whyThisProjectMatters:
      "Accuracy alone is misleading on imbalanced datasets (if 87% of messages are legitimate ham, predicting 'ham' every time gets 87% accuracy with 0% spam recall). Building a spam filter teaches you how to build leak-free text vocabularies, prevent underflow with log-probabilities, and tune decision thresholds using Precision and Recall.",
    phase: 2,
    difficulty: "intermediate",
    difficultyFilter: "Intermediate",
    difficultyLabel: "Intermediate",
    estimatedEffort: "12–16 hours · 1–2 weeks",
    technologies: ["Python", "NumPy", "scikit-learn"],
    prerequisites: [
      "Phase 1 Probability & Statistics (conditional probability, Bayes' theorem, log-likelihood)",
      "Phase 2 Supervised Learning fundamentals (train/test splits, overfitting, classification metrics)",
    ],
    requiredMathConcepts: [
      "Bayes' Theorem and conditional independence: P(y | x₁,…,x_T) ∝ P(y) ∏_t P(x_t | y)",
      "Log-space computation to prevent floating-point underflow: log P(y) + ∑_t log P(x_t | y)",
      "Laplace (add-α) smoothing for unseen vocabulary words",
      "Logistic sigmoid σ(z) = 1 / (1 + e⁻ᶻ) and Binary Cross-Entropy loss",
      "Confusion Matrix (TP, FP, TN, FN), Precision, Recall, and F1 harmonic mean",
    ],
    learningObjectives: [
      "Inspect class imbalance and construct a stratified train/validation/test split without vocabulary leakage.",
      "Convert variable-length text messages into numerical Bag-of-Words count vectors or TF-IDF matrices.",
      "Implement Multinomial Naive Bayes or binary Logistic Regression from scratch in NumPy.",
      "Compute Precision, Recall, F1, and confusion matrices, analyze misclassified messages, and compare with a scikit-learn baseline.",
    ],
    skillsPracticed: [
      "Text normalization & vocabulary construction",
      "Bag-of-Words & TF-IDF vectorization",
      "Log-space Naive Bayes / Logistic Regression implementation",
      "Precision, Recall, F1 & misclassification error analysis",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "Dataset Curation, Class Distribution & Text Preprocessing",
        summary:
          "Load a labeled SMS/email dataset, inspect class ratios, and build a clean text tokenizer.",
        taskIds: ["p3-t01", "p3-t02", "p3-t03"],
      },
      {
        stageNumber: 2,
        title: "Feature Extraction & From-Scratch Classifier Implementation",
        summary:
          "Build leak-free Bag-of-Words/TF-IDF features and implement your classifier from scratch.",
        taskIds: ["p3-t04", "p3-t05", "p3-t06", "p3-t07"],
      },
      {
        stageNumber: 3,
        title: "Evaluation Metrics, Error Analysis & Baseline Comparison",
        summary:
          "Compute Precision/Recall/F1, inspect false positives/negatives, compare against scikit-learn, and document limitations.",
        taskIds: ["p3-t08", "p3-t09", "p3-t10", "p3-t11"],
      },
    ],
    tasks: [
      {
        id: "p3-t01",
        stepNumber: 1,
        title: "Obtain a suitably licensed labeled dataset",
        explanation:
          "Public benchmark datasets like the UCI SMS Spam Collection (CC BY 4.0 / public domain research corpus) provide thousands of real labeled `ham` and `spam` messages.",
        instructions:
          "Download or bundle a permissively licensed labeled spam/ham dataset (such as the UCI SMS Spam Collection or a curated TSV/CSV fixture) and write a loader that parses `(label, text)` pairs cleanly.",
        expectedOutcome:
          "Dataset loader returns clean text strings and binary integer labels (`0` = ham, `1` = spam).",
        acceptanceCriteria:
          "Dataset license and source attribution are documented in `README.md`.",
        difficulty: "Core",
      },
      {
        id: "p3-t02",
        stepNumber: 2,
        title: "Inspect class distributions",
        explanation:
          "Real-world spam datasets are typically skewed (e.g., ~86.6% ham vs. ~13.4% spam), requiring stratified splitting and non-accuracy metrics.",
        instructions:
          "Compute total message counts, class percentages, and average character/word lengths per class. Perform a stratified train/test split (`80% / 20%`) preserving the exact spam ratio in both splits.",
        expectedOutcome:
          "Summary report of class counts and stratified `train` and `test` splits.",
        acceptanceCriteria:
          "Spam proportion in `y_train` and `y_test` matches within 0.5%.",
        difficulty: "Core",
      },
      {
        id: "p3-t03",
        stepNumber: 3,
        title: "Clean and tokenize messages",
        explanation:
          "Consistent normalization prevents `'FREE!'`, `'free'`, and `'Free'` from being treated as unrelated features while preserving spam-indicative tokens like currency symbols or URLs.",
        instructions:
          "Implement `tokenize(text: str) -> list[str]` that lowercases text, normalizes numbers/URLs/currency symbols into canonical tokens (e.g. `<NUM>`, `<URL>`, `<CURR>`), and splits on word boundaries.",
        expectedOutcome:
          "`tokenize('Claim £1000 FREE at http://win.com!')` produces `['claim', '<CURR>', '<NUM>', 'free', 'at', '<URL>']`.",
        acceptanceCriteria:
          "Handles empty strings and punctuation-only messages without crashing.",
        difficulty: "Core",
      },
      {
        id: "p3-t04",
        stepNumber: 4,
        title: "Convert text into numerical features",
        explanation:
          "Classifiers operate on numerical vectors `x ∈ ℝ^V`. Building the vocabulary strictly on `X_train` prevents test-set data leakage.",
        instructions:
          "Implement a `Vectorizer` class with `.fit(train_texts)` (building a `word -> index` vocabulary of terms appearing at least `min_df` times in training data) and `.transform(texts)` returning a NumPy Bag-of-Words count matrix or TF-IDF matrix of shape `(N, V)`.",
        expectedOutcome:
          "`X_train_vec` of shape `(N_train, V)` and `X_test_vec` of shape `(N_test, V)`.",
        acceptanceCriteria:
          "Out-of-vocabulary words in `test_texts` are ignored or mapped to `<UNK>` without mutating vocabulary size `V`.",
        difficulty: "Intermediate",
      },
      {
        id: "p3-t05",
        stepNumber: 5,
        title: "Implement a basic classifier",
        explanation:
          "You may implement either Multinomial Naive Bayes (computing log class priors and Laplace-smoothed log word likelihoods) or binary Logistic Regression (`ŷ = σ(Xw + b)` with BCE gradient descent) from scratch in NumPy.",
        instructions:
          "Create `SpamClassifierScratch` in NumPy. If implementing Naive Bayes, store `log_priors` and `log_likelihoods` with Laplace smoothing parameter `alpha=1.0`. If implementing Logistic Regression, implement `sigmoid`, binary cross-entropy loss, and L2-regularized gradient descent.",
        expectedOutcome:
          "Self-contained NumPy classifier class with `.fit(X, y)`, `.predict_proba(X)`, and `.predict(X, threshold=0.5)`.",
        acceptanceCriteria:
          "Core classifier uses only Python and NumPy (no `sklearn` inside `SpamClassifierScratch`).",
        hint: "In Multinomial Naive Bayes, multiplying 30 small probabilities `p < 0.01` underflows 64-bit floats to `0.0`. Always work in log-space: `log_score = log_prior[c] + X @ log_likelihood[c]`.",
        difficulty: "Intermediate",
      },
      {
        id: "p3-t06",
        stepNumber: 6,
        title: "Train the classifier",
        explanation:
          "Fitting the model on the vectorized training corpus estimates the spam vs. ham token distributions or feature weights.",
        instructions:
          "Fit `SpamClassifierScratch` on `(X_train_vec, y_train)` and inspect the top 15 tokens most strongly associated with `spam` vs. `ham`.",
        expectedOutcome:
          "Trained model parameters and a ranked list of top spam-indicative tokens (e.g., `free`, `claim`, `<URL>`, `txt`, `prize`).",
        acceptanceCriteria:
          "Training completes cleanly with no `NaN` or `-inf` log probabilities.",
        difficulty: "Core",
      },
      {
        id: "p3-t07",
        stepNumber: 7,
        title: "Implement prediction",
        explanation:
          "Converting raw scores into calibrated probabilities allows adjusting the classification threshold (`0.5` vs `0.8`) to prioritize high precision.",
        instructions:
          "Implement `.predict_proba(X) -> np.ndarray` (using the log-sum-exp trick for Naive Bayes or `sigmoid` for Logistic Regression) and `.predict(X, threshold=0.5) -> np.ndarray`.",
        expectedOutcome:
          "Predicted probabilities in `[0.0, 1.0]` and binary predictions `{0, 1}`.",
        acceptanceCriteria:
          "`predict_proba` rows sum to `1.0` and never overflow on long messages.",
        difficulty: "Core",
      },
      {
        id: "p3-t08",
        stepNumber: 8,
        title: "Calculate precision, recall, and F1",
        explanation:
          "In spam filtering, a False Positive (legitimate email sent to spam) is often more costly than a False Negative.",
        instructions:
          "Implement `confusion_matrix_metrics(y_true, y_pred)` from scratch in NumPy computing `TP, FP, TN, FN`, `Accuracy`, `Precision = TP / (TP + FP)`, `Recall = TP / (TP + FN)`, and `F1 = 2 * P * R / (P + R)`.",
        expectedOutcome:
          "Full metrics report on the held-out test split.",
        acceptanceCriteria:
          "Handles zero-division edge cases gracefully and matches `sklearn.metrics` values.",
        difficulty: "Core",
      },
      {
        id: "p3-t09",
        stepNumber: 9,
        title: "Analyze misclassifications",
        explanation:
          "Reading the actual messages your model got wrong reveals dataset quirks, sarcasm, short messages, or missing features.",
        instructions:
          "Write an error-analysis routine that prints all False Positives (ham predicted as spam) and False Negatives (spam predicted as ham) along with their predicted spam probabilities and top contributing tokens.",
        expectedOutcome:
          "Diagnostic inspection of misclassified examples with written observations.",
        acceptanceCriteria:
          "Includes at least 3 concrete examples of false positives/negatives and explains why the model misclassified them.",
        difficulty: "Core",
      },
      {
        id: "p3-t10",
        stepNumber: 10,
        title: "Compare with a library baseline",
        explanation:
          "Benchmarking against `sklearn.naive_bayes.MultinomialNB` or `sklearn.linear_model.LogisticRegression` verifies your implementation's statistical performance.",
        instructions:
          "Train a `scikit-learn` baseline on the identical train/test split and compare Accuracy, Precision, Recall, and F1 side-by-side.",
        expectedOutcome:
          "Side-by-side benchmark table showing your from-scratch model within ~1% F1 of `scikit-learn`.",
        acceptanceCriteria:
          "Both models are evaluated on the exact same held-out test set.",
        difficulty: "Core",
      },
      {
        id: "p3-t11",
        stepNumber: 11,
        title: "Document limitations",
        explanation:
          "Bag-of-Words models ignore word order (`'not free'` vs `'free'`), context, and adversarial character substitutions (`'fr33'`).",
        instructions:
          "Document the failure modes of bag-of-words classification (lack of word order, vocabulary drift, obfuscated spelling) in `README.md`, explaining how sequence models and subword tokenizers in Phase 4 address them.",
        expectedOutcome:
          "Clear engineering write-up of model capabilities, threshold tradeoffs, and limitations.",
        acceptanceCriteria:
          "README includes metrics table, top predictive tokens, and limitation analysis.",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "Leak-free vocabulary and feature extraction fit strictly on the training split.",
      "Classifier implemented from scratch in NumPy without calling scikit-learn estimators.",
      "Precision, Recall, F1, and confusion matrix calculated and verified.",
      "Misclassification analysis and scikit-learn baseline comparison documented.",
    ],
    testingGuide: {
      summary:
        "Test tokenizer normalization, Laplace smoothing on unseen words, and Precision/Recall/F1 formulas on known synthetic confusion matrices.",
      verificationCommand: "pytest tests/test_spam_classifier.py -v",
      testCases: [
        {
          title: "Unseen Vocabulary Token Stability (Laplace Smoothing)",
          purpose:
            "Ensure messages containing words never seen in training do not produce -inf or NaN probabilities.",
          verificationSteps:
            "Fit classifier on a small toy corpus, then call predict_proba on a message containing 100% novel words.",
          expectedResult: "Returns finite probabilities in (0, 1) without ZeroDivisionError or NaN.",
        },
        {
          title: "Precision, Recall, and F1 Exact Calculation",
          purpose:
            "Verify metric formulas on a known ground-truth vector.",
          verificationSteps:
            "Pass y_true = [1, 1, 1, 0, 0] and y_pred = [1, 1, 0, 1, 0] (TP=2, FN=1, FP=1, TN=1).",
          expectedResult: "Precision = 2/3 (0.6667), Recall = 2/3 (0.6667), F1 = 2/3 (0.6667).",
        },
      ],
    },
    codeExamples: [
      {
        title: "Log-Space Multinomial Naive Bayes with Laplace Smoothing",
        language: "python",
        purpose:
          "Shows how to estimate class priors and Laplace-smoothed token log-likelihoods in vectorized NumPy without floating-point underflow.",
        code: `import numpy as np

class MultinomialNBScratch:
    def __init__(self, alpha: float = 1.0) -> None:
        self.alpha = alpha
        self.log_priors: np.ndarray | None = None      # Shape: (2,)
        self.log_likelihoods: np.ndarray | None = None # Shape: (2, V)

    def fit(self, X_counts: np.ndarray, y: np.ndarray) -> "MultinomialNBScratch":
        n_samples, vocab_size = X_counts.shape
        self.log_priors = np.zeros(2, dtype=np.float64)
        self.log_likelihoods = np.zeros((2, vocab_size), dtype=np.float64)

        for c in (0, 1):
            X_c = X_counts[y == c]
            self.log_priors[c] = np.log(X_c.shape[0] / n_samples)
            word_counts = np.sum(X_c, axis=0) + self.alpha
            total_words = np.sum(word_counts)
            self.log_likelihoods[c] = np.log(word_counts / total_words)
        return self

    def predict_log_scores(self, X_counts: np.ndarray) -> np.ndarray:
        assert self.log_priors is not None and self.log_likelihoods is not None
        # (N, V) @ (V, 2) + (2,) -> (N, 2)
        return X_counts @ self.log_likelihoods.T + self.log_priors`,
      },
    ],
    hints: [
      {
        id: "p3-h1",
        title: "Log-Sum-Exp Trick for Recovering Normalized Probabilities",
        category: "Mathematical Formula",
        content:
          "To convert raw log-scores `s = [s_0, s_1]` into probabilities without `exp(s)` overflowing or underflowing, subtract `m = max(s_0, s_1)` first: `p_c = exp(s_c - m) / (exp(s_0 - m) + exp(s_1 - m))`.",
      },
      {
        id: "p3-h2",
        title: "Fitting the Vectorizer on the Whole Dataset Before Splitting",
        category: "Common Mistake",
        content:
          "Never call `vectorizer.fit_transform(all_texts)` before splitting into train and test! That leaks test-set vocabulary and IDF statistics into training. Always split raw texts first, then call `vectorizer.fit(train_texts)`.",
      },
    ],
    optionalChallenges: [
      {
        id: "p3-oc1",
        title: "Bigram Features (Character or Word N-Grams)",
        description:
          "Extend your vectorizer to extract word bigrams (`n=2`, e.g., `'not free'`, `'claim now'`) and measure the resulting F1 improvement.",
        whatYouLearn:
          "How local n-gram context captures negation and multi-word phrases.",
      },
      {
        id: "p3-oc2",
        title: "Precision-Recall Curve & Threshold Sweeping",
        description:
          "Sweep decision thresholds from `0.05` to `0.95` and plot the Precision-Recall curve to find the threshold that achieves `>= 99%` precision.",
        whatYouLearn:
          "How production classifiers tune operating thresholds for asymmetric business costs.",
      },
    ],
    expectedDeliverable:
      "A working text classification system with evaluation results.",
    deliverablesList: [
      "Text tokenizer and leak-free Bag-of-Words / TF-IDF vectorizer",
      "From-scratch Naive Bayes or Logistic Regression classifier in NumPy",
      "Evaluation report with Confusion Matrix, Precision, Recall, F1, and misclassification analysis",
    ],
    learningOutcomes: [
      "Preprocess raw text and construct leak-free numerical feature matrices using Bag-of-Words and TF-IDF.",
      "Implement probabilistic classification in log-space with Laplace smoothing or Binary Cross-Entropy optimization.",
      "Evaluate classifiers on imbalanced data using Confusion Matrices, Precision, Recall, and F1.",
      "Perform qualitative error analysis on false positives and false negatives to identify model limitations.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "spam-classifier-from-scratch",
      recommendedStructure: [
        "spam_filter/vectorizer.py",
        "spam_filter/classifier.py",
        "spam_filter/metrics.py",
        "tests/test_spam_classifier.py",
        "README.md",
      ],
      readmeChecklist: [
        "Dataset attribution and class balance summary",
        "Precision, Recall, and F1 comparison table (Scratch vs scikit-learn)",
        "Error analysis of false positives and false negatives",
      ],
    },
    relatedResourceIds: [
      "google-machine-learning-crash-course",
      "scikit-learn-tutorials",
      "mit-18-05-probability-and-statistics",
    ],
    relatedModuleIds: ["p2-m1", "p2-m2", "p2-m3"],
    relatedProjectIds: [
      "milestone-02-linear-regression",
      "milestone-07-character-language-model",
      "milestone-08-bpe-tokenizer",
    ],
  },

  // ============================================================================
  // PROJECT 4 — AUTOMATIC DIFFERENTIATION ENGINE
  // ============================================================================
  {
    id: "milestone-04-autograd-engine",
    slug: "automatic-differentiation-engine",
    milestoneNumber: 4,
    title: "Automatic Differentiation Engine",
    subtitle:
      "Build a micrograd-style reverse-mode autodiff engine and train a neural network in pure Python",
    shortDescription:
      "Build a micrograd-style scalar automatic differentiation engine in pure Python that dynamically records computational graphs, performs topological sorting, backpropagates exact gradients via the chain rule, and trains a multilayer perceptron.",
    detailedOverview:
      "Modern deep learning frameworks like PyTorch and JAX are built around one core abstraction: Reverse-Mode Automatic Differentiation (`autograd`). Whenever you execute a forward calculation, the engine dynamically constructs a Directed Acyclic Graph (DAG) of operations and closures. Calling `.backward()` on the final scalar loss traverses that graph in reverse topological order, applying the multivariable chain rule to populate `.grad` on every weight in the network. Inspired by Andrej Karpathy's `micrograd`, you will build a complete scalar autodiff engine in pure Python and use it to train a multilayer perceptron classifier.",
    whyThisProjectMatters:
      "Once you build `Value` and `.backward()` in ~150 lines of pure Python, backpropagation ceases to be magic. You will understand why gradients accumulate with `+=` when a node is reused across multiple paths, why `.zero_grad()` is required every step, and how PyTorch's `autograd` engine works under the hood.",
    phase: 3,
    difficulty: "intermediate",
    difficultyFilter: "Intermediate",
    difficultyLabel: "Intermediate → Advanced",
    estimatedEffort: "14–18 hours · 2 weeks",
    technologies: ["Python", "Computational Graphs"],
    prerequisites: [
      "Phase 1 Multivariable Calculus (derivatives, partial derivatives, chain rule)",
      "Object-oriented Python (operator overloading: `__add__`, `__mul__`, `__pow__`, `__radd__`, `__neg__`)",
    ],
    requiredMathConcepts: [
      "Directed Acyclic Graphs (DAGs) of elementary operations",
      "Single and multivariable chain rule: ∂L/∂x = ∑_i (∂L/∂z_i)(∂z_i/∂x)",
      "Local elementary derivatives: d(a+b)/da = 1, d(a·b)/da = b, d(aⁿ)/da = n·aⁿ⁻¹",
      "Nonlinear activation derivatives: d(tanh x)/dx = 1 - tanh²(x), d(ReLU x)/dx = 𝟙(x > 0)",
      "Reverse topological ordering of graph nodes",
      "Central finite-difference gradient verification",
    ],
    learningObjectives: [
      "Implement a scalar `Value` node that wraps a float, tracks parent operands, and stores its local `.grad` and `_backward` closure.",
      "Overload arithmetic operators (`+`, `-`, `*`, `/`, `**`) and nonlinear activations (`tanh`, `relu`, `exp`) with exact local chain-rule updates.",
      "Implement DFS topological sorting and reverse-mode `.backward()` with correct `+=` gradient accumulation for multi-use nodes.",
      "Build `Neuron`, `Layer`, and `MLP` classes on top of `Value`, verify gradients numerically, and train a neural network to minimize loss.",
    ],
    skillsPracticed: [
      "Dynamic computational graph construction",
      "Reverse-mode automatic differentiation & topological sort",
      "Multivariable chain rule & gradient accumulation",
      "Building a neural network library (`Neuron`, `Layer`, `MLP`) on autodiff primitives",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "Scalar Value Node & Elementary Arithmetic Operations",
        summary:
          "Create the `Value` class, track parent pointers, and overload addition, multiplication, subtraction, division, and power operations.",
        taskIds: ["p4-t01", "p4-t02", "p4-t03", "p4-t04", "p4-t05", "p4-t06"],
      },
      {
        stageNumber: 2,
        title: "Nonlinear Activations & Computational Graph Construction",
        summary:
          "Implement `tanh`, `relu`, and `exp` operations and inspect multi-step computational graphs.",
        taskIds: ["p4-t07", "p4-t08"],
      },
      {
        stageNumber: 3,
        title: "Topological Traversal, Backpropagation & Numerical Validation",
        summary:
          "Implement topological sort, reverse-mode `.backward()`, `+=` gradient accumulation, and numerical gradient verification.",
        taskIds: ["p4-t09", "p4-t10", "p4-t11", "p4-t12"],
      },
      {
        stageNumber: 4,
        title: "Multilayer Perceptron, Training Loop & Testing",
        summary:
          "Construct `Neuron`, `Layer`, and `MLP` modules, train on a dataset, and write unit tests.",
        taskIds: ["p4-t13", "p4-t14", "p4-t15"],
      },
    ],
    tasks: [
      {
        id: "p4-t01",
        stepNumber: 1,
        title: "Implement a Value class",
        explanation:
          "Every scalar number in the computational graph is wrapped in a `Value` object that tracks both its forward value and its backward sensitivity.",
        instructions:
          "Create `class Value` in `autograd/engine.py`. Initialize `self.data = float(data)`, `self.grad = 0.0`, `self._backward = lambda: None`, `self._prev = set(_children)`, and `self._op = _op`.",
        expectedOutcome:
          "`Value(3.0)` initializes cleanly with `data=3.0` and `grad=0.0`.",
        acceptanceCriteria:
          "Includes a readable `__repr__` returning `Value(data=..., grad=...)`.",
        difficulty: "Core",
      },
      {
        id: "p4-t02",
        stepNumber: 2,
        title: "Store scalar values",
        explanation:
          "Expressions often mix `Value` objects with plain Python `int` or `float` literals (e.g., `x + 2.0` or `3.0 * x`).",
        instructions:
          "Write a helper `other = other if isinstance(other, Value) else Value(other)` inside binary operators, and implement reflected operators (`__radd__`, `__rmul__`, `__rsub__`, `__rtruediv__`) so `2.0 * Value(3.0)` works seamlessly.",
        expectedOutcome:
          "Mixed expressions like `2 + Value(3.0) * 4` evaluate without `TypeError`.",
        acceptanceCriteria:
          "Both left and right scalar literals are automatically wrapped in `Value` nodes.",
        difficulty: "Core",
      },
      {
        id: "p4-t03",
        stepNumber: 3,
        title: "Track parent operations",
        explanation:
          "To traverse the graph backward from the output loss to the leaf inputs, each output node must remember which child `Value` nodes produced it.",
        instructions:
          "Ensure every operation constructs its output `Value` with `_children=(self, other)` and a descriptive `_op` tag (`'+'`, `'*'`, `'**'`, `'relu'`, `'tanh'`).",
        expectedOutcome:
          "For `c = a + b`, `c._prev` contains `{a, b}` and `c._op == '+'`.",
        acceptanceCriteria:
          "Leaf nodes have an empty `_prev` set.",
        difficulty: "Core",
      },
      {
        id: "p4-t04",
        stepNumber: 4,
        title: "Implement addition",
        explanation:
          "An addition gate has local derivative `1.0` for both inputs, so it routes the upstream gradient `out.grad` unchanged to both parents.",
        instructions:
          "Implement `__add__` (and `__neg__`, `__sub__`). In `_backward()`, increment `self.grad += 1.0 * out.grad` and `other.grad += 1.0 * out.grad`.",
        expectedOutcome:
          "Forward pass sums `.data` and `_backward` adds `out.grad` to both operands.",
        acceptanceCriteria:
          "Subtraction `a - b` is implemented cleanly as `a + (-b)`.",
        difficulty: "Core",
      },
      {
        id: "p4-t05",
        stepNumber: 5,
        title: "Implement multiplication",
        explanation:
          "By the product rule, for `out = a * b`, `∂out/∂a = b` and `∂out/∂b = a`. A multiplication gate swaps and scales gradients by the opposite operand's value.",
        instructions:
          "Implement `__mul__`. In `_backward()`, update `self.grad += other.data * out.grad` and `other.grad += self.data * out.grad`.",
        expectedOutcome:
          "For `a = Value(2.0)`, `b = Value(-3.0)`, `c = a * b` with `c.grad = 1.0`, calling `c._backward()` sets `a.grad = -3.0` and `b.grad = 2.0`.",
        acceptanceCriteria:
          "Uses `+=` rather than `=` so shared operands accumulate gradients.",
        difficulty: "Core",
      },
      {
        id: "p4-t06",
        stepNumber: 6,
        title: "Implement power operations",
        explanation:
          "Supporting `x ** n` (for `int` or `float` exponent `n`) enables division `a / b = a * (b ** -1)` and squared error loss `(y_pred - y) ** 2`.",
        instructions:
          "Implement `__pow__(self, other: int | float)` where `out = Value(self.data ** other, (self,), f'**{other}')` and `_backward` updates `self.grad += (other * (self.data ** (other - 1))) * out.grad`. Implement `__truediv__` as `self * (other ** -1)`.",
        expectedOutcome:
          "`(Value(4.0) / Value(2.0)).data == 2.0` with exact backward gradients.",
        acceptanceCriteria:
          "Asserts `isinstance(other, (int, float))` in `__pow__`.",
        difficulty: "Core",
      },
      {
        id: "p4-t07",
        stepNumber: 7,
        title: "Implement nonlinear activations",
        explanation:
          "Without nonlinear activation functions, a stack of linear layers collapses into a single linear transformation.",
        instructions:
          "Implement `.tanh()`, `.relu()`, and `.exp()` methods on `Value`. For `tanh`, local derivative is `1 - tanh²(x)`. For `relu`, local derivative is `1.0 if out.data > 0 else 0.0`.",
        expectedOutcome:
          "`Value(0.8).tanh()` and `Value(-2.0).relu()` compute exact forward activations and backward gradients.",
        acceptanceCriteria:
          "`relu` gradient is `0.0` for negative inputs and `1.0` for positive inputs.",
        difficulty: "Core",
      },
      {
        id: "p4-t08",
        stepNumber: 8,
        title: "Construct computational graphs",
        explanation:
          "Composing multiple operations builds a multi-layer expression graph ready for reverse traversal.",
        instructions:
          "Write a helper function `trace_graph(root: Value) -> tuple[set[Value], set[tuple[Value, Value]]]` that collects all nodes and directed edges in a forward expression such as a 2-input neuron `n = (x1*w1 + x2*w2 + b).tanh()`.",
        expectedOutcome:
          "Returns the complete set of `Value` nodes and parent-child edges for any compound expression.",
        acceptanceCriteria:
          "Accurately enumerates all intermediate operation nodes.",
        difficulty: "Core",
      },
      {
        id: "p4-t09",
        stepNumber: 9,
        title: "Implement topological graph traversal",
        explanation:
          "Before computing `node._backward()`, every downstream node that depends on `node` must have already finished accumulating its gradient into `node.grad`.",
        instructions:
          "Implement DFS post-order topological sort starting from the root loss `Value`: maintain a `visited` set, recursively visit all children in `v._prev`, and append `v` to `topo` after all its children have been visited.",
        expectedOutcome:
          "`reversed(topo)` places the root output first and leaf inputs last, guaranteeing all dependencies are satisfied.",
        acceptanceCriteria:
          "Each unique `Value` node appears in `topo` at most once, even in diamond-shaped graphs (`y = (x * x) + x`).",
        difficulty: "Intermediate",
      },
      {
        id: "p4-t10",
        stepNumber: 10,
        title: "Implement backward propagation",
        explanation:
          "Calling `loss.backward()` seeds `loss.grad = 1.0` (`∂loss/∂loss = 1`) and invokes `_backward()` on every node in reverse topological order.",
        instructions:
          "Implement `.backward(self)` on `Value` using your topological sort.",
        expectedOutcome:
          "A single call to `loss.backward()` populates `.grad` on every node in the graph.",
        acceptanceCriteria:
          "Works on arbitrary nested arithmetic and activation expressions.",
        difficulty: "Intermediate",
      },
      {
        id: "p4-t11",
        stepNumber: 11,
        title: "Handle gradient accumulation",
        explanation:
          "When a variable `a` is used more than once (e.g., `b = a + a` or `c = a * a + a`), the multivariable chain rule requires summing the gradients from all outgoing branches.",
        instructions:
          "Verify that every `_backward()` closure uses `+=` instead of `=`. Test expressions like `a = Value(3.0); b = a + a; b.backward()` and confirm `a.grad == 2.0` (not `1.0`).",
        expectedOutcome:
          "Multi-use variables accumulate gradients across all paths accurately.",
        acceptanceCriteria:
          "Explicit unit test for `f(a) = a * a + a` at `a = 3.0` asserts `a.grad == 7.0`.",
        difficulty: "Core",
      },
      {
        id: "p4-t12",
        stepNumber: 12,
        title: "Validate gradients numerically",
        explanation:
          "Comparing `Value.grad` against finite differences `(f(x+h) - f(x-h)) / (2h)` (and optionally PyTorch `torch.tensor(..., requires_grad=True)`) proves your autodiff engine is exact.",
        instructions:
          "Write a numerical gradient check function that evaluates a complex multi-variable expression (`tanh`, `relu`, division, powers), computes `.backward()`, and asserts agreement with central finite differences (`h = 1e-6`).",
        expectedOutcome:
          "All analytical gradients match finite differences within `1e-6`.",
        acceptanceCriteria:
          "Automated test covers all implemented operators (`+`, `-`, `*`, `/`, `**`, `tanh`, `relu`, `exp`).",
        difficulty: "Intermediate",
      },
      {
        id: "p4-t13",
        stepNumber: 13,
        title: "Build a tiny multilayer perceptron",
        explanation:
          "With `Value` complete, a neural network is simply a hierarchy of `Module`, `Neuron`, `Layer`, and `MLP` classes that hold `Value` parameters.",
        instructions:
          "Create `autograd/nn.py` implementing `Module` (with `.parameters()` and `.zero_grad()`), `Neuron(nin, nonlin=True)`, `Layer(nin, nout)`, and `MLP(nin, nouts)`.",
        expectedOutcome:
          "`MLP(3, [4, 4, 1])` creates a 3-layer neural network with 41 scalar `Value` parameters.",
        acceptanceCriteria:
          "`mlp.zero_grad()` resets `.grad = 0.0` on all parameters.",
        difficulty: "Intermediate",
      },
      {
        id: "p4-t14",
        stepNumber: 14,
        title: "Train the network",
        explanation:
          "Training the MLP requires a loop of: forward pass -> scalar loss -> `zero_grad()` -> `loss.backward()` -> parameter update `p.data -= lr * p.grad`.",
        instructions:
          "Train an `MLP(3, [4, 4, 1])` on a small binary classification dataset using squared error or hinge loss for 50–100 steps. Print loss and predictions across training.",
        expectedOutcome:
          "Training loss drops near `0.0` and predictions match target labels.",
        acceptanceCriteria:
          "Demonstrates `zero_grad()` before `backward()` every step so gradients do not explode across epochs.",
        difficulty: "Core",
      },
      {
        id: "p4-t15",
        stepNumber: 15,
        title: "Write tests and documentation",
        explanation:
          "Documenting how computational graphs and reverse-mode autodiff work makes your repository a reference-grade engineering artifact.",
        instructions:
          "Create `tests/test_autograd.py` testing operator overloading, diamond graph accumulation, numerical gradient checks, and MLP convergence. Document the architecture in `README.md`.",
        expectedOutcome:
          "All `pytest` tests pass and `README.md` explains the chain rule and topological sort clearly.",
        acceptanceCriteria:
          "Zero external dependencies required for the core `autograd` package.",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "`Value` class supports `+`, `-`, `*`, `/`, `**`, `tanh`, `relu`, and `exp` with parent tracking.",
      "Topological sort and reverse-mode `.backward()` accurately propagate gradients through arbitrary DAGs.",
      "Multi-branch gradient accumulation (`+=`) verified on reused variables.",
      "`Neuron`, `Layer`, and `MLP` classes built and trained to convergence on a small dataset.",
    ],
    testingGuide: {
      summary:
        "Verify multi-path gradient accumulation, finite-difference agreement across all operators, and MLP training convergence.",
      verificationCommand: "pytest tests/test_autograd.py -v",
      testCases: [
        {
          title: "Diamond Graph Gradient Accumulation (`+=` Test)",
          purpose:
            "Catch the classic bug where `_backward` overwrites `self.grad = ...` instead of accumulating `self.grad += ...`.",
          verificationSteps:
            "Compute x = Value(3.0); y = (x * x) + (x + x); y.backward().",
          expectedResult: "y.data == 15.0 and x.grad == 8.0 (since dy/dx = 2x + 2 = 8 at x=3).",
        },
        {
          title: "Central Finite-Difference Verification on Compound DAG",
          purpose:
            "Confirm chain rule accuracy through composed division, power, tanh, and ReLU gates.",
          verificationSteps:
            "Evaluate f(a, b) = ((a * b + b**2).tanh() / (a - b)).relu() and compare a.grad, b.grad with finite differences (eps=1e-6).",
          expectedResult: "Absolute difference < 1e-6 for all leaf inputs.",
        },
        {
          title: "MLP Convergence & Zero-Grad Check",
          purpose:
            "Verify that an MLP reduces loss over 40 steps of gradient descent.",
          verificationSteps:
            "Run 40 steps of forward, zero_grad(), backward(), and step(lr=0.05) on a 4-sample dataset.",
          expectedResult: "Final loss < 0.05 and all 4 binary targets classified accurately.",
        },
      ],
    },
    codeExamples: [
      {
        title: "Topological Sort & Reverse-Mode Backpropagation on `Value`",
        language: "python",
        purpose:
          "Illustrates how `backward()` orders the computational DAG topologically and executes local chain-rule closures.",
        code: `class Value:
    def __init__(self, data: float, _children: tuple["Value", ...] = (), _op: str = "") -> None:
        self.data = float(data)
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)
        self._op = _op

    def backward(self) -> None:
        topo: list[Value] = []
        visited: set[Value] = set()

        def build_topo(v: Value) -> None:
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)

        build_topo(self)
        self.grad = 1.0
        for node in reversed(topo):
            node._backward()`,
      },
    ],
    hints: [
      {
        id: "p4-h1",
        title: "Why Forgetting `zero_grad()` Breaks Training",
        category: "Common Mistake",
        content:
          "Because `_backward()` uses `self.grad += ...` to support multi-branch graph nodes within a single pass, calling `.backward()` on epoch 2 without resetting `.grad = 0.0` adds epoch 2's gradients on top of epoch 1's gradients!",
      },
      {
        id: "p4-h2",
        title: "Closure Variable Capture in Python",
        category: "Debugging Technique",
        content:
          "Inside operator methods like `__mul__(self, other)`, make sure `other = other if isinstance(other, Value) else Value(other)` happens BEFORE defining `def _backward():` so the closure captures the `Value` instance.",
      },
    ],
    optionalChallenges: [
      {
        id: "p4-oc1",
        title: "Computational Graph Visualizer (DOT / SVG)",
        description:
          "Write a utility that exports any `Value` expression graph into Graphviz DOT format showing `.data`, `.grad`, and `_op` gates at every node.",
        whatYouLearn:
          "How to visually inspect forward activations and backward gradient flow through a network.",
      },
      {
        id: "p4-oc2",
        title: "Cross-Entropy Loss & Softmax in Scalar Autodiff",
        description:
          "Using `.exp()`, `.log()`, and summation over `Value` logits, implement multi-class Softmax Cross-Entropy loss and verify its gradients against `probs - one_hot`.",
        whatYouLearn:
          "How composite losses automatically differentiate through elementary `exp` and `log` primitives.",
      },
    ],
    expectedDeliverable:
      "A working autodiff engine capable of training a small neural network.",
    deliverablesList: [
      "Pure-Python `Value` reverse-mode autodiff engine (`autograd/engine.py`)",
      "`Neuron`, `Layer`, and `MLP` neural network modules (`autograd/nn.py`)",
      "Numerical gradient verification and MLP training test suite",
    ],
    learningOutcomes: [
      "Explain how dynamic computational graphs record forward operations and parent dependencies.",
      "Implement reverse-mode automatic differentiation using DFS topological sorting and chain-rule closures.",
      "Handle multi-path gradient accumulation (`+=`) and explain why `.zero_grad()` is required between optimization steps.",
      "Build and train a multilayer perceptron from scratch on top of scalar autodiff primitives.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "micrograd-autodiff-engine",
      recommendedStructure: [
        "autograd/engine.py",
        "autograd/nn.py",
        "tests/test_autograd.py",
        "README.md",
      ],
      readmeChecklist: [
        "Diagram or explanation of forward DAG construction and reverse topological pass",
        "Instructions to run finite-difference gradient tests",
        "Example training log of the pure-Python MLP",
      ],
    },
    relatedResourceIds: [
      "karpathy-zero-to-hero",
      "d2l-dive-into-deep-learning",
      "pytorch-beginner-tutorials",
    ],
    relatedModuleIds: ["p3-m1", "p3-m2"],
    relatedProjectIds: [
      "milestone-01-matrix-operations-engine",
      "milestone-05-neural-network-scratch",
      "milestone-09-self-attention-engine",
    ],
  },

  // ============================================================================
  // PROJECT 5 — NEURAL NETWORK FROM SCRATCH
  // ============================================================================
  {
    id: "milestone-05-neural-network-scratch",
    slug: "neural-network-from-scratch",
    milestoneNumber: 5,
    title: "Neural Network From Scratch",
    subtitle:
      "Implement and train a vectorized multilayer neural network in NumPy",
    shortDescription:
      "Implement and train a multilayer neural network in pure NumPy without high-level deep-learning frameworks—including dense layers, activation functions, forward caching, explicit matrix backpropagation, weight initialization, and mini-batch gradient descent.",
    detailedOverview:
      "Scalar autodiff (Project 4) teaches how computational graphs work on individual numbers, but real deep learning operates on batched tensors using vectorized matrix calculus. In this project, you will implement a modular, multi-layer neural network in pure NumPy. You will design `Linear` layers (`Z = XW + b`), nonlinear activations (`ReLU`, `Sigmoid`, `Softmax`), numerically stable Cross-Entropy loss, He/Xavier weight initialization, explicit backward pass Jacobians (`dX = dZ @ W.T`, `dW = X.T @ dZ`, `db = sum(dZ, axis=0)`), and mini-batch training—verifying your analytical tensor gradients against both numerical finite differences and PyTorch.",
    whyThisProjectMatters:
      "Deriving and coding the matrix backward pass (`dW = Xᵀ dZ`, `dX = dZ Wᵀ`) makes tensor shape duality second nature: you will immediately see why weight gradients match the shape of `W` and input gradients match the shape of `X`.",
    phase: 3,
    difficulty: "advanced",
    difficultyFilter: "Advanced",
    difficultyLabel: "Advanced",
    estimatedEffort: "16–22 hours · 2 weeks",
    technologies: ["Python", "NumPy", "PyTorch"],
    prerequisites: [
      "Project 1 (Matrix Operations) and Project 4 (Autodiff Engine)",
      "Phase 3 Module 3.1 & 3.2 (Forward pass, matrix Jacobians, He/Xavier initialization)",
    ],
    requiredMathConcepts: [
      "Batched affine transformation: Z = XW + b with X ∈ ℝ^{B×D_in}, W ∈ ℝ^{D_in×D_out}, b ∈ ℝ^{1×D_out}",
      "Linear backward pass: dW = Xᵀ dZ, db = ∑_{i=1}^B dZ_i, dX = dZ Wᵀ",
      "Elementwise activation backward pass: dZ = dA ⊙ f'(Z)",
      "Log-sum-exp stabilized Softmax and Cross-Entropy gradient: dZ_logits = (P - Y_one_hot) / B",
      "Variance-preserving initialization: He normal N(0, √(2/D_in)) for ReLU",
    ],
    learningObjectives: [
      "Implement modular Dense (`Linear`) and activation layers with forward activation caching and explicit `.backward(d_out)` methods.",
      "Derive and code numerically stable Softmax Cross-Entropy loss and its combined logit gradient `(probs - one_hot) / B`.",
      "Validate every layer's backward pass using central finite differences and compare learned trajectories against an identical PyTorch model.",
      "Train a multi-layer neural network with mini-batch gradient descent and weight initialization that prevents vanishing/exploding activations.",
    ],
    skillsPracticed: [
      "Vectorized matrix backpropagation (`dX`, `dW`, `db`)",
      "Numerically stable Softmax & Cross-Entropy",
      "He / Xavier weight initialization",
      "Mini-batch training & PyTorch parity verification",
    ],
    implementationStages: [
      {
        stageNumber: 1,
        title: "Architecture Design, Weight Initialization & Forward Pass",
        summary:
          "Implement `Linear` dense layers with He/Xavier initialization, `ReLU`/`Sigmoid` activations, and forward caching.",
        taskIds: ["p5-t01", "p5-t02", "p5-t03", "p5-t04", "p5-t05"],
      },
      {
        stageNumber: 2,
        title: "Loss Functions & Matrix Backpropagation",
        summary:
          "Implement stabilized Cross-Entropy / MSE losses, derive layer Jacobians, and code backward propagation.",
        taskIds: ["p5-t06", "p5-t07", "p5-t08"],
      },
      {
        stageNumber: 3,
        title: "Mini-Batch Optimization & Training Loop",
        summary:
          "Implement parameter updates, mini-batch shuffling, and loss/accuracy tracking on a classification dataset.",
        taskIds: ["p5-t09", "p5-t10", "p5-t11"],
      },
      {
        stageNumber: 4,
        title: "Numerical Gradient Checking, PyTorch Comparison & Docs",
        summary:
          "Verify gradients numerically, compare step-for-step against PyTorch, and document results.",
        taskIds: ["p5-t12", "p5-t13", "p5-t14"],
      },
    ],
    tasks: [
      {
        id: "p5-t01",
        stepNumber: 1,
        title: "Define network architecture",
        explanation:
          "A clean layer interface (`forward(x)` and `backward(dout)`) lets you stack arbitrary sequences of dense and activation layers inside a `Sequential` container.",
        instructions:
          "Design a base `Layer` abstraction in `nn_numpy/layers.py` and a `Sequential` model container that chains `.forward(X)` in order and `.backward(dloss)` in reverse order.",
        expectedOutcome:
          "`Sequential([Linear(4, 16), ReLU(), Linear(16, 3)])` routes tensors cleanly forward and backward.",
        acceptanceCriteria:
          "Each stateful layer exposes its parameters `(W, b)` and gradients `(dW, db)` cleanly.",
        difficulty: "Core",
      },
      {
        id: "p5-t02",
        stepNumber: 2,
        title: "Initialize weights and biases",
        explanation:
          "Initializing weights to all zeros causes all hidden neurons to compute identical gradients (symmetry breaking failure); overly large weights saturate activations.",
        instructions:
          "Implement He initialization `W ~ N(0, sqrt(2 / fan_in))` for ReLU layers and Xavier/Glorot initialization `W ~ N(0, sqrt(1 / fan_in))` for Sigmoid/Tanh layers, with biases initialized to `0.0`.",
        expectedOutcome:
          "Hidden activations maintain unit-scale variance across multiple layers at initialization.",
        acceptanceCriteria:
          "Supports passing a reproducible `np.random.Generator` seed.",
        difficulty: "Core",
      },
      {
        id: "p5-t03",
        stepNumber: 3,
        title: "Implement dense layers",
        explanation:
          "A dense (`Linear`) layer computes `Z = X @ W + b` and caches `X` during the forward pass so `dW = X.T @ dZ` can be computed during the backward pass.",
        instructions:
          "Implement `Linear(in_features, out_features)` with `.forward(X)` caching `self.cache_x = X` and returning `X @ self.W + self.b`.",
        expectedOutcome:
          "Input `(B, D_in)` produces output `(B, D_out)` and stores `cache_x`.",
        acceptanceCriteria:
          "Bias `b` has shape `(1, D_out)` or `(D_out,)` and broadcasts cleanly across batch size `B`.",
        difficulty: "Core",
      },
      {
        id: "p5-t04",
        stepNumber: 4,
        title: "Implement activation functions",
        explanation:
          "Elementwise nonlinearities allow multi-layer networks to approximate non-linear decision boundaries.",
        instructions:
          "Implement `ReLU`, `Sigmoid`, and `Tanh` layers in `nn_numpy/activations.py`, caching the necessary forward mask or output tensor for backpropagation.",
        expectedOutcome:
          "Forward and backward passes preserve input shape `(B, D)`.",
        acceptanceCriteria:
          "`ReLU.backward(dout)` zeroes out gradients wherever forward input `x <= 0`.",
        difficulty: "Core",
      },
      {
        id: "p5-t05",
        stepNumber: 5,
        title: "Implement forward propagation",
        explanation:
          "Chaining layers transforms raw input features `(B, D_in)` into class logits `(B, C)`.",
        instructions:
          "Implement `Sequential.forward(X)` passing activations through every layer and returning the final logits.",
        expectedOutcome:
          "Full network forward pass executes in vectorized NumPy without sample-level loops.",
        acceptanceCriteria:
          "Output shape equals `(batch_size, num_classes)`.",
        difficulty: "Core",
      },
      {
        id: "p5-t06",
        stepNumber: 6,
        title: "Implement loss functions",
        explanation:
          "Fusing Softmax and Cross-Entropy avoids computing `exp(z)` without max-subtraction and yields the remarkably clean gradient `(probs - one_hot) / B`.",
        instructions:
          "Implement `SoftmaxCrossEntropyLoss` (using `logits - np.max(logits, axis=1, keepdims=True)`) and `MSELoss`, returning both the scalar loss and the gradient `d_logits` with respect to the network's output.",
        expectedOutcome:
          "Passing large logits like `[1000.0, 1001.0, 999.0]` computes finite loss and gradients without `NaN` overflow.",
        acceptanceCriteria:
          "Loss is averaged over batch size `B`, and `d_logits` is divided by `B` consistently.",
        difficulty: "Intermediate",
      },
      {
        id: "p5-t07",
        stepNumber: 7,
        title: "Derive backpropagation equations",
        explanation:
          "Dimensional analysis confirms the matrix chain rule: for `Z = XW + b`, since `W` is `(D_in, D_out)`, `dW` must be `X.T @ dZ` (`(D_in, B) @ (B, D_out)`).",
        instructions:
          "Write out the exact matrix derivatives for `Linear`, `ReLU`, `Sigmoid`, and `SoftmaxCrossEntropyLoss`, verifying that every matrix product's inner dimensions match.",
        expectedOutcome:
          "Clear mathematical specification of `dW`, `db`, and `dX`.",
        acceptanceCriteria:
          "`dW.shape == W.shape`, `db.shape == b.shape`, and `dX.shape == X.shape`.",
        difficulty: "Intermediate",
      },
      {
        id: "p5-t08",
        stepNumber: 8,
        title: "Implement backward propagation",
        explanation:
          "Propagating `d_logits` backward through `reversed(layers)` populates `layer.dW` and `layer.db` on every `Linear` layer.",
        instructions:
          "Implement `Linear.backward(dZ)` setting `self.dW = self.cache_x.T @ dZ`, `self.db = np.sum(dZ, axis=0, keepdims=True)`, and returning `dX = dZ @ self.W.T`. Wire `Sequential.backward(d_logits)`.",
        expectedOutcome:
          "Calling `model.backward(d_logits)` computes exact parameter gradients for all layers.",
        acceptanceCriteria:
          "Works for networks of any depth (2, 3, or 5 layers).",
        difficulty: "Intermediate",
      },
      {
        id: "p5-t09",
        stepNumber: 9,
        title: "Implement parameter updates",
        explanation:
          "An optimizer iterates through all trainable layers and updates `W -= lr * dW` and `b -= lr * db`.",
        instructions:
          "Implement an `SGD` optimizer (with optional momentum and L2 weight decay) and a mini-batch data iterator that shuffles `(X, y)` each epoch.",
        expectedOutcome:
          "Clean separation between model architecture (`Sequential`) and parameter update rule (`SGD.step()`).",
        acceptanceCriteria:
          "Supports configurable `learning_rate`, `batch_size`, and `weight_decay`.",
        difficulty: "Core",
      },
      {
        id: "p5-t10",
        stepNumber: 10,
        title: "Train on a small dataset",
        explanation:
          "Non-linearly separable datasets (like concentric circles, spirals, two-moons, or multi-class digits) prove that your hidden ReLU layers learn non-linear representations.",
        instructions:
          "Train a 3-layer MLP on a non-linear classification dataset (e.g., 3-class spiral / moons or digits dataset) where a linear classifier fails (`~50%` accuracy) and achieve `> 95%` accuracy.",
        expectedOutcome:
          "Multi-layer NumPy network learns a curved decision boundary with `> 95%` validation accuracy.",
        acceptanceCriteria:
          "Demonstrates significantly higher accuracy than a 1-layer linear model on the same dataset.",
        difficulty: "Core",
      },
      {
        id: "p5-t11",
        stepNumber: 11,
        title: "Track training loss",
        explanation:
          "Recording epoch-by-epoch training loss, validation loss, and classification accuracy verifies healthy learning dynamics.",
        instructions:
          "Log and plot training/validation loss and accuracy curves across epochs.",
        expectedOutcome:
          "Saved diagnostic training curves and console progress table.",
        acceptanceCriteria:
          "Loss decreases smoothly and validation accuracy reaches target threshold.",
        difficulty: "Core",
      },
      {
        id: "p5-t12",
        stepNumber: 12,
        title: "Test numerical gradients",
        explanation:
          "Perturbing each entry `W[i, j]` by `±1e-5` and comparing `(L_plus - L_minus) / (2e-5)` against `layer.dW[i, j]` catches any transpose or scaling bug.",
        instructions:
          "Implement a matrix finite-difference gradient checker in `tests/test_nn_numpy.py` that checks `dW`, `db`, and `dX` for a 3-layer network.",
        expectedOutcome:
          "Maximum relative gradient error across all parameters is `< 1e-6`.",
        acceptanceCriteria:
          "Automated pytest test runs the numerical gradient check and passes.",
        difficulty: "Advanced",
      },
      {
        id: "p5-t13",
        stepNumber: 13,
        title: "Compare against PyTorch",
        explanation:
          "Initializing a `torch.nn.Sequential` model with the exact same initial weight matrices `W` and biases `b` allows verifying that forward logits, loss, and backward `.grad` tensors match PyTorch to floating-point precision.",
        instructions:
          "Write a parity test that copies your initial NumPy weights into `torch.nn.Linear` layers (remembering PyTorch stores `weight` transposed as `(out_features, in_features)`!), runs one forward + backward pass in both frameworks, and asserts `np.allclose` on logits, loss, `dW`, and `db`.",
        expectedOutcome:
          "NumPy network gradients match PyTorch `.grad` within `1e-6`.",
        acceptanceCriteria:
          "Parity test included in `tests/test_nn_numpy.py`.",
        difficulty: "Advanced",
      },
      {
        id: "p5-t14",
        stepNumber: 14,
        title: "Document results",
        explanation:
          "Clear documentation of the backward pass equations, gradient checks, and training curves completes the project.",
        instructions:
          "Document your matrix Jacobian derivations, PyTorch parity test results, and training curves in `README.md`.",
        expectedOutcome:
          "Complete engineering write-up and reproducible repository.",
        acceptanceCriteria:
          "Includes explicit shape table for forward and backward tensors.",
        difficulty: "Core",
      },
    ],
    acceptanceCriteria: [
      "Dense layers, activations, and Softmax Cross-Entropy loss implemented in pure NumPy.",
      "Analytical matrix gradients `dW`, `db`, and `dX` verified against numerical finite differences (`< 1e-6` relative error).",
      "Forward and backward passes verified for exact parity against PyTorch given identical initial weights.",
      "Network trained with mini-batch gradient descent to `> 95%` accuracy on a non-linear classification task.",
    ],
    testingGuide: {
      summary:
        "Run finite-difference gradient checks on every layer and verify exact forward/backward numerical parity against PyTorch.",
      verificationCommand: "pytest tests/test_nn_numpy.py -v",
      testCases: [
        {
          title: "Matrix Finite-Difference Gradient Check",
          purpose:
            "Verify that `Linear.backward` and `SoftmaxCrossEntropyLoss.backward` compute exact analytical gradients.",
          verificationSteps:
            "For a random batch X (5, 4) and labels y (5,) through Linear(4, 6) -> ReLU -> Linear(6, 3), compare analytical dW1, db1, dW2, db2 with central finite differences (h=1e-5).",
          expectedResult: "Relative error < 1e-6 across all weight and bias tensors.",
        },
        {
          title: "Single-Step PyTorch Parity Test",
          purpose:
            "Prove your NumPy forward logits, Cross-Entropy loss, and backward gradients match `torch.nn`.",
          verificationSteps:
            "Copy W and b into `torch.nn.Linear` (`linear_torch.weight.data = torch.from_numpy(W.T)`), run `F.cross_entropy` + `.backward()`, and compare gradients.",
          expectedResult: "`np.allclose(dW_numpy, linear_torch.weight.grad.T, atol=1e-6)` is True.",
        },
      ],
    },
    codeExamples: [
      {
        title: "Dense Layer Forward & Backward Pass with Stabilized Softmax Cross-Entropy",
        language: "python",
        purpose:
          "Shows the exact NumPy matrix operations for a Linear layer and fused Softmax Cross-Entropy loss.",
        code: `import numpy as np

class Linear:
    def __init__(self, in_features: int, out_features: int, rng: np.random.Generator) -> None:
        # He normal initialization
        self.W = rng.normal(0.0, np.sqrt(2.0 / in_features), size=(in_features, out_features))
        self.b = np.zeros((1, out_features), dtype=np.float64)
        self.dW = np.zeros_like(self.W)
        self.db = np.zeros_like(self.b)
        self._cache_x: np.ndarray | None = None

    def forward(self, x: np.ndarray) -> np.ndarray:
        self._cache_x = x
        return x @ self.W + self.b

    def backward(self, dout: np.ndarray) -> np.ndarray:
        assert self._cache_x is not None
        self.dW = self._cache_x.T @ dout
        self.db = np.sum(dout, axis=0, keepdims=True)
        return dout @ self.W.T

def softmax_cross_entropy(logits: np.ndarray, y_indices: np.ndarray) -> tuple[float, np.ndarray]:
    batch_size = logits.shape[0]
    shifted = logits - np.max(logits, axis=1, keepdims=True)
    exp_scores = np.exp(shifted)
    probs = exp_scores / np.sum(exp_scores, axis=1, keepdims=True)
    loss = float(-np.mean(np.log(probs[np.arange(batch_size), y_indices] + 1e-12)))

    dlogits = probs.copy()
    dlogits[np.arange(batch_size), y_indices] -= 1.0
    dlogits /= batch_size
    return loss, dlogits`,
      },
    ],
    hints: [
      {
        id: "p5-h1",
        title: "Shape Mismatch Mnemonic for `Linear.backward(dZ)`",
        category: "Expected Tensor Shapes",
        content:
          "You never need to memorize whether the transpose goes on the left or right in `Linear.backward`: `X` is `(B, D_in)`, `W` is `(D_in, D_out)`, and `dZ` is `(B, D_out)`. To produce `dW` of shape `(D_in, D_out)`, the batch dimension `B` must cancel as the inner dimension: `(D_in, B) @ (B, D_out) = X.T @ dZ`. To produce `dX` of shape `(B, D_in)`, `D_out` must cancel: `(B, D_out) @ (D_out, D_in) = dZ @ W.T`.",
      },
      {
        id: "p5-h2",
        title: "PyTorch `nn.Linear` Stores Weights Transposed",
        category: "Common Mistake",
        content:
          "When comparing against `torch.nn.Linear(in_features, out_features)`, note that PyTorch stores `.weight` with shape `(out_features, in_features)` and computes `x @ weight.T + bias`. Transpose your NumPy weight matrix `W.T` when copying weights or comparing `.grad`!",
      },
    ],
    optionalChallenges: [
      {
        id: "p5-oc1",
        title: "Implement Adam & Momentum Optimizers in NumPy",
        description:
          "Implement SGD with Momentum and the Adam optimizer (tracking first moment `m`, second moment `v`, and bias corrections `1 - β₁ᵗ`, `1 - β₂ᵗ`) and compare convergence speed against vanilla SGD.",
        whatYouLearn:
          "How adaptive per-parameter learning rates accelerate training across ill-conditioned loss surfaces.",
      },
      {
        id: "p5-oc2",
        title: "Inverted Dropout & Layer Normalization From Scratch",
        description:
          "Implement `Dropout(p=0.2)` (scaling active neurons by `1/(1-p)` during training and identity during evaluation) and `LayerNorm(d_model)` with its backward pass.",
        whatYouLearn:
          "How regularization and normalization layers behave differently in `train` vs `eval` modes.",
      },
    ],
    expectedDeliverable: "A fully working NumPy neural network implementation.",
    deliverablesList: [
      "Modular NumPy neural network library (`Linear`, `ReLU`, `Sigmoid`, `SoftmaxCrossEntropyLoss`, `Sequential`, `SGD`)",
      "Numerical gradient checker and PyTorch parity test suite",
      "Training script and loss/decision-boundary visualizations",
    ],
    learningOutcomes: [
      "Derive and implement vectorized forward and backward passes for dense layers, activations, and Softmax Cross-Entropy loss in NumPy.",
      "Initialize neural network weights using variance-preserving He and Xavier schemes.",
      "Verify analytical tensor gradients using finite differences and step-by-step PyTorch parity tests.",
      "Train a multi-layer neural network using mini-batch gradient descent to solve non-linear classification tasks.",
    ],
    githubSubmissionGuidance: {
      suggestedRepoName: "neural-network-from-scratch-numpy",
      recommendedStructure: [
        "nn_numpy/layers.py",
        "nn_numpy/losses.py",
        "nn_numpy/optim.py",
        "tests/test_nn_numpy.py",
        "README.md",
      ],
      readmeChecklist: [
        "Forward and backward matrix equations with tensor shapes",
        "Finite-difference and PyTorch parity verification output",
        "Training loss curve and accuracy results",
      ],
    },
    relatedResourceIds: [
      "karpathy-zero-to-hero",
      "d2l-dive-into-deep-learning",
      "stanford-cs231n",
    ],
    relatedModuleIds: ["p3-m1", "p3-m2", "p3-m3"],
    relatedProjectIds: [
      "milestone-04-autograd-engine",
      "milestone-06-image-classifier",
      "milestone-09-self-attention-engine",
    ],
  },
];
