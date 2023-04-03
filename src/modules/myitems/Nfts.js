import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import Pagination from '../../common/components/Pagination';
import { BiHeart } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { getNfts, getTenantNfts } from '../../services';
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import { defaultContentImage } from "../../utility";
import EthereumIcon from "../../assets/icons/ethereum.png";
import PolygonIcon from "../../assets/icons/polygon.png";
import BinanceIcon from "../../assets/icons/binance.png";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, []);

  return domNode;
};

const Nfts = ({store}) => {

  const [nftsData, setNftsData] = useState([]);
  const [priceRangeBox, setPriceRangeBox] = useState(false);
  const [priceRangeBox2, setPriceRangeBox2] = useState(false);
  const [currencyTypeImage, setCurrencyTypeImage] = useState("EthereumIcon");
  const [currencyType, setCurrencyType] = useState("Ether");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  // const [saleType, setSaleType] = useState('fix price');
  const [sort, setSort] = useState(1);

  const [showLimitedRows, setShowLimitedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [clickedPage, setClickedPage] = useState(1);
  const [error,setError]=useState("");
  const rowsInPage = 9;
  const changePage = (clicked) => {
    setClickedPage(clicked);
  };

  useEffect(async () => {
    await getTenantNfts(minValue, maxValue, sort, setNftsData, store.token, store?.wallet);
    //  await getNfts(saleType, minValue, maxValue, sort, setNftsData);
  }, [sort]);

  useEffect(() => {
    console.log(nftsData, "<<<<");
    const responseData = nftsData;
    const totalpage = Math.ceil(responseData.length / rowsInPage);
    setTotalPages(totalpage);
    // setcategories(responseData);
    setShowLimitedRows(responseData.slice(0, rowsInPage));
  }, [nftsData]);

  useEffect(() => {
    const responseData = nftsData;
    const start = (clickedPage - 1) * rowsInPage;
    const end = clickedPage * rowsInPage;
    // console.log(responseData, '<<<<reported nfts at 45');
    setShowLimitedRows(responseData.slice(start, end));
  }, [clickedPage]);

  const handleCurrencyType = (Image, Type) => {
    setCurrencyTypeImage(Image);
    setCurrencyType(Type);
    setPriceRangeBox2(false);
  };

  const handlePriceFilter = async () => {
    if (
      (minValue == "" && maxValue !== "") ||
      (maxValue == "" && minValue !== "") ||
      (maxValue == "" && minValue == "")
    ) {
      toast.info("Please fill all the fields.");
      return;
    } else {
      if (minValue < 0 || maxValue < 0) {
        toast.info("Price fields cannot be negative.");
        return;
      } else {
        // if (minValue >= maxValue || maxValue <= minValue) {
        if (maxValue - minValue <= 0) {
          toast.info("Min value cannot be greater or equal to  max value.");
          return;
        } else {
          await getTenantNfts(minValue, maxValue, sort, setNftsData, store.token, store?.wallet);
          setPriceRangeBox(false);
          // await getTenantNfts(saleType, minValue, maxValue, sort, setNftsData);
        }
      }
    }

    // if (minValue >= maxValue || maxValue <= minValue) {
    //   toast.info('Min value cannot be greater or equal to  max value.');
    //   return;
    // } else if (
    //   (minValue == '' && maxValue !== '') ||
    //   (maxValue == '' && minValue !== '')
    // ) {
    //   toast.info('Please fill all the fields.');
    // } else {
    //   await getTenantNfts(minValue, maxValue, sort, setNftsData);
    //   setPriceRangeBox(false);
    //   // await getTenantNfts(saleType, minValue, maxValue, sort, setNftsData);
    // }
  };

  const handleClearPriceFilter = async () => {
    setMinValue("");
    setMaxValue("");
    setPriceRangeBox(false);
    setPriceRangeBox2(false);
    await getTenantNfts("", "", sort, setNftsData, store.token. store?.wallet);
  };

  const [sortbyBox, setSortbyBox] = useState(false);
  const [sortByChoosen, setSortByChoosen] = useState("All");

  let domNode = useClickOutside(() => {
    // setPriceRangeBox(false);
    // setPriceRangeBox2(false);
    setSortbyBox(false);
  });
  const priceValidation = (nftPrice, xy) => {
    if (nftPrice.length == 0) {
      setError("( price is required)");
      return false;
    } else if (currencyType === "Ether" && nftPrice < 0.004) {
      setError(
        "( Minimum value for Ethereum  should be more than 0.004 ETH )"
      );
      return false;
    } else if (currencyType === "Matic" && nftPrice < 11.71) {
      setError(
        "( Minimum value for Polygon  should be more than 11.71 MATIC )"
      );
      return false;
    } else if (currencyType === "BNB" && nftPrice < 0.027) {
      setError(
        "( Minimum value for Binance should be more than 0.027 BNB )"
      );
      return false;
    } else if (currencyType === "Ether" && nftPrice > 1000000000) {
      setError(
        "( Maximum  value for Ethereum should be less than 1,000,000,000 ETH )"
      );
      return false;
    } else if (currencyType === "Matic" && nftPrice > 2929880265000) {
      setError(
        "( Maximum value for Polygon  should be less than 2,929,880,265,000 MATIC )"
      );
      return false;
    } else if (currencyType === "BNB" && nftPrice > 6841316000) {
      setError(
        "( Maximum  value for Binance  should be less than 6,841,316,000 BNB )"
      );
      return false;
    } else {
      setError("");
      return true;
    }
  };
  

  const minValueHandler=(event)=>{
    setMinValue(event.target.value)
    priceValidation(event.target.value);
  }
  
  const maxValueHandler=(event)=>{
    setMaxValue(event.target.value)
    priceValidation(event.target.value);
  }
 
  return (
    <>
      <div className="billingPeriodContainer" style={{ justifyContent: 'start' }}>
        <Link to="/my-items/nfts" state={{ name: 'User NFTs', button: 'Create NFT' }} className="billingPeriod">
          User NFTs
        </Link>
        <Link to="/my-items/collections" state={{ name: 'User Collections', button: 'Create NFT' }} className="billingPeriod">
          User Collections
        </Link>
        <div className="billingPeriod--active">My NFTs</div>
        <Link to="/my-items/my-collections" state={{ name: 'My Collections', button: 'Create Collection' }} className="billingPeriod">
          My Collections
        </Link>
      </div>

      <div className="sortingContainer">
        <div className="saleTypeandPricingContainer">
          {/* <div className='saleTypeandPricing'>
              Sale Type
              <select
                name='sale'
                id='sale'
                className='saleTypeandPricingType'
              >
                <option value='all'>All</option>
                <option value='2'>2</option>
              </select>
            </div> */}
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
              <p style={{ margin: '0' }}>
                Price range
                <span style={{ color: "#858585" }}>
                  {error?.length !==0 ? "":minValue}-{error?.length!==0? "":maxValue}
                  {currencyTypeImage === "EthereumIcon" && "ETH"}
                  {currencyTypeImage === "PolygonIcon" && "MAT"}
                  {currencyTypeImage === "BinanceIcon" && "BNB"}
                </span>{" "}
              </p>
              <BsChevronDown style={{ cursor: "pointer" }} />
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
                  <span className="currency-Name">{currencyType}</span>
                  </div>
                  <BsChevronDown style={{ cursor: "pointer" }} />
                </div>
                {priceRangeBox2 ? (
                  <div className="PriceRangeBoxDropDownCurrencyTypeDropDown">
                    <div
                      className="selectDisplayFlex etherDiv"
                      onClick={() =>{
                        if(currencyType!=="Ether"){
                          setMinValue("");
                          setMaxValue("");
                          setError("")
                        }
                        handleCurrencyType("EthereumIcon", "Ether")
                      }
                      }
                    >
                      <div className="PriceRangeBoxDropDownCurrencyTypeName PriceRangeBoxDropDownCurrencyTypeDropDownType">
                        <img src={EthereumIcon} alt="ethereum" />
                        <span className="currency-Name">Ether</span>
                      </div>
                      {currencyTypeImage === "EthereumIcon" && (
                        <AiOutlineCheck style={{ color: "#366EEF" }} />
                      )}
                    </div>
                    <div
                      className="selectDisplayFlex maticDiv"
                      onClick={() => {
                        if(currencyType!=="Matic"){
                          setMinValue("");
                          setMaxValue("");
                          setError("")
                        }
                        handleCurrencyType("PolygonIcon", "Matic")}}
                    >
                      <div className="PriceRangeBoxDropDownCurrencyTypeName PriceRangeBoxDropDownCurrencyTypeDropDownType">
                        <img src={PolygonIcon} alt="ethereum" />
                        <span className="currency-Name">Matic</span>
                      </div>
                      {currencyTypeImage === "PolygonIcon" && (
                        <AiOutlineCheck style={{ color: "#366EEF" }} />
                      )}
                    </div>
                    <div
                      className="selectDisplayFlex bnbDiv"
                      onClick={() => {
                        if(currencyType!=="BNB"){
                          setMinValue("");
                          setMaxValue("");
                          setError("")
                        }
                        handleCurrencyType("BinanceIcon", "BNB")}}
                    >
                      <div className="PriceRangeBoxDropDownCurrencyTypeName PriceRangeBoxDropDownCurrencyTypeDropDownType">
                        <img src={BinanceIcon} alt="ethereum" />
                        <span className="currency-Name">BNB</span> 
                      </div>
                      {currencyTypeImage === "BinanceIcon" && (
                        <AiOutlineCheck style={{ color: "#366EEF" }} />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="priceRangeMaxMinBox">
                      <span className="error-message">{error}</span> 
                    <div className="priceRangeMaxMinBoxInput">
                      <input
                        placeholder="Min"
                        type={"number"}
                        className="priceRangeMaxMinBoxInputMinMax"
                        onChange={(e) =>minValueHandler(e)}
                        value={minValue}
                      />
                      <span className="toText">to</span>
                      <input
                        placeholder="Max"
                        type={"number"}
                        className="priceRangeMaxMinBoxInputMinMax"
                        onChange={(e) =>maxValueHandler(e)}
                        value={maxValue}
                      />
                    </div>
                    <div className="priceRangeMaxMinBoxInput">
                      <div
                        className="priceRangeMaxMinBoxButtonSecondary"
                        onClick={handleClearPriceFilter}
                      >
                        Clear
                      </div>
                      <div
                        className="priceRangeMaxMinBoxButtonPrimary"
                        onClick={handlePriceFilter}
                        style={{background: error?.length!=0 ? "rgb(154, 182, 247)" :"#366eef" ,border: error?.length!=0 ?"1px solid rgb(133, 88, 237)":"1px solid rgb(133, 88, 237);"}}
                      >
                        Apply
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="sortBy" ref={domNode}>
          <div
            className="saleTypeandPricing sortByDiv"
            onClick={() => setSortbyBox(!sortbyBox)}
          >
            <p style={{ margin: '0' }}>Sort by </p>
            <div className="filterValueContainer">
              <div>{sortByChoosen}</div>
              <BsChevronDown style={{ color: "black", cursor: "pointer" }} />
            </div>
          </div>
          {sortbyBox && (
            <div className="sortByOptionBox">
              {/* <div
                className='sortByOptionBoxEach'
                onClick={() => {
                  setSortByChoosen('All');
                  setSortbyBox(false);
                }}
              >
                All
              </div> */}
              <div
                className="sortByOptionBoxEach"
                onClick={() => {
                  setSortByChoosen("Recently added");
                  setSort(-1);
                  setSortbyBox(false);
                }}
              >
                Recently added
              </div>
              <div
                className="sortByOptionBoxEach"
                onClick={() => {
                  setSortByChoosen("Price low to high");
                  setSort(2);
                  setSortbyBox(false);
                }}
              >
                Price low to high
              </div>
              <div
                className="sortByOptionBoxEach"
                onClick={() => {
                  setSortByChoosen("Price high to low");
                  setSort(3);
                  setSortbyBox(false);
                }}
              >
                Price high to low
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="myItemnftContainer">
        {showLimitedRows.map((item) => (
          <Link
            to="/nft-preview"
            className="myItemnftEach"
            key={item?._id}
            state={{ nftId: item._id }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <img
              src={item?.compressedURL !== "" ? item?.compressedURL : defaultContentImage}
              alt=""
            />
            <div className="myItemsNftTitle">
              <div>{item?.name}</div>
              {/* <div className="nftLikes">
                {item.likesCount}{" "}
                {item.likesCount === 0 ? (
                  <BiHeart className="blankHeartIconMyitems" /> 
                ) : (
                  <img src={Heart} alt="" />
                )}
              </div> */}
            </div>
            <div className="myItemsNftTitle">
              <div className="">
                {item?.salesInfo?.price} {item?.salesInfo?.currency}{" "}
              </div>
              <div className=" myItemsNftTitle">
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
        <Pagination totalPages={totalPages} changePage={changePage} />
      </div>

    </>
  )
}

const mapStateToProps = (state) => {
  return {
    store: state.store.store,
  };
};

export default connect(mapStateToProps)(Nfts);