import { Link } from 'react-router-dom'

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'John D.',
      rating: 5,
      date: 'November 2024',
      text: 'Mango Law helped me through one of the most difficult times in my life. They were professional, knowledgeable, and truly cared about my case. I couldn\'t have asked for better representation.'
    },
    {
      id: 2,
      name: 'Sarah M.',
      rating: 5,
      date: 'October 2024',
      text: 'After being charged with OVI, I was scared and didn\'t know what to do. The team at Mango Law explained everything clearly and fought hard for me. They got my charges reduced and I\'m incredibly grateful.'
    },
    {
      id: 3,
      name: 'Michael R.',
      rating: 5,
      date: 'September 2024',
      text: 'Outstanding criminal defense attorneys! They were responsive, kept me informed throughout the process, and achieved a better outcome than I expected. Highly recommend.'
    },
    {
      id: 4,
      name: 'Jennifer L.',
      rating: 5,
      date: 'August 2024',
      text: 'Professional, compassionate, and effective. Mango Law took the time to understand my situation and developed a strong defense strategy. I felt supported every step of the way.'
    },
    {
      id: 5,
      name: 'David K.',
      rating: 5,
      date: 'July 2024',
      text: 'I was facing serious criminal charges and Mango Law fought tirelessly on my behalf. Their attention to detail and courtroom skills made all the difference. Thank you!'
    },
    {
      id: 6,
      name: 'Lisa T.',
      rating: 5,
      date: 'June 2024',
      text: 'From the first consultation to the final resolution, Mango Law was excellent. They answered all my questions, kept me informed, and delivered results. Five stars!'
    }
  ]

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < rating ? 'text-gold' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-offWhite">
      {/* Page Header */}
      <section className="bg-black text-offWhite py-16" aria-labelledby="reviews-heading">
        <div className="container mx-auto px-4">
          <h1 id="reviews-heading" className="text-4xl md:text-5xl font-bold text-center text-mango">
            Client Reviews
          </h1>
          <p className="text-center text-xl mt-4">
            See what our clients say about their experience with Mango Law LLC
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16" aria-labelledby="client-reviews-heading">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 id="client-reviews-heading" className="sr-only">Client Testimonials</h2>
          
          {/* Average Rating Display */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12 text-center">
            <div className="text-5xl font-bold text-mango mb-2">5.0</div>
            <div className="flex justify-center mb-2">
              {renderStars(5)}
            </div>
            <p className="text-gray-600">Based on {reviews.length} reviews</p>
          </div>

          {/* Individual Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <article 
                key={review.id} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-black">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.date}</p>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-700 leading-relaxed">"{review.text}"</p>
              </article>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-teal text-offWhite p-8 md:p-12 rounded-lg shadow-lg mt-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Experience Our Service?</h2>
            <p className="text-lg mb-6">
              Join our satisfied clients and get the legal representation you deserve. 
              Contact us today for a free consultation.
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

      {/* Disclaimer */}
      <section className="py-8 bg-gray-100" aria-labelledby="disclaimer-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="disclaimer-heading" className="sr-only">Disclaimer</h2>
          <p className="text-sm text-gray-600 text-center">
            <strong>Disclaimer:</strong> Client testimonials do not guarantee a similar outcome in your case. 
            Every case is unique and results depend on specific facts and circumstances.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Reviews
