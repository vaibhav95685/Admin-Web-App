import { ethers } from "ethers";
import contractABI from "../assets/abi/abi.json";
import contractPolygonABI from "../assets/abi/abi.json";
import contractBatchMintABI from "../assets/abi/batchmintAbi.json";
import contractbuyAndRemoveABI from "../assets/abi/removeSaleAndBuy.json";
import contractCollectionABI from "../assets/abi/collectionAbi.json";

// let signer;
// let provider;
// if (!window.ethereum) {
//     // toast.error("Please install metamask ext otherwise you will not able to do tx");
//     //  alert("")
//     Utils.apiFailureToast("Please install metamask ext otherwise you will not able to do tx");
// } else {
//     provider = new ethers.providers.Web3Provider(window.ethereum);
//     signer = provider.getSigner();
// }
// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

// const contractAddress = "0xd3E390083BC66d87aFD1457879A2fDDfBBe16e06";
const BlockchainServices = {
  mintNFT,
  changeListedPrice,
  buyNFT,
  removeFromSaleNft,
  putOnSaleNft,
  createCollections,
  signcheck,
  batchMintNFT
};

export default BlockchainServices;

async function mintNFT({
  tokenURI,
  price,
  tokenId,
  contractAddress,
  royalty,
  blockchain,
}) {
  console.log(
    window.ethereum.networkVersion,
    blockchain,
    price,
    royalty,
    tokenId,
    tokenURI,
    "dattttttttttttttttt"
  );

  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 80001 && blockchain == "Polygon") {
    //polygon
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractPolygonABI,
      signer
    );
    const result = await contractData.mint(
      tokenURI,
      tokenId,
      ethers.utils.parseEther(price.toString()),
      royalty,
      { gasLimit: 100000 }
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 4 && blockchain == "Ethereum") {
    //etherum
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const result = await contractData.mint(
      tokenURI,
      tokenId,
      ethers.utils.parseEther(price.toString()),
      royalty
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 97 && blockchain == "Binance") {
    //etherum
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const result = await contractData.mint(
      tokenURI,
      tokenId,
      ethers.utils.parseEther(price.toString()),
      royalty,
      { gasLimit: 100000 }
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
  // console.log("kkkkkkkkkkkkkkkkkkkkkk network swutch")
}
async function batchMintNFT({
  tokenId,
  copies,
  contractAddress,
  blockchain,
}) {


 

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 4 && blockchain == "Ethereum") {
    //etherum
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractBatchMintABI,
      signer
    );
    const result = await contractData.mint(
      //tokenURI,
      accounts[0],
      tokenId,//single
      copies,//no cof copies signale
      // ethers.utils.parseEther(price.toString()),
      // royalty,
      accounts[0]
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
}
async function signcheck({ signMsg }) {
  try {
    if (!window.ethereum) return Promise.reject("Please install metamask");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(signMsg);
    const address = await signer.getAddress();
    return {
      signMsg,
      signature,
      address,
    };
  } catch (err) {
    Promise.reject(err);
  }
}

async function signverfiy({ message, address, signature }) {
  try {
    if (!window.ethereum) return Promise.reject("Please install metamask");
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }
    return true;
  } catch (err) {
    Promise.reject(err);
  }
}

//price should be in wei
async function changeListedPrice({ tokenId, price, contractAddress }) {
  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 80001) {
  } else return Promise.reject("Switch this network into Rinkeby");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractData = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  const result = await contractData.updatePrice(
    tokenId,
    ethers.utils.parseEther(price.toString())
  );
  let res = await result.wait();

  return {
    ...res,
    chainId: provider?._network?.chainId || "",
    name: provider?._network?.name || "",
  };
}

