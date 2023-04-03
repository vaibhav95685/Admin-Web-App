import React, { useEffect, useRef, useState } from "react";
import "./styles/myStore.css";
import "./styles/generalSetting.css";
import "./styles/metaSpace.css";
import "react-toastify/dist/ReactToastify.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { updateStore } from "../../actions/storeActions";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import MetaSpaceBanner from "../../assets/images/MetaSpace-banner.png";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import AddFeaturedAssestsModal from "./addFeaturedAssestModal";
import { updateMetaSpace } from "../../services";
import Modal from "react-modal"
import { httpConstants } from "../../constants";

const ManageMetaSpace = ({ store, walletAddress, updateStore }) => {
  const dispatch = useDispatch();

  const [saveActive, setSaveActive] = useState(false);
  const [dataCheck,setDataCheck]=useState(false);
  const [isSaveClicked, setisSaveClicked] = useState(false);
  const [requestSent,setRequestSent]=useState(false);
  const [write,setWrite]=useState(false);

  const metaSpaceLink = useRef(store?.metaSpace?.metaSpaceLink);
  const [textareaValue2, setTextareaValue2] = useState(
    store?.metaSpace?.metaSpaceLink
  );
  const [addFeaturedAssests, setAddFeaturedAssests] = useState(false);
  const [featuredAssetsData, setFeaturedAssetsData] = useState(
    store?.metaSpace?.assets ? store?.metaSpace?.assets : []
  );
  const requestSentStyle = {
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

  const coverImageUrl = useRef(store?.metaSpace?.banner);
  const [coverImageStyle, setCoverImageStyle] = useState("center");

  const [files, setFiles] = useState(
    store?.metaSpace?.banner !== ""
      ? [
          {
            name: store?.metaSpace?.banner,
            preview: store?.metaSpace?.banner,
          },
        ]
      : []
  );

  const [bannerPresent, setBannerPresent] = useState(
    store?.metaSpace?.banner !== "" ? true : false
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setBannerPresent(true);
      setSaveActive(true);
    },
    onDropRejected: (error) => {
      toast.error("File type not acceptable. Please use PNG file");
      setBannerPresent(false);
    },
  });

  const handleFeaturedAssetRemove = (_id) => {
    const newData = featuredAssetsData.filter((item) => item.contentId != _id);
    setFeaturedAssetsData(newData);
    setSaveActive(true);

    dispatch({ type: "UPATE_APPEARANCE_FEATURE_ASSETS", payload: newData });
  };

  const handleSubmit = async () => {
    setisSaveClicked(true);
    const formData = new FormData();
    formData.append("folderName", "store");
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
    if (result.success) coverImageUrl.current = result.responseData;

    const data = {
      banner: coverImageUrl.current,
      metaSpaceLink: metaSpaceLink.current,
      assets: featuredAssetsData,
    };

    const result2 = await updateMetaSpace(store._id, data, store.token);
    if (result2.success) {
      updateStore({ store: result2.responseData });
      setRequestSent(true);
     // toast.success("Updated metaSpace");
    } else {
      result2.errors.map((item) => toast.error(item.message));
    }
    setSaveActive(false);
    setisSaveClicked(false);
  };

  return (
    <>
      <div className="myStoreFormContainer">
        <div className="generalSettingsForm">
          <div className="myStoreHeading1">Manage MetaSpace</div>
          <div className="forminnerContainer">
            {!bannerPresent && (
              <div className="appearanceDragandDrop" {...getRootProps()}>
                <input {...getInputProps()} />
                <FaCloudUploadAlt className="draganddropboxIcon" />
                <span className="draganddropboxinnerdivtextspan">
                  Drag and Drop or
                  <span className="draganddropboxinnerdivtextspanbrowse">
                    {" "}
                    Browse
                  </span>
                </span>
              </div>
            )}
            {bannerPresent && (
              <div
                style={
                  files.length > 0
                    ? {
                        background: `url(${files[0].preview})`,
                        backgroundPosition: `${coverImageStyle}`,
                      }
                    : {}
                }
                className="appearanceDragandDrop appearanceDragandDropPreview "
              >
                {/* {images} */}
              </div>
            )}
            <div className="myStoreHeading1"> Your Metaspace link</div>
            
            
            {write ? <div className="formInputContainer">
              <input
                type="text"
                className="formsInput"
                onChange={(e) => {
                  const { value } = e.target;
                  value.trim() == "" || value.trim() == null
                    ? setSaveActive(false)
                    : setSaveActive(true);
                  metaSpaceLink.current = e.target.value;
                  setTextareaValue2(e.target.value);
                }}
                defaultValue={store?.metaSpace?.metaSpaceLink}
                placeholder="Write metaspace link here"
                value={textareaValue2}
                // maxlength="50"
              />
            </div>
            :
            <div className="metaspace-write-div" onClick={()=>setWrite(true)}>
              <span  className="metaspaceCaption">Write metaspace link here</span>
            </div>
            }
          <Modal
          isOpen={requestSent}
          style={requestSentStyle}
          ariaHideApp={false}
        >
          <div className="request-container">
            <div className="request-main-container">
              <h1 className="request-sent"> Request Sent</h1>
              <label className="label-request">We have successfully sent your request</label>
              <div className="button-div-request">
                <button className="request-ok-button" onClick={()=>setRequestSent(false)}>ok</button>
              </div>
            </div>

          </div>
        </Modal>

            
            {/* <div className="metaspace-link-div">
                    <p className="metaspace-link-text">No metaspace link created</p>
               </div> */}
            <div className="metaSpace-link-message">
              MetaSpace link will be available when your NFT assets publish
              request is rendered and available for the users
            </div>
            <div className="assets-heading-div">
              <div className="myStoreHeading1">Metaspace Assets</div>
              <div>
                <button
                  className="button"
                  onClick={() => setAddFeaturedAssests(true)}
                >
                  Add
                </button>
              </div>
            </div>
            {/* <div className="assets-div">
                    <p className="no-nft-text">No NFT added</p>
                </div> */}
            <div className="assetsListContainer">
              {!featuredAssetsData.length === 0 && (
                <div className="assetsListHeaderContainer">
                  <div className="assetsListSerialnoColumn">
                    <div className="myStoreHeading3">#</div>
                  </div>
                  <div className="assetsListNameColumn">
                    <div className="myStoreHeading3">Name</div>
                  </div>
                  <div className="assetsListLinkColumn">
                    <div className="myStoreHeading3">Link</div>
                  </div>
                </div>
              )}

              {featuredAssetsData?.map((item, index) => (
                <div className="assetsListEachContainer" key={item?._id}>
                  <div className="assetsListSerialnoColumn">
                    <div className="myStoreHeading3 myStoreHeading3AppearanceList">
                      {index + 1}
                    </div>
                  </div>
                  <div className="assetsListNameColumn">
                    <div className="myStoreHeading3 myStoreHeading3AppearanceList">
                      <img
                        src={
                          item?.link === "" || !item?.link
                            ? defaultAssetImage
                            : item?.link
                        }
                        alt=""
                      />
                      {item?.name}
                    </div>
                  </div>
                  <div className="assetsListLinkColumn">
                    <a
                      href={`https://www.nftinger.com/nft-information/${item?.contentId}`}
                      target="_blank"
                      className="myStoreHeading3 myStoreHeading3AppearanceList myStoreHeading3AppearanceListLink"
                      style={{ textDecoration: "none" }}
                    >
                      View NFT
                    </a>
                    <div
                      className="myStoreHeading3 myStoreHeading3AppearanceList myStoreHeading3AppearanceListRemove"
                      onClick={() => handleFeaturedAssetRemove(item?.contentId)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              ))}

              {featuredAssetsData.length === 0 ? (
                <div className="assets-div">
                  <p className="no-nft-text">No NFT added</p>
                </div>
              ) : null}
            </div>
            {saveActive && !isSaveClicked && (
              <div className="formsaveButtonContainer" onClick={handleSubmit}>
                <button className="formsaveButton metaspaceButton">Send Publish Request</button>
              </div>
            )}
            {!saveActive && (
              <div
                className="formsaveButtonContainer"
                style={{ opacity: "0.55" }}
              >
                <button className="formsaveButton metaspaceButton">Send Publish Request</button>
              </div>
            )}
          </div>
          <AddFeaturedAssestsModal
            addFeaturedAssests={addFeaturedAssests}
            setAddFeaturedAssests={setAddFeaturedAssests}
            featuredAssetsData={featuredAssetsData}
            setFeaturedAssetsData={setFeaturedAssetsData}
            setSaveActive={setSaveActive}
            setDataCheck={setDataCheck}
          />
        </div>
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
    walletAddress: state.store.walletAddress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (data) => dispatch(updateStore(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMetaSpace);
