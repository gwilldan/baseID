import { useConnect } from "wagmi";
import PropTypes from "prop-types";

function WalletConnect({ modalToggle, setModalToggle }) {
  const { connect, connectors } = useConnect({
    async onSuccess() {
      setModalToggle(false);
    },
  });

  const isWalletAvailable = (walletType) => {
    if (walletType === "metamask") {
      return typeof window.ethereum !== "undefined";
    } else if (walletType === "coinbase") {
      return (
        typeof window.ethereum &&
        window.ethereum?.isCoinbaseWallet !== undefined
      );
    } else {
      return false; // Default to false for unknown wallet types
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
            bg-white"
      >
        {connectors.map((connector, i) => (
          <button
            key={i.id}
            className=" hover:bg-slate-100 flex gap-1 flex-col 
                    justify-center items-center"
            onClick={() => {
              connect({ connector });
            }}
          >
            <img src={`/images/${connector.id}.svg`} alt={connector.id} />
            <div className=" text-xl font-bold">{connector.name}</div>
            <div>{i.text}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

WalletConnect.propTypes = {
  modalToggle: PropTypes.bool,
  setModalToggle: PropTypes.func,
};

export default WalletConnect;
