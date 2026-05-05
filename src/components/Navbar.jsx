import { NavLink, useLocation } from "react-router-dom"
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header className="header relative z-50">
      <NavLink
        to="/"
        className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 dark:border dark:border-slate-600
                   items-center justify-center flex font-bold shadow-md transition-colors duration-300"
      >
        <p className="blue-gradient_text">AM</p>
      </NavLink>

      <nav className="flex text-lg gap-7 font-medium items-center relative z-20">
        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-lime-400 hover:text-lime-300 transition-colors'}
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-lime-400 hover:text-lime-300 transition-colors'}
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-lime-400 hover:text-lime-300 transition-colors'}
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
        >
          Contact
        </NavLink>

        {!isHome && (
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 flex items-center justify-center rounded-lg
                       bg-white/80 dark:bg-slate-700 border border-slate-200 dark:border-slate-600
                       hover:scale-105 transition-all duration-200 shadow-sm"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        )}
      </nav>
    </header>
  )
}

export default Navbar
