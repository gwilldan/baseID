import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSwitchNetwork, useAccount, useNetwork } from "wagmi";
import useCurrentNetwork from "../Hooks/useCurrentNetwork";

import Nav from "./Nav";
import Footer from "./Footer";

const Layout = () => {
	const { chains, switchNetwork } = useSwitchNetwork();
	const { address } = useAccount();
	const { network } = useCurrentNetwork();
	const { chain } = useNetwork();

	useEffect(() => {
		switchNetwork?.(chains.find((chain) => chain.network === network)?.id);
	}, [address, chains, chain, network, switchNetwork]);

	return (
		<div
			style={{
				height: "100dvh",
			}}
			className=" w-full flex flex-col md-h-auto">
			<Nav />
			<main className="no-scrollbar overflow-auto w-full h-full flex flex-col md:h-full">
				{<Outlet />}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
