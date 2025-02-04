// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom';

// const ProductItem = ({id,image,name,price}) => {

//     const {currency} = useContext(ShopContext);

//   return (
//     <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
//         <div className='overflow-hidden'>
//             <img 
//             className='hover:scale-110 transition ease-in-out'
//             src={image[0]} alt="" />
//             <p className='pt-3 pb-1 text-sm'>
//                 {name}</p>
//             <p className='text-sm font-medium'>{currency}{price}</p>
//         </div>
//     </Link>
//   )


// export default ProductItem


import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, originalPrice }) => {
  const { currency, setSearch, showsearch, setShowSearch } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate discount percentage
  const calculateDiscount = (originalPrice, price) => {
    if (originalPrice > 0 && price < originalPrice) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  };

  const discountPercentage = calculateDiscount(originalPrice, price);

  useEffect(() => {
    // Simulate a 2-second loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="border rounded-lg shadow-md p-4 w-full sm:w-60 h-80 animate-pulse flex flex-col items-center">
        <div className="h-40 w-full bg-gray-300 rounded-t-lg"></div>
        <div className="mt-3 h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <Link
      to={`/product/${id}`}
      className="block text-gray-700 cursor-pointer transition-transform transform hover:scale-105"
    >
      <div className="w-full sm:w-60 h-80 lg:w-full overflow-hidden border rounded-lg shadow-md hover:shadow-lg flex flex-col">
        {/* Image Section */}
        <div className="h-40 w-full overflow-hidden">
          <img
            className="hover:scale-110 transition-transform ease-in-out w-full object-cover rounded-t-lg"
            src={image[0]}
            alt={name}
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          {/* Product Name */}
          <p className="text-sm font-bold text-gray-800 truncate">{name}</p>

          {/* Price and Discount */}
          <div className="flex items-center space-x-2">
            <p className="text-sm font-bold text-red-600">{currency}{price}</p>
            {originalPrice && (
              <p className="text-sm text-gray-500 line-through">{currency}{originalPrice}</p>
            )}
            {discountPercentage > 0 && (
              <p className="text-sm font-bold text-green-600">{discountPercentage}% off</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
