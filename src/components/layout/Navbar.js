// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { usePathname, useRouter } from 'next/navigation'
// import { FaBars, FaTimes, FaUser, FaHome, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa'
// import { isAuthenticated, getCurrentUser, clearAuthData } from '@/src/utils/auth'

// export default function Navbar() {
//   const pathname = usePathname()
//   const router = useRouter()
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [user, setUser] = useState(null)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [profileMenuOpen, setProfileMenuOpen] = useState(false)

//   // Real auth check
//   useEffect(() => {
//     const checkAuth = () => {
//       const loggedIn = isAuthenticated()
//       setIsLoggedIn(loggedIn)
//       if (loggedIn) {
//         setUser(getCurrentUser())
//       } else {
//         setUser(null)
//       }
//     }
//     checkAuth()
//     // Listen for storage changes (login/logout in other tabs)
//     window.addEventListener('storage', checkAuth)
//     return () => window.removeEventListener('storage', checkAuth)
//   }, [pathname]) // pathname change hone pe bhi re-check karo

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50)
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const handleLogout = () => {
//     clearAuthData()
//     setIsLoggedIn(false)
//     setUser(null)
//     setProfileMenuOpen(false)
//     setMenuOpen(false)
//     window.location.href = '/login'
//   }

//   const isHomePage = pathname === '/'
//   const isPropertiesPage = pathname === '/properties'
//   const isAboutPage = pathname === '/about'
//   const isContactPage = pathname === '/contact'
//   const isTransparentPage = isHomePage || isPropertiesPage || isAboutPage || isContactPage

//   const navLinks = [
//     { href: '/', label: 'Home' },
//     { href: '/properties', label: 'Properties' },
//     { href: '/about', label: 'About' },
//     { href: '/contact', label: 'Contact' },
//   ]

//   const profileMenuItems = [
//     { href: '/profile', label: 'Dashboard', icon: FaUser },
//     { href: '/profile/my-properties', label: 'My Properties', icon: FaHome },
//     { href: '/profile/saved-properties', label: 'Saved Properties', icon: FaHeart },
//     { href: '/profile/settings', label: 'Settings', icon: FaCog },
//   ]

//   const getNavbarClass = () => {
//     if (scrolled) return 'bg-white shadow-md py-2'
//     if (isTransparentPage) return 'bg-transparent py-4'
//     return 'bg-white shadow-md py-2'
//   }

//   const getTextColorClass = () => {
//     if (scrolled) return 'text-gray-700'
//     if (isTransparentPage) return 'text-white'
//     return 'text-gray-700'
//   }

//   const getLogoColorClass = () => {
//     if (scrolled) return 'text-green-600'
//     if (isTransparentPage) return 'text-white'
//     return 'text-green-600'
//   }

//   const getBadgeClass = () => {
//     if (scrolled) return 'bg-green-100 text-green-800'
//     if (isTransparentPage) return 'bg-white/20 text-white'
//     return 'bg-green-100 text-green-800'
//   }

//   // User initials for avatar fallback
//   const getInitials = (name) => {
//     if (!name) return 'U'
//     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
//   }

//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${getNavbarClass()}`}>
//       <div className="container-custom">
//         <div className="flex justify-between items-center">

//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2 z-50">
//             <span className={`text-2xl font-bold ${getLogoColorClass()} transition-colors duration-300`}>
//               MetroHome
//             </span>
//             <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${getBadgeClass()}`}>
//               Finder
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`text-sm font-medium transition-colors duration-300 ${
//                   pathname === link.href
//                     ? scrolled
//                       ? 'text-green-600 font-bold'
//                       : isTransparentPage
//                         ? 'text-white font-bold border-b-2 border-white pb-1'
//                         : 'text-green-600 font-bold'
//                     : getTextColorClass()
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Auth Buttons / Profile Menu */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isLoggedIn && user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setProfileMenuOpen(!profileMenuOpen)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
//                     scrolled
//                       ? 'bg-green-600 text-white hover:bg-green-700'
//                       : 'bg-white text-green-600 hover:bg-white/90'
//                   }`}
//                 >
//                   {/* Avatar circle with initials */}
//                   <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
//                     {getInitials(user.name)}
//                   </div>
//                   <span className="font-medium">{user.name?.split(' ')[0] || 'Profile'}</span>
//                 </button>

//                 {/* Dropdown */}
//                 {profileMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50">
//                     {/* User Info */}
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <p className="font-bold text-gray-900">{user.name}</p>
//                       <p className="text-sm text-gray-500">{user.email}</p>
//                     </div>

//                     {profileMenuItems.map((item) => (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         onClick={() => setProfileMenuOpen(false)}
//                         className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300 ${
//                           pathname === item.href ? 'bg-green-50 text-green-600' : ''
//                         }`}
//                       >
//                         <item.icon className="text-lg" />
//                         <span className="font-medium">{item.label}</span>
//                       </Link>
//                     ))}

