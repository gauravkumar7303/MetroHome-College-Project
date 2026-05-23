
//app/properties/page.js - Main properties listing page with search, filters, and scheduling visit functionality
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