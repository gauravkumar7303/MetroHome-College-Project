// Quick search bar for homepage
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [propertyType, setPropertyType] = useState('all')

  const handleSearch = (e) => {
    e.preventDefault()
    
    const params = new URLSearchParams()
    if (searchTerm) params.append('location', searchTerm)
    if (propertyType !== 'all') params.append('type', propertyType)
    
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter location (e.g., Rajouri Garden, Sector 14)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Property Type Dropdown */}
        <div className="md:w-48">
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="pg">PG</option>
            <option value="flat">Flats</option>
            <option value="house">Houses</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <FaSearch />
          <span>Search</span>
        </button>
      </div>
    </form>
  )
}