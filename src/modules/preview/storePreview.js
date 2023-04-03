import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NftPreviewNavbar from "./nftPreviewNavbar";
import "./styles/storePreview.css";
import "./styles/previewFooter.css";

import { Helmet } from "react-helmet";


const StorePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const storeData = useSelector(state => state.store)

  const [closeStatus, setCloseStatus] = useState(false);
  const [colorCode, setColorCode] = useState('#5a78ff');
  const [appearance, setAppearance] = useState({
    buttons: [],
    colorPalette: false,
    coverImageUrl: '',
    description: '',
    featuredAssets: [],
    heading: '',
    logo: '',
    title: '',
    socialIcons: [],
    coverPosition: "center"
  })
  const { appearanceSettings } = location.state;

  const [closePreviewButton, setClosePreviewButton] = useState(false);

  const handleMouseOver = (e) => {
    let tempDiv = e.target;
    tempDiv.style.color = colorCode

  }

  const handleMouseOut = (e) => {
    let tempDiv = e.target;
    tempDiv.style.color = "#818181"
  }

  useEffect(() => {
    if (storeData) {
      setAppearance({
        buttons: storeData.store.appearance.buttons,
        colorPalette: storeData.store.appearance.colorPalette,
        coverImageUrl: storeData.store.appearance.coverImageUrl,
        description: storeData.store.appearance.description,
        featuredAssets: storeData.store.appearance.featuredAssets,
        heading: storeData.store.appearance.heading,
        logo: storeData.store.companyLogo,
        title: storeData.store.storeName,
        socialIcons: storeData.store.socialMediaConnection,
        coverPosition: storeData.store.appearance.coverPosition
      })
    }
  }, [])

  useEffect(() => {

    switch (parseInt(appearance.colorPalette)) {
      case 1:
        setColorCode('#366EEF')
        break;
      case 2:
        setColorCode('#00ACAC')
        break;
      case 3:
        setColorCode('#8558ED')
        break;
      case 4:
        setColorCode('#EF8C29')
        break;
      case 5:
        setColorCode('#C35047')
        break;
      case 6:
        setColorCode('#50A9D8')
        break;

      default:
        break;
    }

  }, [appearance.colorPalette])


  // useEffect(() => {

  //   if (appearance.coverImageUrl !== '') {
  //     if (appearance.coverImageUrl.includes('blob')) {
  //       let xhr = new XMLHttpRequest();
  //       xhr.onreadystatechange = function () {
  //         if (this.readyState == 4) {
  //           if (this.status == 200 || (this.response && this.response.type && this.response.type == "image/jpeg")) {
  //             console.log('valid URL')
  //           }
  //           else {
  //             setAppearance({ ...appearance, coverImageUrl: '' })
  //           }
  //         }
  //       }
  //       xhr.open('GET', appearance.coverImageUrl);
  //       xhr.responseType = 'blob';
  //       xhr.send();
  //     }
  //   }
  // }, [appearance.coverImageUrl])


  return (
    <>

      <Helmet>
        <link id="favicon" rel="icon" href={appearance.logo} type="image/x-icon" />
        <title>{appearance.title !== '' ? appearance.title : 'NFT-Preview'}</title>
      </Helmet>
      <div onClick={() => setCloseStatus(false)} className="close-preview" style={{ display: `${closeStatus ? 'block' : 'none'}` }}>
        <button onClick={(e) => { e.stopPropagation(); navigate(-1) }} className="btn btn-secondary">Close Preview</button>
      </div>

      <div
        onClick={() => setCloseStatus(true)}
        className={` ${closePreviewButton && "lowpreviewopacity"} homepage`}
        style={{ overflowX: 'hidden' }}
      >
        <NftPreviewNavbar siteLogo={appearance.logo} colorCode={colorCode} />
        <div
          className="storePreviewMainContainer"
          style={ appearance.coverImageUrl!=="" ? {background: `url(${appearance.coverImageUrl})`, backgroundPosition: `${appearance.coverPosition}`} : {background: `url('https://cdn.pixabay.com/photo/2015/08/28/11/27/space-911785_960_720.jpg)`} }
        >
          <div className="storePreviewInnerContainer">
            <div className="storePreviewHeadingContainer">
              <div className="storePreviewHeadingText">
                {appearance.heading}
              </div>
              <div className="storePreviewHeadingSecondaryText">
                {appearance.description}
              </div>
              <div className="storePreviewHeadingButtonContainer">
                <div
                  // className={
                  //   'storePreviewHeadingButton ' +
                  //   (appearanceSettings.buttons.find(
                  //     item => item.title === 'Explore'
                  //   ).isNewTab
                  //     ? 'storePreviewHeadingButtonPrimary'
                  //     : 'storePreviewHeadingButtonSecondary')
                  // }
                  className={
                    "storePreviewHeadingButton " +
                    (appearance?.buttons?.find(
                      (item) => item?.id == "1"
                    )?.style === "Solid"
                      ? "storePreviewHeadingButtonPrimary"
                      : "storePreviewHeadingButtonSecondary")
                  }
                >
                  {
                    appearance.buttons.length > 0 ?
                      appearance.buttons[0].title
                      : 'Explore'
                  }
                </div>
                <div
                  className={
                    "storePreviewHeadingButton " +
                    (appearance?.buttons?.find(
                      (item) => item?.id == "2"
                    )?.style === "Solid"
                      ? "storePreviewHeadingButtonPrimary"
                      : "storePreviewHeadingButtonSecondary")
                  }
                >
                  {
                    appearance.buttons.length > 0 ?
                      appearance.buttons[1].title
                      : 'Create'
                  }
                </div>
              </div>
            </div>
            <div className="storeNftPreviewContainer">
              {appearance.featuredAssets.slice(0, 4).map((item) => (
                <div className="storeNftPreviewEach" key={item._id}>
                  <img
                    src={item.link}
                    // src="https://cdn.pixabay.com/photo/2015/03/01/19/32/minecraft-655158_960_720.jpg"
                    className="storeNftPreviewEachImage"
                  />
                  <div className="storeNftPreviewEachDetail">
                    <div>
                      <img
                        src={item.link}
                        // src="https://cdn.pixabay.com/photo/2016/02/11/16/59/dog-1194083_960_720.jpg"
                        className="storeNftPreviewEachDetailProfilePic"
                      />
                    </div>
                    <div className="storeNftPreviewEachDetailHeadingContainer">
                      <div style={{ color: `${colorCode}` }} className="storeNftPreviewEachDetailHeading1">
                        {item.name}
                      </div>
                      {/* <div className='storeNftPreviewEachDetailHeading2'>
                      //static
                    </div> */}
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="bottomDotsStorePreview">
                <div className="bottomDot bottomDotActive "></div>
                <div className="bottomDot"></div>
                <div className="bottomDot"></div>
                <div className="bottomDot"></div>
              </div> */}
            </div>
          </div>
        </div>
        {closePreviewButton && (
          <Link
            className="closeButtonForStorePreview"
            to="/my-store/appearance"
            style={{ color: "black", textDecoration: "none" }}
          >
            Close
          </Link>
        )}



        <div className="create-sell-nft">
          <h2 className="heading">Create and sell your NFTs</h2>
          <div className="inner-width">
            <div style={{ display: 'flex', justifyContent: 'center',flexWrap:"wrap" }} className="d-flex justify-content-center flex-wrap">
              <Card  className="first-card-nft">
                {/* <img className="icon-hover" variant="top" src={walletIcon} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="89" height="89" viewBox="0 0 89 89">
                  <g id="Wallet" transform="translate(-330 -1397)">
                    <rect id="Rectangle_1009" data-name="Rectangle 1009" width="89" height="89" transform="translate(330 1397)" fill="rgba(255,255,255,0)" />
                    <g id="Wallet-2" data-name="Wallet" transform="translate(333 1406)">
                      <path id="Path_642" data-name="Path 642" d="M94.93,40.166,67,68.094a7.17,7.17,0,0,1-10.14,0L28.935,40.166a7.17,7.17,0,0,1,0-10.14L56.863,2.1A7.17,7.17,0,0,1,67,2.1L94.93,30.027a7.169,7.169,0,0,1,0,10.14" transform="translate(-14.261 0)" fill="#cbd3e7" />
                      <rect id="Rectangle_981" data-name="Rectangle 981" width="82.768" height="70.194" transform="translate(0 0)" fill="none" />
                      <path id="Path_645" data-name="Path 645" d="M68.094,40.166,40.166,68.094a7.17,7.17,0,0,1-10.14,0L2.1,40.166a7.17,7.17,0,0,1,0-10.14L30.027,2.1a7.17,7.17,0,0,1,10.14,0L68.094,30.027a7.169,7.169,0,0,1,0,10.14" transform="translate(0 0)" fill={colorCode} />
                      <path id="Path_648" data-name="Path 648" d="M24.307,81.626h0a7.051,7.051,0,0,1-.009-9.972L45.691,50.22a7.051,7.051,0,0,1,9.982,9.963L34.279,81.616a7.051,7.051,0,0,1-9.972.009" transform="translate(-11.818 -25.589)" fill="#aec4f7" />
                      <path id="Path_649" data-name="Path 649" d="M81.351,58.759a4.567,4.567,0,1,1-4.567-4.567,4.568,4.568,0,0,1,4.567,4.567" transform="translate(-38.378 -28.8)" fill="#071b4a" />
                      <rect id="Rectangle_986" data-name="Rectangle 986" width="82.768" height="70.194" transform="translate(0 0)" fill="none" />
                      <rect id="Rectangle_987" data-name="Rectangle 987" width="82.768" height="70.194" transform="translate(0 0)" fill="none" />
                    </g>
                  </g>
                </svg>
                <Card.Body>
                  <Card.Title>Create Wallet</Card.Title>
                  <Card.Text>
                    Create your wallet on the platform to buy-sell NFTs.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <svg xmlns="http://www.w3.org/2000/svg" width="89" height="89" viewBox="0 0 89 89">
                  <g id="Collection" transform="translate(-721 -1397)">
                    <rect id="Rectangle_1008" data-name="Rectangle 1008" width="89" height="89" transform="translate(721 1397)" fill="none" />
                    <g id="Group_624" data-name="Group 624" transform="translate(726 1407)">
                      <path id="Path_650" data-name="Path 650" d="M400.454,325.352a4.429,4.429,0,1,1-7.65-4.465l6.821-11.814c.007-.014.015-.026.022-.039a4.429,4.429,0,0,1,7.685,4.4h0l-6.878,11.912Zm-7.692-28.171q.022-.04.046-.079v0a4.429,4.429,0,0,1,7.671,4.429l-13.754,23.824a4.429,4.429,0,1,1-7.651-4.463Zm-13.727,0,.032-.055,0,0a4.429,4.429,0,0,1,7.67,4.429l-.007.014h0v0l-6.87,11.9a4.429,4.429,0,1,1-7.671-4.428l6.845-11.856Z" transform="translate(-328.475 -257.589)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_651" data-name="Path 651" d="M146.015,303.795a4.428,4.428,0,1,1-.046-8.856H159.7a4.428,4.428,0,1,1,0,8.857H146.015Z" transform="translate(-134.683 -257.595)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_652" data-name="Path 652" d="M146.015,445.8a4.429,4.429,0,1,0-.046,8.857H159.7a4.429,4.429,0,1,0,0-8.858H146.015Z" transform="translate(-134.683 -384.676)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_653" data-name="Path 653" d="M229.273,301.611a4.429,4.429,0,1,1,7.648-4.468l6.866,11.894a4.429,4.429,0,0,1-7.671,4.429l-6.845-11.855Z" transform="translate(-208.067 -257.592)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_654" data-name="Path 654" d="M106.281,372.619a4.429,4.429,0,1,0-7.694,4.39l6.866,11.893a4.429,4.429,0,0,0,7.672-4.428l-6.845-11.854Z" transform="translate(-97.996 -321.138)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_655" data-name="Path 655" d="M236.092,372.619a4.429,4.429,0,1,1,7.694,4.39L236.92,388.9a4.429,4.429,0,1,1-7.67-4.428l6.844-11.854Z" transform="translate(-208.063 -321.138)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_656" data-name="Path 656" d="M113.108,301.611a4.429,4.429,0,1,0-7.648-4.468l-6.868,11.894a4.429,4.429,0,1,0,7.672,4.428l6.844-11.855Z" transform="translate(-98 -257.592)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_657" data-name="Path 657" d="M278.941,215.513a4.429,4.429,0,1,1,6.05,1.621,4.431,4.431,0,0,1-6.05-1.621Z" transform="translate(-249.923 -185.092)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_658" data-name="Path 658" d="M373.717,60.214a4.429,4.429,0,1,1-6.05-1.621,4.431,4.431,0,0,1,6.05,1.621Z" transform="translate(-323.3 -57.999)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_659" data-name="Path 659" d="M235.391,135.644a4.429,4.429,0,1,1,1.622,6.05,4.432,4.432,0,0,1-1.622-6.05Z" transform="translate(-213.238 -121.541)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_660" data-name="Path 660" d="M417.267,140.074a4.429,4.429,0,1,1-1.622-6.05A4.432,4.432,0,0,1,417.267,140.074Z" transform="translate(-359.985 -121.542)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_661" data-name="Path 661" d="M287.2,62.429A4.429,4.429,0,1,1,282.775,58a4.429,4.429,0,0,1,4.429,4.429" transform="translate(-249.921 -58)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_662" data-name="Path 662" d="M374.3,213.287a4.429,4.429,0,1,1-4.429-4.429,4.429,4.429,0,0,1,4.429,4.429" transform="translate(-323.294 -185.081)" fill={colorCode} fill-rule="evenodd" />
                      <path id="Path_663" data-name="Path 663" d="M322.491,140.074a4.429,4.429,0,1,1,6.05,1.622A4.432,4.432,0,0,1,322.491,140.074Z" transform="translate(-286.609 -121.542)" fill={colorCode} fill-rule="evenodd" />
                    </g>
                  </g>
                </svg>
                <Card.Body>
                  <Card.Title>Create Collection</Card.Title>
                  <Card.Text>
                    Create on-chain personalised collections to mint NFTs in
                    those collections.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <svg xmlns="http://www.w3.org/2000/svg" width="89" height="89" viewBox="0 0 89 89">
                  <g id="NFTs" transform="translate(-1111 -1397)">
                    <rect id="Rectangle_1010" data-name="Rectangle 1010" width="89" height="89" transform="translate(1111 1397)" fill="rgba(255,255,255,0)" />
                    <g id="Group_625" data-name="Group 625" transform="translate(1114 1412)">
                      <path id="Path_664" data-name="Path 664" d="M128.515,137.043a2.571,2.571,0,0,0-4.566-.064l-17.091,31.885L95.214,150.818a2.551,2.551,0,0,0-4.285,0L70.522,182.7a2.58,2.58,0,0,0,2.143,3.941H149.19a2.621,2.621,0,0,0,2.283-3.75Z" transform="translate(-70.134 -126.7)" fill={colorCode} />
                      <path id="Path_665" data-name="Path 665" d="M230.229,97.338a11.479,11.479,0,1,0-8.117-3.362A11.477,11.477,0,0,0,230.229,97.338Zm0-17.856a6.376,6.376,0,1,1-4.51,1.868A6.38,6.38,0,0,1,230.229,79.482Z" transform="translate(-197.087 -74.38)" fill={colorCode} />
                    </g>
                  </g>
                </svg>
                <Card.Body>
                  <Card.Title>Add NFTs</Card.Title>
                  <Card.Text>
                    Create on-chain NFTs to showcase your Art to the world or
                    Sell to the community.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <svg xmlns="http://www.w3.org/2000/svg" width="89" height="89" viewBox="0 0 89 89">
                  <g id="Sale" transform="translate(-1502 -1397)">
                    <rect id="Rectangle_1011" data-name="Rectangle 1011" width="89" height="89" transform="translate(1502 1397)" fill="rgba(255,255,255,0)" />
                    <g id="Group_626" data-name="Group 626" transform="translate(1518 1413)">
                      <path id="noun-sale-3266461" d="M103.2-.06a1.77,1.77,0,0,0-1.282.525L70.55,31.83a1.768,1.768,0,0,0,0,2.493L92.232,56.014a1.769,1.769,0,0,0,2.5,0L126.09,24.649a1.769,1.769,0,0,0,.522-1.278l-.39-21.305A1.768,1.768,0,0,0,124.484.333Z" transform="translate(-70.036 0.06)" fill={colorCode} />
                      <path id="noun-sale-3266461-2" data-name="noun-sale-3266461" d="M225.115,80.093a5.249,5.249,0,1,1-5.246,5.242A5.273,5.273,0,0,1,225.115,80.093Zm-17.558,9.314a1.767,1.767,0,0,1,1.267.535l11.59,11.59a1.768,1.768,0,1,1-2.493,2.494l-11.59-11.576a1.768,1.768,0,0,1,1.226-3.043Zm-5.626,5.809a1.768,1.768,0,0,1,1.278.536l11.58,11.59a1.768,1.768,0,1,1-2.494,2.507l-11.59-11.59a1.768,1.768,0,0,1,1.226-3.043Zm-5.715,5.719a1.768,1.768,0,0,1,1.278.536l11.576,11.59a1.768,1.768,0,1,1-2.494,2.5l-11.59-11.59a1.768,1.768,0,0,1,1.229-3.039Z" transform="translate(-183.091 -70.984)" fill="#fff" opacity="0.9" />
                    </g>
                  </g>
                </svg>
                <Card.Body>
                  <Card.Title>List them for sale</Card.Title>
                  <Card.Text>
                    List your NFTs for sale or as collectibles.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>

        <div className="why-marketplace">
          <h2 className="heading-why">Why this Marketplace</h2>
          <div className="inner-width">
            <div className="custom-flex d-flex justify-content-lg-start justify-content-md-center flex-wrap">
              <div className="custom-flex-content d-flex align-items-center justify-content-left media">

                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                  <g id="Category" transform="translate(-760 -2262)">
                    <rect id="Rectangle_997" data-name="Rectangle 997" width="60" height="60" transform="translate(760 2262)" fill="none" />
                    <path id="Path_666" data-name="Path 666" d="M161.415,100.3H149.194a4.539,4.539,0,0,1-4.526-4.526V83.552a4.539,4.539,0,0,1,4.526-4.526h12.3a4.539,4.539,0,0,1,4.526,4.526v12.3a4.589,4.589,0,0,1-4.6,4.451Zm28.439,0h-12.3a4.539,4.539,0,0,1-4.526-4.526V83.552a4.539,4.539,0,0,1,4.526-4.526h12.3a4.539,4.539,0,0,1,4.526,4.526v12.3a4.475,4.475,0,0,1-4.526,4.451Zm-28.289,27.685h-12.3a4.539,4.539,0,0,1-4.526-4.526V111.237a4.539,4.539,0,0,1,4.526-4.526h12.3a4.539,4.539,0,0,1,4.526,4.526v12.3a4.626,4.626,0,0,1-4.526,4.451Zm28.364,0H177.709a4.539,4.539,0,0,1-4.526-4.526V111.237a4.539,4.539,0,0,1,4.526-4.526h12.221a4.539,4.539,0,0,1,4.526,4.526v12.3a4.524,4.524,0,0,1-4.526,4.451Z" transform="translate(620.332 2188.974)" fill={colorCode} />
                  </g>
                </svg>

                <p className="browse-text">Browse by Category</p>
              </div>
              <div className="custom-flex-content d-flex align-items-center justify-content-left media">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                  <g id="Stats" transform="translate(-837 -2262)">
                    <rect id="Rectangle_999" data-name="Rectangle 999" width="60" height="60" transform="translate(837 2262)" fill="none" />
                    <g id="Group_641" data-name="Group 641" transform="translate(-45 286)">
                      <rect id="Rectangle_994" data-name="Rectangle 994" width="10" height="43" rx="2" transform="translate(893 1985)" fill={colorCode} />
                      <rect id="Rectangle_995" data-name="Rectangle 995" width="10" height="22" rx="2" transform="translate(907 2006)" fill={colorCode} />
                      <rect id="Rectangle_996" data-name="Rectangle 996" width="10" height="26" rx="2" transform="translate(921 2002)" fill={colorCode} />
                    </g>
                  </g>
                </svg>

                <p className="browse-text">Stats to show pricing history</p>
              </div>
              <div className="custom-flex-content d-flex align-items-center justify-content-left media">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                  <g id="Easy" transform="translate(-955 -2262)">
                    <rect id="Rectangle_998" data-name="Rectangle 998" width="60" height="60" transform="translate(955 2262)" fill="none" />
                    <g id="Group_642" data-name="Group 642" transform="translate(36.014 -40)">
                      <path id="Path_667" data-name="Path 667" d="M222.506,113.229a3.793,3.793,0,0,1-.117,5.374L209.3,131.089a3.854,3.854,0,0,1,5.4.2,3.429,3.429,0,0,1-.236,4.858l-1.781,1.682a3.843,3.843,0,0,1,6,1.048,4.064,4.064,0,0,1-.921,4.834l-1.943,1.835a3.856,3.856,0,0,1,5.233.025l0,0a3.665,3.665,0,0,1,.024,5.392l-7.309,6.9a13.862,13.862,0,0,1-18.812-.075l-5.93-5.6a12.09,12.09,0,0,1-2.543-14.534,15.357,15.357,0,0,0,1.7-10.664,3.612,3.612,0,0,1,1.087-3.337,4.116,4.116,0,0,1,6.749,1.871l1.148,6.627,1.335-1.261,18.642-17.782a3.794,3.794,0,0,1,5.353.116Z" transform="translate(744.891 2200.202)" fill={colorCode} />
                      <path id="Path_668" data-name="Path 668" d="M297.89,34.319l.071-10.262,3.7.026-.071,10.262Z" transform="translate(645.253 2277.943)" fill={colorCode} />
                      <path id="Path_669" data-name="Path 669" d="M346.44,67.308l6.62-6.612,2.614,2.617-6.62,6.612Z" transform="translate(602.366 2245.578)" fill={colorCode} />
                      <path id="Path_670" data-name="Path 670" d="M202.11,65.623,204.718,63l6.533,6.5-2.608,2.623Z" transform="translate(729.86 2243.543)" fill={colorCode} />
                    </g>
                  </g>
                </svg>

                <p className="browse-text">Easy to sell and buy NFT</p>
              </div>
              <div className="custom-flex-content d-flex align-items-center justify-content-left media">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                  <g id="Offers" transform="translate(-320 -2370)">
                    <rect id="Rectangle_997" data-name="Rectangle 997" width="60" height="60" transform="translate(320 2370)" fill="none" />
                    <path id="Subtraction_1" data-name="Subtraction 1" d="M25.012,50.023a25.12,25.12,0,0,1-5.036-.509,24.879,24.879,0,0,1-8.941-3.767A25.13,25.13,0,0,1,1.968,34.74,24.868,24.868,0,0,1,.509,30.047a25.17,25.17,0,0,1,0-10.071,24.88,24.88,0,0,1,3.767-8.941A25.13,25.13,0,0,1,15.284,1.968,24.868,24.868,0,0,1,19.976.509a25.17,25.17,0,0,1,10.071,0,24.879,24.879,0,0,1,8.941,3.767,25.131,25.131,0,0,1,9.067,11.007,24.868,24.868,0,0,1,1.459,4.693,25.17,25.17,0,0,1,0,10.071,24.879,24.879,0,0,1-3.767,8.941A25.131,25.131,0,0,1,34.74,48.055a24.867,24.867,0,0,1-4.693,1.459A25.12,25.12,0,0,1,25.012,50.023Zm8.445-36.03a2.558,2.558,0,0,0-1.81.751l-16.9,16.9a2.542,2.542,0,0,0-.563.849,2.589,2.589,0,0,0,0,1.935,2.5,2.5,0,0,0,1.4,1.4,2.481,2.481,0,0,0,1.909,0,2.529,2.529,0,0,0,.836-.546l16.9-16.9a2.543,2.543,0,0,0,.563-.849,2.589,2.589,0,0,0,0-1.935,2.543,2.543,0,0,0-.563-.849,2.369,2.369,0,0,0-.819-.563A2.475,2.475,0,0,0,33.456,13.994Zm-1.389,14.23a3.832,3.832,0,1,0,1.5.3A3.82,3.82,0,0,0,32.067,28.224ZM17.956,14.112a3.832,3.832,0,1,0,1.5.3A3.82,3.82,0,0,0,17.956,14.112Z" transform="translate(325 2374)" fill={colorCode} />
                  </g>
                </svg>

                <p className="browse-text"> Make offers on NFTs</p>
              </div>
              <div className="custom-flex-content d-flex align-items-center justify-content-left media">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                  <g id="Activity" transform="translate(-816 -2368)">
                    <rect id="Rectangle_997" data-name="Rectangle 997" width="60" height="60" transform="translate(816 2368)" fill="none" />
                    <g id="Group_652" data-name="Group 652" transform="translate(-69 4)">
                      <g id="Rectangle_1006" data-name="Rectangle 1006" transform="translate(896 2373)" fill="#fff" stroke={colorCode} stroke-width="2" stroke-dasharray="3 2">
                        <rect width="38" height="38" rx="2" stroke="none" />
                        <rect x="1" y="1" width="36" height="36" rx="1" fill="none" />
                      </g>
                      <rect id="Rectangle_1003" data-name="Rectangle 1003" width="15" height="15" rx="2" transform="translate(890 2371)" fill={colorCode} />
                      <rect id="Rectangle_1004" data-name="Rectangle 1004" width="15" height="15" rx="2" transform="translate(924 2371)" fill={colorCode} />
                      <rect id="Rectangle_1005" data-name="Rectangle 1005" width="15" height="15" rx="2" transform="translate(908 2402)" fill={colorCode} />
                    </g>
                  </g>
                </svg>

                <p className="browse-text"> See all the activities on NFT</p>
              </div>
            </div>
          </div>
        </div>


        {/* Footer start */}
        <div className="container-fluid footer-main-cont" style={{ color: "#8F8F8F", backgroundColor: "#FBFBFB", width: "100%", paddingLeft: "6.7%", paddingRight: "6.7%" }}>
          <div className="row footer-cont">
            <div className="footer-top">
              <p className="fs-18">Join our community</p>
              <div className="allicon">
                {
                  appearance.socialIcons.length > 0 ?
                    appearance.socialIcons.map((item, index) => (
                      <a key={index} href={item.url} target="_blank" className="footerAnchor">
                        <i className={`fa-brands fa-${item.name.toLowerCase()} Icon`} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} />
                      </a>
                    ))
                    : null
                }
              </div>
              <div className="mobicon">
                {
                  appearance.socialIcons.length > 0 ?
                    appearance.socialIcons.map((item, index) => (
                      <a key={index} href={item.url} target="_blank" className="footerAnchor">
                        <i className={`fa-brands fa-${item.name.toLowerCase()} Icon`} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} />
                      </a>
                    ))
                    : null
                }
              </div>
              <p className="subscribe">Subscribe to our newsletter for the latest NFTs</p>
              <div className="input-group-lg input-group  footerinputbox" style={{ marginBottom: "37px", display: 'flex' }}>
                <input
                  type="email"
                  name="email"
                  className="form-control ib "
                  placeholder="Your email"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  style={{
                    borderTopLeftRadius: "0.2em",
                    borderBottomLeftRadius: "0.2em",
                    border: '1px solid rgba(0,0,0,.1)'
                  }}
                />
                <div className="input-group-append inputfooter">
                  <button
                    style={{ backgroundColor: `${colorCode}`, border: 'none', zIndex: "0" }}
                    className="btn btn-primary submitbuttonfooter"
                    // type="button"
                    id="button-addon2"

                  >
                    {" "}
                    Submit
                  </button>
                </div>
              </div>
              <div style={{ fontsize: "10px", color: "red", display: "block", marginBottom: "15px" }}>{``}</div>
              <h3 className="about"><a onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="aboutText" href="/about">About Anafto's Marketplace</a></h3>
              <div className="d-none d-sm-none d-md-block d-lg-block fs-16 aboutdes">
                <p style={{ marginBottom: "0", cursor: "default" }}>Anafto is a decentralized NFT marketplace for new-age NFT enthusiasts. Users can easily create, buy, sell, store, and manage their NFTs on Anafto. Explore the marketplace and start trading your valuable digital assets.</p>
              </div>

            </div>
            <div className="footer-bottom">
              <div>
                <div className="fs-18 d-flex flex-column" style={{ color: "#8F8F8F" }}>

                  <a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footertitle">Marketplace</a>
                  <a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">NFT</a>
                  <a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">Collections</a>
                </div>
                <div className="fs-18 d-flex flex-column">
                  <a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footertitle" >Leaderboard</a>
                  <p><a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">Top Seller</a></p>
                  <p><a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">Top Buyer</a></p>
                  <p><a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle" >Top Collections</a></p>
                </div>
              </div>
              <div className="fs-18 d-flex flex-column">
                <a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footertitle">Community</a>
                <p><a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">Help Centers</a></p>
                <p><a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">FAQs</a></p>
                <p><a onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle" >Suggestions</a></p>
              </div>
              <div className="fs-18 d-flex flex-column">
                <a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footertitle">Company</a>
                <p><a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">About</a></p>
                <p><a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">Privacy Policy</a></p>
                <p><a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">Terms and Conditon</a></p>
              </div>
            </div>

            <div className="row footer-bottom-sm">
              <div className="col-7 marketplace-mob-div">
                <h3 className="fs-18 fw-b">
                  <a  className="footertitle">Marketplace</a></h3>
                <p><a  className="footersubtitle">Nft</a></p>
                <p><a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">Collections</a></p>
              </div>
              <div className="col-5 leaderboard-mob-div">
                <h3 className="fs-18 fw-b">
                  <a className="footertitle" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} href="/leader-board">Leaderboard</a></h3>
                <p><a className="footersubtitle">Top Seller</a></p>
                <p><a  className="footersubtitle">Top Buyer</a></p>
                <p><a  className="footersubtitle">Top Collections</a></p>
              </div>
              <div className="col-7 mt-3 help-center-div">
                <h3 className="fs-18 fw-b">
                  <a className="footertitle" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} href="/help-center">Community</a></h3>
                <p><a className="footersubtitle">Help Centers</a></p>
                <p><a  className="footersubtitle">FAQs</a></p>
                <p><a  className="footersubtitle">Suggestions</a></p>
              </div>
              <div className="col-5 mt-3 about-mob-div">
                <h3 className="fs-18 fw-b">
                  <a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footertitle">Company</a></h3>
                <p><a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">About</a></p>
                <p><a onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">Privacy Policy</a></p>
                <p><a  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="footersubtitle">Terms and Conditon</a></p>
              </div>
              <div className="copyrightDivMob"><span className="textCopyrightMob">&copy;2022 Anafto Marketplace. All Rights Reserved.</span></div>
            </div>

          </div>

          <div className="copyrightDiv">
            <span className="textCopyright">&copy;2022 Anafto Marketplace. All Rights Reserved.</span>
          </div>
        </div>

        {/* Footer End */}


      </div>



    </>
  );
};
export default StorePreview;
