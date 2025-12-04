import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-offWhite">
      {/* Hero Section */}
      <section className="bg-black text-offWhite py-20" aria-labelledby="hero-heading">
        <div className="container mx-auto px-4 text-center">
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-6 text-mango">
            Experienced Criminal Defense in Delaware, Ohio
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Dedicated legal representation for criminal charges and OVI/DUI cases
          </p>
          <Link
            to="/contact"
            className="inline-block bg-mango hover:bg-gold text-black font-bold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-gold"
          >
            Free Consultation
          </Link>
        </div>
      </section>

      {/* Practice Areas Preview */}
      <section className="py-16" aria-labelledby="practice-areas-heading">
        <div className="container mx-auto px-4">
          <h2 id="practice-areas-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            Our Practice Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-mango">Criminal Defense</h3>
              <p className="text-gray-700 mb-4">
                Comprehensive defense for all types of criminal charges, from misdemeanors to serious felonies.
              </p>
              <Link
                to="/practice-areas/criminal-defense"
                className="text-teal hover:text-mango font-semibold transition-colors"
                aria-label="Learn more about criminal defense services"
              >
                Learn More →
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-mango">OVI / DUI Defense</h3>
              <p className="text-gray-700 mb-4">
                Specialized defense for operating a vehicle while intoxicated (OVI) and DUI charges.
              </p>
              <Link
                to="/practice-areas/ovi-dui"
                className="text-teal hover:text-mango font-semibold transition-colors"
                aria-label="Learn more about OVI and DUI defense services"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-teal text-offWhite py-16" aria-labelledby="why-choose-heading">
        <div className="container mx-auto px-4">
          <h2 id="why-choose-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Mango Law LLC
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-2">Experienced</h3>
              <p>Years of criminal defense experience in Ohio courts</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-2">Dedicated</h3>
              <p>Personalized attention to every case and client</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Results-Driven</h3>
              <p>Focused on achieving the best possible outcome</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6 text-black">
            Need Legal Representation?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Contact us today for a free consultation. We're here to help.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-mango hover:bg-gold text-black font-bold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-gold"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
