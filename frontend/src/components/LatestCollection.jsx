import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext' // <-- don’t forget to import

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
      </div>
    </div>
  )
}

export default LatestCollection
