import React, { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import "./styles/reviewCollection.css";
import AssetProfilePic from "../../assets/profile3.jpeg";
import CollectionDetails from "./collectionDetails";
import ConfirmationModal from "../../common/components/confirmationModal";
import {
  deleteCollectionReport,
  delistReportedCollection,
  getNftsByCollectionId,
  relistDelistedCollection,
} from "../../services";
import { momentDate2 } from "../../utility";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewCollection = ({
  collectionId,
  reviewCollection,
  setReviewCollection,
  reviewCollectionData,
  setReviewCollectionData,
  reportedCollections,
  setReportedCollections,
  pageName,
}) => {
  const navigate = useNavigate();
  const [collectionDetails, setCollectionDetails] = useState(false);
  const [relistModal, setRelistModal] = useState(false);
  const [delistModalOpen, setDelistModalOpen] = useState(false);
  const [deleteReportModal, setDeleteReportModal] = useState(false);
  const [nftCount, setNftCount] = useState(0);
  const tempReportID = useRef("");

  useEffect(async () => {
    const nftRes = await getNftsByCollectionId(collectionId);
    if (nftRes.success) setNftCount(nftRes.responseData.listForLength);
    else toast.info("Internal server error.");
  }, [collectionId]);

  const handleDeleteReport = async () => {
    // console.log(tempReportID.current);
    const response = await deleteCollectionReport(tempReportID.current);
    if (response.success) {
      toast.info("Collection report deleted.");
      setDeleteReportModal(false);
      const newData = {
        ...reviewCollectionData,
        reports: reviewCollectionData.reports.map((item) => {
          if (item._id === tempReportID.current)
            return { ...item, reportIsDeleted: true };
          else return item;
        }),
      };
      setReviewCollectionData(newData);
      const newReportedCollections = reportedCollections.map((item) => {
        if (item._id === reviewCollectionData._id) return newData;
        else return item;
      });
      setReportedCollections(newReportedCollections);
      tempReportID.current = "";
    } else {
      toast.info(response.message);
      setDeleteReportModal(false);
      tempReportID.current = "";
    }

    // if (response) {
    //   console.log('collection report deleted');
    //   setDeleteReportModal(false);
    //   const newData = {
    //     ...reviewCollectionData,
    //     reports: reviewCollectionData.reports.map(item => {
    //       if (item._id === tempReportID.current)
    //         return { ...item, reportIsDeleted: true };
    //       else return item;
    //     }),
    //   };
    //   setReviewCollectionData(newData);
    //   const newReportedCollections = reportedCollections.map(item => {
    //     if (item._id === reviewCollectionData._id) return newData;
    //     else return item;
    //   });
    //   setReportedCollections(newReportedCollections);

    //   tempReportID.current = '';
    // } else {
    //   setDeleteReportModal(false);
    //   tempReportID.current = '';
    //   console.log(response, '<<< handleDeleteReport err');
    // }
  };

  const handleDelistReportedCollection = async () => {
    const result = await delistReportedCollection(collectionId);
    if (result.success) {
      setDelistModalOpen(false);
      toast.info("Collection delisted.");
      setTimeout(() => {
        navigate("/manage-content/delisted-collection");
      }, 1000);
    } else {
      toast.info(result.message);
      setDelistModalOpen(false);
    }

    // if (result) {
    //   setDelistModalOpen(false);
    //   console.log('collection delisted');
    //   navigate('/manage-content/delisted-collection');
    // }
  };

  const handleRelistDelistedCollection = async () => {
    const result = await relistDelistedCollection(collectionId);
    if (result.success) {
      setRelistModal(false);
      toast.info("Collection relisted.");
      setTimeout(() => {
        navigate("/manage-content/reported-collections");
      }, 1000);
    } else {
      console.log(result);
      setRelistModal(false);
      toast.info(result.message);
    }

    // if (result) {
    //   setRelistModal(false);
    //   console.log('collection relisted');
    //   navigate('/manage-content/reported-collections');
    // }
  };

  return (
    <>
      <div className="reviewCollectionOuterContainer">
        {!collectionDetails ? (
          <div className="reviewCollectionComponent">
            <div className="addBlogHeaderContainer">
              <BiArrowBack
                className="addBlogHeaderIcon"
                onClick={() => setReviewCollection(false)}
              />
              <div className="myStoreHeading1">Review Collection</div>
            </div>
            <div className="collectionBoxContainerReviewCollection">
              <div className="collectionCardReviewCollection">
                <div className="reviewCollectionTitle">King of Seven Seas</div>
                <div className="reviewCollectionCollectionCard">
                  <div
                    className="collectionEach reviewCollectionCollectionCard"
                    // key={item._id}
                    style={{ textDecoration: "none" }}
                    onClick={() => setCollectionDetails(true)}
                  >
                    {/* <div className='collectionEach' key={item._id}> */}
                    <img
                      src={reviewCollectionData?.collection?.imageUrl}
                      alt="collectionImage"
                    />
                    <div className="myItemsNftTitle">
                      {reviewCollectionData?.collection?.name}
                      {/* Kings of seven seas */}
                    </div>
                    <div
                      className="bidDetails totalItemsCollection"
                      style={{ color: "black" }}
                    >
                      Total Items:{" "}
                      <span className="myItemsPrimaryColour">
                        {/* 23 */}
                        {nftCount}
                      </span>{" "}
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div className="buttonContainerReviewCollection">
                {pageName === "delistedCollection" ? (
                  <div
                    className="button2CollectionDetails reviewCollectionDelistButton delist-button"
                    onClick={() => setRelistModal(true)}
                  >
                    Relist
                  </div>
                ) : (
                  <div
                    className="button2CollectionDetails reviewCollectionDelistButton delist-button"
                    onClick={() => setDelistModalOpen(true)}
                  >
                    Delist
                  </div>
                )}
              </div>
            </div>
            <div className="reportedPersonsListContainer">
              <div className="reportedPersonsListHeaderContainer">
                <div className="reportedPersonsListColumn1 ">Reported By</div>
                <div className=" reportedPersonsListColumn2 ">Reason</div>
                <div className=" reportedPersonsListColumn3 ">Date</div>
              </div>
              {reviewCollectionData?.reports.map((item) => (
                <div
                  className="reportedPersonsListItemContainer"
                  key={item._id}
                >
                  <div className=" reportedPersonsListColumn1 ">
                    {item.userOfReportedCollections[0].userName}
                  </div>
                  <div className=" reportedPersonsListColumn2 ">
                    {item.reason}
                  </div>
                  <div className=" reportedPersonsListColumn3 ">
                    {/* {momentDate2()} */}
                    {/* <div>22 Nov, 01:20 AM</div>{' '} */}
                    <div>{momentDate2(item.addedOn)}</div>{" "}
                    {item.reportIsDeleted ? (
                      <div>deleted</div>
                    ) : (
                      <MdDelete
                        className=" reportedPersonsListColumn3Icon "
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          tempReportID.current = item._id;
                          setDeleteReportModal(true);
                          //  handleDeleteReport(item._id)
                        }}
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
                22 Nov, 01:20 AM
              </div>
            </div> */}
            </div>
          </div>
        ) : (
          <CollectionDetails
            collectionId={collectionId}
            setCollectionDetails={setCollectionDetails}
            setReviewCollection={setReviewCollection}
            pageName={pageName}
          />
        )}
        <ConfirmationModal
          modalIsOpen={deleteReportModal}
          setModalIsOpen={setDeleteReportModal}
          handleOk={handleDeleteReport}
          headingText={"Delete Collection Report"}
          text={"Are you sure you want to delete this report?"}
        />
        <ConfirmationModal
          modalIsOpen={delistModalOpen}
          setModalIsOpen={setDelistModalOpen}
          handleOk={handleDelistReportedCollection}
          headingText={"Delist Collection"}
          text={"Are you sure you want to delist collection?"}
        />
        <ConfirmationModal
          modalIsOpen={relistModal}
          setModalIsOpen={setRelistModal}
          handleOk={handleRelistDelistedCollection}
          headingText={"Relist Collection"}
          text={"Are you sure you want to relist collection?"}
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

export default ReviewCollection;
