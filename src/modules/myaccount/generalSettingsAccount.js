import React, { useRef, useState } from "react";
import "./styles/myaccount.css";
import "./styles/generalSettingsAccount.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import codes from "country-calling-code";
import { useDropzone } from "react-dropzone";
import { BiUpload } from "react-icons/bi";
import { connect } from "react-redux";
import { httpConstants } from "../../constants";
import { put_accountGeneralSettings } from "../../services";
import { updateStore } from "../../actions/storeActions";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidEmail } from "../../utility";
import { AiOutlineSearch } from "react-icons/ai";

const GeneralSettingsAccount = ({ store, updateStore }) => {
  const navigate = useNavigate();

  const [saveActive, setSaveActive] = useState(false);
  const CountryCodeList = codes;
  const [tempCountryCode, settempCountryCode] = useState(codes);

  const [countryCode, setCountryCode] = useState(`91`);
  // const [countryCode, setCountryCode] = useState([
  //   `${store?.client?.phoneNumber.slice(0, -11)}`,
  // ]);
  const [countryCodePicker, setCountryCodePicker] = useState(false);

  const handleCountryCode = (code) => {
    setCountryCode(code);
    setSaveActive(true);
    setCountryCodePicker(false);
  };

  const [files, setFiles] = useState([
    {
      name:
        store?.client?.profilePic !== ""
          ? store?.client?.profilePic
          : undefined,
      preview:
        store?.client?.profilePic !== ""
          ? store?.client?.profilePic
          : undefined,
    },
  ]);

  const [logoPresent, setLogoPresent] = useState(
    store?.client?.profilePic !== "" ? true : false
  );

  const [nameError,setNameError]=useState("");
  const [priceError,setPriceError]=useState("");
  const [emailError,setEmailError]=useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept:  "image/*",
    maxSize: "30485760",
    onDrop: (acceptedFiles,fileRejections) => {
      fileRejections.forEach((file)=>{
        file.errors.forEach((err)=>{
          if(err.code === "file-too-large"){
            toast.error("Image file size should be less than 30 mb")
            return ;
          }
          else if(err.code === "file-invalid-type"){
            toast.error("File type not acceptable. Please use JPG,JPEG,PNG, SVG file");
            return ;
          }
          else{
            toast.error("Image file size should be greater than 136*40 pixel");
            return ;
          }
        })
      })
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      acceptedFiles.length>0?setLogoPresent(true):setLogoPresent(false);
      setSaveActive(true);
    },
  });

  const images = files.map((file) => (
    <div key={file.name} className="previewImageDragandDrop">
      <img src={file.preview} alt="preview" style={{ borderRadius: "12px" }} />
    </div>
  ));

  const handleUploadAgain = () => {
    profilePic.current = "";
    setFiles([]);
    setLogoPresent(false);
  };

  const profilePic = useRef(
    store?.client?.profilePic !== "" ? store?.client?.profilePic : ""
  );
  const name = useRef(store?.client?.name !== "" ? store?.client?.name : "");
  const clientEmail = useRef(
    store?.client?.clientEmail !== "" ? store?.client?.clientEmail : ""
  );
  const contactNumber = useRef(
    store?.client?.phoneNumber !== ""
      ? store?.client?.phoneNumber.slice(-10)
      : ""
  );

  const handleSubmit = async () => {
    // validation
    if (countryCode[0] === "") {
      setSaveActive(false);
      toast.info("Please enter country code");
      return;
    } else if (contactNumber.current.length !== 10) {
      setSaveActive(false);
      toast.info("Given Contact Number is not Valid");
      return;
    } else if (!isValidEmail(clientEmail.current)) {
      setSaveActive(false);
      toast.info("Given Email is not Valid");
      return;
    }
    const formData = new FormData();
    formData.append("folderName", "user");
    formData.append("createdBy", store._id);
    formData.append("attachment", files[0]);

    const res = await fetch(
      `${httpConstants.BASE_URL2}/api/v1/upload-documents`,
      {
        method: httpConstants.METHOD_TYPE.POST,
        body: formData,
      }
    );
    const result = await res.json();
    if (result.success) profilePic.current = result.responseData;

    const data = {
      profilePic: profilePic.current,
      name: name.current,
      phoneNumber: `${countryCode} ${contactNumber.current}`,
      // phoneNumber: `91 ${contactNumber.current}`,
      clientEmail: clientEmail.current,
    };

    const updatedStoreResponse = await put_accountGeneralSettings(
      store._id,
      data,
      store.token
    );
    if (updatedStoreResponse.success) {
      toast.info("My Account updated.");
      await updateStore({ store: updatedStoreResponse.responseData });
      setSaveActive(false);
      setTimeout(() => {
        navigate("/my-account/notification-settings");
      }, 1000);
    } else {
      setSaveActive(false);
      updatedStoreResponse.errors.map((item) => toast.info(item.message));
    }

    // updatedStoreResponse && updateStore({ store: updatedStoreResponse.responseData });
    // setSaveActive(false);
    // navigate('/my-account/notification-settings');
  };

  const [tempSearchInput, setTempSearchInput] = useState("");
  const [searchedCountryCode, setSearchedCountryCode] = useState(false);
  const [searchedCountriesList, setSearchedCountriesList] = useState([]);
  const handleSearchCountryCode = () => {
    console.log(tempSearchInput);
    setSearchedCountryCode(!searchedCountryCode);
    setSearchedCountriesList(
      CountryCodeList.filter((item) => {
        if (item.country.toLowerCase().includes(tempSearchInput.toLowerCase()))
          return item;
      })
    );
  };

  const filterCountryCode = (value) => {
    console.log(value, "<<<value");
    const tempArray = CountryCodeList.filter((item) => {
      const { country, countryCodes } = item;
      if (country.includes(value) || countryCodes[0].includes(value)) {
        return true;
      }
    });
    console.log(tempArray, "<<<<temoArray");
    settempCountryCode(tempArray);
  };

  let enabled=contactNumber.current.length > 0 && clientEmail.current.length >0 && name.current.length >0 && files.length >0 && nameError=="" && emailError=="" && priceError==""; 
  return (
    <>
      <div className="myAccountFormContainer">
        <div className="generalSettingsForm">
          <div className="myStoreHeading1">General Settings</div>
          <div className="myStoreHeading2"> Profile Pic*
          {logoPresent && (
              <span className="removeLogo"
              onClick={handleUploadAgain}>
                Remove Logo
                </span>

            )}
          
          </div>
          <div className="forminnerContainer">
            {!logoPresent && (
              <div className="draganddropbox" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="draganddropboxinnerdiv">
                  <FaCloudUploadAlt className="draganddropboxIcon" />
                  <span className="draganddropboxinnerdivtextspan">
                    Drag and Drop or
                    <span className="draganddropboxinnerdivtextspanbrowse">
                      {" "}
                      Browse
                    </span>
                  </span>
                </div>
              </div>
            )}
            {logoPresent && (
              <div className="draganddropbox draganddropPreview dragdrop">{images}</div>
            )}
            <div className="formsecondarytext">
              Upload profile pic not more tha 30 MB
            </div>
            {logoPresent && (
              <div
                className="draganddropboxUploadAgain"
                {...getRootProps()}
                // onClick={handleUploadAgain}
              >
                <BiUpload className="draganddropboxUploadAgainIcon" />
                <input {...getInputProps()} />
                <div>Upload Again</div>
              </div>
            )}
            <div className="myStoreHeading3 myStoreHeading3ContactNO">
              {" "}
              Name*<span style={{color:"red",fontSize:"0.733vw"}}>{nameError}</span>
            </div>
            <div className="formInputContainer nameContainer">
              <input
                type="text"
                className="formsInput nameInputField"
                placeholder="Enter Name"
                defaultValue={store?.client?.name}
                onChange={(e) => {
                  const { value } = e.target;
                  const format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;

                  if (format.test(e.target.value))
                    setNameError("( No Special Character Allowed )");
                  else if (e.target.value.length === 0) setNameError("( Name is required )");
                  else setNameError("")

                  value.trim() == "" || value.trim() == null
                    ? setSaveActive(false)
                    : setSaveActive(true);
                  setSaveActive(true);
                  name.current = e.target.value;
                }}
              />
            </div>
            <div className="myStoreHeading3 myStoreHeading3ContactNO">
              {" "}
              Contact Number*<span style={{color:"red",fontSize:"0.733vw"}}>{priceError}</span>
            </div>
            <div className="contactNoContainer">
              <div
                className="formInputContainer countryCode"
                onClick={() => setCountryCodePicker(!countryCodePicker)}
              >
                +{countryCode} <IoIosArrowDown />
              </div>
              <div className="formInputContainer contactNoAccount contanctNumber">
                <input
                  type="text"
                  className="formsInput contactInputField"
                  placeholder="Enter Contact Number"
                  maxLength={10}
                  defaultValue={store?.client?.phoneNumber.slice(-10)}
                  onChange={(e) => {
                    //e.target.value = e.target.value.slice(0, 10);
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    contactNumber.current = e.target.value;
                    if (e.target.value.length == 10) setSaveActive(true);
                    else setSaveActive(false);
                    if(e.target.value.length ==0)
                    setPriceError("( Number is required )")
                    else if (e.target.value.length!=10) setPriceError("( Number is not valid )")
                    else setPriceError("")
                  }}
                />
              </div>
            </div>
            {countryCodePicker && (
              <div className="countryCodeContainer">
                <div className="countryCodeSearchInputContainer">
                  <input
                    className="countryCodeSearchInput"
                    placeholder="Search Country"
                    value={tempSearchInput}
                    onChange={(e) => {
                      filterCountryCode(e.target.value);
                      setTempSearchInput(e.target.value);
                      handleSearchCountryCode()
                    }}
                  />
                  {!searchedCountryCode && (
                    <AiOutlineSearch
                      className="countryCodeSearchInputIcon"
                      onClick={handleSearchCountryCode}
                    />
                  )}
                  {searchedCountryCode && (
                    <div
                      onClick={() => {
                        setSearchedCountryCode(!searchedCountryCode);
                        setTempSearchInput("");
                      }}
                    >
                      X
                    </div>
                  )}
                </div>
                {!searchedCountryCode &&
                  tempCountryCode.map((item) => (
                    <div
                      className="countryCodeEach"
                      onClick={() => handleCountryCode(item.countryCodes)}
                    >
                      <div className="countryCodeList">
                        +{item.countryCodes}
                      </div>
                      <div className="countryName">{item.country}</div>
                    </div>
                  ))}
                {searchedCountryCode &&
                  searchedCountriesList.length !== 0 &&
                  searchedCountriesList.map((item) => (
                    <div
                      className="countryCodeEach"
                      onClick={() => handleCountryCode(item.countryCodes)}
                    >
                      <div className="countryCodeList">
                        +{item.countryCodes}
                      </div>
                      <div className="countryName">{item.country}</div>
                    </div>
                  ))}
                {searchedCountryCode && searchedCountriesList.length === 0 && (
                  <div>No Result Found</div>
                )}
              </div>
            )}
            <div className="myStoreHeading3 myStoreHeading3ContactNO">
              {" "}
              Email Address* <span style={{color:"red",fontSize:"0.733vw"}}>{emailError}</span>
            </div>
            <div className="formInputContainer emailContainer">
              <input
                type="email"
                className="formsInput emailInputField"
                placeholder="Enter Email Address"
                defaultValue={store?.client?.clientEmail}
                onChange={(e) => {
                  // setSaveActive(true);
                  if(e.target.value.length ===0)
                  setEmailError("( Email is required )")
                  else 
                  setEmailError("")
                  clientEmail.current = e.target.value;
                  if (isValidEmail(e.target.value)) setSaveActive(true);
                  else setSaveActive(false);
                }}
              />
            </div>
          </div>
          {/* {saveActive }*/
          enabled && (
            <div className="formsaveButtonContainer" onClick={handleSubmit}>
              <div className="formsaveButton">Save</div>
            </div>
          )}
          {/* {!saveActive }*/
          !enabled
           && (
            <div
              className="formsaveButtonContainer"
              style={{ opacity: "0.55" }}
            >
              <div className="formsaveButton">Save</div>
            </div>
          )}
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

const mapStateToProps = (state) => {
  return {
    store: state.store.store,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (data) => dispatch(updateStore(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralSettingsAccount);
