import React, { useContext } from 'react'

const LatestCollection = () => {

    const { products } = useContext(ShopContext);

    console.log(products);

  return (
    <div>
      
    </div>
  )
}

export default LatestCollection
