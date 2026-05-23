// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { 
//   FaFilter, FaStar, FaMapMarkerAlt, FaTimes, FaHeart, FaShare, 
//   FaSearch, FaHome, FaBuilding, FaCity, FaCalendar, FaClock,
//   FaUser, FaPhone, FaEnvelope, FaCheckCircle, FaWhatsapp
// } from 'react-icons/fa'
// import toast from 'react-hot-toast'

// export default function PropertiesPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
  
//   const [showFilters, setShowFilters] = useState(false)
//   const [showVisitModal, setShowVisitModal] = useState(false)
//   const [selectedProperty, setSelectedProperty] = useState(null)
//   const [visitForm, setVisitForm] = useState({
//     date: '',
//     time: '',
//     message: ''
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
  
//   const [filters, setFilters] = useState({
//     propertyType: searchParams.get('type') || 'all',
//     city: 'all',
//     minPrice: '',
//     maxPrice: '',
//     bedrooms: 'any',
//     furnishing: 'any'
//   })
//   const [likedProperties, setLikedProperties] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [user, setUser] = useState(null)

//   // Check if user is logged in
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem('metrohome_token')
//       const userData = localStorage.getItem('metrohome_user')
//       if (token && userData) {
//         setUser(JSON.parse(userData))
//       }
//     }
//     checkAuth()
//   }, [])

//   // Property Types with icons
//   const propertyTypeOptions = [
//     { value: 'all', label: 'All Properties', icon: '🏠' },
//     { value: 'apartment', label: 'Apartments', icon: '🏢' },
//     { value: 'pg', label: 'PG/Hostel', icon: '🏠' },
//     { value: 'flat', label: 'Flats', icon: '🏡' },
//     { value: 'villa', label: 'Villas', icon: '🏰' },
//     { value: 'commercial', label: 'Commercial', icon: '🏭' },
//     { value: 'land', label: 'Land/Plot', icon: '🌾' }
//   ]

//   // Sample properties data with all types
//   const properties = [
//     {
//       id: 1,
//       title: 'Luxury 2 BHK Apartment',
//       location: 'Rajouri Garden, West Delhi',
//       price: '₹45,000/month',
//       image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       propertyType: 'apartment',
//       type: 'Apartment',
//       rating: 4.5,
//       reviews: 128,
//       beds: 2,
//       baths: 1,
//       area: 100,
//       verified: true,
//       isRented: false
//     },
//     {
//       id: 2,
//       title: 'Premium PG for Boys',
//       location: 'Sector 14, Gurugram',
//       price: '₹12,000/month',
//       image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       propertyType: 'pg',
//       type: 'PG/Hostel',
//       rating: 4.8,
//       reviews: 256,
//       beds: 1,
//       baths: 1,
//       area: 80,
//       verified: true,
//       isRented: false,
//       pgAmenities: { mealsIncluded: true, sharingOptions: ['single', 'double'] }
//     },
//     {
//       id: 3,
//       title: '3 BHK Luxury Flat',
//       location: 'Dwarka, West Delhi',
//       price: '₹85,000/month',
//       image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       propertyType: 'flat',
//       type: 'Flat',
//       rating: 4.9,
//       reviews: 342,
//       beds: 3,
//       baths: 2,
//       area: 180,
//       verified: true,
//       isRented: false
//     },
//     {
//       id: 4,
//       title: 'Premium Villa with Garden',
//       location: 'Sushant Lok, Gurugram',
//       price: '₹1,50,000/month',
//       image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       propertyType: 'villa',
//       type: 'Villa',
//       rating: 4.9,
//       reviews: 203,
//       beds: 4,
//       baths: 3,
//       area: 350,
//       verified: true,
//       isRented: false
//     },
//     {
//       id: 5,
//       title: 'Commercial Office Space',
//       location: 'Cyber City, Gurugram',
//       price: '₹2,00,000/month',
//       image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       propertyType: 'commercial',
//       type: 'Commercial',
//       rating: 4.7,
//       reviews: 156,
//       beds: 0,
//       baths: 2,
//       area: 500,
//       verified: true,
//       isRented: false
//     }
//   ]

//   const toggleLike = (id) => {
//     if (likedProperties.includes(id)) {
//       setLikedProperties(likedProperties.filter(propId => propId !== id))
//       toast.success('Removed from saved properties')
//     } else {
//       setLikedProperties([...likedProperties, id])
//       toast.success('Added to saved properties')
//     }
//   }

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target
//     setFilters(prev => ({ ...prev, [name]: value }))
//   }

//   const handleReset = () => {
//     setFilters({
//       propertyType: 'all',
//       city: 'all',
//       minPrice: '',
//       maxPrice: '',
//       bedrooms: 'any',
//       furnishing: 'any'
//     })
//   }

//   // Handle Schedule Visit
//   const handleScheduleVisit = (property, e) => {
//     e.preventDefault()
//     if (!user) {
//       toast.error('Please login to schedule a visit')
//       router.push('/login')
//       return
//     }
//     setSelectedProperty(property)
//     setShowVisitModal(true)
//   }

//   const handleVisitSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!visitForm.date || !visitForm.time) {
//       toast.error('Please select date and time')
//       return
//     }
    
//     setIsSubmitting(true)
    
//     try {
//       const response = await fetch('/api/visits/schedule', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('metrohome_token')}`
//         },
//         body: JSON.stringify({
//           propertyId: selectedProperty.id,
//           preferredDate: visitForm.date,
//           preferredTime: visitForm.time,
//           message: visitForm.message
//         })
//       })
      
//       const data = await response.json()
      
//       if (response.ok) {
//         toast.success(`Visit scheduled! Your agent ${data.assignedAgent?.name} will contact you.`)
//         setShowVisitModal(false)
//         setVisitForm({ date: '', time: '', message: '' })
        
//         // Send email notification
//         await fetch('/api/notifications/send-email', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             to: user.email,
//             type: 'visit_confirmation',
//             data: {
//               propertyTitle: selectedProperty.title,
//               date: visitForm.date,
//               time: visitForm.time,
//               agentName: data.assignedAgent?.name,
//               agentPhone: data.assignedAgent?.phone
//             }
//           })
//         })
//       } else {
//         toast.error(data.error || 'Failed to schedule visit')
//       }
//     } catch (error) {
//       console.error('Visit scheduling error:', error)
//       toast.error('Something went wrong')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Filter properties based on search and filters
//   const filteredProperties = properties.filter(property => {
//     // Search filter
//     if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
//         !property.location.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return false
//     }
    
