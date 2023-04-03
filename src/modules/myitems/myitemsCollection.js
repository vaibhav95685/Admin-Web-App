import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { defaultContentImage } from "../../utility";
import Pagination from "../../common/components/Pagination";
import { getAdvSettingCategories, getCollections } from "../../services";
import { BsChevronDown } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import dropdown from "../../assets/images/dropdown.svg";

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
  min-width: 180px;
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
    margin-bottom:10px;
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
  min-width: 180px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid #F4F4F4;
  border-radius: 0.25em;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;

  @media only screen and (max-width:480px) {
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
const MyItemsCollection = ({ store }) => {
  const initialFilterData = {
    sort: "",
    categoryId: "",
    searchByName: "",
  };
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterData, setFilterData] = useState(initialFilterData);

  // pagination
  const [showLimitedRows, setShowLimitedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [clickedPage, setClickedPage] = useState(1);
  const rowsInPage = 9;
  const changePage = (clicked) => {
    setClickedPage(clicked);
  };

  useEffect(() => {
    async function fetchData() {
      await getAdvSettingCategories(store.token).then((res) => {
        setCategories(res.responseData);
      });
    }
    fetchData();
  }, []);

  const reqObj = queryString.stringify(filterData);
  useEffect(() => {
    getCollections(reqObj, setCollections, store.token);
  }, [reqObj]);

  useEffect(() => {
    const responseData = collections;
    const totalPages = Math.ceil(responseData.length / rowsInPage);
    setTotalPages(totalPages);
    setShowLimitedRows(responseData.slice(0, rowsInPage));
  }, [collections]);

  useEffect(() => {
    const responseData = collections;
    const start = (clickedPage - 1) * rowsInPage;
    const end = clickedPage * rowsInPage;
    setShowLimitedRows(responseData.slice(start, end));
  }, [clickedPage]);

  const categoryFilter = (e) => {
    setFilterData({ ...filterData, categoryId: e });
  };
  const sortFilter = (e) => {
    setFilterData({ ...filterData, sort: e });
  };

  return (
    <>
      <div className="billingPeriodContainer" style={{justifyContent: 'start'}}>
        <Link
          to="/my-items/nfts"
          state={{name: 'User NFTs', button: 'Create NFT'}}
          // onClick={() => {
          //   setItemType("nfts");
          // }}
          // className={`billingPeriod ${
          //   itemType === "nfts" && "billingPeriod--active"
          // }`}
          className="billingPeriod"
        >
          User NFTs
        </Link>
        <div
          //   to="/my-items/collections"
          // className={`billingPeriod ${
          //   itemType === "collections" && "billingPeriod--active"
          // }`}
          // onClick={() => {
          //   setItemType("collections");
          // }}
          className="billingPeriod--active"
        >
          User Collections
        </div>
        <Link to="/my-items/my-nfts" state={{name: 'My NFTs', button: 'Create NFT'}} className="billingPeriod">
         My NFTs
        </Link>
        <Link to="/my-items/my-collections" state={{name: 'My Collections', button: 'Create Collection'}} className="billingPeriod">
        My Collections
        </Link>
      </div>
      <div className="sortingContainer">
        <CustomSelect
          name="categoryId"
          onChange={(e) => categoryFilter(e)}
          value={filterData.categoryName}
          defaultValue=""
        >
          <StyledOption value="" hidden>
            Categories <span style={{color: '#858585'}}>All</span>
          </StyledOption>
          <StyledOption value="">All</StyledOption>
          {categories.map((item, key) => {
            return <StyledOption value={item._id}>{item.name}</StyledOption>;
          })}
        </CustomSelect>
        <CustomSelect
          name="sort"
          onChange={(e) => sortFilter(e)}
          value={filterData.sort}
          defaultValue=""
        >
          <StyledOption value="" hidden>
            Sort By <span style={{color: '#858585'}}>All</span>
          </StyledOption>
          <StyledOption value="">All</StyledOption>
          <StyledOption value="-1">Recently added</StyledOption>
          <StyledOption value="3">Items low to high</StyledOption>
          <StyledOption value="2">Items high to low</StyledOption>
        </CustomSelect>
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
            {/* <div className='collectionEach' key={item?._id}> */}
            <img
              src={item?.imageUrl !== "" ? item.imageUrl : defaultContentImage}
              alt="collectionImage"
            />
            <div className="myItemsNftTitle">{item?.name}</div>
            <div
              className="bidDetails totalItemsCollection"
              style={{ color: "black" }}
            >
              Total Items:{" "}
              <span className="myItemsPrimaryColour">{item?.nftCount}</span>{" "}
            </div>
            {/* </div> */}
          </Link>
        ))}
      </div>
      <Pagination totalPages={totalPages} changePage={changePage} />
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

export default connect(mapStateToProps)(MyItemsCollection);
