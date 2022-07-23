import { ethers, Contract } from "ethers";
import Voting from "./Voting.json";

const getBlockchain = () =>
    new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {
            if (window.ethereum) {
                await window.ethereum.enable();
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const signer = provider.getSigner();
                const signerAddress = await signer.getAddress();
                const voting = new Contract(Voting.address, Voting.abi, signer);

                console.log({ voting });

                resolve({ signerAddress, voting });
            }
            resolve({ signerAddress: undefined, voting: undefined });
        });
    });

export default getBlockchain;
