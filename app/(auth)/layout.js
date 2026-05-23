// Path: app/(auth)/layout.js
// Ye layout sirf (auth) routes ke liye hai — Navbar nahi aayega

export default function AuthLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}