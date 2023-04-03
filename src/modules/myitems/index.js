import React, { useEffect, useState } from "react";
import Navbar from "../../common/components/navbar";
import TopBar from "../../common/components/topbar";
import "./styles/myitems.css";
import "../mystore/styles/myStore.css";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import Heart from "../../assets/icons/heart.png";
import { getCollections, getNfts } from "../../services";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Pagination from "../../common/components/Pagination";
import { BiHeart } from "react-icons/bi";
import EthereumIcon from "../../assets/icons/ethereum.png";
import PolygonIcon from "../../assets/icons/polygon.png";
import BinanceIcon from "../../assets/icons/binance.png";
import { defaultContentImage } from "../../utility";
import CreateNFT from "./CreateNFT"
import BulkNFT from "./BulkNFT";
const MyItems = () => {

  const location = useLocation();

  console.log(location.state, 'location')

  const [itemType, setItemType] = useState("nfts");
  const [nftsData, setNftsData] = useState([]);
  const [collectionsData, setCollectionsData] = useState([]);
  const [saleType, setSaleType] = useState("fix price");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10);
  const [category, setCategory] = useState({
    name: "",
    _id: "61dec30930a00bc43e673104",
  });
  const [sort, setSort] = useState(1);

  const [showLimitedRows, setShowLimitedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [clickedPage, setClickedPage] = useState(1);
  const rowsInPage = 9;
  const changePage = (clicked) => {
    setClickedPage(clicked);
  };

  useEffect(() => {
    if (itemType === "nfts") {
      getNfts(saleType, minPrice, maxPrice, sort, setNftsData);
    } else if (itemType === "collections") {
      getCollections(sort, category._id, setCollectionsData);
    }
  }, [itemType]);

  useEffect(() => {
    if (itemType == "collections") {
      const responseData = collectionsData;
      const totalpage = Math.ceil(responseData.length / rowsInPage);
      setTotalPages(totalpage);
      // setcategories(responseData);
      setShowLimitedRows(responseData.slice(0, rowsInPage));
    } else {
      const responseData = nftsData;
      const totalpage = Math.ceil(responseData.length / rowsInPage);
      setTotalPages(totalpage);
      // setcategories(responseData);
      setShowLimitedRows(responseData.slice(0, rowsInPage));
    }
  }, [nftsData, collectionsData, itemType]);

  useEffect(() => {
    if (itemType == "collections") {
      const responseData = collectionsData;
      const start = (clickedPage - 1) * rowsInPage;
      const end = clickedPage * rowsInPage;
      // console.log(responseData, '<<<<reported nfts at 45');
      setShowLimitedRows(responseData.slice(start, end));
    } else {
      const responseData = nftsData;
      const start = (clickedPage - 1) * rowsInPage;
      const end = clickedPage * rowsInPage;
      // console.log(responseData, '<<<<reported nfts at 45');
      setShowLimitedRows(responseData.slice(start, end));
    }
    // }
  }, [clickedPage, itemType]);

  const [priceRangeBox, setPriceRangeBox] = useState(false);
  const [priceRangeBox2, setPriceRangeBox2] = useState(false);
  const [currencyTypeImage, setCurrencyTypeImage] = useState("EthereumIcon");
  const [currencyType, setCurrencyType] = useState("Ether");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const handleCurrencyType = (Image, Type) => {
    setCurrencyTypeImage(Image);
    setCurrencyType(Type);
    setPriceRangeBox2(false);
  };

  const [createNFTActive,setcreateNFTActive]=useState(false);
  const [createBulkNFt,setCreateBulkNFT]=useState(false);

 
  


  return (
    <>
    <div className="myitemsContainer">
      <TopBar activepage={"myitems"} />
      <div className="myItemsMainContainer">
        <Navbar activepage={"myitems"} />
        <div className="items-container">
          <div className="myItemsBox">
            <div className="myStoreHeading1 myitemsheading myNFTS">
             <label className="TextField">{location.state!==null?location.state.name:'User NFTs' }</label>
            
            
            <div className="ButtonDiv">
              <button className="MyBulkNFTsButton" onClick={()=>setCreateBulkNFT(true)}> Bulk Mint NFT</button>
              <button className="MyNFTsButton" onClick={()=>setcreateNFTActive(true)}>
               {location.state!==null ? location.state.button:'Create NFT' }
              </button></div>
            </div>
            <Outlet />
          </div>
        </div>
        {/* <div className="myItemsBox">
          <div className="myStoreHeading1 myitemsheading">My Items</div>
          <div className="billingPeriodContainer">
            <Link
              to="/my-items/nfts"
              onClick={() => {
                setItemType("nfts");
              }}
              className={`billingPeriod ${
                itemType === "nfts" && "billingPeriod--active"
              }`}
            >
              Nfts
            </Link>
            <Link
              to="/my-items/collections"
              className={`billingPeriod ${
                itemType === "collections" && "billingPeriod--active"
              }`}
              onClick={() => {
                setItemType("collections");
              }}
            >
              Collections
            </Link>
          </div>
          {itemType === "nfts" && (
            <>
              <div className="sortingContainer">
                <div className="saleTypeandPricingContainer">
                  <div className="priceRangeMobile">
                    <div
                      className="saleTypeandPricing "
                      onClick={() => {
                        if (priceRangeBox === false) {
                          setPriceRangeBox(true);
                        } else {
                          setPriceRangeBox(false);
                        }
                      }}
                    >
                      <p>
                        Price range{" "}
                        <span style={{ color: "#858585" }}>
                          {minValue}-{maxValue}{" "}
                          {currencyTypeImage === "EthereumIcon" && "ETH"}
                          {currencyTypeImage === "PolygonIcon" && "MAT"}
                          {currencyTypeImage === "BinanceIcon" && "BNB"}
                        </span>{" "}
                      </p>
                      <BsChevronDown />
                    </div>
                    {priceRangeBox && (
                      <div className="PriceRangeBoxDropDown">
                        <div
                          className="PriceRangeBoxDropDownCurrencyType"
                          onClick={() => setPriceRangeBox2(!priceRangeBox2)}
                        >
                          <div className="PriceRangeBoxDropDownCurrencyTypeName">
                            {currencyTypeImage === "EthereumIcon" && (
                              <img src={EthereumIcon} alt="ethereum" />
                            )}
                            {currencyTypeImage === "PolygonIcon" && (
                              <img src={PolygonIcon} alt="ethereum" />
                            )}
                            {currencyTypeImage === "BinanceIcon" && (
                              <img src={BinanceIcon} alt="ethereum" />
                            )}
                            {currencyType}
                          </div>
                          <BsChevronDown />
                        </div>
                        {priceRangeBox2 ? (
                          <div className="PriceRangeBoxDropDownCurrencyTypeDropDown">
                            <div
                              className="selectDisplayFlex"
                              onClick={() =>
                                handleCurrencyType("EthereumIcon", "Ether")
                              }
                            >
                              <div className="PriceRangeBoxDropDownCurrencyTypeName PriceRangeBoxDropDownCurrencyTypeDropDownType">
                                <img src={EthereumIcon} alt="ethereum" />
                                Ether
                              </div>
                              {currencyTypeImage === "EthereumIcon" && (
                                <AiOutlineCheck style={{ color: "#366EEF" }} />
                              )}
                            </div>
                            <div
                              className="selectDisplayFlex"
                              onClick={() =>
                                handleCurrencyType("PolygonIcon", "Matic")
                              }
                            >
                              <div className="PriceRangeBoxDropDownCurrencyTypeName PriceRangeBoxDropDownCurrencyTypeDropDownType">
                                <img src={PolygonIcon} alt="ethereum" />
                                Matic
                              </div>
                              {currencyTypeImage === "PolygonIcon" && (
                                <AiOutlineCheck style={{ color: "#366EEF" }} />
                              )}
                            </div>
                            <div
                              className="selectDisplayFlex"
                              onClick={() =>
                                handleCurrencyType("BinanceIcon", "BNB")
                              }
                            >
                              <div className="PriceRangeBoxDropDownCurrencyTypeName PriceRangeBoxDropDownCurrencyTypeDropDownType">
                                <img src={BinanceIcon} alt="ethereum" />
                                BNB
                              </div>
                              {currencyTypeImage === "BinanceIcon" && (
                                <AiOutlineCheck style={{ color: "#366EEF" }} />
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="priceRangeMaxMinBox">
                            <div className="priceRangeMaxMinBoxInput">
                              <input
                                placeholder="Min"
                                className="priceRangeMaxMinBoxInputMinMax"
                                onChange={(e) => setMinValue(e.target.value)}
                                value={minValue}
                              />
                              to
                              <input
                                placeholder="Max"
                                className="priceRangeMaxMinBoxInputMinMax"
                                onChange={(e) => setMaxValue(e.target.value)}
                                value={maxValue}
                              />
                            </div>
                            <div className="priceRangeMaxMinBoxInput">
                              <div className="priceRangeMaxMinBoxButtonSecondary">
                                Clear
                              </div>
                              <div className="priceRangeMaxMinBoxButtonPrimary">
                                Apply
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="sortBy">
                  <div className="saleTypeandPricing sortByDiv">
                    <p>Sort by </p>

                    <select
                      name="sortby"
                      id="sortby"
                      className="saleTypeandPricingType"
                    >
                      <option
                        value="Recently added"
                        className="saleTypeandPricingTypeOption"
                      >
                        Recently added
                      </option>
                      <option
                        value="Price low to high"
                        className="saleTypeandPricingTypeOption"
                      >
                        Price low to high
                      </option>
                      <option
                        value="Price high to low"
                        className="saleTypeandPricingTypeOption"
                      >
                        Price high to low
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="myItemnftContainer">
                {showLimitedRows.map((item) => (
                  <Link
                    to="/nft-preview"
                    className="myItemnftEach"
                    key={item?._id}
                    state={{ nftDetails: item }}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <img
                      src={
                        item?.ipfsUrl !== ""
                          ? item?.ipfsUrl
                          : defaultContentImage
                      }
                      alt=""
                    />
                    <div className="myItemsNftTitle">
                      <div>{item?.name}</div>
                      <div className="nftLikes">
                        {item.likesCount}{" "}
                        {item.likesCount === 0 ? (
                          <BiHeart className="blankHeartIconMyitems" />
                        ) : (
                          <img src={Heart} alt="" />
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Pagination totalPages={totalPages} changePage={changePage} />
            </>
          )}
          {itemType === "collections" && (
            <>
              <div className="sortingContainer">
                <div className="saleTypeandPricingContainer">
                  <div className="saleTypeandPricing">
                    <p>Categories </p>

                    <select
                      name="Categories"
                      id="Categories"
                      className="saleTypeandPricingType"
                    >
                      <option value="all">All</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>
                <div className="sortBy">
                  <div className="saleTypeandPricing sortByDiv">
                    <p>Sort by </p>

                    <select
                      name="sortby"
                      id="sortby"
                      className="saleTypeandPricingType"
                    >
                      <option
                        value="All"
                        className="saleTypeandPricingTypeOption"
                      >
                        All
                      </option>
                      <option
                        value="Recently Updated"
                        className="saleTypeandPricingTypeOption"
                      >
                        Recently Updated
                      </option>
                      <option
                        value="Recently Added"
                        className="saleTypeandPricingTypeOption"
                      >
                        Recently Added
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="myItemnftContainer">
                {showLimitedRows.map((item) => (
                  <Link
                    to="/collection-preview"
                    className="collectionEach"
                    key={item?._id}
                    state={{ collectionDetails: item }}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={
                        item?.imageUrl !== ""
                          ? item.imageUrl
                          : defaultContentImage
                      }
                      alt="collectionImage"
                    />
                    <div className="myItemsNftTitle">{item?.name}</div>
                    <div
                      className="bidDetails totalItemsCollection"
                      style={{ color: "black" }}
                    >
                      Total Items:{" "}
                      <span className="myItemsPrimaryColour">
                        {item?.nftCount}
                      </span>{" "}
                    </div>
                  </Link>
                ))}
              </div>
              <Pagination totalPages={totalPages} changePage={changePage} />
            </>
          )}
          <Outlet />
        </div> */}
      </div>
    </div>
    <CreateNFT 
    createNFTActive={createNFTActive}
    setcreateNFTActive={setcreateNFTActive}
    location={location?.state?.name}
    />
    <BulkNFT
    createBulkNFt={createBulkNFt}
    setCreateBulkNFT={setCreateBulkNFT}
    />
    </>
  );
};

export default MyItems;
