import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendURL } from '../App'
import { toast } from 'react-toastify'

const List = () => {

    const [list,setList] = useState([])

    const fetchList = async () => {
        try {
            
            const response = await axios.get(backendURL + '/api/product/list')
            if (response.data.success) {
              setList(response.data.products);
            } else {
              toast.error(response.data.message)
            }
            

        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }

    useEffect(()=>{
        fetchList()
    },[])


  return (
    <>
      <p className='mb-2'>All products List</p>
      <div>
        {/* ------------------------List Table Title----------- */}
        
        <div>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
      </div>
    </>
  )
}

export default List
