import React from 'react';
import config from '../data/config.json';

export default function BrandIntro() {
  const { brand, theme } = config;

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Cột chữ */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Về <span style={{ color: theme.primaryColor }}>{brand.name}</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              E-shop kinh doanh các thực phẩm nhập khẩu, chuyên cung cấp và phân phối các thiết bị bảo hộ lao động, các sản phẩm bảo hộ lao động nhập khẩu (Hàn Quốc, Nhật Bản,...)
            </p>
            <ul className="space-y-4 pt-4">
              {[
                'Cam kết hàng chính hãng 100%',
                'Chất liệu an toàn, thân thiện với môi trường',
                'Đủ tất cả các loại mặc hàng bạn cần'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    ✓
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột ảnh minh họa */}
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <img 
                src="public/images/banner/1.jpg" 
                alt="About us" 
                className="w-full h-[300px] sm:h-[400px] object-cover transform hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800&auto=format&fit=crop";
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}