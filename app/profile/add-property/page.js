// //Path: app/profile/add-property/page.js
// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { FaUpload, FaMapMarkerAlt, FaHome, FaBed, FaBath, FaRulerCombined, FaCheckCircle } from 'react-icons/fa'
// import toast from 'react-hot-toast'

// export default function AddPropertyPage() {
//   const router = useRouter()
//   const [currentStep, setCurrentStep] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     // Basic Info
//     title: '',
//     description: '',
//     type: 'flat',
//     category: 'rent',
//     price: '',
    
//     // Location
//     location: '',
//     city: 'west_delhi',
//     landmark: '',
    
//     // Details
//     bedrooms: '',
//     bathrooms: '',
//     areaSqft: '',
//     furnishing: 'semi',
    
//     // Amenities
//     amenities: {
//       parking: false,
//       wifi: false,
//       ac: false,
//       security: false,
//       powerBackup: false,
//       lift: false,
//       garden: false,
//       gym: false
//     },
    
//     // Images
//     images: []
//   })

//   const [imagePreviews, setImagePreviews] = useState([])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleAmenityChange = (amenity) => {
//     setFormData(prev => ({
//       ...prev,
//       amenities: {
//         ...prev.amenities,
//         [amenity]: !prev.amenities[amenity]
//       }
//     }))
//   }

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files)
//     const newPreviews = files.map(file => URL.createObjectURL(file))
//     setImagePreviews(prev => [...prev, ...newPreviews])
//     setFormData(prev => ({
//       ...prev,
//       images: [...prev.images, ...files]
//     }))
//   }

//   const removeImage = (index) => {
//     setImagePreviews(prev => prev.filter((_, i) => i !== index))
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 2000))
    
//     toast.success('Property listed successfully! It will be verified within 24 hours.')
//     router.push('/profile/my-properties')
//   }

//   const nextStep = () => setCurrentStep(prev => prev + 1)
//   const prevStep = () => setCurrentStep(prev => prev - 1)

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20">
//       <div className="container-custom py-8">
        
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Property</h1>
//           <p className="text-gray-600">Fill in the details below to list your property</p>
//         </div>

//         {/* Progress Steps */}
//         <div className="flex justify-between mb-12 max-w-3xl mx-auto">
//           {[1, 2, 3, 4].map((step) => (
//             <div key={step} className="flex items-center flex-1">
//               <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${
//                 currentStep >= step 
//                   ? 'bg-green-600 text-white' 
//                   : 'bg-gray-200 text-gray-600'
//               }`}>
//                 {currentStep > step ? <FaCheckCircle /> : step}
//               </div>
//               {step < 4 && (
//                 <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${
//                   currentStep > step ? 'bg-green-600' : 'bg-gray-200'
//                 }`}></div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          
//           {/* Step 1: Basic Info */}
//           {currentStep === 1 && (
//             <div className="space-y-6 animate-fade-in">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
//                   placeholder="e.g., 2 BHK Fully Furnished Flat in Rajouri Garden"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   required
//                   rows="5"
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
//                   placeholder="Describe your property in detail..."
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
//                   <select
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500"
//                   >
//                     <option value="flat">Flat/Apartment</option>
//                     <option value="house">Independent House</option>
//                     <option value="villa">Villa</option>
//                     <option value="pg">PG</option>
//                     <option value="commercial">Commercial</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500"
//                   >
//                     <option value="rent">For Rent</option>
//                     <option value="sale">For Sale</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-3 text-gray-500">₹</span>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500"
//                     placeholder="45000"
//                   />
//                   <span className="absolute right-4 top-3 text-gray-500">/month</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Location */}
//           {currentStep === 2 && (
//             <div className="space-y-6 animate-fade-in">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Details</h2>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500"
//                   placeholder="e.g., B-123, Rajouri Garden, Delhi"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
//                   <select
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500"
//                   >
//                     <option value="west_delhi">West Delhi</option>
//                     <option value="gurugram">Gurugram</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
//                   <input
//                     type="text"
//                     name="landmark"
//                     value={formData.landmark}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500"
//                     placeholder="e.g., Near Metro Station"
//                   />
//                 </div>
//               </div>

