// import Link from 'next/link'
// import { FaStar, FaArrowRight } from 'react-icons/fa'

// export default function HomePage() {
//   // Recent properties data
//   const recentProperties = [
//     {
//       id: 1,
//       title: 'Moldova Borsașu',
//       location: 'Rajouri Garden, West Delhi',
//       price: '₹45,000/month',
//       image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       beds: 2,
//       baths: 1,
//       area: 100,
//       type: 'Apartment',
//       rating: 4.5,
//       reviews: 128
//     },
//     {
//       id: 2,
//       title: 'Living Family Home',
//       location: 'Sector 14, Gurugram',
//       price: '₹65,000/month',
//       image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       beds: 3,
//       baths: 2,
//       area: 200,
//       type: 'Villa',
//       rating: 4.8,
//       reviews: 256
//     },
//     {
//       id: 3,
//       title: 'Marina Villa Chiappini',
//       location: 'Dwarka, West Delhi',
//       price: '₹85,000/month',
//       image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       beds: 4,
//       baths: 3,
//       area: 300,
//       type: 'Luxury Villa',
//       rating: 4.9,
//       reviews: 342
//     }
//   ]

//   // Popular places with images
//   const popularPlaces = [
//     { name: 'Rajouri Garden', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '245 properties' },
//     { name: 'Dwarka', image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '189 properties' },
//     { name: 'Gurugram', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '312 properties' }
//   ]

//   // Services with icons
//   const services = [
//     { name: 'Selling and buying properties', icon: '🏠', description: 'Expert guidance for your property transactions' },
//     { name: 'Real estate agency', icon: '🏢', description: 'Professional real estate services' },
//     { name: 'Property management', icon: '🔑', description: 'Complete property care and maintenance' },
//     { name: 'Mortgage brokerage', icon: '💰', description: 'Best loan options from top banks' },
//     { name: 'Valuation services', icon: '📊', description: 'Accurate property valuation' },
//     { name: 'Legal services', icon: '⚖️', description: 'Legal assistance for property deals' }
//   ]

//   // Agents with detailed info
//   const agents = [
//     {
//       name: 'Maria Rodriguez',
//       role: 'Senior Property Consultant',
//       experience: '8+ years',
//       properties: '156 sold',
//       image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       rating: 4.9,
//       specialty: 'Luxury Properties'
//     },
//     {
//       name: 'Ionela Popescu',
//       role: 'Real Estate Expert',
//       experience: '6+ years',
//       properties: '98 sold',
//       image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       rating: 4.8,
//       specialty: 'Commercial Properties'
//     },
//     {
//       name: 'Daniela Marinescu',
//       role: 'Property Advisor',
//       experience: '5+ years',
//       properties: '87 sold',
//       image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       rating: 4.7,
//       specialty: 'Residential Properties'
//     }
//   ]

//   return (
//     <div>
//       {/* HERO SECTION */}
//       <div 
//         className="relative min-h-screen flex items-center justify-center text-white"
//         style={{
//           backgroundImage: 'url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black/50"></div>
        
//         <div className="container-custom relative z-10 text-center">
//           <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">HOME</h1>
//           <p className="text-2xl md:text-3xl mb-4 max-w-3xl mx-auto">Find your perfect property for your home.</p>
//           <p className="text-xl md:text-2xl font-bold text-green-400">Buy or sell your house in few seconds with MetroHome</p>
          
