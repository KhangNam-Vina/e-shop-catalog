import React from 'react';
import config from '../data/config.json';

export default function Footer() {
  const { brand, contact } = config;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="text-center md:text-left">
          <p className="text-lg font-bold text-gray-900 mb-1">{brand.name}</p>
          <p className="text-sm text-gray-500">
            © {currentYear} Bản quyền thuộc về E-Shop. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href={contact.website} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
            Website Chính
          </a>
          <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
            Facebook
          </a>
          <a href="#product-grid" className="hover:text-gray-900 transition-colors">
            Sản phẩm
          </a>
        </div>

      </div>
    </footer>
  );
}