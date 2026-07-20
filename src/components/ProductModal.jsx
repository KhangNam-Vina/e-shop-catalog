import React, { useEffect, useState } from 'react';
import config from '../data/config.json';

export default function ProductModal({ product, onClose }) {
  const { theme, contact } = config;

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 1. Thêm bộ nhớ để lưu trạng thái "Có đang zoom không?" và tọa độ x, y
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const imageList = product ? (Array.isArray(product.images) ? product.images : (product.image ? [product.image] : [])) : [];

  useEffect(() => {
    setCurrentIndex(0);
    // Tắt zoom khi đổi ảnh hoặc mở ảnh mới
    setIsZoomed(false); 
  }, [product]);

  useEffect(() => {
    let slideInterval;
    // Tạm dừng auto-play nếu người dùng đang đưa chuột vào soi ảnh (isZoomed = true)
    if (product && imageList.length > 1 && !isZoomed) {
      slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);  // 1000 = 1s
    }
    return () => {
      if (slideInterval) clearInterval(slideInterval);
    };
  }, [product, imageList.length, isZoomed]);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [product]);

  if (!product) return null;

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === imageList.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1));
  };

  // 2. Hàm ma thuật để lấy tọa độ chuột và tính ra % của hình ảnh
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] sm:max-h-[85vh] animate-[fadeIn_0.3s_ease-out]">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur rounded-full text-gray-600 hover:text-gray-900 shadow-sm hover:bg-gray-100 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Khối hình ảnh bên trái: ÁP DỤNG MOUSE TRACKING ZOOM */}
        <div className="w-full md:w-1/2 bg-gray-50 flex-shrink-0 relative group flex items-center justify-center min-h-[250px] overflow-hidden">
          
          {imageList.length > 0 && (
            <div 
              className="relative w-full h-56 sm:h-64 md:h-full overflow-hidden cursor-crosshair flex items-center justify-center"
              // Các sự kiện bắt chuột:
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img 
                src={imageList[currentIndex]} 
                alt={product.name} 
                // Xóa scale hover mặc định của Tailwind, dùng style động của React
                className="w-full h-full object-contain p-4 transition-transform duration-150 ease-out" 
                style={{
                  transform: isZoomed ? 'scale(2.5)' : 'scale(1)', // Phóng to 2.5 lần khi đưa chuột vào
                  transformOrigin: isZoomed ? `${mousePosition.x}% ${mousePosition.y}%` : 'center center' // Phóng to đúng vị trí chuột
                }}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop";
                }}
              />
            </div>
          )}

          {/* Cụm Nút Điều Hướng */}
          {imageList.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
              >
                &#10094;
              </button>
              
              <button 
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
              >
                &#10095;
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {imageList.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all shadow-sm ${idx === currentIndex ? 'bg-gray-800 scale-125' : 'bg-gray-300/80 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Khối thông tin bên phải */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{product.name}</h3>
          
          <div className="space-y-2 text-sm sm:text-base text-gray-600 mb-6 pb-6 border-b border-gray-100">
            <p><span className="font-semibold text-gray-900">Kích thước:</span> {product.size}</p>
            <p><span className="font-semibold text-gray-900">Chất liệu:</span> {product.material}</p>
            {product.colors && (
              <p><span className="font-semibold text-gray-900">Màu sắc:</span> {product.colors.join(', ')}</p>
            )}
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-gray-900 text-lg mb-2">Mô tả sản phẩm</h4>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{product.description}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h4 className="font-bold text-gray-900 text-lg mb-3">Đặc điểm nổi bật</h4>
              <ul className="space-y-3">
                {product.features.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-600 text-sm sm:text-base">
                    <span 
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      ✓
                    </span> 
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Các nút hành động */}
          <div className="mt-auto pt-4 flex gap-4">
            <a 
              href={contact.zalo} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ backgroundColor: theme.primaryColor }}
              className="flex-1 flex justify-center items-center py-3.5 text-white font-bold rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              Nhận Báo Giá
            </a>
            {product.pdf && (
              <a 
                href={product.pdf} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <span>Tải PDF</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}