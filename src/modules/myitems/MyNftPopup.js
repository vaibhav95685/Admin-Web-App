import React, { useEffect, useRef, useState } from 'react'
import { httpConstants } from '../../constants';
import { getParamTenantId } from '../../utility/global';
import CollectionFileDropzone from './CollectionFileDropzone';
import styled from "styled-components";
import etherIcon from "../../assets/ether.svg";
import binanceIcon from "../../assets/binance.svg";
import ploygonIcon from "../../assets/ploygon.svg"
import { useSelector } from 'react-redux';
import BlockchainServices from '../../services/blockchainServices';
import { createNftContent } from "../../services/contentMicroservices";
import { toast, ToastContainer } from 'react-toastify';
import { MintPopup } from './MintPopup';
import { useNavigate } from 'react-router-dom';
import close from "../../assets/images/close.svg";


const HeadingSection = styled.div``;
const HeadingTittle = styled.label`
  text-align: left;
  font: normal normal bold 18px/27px Poppins;
  letter-spacing: 0px;
  color: #191919;
  opacity: 1;
`;

const FileDiv = styled.div`
  margin-top: 42px;
  width: 100%;
`;

const DropFile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 341px;
  /* UI Properties */
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 7px;
  opacity: 1;
`;
const UploadFile = styled.label`
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal 600 16px/19px Segoe UI;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
`;
const UploadFileHint = styled.label`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  color: #333333;
  opacity: 1;
`;

const Fields = styled.div`
  width: 100%;
`;

const ContainerFirst = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-top: 22px;
`;
const ContainerSecond = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-top: 28px;
`;
const TitleField = styled.label`
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal bold 16px/25px Poppins;
  letter-spacing: 0px;
  color: #191919;
  opacity: 1;
`;
const InputField = styled.input`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d0d0d0;
  border-radius: 7px;
  opacity: 1;
  height: 42px;
`;
const TextAreaField = styled.textarea`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d0d0d0;
  border-radius: 7px;
  opacity: 1;
`;
const SelectField = styled.select`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d0d0d0;
  border-radius: 7px;
  opacity: 1;
  height: 42px;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-top: 42px;
  margin-bottom: 43px;
  float: right;
`;
const Button = styled.div`
  background: #016dd9 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  color: white;
  font: normal normal 600 16px/25px Poppins;
  padding: 9px 41px 8px 42px;
