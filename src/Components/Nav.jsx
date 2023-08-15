import React from 'react'
import { Logo, LogoDark } from '../Assets'
import {Button} from "../Components"
import {FiMoon, FiSun} from "react-icons/fi"

function Nav({theme, setTheme}) {

  return (
    <div 
    className=' h-[100px] border-b border-priBlue flex justify-between pt-[40px] px-small md:px-[40px] lg:px-Large
        pb-small 
    '
    >
        <div className=' flex items-center'>
        <img src={theme === "light" ? Logo : LogoDark} alt="logo" className=" md:h-8 " />
        </div>
        <div className=' flex gap-4 items-center'>
            <button className='' onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              { theme === "light" ? <FiMoon className=' text-2xl' /> : <FiSun className=' text-2xl text-white' />} 
            </button>
          {/* { 
            <Switch />
          } */}
            <Button />
        </div>
    </div>
  )
}

export default Nav