//     // Property Type filter
//     if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) {
//       return false
//     }
    
//     // City filter
//     if (filters.city !== 'all') {
//       const cityMap = {
//         'west_delhi': 'West Delhi',
//         'gurugram': 'Gurugram'
//       }
//       if (!property.location.includes(cityMap[filters.city])) {
//         return false
//       }
//     }
    
//     // Price filter
//     const priceNum = parseInt(property.price.replace(/[^0-9]/g, ''))
//     if (filters.minPrice && priceNum < parseInt(filters.minPrice)) {
//       return false
//     }
//     if (filters.maxPrice && priceNum > parseInt(filters.maxPrice)) {
//       return false
//     }
    
//     // Bedrooms filter
//     if (filters.bedrooms !== 'any') {
//       if (filters.bedrooms === '4' && property.beds < 4) return false
//       if (filters.bedrooms !== '4' && property.beds !== parseInt(filters.bedrooms)) return false
//     }
    
//     return true
//   })

//   // Get tomorrow's date for min date
//   const tomorrow = new Date()
//   tomorrow.setDate(tomorrow.getDate() + 1)
//   const minDate = tomorrow.toISOString().split('T')[0]

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HERO SECTION */}
//       <div className="relative h-[500px] overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/70"></div>
//         </div>
        
//         <div className="absolute bottom-20 right-20 animate-float-delayed">
//           <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-3">
//             <div className="flex items-center gap-2">
//               <FaStar className="text-yellow-400" />
//               <span className="text-white font-bold">5000+ Verified Properties</span>
//             </div>
//           </div>
//         </div>

//         <div className="relative z-10 container-custom h-full flex flex-col justify-center">
//           <div className="max-w-3xl text-white">
//             <div className="flex items-center gap-2 text-sm mb-4">
//               <Link href="/" className="hover:text-green-300 transition">Home</Link>
//               <span>/</span>
//               <span className="text-green-300">Properties</span>
//             </div>

//             <h1 className="text-6xl font-bold mb-4">
//               Find Your Dream Home
//             </h1>
//             <p className="text-2xl mb-3 text-green-100">
//               Discover 5000+ verified properties in Delhi & Gurugram
//             </p>
//             <p className="text-lg text-white/90 mb-8">
//               🏆 India's Most Trusted Property Portal • ⭐ 4.8 Rating • ✅ Physically Verified
//             </p>
            
//             <div className="flex gap-8 mt-8">
//               <div className="text-center">
//                 <div className="text-3xl font-bold">5000+</div>
//                 <div className="text-sm text-green-200">Properties</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold">10000+</div>
//                 <div className="text-sm text-green-200">Happy Clients</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold">100%</div>
//                 <div className="text-sm text-green-200">Verified</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold">24/7</div>
//                 <div className="text-sm text-green-200">Support</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
//       </div>

//       {/* Main Content */}
//       <div className="container-custom py-8 -mt-16 relative z-20">
//         {/* Search Bar */}
//         <div className="bg-white rounded-2xl shadow-2xl p-2 mb-8">
//           <div className="flex flex-col md:flex-row">
//             <div className="flex-1 flex items-center px-4">
//               <FaSearch className="text-gray-400 mr-3" />
//               <input
//                 type="text"
//                 placeholder="Search by location, property name, or type..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full py-4 focus:outline-none text-gray-900"
//               />
//             </div>
//             <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 m-2 md:m-0">
//               Search Properties
//             </button>
//           </div>
//         </div>

//         {/* Filter Toggle */}
//         <div className="mb-6">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 group"
//           >
//             <FaFilter className={`group-hover:rotate-12 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
//             {showFilters ? 'Hide Filters' : 'Show Filters'}
//           </button>
//         </div>

//         {/* Filters Panel */}
//         <div className={`transition-all duration-500 overflow-hidden ${showFilters ? 'max-h-[800px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-gray-900">Filter Properties</h3>
//               <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Property Type - Updated with all types */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
//                 <select
//                   name="propertyType"
//                   value={filters.propertyType}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   {propertyTypeOptions.map(option => (
//                     <option key={option.value} value={option.value}>
//                       {option.icon} {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* City */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                 <select
//                   name="city"
//                   value={filters.city}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   <option value="all">All Cities</option>
//                   <option value="west_delhi">West Delhi</option>
//                   <option value="gurugram">Gurugram</option>
//                 </select>
//               </div>

//               {/* Bedrooms */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
//                 <select
//                   name="bedrooms"
//                   value={filters.bedrooms}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   <option value="any">Any</option>
//                   <option value="1">1 BHK</option>
//                   <option value="2">2 BHK</option>
//                   <option value="3">3 BHK</option>
//                   <option value="4">4+ BHK</option>
//                 </select>
//               </div>

//               {/* Price Range */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹)</label>
//                 <input
//                   type="number"
//                   name="minPrice"
//                   value={filters.minPrice}
//                   onChange={handleFilterChange}
//                   placeholder="e.g., 30000"
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
//                 <input
//                   type="number"
//                   name="maxPrice"
//                   value={filters.maxPrice}
//                   onChange={handleFilterChange}
//                   placeholder="e.g., 100000"
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 />
//               </div>

//               {/* Furnishing */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
//                 <select
//                   name="furnishing"
//                   value={filters.furnishing}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   <option value="any">Any</option>
//                   <option value="fully">Fully Furnished</option>
//                   <option value="semi">Semi Furnished</option>
//                   <option value="unfurnished">Unfurnished</option>
//                 </select>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={handleReset}
//                 className="text-gray-600 hover:text-green-600 font-medium flex items-center gap-2"
//               >
//                 <span className="group-hover:rotate-180 transition-transform">↻</span>
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-gray-600">
//             Showing <span className="font-bold text-green-600">{filteredProperties.length}</span> properties
//           </p>
//           <p className="text-sm text-gray-500">Sorted by: Latest</p>
//         </div>

//         {/* Properties Grid */}
//         {filteredProperties.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-2xl shadow">
//             <FaHome className="text-6xl text-gray-300 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
//             <p className="text-gray-600">Try adjusting your filters or search criteria</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredProperties.map((property, index) => (
//               <div key={property.id} className="group relative">
//                 <div className="property-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
//                   <div className="relative h-64 overflow-hidden">
//                     <img
//                       src={property.image}
//                       alt={property.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                     />
                    
//                     {property.verified && (
//                       <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
//                         <FaCheckCircle className="text-xs" /> Verified
//                       </div>
//                     )}
                    
