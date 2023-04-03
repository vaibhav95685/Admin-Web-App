import React, { useEffect, useState, useRef } from "react";
import "./styles/manageContent.css";
// import "./styles/apperance.css";
import AssetProfilePic from "../../assets/profile3.jpeg";
import { BsChevronDown } from "react-icons/bs";
import { getBlockedUsers, unblockUser } from "../../services";
import { defaultProfileImage, momentDate2 } from "../../utility";
import { connect } from "react-redux";
import "./styles/blockedUser.css";
import ConfirmationModal from "../../common/components/confirmationModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../common/components/Pagination";
import NoDataFound from "../../common/components/NoDataFound";
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

const BlockedUser = ({ authToken }) => {
  const [duration, setDuration] = useState("");
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [canUploadNft, setCanUploadNft] = useState("Last 7 days");
  const [canUploadDropDown, setCanUploadDropDown] = useState(false);
  const [blockedUserModal, setBlockedUserModal] = useState(false);
  const tempBlockUserId = useRef("");

  // ===Pagination
  const [showLimitedRows, setShowLimitedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [clickedPage, setClickedPage] = useState(1);
  const rowsInPage = 7;
  const changePage = (clicked) => {
    setClickedPage(clicked);
  };
  // ----

  useEffect(async () => {
    await getBlockedUsers(setBlockedUsers, authToken);
  }, []);
  // console.log(blockedUsers);
  useEffect(() => {
    const responseData = blockedUsers;
    const totalpage = Math.ceil(responseData.length / rowsInPage);
    setTotalPages(totalpage);
    // setcategories(responseData);
    setShowLimitedRows(responseData.slice(0, rowsInPage));
  }, [blockedUsers]);

  useEffect(() => {
    const responseData = blockedUsers;
    const start = (clickedPage - 1) * rowsInPage;
    const end = clickedPage * rowsInPage;
    // console.log(responseData, "<<<<reported nfts at 45");
    setShowLimitedRows(responseData.slice(start, end));
    // }
  }, [clickedPage]);

  const handleDropDown = () => {
    if (canUploadDropDown === true) {
      setCanUploadDropDown(false);
    } else {
      setCanUploadDropDown(true);
    }
  };
  const handleWhoCanUploadNft = () => {
    setCanUploadNft("Last 7 days");
    setCanUploadDropDown(false);
  };
  const handleWhoCanUploadNft2 = () => {
    setCanUploadNft("Last month");
    setCanUploadDropDown(false);
  };

  const handleUnblockUser = async () => {
    const response = await unblockUser(tempBlockUserId.current, authToken);
    if (response.success) {
      toast.info("User unblocked.");
      const newData = blockedUsers.filter(
        (item) => item._id !== tempBlockUserId.current
      );
      tempBlockUserId.current = "";
      setBlockedUsers(newData);
      setBlockedUserModal(false);
    } else {
      toast.info(response.message);
      setBlockedUserModal(false);
    }

    // if (response) {
    //   const newData = blockedUsers.filter(
    //     item => item._id !== tempBlockUserId.current
    //   );
    //   tempBlockUserId.current = '';
    //   setBlockedUsers(newData);
    //   setBlockedUserModal(false);
    // }
  };

  return (
    <>
      <div className="manageContentFormContainer">
        <div className="manageContentInnerContainer">
          <div className="myStoreHeading1">Manage Content</div>
          <div className="manageContentHeading2Container">
            <div className="myStoreHeading2 manageContentHeading2marginTop">
              {" "}
              Blocked Users
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
            {/* <div className="formInputContainer daysOfReport">
              <div>{canUploadNft}</div>
              <div onClick={() => handleDropDown()}>
                <BsChevronDown className="saleTypeandPricingdowmarrow" />
              </div>
            </div> */}
          </div>
          {/* {canUploadDropDown && (
            <div className="canUploadDropdownManageContent">
              <div
                className="canUploadDropdownEachManageContent"
                onClick={() => handleWhoCanUploadNft()}
              >
                Last 7 days
              </div>
              <div
                className="canUploadDropdownEachManageContent"
                onClick={() => handleWhoCanUploadNft2()}
              >
                Last month
              </div>
            </div>
          )} */}
          <div className="manageContentListContainer">
            <div className="manageContentListHeaderContainer">
              <div className="blockedmanageContentListColumn1">
                <div className="manageContentListColumntitle">Name</div>
              </div>
              {/* <div className='blockedmanageContentListColumn2'>
              <div className='manageContentListColumntitle'>Reported By</div>
            </div> */}
              <div className="blockedmanageContentListColumn3">
                <div className="manageContentListColumntitle">Reported On</div>
              </div>
              <div className="blockedmanageContentListColumn4">
                <div className="manageContentListColumntitle">Reason</div>
              </div>
            </div>
            {showLimitedRows.map((item,key) => (
              <div
                className="manageContentListEachContainer"
                key={item?._id}
                style={{ background: key % 2 == 0 && "#00000014" }}
              >
                <div className="blockedmanageContentListColumn1">
                  <img
                    src={
                      item?.cdnUrl !== "" ? item?.cdnUrl : defaultProfileImage
                    }
                    alt=""
                  />
                  <div className="manageContentListColumntitle manageContentgrey words-break">
                    {(() => {
                      if (item.firstName == "") {
                        return item?.userName;
                      } else {
                        return item?.firstName + " " + item?.lastName;
                      }
                    })()}
                  </div>
                </div>
                {/* <div className='blockedmanageContentListColumn2'>
                <img src={AssetProfilePic} alt='' />
                <div className='manageContentListColumntitle manageContentgrey'>
                  Dussie
                </div>
              </div> */}
                <div className="blockedmanageContentListColumn3">
                  <div className="manageContentListColumntitle manageContentgrey words-break">
                    {momentDate2(item?.addedOn)}
                  </div>
                </div>
                <div className="blockedmanageContentListColumn4">
                  <div className="manageContentListColumntitle manageContentgrey words-break">
                    {item?.reportedInfo?.reason}
                  </div>
                  <div
                    className="manageContentListColumntitle manageContentListColumntitleGreenColor"
                    onClick={() => {
                      setBlockedUserModal(true);
                      tempBlockUserId.current = item?._id;
                      // handleUnblockUser(item._id)
                    }}
                  >
                    Unblock User
                  </div>
                </div>
              </div>
            ))}
            {blockedUsers.length == 0 && <NoDataFound className="no-data-found"/>}

            {/* <div className='manageContentListEachContainer'>
            <div className='manageContentListColumn1'>
              <img src={AssetProfilePic} alt='' />
              <div className='manageContentListColumntitle manageContentgrey'>
                King of seven seas
              </div>
            </div>
            <div className='manageContentListColumn2'>
              <img src={AssetProfilePic} alt='' />
              <div className='manageContentListColumntitle manageContentgrey '>
                Dussie
              </div>
            </div>
            <div className='manageContentListColumn3'>
              <div className='manageContentListColumntitle manageContentgrey'>
                Reported On
              </div>
            </div>
            <div className='manageContentListColumn4'>
              <div className='manageContentListColumntitle manageContentgrey'>
                Fake
              </div>
              <div className='manageContentListColumntitle manageContentListColumntitleGreenColor'>
                Unblock User
              </div>
            </div>
          </div> */}
          </div>
          <Pagination totalPages={totalPages} changePage={changePage} />
        </div>
        <ConfirmationModal
          modalIsOpen={blockedUserModal}
          setModalIsOpen={setBlockedUserModal}
          handleOk={handleUnblockUser}
          headingText={"Unblock user"}
          text={"Are you sure you want to unblock user?"}
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
    authToken: state.store.store.token,
  };
};

export default connect(mapStateToProps)(BlockedUser);
