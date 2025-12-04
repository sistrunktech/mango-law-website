import { Link } from 'react-router-dom'

const PracticeAreas = () => {
  return (
    <div className="bg-offWhite">
      {/* Page Header */}
      <section className="bg-black text-offWhite py-16" aria-labelledby="practice-areas-heading">
        <div className="container mx-auto px-4">
          <h1 id="practice-areas-heading" className="text-4xl md:text-5xl font-bold text-center text-mango">
            Practice Areas
          </h1>
          <p className="text-center text-xl mt-4">
            Comprehensive criminal defense services in Delaware, Ohio
          </p>
        </div>
      </section>

      {/* Main Practice Areas */}
      <section className="py-16" aria-labelledby="main-areas-heading">
        <div className="container mx-auto px-4">
          <h2 id="main-areas-heading" className="sr-only">Our Main Practice Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Criminal Defense */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-mango">
                Criminal Defense
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We handle all types of criminal cases, from misdemeanors to serious felonies. Our 
                experienced attorneys will fight to protect your rights and achieve the best possible 
                outcome for your case.
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Theft and property crimes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Assault and violent crimes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Drug offenses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>White collar crimes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Domestic violence</span>
                </li>
              </ul>
              <Link
                to="/practice-areas/criminal-defense"
                className="inline-block bg-mango hover:bg-gold text-black font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-gold"
                aria-label="Learn more about criminal defense services"
              >
                Learn More
              </Link>
            </div>

            {/* OVI/DUI Defense */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-mango">
                OVI / DUI Defense
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Specialized defense for operating a vehicle while intoxicated (OVI) and driving under 
                the influence (DUI) charges. We understand Ohio's OVI laws and will work to minimize 
                the impact on your life.
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>First-time OVI offenses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Repeat OVI charges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>License suspension hearings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Field sobriety test challenges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Breathalyzer and blood test defense</span>
                </li>
              </ul>
              <Link
                to="/practice-areas/ovi-dui"
                className="inline-block bg-mango hover:bg-gold text-black font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-gold"
                aria-label="Learn more about OVI and DUI defense services"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-teal text-offWhite py-16" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
            Facing Criminal Charges?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait to get the legal help you need. Contact Mango Law LLC today for a free 
            consultation and let us start building your defense.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-mango hover:bg-gold text-black font-bold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-gold"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  )
}

export default PracticeAreas