//               {/* Map Preview */}
//               <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
//                 <p className="text-gray-500">📍 Map location will appear here</p>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Property Details */}
//           {currentStep === 3 && (
//             <div className="space-y-6 animate-fade-in">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
//                   <div className="relative">
//                     <FaBed className="absolute left-4 top-3 text-gray-400" />
//                     <input
//                       type="number"
//                       name="bedrooms"
//                       value={formData.bedrooms}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-green-200"
//                       placeholder="2"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
//                   <div className="relative">
//                     <FaBath className="absolute left-4 top-3 text-gray-400" />
//                     <input
//                       type="number"
//                       name="bathrooms"
//                       value={formData.bathrooms}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-green-200"
//                       placeholder="2"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq.ft)</label>
//                   <div className="relative">
//                     <FaRulerCombined className="absolute left-4 top-3 text-gray-400" />
//                     <input
//                       type="number"
//                       name="areaSqft"
//                       value={formData.areaSqft}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-green-200"
//                       placeholder="1200"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
//                 <select
//                   name="furnishing"
//                   value={formData.furnishing}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200"
//                 >
//                   <option value="fully">Fully Furnished</option>
//                   <option value="semi">Semi Furnished</option>
//                   <option value="unfurnished">Unfurnished</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-4">Amenities</label>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {Object.keys(formData.amenities).map((amenity) => (
//                     <label key={amenity} className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={formData.amenities[amenity]}
//                         onChange={() => handleAmenityChange(amenity)}
//                         className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
//                       />
//                       <span className="text-gray-700 capitalize">{amenity}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 4: Images */}
//           {currentStep === 4 && (
//             <div className="space-y-6 animate-fade-in">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Photos</h2>
              
//               {/* Upload Area */}
//               <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 transition-all duration-300">
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                   id="imageUpload"
//                 />
//                 <label
//                   htmlFor="imageUpload"
//                   className="cursor-pointer flex flex-col items-center"
//                 >
//                   <FaUpload className="text-4xl text-gray-400 mb-4" />
//                   <span className="text-lg font-medium text-gray-900 mb-2">
//                     Click to upload photos
//                   </span>
//                   <span className="text-sm text-gray-500">
//                     or drag and drop (Max 10 photos)
//                   </span>
//                 </label>
//               </div>

//               {/* Image Previews */}
//               {imagePreviews.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//                   {imagePreviews.map((preview, index) => (
//                     <div key={index} className="relative group">
//                       <img
//                         src={preview}
//                         alt={`Preview ${index + 1}`}
//                         className="w-full h-32 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-8 pt-6 border-t">
//             {currentStep > 1 && (
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
//               >
//                 Previous
//               </button>
//             )}
            
//             {currentStep < 4 ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 ml-auto"
//               >
//                 Next Step
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 ml-auto disabled:opacity-50"
//               >
//                 {loading ? 'Listing Property...' : 'List Property'}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }



// 'use client'
// // Path: app/profile/add-property/page.js

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { FaUpload, FaBed, FaBath, FaRulerCombined, FaCheckCircle } from 'react-icons/fa'
// import toast from 'react-hot-toast'

// export default function AddPropertyPage() {
//   const router = useRouter()
//   const [currentStep, setCurrentStep] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     type: 'Flat',
//     category: 'rent',
//     price: '',
//     location: '',
//     city: 'west_delhi',
//     landmark: '',
//     bedrooms: '',
//     bathrooms: '',
//     areaSqft: '',
//     furnishing: 'semi',
//     amenities: {
//       parking: false, wifi: false, ac: false, security: false,
//       powerBackup: false, lift: false, garden: false, gym: false
//     },
//     images: []
//   })
//   const [imagePreviews, setImagePreviews] = useState([])

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleAmenityChange = (amenity) => {
//     setFormData(prev => ({
//       ...prev,
//       amenities: { ...prev.amenities, [amenity]: !prev.amenities[amenity] }
//     }))
//   }

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files)
//     const previews = files.map(f => URL.createObjectURL(f))
//     setImagePreviews(prev => [...prev, ...previews])
//     setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
//   }

