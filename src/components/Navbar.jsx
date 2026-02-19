import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="header relative z-50">
        <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center 
                                    justify-center flex font-bold shadow-md">
            
            <p className="blue-gradient_text">AM</p>
        </NavLink>
        <nav className="flex text-lg gap-7 font-medium relative z-20">
            <NavLink to="/about" className={({ isActive }) => isActive? 'text-blue-500 font-bold': 'text-lime-400 hover:text-lime-300 transition-colors'} style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                About 
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive? 'text-blue-500 font-bold': 'text-lime-400 hover:text-lime-300 transition-colors'} style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                Projects
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive? 'text-blue-500 font-bold': 'text-lime-400 hover:text-lime-300 transition-colors'} style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                Contact
            </NavLink>
        </nav>
        
    </header>
  )
}

export default Navbar