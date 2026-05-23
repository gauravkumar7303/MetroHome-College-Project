'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaCheckCircle, FaUsers, FaHome, FaSmile, FaHandshake, FaShieldAlt } from 'react-icons/fa'

export default function AboutPage() {
  const stats = [
    { icon: FaHome, value: '5000+', label: 'Properties Listed', color: 'from-blue-500 to-blue-600' },
    { icon: FaUsers, value: '10000+', label: 'Happy Customers', color: 'from-green-500 to-green-600' },
    { icon: FaCheckCircle, value: '100%', label: 'Verified Properties', color: 'from-purple-500 to-purple-600' },
    { icon: FaSmile, value: '24/7', label: 'Customer Support', color: 'from-orange-500 to-orange-600' }
  ]

  const values = [
    {
      icon: FaHandshake,
      title: 'Trust & Transparency',
      description: 'No hidden charges, no broker fees. What you see is what you get.'
    },
    {
      icon: FaShieldAlt,
      title: 'Physical Verification',
      description: 'Every property is personally visited and verified by our team.'
    },
    {
      icon: FaUsers,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority. We\'re here 24/7 to help.'
    }
  ]

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: '10+ years in real estate industry',
      quote: 'Building trust, one property at a time.'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Expert in property management',
      quote: 'Every client is family.'
    },
    {
      name: 'Amit Verma',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Building tech for real estate',
      quote: 'Innovation meets real estate.'
    },
    {
      name: 'Neha Gupta',
      role: 'Head of Verification',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Ensuring 100% genuine properties',
      quote: 'Trust is earned, not given.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Trust Image */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Background Image - Office Team Meeting */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 hover:scale-100 transition-transform duration-10000"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container-custom h-full flex items-center">
          <div className="max-w-3xl text-white animate-fade-in-up">
            <h1 className="text-6xl font-bold mb-6 transform hover:scale-105 transition-transform duration-300">
              About MetroHome Finder
            </h1>
            <p className="text-2xl mb-8 text-green-100">
              India's most trusted property portal connecting genuine owners with seekers
            </p>
            <div className="flex gap-4">
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-3 animate-pulse">
                <span className="text-2xl font-bold">8+ Years</span>
                <p className="text-sm">of Trust</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-3 animate-pulse">
                <span className="text-2xl font-bold">50K+</span>
                <p className="text-sm">Happy Families</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Hover Effects */}
      <div className="container-custom -mt-24 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} text-white flex items-center justify-center text-3xl mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                <stat.icon />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story with Image */}
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with overlay text */}
          <div className="relative group overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
              alt="Team Meeting"
              className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
              <p className="text-2xl font-bold mb-2">"Building Trust Since 2018"</p>
              <p className="text-green-200">Our team works tirelessly to verify every property</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Founded in 2018, MetroHome Finder started with a simple mission: to make property search in Delhi and Gurugram completely broker-free and transparent. We realized that both property owners and seekers were tired of dealing with middlemen, paying high commissions, and falling victim to fake listings.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, we've grown into the region's most trusted property portal with over 5000 verified listings and 10,000+ happy customers. Our unique physical verification process ensures that every property on our platform is genuine and exactly as described.
            </p>
            
            {/* Trust Badges */}
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                <FaCheckCircle className="text-green-600" />
                <span className="text-green-700">RERA Registered</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <FaShieldAlt className="text-blue-600" />
                <span className="text-blue-700">ISO Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-100 py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">What Makes Us Different</h2>
          <p className="text-xl text-gray-600 text-center mb-12">The values that drive us every day</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-green-100 rounded-2xl text-green-600 flex items-center justify-center text-4xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  <value.icon />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container-custom py-20">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Meet Our Leadership Team</h2>
        <p className="text-xl text-gray-600 text-center mb-12">The people behind your trust</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm italic">"{member.quote}"</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}