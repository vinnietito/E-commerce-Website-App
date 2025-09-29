import React from 'react'

const Login = () => {
  return (
    <div>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='youremail@gmail.com' required/>
                </div>
                <div>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your Password' required/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
      
    </div>
  )
}

export default Login
