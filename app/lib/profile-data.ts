export type Publication = {
  id: string;
  year: string;
  title: string;
  authors: string;
  venue: string;
  eventDetails?: {
    dates: string;
    place: string;
  };
  status?: string;
  url?: string;
};

export type TeachingCourse = {
  code: string;
  title: string;
  description: string;
  url: string;
  terms: Array<{
    year: string;
    semester: number;
    upcoming: boolean;
  }>;
};

export const researchThemes = [
  {
    number: "01",
    title: "Reinforcement learning for multimodal routing",
    description:
      "Learning coordinated route recommendations across multimodal transit networks, with attention to traveler preferences and system performance.",
  },
  {
    number: "02",
    title: "LLM-enhanced travel data generation",
    description:
      "Combining large language models and probabilistic modeling to generate travel survey data when only a small number of observations are available.",
  },
  {
    number: "03",
    title: "Travel behavior and traffic simulation",
    description:
      "Modeling travel choices and mobility services through data-driven methods and multimodal simulation to support transportation planning and operations.",
  },
];

export const journalPapers: Publication[] = [
  {
    id: "llm-incremental-mode-choice",
    year: "2026",
    title:
      "Addressing the online incremental transport mode choice prediction problem with an LLM-augmented class-incremental learning approach.",
    authors: "Chen, T., Shen, Z., Zhou, B., Liu, Y., Wang, S., and Ke, J.",
    venue:
      "Transportation Research Part C: Emerging Technologies, 188, 105709.",
  },
  {
    id: "dynamic-matching-radii",
    year: "2025",
    title:
      "Dynamic adjustment of matching radii under the broadcasting mode: a novel multi-task learning strategy and temporal modeling approach.",
    authors: "Chen, T., Shen, Z., Feng, S., Yang, L., and Ke, J.",
    venue:
      "Transportation Research Part E: Logistics and Transportation Review, 193, 103822.",
  },
];

export const conferencePapers: Publication[] = [
  {
    id: "trb-multimodal-route-recommendation",
    year: "2026",
    title:
      "A temporally aware deep reinforcement learning framework for centralized multi-path recommendation in large-scale multimodal transit networks.",
    authors: "Shen, Z., Chen, T., Zhou, B., Wang, J., and Ke, J.",
    venue: "105th Transportation Research Board Annual Meeting",
    eventDetails: {
      dates: "January 11-15, 2026",
      place: "Washington, DC",
    },
    status: "Conference presentation",
  },
  {
    id: "hksts-multipath",
    year: "2025",
    title:
      "Multipath: Deep learning based multimodal route guidance with user preference integration.",
    authors: "Shen, Z., Chen, T., Zhou, B., Wang, J., and Ke, J.",
    venue: "29th HKSTS International Conference",
    eventDetails: {
      dates: "December 8-9, 2025",
      place: "Hong Kong",
    },
    status: "Conference presentation",
  },
  {
    id: "hksts-personalized-fair-matching",
    year: "2024",
    title:
      "Personalized fair matching in peer-to-peer ridesharing platforms under broadcasting mode: a LLM-driven driver approach.",
    authors: "Shen, Z., Chen, T., Wang, J., and Ke, J.",
    venue: "28th HKSTS International Conference",
    eventDetails: {
      dates: "December 9-10, 2024",
      place: "Hong Kong",
    },
    status: "Conference presentation",
  },
  {
    id: "yolov5s-distance-estimation",
    year: "2023",
    title:
      "Multi-strategy collaborative optimized YOLOv5s and its application in distance estimation.",
    authors: "Shen, Z., Mu, Z., and Li, X.",
    venue: "AEECA 2023.",
  },
];

export const workingPapers: Publication[] = [
  {
    id: "lab-tab",
    year: "2026",
    title:
      "LAB-Tab: LLM-Augmented Bayesian Network Adaptation for Few-Shot Tabular Generation.",
    authors: "Shen, Z., Chen, T., Zhou, B., Jiang, Z., and Ke, J.",
    venue: "AAAI 2027",
    status: "Under review",
    url: "https://arxiv.org/abs/2608.01879",
  },
  {
    id: "lebgen",
    year: "2026",
    title:
      "LEBGen: An LLM-Enhanced Bayesian Network Framework for Few-Shot Travel Survey Data Generation.",
    authors: "Shen, Z., Zhou, B., Wang, J., Zhao, Y., and Ke, J.",
    venue: "Artificial Intelligence for Transportation",
    status: "Under review",
  },
  {
    id: "centralized-route-recommendation",
    year: "2026",
    title:
      "A Deep Reinforcement Learning Model for Centralized Route Recommendation in Multi-modal Transit Networks.",
    authors: "Shen, Z., Chen, T., Zhou, B., Wang, J., and Ke, J.",
    venue:
      "Transportation Research Part E: Logistics and Transportation Review",
    status: "Major revision",
  },
  {
    id: "smartsim",
    year: "",
    title:
      "SmartSim: A Scalable and Multimodal Open-Source Mesoscopic Urban Traffic Simulator.",
    authors: "Wang, J., Chen, T., Shen, Z., Liang, J., Zhou, B., and Ke, J.",
    venue: "Frontiers of Engineering Management",
    status: "Minor revision",
  },
];

