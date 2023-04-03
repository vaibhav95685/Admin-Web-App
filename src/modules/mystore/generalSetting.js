import React, { useEffect, useRef, useState } from "react";
import "./styles/myStore.css";
import "./styles/generalSetting.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { BiUpload } from "react-icons/bi";
import { connect } from "react-redux";
import { putStoreGeneralSettings } from "../../services";
import { updateStore } from "../../actions/storeActions";
import { httpConstants } from "../../constants";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-modal';
import getCroppedImg from "../../utility/cropImage";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "react-bootstrap";
import CropEasy from "../../common/components/cropEasy";
import {createSubDomain,createSubsription} from "../../services/index"
import Utils from "../../utility"
const GeneralSetting = ({ store, walletAddress, updateStore }) => {
  const navigate = useNavigate();
  const instagramInputRef = useRef();
  const twitterInputRef = useRef();
  const redditInputRef = useRef();
  const telegramInputRef = useRef();
  const facebookInputRef = useRef();
  const linkedinInputRef = useRef();
  const discordInputRef = useRef();
  const youtubeInputRef = useRef();

  const [saveActive, setSaveActive] = useState(false);
  const [isSaveClicked, setisSaveClicked] = useState(false);
  const [ratio,setRatio]=useState(16/9);
  useEffect(() => {
    // if (store?.companyLogo !== '') {
    //   // setFiles([
    //   //   {
    //   //     name: store?.companyLogo,
    //   //     preview: store?.companyLogo,
    //   //   },
    //   // ]);
    //   setLogoPresent(true);
    // } else if (store?.companyLogo === '') {
    //   setFiles([]);
    // }
    store?.socialMediaConnection.map((item) => {
      if (item.name === "instagram") {
        // instagramInputRef.current.defaultValue = item.url;
        setInstagram(true);
      }
      if (item.name === "twitter") {
        setTwitter(true);
      }
      if (item.name === "reddit") setReddit(true);
      if (item.name === "telegram") setTelegram(true);
      if (item.name === "facebook") {
        // facebookInputRef.current.defaultValue = item.url;
        setFacebook(true);
      }
      if (item.name === "linkedIn") setLinkedin(true);
      if (item.name === "discord") setDiscord(true);
      if (item.name === "youtube") setYoutube(true);
    });
  }, []);

  const companyLogo = useRef(
    store?.companyLogo !== "" ? store?.companyLogo : ""
  );
  const storeName = useRef(store?.storeName !== "" ? store?.storeName : "");
  const storeFee = useRef(store?.storeFee !== "" ? store?.storeFee : "");
  const storeAbout = useRef(store?.about?.title !== "" ? store?.about?.title : "");
  const storeDes = useRef(store?.about?.description !== "" ? store?.about?.description:"");
  const socialMediaConnection = useRef(
    store?.socialMediaConnection?.length !== 0
      ? store?.socialMediaConnection
      : []
  );
  const siteUrl = useRef(store?.siteUrl !== "" ? store?.siteUrl : "");

  const [instagram, setInstagram] = useState(false);  
  const [twitter, setTwitter] = useState(false);
  const [reddit, setReddit] = useState(false);
  const [telegram, setTelegram] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [linkedin, setLinkedin] = useState(false);
  const [discord, setDiscord] = useState(false);
  const [youtube, setYoutube] = useState(false);

  const [cropModelStatus, setCropModelStatus] = useState(false);
  const [cropImageSize, setCropImageSize] = useState({
    heigth: '100%',
    width: '100%'
  })

  const [files, setFiles] = useState(
    store?.companyLogo !== ""
      ? [
        {
          name: store?.companyLogo,
          preview: store?.companyLogo,
        },
      ]
      : []
  );
  const [logoPresent, setLogoPresent] = useState(
    store?.companyLogo !== "" ? true : false
  );
  let [openCropper,setOpenCropper]=useState(false);

  let [photoURL,setPhotoURL]=useState(
     store?.companyLogo !== "" ? store?.companyLogo:""
     );
 let fileUploadError=false;

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".svg,.png,.jpeg,.jpg",
    maxSize: "30485760",
    onDrop: (acceptedFiles, fileRejections) => {
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            fileUploadError=true;
            toast.error("Image file size should be less than 30 mb");
            return;
          } else if (err.code === "file-invalid-type") {
            fileUploadError=true;
            toast.error("File type not acceptable. Please use SVG, PNG  file");

            return;
          } else {
            toast.error("Image file size should be greater than ……. pxl");
            return;
          }
        });
      });
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setPhotoURL(acceptedFiles.map((file) =>
      URL.createObjectURL(file),
     ))
      acceptedFiles?.length > 0 ? setLogoPresent(true) : setLogoPresent(false);
      fileUploadError ?    setOpenCropper(false) :setOpenCropper(true);
      setSaveActive(true);

      // acceptedFiles.length > 0 ? setCropModelStatus(true) : setCropModelStatus(false);

      /*if (acceptedFiles.length) {
        let fileBlob = acceptedFiles[0].preview;

        let img = new Image();
        img.src = fileBlob;

        img.onload = function () {
          setCropImageSize({ width: img.width, heigth: img.height });
          console.log(img.width + " " + img.height);
        };

      }*/

    },
  });
  // let value;
  // useEffect(()=>{
  //  files.length >0 ?setLogoPresent(true):setLogoPresent(false);
  // },[files])

  // const images = files.map((file) => (
  //   <div key={file.name} className="previewImageDragandDrop">
  //     <img src={file.preview} alt="preview" style={{ borderRadius: "12px" }} />
  //   </div>
  // ));
  const CropImage = ( <div  className="previewImageDragandDrop">
  <img src={photoURL} alt="preview" style={{ borderRadius: "12px" }} />
</div>);
  const handleUploadAgain = () => {
    companyLogo.current = "";
    setFiles([]);
    setLogoPresent(false);
  };

  const handleSocialMediaConnection = (name, value) => {
    console.log(socialMediaConnection.current,store);
    socialMediaConnection.current = socialMediaConnection.current.map(
      (item) => {
        if (item.name === name) return { name: item.name, url: value };
        else return item;
      }
    );
  };

  const createDomain=async ()=>{
    let requestData = {
      subdomain: storeName.current,
      tenantId: store._id,
    };

    const [errorDomain, domainResult] = await Utils.parseResponse(
       createSubDomain(requestData,store.token)
     );

     if (domainResult.responseCode === 403) {
     Utils.apiFailureToast("Already Exist");
    }
    else if (domainResult.success) {
      let subreqData = {
        planName: "Free",
        billingCycle: "monthly",
        price: 0,
        tenantId: domainResult.responseData?._id,
        walletAddress: domainResult?.responseData?.wallet,
        features: [
          "Admin Portal",
          "Multiple Blockchain Support",
          "Multi File Formats",
          "Filter And Ranking",
          "Lazy Minting",
          "Social Media Sharing",
        ],
      };
      const [error, result] = await Utils.parseResponse(
        createSubsription(subreqData,store.token)
      );

        return true;
    }
  }
  const generalSettingUpdate=async (data)=>{
    try{
      const response = await putStoreGeneralSettings(
        store._id,
        data,
        store.token
      );
      if (response.success) {
        // console.log(response, '<<< general setting res');
        console.log(response, response.status, "<<<<");
        updateStore({ store: response.responseData });
        setSaveActive(false);
        toast.info("General Settings Updated.");
        setTimeout(() => {
          navigate("/my-store/advanced-settings");
        }, 1000);
        // navigate('/my-store/advanced-settings');
        setSaveActive(false);
      } else {
        response.errors.map((item) => toast.info(item.message));
        setSaveActive(false);
      }
    }catch(e){
      console.log(e);
    }
  }

  const handleSubmit = async () => {
    // validation
    try {
      // setisSaveClicked(true);
      if (storeFee.current <= 0 || storeFee.current >= 100) {
        toast.info("Store Fee Not Valid.");
        setSaveActive(false);
        // setisSaveClicked(false);
        return;
      }

      const formData = new FormData();
      formData.append("folderName", "store");
      formData.append("createdBy", store._id);
      formData.append("attachment", files);

      const res = await fetch(
        `${httpConstants.BASE_URL2}/api/v1/upload-documents`,
        {
          method: httpConstants.METHOD_TYPE.POST,
          body: formData,
        }
      );
      const result = await res.json();
      if (result.success) companyLogo.current = result.responseData;

      const data = {
        about:{
          title:storeAbout.current.trim(),
          description:storeDes.current.trim(),
        },
        storeName: storeName.current.trim(),
        storeFee: storeFee.current,
        companyLogo: companyLogo.current,
        wallet: walletAddress,
        socialMediaConnection: socialMediaConnection.current,
      };


      if(store.storeName !== storeName.current){
        const [err,result]=await Utils.parseResponse(
          createDomain()
        );
        console.log(err,result,"sdfdsf")
        if(result){
          await generalSettingUpdate(data);
        }
      }
      else{
          await generalSettingUpdate(data);
      }
    } catch {
      (e) => console.log(e);
    }
  };
  // let enabled=storeName.current.length >0 && storeFee.current.lenght > 0 && companyLogo.current.length>0 && nameError=="" && priceError=="";
  //  ------------------------------------------ text area validation
  const [textareaValue, setTextareaValue] = useState(store?.storeName);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [instagramError, setInstagramError] = useState("");
  const [twitterError, setTwitterError] = useState("");
  const [redditError, setRedditError] = useState("");
  const [telegramError, setTelegramError] = useState("");
  const [facebookError, setFacebookError] = useState("");
  const [linkedinError, setLinkedinError] = useState("");
  const [discordError, setDiscordError] = useState("");
  const [youtubeError, setYoutubeError] = useState("");
  