//   const removeImage = (index) => {
//     setImagePreviews(prev => prev.filter((_, i) => i !== index))
//     setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       // Build amenities array
//       const amenitiesArr = Object.entries(formData.amenities)
//         .filter(([, val]) => val)
//         .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))

//       // Use Unsplash placeholder images if no images uploaded
//       const imageUrls = imagePreviews.length > 0
//         ? imagePreviews
//         : ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80']

//       const payload = {
//         title: formData.title,
//         description: formData.description,
//         type: formData.type,
//         category: formData.category,
//         price: `₹${Number(formData.price).toLocaleString('en-IN')}/month`,
//         priceValue: Number(formData.price),
//         location: formData.location,
//         address: formData.location,
//         city: formData.city,
//         landmark: formData.landmark,
//         bedrooms: Number(formData.bedrooms) || 0,
//         bathrooms: Number(formData.bathrooms) || 0,
//         areaSqft: Number(formData.areaSqft) || 0,
//         furnishing: formData.furnishing,
//         amenities: amenitiesArr,
//         images: imageUrls,
//         isVerified: false,
//         rating: 0,
//         reviews: 0,
//       }

//       const res = await fetch('/api/properties/add', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       })

//       const data = await res.json()

//       if (data.success) {
//         toast.success('Property listed successfully! It will be verified within 24 hours.')
//         router.push('/profile/my-properties')
//       } else {
//         toast.error(data.error || 'Failed to list property')
//       }
//     } catch (error) {
//       console.error('Add property error:', error)
//       toast.error('Something went wrong. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const nextStep = () => setCurrentStep(prev => prev + 1)
//   const prevStep = () => setCurrentStep(prev => prev - 1)

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20">
//       <div className="container-custom py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Property</h1>
//           <p className="text-gray-600">Fill in the details below to list your property</p>
//         </div>

//         {/* Progress Steps */}
//         <div className="flex justify-between mb-12 max-w-3xl mx-auto">
//           {[1, 2, 3, 4].map((step) => (
//             <div key={step} className="flex items-center flex-1">
//               <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${
//                 currentStep >= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
//               }`}>
//                 {currentStep > step ? <FaCheckCircle /> : step}
//               </div>
//               {step < 4 && (
//                 <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${
//                   currentStep > step ? 'bg-green-600' : 'bg-gray-200'
//                 }`}></div>
//               )}
//             </div>
//           ))}
//         </div>

//         <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

