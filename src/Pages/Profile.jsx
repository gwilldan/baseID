import React from 'react'
import {animVariant, childVariant} from "../utils/anim"
import {motion} from 'framer-motion'

function Profile() {
  return (
    <motion.div
      variants={animVariant}
      initial="begin"
      animate="end"
      transition="transit"
      className=" mt-[90px] md:mt-[130px] px-small md:px-[40px] lg:px-Large rounded-sm"
    >

        <div>
            I'M THE PROFILE PAGE
        </div>

    </motion.div>
  )
}

export default Profile