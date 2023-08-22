import React from 'react'

function SetButton() {
  return (
    <div>
        <button 
            className={" bg-priBlue text-white rounded-md md:rounded-lg px-5 md:font-bold py-2 md:px-10 md:py-4 md:hover:bg-blue-500 " }
        >
            Set ID
        </button>
    </div>
  )
}

export default SetButton