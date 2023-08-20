import PropTypes from "prop-types";
import { useAccount, useContractRead, useDisconnect, useNetwork } from "wagmi";
import { BiSolidWallet } from "react-icons/bi";

import { shortenAddress } from "../utils/helperFunctions";
import { abi } from "../contract-artifacts/abi";
import useCurrentNetwork from "../Hooks/useCurrentNetwork";

function Button({ setModalToggle }) {
  const { address, isConnected } = useAccount();
  const { network } = useCurrentNetwork();
  const { chain } = useNetwork();

  const { disconnect } = useDisconnect({
    onError(error) {
      console.log(error);
    },
  });

  const { data: domainName } = useContractRead({
    address: import.meta.env.VITE_CA,
    abi,
    functionName: "getAssociatedName",
    args: [address],
  });

  const handleConnectButton = () => {
    if (isConnected) {
      disconnect();
    } else {
      setModalToggle(true);
    }
  };

  const butStyles =
    "  hover:bg-blue-500 active:bg-priBlue bg-priBlue text-white text-small px-3 py-3 border-none rounded-lg";

  return (
    <div>
      {!isConnected ? (
        <button
          className={`${butStyles} font-normal text-sm`}
          // onClick={() => connect({ connector: connectors[0] })}
          onClick={handleConnectButton}
        >
          CONNECT WALLET
        </button>
      ) : (
        isConnected && (
          <button
            className={`${butStyles}  px-6 py-3  border-2 border-solid border-[#17338F] rounded-bl-full flex gap-4 items-center ${
              domainName === undefined && "bg-[#e11e09] hover:bg-[#f00606]"
            }`}
            onClick={handleConnectButton}
          >
            <BiSolidWallet fontSize={24} />
            {`${
              domainName !== undefined
                ? domainName?.toUpperCase() + ".SMT"
                : chain.network !== network
                ? "Wrong Network"
                : shortenAddress(address)
            }` || shortenAddress(address)}
          </button>
        )
      )}
    </div>
  );
}

Button.propTypes = {
  setModalToggle: PropTypes.func,
};

export default Button;
