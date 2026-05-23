// // Single property detail page
// 'use client'

// import { useState, useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import Image from 'next/image'
// import Link from 'next/link'
// import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
// import PropertyGallery from '@/src/components/property/PropertyGallery'
// import PropertyVerificationBadge from '@/src/components/property/PropertyVerificationBadge'
// import Button from '@/src/components/ui/Button'
// import LoadingSpinner from '@/src/components/ui/LoadingSpinner'

// export default function PropertyDetailPage() {
//   const { id } = useParams()
//   const [property, setProperty] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [showContactForm, setShowContactForm] = useState(false)

//   // Fetch property details
//   useEffect(() => {
//     fetchProperty()
//   }, [id])

//   const fetchProperty = async () => {
//     try {
//       const res = await fetch(`/api/properties/${id}`)
//       const data = await res.json()
//       setProperty(data.property)
//     } catch (error) {
//       console.error('Error fetching property:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <LoadingSpinner />
//       </div>
//     )
//   }

//   if (!property) {
//     return (
//       <div className="container-custom py-16 text-center">
//         <h2 className="text-2xl font-bold text-gray-900">Property not found</h2>
//         <Link href="/properties" className="text-blue-600 hover:text-blue-500 mt-4 inline-block">
//           ← Back to properties
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <div className="container-custom py-8">
//       {/* Back button */}
//       <Link href="/properties" className="text-blue-600 hover:text-blue-500 mb-6 inline-block">
//         ← Back to properties
//       </Link>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main Content - Left Column */}
//         <div className="lg:col-span-2">
          
//           {/* Property Gallery */}
//           <PropertyGallery images={property.images} />

//           {/* Property Title & Verification */}
//           <div className="mt-6">
//             <div className="flex items-center gap-3 mb-2">
//               <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
//               {property.isVerified && <PropertyVerificationBadge />}
//             </div>
            
//             {/* Location */}
//             <div className="flex items-center text-gray-600 mb-4">
//               <FaMapMarkerAlt className="mr-2" />
//               <span>{property.location}, {property.city === 'west_delhi' ? 'West Delhi' : 'Gurugram'}</span>
//             </div>

//             {/* Price */}
//             <div className="text-3xl font-bold text-blue-600 mb-6">
//               ₹{property.price.toLocaleString()}
//               <span className="text-lg font-normal text-gray-600 ml-2">
//                 {property.category === 'rent' ? '/month' : ''}
//               </span>
//             </div>
//           </div>

//           {/* Key Features */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-200">
//             {property.bedrooms && (
//               <div className="text-center">
//                 <FaBed className="mx-auto text-2xl text-gray-600 mb-2" />
//                 <div className="font-semibold">{property.bedrooms} BHK</div>
//               </div>
//             )}
//             {property.bathrooms && (
//               <div className="text-center">
//                 <FaBath className="mx-auto text-2xl text-gray-600 mb-2" />
//                 <div className="font-semibold">{property.bathrooms} Bathrooms</div>
//               </div>
//             )}
//             {property.areaSqft && (
//               <div className="text-center">
//                 <FaRulerCombined className="mx-auto text-2xl text-gray-600 mb-2" />
//                 <div className="font-semibold">{property.areaSqft} sq.ft</div>
//               </div>
//             )}
//             <div className="text-center">
//               <div className="font-semibold capitalize">{property.furnishing} Furnished</div>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="py-6">
//             <h2 className="text-xl font-semibold mb-4">Description</h2>
//             <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
//           </div>

//           {/* Amenities */}
//           {property.amenities && property.amenities.length > 0 && (
//             <div className="py-6 border-t border-gray-200">
//               <h2 className="text-xl font-semibold mb-4">Amenities</h2>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 {property.amenities.map((amenity, index) => (
//                   <div key={index} className="flex items-center text-gray-700">
//                     <FaCheckCircle className="text-green-500 mr-2" />
//                     <span className="capitalize">{amenity}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Sidebar - Right Column */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            
//             {/* Owner Info */}
//             <div className="border-b border-gray-200 pb-6 mb-6">
//               <h3 className="font-semibold text-lg mb-4">Listed by</h3>
//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                   <span className="text-xl font-bold text-blue-600">
//                     {property.lister?.name?.charAt(0) || 'O'}
//                   </span>
//                 </div>
//                 <div className="ml-4">
//                   <p className="font-semibold">{property.lister?.name || 'Property Owner'}</p>
//                   <p className="text-sm text-gray-600">Member since {new Date(property.createdAt).getFullYear()}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Actions */}
//             <div className="space-y-3">
//               <Button
//                 variant="primary"
//                 fullWidth
//                 onClick={() => setShowContactForm(true)}
//               >
//                 Contact Owner
//               </Button>
              
