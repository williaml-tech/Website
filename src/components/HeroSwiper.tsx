'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroSwiper = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const heroImages = [
    {
      desktop: '/hero/hero001.jpg',
      mobile: '/hero/hero001.jpg',
      alt: 'Klinik.KA Premium Beauty Treatment 1'
    },
    {
      desktop: '/hero/hero002.jpg',
      mobile: '/hero/hero002.jpg',
      alt: 'Klinik.KA Premium Beauty Treatment 2'
    },
    {
      desktop: '/hero/hero003.jpg',
      mobile: '/hero/hero003.jpg',
      alt: 'Klinik.KA Premium Beauty Treatment 3'
    },
    {
      desktop: '/hero/hero004.jpg',
      mobile: '/hero/hero004.jpg',
      alt: 'Klinik.KA Premium Beauty Treatment 4'
    }
  ];

  return (
    <section className="relative w-screen overflow-hidden">
      <Swiper
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          769: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="hero-swiper"
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={isMobile ? image.mobile : image.desktop}
                alt={image.alt}
                width={isMobile ? 768 : 1920}
                height={isMobile ? 1024 : 1080}
                className="w-full h-full object-cover"
                priority={index === 0}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              {/* Optional: Add gradient overlay to enhance text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper {
          width: 100vw;
          height: calc(100vh - 84px); /* Subtract navigation bar height */
        }

        .hero-swiper .swiper-slide {
          width: 100vw;
          height: calc(100vh - 84px); /* Fixed height, fill available space */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-swiper .swiper-slide > div {
          width: 100%;
          height: 100%;
          position: relative;
        }

        /* Pagination styles */
        .hero-swiper .swiper-pagination {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: auto;
          z-index: 10;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
          margin: 0 6px;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          background: rgba(255, 255, 255, 0.9);
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        /* Navigation button styles */
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: rgba(107, 114, 128, 0.95); /* gray-500 */
          background: rgba(255, 255, 255, 0.1);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          transform: translateY(-2px) scale(1.05);
          background: rgba(255, 255, 255, 0.25);
          color: rgba(75, 85, 99, 1); /* gray-600 */
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
        }

        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 13px;
          font-weight: 600;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .hero-swiper { height: auto; padding-top: 84px; }

          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            width: 33px;
            height: 33px;
          }

          .hero-swiper .swiper-button-next:after,
          .hero-swiper .swiper-button-prev:after {
            font-size: 11px;
          }

          .hero-swiper .swiper-pagination { bottom: 30px; }

          .hero-swiper .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 4px;
          }

          .hero-swiper .swiper-slide { height: auto; min-height: 0; }
          .hero-swiper .swiper-slide > div { height: auto; }
        }

        @media (max-width: 480px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            width: 30px;
            height: 30px;
          }

          .hero-swiper .swiper-button-next:after,
          .hero-swiper .swiper-button-prev:after {
            font-size: 9px;
          }

          .hero-swiper .swiper-pagination { bottom: 10px; }

          .hero-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            margin: 0 3px;
          }
        }

        /* Ensure proper display below Header */
        @media (min-width: 769px) {
          .hero-swiper { padding-top: 80px; }
        }

        @media (max-width: 768px) {
          .hero-swiper .swiper-wrapper { align-items: stretch; }
        }
      `}</style>
    </section>
  );
};

export default HeroSwiper;