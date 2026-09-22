import type { Project } from './types'

/**
 * Projects. `id` is the URL slug — keep it stable once published.
 * `featured: true` shows the project on the home page.
 * `image` is the card cover; `images` is the detail-page gallery.
 * All paths point into public/images/.
 */
export const projects: Project[] = [
  {
    id: 'aerorelief',
    title: { en: 'AeroRelief', zhHant: 'AeroRelief', zhHans: 'AeroRelief' },
    tagline: {
      en: 'Autonomous UAV first-responder system for time-critical medical delivery',
      zhHant: '面向緊急醫療運送的自主無人機急救系統',
      zhHans: '面向紧急医疗运送的自主无人机急救系统',
    },
    description: {
      en: 'AeroRelief is an autonomous UAV first-responder system designed to bring vital medical aid to people in hard-to-reach areas — remote hiking trails in Sai Kung, outlying islands, places ambulances cannot reach. Powered by AI large language models, it analyses distress calls, decides what supplies are needed (AEDs, adrenaline auto-injectors), computes the optimal flight route, and delivers from the sky. A winch-based mid-air delivery system enables a safe, precise drop within the critical "golden 10 minutes", cutting a traditional ground rescue time of nearly an hour to just a few minutes. AeroRelief is one of the inaugural pilot projects of the HKSAR Government’s Low-Altitude Economy Regulatory Sandbox and the HKUST Low-Altitude Economy Research Center (LAERC), and was presented to the Chief Executive of Hong Kong.',
      zhHant: 'AeroRelief 是一套自主無人機急救系統，為身處偏遠地區的人士送上救命醫療物資——西貢郊野行山徑、離島等救護車無法到達的「盲點」。系統由 AI 大型語言模型驅動，能分析求救來電、判斷所需物資（如自動心臟除顫器、腎上腺素注射筆）、計算最佳飛行路線，從空中送達。絞盤式空中投放系統可在關鍵的「黃金十分鐘」內安全精準投放，把傳統接近一小時的地面救援時間縮短至幾分鐘。AeroRelief 是香港特區政府低空經濟「監管沙盒」及科大低空經濟研究中心（LAERC）首批試點項目之一，並曾向香港行政長官展示。',
      zhHans: 'AeroRelief 是一套自主无人机急救系统，为身处偏远地区的人士送上救命医疗物资——西贡郊野行山径、离岛等救护车无法到达的「盲点」。系统由 AI 大型语言模型驱动，能分析求救来电、判断所需物资（如自动心脏除颤器、肾上腺素注射笔）、计算最佳飞行路线，从空中送达。绞盘式空中投放系统可在关键的「黄金十分钟」内安全精准投放，把传统接近一小时的地面救援时间缩短至几分钟。AeroRelief 是香港特区政府低空经济「监管沙盒」及科大低空经济研究中心（LAERC）首批试点项目之一，并曾向香港行政长官展示。',
    },
    category: 'hardware',
    year: '2024 — Now',
    role: {
      en: 'Founder & Team Lead',
      zhHant: '創辦人兼團隊負責人',
      zhHans: '创始人兼团队负责人',
    },
    status: {
      en: 'LAE Regulatory Sandbox pilot · Award-winning',
      zhHant: '監管沙盒試點 · 獲國際獎項',
      zhHans: '监管沙盒试点 · 获国际奖项',
    },
    collaborators: [
      {
        name: 'Garmisch Wong Lai Yin 王禮彥',
        role: { en: 'Hardware Development', zhHant: '硬件開發', zhHans: '硬件开发' },
      },
      {
        name: 'Hardy Fan Tsz Ho 范子豪',
        role: { en: 'Systems & Design', zhHant: '系統與設計', zhHans: '系统与设计' },
      },
      {
        name: 'Wan Yan Ki 溫恩琪',
        role: { en: 'Team Member', zhHant: '團隊成員', zhHans: '团队成员' },
      },
      {
        name: 'Wong Pak Long 黃柏朗',
        role: { en: 'Team Member', zhHant: '團隊成員', zhHans: '团队成员' },
      },
      {
        name: 'Dr. Songfan Li 李松璠',
        role: { en: 'Research Member', zhHant: '研究成員', zhHans: '研究成员' },
        url: 'https://lisongfan.people.ust.hk',
      },
      {
        name: 'Prof. Mo Li 李默',
        role: { en: 'Principal Investigator', zhHant: '首席研究員', zhHans: '首席研究员' },
        url: 'https://www.cse.ust.hk/~lim/',
      },
      {
        name: 'Prof. Chi-Ying Tsui 徐志英',
        role: { en: 'Supervisor', zhHant: '指導教授', zhHans: '指导教授' },
      },
      {
        name: 'Dr. Jac Leung',
        role: { en: 'Supervisor', zhHant: '指導老師', zhHans: '指导老师' },
      },
    ],
    links: [
      {
        label: { en: 'CNN Tech for Good feature', zhHant: 'CNN《Tech for Good》報道', zhHans: 'CNN《Tech for Good》报道' },
        url: 'https://ais.hkust.edu.hk/whats-happening/news/isd-ug-graduates-showcase-innovative-emergency-delivery-drone-system-cnns-tech',
      },
      {
        label: { en: 'HKUST news (Low-Altitude Economy)', zhHant: '科大低空經濟報道', zhHans: '科大低空经济报道' },
        url: 'https://hkust.edu.hk/news/skys-not-limit-its-whole-new-world',
      },
      {
        label: { en: 'MobiCom 2025 awards (SRC First Place)', zhHant: 'MobiCom 2025 獲獎名單', zhHans: 'MobiCom 2025 获奖名单' },
        url: 'https://www.sigmobile.org/mobicom/2025/awards.html',
      },
    ],
    tags: ['UAV', 'AI Dispatch', 'LLM Agents', 'Emergency Response', 'Low-Altitude Economy', 'Winch Delivery'],
    highlights: [
      {
        en: 'Gold Medal with Congratulations of the Jury — 51st International Exhibition of Inventions Geneva (2026)',
        zhHant: '第 51 屆日內瓦國際發明展評審團嘉許金獎（2026）',
        zhHans: '第 51 届日内瓦国际发明展评审团嘉许金奖（2026）',
      },
      {
        en: 'First Place, Student Research Competition — ACM MobiCom 2025',
        zhHant: 'ACM MobiCom 2025 學生科研競賽第一名',
        zhHans: 'ACM MobiCom 2025 学生科研竞赛第一名',
      },
      {
        en: 'Gold Award — ASMPT Technology Award 2025',
        zhHant: 'ASMPT 科技獎 2025 金獎',
        zhHans: 'ASMPT 科技奖 2025 金奖',
      },
      {
        en: 'Featured on CNN Tech for Good, TVB News and TVBS News (2025)',
        zhHant: '登上 CNN《Tech for Good》、TVB 及 TVBS 新聞（2025）',
        zhHans: '登上 CNN《Tech for Good》、TVB 及 TVBS 新闻（2025）',
      },
      {
        en: 'HKSAR Government Low-Altitude Economy Regulatory Sandbox pilot — presented to the Chief Executive',
        zhHant: '香港特區政府低空經濟「監管沙盒」試點——向行政長官展示',
        zhHans: '香港特区政府低空经济「监管沙盒」试点——向行政长官展示',
      },
      {
        en: 'Winch-based mid-air delivery; SMS locating works without any app',
        zhHant: '絞盤式空中投放；短訊定位無需安裝 App',
        zhHans: '绞盘式空中投放；短信定位无需安装 App',
      },
    ],
    featured: true,
    image: '/images/aerorelief-1.jpg',
    images: ['/images/aerorelief-1.jpg', '/images/aerorelief-2.jpg', '/images/aerorelief-3.jpg', '/images/cnn-tech-for-good.jpg'],
    // 3D / deck slots: set modelUrl (GLB) / deckUrl (PDF) when your files are ready
  },
  {
    id: 'vr-haptics',
    title: {
      en: 'Through the Years to Touch You',
      zhHant: 'Through the Years to Touch You',
      zhHans: 'Through the Years to Touch You',
    },
    tagline: {
      en: 'VR force-feedback device based on gyroscopic precession — iF Design Award 2026',
      zhHant: '基於陀螺進動效應的 VR 力反饋裝置——iF 設計獎 2026',
      zhHans: '基于陀螺进动效应的 VR 力反馈装置——iF 设计奖 2026',
    },
    description: {
      en: 'A VR force-feedback device designed and prototyped around gyroscopic precession, letting users feel directional resistance and touch in virtual worlds. Awarded the iF Design Award 2026.',
      zhHant: '一套以陀螺進動效應為核心設計與原型製作的 VR 力反饋裝置，讓使用者在虛擬世界中感受到方向性阻力與觸感。榮獲 iF 設計獎 2026。',
      zhHans: '一套以陀螺进动效应为核心设计与原型制作的 VR 力反馈装置，让用户在虚拟世界中感受到方向性阻力与触感。荣获 iF 设计奖 2026。',
    },
    category: 'hardware',
    year: '2025 — 2026',
    role: {
      en: 'Designer & Prototyper',
      zhHant: '設計與原型製作',
      zhHans: '设计与原型制作',
    },
    status: { en: 'iF Design Award 2026', zhHant: 'iF 設計獎 2026', zhHans: 'iF 设计奖 2026' },
    collaborators: [],
    links: [],
    tags: ['VR', 'Haptics', 'Gyroscopic Precession', 'Prototyping', 'iF Design'],
    highlights: [
      {
        en: 'iF Design Award 2026',
        zhHant: 'iF 設計獎 2026',
        zhHans: 'iF 设计奖 2026',
      },
      {
        en: 'Force feedback from gyroscopic precession — no external base station needed',
        zhHant: '以陀螺進動產生力反饋——無需外部基站',
        zhHans: '以陀螺进动产生力反馈——无需外部基站',
      },
    ],
    featured: true,
  },
  {
    id: 'hk-anywhere',
    title: {
      en: 'HK Anywhere',
      zhHant: 'HK Anywhere',
      zhHans: 'HK Anywhere',
    },
    tagline: {
      en: 'Photorealistic scene generation from Hong Kong’s official 3D map',
      zhHant: '由香港官方 3D 地圖出發，生成寫實場景',
      zhHans: '由香港官方 3D 地图出发，生成写实场景',
    },
    description: {
      en: 'HK Anywhere (3dhk.jinfinite.com.hk) is a pet project that turns Hong Kong’s official 3D map data into photorealistic, explorable scenes — a bridge between open government data and immersive visualisation.',
      zhHant: 'HK Anywhere（3dhk.jinfinite.com.hk）是一個個人項目，把香港官方 3D 地圖數據轉化為寫實、可探索的場景——連接開放政府數據與沉浸式視覺化。',
      zhHans: 'HK Anywhere（3dhk.jinfinite.com.hk）是一个个人项目，把香港官方 3D 地图数据转化为写实、可探索的场景——连接开放政府数据与沉浸式视觉化。',
    },
    category: 'software',
    year: '2025 — Now',
    role: {
      en: 'Solo Developer',
      zhHant: '獨立開發',
      zhHans: '独立开发',
    },
    status: { en: 'Live (evolving)', zhHant: '已上線（持續更新）', zhHans: '已上线（持续更新）' },
    collaborators: [],
    links: [
      {
        label: { en: 'Visit 3dhk.jinfinite.com.hk', zhHant: '前往 3dhk.jinfinite.com.hk', zhHans: '前往 3dhk.jinfinite.com.hk' },
        url: 'https://3dhk.jinfinite.com.hk',
      },
    ],
    tags: ['3D', 'Web', 'GIS', 'Open Data', 'Visualisation'],
    highlights: [
      {
        en: 'Photorealistic scenes generated from official HK 3D map data',
        zhHant: '以香港官方 3D 地圖數據生成寫實場景',
        zhHans: '以香港官方 3D 地图数据生成写实场景',
      },
    ],
    featured: false,
  },
  {
    id: 'nmm-mixed-reality',
    title: {
      en: 'N:M+M — Mixed Reality Performance Arts',
      zhHant: 'N:M+M — 混合現實表演藝術',
      zhHans: 'N:M+M — 混合现实表演艺术',
    },
    tagline: {
      en: 'Exploring persistence, feedback and visualisation in MR performance',
      zhHant: '探索混合現實表演中的持續性、反饋與視覺化',
      zhHans: '探索混合现实表演中的持续性、反馈与视觉化',
    },
    description: {
      en: '“Nature: Metaphysics+ Metaphor (N:M+M)” explores how persistence, feedback and visualisation reshape mixed-reality performance arts. Published as a SIGGRAPH Asia 2024 Art Paper, the work blends live performance with interactive MR visual systems, letting performers and audience share one persistent, evolving virtual space.',
      zhHant: '《Nature: Metaphysics+ Metaphor (N:M+M)》探索持續性、反饋與視覺化如何重塑混合現實表演藝術。作品發表於 SIGGRAPH Asia 2024 藝術論文，把現場表演與互動 MR 視覺系統結合，讓表演者與觀眾共享一個持續演化的虛擬空間。',
      zhHans: '《Nature: Metaphysics+ Metaphor (N:M+M)》探索持续性、反馈与视觉化如何重塑混合现实表演艺术。作品发表于 SIGGRAPH Asia 2024 艺术论文，把现场表演与互动 MR 视觉系统结合，让表演者与观众共享一个持续演化的虚拟空间。',
    },
    category: 'research',
    year: '2024',
    role: {
      en: 'Co-author · Systems & Interaction',
      zhHant: '共同作者 · 系統與互動',
      zhHans: '共同作者 · 系统与互动',
    },
    status: { en: 'Published', zhHant: '已發表', zhHans: '已发表' },
    collaborators: [
      { name: 'Tristan Braud', role: { en: 'Lead Author', zhHant: '第一作者', zhHans: '第一作者' } },
      { name: 'B. Lau', role: { en: 'Co-author', zhHant: '共同作者', zhHans: '共同作者' } },
      { name: 'D.H.L. Chan', role: { en: 'Co-author', zhHant: '共同作者', zhHans: '共同作者' } },
      { name: 'Z. Wu', role: { en: 'Co-author', zhHant: '共同作者', zhHans: '共同作者' } },
      { name: 'V.J.S. Yong', role: { en: 'Co-author', zhHant: '共同作者', zhHans: '共同作者' } },
      { name: 'Kirill Shatilov', role: { en: 'Co-author', zhHant: '共同作者', zhHans: '共同作者' } },
    ],
    links: [
      {
        label: { en: 'Google Scholar', zhHant: 'Google 學術', zhHans: 'Google 学术' },
        url: 'https://scholar.google.com/citations?user=TltSHEoAAAAJ',
      },
    ],
    tags: ['Mixed Reality', 'SIGGRAPH Asia', 'Performance Art', 'HCI'],
    highlights: [
      {
        en: 'SIGGRAPH Asia 2024 Art Papers',
        zhHant: 'SIGGRAPH Asia 2024 藝術論文',
        zhHans: 'SIGGRAPH Asia 2024 艺术论文',
      },
      {
        en: 'Persistent shared virtual space for performers and audience',
        zhHant: '表演者與觀眾共享的持續虛擬空間',
        zhHans: '表演者与观众共享的持续虚拟空间',
      },
    ],
    featured: false,
  },
]
