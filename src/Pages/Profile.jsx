import { useAccount } from "wagmi";
import { getUserDomainNames } from "../contract-artifacts/utils/helpers";
import { animVariant } from "../utils/anim";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const { address, isConnected } = useAccount();
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    const getAllDomains = async () => {
      const domains = await getUserDomainNames(address, {
        selectedName: "Prince",
      });
      setDomains(domains);
    };
    getAllDomains();
  }, [address]);

  console.log(domains);

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
      {domains.length > 0 &&
        isConnected &&
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
      {isConnected && domains.length === 0 && (
        <div>
          No domain name minted yet <br />
          <Link to="/">Buy domain name now</Link>
        </div>
      )}
    </motion.div>
  );
}

export default Profile;
