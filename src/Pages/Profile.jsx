import React from 'react'
import {animVariant} from "../utils/anim"
import {motion} from "framer-motion"


function Profile() {

    //just dummy data to help me build the UI
    const domains = [
        {
            id: 1,
            domain: "Okon",
            record: "Record for Okon",
            controller: true
        },
        {
            id: 2,
            domain: "Atim",
            record: "Record for Atim",
            controller: false
        },
        {
            id: 3,
            domain: "David",
            record: "Record for David",
            controller: false
        }
    ]

  return (
    <motion.div
      variants={animVariant}
      initial="begin"
      animate="end"
      transition="transit"
      className=" mt-[70px] md:mt-[100px] px-small md:px-[40px] lg:px-Large rounded-sm"
    >

        <p className=' --accent-color text font-extrabold text-3xl md:text-7xl 
        mb-2'
        >
            Profile
        </p>
        <div className=' border-b border-b-priBlue mb-4 md:mb-8'>
            <p className='  w-max text-priBlue md:font-bold text-lg md:text-2xl 
            border-b-2 border-b-priBlue'
            >
                Domains
            </p>
        </div>

        {
            domains.map((i) => (
                <div className=' flex items-center justify-between mb-4 md:mb-8 
                    bg-secondary-color p-5 md:py-7 md:px-5 md:h-[95px] shadow-md' 
                >
                    <div>
                        <p className={` ${i.controller && 'font-bold'} md:text-2xl`}>{i.domain}.base</p>
                        {
                            i.controller && <p className=' text-red-500 text-sm md:text-2xl`'>ID Controller</p>
                        }
                    </div>
                    <button className=' bg-priBlue rounded-md md:rounded-lg
                     text-white px-5 md:font-bold py-2 md:px-10 md:py-4 md:hover:bg-blue-500 '
                    >
                        Set Control
                    </button>
                </div>
            ))
        }
        
    </motion.div>
  )
}

export default Profile