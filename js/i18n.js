// 多语言文本配置
const i18n = {
  en: {
    nav: ["Works", "Writing", "Projects", "About", "Archive"],
    logo: "Cogniven",
    // index.html
    indexHeroEyebrow: "Cogniven",
    indexHeroTitle: "Cogniven",
    indexHeroText:
      "A personal system, built through work, writing, and ongoing structure.",
    indexButtonWorks: "Enter Works",
    indexButtonAbout: "About",
    indexStatement: "Statement",
    indexLead:
      "This is a personal site. It exists as a structure for keeping work, developing ideas, and recording what is made over time.",
    indexStructure: "Structure",
    indexSections: "Sections",
    indexSideText:
      "The site is organized as a set of related parts rather than separate pages.",
    indexWorks: "Works",
    indexWorksDesc:
      "Completed outputs across design, systems, and structured work.",
    indexWriting: "Writing",
    indexWritingDesc: "Essays, notes, and written forms of thinking.",
    indexProjects: "Projects",
    indexProjectsDesc: "Ongoing systems, experiments, and work in progress.",
    indexAbout: "About",
    indexAboutDesc: "Background, direction, and the logic behind this system.",
    indexArchive: "Archive",
    indexArchiveDesc: "Past material kept for continuity and reference.",
    indexApproach: "Approach",
    indexApproachTitle: "Built over time.",
    indexApproachParagraph1:
      "The system grows through use. Work is added, refined, or removed as needed, without aiming for completion.",
    indexApproachParagraph2:
      "The focus remains on clarity, structure, and the accumulation of meaningful work.",
    indexEnd: "End",
    indexClosingTitle: "A place to build\nand keep.",
    indexClosingText: "Structured, quiet, and open to change.",
    // writing.html
    writingHeroEyebrow: "Writing",
    writingHeroTitle: "Notes, essays,\nand patient thought.",
    writingHeroText:
      "Writing serves as the reflective layer of this site — a place for interpretation, structure, fragments, and fully formed text.",
    writingEditorial: "Editorial Note",
    writingLead:
      "Some texts clarify ideas already known. Others become the place where the thought itself is first discovered.",
    writingFormats: "Formats",
    writingForms: "Written forms",
    writingSideText:
      "The writing section is intended to contain both finished pieces and evolving notes, without forcing them into the same register.",
    writingEssays: "Essays",
    writingEssaysDesc:
      "Longer pieces with a clear arc, built around one question, idea, or argument.",
    writingNotes: "Notes",
    writingNotesDesc:
      "Shorter observations, provisional structures, and working formulations.",
    writingReadingLogic: "Reading Logic",
    writingStructureTitle: "Writing as structure.",
    writingStructureParagraph1:
      "Writing here is not only a record of opinion, but a device for ordering thought. The goal is not constant publication, but careful accumulation.",
    writingStructureParagraph2:
      "This section will gradually become the most book-like part of the site: slower, quieter, and more continuous than the rest.",
    writingClosingNote: "Closing",
    writingClosingTitle: "Text as a place\nto refine attention.",
    writingClosingText:
      "What is written here is meant to be read slowly, and kept if needed.",
    // projects.html
    projectsHeroEyebrow: "Projects",
    projectsHeroTitle: "Ongoing work,\nstill in formation.",
    projectsHeroText:
      "Projects collect what is active, unfinished, or still being shaped — systems under construction, experiments in progress, and structures not yet settled into final form.",
    projectsEditorial: "Editorial Note",
    projectsLead:
      "Unlike works, projects remain open. Their value often lies not only in outcome, but in direction, method, and change over time.",
    projectsCurrentAreas: "Current Areas",
    projectsActiveLines: "Active lines of work",
    projectsSideText:
      "Each project may later develop into a fuller archive with states, dates, notes, and references.",
    projectsResearch: "Research Systems",
    projectsResearchDesc:
      "Structured inquiry, evolving frameworks, and material built for long-term use.",
    projectsTechnical: "Technical Builds",
    projectsTechnicalDesc:
      "Code-based systems, tools, interfaces, and implementation experiments.",
    projectsCreative: "Creative Development",
    projectsCreativeDesc:
      "Projects focused on creative process, design, and new forms.",
    projectsPersonal: "Personal Infrastructure",
    projectsPersonalDesc:
      "Systems and tools for personal productivity, knowledge, and workflow.",
    // about.html
    aboutTitle: "About",
    aboutBrief:
      "This site gathers work, ideas, and systems, while recording explorations that remain in progress.\nIt is not only a place for display, but a working structure — one that holds thoughts still taking shape, yet continuing over time.\nWhat I seek here is something less dependent on immediate context: structures that remain stable across time, relations that hold through change, and forms that can be reused. It is, in a sense, a pursuit of continuity rather than completion.",
    aboutProfileTitle: "Profile",
    aboutProfile:
      "My work moves across art, systems, and structural design.\nI tend to break problems down into structures, then rebuild them through systems. Moving across different fields, I look for patterns and methods that can operate beyond a single context.",
    aboutFocusTitle: "Focus",
    aboutFocus:
      "Structuring complex systems into clear forms.\nDirect exploration through artistic expression.\nThe spread and evolution of behavior within groups.\nThe relationship between tools and cognitive structures.\nStability and iteration in long-term projects.",
    aboutApproachTitle: "Approach",
    aboutApproach:
      "Begin with structure, giving things a place and relation.\nObserve as it unfolds, adjust as it runs.\nAllow incompleteness to remain, and continue from it.\nDistill experience into reusable forms, so the process can extend.",
    // archive.html
    archiveTitle: "Archive",
    archiveBrief: "Stored material, past work, and experimental fragments.",
    archiveOld: "Discarded Paths",
    archiveOldDesc: "Previous iterations and discarded approaches.",
    archiveUnused: "Incomplete Fragments",
    archiveUnusedDesc: "Ideas that were explored but not developed further.",
    archiveSnapshots: "Process Snapshots",
    archiveSnapshotsDesc: "Archived states of ongoing systems.",
    worksHeroEyebrow: "Works",
    worksHeroTitle: "Current selection",
    worksHeroText:
      "A structured selection of finished work, grouped by form and disposition.",
    worksOverview: "Overview",
    worksLead:
      "This section remains organized by category. Each category opens into a dedicated page where individual works can be browsed in greater detail.",
    worksCategories: "Categories",
    worksCurrentSelection: "Current selection",
    worksSideText:
      "Choose a category to enter its archive and browse works in detail.",

    worksArtisticCreations: "Artistic Creations",
    worksArtisticCreationsDesc:
      "Image, sound, and form shaped through constraint and composition.",

    worksAnalyticalPieces: "Analytical Pieces",
    worksAnalyticalPiecesDesc:
      "Selected work focused on explanation, synthesis, and interpretive structure.",

    worksTechnicalWorks: "Technical Works",
    worksTechnicalWorksDesc:
      "Systems, tools, and code-based outputs shaped through logic and implementation.",

    worksExperimentalForms: "Experimental Forms",
    worksExperimentalFormsDesc:
      "Works that emerged from testing, iteration, or deliberate deviation.",
    worksClosingNote: "Note",
    worksClosingTitle: "Browse by structure,\nnot by sequence.",
    worksClosingText:
      "Each category opens into its own space. What matters is not order, but relation.",
    projectsClosingNote: "Note",
    projectsClosingTitle: "Work in motion,\nnot yet resolved.",
    projectsClosingText:
      "These systems remain open. Their form may change, expand, or disappear over time.",
    heroEyebrow: "Works · Artistic Creations",
    heroTitle: "Artistic Creations",
    heroText:
      "A browsable archive of artistic works, arranged as a structured grid.",
    overview: "Overview",
    lead: "This page is built for browsing first. Each work appears as a card with a cover, title, and short description.",
    selection: "Selection",
    currentWorks: "Current Works",
    sideText:
      "You can change titles, descriptions, and images later without changing the page layout.",
    searchPlaceholder: "Search works...",
    sortNewest: "Newest First",
    sortOldest: "Oldest First",
    sortAlpha: "A-Z",
    copyright: "© 2026 Cogniven. All rights reserved.",
    copyright2:
      "The works presented on this site are original and protected by copyright. Unauthorized reproduction, distribution, or commercial use is prohibited.",
  },
  zh: {
    nav: ["作品", "写作", "项目", "关于", "归档"],
    logo: "Cogniven",
    // index.html
    indexHeroEyebrow: "Cogniven",
    indexHeroTitle: "Cogniven",
    indexHeroText: "一个通过作品、写作和结构持续构建的个人系统。",
    indexButtonWorks: "进入作品",
    indexButtonAbout: "关于",
    indexStatement: "说明",
    indexLead: "这是一个个人网站，用于保存作品、发展想法和记录创作历程。",
    indexStructure: "结构",
    indexSections: "分区",
    indexSideText: "本站以相关部分组成，而非完全独立页面。",
    indexWorks: "作品",
    indexWorksDesc: "设计、系统与结构化工作的已完成输出。",
    indexWriting: "写作",
    indexWritingDesc: "文章、笔记，以及以文字展开的思考形式。",
    indexProjects: "项目",
    indexProjectsDesc: "仍在推进中的系统、实验与进行中的工作。",
    indexAbout: "关于",
    indexAboutDesc: "这个系统的背景、方向，以及其背后的组织逻辑。",
    indexArchive: "归档",
    indexArchiveDesc: "为延续性与参考而保留的既往材料。",
    indexApproach: "方法",
    indexApproachTitle: "在时间中构建。",
    indexApproachParagraph1:
      "这个系统在使用中生长。工作会随着需要被加入、调整或移除，而不以完成为目标。",
    indexApproachParagraph2:
      "重点始终放在清晰性、结构性，以及有意义工作的持续积累上。",

    indexEnd: "结束",
    indexClosingTitle: "一个用于构建\n与保存的空间。",
    indexClosingText: "结构化、安静，并对变化保持开放。",

    // writing.html
    writingHeroEyebrow: "写作",
    writingHeroTitle: "笔记、随笔，\n与耐心思考。",
    writingHeroText: "写作是本站的反思层——用于解释、结构、片段与完整文本。",
    writingEditorial: "编者注",
    writingLead: "有些文字澄清已知想法，有些则成为思想首次诞生的地方。",
    writingFormats: "体裁",
    writingForms: "写作形式",
    writingSideText: "写作区既包含成文，也容纳演化中的笔记，无需强行归一。",
    writingEssays: "长文",
    writingEssaysDesc: "有清晰结构、围绕一个问题或观点展开的长篇。",
    writingNotes: "笔记",
    writingNotesDesc: "简短观察、临时结构与工作性表述。",
    writingReadingLogic: "阅读逻辑",
    writingStructureTitle: "将写作视为结构。",
    writingStructureParagraph1:
      "这里的写作不只是观点的记录，更是一种整理思想的装置。目标不是持续发表，而是审慎地积累。",
    writingStructureParagraph2:
      "这一部分会逐渐成为整个网站里最接近“书”的区域：更缓慢、更安静，也比其他部分更连续。",
    writingClosingNote: "结语",
    writingClosingTitle: "将文本视为\n打磨注意力的场所。",
    writingClosingText: "这里写下的内容，适合被缓慢阅读，也值得在需要时保留。",
    // projects.html
    projectsHeroEyebrow: "项目",
    projectsHeroTitle: "持续推进中，\n尚在形成。",
    projectsHeroText:
      "项目收集活跃、未完成或仍在成型的内容——在建系统、进行中的实验和尚未定型的结构。",
    projectsEditorial: "编者注",
    projectsLead: "与作品不同，项目保持开放，其价值常在于方向、方法和变化。",
    projectsCurrentAreas: "当前领域",
    projectsActiveLines: "活跃工作线",
    projectsSideText:
      "每个项目未来都可能发展为包含状态、日期、笔记和参考的完整档案。",
    projectsResearch: "研究系统",
    projectsResearchDesc: "结构化探索、演化框架和为长期使用而建的材料。",
    projectsTechnical: "技术构建",
    projectsTechnicalDesc: "基于代码的系统、工具、界面与实现实验。",
    projectsCreative: "创意开发",
    projectsCreativeDesc: "聚焦创意过程、设计与新形式的项目。",
    projectsPersonal: "个人基础设施",
    projectsPersonalDesc: "用于个人效率、知识与工作流的系统和工具。",
    // about.html
    aboutTitle: "关于",
    aboutBrief:
      "这个网站用于整理作品、想法与系统，也记录一些仍在演进中的探索。\n它并不只是一个展示空间，而更像一个工作中的结构，用来容纳那些尚未定型、但不断延续的思考。\n我在这里试图寻找某种不完全依赖于具体情境的东西：在时间中保持稳定的结构，在变化中仍然成立的关系，以及那些可以被反复使用的形式。这更接近一种对“长期存在”的追求。",
    aboutProfileTitle: "个人简介",
    aboutProfile:
      "我的工作主要围绕艺术、系统与结构设计展开。\n我倾向于把问题拆解为结构，再通过系统的方式去重建它们。长期在不同领域之间移动，试图寻找可以跨场景使用的逻辑与方法。",
    aboutFocusTitle: "关注点",
    aboutFocus:
      "复杂系统的结构化表达。\n直截的艺术探索与展示。\n行为在群体中的传播与演化。\n技术工具与认知结构的结合方式。\n长期项目中的稳定性与迭代机制。",
    aboutApproachTitle: "方法",
    aboutApproach:
      "从结构开始，让事物有其位置与关系。\n在展开中观察，在运行中修正。\n允许未完成的状态存在，并从中继续推进。\n将经验沉淀为可再次调用的部分，使过程得以延续。",
    // archive.html
    archiveTitle: "归档",
    archiveBrief: "存储的资料、过往作品与实验片段。",
    archiveOld: "废弃路径",
    archiveOldDesc: "以往的迭代和被弃用的方案。",
    archiveUnused: "未竟片段",
    archiveUnusedDesc: "曾探索但未进一步发展的想法。",
    archiveSnapshots: "过程切片",
    archiveSnapshotsDesc: "在建系统的归档状态。",
    worksHeroEyebrow: "作品",
    worksHeroTitle: "当前精选",
    worksHeroText: "已完成作品的结构化归档，按形式与功能分组。",
    worksOverview: "概览",
    worksLead: "本区块按类别组织。每个类别进入后可详细预览各个作品。",
    worksCategories: "类别",
    worksCurrentSelection: "当前精选",
    worksSideText: "选择一个类别进入其归档，详细浏览作品。",
    worksArtisticCreations: "艺术创作",
    worksArtisticCreationsDesc: "图像、声音与形式在约束与构成中被塑造。",
    worksTechnicalWorks: "技术工作",
    worksTechnicalWorksDesc: "通过逻辑构建与实现形成的系统、工具与代码性成果。",
    worksAnalyticalPieces: "分析作品",
    worksAnalyticalPiecesDesc: "聚焦解释、综合与结构化阐释的精选作品。",
    worksExperimentalForms: "实验形态",
    worksExperimentalFormsDesc: "源自测试、迭代或有意偏离的作品。",
    worksClosingNote: "注",
    worksClosingTitle: "按结构浏览，\n不按顺序浏览。",
    worksClosingText:
      "每个类别都会展开成独立空间。真正重要的不是先后，而是关系。",
    projectsClosingNote: "注",
    projectsClosingTitle: "工作仍在运动中，\n尚未定稿。",
    projectsClosingText:
      "这些系统保持开放。它们的形态可能随时间改变、扩展，或消失。",
    heroEyebrow: "作品 · 艺术创作",
    heroTitle: "艺术创作",
    heroText: "一个可浏览的艺术作品档案，以结构化网格方式呈现。",
    overview: "概览",
    lead: "本页以浏览为主。每个作品以卡片形式展示，包含封面、标题和简短描述。",
    selection: "精选",
    currentWorks: "当前作品",
    sideText: "你可以随时更改标题、描述和图片，页面布局不会改变。",
    searchPlaceholder: "搜索作品...",
    sortNewest: "最新优先",
    sortOldest: "最早优先",
    sortAlpha: "字母排序",
    copyright: "© 2026 Cogniven。保留所有权利。",
    copyright2:
      "本网站展示的作品均为原创，受版权保护。<br>未经授权，禁止复制、分发或商业使用。",
  },
};
