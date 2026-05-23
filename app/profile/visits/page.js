// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { FaCalendar, FaClock, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa'
// import toast from 'react-hot-toast'

// export default function MyVisitsPage() {
//   const [visits, setVisits] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filter, setFilter] = useState('all')

//   useEffect(() => {
//     fetchVisits()
//   }, [filter])

//   const fetchVisits = async () => {
//     setLoading(true)
//     try {
//       const token = localStorage.getItem('metrohome_token')
//       const query = filter !== 'all' ? `?status=${filter}` : ''
      
//       const res = await fetch(`/api/visits/schedule${query}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })
      
//       const data = await res.json()
      
//       if (res.ok) {
//         setVisits(data.visits || [])
//       } else {
//         toast.error(data.error || 'Failed to fetch visits')
//       }
//     } catch (error) {
//       console.error('Error fetching visits:', error)
//       toast.error('Something went wrong')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getStatusBadge = (status) => {
//     switch(status) {
//       case 'confirmed':
//         return <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"><FaCheckCircle /> Confirmed</span>
//       case 'completed':
//         return <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"><FaCheckCircle /> Completed</span>
//       case 'cancelled':
//         return <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"><FaTimesCircle /> Cancelled</span>
//       default:
//         return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{status}</span>
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20">
//       <div className="container-custom py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">My Property Visits</h1>
//         <p className="text-gray-600 mb-8">Track all your scheduled property visits</p>

