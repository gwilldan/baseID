import { useEffect, useState } from "react";
import { useAccount, useConnect, useContractRead, useNetwork } from "wagmi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { easeInOut, motion, stagger } from "framer-motion";
import { BsFillInfoSquareFill } from "react-icons/bs";

import { getUserDomainNames } from "../contract-artifacts/utils/helpers";
import { abi } from "../contract-artifacts/abi";
import { animVariant } from "../utils/anim";
import { parseError } from "../utils/helperFunctions";
import { ThreeDots, SetButton } from "../Components";
import { id } from "ethers";

function Profile() {
  const { address, isConnected } = useAccount();
  const [domains, setDomains] = useState(null);
  const { connect, connectors, error, isError } = useConnect();
  const { chain } = useNetwork();
  const [isOpen, setOpen] = useState(false)
  const [id, setID] = useState("")

  // console.log(isConnected);
  console.log("isopen", isOpen)
  console.log("id", id)

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
        setDomains(domains);
      } catch (err) {
        err?.response?.status === 404 && setDomains([]);
      }
    };
    getAllDomains();
  }, [address, chain]);

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

                  {/*  RENDERS WHEN THERE'RE IDs LINKED TO WALLET */}
      {domains !== null &&
        isConnected &&
        domains?.length > 0 &&
        domains?.map((i) => (
          <motion.div
            key={i._id}
            className=" relative mb-4 md:p-4 md:mb-8 p-2
                    bg-secondary-color shadow-md "
          >
            <div className=" flex justify-between " >
              <p
                className={` ${
                  i.domainName === `${domainName}` && "font-bold"
                } md:text-2xl`}
              >
                {i.domainName}
              </p>
              {i.domainName === `${domainName}` ? (
                <p className="background-text text-bold text-xl">SELECTED</p>
              ) : (
                <ThreeDots 
                  setID={setID} 
                  setOpen={setOpen} 
                  isOpen = {isOpen}  
                  cardID = {i._id}
                />
              )}
            </div>

            <motion.div
             layout
             initial = {{
              visibility: "collapse"
             }}
             animate = {
               i._id === id && isOpen ? {
                height: "100px",
                marginTop: "10px",
                visibility: "visible",
                // borderTop: "1px solid blue"
               } : {
                visibility: "collapse",
                height: "0px"
              }
             }

             transition = {{
              ease: "easeIn",
             }}
             
            >
              <h1 className=" border-t border-priBlue w-max font-semibold">
                Set ID as Controller
              </h1>
              <div className=" flex justify-between items-top">
                <p className=" max-w-[250px] md:max-w-[700px] font-extralight text-[12px] md:text-base  ">
                  Controller gives permission to set your preferred name to send and receive tokens.
                </p>
                <SetButton />
              </div>
              
              <div
                  className= {" absolute bottom-0 mb-1 md:mb-6 text-red-500 flex gap-2 items-center md:font-semibold md:text-lg"}
                >
                  <BsFillInfoSquareFill className=" md:text-lg text-red-500" />
                  Name Storage, Coming soon
                </div>

            </motion.div>

          </motion.div>
        ))}

                                {/*  RENDERS WHEN THERE IS WALLET IS NOT CONNECTED OR
                                            NO ID LINKED TO WALLET */}
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
            font-bold text-white md:hover:bg-blue-500 rounded-md"
          >
            Mint ID
          </Link>
        </div>
      )}
    </motion.div>
  );
}

export default Profile;