//                     <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                       {property.type}
//                     </div>
                    
//                     <div className="absolute bottom-4 left-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
//                       <FaStar className="text-yellow-400" />
//                       {property.rating} ({property.reviews})
//                     </div>
                    
//                     <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                       <button
//                         onClick={(e) => {
//                           e.preventDefault()
//                           toggleLike(property.id)
//                         }}
//                         className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110"
//                       >
//                         <FaHeart className={likedProperties.includes(property.id) ? 'text-red-500 fill-current' : 'text-gray-400'} />
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
//                       {property.title}
//                     </h3>
                    
//                     <div className="flex items-center text-gray-600 mb-4">
//                       <FaMapMarkerAlt className="mr-2 text-green-500" />
//                       <span className="text-sm">{property.location}</span>
//                     </div>

//                     <div className="grid grid-cols-3 gap-2 mb-4">
//                       <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
//                         <span className="font-bold text-gray-900">{property.beds}</span> Beds
//                       </div>
//                       <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
//                         <span className="font-bold text-gray-900">{property.baths}</span> Baths
//                       </div>
//                       <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
//                         <span className="font-bold text-gray-900">{property.area}</span> m²
//                       </div>
//                     </div>
                    
//                     <div className="flex justify-between items-center pt-2">
//                       <p className="text-2xl font-bold text-green-600">
//                         {property.price}
//                       </p>
                      
//                       {/* Schedule Visit Button */}
//                       <button
//                         onClick={(e) => handleScheduleVisit(property, e)}
//                         className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-1"
//                       >
//                         <FaCalendar />
//                         Schedule Visit
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Load More */}
//         {filteredProperties.length > 0 && (
//           <div className="text-center mt-12">
//             <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 group">
//               Load More Properties
//               <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Visit Schedule Modal */}
//       {showVisitModal && selectedProperty && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fade-in-up">
//             <button
//               onClick={() => setShowVisitModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//             >
//               <FaTimes />
//             </button>
            
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule Visit</h2>
//             <p className="text-gray-600 mb-6">{selectedProperty.title}</p>
            
//             <form onSubmit={handleVisitSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
//                 <div className="relative">
//                   <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="date"
//                     value={visitForm.date}
//                     onChange={(e) => setVisitForm({...visitForm, date: e.target.value})}
//                     min={minDate}
//                     className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
//                 <div className="relative">
//                   <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <select
//                     value={visitForm.time}
//                     onChange={(e) => setVisitForm({...visitForm, time: e.target.value})}
//                     className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500"
//                     required
//                   >
//                     <option value="">Select time</option>
//                     <option value="09:00">09:00 AM</option>
//                     <option value="10:00">10:00 AM</option>
//                     <option value="11:00">11:00 AM</option>
//                     <option value="12:00">12:00 PM</option>
//                     <option value="14:00">02:00 PM</option>
//                     <option value="15:00">03:00 PM</option>
//                     <option value="16:00">04:00 PM</option>
//                     <option value="17:00">05:00 PM</option>
//                     <option value="18:00">06:00 PM</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message (Optional)</label>
//                 <textarea
//                   value={visitForm.message}
//                   onChange={(e) => setVisitForm({...visitForm, message: e.target.value})}
//                   rows="3"
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500"
//                   placeholder="Any specific questions or requirements?"
//                 />
//               </div>
              
//               <div className="bg-green-50 p-4 rounded-lg">
//                 <p className="text-sm text-green-800 flex items-center gap-2">
//                   <FaUser className="text-green-600" />
//                   Our representative will contact you after scheduling
//                 </p>
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Scheduling...' : 'Confirm Visit'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

//18-05-2026
// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { 
//   FaFilter, FaStar, FaMapMarkerAlt, FaTimes, FaHeart, FaShare, 
//   FaSearch, FaHome, FaBuilding, FaCity, FaCalendar, FaClock,
//   FaUser, FaPhone, FaEnvelope, FaCheckCircle, FaWhatsapp
// } from 'react-icons/fa'
// import toast from 'react-hot-toast'

// export default function PropertiesPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
  
//   const [properties, setProperties] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showFilters, setShowFilters] = useState(false)
//   const [showVisitModal, setShowVisitModal] = useState(false)
//   const [selectedProperty, setSelectedProperty] = useState(null)
//   const [visitForm, setVisitForm] = useState({
//     date: '',
//     time: '',
//     message: ''
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
  
//   const [filters, setFilters] = useState({
//     propertyType: searchParams.get('type') || 'all',
//     city: 'all',
//     minPrice: '',
//     maxPrice: '',
//     bedrooms: 'any',
//     furnishing: 'any'
//   })
//   const [likedProperties, setLikedProperties] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [user, setUser] = useState(null)

//   // Check if user is logged in
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem('metrohome_token')
//       const userData = localStorage.getItem('metrohome_user')
//       if (token && userData) {
//         setUser(JSON.parse(userData))
//       }
//     }
//     checkAuth()
//   }, [])

//   // ✅ Fetch properties from database
//   useEffect(() => {
//     fetchProperties()
//   }, [])

//   const fetchProperties = async () => {
//     try {
//       setLoading(true)
//       const res = await fetch('/api/properties')
//       const data = await res.json()
//       if (res.ok) {
//         setProperties(data.properties)
//       } else {
//         toast.error('Failed to load properties')
//       }
//     } catch (error) {
//       console.error('Error fetching properties:', error)
//       toast.error('Something went wrong')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Property Types with icons
//   const propertyTypeOptions = [
//     { value: 'all', label: 'All Properties', icon: '🏠' },
//     { value: 'Apartment', label: 'Apartments', icon: '🏢' },
//     { value: 'Villa', label: 'Villas', icon: '🏰' },
//     { value: 'PG', label: 'PG/Hostel', icon: '🏠' },
//     { value: 'Flat', label: 'Flats', icon: '🏡' },
//     { value: 'Luxury Villa', label: 'Luxury Villas', icon: '🏰' }
//   ]

//   const toggleLike = (id, e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (likedProperties.includes(id)) {
//       setLikedProperties(likedProperties.filter(propId => propId !== id))
//       toast.success('Removed from saved properties')
//     } else {
//       setLikedProperties([...likedProperties, id])
//       toast.success('Added to saved properties')
//     }
//   }

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target
//     setFilters(prev => ({ ...prev, [name]: value }))
//   }

