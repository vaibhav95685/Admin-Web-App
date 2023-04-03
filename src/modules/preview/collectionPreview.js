import React, { useEffect, useState } from "react";
import NftPreviewNavbar from "./nftPreviewNavbar";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import EthereumIcon from "../../assets/icons/ethereum.png";
import PolygonIcon from "../../assets/icons/polygon.png";
import BinanceIcon from "../../assets/icons/ethereum.png";
import search from "../../assets/images/search.svg";
import "./styles/collectionPreview.css";
import Heart from "../../assets/icons/heart.png";
import { BsThreeDots } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultContentImage } from "../../utility";
import { getCollectionNfts } from "../../services";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import dropdown from "../../assets/images/dropdown.svg";
import binance from "../../assets/binance.svg";
import ether from "../../assets/ether.svg";
import ploygon from "../../assets/ploygon.svg";

// MUI select code
import SelectUnstyled, {
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: poppins-medium;
  font-size: 14px;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 200px;
  background: url(${dropdown});
  background-position: 95%;
  background-repeat: no-repeat;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 0.25rem;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: #191919;

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }

  @media only screen and (max-width:480px) {
    width:100%;
    margin-bottom:16px;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: poppins-medium;
  font-size: 14px;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 200px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid #F4F4F4;
  border-radius: 0.25em;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;

  @media only screen and (max-width:767px) {
    width:100%;
  }
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.25em;
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

const queryString = require("query-string");
const CollectionPreview = () => {

  const navigate = useNavigate();

  const defaultFilter = {
    searchByName: "",
    status: "",
    sortBy: "",
    minPrice: "",
    maxPrice: "",
  };

  const [closeStatus, setCloseStatus] = useState(false);
  const [filter, setFilter] = useState(defaultFilter);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [priceDrop, setPriceDrop] = useState(false);

  const { store } = useSelector((state) => state);
  const location = useLocation();
  const { collectionDetails } = location.state;
  const [collectionNfts, setCollectionNfts] = useState([]);
  const [showReport, setshowReport] = useState(false);

  const reqObj = queryString.stringify(filter);

  useEffect(() => {
    async function fetchData() {
      await getCollectionNfts(collectionDetails._id, setCollectionNfts, store.token, reqObj)
    }
    fetchData();
  }, [reqObj]);

  const setPrice = () => {
    setFilter({ ...filter, minPrice: minPrice, maxPrice: maxPrice });
    setPriceDrop(!priceDrop);
  };

  const clearValues = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  const handleStatus = (e) => {
    setFilter({ ...filter, status: e });
  };

  const handleSort = (e) => {
    setFilter({ ...filter, sort: e });
  };

  const blockchainCheck = (blockchain) => {
    switch (blockchain) {
      case "Ethereum":
        return (
          <img style={{ width: '20px', height: 'auto' }} className="currency-sign-nftinformation" src={ether}></img>
        );
      case "Polygon":
        return (
          <img style={{ width: '20px', height: 'auto' }} className="currency-sign-nftinformation" src={ploygon}></img>
        );
      case "Binance":
        return (
          <img style={{ width: '20px', height: 'auto' }} className="currency-sign-nftinformation" src={binance}></img>
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

      <div className="collectionPreviewContainer" onClick={() => setCloseStatus(true)}>
        <NftPreviewNavbar />

        <div className="coldet-banner">
          <img src={collectionDetails.coverUrl !== "" ? collectionDetails.coverUrl : defaultContentImage} />
        </div>

        <div className="coldet-bio">
          <div className="coldet-avatar">
            <img
              src={
                collectionDetails?.imageUrl !== ""
                  ? collectionDetails?.imageUrl
                  : defaultContentImage
              }
              alt=""
            />
          </div>
          <div
            className="more-hori-div"
          >
            <BsThreeDots />
          </div>
          <div className="colusername">
            {collectionDetails?.name}
          </div>
          <div className="coluserdes">
            {collectionDetails?.description}
          </div>
        </div>


        <div className="collectionPreviewNftCardsContainer">
          <div className="filters-container">
            <div className="left-filters">
              <div className="search-box-div">
                <div>
                  <img src={search} className="search-icon" />
                </div>
                <input
                  type="search"
                  name="searchByName"
                  className="search-input"
                  placeholder="Search"
                  onChange={(e) =>
                    setFilter({ ...filter, searchByName: e.target.value })
                  }
                />
              </div>
              <div className="price-div">
                <div className="statusText">Price range</div>
                <div>
                  <img
                    src={dropdown}
                    alt="arrow"
                    onClick={(e) => setPriceDrop(!priceDrop)}
                  />
                </div>
                {priceDrop && (
                  <div className="price-dropdown">
                    <div className="mb-3" style={{ display: "flex" }}>
                      <div className="price-input-div">
                        <input
                          type="number"
                          className="price-input-box"
                          placeholder="Min"
                          name="minPrice"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </div>
                      <div className="col-2 text-center">
                        <span className="to">to</span>
                      </div>
                      <div className="price-input-div">
                        <input
                          type="number"
                          className="price-input-box"
                          placeholder="Max"
                          name="maxPrice"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="priceRangeMaxMinBoxButtonSecondary"
                        onClick={clearValues}
                      >
                        Clear
                      </div>
                      <div
                        className="priceRangeMaxMinBoxButtonPrimary"
                        onClick={setPrice}
                      >
                        Apply
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <CustomSelect
                  name="status"
                  onChange={(e) => handleStatus(e)}
                  value={filter.status}
                  defaultValue=""
                >
                  <StyledOption value="" hidden>
                    Status
                  </StyledOption>
                  <StyledOption value="">All</StyledOption>
                  <StyledOption value="onsale">Open for sale</StyledOption>
                  <StyledOption value="new">New</StyledOption>
                </CustomSelect>
              </div>
            </div>
            <div className="ms-md-auto">
              <CustomSelect
                name="sort"
                onChange={(e) => handleSort(e)}
                value={filter.sort}
                defaultValue=""
              >
                <StyledOption value="" hidden>
                  Sort By All
                </StyledOption>
                <StyledOption value="">All</StyledOption>
                <StyledOption value="1">Recently added</StyledOption>
                <StyledOption value="2">Price: High to Low</StyledOption>
                <StyledOption value="3">Price: Low to High</StyledOption>
              </CustomSelect>
            </div>
          </div>
          <div
            className="collectionDetailsNftsContainer"
            style={{ marginBottom: "2vh" }}
          >
            {console.log(collectionNfts, 'collection')}
            {[...collectionNfts].map((item) => (
              <div
                className="collectionPreviewNftEach myItemnftEach collectionDetailsNftEach"
                key={item._id}
              >
                <img
                  src={item.compressedURL !== "" ? item.compressedURL : defaultContentImage}
                  alt=""
                  className="collectionPreviewNftEachimage"
                />
                <div className="collectionNftEachTitleContainer">
                  <div className="myItemsNftTitle" style={{ fontSize: '16px' }}>{item.name}</div>
                  {/* <div className="collectionNftEachTitlePrice">
                  {item.fixedPriceDetails.price}{" "}
                  {item.fixedPriceDetails.currency}
                </div> */}
                  <div className="bidDetails" style={{ fontSize: '13px' }}>
                    <span>
                      <span>{blockchainCheck(item?.blockchain)}</span>
                      {item.salesInfo.price} {item.salesInfo.currency}
                    </span>{" "}
                  </div>
                </div>
                <div className="myItemsNftsbiddetailContainer">

                  {/* <div className="nftLikes">
                    {item.likesCount}
                    <img src={Heart} alt="" />{" "}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
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

export default CollectionPreview;
