import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-offWhite py-8 mt-auto" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-mango mb-4">Mango Law LLC</h3>
            <p className="text-sm">
              Dedicated criminal defense attorneys serving Delaware, Ohio and the surrounding areas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-mango mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/practice-areas" className="hover:text-gold transition-colors">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-gold transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-mango mb-4">Contact</h3>
            <address className="text-sm not-italic">
              <p>Delaware, Ohio</p>
              <p className="mt-2">
                <a href="tel:555-123-4567" className="hover:text-gold transition-colors">
                  (555) 123-4567
                </a>
              </p>
              <p className="mt-2">
                <a href="mailto:info@mangolaw.com" className="hover:text-gold transition-colors">
                  info@mangolaw.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {currentYear} Mango Law LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