async function removeFromSaleNft({
  tokenId,
  contractAddress,
  blockchain,
  message,
  address,
  signature,
}) {
  let Ethereum = "0x3124f1f72eca189b7fd5EE602F3ADFEb7a83763f";
  let Polygon = "0x6C626D2226C2415Ab32989660ea7f2C6265f230c";
  let Binance = "0x52CDde738d71568F79379FB1d671C4Eaef33d638";

  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 80001 && blockchain == "Polygon") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      Polygon,
      contractbuyAndRemoveABI,
      signer
    );
    const result = await contractData.updateListingStatus(
      tokenId,
      message,
      signature,
      contractAddress
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 4 && blockchain == "Ethereum") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      Ethereum,
      contractbuyAndRemoveABI,
      signer
    );
    const result = await contractData.cancel(
      tokenId,
      message,
      signature,
      contractAddress
    );
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 97 && blockchain == "Binance") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      Binance,
      contractbuyAndRemoveABI,
      signer
    );
    const result = await contractData.updateListingStatus(tokenId, false);
    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
}

// async function putOnSaleNft({tokenId}) {
//     const contractData = new ethers.Contract(contractAddress, contractABI, signer);
//     console.log("blockchain fn",contractData)

//     const result = await contractData.updateListingStatus(tokenId,true)

//     let res = await result.wait();
//     return {
//         ...res,
//         chainId: provider?._network?.chainId || '',
//         name: provider?._network?.name || '',
//     }
// }

//1bnb=0.136ether
async function buyNFT({ tokenId, price, contractAddress, message, signature }) {
  let RinkebyAddress = "0xe481bf4f3dbeb59bf758d271a710142e10898728";
  let PolygonAddress = "0x6C626D2226C2415Ab32989660ea7f2C6265f230c";
  let BinanceAddress = "0x52CDde738d71568F79379FB1d671C4Eaef33d638";

  console.log("kdkkkkkkkkkkkk", contractAddress, tokenId, message, signature);
  console.log(signature, "<<sig");
  console.log(message, "msg");
  console.log(tokenId, "tokenID");
  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 80001) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      PolygonAddress,
      contractbuyAndRemoveABI,
      signer
    );

    const resultBuy = await contractData.buy(
      tokenId,
      message,
      signature,
      contractAddress,
      { gasLimit: 100000, value: ethers.utils.parseEther("0.1") }
    );
    const finalResult = await signer.sendTransaction(resultBuy);
    console.log("<<<result Buy", resultBuy, finalResult);
    const amount = ethers.utils.parseUnits(price.toString(), 18);
    const accounts = await provider.send("eth_requestAccounts", []);

    const balance = await provider.getBalance(accounts[0]);
    if (
      ethers.utils.formatUnits(balance, 18) <
      ethers.utils.formatUnits(amount, 18)
    )
      return Promise.reject("Insufficient fund");

    const options = { value: ethers.utils.parseEther(price.toString()) };

    const result = await contractData.buy(tokenId, options);
    console.log(
      "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
      result
    );

    let res = await result.wait();

    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 4) {
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      RinkebyAddress,
      contractbuyAndRemoveABI,
      signer
    );
    const resultBuy = await contractData.buy(
      tokenId,
      message.toString(),
      signature,
      contractAddress,
      { value: ethers.utils.parseEther(price.toString()) }
    );
    // console.log("<<<resultBuy",resultBuy)

    // const amount = ethers.utils.parseUnits(price.toString(), 18);
    // const accounts = await provider.send("eth_requestAccounts", []);

    // const balance = await provider.getBalance(accounts[0]);
    // if (
    //   ethers.utils.formatUnits(balance, 18) <
    //   ethers.utils.formatUnits(amount, 18)
    // )
    //   return Promise.reject("Insufficient fund");

    // const options = { value: ethers.utils.parseEther(price.toString()) };

    // const result = await contractData.buy(tokenId, options);
    // console.log(
    //   "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    //   result
    // );

    let res = await resultBuy.wait();

    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 97) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      BinanceAddress,
      contractbuyAndRemoveABI,
      signer
    );
    const resultBuy = await contractData.buy(
      tokenId,
      message,
      signature,
      contractAddress
    );
    console.log("<<<result Buy", resultBuy);
    const amount = ethers.utils.parseUnits(price.toString(), 18);
    const accounts = await provider.send("eth_requestAccounts", []);

    const balance = await provider.getBalance(accounts[0]);
    if (
      ethers.utils.formatUnits(balance, 18) <
      ethers.utils.formatUnits(amount, 18)
    )
      return Promise.reject("Insufficient fund");

    const options = { value: ethers.utils.parseEther(price.toString()) };

    const result = await contractData.buy(tokenId, options);
    console.log(
      "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
      result
    );

    let res = await result.wait();

    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
  console.log(
    "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
  );
}

