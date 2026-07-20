import React, { useState } from 'react';
import products from '../data/products.json';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import config from '../data/config.json';

export default function ProductGrid() {
  const { theme } = config;
  
  // State để lưu sản phẩm đang xem chi tiết
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // State mới: Lưu trữ Tab danh mục đang được chọn (Mặc định là xem 'Tất Cả')
  const [activeTab, setActiveTab] = useState('all'); // Các giá trị: 'all', 'lap-ghep', 'co-dinh'

  // Logic phân loại: Lọc danh sách sản phẩm dựa trên tên sản phẩm và Tab đang chọn
  const filteredProducts = products.filter((product) => {
    if (activeTab === 'all') return true;
    
    // Chuyển tên sản phẩm về chữ thường để tìm kiếm cho chính xác
    const productName = product.name.toLowerCase();
    
    if (activeTab === 'lap-ghep') return productName.includes('lắp ghép');
    if (activeTab === 'co-dinh') return productName.includes('cố định');
    
    return true;
  });

  return (
    <section id="product-grid" className="py-16 sm:py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Phần Tiêu đề */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
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

        {/* BỘ LỌC DANH MỤC (TABS) */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
          <button
            onClick={() => setActiveTab('all')}
            style={activeTab === 'all' ? { backgroundColor: theme.primaryColor, color: 'white', borderColor: theme.primaryColor } : { color: '#4B5563', borderColor: '#E5E7EB' }}
            className={`px-6 py-2.5 rounded-full font-bold text-sm sm:text-base border-2 transition-all duration-300 ${activeTab === 'all' ? 'shadow-md scale-105' : 'hover:border-gray-300 hover:bg-gray-50'}`}
          >
            Tất Cả Sản Phẩm
          </button>
          
          <button
            onClick={() => setActiveTab('co-dinh')}
            style={activeTab === 'co-dinh' ? { backgroundColor: theme.primaryColor, color: 'white', borderColor: theme.primaryColor } : { color: '#4B5563', borderColor: '#E5E7EB' }}
            className={`px-6 py-2.5 rounded-full font-bold text-sm sm:text-base border-2 transition-all duration-300 ${activeTab === 'co-dinh' ? 'shadow-md scale-105' : 'hover:border-gray-300 hover:bg-gray-50'}`}
          >
            Hộp Cố Định
          </button>
          
          <button
            onClick={() => setActiveTab('lap-ghep')}
            style={activeTab === 'lap-ghep' ? { backgroundColor: theme.primaryColor, color: 'white', borderColor: theme.primaryColor } : { color: '#4B5563', borderColor: '#E5E7EB' }}
            className={`px-6 py-2.5 rounded-full font-bold text-sm sm:text-base border-2 transition-all duration-300 ${activeTab === 'lap-ghep' ? 'shadow-md scale-105' : 'hover:border-gray-300 hover:bg-gray-50'}`}
          >
            Hộp Lắp Ghép
          </button>
        </div>

        {/* LƯỚI SẢN PHẨM ĐÃ ĐƯỢC LỌC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10 min-h-[400px]">
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-[fadeIn_0.4s_ease-out]">
              <ProductCard 
                product={product} 
                onViewDetail={() => setSelectedProduct(product)} 
              />
            </div>
          ))}

          {/* Cảnh báo nếu không có sản phẩm nào trong Tab (phòng hờ dữ liệu lỗi) */}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500 font-medium">
              Hiện chưa có sản phẩm nào trong danh mục này.
            </div>
          )}
        </div>

      </div>

      {/* Gọi Component Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}