//   const handleReset = () => {
//     setFilters({
//       propertyType: 'all',
//       city: 'all',
//       minPrice: '',
//       maxPrice: '',
//       bedrooms: 'any',
//       furnishing: 'any'
//     })
//   }

//   // Handle Schedule Visit
//   const handleScheduleVisit = (property, e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (!user) {
//       toast.error('Please login to schedule a visit')
//       router.push('/login')
//       return
//     }
//     setSelectedProperty(property)
//     setShowVisitModal(true)
//   }

//   const handleVisitSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!visitForm.date || !visitForm.time) {
//       toast.error('Please select date and time')
//       return
//     }
    
//     setIsSubmitting(true)
    
//     try {
//       // ✅ Send the real MongoDB _id
//       const response = await fetch('/api/visits/schedule', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           propertyId: selectedProperty._id,  // ✅ Real ObjectId
//           preferredDate: visitForm.date,
//           preferredTime: visitForm.time,
//           message: visitForm.message
//         })
//       })
      
//       const data = await response.json()
      
//       if (response.ok) {
//         toast.success(`Visit scheduled! ${data.assignedAgent?.name} will contact you.`)
//         setShowVisitModal(false)
//         setVisitForm({ date: '', time: '', message: '' })
//       } else {
//         toast.error(data.error || 'Failed to schedule visit')
//       }
//     } catch (error) {
//       console.error('Visit scheduling error:', error)
//       toast.error('Something went wrong')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Filter properties based on search and filters
//   const filteredProperties = properties.filter(property => {
//     if (!property) return false
    
//     // Search filter
//     if (searchTerm && !property.title?.toLowerCase().includes(searchTerm.toLowerCase()) && 
//         !property.location?.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return false
//     }
    
//     // Property Type filter
//     if (filters.propertyType !== 'all' && property.type !== filters.propertyType) {
//       return false
//     }
    
//     // City filter
//     if (filters.city !== 'all') {
//       const cityMap = {
//         'west_delhi': 'West Delhi',
//         'gurugram': 'Gurugram'
//       }
//       if (!property.location?.includes(cityMap[filters.city])) {
//         return false
//       }
//     }
    
//     // Price filter
//     const priceNum = property.priceValue || 0
//     if (filters.minPrice && priceNum < parseInt(filters.minPrice)) {
//       return false
//     }
//     if (filters.maxPrice && priceNum > parseInt(filters.maxPrice)) {
//       return false
//     }
    
//     // Bedrooms filter
//     if (filters.bedrooms !== 'any') {
//       if (filters.bedrooms === '4' && property.bedrooms < 4) return false
//       if (filters.bedrooms !== '4' && property.bedrooms !== parseInt(filters.bedrooms)) return false
//     }
    
//     return true
//   })

//   // Get tomorrow's date for min date
//   const tomorrow = new Date()
//   tomorrow.setDate(tomorrow.getDate() + 1)
//   const minDate = tomorrow.toISOString().split('T')[0]

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HERO SECTION */}
//       <div className="relative h-[500px] overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/70"></div>
//         </div>
        
//         <div className="absolute bottom-20 right-20 animate-float-delayed">
//           <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-3">
//             <div className="flex items-center gap-2">
//               <FaStar className="text-yellow-400" />
//               <span className="text-white font-bold">5000+ Verified Properties</span>
//             </div>
//           </div>
//         </div>

//         <div className="relative z-10 container-custom h-full flex flex-col justify-center">
//           <div className="max-w-3xl text-white">
//             <div className="flex items-center gap-2 text-sm mb-4">
//               <Link href="/" className="hover:text-green-300 transition">Home</Link>
//               <span>/</span>
//               <span className="text-green-300">Properties</span>
//             </div>

//             <h1 className="text-6xl font-bold mb-4">
//               Find Your Dream Home
//             </h1>
//             <p className="text-2xl mb-3 text-green-100">
//               Discover {properties.length}+ verified properties in Delhi & Gurugram
//             </p>
//             <p className="text-lg text-white/90 mb-8">
//               🏆 India's Most Trusted Property Portal • ⭐ 4.8 Rating • ✅ Physically Verified
//             </p>
            
//             <div className="flex gap-8 mt-8">
//               <div className="text-center">
//                 <div className="text-3xl font-bold">{properties.length}+</div>
//                 <div className="text-sm text-green-200">Properties</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold">10000+</div>
//                 <div className="text-sm text-green-200">Happy Clients</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold">100%</div>
//                 <div className="text-sm text-green-200">Verified</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold">24/7</div>
//                 <div className="text-sm text-green-200">Support</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
//       </div>

//       {/* Main Content */}
//       <div className="container-custom py-8 -mt-16 relative z-20">
//         {/* Search Bar */}
//         <div className="bg-white rounded-2xl shadow-2xl p-2 mb-8">
//           <div className="flex flex-col md:flex-row">
//             <div className="flex-1 flex items-center px-4">
//               <FaSearch className="text-gray-400 mr-3" />
//               <input
//                 type="text"
//                 placeholder="Search by location, property name, or type..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full py-4 focus:outline-none text-gray-900"
//               />
//             </div>
//             <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 m-2 md:m-0">
//               Search Properties
//             </button>
//           </div>
//         </div>

//         {/* Filter Toggle */}
//         <div className="mb-6">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 group"
//           >
//             <FaFilter className={`group-hover:rotate-12 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
//             {showFilters ? 'Hide Filters' : 'Show Filters'}
//           </button>
//         </div>

//         {/* Filters Panel */}
//         <div className={`transition-all duration-500 overflow-hidden ${showFilters ? 'max-h-[800px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-gray-900">Filter Properties</h3>
//               <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
//                 <select
//                   name="propertyType"
//                   value={filters.propertyType}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   {propertyTypeOptions.map(option => (
//                     <option key={option.value} value={option.value}>
//                       {option.icon} {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                 <select
//                   name="city"
//                   value={filters.city}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   <option value="all">All Cities</option>
//                   <option value="west_delhi">West Delhi</option>
//                   <option value="gurugram">Gurugram</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
//                 <select
//                   name="bedrooms"
//                   value={filters.bedrooms}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   <option value="any">Any</option>
//                   <option value="1">1 BHK</option>
//                   <option value="2">2 BHK</option>
//                   <option value="3">3 BHK</option>
//                   <option value="4">4+ BHK</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹)</label>
//                 <input
//                   type="number"
//                   name="minPrice"
//                   value={filters.minPrice}
//                   onChange={handleFilterChange}
//                   placeholder="e.g., 30000"
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
//                 <input
//                   type="number"
//                   name="maxPrice"
//                   value={filters.maxPrice}
//                   onChange={handleFilterChange}
//                   placeholder="e.g., 100000"
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
//                 <select
//                   name="furnishing"
//                   value={filters.furnishing}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   <option value="any">Any</option>
//                   <option value="fully">Fully Furnished</option>
//                   <option value="semi">Semi Furnished</option>
//                   <option value="unfurnished">Unfurnished</option>
//                 </select>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={handleReset}
//                 className="text-gray-600 hover:text-green-600 font-medium flex items-center gap-2"
//               >
//                 <span className="group-hover:rotate-180 transition-transform">↻</span>
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-gray-600">
//             Showing <span className="font-bold text-green-600">{filteredProperties.length}</span> properties
//           </p>
//           <p className="text-sm text-gray-500">Sorted by: Latest</p>
//         </div>

