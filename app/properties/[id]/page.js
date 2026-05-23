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

// //app/properties/[id]/page.js - Single property detail page with mock data and enhanced UI features
// 'use client'

// import { useState } from 'react'
// import { useParams } from 'next/navigation'
// import Link from 'next/link'
// import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaCheckCircle, FaStar, FaArrowLeft, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

// export default function PropertyDetailPage() {
//   const { id } = useParams()
//   const [currentImage, setCurrentImage] = useState(0)

//   // Mock property data (in real app, fetch based on id)
//   const property = {
//     id: 1,
//     title: 'Moldova Borsașu',
//     location: 'Rajouri Garden, West Delhi',
//     price: '₹45,000/month',
//     description: 'Beautiful 2 BHK apartment in the heart of Rajouri Garden. This fully furnished apartment comes with modern amenities and is located close to metro station, markets, and hospitals. The society has 24/7 security, power backup, and ample parking space.',
//     images: [
//       'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
//     ],
//     type: 'Apartment',
//     category: 'rent',
//     bedrooms: 2,
//     bathrooms: 1,
//     areaSqft: 100,
//     furnishing: 'fully',
//     amenities: ['Parking', 'WiFi', 'AC', 'Security', 'Power Backup', 'Lift'],
//     isVerified: true,
//     rating: 4.5,
//     reviews: 128,
//     lister: {
//       name: 'Rajesh Kumar',
//       phone: '+91 98765 43210',
//       email: 'rajesh@email.com',
//       joined: '2023',
//       properties: 12
//     },
//     coordinates: {
//       lat: 28.6139,
//       lng: 77.2090
//     }
//   }

//   const images = [
//     property.images[0],
//     ...property.images.slice(1)
//   ]

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container-custom">
//         {/* Back Button */}
//         <Link href="/properties" className="inline-flex items-center text-gray-600 hover:text-green-600 mb-6 transition">
//           <FaArrowLeft className="mr-2" />
//           Back to Properties
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Images & Details */}
//           <div className="lg:col-span-2">
//             {/* Image Gallery */}
//             <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-6">
//               {/* Main Image */}
//               <div className="relative h-96">
//                 <img
//                   src={images[currentImage]}
//                   alt={property.title}
//                   className="w-full h-full object-cover"
//                 />
//                 {property.isVerified && (
//                   <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
//                     <FaCheckCircle />
//                     Verified Property
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnail Images */}
//               {images.length > 1 && (
//                 <div className="grid grid-cols-4 gap-2 p-4">
//                   {images.map((img, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImage(index)}
//                       className={`relative h-20 rounded-lg overflow-hidden border-2 transition ${
//                         currentImage === index ? 'border-green-500' : 'border-transparent'
//                       }`}
//                     >
//                       <img
//                         src={img}
//                         alt={`Thumbnail ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Property Details */}
//             <div className="bg-white rounded-xl p-8 shadow-lg">
//               <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
              
//               {/* Location */}
//               <div className="flex items-center text-gray-600 mb-6">
//                 <FaMapMarkerAlt className="mr-2 text-green-500" />
//                 <span>{property.location}</span>
//               </div>

//               {/* Price */}
//               <div className="text-3xl font-bold text-green-600 mb-6">
//                 {property.price}
//               </div>

//               {/* Key Features */}
//               <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-200 mb-6">
//                 <div className="text-center">
//                   <FaBed className="mx-auto text-2xl text-green-500 mb-2" />
//                   <div className="font-semibold text-gray-900">{property.bedrooms} Beds</div>
//                 </div>
//                 <div className="text-center">
//                   <FaBath className="mx-auto text-2xl text-green-500 mb-2" />
//                   <div className="font-semibold text-gray-900">{property.bathrooms} Baths</div>
//                 </div>
//                 <div className="text-center">
//                   <FaRulerCombined className="mx-auto text-2xl text-green-500 mb-2" />
//                   <div className="font-semibold text-gray-900">{property.areaSqft} m²</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="font-semibold text-gray-900 capitalize">{property.furnishing} Furnished</div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="mb-6">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-900">Description</h2>
//                 <p className="text-gray-700 leading-relaxed">{property.description}</p>
//               </div>