//               <Button variant="secondary" fullWidth>
//                 Schedule Visit
//               </Button>

//               {/* Verified Badge Info */}
//               {property.isVerified && (
//                 <div className="mt-4 p-4 bg-green-50 rounded-lg">
//                   <p className="text-sm text-green-800">
//                     ✓ This property has been physically verified by our team
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaCheckCircle, FaStar, FaArrowLeft, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

export default function PropertyDetailPage() {
  const { id } = useParams()
  const [currentImage, setCurrentImage] = useState(0)

  // Mock property data (in real app, fetch based on id)
  const property = {
    id: 1,
    title: 'Moldova Borsașu',
    location: 'Rajouri Garden, West Delhi',
    price: '₹45,000/month',
    description: 'Beautiful 2 BHK apartment in the heart of Rajouri Garden. This fully furnished apartment comes with modern amenities and is located close to metro station, markets, and hospitals. The society has 24/7 security, power backup, and ample parking space.',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    type: 'Apartment',
    category: 'rent',
    bedrooms: 2,
    bathrooms: 1,
    areaSqft: 100,
    furnishing: 'fully',
    amenities: ['Parking', 'WiFi', 'AC', 'Security', 'Power Backup', 'Lift'],
    isVerified: true,
    rating: 4.5,
    reviews: 128,
    lister: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@email.com',
      joined: '2023',
      properties: 12
    },
    coordinates: {
      lat: 28.6139,
      lng: 77.2090
    }
  }

  const images = [
    property.images[0],
    ...property.images.slice(1)
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Back Button */}
        <Link href="/properties" className="inline-flex items-center text-gray-600 hover:text-green-600 mb-6 transition">
          <FaArrowLeft className="mr-2" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-6">
              {/* Main Image */}
              <div className="relative h-96">
                <img
                  src={images[currentImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.isVerified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                    <FaCheckCircle />
                    Verified Property
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition ${
                        currentImage === index ? 'border-green-500' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
              
              {/* Location */}
              <div className="flex items-center text-gray-600 mb-6">
                <FaMapMarkerAlt className="mr-2 text-green-500" />
                <span>{property.location}</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-green-600 mb-6">
                {property.price}
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-200 mb-6">
                <div className="text-center">
                  <FaBed className="mx-auto text-2xl text-green-500 mb-2" />
                  <div className="font-semibold text-gray-900">{property.bedrooms} Beds</div>
                </div>
                <div className="text-center">
                  <FaBath className="mx-auto text-2xl text-green-500 mb-2" />
                  <div className="font-semibold text-gray-900">{property.bathrooms} Baths</div>
                </div>
                <div className="text-center">
                  <FaRulerCombined className="mx-auto text-2xl text-green-500 mb-2" />
                  <div className="font-semibold text-gray-900">{property.areaSqft} m²</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 capitalize">{property.furnishing} Furnished</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Owner Info & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-8 shadow-lg sticky top-24">
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400" />
                  <span className="ml-1 font-semibold">{property.rating}</span>
                </div>
                <span className="text-gray-500">({property.reviews} reviews)</span>
              </div>

              {/* Owner Info */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Listed by</h3>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">
                      {property.lister.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{property.lister.name}</p>
                    <p className="text-sm text-gray-600">Member since {property.lister.joined}</p>
                    <p className="text-sm text-gray-600">{property.lister.properties} properties listed</p>
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3">
                <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2">
                  <FaPhone />
                  Call Owner
                </button>
                
                <button className="w-full border-2 border-green-500 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition flex items-center justify-center gap-2">
                  <FaEnvelope />
                  Send Message
                </button>

                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                  <FaWhatsapp />
                  WhatsApp
                </button>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Schedule Visit
                </button>
              </div>

              {/* Verified Badge Info */}
              {property.isVerified && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 flex items-center gap-2">
                    <FaCheckCircle className="text-green-600" />
                    This property has been physically verified by our team
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}