//         {/* Properties Grid - FROM DATABASE */}
//         {filteredProperties.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-2xl shadow">
//             <FaHome className="text-6xl text-gray-300 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
//             <p className="text-gray-600">Try adjusting your filters or search criteria</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredProperties.map((property) => (
//               <div key={property._id} className="group relative">
//                 <Link href={`/properties/${property._id}`}>
//                   <div className="property-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
//                     <div className="relative h-64 overflow-hidden">
//                       <img
//                         src={property.images?.[0] || 'https://via.placeholder.com/800x600?text=No+Image'}
//                         alt={property.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                       />
                      
//                       {property.isVerified && (
//                         <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
//                           <FaCheckCircle className="text-xs" /> Verified
//                         </div>
//                       )}
                      
//                       <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                         {property.type}
//                       </div>
                      
//                       <div className="absolute bottom-4 left-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
//                         <FaStar className="text-yellow-400" />
//                         {property.rating} ({property.reviews} reviews)
//                       </div>
                      
//                       <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                         <button
//                           onClick={(e) => toggleLike(property._id, e)}
//                           className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110"
//                         >
//                           <FaHeart className={likedProperties.includes(property._id) ? 'text-red-500 fill-current' : 'text-gray-400'} />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className="p-6">
//                       <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
//                         {property.title}
//                       </h3>
                      
//                       <div className="flex items-center text-gray-600 mb-4">
//                         <FaMapMarkerAlt className="mr-2 text-green-500" />
//                         <span className="text-sm">{property.location}</span>
//                       </div>

//                       <div className="grid grid-cols-3 gap-2 mb-4">
//                         <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
//                           <span className="font-bold text-gray-900">{property.bedrooms}</span> Beds
//                         </div>
//                         <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
//                           <span className="font-bold text-gray-900">{property.bathrooms}</span> Baths
//                         </div>
//                         <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
//                           <span className="font-bold text-gray-900">{property.areaSqft}</span> m²
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-between items-center pt-2">
//                         <p className="text-2xl font-bold text-green-600">
//                           {property.price}
//                         </p>
                        
//                         {/* Schedule Visit Button */}
//                         <button
//                           onClick={(e) => handleScheduleVisit(property, e)}
//                           className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-1"
//                         >
//                           <FaCalendar />
//                           Schedule Visit
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Load More */}
//         {filteredProperties.length > 0 && (
//           <div className="text-center mt-12">
//             <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 group">
//               Load More Properties
//               <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Visit Schedule Modal */}
//       {showVisitModal && selectedProperty && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fade-in-up">
//             <button
//               onClick={() => setShowVisitModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//             >
//               <FaTimes />
//             </button>
            
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule Visit</h2>
//             <p className="text-gray-600 mb-2">{selectedProperty.title}</p>
//             <p className="text-gray-500 text-sm mb-6">{selectedProperty.location}</p>
            
//             <form onSubmit={handleVisitSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
//                 <div className="relative">
//                   <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="date"
//                     value={visitForm.date}
//                     onChange={(e) => setVisitForm({...visitForm, date: e.target.value})}
//                     min={minDate}
//                     className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
//                 <div className="relative">
//                   <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <select
//                     value={visitForm.time}
//                     onChange={(e) => setVisitForm({...visitForm, time: e.target.value})}
//                     className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500"
//                     required
//                   >
//                     <option value="">Select time</option>
//                     <option value="09:00">09:00 AM</option>
//                     <option value="10:00">10:00 AM</option>
//                     <option value="11:00">11:00 AM</option>
//                     <option value="12:00">12:00 PM</option>
//                     <option value="14:00">02:00 PM</option>
//                     <option value="15:00">03:00 PM</option>
//                     <option value="16:00">04:00 PM</option>
//                     <option value="17:00">05:00 PM</option>
//                     <option value="18:00">06:00 PM</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message (Optional)</label>
//                 <textarea
//                   value={visitForm.message}
//                   onChange={(e) => setVisitForm({...visitForm, message: e.target.value})}
//                   rows="3"
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500"
//                   placeholder="Any specific questions or requirements?"
//                 />
//               </div>
              
//               <div className="bg-green-50 p-4 rounded-lg">
//                 <p className="text-sm text-green-800 flex items-center gap-2">
//                   <FaUser className="text-green-600" />
//                   Our representative will contact you after scheduling
//                 </p>
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Scheduling...' : 'Confirm Visit'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }




// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { 
//   FaFilter, FaStar, FaMapMarkerAlt, FaTimes, FaHeart, FaShare, 
//   FaSearch, FaHome, FaBuilding, FaCity, FaCalendar, FaClock,
//   FaUser, FaPhone, FaEnvelope, FaCheckCircle, FaWhatsapp
// } from 'react-icons/fa'
// import toast from 'react-hot-toast'

// export default function PropertiesPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
  
//   const [properties, setProperties] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showFilters, setShowFilters] = useState(false)
//   const [showVisitModal, setShowVisitModal] = useState(false)
//   const [selectedProperty, setSelectedProperty] = useState(null)
//   const [visitForm, setVisitForm] = useState({
//     date: '',
//     time: '',
//     message: ''
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
  
//   const [filters, setFilters] = useState({
//     propertyType: searchParams.get('type') || 'all',
//     city: 'all',
//     minPrice: '',
//     maxPrice: '',
//     bedrooms: 'any',
//     furnishing: 'any'
//   })
//   const [likedProperties, setLikedProperties] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [user, setUser] = useState(null)

//   // Check if user is logged in
//   useEffect(() => {
//     const token = localStorage.getItem('metrohome_token')
//     const userData = localStorage.getItem('metrohome_user')
//     if (token && userData) {
//       setUser(JSON.parse(userData))
//     }
//   }, [])

