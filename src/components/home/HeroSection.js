// Hero section for homepage
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container-custom py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Home in Delhi & Gurugram
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            No Brokers. No Commission. Only Verified Properties.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Browse Properties
            </Link>
            <Link href="/add-property" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}