'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function LogoTab() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const pathname = usePathname();
  
  // Define functional pages where logo should be hidden
  const functionalPages = [
    '/auditions',
    '/finals',
    '/admin',
    '/login'
  ];
  
  // Check if current path is a functional page
  const isFunctionalPage = functionalPages.some(page => pathname.startsWith(page));
  
  // Auto-hide timer for mobile interactions
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isClicked) {
      timer = setTimeout(() => {
        setIsClicked(false);
      }, 3000); // Hide after 3 seconds
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isClicked]);
  
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  // Determine if tab should be extended (either hovered on desktop or clicked on mobile)
  const isExtended = isHovered || isClicked;

  return (
    <div className="fixed bottom-8 right-0 z-50">
      {/* Rounded bookmark container */}
      <div 
        className={`relative bg-white border-2 border-emerald-600 shadow-xl transition-all duration-500 ease-in-out cursor-pointer
          ${isFunctionalPage 
            ? isExtended 
              ? 'w-28 h-28 translate-x-0' 
              : 'w-20 h-20 translate-x-16'
            : isExtended 
              ? 'w-28 h-28 translate-x-0' 
              : 'w-20 h-20 translate-x-1'
          }`}
        style={{
          borderRadius: '50% 0 0 50%'
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo container */}
        <div className="w-full h-full flex items-center justify-center pl-2">
          <div className={`relative transition-all duration-300 ${isExtended ? 'w-16 h-16' : 'w-10 h-10'}`}>
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
