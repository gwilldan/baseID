import React, {useState} from 'react'
import { Logo } from '../Assets'
import {Button, Switch} from "../Components"
import {FiMoon} from "react-icons/fi"

function Nav() {

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
            <button className=''><FiMoon className=' text-2xl' /></button>
          { 
            <Switch />
          }
            <Button />
        </div>
    </div>
  )
}

export default Nav