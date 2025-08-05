'use client';

import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { 
  MusicalNoteIcon, 
  StarIcon, 
  CalendarDaysIcon,
  MapPinIcon,
  TrophyIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Move static data outside component to prevent re-creation on each render
const features = [
  {
    icon: <MusicalNoteIcon className="w-8 h-8" />,
    title: "Traditional Music",
    description: "Celebrating the rich heritage of Pakistani classical and folk music"
  },
  {
    icon: <TrophyIcon className="w-8 h-8" />,
    title: "Competition",
    description: "Multi-stage competition from auditions to grand finals"
  },
  {
    icon: <UserGroupIcon className="w-8 h-8" />,
    title: "Expert Judges",
    description: "Renowned musicians and scholars evaluating performances"
  },
  {
    icon: <StarIcon className="w-8 h-8" />,
    title: "Cultural Excellence",
    description: "Promoting and preserving Pakistan's musical traditions"
  }
];

const eventDetails = [
  {
    icon: <CalendarDaysIcon className="w-6 h-6" />,
    label: "Event Dates",
    value: "March 15-20, 2025"
  },
  {
    icon: <MapPinIcon className="w-6 h-6" />,
    label: "Venue",
    value: "National Academy of Performing Arts, Karachi"
  }
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-4">
              All Pakistan Music Conference
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Celebrating Traditional Pakistani Music Heritage
            </p>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          {/* Welcome message based on user role */}
          {user && (
            <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-lg max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-emerald-700 mb-2">
                Welcome back, {user.username}!
              </h2>
              <p className="text-emerald-600 capitalize">
                Logged in as: <span className="font-medium">{user.role}</span>
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auditions/performances"
              className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200"
            >
              View Auditions
            </Link>
            <Link 
              href="/finals/performances"
              className="px-8 py-3 bg-saffron text-charcoal rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              View Finals
            </Link>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {eventDetails.map((detail, index) => (
            <div key={index} className="bg-card-bg rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-mint rounded-lg text-emerald-600">
                  {detail.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal">{detail.label}</h3>
                  <p className="text-charcoal-light">{detail.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-card-bg rounded-xl shadow-lg p-6 border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4 text-emerald-600 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">
                {feature.title}
              </h3>
              <p className="text-charcoal-light text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="bg-card-bg rounded-2xl p-8 md:p-12 text-center border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-600">
            About APMC
          </h2>
          <p className="text-lg md:text-xl text-charcoal max-w-4xl mx-auto leading-relaxed">
            The All Pakistan Music Conference is the premier platform for celebrating and preserving 
            the rich tradition of Pakistani classical and folk music. Our annual conference brings 
            together talented musicians from across the nation to compete, perform, and share their 
            artistic heritage with audiences worldwide.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold" style={{ color: 'var(--secondary-saffron)' }}>50+</div>
              <div className="text-charcoal">Participants</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: 'var(--secondary-saffron)' }}>15+</div>
              <div className="text-charcoal">Expert Judges</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: 'var(--secondary-saffron)' }}>6</div>
              <div className="text-charcoal">Days of Music</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
