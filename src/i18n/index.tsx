import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang, LText } from '../content/types'

/**
 * Lightweight i18n.
 * - Three languages: English / 繁體中文 / 简体中文
 * - UI chrome strings live in `uiStrings` below; page content uses LText fields
 *   from src/content/*.
 * - Choice persists in localStorage and is also readable from ?lang=en|zh-hant|zh-hans
 */

const LANG_KEY = 'jw-lang'

function detectLang(): Lang {
  const params = new URLSearchParams(window.location.search)
  const q = params.get('lang')
  if (q === 'en' || q === 'zh-hant' || q === 'zh-hans') {
    return q === 'zh-hant' ? 'zhHant' : q === 'zh-hans' ? 'zhHans' : 'en'
  }
  const saved = localStorage.getItem(LANG_KEY)
  if (saved === 'en' || saved === 'zhHant' || saved === 'zhHans') return saved
  const nav = navigator.language.toLowerCase()
  if (nav.includes('zh')) {
    return nav.includes('tw') || nav.includes('hk') || nav.includes('hant') ? 'zhHant' : 'zhHans'
  }
  return 'en'
}

/** All UI chrome strings. Keep keys flat and grouped by prefix. */
export const uiStrings: Record<string, Record<Lang, string>> = {
  'nav.home': { en: 'Home', zhHant: '首頁', zhHans: '首页' },
  'nav.projects': { en: 'Projects', zhHant: '項目', zhHans: '项目' },
  'nav.academic': { en: 'Academic', zhHant: '學術', zhHans: '学术' },
  'nav.awards': { en: 'Awards', zhHant: '獎項', zhHans: '奖项' },
  'nav.patents': { en: 'Patents', zhHant: '專利', zhHans: '专利' },
  'nav.media': { en: 'Media', zhHant: '媒體', zhHans: '媒体' },
  'nav.admin': { en: 'Admin', zhHant: '管理', zhHans: '管理' },
  'hero.scroll': { en: 'Scroll to explore', zhHant: '向下探索', zhHans: '向下探索' },
  'hero.viewProjects': { en: 'View projects', zhHant: '查看項目', zhHans: '查看项目' },
  'hero.downloadCV': { en: 'Download CV', zhHant: '下載 CV', zhHans: '下载 CV' },
  'home.pressStrip': { en: 'In the press', zhHant: '媒體報道', zhHans: '媒体报道' },
  'home.featuredProjects': { en: 'Featured Projects', zhHant: '精選項目', zhHans: '精选项目' },
  'home.latestMedia': { en: 'In the Media', zhHant: '媒體報道', zhHans: '媒体报道' },
  'home.about': { en: 'About', zhHant: '關於我', zhHans: '关于我' },
  'home.experience': { en: 'Experience', zhHant: '經歷', zhHans: '经历' },
  'home.toolbox': { en: 'Toolbox', zhHant: '技能工具箱', zhHans: '技能工具箱' },
  'toolbox.pro': { en: 'Confident / Semi-proficient', zhHant: '精通 · 半專業', zhHans: '精通 · 半专业' },
  'toolbox.learning': { en: 'Beginner / Intermediate', zhHant: '初階 · 進階中', zhHans: '初阶 · 进阶中' },
  'toolbox.usedIn': { en: 'Used in', zhHant: '用於這些項目', zhHans: '用于这些项目' },
  'toolbox.noProjects': { en: 'No linked projects yet', zhHant: '暫未關聯項目', zhHans: '暂未关联项目' },
  'home.interests': { en: 'Research Interests', zhHant: '研究興趣', zhHans: '研究兴趣' },
  'home.allProjects': { en: 'All projects', zhHant: '全部項目', zhHans: '全部项目' },
  'home.allMedia': { en: 'Full timeline', zhHant: '完整時間線', zhHans: '完整时间线' },
  'section.projects': { en: 'Projects', zhHant: '項目', zhHans: '项目' },
  'section.projects.sub': {
    en: 'Things I have built, flown and shipped.',
    zhHant: '我親手打造、放飛與交付的作品。',
    zhHans: '我亲手打造、放飞与交付的作品。',
  },
  'section.academic': { en: 'Academic Publications', zhHant: '學術論文', zhHans: '学术论文' },
  'section.academic.sub': {
    en: 'Peer-reviewed papers and art papers.',
    zhHant: '經同行評審的論文與藝術論文。',
    zhHans: '经同行评审的论文与艺术论文。',
  },
  'academic.firstAuthor': { en: 'First author', zhHant: '第一作者', zhHans: '第一作者' },
  'academic.view': { en: 'View publication (DOI)', zhHant: '查看論文（DOI）', zhHans: '查看论文（DOI）' },
  'section.awards': { en: 'Awards & Honours', zhHant: '獎項與榮譽', zhHans: '奖项与荣誉' },
  'section.patents': { en: 'Patents', zhHant: '專利', zhHans: '专利' },
  'section.patents.sub': {
    en: 'Patent applications and grants.',
    zhHant: '專利申請與授權。',
    zhHans: '专利申请与授权。',
  },
  'section.media': { en: 'Media Coverage', zhHant: '媒體報道', zhHans: '媒体报道' },
  'section.media.sub': {
    en: 'Hover a moment to open the story.',
    zhHant: '移到任一時刻，打開那段故事。',
    zhHans: '移到任一时刻，打开那段故事。',
  },
  'project.role': { en: 'My role', zhHant: '我的角色', zhHans: '我的角色' },
  'project.team': { en: 'Team & Collaborators', zhHant: '團隊與合作者', zhHans: '团队与合作者' },
  'project.highlights': { en: 'Highlights', zhHant: '亮點', zhHans: '亮点' },
  'project.links': { en: 'Links', zhHant: '相關連結', zhHans: '相关链接' },
  'project.back': { en: 'All projects', zhHant: '返回項目列表', zhHans: '返回项目列表' },
  'project.model3d': { en: '3D Model', zhHant: '3D 模型', zhHans: '3D 模型' },
  'project.model3d.hint': {
    en: 'Drag to orbit · scroll to zoom · GLB/GLTF (export PCBs to GLB via KiCad/Blender)',
    zhHant: '拖動旋轉 · 滾輪縮放 · 支援 GLB/GLTF（PCB 可經 KiCad/Blender 匯出）',
    zhHans: '拖动旋转 · 滚轮缩放 · 支持 GLB/GLTF（PCB 可经 KiCad/Blender 导出）',
  },
  'project.deck': { en: 'Deck / Slides', zhHant: '簡報 / Pitch Deck', zhHans: '简报 / Pitch Deck' },
  'project.notFound': { en: 'Project not found.', zhHant: '找不到這個項目。', zhHans: '找不到这个项目。' },
  'cat.hardware': { en: 'Hardware', zhHant: '硬件', zhHans: '硬件' },
  'cat.software': { en: 'Software', zhHant: '軟件', zhHans: '软件' },
  'cat.research': { en: 'Research', zhHant: '研究', zhHans: '研究' },
  'cat.design': { en: 'Design', zhHant: '設計', zhHans: '设计' },
  'empty.patents': {
    en: 'Patent entries are being prepared. Add them anytime from the Admin page.',
    zhHant: '專利內容整理中，可隨時在管理頁面新增。',
    zhHans: '专利内容整理中，可随时在管理页面新增。',
  },
  'footer.madeWith': {
    en: 'Designed & built by Jimmy Wu',
    zhHant: '由胡駿銘設計與開發',
    zhHans: '由胡骏铭设计与开发',
  },
  'admin.title': { en: 'Content Admin', zhHant: '內容管理', zhHans: '内容管理' },
  'admin.saved': { en: 'Saved. The site now uses your edits.', zhHant: '已儲存，網站已套用你的修改。', zhHans: '已保存，网站已套用你的修改。' },
  'admin.export': { en: 'Export JSON', zhHant: '匯出 JSON', zhHans: '导出 JSON' },
  'admin.import': { en: 'Import JSON', zhHant: '匯入 JSON', zhHans: '导入 JSON' },
  'admin.reset': { en: 'Reset all edits', zhHant: '重設全部修改', zhHans: '重置全部修改' },
  'admin.resetDone': { en: 'Reset done — back to the default content.', zhHant: '已重設，回復預設內容。', zhHans: '已重置，恢复默认内容。' },
  'admin.hint': {
    en: 'Edits are stored in this browser and applied instantly. Use Export JSON to keep a permanent copy (hand it to your AI to merge into src/content).',
    zhHant: '修改會儲存在此瀏覽器並即時生效。要永久保留請匯出 JSON，交給 AI 合併回 src/content。',
    zhHans: '修改会保存在此浏览器并即时生效。要永久保留请导出 JSON，交给 AI 合并回 src/content。',
  },
  'admin.item.add': { en: 'Add item', zhHant: '新增項目', zhHans: '新增条目' },
  'admin.item.delete': { en: 'Delete', zhHant: '刪除', zhHans: '删除' },
  'admin.item.confirmDelete': { en: 'Delete this item?', zhHant: '確定刪除這一項？', zhHans: '确定删除这一条？' },
  'admin.raw': { en: 'Raw JSON mode', zhHant: '原始 JSON 模式', zhHans: '原始 JSON 模式' },
  'admin.form': { en: 'Form mode', zhHant: '表單模式', zhHans: '表单模式' },
  'admin.invalidJson': { en: 'Invalid JSON — nothing was saved.', zhHant: 'JSON 格式錯誤，未儲存任何內容。', zhHans: 'JSON 格式错误，未保存任何内容。' },
  'admin.section.profile': { en: 'Profile', zhHant: '個人資料', zhHans: '个人资料' },
  'admin.section.projects': { en: 'Projects', zhHant: '項目', zhHans: '项目' },
  'admin.section.publications': { en: 'Publications', zhHant: '論文', zhHans: '论文' },
  'admin.section.awards': { en: 'Awards', zhHant: '獎項', zhHans: '奖项' },
  'admin.section.patents': { en: 'Patents', zhHant: '專利', zhHans: '专利' },
  'admin.section.media': { en: 'Media', zhHant: '媒體', zhHans: '媒体' },
  'admin.section.experience': { en: 'Experience', zhHant: '經歷', zhHans: '经历' },
  'admin.section.skills': { en: 'Skills', zhHant: '技能', zhHans: '技能' },
  'admin.save': { en: 'Save', zhHant: '儲存', zhHans: '保存' },
  'admin.login': { en: 'Log in', zhHant: '登入', zhHans: '登录' },
  'admin.logout': { en: 'Log out', zhHant: '登出', zhHans: '登出' },
  'admin.cancel': { en: 'Cancel', zhHant: '取消', zhHans: '取消' },
  'admin.edit': { en: 'Edit', zhHant: '編輯', zhHans: '编辑' },
}

interface I18nCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
  lt: (text: LText) => string
}

const Ctx = createContext<I18nCtx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem(LANG_KEY, l)
  }

  useEffect(() => {
    document.documentElement.lang =
      lang === 'zhHant' ? 'zh-Hant-HK' : lang === 'zhHans' ? 'zh-Hans' : 'en'
  }, [lang])

  const t = (key: string) => uiStrings[key]?.[lang] ?? key
  const lt = (text: LText) => text[lang] ?? text.en

  return <Ctx.Provider value={{ lang, setLang, t, lt }}>{children}</Ctx.Provider>
}

export function useLang(): I18nCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
