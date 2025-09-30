import React, { useEffect, useState } from 'react'

const List = () => {

    const [list,setList] = useState([])

    const fetchList = async()=>{
        try {
            
            const response = await axios.get(backendURL + '/api/product/list')
            console.log(response.data);

        } catch (error) {
            
        }
    }

    useEffect(()=>{
        fetchList()
    },[])


  return (
    <div>
      
    </div>
  )
}

export default List
