import React from 'react';
import config from '../data/config.json';

export default function ContactSection() {
  const { brand, contact, theme } = config;

  return (
    <section className="py-16 sm:py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Cột trái: Thông tin liên hệ */}
            <div className="p-10 sm:p-16 lg:p-20 text-white">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
                Bạn cần tư vấn chi tiết?
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Đừng ngần ngại liên hệ với đội ngũ của <span className="font-semibold text-white">{brand.name}</span>. Chúng tôi luôn sẵn sàng hỗ trợ bạn lựa chọn sản phẩm phù hợp nhất.
              </p>

              <div className="space-y-6">
                {/* Điện thoại */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hotline / Zalo</p>
                    <p className="text-xl font-bold">{contact.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email hỗ trợ</p>
                    <p className="text-lg font-medium">{contact.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Nút hành động nhanh */}
            <div className="p-10 sm:p-16 flex flex-col justify-center items-center bg-gray-800 border-t lg:border-t-0 lg:border-l border-gray-700">
              <div className="w-full max-w-sm space-y-4">
                <a
                  href={contact.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: theme.primaryColor }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 text-white font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all text-lg"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 5.58 2 10c0 2.5 1.43 4.7 3.67 6.07C5.35 17.5 4.5 19.5 4.5 19.5s2.5-.5 4.5-2.25c.95.27 1.96.42 3 .42 5.52 0 10-3.58 10-8s-4.48-8-10-8zm0 12c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm0-6c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1-.45 1-1 1z" />
                  </svg>
                  Chat ngay qua Zalo
                </a>

                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 active:scale-95 transition-all text-lg"
                >
                  Gọi Hotline trực tiếp
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}