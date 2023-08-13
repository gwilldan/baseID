import React, {useState} from 'react'
import {FiSearch} from "react-icons/fi"



function InputField() {

    const [Name, setName] = useState("")
    console.log(Name)

  return (
    <div className=' h-14 md:h-16 justify-between bg-white 
        mt-6 flex
    '>
        <input type="text" 
            className=' focus:outline-none md:text-xl w-[80%] px-5 flex items-center'
            placeholder=' Search Base names' 
            onChange={(event) => setName(event.target.value)}
        />
        <div className=' flex items-center justify-between gap-2 px-2 md:px-3'>
            <p className=' md:mr-4 md:text-xl'>.base</p>
            <button className='hover:scale-[1.2] text-priBlue hover:text-priBlack hover:duration-75 hover:ease flex justify-center items-center'><FiSearch className=' md:text-3xl text-2xl'/></button>
        </div>
    </div>
  )
}

export default InputField