import React from 'react'
import {BsThreeDots} from "react-icons/bs"

function ThreeDots({setID, setOpen, isOpen, cardID }) {

  const butt = (cardID) => {
    setID(cardID);
    setOpen(!isOpen)
  }

  return (
    <div>
        <button 
            className={" rounded-md md:rounded-lg text-accent-color px-5 md:font-bold py-2 md:px-10 md:py-4 hover:scale-125 ease-in-out hover:text-priBlue" }
            onClick={() => butt(cardID)}
        >
            <BsThreeDots className=' md:text-2xl'/>
        </button>
    </div>
  )
}

export default ThreeDots