//               {/* Amenities */}
//               {property.amenities && property.amenities.length > 0 && (
//                 <div>
//                   <h2 className="text-xl font-semibold mb-4 text-gray-900">Amenities</h2>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                     {property.amenities.map((amenity, index) => (
//                       <div key={index} className="flex items-center text-gray-700">
//                         <FaCheckCircle className="text-green-500 mr-2" />
//                         <span>{amenity}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Owner Info & Actions */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl p-8 shadow-lg sticky top-24">
//               {/* Rating */}
//               <div className="flex items-center gap-2 mb-6">
//                 <div className="flex items-center">
//                   <FaStar className="text-yellow-400" />
//                   <span className="ml-1 font-semibold">{property.rating}</span>
//                 </div>
//                 <span className="text-gray-500">({property.reviews} reviews)</span>
//               </div>

//               {/* Owner Info */}
//               <div className="border-b border-gray-200 pb-6 mb-6">
//                 <h3 className="font-semibold text-lg mb-4 text-gray-900">Listed by</h3>
//                 <div className="flex items-center">
//                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
//                     <span className="text-2xl font-bold text-green-600">
//                       {property.lister.name.charAt(0)}
//                     </span>
//                   </div>
//                   <div className="ml-4">
//                     <p className="font-semibold text-gray-900">{property.lister.name}</p>
//                     <p className="text-sm text-gray-600">Member since {property.lister.joined}</p>
//                     <p className="text-sm text-gray-600">{property.lister.properties} properties listed</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Actions */}
//               <div className="space-y-3">
//                 <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2">
//                   <FaPhone />
//                   Call Owner
//                 </button>
                
//                 <button className="w-full border-2 border-green-500 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition flex items-center justify-center gap-2">
//                   <FaEnvelope />
//                   Send Message
//                 </button>

//                 <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
//                   <FaWhatsapp />
//                   WhatsApp
//                 </button>

//                 <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
//                   Schedule Visit
//                 </button>
//               </div>

