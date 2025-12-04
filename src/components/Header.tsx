import { Link } from 'react-router-dom'
import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black text-offWhite shadow-lg" role="banner">
      <nav className="container mx-auto px-4 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-mango hover:text-gold transition-colors">
            Mango Law LLC
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-offWhite focus:outline-none focus:ring-2 focus:ring-mango"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link to="/" className="hover:text-mango transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-mango transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/practice-areas" className="hover:text-mango transition-colors">
                Practice Areas
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-mango transition-colors">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-mango transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <ul className="md:hidden mt-4 space-y-2">
            <li>
              <Link 
                to="/" 
                className="block py-2 hover:text-mango transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="block py-2 hover:text-mango transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/practice-areas" 
                className="block py-2 hover:text-mango transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Practice Areas
              </Link>
            </li>
            <li>
              <Link 
                to="/reviews" 
                className="block py-2 hover:text-mango transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="block py-2 hover:text-mango transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Header
