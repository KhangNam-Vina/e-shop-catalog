import React, { useState } from 'react';
import products from '../data/products.json';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import config from '../data/config.json';

export default function ProductGrid() {
  const { theme } = config;
  // State để lưu sản phẩm đang được chọn xem chi tiết
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section id="product-grid" className="py-16 sm:py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Danh Mục Sản Phẩm
          </h2>
          <div 
            className="w-16 h-1.5 mx-auto rounded-full mb-6"
            style={{ backgroundColor: theme.primaryColor }}
          ></div>
          <p className="text-base sm:text-lg text-gray-500">
            Tổng hợp các dòng sản phẩm chất lượng cao, đa dạng kích thước và mẫu mã, đáp ứng mọi nhu cầu sử dụng của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              // Khi click, truyền dữ liệu sản phẩm đó vào state
              onViewDetail={() => setSelectedProduct(product)} 
            />
          ))}
        </div>

      </div>

      {/* Gọi Component Modal ra, chỉ hiển thị khi có selectedProduct */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}