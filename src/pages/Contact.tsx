import { useState, type FormEvent } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caseType: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // In a real application, this would send data to a backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        caseType: '',
        message: ''
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-offWhite">
      {/* Page Header */}
      <section className="bg-black text-offWhite py-16" aria-labelledby="contact-heading">
        <div className="container mx-auto px-4">
          <h1 id="contact-heading" className="text-4xl md:text-5xl font-bold text-center text-mango">
            Contact Us
          </h1>
          <p className="text-center text-xl mt-4">
            Get a free consultation today
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16" aria-labelledby="contact-info-heading">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 id="contact-info-heading" className="text-3xl font-bold mb-6 text-black">
                Get In Touch
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Facing criminal charges is stressful, but you don't have to go through it alone. 
                Contact Mango Law LLC today for a free, confidential consultation. We're here to 
                answer your questions and discuss how we can help with your case.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-mango text-2xl mr-4" aria-hidden="true">📍</div>
                  <div>
                    <h3 className="font-bold text-lg text-black">Office Location</h3>
                    <address className="text-gray-700 not-italic">
                      Delaware, Ohio
                    </address>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-mango text-2xl mr-4" aria-hidden="true">📞</div>
                  <div>
                    <h3 className="font-bold text-lg text-black">Phone</h3>
                    <a 
                      href="tel:555-123-4567" 
                      className="text-teal hover:text-mango transition-colors"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-mango text-2xl mr-4" aria-hidden="true">✉️</div>
                  <div>
                    <h3 className="font-bold text-lg text-black">Email</h3>
                    <a 
                      href="mailto:info@mangolaw.com" 
                      className="text-teal hover:text-mango transition-colors"
                    >
                      info@mangolaw.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-mango text-2xl mr-4" aria-hidden="true">⏰</div>
                  <div>
                    <h3 className="font-bold text-lg text-black">Office Hours</h3>
                    <p className="text-gray-700">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Emergency consultations available 24/7
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-teal text-offWhite rounded-lg">
                <h3 className="font-bold text-lg mb-2">Available 24/7 for Emergencies</h3>
                <p>
                  Been arrested? Call us immediately. We're available around the clock to provide 
                  urgent legal assistance when you need it most.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-black">Send Us a Message</h2>
              
              {submitted ? (
                <div 
                  className="bg-teal text-offWhite p-6 rounded-lg text-center"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="text-xl font-bold mb-2">Thank you for contacting us!</p>
                  <p>We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} aria-label="Contact form">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mango"
                      aria-required="true"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mango"
                      aria-required="true"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mango"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="caseType" className="block text-gray-700 font-semibold mb-2">
                      Type of Case
                    </label>
                    <select
                      id="caseType"
                      name="caseType"
                      value={formData.caseType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mango"
                    >
                      <option value="">Select a case type</option>
                      <option value="criminal-defense">Criminal Defense</option>
                      <option value="ovi-dui">OVI / DUI</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mango"
                      aria-required="true"
                      placeholder="Tell us about your case..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-mango hover:bg-gold text-black font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-gold"
                  >
                    Send Message
                  </button>

                  <p className="text-sm text-gray-600 mt-4">
                    * Required fields. Your information is confidential and protected by attorney-client privilege.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-gray-100" aria-labelledby="location-heading">
        <div className="container mx-auto px-4">
          <h2 id="location-heading" className="text-3xl font-bold text-center mb-8 text-black">
            Our Location
          </h2>
          <div className="max-w-4xl mx-auto bg-teal text-offWhite p-12 rounded-lg text-center">
            <p className="text-xl">
              📍 Serving Delaware, Ohio and surrounding areas
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
