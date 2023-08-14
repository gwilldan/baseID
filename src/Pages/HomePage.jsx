import React from 'react'
import { Background } from '../Assets'
import { InputField } from '../Components'

function HomePage() {


  //GROUP STYLING FOR DISPLAY CARD
  const cardStyle = "border-b border-[#17338F] py-4 md:border-none"
  const dataStyle = "text-lg font-bold" 

  return (
    <div className=' mt-[90px] md:mt-[130px] px-small md:px-[40px] lg:px-Large rounded-sm'>
      <div className=' max-w-[700px] '>
        <p className=' text font-extrabold text-3xl md:text-7xl mb-2'>Your Base identity <br /> Starts Here</p>
        <p className=' font-normal md:text-lg '>Secure your base domain as you navigate through the Base ecosystem</p>
      </div>
      
      <InputField />

      <div className = {`md:h-[75px] rounded-3xl my-6 px-2 pb-5 md:p-5 bg-lightBlue flex flex-col md:flex-row md:justify-between md:items-center`}>
        
        <div className={cardStyle}>
          <p className={dataStyle}>Billy.base</p>
          <p className=' text-green-600'>Available</p>
        </div>

        <div className={cardStyle}>
          <div className=" flex items-center">
            <button>-</button>
            <p className={dataStyle}>1 year</p>
            <button>+</button>
          </div>
          <p>Registration Period</p>
        </div>

        <div className={`${cardStyle}  border-none`}>
          <p className={dataStyle}>0.02eth</p>
          <p>Registration Price</p>
        </div>

        <button className=' md:w-[200px] rounded-2xl font-semibold h-12 bg-priBlue text-white'>
          Register
        </button>
      </div>
    </div>
  )
}

export default HomePage