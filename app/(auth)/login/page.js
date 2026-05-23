// 'use client'
// // Path: app/(auth)/login/page.js

// import { useState, useEffect, useRef } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { isAuthenticated, setAuthData } from '@/src/utils/auth'

// export default function LoginPage() {
//   const router = useRouter()
//   const [screen, setScreen] = useState('auth')
//   const [isLogin, setIsLogin] = useState(true)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [pendingEmail, setPendingEmail] = useState('')
//   const [otp, setOtp] = useState(['', '', '', '', '', ''])
//   const [resendTimer, setResendTimer] = useState(0)
//   const [bgIndex, setBgIndex] = useState(0)
//   const otpRefs = useRef([])

//   // Background images — city/home themed
//   const bgImages = [
//     'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80',
//     'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80',
//     'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
//     'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80',
//   ]

//   // Cycle background images every 4 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setBgIndex(prev => (prev + 1) % bgImages.length)
//     }, 4000)
//     return () => clearInterval(interval)
//   }, [])

//   useEffect(() => {
//     if (isAuthenticated()) router.replace('/')
//   }, [router])

//   useEffect(() => {
//     if (resendTimer > 0) {
//       const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
//       return () => clearTimeout(t)
//     }
//   }, [resendTimer])

//   const [formData, setFormData] = useState({ name: '', email: '', password: '' })

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//     setError('')
//   }

//   const handleAuthSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')
//     try {
//       if (isLogin) {
//         const res = await fetch('/api/auth/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: formData.email, password: formData.password }),
//         })
//         const data = await res.json()
//         if (!data.success) { setError(data.error || 'Login failed'); return }
//         setAuthData(data.token, data.user)
//         window.location.href = '/'
//       } else {
//         const res = await fetch('/api/auth/register', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
//         })
//         const data = await res.json()
//         if (!data.success) { setError(data.error || 'Registration failed'); return }
//         setPendingEmail(data.email || formData.email)
//         setResendTimer(60)
//         setScreen('otp')
//       }
//     } catch (err) {
//       setError('Network error. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleOtpChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return
//     const newOtp = [...otp]
//     newOtp[index] = value.slice(-1)
//     setOtp(newOtp)
//     setError('')
//     if (value && index < 5) otpRefs.current[index + 1]?.focus()
//   }

//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus()
//   }

//   const handleVerifySubmit = async (e) => {
//     e.preventDefault()
//     const otpValue = otp.join('')
//     if (otpValue.length !== 6) { setError('Please enter the complete 6-digit OTP'); return }
//     setLoading(true)
//     setError('')
//     try {
//       const res = await fetch('/api/auth/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: pendingEmail, otp: otpValue }),
//       })
//       const data = await res.json()
//       if (!data.success) { setError(data.error || 'Verification failed'); return }
//       setScreen('success')
//     } catch (err) {
//       setError('Network error. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleResend = async () => {
//     if (resendTimer > 0) return
//     setLoading(true)
//     setError('')
//     try {
//       const res = await fetch('/api/auth/resend-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: pendingEmail }),
//       })
//       const data = await res.json()
//       if (!data.success) { setError(data.error || 'Failed to resend OTP'); return }
//       setOtp(['', '', '', '', '', ''])
//       setResendTimer(60)
//       otpRefs.current[0]?.focus()
//     } catch (err) {
//       setError('Network error.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">

//       {/* Background Images with crossfade */}
//       {bgImages.map((img, i) => (
//         <div
//           key={i}
//           className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
//           style={{
//             backgroundImage: `url(${img})`,
//             opacity: i === bgIndex ? 0.35 : 0,
//             zIndex: 0,
//           }}
//         />
//       ))}

//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-gray-950/70 z-[1]" />

//       {/* Content */}
//       <div className="relative z-10 w-full max-w-md">

//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Link href="/" className="inline-block">
//             <h1 className="text-4xl font-bold text-white drop-shadow-lg">
//               Metro<span className="text-emerald-400">Home</span>
//             </h1>
//           </Link>
//           <p className="text-gray-300 mt-2 text-sm tracking-wide">Find your perfect home in the city</p>
//         </div>

//         {/* Card */}
//         <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700/60">

//           {/* ── SCREEN 1: Login / Register ── */}
//           {screen === 'auth' && (
//             <>
//               <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
//                 <button
//                   onClick={() => { setIsLogin(true); setError('') }}
//                   className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${isLogin ? 'bg-emerald-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => { setIsLogin(false); setError('') }}
//                   className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!isLogin ? 'bg-emerald-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
//                 >
//                   Register
//                 </button>
//               </div>

//               {error && (
//                 <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
//                   {error}
//                 </div>
//               )}

