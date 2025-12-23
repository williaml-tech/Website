'use client';

import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';

interface TreatmentItem {
  href: string;
  label: string;
}

interface TreatmentMobileMenuProps {
  onClose: () => void;
}

// Mobile Style 4: Modern gradient style
const TreatmentMobileMenuStyle4: React.FC<TreatmentMobileMenuProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const treatmentItems: TreatmentItem[] = [
    {
      href: '/treatment/injectable',
      label: 'Medical Injectable Treatments'
    },
    {
      href: '/treatment/energy-device',
      label: 'Energy Device Treatments'
    },
    {
      href: '/treatment/skincare',
      label: 'Medical Skincare & Maintenance Care'
    }
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-full px-6 mx-6 py-8 leading-12 text-sm font-medium uppercase tracking-[0.18em] text-[#5A4F3A] hover:bg-gradient-to-r hover:from-[#5A4F3A] hover:to-[#3A3429] hover:text-white hover:shadow-lg transition-all duration-300 rounded-xl relative"
      >
        <span>Treatment</span>
        <svg 
          className={`absolute right-2 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <Transition
        show={isOpen}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 -translate-y-2"
        enterTo="transform opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 translate-y-0"
        leaveTo="transform opacity-0 -translate-y-2"
      >
        <div className="overflow-hidden">
          <div className="py-4">
            {treatmentItems.map((item, index) => (
              <div key={item.href} className="mb-6">
                {index > 0 && (
                  <div className="flex justify-center mb-6">
                    <div className="border-t border-[#D4C4B0]/30" style={{ width: `${Math.min(item.label.length * 8, 200)}px` }}></div>
                  </div>
                )}
                <Link
                  href={item.href}
                  onClick={() => {
                    onClose();
                    setIsOpen(false);
                  }}
                  className="px-6 mx-6 rounded-xl text-xs font-medium uppercase tracking-[0.15em] text-[#5A4F3A] hover:bg-gradient-to-r hover:from-[#5A4F3A] hover:to-[#3A3429] hover:text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center h-12 w-full text-center whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  <span className="text-xs font-medium tracking-[0.15em] uppercase">
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
            <div className="mx-10 my-3 border-t border-[#D4C4B0]/30"></div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default TreatmentMobileMenuStyle4;
