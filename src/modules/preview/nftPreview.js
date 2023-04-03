import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/nftPreview.css";
import NftPreviewNavbar from "./nftPreviewNavbar";
import image from "../../assets/images/1.jpg";
import { BsChevronDown } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import NftPreviewFooter from "./nftPreviewFooter";
import { getParticularNft } from "../../services";
import { BiHeart } from "react-icons/bi";

import binance from "../../assets/binance.svg";
import ether from "../../assets/ether.svg";
import ploygon from "../../assets/ploygon.svg";
import { toast } from "react-toastify";

const NftPreviewPage = () => {
  const location = useLocation();
  const { nftId } = location.state;

  const navigate = useNavigate();

  const [closeStatus, setCloseStatus] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [nftDetails, setNftDetails] = useState({});
  // console.log(nftDetails);

  useEffect(async () => {
    const nft = await getParticularNft(nftId);

    if(nft === undefined){
      toast.error('Oops.. data not found')
      navigate('/my-items/nfts')
    }

    setNftDetails(nft);
  }, [nftId]);

  const blockchainCheck = (blockchain) => {
    switch (blockchain) {
      case "Ethereum":
        return (
          <img className="currency-sign-nftinformation" src={ether}></img>
        );
      case "Polygon":
        return (
          <img className="currency-sign-nftinformation" src={ploygon}></img>
        );
      case "Binance":
        return (
          <img className="currency-sign-nftinformation" src={binance}></img>
        );
      default:
        return "";
    }
  };

  return (

    <>

      <div onClick={() => setCloseStatus(false)} className="close-preview" style={{ display: `${closeStatus ? 'block' : 'none'}` }}>
        <button onClick={(e) => { e.stopPropagation(); navigate(-1) }} className="btn btn-secondary">Close Preview</button>
      </div>
      <div className="nftPreviewPageContainer" onClick={() => setCloseStatus(true)}>

        <NftPreviewNavbar />
        <div className="nftPreviewMainContainer">
          <div className="nftPreviewImageContainer">

            {
              nftDetails.cdnUrl ?
                <img src={nftDetails.cdnUrl} alt="previewImage" />
                :
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="110"
                  height="110"
                  viewBox="0 0 110 110"
                >
                  <g id="image" transform="translate(-372 -618)">
                    <rect
                      id="Rectangle_271"
                      data-name="Rectangle 271"
                      width="110"
                      height="110"
                      transform="translate(372 618)"
                      fill="none"
                    />
                    <g
                      id="Icon_feather-image"
                      data-name="Icon feather-image"
                      transform="translate(380 626)"
                    >
                      <path
                        id="Path_34"
                        data-name="Path 34"
                        d="M15.053,4.5H88.926A10.553,10.553,0,0,1,99.479,15.053V88.926A10.553,10.553,0,0,1,88.926,99.479H15.053A10.553,10.553,0,0,1,4.5,88.926V15.053A10.553,10.553,0,0,1,15.053,4.5Z"
                        transform="translate(-4.5 -4.5)"
                        fill="none"
                        stroke={`#366eef`}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="5"
                      />
                      <path
                        id="Path_35"
                        data-name="Path 35"
                        d="M26.33,18.415A7.915,7.915,0,1,1,18.415,10.5,7.915,7.915,0,0,1,26.33,18.415Z"
                        transform="translate(10.607 10.607)"
                        fill="none"
                        stroke={`#366eef`}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="5"
                      />
                      <path
                        id="Path_36"
                        data-name="Path 36"
                        d="M91.926,41.383,65.543,15,7.5,73.043"
                        transform="translate(3.053 21.936)"
                        fill="none"
                        stroke={`#366eef`}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="5"
                      />
                    </g>
                  </g>
                </svg>
            }
          </div>
          <div className="nftPreviewImageDetailsContainer">
            {/* <div className="removeFromSaleContainer">
            <div className="removeFromSaleButton">Remove from sale</div>

          </div> */}
            <div className="nftPreviewHeading1">
              {nftDetails.name}
              <div className="removeFromSaleIcons">

                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '15px' }} width="31" height="31" viewBox="0 0 31 31">
                  <g id="share" transform="translate(-726 -565)">
                    <g id="Rectangle_211" data-name="Rectangle 211" transform="translate(726 565)" fill="#fff" stroke="#dcdcdc" stroke-width="1">
                      <rect width="31" height="31" rx="3" stroke="none" />
                      <rect x="0.5" y="0.5" width="30" height="30" rx="2.5" fill="none" />
                    </g>
                    <path id="Icon_awesome-share-alt" data-name="Icon awesome-share-alt" d="M12.375,11.25a3.36,3.36,0,0,0-2.1.735L6.67,9.733a3.394,3.394,0,0,0,0-1.465l3.6-2.252A3.369,3.369,0,1,0,9.08,4.108L5.477,6.36a3.375,3.375,0,1,0,0,5.281l3.6,2.252a3.375,3.375,0,1,0,3.295-2.642Z" transform="translate(733.625 570.676)" fill="#828282" />
                  </g>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31">
                  <g id="report" transform="translate(-777 -565)">
                    <g id="Group_122" data-name="Group 122" transform="translate(-825 392)">
                      <g id="Rectangle_210" data-name="Rectangle 210" transform="translate(1602 173)" fill="#fff" stroke="#dcdcdc" stroke-width="1">
                        <rect width="31" height="31" rx="3" stroke="none" />
                        <rect x="0.5" y="0.5" width="30" height="30" rx="2.5" fill="none" />
                      </g>
                      <path id="Path_108" data-name="Path 108" d="M47.271,33.777a1.776,1.776,0,0,1,1.776,1.776l-.454,10.595a1.318,1.318,0,0,1-1.322,1.322,1.256,1.256,0,0,1-1.322-1.322l-.454-10.595A1.776,1.776,0,0,1,47.271,33.777Zm1.6,19.065a2.264,2.264,0,1,1,.668-1.608A2.27,2.27,0,0,1,48.873,52.842Z" transform="translate(1570 145.223)" fill="#828282" />
                    </g>
                  </g>
                </svg>


              </div>
            </div>
            <div>
              <span className="currentprice">Current Price: </span>
              <span className="currencyandprice">
                {blockchainCheck(nftDetails?.blockchain)}
                {nftDetails.salesInfo?.price}
                {nftDetails.salesInfo?.currency}
              </span>
            </div>

            <div className="nftPreviewOwnedByContainer">
              <div className="nftPreviewOwnedByEach nft-width-50">
                Owned By:{" "}
                <span className="ntf-each-text" style={{ fontFamily: "poppins-bold" }}>
                  {nftDetails?.owner?.userName
                    ? nftDetails?.owner?.userName !== ""
                      ? nftDetails?.owner?.userName
                      : nftDetails?.owner?.wallet_address
                    : nftDetails?.owner?.wallet_address}
                </span>{" "}
              </div>
              <div className="nftPreviewOwnedByEach nft-width-50">
                Created By:{" "}
                <span className="ntf-each-text" style={{ fontFamily: "poppins-bold" }}>
                  {nftDetails?.creator?.userName
                    ? nftDetails?.creator?.userName !== ""
                      ? nftDetails?.creator?.userName
                      : nftDetails?.creator?.wallet_address
                    : nftDetails?.creator?.wallet_address}
                </span>{" "}
              </div>
            </div>

            <div className="dflex aligncenter" style={{ gap: "5px" }}>

              <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityIcon" style={{ width: '20px', color: 'rgb(54, 110, 239)' }}><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#366eff" /></svg>

              <div className="nftPreviewPrice" style={{ gap: "5px" }}>
                {nftDetails.viewsCount}
              </div>

              <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FavoriteIcon" style={{ width: '20px', color: 'rgb(239, 54, 67)' }}><path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ef3643" /></svg>

              <div className="nftPreviewPrice">{nftDetails.likesCount}</div>
            </div>

            <div className="nftPreviewOwnedByEach" style={{ margin: "20px 0" }}>
              <span style={{ fontFamily: "poppins-bold" }}>Description</span>{" "}
            </div>
            <div className="descriptionContainer">{nftDetails.description}</div>
            <div className="nftPreviewOwnedByEach" style={{ margin: "20px 0px",display:"flex",flexWrap:"nowrap" }}>
              <button className="nft-preview-solid">Buy Now</button>
              <button className="nft-preview-outline">Make Offer</button>
            </div>
            <div className="billingPeriodContainer nftPreviewBillingPeriod">
              <div
                onClick={() => {
                  setBillingPeriod("monthly");
                }}
                className={`billingPeriod ${billingPeriod === "monthly" && "billingPeriod--active"
                  }`}
              >
                Pricing History
              </div>
              <div
                onClick={() => {
                  setBillingPeriod("annual");
                }}
                className={`billingPeriod ${billingPeriod === "annual" && "billingPeriod--active"
                  }`}
              >
                Offers
              </div>
              <div
                onClick={() => {
                  setBillingPeriod("listing");
                }}
                className={`billingPeriod ${billingPeriod === "listing" && "billingPeriod--active"
                  }`}
              >
                Listing
              </div>
              <div
                onClick={() => {
                  setBillingPeriod("details");
                }}
                className={`billingPeriod ${billingPeriod === "details" && "billingPeriod--active"
                  }`}
              >
                Details
              </div>
            </div>
            <div className="bidsContainer">
              {/* <img src={Nftnobid} alt="Nftnobid" /> */}

              <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64">
                <g id="No_information_available" data-name="No information available" transform="translate(-556 -501.5)">
                  <rect id="Rectangle_1021" data-name="Rectangle 1021" width="65" height="64" transform="translate(556 501.5)" fill="none" />
                  <path id="noun-not-found-3773931" d="M116.56,35A11.56,11.56,0,0,0,105,46.569V79.232a11.556,11.556,0,0,0,11.56,11.561h32.663a11.563,11.563,0,0,0,11.569-11.562V46.569A11.568,11.568,0,0,0,149.222,35Zm-3.168,5.141a3.261,3.261,0,0,1,2.3.958l3.735,3.731,3.736-3.731a3.254,3.254,0,0,1,4.6,4.6l-3.735,3.735,3.735,3.729a3.256,3.256,0,0,1-4.6,4.608l-3.736-3.735-3.735,3.735a3.256,3.256,0,0,1-4.6-4.608l3.736-3.736L111.092,45.7a3.26,3.26,0,0,1,2.3-5.561Zm26.935,0a3.255,3.255,0,0,1,2.3.958l3.736,3.731L150.1,41.1a3.255,3.255,0,0,1,4.6,4.6l-3.729,3.726,3.729,3.736a3.256,3.256,0,0,1-4.6,4.608l-3.735-3.735-3.736,3.735a3.255,3.255,0,1,1-4.6-4.608l3.726-3.736L138.028,45.7a3.26,3.26,0,0,1,2.3-5.561Zm-7.509,28.673h0a16.7,16.7,0,0,1,6.606,1.3c4.12,1.758,6.816,5.123,6.816,8.895a.962.962,0,0,1-1.925,0c0-2.851-2.059-5.59-5.651-7.121a15.222,15.222,0,0,0-11.66.051c-3.565,1.562-5.577,4.321-5.532,7.17a.962.962,0,0,1-1.925.029c-.059-3.772,2.588-7.167,6.682-8.961a16.7,16.7,0,0,1,6.587-1.364Z" transform="translate(455.515 470.515)" fill="#e5e5e5" />
                </g>
              </svg>

              <div className="nobidsAvailableText">No information available</div>
            </div>
          </div>
        </div>
        <div className="nftPreviewMainContainer2">
          <div className="nftPreviewMainContainer2FirstContainer">
            <div className="nftPreviewOwnedByEach">
              <span style={{ fontFamily: "poppins-bold" }}>Activities</span>{" "}
            </div>
            <div className="filtersContainer">
              <div className="filtersContainerEach">
                Filter <BsChevronDown />
              </div>

            </div>
            <div className="eventTablePricingHistory">
              <div className="eventTablePricingHistoryColumn1">Event</div>
              <div className="eventTablePricingHistoryColumn2">Price</div>
              <div className="eventTablePricingHistoryColumn3">From</div>
              <div className="eventTablePricingHistoryColumn4">To</div>
              <div className="eventTablePricingHistoryColumn5">Date</div>
            </div>
            <div className="eventTableContainerPricingHistory">
              <div className="eventTablePricingHistoryRow1">
                <div className="eventTablePricingHistoryColumn1">List</div>
                <div className="eventTablePricingHistoryColumn2">0.09ETH</div>
                <div className="eventTablePricingHistoryColumn3">beepie</div>
                <div className="eventTablePricingHistoryColumn4"></div>
                <div className="eventTablePricingHistoryColumn5">28 Jun</div>
              </div>
            </div>
          </div>

        </div>
        <NftPreviewFooter />
      </div>
    </>
  );
};

export default NftPreviewPage;
