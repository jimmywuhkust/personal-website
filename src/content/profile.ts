import type { Profile } from './types'

/**
 * Identity & links shown in the hero, about section and footer.
 * Sources: LinkedIn (jimmy-wu-unlimited), HKUST AIS news, Google Scholar.
 * Fill in `email` to show a contact button (left empty intentionally).
 */
export const profile: Profile = {
  name: {
    en: 'Jimmy Wu',
    zhHant: '胡駿銘',
    zhHans: '胡骏铭',
  },
  role: {
    en: 'Founder of AeroRelief · MPhil in Computer Science, HKUST',
    zhHant: 'AeroRelief 創辦人 · 香港科技大學計算機科學哲學碩士生',
    zhHans: 'AeroRelief 创始人 · 香港科技大学计算机科学哲学硕士生',
  },
  tagline: {
    en: 'A person who specializes in anything visual and technology related — my strength is not in one field, but in all of them combined.',
    zhHant: '我專注於一切視覺與科技相關的事物——我的強項不在單一領域，而在所有領域的結合。',
    zhHans: '我专注于一切视觉与科技相关的事物——我的强项不在单一领域，而在所有领域的结合。',
  },
  bio: [
    {
      en: 'I am WU Chun Ming (Jimmy), founder and team lead of AeroRelief — an autonomous UAV first-responder system that delivers life-saving medical supplies to remote areas within the "golden 10 minutes". The project won a Gold Medal with Congratulations of the Jury at the 51st International Exhibition of Inventions Geneva, took First Place in the ACM MobiCom 2025 Student Research Competition, and was featured on CNN’s Tech for Good, TVB and TVBS. It is also one of the inaugural pilot projects of the HKSAR Government’s Low-Altitude Economy Regulatory Sandbox, where I presented our system to the Chief Executive.',
      zhHant: '我是胡駿銘（Jimmy），AeroRelief 創辦人兼團隊負責人。AeroRelief 是一套自主無人機急救系統，在「黃金十分鐘」內把救命醫療物資送達偏遠地區。項目榮獲第 51 屆日內瓦國際發明展評審團嘉許金獎、ACM MobiCom 2025 學生科研競賽第一名，並登上 CNN《Tech for Good》、TVB 及 TVBS 報道。同時入選香港特區政府低空經濟「監管沙盒」首批試點項目，我亦有幸向行政長官展示系統。',
      zhHans: '我是胡骏铭（Jimmy），AeroRelief 创始人兼团队负责人。AeroRelief 是一套自主无人机急救系统，在「黄金十分钟」内把救命医疗物资送达偏远地区。项目荣获第 51 届日内瓦国际发明展评审团嘉许金奖、ACM MobiCom 2025 学生科研竞赛第一名，并登上 CNN《Tech for Good》、TVB 及 TVBS 报道。同时入选香港特区政府低空经济「监管沙盒」首批试点项目，我也有幸向行政长官展示系统。',
    },
    {
      en: 'I am pursuing an MPhil in Computer Science and Engineering at HKUST (wireless networks & UAVs), after completing a BSc in Integrative Systems and Design (Dean’s List). Beyond research I run Jinfinite Unlimited, a freelance design-and-technology studio, and have worked across web development, photography, videography and graphic design — always learning, always improving.',
      zhHant: '我現於香港科技大學攻讀計算機科學及工程哲學碩士（無線網絡與無人機），此前取得科大綜合系統與設計理學士（院長嘉許名單）。研究之外，我經營自由設計與科技工作室「駿步無限」，涉獵網站開發、攝影、攝錄與平面設計——不斷學習，不斷進步。',
      zhHans: '我现于香港科技大学攻读计算机科学及工程哲学硕士（无线网络与无人机），此前取得科大综合系统与设计理学士（院长嘉许名单）。研究之外，我经营自由设计与科技工作室「骏步无限」，涉猎网站开发、摄影、摄像与平面设计——不断学习，不断进步。',
    },
  ],
  location: {
    en: 'Kowloon, Hong Kong SAR',
    zhHant: '香港九龍',
    zhHans: '香港九龙',
  },
  email: 'cmwuaa@connect.ust.hk',
  affiliation: {
    en: 'The Hong Kong University of Science and Technology',
    zhHant: '香港科技大學',
    zhHans: '香港科技大学',
  },
  portrait: '/images/jimmy-portrait.jpg',
  researchInterests: ['UAV / UAS', 'Wireless Networks', 'IoT', 'LPWAN', 'Low-Altitude Economy', 'Mixed Reality'],
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jimmy-wu-unlimited/' },
    { label: 'GitHub', url: 'https://github.com/jimmywuhkust' },
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=TltSHEoAAAAJ' },
    { label: 'Instagram', url: 'https://www.instagram.com/jimmy_wu_mku' },
    { label: 'jinfinite.com.hk', url: 'https://jinfinite.com.hk' },
  ],
}
