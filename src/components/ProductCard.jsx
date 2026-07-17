import React from 'react';
import config from '../data/config.json';

export default function ProductCard({ product, onViewDetail }) {
  const { theme } = config;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full">
      
      {/* Phần Hình ảnh */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={Array.isArray(product.images) ? product.images[0] : product.image}
          alt={product.name}
        />
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

      {/* Phần Nội dung */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Thông số cơ bản */}
        <div className="space-y-2 mb-4 text-sm text-gray-600 flex-grow">
          <p><span className="font-semibold text-gray-900">Kích thước:</span> {product.size}</p>
          <p><span className="font-semibold text-gray-900">Chất liệu:</span> {product.material}</p>
          {product.colors && (
            <p><span className="font-semibold text-gray-900">Màu sắc:</span> {product.colors.join(', ')}</p>
          )}
        </div>

        {/* Nút thao tác */}
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