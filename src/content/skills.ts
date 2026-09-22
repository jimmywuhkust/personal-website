import type { Skill } from './types'

/**
 * Software & tools. `level: 'pro'` shows in the top tier, 'learning' below.
 * Icons are simple-icons SVGs in public/icons/; omit `icon` for a monogram tile.
 * Source: CV 2025 skills section + LinkedIn connected apps.
 */
export const skills: Skill[] = [
  { id: 'blender', name: 'Blender', level: 'pro', icon: '/icons/blender.svg' },
  { id: 'wordpress', name: 'WordPress', level: 'pro', icon: '/icons/wordpress.svg' },
  { id: 'illustrator', name: 'Adobe Illustrator', level: 'pro', icon: '/icons/adobeillustrator.svg' },
  { id: 'proxmox', name: 'Proxmox', level: 'pro', icon: '/icons/proxmox.svg' },
  { id: 'docker', name: 'Docker', level: 'pro', icon: '/icons/docker.svg' },
  { id: 'esp32', name: 'ESP32', level: 'pro', icon: '/icons/espressif.svg' },
  { id: 'intellij', name: 'IntelliJ IDEA', level: 'pro', icon: '/icons/intellijidea.svg' },
  { id: 'hubspot', name: 'HubSpot', level: 'pro', icon: '/icons/hubspot.svg' },
  { id: 'arduino', name: 'Arduino', level: 'learning', icon: '/icons/arduino.svg' },
  { id: 'react', name: 'React', level: 'learning', icon: '/icons/react.svg' },
  { id: 'python', name: 'Python', level: 'learning', icon: '/icons/python.svg' },
  { id: 'cpp', name: 'C++', level: 'learning', icon: '/icons/cplusplus.svg' },
  { id: 'easyeda', name: 'EasyEDA (PCB)', level: 'learning' },
  { id: 'firebase', name: 'Firebase', level: 'learning', icon: '/icons/firebase.svg' },
  { id: 'premiere', name: 'Premiere Pro', level: 'learning', icon: '/icons/adobepremierepro.svg' },
  { id: 'replit', name: 'Replit', level: 'learning', icon: '/icons/replit.svg' },
]
