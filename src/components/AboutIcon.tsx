'use client';

import React from 'react';
import Image from 'next/image';

interface AboutIconProps {
  src: string;
  alt: string;
  className?: string;
}

const AboutIcon: React.FC<AboutIconProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`about-icon-image ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="icon-img"
        style={{
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
    </div>
  );
};

export default AboutIcon;
