import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
      <p className="text-gray-500 mb-2">{product.category}</p>
      <p className="font-bold text-green-600 mb-2">${product.price}</p>
      <p className="text-yellow-500">⭐ {product.rating}</p>
    </div>
  );
};

export default ProductCard;
