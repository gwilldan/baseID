import { useConnect } from "wagmi";
import PropTypes from "prop-types";

function WalletConnect({ modalToggle, setModalToggle, setOpen }) {
  const { connect, connectors } = useConnect({
    async onSuccess() {
      setModalToggle(false);
      setOpen(false);
    },
  });

  const isWalletAvailable = (walletType) => {
    console.log(walletType);
    if (walletType === "metaMask") {
      return typeof window.ethereum !== "undefined";
    } else if (walletType === "coinbaseWallet") {
      return (
        typeof window.ethereum &&
        window.ethereum?.isCoinbaseWallet !== undefined
      );
    } else if (walletType === "walletConnect") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      onClick={() => setModalToggle(false)}
      className={`${
        modalToggle ? "block" : "hidden"
      } z-[60] grid w-screen h-screen absolute 
    backdrop-blur-sm border-none `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="  grid md:grid-cols-2 place-self-center 
            h-[570px] w-[350px] md:h-[340px] md:w-[600px] border-none
            bg-white justify-center"
      >
        {connectors.map((connector, i) => {
          if (isWalletAvailable(connector.id)) {
            return (
              <button
                key={i}
                className=" hover:bg-slate-100 flex gap-1 flex-col 
                          justify-center items-center"
                onClick={() => {
                  connect({ connector });
                }}
              >
                <img src={`/images/${connector.id}.svg`} alt={connector.id} />
                <div className=" text-black text-xl font-bold">
                  {connector.name}
                </div>
                <div>{i.text}</div>
              </button>
            );
          } else {
            return "";
          }
        })}
      </div>
    </div>
  );
}

WalletConnect.propTypes = {
  modalToggle: PropTypes.bool,
  setModalToggle: PropTypes.func,
  setOpen: PropTypes.func,
};

export default WalletConnect;
