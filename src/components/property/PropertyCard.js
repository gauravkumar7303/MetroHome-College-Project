// src/components/property/PropertyCard.js
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa'
import PropertyVerificationBadge from './PropertyVerificationBadge'

// ⚠️ IMPORTANT: DEFAULT export
export default function PropertyCard({ property }) {
  // Agar property nahi hai toh kuch mat dikhao
  if (!property) return null

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="property-card group">
        
        {/* Property Image */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          {property.images?.[0] ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-110 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          
          {/* Property Type Badge */}
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs uppercase">
            {property.type}
          </div>
          
          {/* Verification Badge */}
          {property.isVerified && (
            <div className="absolute top-2 right-2">
              <PropertyVerificationBadge />
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {property.title}
          </h3>
          
          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-1 text-gray-400" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Price */}
          <div className="text-xl font-bold text-blue-600 mb-3">
            ₹{property.price?.toLocaleString() || '0'}
            <span className="text-sm font-normal text-gray-600 ml-1">
              {property.category === 'rent' ? '/month' : ''}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
            {property.bedrooms && (
              <div className="flex items-center">
                <FaBed className="mr-1" />
                <span>{property.bedrooms} BHK</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <FaBath className="mr-1" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.areaSqft && (
              <div className="flex items-center">
                <FaRulerCombined className="mr-1" />
                <span>{property.areaSqft} sq.ft</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}