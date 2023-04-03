import React, { useEffect, useState } from "react";
import "./styles/collectionDetails.css";
import { BiArrowBack } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import {
  getCollectionNfts,
  getParticularCollection,
  delistReportedCollection,
  relistDelistedCollection,
  getNftsByCollectionId,
} from "../../services";
import Heart from "../../assets/icons/heart.png";
import ConfirmationModal from "../../common/components/confirmationModal";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defaultContentImage } from "../../utility";
import { BiHeart } from "react-icons/bi";

const CollectionDetails = ({
  collectionId,
  setCollectionDetails,
  setReviewCollection,
  pageName,
}) => {
  const navigate = useNavigate();

  const [particularCollection, setParticularCollection] = useState({});
  const [collectionNfts, setCollectionNfts] = useState([]);

  useEffect(async () => {
    await getParticularCollection(collectionId, setParticularCollection);
    const nftRes = await getNftsByCollectionId(collectionId);
    if (nftRes.success) setCollectionNfts(nftRes.responseData.nftContent);
    else toast.info("Internal server error.");
  }, [collectionId]);

  // console.log(particularCollection);

  const [relistModalOpen, setRelistModalOpen] = useState(false);
  const [delistModalOpen, setDelistModalOpen] = useState(false);
  const [deleteReportModalOpen, setDeleteReportModalOpen] = useState(false);

  const handleDelistReportedCollection = async () => {
    const result = await delistReportedCollection(collectionId);
    if (result.success) {
      setDelistModalOpen(false);
      toast.info("Collection delisted.");
      setTimeout(() => {
        // setCollectionDetails(false);
        // setReviewCollection(false);
        navigate("/manage-content/delisted-collection");
      }, 1000);
    } else {
      setDelistModalOpen(false);
      toast.info(result.message);
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
      setRelistModalOpen(false);
      toast.info("Collection relisted.");
      setTimeout(() => {
        // setCollectionDetails(false);
        // setReviewCollection(false);
        navigate("/manage-content/reported-collections");
      }, 1000);
    } else {
      setRelistModalOpen(false);
      toast.info(result.message);
    }
  };

  return (
    <>
      <div className="collectionComponent">
        <div className="addBlogHeaderContainer">
          <BiArrowBack
            className="addBlogHeaderIcon"
            onClick={() => setCollectionDetails(false)}
          />
          <div className="myStoreHeading1">Collection Details</div>
        </div>
        <div
          className="collectionDetailsContainer"
          style={{
            ["background-image"]:
              particularCollection.coverUrl !== ""
                ? `url(${particularCollection.coverUrl})`
                : `url('https://cdn.pixabay.com/photo/2021/12/08/15/53/traffic-6856075_960_720.jpg')`,
          }}
        >
          <div className="collectionDpContainer">
            <img src={particularCollection?.imageUrl} alt="" />
          </div>
          <div className="collectionNameContaienr">
            {particularCollection?.name}
          </div>
          <div className="collectionDescriptionContainer">
            {particularCollection?.description}
          </div>
          {pageName === "reportedCollection" && (
            <div className="collectionDetailButtonContainer">
              {/* <div
                className='button1CollectionDetails'
                onClick={() => {
                  setDeleteReportModalOpen(true);
                }}
              >
                Delete Report
              </div> */}
              <div
                className="button2CollectionDetails"
                onClick={() => {
                  setDelistModalOpen(true);
                }}
              >
                Delist
              </div>
            </div>
          )}
          {pageName === "delistedCollection" && (
            <div
              className="collectionDetailButtonContainer"
              onClick={() => {
                setRelistModalOpen(true);
              }}
            >
              <div className="button2CollectionDetails">Relist</div>
            </div>
          )}
        </div>
        <div className="sortingContainer collectionDetailssortingContainer">
          <div className="collectionDetailsSearchContainer">
            <div className="collectionDetailSearch" style={{ height: "42px" }}>
              <input type="text" placeholder="search" />
              <AiOutlineSearch />
            </div>
          </div>
          <div className="collectionFilterContainer">
            <div className="saleTypeandPricingContainer CollectionDetailssaleTypeandPricingContainer">
              <div className="saleTypeandPricing saleTypeandPricingCollectionDetail">
                Sale Type <span className="saleTypeandPricingType">All</span>
                <BsChevronDown className="saleTypeandPricingdowmarrow" />
              </div>
              <div className="saleTypeandPricing saleTypeandPricingCollectionDetail">
                Price range <span className="saleTypeandPricingType">All</span>
                <BsChevronDown className="saleTypeandPricingdowmarrow" />
              </div>
            </div>
            <div className="sortBy sortByCollectionDetails">
              <div className="saleTypeandPricing sortByDiv sortByDivCollectionDetails">
                Sort by <span className="saleTypeandPricingType">All</span>
                <BsChevronDown className="saleTypeandPricingdowmarrow" />
              </div>
            </div>
          </div>
        </div>
        <div className="collectionDetailsNftsContainer">
          {collectionNfts.map((item) => (
            <div
              className="myItemnftEach collectionDetailsNftEach"
              key={item._id}
            >
              <img
                src={item.ipfsUrl !== "" ? item.ipfsUrl : defaultContentImage}
                alt=""
              />
              <div className="collectionNftEachTitleContainer">
                <div className="myItemsNftTitle">{item.name}</div>
                <div className="collectionNftEachTitlePrice">
                  {/* {item.fixedPriceDetails.price}{" "} */}
                  {/* {item.fixedPriceDetails.currency} */}
                </div>
              </div>

              <div className="myItemsNftsbiddetailContainer">
                <div className="bidDetails">
                  <span>
                    {item.salesInfo.price} {item.salesInfo.currency}
                  </span>{" "}
                </div>
                {/* <div className='nftLikes'>
                  {item.likesCount}
                  <img src={Heart} alt='' />{' '}
                </div> */}
                <div className="nftLikes">
                  {item.likesCount}{" "}
                  {item.likesCount === 0 ? (
                    <BiHeart className="blankHeartIconMyitems" />
                  ) : (
                    <img src={Heart} alt="" />
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* <div className='myItemnftEach collectionDetailsNftEach'>
          <img
            src='https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg'
            alt=''
          />
          <div className='collectionNftEachTitleContainer'>
            <div className='myItemsNftTitle'>Abstract Texture</div>
            <div className='collectionNftEachTitlePrice'>0.32 ETH</div>
          </div>
          <div className='myItemsNftsbiddetailContainer'>
            <div className='bidDetails'>
              Highest bid: <span>0.48 ETH</span>{' '}
            </div>
            <div className='nftLikes'>
              34
              <img src={Heart} alt='' />{' '}
            </div>
          </div>
        </div>
        <div className='myItemnftEach collectionDetailsNftEach'>
          <img
            src='https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg'
            alt=''
          />
          <div className='collectionNftEachTitleContainer'>
            <div className='myItemsNftTitle'>Abstract Texture</div>
            <div className='collectionNftEachTitlePrice'>0.32 ETH</div>
          </div>
          <div className='myItemsNftsbiddetailContainer'>
            <div className='bidDetails'>
              Highest bid: <span>0.48 ETH</span>{' '}
            </div>
            <div className='nftLikes'>
              34
              <img src={Heart} alt='' />{' '}
            </div>
          </div>
        </div>
        <div className='myItemnftEach collectionDetailsNftEach'>
          <img
            src='https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg'
            alt=''
          />
          <div className='collectionNftEachTitleContainer'>
            <div className='myItemsNftTitle'>Abstract Texture</div>
            <div className='collectionNftEachTitlePrice'>0.32 ETH</div>
          </div>
          <div className='myItemsNftsbiddetailContainer'>
            <div className='bidDetails'>
              Highest bid: <span>0.48 ETH</span>{' '}
            </div>
            <div className='nftLikes'>
              34
              <img src={Heart} alt='' />{' '}
            </div>
          </div>
        </div>
        <div className='myItemnftEach collectionDetailsNftEach'>
          <img
            src='https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg'
            alt=''
          />
          <div className='collectionNftEachTitleContainer'>
            <div className='myItemsNftTitle'>Abstract Texture</div>
            <div className='collectionNftEachTitlePrice'>0.32 ETH</div>
          </div>
          <div className='myItemsNftsbiddetailContainer'>
            <div className='bidDetails'>
              Highest bid: <span>0.48 ETH</span>{' '}
            </div>
            <div className='nftLikes'>
              34
              <img src={Heart} alt='' />{' '}
            </div>
          </div>
        </div> */}
        </div>
        <ConfirmationModal
          modalIsOpen={relistModalOpen}
          setModalIsOpen={setRelistModalOpen}
          handleOk={handleRelistDelistedCollection}
          headingText={"Relist Collection"}
          text={"Are you sure you want to relist collection?"}
        />
        <ConfirmationModal
          modalIsOpen={delistModalOpen}
          setModalIsOpen={setDelistModalOpen}
          handleOk={handleDelistReportedCollection}
          headingText={"Delist Collection"}
          text={"Are you sure you want to delist collection?"}
        />
        <ConfirmationModal
          modalIsOpen={deleteReportModalOpen}
          setModalIsOpen={setDeleteReportModalOpen}
          headingText={"Delete Report"}
          text={"Are you sure you want to delete Report?"}
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
export default CollectionDetails;