//   // ✅ Fetch properties from database
//   useEffect(() => {
//     fetchProperties()
//   }, [])

//   const fetchProperties = async () => {
//     try {
//       setLoading(true)
//       const res = await fetch('/api/properties')
//       const data = await res.json()
      
//       if (res.ok && data.properties) {
//         console.log('✅ Fetched properties:', data.properties.length)
//         console.log('✅ Sample property ID:', data.properties[0]?._id)
//         setProperties(data.properties)
//       } else {
//         toast.error('Failed to load properties')
//       }
//     } catch (error) {
//       console.error('Error fetching properties:', error)
//       toast.error('Something went wrong')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const propertyTypeOptions = [
//     { value: 'all', label: 'All Properties', icon: '🏠' },
//     { value: 'Apartment', label: 'Apartments', icon: '🏢' },
//     { value: 'Villa', label: 'Villas', icon: '🏰' },
//     { value: 'PG', label: 'PG/Hostel', icon: '🏠' },
//     { value: 'Flat', label: 'Flats', icon: '🏡' },
//     { value: 'Luxury Villa', label: 'Luxury Villas', icon: '🏰' }
//   ]

//   const toggleLike = (id, e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (likedProperties.includes(id)) {
//       setLikedProperties(likedProperties.filter(propId => propId !== id))
//       toast.success('Removed from saved')
//     } else {
//       setLikedProperties([...likedProperties, id])
//       toast.success('Added to saved')
//     }
//   }

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target
//     setFilters(prev => ({ ...prev, [name]: value }))
//   }

//   const handleReset = () => {
//     setFilters({
//       propertyType: 'all',
//       city: 'all',
//       minPrice: '',
//       maxPrice: '',
//       bedrooms: 'any',
//       furnishing: 'any'
//     })
//   }

//   // ✅ Handle Schedule Visit
//   const handleScheduleVisit = (property, e) => {
//     e.preventDefault()
//     e.stopPropagation()
    
//     console.log('📦 Selected property:', property.title)
//     console.log('📦 Property _id:', property._id)
    
//     if (!user) {
//       toast.error('Please login to schedule a visit')
//       router.push('/login')
//       return
//     }
    
//     setSelectedProperty(property)
//     setShowVisitModal(true)
//   }

//   // ✅ Handle Visit Submit
//   const handleVisitSubmit = async (e) => {
//     e.preventDefault()
//     e.stopPropagation()
    
//     if (!visitForm.date || !visitForm.time) {
//       toast.error('Please select date and time')
//       return
//     }
    
//     if (!selectedProperty || !selectedProperty._id) {
//       toast.error('Property error. Please try again.')
//       return
//     }
    
//     setIsSubmitting(true)
//     toast.loading('Scheduling visit...', { id: 'visit' })
    
//     try {
//       const requestBody = {
//         propertyId: selectedProperty._id,
//         preferredDate: visitForm.date,
//         preferredTime: visitForm.time,
//         message: visitForm.message
//       }
      
//       console.log('📤 Sending:', requestBody)
      
//       const response = await fetch('/api/visits/schedule', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody)
//       })
      
//       const data = await response.json()
//       console.log('📥 Response:', data)
      
//       if (response.ok) {
//         toast.success(`Visit scheduled! ${data.assignedAgent?.name || 'Our agent'} will contact you.`, { id: 'visit' })
//         setShowVisitModal(false)
//         setVisitForm({ date: '', time: '', message: '' })
//         setSelectedProperty(null)
//       } else {
//         toast.error(data.error || 'Failed to schedule', { id: 'visit' })
//       }
//     } catch (error) {
//       console.error('Error:', error)
//       toast.error('Something went wrong', { id: 'visit' })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // ✅ Filter properties
//   const filteredProperties = properties.filter(property => {
//     if (!property) return false
    
//     if (searchTerm && !property.title?.toLowerCase().includes(searchTerm.toLowerCase()) && 
//         !property.location?.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return false
//     }
    
//     if (filters.propertyType !== 'all' && property.type !== filters.propertyType) {
//       return false
//     }
    
//     if (filters.city !== 'all') {
//       const cityMap = { 'west_delhi': 'West Delhi', 'gurugram': 'Gurugram' }
//       if (!property.location?.includes(cityMap[filters.city])) return false
//     }
    
//     const priceNum = property.priceValue || 0
//     if (filters.minPrice && priceNum < parseInt(filters.minPrice)) return false
//     if (filters.maxPrice && priceNum > parseInt(filters.maxPrice)) return false
    
//     if (filters.bedrooms !== 'any') {
//       if (filters.bedrooms === '4' && property.bedrooms < 4) return false
//       if (filters.bedrooms !== '4' && property.bedrooms !== parseInt(filters.bedrooms)) return false
//     }
    
//     return true
//   })

//   const tomorrow = new Date()
//   tomorrow.setDate(tomorrow.getDate() + 1)
//   const minDate = tomorrow.toISOString().split('T')[0]

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HERO SECTION */}
//       <div className="relative h-[500px] overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/70"></div>
//         </div>
        
//         <div className="absolute bottom-20 right-20 animate-float-delayed">
//           <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-3">
//             <div className="flex items-center gap-2">
//               <FaStar className="text-yellow-400" />
//               <span className="text-white font-bold">5000+ Verified Properties</span>
//             </div>
//           </div>
//         </div>

//         <div className="relative z-10 container-custom h-full flex flex-col justify-center">
//           <div className="max-w-3xl text-white">
//             <div className="flex items-center gap-2 text-sm mb-4">
//               <Link href="/" className="hover:text-green-300 transition">Home</Link>
//               <span>/</span>
//               <span className="text-green-300">Properties</span>
//             </div>

//             <h1 className="text-6xl font-bold mb-4">Find Your Dream Home</h1>
//             <p className="text-2xl mb-3 text-green-100">
//               Discover {properties.length}+ verified properties in Delhi & Gurugram
//             </p>
//             <p className="text-lg text-white/90 mb-8">
//               🏆 India's Most Trusted Property Portal • ⭐ 4.8 Rating • ✅ Physically Verified
//             </p>
            
//             <div className="flex gap-8 mt-8">
//               <div className="text-center">
//                 <div className="text-3xl font-bold">{properties.length}+</div>
//                 <div className="text-sm text-green-200">Properties</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold">10000+</div>
//                 <div className="text-sm text-green-200">Happy Clients</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold">100%</div>
//                 <div className="text-sm text-green-200">Verified</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold">24/7</div>
//                 <div className="text-sm text-green-200">Support</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
//       </div>

