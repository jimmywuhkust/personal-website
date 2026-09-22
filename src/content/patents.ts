import type { Patent } from './types'

/**
 * Patent applications & grants.
 * Empty for now — add entries here, or through the /admin page.
 * Example entry shape:
 * {
 *   id: 'pat-001',
 *   title: { en: '...', zhHant: '...', zhHans: '...' },
 *   number: 'US 2025/0123456 A1',
 *   status: { en: 'Filed', zhHant: '已申請', zhHans: '已申请' },
 *   date: '2025-06',
 *   inventors: 'Chun Ming Wu, ...',
 *   url: 'https://patents.google.com/...',
 * }
 */
export const patents: Patent[] = []
