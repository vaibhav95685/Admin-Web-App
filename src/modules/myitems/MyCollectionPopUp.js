import { React, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CollectionFileDropzone from "./CollectionFileDropzone";
import { httpConstants } from "../../constants";
import { getParamTenantId, updateCollectionTxStatus } from "../../utility/global";
import { useSelector } from "react-redux";
import BlockchainServices from "../../services/blockchainServices";
import { toast, ToastContainer } from "react-toastify";
import { MintPopup } from "./MintPopup";
import { useNavigate } from "react-router-dom";
import close from "../../assets/images/close.svg";
import Select from "react-select";
import ethereum from "../../assets/images/ethereum.svg";
import polygon from "../../assets/images/ploygon.svg";
import binance from "../../assets/images/binance.svg";
import "./styles/collectionNFT.css"
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
const DropFileCollection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 241px;
  width: 241px;
  /* UI Properties */
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 7px;
  opacity: 1;
  margin-bottom: 2em;
`;
const DropFileBanner = styled.div`
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
const DropDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DropImage = styled.img``;
const DropTitle = styled.label`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  color: #333333;
`;
const UploadFile = styled.label`
  text-align: left;
  font: normal normal bold 16px/25px Poppins;
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
  margin-top: 42px;
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
  height: 102px;
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


function parseResponse(promise) {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err]);
}


function MyCollectionPopUp({ setcreateNFTActive }) {

    const navigate = useNavigate();
    const store = useSelector(state => state.store)

    const name = useRef("");
    const description = useRef("");
    const imageUrl = useRef("");
    const coverUrl = useRef("");

    const [inputName, setInputName] = useState('');
    const [defaultValueBlockChain, setDefaultValueBlockchain] = useState([
        {
          value: "ETH",
          label: (
            <div>
              <img src={ethereum} height="32px" alt="" /> Ethereum
            </div>
          ),
        },
        {
          value: "MATIC",
          label: (
            <div>
              <img src={polygon} height="32px" alt="" /> Polygon
            </div>
          ),
        },
        {
          value: "BNB",
          label: (
            <div>
              <img src={binance} height="32px" alt="" /> Binance
            </div>
          ),
        },
      ]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputDescription, setInputDescription] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [inputBlockchain, setInputBlockchain] = useState('');
    const [extension, setExtension] = useState('image');
    const [previewLogoImage, setPreviewLogoImage] = useState('');
    const [previewBannerImage, setPreviewBannerImage] = useState('');

    const [nameError, setNameError] = useState("");
    const [desError, setDesError] = useState("");

    // Collection Logo
    const [logoCdn, setlogoCdn] = useState("");
    const [logoipfs, setlogoipfs] = useState("");
    const [compressedLogo, setCompressedLogo] = useState("")

    // Collection banner
    const [bannerIpfs, setbannerIpfs] = useState("");
    const [bannerCdn, setbannerCdn] = useState("");
    const [compressedBanner, setcompressedBanner] = useState("")
    const [blockchainOption, setBlockchainOption] = useState([]);
    const [blockchains, setBlockChains] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loaderState, setloaderState] = useState(false);


    const handleDescription = (e) => {
        if (e.target.value.length < 1000) {
            setDesError('')

            setInputDescription(e.target.value);
        } else {
            setDesError('Max characters limit 1000')
        }
    }

    const createCollection = async data => {

        console.log(data, 'data');
        try {
            const res = await fetch(`${httpConstants.BASE_URL2}/api/v1/collections${getParamTenantId()}`, {
                method: httpConstants.METHOD_TYPE.POST,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    "x-access-token": store?.store?.token
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            console.log(result);
            return result;
        } catch (err) {
            console.log(err);
        }
    };

    function blockchainValue(value) {
        switch (value) {
          case "ETH":
            return "Ethereum";
          case "MATIC":
            return "Polygon";
          case "BNB":
            return "Binance";
          case "Ethereum":
            return "Ethereum";
          case "Polygon":
            return "Polygon";
          case "Binance":
            return "Binance";
          default:
            return "";
        }
      }
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
        setloaderState(true);
        // e.preventDefault();
        if (
            previewBannerImage == "" ||
            previewLogoImage == "" ||            
            name.current == "" ||
            inputDescription == "" ||
            inputCategory == "" ||
            inputBlockchain == ""
        ) {
            console.log(
                imageUrl.current,
                name.current,
                inputDescription,
                inputCategory,
                inputBlockchain,
                "<<<"
            );

            setloaderState(false);

            toast.error('All Fields are required')
            return null;
        }
        if (format.test(name.current)) {
            console.log('Name should be not contain special character')
            setloaderState(false);
            return null;
        }
        if (name.current.length < 3) {
            console.log('Name Length must be 3 character');
            setloaderState(false);
            return null;
        }

        // let blockchainData = blockchainValue(inputBlockchain);

        const data = {
            coverUrl: previewBannerImage,
            // contractAddress: blockchainRes.contract_address,
            imageUrl: previewLogoImage,
            compressedURL: compressedLogo,
            name: name.current,
            currency:selectedOption?.value,
            description: inputDescription,
            blockchain: blockchainValue(selectedOption?.value),
            addedBy: store?.store?._id,
            categoryId: inputCategory,
            tenantId: store?.store?._id,
            walletAddress: store?.walletAddress
        };

        //-----------------------
        const result = await createCollection(data);
        if (result.success) {
            const [blockchainError, blockchainRes] = await parseResponse(
                BlockchainServices.createCollections({
                    name: name.current,
                    symbol: 'WL',
                    blockchain: inputBlockchain

                })
            );

            console.log(blockchainError, blockchainRes)

            if (blockchainError || !blockchainRes) {
                const [txError, txStatusRes] = await parseResponse(
                    updateCollectionTxStatus({
                        contractAddress: "0x",
                        status: "failed"
                    }, result.responseData._id)
                )                
                setloaderState(false);

                return toast.error(blockchainError.message || 'Please select a valid network')
            }
            else {
                const [txErr, txStatus] = await parseResponse(
                    updateCollectionTxStatus({
                        contractAddress: blockchainRes.contract_address,
                        status: "success"
                    }, result.responseData._id)
                )
                console.log("no error blockchain side", txStatus)

                setloaderState(false);
                setcreateNFTActive(false)

                toast.success('Collection Created');
                navigate('/my-items/nfts')

            }

        } else {
            console.log(result.message);
        }

    }


    useEffect(() => {
        fetch(`${httpConstants.BASE_URL1}/api/v1/categories${getParamTenantId()}`)
            .then(response => response.json())
            .then(result => setCategories(result.responseData))
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
                loaderState && <MintPopup logoCdn={previewLogoImage} name={name.current} blockchain={inputBlockchain} />
            }

            <div className="addStoreItem">
                <div className="addFeaturedAssestsContainer">
                    <HeadingTittle>Create Collection</HeadingTittle>
                    <div
                        className=" confirmationModalHeading confirmationModalCross"
                        onClick={() => setcreateNFTActive(false)}
                    >
                        <img src={close}></img>
                    </div>
                </div>

                <FileDiv>
                    <UploadFile>Upload File*</UploadFile>
                    <DropFileCollection>
                        <CollectionFileDropzone
                            bannerCdn={logoCdn}
                            setbannerCdn={setlogoCdn}
                            bannerIpfs={logoipfs}
                            setbannerIpfs={setlogoipfs}
                            compressedUrl={compressedLogo}
                            setCompressedUrl={setCompressedLogo}
                            setExtension={setExtension}
                            config={{accept: "image/*", size: '10485760'}}
                            setPreviewLogoImage={setPreviewLogoImage}
                            key={1}
                        />
                    </DropFileCollection>

                    <UploadFile>Upload Banner*</UploadFile>
                    <DropFileBanner>
                        <CollectionFileDropzone
                            bannerCdn={bannerCdn}
                            setbannerCdn={setbannerCdn}
                            bannerIpfs={bannerIpfs}
                            setbannerIpfs={setbannerIpfs}
                            compressedUrl={compressedBanner}
                            setCompressedUrl={setcompressedBanner}
                            setExtension={setExtension}
                            setPreviewLogoImage={setPreviewBannerImage}
                            config={{accept: "image/*", size: '10485760'}}
                            key={2}
                        />
                    </DropFileBanner>

                    <UploadFileHint>
                        Supported(JPG, PNG, GIF, SVG) Max size: 40 mb
                    </UploadFileHint>
                </FileDiv>

                <Fields>
                    <ContainerFirst>
                        <TitleField>Name*</TitleField>
                        <div style={{ color: "#ff5050", fontSize: "13px" }}>{nameError}</div>
                        <InputField
                            ref={name}
                            style={{ border: nameError != "" ? "1px solid red" : "1px solid #C8C8C8" }}
                            placeholder="Write your collection name"
                            onChange={(e) => {
                                name.current = e.target.value;
                                var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
                                if (!format.test(name.current))
                                    setNameError("")
                                else if (name.current.length != 0)
                                    setNameError("")
                                else if (!name.current.length < 3)
                                    setNameError("( Name should be atleast 3 character )")
                                //checkReqFieldFun();
                            }}
                        />
                    </ContainerFirst>

                    <ContainerSecond>
                        <TitleField>Description*</TitleField>
                        <div style={{ color: "#ff5050", fontSize: "13px" }}>{desError}</div>
                        <TextAreaField
                        placeholder="Write description"
                            ref={description}
                            value={inputDescription}
                            onChange={(e) => handleDescription(e)}
                        ></TextAreaField>
                    </ContainerSecond>
                    <ContainerSecond className="containerSecond">
                        <TitleField>Category*</TitleField>
                        <SelectField className="input-category" onChange={(e) => setInputCategory(e.target.value)}>
                            <option disabled selected>Select Category</option>
                            {
                                categories.length &&
                                categories.map((item) => (
                                    <option value={item._id}>{item.name}</option>
                                ))
                            }
                        </SelectField>
                    </ContainerSecond>

                    <ContainerSecond>
                        <TitleField>Blockchain*</TitleField>
                        <Select
                      className="input-box-1 rm-border blockchainSelect"
                      onChange={setSelectedOption}
                      options={defaultValueBlockChain} //options there
                      placeholder="Select Blockchain"
                      value={ selectedOption } //when user select a option from the list
                    ></Select>
                    </ContainerSecond>

                    <ButtonDiv>
                        <Button style={{cursor: 'pointer'}} onClick={(e) => handleFormSubmit(e)}>Create</Button>
                    </ButtonDiv>
                </Fields>
            </div>
        </>
    )
}

export default MyCollectionPopUp