//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 border-t border-gray-100"
//                     >
//                       <FaSignOutAlt className="text-lg" />
//                       <span className="font-medium">Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link
//                   href="/login"
//                   className={`transition-colors duration-300 ${
//                     scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-white/80'
//                   }`}
//                 >
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className={`md:hidden text-2xl z-50 transition-colors duration-300 ${
//               scrolled ? 'text-gray-700' : isTransparentPage ? 'text-white' : 'text-gray-700'
//             }`}
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className={`md:hidden fixed inset-0 z-40 pt-20 ${
//             scrolled || !isTransparentPage ? 'bg-white' : 'bg-black/90 backdrop-blur-lg'
//           }`}>
//             <div className="container-custom">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`block py-4 text-lg border-b ${
//                     scrolled || !isTransparentPage
//                       ? 'border-gray-100 text-gray-700 hover:text-green-600'
//                       : 'border-white/10 text-white hover:text-green-300'
//                   } transition-colors duration-300`}
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//               {isLoggedIn && user ? (
//                 <div className="mt-8 space-y-4">
//                   {/* User Info */}
//                   <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
//                     <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-lg font-bold">
//                       {getInitials(user.name)}
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-900">{user.name}</p>
//                       <p className="text-sm text-gray-500">{user.email}</p>
//                     </div>
//                   </div>

//                   {profileMenuItems.map((item) => (
//                     <Link
//                       key={item.href}
//                       href={item.href}
//                       className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       <item.icon className="text-lg" />
//                       <span className="font-medium">{item.label}</span>
//                     </Link>
//                   ))}

