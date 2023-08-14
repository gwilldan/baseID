import React, {useState} from 'react'
import { Background } from '../Assets'
import { InputField, DisplayCard } from '../Components'
import { motion } from "framer-motion"

function HomePage() {

  const [toggle, setToggle] = useState(false)
  const [searchedName, setSearchedName] = useState("")

  // animation controls
  const animVariant = {
    begin: {
      opacity: 0,
      y: -20
    },

    end: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren"
      }
    },

  }

  const childVariant = {

    begin: {
      opacity: 0,
      y: -20
    },

    end: {
      opacity: 1,
      y: 0,
    },

  }

  return (
    <motion.div
      variants={animVariant}
      initial = "begin"
      animate = "end"
      transition = "transit"

    className=' mt-[90px] md:mt-[130px] px-small md:px-[40px] lg:px-Large rounded-sm'>
      <div className=' max-w-[700px] '>
        <motion.p className=' text font-extrabold text-3xl md:text-7xl mb-2'>Your Base identity <br /> Starts Here</motion.p>
        <motion.p variants={childVariant} className=' font-normal md:text-lg '>Secure your base domain as you navigate through the Base ecosystem</motion.p>
      </div>
      
      <motion.div variants={childVariant}>
        <InputField toggle={toggle} setToggle={setToggle} setSearchedName={setSearchedName}/>
      </motion.div>

      {
        toggle && <DisplayCard toggle={toggle} setToggle={setToggle} searchedName = {searchedName} />
      }
      
      

    </motion.div>
  )
}

export default HomePage