import React, {useState, useEffect} from 'react'
// import { Web3Button } from '@web3modal/react'

import { useAccount, useConnect, useEnsName, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Button() {

    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect({
        onError(error) {
            console.log(error)
        }
    })

    if (isConnected) {
        const _add = address
        const add = _add.slice(0, 6) + "..." + _add.slice(38, 42)
        return add
    }

    const butStyles = " bg-priBlue text-white  md:text-small px-2 py-2 md:px-3 md:py-3 border-none rounded-lg"

  return (
    <div>
        {
            !isConnected && <button className={`${butStyles} font-normal text-sm`}
            onClick={() => connect()}
            >CONNECT WALLET</button>
            ||
            isConnected && <button className={butStyles} 
            onClick={() => disconnect()}>
                {add}
            </button>
        }
    </div>
  )
}

export default Button