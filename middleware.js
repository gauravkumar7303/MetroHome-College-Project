// // // Path: middleware.js  (ROOT of project - same level as package.json)
// // import { NextResponse } from 'next/server';

// // // Ye routes bina login ke accessible hain
// // const PUBLIC_ROUTES = ['/(auth)/login', '/login', '/api/auth/login', '/api/auth/register'];

// // export function middleware(request) {
// //   const { pathname } = request.nextUrl;

// //   // Public routes ko allow karo seedha
// //   const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
// //   if (isPublic) {
// //     return NextResponse.next();
// //   }

// //   // Static files aur _next ko allow karo
// //   if (
// //     pathname.startsWith('/_next') ||
// //     pathname.startsWith('/favicon') ||
// //     pathname.startsWith('/images') ||
// //     pathname.startsWith('/public') ||
// //     pathname.includes('.')
// //   ) {
// //     return NextResponse.next();
// //   }

// //   // Token check karo (RideEase same pattern)
// //   const token = request.cookies.get('metrohome_token')?.value;

// //   if (!token) {
// //     // Login page pe redirect
// //     const loginUrl = new URL('/login', request.url);
// //     loginUrl.searchParams.set('from', pathname); // after login original page pe wapas aane ke liye
// //     return NextResponse.redirect(loginUrl);
// //   }

// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: [
// //     /*
// //      * Match all paths EXCEPT:
// //      * - _next/static
// //      * - _next/image
// //      * - favicon.ico
// //      */
// //     '/((?!_next/static|_next/image|favicon.ico).*)',
// //   ],
// // };



// // Path: middleware.js (ROOT - same level as package.json)
// import { NextResponse } from 'next/server';

// // Bina login ke accessible routes
// const PUBLIC_ROUTES = [
//   '/login',           // Next.js URL
//   '/(auth)/login',    // Folder path
//   '/api/auth/login',
//   '/api/auth/register',
// ];

// export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // Public routes allow karo
//   const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
//   if (isPublic) return NextResponse.next();

//   // Static assets allow karo
//   if (
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/favicon') ||
//     pathname.startsWith('/images') ||
//     pathname.startsWith('/public') ||
//     pathname.includes('.')
//   ) {
//     return NextResponse.next();
//   }

//   // Token check
//   const token = request.cookies.get('metrohome_token')?.value;

//   if (!token) {
//     // /login pe redirect (Next.js isko /(auth)/login pe serve karta hai)
//     const loginUrl = new URL('/login', request.url);
//     loginUrl.searchParams.set('from', pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// };

// Path: middleware.js (ROOT - same level as package.json)
import { NextResponse } from 'next/server';

// ✅ ALL PUBLIC ROUTES - No login required
const PUBLIC_ROUTES = [
  // Auth pages
  '/login',
  '/register',
  '/verify-email',
  '/forgot-password',
  '/reset-password',
  
  // Public pages
  '/',
  '/about',
  '/contact',
  '/properties',
  
  // API routes (auth & properties)
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/verify-email',
  '/api/auth/resend-otp',
  '/api/properties',
  '/api/properties/',
];

// ✅ Check if route is public
function isPublicRoute(pathname) {
  // Exact match
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  
  // Property detail pages (e.g., /properties/123)
  if (pathname.startsWith('/properties/') && pathname !== '/properties') {
    return true;
  }
  
  // Static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/public') ||
    pathname.includes('.')
  ) {
    return true;
  }
  
  return false;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // ✅ Check if route is public
  if (isPublicRoute(pathname)) {
    console.log('✅ Public route allowed:', pathname);
    return NextResponse.next();
  }
  
  // ✅ Check authentication
  const token = request.cookies.get('metrohome_token')?.value;
  
  if (!token) {
    console.log('🔒 Protected route, no token:', pathname);
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  console.log('✅ Authenticated route allowed:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};