//       {/* Main Content */}
//       <div className="container-custom py-8 -mt-16 relative z-20">
//         {/* Search Bar */}
//         <div className="bg-white rounded-2xl shadow-2xl p-2 mb-8">
//           <div className="flex flex-col md:flex-row">
//             <div className="flex-1 flex items-center px-4">
//               <FaSearch className="text-gray-400 mr-3" />
//               <input
//                 type="text"
//                 placeholder="Search by location, property name, or type..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full py-4 focus:outline-none text-gray-900"
//               />
//             </div>
//             <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 m-2 md:m-0">
//               Search Properties
//             </button>
//           </div>
//         </div>

//         {/* Filter Toggle */}
//         <div className="mb-6">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 group"
//           >
//             <FaFilter className={`group-hover:rotate-12 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
//             {showFilters ? 'Hide Filters' : 'Show Filters'}
//           </button>
//         </div>

//         {/* Filters Panel */}
//         <div className={`transition-all duration-500 overflow-hidden ${showFilters ? 'max-h-[800px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-gray-900">Filter Properties</h3>
//               <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
//                 <select
//                   name="propertyType"
//                   value={filters.propertyType}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   {propertyTypeOptions.map(option => (
//                     <option key={option.value} value={option.value}>
//                       {option.icon} {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                 <select
//                   name="city"
//                   value={filters.city}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   <option value="all">All Cities</option>
//                   <option value="west_delhi">West Delhi</option>
//                   <option value="gurugram">Gurugram</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
//                 <select
//                   name="bedrooms"
//                   value={filters.bedrooms}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   <option value="any">Any</option>
//                   <option value="1">1 BHK</option>
//                   <option value="2">2 BHK</option>
//                   <option value="3">3 BHK</option>
//                   <option value="4">4+ BHK</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹)</label>
//                 <input
//                   type="number"
//                   name="minPrice"
//                   value={filters.minPrice}
//                   onChange={handleFilterChange}
//                   placeholder="e.g., 30000"
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
//                 <input
//                   type="number"
//                   name="maxPrice"
//                   value={filters.maxPrice}
//                   onChange={handleFilterChange}
//                   placeholder="e.g., 100000"
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
//                 <select
//                   name="furnishing"
//                   value={filters.furnishing}
//                   onChange={handleFilterChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3"
//                 >
//                   <option value="any">Any</option>
//                   <option value="fully">Fully Furnished</option>
//                   <option value="semi">Semi Furnished</option>
//                   <option value="unfurnished">Unfurnished</option>
//                 </select>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={handleReset}
//                 className="text-gray-600 hover:text-green-600 font-medium flex items-center gap-2"
//               >
//                 <span className="group-hover:rotate-180 transition-transform">↻</span>
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-gray-600">
//             Showing <span className="font-bold text-green-600">{filteredProperties.length}</span> properties
//           </p>
//         </div>

//         {/* ✅ Properties Grid - Database se */}
//         {filteredProperties.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-2xl shadow">
//             <FaHome className="text-6xl text-gray-300 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
//             <p className="text-gray-600">Try adjusting your filters</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredProperties.map((property) => (
//               <div key={property._id} className="group relative">
//                 <div className="property-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
//                   <Link href={`/properties/${property._id}`}>
//                     <div className="relative h-64 overflow-hidden">
//                       <img
//                         src={property.images?.[0] || 'https://via.placeholder.com/800x600?text=No+Image'}
//                         alt={property.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                       />
                      
//                       {property.isVerified && (
//                         <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
//                           <FaCheckCircle className="text-xs" /> Verified
//                         </div>
//                       )}
                      
//                       <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                         {property.type}
//                       </div>
                      
//                       <div className="absolute bottom-4 left-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
//                         <FaStar className="text-yellow-400" />
//                         {property.rating} ({property.reviews} reviews)
//                       </div>
                      
//                       <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                         <button
//                           onClick={(e) => toggleLike(property._id, e)}
//                           className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110"
//                         >
//                           <FaHeart className={likedProperties.includes(property._id) ? 'text-red-500 fill-current' : 'text-gray-400'} />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className="p-6">
//                       <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
//                         {property.title}
//                       </h3>
                      
//                       <div className="flex items-center text-gray-600 mb-4">
//                         <FaMapMarkerAlt className="mr-2 text-green-500" />
//                         <span className="text-sm">{property.location}</span>
//                       </div>

//                       <div className="grid grid-cols-3 gap-2 mb-4">
//                         <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
//                           <span className="font-bold text-gray-900">{property.bedrooms}</span> Beds
//                         </div>
//                         <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
//                           <span className="font-bold text-gray-900">{property.bathrooms}</span> Baths
//                         </div>
//                         <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
//                           <span className="font-bold text-gray-900">{property.areaSqft}</span> m²
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-between items-center pt-2">
//                         <p className="text-2xl font-bold text-green-600">{property.price}</p>
//                       </div>
//                     </div>
//                   </Link>
                  
//                   {/* ✅ Schedule Visit Button - Outside Link */}
//                   <div className="px-6 pb-6 pt-0 -mt-2">
//                     <button
//                       onClick={(e) => handleScheduleVisit(property, e)}
//                       className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
//                     >
//                       <FaCalendar />
//                       Schedule Visit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ✅ Visit Schedule Modal */}
//       {showVisitModal && selectedProperty && (
//         <div 
//           className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4"
//           onClick={(e) => {
//             if (e.target === e.currentTarget) setShowVisitModal(false)
//           }}
//         >
//           <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
//             <button
//               onClick={() => setShowVisitModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
//             >
//               &times;
//             </button>
            
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Visit</h2>
//             <p className="text-gray-700 font-medium">{selectedProperty.title}</p>
//             <p className="text-gray-500 text-sm mb-4">{selectedProperty.location}</p>
            
