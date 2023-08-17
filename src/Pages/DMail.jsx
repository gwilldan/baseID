import React from 'react'
import {animVariant, childVariant} from "../utils/anim"
import {motion} from 'framer-motion'
import {envelope} from "../Assets"

function DMail() {
  return (
    <motion.div
      variants={animVariant}
      initial="begin"
      animate="end"
      transition="transit"
      className=" mt-[70px] md:mt-[130px] px-small md:px-[40px] lg:px-Large rounded-sm"
    >

        <div className=' md:flex gap-5'>
            <div className=' md:mt-[30px] md:h-[350px] max-w-[650px]: bg-secondary-color py-10 px-5' >
              <h1 className='  --accent-color text font-extrabold text-3xl md:text-7xl mb-2'>Harness your ID <br /> with D-Mail</h1>
              <p className='text-left mt-6 font-normal md:text-xl '>
                "Introducing our Blockchain Mail Service, where secure identities from our Blockchain Name Service converge with encrypted communications to ensuring your messages are safe and trusted."
              </p> 
            </div>
            
            <img src={envelope} alt="envelope" className=' animate-bounce duration-10 md:h-[400px] md:mt-[50px] h-[300px]' />
        </div>

    </motion.div>
  )
}

export default DMail