import React, { useEffect, useState } from "react";
import "./styles/manageContent.css";
import "./styles/delistedCollection.css";
import AssetProfilePic from "../../assets/profile3.jpeg";
import { BsChevronDown } from "react-icons/bs";
import Modal from "react-modal";
import { getNameImageOfUser, getRemovedNfts } from "../../services";
import ConfirmationModal from "../../common/components/confirmationModal";
import { isEmptyObject, momentDate, momentDate2 } from "../../utility";
import ReviewNft from "./reviewNft";
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
const RemovedNfts = () => {
  const [duration, setDuration] = useState("");
  const [removedNfts, setRemovedNfts] = useState([]);
  const [modalDetails, setModalDetails] = useState({});
  const [particularNftId, setParticularNftId] = useState("");
  const [reviewNftData, setReviewNftData] = useState({});

  // ===Pagination
  const [showLimitedRows, setShowLimitedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [clickedPage, setClickedPage] = useState(1);
  const rowsInPage = 7;
  const changePage = (clicked) => {
    setClickedPage(clicked);
  };
  // ----

  useEffect(() => {
    getRemovedNfts(setRemovedNfts, duration);
  }, [duration]);

  useEffect(() => {
    const responseData = removedNfts;
    const totalPages = Math.ceil(responseData.length / rowsInPage);
    setTotalPages(totalPages);
    setShowLimitedRows(responseData.slice(0, rowsInPage));
  }, [removedNfts]);

  useEffect(() => {
    const responseData = removedNfts;
    const start = (clickedPage - 1) * rowsInPage;
    const end = clickedPage * rowsInPage;
    setShowLimitedRows(responseData.slice(start, end));
  }, [clickedPage]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = async (nft) => {
    if (nft && nft.reportedNfts.length !== 0) {
      const ownedBy = await getNameImageOfUser(nft.reportedNfts[0].ownedBy);
      const createdBy = await getNameImageOfUser(nft.reportedNfts[0].createdBy);
      setModalDetails({ ...nft, ownedBy, createdBy });
      setModalIsOpen(true);
    } else {
      setModalDetails({
        ...nft,
        ownedBy: { name: "", imageUrl: "" },
        createdBy: { name: "", imageUrl: "" },
      });
      setModalIsOpen(true);
    }
  };

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const [undoRemove, setUndoRemove] = useState(false);
  const handleUndoRemoveTrue = () => {
    setModalIsOpen(false);
    setUndoRemove(true);
  };

  const customStyles = {
    content: {
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      backgroundColor: "transparent",
      border: "none",
    },
  };
  const [reviewNft, setReviewNft] = useState(false);

  return (
    <div className="manageContentFormContainer">
      {!reviewNft ? (
        <div className="manageContentInnerContainer">
          <div className="myStoreHeading1">Manage Content</div>
          <div className="manageContentHeading2Container">
            <div className="myStoreHeading2 manageContentHeading2marginTop ">
              {" "}
              Removed NFTs
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
            {/* {removedNfts.map((item) => (
            <div className="manageContentListEachContainer" key={item._id}>
              <div className="manageContentDelistedListColumn1">
                <img src={item.ipfsUrl} alt="" />
                <div className="manageContentListColumntitle manageContentgrey ">
                  {item.name}
                </div>
              </div>
              <div className="manageContentDelistedListColumn2">
                <img src={AssetProfilePic} alt="" />
                <div className="manageContentListColumntitle manageContentgrey">
                  Dussie
                </div>
              </div>
              <div className="manageContentDelistedListColumn3">
                <div className="manageContentListColumntitle manageContentgrey">
                  {momentDate2(item.reportedInfo.addedOn)}
                </div>
              </div>
              <div className="manageContentDelistedListColumn4">
                <div className="manageContentListColumntitle manageContentgrey">
                  {item.reportedInfo.reason}
                </div>
              </div>
              <div className="manageContentDelistedListColumn5">
                <div className="manageContentListColumntitle manageContentgrey">
                  Fake
                </div>
                <div
                  className="manageContentListColumntitle manageContentListColumntitlePrimaryColor"
                  onClick={setModalIsOpenToTrue}
                >
                  Review NFT
                </div>
              </div>
            </div>
          ))} */}
            {showLimitedRows.map((item,key) => (
    
              <div
                className="manageContentListEachContainer"
                key={item?._id}
                style={{ background: key % 2 == 0 && "#00000014" }}
              >
                <div className="manageContentListColumn1">
                  {/* <img src={item.reportedCollections[0].imageUrl} alt="" /> */}
                  <img src={item?.collection?.imageUrl} alt="" />
                  <div className="manageContentListColumntitle manageContentgrey words-break">
                    {item?.collection?.name}
                    {/* King of seven Seas */}
                  </div>
                </div>
                <div className="manageContentListColumn4">
                  <div className="manageContentListColumntitle manageContentgrey words-break">
                    {item?.reports[0]?.reason}
                    {/* Copyright */}{" "}
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
                      setParticularNftId(item?._id);
                      setReviewNftData(item);
                      setReviewNft(true);
                    }}
                    className="manageContentListColumntitle manageContentListColumntitlePrimaryColor"
                  >
                    Review NFT
                  </div>
                </div>
              </div>
            ))}
            {removedNfts.length == 0 && <NoDataFound className="no-data-found" />}
          </div>
          <Pagination totalPages={totalPages} changePage={changePage} />
        </div>
      ) : (
        <ReviewNft
          nftId={particularNftId}
          reviewNft={reviewNft}
          setReviewNft={setReviewNft}
          reviewNftData={reviewNftData}
          setReviewNftData={setReviewNftData}
          reportedNfts={removedNfts}
          setReportedNfts={setRemovedNfts}
          pageName={"removednftpage"}
        />
      )}

      <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
        <div className="reportedNftModalContainer">
          <div className="modalHeaderContainer">
            <div className="modalHeaderTitle">Review NFT</div>
            <div className="modalHeaderCross" onClick={setModalIsOpenToFalse}>
              X
            </div>
          </div>
          <div className="modalMainContainer">
            <img
              src={
                !isEmptyObject(modalDetails) &&
                modalDetails.nftPhoto.length !== 0
                  ? modalDetails.nftPhoto[0]
                  : undefined
              }
              alt=""
            />
            <div className="myStoreHeading3 myStoreHeading3reportednftModalPrimary">
              Fantasy Arts
            </div>
            <div className="myStoreHeading2">{modalDetails?.nfttName}</div>
            <div className="myStoreHeading3 myStoreHeading3reportednftModal">
              Description
            </div>
            <div className="reportedNftDescription">
              {!isEmptyObject(modalDetails) &&
                modalDetails.reportedNfts.length !== 0 &&
                modalDetails.reportedNfts[0].description}
            </div>
            <div className="reportedNftOwnerContainer">
              <img
                src={
                  !isEmptyObject(modalDetails)
                    ? modalDetails.ownedBy.imageUrl
                    : undefined
                }
                alt=""
              />
              <div className="nftownerContainer">
                <div className="nftownerTitle">Owner</div>
                <div className="nftownerText">
                  {!isEmptyObject(modalDetails) && modalDetails.ownedBy.name}
                </div>
              </div>
              <img
                src={
                  !isEmptyObject(modalDetails)
                    ? modalDetails.createdBy.imageUrl
                    : undefined
                }
                alt=""
              />
              <div className="nftownerContainer">
                <div className="nftownerTitle">Creator</div>
                <div className="nftownerText">
                  {!isEmptyObject(modalDetails) && modalDetails.createdBy.name}
                </div>
              </div>
            </div>
            <div className="myStoreHeading3 myStoreHeading3reportednftModal">
              Link
            </div>
            <div className="myStoreHeading3 myStoreHeading3reportednftModalLink">
              https://yourlink.com
            </div>
            <div className="reportedNftOwnerContainer">
              <div className="nftReportedbyContainer">
                <div className="nftownerTitle">Reported By</div>
                <div className="nftreportedText">
                  {modalDetails &&
                    modalDetails.userOfreportedNfts &&
                    modalDetails.userOfreportedNfts.firstName}{" "}
                  on {modalDetails && momentDate(modalDetails.addedOn)}
                </div>
              </div>
              <div className="nftReportedbyContainer">
                <div className="nftownerTitle ">Reason</div>
                <div className="nftreportedText">
                  {modalDetails && modalDetails.reason}
                </div>
              </div>
            </div>
            <div className="modalLowerButtons">
              <div
                className="removeNftModal"
                onClick={() => handleUndoRemoveTrue()}
              >
                Undo Remove
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ConfirmationModal
        modalIsOpen={undoRemove}
        setModalIsOpen={setUndoRemove}
        headingText={"Undo Remove"}
        text={"Are you sure you want to undo Remove?"}
      />
    </div>
  );
};

export default RemovedNfts;
