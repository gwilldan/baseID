import React from 'react'
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from "react-icons/ai"
import {motion} from "framer-motion"

function DisplayCard({toggle, setToggle, searchedName}) {
  
  //GROUP STYLING FOR DISPLAY CARD
  const cardStyle = "border-b border-[#17338F] py-4 md:border-none"
  const dataStyle = "text-lg font-bold" 
  
  const animVariant = {
    start: {
      opacity: 0,
      y: -40
    },

    stop: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10
      }
    }
  }

  return (
    <motion.div 
        initial = "start"
        animate = "stop"
        variants={animVariant}
        className = {` md:h-[75px] rounded-3xl my-6 px-2 pb-5 md:p-5 bg-lightBlue flex flex-col md:flex-row md:justify-between md:items-center`}>
        
        <div className={cardStyle}>
          <p className={dataStyle}>{searchedName}.base</p>
          <p className=' text-green-600'>Available</p>
        </div>

        <div className={cardStyle}>
          <div className=" flex items-center gap-2">
            <button className=' text-priBlue text-xl'><AiOutlineMinusCircle /></button>
            <p className={dataStyle}>{1} Year</p>
            <button><AiOutlinePlusCircle className=' text-priBlue text-xl' /></button>
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
    </motion.div>
  )
}

export default DisplayCard