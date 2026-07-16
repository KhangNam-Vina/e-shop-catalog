import React from 'react';
import config from '../data/config.json';

export default function Header() {
  const { brand, contact, theme } = config;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Logo & Brand Name */}
        <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          {brand.logo ? (
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="h-9 sm:h-11 w-auto object-contain"
              onError={(e) => {
                // Tự động ẩn thẻ ảnh nếu chưa có file logo thực tế để không bị lỗi hiển thị
                e.target.style.display = 'none';
              }}
            />
          ) : null}
          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900">
            {brand.name}
          </span>
        </a>

        {/* Khối liên hệ bên phải */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Số điện thoại (Chỉ hiện trên màn hình Desktop) */}
          <a
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{contact.phone}</span>
          </a>

          {/* Nút liên hệ Zalo sử dụng Dynamic Color */}
          <a
            href={contact.zalo}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: theme.primaryColor }}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-white rounded-full text-sm font-semibold shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 5.58 2 10c0 2.5 1.43 4.7 3.67 6.07C5.35 17.5 4.5 19.5 4.5 19.5s2.5-.5 4.5-2.25c.95.27 1.96.42 3 .42 5.52 0 10-3.58 10-8s-4.48-8-10-8zm0 12c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm0-6c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1-.45 1-1 1z" />
            </svg>
            <span>Liên hệ Zalo</span>
          </a>
        </div>

      </div>
    </header>
  );
}