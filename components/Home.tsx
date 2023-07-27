import Head from 'next/head'
import Image from 'next/image'
import '@/public/placeholder.jpg'
import { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'
import { Inter } from 'next/font/google'
import WalletBal from './WalletBal'
import ArcadeCats from '@/artifacts/contracts/myNFT.sol/ArcadeCats.json'
import { ethers } from 'ethers'

const addr = "0xFd8Bb30F3830F3b532d6e1905C3A51a930561Bc2";
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();
// get the smart contract
const contract = new ethers.Contract(addr, ArcadeCats.abi, signer);

const inter = Inter({ subsets: ['latin'] })

function NFTImage({ tokenId, getCount }) {
  const contentId = 'PINATA_CONTENT_ID';
  const metadataURI = `${contentId}/${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  });

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result)
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    <div>
      <Image
        alt='nft'
        src={isMinted ? imageURI : 'placeholder.jpg'} />
        <h5>ID #{tokenId}</h5>
        {!isMinted ? (
          <button onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button onClick={getURI}>
            Taken! Show URI
          </button>
        )}
    </div>
  );
}

export default function Home() {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };
  

  return (
    <>
      <Head>
        <title>ArcadeCats | Mint your Cats</title>
        <meta name="description" content="Mint your Cat Nfts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <WalletBal />
        {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
            <div key={i}>
            <NFTImage tokenId={i} getCount={getCount} />
            </div>
        ))}
      </main>
    </>
  )
}