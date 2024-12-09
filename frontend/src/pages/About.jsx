import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={"ABOUT"} text2={"US"}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 tet-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nostrum voluptatum placeat deleniti iure provident harum minus odio eaque unde?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse et animi maiores in, cum inventore aliquam veniam consequatur ea reiciendis?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet quos inventore beatae voluptates magnam eos magni distinctio laborum quo fugit?Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, placeat veniam obcaecati, doloribus quo, odio repellat voluptatibus molestiae a aperiam eius ratione nesciunt asperiores iure quae dignissimos harum sequi sed vel quam dolorem repellendus. Temporibus doloribus voluptate, veritatis nam nesciunt cum ut, ducimus voluptatum consequatur laboriosam quos animi. Ab, qui.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, ut vitae. Alias, velit dolor. Corrupti incidunt cum aliquid doloremque atque?</p>
        </div>
      </div>
      <div className='text-xl py-4'>
          <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, provident tempore? Praesentium labore eum qui.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, provident tempore? Praesentium labore eum qui.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, provident tempore? Praesentium labore eum qui.</p>
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  )
}

export default About