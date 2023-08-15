import React, {useState, useEffect} from 'react'
import { Logo } from '../Assets'
import {Button, Switch} from "../Components"
import {FiMoon, FiSun} from "react-icons/fi"

function Nav() {

  const [theme, setTheme] = useState("light")
  useEffect(() => {
    if(theme === "dark"){
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])


  return (
    <div 
    className=' h-[100px] border-b border-priBlue flex justify-between pt-[40px] px-small md:px-[40px] lg:px-Large
        pb-small 
    '
    >
        <div className=' flex items-center'>
        <img src={Logo} alt="logo" className=" md:h-8 " />
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