//           {/* Search Bar */}
//           <div className="mt-12 max-w-2xl mx-auto">
//             <div className="flex bg-white rounded-lg overflow-hidden shadow-2xl">
//               <input
//                 type="text"
//                 placeholder="Search by location, property type..."
//                 className="flex-1 px-6 py-4 text-gray-900 focus:outline-none"
//               />
//               <button className="bg-green-500 text-white px-8 py-4 font-semibold hover:bg-green-600 transition">
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RECENT PROPERTIES SECTION */}
//       <div className="container-custom py-20">
//         <div className="flex justify-between items-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900">RECENT PROPERTIES</h2>
//           <Link href="/properties" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
//             View All <FaArrowRight />
//           </Link>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {recentProperties.map((property) => (
//             <Link key={property.id} href={`/properties/${property.id}`} className="property-card group">
//               <div className="relative h-64 overflow-hidden">
//                 <img
//                   src={property.image}
//                   alt={property.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                 />
//                 <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                   {property.type}
//                 </div>
//                 <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
//                   <FaStar className="text-yellow-400" />
//                   {property.rating}
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
//                 <p className="text-gray-600 mb-4">{property.location}</p>
//                 <p className="text-2xl font-bold text-green-600">{property.price}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* MOST POPULAR PLACES */}
//       <div className="bg-gray-50 py-20">
//         <div className="container-custom">
//           <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">MOST POPULAR PLACES</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {popularPlaces.map((place, index) => (
//               <Link
//                 key={index}
//                 href={`/properties?location=${encodeURIComponent(place.name)}`}
//                 className="group relative h-80 rounded-2xl overflow-hidden"
//               >
//                 <img
//                   src={place.image}
//                   alt={place.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                   <h3 className="text-2xl font-bold mb-2">{place.name}</h3>
//                   <p className="text-green-400 font-semibold">{place.count}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* OUR SERVICES */}
//       <div className="container-custom py-20">
//         <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">OUR SERVICES</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition group">
//               <div className="text-4xl mb-4 group-hover:scale-110 transition">{service.icon}</div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
//               <p className="text-gray-600">{service.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* MEET OUR AGENTS */}
//       <div className="bg-gray-50 py-20">
//         <div className="container-custom">
//           <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">MEET OUR AGENTS</h2>
//           <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Our experienced team is here to help you find your dream property</p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             {agents.map((agent, index) => (
//               <div key={index} className="agent-card group">
//                 <div className="relative mb-6">
//                   <img
//                     src={agent.image}
//                     alt={agent.name}
//                     className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-500 group-hover:scale-110 transition duration-300"
//                   />
//                 </div>
                
//                 <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
//                 <p className="text-green-600 font-semibold mb-2">{agent.role}</p>
//                 <p className="text-sm text-gray-500 mb-1">{agent.experience} experience</p>
//                 <p className="text-sm text-gray-500 mb-3">{agent.properties}</p>
//                 <p className="text-sm text-gray-600 mb-3 bg-gray-100 px-3 py-1 rounded-full inline-block">
//                   {agent.specialty}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* NEWSLETTER SECTION */}
//       <div className="container-custom py-20">
//         <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-16 text-center text-white relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
//           <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
//           <div className="relative z-10">
//             <h2 className="text-4xl font-bold mb-4">OUR NEWSLETTER</h2>
//             <p className="text-xl mb-8 text-green-100">Sign up to get the latest property updates</p>
            
//             <form className="max-w-md mx-auto">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <input
//                   type="email"
//                   placeholder="Enter your email address"
//                   className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-300"
//                 />
//                 <button 
//                   type="submit" 
//                   className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition transform hover:scale-105"
//                 >
//                   Subscribe
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



'use client'
// Path: app/page.js

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaStar, FaArrowRight } from 'react-icons/fa'

