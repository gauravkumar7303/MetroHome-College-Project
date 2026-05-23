// src/components/property/PropertyVerificationBadge.js
import { FaCheckCircle } from 'react-icons/fa'

export default function PropertyVerificationBadge() {
  return (
    <div className="verified-badge">
      <FaCheckCircle className="text-green-600" />
      <span>Verified</span>
    </div>
  )
}