//             <form onSubmit={handleVisitSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
//                 <div className="relative">
//                   <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="date"
//                     value={visitForm.date}
//                     onChange={(e) => setVisitForm({...visitForm, date: e.target.value})}
//                     min={minDate}
//                     className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
//                 <div className="relative">
//                   <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <select
//                     value={visitForm.time}
//                     onChange={(e) => setVisitForm({...visitForm, time: e.target.value})}
//                     className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500"
//                     required
//                   >
//                     <option value="">Select time</option>
//                     <option value="09:00">09:00 AM</option>
//                     <option value="10:00">10:00 AM</option>
//                     <option value="11:00">11:00 AM</option>
//                     <option value="12:00">12:00 PM</option>
//                     <option value="14:00">02:00 PM</option>
//                     <option value="15:00">03:00 PM</option>
//                     <option value="16:00">04:00 PM</option>
//                     <option value="17:00">05:00 PM</option>
//                     <option value="18:00">06:00 PM</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
//                 <textarea
//                   value={visitForm.message}
//                   onChange={(e) => setVisitForm({...visitForm, message: e.target.value})}
//                   rows="3"
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500"
//                   placeholder="Any specific questions?"
//                 />
//               </div>
              
//               <div className="bg-green-50 p-4 rounded-lg">
//                 <p className="text-sm text-green-800 flex items-center gap-2">
//                   <FaUser className="text-green-600" />
//                   Our representative will contact you
//                 </p>
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Scheduling...' : 'Confirm Visit'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }




'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  FaFilter, FaStar, FaMapMarkerAlt, FaTimes, FaHeart, 
  FaSearch, FaHome, FaCalendar, FaUser, FaCheckCircle
} from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function PropertiesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [showVisitModal, setShowVisitModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [visitForm, setVisitForm] = useState({ date: '', time: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [filters, setFilters] = useState({
    propertyType: searchParams.get('type') || 'all',
    city: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'any'
  })
  const [likedProperties, setLikedProperties] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('metrohome_token')
    const userData = localStorage.getItem('metrohome_user')
    if (token && userData) setUser(JSON.parse(userData))
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties')
      const data = await res.json()
      if (res.ok) {
        setProperties(data.properties)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleScheduleVisit = (property, e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      toast.error('Please login')
      router.push('/login')
      return
    }
    setSelectedProperty(property)
    setShowVisitModal(true)
  }

  const handleVisitSubmit = async (e) => {
    e.preventDefault()
    if (!visitForm.date || !visitForm.time) {
      toast.error('Select date and time')
      return
    }
    
    setIsSubmitting(true)
    toast.loading('Scheduling...', { id: 'visit' })
    
    try {
      const res = await fetch('/api/visits/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: selectedProperty._id,
          preferredDate: visitForm.date,
          preferredTime: visitForm.time,
          message: visitForm.message
        })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        toast.success(`Visit scheduled! ${data.assignedAgent?.name} will contact you.`, { id: 'visit' })
        setShowVisitModal(false)
        setVisitForm({ date: '', time: '', message: '' })
      } else {
        toast.error(data.error || 'Failed', { id: 'visit' })
      }
    } catch (error) {
      toast.error('Something went wrong', { id: 'visit' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleLike = (id, e) => {
    e.preventDefault()
    e.stopPropagation()
    if (likedProperties.includes(id)) {
      setLikedProperties(likedProperties.filter(pid => pid !== id))
    } else {
      setLikedProperties([...likedProperties, id])
    }
  }

  const filteredProperties = properties.filter(p => {
    if (searchTerm && !p.title?.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (filters.propertyType !== 'all' && p.type !== filters.propertyType) return false
    if (filters.city !== 'all') {
      const cityMap = { west_delhi: 'West Delhi', gurugram: 'Gurugram' }
      if (!p.location?.includes(cityMap[filters.city])) return false
    }
    return true
  })

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920")' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/70"></div>
        </div>
        <div className="relative z-10 container-custom h-full flex flex-col justify-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-6xl font-bold mb-4">Find Your Dream Home</h1>
            <p className="text-2xl mb-3">Discover {properties.length}+ verified properties</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8 -mt-16 relative z-20">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-2xl p-2 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 flex items-center px-4">
              <FaSearch className="text-gray-400 mr-3" />
              <input type="text" placeholder="Search by location, property name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-4 focus:outline-none" />
            </div>
            <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700">Search</button>
          </div>
        </div>

        {/* Filter Toggle */}
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl mb-6">
          <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <select name="propertyType" value={filters.propertyType} onChange={(e) => setFilters({...filters, propertyType: e.target.value})} className="w-full border rounded-xl px-4 py-3">
                  <option value="all">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="PG">PG</option>
                  <option value="Flat">Flat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <select name="city" value={filters.city} onChange={(e) => setFilters({...filters, city: e.target.value})} className="w-full border rounded-xl px-4 py-3">
                  <option value="all">All Cities</option>
                  <option value="west_delhi">West Delhi</option>
                  <option value="gurugram">Gurugram</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bedrooms</label>
                <select name="bedrooms" value={filters.bedrooms} onChange={(e) => setFilters({...filters, bedrooms: e.target.value})} className="w-full border rounded-xl px-4 py-3">
                  <option value="any">Any</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div key={property._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
              <Link href={`/properties/${property._id}`}>
                <div className="relative h-56 overflow-hidden">
                  <img src={property.images?.[0] || 'https://via.placeholder.com/400x300'} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  {property.isVerified && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                      <FaCheckCircle /> Verified
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs">{property.type}</div>
                  <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-md text-sm flex items-center gap-1 shadow">
                    <FaStar className="text-yellow-400" /> {property.rating} ({property.reviews})
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-600">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <FaMapMarkerAlt className="mr-1 text-green-500" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-green-600">{property.price}</p>
                  </div>
                </div>
              </Link>
              <div className="px-5 pb-5 pt-0">
                <button onClick={(e) => handleScheduleVisit(property, e)} className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2">
                  <FaCalendar /> Schedule Visit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visit Modal */}
      {showVisitModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && setShowVisitModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <button onClick={() => setShowVisitModal(false)} className="float-right text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            <h2 className="text-2xl font-bold mb-2">Schedule Visit</h2>
            <p className="font-medium">{selectedProperty.title}</p>
            <p className="text-sm text-gray-500 mb-4">{selectedProperty.location}</p>
            <form onSubmit={handleVisitSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input type="date" value={visitForm.date} onChange={(e) => setVisitForm({...visitForm, date: e.target.value})} min={minDate} className="w-full border rounded-xl p-3" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <select value={visitForm.time} onChange={(e) => setVisitForm({...visitForm, time: e.target.value})} className="w-full border rounded-xl p-3" required>
                  <option value="">Select time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                <textarea value={visitForm.message} onChange={(e) => setVisitForm({...visitForm, message: e.target.value})} rows="3" className="w-full border rounded-xl p-3" placeholder="Any questions?" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50">
                {isSubmitting ? 'Scheduling...' : 'Confirm Visit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}