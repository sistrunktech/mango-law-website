import { Link } from 'react-router-dom'

const CriminalDefense = () => {
  return (
    <div className="bg-offWhite">
      {/* Page Header */}
      <section className="bg-black text-offWhite py-16" aria-labelledby="criminal-defense-heading">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex text-sm space-x-2">
              <li>
                <Link to="/practice-areas" className="text-mango hover:text-gold">
                  Practice Areas
                </Link>
              </li>
              <li className="text-offWhite">/</li>
              <li className="text-offWhite">Criminal Defense</li>
            </ol>
          </nav>
          <h1 id="criminal-defense-heading" className="text-4xl md:text-5xl font-bold text-mango">
            Criminal Defense
          </h1>
          <p className="text-xl mt-4">
            Aggressive defense for all criminal charges
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16" aria-labelledby="overview-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg mb-12">
            <h2 id="overview-heading" className="text-3xl font-bold mb-6 text-black">
              Experienced Criminal Defense Representation
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              When you're facing criminal charges, your future is at stake. At Mango Law LLC, we provide 
              aggressive, comprehensive defense representation for all types of criminal cases. Whether 
              you're charged with a misdemeanor or a serious felony, our experienced attorneys will fight 
              to protect your rights and freedom.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We understand the Ohio criminal justice system and know how to build strong defenses. From 
              the initial investigation through trial, we'll be by your side every step of the way.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black">Types of Criminal Cases We Handle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-mango">Property Crimes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Theft and shoplifting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Burglary</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Robbery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Vandalism</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Arson</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-mango">Violent Crimes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Assault and battery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Domestic violence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Aggravated assault</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Weapons offenses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Homicide charges</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-mango">Drug Crimes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Drug possession</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Drug trafficking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Drug manufacturing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Prescription fraud</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Marijuana charges</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-mango">Other Crimes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>White collar crimes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Fraud and embezzlement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Sex crimes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Traffic violations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>Expungement and record sealing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-teal text-offWhite p-8 md:p-12 rounded-lg shadow-lg mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Defense Strategy</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">1. Thorough Case Analysis</h3>
                <p className="leading-relaxed">
                  We examine every detail of your case, from the initial police contact to the evidence 
                  against you, looking for weaknesses in the prosecution's case.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">2. Evidence Investigation</h3>
                <p className="leading-relaxed">
                  We conduct our own investigation, interviewing witnesses, reviewing police reports, and 
                  gathering evidence to support your defense.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">3. Motion Practice</h3>
                <p className="leading-relaxed">
                  We file appropriate motions to suppress illegally obtained evidence, dismiss charges, or 
                  reduce bail, protecting your constitutional rights.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">4. Negotiation & Trial</h3>
                <p className="leading-relaxed">
                  We work to negotiate favorable plea agreements when appropriate, but we're always prepared 
                  to take your case to trial if that's in your best interest.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">
              Ready to Fight Your Criminal Charges?
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              Don't face criminal charges alone. Contact Mango Law LLC today for a free consultation.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-mango hover:bg-gold text-black font-bold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-gold"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CriminalDefense
