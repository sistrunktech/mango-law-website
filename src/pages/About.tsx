import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="bg-offWhite">
      {/* Page Header */}
      <section className="bg-black text-offWhite py-16" aria-labelledby="about-heading">
        <div className="container mx-auto px-4">
          <h1 id="about-heading" className="text-4xl md:text-5xl font-bold text-center text-mango">
            About Mango Law LLC
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16" aria-labelledby="our-mission-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg mb-12">
            <h2 id="our-mission-heading" className="text-3xl font-bold mb-6 text-black">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At Mango Law LLC, we are dedicated to providing exceptional criminal defense representation 
              to individuals facing criminal charges in Delaware, Ohio, and surrounding areas. Our mission 
              is to protect your rights, preserve your freedom, and fight for the best possible outcome 
              in your case.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We understand that being charged with a crime is one of the most stressful experiences you 
              can face. That's why we combine aggressive legal advocacy with compassionate client service, 
              ensuring you feel supported every step of the way.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black">Our Approach</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-mango">Personalized Attention</h3>
                <p className="text-gray-700">
                  Every case is unique, and we treat it as such. We take the time to understand your 
                  specific situation and develop a tailored defense strategy.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-mango">Thorough Investigation</h3>
                <p className="text-gray-700">
                  We leave no stone unturned in building your defense, examining all evidence, 
                  interviewing witnesses, and challenging the prosecution's case.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-mango">Clear Communication</h3>
                <p className="text-gray-700">
                  We keep you informed throughout the legal process, explaining complex legal concepts 
                  in plain language and ensuring you understand your options.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-teal text-offWhite p-8 md:p-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Serving Delaware, Ohio</h2>
            <p className="text-lg leading-relaxed mb-6">
              Mango Law LLC is proud to serve the Delaware community and surrounding areas. We are 
              familiar with the local courts, prosecutors, and legal procedures, which allows us to 
              provide effective representation tailored to the Ohio legal system.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-mango hover:bg-gold text-black font-bold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-gold"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
