'use client';

import React from 'react';
import { 
  MicrophoneIcon, 
  TrophyIcon, 
  MusicalNoteIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const conferenceFeatures = [
    {
      icon: MicrophoneIcon,
      title: 'Auditions',
      description: 'Open auditions for talented musicians across Pakistan',
      color: 'bg-blue-500'
    },
    {
      icon: TrophyIcon,
      title: 'Final Competition',
      description: 'Grand finale showcasing the best musical talents',
      color: 'bg-yellow-500'
    },
    {
      icon: MusicalNoteIcon,
      title: 'Multiple Categories',
      description: 'Classical, Folk, Contemporary, and Fusion music categories',
      color: 'bg-purple-500'
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Judges',
      description: 'Renowned musicians and industry experts as judges',
      color: 'bg-green-500'
    }
  ];

  const eventHighlights = [
    {
      icon: CalendarDaysIcon,
      title: 'Event Schedule',
      description: 'Multi-day conference with workshops and performances'
    },
    {
      icon: MapPinIcon,
      title: 'Venue Information',
      description: 'Premium venues across major cities in Pakistan'
    },
    {
      icon: ClockIcon,
      title: 'Timeline',
      description: 'Structured timeline from auditions to final results'
    },
    {
      icon: StarIcon,
      title: 'Recognition',
      description: 'Awards and recognition for outstanding performances'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              All Pakistan
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Music Conference
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Celebrating the rich musical heritage of Pakistan through talent discovery, 
              cultural exchange, and artistic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-sm text-gray-300">Next Event</div>
                <div className="text-lg font-semibold">Coming Soon 2025</div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conference Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the comprehensive music conference designed to showcase and nurture musical talent
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {conferenceFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center group hover:-translate-y-2"
              >
                <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-20 lg:py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Event Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes APMC a premier musical event in Pakistan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventHighlights.map((highlight, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 flex items-start space-x-6"
              >
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <highlight.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Cards */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* About Card */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-4">About APMC</h3>
              <p className="text-purple-100 leading-relaxed mb-6">
                The All Pakistan Music Conference is a prestigious platform that celebrates 
                and promotes the diverse musical traditions of Pakistan while fostering new talent.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Cultural Heritage Preservation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Talent Development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Community Building</span>
                </div>
              </div>
            </div>

            {/* Participation Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Participate</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-semibold text-gray-900">Register</div>
                    <div className="text-gray-600 text-sm">Submit your application with performance samples</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-semibold text-gray-900">Audition</div>
                    <div className="text-gray-600 text-sm">Participate in regional auditions</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-semibold text-gray-900">Compete</div>
                    <div className="text-gray-600 text-sm">Advance to final competition</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-4">Get Involved</h3>
              <p className="text-green-100 leading-relaxed mb-6">
                Join us in celebrating Pakistan&apos;s musical heritage. Whether you&apos;re a musician, 
                music enthusiast, or supporter of the arts.
              </p>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-semibold">Email</div>
                  <div className="text-green-200">info@apmc.pk</div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold">Follow Updates</div>
                  <div className="text-green-200">Stay tuned for announcements</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
