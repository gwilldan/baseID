import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { getUserDomainNames } from "../contract-artifacts/utils/helpers";
import { animVariant } from "../utils/anim";
import { parseError } from "../utils/helper";

function Profile() {
  const { address, isConnected } = useAccount();
  const [domains, setDomains] = useState(null);
  const { connect, connectors, error, isError } = useConnect();

  useEffect(() => {
    const getAllDomains = async () => {
      const domains = await getUserDomainNames(address, {
        selectedName: "Prince",
      });
      setDomains(domains);
    };
    getAllDomains();
  }, [address]);

  useEffect(() => {
    !isConnected && connect({ connector: connectors[0] });
    console.log(error, isError);
    isError && toast.error(parseError(error));
  }, [connect, connectors, isConnected]);

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
        domains.length > 0 &&
        domains?.map((i) => (
          <div
            key={i.id}
            className=" flex items-center justify-between mb-4 md:mb-8 
                    bg-secondary-color p-5 md:py-7 md:px-5 md:h-[95px] shadow-md"
          >
            <div>
              <p className={` ${i.controller && "font-bold"} md:text-2xl`}>
                {i.domain}
              </p>
              {i.controller && (
                <p className=" text-red-500 text-sm md:text-2xl`">
                  ID Controller
                </p>
              )}
            </div>
            {i.controller ? (
              "User Selected Name"
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
      {!isConnected && <div>Connect Wallet</div>}
      {isConnected && domains !== null && domains.length === 0 && (
        <div>
          <p className=" md:text-xl mb-4 md:mb-8">No linked Wallet ID </p>
          <Link to="/"
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
