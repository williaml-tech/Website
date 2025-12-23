'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogData';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post = blogPosts.find(p => p.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 84px)', paddingTop: '84px' }}>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#3A3429] mb-4">Blog post not found</h1>
            <Link href="/blog" className="text-[#8B7D6B] hover:text-[#3A3429] underline">
              Return to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Title Section */}
        <section className="title-section">
          <div className="mobile-hero-image">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="mobile-bg-image"
              priority
            />
            <div className="mobile-image-overlay"></div>
          </div>
          <div className="title-content">
            <Link href="/blog" className="back-link">
              <svg className="back-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            <h1 className="post-title">{post.title}</h1>
            <div className="title-decoration">
              <div className="decoration-line"></div>
              <div className="decoration-dot"></div>
              <div className="decoration-line"></div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="content-section">
          <div className="container">
            <article className="article-content">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="paragraph">
                  {paragraph}
                </p>
              ))}
            </article>

            {/* Hashtags */}
            <div className="hashtags-section">
              <div className="hashtags">
                {post.hashtags.map((tag, index) => (
                  <span key={index} className="hashtag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back to Blog Button */}
            <div className="back-button-section">
              <Link href="/blog" className="back-button">
                <svg className="back-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .title-section {
          padding-top: 84px;
          background: linear-gradient(135deg, #F5F1EB 0%, #E8DDD4 100%);
          padding-bottom: 4rem;
          position: relative;
        }

        .title-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.3"/><circle cx="30" cy="30" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="50" cy="20" r="0.4" fill="%23e2e8f0" opacity="0.25"/><circle cx="70" cy="60" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }

        .mobile-hero-image {
          display: none;
        }

        .mobile-bg-image {
          object-fit: cover;
        }

        .mobile-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(139, 125, 107, 0.7) 0%, rgba(196, 164, 132, 0.6) 100%);
        }

        .title-content {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 2rem 0;
          position: relative;
          z-index: 1;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #8B7D6B;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .back-link:hover {
          color: #3A3429;
          transform: translateX(-4px);
        }

        .back-arrow {
          width: 20px;
          height: 20px;
        }

        .post-title {
          font-size: 3.5rem;
          font-weight: 300;
          color: #3A3429;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }

        .title-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
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

        .content-section {
          background: linear-gradient(135deg, #F5F1EB 0%, #E8DDD4 100%);
          padding: 5rem 0;
          position: relative;
        }

        .content-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.3"/><circle cx="30" cy="30" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="50" cy="20" r="0.4" fill="%23e2e8f0" opacity="0.25"/><circle cx="70" cy="60" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .article-content {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 3rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(226, 232, 240, 0.8);
          margin-bottom: 3rem;
        }

        .paragraph {
          font-size: 1.125rem;
          line-height: 1.9;
          color: #3A3429;
          margin-bottom: 1.75rem;
          white-space: pre-wrap;
        }

        .paragraph:last-child {
          margin-bottom: 0;
        }

        .hashtags-section {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(226, 232, 240, 0.6);
          margin-bottom: 3rem;
        }

        .hashtags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .hashtag {
          display: inline-block;
          background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
          color: #ffffff;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .hashtag:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(139, 125, 107, 0.3);
        }

        .back-button-section {
          text-align: center;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #D4C4B0 0%, #C4A484 100%);
          color: #3A3429;
          border-radius: 30px;
          font-weight: 500;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(196, 164, 132, 0.3);
        }

        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(196, 164, 132, 0.4);
          background: linear-gradient(135deg, #C4A484 0%, #B8956B 100%);
        }

        @media (max-width: 767px) {
          .title-section {
            padding-bottom: 0;
            padding-top: 84px;
            min-height: 60vh;
            background: none;
          }

          .title-section::before {
            display: none;
          }

          .mobile-hero-image {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
          }

          .title-content {
            padding: 3rem 1.5rem;
            z-index: 2;
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .back-link {
            color: rgba(255, 255, 255, 0.9);
          }

          .back-link:hover {
            color: #ffffff;
          }

          .post-title {
            font-size: 2rem;
            color: #ffffff;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }

          .decoration-line {
            width: 40px;
            background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%);
          }

          .decoration-dot {
            background: rgba(255, 255, 255, 0.9);
          }

          .decoration-dot::before {
            border-color: rgba(255, 255, 255, 0.3);
          }

          .content-section {
            padding: 3rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          .article-content {
            padding: 2rem 1.5rem;
          }

          .paragraph {
            font-size: 1rem;
            line-height: 1.8;
          }

          .hashtags-section {
            padding: 1.5rem;
          }

          .hashtag {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