//               <form onSubmit={handleAuthSubmit} className="space-y-4">
//                 {!isLogin && (
//                   <div>
//                     <label className="block text-sm text-gray-400 mb-1">Full Name</label>
//                     <input type="text" name="name" value={formData.name} onChange={handleChange}
//                       placeholder="Enter your full name" required={!isLogin}
//                       className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-600"
//                     />
//                   </div>
//                 )}
//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Email Address</label>
//                   <input type="email" name="email" value={formData.email} onChange={handleChange}
//                     placeholder="Enter your email" required
//                     className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-600"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Password</label>
//                   <input type="password" name="password" value={formData.password} onChange={handleChange}
//                     placeholder={isLogin ? 'Enter your password' : 'Min. 6 characters'} required
//                     className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-600"
//                   />
//                 </div>
//                 <button type="submit" disabled={loading}
//                   className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
//                 >
//                   {loading
//                     ? (isLogin ? 'Logging in...' : 'Creating account...')
//                     : (isLogin ? 'Login' : 'Create Account')
//                   }
//                 </button>
//               </form>

//               <p className="text-center text-gray-500 text-sm mt-6">
//                 {isLogin ? "Don't have an account? " : 'Already have an account? '}
//                 <button onClick={() => { setIsLogin(!isLogin); setError('') }}
//                   className="text-emerald-400 hover:underline font-medium">
//                   {isLogin ? 'Register' : 'Login'}
//                 </button>
//               </p>
//             </>
//           )}

//           {/* ── SCREEN 2: OTP ── */}
//           {screen === 'otp' && (
//             <>
//               <div className="text-center mb-6">
//                 <div className="text-4xl mb-3">📧</div>
//                 <h2 className="text-xl font-bold text-white">Verify your email</h2>
//                 <p className="text-gray-400 text-sm mt-2">
//                   We sent a 6-digit OTP to<br />
//                   <span className="text-emerald-400 font-medium">{pendingEmail}</span>
//                 </p>
//               </div>
//               {error && (
//                 <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
//                   {error}
//                 </div>
//               )}
//               <form onSubmit={handleVerifySubmit}>
//                 <div className="flex gap-2 justify-center mb-6">
//                   {otp.map((digit, index) => (
//                     <input
//                       key={index}
//                       ref={el => otpRefs.current[index] = el}
//                       type="text"
//                       inputMode="numeric"
//                       maxLength={1}
//                       value={digit}
//                       onChange={(e) => handleOtpChange(index, e.target.value)}
//                       onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                       className="w-12 h-14 text-center text-xl font-bold bg-gray-800 border-2 border-gray-600 text-white rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
//                     />
//                   ))}
//                 </div>
//                 <button type="submit" disabled={loading || otp.join('').length !== 6}
//                   className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold py-3 rounded-lg transition-colors"
//                 >
//                   {loading ? 'Verifying...' : 'Verify OTP'}
//                 </button>
//               </form>
//               <p className="text-center text-gray-500 text-sm mt-4">
//                 Didn't receive it?{' '}
//                 {resendTimer > 0 ? (
//                   <span className="text-gray-500">Resend in {resendTimer}s</span>
//                 ) : (
//                   <button onClick={handleResend} disabled={loading}
//                     className="text-emerald-400 hover:underline font-medium">Resend OTP</button>
//                 )}
//               </p>
//               <button onClick={() => { setScreen('auth'); setError(''); setOtp(['','','','','','']) }}
//                 className="w-full text-center text-gray-500 text-sm mt-3 hover:text-gray-300 transition-colors">
//                 ← Back to Register
//               </button>
//             </>
//           )}

//           {/* ── SCREEN 3: Success ── */}
//           {screen === 'success' && (
//             <div className="text-center py-4">
//               <div className="text-6xl mb-4">🎉</div>
//               <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
//               <p className="text-gray-400 text-sm mb-2">Welcome to MetroHome! A confirmation email has been sent to</p>
//               <p className="text-emerald-400 font-medium mb-6">{pendingEmail}</p>
//               <p className="text-gray-400 text-sm mb-6">Please login to continue.</p>
//               <button
//                 onClick={() => { setScreen('auth'); setIsLogin(true); setError(''); setFormData({ name: '', email: pendingEmail, password: '' }) }}
//                 className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors"
//               >
//                 Go to Login →
//               </button>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   )
// }



'use client'
// Path: app/(auth)/login/page.js

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated, setAuthData } from '@/src/utils/auth'

