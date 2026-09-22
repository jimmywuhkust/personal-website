import type { MediaItem } from './types'

/**
 * Media coverage — shown as an interactive timeline (rendered newest first).
 * `kind` drives the icon: video / article / interview / post.
 * `image` points into public/images/ (downloaded press thumbnails).
 */
export const media: MediaItem[] = [
  {
    id: 'sciencenet-2026',
    date: '2026-04-02',
    outlet: 'ScienceNet 科学网',
    title: {
      en: 'HKUST wins 62 awards at Geneva — AeroRelief among showcased Gold Medal projects',
      zhHant: '科大日內瓦發明展奪 62 獎，AeroRelief 為金獎展示項目之一',
      zhHans: '科大日内瓦发明展夺 62 奖，AeroRelief 为金奖展示项目之一',
    },
    summary: {
      en: 'Coverage of HKUST’s record 62 awards at the 51st International Exhibition of Inventions Geneva, showcasing AeroRelief as a Gold Medal with Congratulations of the Jury project.',
      zhHant: '報道科大在第 51 屆日內瓦國際發明展破紀錄奪得 62 個獎項，AeroRelief 為評審團嘉許金獎展示項目。',
      zhHans: '报道科大在第 51 届日内瓦国际发明展破纪录夺得 62 个奖项，AeroRelief 为评审团嘉许金奖展示项目。',
    },
    url: 'https://news.sciencenet.cn/htmlnews/2026/4/562450.shtm',
    kind: 'article',
    logo: '/logos/sciencenet.jpg',
    image: '/images/featured-geneva.jpg',
  },
  {
    id: 'geneva-news-2026',
    date: '2026-03-15',
    outlet: 'HKUST News',
    title: {
      en: 'HKUST innovations shine at the International Exhibition of Inventions Geneva',
      zhHant: '科大於日內瓦發明展創紀錄奪 62 獎',
      zhHans: '科大于日内瓦发明展创纪录夺 62 奖',
    },
    summary: {
      en: 'AeroRelief: Autonomous UAV First-Responder System receives a Gold Medal with Congratulations of the Jury at the 51st International Exhibition of Inventions Geneva.',
      zhHant: 'AeroRelief 自主無人機急救系統於第 51 屆日內瓦國際發明展獲頒評審團嘉許金獎。',
      zhHans: 'AeroRelief 自主无人机急救系统于第 51 届日内瓦国际发明展获颁评审团嘉许金奖。',
    },
    url: 'https://hkust.edu.hk/news/hkust-innovations-shine-international-exhibition-inventions-geneva',
    kind: 'article',
    logo: '/logos/geneva.png',
    image: '/images/featured-geneva.jpg',
  },
  {
    id: 'tvbs-2025',
    date: '2025-11-24',
    outlet: 'TVBS News',
    title: {
      en: 'AI aerial rescue rewrites the golden window — saving lives where mountains have no signal',
      zhHant: '山區無訊號也能救命　AI 空中救援改寫求生黃金期',
      zhHans: '山区无讯号也能救命　AI 空中救援改写求生黄金期',
    },
    summary: {
      en: 'TVBS News feature on how AeroRelief’s AI dispatch platform and drone delivery change emergency rescue in remote terrain.',
      zhHant: 'TVBS 新聞專題：AeroRelief 的 AI 調度平台與無人機運送如何改寫偏遠地區的緊急救援。',
      zhHans: 'TVBS 新闻专题：AeroRelief 的 AI 调度平台与无人机运送如何改写偏远地区的紧急救援。',
    },
    url: 'https://today.line.me/tw/v3/article/aG5BDPp',
    kind: 'video',
    logo: '/logos/tvbs.png',
    image: '/images/featured-tvbs.jpg',
  },
  {
    id: 'hkust-ais-2025',
    date: '2025-11-18',
    outlet: 'HKUST AIS',
    title: {
      en: 'ISD UG graduates showcase emergency delivery drone on CNN’s Tech for Good',
      zhHant: 'ISD 畢業生登上 CNN《Tech for Good》展示急救無人機',
      zhHans: 'ISD 毕业生登上 CNN《Tech for Good》展示急救无人机',
    },
    summary: {
      en: 'HKUST Academy of Interdisciplinary Studies covers the CNN feature and the story of the AeroRelief team.',
      zhHant: '科大跨學科學院報道 CNN 專題及 AeroRelief 團隊的故事。',
      zhHans: '科大跨学科学院报道 CNN 专题及 AeroRelief 团队的故事。',
    },
    url: 'https://ais.hkust.edu.hk/whats-happening/news/isd-ug-graduates-showcase-innovative-emergency-delivery-drone-system-cnns-tech',
    kind: 'article',
    logo: '/logos/hkust.svg',
    image: '/images/aerorelief-3.jpg',
  },
  {
    id: 'cnn-tech-for-good-2025',
    date: '2025-10-24',
    outlet: 'CNN',
    title: {
      en: 'Tech for Good: this drone could one day help save lives in remote areas',
      zhHant: 'CNN《Tech for Good》：這部無人機有朝一日可在偏遠地區拯救生命',
      zhHans: 'CNN《Tech for Good》：这部无人机有朝一日可在偏远地区拯救生命',
    },
    summary: {
      en: 'Kristie Lu Stout visits HKUST to feature AeroRelief — young innovators redefining rescue missions with robotics.',
      zhHant: 'Kristie Lu Stout 到訪科大，專題報道 AeroRelief——年輕創新者以機械人技術重新定義救援任務。',
      zhHans: 'Kristie Lu Stout 到访科大，专题报道 AeroRelief——年轻创新者以机器人技术重新定义救援任务。',
    },
    url: 'https://ais.hkust.edu.hk/whats-happening/news/isd-ug-graduates-showcase-innovative-emergency-delivery-drone-system-cnns-tech',
    kind: 'video',
    logo: '/logos/cnn.svg',
    image: '/images/cnn-tech-for-good.jpg',
  },
  {
    id: 'hkust-lae-2025',
    date: '2025-04-07',
    outlet: 'HKUST News',
    title: {
      en: 'The sky’s not the limit — Hong Kong’s low-altitude economy takes wing',
      zhHant: '飛越無限：低空經濟蓄翼待飛',
      zhHans: '飞越无限：低空经济蓄翼待飞',
    },
    summary: {
      en: 'HKUST feature on the Low Altitude Economy Research Center, highlighting AeroRelief’s AI-driven emergency rescue delivery system.',
      zhHant: '科大低空經濟研究中心專題，重點介紹 AeroRelief 人工智能緊急救援運送系統。',
      zhHans: '科大低空经济研究中心专题，重点介绍 AeroRelief 人工智能紧急救援运送系统。',
    },
    url: 'https://hkust.edu.hk/zh-hans/news/skys-not-limit-its-whole-new-world',
    kind: 'article',
    logo: '/logos/hkust.svg',
    image: '/images/lae-1.jpg',
  },
  {
    id: 'seng-sandbox-2025',
    date: '2025-03-20',
    outlet: 'HKUST SENG',
    title: {
      en: 'Government launches LAE Regulatory Sandbox pilot projects at HKUST',
      zhHant: '政府於科大啓動「監管沙盒」試點項目　促進低空經濟和創新產業發展',
      zhHans: '政府于科大启动「监管沙盒」试点项目　促进低空经济和创新产业发展',
    },
    summary: {
      en: 'AeroRelief is selected as one of the first pilot projects of the HKSAR Government’s Low-Altitude Economy Regulatory Sandbox; the system was presented to Chief Executive John Lee.',
      zhHant: 'AeroRelief 入選香港特區政府低空經濟「監管沙盒」首批試點項目，並向行政長官李家超展示系統。',
      zhHans: 'AeroRelief 入选香港特区政府低空经济「监管沙盒」首批试点项目，并向行政长官李家超展示系统。',
    },
    url: 'https://seng.hkust.edu.hk/zh-hant/news/20250320/government-launches-regulatory-sandbox-pilot-projects-hkust-foster-low-altitude-economy-and-innovative-industry-development',
    kind: 'article',
    logo: '/logos/hkust.svg',
    image: '/images/featured-sandbox.jpg',
  },
  {
    id: 'wenweipo-lae-2026',
    date: '2026-03-02',
    outlet: 'Wen Wei Po 文匯報',
    title: {
      en: 'Flying in dense cities — two key technologies',
      zhHant: '密集城市飛行　關鍵兩大技術',
      zhHans: '密集城市飞行　关键两大技术',
    },
    summary: {
      en: 'Wen Wei Po on urban drone operations, citing AeroRelief’s AED delivery, sandbox approval and collaboration talks with the HK Heart Resuscitation Association, police and fire services.',
      zhHant: '文匯報報道城市無人機運作，提及 AeroRelief 的 AED 運送、沙盒批核，以及與香港心臟復甦協會、東九龍警署和消防署的合作探討。',
      zhHans: '文汇报报道城市无人机运作，提及 AeroRelief 的 AED 运送、沙盒批核，以及与香港心脏复苏协会、东九龙警署和消防署的合作探讨。',
    },
    url: 'https://www.wenweipo.com/a/202603/02/AP69a49ee3e4b04d7d56d5ed81.html',
    kind: 'article',
    logo: '/logos/wenweipo.png',
  },
  {
    id: 'takungpao-2025',
    date: '2025-10-10',
    outlet: 'Ta Kung Pao 大公報',
    title: {
      en: 'Drone emergency system reaches remote locations fast to save lives',
      zhHant: '無人機急救系統　迅速抵偏遠地點救人',
      zhHans: '无人机急救系统　迅速抵偏远地点救人',
    },
    summary: {
      en: 'Ta Kung Pao interviews Jimmy Wu at the International Low-Altitude Economy Summit: AeroRelief cuts response time to under 10 minutes for cardiac arrest, severe allergy and heatstroke cases.',
      zhHant: '大公報於國際低空經濟高峰會訪問胡駿銘：AeroRelief 把心臟驟停、嚴重過敏、中暑等個案的反應時間縮至 10 分鐘內。',
      zhHans: '大公报于国际低空经济高峰会访问胡骏铭：AeroRelief 把心脏骤停、严重过敏、中暑等个案的反应时间缩至 10 分钟内。',
    },
    url: 'https://www.takungpao.com/news/232109/2025/1010/1130089.html',
    kind: 'article',
    logo: '/logos/takungpao.png',
  },
  {
    id: 'am730-2025',
    date: '2025-03-21',
    outlet: 'am730',
    title: {
      en: 'Hong Kong’s low-altitude economy takes off — 38 pilot projects including drone-delivered AEDs',
      zhHant: '港低空經濟起飛　首批 38 試點　無人機送藥送餐送 AED 機',
      zhHans: '港低空经济起飞　首批 38 试点　无人机送药送餐送 AED 机',
    },
    summary: {
      en: 'am730 covers the first Regulatory Sandbox batch, detailing AeroRelief’s 5–6 kg payload, 10 km range and partnership with the HK Resuscitation Society and China Unicom.',
      zhHant: 'am730 報道首批監管沙盒項目，詳述 AeroRelief 5–6 公斤載重、10 公里航程，以及與香港復甦學會、中國聯通的合作。',
      zhHans: 'am730 报道首批监管沙盒项目，详述 AeroRelief 5–6 公斤载重、10 公里航程，以及与香港复苏学会、中国联通的合作。',
    },
    url: 'https://www.am730.com.hk/article/543513',
    kind: 'article',
    logo: '/logos/am730.png',
  },
  {
    id: 'wenweipo-2025',
    date: '2025-01-16',
    outlet: 'Wen Wei Po 文匯報',
    title: {
      en: 'Drone rescue — Jimmy Wu demonstrates AeroRelief at the LAERC launch',
      zhHant: '無人機救援——胡駿銘於低空經濟研究中心啟動禮展示 AeroRelief',
      zhHans: '无人机救援——胡骏铭于低空经济研究中心启动礼展示 AeroRelief',
    },
    summary: {
      en: 'Wen Wei Po covers the live demo: a hiker collapses, a passerby calls for help, an SMS link shares the location, and the drone delivers an AED before rescuers arrive.',
      zhHant: '文匯報報道現場示範：行山者倒地，途人致電求助，手機短訊連結傳送位置，無人機起飛送遞 AED，爭取救援時間。',
      zhHans: '文汇报报道现场示范：行山者倒地，途人致电求助，手机短信链接传送位置，无人机起飞送递 AED，争取救援时间。',
    },
    url: 'https://www.wenweipo.com/a/202501/16/AP678818f4e4b0ebdedfc24e59.html',
    kind: 'article',
    logo: '/logos/wenweipo.png',
  },

  {
    id: 'tvb-2025',
    date: '2025-01-15',
    outlet: 'TVB News 無綫新聞',
    title: {
      en: 'HKUST team develops drone rescue system for hiking rescue and emergency supply delivery',
      zhHant: '科大團隊研無人機救援系統　冀應用於行山救援及運送緊急物資',
      zhHans: '科大团队研无人机救援系统　冀应用于行山救援及运送紧急物资',
    },
    summary: {
      en: 'TVB News reports on the AeroRelief team’s AI-piloted drone that navigates mountains autonomously to locate stranded hikers and deliver supplies.',
      zhHant: '無綫新聞報道 AeroRelief 團隊以 AI 自動駕駛無人機穿梭山嶺，定位被困行山人士並運送救援物資。',
      zhHans: '无线新闻报道 AeroRelief 团队以 AI 自动驾驶无人机穿梭山岭，定位被困行山人士并运送救援物资。',
    },
    url: 'https://news.tvb.com/tc/812541-%E7%A7%91%E5%A4%A7%E5%9C%98%E9%9A%8A%E7%A0%94%E7%84%A1%E4%BA%BA%E6%A9%9F%E6%95%91%E6%8F%B4%E7%B3%BB%E7%B5%B1%E5%86%80%E6%87%89%E7%94%A8%E6%96%BC%E8%A1%8C%E5%B1%B1%E6%95%91%E6%8F%B4%E5%8F%8A%E9%81%8B%E9%80%81%E7%B7%8A%E6%80%A5%E7%89%A9%E8%B3%87',
    kind: 'video',
    logo: '/logos/tvb-peacock.svg',
    image: '/images/featured-tvb.jpg',
  },
]
