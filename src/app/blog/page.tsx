'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogData';

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-subtitle">Insights & Expertise</span>
            <h1 className="hero-title">Blog</h1>
            <div className="title-decoration">
              <div className="decoration-line"></div>
              <div className="decoration-dot"></div>
              <div className="decoration-line"></div>
            </div>
            <p className="hero-description">
              Explore the latest in aesthetic medicine and skincare science
            </p>
          </div>
        </section>

        {/* Blog Grid Section */}
        <section className="blog-grid-section">
          <div className="container">
            <div className="blog-grid">
              {blogPosts.map((post) => (
                <Link href={`/blog/${post.id}`} key={post.id} className="blog-card-link">
                  <div className="blog-card">
                    <div className="blog-image-container">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="blog-image"
                      />
                      <div className="blog-overlay">
                        <span className="read-more">Read Article</span>
                      </div>
                    </div>
                    <div className="blog-content">
                      <h2 className="blog-title">{post.title}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .hero-section {
          padding-top: 84px;
          background: linear-gradient(135deg, #F5F1EB 0%, #E8DDD4 100%);
          padding-bottom: 5rem;
          position: relative;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.3"/><circle cx="30" cy="30" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="50" cy="20" r="0.4" fill="%23e2e8f0" opacity="0.25"/><circle cx="70" cy="60" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }

        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 1rem;
          position: relative;
          z-index: 1;
        }

        .hero-subtitle {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8B7D6B;
          background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 300;
          color: #3A3429;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
          line-height: 1.1;
        }

        .title-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .decoration-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #D4C4B0 50%, transparent 100%);
        }

        .decoration-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
          position: relative;
        }

        .decoration-dot::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 1px solid rgba(139, 125, 107, 0.2);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.8;
          color: #5A4F3A;
          font-weight: 400;
        }

        .blog-grid-section {
          background: #ffffff;
          padding: 5rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .container {
            padding: 0 2rem;
          }

          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
          }
        }

        @media (min-width: 1024px) {
          .container {
            padding: 0 3rem;
          }

          .blog-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
          }
        }

        .blog-card-link {
          text-decoration: none;
          display: block;
        }

        .blog-card {
          background: rgb(243, 238, 227);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(226, 232, 240, 0.8);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .blog-image-container {
          position: relative;
          height: 300px;
          overflow: hidden;
          background: #F5F1EB;
        }

        .blog-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }

        .blog-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(139, 125, 107, 0.85) 0%, rgba(196, 164, 132, 0.85) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blog-card:hover .blog-overlay {
          opacity: 1;
        }

        .read-more {
          background: rgba(255, 255, 255, 0.9);
          color: #3A3429;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .blog-content {
          padding: 2rem;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blog-title {
          font-size: 1.35rem;
          font-weight: 600;
          color: #3A3429;
          line-height: 1.4;
          text-align: center;
        }

        @media (max-width: 767px) {
          .hero-section {
            padding-bottom: 3rem;
          }

          .hero-content {
            padding: 3rem 1rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .blog-grid-section {
            padding: 3rem 0;
          }

          .blog-image-container {
            height: 250px;
          }

          .blog-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
