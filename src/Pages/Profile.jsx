import { useEffect, useState } from "react";
import { useAccount, useConnect, useContractRead, useNetwork } from "wagmi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { BsFillInfoSquareFill } from "react-icons/bs";

import { getUserDomainNames } from "../contract-artifacts/utils/helpers";
import { abi } from "../contract-artifacts/abi";
import { animVariant } from "../utils/anim";
import { parseError } from "../utils/helperFunctions";

function Profile() {
  const { address, isConnected } = useAccount();
  const [domains, setDomains] = useState(null);
  const { connect, connectors, error, isError } = useConnect();
  const { chain } = useNetwork();

  const { data: domainName } = useContractRead({
    address: import.meta.env.VITE_CA,
    abi,
    functionName: "getAssociatedName",
    args: [address],
  });

  useEffect(() => {
    const getAllDomains = async () => {
      try {
        const domains = await getUserDomainNames(address, {
          selectedName: domainName,
          chainId: chain.id,
          network: chain.network,
        });
        console.log(domains);

        setDomains(domains);
      } catch (err) {
        err.response.status === 404 && setDomains([]);
      }
    };
    getAllDomains();
  }, [address, chain]);

  //   console.log(domains);

  useEffect(() => {
    !isConnected && connect({ connector: connectors[0] });
    isError && toast.error(parseError(error));
  }, []);

  return (
    <motion.div
      variants={animVariant}
      initial="begin"
      animate="end"
      transition="transit"
      className=" mt-[70px] md:mt-[100px] px-small md:px-[40px] lg:px-Large rounded-sm"
    >
      <p
        className=" --accent-color text font-extrabold text-3xl md:text-7xl 
        mb-2"
      >
        Profile
      </p>
      <div className=" border-b border-b-priBlue mb-4 md:mb-8">
        <p
          className="  w-max text-priBlue md:font-bold text-lg md:text-2xl 
            border-b-2 border-b-priBlue"
        >
          Domains
        </p>
      </div>
      {domains !== null &&
        isConnected &&
        domains?.length > 0 &&
        domains?.map((i) => (
          <div
            key={i._id}
            className=" flex items-center justify-between mb-4 md:mb-8 
                    bg-secondary-color p-5 md:py-7 md:px-5 md:h-[95px] shadow-md"
          >
            <div>
              <p
                className={` ${
                  i.domainName === `${domainName}.smt` && "font-bold"
                } md:text-2xl`}
              >
                {i.domainName}
              </p>
            </div>
            {i.domainName === `${domainName}.smt` ? (
              <p className="background-text text-bold text-xl">SELECTED</p>
            ) : (
              <button
                className=" bg-priBlue rounded-md md:rounded-lg
                     text-white px-5 md:font-bold py-2 md:px-10 md:py-4 md:hover:bg-blue-500 "
              >
                Set Control
              </button>
            )}
          </div>
        ))}
      {!isConnected && (
        <div
          className=" text-red-500 flex gap-2 items-center
      font-semibold md:text-lg"
        >
          <BsFillInfoSquareFill className=" md:text-lg text-red-500" />
          Connect Wallet
        </div>
      )}
      {isConnected && domains !== null && domains?.length === 0 && (
        <div>
          <p className=" md:text-xl mb-4 md:mb-8">No linked Wallet ID </p>
          <Link
            to="/"
            className=" bg-priBlue py-2 md:py-4 px-4 md:px-6 md:text-xl 
            font-bold text-white md:hover:bg-blue-500 rounded-md "
          >
            Mint ID
          </Link>
        </div>
      )}
    </motion.div>
  );
}

export default Profile;
