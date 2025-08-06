'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function LogoTab() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-0 z-50">
      {/* Rounded bookmark container */}
      <div 
        className={`relative bg-white border-2 border-emerald-600 shadow-xl transition-all duration-300 ease-in-out cursor-pointer
          ${isHovered 
            ? 'w-28 h-28 translate-x-0' 
            : 'w-20 h-20 translate-x-1'
          }`}
        style={{
          borderRadius: '50% 0 0 50%'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo container */}
        <div className="w-full h-full flex items-center justify-center pl-2">
          <div className={`relative transition-all duration-300 ${isHovered ? 'w-16 h-16' : 'w-10 h-10'}`}>
            {/* Replace /company-logo.png with your actual logo file path */}
            <Image
              src="/company-logo.png" 
              alt="Company Logo"
              fill
              className="object-contain"
              priority
              onError={(e) => {
                // Fallback: show a text logo if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.fallback-logo')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'fallback-logo text-black font-bold text-center flex items-center justify-center w-full h-full text-xs';
                  fallback.textContent = 'LOGO';
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