console.log()
  const [crop, setCrop] = useState({
    unit: "px", // Can be 'px' or '%'
    x: 6,
    y: 25,
    width: 179,
    height: 43
  });
  const [completedCrop, setCompletedCrop] = useState({
    unit: "px", // Can be 'px' or '%'
    x: 6,
    y: 25,
    width: 179,
    height: 43
  });

  const handleCrop = (e) => {
    setCrop({
      ...crop,
      x: e.x,
      y: e.y
    });
  };

  const handleComplete = async (e) => {
    setCompletedCrop({
      unit: "px", // Can be 'px' or '%'
      x: e.x,
      y: e.y,
      width: 179,
      height: 43
    });

    try {

      const croppedImage = await getCroppedImg(
        files[0].preview,
        { x: e.x, y: e.y, width: 179, height: 43 }
      )

      console.log(croppedImage, 'output')

    } catch (e) {
      console.error('error: on cropping', e)
    }

  };


  let lenght = 0;
  lenght = textareaValue ? textareaValue?.length : 0;
  const checkButtonText = () => {
    console.log(socialMediaConnection.current, "<<<<");
    socialMediaConnection.current.map((item, key) => {
      console.log(item, "<<<");
      if (item.url.trim() == "") {
        setSaveActive(false);
      }
    });
  };