//         {/* Filter Tabs */}
//         <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm inline-block">
//           {['all', 'upcoming', 'completed', 'cancelled'].map((status) => (
//             <button
//               key={status}
//               onClick={() => setFilter(status)}
//               className={`px-6 py-2 rounded-lg font-medium capitalize transition-all ${
//                 filter === status ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               {status === 'upcoming' ? 'Upcoming' : status}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <FaSpinner className="animate-spin text-3xl text-green-600" />
//           </div>
//         ) : visits.length === 0 ? (
//           <div className="bg-white rounded-2xl p-12 text-center">
//             <FaCalendar className="text-6xl text-gray-300 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">No visits scheduled</h3>
//             <p className="text-gray-600 mb-6">Start exploring properties to schedule visits</p>
//             <Link href="/properties" className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700">
//               Browse Properties
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {visits.map((visit) => (
//               <div key={visit.id} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
//                 <div className="flex flex-col md:flex-row justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900 mb-2">{visit.propertyTitle}</h3>
//                         <p className="flex items-center text-gray-600 mb-2">
//                           <FaMapMarkerAlt className="mr-2 text-green-500" />
//                           {visit.propertyLocation}
//                         </p>
//                       </div>
//                       {getStatusBadge(visit.status)}
//                     </div>
                    
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
//                       <div>
//                         <p className="text-sm text-gray-500">Visit Date</p>
//                         <p className="font-semibold flex items-center gap-1">
//                           <FaCalendar className="text-green-500" />
//                           {new Date(visit.preferredDate).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Time</p>
//                         <p className="font-semibold flex items-center gap-1">
//                           <FaClock className="text-green-500" />
//                           {visit.preferredTime}
//                         </p>
//                       </div>
//                     </div>
                    
//                     {/* Agent Info */}
//                     {visit.assignedAgent && (
//                       <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                         <p className="font-semibold text-gray-900 mb-2">MetroHome Representative</p>
//                         <div className="flex flex-wrap gap-4">
//                           <p className="flex items-center gap-1 text-sm">
//                             <FaUser className="text-green-500" /> {visit.assignedAgent.name}
//                           </p>
//                           <p className="flex items-center gap-1 text-sm">
//                             <FaPhone className="text-green-500" /> {visit.assignedAgent.phone}
//                           </p>
//                           <p className="flex items-center gap-1 text-sm">
//                             <FaEnvelope className="text-green-500" /> {visit.assignedAgent.email}
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="flex gap-2">
//                     <Link
//                       href={`/visit/pass/${visit.id}`}
//                       className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
//                     >
//                       Download Pass
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'
// Path: app/profile/visits/page.js

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaCheckCircle, FaTimesCircle, FaSpinner, FaArrowRight } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function MyVisitsPage() {
  const [visits, setVisits] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [converting, setConverting] = useState(null) // visitId being converted

  useEffect(() => {
    fetchVisits()
  }, [filter])

  const fetchVisits = async () => {
    setLoading(true)
    try {
      // Cookie-based auth — no Authorization header needed
      const query = filter !== 'all' ? `?status=${filter}` : ''
      const res = await fetch(`/api/visits/schedule${query}`)
      const data = await res.json()

      if (data.success) {
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

  const handleConvertToInquiry = async (visit) => {
    setConverting(visit.id)
    try {
      const res = await fetch('/api/inquiries/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitId: visit.id,
          propertyId: visit.propertyId,
          propertyTitle: visit.propertyTitle,
          propertyLocation: visit.propertyLocation,
          propertyImage: visit.propertyImage,
          message: `Interested in visiting on ${new Date(visit.preferredDate).toLocaleDateString()} at ${visit.preferredTime}. Converting from scheduled visit.`,
        })
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Converted to inquiry successfully!')
        // Refresh visits
        fetchVisits()
      } else {
        toast.error(data.error || 'Failed to convert')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setConverting(null)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"><FaCheckCircle /> Confirmed</span>
      case 'completed':
        return <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"><FaCheckCircle /> Completed</span>
      case 'cancelled':
        return <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"><FaTimesCircle /> Cancelled</span>
      case 'converted':
        return <span className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"><FaArrowRight /> Converted</span>
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{status}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-900">My Property Visits</h1>
          <Link href="/properties" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
            + Schedule New Visit
          </Link>
        </div>
        <p className="text-gray-600 mb-8">Track all your scheduled property visits</p>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm w-fit">
          {['all', 'upcoming', 'completed', 'cancelled'].map((status) => (
            <button key={status} onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium capitalize transition-all ${
                filter === status ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}>
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-3xl text-green-600" />
          </div>
        ) : visits.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow">
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
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{visit.propertyTitle}</h3>
                        <p className="flex items-center text-gray-600 mt-1">
                          <FaMapMarkerAlt className="mr-2 text-green-500" />
                          {visit.propertyLocation}
                        </p>
                      </div>
                      {getStatusBadge(visit.status)}
                    </div>

                    {/* Visit Info */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Visit Date</p>
                        <p className="font-semibold flex items-center gap-1 text-sm">
                          <FaCalendar className="text-green-500" />
                          {new Date(visit.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Time</p>
                        <p className="font-semibold flex items-center gap-1 text-sm">
                          <FaClock className="text-green-500" />
                          {visit.preferredTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Scheduled On</p>
                        <p className="font-semibold text-sm text-gray-700">
                          {new Date(visit.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Agent Info */}
                    {visit.assignedAgent && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="font-semibold text-blue-900 mb-2 text-sm">👤 MetroHome Representative</p>
                        <div className="flex flex-wrap gap-4">
                          <p className="flex items-center gap-1 text-sm text-blue-800">
                            <FaUser className="text-blue-500" /> {visit.assignedAgent.name}
                          </p>
                          <p className="flex items-center gap-1 text-sm text-blue-800">
                            <FaPhone className="text-blue-500" /> {visit.assignedAgent.phone}
                          </p>
                          <p className="flex items-center gap-1 text-sm text-blue-800">
                            <FaEnvelope className="text-blue-500" /> {visit.assignedAgent.email}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 min-w-[160px]">
                    {/* Convert to Inquiry — only for confirmed visits */}
                    {visit.status === 'confirmed' && (
                      <button
                        onClick={() => handleConvertToInquiry(visit)}
                        disabled={converting === visit.id}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
                      >
                        {converting === visit.id ? (
                          <><FaSpinner className="animate-spin" /> Converting...</>
                        ) : (
                          <><FaArrowRight /> Convert to Inquiry</>
                        )}
                      </button>
                    )}
                    <Link href={`/properties/${visit.propertyId}`}
                      className="px-4 py-2 border border-green-500 text-green-600 rounded-lg text-sm hover:bg-green-50 text-center font-medium">
                      View Property
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