export const education = [
  {
    dates: "09/2026 - Present",
    degree: "Doctor of Philosophy in Civil Engineering",
    school: "The University of Hong Kong",
    note: "Expected graduation 2029",
  },
  {
    dates: "09/2024 - 07/2026",
    degree: "Master of Philosophy in Civil Engineering",
    school: "The University of Hong Kong",
    note: "Graduated",
  },
  {
    dates: "09/2022 - 09/2023",
    degree: "Master of Science in Computer Science",
    school: "The University of Hong Kong",
    note: "GPA 3.47",
  },
  {
    dates: "09/2017 - 06/2021",
    degree: "Bachelor of Engineering in Automation",
    school: "Beijing Institute of Technology",
    note: "GPA 3.60",
  },
];

export const experience = [
  {
    dates: "11/2023 - 08/2024",
    role: "Research Assistant",
    institution: "The Chinese University of Hong Kong",
    note: "Full-time",
  },
  {
    dates: "09/2022 - 08/2024",
    role: "Research Assistant",
    institution: "The University of Hong Kong",
    note: "Part-time",
  },
];

export const teachingCourses: TeachingCourse[] = [
  {
    code: "CIVL3120",
    title: "Transportation Infrastructure Engineering",
    description:
      "Introduces the planning, design, delivery, and maintenance of transport infrastructure. Case studies connect demand and capacity analysis with facility design, feasibility assessment, project appraisal, procurement, and construction.",
    url: "https://engg.hku.hk/Portals/0/UG/syllabuses/Syllabus-Minor-Urban-Infrastructure-Informatics-24-25.pdf#page=7",
    terms: [{ year: "2026-2027", semester: 2, upcoming: true }],
  },
  {
    code: "CIVL7018",
    title: "Data Science for Civil Engineering",
    description:
      "Explores machine learning methods for civil engineering, including supervised, unsupervised, and reinforcement learning. Practical applications use tools such as PyTorch and scikit-learn to connect statistical models, neural networks, and clustering with engineering problems.",
    url: "https://matpp.hku.hk/programme/",
    terms: [
      { year: "2026-2027", semester: 2, upcoming: true },
      { year: "2025-2026", semester: 2, upcoming: false },
    ],
  },
  {
    code: "CIVL6047",
    title: "Traffic Management and Control",
    description:
      "Examines how transport networks operate and how traffic can be managed more effectively. Topics include network equilibrium, origin-destination estimation, road pricing, signal control, and the practical constraints of traffic management strategies.",
    url: "https://www.civil.hku.hk/CEF/civl6047.pdf",
    terms: [{ year: "2025-2026", semester: 2, upcoming: false }],
  },
  {
    code: "CIVL7021",
    title: "NEC Contract Management",
    description:
      "Examines NEC contracts in the Hong Kong construction context, with emphasis on collaborative contract administration. Topics include tendering, early warnings, programme management, payments, compensation events, risk allocation, and dispute avoidance and resolution.",
    url: "https://www.civil.hku.hk/pdf/msc/MScEng-Infrastructure_Engineering_%20Management_2025-26_Syllabus.pdf#page=5",
    terms: [{ year: "2025-2026", semester: 1, upcoming: false }],
  },
];

export const projects = [
  {
    code: "STF / PSRI/78/2311/RA",
    dates: "2024 - 2026",
    title:
      "SmartSim: AI-assisted Simulation Software for Multimodal Transportation Operations",
    funder: "Smart Traffic Fund, Hong Kong SAR Government",
  },
  {
    code: "STF / PSRI/29/2201/PR",
    dates: "2023 - 2024",
    title:
      "Development of a Simulation Platform and Artificial Intelligent Algorithms for Optimising Operation and Management of Taxi E-hailing Services",
    funder: "Smart Traffic Fund, Hong Kong SAR Government",
  },
  {
    code: "ECF / 102/2022",
    dates: "2024 - 2026",
    title:
      "Estimating carbon emissions, assessing decarbonization strategies and managing green transportation in Hong Kong with a multifunctional simulation platform",
    funder:
      "Environment Conservation Fund (ECF) Environmental Research, Technology Demonstration and Conference Projects",
  },
  {
    code: "MRF 2025 / HKU-25003",
    dates: "2026 - 2028",
    title:
      "Multimodal traffic simulation, route recommendation and subsidy: Enhancing first and last mile connectivity for MTR",
    funder: "MTR Research Funding",
  },
];

export const awards = [
  {
    year: "2024 - 2029",
    title: "Postgraduate Scholarship",
    issuer: "The University of Hong Kong",
  },
  {
    year: "2019",
    title:
      "First Prize, Contemporary Undergraduate Mathematical Contest in Modeling (Beijing)",
  },
  {
    year: "2019",
    title: "Third Prize, BIT Science Contest",
  },
  {
    year: "2017 & 2018",
    title:
      "Second-Class Scholarship for Academic Excellence, Beijing Institute of Technology Postgraduate Scholarship",
  },
];
