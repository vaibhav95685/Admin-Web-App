import React, { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import "./styles/reviewCollection.css";
import AssetProfilePic from "../../assets/profile3.jpeg";
import CollectionDetails from "./collectionDetails";
import "./styles/reviewNft.css";
import ConfirmationModal from "../../common/components/confirmationModal";
import { MdDelete } from "react-icons/md";
import {
  blockUser,
  deleteNftReport,
  getParticularNft,
  post_RemoveNft,
  post_undoRemoveNft,
} from "../../services";
import {
  defaultContentImage,
  defaultProfileImage,
  momentDate2,
} from "../../utility";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

const ReviewNft = ({
  store,
  nftId,
  reviewNft,
  setReviewNft,
  reviewNftData,
  setReviewNftData,
  reportedNfts,
  setReportedNfts,
  pageName,
}) => {
  const navigate = useNavigate();
  const [undoRemoveModal, setUndoRemoveModal] = useState(false);
  const [removeandBlockModal, setRemoveandBlockModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [deleteNftReportModal, setDeleteNftReportModal] = useState(false);
  const [nftDetails, setNftDetails] = useState({});
  const tempReportID = useRef("");
  const [inputId, setInputId] = useState("");

  useEffect(() => {
    async function fetchData() {
      await getParticularNft(nftId).then((res) => {
        setNftDetails(res);
      });
    }
    fetchData();
  }, [nftId]);



  const handleRemoveNft = async () => {
    const response = await post_RemoveNft(nftId);
    if (response.success) {
      toast.info("Nft Removed");
      setTimeout(() => {
        navigate("/manage-content/removed-nfts");
      }, 1000);
      setRemoveModal(false);
    } else {
      setRemoveModal(false);
      toast.info(response.message);
    }

    // if (response) {
    //   console.log('nft removed');
    //   navigate('/manage-content/removed-nfts');
    //   setRemoveModal(false);
    // } else console.log('remove nft err');
  };
  const [blockedUserData , setBlockedUserData]=useState({
    isBlocked: true, 
    reportedInfo: {
        reportedBy: null,
        contentId: null,
        addedOn: null,
        reason: null,
    }

  });
  

  const handleRemoveNftAndBlockUser = async () => {
    const response = await post_RemoveNft(nftId);
    const blockUserRes = await blockUser(nftDetails.creator._id, store.token,blockedUserData);

    if (response.success) {
      toast.info("Nft removed.");
      // navigate('/manage-content/removed-nfts');
      setRemoveandBlockModal(false);
    } else {
      toast.info(response.message);
      setRemoveandBlockModal(false);
    }

    if (blockUserRes.success) {
      toast.info("User blocked.");
      setRemoveandBlockModal(false);
    } else {
      toast.info(blockUserRes.message);
      setRemoveandBlockModal(false);
    }
  };

  const handleUndoRemoveNft = async () => {
    const response = await post_undoRemoveNft(nftId);
    if (response.success) {
      toast.info("Nft unremoved.");
      setTimeout(() => {
        navigate("/manage-content/reported-nfts");
      }, 1000);
      setUndoRemoveModal(false);
    } else {
      setUndoRemoveModal(false);
      toast.info(response.message);
    }
    // if (response) {
    //   console.log('nft unremoved');
    //   navigate('/manage-content/reported-nfts');
    //   alert('nft unremoved');
    //   setUndoRemoveModal(false);
    // } else {
    //   setUndoRemoveModal(false);
    //   console.log('unremove nft err');
    // }
  };

  const handleDeleteNftReport = async () => {
    const response = await deleteNftReport(tempReportID.current);
    if (response.success) {
      toast.info("Nft report deleted.");
      setDeleteNftReportModal(false);
      const newData = {
        ...reviewNftData,
        reports: reviewNftData.reports.map((item) => {
          if (item._id === tempReportID.current)
            return { ...item, reportIsDeleted: true };
          else return item;
        }),
      };
      setReviewNftData(newData);
      const newReportedNfts = reportedNfts.map((item) => {
        if (item._id === nftId) return newData;
        else return item;
      });
      setReportedNfts(newReportedNfts);
      tempReportID.current = "";
    } else {
      console.log(response);
      tempReportID.current = "";
      toast.info(response.message);
      setDeleteNftReportModal(false);
    }

    // if (response) {
    //   console.log('nft report deleted');

    //   setDeleteNftReportModal(false);

    //   const newData = {
    //     ...reviewNftData,
    //     reports: reviewNftData.reports.map(item => {
    //       if (item._id === tempReportID.current)
    //         return { ...item, reportIsDeleted: true };
    //       else return item;
    //     }),
    //   };
    //   setReviewNftData(newData);
    //   const newReportedNfts = reportedNfts.map(item => {
    //     if (item._id === nftId) return newData;
    //     else return item;
    //   });
    //   setReportedNfts(newReportedNfts);

    //   tempReportID.current = '';
    // } else {
    //   tempReportID.current = '';
    //   setDeleteNftReportModal(false);
    //   console.log('delete nft report err');
    // }
  };

  const changeHandler = (value, item) => {
  
    console.log(blockedUserData,"<<<requestData")

  
    if (value) {
      
      setBlockedUserData({
        isBlocked: true, 
      reportedInfo: {
          reportedBy: item.addedBy,
          contentId: item.contentId,
          addedOn: item.addedOn,
          reason: item.reason,
      }
       
      });
     
    } else {
      setBlockedUserData({});
    }
    console.log(id,inputId,"<<<id")
  };

  const { owner, creator } = nftDetails;

  return (
    <>
      <div className="reviewCollectionOuterContainer">
        <div className="reviewCollectionComponent">
          <div className="addBlogHeaderContainer">
            <BiArrowBack
              className="addBlogHeaderIcon"
              onClick={() => setReviewNft(false)}
            />
            <div className="myStoreHeading1">Review NFT</div>
          </div>
          <div className="reviewNftEachContainer">
            <div className="reviewNftTitle">King of seven seas</div>
            <div className="reviewNftEachInnerContainer">
              <div className="reviewNftCard">
                <img
                  src={
                    reviewNftData?.collection?.imageUrl !== ""
                      ? reviewNftData?.collection?.imageUrl
                      : defaultContentImage
                  }
                  alt=""
                />
                <div className="reviewNftCardDetails">
                  <div className="reviewNftDetailTitleandButtonContainer">
                    <div>
                      <div className="reviewNftPrimaryTitle">Fantasy Arts</div>
                      <div className="reviewNftGreyTitle">
                        {reviewNftData?.collection?.name}
                      </div>
                    </div>
                    {pageName === "reportednftpage" && (
                      <div className="reviewNftButtonContainer">
                        <div
                          style={{ marginTop: 0 }}
                          className="button2CollectionDetails reviewCollectionDelistButton reviewNftFirstButton"
                          onClick={() => setRemoveModal(true)}
                        >
                          Remove Nft
                        </div>
                        <div
                          style={{ marginTop: 0 }}
                          className="button2CollectionDetails reviewCollectionDelistButton reviewNftSecondButton"
                          onClick={() => setRemoveandBlockModal(true)}
                        >
                          Remove NFT and Block User
                        </div>
                      </div>
                    )}
                    {pageName === "removednftpage" && (
                      <div className="reviewNftButtonContainer">
                        <div
                          style={{ marginTop: 0 }}
                          className="button2CollectionDetails reviewCollectionDelistButton reviewNftFirstButton"
                          onClick={() => setUndoRemoveModal(true)}
                        >
                          Undo Remove
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="myStoreHeading3 myStoreHeading3reportednftModal">
                    Description
                  </div>
                  <div className="reportedNftDescription">
                    {nftDetails?.description}
                  </div>
                  <div className="reportedNftOwnerContainer reviewNftOwnerContainer">
                    <img
                      className="reviewNftOwnerImage"
                      src={
                        owner != undefined ? owner[0]?.compressedURL : defaultProfileImage
                      }
                      alt=""
                    />
                    <div className="nftownerContainer">
                      <div className="nftownerTitle">Owner</div>
                      <div className="nftownerText">
                        {nftDetails?.owner?.userName
                          ? nftDetails?.owner?.userName !== ""
                            ? nftDetails?.owner?.userName
                            : nftDetails?.owner?.wallet_address
                          : nftDetails?.owner?.wallet_address}
                        {/* {nftDetails?.owner?.userName !== ''
                          ? nftDetails?.owner?.userName
                          : nftDetails?.owner?.wallet_address} */}
                      </div>
                    </div>
                    <img
                      className="reviewNftOwnerImage"
                      src={
                        creator != undefined ?  creator[0]?.compressedURL : defaultProfileImage
                      }
                      alt=""
                    />
                    <div className="nftownerContainer">
                      <div className="nftownerTitle">Creator</div>
                      <div className="nftownerText">
                        {nftDetails?.creator?.userName
                          ? nftDetails?.creator?.userName !== ""
                            ? nftDetails?.creator?.userName
                            : nftDetails?.creator?.wallet_address
                          : nftDetails?.creator?.wallet_address}
                        {/* {nftDetails?.creator?.userName !== ''
                          ? nftDetails?.creator?.userName
                          : nftDetails?.creator?.wallet_address} */}
                      </div>
                    </div>
                  </div>
                  
                  {pageName != "removednftpage" ?(
                    <>
                    <div className="myStoreHeading3 myStoreHeading3reportednftModal">
                    Link
                  </div>
                     <a
                     href={`${store.siteUrl.split("?")[0]}/nft-information/${nftId}`}
                     target="_blank"
                     className="myStoreHeading3 myStoreHeading3reportednftModalLink"
                     style={{
                       marginTop: "0.37037037037037035vh",
                       textDecoration: "none",
                     }}
                   >
                     View NFT
                   </a>
                   </>
                  ):"" }
                 
                </div>
              </div>
            </div>
          </div>
          <div className="reportedPersonsListContainer">
            <div className="reportedPersonsListHeaderContainer">
              <div className="reportedPersonsListColumn1 ">Reported By</div>
              <div className=" reportedPersonsListColumn2 ">Reason</div>
              <div className=" reportedPersonsListColumn3 ">Date</div>
            </div>
            {reviewNftData.reports.map((item) => (
              <div className="reportedPersonsListItemContainer" key={item._id}>
                <div className=" reportedPersonsListColumn1 ">Sam04</div>
                <div className=" reportedPersonsListColumn2 ">
                  {item.reason}
                </div>
                <div className=" reportedPersonsListColumn3 ">
                  {" "}
                  <div>{momentDate2(item.addedOn)}</div>{" "}
                  <input
                    className="reportCheckBox"
                    type="checkbox"
                    
                    name="report"
                    onChange={(e) => changeHandler(e.target.checked,item)}
                  />
                  {item.reportIsDeleted ? (
                    <div>deleted</div>
                  ) : (
                    <MdDelete
                      className=" reportedPersonsListColumn3Icon "
                      onClick={() => {
                        tempReportID.current = item._id;
                        setDeleteNftReportModal(true);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>
              </div>
            ))}
            {/* <div className='reportedPersonsListItemContainer'>
            <div className=' reportedPersonsListColumn1 '>Sam04</div>
            <div className=' reportedPersonsListColumn2 '>
              Copyright Infringement
            </div>
            <div className=' reportedPersonsListColumn3 '>
              <div>22 Nov, 01:20 AM</div>{' '}
              <MdDelete className=' reportedPersonsListColumn3Icon ' />
            </div>
          </div> */}
          </div>
        </div>
        <ConfirmationModal
          modalIsOpen={undoRemoveModal}
          setModalIsOpen={setUndoRemoveModal}
          handleOk={handleUndoRemoveNft}
          headingText={"Undo Remove"}
          text={"Are you sure you want to undo remove?"}
        />
        <ConfirmationModal
          modalIsOpen={removeandBlockModal}
          setModalIsOpen={setRemoveandBlockModal}
          handleOk={handleRemoveNftAndBlockUser}
          headingText={"Remove and BLock"}
          text={"Are you sure you want to remove nft and block user?"}
        />
        <ConfirmationModal
          modalIsOpen={removeModal}
          setModalIsOpen={setRemoveModal}
          handleOk={handleRemoveNft}
          headingText={"Remove Nft"}
          text={"Are you sure you want to remove nft?"}
        />
        <ConfirmationModal
          modalIsOpen={deleteNftReportModal}
          setModalIsOpen={setDeleteNftReportModal}
          handleOk={handleDeleteNftReport}
          headingText={"Delete Nft Report"}
          text={"Are you sure you want to delete this report?"}
        />
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

export default connect(mapStateToProps)(ReviewNft);
