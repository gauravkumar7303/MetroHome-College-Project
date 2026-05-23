'use client'

import { useState, useRef } from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaWhatsapp, FaHeadset, FaCheckCircle } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const formRef = useRef(null)

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Our Office',
      details: ['B-123, Rajouri Garden', 'West Delhi - 110027', 'India'],
      color: 'from-blue-500 to-blue-600',
      delay: 0
    },
    {
      icon: FaPhone,
      title: 'Call Our Team',
      details: ['+91 98765 43210', '+91 98765 43211', '24/7 Support Available'],
      color: 'from-green-500 to-green-600',
      delay: 100
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: ['support@metrohome.com', 'careers@metrohome.com', 'business@metrohome.com'],
      color: 'from-purple-500 to-purple-600',
      delay: 200
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      details: ['Monday - Saturday', '9:00 AM - 8:00 PM', 'Sunday: By Appointment'],
      color: 'from-orange-500 to-orange-600',
      delay: 300
    }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call with loading effect
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('Message sent successfully! Our team will get back to you within 24 hours.', {
      icon: '🎉',
      duration: 5000
    })
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Call Center Image */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Background Image - Call Center Team */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 hover:scale-100 transition-transform duration-10000"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/80"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 animate-float">
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
            <FaHeadset className="text-4xl text-white" />
          </div>
        </div>
        
        {/* <div className="absolute bottom-20 left-20 animate-float-delayed">
          <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-3">
            <p className="text-white font-bold">📞 24/7 Support</p>
          </div>
        </div> */}
        
        {/* Content */}
        <div className="relative z-10 container-custom h-full flex items-center">
          <div className="max-w-3xl text-white animate-fade-in-up">
            <h1 className="text-6xl font-bold mb-6 transform hover:scale-105 transition-transform duration-300">
              Get in Touch
            </h1>
            <p className="text-2xl mb-4 text-green-100">
              Our team is here to help you 24/7
            </p>
            <p className="text-lg text-white/90">
              Average response time: <span className="font-bold text-green-300">15 minutes</span>
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards with Hover Effects */}
      <div className="container-custom -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              style={{ animationDelay: `${info.delay}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${info.color} text-white flex items-center justify-center text-3xl mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                <info.icon />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                {info.title}
              </h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-sm mb-1">{detail}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Map & Form Section */}
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map with hover effect */}
          <div className="group relative h-[600px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.120218424579!2d77.119327!3d28.648289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03c3b0c6b3c5%3A0x3e5c7f3f3f3f3f3f!2sRajouri%20Garden%2C%20Delhi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            ></iframe>
            
            {/* Overlay with office info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-bold text-xl">Visit Our Head Office</p>
              <p className="text-green-200">B-123, Rajouri Garden, Delhi</p>
            </div>
          </div>

          {/* Contact Form with animations */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center animate-bounce">
                <FaHeadset className="text-2xl text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                <p className="text-gray-600">We'll respond within 15 minutes</p>
              </div>
            </div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                    placeholder="John Doe"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                    placeholder="Property Inquiry"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-400 resize-none"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaPaperPlane className="group-hover:rotate-12 transition-transform" />
                    Send Message
                  </div>
                )}
              </button>
            </form>

            {/* Trust Badges */}
            <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                <FaCheckCircle className="text-green-500" />
                24/7 Support
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                <FaCheckCircle className="text-green-500" />
                Quick Response
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                <FaCheckCircle className="text-green-500" />
                Free Consultation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="container-custom text-center text-white">
          <div className="max-w-2xl mx-auto">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl animate-pulse">
                💬
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-300 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-4xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-xl mb-8 text-green-100">Our live chat support is available 24/7</p>
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              Start Live Chat
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Got questions? We've got answers</p>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'How quickly do you respond to inquiries?',
                a: 'We aim to respond to all inquiries within 15 minutes during business hours and within 2 hours after hours.',
                icon: '⚡'
              },
              {
                q: 'Can I schedule a property visit?',
                a: 'Yes! Contact our team and we\'ll arrange a physical visit at your convenience.',
                icon: '🏠'
              },
              {
                q: 'Do you charge any fees for consultation?',
                a: 'No! Initial consultation is completely free. We only charge nominal fees for premium services.',
                icon: '💰'
              },
              {
                q: 'What areas do you cover?',
                a: 'We currently cover West Delhi and Gurugram, with 24/7 support available online.',
                icon: '📍'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform">{faq.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}