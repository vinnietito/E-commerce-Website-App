import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendURL } from '../App'

const Orders = ({token}) => {

  const [Orders,setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post()
      
    } catch (error) {
      
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
