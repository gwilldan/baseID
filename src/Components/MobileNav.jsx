import React from 'react'
import {motion} from "framer-motion"
import {Button} from "../Components"
import { NavLink } from 'react-router-dom'

function MobileNav({setOpen, modalToggle, setModalToggle }) {


  return (
    <div 
        initial = {{
        }}
        className=' dark:bg-priBlack bg-secBlue h-[70px] flex items-center justify-evenly'
    >
        <NavLink onClick={() => setOpen(false)} className={`dark:text-white`} to="./">Home</NavLink>
        <NavLink onClick={() => setOpen(false)}  className={`dark:text-white`} to="./Profile">Profile</NavLink>
        <Button modalToggle={modalToggle} setModalToggle={setModalToggle}/>
    </div>
  )
}

export default MobileNav