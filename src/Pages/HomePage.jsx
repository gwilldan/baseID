import React from 'react'
import { Background } from '../Assets'
import { InputField } from '../Components'

function HomePage() {
  return (
    <div className=' mt-[130px] px-small md:px-Large rounded-sm'>
      <div className=' max-w-[700px] '>
        <p className=' text font-extrabold text-3xl md:text-7xl mb-2'>Your Base identity <br /> Starts Here</p>
        <p className=' font-normal md:text-lg '>Secure your base domain as you navigate through the Base ecosystem</p>
      </div>
      
      <InputField />
    </div>
  )
}

export default HomePage