`;


const priceWithCurrency = (blockchain) => {
    switch (blockchain) {
        case "ETH":
            return (
                <span style={{ fontSize: '12px' }}>
                    <img className="currency-sign-nftinformation" src={etherIcon}></img>
                    ETH
                </span>
            );
        case "MATIC":
            return (
                <span style={{ fontSize: '12px' }}>
                    <img className="currency-sign-nftinformation" src={ploygonIcon}></img>
                    MATIC
                </span>
            );
        case "BNB":
            return (
                <span style={{ fontSize: '12px' }}>
                    <img className="currency-sign-nftinformation" src={binanceIcon}></img>
                    BNB
                </span>
            );
        case "Ethereum":
            return (
                <span style={{ fontSize: '12px' }}>
                    <img className="currency-sign-nftinformation" src={etherIcon}></img>
                    ETH
                </span>
            );
        case "Polygon":
            return (
                <span style={{ fontSize: '12px' }}>
                    <img className="currency-sign-nftinformation" src={ploygonIcon}></img>
                    MATIC
                </span>
            );
        case "Binance":
            return (
                <span style={{ fontSize: '12px' }}>
                    <img className="currency-sign-nftinformation" src={binanceIcon}></img>
                    BNB
                </span>
            );
        default:
            return "";
    }
};

function currencyValue(value) {
    switch (value) {
        case "Ethereum":
            return "ETH";
        case "Polygon":
            return "MATIC";
        case "Binance":
            return "BNB";
    }
}

function parseResponse(promise) {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err]);
}

function generateRandomNumber() {
    return parseInt(10000000 * (Math.random() + parseInt(10 * Math.random())));
}

function MyNftPopup({ setcreateNFTActive }) {

    const navigate = useNavigate();
    const store = useSelector(state => state.store)

    const collectionRef = useRef('');

    const [nftError, setNftError] = useState({
        name: false,
        price: false,
        description: false,
        collection: false,
        blockchain: false,
        royalty: false,
        logo: false
    })

    const [nftData, setNftData] = useState({
        name: '',
        price: '',
        description: '',
        collection: '',
        blockchain: '',
        royalty: ''
    })

    const [loaderState, setLoaderState] = useState(false);
    const [collectionBlockchain, setCollectionBlockchain] = useState('');
    const [logoCdn, setlogoCdn] = useState("");
    const [logoipfs, setlogoipfs] = useState("");
    const [compressedLogo, setCompressedLogo] = useState("");
    const [extension, setExtension] = useState('image');
    const [collectionId, setCollectionId] = useState('');
    const [previewLogoImage, setPreviewLogoImage] = useState('');

    const [blockchainOption, setBlockchainOption] = useState([]);
    const [collections, setCollections] = useState([]);

    const validateFields = (name, value) => {
        if (value === "") return setNftError({ ...nftError, [name]: 'This Field is Required' })
    }

    const nameValidation = (nftName) => {
        var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
        if (format.test(nftName)) {
            setNftError({ ...nftError, name: '(No Special Character Allowed)' })
            return false;
        } else if (nftName.length === 0) {
            setNftError({ ...nftError, name: 'Name is Required' })
            return false;
        } else if (nftName.length < 3) {
            setNftError({ ...nftError, name: 'Name  should be atleast 3 character' })
            return false;
        } else {
            setNftError({ ...nftError, name: false })
            return true;
        }
    };

    const priceValidation = (nftPrice, xy) => {
        if (nftPrice.length == 0) {
            setNftError({ ...nftError, price: '(Price is Required)' });
            return false;
        } else if (collectionBlockchain === "Ethereum" && nftPrice < 0.004) {
            setNftError({ ...nftError, price: '( Minimum listing price for an NFT should be more than 0.004 ETH )' });
            return false;
        } else if (collectionBlockchain === "Polygon" && nftPrice < 11.71) {
            setNftError({ ...nftError, price: '( Minimum listing price for an NFT should be more than 11.71 MATIC )' });
            return false;
        } else if (collectionBlockchain === "Binance" && nftPrice < 0.027) {
            setNftError({ ...nftError, price: '( Minimum listing price for an NFT should be more than 0.027 BNB )' });
            return false;
        } else if (collectionBlockchain === "Ethereum" && nftPrice > 1000000000) {
            setNftError({ ...nftError, price: '( Maximum listing price for an NFT should be less than 1,000,000,000 ETH )' });
            return false;
        } else if (collectionBlockchain === "Polygon" && nftPrice > 2929880265000) {
            setNftError({ ...nftError, price: '( Maximum listing price for an NFT should be less than 2,929,880,265,000 MATIC )' });
            return false;
        } else if (collectionBlockchain === "Binance" && nftPrice > 6841316000) {
            setNftError({ ...nftError, price: '( Maximum listing price for an NFT should be less than 6,841,316,000 BNB )' });
            return false;
        } else {
            setNftError({ ...nftError, price: false });
            return true;
        }
    };

    const descriptionValidation = (nftDes) => {
        if (nftDes.length == 0) {
            setNftError({ ...nftError, description: 'Description is Required' });
            return false;
        } else {
            setNftError({ ...nftError, description: false });
            return true;
        }
    };

    const fileValidation = () => {
        if (logoCdn != "" || previewLogoImage != '') {
            setNftError({ ...nftError, logo: false });
            return true;
        } else {
            setNftError({ ...nftError, logo: 'File is required' });
            return false;
        }
    };

    const blockchainValidation = (blockchain) => {
        if (blockchain.length != 0) {
            setNftError({ ...nftError, blockchain: false });
            return true;
        } else {
            setNftError({ ...nftError, blockchain: 'Blockchain is Required' });
            return false;
        }
    };

    const getRequestDataForSaveNftContent = (tokenId, data, blockchainRes) => {
        return {
            tokenId: tokenId,
            transactionHash: blockchainRes?.transactionHash || "",
            name: data?.nftName || "",
            //TO DO  need to pass collection _id
            collectionId: data?.collectionId, // to do
            collectionName: data?.collectionName == undefined ? "ANAFTO Collection" : data?.collectionName,
            ipfsUrl: data?.ipfsUrl || "",
            cdnUrl: data?.cdnUrl || "",
            compressedURL: data?.compressedURL || "",
            cid: data?.cid || "",
            contractAddress: data.contractAddress || "",
            description: data?.description || "",
            blockchain: data?.blockchain || "",
            network: {
                chainId: blockchainRes?.chainId || "",
                name: blockchainRes?.name || "",
            },
            salesInfo: {
                price: data?.price || 0,
                currency: data?.currency,
            },
            royality: data?.royality,
            //TO do need to pass user (owner) _id
            ownedBy: data?.createdBy,
            createdBy: data?.createdBy,
            updatedBy: data?.createdBy,
            ownerAddress: data?.ownerAddress || "", // put metamask address
            previewImage: data?.previewImage,
            fileExtension: data?.fileExtension,
            tenantId: data?.createdBy,
            walletAddress: data?.ownerAddress || ""
        };
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            setNftData({ ...nftData, [name]: value })
        }
        else if (name === 'description') {
            setNftData({ ...nftData, [name]: value })
        }
        else if (name === 'price') {
            setNftData({ ...nftData, [name]: value })
        }
        else if (name === 'collection') {

            let tempValue = value;
            if (value !== 'Anfto Collection') {
                let collectionArr = value.split('__');

                setCollectionId(collectionArr[2]);
                setCollectionBlockchain(collectionArr[1]);
                tempValue = collectionArr[0];

                setNftData({ ...nftData, [name]: tempValue, blockchain: collectionArr[1] })
            } else {
                setNftData({ ...nftData, [name]: tempValue })
            }

        }
        else if (name === 'blockchain') {
            setCollectionBlockchain(value);
            setNftData({ ...nftData, [name]: value })
        }
        else if (name === "royalty") {
            setNftData({ ...nftData, [name]: value })
        }
    }

    const createNftHandler = async (data) => {

        let blockchainRes;
        let contractAddress;
        let polygonContract = "0xe407bd0C7A15B5564358EA45036258B09C470E45";
        let ethContract = "0x3f0aA42620075DAB09799a47cfB9E833e80362E0";
        let binanceContract = "0x3f0aA42620075DAB09799a47cfB9E833e80362E0";

        if (data?.blockchain === "Polygon") {
            contractAddress = polygonContract //process.env.REACT_APP_CONTRACT_ADDRESS_POLYGON
        }
        else if (data?.blockchain === "Ethereum") {
            contractAddress = ethContract //process.env.REACT_APP_CONTRACT_ADDRESS
        }
        else if (data?.blockchain === "Binance") {
            contractAddress = binanceContract //process.env.REACT_APP_CONTRACT_ADDRESS_BINANCE
        }

        let tokenId = generateRandomNumber();
        // create NFT on blockchai
        if (data.contractAddress.length > 0) {
            console.log(data?.blockchain, "blockchainValue");

            const [blockchainError, blockchainResult] = await parseResponse(
                BlockchainServices.mintNFT({
                    tokenURI: data.ipfsUrl,
                    price: data.price,
                    tokenId,
                    contractAddress: contractAddress,
                    royalty: data.royality,
                    blockchain: data?.blockchain
                })
            );
            console.log("blockchainError", blockchainError)
            console.log("blockchainResult", blockchainResult)

            if (blockchainError || !blockchainResult) {
                setLoaderState(false);

                return toast.error(blockchainError?.data?.message || blockchainError?.message || blockchainError || "Unable to Mint NFT on blockchain")
            }
            blockchainRes = blockchainResult

        }


        else {

            data.contractAddress = contractAddress;

            const [blockchainError, blockchainResult] = await parseResponse(
                BlockchainServices.mintNFT({
                    tokenURI: data.ipfsUrl,
                    price: data.price,
                    tokenId,
                    contractAddress: contractAddress,
                    blockchain: data?.blockchain,
                    royalty: data.royality,
                })
            );

            if (blockchainError || !blockchainResult) {
                setLoaderState(false)
                console.log(blockchainError?.data?.message || blockchainError?.message || blockchainError, "<<<BlockchainRes")

                return toast.error(blockchainError?.data?.message || blockchainError?.message || blockchainError || "Unable to Mint NFT on blockchain")
            }
            blockchainRes = blockchainResult

            console.log("blockchainError", blockchainError)
            console.log("blockchainResult", blockchainResult)

        }

        let savedNftJSon = getRequestDataForSaveNftContent(tokenId, data, blockchainRes);

        createMintNftDetails(savedNftJSon, store?.store?.token)

    }

    const createMintNftDetails = (requestdata, token) => {

        let url = httpConstants.BASE_URL2 + "/api/v1/nft" + getParamTenantId();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestdata)
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (
                    !result.success ||
                    result.responseCode !== 200 ||
                    !result.responseData ||
                    result.responseData.length === 0
                ) {
                    setLoaderState(false);
                    toast.error("Unable to save NFT content")
                } else {
                    navigate('/my-items/nfts')
                    setLoaderState(false);
                    toast.success('Your NFT has been created')
                }

            })
            .catch(error => {
                setLoaderState(false);
                toast.error("Unable to save NFT content")
            })
            .finally(final => {
                setcreateNFTActive(false)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let priceValue = nftData.price;
        let blockchain = nftData.blockchain;

        if (priceValue.toString().slice(0, 1) == ".") {
            priceValue = "0" + priceValue;
        } else {
            priceValue = +priceValue;
            priceValue = priceValue.toString();
        }

        if (nftData.collection === "Anafto Collection") {
            blockchain = 'Etherium';
        }

        let nftNameValidation = nameValidation(nftData.name);
        let nftPriceValidation = priceValidation(nftData.price, blockchain);
        let nftDescriptionValidation = descriptionValidation(nftData.description);
        let nftFileValidation = fileValidation();
        let nftBlockchain = blockchainValidation(nftData.blockchain);

        if (
            nftNameValidation &&
            nftPriceValidation &&
            nftDescriptionValidation &&
            nftFileValidation &&
            nftBlockchain
        ) {
            setLoaderState(true);

            createNftHandler({
                ipfsUrl: logoipfs,
                cdnUrl: logoCdn,
                compressedURL: compressedLogo,
                nftName: nftData.name,
                price: priceValue,
                currency: currencyValue(blockchain),
                description: nftData.description,
                royality: nftData.royalty,
                blockchain: blockchain,
                createdBy: store?.store?._id,
                collectionId: collectionId,
                collectionName: nftData.collection,
                contractAddress: '',
                ownerAddress: store?.walletAddress,
                previewImage: compressedLogo,
                fileExtension: extension
            })
        } else {
            toast.error('All Fields are Required')
        }


    }

    useEffect(() => {
        fetch(`${httpConstants.BASE_URL2}/api/v1/collections${getParamTenantId()}`)
            .then(response => response.json())
            .then(result => setCollections(result.responseData))
            .catch(error => console.log('error'))


        fetch(`${httpConstants.BASE_URL1}/api/v1/blockchains${getParamTenantId()}`)
            .then(response => response.json())
            .then(result => setBlockchainOption(result.responseData))
            .catch(error => console.log('error'))

    }, [])

    return (
        <>
            {/* Toast Message */}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {
                loaderState && <MintPopup logoCdn={logoCdn == "" ? previewLogoImage : logoCdn} name={nftData.name} blockchain={nftData.blockchain} />
            }
            <div className="addStoreItem">
                <div className="addFeaturedAssestsContainer">
                    <HeadingTittle>Create NFT</HeadingTittle>
                    <div
                        className=" confirmationModalHeading confirmationModalCross"
                        onClick={() => setcreateNFTActive(false)}
                    >
                       <img src={close}></img>
                    </div>
                </div>

                <FileDiv>
                    <UploadFile>Upload File*</UploadFile>
                    <DropFile>
                        <CollectionFileDropzone
                            bannerCdn={logoCdn}
                            setbannerCdn={setlogoCdn}
                            bannerIpfs={logoipfs}
                            setbannerIpfs={setlogoipfs}
                            compressedUrl={compressedLogo}
                            setCompressedUrl={setCompressedLogo}
                            setExtension={setExtension}
                            setPreviewLogoImage={setPreviewLogoImage}
                            config={{ accept: "image/*,audio/*,video/*", size: '40485760' }}
                            key={3}
                        />
                    </DropFile>

                    <UploadFileHint>
                        Supported(JPG, PNG, GIF, SVG) Max size: 40 mb
                    </UploadFileHint>
                </FileDiv>

                {
                    extension.includes('video') || extension.includes('audio') ?
                        <FileDiv>
                            <UploadFile>Upload File*</UploadFile>
                            <DropFile>
                                <CollectionFileDropzone
                                    bannerCdn={logoCdn}
                                    setbannerCdn={setlogoCdn}
                                    bannerIpfs={logoipfs}
                                    setbannerIpfs={setlogoipfs}
                                    compressedUrl={compressedLogo}
                                    setCompressedUrl={setCompressedLogo}
                                    setExtension={setExtension}
                                    setPreviewLogoImage={setPreviewLogoImage}
                                    config={{ accept: "image/*", size: '10485760' }}
                                    key={3}
                                />
                            </DropFile>

                            <UploadFileHint>
                                Supported(JPG, PNG, GIF, SVG) Max size: 40 mb
                            </UploadFileHint>
                        </FileDiv>
                        : null
                }

                <Fields>
                    <ContainerSecond>
                        <TitleField>Collection*</TitleField>
                        <SelectField ref={collectionRef} name="collection" onChange={(e) => handleInputChange(e)}>
                            <option disabled selected>Select Collection</option>
                            <option value="Anfto Collection">Anfto Collection</option>
                            {
                                collections.length &&
                                collections.map((item) => (
                                    <option value={`${item.name}__${item.blockchain}__${item?._id}`}>{item.name}</option>
                                ))
                            }
                        </SelectField>
                        {nftError.collection && <small style={{ color: '#ff5050' }}>{nftError.collection}</small>}
                    </ContainerSecond>

                    <ContainerSecond>
                        <TitleField>Blockchain*</TitleField>
                        <SelectField disabled={nftData.collection === 'Anfto Collection' ? false : true} name="blockchain" onChange={(e) => handleInputChange(e)}>
                            <option disabled selected={collectionBlockchain === "" ? true : false}>Select Blockchain</option>
                            {
                                blockchainOption.length &&
                                blockchainOption.map((item) => (
                                    <option selected={collectionBlockchain === item.name ? true : false} value={item?.name}>{item.name}</option>
                                ))
                            }
                        </SelectField>
                        {nftError.blockchain && <small style={{ color: '#ff5050' }}>{nftError.blockchain}</small>}
                    </ContainerSecond>

                    <ContainerFirst>
                        <TitleField>Name*</TitleField>
                        <InputField name="name" onChange={(e) => handleInputChange(e)} placeholder="Enter Name"></InputField>
                        {nftError.name && <small style={{ color: '#ff5050' }}>{nftError.name}</small>}
                    </ContainerFirst>

                    <ContainerFirst>
                        <TitleField style={{ display: 'flex', justifyContent: 'space-between' }}>Price* {collectionBlockchain !== "" ? priceWithCurrency(collectionBlockchain) : null}</TitleField>
                        <InputField name="price" onChange={(e) => handleInputChange(e)} placeholder="Enter Price"></InputField>
                        {nftError.price && <small style={{ color: '#ff5050' }}>{nftError.price}</small>}
                    </ContainerFirst>

                    <ContainerSecond>
                        <TitleField>Description*</TitleField>
                        <TextAreaField name="description" onChange={(e) => handleInputChange(e)} placeholder="Enter Description"></TextAreaField>
                        {nftError.description && <small style={{ color: '#ff5050' }}>{nftError.description}</small>}
                    </ContainerSecond>

                    <ContainerFirst>
                        <TitleField>Royalty*</TitleField>
                        <small>Write down the percentage you want from this sale of this NFT</small>
                        <InputField name="royalty" onChange={(e) => handleInputChange(e)} placeholder="Enter Royalty"></InputField>
                        {nftError.royalty && <small style={{ color: '#ff5050' }}>{nftError.royalty}</small>}
                    </ContainerFirst>

                    <ButtonDiv>
                        <Button disabled={loaderState} style={{ cursor: 'pointer' }} onClick={(e) => handleSubmit(e)}>Create</Button>
                    </ButtonDiv>
                </Fields>
            </div>
        </>
    )
}

export default MyNftPopup