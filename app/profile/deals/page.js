// app/profile/deals/page.js - Deals page with documents and send email button
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FaFileContract, FaHome, FaCalendarAlt, FaRupeeSign,
  FaDownload, FaEnvelope, FaSpinner, FaCheckCircle,
  FaArrowLeft, FaFilePdf, FaUser, FaClock
} from 'react-icons/fa'
import { isAuthenticated } from '@/src/utils/auth'
import toast from 'react-hot-toast'

const STATUS_COLORS = {
  negotiation: 'bg-yellow-100 text-yellow-700',
  agreement_draft: 'bg-blue-100 text-blue-700',
  agreement_signed: 'bg-purple-100 text-purple-700',
  active: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-700',
  terminated: 'bg-red-100 text-red-700',
}

const STATUS_LABELS = {
  negotiation: 'Negotiation',
  agreement_draft: 'Agreement Draft',
  agreement_signed: 'Agreement Signed',
  active: 'Active',
  completed: 'Completed',
  terminated: 'Terminated',
}

const DOC_ICONS = {
  agreement: '📄',
  stamp_paper: '🔏',
  id_proof: '🪪',
  'e-sign': '✍️',
}

export default function DealsPage() {
  const router = useRouter()
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [sendingEmail, setSendingEmail] = useState(null) // dealId being emailed
  const [expandedDeal, setExpandedDeal] = useState(null) // dealId with docs open

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      const res = await fetch('/api/deals', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('metrohome_token')}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setDeals(data.deals || [])
      } else {
        toast.error('Failed to load deals')
      }
    } catch (err) {
      toast.error('Error loading deals')
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmail = async (dealId) => {
    setSendingEmail(dealId)
    try {
      const res = await fetch('/api/deals/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('metrohome_token')}`
        },
        body: JSON.stringify({ dealId })
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message || 'Documents sent to your email!')
      } else {
        toast.error(data.error || 'Failed to send email')
      }
    } catch (err) {
      toast.error('Error sending email')
    } finally {
      setSendingEmail(null)
    }
  }

  const handleDownloadDoc = (doc) => {
    const blob = new Blob([doc.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = doc.name || 'document.txt'
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`${doc.name} downloaded!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your deals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8 max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/profile" className="text-gray-500 hover:text-gray-700">
            <FaArrowLeft className="text-xl" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FaFileContract className="text-green-600" />
              My Deals
            </h1>
            <p className="text-gray-500 mt-1">{deals.length} deal{deals.length !== 1 ? 's' : ''} found</p>
          </div>
        </div>

        {/* No Deals */}
        {deals.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-16 text-center">
            <FaFileContract className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No deals yet</h3>
            <p className="text-gray-500 mb-6">Convert an inquiry to deal from the Inquiries page.</p>
            <Link href="/profile/inquiries" className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all">
              Go to Inquiries
            </Link>
          </div>
        )}

        {/* Deals List */}
        <div className="space-y-6">
          {deals.map((deal) => (
            <div key={deal._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              
              {/* Deal Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  
                  <div className="flex gap-4 items-start">
                    {/* Property Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      {deal.propertyId?.images?.[0] ? (
                        <img src={deal.propertyId.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaHome className="text-3xl text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {deal.propertyId?.title || 'Property'}
                      </h2>
                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <FaHome className="text-xs" />
                        {deal.propertyId?.location || '—'}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[deal.status] || 'bg-gray-100 text-gray-600'}`}>
                          {STATUS_LABELS[deal.status] || deal.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 capitalize">
                          {deal.dealType}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">
                          {deal.propertyType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{deal.agreedPrice?.toLocaleString('en-IN')}
                      <span className="text-sm font-normal text-gray-500">/mo</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Deposit: ₹{deal.securityDeposit?.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Deal Meta */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt className="text-green-500" />
                    <div>
                      <div className="text-xs text-gray-400">Start</div>
                      <div className="font-medium">{deal.startDate ? new Date(deal.startDate).toLocaleDateString('en-IN') : '—'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt className="text-red-400" />
                    <div>
                      <div className="text-xs text-gray-400">End</div>
                      <div className="font-medium">{deal.endDate ? new Date(deal.endDate).toLocaleDateString('en-IN') : '—'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaClock className="text-blue-400" />
                    <div>
                      <div className="text-xs text-gray-400">Duration</div>
                      <div className="font-medium">{deal.duration} months</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaUser className="text-purple-400" />
                    <div>
                      <div className="text-xs text-gray-400">Owner</div>
                      <div className="font-medium">{deal.ownerId?.name || 'Owner'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <FaFilePdf className="text-red-500" />
                    Documents ({deal.documents?.length || 0})
                  </h3>
                  <div className="flex gap-2">
                    {/* Toggle docs */}
                    <button
                      onClick={() => setExpandedDeal(expandedDeal === deal._id ? null : deal._id)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-all"
                    >
                      {expandedDeal === deal._id ? 'Hide Docs' : 'View Docs'}
                    </button>

                    {/* Send Email Button */}
                    <button
                      onClick={() => handleSendEmail(deal._id)}
                      disabled={sendingEmail === deal._id}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      {sendingEmail === deal._id ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaEnvelope />
                          Send to Email
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Document Cards - expanded */}
                {expandedDeal === deal._id && deal.documents?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                    {deal.documents.map((doc, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-green-300 transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-2xl">{DOC_ICONS[doc.type] || '📄'}</span>
                          <button
                            onClick={() => handleDownloadDoc(doc)}
                            className="text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50 transition-all"
                            title="Download"
                          >
                            <FaDownload className="text-sm" />
                          </button>
                        </div>
                        <div className="font-medium text-gray-800 text-sm">{doc.name}</div>
                        <div className="text-xs text-gray-500 mt-1 capitalize">{doc.type?.replace('_', ' ')}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {doc.generatedAt ? new Date(doc.generatedAt).toLocaleDateString('en-IN') : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {expandedDeal === deal._id && (!deal.documents || deal.documents.length === 0) && (
                  <p className="text-gray-400 text-sm text-center py-4">No documents generated yet.</p>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}