//               {/* Verified Badge Info */}
//               {property.isVerified && (
//                 <div className="mt-6 p-4 bg-green-50 rounded-lg">
//                   <p className="text-sm text-green-800 flex items-center gap-2">
//                     <FaCheckCircle className="text-green-600" />
//                     This property has been physically verified by our team
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

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, 
  FaCheckCircle, FaStar, FaArrowLeft, FaPhone, 
  FaEnvelope, FaWhatsapp, FaCalendar, FaTimes, FaUser
} from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function PropertyDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(0)
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // Visit Modal state
  const [showVisitModal, setShowVisitModal] = useState(false)
  const [visitForm, setVisitForm] = useState({ date: '', time: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visitSuccess, setVisitSuccess] = useState(false)
  const [assignedAgent, setAssignedAgent] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('metrohome_user')
    if (userData) setUser(JSON.parse(userData))
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/properties/${id}`)
      const data = await res.json()
      
      if (data.success && data.property) {
        console.log('✅ Property loaded:', data.property.title)
        setProperty(data.property)
      } else {
        toast.error('Property not found')
        router.push('/properties')
      }
    } catch (error) {
      console.error('Error fetching property:', error)
      toast.error('Failed to load property')
    } finally {
      setLoading(false)
    }
  }

  const handleScheduleVisit = () => {
    if (!user) {
      toast.error('Please login to schedule a visit')
      router.push('/login')
      return
    }
    
    if (!property || !property._id) {
      toast.error('Property data not loaded. Please refresh.')
      return
    }
    
    console.log('📅 Scheduling visit for property:', property._id, property.title)
    setShowVisitModal(true)
  }

  const handleVisitSubmit = async (e) => {
    e.preventDefault()
    
    if (!visitForm.date || !visitForm.time) {
      toast.error('Please select date and time')
      return
    }

    setIsSubmitting(true)
    toast.loading('Scheduling...', { id: 'visit' })

    try {
      const requestBody = {
        propertyId: property._id,
        preferredDate: visitForm.date,
        preferredTime: visitForm.time,
        message: visitForm.message,
        visitorPhone: user?.phone || 'Not provided'
      }
      
      console.log('📤 Sending:', requestBody)
      
      const res = await fetch('/api/visits/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      const data = await res.json()
      console.log('📥 Response:', data)

      if (res.ok && data.success) {
        toast.success('Visit scheduled successfully!', { id: 'visit' })
        setVisitSuccess(true)
        setAssignedAgent(data.assignedAgent)
      } else {
        toast.error(data.error || 'Failed to schedule', { id: 'visit' })
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong', { id: 'visit' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetModal = () => {
    setShowVisitModal(false)
    setVisitSuccess(false)
    setVisitForm({ date: '', time: '', message: '' })
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Property not found</h2>
          <Link href="/properties" className="text-green-600 mt-4 inline-block">← Back to Properties</Link>
        </div>
      </div>
    )
  }

  const images = property.images || []

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <Link href="/properties" className="inline-flex items-center text-gray-600 hover:text-green-600 mb-6 transition">
          <FaArrowLeft className="mr-2" /> Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-6">
              <div className="relative h-96">
                <img 
                  src={images[currentImage] || 'https://via.placeholder.com/800x600'} 
                  alt={property.title} 
                  className="w-full h-full object-cover" 
                />
                {property.isVerified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                    <FaCheckCircle /> Verified Property
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {images.map((img, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition ${currentImage === index ? 'border-green-500' : 'border-transparent'}`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-6">
                <FaMapMarkerAlt className="mr-2 text-green-500" />
                <span>{property.location}</span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-6">{property.price}</div>

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

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {property.amenities?.length > 0 && (
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

          {/* Right Column - Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-8 shadow-lg sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold">{property.rating}</span>
                <span className="text-gray-500">({property.reviews} reviews)</span>
              </div>

              {property.lister && (
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">Listed by</h3>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">{property.lister.name?.charAt(0) || 'O'}</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">{property.lister.name || 'Property Owner'}</p>
                      <p className="text-sm text-gray-600">Member since {property.lister.joined || '2023'}</p>
                      <p className="text-sm text-gray-600">{property.lister.properties || 0} properties listed</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <a href={`tel:${property.lister?.phone}`}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2">
                  <FaPhone /> Call Owner
                </a>
                <a href={`mailto:${property.lister?.email}`}
                  className="w-full border-2 border-green-500 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition flex items-center justify-center gap-2">
                  <FaEnvelope /> Send Message
                </a>
                <a href={`https://wa.me/${property.lister?.phone?.replace(/\D/g, '')}`} target="_blank"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                  <FaWhatsapp /> WhatsApp
                </a>

                {/* ✅ Schedule Visit Button */}
                <button
                  onClick={handleScheduleVisit}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <FaCalendar /> Schedule Visit
                </button>
              </div>

              {property.isVerified && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 flex items-center gap-2">
                    <FaCheckCircle className="text-green-600" />
                    Physically verified by our team
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visit Modal */}
      {showVisitModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4" onClick={(e) => e.target === e.currentTarget && resetModal()}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">📅 Schedule a Visit</h2>
              <button onClick={resetModal} className="text-gray-400 hover:text-gray-600 text-2xl"><FaTimes /></button>
            </div>

            <div className="p-6">
              {visitSuccess ? (
                <div className="text-center py-4">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Confirmed!</h3>
                  <p className="text-gray-600 mb-4 text-sm">Confirmation email sent to <strong>{user?.email}</strong></p>
                  {assignedAgent && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left mb-4">
                      <p className="font-semibold text-blue-900 mb-2">👤 Your MetroHome Representative</p>
                      <p className="text-sm text-blue-800"><strong>Name:</strong> {assignedAgent.name}</p>
                      <p className="text-sm text-blue-800"><strong>Phone:</strong> {assignedAgent.phone}</p>
                      <p className="text-sm text-blue-800"><strong>Email:</strong> {assignedAgent.email}</p>
                    </div>
                  )}
                  <button onClick={resetModal} className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600">Done ✓</button>
                  <Link href="/profile/visits" className="block text-center text-green-600 hover:underline text-sm mt-3">View My Visits →</Link>
                </div>
              ) : (
                <form onSubmit={handleVisitSubmit} className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-green-800">{property.title}</p>
                    <p className="text-xs text-green-700">{property.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                      <input type="date" required min={minDate}
                        value={visitForm.date}
                        onChange={e => setVisitForm({...visitForm, date: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                      <select required value={visitForm.time}
                        onChange={e => setVisitForm({...visitForm, time: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                        <option value="">Select time</option>
                        {['09:00 AM','10:00 AM','11:00 AM','12:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                    <textarea rows={3} placeholder="Any specific requirements or questions?"
                      value={visitForm.message}
                      onChange={e => setVisitForm({...visitForm, message: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none" />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                    <FaUser className="text-green-500" />
                    <p className="text-xs text-gray-600">Visiting as: <strong>{user?.name}</strong> ({user?.email})</p>
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition">
                    {isSubmitting ? 'Scheduling...' : '📅 Confirm Visit'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}