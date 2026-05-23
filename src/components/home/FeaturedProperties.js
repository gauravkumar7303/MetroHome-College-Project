// src/components/home/FeaturedProperties.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PropertyCard from '@/src/components/property/PropertyCard'
import LoadingSpinner from '@/src/components/ui/LoadingSpinner'

// ⚠️ IMPORTANT: Yeh DEFAULT export hona chahiye
export default function FeaturedProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProperties()
  }, [])

  const fetchFeaturedProperties = async () => {
    try {
      // Mock data for now - baad mein API se lega
      const mockProperties = [
        {
          id: '1',
          title: '2 BHK Fully Furnished Flat in Rajouri Garden',
          description: 'Beautiful flat with modern amenities',
          type: 'flat',
          category: 'rent',
          price: 25000,
          location: 'Rajouri Garden',
          city: 'west_delhi',
          bedrooms: 2,
          bathrooms: 2,
          areaSqft: 1200,
          furnishing: 'fully',
          amenities: ['parking', 'wifi', 'ac'],
          images: ['/images/property1.jpg'],
          isVerified: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'PG Accommodation for Boys in Sector 14',
          description: 'Clean and safe PG with food included',
          type: 'pg',
          category: 'rent',
          price: 8500,
          location: 'Sector 14',
          city: 'gurugram',
          bedrooms: 1,
          bathrooms: 1,
          furnishing: 'semi',
          amenities: ['wifi', 'food'],
          images: ['/images/property2.jpg'],
          isVerified: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: '3 BHK Independent House in Dwarka',
          description: 'Spacious house with garden',
          type: 'house',
          category: 'rent',
          price: 45000,
          location: 'Dwarka',
          city: 'west_delhi',
          bedrooms: 3,
          bathrooms: 3,
          areaSqft: 2000,
          furnishing: 'fully',
          amenities: ['parking', 'wifi', 'ac', 'garden'],
          images: ['/images/property3.jpg'],
          isVerified: false,
          createdAt: new Date().toISOString()
        }
      ]
      
      setProperties(mockProperties.slice(0, 3)) // Show only 3 featured properties
    } catch (error) {
      console.error('Error fetching featured properties:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
        <Link href="/properties" className="text-blue-600 hover:text-blue-500">
          View All →
        </Link>
      </div>

      {properties.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No featured properties available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}