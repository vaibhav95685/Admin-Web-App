import React from 'react';
import './styles/nftPreviewFooter.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const NftPreviewFooter = () => {
  return (
    <div className='nftPreviewFooterContainer'>
      <div className='nftPreviewFooterMainContainer'>
        <div className='nftPreviewFooterMainContainerFirstDiv'>
          <div className='footerHeading2'>Join our community</div>
          <div className='nftPreviewFooterIconContainer'>
            <FaFacebookF className='nftPreviewFooterIcon' />
            <FaTwitter className='nftPreviewFooterIcon' />
            <FaInstagram className='nftPreviewFooterIcon' />
          </div>
          <div className='footerHeading2'>
            Subscribe to our newsletter for the latest NFTs
          </div>
          <div className='footerEmailContainer'>
            <div className='footerEmailInput'>
              <input type='text' placeholder='Your Email ' />
            </div>
            <div className='footerEmailSubmit'>Submit</div>
          </div>
          <div className='footerHeading2'>About DLT NFT marketplace</div>
          <div className='footerHeading3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim
          </div>
        </div>
        <div className='nftPreviewFooterMainContainerSecondDiv'>
          <div className='nftPreviewFooterMainSecondDivEach'>
            <div className='footerHeading1'>MarketPlace</div>
            <div className='footerHeading2'>NFT</div>
            <div className='footerHeading2'>Collections</div>
            <div className='footerHeading1'>LeaderBoard</div>
            <div className='footerHeading2'>Top Seller</div>
            <div className='footerHeading2'>Top Bidder</div>
            <div className='footerHeading2'>Top Collections</div>
          </div>
          <div className='nftPreviewFooterMainSecondDivEach'>
            <div className='footerHeading1'>Community</div>
            <div className='footerHeading2'>Help Centers</div>
            <div className='footerHeading2'>FAQs</div>
            <div className='footerHeading2'>Suggestions</div>
          </div>
          <div className='nftPreviewFooterMainSecondDivEach'>
            <div className='footerHeading1'>Company</div>
            <div className='footerHeading2'>About</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftPreviewFooter;
