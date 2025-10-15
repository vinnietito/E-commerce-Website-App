import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendURL } from '../App'
import {toast} from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({token}) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backendURL + '/api/order/list', {}, { headers: { token }})
      if (response.data.success) {
        setOrders(response.data.orders)
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
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                {order.items.map((item,index) => {
                  if (index === order.items.length - 1) {
                    return <p key={index}> { item.name } X {item.quantity} <span> {item.size}</span></p>
                  } else {
                    return <p key={index}> { item.name } X {item.quantity} <span> {item.size}</span> ,</p>
                  }
                })}
              </div>
              <p>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + " ," }</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode }</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
