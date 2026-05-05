import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import { Home, About, AboutExperience, Blog, Projects, Contact, Interpreter } from './pages'

function RouteAwareDark({ children }) {
  const { isDark } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark && pathname !== '/')
  }, [isDark, pathname])

  return children
}

const App = () => {
  return (
    <ThemeProvider>
      <main className="bg-slate-300/20 min-h-screen dark:bg-slate-900 transition-colors duration-300">
        <Router>
          <RouteAwareDark>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/experience" element={<AboutExperience />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/interpreter" element={<Interpreter />} />
            </Routes>
          </RouteAwareDark>
        </Router>
      </main>
    </ThemeProvider>
  )
}

export default App
