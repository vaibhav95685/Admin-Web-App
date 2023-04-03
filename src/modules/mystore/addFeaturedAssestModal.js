import { React, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { BiUpload } from "react-icons/bi";
import EthereumIcon from "../../assets/icons/ethereum.png";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import "./styles/apperance.css";
import { addAsset, getAssets, getMaketplaceNft } from "../../services";
import { httpConstants } from "../../constants";
import { connect } from "react-redux";
import { defaultAssetImage } from "../../utility";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFeaturedAssestsModal = ({
  addFeaturedAssests,
  setAddFeaturedAssests,
  featuredAssetsData,
  setFeaturedAssetsData,
  setSaveActive,
  store,
  setDataCheck
}) => {
  const [createAssetsActive, setCreateAssetsActive] = useState(false);
  const [tempSelectedAsset, setTempSelectedAsset] = useState(null);
  const [createdAssetsDropDownData, setcreatedAssetsDropDownData] = useState([]);
  useEffect(async () => {
    setCurrentlySelectedAssests(featuredAssetsData);

    // const assets = await getAssets(store.token);
    const assets = await getMaketplaceNft(store.token);

    // const dropdownData = assets.filter((item) => {
    //   if (!featuredAssetsData.find((item2) => item2.name !== "")) {
    //     return item;
    //   } else return;
    // });

    // console.log(dropdownData, 'dropdownData')
    setcreatedAssetsDropDownData(assets);

  }, [addFeaturedAssests]);

  // utility
  const handleCreateAssests = () => {
    setCreateAssetsActive(true);
  };
  const handleCreateAssests2 = () => {
    setCreateAssetsActive(false);
  };

  //add assets functionality
  const [assestsDropDown, setAssestsDropDown] = useState(false);
  const [currentlySelectedAssests, setCurrentlySelectedAssests] = useState([]);

  const addSelectedAssests = () => {
    if (tempSelectedAsset !== null) {
      setCurrentlySelectedAssests([
        ...currentlySelectedAssests,
        tempSelectedAsset,
      ]);
      const newDropdown = createdAssetsDropDownData.filter(
        (item) => item._id !== tempSelectedAsset.contentId
      );
      
      setcreatedAssetsDropDownData(newDropdown);
      setTempSelectedAsset(null);
    }
  };

  const handleCurrentlySelectedAssetsRemove = (data) => {
    const newSelectedAssets = currentlySelectedAssests.filter(
      (item) => item._id !== data._id
    );
    setCurrentlySelectedAssests(newSelectedAssets);

    // adding the same data to dropdown
    const newDropdown = [...createdAssetsDropDownData, data];
    setcreatedAssetsDropDownData(newDropdown);
  };

  const handleDone = () => {

    let selectedAssets;
    if (featuredAssetsData.length > 0) {
      selectedAssets = currentlySelectedAssests.filter((item) => {
        if (featuredAssetsData.find((item2) => item2.contentId !== item._id)) {
          return item;
        } else return;
      });
    } else selectedAssets = currentlySelectedAssests;
    
    if(tempSelectedAsset !== null){
      setFeaturedAssetsData([...selectedAssets, tempSelectedAsset]);
    }else{
      setFeaturedAssetsData([...selectedAssets]);
    }


    setAddFeaturedAssests(false);
    setAssestsDropDown(false);
    setSaveActive(true);
  };

  // create asset
  const [files, setFiles] = useState([]);
  const [logoPresent, setLogoPresent] = useState(false);

  const name = useRef("");
  const description = useRef("");
  const ipfsUrl = useRef("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png,image/svg",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setLogoPresent(true);
    },
    onDropRejected: (error) => {
      toast.info("Non Supported File Format.");
      setLogoPresent(false);
    },
  });

  const images = files.map((file) => (
    <div key={file.name} className="previewImageDragandDrop">
      <img src={file.preview} alt="preview" style={{ borderRadius: "12px" }} />
    </div>
  ));

  const handleUploadAgain = () => {
    setFiles([]);
    setLogoPresent(false);
  };

  const handleSubmitAsset = async () => {
    const formData = new FormData();
    formData.append("folderName", "store_asset");
    formData.append("createdBy", store._id);
    formData.append("attachment", files[0]);

    const res = await fetch(
      `${httpConstants.BASE_URL2}/api/v1/upload-documents`,
      {
        method: httpConstants.METHOD_TYPE.POST,
        body: formData,
      }
    );
    const result = await res.json();

    if (result.success) ipfsUrl.current = result.responseData;
    const data = {
      name: name.current,
      description: description.current,
      ipfsUrl: ipfsUrl.current,
    };

    const addAssetResponse = await addAsset(data, store.token);
    // console.log(addAssetResponse, '<<< asset added');
    if (addAssetResponse.success) {
      toast.success("Asset Created.");
      const newDropdown = [
        ...createdAssetsDropDownData,
        addAssetResponse.responseData,
      ];
      setcreatedAssetsDropDownData(newDropdown);
      setTextareaValue("");
      handleUploadAgain();
      handleCreateAssests2();
    } else addAssetResponse.errors.map((item) => toast.info(item.message));

    if(addAssetResponse.success == false){
      toast.info(addAssetResponse.message)
    }
    
    // if (result.success) {
    //   ipfsUrl.current = result.responseData;

    //   const data = {
    //     name: name.current,
    //     description: description.current,
    //     ipfsUrl: ipfsUrl.current,
    //   };

    //   const addAssetResponse = await addAsset(data, store.token);
    //   // console.log(addAssetResponse, '<<< asset added');
    //   if (addAssetResponse.success) {
    //     toast.info("Asset Created.");
    //     const newDropdown = [
    //       ...createdAssetsDropDownData,
    //       addAssetResponse.responseData,
    //     ];
    //     setcreatedAssetsDropDownData(newDropdown);
    //     setTextareaValue("");
    //     handleUploadAgain();
    //     handleCreateAssests2();
    //   } else addAssetResponse.errors.map((item) => toast.info(item.message));
    // } else {
    //   toast.info("Image Upload error");
    //   console.log(result, "<<< upload Doc err");
    // }
  };

  //   textarea word count
  const [textareaValue, setTextareaValue] = useState("");

  let lenght = 0;
  lenght = textareaValue ? textareaValue.length : 0;

  //   textarea word count
  const [textareaValue2, setTextareaValue2] = useState("");

  let lenght2 = 0;
  lenght2 = textareaValue2 ? textareaValue2.length : 0;

  //   textarea word count
  const [textareaValue3, setTextareaValue3] = useState("");

  let lenght3 = 0;
  lenght3 = textareaValue3 ? textareaValue3.length : 0;

  // custom styles
  const AddFeaturedAssestsCustomStyles = {
    content: {
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      backgroundColor: "#0e1d2c7d",
      position: "absolute",
      top: 0,

      left: 0,
      border: "none",
      borderRadius: 0,
    },
  };

  const [q, setQ] = useState('');


  const filteredResults = (data) => {

    const newItems = data.filter((item) => {
      return item.name.toLowerCase().includes(q.toLowerCase());
    });

    return newItems;
  }


  const handleInputSearch = (e) => {

    setAssestsDropDown(true);
    setQ(e.target.value)

  }


  return (
    <>
      <div>
        <Modal
          isOpen={addFeaturedAssests}
          style={AddFeaturedAssestsCustomStyles}
          ariaHideApp={false}
        >
          {!createAssetsActive ? (
            <div className="addFeatureAssestsModalContainer">
              <div className="addFeaturedAssestsContainer">
                <div className="confirmationModalHeading">
                  Add Featured Assests
                </div>
                <div
                  className=" confirmationModalHeading confirmationModalCross"
                  onClick={() => {
                    setAddFeaturedAssests(false);
                    setAssestsDropDown(false);
                  }}
                >
                  X
                </div>
              </div>
              <div className="confirmationModalText addAssetstext">
                You can select or create assets so that they can get featured on
                the home page
              </div>
              <div className="addFeatureAssestsHeading2Container">
                <div className="addFeatureAssestsHeading2">Assests</div>
                {/* <div
                  className="addFeatureAssestsHeading2 addFeatureAssestsHeading2ColorPrimary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCreateAssests()}
                >
                  Create
                </div> */}
              </div>
              {currentlySelectedAssests.length > 0 && currentlySelectedAssests.map((item) => (
                <div className="addCategoryInputContainer 1" key={item?.contentId}>
                  <div
                    className="formInputContainer formInputContainerAddCategory assestsListContainer"
                    style={{ color: "#585858" }}
                  >
                    <img
                      src={
                        item?.link !== "" ? item?.link : defaultAssetImage
                      }
                      alt=""
                    />
                    <div className="appreanceAddAssestsText">{item?.name}</div>
                  </div>
                  <div
                    className="addAnotherCategory addAssestsCross"
                    style={{
                      fontSize: "1.4vw",
                      color: "black",
                      borderColor: "black",
                    }}
                    onClick={() => handleCurrentlySelectedAssetsRemove(item)}
                  >
                    x
                  </div>
                </div>
              )) }
              <div className="addCategoryInputContainer 2">
                <div className="formInputContainer formInputContainerAdvancedSetting formInputContainerAddCategory">
                  {tempSelectedAsset ? (
                    <div
                      className="formInputContainer formInputContainerAddCategory assestsListContainer"
                      style={{
                        color: "#585858",
                        marginTop: 0,
                        marginBottom: 0,
                        border: "none",
                      }}
                    >
                      <img
                        src={
                          tempSelectedAsset.link !== ""
                            ? tempSelectedAsset.link
                            : defaultAssetImage
                        }
                        alt=""
                      />
                      <div className="appreanceAddAssestsText" >
                        {tempSelectedAsset.name}
                      </div>
                    </div>
                  ) : (
                    <input type={`text`} placeholder="Search NFTs here..." onChange={(e)=>handleInputSearch(e)} className="appreanceAddAssestsText" />
                  )}

                  {!assestsDropDown && (
                    <div>
                      <BsChevronDown
                        className="saleTypeandPricingdowmarrow"
                        onClick={() => setAssestsDropDown(!assestsDropDown)}
                      />
                    </div>
                  )}
                  {assestsDropDown && (
                    <div>
                      <BsChevronUp
                        className="saleTypeandPricingdowmarrow"
                        onClick={() => setAssestsDropDown(!assestsDropDown)}
                      />
                    </div>
                  )}
                </div>
                <div
                  className="addAnotherCategory"
                  onClick={() => addSelectedAssests()}
                >
                  +
                </div>
              </div>
              
              {assestsDropDown && (
                <AddAssestsDropDown
                  createdAssetsDropDownData={filteredResults(createdAssetsDropDownData)}
                  setAssestsDropDown={setAssestsDropDown}
                  setTempSelectedAsset={setTempSelectedAsset}
                />
              )}

              <div className="addCategoryButtonContainer" onClick={handleDone}>
                <div className="formsaveButton addCategoryButton">Done</div>
              </div>
            </div>
          ) : (
            <div className="addFeatureAssestsModalContainerCreate">
              <div className="addFeaturedAssestsContainer">
                <div className="confirmationModalHeading">Add Item</div>
                <div
                  className=" confirmationModalHeading confirmationModalCross"
                  onClick={() => handleCreateAssests2()}
                >
                  X
                </div>
              </div>
              <div className="myStoreHeading3"> Upload logo</div>
              {!logoPresent && (
                <div
                  className="draganddropbox addFeatureDropDownModal"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <div className="draganddropboxinnerdiv">
                    <FaCloudUploadAlt className="draganddropboxIcon" />
                    <span className="draganddropboxinnerdivtextspan">
                      Drag and Drop or
                      <span className="draganddropboxinnerdivtextspanbrowse">
                        {" "}
                        Browse
                      </span>
                    </span>
                  </div>
                </div>
              )}
              {logoPresent && (
                <div className="draganddropbox draganddropPreview">
                  {images}
                </div>
              )}
              <div className="formsecondarytext">
                Upload logo in .svg or .png format of size 136x40px
              </div>

              {logoPresent && (
                <div
                  className="draganddropboxUploadAgain"
                  onClick={handleUploadAgain}
                >
                  <BiUpload className="draganddropboxUploadAgainIcon" />
                  <div>Upload Again</div>
                </div>
              )}
              <div className="myStoreHeading2"> Name*</div>
              <div className="formInputContainer createAssestsInputContainer">
                <input
                  type="text"
                  className="formsInput"
                  placeholder="Enter Name"
                  onChange={(e) => {
                    name.current = e.target.value;
                    setTextareaValue2(e.target.value);
                  }}
                  maxlength="50"
                  value={textareaValue2}
                />
              </div>
              <div className="wordsUsedinModal">
                {lenght2} of 50 characters used.
              </div>
              <div className="myStoreHeading2"> Description*</div>
              <div className="formInputContainer createAssestsInputContainer">
                <textarea
                  type="text"
                  className="formsInput"
                  placeholder="Enter Description"
                  onChange={(e) => {
                    description.current = e.target.value;
                    setTextareaValue(e.target.value);
                  }}
                  maxlength="1000"
                  value={textareaValue}
                >
                  {textareaValue}
                </textarea>
              </div>
              <div className="wordsUsedinModal">
                {lenght} of 1000 characters used.
              </div>
              <div className="createAssestsCollectioContainer">
                <div className="myStoreHeading2"> Collection</div>
                {/* <div className="myStoreHeading2 addFeatureAssestsHeading2ColorPrimary ">
                  Create
                </div> */}
              </div>
              <div className="formInputContainer createAssestsInputContainer">
                <input
                  type="text"
                  className="formsInput"
                  placeholder="Enter Category"
                  maxlength="50"
                  value={textareaValue3}
                  onChange={(e) => {
                    setTextareaValue3(e.target.value);
                  }}
                />
              </div>
              <div className="wordsUsedinModal">
                {lenght3} of 50 characters used.
              </div>
              <div className="myStoreHeading2"> Blockchain</div>
              <div className="createAssestsBlockchainContainer">
                <div className="blockChainiconContainer">
                  <img src={EthereumIcon} alt="ethereum" />
                </div>
                Ethereum
              </div>
              <div
                className="addCategoryButtonContainer"
                onClick={handleSubmitAsset}
              >
                <div className="formsaveButton addCategoryButton">Add</div>
              </div>
            </div>
          )}
        </Modal>
      </div>
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    store: state.store.store,
  };
};

export default connect(mapStateToProps)(AddFeaturedAssestsModal);

const AddAssestsDropDown = ({
  setTempSelectedAsset,
  createdAssetsDropDownData,
  setAssestsDropDown,
}) => {
  // console.log(createdAssetsDropDownData);
  return (
    <div className="addAssestsDropDown">
      {createdAssetsDropDownData.map((item) => (
        <div
          className="formInputContainerAddCategory assestsListContainer assestsListContainerDropDown"
          style={{
            color: "#585858",
            marginTop: 0,
            padding: "2%",
            width: "100%",
            boxSizing: "border-box",
          }}
          key={item._id}
          onClick={() => {
            setTempSelectedAsset({
              contentId: item._id,
              name: item.name,
              link: item.compressedURL,
              fullUrl: item.ipfsUrl,
              blockchain: item.blockchain,
              salesInfo: item.salesInfo
            });
            setAssestsDropDown(false);
          }}
        >
          <img
            src={item.compressedURL !== "" ? item.compressedURL : defaultAssetImage}
            alt="image"
          />
          <div className="appreanceAddAssestsText">{item.name}</div>
        </div>
      ))}
    </div>
  );
};
