'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaEdit, FaTrash, FaEye, FaEnvelope, FaCheckCircle, FaTimesCircle, FaPlusCircle } from 'react-icons/fa'

export default function MyPropertiesPage() {
  const [filter, setFilter] = useState('all')

  // Mock properties data
  const properties = [
    {
      id: 1,
      title: '2 BHK Fully Furnished Flat in Rajouri Garden',
      location: 'Rajouri Garden, West Delhi',
      price: '₹45,000/month',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'active',
      verified: true,
      views: 1234,
      inquiries: 23,
      postedDate: '2024-02-15'
    },
    {
      id: 2,
      title: '3 BHK Luxury Villa in Gurugram',
      location: 'Sector 14, Gurugram',
      price: '₹85,000/month',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'pending',
      verified: false,
      views: 567,
      inquiries: 8,
      postedDate: '2024-02-18'
    },
    {
      id: 3,
      title: '4 BHK Independent House in Dwarka',
      location: 'Dwarka, West Delhi',
      price: '₹1,20,000/month',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'active',
      verified: true,
      views: 2341,
      inquiries: 45,
      postedDate: '2024-02-10'
    },
    {
      id: 4,
      title: 'PG Accommodation for Boys',
      location: 'Sector 29, Gurugram',
      price: '₹12,000/month',
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'inactive',
      verified: true,
      views: 456,
      inquiries: 12,
      postedDate: '2024-02-05'
    }
  ]

  const filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(p => p.status === filter)

  const getStatusBadge = (status, verified) => {
    if (status === 'active') {
      return (
        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          <FaCheckCircle /> Active
        </span>
      )
    } else if (status === 'pending') {
      return (
        <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
          <FaTimesCircle /> Pending Verification
        </span>
      )
    } else {
      return (
        <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
          <FaTimesCircle /> Inactive
        </span>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Properties</h1>
            <p className="text-gray-600">Manage your listed properties</p>
          </div>
          
          <Link
            href="/profile/add-property"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            <FaPlusCircle />
            Add New Property
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm inline-block">
          {['all', 'active', 'pending', 'inactive'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium capitalize transition-all duration-300 ${
                filter === status
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Properties List */}
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-64 h-48 relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {property.title}
                    </h3>
                    {getStatusBadge(property.status, property.verified)}
                  </div>

                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <p className="text-2xl font-bold text-green-600 mb-4">{property.price}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-4">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <FaEye className="text-blue-500" />
                      {property.views} views
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <FaEnvelope className="text-purple-500" />
                      {property.inquiries} inquiries
                    </span>
                    <span className="text-sm text-gray-500">
                      Posted on: {new Date(property.postedDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-300">
                      <FaEdit /> Edit
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all duration-300">
                      <FaEye /> View Details
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}