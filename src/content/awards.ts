import type { Award } from './types'

/**
 * Awards & honours. Newest first.
 * Source: linkedin.com/in/jimmy-wu-unlimited (Honors & awards, 12 entries).
 * `project` links the award to a project id (optional).
 */
export const awards: Award[] = [
  {
    id: 'geneva-2026-gold',
    logo: '/logos/geneva.png',
    title: {
      en: 'Gold Medal with Congratulations of the Jury',
      zhHant: '評審團嘉許金獎',
      zhHans: '评审团嘉许金奖',
    },
    issuer: {
      en: '51st International Exhibition of Inventions Geneva',
      zhHant: '第 51 屆日內瓦國際發明展',
      zhHans: '第 51 届日内瓦国际发明展',
    },
    date: '2026-03',
    project: 'aerorelief',
    url: 'https://hkust.edu.hk/news/hkust-innovations-shine-international-exhibition-inventions-geneva',
  },
  {
    id: 'if-design-2026',
    logo: '/logos/ifdesign.png',
    title: {
      en: 'iF Design Award 2026',
      zhHant: 'iF 設計獎 2026',
      zhHans: 'iF 设计奖 2026',
    },
    issuer: { en: 'iF Design', zhHant: 'iF Design', zhHans: 'iF Design' },
    date: '2026-03',
    project: 'vr-haptics',
  },
  {
    id: 'mobicom-src-2025',
    logo: '/logos/acm.svg',
    title: {
      en: 'First Place — Student Research Competition',
      zhHant: '學生科研競賽第一名',
      zhHans: '学生科研竞赛第一名',
    },
    issuer: {
      en: 'ACM MobiCom 2025',
      zhHant: 'ACM MobiCom 2025',
      zhHans: 'ACM MobiCom 2025',
    },
    date: '2025-11',
    project: 'aerorelief',
    url: 'https://www.sigmobile.org/mobicom/2025/awards.html',
  },
  {
    id: 'asmpt-2025-gold',
    logo: '/logos/asmpt.png',
    title: {
      en: 'Gold Award — ASMPT Technology Award 2025',
      zhHant: 'ASMPT 科技獎 2025 金獎',
      zhHans: 'ASMPT 科技奖 2025 金奖',
    },
    issuer: { en: 'ASMPT', zhHant: 'ASMPT', zhHans: 'ASMPT' },
    date: '2025-06',
    project: 'aerorelief',
  },
  {
    id: 'chinachem-2023',
    logo: '/logos/chinachem.png',
    title: {
      en: 'Chinachem PrimeMovership Scholarship',
      zhHant: '華懋 PrimeMovership 獎學金',
      zhHans: '华懋 PrimeMovership 奖学金',
    },
    issuer: { en: 'Chinachem Group', zhHant: '華懋集團', zhHans: '华懋集团' },
    date: '2023-06',
  },
  {
    id: 'hkaf-2022-finalist',
    logo: '/logos/hkaf.png',
    title: {
      en: 'Finalist — HKAF Arts × Tech Creative Competition',
      zhHant: '香港藝術節 Arts × Tech 創意比賽決賽入圍',
      zhHans: '香港艺术节 Arts × Tech 创意比赛决赛入围',
    },
    issuer: { en: 'Hong Kong Arts Festival', zhHant: '香港藝術節', zhHans: '香港艺术节' },
    date: '2022-03',
  },
  {
    id: 'toastmasters-2022',
    logo: '/logos/toastmasters.png',
    title: {
      en: '2nd Runner-Up — Area Z1 Table Topics Contest',
      zhHant: 'Z1 區即興演講比賽季軍',
      zhHans: 'Z1 区即兴演讲比赛季军',
    },
    issuer: { en: 'Toastmasters Division Z', zhHant: 'Toastmasters Z 區', zhHans: 'Toastmasters Z 区' },
    date: '2022-01',
  },
  {
    id: 'innostemer-2019',
    logo: '/logos/aitle.png',
    title: {
      en: 'Bronze Award — InnoSTEMer Camp 2019',
      zhHant: 'InnoSTEMer Camp 2019 銅獎',
      zhHans: 'InnoSTEMer Camp 2019 铜奖',
    },
    issuer: { en: 'AiTLE', zhHant: 'AiTLE', zhHans: 'AiTLE' },
    date: '2019-08',
  },
  {
    id: 'vr-contest-2019',
    title: {
      en: '2nd Runner-Up — Inter-secondary School VR Contest 2018/19',
      zhHant: '校際虛擬實境比賽 2018/19 季軍',
      zhHans: '校际虚拟现实比赛 2018/19 季军',
    },
    issuer: {
      en: 'International STEAM Olympiad Association',
      zhHant: '國際 STEAM 奧林匹克協會',
      zhHans: '国际 STEAM 奥林匹克协会',
    },
    date: '2019-07',
  },
  {
    id: 'hackathon-2019-champion',
    logo: '/logos/hkfyg.png',
    title: {
      en: 'Champion — Neighbourhood First App-building Hackathon',
      zhHant: '「鄰里第一」App 開發黑客松冠軍',
      zhHans: '「邻里第一」App 开发黑客松冠军',
    },
    issuer: {
      en: 'The Hong Kong Federation of Youth Groups',
      zhHant: '香港青年協會',
      zhHans: '香港青年协会',
    },
    date: '2019-02',
  },
  {
    id: 'photo-show-2018',
    logo: '/logos/hkdi.png',
    title: {
      en: 'Finalist — Social Documentary Photography Show',
      zhHant: '社會紀實攝影展決賽入圍',
      zhHans: '社会纪实摄影展决赛入围',
    },
    issuer: {
      en: 'Hong Kong Design Institute',
      zhHant: '香港知專設計學院',
      zhHans: '香港知专设计学院',
    },
    date: '2018-03',
  },
  {
    id: 'kowloon-city-photo-2018',
    title: {
      en: 'Champion — Views of Kowloon City District Photo Competition',
      zhHant: '九龍城區景致攝影比賽冠軍',
      zhHans: '九龙城区景致摄影比赛冠军',
    },
    issuer: { en: 'Kowloon City Council', zhHant: '九龍城議會', zhHans: '九龙城议会' },
    date: '2018-01',
  },
]
