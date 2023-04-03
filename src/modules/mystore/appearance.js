import React, { useRef, useState, useEffect } from "react";
import "./styles/myStore.css";
import "./styles/apperance.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BsChevronDown, BsCheck2 } from "react-icons/bs";
import AssetProfilePic from "../../assets/profile3.jpeg";
import { useDropzone } from "react-dropzone";
import { BiUpload } from "react-icons/bi";
import Modal from "react-modal";
import AddFeaturedAssestsModal from "./addFeaturedAssestModal";
import { connect } from "react-redux";
import { httpConstants } from "../../constants";
import { updateAppearanceSettings } from "../../services";
import { updateStore } from "../../actions/storeActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defaultAssetImage } from "../../utility";
import { useDispatch } from "react-redux";
import CropEasy from "../../common/components/cropEasy";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { useDropzone } from "react-dropzone";
// import { BiUpload } from "react-icons/bi";nk

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if(domNode.current!==undefined){
        if (!domNode.current.contains(event.target)) {
          handler();
        }
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  },[]);

  return domNode;
};

const Appearance = ({ store, updateStore }) => {
  const dispatch = useDispatch();

  const [countRender, setCountRender] = useState(0);

  let domNode = useClickOutside(() => {
    setCanUploadDropDown(false);
  });

  const navigate = useNavigate();
  let [openCropper,setOpenCropper]=useState(false);
  let [croppedFile,setCroppedFile]=useState({})
  let [photoURL,setPhotoURL]=useState(store?.appearance?.coverImageUrl !== ""
  ?store?.appearance?.coverImageUrl
  : "");

  const [addFeaturedAssests, setAddFeaturedAssests] = useState(false);
  const [featuredAssetsData, setFeaturedAssetsData] = useState(
    store?.appearance?.featuredAssets ? store?.appearance?.featuredAssets : []
  );
  // const [button1, setButton1] = useState({
  //   title: 'Explore',
  //   isNewTab: store?.appearance?.buttons.find(item => item.title === 'Explore')
  //     .isNewTab,
  //   style: 'Solid',
  // });
  const [button1, setButton1] = useState({
    id: 1,
    title: "Explore",
    isNewTab: store?.appearance?.buttons.find(
      (item) => item.title === "Explore"
    )
      ? store?.appearance?.buttons.find((item) => item.title === "Explore")
        .isNewTab
      : false,
    style: store?.appearance?.buttons.find((item) => item.title === "Explore")
      ? store?.appearance?.buttons.find((item) => item.title === "Explore")
        .style
      : "Solid",
    link: '/nfts',  
    status: store?.appearance?.buttons.length > 0 ? store?.appearance?.buttons[0].status : "true"
  });
  // const [button2, setbutton2] = useState({
  //   title: 'Create',
  //   isNewTab: store?.appearance?.buttons.find(item => item.title === 'Create')
  //     .isNewTab,
  //   style: 'Solid',
  // });
  const [button2, setbutton2] = useState({
    id: 2,
    title: "Create",
    isNewTab: store?.appearance?.buttons.find((item) => item.title === "Create")
      ? store?.appearance?.buttons.find((item) => item.title === "Create")
        .isNewTab
      : false,
    style: store?.appearance?.buttons.find((item) => item.title === "Create")
      ? store?.appearance?.buttons.find((item) => item.title === "Create").style
      : "Solid",
    link: '/create-nft',
    status: store?.appearance?.buttons.length > 1 ? store?.appearance?.buttons[1].status : "true"
  });

  const description = useRef(store?.appearance?.description);
  const heading = useRef(store?.appearance?.heading);
  const colorPalette = useRef(store?.appearance?.colorPalette);
  const coverImageUrl = useRef(store?.appearance?.coverImageUrl);
  const [isSaveClicked, setisSaveClicked] = useState(false);

  const [saveActive, setSaveActive] = useState(false);

  const [canUploadNft, setCanUploadNft] = useState("Solid");
  const [canUploadDropDown, setCanUploadDropDown] = useState(false);
  const handleDropDown = () => {
    setCanUploadDropDown(!canUploadDropDown);
  };
  const handleWhoCanUploadNft = (name) => {
    setButton1({ ...button1, style: name });
    setSaveActive(true);
    // setCanUploadNft(name);
    setCanUploadDropDown(false);
  };

  const [canUploadNft2, setCanUploadNft2] = useState("Solid");
  const [canUploadDropDown2, setCanUploadDropDown2] = useState(false);
  const handleDropDown2 = () => {
    setCanUploadDropDown2(!canUploadDropDown2);
  };
  const handleWhoCanUploadNft2 = (name) => {
    setbutton2({ ...button2, style: name });
    setSaveActive(true);
    // setCanUploadNft2(name);
    setCanUploadDropDown2(false);
  };

  const handleFeaturedAssetRemove = (_id) => {
    const newData = featuredAssetsData.filter((item) => item.contentId != _id);
    setFeaturedAssetsData(newData);
    setSaveActive(true);

    dispatch({ type: 'UPATE_APPEARANCE_FEATURE_ASSETS', payload: newData })
  };

  const [coverImageStyle, setCoverImageStyle] = useState(
    store?.appearance?.coverPosition !== "" ? store.appearance.coverPosition : 'center'
  );

  const [files, setFiles] = useState(
    store?.appearance?.coverImageUrl !== ""
      ? [
        {
          name: store?.appearance?.coverImageUrl,
          preview: store?.appearance?.coverImageUrl,
        },
      ]
      : []
  );
  const [bannerPresent, setBannerPresent] = useState(
    store?.appearance?.coverImageUrl !== "" ? true : false
  );
  const [ratio,setRatio]=useState(3/1);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
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
      setBannerPresent(true);
      setOpenCropper(true);
      setSaveActive(true);
    },
    onDropRejected: (error) => {
      toast.error("File type not acceptable. Please use JPG, JPEG, PNG file");
      setBannerPresent(false);
    },
  });

  // const images = files.map((file) => (
  //   <div key={file.name} className="appreancePreview">
  //     <img src={file.preview} alt="preview" style={{ borderRadius: "12px" }} />
  //   </div>
  // ));

  const handleUploadAgain = () => {
    coverImageUrl.current = "";
    setFiles([]);
    setBannerPresent(false);
    setSaveActive(false);

    dispatch({ type: 'UPATE_APPEARANCE_COVER_IMAGE', payload: '' })
  };

  const handleSubmit = async () => {
    setisSaveClicked(true);
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
    if (result.success) coverImageUrl.current = result.responseData;

    const data = {
      colorPalette: colorPalette.current,
      coverImageUrl: coverImageUrl.current,
      heading: heading.current,
      description: description.current,
      buttons: [button1, button2],
      featuredAssets: featuredAssetsData,
      coverPosition: coverImageStyle
    };

    const result2 = await updateAppearanceSettings(
      store._id,
      data,
      store.token
    );
    // console.log(result2, "<<< updateAppearance res");
    if (result2.success) {
      updateStore({ store: result2.responseData });
      toast.success("Updated Appearance");
      // navigate('/store-preview', {
      //   state: { appearanceSettings: result2.appearance },
      // });
    } else {
      result2.errors.map((item) => toast.error(item.message));
    }

    // if (result2) {
    //   updateStore({ store: result2 });
    //   navigate('/store-preview', {
    //     state: { appearanceSettings: result2.appearance },
    //   });
    // }
    setSaveActive(false);
    setisSaveClicked(false);
  };

  // const AddFeaturedAssestsCustomStyles = {
  //   content: {
  //     width: '35%',
  //     height: 'auto',
  //     marginTop: '2%',
  //     marginLeft: '32.5%',
  //     marginRight: '32.5%',
  //     backgroundColor: '#FFFFFF',
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'flex-start',
  //     justifyContent: 'flex-start',
  //   },
  // };

  // const [createAssests, setCreateAssests] = useState(false);

  // const CreateCustomStyles = {
  //   content: {
  //     width: '35%',
  //     height: 'auto',
  //     marginTop: '2%',
  //     marginLeft: '32.5%',
  //     marginRight: '32.5%',
  //     backgroundColor: '#FFFFFF',
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'flex-start',
  //     justifyContent: 'flex-start',
  //   },
  // };

  // const handleCreateAssests = () => {
  //   setAddFeaturedAssests(false);
  //   setCreateAssests(true);
  // };
  // const handleCreateAssests2 = () => {
  //   setAddFeaturedAssests(true);
  //   setCreateAssests(false);
  // };

  // const [firstAssetValue, setFirstAssetValue] = useState("");

  const [selectedColourPalete, setSelectedColourPalete] = useState(
    store?.appearance?.colorPalette !== "" ? store.appearance.colorPalette : ""
  );

  //  ------------------------------------------ text area validation
  const [textareaValue, setTextareaValue] = useState(
    store?.appearance?.description
  );

  let lenght = 0;
  lenght = textareaValue ? textareaValue.length : 0;

  //  ------------------------------------------ text area validation
  const [textareaValue2, setTextareaValue2] = useState(
    store?.appearance?.heading
  );

  let lenght2 = 0;
  lenght2 = textareaValue2 ? textareaValue2.length : 0;
  const checkSaveActive = (value) => {
    value.trim() == "" || value.trim() == null
      ? setSaveActive(false)
      : setSaveActive(true);
  };

  const handleColorPalette = (value) => {
    setSaveActive(true);
    colorPalette.current = value;
    setSelectedColourPalete(value);

    dispatch({ type: "UPDATE_COLOR_PALETTE", payload: value });
  };

  const handleButtonTitle = (value, type = "1") => {
    if (type === "1") setButton1({ ...button1, title: value });
    else setbutton2({ ...button2, title: value });
  };

  const handleButtonLink= (value, type = "1") => {
    if (type === "1") setButton1({ ...button1, link: value });
    else setbutton2({ ...button2, link: value });
  };

  const handleRedirectPreview = () => {
    dispatch({ type: "UPATE_APPEARANCE_DESCRIPTION", payload: textareaValue });
    dispatch({ type: "UPATE_APPEARANCE_HEADING", payload: textareaValue2 });

    dispatch({ type: 'UPATE_APPEARANCE_DESCRIPTION', payload: textareaValue })
    dispatch({ type: 'UPATE_APPEARANCE_HEADING', payload: textareaValue2 })

    dispatch({ type: 'UPATE_APPEARANCE_BUTTON', payload: [{ ...button1 }, { ...button2 }] })
    dispatch({ type: 'UPATE_APPEARANCE_FEATURE_ASSETS', payload: featuredAssetsData })
    dispatch({ type: 'UPATE_APPEARANCE_COVER_POSITION', payload: coverImageStyle })

    if (files.length > 0) dispatch({ type: 'UPATE_APPEARANCE_COVER_IMAGE', payload: files[0].preview })

    navigate('/store-preview', { state: { appearanceSettings: store?.appearance } })
  }


  // useEffect(() => {
  //   if (coverImageUrl.current !== '') {
  //     if (coverImageUrl.current.includes('blob')) {
  //       let xhr = new XMLHttpRequest();
  //       xhr.onreadystatechange = function () {
  //         if (this.readyState == 4) {
  //           if (this.status == 200 || (this.response && this.response.type && this.response.type == "image/jpeg")) {
  //             console.log('valid URL')
  //           }
  //           else {
  //             console.log('handle remove')
  //             handleUploadAgain();
  //           }
  //         }
  //       }
  //       xhr.open('GET', coverImageUrl.current);
  //       xhr.responseType = 'blob';
  //       xhr.send();
  //     }
  //   }
  // }, [])


  useEffect(()=>{

    console.log('called', store.appearance)

    setButton1({
      ...button1,
      link: store?.appearance?.buttons.length > 0 ? store?.appearance?.buttons[0].link : '/nft',
      status: store?.appearance?.buttons.length > 0 ? store?.appearance?.buttons[0].status : "true"
    })

    setbutton2({
      ...button2,
      link: store?.appearance?.buttons.length > 1 ? store?.appearance?.buttons[1].link : '/create-nft',
      status: store?.appearance?.buttons.length > 1 ? store?.appearance?.buttons[1].status : "true"
    })

  },[JSON.stringify(store)])
  
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

  return (
      <>
      <div className="myStoreFormContainer">
        <div className="appearanceFormOuter newappearanceFormOuter">
          <div className="appearanceForm newappearanceForm">
            <div className="myStoreHeading1">Appearance</div>
            <div className="appearanceHeading2Container">
              <div className="appearanceHeading2">Color Palette</div>
              {/* {store?.appearance?.coverImageUrl === "" ? ( */}
              <a
                onClick={() => handleRedirectPreview()}
                className="appearancePreviewButton"
                style={{ textDecoration: "none", cursor: 'pointer' }}
              >
                Preview
              </a>
              {/* ) : ( */}
              {/* <div
                className="appearancePreviewButton"
                style={{ opacity: "0.55" }}
                onClick={() =>
                  toast.info("Please Update Appearance Settings.", {
                    toastId: "ahdbsh",
                    autoClose: 1000,
                  })
                }
              >
                Preview
              </div> */}
              {/* <Link
                to="/store-preview"
                state={{ appearanceSettings: store?.appearance }}
                className="appearancePreviewButton"
                style={{ textDecoration: "none" }}
              >
                Preview
              </Link> */}
              {/* )} */}
            </div>
            <div className="colorPaletteContainer">
              <div
                // className="colorPaletteEach colorPalette1"
                className={`colorPaletteEach ${selectedColourPalete === 1 && "colorPaletteEachActive"
                  }`}
                onClick={() => handleColorPalette(1)}
              >
                <div className="palette-color colorPalette1" ></div>
               <label className="color-palette-text"> Color Palette 1 </label> 
              </div>
              <div
                // className="colorPaletteEach colorPalette2"
                className={`colorPaletteEach ${selectedColourPalete === 2 && "colorPaletteEachActive"
                  }`}
                onClick={() => handleColorPalette(2)}
              >
                <div className="palette-color colorPalette2" ></div>
                <label className="color-palette-text"> Color Palette 2 </label> 
              </div>
              <div
                // className="colorPaletteEach colorPalette3"
                className={`colorPaletteEach ${selectedColourPalete === 3 && "colorPaletteEachActive"
                  }`}
                onClick={() => handleColorPalette(3)}
              >
                <div className="palette-color colorPalette3" ></div>
                <label className="color-palette-text"> Color Palette 3 </label> 
              </div>
              <div
                // className="colorPaletteEach colorPalette4"
                className={`colorPaletteEach ${selectedColourPalete === 4 && "colorPaletteEachActive"
                  }`}
                onClick={() => handleColorPalette(4)}
              >
                <div className="palette-color colorPalette4" ></div>
                <label className="color-palette-text"> Color Palette 4 </label> 
              </div>
              <div
                // className="colorPaletteEach colorPalette5"
                className={`colorPaletteEach ${selectedColourPalete === 5 && "colorPaletteEachActive"
                  }`}
                onClick={() => handleColorPalette(5)}
              >
                <div className="palette-color colorPalette5" ></div>
                <label className="color-palette-text"> Color Palette 5 </label> 
              </div>
              <div
                // className="colorPaletteEach colorPalette6"
                className={`colorPaletteEach ${selectedColourPalete === 6 && "colorPaletteEachActive"
                  }`}
                onClick={() => handleColorPalette(6)}
              >
                <div className="palette-color colorPalette6" ></div>
                <label className="color-palette-text"> Color Palette 6 </label> 
              </div>
            </div>
            {/* <div className="colorPaletteContainer">
            
            </div> */}
            <div className="myStoreHeading2"> Header Section</div>
            <div className="myStoreHeading3 BannerImage"> Banner Image* 
            {bannerPresent && (<button className="removeBanner"   onClick={handleUploadAgain}> Remove Banner</button>)}
            
            </div>
            {!bannerPresent && (
              <div className="appearanceDragandDrop" {...getRootProps()}>
                <input {...getInputProps()} />
                <FaCloudUploadAlt className="draganddropboxIcon" />
                <span className="draganddropboxinnerdivtextspan">
                  Drag and Drop or
                  <span className="draganddropboxinnerdivtextspanbrowse">
                    {" "}
                    Browse
                  </span>
                </span>
              </div>
            )}
            {bannerPresent && (
              <div style={{ backgroundImage: `url(${photoURL})`,
                backgroundPosition: `${coverImageStyle}`,backgroundSize:"cover"
                }} className="appearanceDragandDrop appearanceDragandDropPreview ">
                {/* {images} */}
              </div>
            )}

            <div className="formsecondarytext">
              Upload banner in .png, .jpg or .jpeg format of size 1920X700px
            </div>
            {bannerPresent && (
              <div
                className="draganddropboxUploadAgain"
                {...getRootProps()}
         
              >
                 <input {...getInputProps()} />
                <BiUpload className="draganddropboxUploadAgainIcon" />
                <div>Upload Again</div>
              </div>
              
            )}

            {/* {
              files.length > 0 ?
                <>
                  <div className="myStoreHeading3"> Align Background</div>
                  <div className="formInputContainer">
                    <select onChange={(e) => setCoverImageStyle(e.target.value)} className="formsInput">
                      <option selected={coverImageStyle === 'top' ? true : false} value="top">Top</option>
                      <option selected={coverImageStyle === 'bottom' ? true : false} value="bottom">Bottom</option>
                      <option selected={coverImageStyle === 'center' ? true : false} value="center">Center</option>
                      <option selected={coverImageStyle === 'left' ? true : false} value="left">Left</option>
                      <option selected={coverImageStyle === 'inherit' ? true : false} value="inherit">Inherit</option>
                    </select>
                  </div>
                </>
                : null
            } */}

            <div className="myStoreHeading3"> Heading*</div>
            <div className="formInputContainer">
              <input
                type="text"
                className="formsInput"
                onChange={(e) => {
                  // checkSaveActive(e.target);
                  const { value } = e.target;
                  value.trim() == "" || value.trim() == null
                    ? setSaveActive(false)
                    : setSaveActive(true);
                  // setSaveActive(true);
                  heading.current = e.target.value;
                  setTextareaValue2(e.target.value);
                }}
                defaultValue={store?.appearance?.heading}
                placeholder="Write header text here"
                value={textareaValue2}
                maxlength="50"
              />
            </div>
            <div className="wordsUsedinModal">
              {lenght2} of 50 characters used.
            </div>
            <div className="myStoreHeading3"> Description* </div>
            <div className="formInputContainer">
              <input
                type="text"
                className="formsInput"
                onChange={(e) => {
                  const { value } = e.target;
                  value.trim() == "" || value.trim() == null
                    ? setSaveActive(false)
                    : setSaveActive(true);
                  // setSaveActive(true);
                  description.current = e.target.value;
                  setTextareaValue(e.target.value);
                }}
                defaultValue={store?.appearance?.description}
                placeholder="Describe about your marketplace"
                value={textareaValue}
                maxlength="1000"
              />
            </div>
            <div className="wordsUsedinModal">
              {lenght} of 1000 characters used.
            </div>
            <div className="myStoreHeading2"> Buttons</div>
            <div className="appearanceButtonContainer">
              <div className="appearanceButton1">
                <div className="myStoreHeading3">Buttons</div>
                <div
                  className="formInputContainer appearanceDiv"
                  style={{ opacity: 0.6 }}
                >
                  1
                </div>
              </div>
              <div className="appearanceButton2">
                <div className="myStoreHeading3">Title</div>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  className="formInputContainer appearanceDiv"
                  defaultValue="Explore"
                  onChange={(e) => handleButtonTitle(e.target.value, "1")}
                />
                {/* <div
                  className="formInputContainer appearanceDiv"
                  style={{ opacity: 0.6 }}
                >
                  Explore
                </div> */}
              </div>
              <div className="appearanceButton3">
                <div className="myStoreHeading3">New Tab</div>
                {!button1.isNewTab && (
                  <div
                    onClick={() => {
                      setButton1({ ...button1, isNewTab: true });
                      setSaveActive(true);
                    }}
                    className="selectBoxContainer selectBoxContainerApperance"
                  ></div>
                )}
                {button1.isNewTab && (
                  <div
                    className="selectBoxContainerActive selectBoxContainerApperance"
                    onClick={() => {
                      setButton1({ ...button1, isNewTab: false });
                      setSaveActive(true);
                    }}
                  >
                    <BsCheck2 className="selectBoxContainerActiveIcon" />
                  </div>
                )}
              </div>
              <div className="appearanceButton4 ">
                <div className="myStoreHeading3">Style</div>
                <div
                  style={{ cursor: "pointer", width: '100px' }}
                  onClick={() => setCanUploadDropDown(!canUploadDropDown)}
                  className="apperanceSelectBox"
                >
                  {/* <div>{canUploadNft}</div> */}
                  <div>{button1.style}</div>
                  <div>
                    <BsChevronDown />
                  </div>

                  <div className="dropdownoptions">
                    {canUploadDropDown && (
                      <div className="canUploadDropdown">
                        <div
                          className="canUploadDropdownEach"
                          onClick={() => handleWhoCanUploadNft("Solid")}
                        >
                          Solid
                        </div>
                        <div
                          className="canUploadDropdownEach"
                          onClick={() => handleWhoCanUploadNft("Outline")}
                        >
                          Outline
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Link & Status */}
              <div className="appearanceButton4 checkButton" title="Add URl after '/' ex- /nft">
                <div className="myStoreHeading3">Link</div>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  className="formInputContainer appearanceDiv"
                  value={`${button1.link}`}
                  onChange={(e) => handleButtonLink(e.target.value, "1")}
                />
              </div>
              <div className="appearanceButton4">
                <div className="myStoreHeading3">{button1.status == 'false' ? 'OFF' : 'ON'}</div>
                {button1.status == "false" ? (
                  <div
                    onClick={() => {
                      setButton1({ ...button1, status: "true" });
                      setSaveActive(true);
                    }}
                    className="selectBoxContainer selectBoxContainerApperance"
                  ></div>
                ): (
                  <div
                    className="selectBoxContainerActive selectBoxContainerApperance"
                    onClick={() => {
                      setButton1({ ...button1, status: "false" });
                      setSaveActive(true);
                    }}
                  >
                    <BsCheck2 className="selectBoxContainerActiveIcon" />
                  </div>
                )}
              </div>
              {/* Link & Status End */}

            </div>
            <div className="appearanceButtonContainer">
              <div className="appearanceButton1">
                <div className="myStoreHeading3">Buttons</div>
                <div
                  className="formInputContainer appearanceDiv"
                  style={{ opacity: 0.6 }}
                >
                  2
                </div>
              </div>
              <div className="appearanceButton2">
                <div className="myStoreHeading3">Title</div>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  className="formInputContainer appearanceDiv"
                  defaultValue="Create"
                  onChange={(e) => handleButtonTitle(e.target.value, "2")}
                />
                {/* <div
                  className="formInputContainer appearanceDiv"
                  style={{ opacity: 0.6 }}
                >
                  Create
                </div> */}
              </div>
              <div className="appearanceButton3">
                <div className="myStoreHeading3">New Tab</div>
                {!button2.isNewTab && (
                  <div
                    onClick={() => {
                      setSaveActive(true);
                      setbutton2({ ...button2, isNewTab: true });
                    }}
                    className="selectBoxContainer selectBoxContainerApperance"
                  ></div>
                )}
                {button2.isNewTab && (
                  <div
                    className="selectBoxContainerActive selectBoxContainerApperance"
                    onClick={() => {
                      setSaveActive(true);
                      setbutton2({ ...button2, isNewTab: false });
                    }}
                  >
                    <BsCheck2 className="selectBoxContainerActiveIcon" />
                  </div>
                )}
              </div>
              <div className="appearanceButton4">
                <div className="myStoreHeading3">Style</div>
                <div
                  style={{ cursor: "pointer", width: '100px' }}
                  className="apperanceSelectBox"
                  onClick={() => setCanUploadDropDown2(!canUploadDropDown2)}
                >
                  {/* <div>{canUploadNft2}</div> */}
                  <div>{button2.style}</div>
                  <div>
                    <BsChevronDown />
                  </div>
                  <div className="dropdownoptions">
                    {canUploadDropDown2 && (
                      <div className="canUploadDropdown">
                        <div
                          className="canUploadDropdownEach"
                          onClick={() => handleWhoCanUploadNft2("Solid")}
                        >
                          Solid
                        </div>
                        <div
                          className="canUploadDropdownEach"
                          onClick={() => handleWhoCanUploadNft2("Outline")}
                        >
                          Outline
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="appearanceButton4 checkButton" title="Add URl after '/' ex- /create-nft">
                <div className="myStoreHeading3">Link</div>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  className="formInputContainer appearanceDiv"
                  value={button2.link}
                  onChange={(e) => handleButtonLink(e.target.value, "2")}
                />
              </div>
              <div className="appearanceButton4">
                <div className="myStoreHeading3">{button2.status == 'false' ? 'OFF' : 'ON'}</div>
                {button2.status == "false" ? (
                  <div
                    onClick={() => {
                      setbutton2({ ...button2, status: "true" });
                      setSaveActive(true);
                    }}
                    className="selectBoxContainer selectBoxContainerApperance"
                  ></div>
                ): (
                  <div
                    className="selectBoxContainerActive selectBoxContainerApperance"
                    onClick={() => {
                      setbutton2({ ...button2, status: "false" });
                      setSaveActive(true);
                    }}
                  >
                    <BsCheck2 className="selectBoxContainerActiveIcon" />
                  </div>
                )}
              </div>

            </div>      
            <div className="appearanceForm2 newappearanceForm2">
            <div className="myStoreHeading2"> Featured Assets</div>
            <div className="myStoreHeading3">Assests</div>
            <div className="addFeaturedAssetContainer">
              <div className="myStoreHeading3">Currently Featured Assets</div>
              <button
                className="assetsAddButton appearanceSaveButton"
                onClick={() => setAddFeaturedAssests(true)}
              >
                Add
              </button>
            </div>
            <div className="assetsListContainer">
              <div className="assetsListHeaderContainer">
                <div className="assetsListSerialnoColumn">
                  <div className="myStoreHeading3">#</div>
                </div>
                <div className="assetsListNameColumn">
                  <div className="myStoreHeading3">Name</div>
                </div>
                <div className="assetsListLinkColumn">
                  <div className="myStoreHeading3">Link</div>
                </div>
              </div>

              {featuredAssetsData?.map((item, index) => (
                <div className="assetsListEachContainer" key={item?._id}>
                  <div className="assetsListSerialnoColumn">
                    <div className="myStoreHeading3 myStoreHeading3AppearanceList">
                      {index + 1}
                    </div>
                  </div>
                  <div className="assetsListNameColumn">
                    <div className="myStoreHeading3 myStoreHeading3AppearanceList">
                      <img
                        src={
                          item?.link === "" || !item?.link
                            ? defaultAssetImage
                            : item?.link
                        }
                        alt=""
                      />
                      {item?.name}
                    </div>
                  </div>
                  <div className="assetsListLinkColumn">
                    <a
                      href={`https://www.nftinger.com/nft-information/${item?.contentId}`}
                      target="_blank"
                      className="myStoreHeading3 myStoreHeading3AppearanceList myStoreHeading3AppearanceListLink"
                      style={{ textDecoration: "none" }}
                    >
                      View NFT
                    </a>
                    <div
                      className="myStoreHeading3 myStoreHeading3AppearanceList myStoreHeading3AppearanceListRemove"
                      onClick={() => handleFeaturedAssetRemove(item?.contentId)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              ))}

              {
                featuredAssetsData.length === 0 ?
                  <p style={{ fontSize: '12px' }} className="no-record-found">No records found!</p>
                  : null
              }
            </div>
            {saveActive && !isSaveClicked && (
              <div className="formsaveButtonContainer" onClick={handleSubmit}>
                <button className="formsaveButton">Save</button>
              </div>
            )}
            {!saveActive && (
              <div
                className="formsaveButtonContainer"
                style={{ opacity: "0.55" }}
              >
                <button className="formsaveButton">Save</button>
              </div>
            )}
          </div>    

          </div>
         
        </div>
        
      <Modal
      isOpen={openCropper}
      style={createCategoryCustomStyles}
      ariaHideApp={false}
    >
     <CropEasy {...{ photoURL,setPhotoURL,ratio, setOpenCropper,setFiles,setBannerPresent}} />
    </Modal>
        {/* <Modal isOpen={addFeaturedAssests} style={AddFeaturedAssestsCustomStyles}>
        <div className='addFeaturedAssestsContainer'>
          <div className='confirmationModalHeading'>Add Featureed Assests</div>
          <div
            className=' confirmationModalHeading confirmationModalCross'
            onClick={() => setAddFeaturedAssests(false)}
          >
            X
          </div>
        </div>
        <div className='confirmationModalText addAssetstext'>
          You can select or create assets so that they can get featured on the
          home page
        </div>
        <div className='addFeatureAssestsHeading2Container'>
          <div className='addFeatureAssestsHeading2'>Assests</div>
          <div
            className='addFeatureAssestsHeading2 addFeatureAssestsHeading2ColorPrimary'
            onClick={() => handleCreateAssests()}
          >
            Create
          </div>
        </div>
        <div className='addCategoryInputContainer'>
          <div className='formInputContainer formInputContainerAddCategory'>
            <input
              type='text'
              className='formsInput'
              placeholder='Add Assests Here'
            />
          </div>
          <div className='addAnotherCategory'>+</div>
        </div>
        <div className='addCategoryButtonContainer'>
          <div className='formsaveButton addCategoryButton'>Done</div>
        </div>
      </Modal> */}
        {/* <Modal isOpen={createAssests} style={CreateCustomStyles}>
        <div className='addFeaturedAssestsContainer'>
          <div className='confirmationModalHeading'>Add Item</div>
          <div
            className=' confirmationModalHeading confirmationModalCross'
            onClick={() => handleCreateAssests2()}
          >
            X
          </div>
        </div>
        <div className='myStoreHeading3'> Upload logo</div>
      </Modal> */}
        <AddFeaturedAssestsModal
          addFeaturedAssests={addFeaturedAssests}
          setAddFeaturedAssests={setAddFeaturedAssests}
          featuredAssetsData={featuredAssetsData}
          setFeaturedAssetsData={setFeaturedAssetsData}
          setSaveActive={setSaveActive}
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
    store: state.store.store,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (data) => dispatch(updateStore(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appearance);

// get active color pallete