export default function LoginPage() {
  const router = useRouter()
  const [screen, setScreen] = useState('auth')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pendingEmail, setPendingEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [resendTimer, setResendTimer] = useState(0)
  const [bgIndex, setBgIndex] = useState(0)
  const otpRefs = useRef([])

  // Background images — city/home themed
  const bgImages = [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80',
  ]

  // Cycle background images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % bgImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isAuthenticated()) router.replace('/')
  }, [router])

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [resendTimer])

  const [formData, setFormData] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (isLogin) {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        })
        const data = await res.json()
        if (!data.success) { setError(data.error || 'Login failed'); return }
        setAuthData(data.token, data.user)
        window.location.href = '/'
      } else {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
        })
        const data = await res.json()
        if (!data.success) { setError(data.error || 'Registration failed'); return }
        setPendingEmail(data.email || formData.email)
        setResendTimer(60)
        setScreen('otp')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setError('')
    if (value && index < 5) otpRefs.current[index + 1]?.focus()
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus()
  }

  const handleVerifySubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join('')
    if (otpValue.length !== 6) { setError('Please enter the complete 6-digit OTP'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail, otp: otpValue }),
      })
      const data = await res.json()
      if (!data.success) { setError(data.error || 'Verification failed'); return }
      setScreen('success')
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail }),
      })
      const data = await res.json()
      if (!data.success) { setError(data.error || 'Failed to resend OTP'); return }
      setOtp(['', '', '', '', '', ''])
      setResendTimer(60)
      otpRefs.current[0]?.focus()
    } catch (err) {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">

      {/* Background Images with crossfade */}
      {bgImages.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${img})`,
            opacity: i === bgIndex ? 0.35 : 0,
            zIndex: 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-950/70 z-[1]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Metro<span className="text-emerald-400">Home</span>
            </h1>
          </Link>
          <p className="text-gray-300 mt-2 text-sm tracking-wide">Find your perfect home in the city</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700/60">

          {/* ── SCREEN 1: Login / Register ── */}
          {screen === 'auth' && (
            <>
              <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
                <button
                  onClick={() => { setIsLogin(true); setError('') }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${isLogin ? 'bg-emerald-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => { setIsLogin(false); setError('') }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!isLogin ? 'bg-emerald-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  Register
                </button>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder="Enter your full name" required={!isLogin}
                      className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-600"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="Enter your email" required
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange}
                    placeholder={isLogin ? 'Enter your password' : 'Min. 6 characters'} required
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-600"
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
                >
                  {loading
                    ? (isLogin ? 'Logging in...' : 'Creating account...')
                    : (isLogin ? 'Login' : 'Create Account')
                  }
                </button>
              </form>

              <p className="text-center text-gray-500 text-sm mt-6">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => { setIsLogin(!isLogin); setError('') }}
                  className="text-emerald-400 hover:underline font-medium">
                  {isLogin ? 'Register' : 'Login'}
                </button>
              </p>
            </>
          )}

          {/* ── SCREEN 2: OTP ── */}
          {screen === 'otp' && (
            <>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">📧</div>
                <h2 className="text-xl font-bold text-white">Verify your email</h2>
                <p className="text-gray-400 text-sm mt-2">
                  We sent a 6-digit OTP to<br />
                  <span className="text-emerald-400 font-medium">{pendingEmail}</span>
                </p>
              </div>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleVerifySubmit}>
                <div className="flex gap-2 justify-center mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => otpRefs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold bg-gray-800 border-2 border-gray-600 text-white rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  ))}
                </div>
                <button type="submit" disabled={loading || otp.join('').length !== 6}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
              <p className="text-center text-gray-500 text-sm mt-4">
                Didn't receive it?{' '}
                {resendTimer > 0 ? (
                  <span className="text-gray-500">Resend in {resendTimer}s</span>
                ) : (
                  <button onClick={handleResend} disabled={loading}
                    className="text-emerald-400 hover:underline font-medium">Resend OTP</button>
                )}
              </p>
              <button onClick={() => { setScreen('auth'); setError(''); setOtp(['','','','','','']) }}
                className="w-full text-center text-gray-500 text-sm mt-3 hover:text-gray-300 transition-colors">
                ← Back to Register
              </button>
            </>
          )}

          {/* ── SCREEN 3: Success ── */}
          {screen === 'success' && (
            <div className="text-center py-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
              <p className="text-gray-400 text-sm mb-2">Welcome to MetroHome! A confirmation email has been sent to</p>
              <p className="text-emerald-400 font-medium mb-6">{pendingEmail}</p>
              <p className="text-gray-400 text-sm mb-6">Please login to continue.</p>
              <button
                onClick={() => { setScreen('auth'); setIsLogin(true); setError(''); setFormData({ name: '', email: pendingEmail, password: '' }) }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Go to Login →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}