//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-3 px-4 py-3 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300"
//                   >
//                     <FaSignOutAlt className="text-lg" />
//                     <span className="font-medium">Logout</span>
//                   </button>
//                 </div>
//               ) : (
//                 <div className="mt-8">
//                   <Link
//                     href="/login"
//                     className="block text-center py-4 bg-green-600 text-white rounded-xl font-bold"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  FaBars, FaTimes, FaUser, FaHome, FaHeart, FaCog, FaSignOutAlt, 
  FaChevronDown, FaBuilding, FaCity, FaStore, FaTree, 
  FaHotel, FaBed, FaCalendar, FaEnvelope, FaFileContract
} from 'react-icons/fa'
import { isAuthenticated, getCurrentUser, clearAuthData } from '@/src/utils/auth'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false)

  // Property Types with icons and filters
  const propertyTypes = [
    { name: 'All Properties', href: '/properties', icon: FaHome, color: 'text-gray-600', filter: 'all' },
    { name: 'Apartments', href: '/properties?type=apartment', icon: FaBuilding, color: 'text-blue-500', filter: 'apartment' },
    { name: 'PG / Hostel', href: '/properties?type=pg', icon: FaBed, color: 'text-purple-500', filter: 'pg' },
    { name: 'Flats', href: '/properties?type=flat', icon: FaCity, color: 'text-green-500', filter: 'flat' },
    { name: 'Villas', href: '/properties?type=villa', icon: FaHome, color: 'text-orange-500', filter: 'villa' },
    { name: 'Commercial', href: '/properties?type=commercial', icon: FaStore, color: 'text-red-500', filter: 'commercial' },
    { name: 'Land / Plots', href: '/properties?type=land', icon: FaTree, color: 'text-emerald-500', filter: 'land' },
    { name: 'Rooms', href: '/properties?type=room', icon: FaHotel, color: 'text-yellow-500', filter: 'room' }
  ]

  // Real auth check
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isAuthenticated()
      setIsLoggedIn(loggedIn)
      if (loggedIn) {
        setUser(getCurrentUser())
      } else {
        setUser(null)
      }
    }
    checkAuth()
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    clearAuthData()
    setIsLoggedIn(false)
    setUser(null)
    setProfileMenuOpen(false)
    setMenuOpen(false)
    window.location.href = '/login'
  }

  const isHomePage = pathname === '/'
  const isPropertiesPage = pathname === '/properties' || pathname?.startsWith('/properties?')
  const isAboutPage = pathname === '/about'
  const isContactPage = pathname === '/contact'
  const isTransparentPage = isHomePage || isPropertiesPage || isAboutPage || isContactPage

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const profileMenuItems = [
    { href: '/profile', label: 'Dashboard', icon: FaUser },
    { href: '/profile/my-properties', label: 'My Properties', icon: FaHome },
    { href: '/profile/saved-properties', label: 'Saved Properties', icon: FaHeart },
    { href: '/profile/visits', label: 'My Visits', icon: FaCalendar },
    { href: '/profile/inquiries', label: 'Inquiries', icon: FaEnvelope },
    { href: '/profile/settings', label: 'Settings', icon: FaCog },
     { href: '/profile/deals', label: 'My Deals', icon: FaFileContract }, 
  ]

  const getNavbarClass = () => {
    if (scrolled) return 'bg-white shadow-md py-2'
    if (isTransparentPage) return 'bg-transparent py-4'
    return 'bg-white shadow-md py-2'
  }

  const getTextColorClass = () => {
    if (scrolled) return 'text-gray-700'
    if (isTransparentPage) return 'text-white'
    return 'text-gray-700'
  }

  const getLogoColorClass = () => {
    if (scrolled) return 'text-green-600'
    if (isTransparentPage) return 'text-white'
    return 'text-green-600'
  }

  const getBadgeClass = () => {
    if (scrolled) return 'bg-green-100 text-green-800'
    if (isTransparentPage) return 'bg-white/20 text-white'
    return 'bg-green-100 text-green-800'
  }

  const getDropdownBgClass = () => {
    if (scrolled) return 'bg-white'
    if (isTransparentPage) return 'bg-black/90 backdrop-blur-md'
    return 'bg-white'
  }

  const getDropdownTextClass = () => {
    if (scrolled) return 'text-gray-700 hover:bg-green-50 hover:text-green-600'
    if (isTransparentPage) return 'text-white hover:bg-white/10'
    return 'text-gray-700 hover:bg-green-50 hover:text-green-600'
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${getNavbarClass()}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <span className={`text-2xl font-bold ${getLogoColorClass()} transition-colors duration-300`}>
              MetroHome
            </span>
            <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${getBadgeClass()}`}>
              Finder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  pathname === link.href
                    ? scrolled
                      ? 'text-green-600 font-bold'
                      : isTransparentPage
                        ? 'text-white font-bold border-b-2 border-white pb-1'
                        : 'text-green-600 font-bold'
                    : getTextColorClass()
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Properties Dropdown with Types */}
            <div 
              className="relative"
              onMouseEnter={() => setShowPropertyDropdown(true)}
              onMouseLeave={() => setShowPropertyDropdown(false)}
            >
              <button
                className={`text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                  isPropertiesPage
                    ? scrolled
                      ? 'text-green-600 font-bold'
                      : isTransparentPage
                        ? 'text-white font-bold'
                        : 'text-green-600 font-bold'
                    : getTextColorClass()
                }`}
              >
                By Type <FaChevronDown className="text-xs ml-1" />
              </button>
              
              {showPropertyDropdown && (
                <div className={`absolute top-full left-0 mt-2 w-64 rounded-xl shadow-lg overflow-hidden z-50 ${getDropdownBgClass()}`}>
                  {propertyTypes.map((type) => (
                    <Link
                      key={type.filter}
                      href={type.href}
                      className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${getDropdownTextClass()}`}
                      onClick={() => setShowPropertyDropdown(false)}
                    >
                      <type.icon className={`text-lg ${type.color}`} />
                      <span>{type.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Auth Buttons / Profile Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    scrolled
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-white text-green-600 hover:bg-white/90'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                    {getInitials(user.name)}
                  </div>
                  <span className="font-medium">{user.name?.split(' ')[0] || 'Profile'}</span>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setProfileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300 ${
                          pathname === item.href ? 'bg-green-50 text-green-600' : ''
                        }`}
                      >
                        <item.icon className="text-lg" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 border-t border-gray-100"
                    >
                      <FaSignOutAlt className="text-lg" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className={`transition-colors duration-300 ${
                  scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-white/80'
                }`}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden text-2xl z-50 transition-colors duration-300 ${
              scrolled ? 'text-gray-700' : isTransparentPage ? 'text-white' : 'text-gray-700'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden fixed inset-0 z-40 pt-20 overflow-y-auto ${
            scrolled || !isTransparentPage ? 'bg-white' : 'bg-black/90 backdrop-blur-lg'
          }`}>
            <div className="container-custom pb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-4 text-lg border-b ${
                    scrolled || !isTransparentPage
                      ? 'border-gray-100 text-gray-700 hover:text-green-600'
                      : 'border-white/10 text-white hover:text-green-300'
                  } transition-colors duration-300`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Property Types */}
              <div className="py-4 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-500 mb-3 px-2">Property Types</p>
                {propertyTypes.map((type) => (
                  <Link
                    key={type.filter}
                    href={type.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    <type.icon className={`text-lg ${type.color}`} />
                    <span>{type.name}</span>
                  </Link>
                ))}
              </div>

              {isLoggedIn && user ? (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-lg font-bold">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  {profileMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      <item.icon className="text-lg" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="mt-8">
                  <Link
                    href="/login"
                    className="block text-center py-4 bg-green-600 text-white rounded-xl font-bold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}