//           {/* Step 1: Basic Info */}
//           {currentStep === 1 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
//                 <input type="text" name="title" value={formData.title} onChange={handleChange} required
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500"
//                   placeholder="e.g., 2 BHK Fully Furnished Flat in Rajouri Garden" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
//                 <textarea name="description" value={formData.description} onChange={handleChange} required rows="5"
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500"
//                   placeholder="Describe your property in detail..." />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
//                   <select name="type" value={formData.type} onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200">
//                     <option value="Flat">Flat/Apartment</option>
//                     <option value="House">Independent House</option>
//                     <option value="Villa">Villa</option>
//                     <option value="PG">PG</option>
//                     <option value="Commercial">Commercial</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//                   <select name="category" value={formData.category} onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200">
//                     <option value="rent">For Rent</option>
//                     <option value="buy">For Sale</option>
//                     <option value="pg">PG</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Price (per month) *</label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-3 text-gray-500">₹</span>
//                   <input type="number" name="price" value={formData.price} onChange={handleChange} required
//                     className="w-full border border-gray-300 rounded-xl pl-10 pr-20 py-3 focus:ring-4 focus:ring-green-200"
//                     placeholder="45000" />
//                   <span className="absolute right-4 top-3 text-gray-500">/month</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Location */}
//           {currentStep === 2 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Details</h2>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
//                 <input type="text" name="location" value={formData.location} onChange={handleChange} required
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200"
//                   placeholder="e.g., B-123, Rajouri Garden, Delhi" />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
//                   <select name="city" value={formData.city} onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200">
//                     <option value="west_delhi">West Delhi</option>
//                     <option value="gurugram">Gurugram</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
//                   <input type="text" name="landmark" value={formData.landmark} onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200"
//                     placeholder="e.g., Near Metro Station" />
//                 </div>
//               </div>
//               <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
//                 <p className="text-gray-500">📍 Map preview — {formData.location || 'Enter address above'}</p>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Property Details */}
//           {currentStep === 3 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
//                   <div className="relative">
//                     <FaBed className="absolute left-4 top-3 text-gray-400" />
//                     <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-green-200" placeholder="2" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
//                   <div className="relative">
//                     <FaBath className="absolute left-4 top-3 text-gray-400" />
//                     <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-green-200" placeholder="2" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq.ft)</label>
//                   <div className="relative">
//                     <FaRulerCombined className="absolute left-4 top-3 text-gray-400" />
//                     <input type="number" name="areaSqft" value={formData.areaSqft} onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-green-200" placeholder="1200" />
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
//                 <select name="furnishing" value={formData.furnishing} onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200">
//                   <option value="fully">Fully Furnished</option>
//                   <option value="semi">Semi Furnished</option>
//                   <option value="unfurnished">Unfurnished</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-4">Amenities</label>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {Object.keys(formData.amenities).map((amenity) => (
//                     <label key={amenity} className="flex items-center gap-2 cursor-pointer">
//                       <input type="checkbox" checked={formData.amenities[amenity]} onChange={() => handleAmenityChange(amenity)}
//                         className="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
//                       <span className="text-gray-700 capitalize">{amenity}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 4: Images */}
//           {currentStep === 4 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Photos</h2>
//               <p className="text-sm text-gray-500">Upload photos of your property. If no photos uploaded, a default image will be used.</p>
//               <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 transition-all duration-300">
//                 <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
//                 <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
//                   <FaUpload className="text-4xl text-gray-400 mb-4" />
//                   <span className="text-lg font-medium text-gray-900 mb-2">Click to upload photos</span>
//                   <span className="text-sm text-gray-500">Max 10 photos recommended</span>
//                 </label>
//               </div>
//               {imagePreviews.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//                   {imagePreviews.map((preview, index) => (
//                     <div key={index} className="relative group">
//                       <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
//                       <button type="button" onClick={() => removeImage(index)}
//                         className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-lg font-bold">
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Summary before submit */}
//               <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
//                 <h3 className="font-semibold text-green-800 mb-2">📋 Property Summary</h3>
//                 <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
//                   <p><strong>Title:</strong> {formData.title || '—'}</p>
//                   <p><strong>Type:</strong> {formData.type}</p>
//                   <p><strong>Price:</strong> ₹{formData.price ? Number(formData.price).toLocaleString('en-IN') : '—'}/mo</p>
//                   <p><strong>Location:</strong> {formData.location || '—'}</p>
//                   <p><strong>Bedrooms:</strong> {formData.bedrooms || '—'}</p>
//                   <p><strong>Category:</strong> {formData.category}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation */}
//           <div className="flex justify-between mt-8 pt-6 border-t">
//             {currentStep > 1 && (
//               <button type="button" onClick={prevStep}
//                 className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition">
//                 ← Previous
//               </button>
//             )}
//             {currentStep < 4 ? (
//               <button type="button" onClick={nextStep}
//                 className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition ml-auto">
//                 Next Step →
//               </button>
//             ) : (
//               <button type="submit" disabled={loading}
//                 className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition ml-auto disabled:opacity-50 flex items-center gap-2">
//                 {loading ? (
//                   <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Listing...</>
//                 ) : '🏠 List Property'}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }





