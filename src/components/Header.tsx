'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TreatmentMenu from './TreatmentMenuStyle4';
import TreatmentMobileMenu from './TreatmentMobileMenuStyle4';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navItems = [
    { href: '/about', label: 'About' },
    { href: '/concerns', label: 'Concerns' },
    { href: '/treatment', label: 'Treatment', hasDropdown: true },
    { href: '/blog', label: 'Blog' },
    { href: 'https://www.fresha.com/book-now/klinik-ka-aesthetic-clinic-fivxhb80/all-offer?share=true&pId=2723491', label: 'Make appointment' },
    { href: '/contact', label: 'Contact us' }
  ];

  return (
    <>
      {/* Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Klinik.KA",
            "logo": {
              "@type": "ImageObject",
              "url": "https://klinikka.com.au/logo.png",
              "width": 300,
              "height": 140
            },
            "url": "https://klinikka.com.au",
            "description": "Premium aesthetic clinic specializing in advanced skincare, anti-aging, and cosmetic procedures in Australia",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "AU"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "0299558181",
              "contactType": "customer service",
              "email": "info@klinikka.com.au"
            }
          })
        }}
      />
      <header
         className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
           isScrolled ? 'bg-[#E8DDD4]/95 backdrop-blur border-b border-[#D4C4B0]' : 'bg-[#F5F1EB]/80 backdrop-blur border-b border-transparent'
         }`}
      >
      <div
        className="w-full"
        style={{ paddingLeft: 'max(1.5rem, 5vw)', paddingRight: 'max(1.5rem, 5vw)' }}
      >
        <div className="flex items-center justify-between h-[84px]">
          {/* Logo - keep original aspect ratio, no extra text */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Klinik.KA"
              width={300}
              height={140}
              priority
              className="h-[4.2rem] w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 ml-auto flex-1 justify-end">
            <nav className="flex items-center gap-7">
              {navItems.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <TreatmentMenu key={item.href}>
                      {item.label}
                    </TreatmentMenu>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-sm font-medium tracking-[0.18em] uppercase text-[#5A4F3A] hover:text-[#3A3429] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#3A3429] hover:after:w-full after:transition-all after:duration-300"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
             className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#D4C4B0] text-[#5A4F3A] hover:text-[#3A3429] hover:bg-white/70 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute left-0 right-0 top-1.5 block h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 block h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute left-0 right-0 bottom-1.5 block h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[calc(100vh+200px)]' : 'max-h-0'}`}>
          <div className="h-6" />
          <div className="pt-2 pb-2 grid gap-0">
            {navItems.map((item, index) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.href}>
                    {index > 0 && (
                      <div className="mx-10 mt-0 mb-8 border-t border-[#D4C4B0]/30"></div>
                    )}
                    <TreatmentMobileMenu
                      onClose={() => setIsMenuOpen(false)}
                    />
                  </div>
                );
              }
              return (
                <div key={item.href}>
                  {index > 0 && (
                    <div className="mx-10 mt-0 mb-8 border-t border-[#D4C4B0]/30"></div>
                  )}
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-6 mx-6 py-8 leading-12 text-center text-sm font-medium uppercase tracking-[0.18em] text-[#5A4F3A] hover:bg-gradient-to-r hover:from-[#5A4F3A] hover:to-[#3A3429] hover:text-white hover:shadow-lg transition-all duration-300 rounded-xl"
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
           <div className="mt-4 pt-4 pb-6 border-t border-[#D4C4B0] text-center">
             <div className="h-12" />
             <div className="text-xs font-bold underline text-[#8B7D6B]">Email</div>
             <a href="mailto:info@klinikka.com.au" className="text-sm text-[#3A3429] hover:underline">info@klinikka.com.au</a>
             <div className="mt-2 text-xs font-bold underline text-[#8B7D6B]">Phone</div>
            <a href="tel:0299558181" className="text-sm text-[#3A3429] hover:underline">(02) 9955 8181</a>
             <div className="mt-2 text-xs font-bold underline text-[#8B7D6B]">Address</div>
             <a 
               href="https://www.google.com/maps/place/Klinik.KA+Aesthetic+Clinic/@-33.8738672,151.1858662,15z/data=!4m10!1m2!2m1!1sLevel+10+%2F+503%2F505+Kent+St+Sydney+NSW+2000!3m6!1s0x6b12af34c4e0550f:0x771b5ff5ba4ed521!8m2!3d-33.8738672!4d151.2049206!15sCipMZXZlbCAxMCAvIDUwMy81MDUgS2VudCBTdCBTeWRuZXkgTlNXIDIwMDCSARBza2luX2NhcmVfY2xpbmljqgFjEAEqECIMbGV2ZWwgMTAgNTAzKAAyHxABIhuYzYSz5CIAQcBu91p6LvXYj6LlrLl6VxRg_YQyLBACIihsZXZlbCAxMCA1MDMgNTA1IGtlbnQgc3Qgc3lkbmV5IG5zdyAyMDAw4AEA!16s%2Fg%2F11xzvmbvnk?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MTAwNy4wIKXMDSoASAFQAw%3D%3D" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-sm text-[#3A3429] hover:underline"
             >
               Level 10 / 503/505 Kent St<br />Sydney NSW 2000<br />Australia
             </a>
             <div className="mt-5 text-[11px] text-[#8B7D6B]">© {new Date().getFullYear()} Klinik.KA. All rights reserved.</div>
            <div className="h-18" />
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
