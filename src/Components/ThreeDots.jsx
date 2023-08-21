import React from 'react'
import {BsThreeDots} from "react-icons/bs"

function ThreeDots({domainName, }) {

  return (
    <div>
        <button 
            key={domainName}
            className=" bg-priBlue rounded-md md:rounded-lg
             text-white px-5 md:font-bold py-2 md:px-10 md:py-4 md:hover:bg-blue-500 "
            onClick={changeColor}
        >
            <BsThreeDots />
        </button>
    </div>
  )
}

export default ThreeDots