'use client'
// Path: app/profile/add-property/page.js

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaUpload, FaBed, FaBath, FaRulerCombined, FaCheckCircle, FaSpinner } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function AddPropertyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Flat',
    category: 'rent',
    price: '',
    location: '',
    city: 'west_delhi',
    landmark: '',
    bedrooms: '',
    bathrooms: '',
    areaSqft: '',
    furnishing: 'semi',
    amenities: {
      parking: false, wifi: false, ac: false, security: false,
      powerBackup: false, lift: false, garden: false, gym: false
    },
    images: []
  })
  const [imagePreviews, setImagePreviews] = useState([])
  const [uploadedImageUrls, setUploadedImageUrls] = useState([])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: { ...prev.amenities, [amenity]: !prev.amenities[amenity] }
    }))
  }

  // ✅ Upload images to Cloudinary or any service
  const uploadImagesToServer = async (files) => {
    setUploadingImages(true)
    toast.loading('Uploading images...', { id: 'upload' })
    
    try {
      const uploadedUrls = []
      
      for (const file of files) {
        // Create form data for each file
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'metrohome') // Your Cloudinary preset
        
        // Upload to Cloudinary (or your backend)
        const res = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
          method: 'POST',
          body: formData
        })
        
        if (res.ok) {
          const data = await res.json()
          uploadedUrls.push(data.secure_url)
        }
      }
      
      setUploadedImageUrls(prev => [...prev, ...uploadedUrls])
      setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
      
      toast.success(`${uploadedUrls.length} images uploaded successfully!`, { id: 'upload' })
      return uploadedUrls
      
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload images. Please try again.', { id: 'upload' })
      return []
    } finally {
      setUploadingImages(false)
    }
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    
    // Validate file size and type
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/')
      const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB
      if (!isValidType) toast.error(`${file.name} is not an image`)
      if (!isValidSize) toast.error(`${file.name} is too large (max 5MB)`)
      return isValidType && isValidSize
    })
    
    if (validFiles.length === 0) return
    
    // Upload images to server
    await uploadImagesToServer(validFiles)
  }

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
    setUploadedImageUrls(prev => prev.filter((_, i) => i !== index))
    setFormData(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }))
    toast.success('Image removed')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (uploadingImages) {
      toast.error('Please wait for images to finish uploading')
      return
    }
    
    setLoading(true)
    toast.loading('Listing property...', { id: 'submit' })

    try {
      // Build amenities array
      const amenitiesArr = Object.entries(formData.amenities)
        .filter(([, val]) => val)
        .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))

      // Use uploaded image URLs or placeholder
      const imageUrls = uploadedImageUrls.length > 0 
        ? uploadedImageUrls 
        : ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80']

      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        category: formData.category,
        price: `₹${Number(formData.price).toLocaleString('en-IN')}/month`,
        priceValue: Number(formData.price),
        location: formData.location,
        address: formData.location,
        city: formData.city,
        landmark: formData.landmark,
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        areaSqft: Number(formData.areaSqft) || 0,
        furnishing: formData.furnishing,
        amenities: amenitiesArr,
        images: imageUrls,
        isVerified: false,
        rating: 0,
        reviews: 0,
        createdAt: new Date()
      }

      const res = await fetch('/api/properties/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Property listed successfully! It will be verified within 24 hours.', { id: 'submit' })
        setTimeout(() => router.push('/profile/my-properties'), 1500)
      } else {
        toast.error(data.error || 'Failed to list property', { id: 'submit' })
      }
    } catch (error) {
      console.error('Add property error:', error)
      toast.error('Something went wrong. Please try again.', { id: 'submit' })
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Property</h1>
          <p className="text-gray-600">Fill in the details below to list your property</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12 max-w-3xl mx-auto">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${
                currentStep >= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step ? <FaCheckCircle /> : step}
              </div>
              {step < 4 && (
                <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                  currentStep > step ? 'bg-green-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500"
                  placeholder="e.g., 2 BHK Fully Furnished Flat in Rajouri Garden" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows="5"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500"
                  placeholder="Describe your property in detail..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                  <select name="type" value={formData.type} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200">
                    <option value="Flat">Flat/Apartment</option>
                    <option value="House">Independent House</option>
                    <option value="Villa">Villa</option>
                    <option value="PG">PG</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200">
                    <option value="rent">For Rent</option>
                    <option value="buy">For Sale</option>
                    <option value="pg">PG</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (per month) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">₹</span>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-20 py-3 focus:ring-4 focus:ring-green-200"
                    placeholder="45000" />
                  <span className="absolute right-4 top-3 text-gray-500">/month</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200"
                  placeholder="e.g., B-123, Rajouri Garden, Delhi" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <select name="city" value={formData.city} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200">
                    <option value="west_delhi">West Delhi</option>
                    <option value="gurugram">Gurugram</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
                  <input type="text" name="landmark" value={formData.landmark} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200"
                    placeholder="e.g., Near Metro Station" />
                </div>
              </div>
              <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
                <p className="text-gray-500">📍 Map preview — {formData.location || 'Enter address above'}</p>
              </div>
            </div>
          )}

          {/* Step 3: Property Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <div className="relative">
                    <FaBed className="absolute left-4 top-3 text-gray-400" />
                    <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-green-200" placeholder="2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <div className="relative">
                    <FaBath className="absolute left-4 top-3 text-gray-400" />
                    <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-green-200" placeholder="2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq.ft)</label>
                  <div className="relative">
                    <FaRulerCombined className="absolute left-4 top-3 text-gray-400" />
                    <input type="number" name="areaSqft" value={formData.areaSqft} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-green-200" placeholder="1200" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
                <select name="furnishing" value={formData.furnishing} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200">
                  <option value="fully">Fully Furnished</option>
                  <option value="semi">Semi Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.keys(formData.amenities).map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData.amenities[amenity]} onChange={() => handleAmenityChange(amenity)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
                      <span className="text-gray-700 capitalize">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Images */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Photos</h2>
              <p className="text-sm text-gray-500">Upload photos of your property. If no photos uploaded, a default image will be used.</p>
              
              <div className={`border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 transition-all duration-300 ${uploadingImages ? 'opacity-50 pointer-events-none' : ''}`}>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" disabled={uploadingImages} />
                <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
                  {uploadingImages ? (
                    <>
                      <FaSpinner className="text-4xl text-green-600 animate-spin mb-4" />
                      <span className="text-lg font-medium text-gray-900 mb-2">Uploading images...</span>
                      <span className="text-sm text-gray-500">Please wait</span>
                    </>
                  ) : (
                    <>
                      <FaUpload className="text-4xl text-gray-400 mb-4" />
                      <span className="text-lg font-medium text-gray-900 mb-2">Click to upload photos</span>
                      <span className="text-sm text-gray-500">Max 10 photos (5MB each)</span>
                    </>
                  )}
                </label>
              </div>
              
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                      <button type="button" onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-lg font-bold hover:bg-red-600">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Status */}
              {uploadedImageUrls.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="text-sm text-green-700">✅ {uploadedImageUrls.length} image(s) uploaded successfully</p>
                </div>
              )}

              {/* Summary before submit */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
                <h3 className="font-semibold text-green-800 mb-2">📋 Property Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
                  <p><strong>Title:</strong> {formData.title || '—'}</p>
                  <p><strong>Type:</strong> {formData.type}</p>
                  <p><strong>Price:</strong> ₹{formData.price ? Number(formData.price).toLocaleString('en-IN') : '—'}/mo</p>
                  <p><strong>Location:</strong> {formData.location || '—'}</p>
                  <p><strong>Bedrooms:</strong> {formData.bedrooms || '—'}</p>
                  <p><strong>Category:</strong> {formData.category}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition">
                ← Previous
              </button>
            )}
            {currentStep < 4 ? (
              <button type="button" onClick={nextStep}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition ml-auto">
                Next Step →
              </button>
            ) : (
              <button type="submit" disabled={loading || uploadingImages}
                className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition ml-auto disabled:opacity-50 flex items-center gap-2">
                {loading ? (
                  <><FaSpinner className="animate-spin" /> Listing...</>
                ) : uploadingImages ? (
                  <><FaSpinner className="animate-spin" /> Uploading...</>
                ) : (
                  '🏠 List Property'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}