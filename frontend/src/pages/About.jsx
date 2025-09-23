import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Welcome to our e-commerce platform, where convenience meets quality. 
                  We are committed to providing customers with a seamless shopping experience 
                  by offering a wide range of carefully selected products to fit every lifestyle. 
                  From the latest trends to everyday essentials, our mission is to make online 
                  shopping simple, secure, and enjoyable.</p>
              <p>Beyond just products, we value trust, transparency, and customer satisfaction. 
                  Our team works tirelessly to ensure fast delivery, reliable service, and continuous 
                  innovation to meet the ever-changing needs of our customers. With us, you don’t just 
                  shop—you become part of a community that prioritizes value, quality, and excellence.</p>
                <b className='text-gray-800'>Our Mission</b>
                <p>Our mission is to redefine online shopping by delivering high-quality products at 
                    affordable prices while ensuring a smooth, secure, and enjoyable experience for every 
                    customer. We are dedicated to building trust through excellent service, fast delivery, 
                    and a commitment to customer satisfaction—making shopping not just convenient, but 
                    truly rewarding.</p>
          </div>
      </div>

      <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Quality Assurance:</b>
              <p className='text-gray-600'>We are committed to offering only the finest products that meet strict quality standards. 
                  Every item in our collection is carefully selected and thoroughly checked to ensure 
                  durability, comfort, and style. Our goal is to provide you with products you can trust, 
                  giving you peace of mind with every purchase.</p>
          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Convenience:</b>
              <p className='text-gray-600'>Shopping with us is designed to be simple and hassle-free. From an easy-to-navigate 
                  website to secure payment options and fast delivery, we make sure your experience is 
                  smooth from start to finish. Enjoy the comfort of shopping anytime, anywhere, at your 
                  convenience.</p>
          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Exceptional Customer Service:</b>
              <p className='text-gray-600'>We go beyond simply selling products by building lasting relationships with our customers. 
                  Our team is committed to providing personalized assistance, timely responses, and seamless 
                  support to make every shopping experience smooth and enjoyable. Your satisfaction is always 
                  our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
