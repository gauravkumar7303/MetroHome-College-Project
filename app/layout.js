// // Root layout component - wraps all pages
// import { Inter } from 'next/font/google'
// import './globals.css'
// import Navbar from '@/src/components/layout/Navbar'
// import Footer from '@/src/components/layout/Footer'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'MetroHome Finder - Delhi & Gurugram Housing Portal',
//   description: 'Find verified properties without brokers in West Delhi and Gurugram. PG, Flats, Houses, Commercial properties.',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {/* Navigation bar - shows on all pages */}
//         <Navbar />
        
//         {/* Main content area */}
//         <main className="min-h-screen bg-gray-50">
//           {children}
//         </main>
        
//         {/* Footer - shows on all pages */}
//         <Footer />
//       </body>
//     </html>
//   )
// }

'use client'
// Path: app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import { usePathname } from 'next/navigation'
import Navbar from '@/src/components/layout/Navbar'
import Footer from '@/src/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const pathname = usePathname()

  // Auth pages pe Navbar aur Footer nahi dikhega
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/(auth)')

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isAuthPage && <Navbar />}
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        {!isAuthPage && <Footer />}
      </body>
    </html>
  )
}