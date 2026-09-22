import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { LanguageProvider } from './i18n'
import { ThemeProvider } from './hooks/theme'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Academic from './pages/Academic'
import Awards from './pages/Awards'
import Patents from './pages/Patents'
import Media from './pages/Media'
import Admin from './pages/Admin'

export default function App() {
  const location = useLocation()
  // Re-render pages when the Admin page saves new content
  const [contentVersion, setContentVersion] = useState(0)
  useEffect(() => {
    const bump = () => setContentVersion((v) => v + 1)
    window.addEventListener('jw-content-changed', bump)
    return () => window.removeEventListener('jw-content-changed', bump)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const isAdmin = location.pathname === '/admin'

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div key={contentVersion} className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/academic" element={<Academic />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/patents" element={<Patents />} />
              <Route path="/media" element={<Media />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          {!isAdmin && <Footer />}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
