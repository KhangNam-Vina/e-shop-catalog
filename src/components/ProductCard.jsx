import React, { useState } from 'react';
import config from '../data/config.json';

export default function ProductCard({ product, onViewDetail }) {
  const { theme } = config;

  // 1. Tạo bộ nhớ (state) để lưu xem người dùng đang xem tới ảnh thứ mấy (Mặc định là 0 - ảnh đầu tiên)
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Chuyển đổi an toàn: Lấy mảng 'images' mới, nếu không có thì lấy 'image' cũ bọc vào mảng để không bị lỗi code
  const imageList = Array.isArray(product.images) ? product.images : (product.image ? [product.image] : []);

  // 3. Hàm xử lý nút Bấm Tới (Next)
  const handleNext = (e) => {
    e.stopPropagation(); // Tránh bị click nhầm vào các vùng khác của thẻ card
    setCurrentIndex((prevIndex) => (prevIndex === imageList.length - 1 ? 0 : prevIndex + 1));
  };

  // 4. Hàm xử lý nút Bấm Lui (Prev)
  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1));
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full">
      
      {/* Phần Hình ảnh có hiệu ứng Slide */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        
        {/* Render Hình ảnh */}
        {imageList.length > 0 && (
          <img 
            src={imageList[currentIndex]} 
            alt={product.name} 
            className="w-full h-full object-contain p-4 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop";
            }}
          />
        )}

        {/* Cụm Nút Điều Hướng (CHỈ hiện lên khi rớt chuột vào card VÀ số lượng ảnh phải > 1) */}
        {imageList.length > 1 && (
          <>
            {/* Nút Trái (<) */}
            <button 
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              &#10094;
            </button>
            
            {/* Nút Phải (>) */}
            <button 
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              &#10095;
            </button>

            {/* Dấu chấm báo hiệu vị trí ảnh ở cạnh dưới */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {imageList.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-gray-800 scale-125' : 'bg-gray-300/80'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Nhãn Tag (Của code cũ) */}
        <div className="absolute top-4 left-4 z-10">
          <span 
            style={{ backgroundColor: theme.primaryColor }}
            className="text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"
          >
            Mới
          </span>
        </div>
      </div>

      {/* Phần Nội dung và Nút Bấm bên dưới giữ nguyên y xì của bro */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="space-y-2 mb-4 text-sm text-gray-600 flex-grow">
          <p><span className="font-semibold text-gray-900">Kích thước:</span> {product.size}</p>
          <p><span className="font-semibold text-gray-900">Chất liệu:</span> {product.material}</p>
          {product.colors && (
            <p><span className="font-semibold text-gray-900">Màu sắc:</span> {product.colors.join(', ')}</p>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
          <button 
            onClick={onViewDetail}
            style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}
            className="flex-1 px-4 py-2.5 border-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
            >
            Xem Chi Tiết
            </button>
          
          {product.pdf && (
            <a 
              href={product.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
              title="Tải file PDF"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          )}
        </div>
      </div>

    </div>
  );
}