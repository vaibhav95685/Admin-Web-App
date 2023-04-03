import React, { useEffect, useRef, useState } from "react";
import "./styles/myStore.css";
import "./styles/advancedSetting.css";
import { NavLink, useNavigate } from "react-router-dom";
import { BsChevronDown, BsCheck2,BsChevronUp } from "react-icons/bs";
import EthereumIcon from "../../assets/icons/ethereum.png";
import PolygonIcon from "../../assets/icons/polygon.png";
import BinanceIcon from "../../assets/icons/binance.png";
import { BiArrowBack } from "react-icons/bi";
import { Editor } from "react-draft-wysiwyg";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";
import { updateStore } from "../../actions/storeActions";
import {
  getAdvSettingCategories,
  putStoreAdvanceSettings,
  saveStorePP,
  saveStoreTC,
} from "../../services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidURL } from "../../utility";
import draftToHtml from "draftjs-to-html";
import CreateCategoryModal from "./createCategoryModal";
import BlockchainCard from "./BlockchainCard";
import { httpConstants } from "../../constants";


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
  });

  return domNode;
};

const getTanentUserId = () => {
  return `?id=${localStorage.getItem('tenantUserId')}`
}

const AdvancedSetting = ({ store, updateStore }) => {
  const navigate = useNavigate();

  const [blockchainCategory, setBlockchainCategory] = useState([]);
  const [saveActive, setSaveActive] = useState(false);
  const [canUploadNft, setCanUploadNft] = useState("Everyone");
  const [canUploadDropDown, setCanUploadDropDown] = useState(false);
  const [advanceSettingsCategories, setAdvanceSettingsCategories] = useState(
    []
  );
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSaveClicked, setisSaveClicked] = useState(false);
  const [createCategoryActive, setCreateCategoryActive] = useState(false);

  // const [art, setArt] = useState(false);
  // const [tradingCard, setTradingCard] = useState(false);
  // const [utility, setUtility] = useState(false);
  // const [celebs, setCelebs] = useState(false);
  // const [music, setMusic] = useState(false);
  // const [sports, setSports] = useState(false);
  // const [photography, setPhotography] = useState(false);
  // const [trading, setTrading] = useState(false);
  const [ethereum, setEthereum] = useState(false);
  const [binance, setBinance] = useState(false);
  const [polygon, setPolygon] = useState(false);

  const blockchains = useRef(
    store?.blockchains.length !== 0 ? store?.blockchains : []
  );
  const categories = useRef(
    store?.categories.length !== 0 ? store?.categories : []
  );
  const siteUrl = useRef(store?.siteUrl !== "" ? store?.siteUrl : "");

  const fetchCategories = async () => {
    const response = await getAdvSettingCategories(store.token);
    if (response.success) {
      const selectedCategoriesRes = response.responseData.map((item) => ({
        _id: item._id,
        name: item.name,
        isActive: store.categories.find((item2) => item2 === item._id)
          ? true
          : false,
      }));
      setSelectedCategories(selectedCategoriesRes);
      setAdvanceSettingsCategories(response.responseData);
    } else toast.info("Internal server error.");
  }

  useEffect(async () => {
    store?.blockchains.map((item) => {
      if (item === "Ethereum") setEthereum(true);
      if (item === "Binance") setBinance(true);
      if (item === "Polygon") setPolygon(true);
    });
    // store?.categories.map(item => {
    //   if (item === 'Art') setArt(true);
    //   if (item === 'TradingCard') setTradingCard(true);
    //   if (item === 'Utility') setUtility(true);
    //   if (item === 'Celebrities') setCelebs(true);
    //   if (item === 'Music') setMusic(true);
    //   if (item === 'Sports') setSports(true);
    //   if (item === 'Photography') setPhotography(true);
    //   if (item === 'Trading') setTrading(true);
    // });
    setCanUploadNft(store?.permissionToUploadNft);

    fetchCategories()
  }, []);
  // console.log({ advanceSettingsCategories });
  // console.log(categories.current);
  // console.log(selectedCategories);

  const handleCategoryActive = (data) => {
    const newSelectedCategory = selectedCategories.map((item) => {
      if (item.name === data.name) return { ...data, isActive: true };
      else return item;
    });
    setSelectedCategories(newSelectedCategory);
  };
  const handleCategoryInactive = (data) => {
    const newSelectedCategory = selectedCategories.map((item) => {
      if (item.name === data.name) return { ...data, isActive: false };
      else return item;
    });
    setSelectedCategories(newSelectedCategory);
  };

  const handleDropDown = () => {
    setCanUploadDropDown(!canUploadDropDown);
    // if (canUploadDropDown === true) {
    //   setCanUploadDropDown(false);
    // } else {
    //   setCanUploadDropDown(true);
    // }
  };
  const handleWhoCanUploadNft = () => {
    setCanUploadNft("Everyone");
    setCanUploadDropDown(false);
    setSaveActive(true);
  };
  const handleWhoCanUploadNft2 = () => {
    setCanUploadNft("Only me");
    setCanUploadDropDown(false);
    setSaveActive(true);
  };

  const handleBlockchainsPush = (name) => {
    blockchains.current.push(name);
    setSaveActive(true);
  };

  const handleBlockchainsPull = (name) => {
    blockchains.current = blockchains.current.filter((item) => item !== name);
    setSaveActive(true);
  };

  const handleCategoriesPush = (id) => {
    categories.current.push(id);
    setSaveActive(true);
  };

  const handleCategoriesPull = (id) => {
    categories.current = categories.current.filter((item) => item !== id);
    setSaveActive(true);
  };

  const handleSubmit = async () => {
    setisSaveClicked(true);
    // validation
    if (siteUrl.current !== "" && !isValidURL(siteUrl.current)) {
      setSaveActive(false);
      toast.info("Given url is not valid.");
      setisSaveClicked(false);
      return;
    }

    const data = {
      siteUrl: siteUrl.current,
      blockchains: blockchains.current,
      // categories: ["62332433037158002a993ae6"],
      categories: categories.current,
      permissionToUploadNft: canUploadNft,
    };
    const response = await putStoreAdvanceSettings(
      store._id,
      data,
      store.token
    );
    // console.log(response);
    if (response.success) {
      console.log(response, "<<< store adv settings res");
      updateStore({ store: response.responseData });
      setSaveActive(false);
      toast.info("Advance Settings Updated.");
      setTimeout(() => {
        navigate("/my-store/appearance");
      }, 1000);
      setisSaveClicked(false);
    } else {
      console.log(response);
      response.errors.map((item) => toast.info(item.message));
      setSaveActive(false);
      setisSaveClicked(false);
    }
  };

  const [editPrivacyPolicy, setEditPrivacyPolicy] = useState(false);
  const [termsAndCondi, setTermsAndCondi] = useState(false);
  const [saveActivePP, setSaveActivePP] = useState(false);
  const [saveActiveTC, setSaveActiveTC] = useState(false);

  const [editorStatePP, setEditorStatePP] = useState(EditorState.createEmpty());
  const [editorStateTC, setEditorStateTC] = useState(EditorState.createEmpty());
  const [privacyPolicy, setPrivacyPolicy] = useState({
    title: store?.privacyPolicy?.title
      ? store?.privacyPolicy?.title
      : "Privacy Policy",
    descriptions: store?.privacyPolicy?.descriptions
      ? store?.privacyPolicy?.descriptions
      : "",
  });
  const [termsAndConditions, setTermsAndConditions] = useState({
    title: store?.termsAndConditions?.title
      ? store?.termsAndConditions?.title
      : "Terms and Conditions",
    descriptions: store?.termsAndConditions?.descriptions
      ? store?.termsAndConditions?.descriptions
      : "",
  });

  const onEditorStateChangeTC = (editorState) => {
    setEditorStateTC(editorState);
    setTermsAndConditions({
      ...termsAndConditions,
      descriptions: draftToHtml(
        convertToRaw(editorStateTC.getCurrentContent())
      ),
    });
  };

  const onEditorStateChangePP = (editorState) => {
    setSaveActivePP(true);
    setEditorStatePP(editorState);
    setPrivacyPolicy({
      ...privacyPolicy,
      descriptions: draftToHtml(
        convertToRaw(editorStatePP.getCurrentContent())
      ),
    });
  };

  const handleStorePPSave = async () => {
    const data = {
      privacyPolicy,
    };
    console.log(data);

    const result = await saveStorePP(store._id, store.token, data);
    if (result.success) {
      setEditPrivacyPolicy(false);
      updateStore({ store: result.responseData });
      toast.info("Privacy Policy updated.");
    } else {
      result.errors.map((item) => toast.info(item.message));
      console.log(result);
    }
  };

  const handleStoreTCSave = async () => {
    const data = {
      termsAndConditions,
    };
    console.log(data);

    const result = await saveStoreTC(store._id, store.token, data);
    if (result.success) {
      setTermsAndCondi(false);
      updateStore({ store: result.responseData });
      toast.info("Terms and Condtions updated.");
    } else {
      result.errors.map((item) => toast.info(item.message));
      console.log(result);
    }
  };

  let domNode = useClickOutside(() => {
    setCanUploadDropDown(false);
  });


  useEffect(async () => {

    try {
      let response = await fetch(`${httpConstants.BASE_URL1}/api/v1/blockchains${getTanentUserId()}`)
      let result = await response.json();

      if (result.success) setBlockchainCategory(result.responseData)

    } catch (error) {
      console.log('Error: while fetching blockchain')
    }

  }, [])

  return (
    <>
      <div className="myStoreFormContainer">
        {!editPrivacyPolicy && !termsAndCondi && (
          <div className="advancedSettingsForm">
            <div className="myStoreHeading1">Advanced Settings</div>
            <div className="myStoreHeading2"> Supported Network</div>
            <div className="forminnerContainer">
              <div className="myStoreHeading3"> Select Blockchains</div>
              <div className="formsecondarytext">
                You can select your preferred blockchains on which your
                Marketplace will work on
              </div>
              <div className="blockChainContainer">
                {
                  blockchainCategory.length > 0 ?
                    blockchainCategory.map(item => (
                      item.isActive ?
                        <BlockchainCard
                          key={item._id}
                          handleBlockchainsPush={handleBlockchainsPush}
                          handleBlockchainsPull={handleBlockchainsPull}
                          item={item}
                          blockchains={store?.blockchains}
                        />
                        : null
                    ))
                    : <p className="text-center" style={{ width: '100%', marginTop: '15px' }}>Fetching... blockchains</p>
                }
                {/* <div className="blockChain">
                  <div className="blockChainnameContainer">
                    <div className="blockChainiconContainer">
                      <img src={EthereumIcon} alt="ethereum" />
                    </div>
                    Ethereum
                  </div>
                  {!ethereum && (
                    <div
                      className="myStoreSocialMediaToggleButton"
                      onClick={() => {
                        handleBlockchainsPush("Ethereum");
                        setEthereum(true);
                      }}
                    >
                      <div className="myStoreSocialMediaToggler"></div>
                    </div>
                  )}
                  {ethereum && (
                    <div
                      className="myStoreSocialMediaToggleButtonActive"
                      onClick={() => {
                        handleBlockchainsPull("Ethereum");
                        setEthereum(false);
                      }}
                    >
                      <div className="myStoreSocialMediaTogglerActive"></div>
                    </div>
                  )}
                </div>
                <div className="blockChain">
                  <div className="blockChainnameContainer">
                    <div className="blockChainiconContainer">
                      <img src={BinanceIcon} alt="ethereum" />
                    </div>
                    Binance
                  </div>
                  {!binance && (
                    <div
                      className="myStoreSocialMediaToggleButton"
                      onClick={() => {
                        handleBlockchainsPush("Binance");
                        setBinance(true);
                      }}
                    >
                      <div className="myStoreSocialMediaToggler"></div>
                    </div>
                  )}
                  {binance && (
                    <div
                      className="myStoreSocialMediaToggleButtonActive"
                      onClick={() => {
                        handleBlockchainsPull("Binance");
                        setBinance(false);
                      }}
                    >
                      <div className="myStoreSocialMediaTogglerActive"></div>
                    </div>
                  )}
                </div>
                <div className="blockChain">
                  <div className="blockChainnameContainer">
                    <div className="blockChainiconContainer">
                      <img src={PolygonIcon} alt="ethereum" />
                    </div>
                    Polygon
                  </div>
                  {!polygon && (
                    <div
                      className="myStoreSocialMediaToggleButton"
                      onClick={() => {
                        handleBlockchainsPush("Polygon");
                        setPolygon(true);
                      }}
                    >
                      <div className="myStoreSocialMediaToggler"></div>
                    </div>
                  )}
                  {polygon && (
                    <div
                      className="myStoreSocialMediaToggleButtonActive"
                      onClick={() => {
                        handleBlockchainsPull("Polygon");
                        setPolygon(false);
                      }}
                    >
                      <div className="myStoreSocialMediaTogglerActive"></div>
                    </div>
                  )}
                </div> */}
              </div>
              <div className="myStoreHeading2"> Can Upload NFT</div>
              <div className="formInputContainer posrel formInputContainerAdvancedSetting">
                <div className="dflex justbetween w100" onClick={() => handleDropDown()}>
                  {/* <div className="formInputContainer posrel formInputContainerAdvancedSetting" ref={domNode}> */}
                  <div>{canUploadNft}</div>

                  {canUploadDropDown ? (
                     <div >
                     <BsChevronUp className="saleTypeandPricingdowmarrow" />
                   </div>
                  ):(
                    <div >
                     <BsChevronDown className="saleTypeandPricingdowmarrow" />
                   </div>
                  )}
                </div>

                <div className="dropdownoptionsadvance" 
                // ref={domNode}
                >
                  {canUploadDropDown && (
                    <div className="canUploadDropdown">
                      <div
                        className="canUploadDropdownEach"
                        onClick={() => handleWhoCanUploadNft()}
                      >
                        Everyone
                      </div>
                      <div
                        className="canUploadDropdownEach"
                        onClick={() => handleWhoCanUploadNft2()}
                      >
                        Only me
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="categories-div" style={{ display: 'flex' }}>
                <div className="myStoreHeading2"> Categories</div>
                <div className="create-category-text"
                  onClick={() => setCreateCategoryActive(true)}
                >Create Category</div>
              </div>

              <div className="categoriesContainer">
                {selectedCategories.map((item) => (
                  <div className="categoriesContainerEach" key={item._id}>
                    {!item.isActive && (
                      <div
                        onClick={() => {
                          handleCategoriesPush(item._id);
                          handleCategoryActive(item);
                        }}
                        className="selectBoxContainer"
                      ></div>
                    )}
                    {item.isActive && (
                      <div
                        className="selectBoxContainerActive"
                        onClick={() => {
                          handleCategoriesPull(item._id);
                          handleCategoryInactive(item);
                        }}
                      >
                        <BsCheck2 className="selectBoxContainerActiveIcon" />
                      </div>
                    )}
                    {item.name}
                  </div>
                ))}

                {/* <div className='categoriesContainerEach'>
                  {!art && (
                    <div
                      onClick={() => {
                        handleCategoriesPush('Art');
                        setArt(true);
                      }}
                      className='selectBoxContainer'
                    ></div>
                  )}
                  {art && (
                    <div
                      className='selectBoxContainerActive'
                      onClick={() => {
                        handleCategoriesPull('Art');
                        setArt(false);
                      }}
                    >
                      <BsCheck2 className='selectBoxContainerActiveIcon' />
                    </div>
                  )}
                  Art
                </div>
                <div className='categoriesContainerEach'>
                  {!tradingCard && (
                    <div
                      onClick={() => {
                        handleCategoriesPush('TradingCard');
                        setTradingCard(true);
                      }}
                      className='selectBoxContainer'
                    ></div>
                  )}
                  {tradingCard && (
                    <div
                      className='selectBoxContainerActive'
                      onClick={() => {
                        handleCategoriesPull('TradingCard');
                        setTradingCard(false);
                      }}
                    >
                      <BsCheck2 className='selectBoxContainerActiveIcon' />
                    </div>
                  )}
                  TradingCard
                </div>
                <div className='categoriesContainerEach'>
                  {!utility && (
                    <div
                      onClick={() => {
                        handleCategoriesPush('Utility');
                        setUtility(true);
                      }}
                      className='selectBoxContainer'
                    ></div>
                  )}
                  {utility && (
                    <div
                      className='selectBoxContainerActive'
                      onClick={() => {
                        handleCategoriesPull('Utility');
                        setUtility(false);
                      }}
                    >
                      <BsCheck2 className='selectBoxContainerActiveIcon' />
                    </div>
                  )}
                  Utility
                </div>
                <div className='categoriesContainerEach'>
                  {!celebs && (
                    <div
                      onClick={() => {
                        handleCategoriesPush('Celebrities');
                        setCelebs(true);
                      }}
                      className='selectBoxContainer'
                    ></div>
                  )}
                  {celebs && (
                    <div
                      className='selectBoxContainerActive'
                      onClick={() => {
                        handleCategoriesPull('Celebs');
                        setCelebs(false);
                      }}
                    >
                      <BsCheck2 className='selectBoxContainerActiveIcon' />
                    </div>
                  )}
                  Celebrities
                </div>
                <div className='categoriesContainerEach'>
                  {!music && (
                    <div
                      onClick={() => {
                        handleCategoriesPush('Music');
                        setMusic(true);
                      }}
                      className='selectBoxContainer'
                    ></div>
                  )}
                  {music && (
                    <div
                      className='selectBoxContainerActive'
                      onClick={() => {
                        handleCategoriesPull('Music');
                        setMusic(false);
                      }}
                    >
                      <BsCheck2 className='selectBoxContainerActiveIcon' />
                    </div>
                  )}
                  Music
                </div>
                <div className='categoriesContainerEach'>
                  {!sports && (
                    <div
                      onClick={() => {
                        handleCategoriesPush('Sports');
                        setSports(true);
                      }}
                      className='selectBoxContainer'
                    ></div>
                  )}
                  {sports && (
                    <div
                      className='selectBoxContainerActive'
                      onClick={() => {
                        handleCategoriesPull('Sports');
                        setSports(false);
                      }}
                    >
                      <BsCheck2 className='selectBoxContainerActiveIcon' />
                    </div>
                  )}
                  Sports
                </div>
                <div className='categoriesContainerEach'>
                  {!photography && (
                    <div
                      onClick={() => {
                        handleCategoriesPush('Photography');
                        setPhotography(true);
                      }}
                      className='selectBoxContainer'
                    ></div>
                  )}
                  {photography && (
                    <div
                      className='selectBoxContainerActive'
                      onClick={() => {
                        handleCategoriesPull('Photography');

                        setPhotography(false);
                      }}
                    >
                      <BsCheck2 className='selectBoxContainerActiveIcon' />
                    </div>
                  )}
                  Photography
                </div>
                <div className='categoriesContainerEach'>
                  {!trading && (
                    <div
                      onClick={() => {
                        handleCategoriesPush('Trading');

                        setTrading(true);
                      }}
                      className='selectBoxContainer'
                    ></div>
                  )}
                  {trading && (
                    <div
                      className='selectBoxContainerActive'
                      onClick={() => {
                        handleCategoriesPull('Trading');

                        setTrading(false);
                      }}
                    >
                      <BsCheck2 className='selectBoxContainerActiveIcon' />
                    </div>
                  )}
                  Trading
                </div> */}
              </div>
              <div className="myStoreHeading2">Custom Store page</div>
              <div className="myStoreHeading3"> Privacy Policy </div>
              <div
                className="myStoreHeading3 myStoreHeading3AdvancedSetting"
                onClick={() => setEditPrivacyPolicy(true)}
                style={{ cursor: "pointer" }}
              >
                {" "}
                Edit
              </div>
              <div className="myStoreHeading3"> Terms and Conditions </div>
              <div
                className="myStoreHeading3 myStoreHeading3AdvancedSetting"
                onClick={() => setTermsAndCondi(true)}
                style={{ cursor: "pointer" }}
              >
                {" "}
                Edit
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
        )}
        {editPrivacyPolicy && (
          <div className="addBlogContainer">
            <div className="addBlogHeaderContainer">
              <BiArrowBack
                className="addBlogHeaderIcon"
                onClick={() => setEditPrivacyPolicy(false)}
              />
              <div className="myStoreHeading1">Edit Privacy Policy</div>
            </div>
            <div className="privacy-title myStoreHeading3AddBlog"> Title</div>
            <div className="formInputContainer formInputContainerAddBlog">
              <input
                type="text"
                className="formsInput formsInputAddBlog"
                placeholder="Enter Title"
                value={privacyPolicy.title}
                onChange={(e) => {
                  setSaveActivePP(true);
                  setPrivacyPolicy({ ...privacyPolicy, title: e.target.value });
                }}
              />
            </div>
            <div className="content-text myStoreHeading3AddBlog">
              {" "}
              Content
            </div>
            <div className="textEditorContainer">
              <Editor
                defaultEditorState={EditorState.createWithContent(
                  ContentState.createFromBlockArray(
                    convertFromHTML(
                      store?.privacyPolicy?.descriptions
                        ? store?.privacyPolicy?.descriptions
                        : ""
                    )
                  )
                )}
                // editorState={editorStatePP}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChangePP}
              />
            </div>
            {saveActivePP && (
              <div
                className="formsaveButtonContainer"
                onClick={handleStorePPSave}
              >
                <div className="formsaveButton">Save</div>
              </div>
            )}
            {!saveActivePP && (
              <div
                className="formsaveButtonContainer"
                style={{ opacity: "0.55" }}
              >
                <button className="formsaveButton" style={{ cursor: "default" }}>
                  Save
                </button>
              </div>
            )}
          </div>
        )}
        {termsAndCondi && (
          <div className="addBlogContainer">
            <div className="addBlogHeaderContainer">
              <BiArrowBack
                className="addBlogHeaderIcon"
                onClick={() => setTermsAndCondi(false)}
              />
              <div className="myStoreHeading1">Edit Terms and Conditions</div>
            </div>
            <div className="privacy-title myStoreHeading3AddBlog"> Title</div>
            <div className="formInputContainer formInputContainerAddBlog">
              <input
                type="text"
                className="formsInput formsInputAddBlog"
                placeholder="Enter Title"
                value={termsAndConditions.title}
                onChange={(e) =>
                  setTermsAndConditions({
                    ...termsAndConditions,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="content-text myStoreHeading3AddBlog">
              {" "}
              Content*
            </div>
            <div className="textEditorContainer">
              <Editor
                // editorState={editorStateTC}
                defaultEditorState={EditorState.createWithContent(
                  ContentState.createFromBlockArray(
                    convertFromHTML(
                      store?.termsAndConditions?.descriptions
                        ? store?.termsAndConditions?.descriptions
                        : ""
                    )
                  )
                )}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChangeTC}
              />
            </div>
            <div
              className="formsaveButtonContainer"
              onClick={handleStoreTCSave}
            >
              <button className="formsaveButton">Save</button>
            </div>
          </div>
        )}
        <CreateCategoryModal
          createCategoryActive={createCategoryActive}
          setCreateCategoryActive={setCreateCategoryActive}
          fetchCategories={fetchCategories}
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
    walletAddress: state.store.walletAddress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (data) => dispatch(updateStore(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSetting);
