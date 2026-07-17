import React, { useEffect, useState } from 'react';
import config from '../data/config.json';

export default function ProductModal({ product, onClose }) {
  const { theme, contact } = config;

  // Tạo state để theo dõi ảnh đang xem trong Modal
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset lại ảnh đầu tiên mỗi khi mở một sản phẩm mới
  useEffect(() => {
    setCurrentIndex(0);
  }, [product]);

  // Khóa cuộn chuột ở nền khi mở Modal
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  // Lấy mảng hình ảnh
  const imageList = Array.isArray(product.images) ? product.images : (product.image ? [product.image] : []);

  // Hàm xử lý nút Bấm Tới/Lui
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === imageList.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Lớp nền mờ */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Nội dung Modal */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] sm:max-h-[85vh] animate-[fadeIn_0.3s_ease-out]">
        
        {/* Nút X để đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur rounded-full text-gray-600 hover:text-gray-900 shadow-sm hover:bg-gray-100 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Khối hình ảnh bên trái CÓ HIỆU ỨNG SLIDE */}
        <div className="w-full md:w-1/2 bg-gray-50 flex-shrink-0 relative group flex items-center justify-center min-h-[250px]">
          
          {imageList.length > 0 && (
            <img 
              src={imageList[currentIndex]} 
              alt={product.name} 
              className="w-full h-56 sm:h-64 md:h-full object-contain p-4 transition-opacity duration-300" 
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop";
              }}
            />
          )}

          {/* Cụm Nút Điều Hướng (Chỉ hiện khi có > 1 ảnh) */}
          {imageList.length > 1 && (
            <>
              {/* Nút Trái */}
              <button 
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
              >
                &#10094;
              </button>
              
              {/* Nút Phải */}
              <button 
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
              >
                &#10095;
              </button>

              {/* Dấu chấm báo hiệu */}
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

        {/* Khối thông tin bên phải giữ nguyên */}
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