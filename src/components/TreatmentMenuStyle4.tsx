'use client';

import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';

interface TreatmentItem {
  href: string;
  label: string;
}

interface TreatmentMenuProps {
  children: React.ReactNode;
}

// Style 4: Modern gradient style
const TreatmentMenuStyle4: React.FC<TreatmentMenuProps> = ({ children }) => {
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
    <div className="relative">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="relative text-sm font-medium tracking-[0.18em] uppercase text-[#5A4F3A] hover:text-[#3A3429] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#3A3429] hover:after:w-full after:transition-all after:duration-300">
            {children}
          </Menu.Button>
        </div>

        <Transition
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 translate-y-2 scale-95"
          enterTo="transform opacity-100 translate-y-0 scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 translate-y-0 scale-100"
          leaveTo="transform opacity-0 translate-y-2 scale-95"
        >
          <Menu.Items className="origin-top-left absolute left-0 w-[28rem] bg-gradient-to-br from-white to-[#F5F1EB] border border-[#D4C4B0]/30 rounded-2xl shadow-2xl focus:outline-none backdrop-blur-md" style={{ marginTop: '36px' }}>
            <div className="py-6 px-8">
              {treatmentItems.map((item, index) => (
                <Menu.Item key={item.href}>
                  {({ active }) => (
                    <div className="mb-2">
                      {index > 0 && (
                        <div className="mx-10 mt-0 mb-4 border-t border-[#D4C4B0]/30"></div>
                      )}
                      
                      <Link
                        href={item.href}
                        className={`px-8 mx-4 rounded-xl transition-all duration-300 flex items-center justify-center h-12 w-full text-center whitespace-nowrap overflow-hidden text-ellipsis ${
                          active 
                            ? 'bg-gradient-to-r from-[#5A4F3A] to-[#3A3429] text-white shadow-lg transform scale-105' 
                            : 'text-[#5A4F3A] hover:bg-gradient-to-r hover:from-[#F5F1EB] hover:to-white hover:text-[#3A3429] hover:shadow-md hover:transform hover:scale-105'
                        }`}
                      >
                        <span className="text-xs font-medium tracking-[0.15em] uppercase">
                          {item.label}
                        </span>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default TreatmentMenuStyle4;
