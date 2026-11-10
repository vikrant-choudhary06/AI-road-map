import type { CourseResource } from "@/types";

/**
 * Canonical learning resources originating in Phases 0 through 4.
 * Multi-phase resources (such as D2L and Karpathy's Neural Networks: Zero to Hero)
 * are defined once here and associated across all relevant phases via `phases`
 * and `phasePlacements`.
 */
export const RESOURCES_PHASES_0_TO_4: CourseResource[] = [
  // ============================================================================
  // PHASE 0 — PYTHON & PROGRAMMING FOUNDATIONS
  // ============================================================================
  {
    id: "harvard-cs50-python",
    slug: "harvard-cs50-introduction-to-programming-with-python",
    title: "CS50's Introduction to Programming with Python",
    provider: "Harvard University",
    providerGroup: "Harvard",
    providerMonogram: "HU",
    description:
      "A comprehensive introduction to Python programming, covering functions, variables, control flow, exceptions, libraries, unit testing, file I/O, and object-oriented programming.",
    detailedDescription:
      "Taught by Professor David J. Malan, Harvard CS50P is a rigorous, beginner-accessible university course dedicated entirely to the Python language. Through ten weeks of lectures and hands-on problem sets, learners build fluency in writing clean functions, handling runtime exceptions, testing code with pytest, manipulating files, using regular expressions, and designing object-oriented classes—the exact software engineering habits needed before tackling machine learning algorithms.",
    primaryPhase: 0,
    phases: [0],
    relevantModuleIds: ["p0-m1", "p0-m2", "p0-m4"],
    phasePlacements: [
      {
        phase: 0,
        catalogCode: "0.1",
        role: "start_here",
        isRecommendedStart: true,
        phaseGuidance:
          "Start here for Phase 0. Complete Weeks 0–8 and solve the programming problem sets to build rock-solid Python syntax, debugging, pytest unit testing, and object-oriented design fluency.",
        moduleIds: ["p0-m1", "p0-m2", "p0-m4"],
      },
    ],
    resourceType: "Full Course",
    difficulty: "foundational",
    difficultyLabel: "Beginner",
    language: "English",
    url: "https://cs50.harvard.edu/python/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "All video lectures, course notes, slides, source code, and problem sets are 100% free and openly accessible on Harvard's OpenCourseWare site.",
    certificateCostNote:
      "Harvard CS50 offers a free certificate upon completing required problem sets via CS50.me; verified edX certificates are optional and paid.",
    prerequisites: [
      "No prior programming experience required; basic computer literacy.",
    ],
    learningObjectives: [
      "Write modular Python programs using functions, conditionals, loops, and comprehensions.",
      "Handle exceptions gracefully and write automated unit tests with pytest.",
      "Read and write structured text/CSV files and design object-oriented classes.",
    ],
    suggestedLearningPosition:
      "Phase 0 Primary Starting Course (Modules 0.1, 0.2 & 0.4)",
    estimatedDuration: "10 weeks (self-paced)",
    recommendedOrder: 1,
    isRecommended: true,
    tags: [
      "Python",
      "CS50P",
      "Unit Testing",
      "OOP",
      "File I/O",
      "Programming Foundations",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on official cs50.harvard.edu/python portal.",
    },
    relatedResourceIds: [
      "umich-python-for-everybody",
      "numpy-learning-resources",
      "harvard-cs50-ai-python",
    ],
  },
  {
    id: "umich-python-for-everybody",
    slug: "python-for-everybody-py4e",
    title: "Python for Everybody",
    provider: "University of Michigan / Dr. Charles Severance",
    providerGroup: "University of Michigan",
    providerMonogram: "UM",
    description:
      "Beginner-friendly Python instruction covering programming fundamentals, data structures, files, web data, and databases.",
    detailedDescription:
      "Created by Dr. Charles Severance (Dr. Chuck), Python for Everybody (PY4E) is an approachable, gently paced alternative or companion to CS50P. It emphasizes core data structures—strings, lists, dictionaries, and tuples—alongside practical data parsing, file processing, and structured storage.",
    primaryPhase: 0,
    phases: [0],
    relevantModuleIds: ["p0-m1", "p0-m2"],
    phasePlacements: [
      {
        phase: 0,
        catalogCode: "0.2",
        role: "additional_learning",
        phaseGuidance:
          "Use Lessons 1–11 if you want extra practice with Python strings, dictionaries, tuples, and file parsing at a gentler pace.",
        moduleIds: ["p0-m1", "p0-m2"],
      },
    ],
    resourceType: "Full Course",
    difficulty: "foundational",
    difficultyLabel: "Beginner",
    language: "English",
    url: "https://www.py4e.com/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "All video lessons, interactive textbook chapters, slides, and sample code are freely available on py4e.com under Creative Commons licensing.",
    prerequisites: ["No prior coding background needed."],
    learningObjectives: [
      "Master Python dictionaries, lists, tuples, and string manipulation.",
      "Read, parse, and aggregate data from text, JSON, and CSV files.",
      "Understand algorithmic iteration and basic object construction.",
    ],
    suggestedLearningPosition:
      "Phase 0 Additional Learning for Modules 0.1 & 0.2",
    recommendedOrder: 2,
    isRecommended: false,
    tags: ["Python", "Data Structures", "Dictionaries", "Beginner Python"],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on official py4e.com portal.",
    },
    relatedResourceIds: [
      "harvard-cs50-python",
      "numpy-learning-resources",
      "pandas-getting-started-tutorials",
    ],
  },
  {
    id: "numpy-learning-resources",
    slug: "numpy-official-learning-resources",
    title: "NumPy Learning Resources",
    provider: "NumPy",
    providerGroup: "NumPy",
    providerMonogram: "NP",
    description:
      "Learn numerical arrays, broadcasting, vectorized computation, matrix operations, and scientific Python fundamentals.",
    detailedDescription:
      "The official NumPy learning hub curates beginner and intermediate tutorials on N-dimensional arrays (`ndarray`), memory layout, indexing, slicing, broadcasting rules, and linear algebra routines. Mastering NumPy vectorization in Phase 0 directly prepares you for PyTorch tensors in Phase 3.",
    primaryPhase: 0,
    phases: [0],
    relevantModuleIds: ["p0-m3"],
    phasePlacements: [
      {
        phase: 0,
        catalogCode: "0.3",
        role: "practice_and_reference",
        phaseGuidance:
          "Essential companion for Module 0.3. Work through 'NumPy: the absolute basics for beginners' and the broadcasting guides.",
        moduleIds: ["p0-m3"],
      },
    ],
    resourceType: "Documentation",
    formatSubtitle: "Documentation / Tutorials",
    difficulty: "foundational",
    difficultyLabel: "Beginner",
    language: "English",
    url: "https://numpy.org/learn/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote: "100% open-source documentation and interactive tutorials.",
    prerequisites: ["Basic Python syntax (loops, lists, functions)."],
    learningObjectives: [
      "Create, reshape, slice, and index N-dimensional NumPy arrays.",
      "Replace slow Python loops with vectorized array operations and broadcasting.",
      "Execute matrix multiplication (`@`), transposes, and reductions across axes.",
    ],
    suggestedLearningPosition: "Phase 0 Core Reference for Module 0.3",
    recommendedOrder: 3,
    isRecommended: false,
    tags: ["NumPy", "Vectors", "Matrices", "Broadcasting", "Vectorization"],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on numpy.org/learn/.",
    },
    relatedResourceIds: [
      "harvard-cs50-python",
      "pandas-getting-started-tutorials",
      "matplotlib-tutorials",
    ],
  },
  {
    id: "pandas-getting-started-tutorials",
    slug: "pandas-getting-started-intro-tutorials",
    title: "Pandas Getting Started Tutorials",
    provider: "Pandas",
    providerGroup: "Pandas",
    providerMonogram: "PD",
    description:
      "Learn to load, inspect, filter, clean, and manipulate structured datasets.",
    detailedDescription:
      "The official Pandas introductory tutorials teach tabular data handling using `DataFrame` and `Series` objects. You learn how to read CSV/Parquet files, select subsets of rows and columns, compute summary statistics, handle missing values, and prepare clean datasets for machine learning pipelines.",
    primaryPhase: 0,
    phases: [0],
    relevantModuleIds: ["p0-m4"],
    phasePlacements: [
      {
        phase: 0,
        catalogCode: "0.4",
        role: "practice_and_reference",
        phaseGuidance:
          "Study alongside Module 0.4 to practice loading, inspecting, filtering, and cleaning tabular CSV datasets.",
        moduleIds: ["p0-m4"],
      },
    ],
    resourceType: "Documentation",
    formatSubtitle: "Documentation / Tutorials",
    difficulty: "foundational",
    difficultyLabel: "Beginner",
    language: "English",
    url: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote: "Official open-source Pandas documentation and tutorials.",
    prerequisites: ["Python fundamentals and basic NumPy arrays."],
    learningObjectives: [
      "Load and save tabular data from CSV and structured formats.",
      "Filter rows, select columns, and handle missing (`NaN`) values.",
      "Compute grouped aggregations and summary statistics on datasets.",
    ],
    suggestedLearningPosition: "Phase 0 Module 0.4 Data Handling Reference",
    recommendedOrder: 4,
    isRecommended: false,
    tags: ["Pandas", "DataFrames", "Data Cleaning", "CSV", "Tabular Data"],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on pandas.pydata.org intro tutorials.",
    },
    relatedResourceIds: [
      "numpy-learning-resources",
      "matplotlib-tutorials",
      "scikit-learn-tutorials",
    ],
  },
  {
    id: "matplotlib-tutorials",
    slug: "matplotlib-official-tutorials",
    title: "Matplotlib Tutorials",
    provider: "Matplotlib",
    providerGroup: "Matplotlib",
    providerMonogram: "MP",
    description:
      "Learn scientific plotting, mathematical visualization, and data visualization in Python.",
    detailedDescription:
      "The official Matplotlib tutorials guide you through plotting mathematical functions, loss curves, histograms, scatter plots, and multi-panel diagnostic figures. Visualizing gradients, decision boundaries, and training loss curves is an indispensable debugging skill across every phase of AI engineering.",
    primaryPhase: 0,
    phases: [0],
    relevantModuleIds: ["p0-m4"],
    phasePlacements: [
      {
        phase: 0,
        catalogCode: "0.5",
        role: "practice_and_reference",
        phaseGuidance:
          "Use during Module 0.4 to plot mathematical functions, numerical derivatives, and dataset distributions.",
        moduleIds: ["p0-m4"],
      },
    ],
    resourceType: "Documentation",
    formatSubtitle: "Documentation / Tutorials",
    difficulty: "foundational",
    difficultyLabel: "Beginner",
    language: "English",
    url: "https://matplotlib.org/stable/tutorials/index.html",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote: "100% free open-source documentation and runnable examples.",
    prerequisites: ["Basic Python and NumPy arrays."],
    learningObjectives: [
      "Create line plots, scatter plots, and histograms using `pyplot` and Axes objects.",
      "Visualize mathematical functions, derivatives, and training loss trajectories.",
      "Customize labels, legends, subplots, and figure layouts for technical reports.",
    ],
    suggestedLearningPosition: "Phase 0 Module 0.4 Visualization Reference",
    recommendedOrder: 5,
    isRecommended: false,
    tags: ["Matplotlib", "Plotting", "Visualization", "Loss Curves"],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on matplotlib.org/stable/tutorials/index.html.",
    },
    relatedResourceIds: [
      "numpy-learning-resources",
      "pandas-getting-started-tutorials",
    ],
  },

  // ============================================================================
  // PHASE 1 — MATHEMATICS FOR AI
  // ============================================================================
  {
    id: "3blue1brown-essence-of-linear-algebra",
    slug: "3blue1brown-essence-of-linear-algebra",
    title: "Essence of Linear Algebra",
    provider: "3Blue1Brown",
    providerGroup: "3Blue1Brown",
    providerMonogram: "3B",
    description:
      "Visual explanations of vectors, transformations, matrix multiplication, eigenvectors, and the intuition behind linear algebra.",
    detailedDescription:
      "Grant Sanderson's renowned visual series transforms linear algebra from dry grid arithmetic into vivid geometric intuition. By animating basis vectors, linear transformations, determinants, dot products, change of basis, and eigenvectors, this series makes the geometry of neural network weight matrices and attention projections click immediately.",
    primaryPhase: 1,
    phases: [1],
    relevantModuleIds: ["p1-m1"],
    phasePlacements: [
      {
        phase: 1,
        catalogCode: "1.1",
        role: "start_here",
        isRecommendedStart: true,
        phaseGuidance:
          "Start Phase 1 here before diving into proof-heavy problem sets. Watch all chapters alongside Module 1.1 to build geometric intuition for matrix multiplication and eigen-decompositions.",
        moduleIds: ["p1-m1"],
      },
    ],
    resourceType: "Video Series",
    difficulty: "foundational",
    difficultyLabel: "Beginner",
    language: "English",
    url: "https://www.3blue1brown.com/topics/linear-algebra",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "All video lessons and interactive written companions are freely available without registration.",
    prerequisites: ["High-school algebra and basic coordinate geometry."],
    learningObjectives: [
      "Visualize matrices as linear transformations of space and basis vectors.",
      "Understand the geometric duality between dot products and projections.",
      "Grasp determinants, rank, column space, null space, and eigenvectors intuitively.",
    ],
    suggestedLearningPosition:
      "Phase 1 Primary Starting Resource (Module 1.1)",
    recommendedOrder: 6,
    isRecommended: true,
    tags: [
      "Linear Algebra",
      "Vectors",
      "Matrices",
      "Eigenvectors",
      "Geometric Intuition",
      "3Blue1Brown",
    ],
    verification: {
      status: "verified_redirect",
      checkedDate: "2026-11-09",
      resolvedUrl: "https://www.3blue1brown.com/?topic=linear-algebra",
      note: "Verified HTTP 200 (official redirect to ?topic=linear-algebra).",
    },
    relatedResourceIds: [
      "mit-18-06sc-linear-algebra",
      "3blue1brown-essence-of-calculus",
      "mathematics-for-machine-learning-book",
    ],
  },
  {
    id: "mit-18-06sc-linear-algebra",
    slug: "mit-18-06sc-linear-algebra",
    title: "Linear Algebra (18.06SC)",
    provider: "MIT OpenCourseWare",
    providerGroup: "MIT",
    providerMonogram: "MIT",
    description:
      "A university-level linear algebra course covering vector spaces, matrices, linear systems, eigenvalues, and related topics.",
    detailedDescription:
      "Professor Gilbert Strang's legendary MIT 18.06 Scholar course is the gold-standard university curriculum for applied linear algebra. Divided into three units—Ax = b and the Four Subspaces, Least Squares and Orthogonality, and Eigenvalues and Positive Definite Matrices (including SVD)—it provides complete lecture videos, recitation problem walkthroughs, and exams with solutions.",
    primaryPhase: 1,
    phases: [1],
    relevantModuleIds: ["p1-m1"],
    phasePlacements: [
      {
        phase: 1,
        catalogCode: "1.2",
        role: "start_here",
        isRecommendedStart: true,
        phaseGuidance:
          "Pair directly with 3Blue1Brown during Module 1.1. Focus on Matrix Multiplication, Orthogonality/Projections, Eigenvalues, and Singular Value Decomposition (SVD).",
        moduleIds: ["p1-m1"],
      },
    ],
    resourceType: "Full Course",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "Complete MIT OpenCourseWare Scholar edition with full video lectures, recitation videos, problem sets, and exams with solutions—100% free.",
    prerequisites: ["Phase 0 Python/NumPy basics and high-school algebra."],
    learningObjectives: [
      "Perform matrix multiplication via row, column, and outer-product viewpoints.",
      "Understand orthogonality, projections, and least-squares approximations.",
      "Compute eigenvalues, eigenvectors, positive definite matrices, and SVD.",
    ],
    suggestedLearningPosition:
      "Phase 1 Core University Course (Module 1.1 Linear Algebra)",
    recommendedOrder: 7,
    isRecommended: true,
    tags: [
      "MIT OCW",
      "Gilbert Strang",
      "Linear Algebra",
      "SVD",
      "Eigenvalues",
      "Subspaces",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on ocw.mit.edu.",
    },
    relatedResourceIds: [
      "3blue1brown-essence-of-linear-algebra",
      "mathematics-for-machine-learning-book",
      "mit-18-02sc-multivariable-calculus",
    ],
  },
  {
    id: "3blue1brown-essence-of-calculus",
    slug: "3blue1brown-essence-of-calculus",
    title: "Essence of Calculus",
    provider: "3Blue1Brown",
    providerGroup: "3Blue1Brown",
    providerMonogram: "3B",
    description:
      "Intuitive visual lessons explaining derivatives, integrals, and fundamental calculus concepts.",
    detailedDescription:
      "Before computing gradients across deep computational graphs, you need an intuitive grasp of rates of change, tiny nudges (`dx`), power/product/exponential rules, and the chain rule. This visual series builds calculus from geometric principles so you feel how small parameter perturbations affect model loss.",
    primaryPhase: 1,
    phases: [1],
    relevantModuleIds: ["p1-m2"],
    phasePlacements: [
      {
        phase: 1,
        catalogCode: "1.3",
        role: "additional_learning",
        phaseGuidance:
          "Watch at the start of Module 1.2, paying special attention to the episodes on the Chain Rule, Exponential derivatives, and Taylor series.",
        moduleIds: ["p1-m2"],
      },
    ],
    resourceType: "Video Series",
    difficulty: "foundational",
    difficultyLabel: "Beginner",
    language: "English",
    url: "https://www.3blue1brown.com/topics/calculus",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "All video chapters and interactive text versions are freely accessible.",
    prerequisites: ["Functions, graphs, and algebra."],
    learningObjectives: [
      "Understand derivatives as local linear sensitivity to small input perturbations.",
      "Visualize the chain rule as multiplying rates of change along composed functions.",
      "Understand exponential functions, implicit differentiation, and Taylor approximations.",
    ],
    suggestedLearningPosition:
      "Phase 1 Visual Intuition for Module 1.2 (Calculus)",
    recommendedOrder: 8,
    isRecommended: false,
    tags: ["Calculus", "Derivatives", "Chain Rule", "3Blue1Brown"],
    verification: {
      status: "verified_redirect",
      checkedDate: "2026-11-09",
      resolvedUrl: "https://www.3blue1brown.com/?topic=calculus",
      note: "Verified HTTP 200 (official redirect to ?topic=calculus).",
    },
    relatedResourceIds: [
      "mit-18-01sc-single-variable-calculus",
      "mit-18-02sc-multivariable-calculus",
      "3blue1brown-essence-of-linear-algebra",
    ],
  },
  {
    id: "mit-18-01sc-single-variable-calculus",
    slug: "mit-18-01sc-single-variable-calculus",
    title: "Single Variable Calculus",
    provider: "MIT OpenCourseWare",
    providerGroup: "MIT",
    providerMonogram: "MIT",
    description:
      "Comprehensive MIT OpenCourseWare Scholar course covering differentiation, the chain rule, optimization of single-variable functions, and integration.",
    detailedDescription:
      "MIT 18.01SC provides structured video lectures, recitation exercises, and worked problem sets covering limits, differentiation rules, chain rule, maxima/minima optimization, exponential/logarithmic derivatives, and integration fundamentals.",
    primaryPhase: 1,
    phases: [1],
    relevantModuleIds: ["p1-m2"],
    phasePlacements: [
      {
        phase: 1,
        catalogCode: "1.4",
        role: "additional_learning",
        phaseGuidance:
          "Focus on Part I (Differentiation) and Part II (Applications of Differentiation & Optimization) if you need rigorous practice with single-variable derivatives before multivariable gradients.",
        moduleIds: ["p1-m2"],
      },
    ],
    resourceType: "Full Course",
    difficulty: "foundational",
    difficultyLabel: "Beginner",
    language: "English",
    url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free MIT OpenCourseWare Scholar course with lectures, notes, and problem set solutions.",
    prerequisites: ["High-school algebra and trigonometry."],
    learningObjectives: [
      "Compute analytical derivatives of polynomial, exponential, logarithmic, and composite functions.",
      "Apply the chain rule fluently and find critical points for optimization.",
      "Use linear and quadratic Taylor approximations near operating points.",
    ],
    suggestedLearningPosition:
      "Phase 1 Module 1.2 Single-Variable Calculus Reference",
    recommendedOrder: 9,
    isRecommended: false,
    tags: ["MIT OCW", "Calculus", "Differentiation", "Optimization"],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on ocw.mit.edu.",
    },
    relatedResourceIds: [
      "3blue1brown-essence-of-calculus",
      "mit-18-02sc-multivariable-calculus",
    ],
  },
  {
    id: "mit-18-02sc-multivariable-calculus",
    slug: "mit-18-02sc-multivariable-calculus",
    title: "Multivariable Calculus",
    provider: "MIT OpenCourseWare",
    providerGroup: "MIT",
    providerMonogram: "MIT",
    description:
      "University course on vectors, matrices, partial derivatives, gradient vectors, directional derivatives, and multivariable optimization.",
    detailedDescription:
      "Neural networks optimize scalar loss functions with respect to millions or billions of parameters simultaneously. MIT 18.02SC Part 2 (Partial Derivatives) teaches the exact mathematical machinery of partial differentiation, gradient vectors pointing in directions of steepest ascent, the multivariable chain rule, and Hessian second-derivative matrices.",
    primaryPhase: 1,
    phases: [1],
    relevantModuleIds: ["p1-m2", "p1-m4"],
    phasePlacements: [
      {
        phase: 1,
        catalogCode: "1.5",
        role: "additional_learning",
        phaseGuidance:
          "Focus heavily on Part 2 (Partial Derivatives, Gradient Vectors, Chain Rule, and Max-Min Optimization Problems) alongside Modules 1.2 and 1.4.",
        moduleIds: ["p1-m2", "p1-m4"],
      },
    ],
    resourceType: "Full Course",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free MIT OpenCourseWare Scholar course with full video lectures, notes, and problem sets.",
    prerequisites: [
      "Single-variable differentiation and basic vector operations.",
    ],
    learningObjectives: [
      "Compute partial derivatives and assemble gradient vectors for multivariable functions.",
      "Apply the multivariable chain rule across composed transformations.",
      "Analyze local minima, saddle points, and directional derivatives on loss surfaces.",
    ],
    suggestedLearningPosition:
      "Phase 1 Modules 1.2 & 1.4 (Multivariable Gradients & Optimization)",
    recommendedOrder: 10,
    isRecommended: false,
    tags: [
      "MIT OCW",
      "Multivariable Calculus",
      "Partial Derivatives",
      "Gradients",
      "Jacobians",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on ocw.mit.edu.",
    },
    relatedResourceIds: [
      "mit-18-01sc-single-variable-calculus",
      "mit-18-06sc-linear-algebra",
      "mathematics-for-machine-learning-book",
    ],
  },
  {
    id: "mit-18-05-probability-and-statistics",
    slug: "mit-18-05-introduction-to-probability-and-statistics",
    title: "Introduction to Probability and Statistics",
    provider: "MIT OpenCourseWare",
    providerGroup: "MIT",
    providerMonogram: "MIT",
    description:
      "Rigorous introduction to discrete and continuous probability distributions, conditional probability, Bayes' theorem, expectation, variance, and maximum likelihood estimation.",
    detailedDescription:
      "Language models are probabilistic next-token predictors trained via Maximum Likelihood Estimation (equivalent to minimizing cross-entropy loss). MIT 18.05 provides crystal-clear class reading notes, studio worksheets, and problem sets covering random variables, expectation, variance, Bayes' rule, and MLE.",
    primaryPhase: 1,
    phases: [1],
    relevantModuleIds: ["p1-m3"],
    phasePlacements: [
      {
        phase: 1,
        catalogCode: "1.6",
        role: "additional_learning",
        phaseGuidance:
          "Study the class reading notes on Random Variables, Expectation/Variance, Conditional Probability, and Maximum Likelihood Estimation during Module 1.3.",
        moduleIds: ["p1-m3"],
      },
    ],
    resourceType: "Full Course",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "Complete reading notes, studio exercises, exams, and solutions are freely available on MIT OCW.",
    prerequisites: ["Single-variable calculus and basic combinatorics."],
    learningObjectives: [
      "Work fluently with discrete and continuous probability distributions and conditional probabilities.",
      "Calculate expected value, variance, covariance, and Bayes' theorem updates.",
      "Derive Maximum Likelihood Estimators (MLE) and connect them to loss functions.",
    ],
    suggestedLearningPosition:
      "Phase 1 Module 1.3 (Probability, Statistics & Information Theory)",
    recommendedOrder: 11,
    isRecommended: false,
    tags: [
      "MIT OCW",
      "Probability",
      "Statistics",
      "Bayes Theorem",
      "Maximum Likelihood",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on ocw.mit.edu.",
    },
    relatedResourceIds: [
      "mathematics-for-machine-learning-book",
      "mit-18-06sc-linear-algebra",
    ],
  },
  {
    id: "mathematics-for-machine-learning-book",
    slug: "mathematics-for-machine-learning-textbook",
    title: "Mathematics for Machine Learning",
    provider: "Mathematics for Machine Learning textbook authors",
    providerGroup: "Cambridge / MML Authors",
    providerMonogram: "MM",
    description:
      "Mathematical foundations of machine learning, including linear algebra, vector calculus, probability, and optimization.",
    detailedDescription:
      "Authored by Marc Peter Deisenroth, A. Aldo Faisal, and Cheng Soon Ong (published by Cambridge University Press with a permanently free official PDF), Part I of this textbook bridges university math directly to machine learning—covering matrix decompositions, vector calculus (Jacobians and backpropagation gradients), probability distributions, and continuous optimization.",
    primaryPhase: 1,
    phases: [1, 2],
    relevantModuleIds: ["p1-m1", "p1-m2", "p1-m3", "p1-m4", "p2-m2"],
    phasePlacements: [
      {
        phase: 1,
        catalogCode: "1.7",
        role: "practice_and_reference",
        phaseGuidance:
          "Use Chapters 2–7 as your primary written textbook reference across all four modules of Phase 1 (Linear Algebra, Vector Calculus, Probability, and Optimization).",
        moduleIds: ["p1-m1", "p1-m2", "p1-m3", "p1-m4"],
      },
    ],
    resourceType: "Textbook",
    formatSubtitle: "Free Textbook",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://mml-book.github.io/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "Complete official PDF textbook and companion Jupyter notebooks are freely downloadable from the authors' website.",
    prerequisites: ["High-school math and Phase 0 Python/NumPy basics."],
    learningObjectives: [
      "Connect linear algebra decompositions (SVD, PCA) directly to dimensionality reduction.",
      "Compute gradients of matrix-vector expressions using Jacobian and chain-rule identities.",
      "Understand gradient descent with momentum and probabilistic regression from first principles.",
    ],
    suggestedLearningPosition:
      "Phase 1 Comprehensive Written Textbook Reference (Modules 1.1–1.4)",
    recommendedOrder: 12,
    isRecommended: false,
    tags: [
      "Textbook",
      "Linear Algebra",
      "Vector Calculus",
      "Optimization",
      "Probability",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on mml-book.github.io.",
    },
    relatedResourceIds: [
      "mit-18-06sc-linear-algebra",
      "mit-18-02sc-multivariable-calculus",
      "mit-18-05-probability-and-statistics",
    ],
  },

  // ============================================================================
  // PHASE 2 — MACHINE LEARNING FROM SCRATCH
  // ============================================================================
  {
    id: "google-machine-learning-crash-course",
    slug: "google-machine-learning-crash-course",
    title: "Machine Learning Crash Course",
    provider: "Google",
    providerGroup: "Google",
    providerMonogram: "GG",
    description:
      "Google's practical, interactive introduction to machine learning fundamentals, linear and logistic regression, gradient descent, generalization, regularization, and neural networks.",
    detailedDescription:
      "Google's updated Machine Learning Crash Course features interactive playgrounds, visual loss surface explorers, real-world datasets, and concise engineering explanations. It walks through linear regression, logistic regression, classification thresholds, ROC-AUC, overfitting, L1/L2 regularization, and an introduction to neural networks and embeddings.",
    primaryPhase: 2,
    phases: [2],
    relevantModuleIds: ["p2-m1", "p2-m2", "p2-m4"],
    phasePlacements: [
      {
        phase: 2,
        catalogCode: "2.1",
        role: "start_here",
        isRecommendedStart: true,
        phaseGuidance:
          "Start Phase 2 here. Complete the modules on Linear Regression, Logistic Regression, Classification Metrics, Overfitting, and Regularization alongside Modules 2.1, 2.2, and 2.4.",
        moduleIds: ["p2-m1", "p2-m2", "p2-m4"],
      },
    ],
    resourceType: "Interactive Course",
    difficulty: "foundational",
    difficultyLabel: "Beginner",
    language: "English",
    url: "https://developers.google.com/machine-learning/crash-course",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free interactive lessons, visualizations, and Colab coding exercises on Google Developers.",
    prerequisites: [
      "Phase 0 Python/NumPy and Phase 1 basic algebra, derivatives, and probability.",
    ],
    learningObjectives: [
      "Understand supervised learning framing, train/validation/test splits, and data leakage prevention.",
      "Train linear and logistic regression models via gradient descent and interpret loss curves.",
      "Evaluate classifiers using precision, recall, F1, ROC-AUC, and apply L2 regularization.",
    ],
    suggestedLearningPosition:
      "Phase 2 Primary Starting Course (Modules 2.1, 2.2 & 2.4)",
    estimatedDuration: "~15 hours",
    recommendedOrder: 13,
    isRecommended: true,
    tags: [
      "Google",
      "Machine Learning",
      "Linear Regression",
      "Logistic Regression",
      "Gradient Descent",
      "Regularization",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on developers.google.com/machine-learning/crash-course.",
    },
    relatedResourceIds: [
      "harvard-cs50-ai-python",
      "kaggle-intro-to-machine-learning",
      "scikit-learn-tutorials",
    ],
  },
  {
    id: "harvard-cs50-ai-python",
    slug: "harvard-cs50-introduction-to-artificial-intelligence-with-python",
    title: "CS50's Introduction to Artificial Intelligence with Python",
    provider: "Harvard University",
    providerGroup: "Harvard",
    providerMonogram: "HU",
    description:
      "University course exploring the foundational concepts and algorithms of modern artificial intelligence, including search, optimization, machine learning, neural networks, and natural language processing.",
    detailedDescription:
      "Taught by Brian Yu and David J. Malan, CS50 AI bridges classical algorithmic AI and modern statistical machine learning. Its lectures and Python coding projects cover optimization, probability/uncertainty, supervised learning (nearest neighbors, perceptrons, SVMs, regularization), neural networks, and attention/language fundamentals.",
    primaryPhase: 2,
    phases: [2],
    relevantModuleIds: ["p2-m1", "p2-m2", "p2-m3"],
    phasePlacements: [
      {
        phase: 2,
        catalogCode: "2.2",
        role: "additional_learning",
        phaseGuidance:
          "Focus on the lectures and projects covering Optimization, Learning (Supervised ML & Regularization), and Neural Networks.",
        moduleIds: ["p2-m1", "p2-m2", "p2-m3"],
      },
    ],
    resourceType: "Full Course",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://cs50.harvard.edu/ai/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "All lecture videos, notes, slides, and hands-on Python project specifications are 100% free on cs50.harvard.edu/ai/.",
    prerequisites: [
      "CS50P or equivalent fluency in Python programming (Phase 0).",
    ],
    learningObjectives: [
      "Implement supervised classification and regression pipelines in Python.",
      "Understand optimization landscapes, local minima, and regularization tradeoffs.",
      "Connect classical machine learning algorithms to neural network architectures.",
    ],
    suggestedLearningPosition:
      "Phase 2 Comprehensive University Course (Modules 2.1–2.3)",
    estimatedDuration: "7 weeks (self-paced)",
    recommendedOrder: 14,
    isRecommended: false,
    tags: ["Harvard", "CS50 AI", "Machine Learning", "Optimization", "Python"],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on cs50.harvard.edu/ai/.",
    },
    relatedResourceIds: [
      "harvard-cs50-python",
      "google-machine-learning-crash-course",
      "d2l-dive-into-deep-learning",
    ],
  },
  {
    id: "kaggle-intro-to-machine-learning",
    slug: "kaggle-intro-to-machine-learning",
    title: "Intro to Machine Learning",
    provider: "Kaggle",
    providerGroup: "Kaggle",
    providerMonogram: "KG",
    description:
      "Hands-on interactive micro-course covering decision trees, model validation, underfitting vs. overfitting, and random forests.",
    detailedDescription:
      "Kaggle's fast-paced interactive course gets you building and validating tabular machine learning models in browser-based coding notebooks. It focuses on decision trees, train/validation splits, Mean Absolute Error, diagnosing overfitting/underfitting, and random forest ensembles.",
    primaryPhase: 2,
    phases: [2],
    relevantModuleIds: ["p2-m1", "p2-m3", "p2-m4"],
    phasePlacements: [
      {
        phase: 2,
        catalogCode: "2.3",
        role: "practice_and_reference",
        phaseGuidance:
          "Use during Modules 2.1 and 2.3 for rapid hands-on practice with decision trees, random forests, and validation splits.",
        moduleIds: ["p2-m1", "p2-m3", "p2-m4"],
      },
    ],
    resourceType: "Interactive Course",
    difficulty: "foundational",
    difficultyLabel: "Beginner",
    language: "English",
    url: "https://www.kaggle.com/learn/intro-to-machine-learning",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "Free tutorials and in-browser Jupyter coding exercises with free completion certificate from Kaggle Learn.",
    prerequisites: ["Basic Python and Pandas familiarity."],
    learningObjectives: [
      "Build and evaluate decision tree and random forest models on tabular data.",
      "Separate training and validation datasets to measure out-of-sample generalization.",
      "Tune tree depth to balance underfitting (bias) and overfitting (variance).",
    ],
    suggestedLearningPosition:
      "Phase 2 Hands-On Practice for Modules 2.1 & 2.3",
    estimatedDuration: "~3 hours",
    recommendedOrder: 15,
    isRecommended: false,
    tags: [
      "Kaggle",
      "Decision Trees",
      "Random Forests",
      "Model Validation",
      "Overfitting",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on kaggle.com/learn/intro-to-machine-learning.",
    },
    relatedResourceIds: [
      "kaggle-intermediate-machine-learning",
      "google-machine-learning-crash-course",
      "scikit-learn-tutorials",
    ],
  },
  {
    id: "kaggle-intermediate-machine-learning",
    slug: "kaggle-intermediate-machine-learning",
    title: "Intermediate Machine Learning",
    provider: "Kaggle",
    providerGroup: "Kaggle",
    providerMonogram: "KG",
    description:
      "Practical interactive course covering missing values, categorical variables, pipelines, cross-validation, gradient boosting (XGBoost), and data leakage.",
    detailedDescription:
      "Building directly on Intro to Machine Learning, this course teaches production-grade tabular ML habits: imputing missing values without leaking validation statistics, encoding categorical features, constructing clean scikit-learn pipelines, k-fold cross-validation, gradient boosted trees, and spotting subtle target/train-test leakage.",
    primaryPhase: 2,
    phases: [2],
    relevantModuleIds: ["p2-m1", "p2-m3", "p2-m4"],
    phasePlacements: [
      {
        phase: 2,
        catalogCode: "2.4",
        role: "practice_and_reference",
        phaseGuidance:
          "Complete alongside Modules 2.3 and 2.4 to master cross-validation, gradient boosting, and preventing data leakage.",
        moduleIds: ["p2-m1", "p2-m3", "p2-m4"],
      },
    ],
    resourceType: "Interactive Course",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://www.kaggle.com/learn/intermediate-machine-learning",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote: "100% free interactive lessons and coding notebooks on Kaggle.",
    prerequisites: ["Kaggle Intro to Machine Learning or Phase 2 Module 2.1."],
    learningObjectives: [
      "Build reproducible preprocessing and modeling pipelines that prevent data leakage.",
      "Evaluate models robustly using k-fold cross-validation.",
      "Train and tune gradient boosted decision trees.",
    ],
    suggestedLearningPosition:
      "Phase 2 Practical Workflow Course (Modules 2.3 & 2.4)",
    estimatedDuration: "~4 hours",
    recommendedOrder: 16,
    isRecommended: false,
    tags: [
      "Kaggle",
      "Cross-Validation",
      "Data Leakage",
      "Gradient Boosting",
      "Pipelines",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on kaggle.com/learn/intermediate-machine-learning.",
    },
    relatedResourceIds: [
      "kaggle-intro-to-machine-learning",
      "scikit-learn-tutorials",
      "google-machine-learning-crash-course",
    ],
  },
  {
    id: "scikit-learn-tutorials",
    slug: "scikit-learn-getting-started-and-user-guide",
    title: "scikit-learn Tutorials",
    provider: "scikit-learn",
    providerGroup: "scikit-learn",
    providerMonogram: "SK",
    description:
      "Official scikit-learn getting started tutorials and user guide for classical supervised/unsupervised learning, preprocessing, cross-validation, and evaluation metrics.",
    detailedDescription:
      "In Phase 2, you implement Linear Regression, Logistic Regression, k-NN, Decision Trees, and k-Means from scratch in NumPy—and then benchmark your custom implementations against scikit-learn's reference estimators. The official scikit-learn Getting Started guide and User Guide document the exact mathematical formulations, regularization penalties, and evaluation APIs.",
    primaryPhase: 2,
    phases: [2],
    relevantModuleIds: ["p2-m1", "p2-m2", "p2-m3", "p2-m4"],
    phasePlacements: [
      {
        phase: 2,
        catalogCode: "2.5",
        role: "practice_and_reference",
        phaseGuidance:
          "Use as your reference benchmark when verifying your from-scratch NumPy implementations of Linear/Logistic Regression, Decision Trees, PCA, and k-Means.",
        moduleIds: ["p2-m1", "p2-m2", "p2-m3", "p2-m4"],
      },
    ],
    resourceType: "Documentation",
    formatSubtitle: "Documentation / Tutorials",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://scikit-learn.org/stable/getting_started.html",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote: "100% free open-source documentation and runnable examples.",
    prerequisites: ["Python, NumPy, and basic machine learning concepts."],
    learningObjectives: [
      "Use estimator APIs (`fit`, `predict`, `transform`) and Pipeline objects cleanly.",
      "Benchmark from-scratch NumPy algorithms against reference solvers.",
      "Compute classification and regression metrics (`roc_auc_score`, `f1_score`, `confusion_matrix`).",
    ],
    suggestedLearningPosition:
      "Phase 2 Reference & Verification Benchmark (Modules 2.1–2.4)",
    recommendedOrder: 17,
    isRecommended: false,
    tags: [
      "scikit-learn",
      "Classical ML",
      "Classification",
      "Regression",
      "Clustering",
      "PCA",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Updated from legacy /stable/tutorial/index.html (HTTP 404) to official replacement https://scikit-learn.org/stable/getting_started.html (HTTP 200).",
    },
    relatedResourceIds: [
      "google-machine-learning-crash-course",
      "kaggle-intermediate-machine-learning",
      "numpy-learning-resources",
    ],
  },
  {
    id: "d2l-dive-into-deep-learning",
    slug: "dive-into-deep-learning-d2l-textbook",
    title: "Dive into Deep Learning",
    provider: "D2L",
    providerGroup: "D2L",
    providerMonogram: "D2L",
    description:
      "Free interactive textbook combining mathematical explanations, code, and practical deep-learning concepts.",
    detailedDescription:
      "Authored by Aston Zhang, Zachary C. Lipton, Mu Li, and Alexander J. Smola, Dive into Deep Learning (D2L) is an interactive open-source textbook adopted by hundreds of universities worldwide. Every section pairs mathematical derivations with runnable PyTorch code—bridging linear regression and softmax classification in Phase 2 directly to multilayer perceptrons, initialization, normalization, and modern deep architectures in Phase 3.",
    primaryPhase: 2,
    phases: [2, 3],
    relevantModuleIds: ["p2-m2", "p2-m4", "p3-m1", "p3-m3", "p3-m4"],
    phasePlacements: [
      {
        phase: 2,
        catalogCode: "2.6",
        role: "advanced_reading",
        phaseGuidance:
          "Read Chapters 3 and 4 (Linear Neural Networks for Regression and Classification) to see how classical linear and softmax regression transition into deep learning.",
        moduleIds: ["p2-m2", "p2-m4"],
      },
      {
        phase: 3,
        catalogCode: "3.4",
        role: "additional_learning",
        phaseGuidance:
          "Study Chapters 5, 6, and 12 (Multilayer Perceptrons, Forward/Backward Propagation, Numerical Stability/Initialization, and Optimization Algorithms) alongside Phase 3.",
        moduleIds: ["p3-m1", "p3-m3", "p3-m4"],
      },
    ],
    resourceType: "Textbook",
    formatSubtitle: "Interactive Textbook",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://d2l.smola.org/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "Entire interactive textbook and runnable PyTorch notebooks are 100% free and open-access online.",
    prerequisites: [
      "Python, NumPy, linear algebra, calculus, and basic probability (Phases 0–1).",
    ],
    learningObjectives: [
      "Implement linear regression, softmax regression, and MLPs from scratch and in PyTorch.",
      "Analyze vanishing/exploding gradients, Xavier/He initialization, dropout, and weight decay.",
      "Compare SGD, Momentum, RMSProp, and Adam optimization dynamics mathematically and empirically.",
    ],
    suggestedLearningPosition:
      "Cross-Phase Interactive Textbook (Phase 2 Module 2.2 & Phase 3 Modules 3.1–3.4)",
    recommendedOrder: 18,
    isRecommended: false,
    tags: [
      "D2L",
      "Interactive Textbook",
      "Deep Learning",
      "PyTorch",
      "MLP",
      "Optimization",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on d2l.smola.org (canonical shared record across Phase 2 [2.6] and Phase 3 [3.4]).",
    },
    relatedResourceIds: [
      "karpathy-zero-to-hero",
      "pytorch-beginner-tutorials",
      "mathematics-for-machine-learning-book",
    ],
  },

  // ============================================================================
  // PHASE 3 — DEEP LEARNING & NEURAL NETWORKS (including Multi-Phase Karpathy)
  // ============================================================================
  {
    id: "karpathy-zero-to-hero",
    slug: "andrej-karpathy-neural-networks-zero-to-hero",
    title: "Neural Networks: Zero to Hero",
    provider: "Andrej Karpathy",
    providerGroup: "Andrej Karpathy",
    providerMonogram: "AK",
    description:
      "A code-first introduction to neural networks covering automatic differentiation, backpropagation, language models, and GPT implementations.",
    detailedDescription:
      "Andrej Karpathy's flagship code-first lecture series is the backbone of Phases 3, 4, and 5 of this curriculum. Starting from an empty Python file, you build `micrograd` (a scalar reverse-mode autograd engine), progress through `makemore` (character-level language models using bigrams, MLPs, BatchNorm, diagnostic histograms, backprop ninja, and WaveNet), build a GPT tokenizer from scratch (`minbpe`), and culminate in implementing and training a GPT-2 decoder-only Transformer in PyTorch.",
    primaryPhase: 3,
    phases: [3, 4, 5],
    relevantModuleIds: [
      "p3-m1",
      "p3-m2",
      "p3-m3",
      "p4-m2",
      "p4-m3",
      "p4-m4",
      "p5-m1",
      "p5-m2",
      "p5-m3",
      "p5-m4",
      "p5-m5",
    ],
    phasePlacements: [
      {
        phase: 3,
        catalogCode: "3.1",
        role: "start_here",
        isRecommendedStart: true,
        phaseGuidance:
          "Start Phase 3 here! Watch Lecture 1 ('The spelled-out intro to neural networks and backpropagation: building micrograd') and Lectures 4–5 ('Becoming a Backprop Ninja' & activation/gradient diagnostics).",
        moduleIds: ["p3-m1", "p3-m2", "p3-m3"],
      },
      {
        phase: 4,
        catalogCode: "4.3",
        phaseSpecificTitle: "Makemore — Neural Networks: Zero to Hero",
        role: "additional_learning",
        phaseGuidance:
          "In Phase 4, focus on the Makemore lectures (Bigrams, MLP character language model, and 'Let's build the GPT Tokenizer') to implement BPE tokenization and autoregressive character/subword modeling from scratch.",
        moduleIds: ["p4-m2", "p4-m3", "p4-m4"],
      },
      {
        phase: 5,
        catalogCode: "5.1",
        phaseSpecificTitle: "Neural Networks: Zero to Hero — GPT",
        role: "start_here",
        isRecommendedStart: true,
        phaseGuidance:
          "Start Phase 5 with the final two lectures of Zero to Hero: 'Let's build GPT: from scratch, in code, spelled out' and 'Let's reproduce GPT-2 (124M)' to implement every block of your Mini GPT.",
        moduleIds: ["p5-m1", "p5-m2", "p5-m3", "p5-m4", "p5-m5"],
      },
    ],
    resourceType: "Video Series",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://karpathy.ai/zero-to-hero.html",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "All video lectures, GitHub repositories (micrograd, makemore, minbpe, nanoGPT), and Jupyter notebooks are 100% free and open-source.",
    prerequisites: [
      "Solid Python & NumPy fluency (Phase 0) and multivariable calculus/matrix multiplication (Phase 1).",
    ],
    learningObjectives: [
      "Build a reverse-mode automatic differentiation engine (`micrograd`) and verify gradients.",
      "Construct and diagnose multi-layer neural networks, activations, and batch/layer normalization.",
      "Implement Byte Pair Encoding (BPE) tokenizers, character language models (`makemore`), and decoder-only GPT Transformers from scratch.",
    ],
    suggestedLearningPosition:
      "Core Spine across Phase 3 (Autograd/DL), Phase 4 (Makemore/Tokenizers), and Phase 5 (GPT From Scratch)",
    recommendedOrder: 19,
    isRecommended: true,
    tags: [
      "Andrej Karpathy",
      "Micrograd",
      "Makemore",
      "Backpropagation",
      "Autograd",
      "Tokenizers",
      "GPT",
      "PyTorch",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on karpathy.ai/zero-to-hero.html (canonical shared record for 3.1, 4.3, and 5.1).",
    },
    relatedResourceIds: [
      "karpathy-lets-build-gpt-lecture",
      "karpathy-nanogpt",
      "pytorch-beginner-tutorials",
      "stanford-cs336",
    ],
  },
  {
    id: "fastai-practical-deep-learning",
    slug: "fastai-practical-deep-learning-for-coders",
    title: "Practical Deep Learning for Coders",
    provider: "fast.ai",
    providerGroup: "fast.ai",
    providerMonogram: "FA",
    description:
      "Top-down, code-first course teaching practical deep learning, neural network training dynamics, transfer learning, and PyTorch foundations.",
    detailedDescription:
      "Created by Jeremy Howard, fast.ai's Practical Deep Learning for Coders takes a top-down pedagogical approach—getting models training early and progressively peeling back the layers to implement stochastic gradient descent, matrix multiplications, activations, and training loops in pure PyTorch and Excel/notebooks.",
    primaryPhase: 3,
    phases: [3],
    relevantModuleIds: ["p3-m1", "p3-m3", "p3-m4"],
    phasePlacements: [
      {
        phase: 3,
        catalogCode: "3.2",
        role: "additional_learning",
        phaseGuidance:
          "Use Part 1 Lessons 3–5 for practical intuition on SGD, learning rates, matrix multiplication, and building neural nets from the foundations.",
        moduleIds: ["p3-m1", "p3-m3", "p3-m4"],
      },
    ],
    resourceType: "Full Course",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://course.fast.ai/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "All video lectures, Jupyter notebooks, open-source book chapters (fastbook), and forums are 100% free without ads or paywalls.",
    prerequisites: ["At least one year of coding experience (or Phase 0–2)."],
    learningObjectives: [
      "Train and debug neural networks using modern learning rate schedules and regularization.",
      "Understand how high-level deep learning abstractions map down to raw PyTorch tensors and SGD loops.",
      "Prevent overfitting using data augmentation, weight decay, and validation monitoring.",
    ],
    suggestedLearningPosition:
      "Phase 3 Practical Complement to Karpathy Zero to Hero (Modules 3.1, 3.3 & 3.4)",
    recommendedOrder: 20,
    isRecommended: false,
    tags: ["fast.ai", "Jeremy Howard", "Deep Learning", "PyTorch", "SGD"],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on course.fast.ai.",
    },
    relatedResourceIds: [
      "karpathy-zero-to-hero",
      "pytorch-beginner-tutorials",
      "d2l-dive-into-deep-learning",
    ],
  },
  {
    id: "pytorch-beginner-tutorials",
    slug: "pytorch-learn-the-basics-tutorials",
    title: "PyTorch Beginner Tutorials",
    provider: "PyTorch",
    providerGroup: "PyTorch",
    providerMonogram: "PT",
    description:
      "Official 'Learn the Basics' tutorial series covering PyTorch Tensors, Datasets/DataLoaders, `nn.Module`, `torch.autograd`, optimization loops, and model checkpointing.",
    detailedDescription:
      "After building your own autograd engine and NumPy neural network in Modules 3.1–3.3, Module 3.4 transitions you to PyTorch. The official 'Learn the Basics' 7-part tutorial walks through every core PyTorch primitive: Tensors, Datasets & DataLoaders, Transforms, Building Neural Networks (`nn.Module`), Automatic Differentiation (`torch.autograd`), Optimizing Model Parameters, and Saving/Loading state dicts.",
    primaryPhase: 3,
    phases: [3],
    relevantModuleIds: ["p3-m4"],
    phasePlacements: [
      {
        phase: 3,
        catalogCode: "3.3",
        role: "practice_and_reference",
        phaseGuidance:
          "Required hands-on tutorial for Module 3.4 (PyTorch Fundamentals). Complete all 7 sections of 'Learn the Basics'.",
        moduleIds: ["p3-m4"],
      },
    ],
    resourceType: "Documentation",
    formatSubtitle: "Documentation / Tutorials",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://docs.pytorch.org/tutorials/beginner/basics/intro.html",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free official PyTorch documentation with downloadable Jupyter notebooks.",
    prerequisites: [
      "Python, NumPy arrays, and understanding of gradients/backpropagation (Modules 3.1–3.3).",
    ],
    learningObjectives: [
      "Manipulate PyTorch tensors across CPU and GPU devices.",
      "Construct custom `Dataset`, `DataLoader`, and `nn.Module` classes.",
      "Write complete `zero_grad() -> backward() -> step()` training loops and save `state_dict` checkpoints.",
    ],
    suggestedLearningPosition:
      "Phase 3 Module 3.4 Core Tutorial (PyTorch Fundamentals)",
    recommendedOrder: 21,
    isRecommended: false,
    tags: [
      "PyTorch",
      "Tensors",
      "Autograd",
      "nn.Module",
      "DataLoader",
      "Training Loop",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on docs.pytorch.org/tutorials/beginner/basics/intro.html.",
    },
    relatedResourceIds: [
      "karpathy-zero-to-hero",
      "d2l-dive-into-deep-learning",
      "pytorch-char-rnn-tutorial",
    ],
  },
  {
    id: "stanford-cs231n",
    slug: "stanford-cs231n-deep-learning-for-computer-vision",
    title: "CS231n — Deep Learning for Computer Vision",
    provider: "Stanford University",
    providerGroup: "Stanford",
    providerMonogram: "SU",
    description:
      "Stanford's foundational deep learning course materials covering linear classifiers, optimization, backpropagation computational graphs, neural network training dynamics, and representation learning.",
    detailedDescription:
      "Originally co-created by Fei-Fei Li and Andrej Karpathy, Stanford CS231n features some of the clearest written course notes and coding assignments ever created on backpropagation, computational graphs, weight initialization, batch normalization, and training diagnostics. Note: While current-quarter Stanford enrollment lectures are restricted to Stanford students, the comprehensive written course notes (`cs231n.github.io`), syllabus, slides, and archived lecture series are publicly accessible.",
    primaryPhase: 3,
    phases: [3],
    relevantModuleIds: ["p3-m1", "p3-m2", "p3-m3"],
    phasePlacements: [
      {
        phase: 3,
        catalogCode: "3.5",
        role: "advanced_reading",
        phaseGuidance:
          "Read the publicly accessible CS231n written notes on Optimization, Backpropagation Intuition, and Neural Networks Part 1–3 (Activations, Initialization, Babysitting the Learning Process).",
        moduleIds: ["p3-m1", "p3-m2", "p3-m3"],
      },
    ],
    resourceType: "Full Course",
    formatSubtitle: "University Course Materials",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://cs231n.stanford.edu/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "Publicly accessible materials include the official written course notes, lecture slides, syllabus, and assignments. Current-semester live Stanford classroom recordings are restricted to enrolled students, though archived lecture playlists are publicly available.",
    prerequisites: [
      "Python/NumPy, linear algebra, multivariable calculus, and probability (Phases 0–2).",
    ],
    learningObjectives: [
      "Master modular backpropagation using local Jacobian gradients on computational graphs.",
      "Diagnose learning rate, weight initialization, and dead activation pathologies.",
      "Implement multi-layer neural networks and optimizers in vectorized NumPy and PyTorch.",
    ],
    suggestedLearningPosition:
      "Phase 3 Deep-Dive Written Notes & Assignments (Modules 3.1–3.3)",
    recommendedOrder: 22,
    isRecommended: false,
    tags: [
      "Stanford",
      "CS231n",
      "Backpropagation",
      "Computational Graphs",
      "Weight Initialization",
      "Deep Learning",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on cs231n.stanford.edu.",
    },
    relatedResourceIds: [
      "karpathy-zero-to-hero",
      "stanford-cs224n",
      "d2l-dive-into-deep-learning",
    ],
  },

  // ============================================================================
  // PHASE 4 — NLP & LANGUAGE MODELING
  // ============================================================================
  {
    id: "huggingface-llm-course",
    slug: "hugging-face-llm-course",
    title: "Hugging Face LLM Course",
    provider: "Hugging Face",
    providerGroup: "Hugging Face",
    providerMonogram: "HF",
    description:
      "Comprehensive open interactive course covering Transformer models, tokenization pipelines, datasets, fine-tuning, and the open-source LLM ecosystem.",
    detailedDescription:
      "The official Hugging Face LLM Course provides a structured walkthrough of modern natural language processing and large language models. Starting with how encoder, decoder, and encoder-decoder Transformers process text, it covers tokenization internals, dataset curation, supervised fine-tuning, and model sharing.",
    primaryPhase: 4,
    phases: [4],
    relevantModuleIds: ["p4-m1", "p4-m2", "p4-m5"],
    phasePlacements: [
      {
        phase: 4,
        catalogCode: "4.1",
        role: "start_here",
        isRecommendedStart: true,
        phaseGuidance:
          "Start Phase 4 here (Chapters 1 & 2) to understand how raw text flows through tokenizers, embedding layers, and language modeling heads.",
        moduleIds: ["p4-m1", "p4-m2", "p4-m5"],
      },
    ],
    resourceType: "Interactive Course",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://huggingface.co/learn/llm-course/chapter1/1",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free interactive web chapters, quizzes, and runnable Colab/Kaggle notebooks.",
    prerequisites: [
      "Python and PyTorch fundamentals (Phases 0 & 3).",
    ],
    learningObjectives: [
      "Understand how tokenization, input IDs, attention masks, and embeddings operate in NLP pipelines.",
      "Distinguish causal language modeling (GPT-style) from masked language modeling (BERT-style) and sequence-to-sequence models.",
      "Load, inspect, and run open-weight language models in PyTorch.",
    ],
    suggestedLearningPosition:
      "Phase 4 Primary Starting Course (Modules 4.1, 4.2 & 4.5)",
    recommendedOrder: 23,
    isRecommended: true,
    tags: [
      "Hugging Face",
      "NLP",
      "Language Modeling",
      "Tokenization",
      "Transformers",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on huggingface.co/learn/llm-course/chapter1/1.",
    },
    relatedResourceIds: [
      "huggingface-tokenizers-module",
      "stanford-cs224n",
      "karpathy-zero-to-hero",
    ],
  },
  {
    id: "stanford-cs224n",
    slug: "stanford-cs224n-natural-language-processing-with-deep-learning",
    title: "CS224N — Natural Language Processing with Deep Learning",
    provider: "Stanford University",
    providerGroup: "Stanford",
    providerMonogram: "SU",
    description:
      "Stanford's flagship graduate NLP curriculum covering word vectors (Word2Vec), neural language models, recurrent networks (RNN/LSTM), attention mechanisms, and pretrained Transformers.",
    detailedDescription:
      "Led by Professor Christopher Manning, Stanford CS224N provides world-class lecture slides, detailed reading notes, and coding assignments on distributed word representations, Skip-gram/CBOW embeddings, n-gram and neural language models, vanishing gradients in RNNs/LSTMs, and the transition from sequence bottlenecks to self-attention.",
    primaryPhase: 4,
    phases: [4],
    relevantModuleIds: ["p4-m3", "p4-m4", "p4-m5"],
    phasePlacements: [
      {
        phase: 4,
        catalogCode: "4.2",
        role: "additional_learning",
        phaseGuidance:
          "Read the lecture notes and slides for Lectures 1–7 (Word Vectors, Neural Classifiers, RNNs, Language Models, Perplexity, and Vanishing Gradients) alongside Modules 4.3–4.5.",
        moduleIds: ["p4-m3", "p4-m4", "p4-m5"],
      },
    ],
    resourceType: "Full Course",
    formatSubtitle: "University Course Materials",
    difficulty: "advanced",
    difficultyLabel: "Advanced",
    language: "English",
    url: "https://web.stanford.edu/class/cs224n/",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "Lecture slides, comprehensive reading notes, assignment handouts, and archived Stanford YouTube lecture playlists are publicly available.",
    prerequisites: [
      "Linear algebra, probability, calculus, and PyTorch deep learning foundations (Phases 1–3).",
    ],
    learningObjectives: [
      "Derive and train dense word embeddings (Word2Vec) and analyze embedding vector spaces.",
      "Formulate autoregressive language modeling and compute perplexity from cross-entropy loss.",
      "Understand why recurrent architectures (RNNs/LSTMs) suffer from sequential bottlenecks on long contexts.",
    ],
    suggestedLearningPosition:
      "Phase 4 University Theory & Assignments (Modules 4.3, 4.4 & 4.5)",
    recommendedOrder: 24,
    isRecommended: false,
    tags: [
      "Stanford",
      "CS224N",
      "Word Embeddings",
      "Word2Vec",
      "Language Models",
      "RNN",
      "LSTM",
      "Perplexity",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on web.stanford.edu/class/cs224n/.",
    },
    relatedResourceIds: [
      "huggingface-llm-course",
      "karpathy-zero-to-hero",
      "stanford-cs336",
    ],
  },
  {
    id: "pytorch-char-rnn-tutorial",
    slug: "pytorch-character-level-rnn-classification-tutorial",
    title: "Character-Level RNN Classification Tutorial",
    provider: "PyTorch",
    providerGroup: "PyTorch",
    providerMonogram: "PT",
    description:
      "Step-by-step PyTorch tutorial building a character-level Recurrent Neural Network from scratch without high-level RNN wrappers.",
    detailedDescription:
      "Written by Sean Robertson, this classic PyTorch tutorial implements a recurrent network from raw linear layers (`i2h` and `i2o`), encodes Unicode strings into character tensors, steps hidden states explicitly across sequence time steps, and trains the network end-to-end. Building a recurrent loop manually makes the sequential hidden-state bottleneck of RNNs concrete before you move to parallel Transformer attention in Phase 5.",
    primaryPhase: 4,
    phases: [4],
    relevantModuleIds: ["p4-m1", "p4-m4", "p4-m5"],
    phasePlacements: [
      {
        phase: 4,
        catalogCode: "4.4",
        role: "practice_and_reference",
        phaseGuidance:
          "Complete this coding tutorial during Modules 4.4 and 4.5 to experience building explicit recurrent hidden-state loops in PyTorch.",
        moduleIds: ["p4-m1", "p4-m4", "p4-m5"],
      },
    ],
    resourceType: "Tutorial",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://docs.pytorch.org/tutorials/intermediate/char_rnn_classification_tutorial.html",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free official PyTorch tutorial with downloadable Python script and Colab notebook.",
    prerequisites: ["PyTorch `nn.Module` and tensor basics (Phase 3 Module 3.4)."],
    learningObjectives: [
      "Normalize Unicode text to ASCII/character tensors for sequence modeling.",
      "Implement a Recurrent Neural Network cell explicitly using linear layers and hidden-state recurrence.",
      "Train and evaluate sequence models over variable-length character inputs.",
    ],
    suggestedLearningPosition:
      "Phase 4 Hands-On Coding Tutorial (Modules 4.4 & 4.5)",
    recommendedOrder: 25,
    isRecommended: false,
    tags: ["PyTorch", "RNN", "Character-Level", "Sequence Modeling", "Unicode"],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on docs.pytorch.org char_rnn_classification_tutorial.",
    },
    relatedResourceIds: [
      "karpathy-zero-to-hero",
      "stanford-cs224n",
      "pytorch-beginner-tutorials",
    ],
  },
  {
    id: "huggingface-tokenizers-module",
    slug: "hugging-face-llm-course-tokenizers-chapter",
    title: "Tokenizers — Hugging Face LLM Course",
    provider: "Hugging Face",
    providerGroup: "Hugging Face",
    providerMonogram: "HF",
    description:
      "Dedicated technical module diving deep into subword tokenization algorithms: Byte-Pair Encoding (BPE), WordPiece, Unigram, normalization, pre-tokenization, and building tokenizers from scratch.",
    detailedDescription:
      "Chapter 6 of the Hugging Face LLM Course focuses exclusively on the internals of modern tokenizers. It walks step by step through the tokenization pipeline (normalization, pre-tokenization, model, post-processing) and compares BPE, WordPiece, and Unigram algorithms with code implementations—making it the ideal companion to Milestone #7 (Custom BPE Tokenizer).",
    primaryPhase: 4,
    phases: [4],
    relevantModuleIds: ["p4-m1", "p4-m2"],
    phasePlacements: [
      {
        phase: 4,
        catalogCode: "4.5",
        role: "practice_and_reference",
        phaseGuidance:
          "Study directly alongside Module 4.2 when implementing your Custom BPE Tokenizer (Milestone #7).",
        moduleIds: ["p4-m1", "p4-m2"],
      },
    ],
    resourceType: "Interactive Course",
    formatSubtitle: "Course Module",
    difficulty: "intermediate",
    difficultyLabel: "Intermediate",
    language: "English",
    url: "https://huggingface.co/learn/llm-course/chapter6/1",
    isFreeLearningMaterial: true,
    accessTier: "free_open_access",
    accessNote:
      "100% free interactive module with runnable code notebooks on Hugging Face.",
    prerequisites: ["Python strings, UTF-8 basics, and Phase 4 Module 4.1."],
    learningObjectives: [
      "Implement the Byte-Pair Encoding (BPE) merge algorithm and vocabulary construction.",
      "Compare BPE, WordPiece, and SentencePiece/Unigram subword tokenizers.",
      "Train a custom tokenizer on a raw text corpus and inspect token fertility.",
    ],
    suggestedLearningPosition:
      "Phase 4 Module 4.2 Dedicated Tokenization Reference",
    recommendedOrder: 26,
    isRecommended: false,
    tags: [
      "Tokenizers",
      "BPE",
      "Byte-Pair Encoding",
      "WordPiece",
      "Unigram",
      "Hugging Face",
    ],
    verification: {
      status: "verified",
      checkedDate: "2026-11-09",
      note: "Verified HTTP 200 on huggingface.co/learn/llm-course/chapter6/1.",
    },
    relatedResourceIds: [
      "huggingface-llm-course",
      "karpathy-zero-to-hero",
      "huggingface-datasets-module",
    ],
  },
];
