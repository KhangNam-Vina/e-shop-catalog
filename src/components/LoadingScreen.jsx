import React from 'react';
import config from '../data/config.json';

export default function LoadingScreen() {
  const { brand, theme } = config;

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center">
      {/* Hiệu ứng Logo nhịp đập (Pulse) */}
      <div className="animate-pulse flex flex-col items-center">
        {brand.logo ? (
          <img src={brand.logo} alt="Loading..." className="h-16 mb-6" />
        ) : (
          <div className="text-3xl font-extrabold text-gray-900 mb-6">{brand.name}</div>
        )}
        
        {/* Vòng xoay Loading */}
        <div className="relative w-12 h-12">
          <div 
            className="absolute inset-0 rounded-full border-4 border-gray-100"
          ></div>
          <div 
            className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: theme.primaryColor, borderTopColor: 'transparent' }}
          ></div>
        </div>
      </div>
    </div>
  );
}