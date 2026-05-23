'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaHeart, FaTrash, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'

export default function SavedPropertiesPage() {
  // Mock saved properties
  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      title: '2 BHK Fully Furnished Flat in Rajouri Garden',
      location: 'Rajouri Garden, West Delhi',
      price: '₹45,000/month',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Apartment',
      beds: 2,
      baths: 1,
      area: 100,
      savedDate: '2024-02-18'
    },
    {
      id: 2,
      title: '3 BHK Luxury Villa in Gurugram',
      location: 'Sector 14, Gurugram',
      price: '₹85,000/month',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Villa',
      beds: 3,
      baths: 2,
      area: 200,
      savedDate: '2024-02-17'
    },
    {
      id: 3,
      title: '4 BHK Independent House in Dwarka',
      location: 'Dwarka, West Delhi',
      price: '₹1,20,000/month',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'House',
      beds: 4,
      baths: 3,
      area: 300,
      savedDate: '2024-02-16'
    }
  ])

  const removeSaved = (id) => {
    setSavedProperties(savedProperties.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Properties</h1>
          <p className="text-gray-600">You have {savedProperties.length} saved properties</p>
        </div>

        {/* Saved Properties Grid */}
        {savedProperties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No saved properties yet</h3>
            <p className="text-gray-600 mb-6">Start saving properties you like</p>
            <Link
              href="/properties"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-all duration-300"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <div key={property.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={() => removeSaved(property.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <FaMapMarkerAlt className="mr-2 text-green-500" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
                      <span className="font-bold text-gray-900">{property.beds}</span> Beds
                    </div>
                    <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
                      <span className="font-bold text-gray-900">{property.baths}</span> Baths
                    </div>
                    <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg">
                      <span className="font-bold text-gray-900">{property.area}</span> m²
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-green-600">{property.price}</p>
                    <Link
                      href={`/properties/${property.id}`}
                      className="text-green-600 text-sm font-medium hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    Saved on {new Date(property.savedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}