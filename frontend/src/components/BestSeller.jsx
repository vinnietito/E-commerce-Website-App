import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    //if (!products || !products.length) return
    // NOTE: your data uses `bestseller` (lowercase) — use that
    const bestProduct = products.filter((item) => (item.bestseller));
    setBestSeller(bestProduct.slice(0, 5))
  }, [products]) // run whenever products changes

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our most loved products, hand-picked by our customers. These top-rated items
          combine style, quality, and value — making them must-haves in every collection.
        </p>
      </div>

      {/* Render Best Seller Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            // pass a string src (handle both [img] or img)
            image={Array.isArray(item.image) ? item.image[0] : item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