const enabled=storeName.current!=="" &&storeFee.current!=="" &&
storeAbout.current!=""&&
storeDes.current!=="" && 
instagramError==""&&
redditError==""&&
telegramError==""&&
facebookError==""&&
linkedinError==""&&
discordError==""&& 
youtubeError=="";

const createCategoryCustomStyles = {
  content: {
    width: "50%",
    height: "662px",
    boxSizing: "border-box",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    border: "none",
    borderRadius: 0,
  },
};

console.log(logoPresent)
  return (
    <>
      <div className="myStoreFormContainer">
        <div className="generalSettingsForm">
          <div className="myStoreHeading1">General Settings</div>
          <div className="myStoreHeading2"> Name and Logo</div>
          <div className="forminnerContainer">
            <div className="myStoreHeading3">
              {" "}
              Upload Logo
              {/* {logoPresent && (
                <span className="removeLogo" onClick={handleUploadAgain}>
                  Remove Logo
                </span>
              )} */}
            </div>
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
              <div className="draganddropbox draganddropPreview">
                {/* <ReactCrop
                  locked="true"
                  crop={crop}
                  onChange={(e) => handleCrop(e)}
                  onComplete={(e) => handleComplete(e)}
                >
                  {images}
                </ReactCrop>         */}
                {CropImage}
              </div>
            )}
            <div className="formsecondarytext">
              Upload logo in .svg or .png format of size 136x40px
            </div>

            {logoPresent && (
              <div
                className="draganddropboxUploadAgain"
                {...getRootProps()}
              // onClick={handleUploadAgain}
              >
                <BiUpload className="draganddropboxUploadAgainIcon" />
                <input {...getInputProps()} />
                <div>Change Logo</div>
              </div>
            )}
            <div className="myStoreHeading3">
              {" "}
              Name of Store{" "}
              <span style={{ color: "red", fontSize: "0.733vw" }}>
                {nameError}
              </span>
            </div>
            <div className="formInputContainer">
              <input
                type="text"
                className="formsInput"
                placeholder="Write name of the store"
                // defaultValue={store?.storeName}
                onChange={(e) => {
                  const { value } = e.target;
                  const format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;

                  if (format.test(e.target.value))
                    setNameError("( No Special Character Allowed )");
                  else if (e.target.value.length === 0)
                    setNameError("( Name is required )");
                  else setNameError("");

                  if (value.trim() == "" || storeFee.current == "") {
                    setSaveActive(false);
                  } else {
                    setSaveActive(true);
                  }
                  // value.trim() == "" || value.trim() == null
                  //   ? setSaveActive(false)
                  //   : setSaveActive(true);

                  storeName.current = e.target.value;
                  setTextareaValue(e.target.value);
                }}
                value={textareaValue}
                maxlength="50"
              />
            </div>
            <div className="wordsUsedinModal">
              {lenght} of 50 characters used.
            </div>
            <div className="myStoreHeading3">
              Store Fees
              <span style={{ color: "red", fontSize: "0.733vw" }}>
                {priceError}
              </span>
            </div>
            <div className="formInputContainer">
              <input
                type="text"
                className="formsInput storeFeesInput"
                placeholder="Enter Store fee"
                min="1"
                defaultValue={store?.storeFee}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  const { value } = e.target;
                  if (e.target.value.length == 0)
                    setPriceError("( Store Fees is required )");
                  else if (+e.target.value > 100)
                    setPriceError("( Please enter the fees between 0 to 100 )");
                  else setPriceError("");
                  if (storeName.current.trim() == "" || value == "") {
                    setSaveActive(false);
                  } else {
                    setSaveActive(true);
                  }
                  // value.trim() == "" || value.trim() == null
                  //   ? setSaveActive(false)
                  //   : setSaveActive(true);
                  // setSaveActive(true);
                  e.target.value = e.target.value.slice(0, 3);
                  storeFee.current = e.target.value;
                }}
              />
              <div className="storeFeesPercentge">%</div>
            </div>
            <div className="formsecondarytext">
              Revenue percentage to be shared with this store
            </div>
            <div className="myStoreHeading3">Store Wallet</div>
            <div className="storeWalletContainer">{walletAddress}</div>
            <div className="formsecondarytext">
              Store Fees will be connected from this wallet
            </div>

            <div className="myStoreHeading3">
              {" "}
              About Title{" "}              
            </div>
            <div className="formInputContainer">
              <input
                type="text"
                className="formsInput"
                placeholder="Enter About Title"                              
                maxlength="50"
                defaultValue={store?.about?.title}
                onChange={(e)=>{
                  storeAbout.current=e.target.value;
                 
                  if (e.target.value.length ==0 || storeDes.current?.length==0) {

                    setSaveActive(false);
                  } else {
                    setSaveActive(true);
                  }
                 
                

                }} 
              />
            </div>

            <div className="myStoreHeading3">
              {" "}
              About Description{" "}              
            </div>
            <div className="formInputContainer">
              <textarea                
                className="formsInput"
                placeholder="Enter Description for about page"  
                rows="5" 
                defaultValue={store?.about?.description}
                onChange={(e)=>{
                  storeDes.current=e.target.value;
                
                  if (e.target.value.length ==0 || storeAbout.current?.length==0) {
                    setSaveActive(false);
                  } else {
                    setSaveActive(true);
                  }
                 
              
                  
                }}                                       
              ></textarea>
            </div>    


          </div>
          <div className="myStoreHeading2"> Social media Connection</div>
          <div className="myStoreSocialMediaContainer">
            <div className="myStoreSocialMediaEach">
              Instagram
              <span style={{ color: "red", fontSize: "0.733vw" }}>
                {instagramError}
              </span>
            </div>
            {!instagram && (
              <div
                className="myStoreSocialMediaToggleButton"
                onClick={() => {
                  setInstagramError("");
                  socialMediaConnection.current.push({
                    name: "instagram",
                    url: "",
                  });
                  socialMediaConnection.current.map((item, key) => {
                    console.log(item, "<<<");
                    if (item.url.trim() == "") {
                      setSaveActive(false);
                    }
                  });
                  setInstagramError("( Instagram is required )");
                  setInstagram(true);
                }}
              >
                <div className="myStoreSocialMediaToggler"></div>
              </div>
            )}
            {instagram && (
              <div
                className="myStoreSocialMediaToggleButtonActive"
                onClick={() => {
                  setInstagramError("");
                  socialMediaConnection.current =
                    socialMediaConnection.current.filter(
                      (item) => item.name !== "instagram"
                    );
                  // checkButtonText();
                  // socialMediaConnection.current.map((item, key) => {
                  //   console.log(item, "<<<");
                  //   if (item.url.trim() == "") {
                  //     setSaveActive(false);
                  //   }
                  // });

                  setInstagram(false);
                  setSaveActive(true);
                }}
              >
                <div className="myStoreSocialMediaTogglerActive"></div>
              </div>
            )}
          </div>
          {instagram && (
            <div className="formInputContainer">
              <input
                ref={instagramInputRef}
                type="text"
                className="formsInput"
                maxLength={100}
                // value={
                //   socialMediaConnection.current.filter(
                //     (item) => item.name == "instagram"
                //   )[0].url
                // }
                placeholder="Instagram username here.."
                defaultValue={
                  store?.socialMediaConnection.find(
                    (item) => item.name === "instagram"
                  )?.url
                }
                onChange={(e) => {
                  if (e.target.value.length > 99)
                    setInstagramError("( Only 100 characters are allowed )");
                  else if (e.target.value.length === 0) {
                    setInstagramError("( Instagram is required )");
                  } else setInstagramError("");

                  const { value } = e.target;
                  if (instagram) {
                    value.trim() == "" || value.trim() == null
                      ? setSaveActive(false)
                      : setSaveActive(true);
                  }

                  handleSocialMediaConnection(
                    "instagram",
                    e.target.value.trim()
                  );
                }}
              />
            </div>
          )}
          <div className="myStoreSocialMediaContainer">
            <div className="myStoreSocialMediaEach">
              Twitter
              <span style={{ color: "red", fontSize: "0.733vw" }}>
                {twitterError}
              </span>
            </div>
            {!twitter && (
              <div
                className="myStoreSocialMediaToggleButton"
                onClick={() => {
                  setTwitterError("");
                  socialMediaConnection.current.push({
                    name: "twitter",
                    url: "",
                  });
                  setTwitter(true);
                  setTwitterError("( Twitter is required )");
                  // setSaveActive(true);
                  // checkButtonText();
                  socialMediaConnection.current.map((item, key) => {
                    console.log(item, "<<<");
                    if (item.url.trim() == "") {
                      setSaveActive(false);
                    }
                  });
                }}
              >
                <div className="myStoreSocialMediaToggler"></div>
              </div>
            )}
            {twitter && (
              <div
                className="myStoreSocialMediaToggleButtonActive"
                onClick={() => {
                  setTwitterError("");
                  socialMediaConnection.current =
                    socialMediaConnection.current.filter(
                      (item) => item.name !== "twitter"
                    );
                  setTwitter(false);
                  setSaveActive(true);
                  // checkButtonText();
                  // socialMediaConnection.current.map((item, key) => {
                  //   console.log(item, "<<<");
                  //   if (item.url.trim() == "") {
                  //     setSaveActive(false);
                  //   }
                  // });
                }}
              >
                <div className="myStoreSocialMediaTogglerActive"></div>
              </div>
            )}
          </div>
          {twitter && (
            <div className="formInputContainer">
              <input
                ref={twitterInputRef}
                type="text"
                maxLength={100}
                className="formsInput"
                placeholder="Twitter username here.."
                defaultValue={
                  store?.socialMediaConnection.find(
                    (item) => item.name === "twitter"
                  )?.url
                }
                onChange={(e) => {
                  const { value } = e.target;
                  if (e.target.value.length > 99)
                    setTwitterError("( Only 100 characters are allowed )");
                  else if (e.target.value.length === 0)
                    setTwitterError("( Twitter is required )");
                  else setTwitterError("");

                  if (value) setSaveActive(true);
                  handleSocialMediaConnection("twitter", e.target.value);
                }}
              />
            </div>
          )}
          <div className="myStoreSocialMediaContainer">
            <div className="myStoreSocialMediaEach">
              Reddit
              <span style={{ color: "red", fontSize: "0.733vw" }}>
                {redditError}
              </span>
            </div>
            {!reddit && (
              <div
                className="myStoreSocialMediaToggleButton"
                onClick={() => {
                  setRedditError("");
                  socialMediaConnection.current.push({
                    name: "reddit",
                    url: "",
                  });
                  setReddit(true);
                  setRedditError("( Reddit is required )");
                  // setSaveActive(true);
                  // checkButtonText();
                  socialMediaConnection.current.map((item, key) => {
                    console.log(item, "<<<");
                    if (item.url.trim() == "") {
                      setSaveActive(false);
                    }
                  });
                }}
              >
                <div className="myStoreSocialMediaToggler"></div>
              </div>
            )}
            {reddit && (
              <div
                className="myStoreSocialMediaToggleButtonActive"
                onClick={() => {
                  setRedditError("");
                  socialMediaConnection.current =
                    socialMediaConnection.current.filter(
                      (item) => item.name !== "reddit"
                    );
                  setReddit(false);
                  setSaveActive(true);
                  // checkButtonText();
                  // socialMediaConnection.current.map((item, key) => {
                  //   console.log(item, "<<<");
                  //   if (item.url.trim() == "") {
                  //     setSaveActive(false);
                  //   }
                  // });
                }}
              >
                <div className="myStoreSocialMediaTogglerActive"></div>
              </div>
            )}
          </div>
          {reddit && (
            <div className="formInputContainer">
              <input
                ref={redditInputRef}
                type="text"
                className="formsInput"
                maxLength={100}
                placeholder="Reddit username here.."
                defaultValue={
                  store?.socialMediaConnection.find(
                    (item) => item.name === "reddit"
                  )?.url
                }
                onChange={(e) => {
                  if (e.target.value.length > 99)
                    setRedditError("( Only 100 characters are allowed )");
                  else if (e.target.value.length === 0)
                    setRedditError("( Reddit is required )");
                  else setRedditError("");

                  setSaveActive(true);
                  handleSocialMediaConnection("reddit", e.target.value);
                }}
              />
            </div>
          )}
          <div className="myStoreSocialMediaContainer">
            <div className="myStoreSocialMediaEach">
              Telegram
              <span style={{ color: "red", fontSize: "0.733vw" }}>
                {telegramError}
              </span>
            </div>
            {!telegram && (
              <div
                className="myStoreSocialMediaToggleButton"
                onClick={() => {
                  setTelegramError("");
                  socialMediaConnection.current.push({
                    name: "telegram",
                    url: "",
                  });
                  setTelegram(true);
                  setTelegramError("( Telegram is required )");
                  // setSaveActive(true);
                  // checkButtonText();
                  socialMediaConnection.current.map((item, key) => {
                    console.log(item, "<<<");
                    if (item.url.trim() == "") {
                      setSaveActive(false);
                    }
                  });
                }}
              >
                <div className="myStoreSocialMediaToggler"></div>
              </div>
            )}
            {telegram && (
              <div
                className="myStoreSocialMediaToggleButtonActive"
                onClick={() => {
                  setTelegramError("");
                  socialMediaConnection.current =
                    socialMediaConnection.current.filter(
                      (item) => item.name !== "telegram"
                    );
                  setTelegram(false);
                  setSaveActive(true);
                  // checkButtonText();
                  // socialMediaConnection.current.map((item, key) => {
                  //   console.log(item, "<<<");
                  //   if (item.url.trim() == "") {
                  //     setSaveActive(false);
                  //   }
                  // });
                }}
              >
                <div className="myStoreSocialMediaTogglerActive"></div>
              </div>
            )}
          </div>
          {telegram && (
            <div className="formInputContainer">
              <input
                ref={telegramInputRef}
                type="text"
                maxLength={100}
                className="formsInput"
                placeholder="Telegram channel here.."
                defaultValue={
                  store?.socialMediaConnection.find(
                    (item) => item.name === "telegram"
                  )?.url
                }
                onChange={(e) => {
                  if (e.target.value.length > 99)
                    setTelegramError("( Only 100 characters are allowed )");
                  else if (e.target.value.length === 0)
                    setTelegramError("( Telegram is required )");
                  else setTelegramError("");

                  setSaveActive(true);
                  handleSocialMediaConnection("telegram", e.target.value);
                }}
              />
            </div>
          )}
          <div className="myStoreSocialMediaContainer">
            <div className="myStoreSocialMediaEach">
              Facebook
              <span style={{ color: "red", fontSize: "0.733vw" }}>
                {facebookError}
              </span>
            </div>
            {!facebook && (
              <div
                className="myStoreSocialMediaToggleButton"
                onClick={() => {
                  setFacebookError("");
                  socialMediaConnection.current.push({
                    name: "facebook",
                    url: "",
                  });
                  setFacebook(true);
                  setFacebookError("( FaceBook is required )");
                  // setSaveActive(true);
                  // checkButtonText();
                  socialMediaConnection.current.map((item, key) => {
                    console.log(item, "<<<");
                    if (item.url.trim() == "") {
                      setSaveActive(false);
                    }
                  });
                }}
              >
                <div className="myStoreSocialMediaToggler"></div>
              </div>
            )}
            {facebook && (
              <div
                className="myStoreSocialMediaToggleButtonActive"
                onClick={() => {
                  setFacebookError("");
                  socialMediaConnection.current =
                    socialMediaConnection.current.filter(
                      (item) => item.name !== "facebook"
                    );
                  setFacebook(false);
                  setSaveActive(true);
                  // checkButtonText();
                  // socialMediaConnection.current.map((item, key) => {
                  //   console.log(item, "<<<");
                  //   if (item.url.trim() == "") {
                  //     setSaveActive(false);
                  //   }
                  // });
                }}
              >
                <div className="myStoreSocialMediaTogglerActive"></div>
              </div>
            )}
          </div>
          {facebook && (
            <div className="formInputContainer">
              <input
                ref={facebookInputRef}
                type="text"
                maxLength={100}
                className="formsInput"
                placeholder="FaceBook page here.."
                defaultValue={
                  store?.socialMediaConnection.find(
                    (item) => item.name === "facebook"
                  )?.url
                }
                onChange={(e) => {
                  if (e.target.value.length > 99)
                    setFacebookError("( Only 100 characters are allowed )");
                  else if (e.target.value.length === 0)
                    setTwitterError("( Facebook is required )");
                  else setFacebookError("");

                  setSaveActive(true);
                  handleSocialMediaConnection("facebook", e.target.value);
                }}
              />
            </div>
          )}
          <div className="myStoreSocialMediaContainer">
            <div className="myStoreSocialMediaEach">
              Linkedin
              <span style={{ color: "red", fontSize: "0.733vw" }}>
                {linkedinError}
              </span>
            </div>
            {!linkedin && (
              <div
                className="myStoreSocialMediaToggleButton"
                onClick={() => {
                  setLinkedinError("");
                  socialMediaConnection.current.push({
                    name: "linkedIn",
                    url: "",
                  });
                  setLinkedin(true);
                  setLinkedinError("( Linkedin is required )");
                  // setSaveActive(true);
                  // checkButtonText();
                  socialMediaConnection.current.map((item, key) => {
                    console.log(item, "<<<");
                    if (item.url.trim() == "") {
                      setSaveActive(false);
                    }
                  });
                }}
              >
                <div className="myStoreSocialMediaToggler"></div>
              </div>
            )}
            {linkedin && (
              <div
                className="myStoreSocialMediaToggleButtonActive"
                onClick={() => {
                  setLinkedinError("");
                  socialMediaConnection.current =
                    socialMediaConnection.current.filter(
                      (item) => item.name !== "linkedIn"
                    );
                  setLinkedin(false);
                  setSaveActive(true);
                  // checkButtonText();
                  // socialMediaConnection.current.map((item, key) => {
                  //   console.log(item, "<<<");
                  //   if (item.url.trim() == "") {
                  //     setSaveActive(false);
                  //   }
                  // });
                }}
              >
                <div className="myStoreSocialMediaTogglerActive"></div>
              </div>
            )}
          </div>
          {linkedin && (
            <div className="formInputContainer">
              <input
                ref={linkedinInputRef}
                type="text"
                maxLength={100}
                className="formsInput"
                placeholder="linkedin username here.."
                defaultValue={
                  store?.socialMediaConnection.find(
                    (item) => item.name === "linkedIn"
                  )?.url
                }
                onChange={(e) => {
                  if (e.target.value.length > 99)
                    setLinkedinError("( Only 100 characters are allowed )");
                  else if (e.target.value.length === 0)
                    setTwitterError("( Linkedin is required )");
                  else setLinkedinError("");

                  setSaveActive(true);
                  handleSocialMediaConnection("linkedIn", e.target.value);
                }}
              />
            </div>
          )}
          <div className="myStoreSocialMediaContainer">
            <div className="myStoreSocialMediaEach">
              Discord
              <span style={{ color: "red", fontSize: "0.733vw" }}>
                {discordError}
              </span>
            </div>
            {!discord && (
              <div
                className="myStoreSocialMediaToggleButton"
                onClick={() => {
                  setDiscordError("");
                  socialMediaConnection.current.push({
                    name: "discord",
                    url: "",
                  });
                  setDiscord(true);
                  setDiscordError("( Discord is required )");
                  // setSaveActive(true);
                  // checkButtonText();
                  socialMediaConnection.current.map((item, key) => {
                    console.log(item, "<<<");
                    if (item.url.trim() == "") {
                      setSaveActive(false);
                    }
                  });
                }}
              >
                <div className="myStoreSocialMediaToggler"></div>
              </div>
            )}
            {discord && (
              <div
                className="myStoreSocialMediaToggleButtonActive"
                onClick={() => {
                  setDiscordError("");
                  socialMediaConnection.current =
                    socialMediaConnection.current.filter(
                      (item) => item.name !== "discord"
                    );
                  setDiscord(false);
                  setSaveActive(true);
                  // checkButtonText();
                  // socialMediaConnection.current.map((item, key) => {
                  //   console.log(item, "<<<");
                  //   if (item.url.trim() == "") {
                  //     setSaveActive(false);
                  //   }
                  // });
                }}
              >
                <div className="myStoreSocialMediaTogglerActive"></div>
              </div>
            )}
          </div>
          {discord && (
            <div className="formInputContainer">
              <input
                ref={discordInputRef}
                maxLength={100}
                type="text"
                className="formsInput"
                placeholder="Discord channel here.."
                defaultValue={
                  store?.socialMediaConnection.find(
                    (item) => item.name === "discord"
                  )?.url
                }
                onChange={(e) => {
                  if (e.target.value.length > 99)
                    setDiscordError("( Only 100 characters are allowed )");
                  else if (e.target.value.length === 0)
                    setDiscordError("( Discord is required )");
                  else setDiscordError("");

                  setSaveActive(true);
                  handleSocialMediaConnection("discord", e.target.value);
                }}
              />
            </div>
          )}
          <div className="myStoreSocialMediaContainer">
            <div className="myStoreSocialMediaEach">
              Youtube
              <span style={{ color: "red", fontSize: "0.733vw" }}>
                {youtubeError}
              </span>
            </div>
            {!youtube && (
              <div
                className="myStoreSocialMediaToggleButton"
                onClick={() => {
                  setYoutubeError("");
                  socialMediaConnection.current.push({
                    name: "youtube",
                    url: "",
                  });
                  setYoutube(true);
                  setYoutubeError("( YouTube is required )");
                  // setSaveActive(true);
                  // checkButtonText();
                  socialMediaConnection.current.map((item, key) => {
                    console.log(item, "<<<");
                    if (item.url.trim() == "") {
                      setSaveActive(false);
                    }
                  });
                }}
              >
                <div className="myStoreSocialMediaToggler"></div>
              </div>
            )}
            {youtube && (
              <div
                className="myStoreSocialMediaToggleButtonActive"
                onClick={() => {
                  setYoutubeError("");
                  socialMediaConnection.current =
                    socialMediaConnection.current.filter(
                      (item) => item.name !== "youtube"
                    );
                  setYoutube(false);
                  setSaveActive(true);
                  // checkButtonText();
                  // socialMediaConnection.current.map((item, key) => {
                  //   console.log(item, "<<<");
                  //   if (item.url.trim() == "") {
                  //     setSaveActive(false);
                  //   }
                  // });
                }}
              >
                <div className="myStoreSocialMediaTogglerActive"></div>
              </div>
            )}
          </div>
          {youtube && (
            <div className="formInputContainer">
              <input
                ref={youtubeInputRef}
                type="text"
                maxLength={100}
                className="formsInput"
                placeholder="Youtube channel here.."
                defaultValue={
                  store?.socialMediaConnection.find(
                    (item) => item.name === "youtube"
                  )?.url
                }
                onChange={(e) => {
                  if (e.target.value.length > 99)
                    setYoutubeError("( Only 100 characters are allowed )");
                  else if (e.target.value.length === 0)
                    setYoutubeError("( YouTube is required )");
                  else setYoutubeError("");

                  setSaveActive(true);
                  handleSocialMediaConnection("youtube", e.target.value);
                }}
              />
            </div>
          )}

           <div className="formsaveButtonContainer" onClick={handleSubmit}>
              {(siteUrl.current != "") && (
                <button className="formsaveButton" onClick={()=>window.open(siteUrl.current.split("?")[0])}>Visit store</button>
              )}
              <button className="formsaveButton" disabled={!enabled} style={{opacity: !enabled?"0.55":""}}>Save</button>
            </div>

          {/* {saveActive && (
            <div className="formsaveButtonContainer" onClick={handleSubmit}>
              {(siteUrl.current != "") && (
                <button className="formsaveButton" onClick={()=>window.open(siteUrl.current)}>Visit store</button>
              )}
              <button className="formsaveButton">Save</button>
            </div>
          )}
          {!saveActive && (
            <div className="formsaveButtonContainer">
              {(siteUrl.current != "") && (
                <button className="formsaveButton" onClick={()=>window.open(siteUrl.current)}>Visit store</button>
              )}
              <button className="formsaveButton" style={{ opacity: "0.55" }}>Save</button>
            </div>
          )} */}
        </div>
      </div>

    <Modal
      isOpen={openCropper}
      style={createCategoryCustomStyles}
      ariaHideApp={false}
    >
     <CropEasy {...{ photoURL,setPhotoURL,ratio, setOpenCropper,setFiles,setLogoPresent}} />
    </Modal>


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

      {/* <Modal.Dialog style={{ display: `${cropModelStatus ? 'block' : 'none'}` }}>
        <Modal.Header>
          <Modal.Title className="text-center">Crop Image</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ReactCrop
            locked="true"
            crop={crop}
            onChange={(e) => handleCrop(e)}
            onComplete={(e) => handleComplete(e)}
          >
            {
              files.map((file) => (
                <div key={file.name} className="previewImageDragandDrop">
                  <img src={file.preview} alt="preview" style={{ borderRadius: "12px" }} />
                </div>
              ))
            }
          </ReactCrop>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="default" onClick={() => setCropModelStatus(false)}>Close</Button>
          <Button variant="primary">Crop</Button>
        </Modal.Footer>
      </Modal.Dialog> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    store: state.store.store,
    walletAddress: state.store.walletAddress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (data) => dispatch(updateStore(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSetting);
