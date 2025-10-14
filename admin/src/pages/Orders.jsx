import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendURL } from '../App'
import {toast} from 'react-toastify'

const Orders = ({token}) => {

  const [Orders,setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backendURL + '/api/order/list', {}, { headers: { token }})
      if (response.data.success) {
        setOrders(response.data.Orders)
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    fetchAllOrders();
  },[token])

  return (
    <div>
      
    </div>
  )
}

export default Orders
