import React, {useRef} from 'react'
import {Metamask, Logo} from "../Assets"

function WalletConnect({modalToggle, setModalToggle, setOpen}) {

    const WalletList = [
        {
            id: 1,
            name: "Metamask",
            img: <img src={Metamask} />,
            text: "Connect to Metamask wallet"
        },

        {
            id: 2,
            name: "Coinbase",
            img: <img src={Metamask} />,
            text: "Connect to Coinbase wallet"
        },

        {
            id: 3,
            name: "Trust Wallet",
            img: <img src={Metamask} />,
            text: "Connect to Trust wallet"
        },

        {
            id: 4,
            name: "Wallet Connect",
            img: <img src={Metamask} />,
            text: "Connect to Wallet Connect"
        },
    ]

    const connectClick = () => {
        // connect to their respective wallet connector
        setModalToggle(false)
        setOpen(false)
    }



  return (
    <div onClick={() => setModalToggle(false)} className={`${modalToggle ? "block" : "hidden" } z-[60] grid w-screen h-screen absolute 
    backdrop-blur-sm border-none `}
    >
        <div className='  grid md:grid-cols-2 place-self-center 
            h-[570px] w-[350px] md:h-[340px] md:w-[600px] border-none
            bg-white'
        >
            {WalletList.map((i) => (
                <button key={i.id}
                    className=' hover:bg-slate-100 flex gap-1 flex-col 
                    justify-center items-center'
                    onClick={connectClick}
                >
                    <div>{i.img}</div>
                    <div className=' text-xl font-bold'>{i.name}</div>
                    <div>{i.text}</div>
                </button>
            ))}
        </div>
    </div>
  )
}

export default WalletConnect