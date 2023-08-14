import React from 'react'
import {AiFillWarning} from "react-icons/ai"

function Switch() {
  return (
    <div>
        <button className=' text-sm text-red-600 flex items-center font-bold gap-1'>
            <AiFillWarning className=' text-3xl' /> 
            <p>
            SWITCH <br /> NETWORK
            </p>
        </button>
    </div>
  )
}

export default Switch