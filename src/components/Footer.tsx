'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const menu = [
    { title: 'About', href: '/about' },
    { title: 'Concerns', href: '/concerns' },
    { title: 'Make appointment', href: '/appointment' },
    { title: 'Contact us', href: '/contact' },
  ];

  const contacts = [
    { label: 'Email', value: 'info@klinikka.com.au', href: 'mailto:info@klinikka.com.au' },
    { label: 'Phone', value: '(02) 9955 8181', href: 'tel:0299558181' },
    { label: 'Address', value: 'Level 10 / 503 - 505 Kent St, Sydney, NSW, 2000', href: 'https://maps.google.com/?q=Level+10+503-505+Kent+St+Sydney+NSW+2000' },
  ];

  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-top">
          <div className="brand">
            <Link href="/" className="brand-link">
              <Image src="/logo.png" alt="Klinik.KA" width={140} height={60} className="brand-logo" />
            </Link>
            <p className="tagline">Premium aesthetic treatments, tailored for your natural beauty.</p>
          </div>

          <nav className="nav">
            {menu.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="contact">
            {contacts.map((c) => (
              <div key={c.label} className="contact-item">
                <span className="contact-label">{c.label}</span>
                {c.href ? (
                  <a href={c.href} className="contact-value" target="_blank" rel="noopener noreferrer">{c.value}</a>
                ) : (
                  <span className="contact-value">{c.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} KLINIK.KA. All rights reserved.</p>
          <div className="policies">
            <Link href="/privacy" className="policy-link">Privacy Policy</Link>
            <span className="policy-separator">|</span>
            <Link href="/terms" className="policy-link">Terms of Service</Link>
          </div>
          <a
            className="powered-by"
            href="https://www.shinymarketing.com.au/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Shiny Marketing
          </a>
        </div>
      </div>

      <style jsx>{`
        .footer-root {
          background: linear-gradient(180deg, #F5F1EB 0%, #E8DDD4 100%);
          border-top: 1px solid rgba(212,196,176,0.8);
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        @media (min-width: 768px) {
          .footer-container { padding: 2.5rem 2rem; }
        }
        @media (min-width: 1024px) {
          .footer-container { padding: 3rem 3rem; }
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        
        /* Mobile center alignment */
        @media (max-width: 1023px) {
          .footer-top {
            text-align: center;
          }
          
          .brand {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .nav {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
          
          .contact {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 0.5rem !important;
          }
          
          .contact-item {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
            width: 100% !important;
            grid-template-columns: none !important;
          }
          
          .contact-label {
            display: none !important;
          }
          
          .contact-value {
            display: block !important;
            text-align: center !important;
            white-space: nowrap !important;
            width: 100% !important;
            color: #3A3429 !important;
            text-decoration: none !important;
          }
          
          .contact-value:hover {
            text-decoration: underline !important;
          }
        }
        @media (min-width: 1024px) {
          .footer-top { 
            grid-template-columns: 1.2fr 1fr 1fr; 
            gap: 2rem;
            align-items: end;
          }
        }

        .brand-link { display: inline-flex; align-items: center; }
        .brand-logo { height: 2.2rem; width: auto; object-fit: contain; }
        
        /* Smaller logo on mobile */
        @media (max-width: 768px) {
          .brand-logo { height: 1.2rem; }
        }
        .tagline { color: #4b5563; margin-top: 0.5rem; line-height: 1.6; max-width: 32rem; }
        
        /* Mobile center alignment for tagline */
        @media (max-width: 1023px) {
          .tagline {
            text-align: center;
          }
        }

        .nav { display: grid; grid-auto-rows: minmax(1.75rem, auto); gap: 0.25rem; }
        .nav-link {
          color: #3A3429;
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 0.9rem;
          transition: color .2s ease;
        }
        .nav-link:hover { color: #3A3429; }

        .contact { display: grid; grid-auto-rows: minmax(1.75rem, auto); gap: 0.25rem; }
        .contact-item { 
          display: grid; 
          grid-template-columns: 7rem 1fr; 
          align-items: center;
          min-height: 1.75rem;
        }
        .contact-label { color: #8B7D6B; font-size: 0.9rem; }
        .contact-value { color: #3A3429; text-decoration: none; }
        .contact-value:hover { text-decoration: underline; }
        
        /* Desktop contact styles */
        @media (min-width: 1024px) {
          .contact { 
            display: grid; 
            grid-auto-rows: minmax(1.75rem, auto); 
            gap: 0.25rem; 
          }
          .contact-item { 
            display: grid; 
            grid-template-columns: 7rem 1fr; 
            align-items: center;
            min-height: 1.75rem;
          }
          .contact-label { 
            color: #8B7D6B; 
            font-size: 0.9rem; 
            display: block;
          }
          .contact-value { 
            color: #3A3429; 
            text-decoration: none; 
            display: block;
          }
        }

        .footer-divider { height: 1px; background: linear-gradient(90deg, transparent, #D4C4B0, transparent); margin: 1.5rem 0; }

        .footer-bottom { display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start; justify-content: space-between; }
        @media (min-width: 768px) { .footer-bottom { flex-direction: row; align-items: center; position: relative; } }
        
        /* Mobile center alignment for footer-bottom */
        @media (max-width: 1023px) {
          .footer-bottom {
            align-items: center;
            text-align: center;
          }
          .powered-by {
            order: 3;
            display: block;
            margin-top: 0.25rem;
          }
        }
        .policies { display: flex; gap: 1rem; align-items: center; }
        .policy-link { color: #5A4F3A; text-decoration: none; font-size: 0.9rem; }
        .policy-link:hover { color: #3A3429; text-decoration: underline; }
        .policy-separator { color: #8B7D6B; font-size: 0.9rem; }
        .copyright { color: #8B7D6B; font-size: 0.9rem; }
        .powered-by { color: #8B7D6B; font-size: 0.9rem; text-decoration: none; }
        .powered-by:hover { color: #3A3429; text-decoration: underline; }
        @media (min-width: 768px) {
          .powered-by {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;


