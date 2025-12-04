import { Link } from 'react-router-dom'

const OviDui = () => {
  return (
    <div className="bg-offWhite">
      {/* Page Header */}
      <section className="bg-black text-offWhite py-16" aria-labelledby="ovi-dui-heading">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex text-sm space-x-2">
              <li>
                <Link to="/practice-areas" className="text-mango hover:text-gold">
                  Practice Areas
                </Link>
              </li>
              <li className="text-offWhite">/</li>
              <li className="text-offWhite">OVI / DUI Defense</li>
            </ol>
          </nav>
          <h1 id="ovi-dui-heading" className="text-4xl md:text-5xl font-bold text-mango">
            OVI / DUI Defense
          </h1>
          <p className="text-xl mt-4">
            Expert defense for drunk driving charges in Ohio
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16" aria-labelledby="overview-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg mb-12">
            <h2 id="overview-heading" className="text-3xl font-bold mb-6 text-black">
              Experienced OVI/DUI Defense in Ohio
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              An OVI (Operating a Vehicle while Intoxicated) or DUI (Driving Under the Influence) charge 
              in Ohio can have serious consequences, including license suspension, hefty fines, jail time, 
              and a permanent criminal record. At Mango Law LLC, we specialize in defending clients against 
              OVI/DUI charges and work aggressively to protect your driving privileges and freedom.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our attorneys have extensive experience challenging OVI/DUI cases in Ohio courts. We understand 
              the science behind field sobriety tests, breathalyzers, and blood tests, and know how to identify 
              flaws in the prosecution's case.
            </p>
          </div>

          <div className="bg-teal text-offWhite p-8 md:p-12 rounded-lg shadow-lg mb-12">
            <h2 className="text-3xl font-bold mb-6">Understanding Ohio OVI Laws</h2>
            <p className="text-lg leading-relaxed mb-4">
              In Ohio, you can be charged with OVI if you:
            </p>
            <ul className="space-y-2 text-lg">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Operate a vehicle with a blood alcohol concentration (BAC) of .08% or higher</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Are under the influence of alcohol, drugs, or a combination of both</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Have a certain concentration of drugs in your system</span>
              </li>
            </ul>
            <p className="text-lg leading-relaxed mt-4">
              The penalties increase significantly for repeat offenses, high BAC levels, or if the offense 
              involves an accident or injury.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black">How We Defend OVI/DUI Cases</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-mango">Challenge the Traffic Stop</h3>
                <p className="text-gray-700">
                  Police must have reasonable suspicion to stop your vehicle. If the stop was unlawful, 
                  all evidence obtained afterward may be inadmissible.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-mango">Question Field Sobriety Tests</h3>
                <p className="text-gray-700">
                  Field sobriety tests are subjective and can be affected by medical conditions, weather, 
                  road conditions, and officer bias. We examine whether these tests were administered properly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-mango">Challenge Breathalyzer Results</h3>
                <p className="text-gray-700">
                  Breathalyzer machines must be properly calibrated and maintained. We investigate whether 
                  the device was functioning correctly and whether proper procedures were followed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-mango">Contest Blood Test Evidence</h3>
                <p className="text-gray-700">
                  Blood tests must be collected, stored, and analyzed according to strict protocols. Any 
                  deviation from proper procedures can affect the reliability of the results.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-mango">Protect Your Rights</h3>
                <p className="text-gray-700">
                  We ensure law enforcement respected your constitutional rights throughout the arrest and 
                  investigation process, including your right to remain silent and your right to an attorney.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black">Potential Consequences of OVI/DUI</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-mango">First Offense</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>3 days to 6 months in jail</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Fines up to $1,075</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>License suspension: 6 months to 3 years</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Mandatory alcohol/drug education</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-mango">Second Offense</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>10 days to 6 months in jail</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Fines up to $1,625</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>License suspension: 1 to 7 years</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Possible vehicle immobilization</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 mt-6">
              Additional consequences may include increased insurance rates, difficulty finding employment, 
              and the social stigma of a criminal conviction.
            </p>
          </div>

          <div className="bg-mango text-black p-8 md:p-12 rounded-lg shadow-lg mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Choose Mango Law for OVI Defense?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Specialized Knowledge</h3>
                <p>Deep understanding of Ohio OVI laws and defense strategies</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Proven Track Record</h3>
                <p>Successfully defended numerous OVI cases with favorable outcomes</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Immediate Action</h3>
                <p>Quick response to protect your license and build your defense</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">
              Arrested for OVI/DUI? Act Now.
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              Time is critical in OVI cases. You only have 10 days to request a license suspension hearing. 
              Contact Mango Law LLC immediately for a free consultation.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-mango hover:bg-gold text-black font-bold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-gold"
            >
              Get Help Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OviDui
