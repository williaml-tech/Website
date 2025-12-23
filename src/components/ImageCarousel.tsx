'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageCarouselProps {
  images: string[];
  altText?: string;
  className?: string;
  height?: {
    mobile: number;
    desktop: number;
  };
  autoplayDelay?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  loop?: boolean;
  slidesPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  spaceBetween?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  imageFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  aspectRatio?: string; // e.g., '16/9', '4/3', '1/1'
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  altText = 'Carousel Image',
  className = '',
  height = {
    mobile: 250,
    desktop: 300
  },
  autoplayDelay = 3000,
  showNavigation = true,
  showPagination = true,
  loop = true,
  slidesPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 2
  },
  spaceBetween = {
    mobile: 15,
    tablet: 20,
    desktop: 20
  },
  imageFit = 'contain',
  aspectRatio = 'auto'
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`image-carousel ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween.desktop}
        slidesPerView={slidesPerView.desktop}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        loop={loop}
        className="carousel-swiper"
        breakpoints={{
          320: {
            slidesPerView: slidesPerView.mobile,
            spaceBetween: spaceBetween.mobile,
          },
          640: {
            slidesPerView: slidesPerView.tablet,
            spaceBetween: spaceBetween.tablet,
          },
          768: {
            slidesPerView: slidesPerView.desktop,
            spaceBetween: spaceBetween.desktop,
          },
          1024: {
            slidesPerView: slidesPerView.desktop,
            spaceBetween: spaceBetween.desktop,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="carousel-image-container" data-fit={imageFit}>
              <Image
                src={image}
                alt={`${altText} ${index + 1}`}
                fill
                className="carousel-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
                style={{ objectFit: imageFit as React.CSSProperties['objectFit'], objectPosition: 'center' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .image-carousel {
          margin: 2rem 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .carousel-swiper {
          width: 100%;
          height: ${height.desktop}px;
          min-height: ${height.desktop}px;
          max-height: ${height.desktop}px;
        }

        .carousel-image-container {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: ${height.desktop}px;
          max-height: ${height.desktop}px;
          ${aspectRatio !== 'auto' ? `aspect-ratio: ${aspectRatio};` : ''}
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: ${imageFit};
          object-position: center;
        }

        .carousel-swiper .swiper-button-next,
        .carousel-swiper .swiper-button-prev {
          color: #8B7D6B;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-top: -20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .carousel-swiper .swiper-button-next:hover,
        .carousel-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
        }

        .carousel-swiper .swiper-button-next:after,
        .carousel-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }

        .carousel-swiper .swiper-pagination {
          bottom: 10px;
        }

        .carousel-swiper .swiper-pagination-bullet {
          background: #8B7D6B;
          opacity: 0.5;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }

        .carousel-swiper .swiper-pagination-bullet-active {
          background: #8B7D6B;
          opacity: 1;
          transform: scale(1.2);
        }

        .carousel-swiper .swiper-pagination-bullet:hover {
          opacity: 0.8;
        }

        /* Tablet Styles */
        @media (max-width: 1023px) and (min-width: 768px) {
          .carousel-swiper {
            height: ${Math.round(height.desktop * 0.9)}px;
            min-height: ${Math.round(height.desktop * 0.9)}px;
            max-height: ${Math.round(height.desktop * 0.9)}px;
          }

          .carousel-image-container {
            min-height: ${Math.round(height.desktop * 0.9)}px;
            max-height: ${Math.round(height.desktop * 0.9)}px;
          }
        }

        /* Mobile Responsive Styles */
        @media (max-width: 767px) {
          .image-carousel {
            margin: 1.5rem 0;
          }

          .carousel-swiper {
            height: ${height.mobile}px;
            min-height: ${height.mobile}px;
            max-height: ${height.mobile}px;
          }

          .carousel-image-container {
            min-height: ${height.mobile}px;
            max-height: ${height.mobile}px;
            border-radius: 8px;
          }

          .carousel-swiper .swiper-button-next,
          .carousel-swiper .swiper-button-prev {
            width: 35px;
            height: 35px;
          }

          .carousel-swiper .swiper-button-next:after,
          .carousel-swiper .swiper-button-prev:after {
            font-size: 14px;
          }

          .carousel-swiper .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
          }
        }

        /* Small Mobile Styles */
        @media (max-width: 480px) {
          .carousel-swiper {
            height: ${Math.round(height.mobile * 0.9)}px;
            min-height: ${Math.round(height.mobile * 0.9)}px;
            max-height: ${Math.round(height.mobile * 0.9)}px;
          }

          .carousel-image-container {
            min-height: ${Math.round(height.mobile * 0.9)}px;
            max-height: ${Math.round(height.mobile * 0.9)}px;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
