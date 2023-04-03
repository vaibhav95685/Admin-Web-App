import React, { useEffect, useState } from "react";
import "./styles/manageContent.css";
import "./styles/delistedCollection.css";
import AssetProfilePic from "../../assets/profile3.jpeg";
import { BsChevronDown } from "react-icons/bs";
import CollectionDetails from "./collectionDetails";
import ConfirmationModal from "../../common/components/confirmationModal";
import { getDelistedCollections } from "../../services";
import { momentDate2 } from "../../utility";
import ReviewCollection from "./reviewCollection";
import Pagination from "../../common/components/Pagination";
import dropdown from "../../assets/images/dropdown.svg";
import NoDataFound from "../../common/components/NoDataFound";

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

  @media only screen and (max-width:767px) {
    width:100%;
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

const DelistedCollection = () => {
  const [duration, setDuration] = useState("");
  const [delistedCollections, setDelistedCollections] = useState([]);
  const [particularCollectionId, setParticularCollectionId] = useState("");
  const [reviewCollectionData, setReviewCollectionData] = useState({});

  // ===Pagination
  const [showLimitedRows, setShowLimitedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [clickedPage, setClickedPage] = useState(1);
  const rowsInPage = 7;
  const changePage = (clicked) => {
    setClickedPage(clicked);
  };

  useEffect(async () => {
    const result = await getDelistedCollections(duration);
    setDelistedCollections(result);
  }, [duration]);

  useEffect(() => {
    const responseData = delistedCollections;
    const totalPages = Math.ceil(responseData.length / rowsInPage);
    setTotalPages(totalPages);
    setShowLimitedRows(responseData.slice(0, rowsInPage));
  }, [delistedCollections]);

  useEffect(() => {
    const responseData = delistedCollections;
    const start = (clickedPage - 1) * rowsInPage;
    const end = clickedPage * rowsInPage;
    setShowLimitedRows(responseData.slice(start, end));
  }, [clickedPage]);

  const [reviewCollection, setReviewCollection] = useState(false);

  return (
    <div className="manageContentFormContainer">
      {!reviewCollection && (
        <div className="manageContentInnerContainer">
          <div className="myStoreHeading1">Manage Content</div>
          <div className="manageContentHeading2Container">
            <div className="myStoreHeading2 manageContentHeading2marginTop">
              {" "}
              Delisted Collection
            </div>
            <CustomSelect
              name="duration"
              onChange={(e) => setDuration(e)}
              value={duration}
              defaultValue=""
            >
              <StyledOption value="" hidden>
                Sort By All
              </StyledOption>
              <StyledOption value="">All</StyledOption>
              <StyledOption value="weekly">Last 7 days</StyledOption>
              <StyledOption value="monthly">Last 30 days</StyledOption>
              <StyledOption value="yearly">Last 12 months</StyledOption>
            </CustomSelect>
          </div>
          <div className="manageContentListContainer">
            <div className="manageContentListHeaderContainer">
              <div className="manageContentListColumn1">
                <div className="manageContentListColumntitle">Name</div>
              </div>
              <div className="manageContentListColumn4">
                <div className="manageContentListColumntitle">Reason</div>
              </div>
            </div>
            {/* {delistedCollections.map((item) => (
              <div className="manageContentListEachContainer" key={item._id}>
                <div className="manageContentDelistedListColumn1">
                  <img src={item?.collectionPhoto[0]} alt="" />
                  <div className="manageContentListColumntitle manageContentgrey ">
                    {item?.collectionName[0]}
                  </div>
                </div>
                <div className="manageContentDelistedListColumn2">
                  <img src={AssetProfilePic} alt="" />
                  <div className="manageContentListColumntitle manageContentgrey">
                    {`${item.userOfReportedCollections.firstName} ${item.userOfReportedCollections.lastName}`}
                  </div>
                </div>
                <div className="manageContentDelistedListColumn3">
                  <div className="manageContentListColumntitle manageContentgrey">
                    {momentDate2(item.reportedCollections[0].addedOn)}
                  </div>
                </div>
                <div className="manageContentDelistedListColumn4">
                  <div className="manageContentListColumntitle manageContentgrey">
                    {item?.reason}
                  </div>
                </div>
                <div className="manageContentDelistedListColumn5">
                  <div className="manageContentListColumntitle manageContentgrey">
                    {momentDate2(item.addedOn)}
                  </div>
                  <div
                    className="manageContentListColumntitle manageContentListColumntitlePrimaryColor"
                    onClick={() => {
                      setParticularCollectionId(
                        item.reportedCollections[0]._id
                      );
                      setCollectionDetails(true);
                    }}
                  >
                    See Collection
                  </div>
                </div>
              </div>
            ))} */}

            {/* {[
              {
                content: {
                  name: "asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj",
                },
              },
              {
                content: {
                  name: "asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj",
                },
              },
              {
                content: {
                  name: "asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj",
                },
              },
            ].map((item, key) => ( */}
            {showLimitedRows.map((item, key) => (
              <div
                className="manageContentListEachContainer"
                key={item._id}
                style={{ background: key % 2 == 0 && "#00000014" }}
              >
                <div className="manageContentListColumn1">
                  <img src={item?.collection?.imageUrl} alt="" />
                  <div className="manageContentListColumntitle manageContentgrey words-break">
                    {item?.collection?.name}
                  </div>
                </div>
                <div className="manageContentListColumn4">
                  <div className="manageContentListColumntitle manageContentgrey words-break">
                    {item?.reports[0]?.reason}{" "}
                    <span
                      style={{ color: "#FC4C4C" }}
                      className="manageContentListNoofreports"
                    >
                      {item?.reports?.length === 1
                        ? ""
                        : `+ ${item?.reports?.length - 1}`}
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      setParticularCollectionId(item?._id);
                      setReviewCollectionData(item);
                      setReviewCollection(true);
                    }}
                    className="manageContentListColumntitle manageContentListColumntitlePrimaryColor"
                  >
                    Review
                  </div>
                </div>
              </div>
            ))}
            {delistedCollections.length == 0 && <NoDataFound className="no-data-found" />}
          </div>
          <Pagination totalPages={totalPages} changePage={changePage} />
        </div>
      )}
      {reviewCollection && (
        // <CollectionDetails
        //   setCollectionDetails={setCollectionDetails}
        //   collectionId={particularCollectionId}
        //   pageName={"delistedCollection"}
        // />
        <ReviewCollection
          collectionId={particularCollectionId}
          reviewCollection={reviewCollection}
          setReviewCollection={setReviewCollection}
          reviewCollectionData={reviewCollectionData}
          setReviewCollectionData={setReviewCollectionData}
          reportedCollections={delistedCollections}
          setreportedCollections={setDelistedCollections}
          pageName={"delistedCollection"}
        />
      )}
    </div>
  );
};

export default DelistedCollection;
