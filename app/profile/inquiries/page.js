'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaSpinner, FaEye, FaClock } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function MyInquiriesPage() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchInquiries()
  }, [filter])

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('metrohome_token')
      const query = filter !== 'all' ? `?status=${filter}` : ''
      
      const res = await fetch(`/api/inquiries${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setInquiries(data.inquiries || [])
      } else {
        toast.error(data.error || 'Failed to fetch inquiries')
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'new': 'bg-yellow-100 text-yellow-700',
      'contacted': 'bg-blue-100 text-blue-700',
      'viewed': 'bg-purple-100 text-purple-700',
      'negotiation': 'bg-orange-100 text-orange-700',
      'converted': 'bg-green-100 text-green-700',
      'lost': 'bg-red-100 text-red-700'
    }
    return statusMap[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Inquiries</h1>
        <p className="text-gray-600 mb-8">Track all your property inquiries</p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm inline-block">
          {['all', 'new', 'contacted', 'negotiation', 'converted', 'lost'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium capitalize transition-all ${
                filter === status ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-3xl text-green-600" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No inquiries yet</h3>
            <p className="text-gray-600 mb-6">Start exploring properties and send inquiries</p>
            <Link href="/properties" className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700">
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{inquiry.propertyTitle}</h3>
                        <p className="flex items-center text-gray-600">
                          <FaMapMarkerAlt className="mr-2 text-green-500" />
                          {inquiry.propertyLocation}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(inquiry.status)}`}>
                        {inquiry.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-900 mb-2">Your Message:</p>
                      <p className="text-gray-600">{inquiry.message}</p>
                    </div>
                    
                    {inquiry.ownerName && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="font-semibold text-gray-900 mb-2">Property Owner</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <p><strong>Name:</strong> {inquiry.ownerName}</p>
                          {inquiry.ownerEmail && <p><strong>Email:</strong> {inquiry.ownerEmail}</p>}
                          {inquiry.ownerPhone && <p><strong>Phone:</strong> {inquiry.ownerPhone}</p>}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaClock /> {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                      {inquiry.status === 'converted' && (
                        <span className="flex items-center gap-1 text-green-600">
                          <FaCheckCircle /> Converted to Deal
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/properties/${inquiry.propertyId}`}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 flex items-center gap-1"
                    >
                      <FaEye /> View Property
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}