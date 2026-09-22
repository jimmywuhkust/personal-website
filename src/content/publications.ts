import type { Publication } from './types'

/**
 * Academic publications. Paper titles stay in their published language.
 * `type`: conference | journal | workshop | art | demo
 * Add new entries at the top of the array.
 */
export const publications: Publication[] = [
  {
    id: 'aerorelief-mobicom25',
    logo: '/logos/acm.svg',
    title: 'AeroRelief: UAV-based Emergency Rescue for Time-Critical Missions',
    authors: 'Chun Ming Wu, Songfan Li, Zhen Ye, Tsz Ho Fan, Lai Yin Garmisch Wong, Mo Li',
    venue: 'Proceedings of the 31st Annual International Conference on Mobile Computing and Networking (ACM MobiCom 2025)',
    year: '2025',
    type: 'demo',
    url: 'https://doi.org/10.1145/3680530.3695439',
    firstAuthor: true,
    note: {
      en: 'First Place — Student Research Competition',
      zhHant: '學生科研競賽第一名',
      zhHans: '学生科研竞赛第一名',
    },
  },
  {
    id: 'nmm-siggraph24',
    logo: '/logos/siggraph.png',
    title:
      'Nature: Metaphysics+ Metaphor (N:M+M): Exploring Persistence, Feedback, and Visualisation in Mixed Reality Performance Arts',
    authors: 'Tristan Braud, B. Lau, D.H.L. Chan, C.M. Wu, Z. Wu, V.J.S. Yong, K. Shatilov',
    venue: 'SIGGRAPH Asia 2024 Art Papers',
    year: '2024',
    type: 'art',
    url: 'https://doi.org/10.1145/3680207.3765585',
  },
]
