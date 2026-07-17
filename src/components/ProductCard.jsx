import React, { useState } from 'react';
import config from '../data/config.json';

export default function ProductCard({ product, onViewDetail }) {
  const { theme } = config;
  // State để lưu chỉ số ảnh đang hiển thị
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Lấy danh sách ảnh an toàn
  const images = Array.isArray(product.images) ? product.images : [product.image];

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full">
      
      {/* Phần Hình ảnh có thể chuyển đổi */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 group">
        <img
          src={images[currentIndex]}
          alt={product.name}
          className="w-full h-full object-contain transition-opacity duration-300"
        />
        
        {/* Nút chuyển ảnh (Chỉ hiện khi hover hoặc trên mobile) */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}

        {/* Nhãn Tag */}
        <div className="absolute top-4 left-4">
          <span 
            style={{ backgroundColor: theme.primaryColor }}
            className="text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"
          >
            Mới
          </span>
        </div>
      </div>

      {/* Phần nội dung giữ nguyên... */}
      {/* ... (giữ lại đoạn code hiển thị tên, kích thước, nút xem chi tiết của bro) */}
    </div>
  );
}