async function putOnSaleNft({ tokenId, contractAddress }) {
  if (!window.ethereum) return Promise.reject("Please install metamask");

  if (window.ethereum.networkVersion == 80001) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const result = await contractData.updateListingStatus(tokenId, true);

    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 4) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const result = await contractData.updateListingStatus(tokenId, true);

    let res = await result.wait();
    return {
      ...res,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // const contractData = new ethers.Contract(
  //     contractAddress,
  //     contractABI,
  //     signer
  // );
  // const result = await contractData.updateListingStatus(tokenId, true);

  // let res = await result.wait();
  // return {
  //     ...res,
  //     chainId: provider?._network?.chainId || "",
  //     name: provider?._network?.name || "",
  // };
}
// for create collections
async function createCollections({ name, symbol, blockchain }) {

    let polygonContract = "0xe407bd0C7A15B5564358EA45036258B09C470E45";
    let ethContract = "0x07211F04860BA2248dE48B51Dfd48633Cc33a875";
    let binanceContract = "0x3f0aA42620075DAB09799a47cfB9E833e80362E0";

  let contractCollectionAddress;
  if (blockchain === "Polygon")
    contractCollectionAddress = polygonContract;
    //   process.env.REACT_APP_CONTRACT_COLLECTION_ADDRESS_POLYGON;
  else if (blockchain == "Ethereum")
    contractCollectionAddress = ethContract
    //   process.env.REACT_APP_CONTRACT_COLLECTION_ADDRESS;
  else if (blockchain === "Binance")
    contractCollectionAddress = binanceContract
    //   process.env.REACT_APP_CONTRACT_COLLECTION_ADDRESS_BINANCE;

  console.log(blockchain, "<<<BlockChainmetamask");

  if (!window.ethereum) return Promise.reject("Please install metamask");
  if (window.ethereum.networkVersion == 80001 && blockchain === "Polygon") {
    console.log('if Polygon');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractCollectionAddress,
      contractCollectionABI,
      signer
    );
    const result = await contractData.createCollection(name, symbol);

    let res = await result.wait();
    console.log("---------ssss----");
    // console.log("000000000000000000000000", pp.logs)
    // console.log("000000wwww000000000000000000",)
    const getReceipt = await provider.getTransactionReceipt(
      res.transactionHash
    );
    // console.log("lssssssss",getReceipt.logs[0].address)
    return {
      ...res,
      contract_address: getReceipt.logs[0].address,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 4 && blockchain === "Ethereum") {
    console.log('if Ethereum');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractCollectionAddress,
      contractCollectionABI,
      signer
    );
    const result = await contractData.createCollection(name, symbol);

    let res = await result.wait();
    console.log("---------ssss----");
    // console.log("000000000000000000000000", pp.logs)
    // console.log("000000wwww000000000000000000",)
    const getReceipt = await provider.getTransactionReceipt(
      res.transactionHash
    );
    // console.log("lssssssss",getReceipt.logs[0].address)
    return {
      ...res,
      contract_address: getReceipt.logs[0].address,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else if (window.ethereum.networkVersion == 97 && blockchain === "Binance") {
    console.log('if Binance')
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
      contractCollectionAddress,
      contractCollectionABI,
      signer
    );
    const result = await contractData.createCollection(name, symbol);

    let res = await result.wait();
    console.log("---------ssss----");
    // console.log("000000000000000000000000", pp.logs)
    // console.log("000000wwww000000000000000000",)
    const getReceipt = await provider.getTransactionReceipt(
      res.transactionHash
    );
    // console.log("lssssssss",getReceipt.logs[0].address)
    return {
      ...res,
      contract_address: getReceipt.logs[0].address,
      chainId: provider?._network?.chainId || "",
      name: provider?._network?.name || "",
    };
  } else return Promise.reject("Please Select Valid Network in the metamask");
}
