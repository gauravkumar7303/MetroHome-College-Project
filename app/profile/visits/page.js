'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function MyVisitsPage() {
  const [visits, setVisits] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchVisits()
  }, [filter])

  const fetchVisits = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('metrohome_token')
      const query = filter !== 'all' ? `?status=${filter}` : ''
      
      const res = await fetch(`/api/visits/schedule${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setVisits(data.visits || [])
      } else {
        toast.error(data.error || 'Failed to fetch visits')
      }
    } catch (error) {
      console.error('Error fetching visits:', error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"><FaCheckCircle /> Confirmed</span>
      case 'completed':
        return <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"><FaCheckCircle /> Completed</span>
      case 'cancelled':
        return <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"><FaTimesCircle /> Cancelled</span>
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{status}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Property Visits</h1>
        <p className="text-gray-600 mb-8">Track all your scheduled property visits</p>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm inline-block">
          {['all', 'upcoming', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium capitalize transition-all ${
                filter === status ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status === 'upcoming' ? 'Upcoming' : status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-3xl text-green-600" />
          </div>
        ) : visits.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <FaCalendar className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No visits scheduled</h3>
            <p className="text-gray-600 mb-6">Start exploring properties to schedule visits</p>
            <Link href="/properties" className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700">
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {visits.map((visit) => (
              <div key={visit.id} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{visit.propertyTitle}</h3>
                        <p className="flex items-center text-gray-600 mb-2">
                          <FaMapMarkerAlt className="mr-2 text-green-500" />
                          {visit.propertyLocation}
                        </p>
                      </div>
                      {getStatusBadge(visit.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-500">Visit Date</p>
                        <p className="font-semibold flex items-center gap-1">
                          <FaCalendar className="text-green-500" />
                          {new Date(visit.preferredDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-semibold flex items-center gap-1">
                          <FaClock className="text-green-500" />
                          {visit.preferredTime}
                        </p>
                      </div>
                    </div>
                    
                    {/* Agent Info */}
                    {visit.assignedAgent && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-900 mb-2">MetroHome Representative</p>
                        <div className="flex flex-wrap gap-4">
                          <p className="flex items-center gap-1 text-sm">
                            <FaUser className="text-green-500" /> {visit.assignedAgent.name}
                          </p>
                          <p className="flex items-center gap-1 text-sm">
                            <FaPhone className="text-green-500" /> {visit.assignedAgent.phone}
                          </p>
                          <p className="flex items-center gap-1 text-sm">
                            <FaEnvelope className="text-green-500" /> {visit.assignedAgent.email}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/visit/pass/${visit.id}`}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                    >
                      Download Pass
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