import { BiSolidWallet } from "react-icons/bi";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { shortenAddress } from "../utils/helper";

function Button() {
  const { address, isConnected } = useAccount();
  // const { data: ensName } = useEnsName({ address });
  const { connect, connectors } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect({
    onError(error) {
      console.log(error);
    },
  });

  const butStyles =
    "  hover:bg-blue-500 active:bg-priBlue bg-priBlue text-white text-small px-3 py-3 border-none rounded-lg";

  return (
    <div>
      {!isConnected ? (
        <button
          className={`${butStyles} font-normal text-sm`}
          onClick={() => connect({ connector: connectors[0] })}
        >
          CONNECT WALLET
        </button>
      ) : (
        isConnected && (
          <button
            className={`${butStyles} px-6 py-3  border-2 border-solid border-[#17338F] rounded-bl-full flex gap-4 items-center`}
            onClick={() => disconnect()}
          >
            <BiSolidWallet fontSize={24} />
            {shortenAddress(address)}
          </button>
        )
      )}
    </div>
  );
}

export default Button;