export default function HomePage() {
  // Transition text for property types
  const propertyTypes = ['Flats', 'PG', 'Villas', 'Rented Apartments', 'Commercial Spaces']
  const [typeIndex, setTypeIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setTypeIndex(prev => (prev + 1) % propertyTypes.length)
        setFade(true)
      }, 400)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const recentProperties = [
    {
      id: 1,
      title: 'Moldova Borsașu',
      location: 'Rajouri Garden, West Delhi',
      price: '₹45,000/month',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      beds: 2, baths: 1, area: 100, type: 'Apartment', rating: 4.5, reviews: 128
    },
    {
      id: 2,
      title: 'Living Family Home',
      location: 'Sector 14, Gurugram',
      price: '₹65,000/month',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      beds: 3, baths: 2, area: 200, type: 'Villa', rating: 4.8, reviews: 256
    },
    {
      id: 3,
      title: 'Marina Villa Chiappini',
      location: 'Dwarka, West Delhi',
      price: '₹85,000/month',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      beds: 4, baths: 3, area: 300, type: 'Luxury Villa', rating: 4.9, reviews: 342
    }
  ]

  const popularPlaces = [
    { name: 'Rajouri Garden', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '245 properties' },
    { name: 'Dwarka', image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '189 properties' },
    { name: 'Gurugram', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '312 properties' }
  ]

  const services = [
    { name: 'Buy Properties', icon: '🏠', description: 'Find flats, villas and homes to buy across the city' },
    { name: 'Rent & PG', icon: '🔑', description: 'Affordable rentals and PG accommodations near metro' },
    { name: 'Real Estate Agency', icon: '🏢', description: 'Professional real estate services for all needs' },
    { name: 'Property Management', icon: '📋', description: 'Complete property care and maintenance solutions' },
    { name: 'Valuation Services', icon: '📊', description: 'Accurate property valuation by experts' },
    { name: 'Legal Services', icon: '⚖️', description: 'Legal assistance for all property deals' }
  ]

  const agents = [
    {
      name: 'Maria Rodriguez', role: 'Senior Property Consultant', experience: '8+ years',
      properties: '156 sold', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9, specialty: 'Luxury Properties'
    },
    {
      name: 'Ionela Popescu', role: 'Real Estate Expert', experience: '6+ years',
      properties: '98 sold', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8, specialty: 'Commercial Properties'
    },
    {
      name: 'Daniela Marinescu', role: 'Property Advisor', experience: '5+ years',
      properties: '87 sold', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7, specialty: 'Residential Properties'
    }
  ]

  return (
    <div>
      {/* HERO SECTION */}
      <div
        className="relative min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/55"></div>

        <div className="container-custom relative z-10 text-center px-4">

          {/* Tagline */}
          <p className="text-green-400 text-sm md:text-base font-semibold tracking-widest uppercase mb-4">
            🏙️ Delhi NCR's Most Trusted Property Platform
          </p>

          {/* Main heading */}
          <h1 className="text-5xl md:text-8xl font-bold mb-4 leading-tight">
            Find Your<br />
            <span className="text-green-400">Dream Home</span>
          </h1>

          {/* Animated property type */}
          <div className="flex items-center justify-center gap-3 mb-4 text-2xl md:text-3xl">
            <span className="text-gray-300">Explore</span>
            <span
              className="text-white font-bold border-b-2 border-green-400 pb-1 min-w-[200px] text-center transition-all duration-400"
              style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity 0.4s, transform 0.4s' }}
            >
              {propertyTypes[typeIndex]}
            </span>
          </div>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Buy, Rent or list your property — fast, easy, and trusted.<br />
            <span className="text-green-400 font-semibold">MetroHome Finder</span> connects you to the right home.
          </p>

          {/* Property type quick filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Buy', 'Rent', 'PG', 'Villa', 'Flat'].map((type) => (
              <Link
                key={type}
                href={`/properties?type=${type.toLowerCase()}`}
                className="px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium hover:bg-green-500 hover:border-green-500 transition-all duration-300"
              >
                {type}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex bg-white rounded-xl overflow-hidden shadow-2xl">
              <input
                type="text"
                placeholder="Search by location, metro station, property type..."
                className="flex-1 px-6 py-4 text-gray-900 focus:outline-none text-sm"
              />
              <button className="bg-green-500 text-white px-8 py-4 font-semibold hover:bg-green-600 transition whitespace-nowrap">
                Search
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-center">
            {[
              { label: 'Properties Listed', value: '10,000+' },
              { label: 'Happy Families', value: '5,000+' },
              { label: 'Cities Covered', value: '15+' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-green-400">{stat.value}</p>
                <p className="text-gray-300 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT PROPERTIES */}
      <div className="container-custom py-20">
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-1">Latest Listings</p>
            <h2 className="text-4xl font-bold text-gray-900">RECENT PROPERTIES</h2>
          </div>
          <Link href="/properties" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
            View All <FaArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentProperties.map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`} className="property-card group">
              <div className="relative h-64 overflow-hidden">
                <img src={property.image} alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {property.type}
                </div>
                <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                  <FaStar className="text-yellow-400" /> {property.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <p className="text-2xl font-bold text-green-600">{property.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* MOST POPULAR PLACES */}
      <div className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-1">Top Locations</p>
            <h2 className="text-4xl font-bold text-gray-900">MOST POPULAR PLACES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularPlaces.map((place, index) => (
              <Link key={index} href={`/properties?location=${encodeURIComponent(place.name)}`}
                className="group relative h-80 rounded-2xl overflow-hidden">
                <img src={place.image} alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{place.name}</h3>
                  <p className="text-green-400 font-semibold">{place.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* OUR SERVICES */}
      <div className="container-custom py-20">
        <div className="text-center mb-12">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-1">What We Offer</p>
          <h2 className="text-4xl font-bold text-gray-900">OUR SERVICES</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition group hover:-translate-y-1">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MEET OUR AGENTS */}
      <div className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-1">Our Team</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">MEET OUR AGENTS</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our experienced team is here to help you find your dream property</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {agents.map((agent, index) => (
              <div key={index} className="agent-card group">
                <div className="relative mb-6">
                  <img src={agent.image} alt={agent.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-500 group-hover:scale-110 transition duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                <p className="text-green-600 font-semibold mb-2">{agent.role}</p>
                <p className="text-sm text-gray-500 mb-1">{agent.experience} experience</p>
                <p className="text-sm text-gray-500 mb-3">{agent.properties}</p>
                <p className="text-sm text-gray-600 mb-3 bg-gray-100 px-3 py-1 rounded-full inline-block">{agent.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="container-custom py-20">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">OUR NEWSLETTER</h2>
            <p className="text-xl mb-8 text-green-100">Sign up to get the latest property updates</p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="email" placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-300" />
                <button type="submit"
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}