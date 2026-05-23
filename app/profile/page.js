'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FaUser, FaHome, FaHeart, FaEnvelope, FaCog, 
  FaPlusCircle, FaStar, FaEye, FaPhone, FaMapMarkerAlt,
  FaCalendarAlt, FaCheckCircle, FaSignOutAlt, FaSpinner
} from 'react-icons/fa'
import { getCurrentUser, isAuthenticated, clearAuthData } from '@/src/utils/auth'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    propertiesListed: 0,
    propertiesSold: 0,
    totalViews: 0,
    avgRating: 0
  })
  const [recentProperties, setRecentProperties] = useState([])
  const [recentActivities, setRecentActivities] = useState([])

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if logged in
        if (!isAuthenticated()) {
          router.push('/login')
          return
        }
        
        const currentUser = getCurrentUser()
        setUser(currentUser)
        
        // Fetch user stats from API
        const statsRes = await fetch('/api/user/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('metrohome_token')}`
          }
        })
        
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }
        
        // Fetch recent properties
        const propertiesRes = await fetch('/api/user/recent-properties', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('metrohome_token')}`
          }
        })
        
        if (propertiesRes.ok) {
          const propertiesData = await propertiesRes.json()
          setRecentProperties(propertiesData.properties || [])
        }
        
      } catch (error) {
        console.error('Error fetching user data:', error)
        toast.error('Failed to load profile data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchUserData()
  }, [router])

  const handleLogout = () => {
    clearAuthData()
    toast.success('Logged out successfully')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Mock fallback data if API not ready
  const displayStats = stats.propertiesListed > 0 ? stats : {
    propertiesListed: 0,
    propertiesSold: 0,
    totalViews: 0,
    avgRating: 0
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaUser, href: '/profile' },
    { id: 'my-properties', label: 'My Properties', icon: FaHome, href: '/profile/my-properties' },
    { id: 'saved-properties', label: 'Saved Properties', icon: FaHeart, href: '/profile/saved-properties' },
    { id: 'inquiries', label: 'Inquiries', icon: FaEnvelope, href: '/profile/inquiries' },
    { id: 'settings', label: 'Settings', icon: FaCog, href: '/profile/settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        
        {/* Profile Header */}
        <div className="relative h-64 rounded-3xl overflow-hidden mb-8 group">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'}
            alt="Cover"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-end gap-6 flex-wrap">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl border-4 border-white bg-green-500 flex items-center justify-center text-3xl font-bold">
                  {user.name?.charAt(0) || 'U'}
                </div>
                {user.isVerified && (
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                    <FaCheckCircle className="text-white text-sm" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
                  <span className="flex items-center gap-1">
                    <FaEnvelope /> {user.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaPhone /> {user.phone || 'Not provided'}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> Member since {new Date(user.createdAt || Date.now()).getFullYear()}
                  </span>
                </div>
              </div>

              <Link
                href="/profile/settings"
                className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-24">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-300 ${
                    activeTab === item.id || (item.id === 'dashboard' && !activeTab)
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 mt-4"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <FaHome className="text-3xl text-green-600 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{displayStats.propertiesListed}</div>
                <div className="text-sm text-gray-600">Properties Listed</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <FaHeart className="text-3xl text-red-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{displayStats.propertiesSold || 0}</div>
                <div className="text-sm text-gray-600">Properties Sold</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <FaEye className="text-3xl text-blue-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{displayStats.totalViews.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <FaStar className="text-3xl text-yellow-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{displayStats.avgRating}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/profile/add-property"
                  className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 group"
                >
                  <FaPlusCircle className="text-3xl text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-900">Add Property</span>
                </Link>
                
                <Link
                  href="/profile/my-properties"
                  className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 group"
                >
                  <FaHome className="text-3xl text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-900">My Properties</span>
                </Link>
                
                <Link
                  href="/profile/saved-properties"
                  className="flex flex-col items-center p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300 group"
                >
                  <FaHeart className="text-3xl text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-900">Saved</span>
                </Link>
                
                <Link
                  href="/profile/inquiries"
                  className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-300 group"
                >
                  <FaEnvelope className="text-3xl text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-900">Inquiries</span>
                </Link>
              </div>
            </div>

            {/* Recent Properties */}
            {recentProperties.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Recent Properties</h2>
                  <Link href="/profile/my-properties" className="text-green-600 hover:text-green-700 text-sm font-medium">
                    View All →
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {recentProperties.map((property) => (
                    <div key={property.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300">
                      <img
                        src={property.image || 'https://via.placeholder.com/80'}
                        alt={property.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                        <p className="text-green-600 font-bold mb-2">{property.price}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FaEye /> {property.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <FaEnvelope /> {property.inquiries} inquiries
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            property.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {property.status === 'active' ? 'Active' : 'Pending Verification'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}