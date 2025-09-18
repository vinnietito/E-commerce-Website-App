import React from 'react'

const NewsletterBox = () => {
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Join our mailing list to receive exclusive deals, 
            style inspiration, and updates on our latest arrivals. Be 
            the first to know about special offers and seasonal collections!
        </p>
        <form>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
        </form>
    </div>
  )
}

export default NewsletterBox
