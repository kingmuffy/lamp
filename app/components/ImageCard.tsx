// ImageCard.js

import React from "react";

interface ImageCardProps {
  src: string;
  alt: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => {
  return (
    <div className="w-44 h-44 rounded-md transition-transform transform hover:scale-105">
      <img src={src} alt={alt} className="w-full h-full rounded-md" />
    </div>
  );
};

export default ImageCard;
