import PropTypes from "prop-types";
import { useAccount, useDisconnect } from "wagmi";
import { BiSolidWallet } from "react-icons/bi";

import { shortenAddress } from "../utils/helper";
import { getUserSelectedName } from "../contract-artifacts/utils/helpers";
import { useEffect, useState } from "react";

function Button({ setModalToggle }) {
  const { address, isConnected } = useAccount();
  const [domainNames, setDomainNames] = useState("");

  getUserSelectedName(address);
  const { disconnect } = useDisconnect({
    onError(error) {
      console.log(error);
    },
  });

  // console.log();

  useEffect(() => {
    const fetchDomainNames = async () => {
      setDomainNames(await getUserSelectedName(address));
    };
    address && fetchDomainNames();
  }, [address]);

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
            className={`${butStyles}  px-6 py-3  border-2 border-solid border-[#17338F] rounded-bl-full flex gap-4 items-center`}
            onClick={handleConnectButton}
          >
            <BiSolidWallet fontSize={24} />
            {domainNames[0]?.toUpperCase() || shortenAddress(address)}
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
