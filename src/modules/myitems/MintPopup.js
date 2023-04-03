import React from 'react'
import "./styles/mintModel.css"
import { Oval } from "react-loader-spinner";
import checkIcon from "../../assets/Check.svg"

export const MintPopup = ({name, blockchain, logoCdn}) => {

    return (
        <>
            <div className="mint-mod-outer">
                <div className="mint-abs">
                    <div className="">
                        <div className="mint-outer" style={{ opacity: "1" }}>
                            <div className="mintbody">
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="completelistin">
                                        Create your NFT
                                    </div>
                                </div>
                                <div className="abstractillusion">
                                    <img src={logoCdn} />
                                    <div className="abstractillusioncontent">
                                        <div className="abstracttitle">{name}</div>
                                        <div className="abstractposter">{blockchain}</div>
                                        <div className="ethprice"></div>
                                    </div>
                                </div>
                                <div className="checkpostcontainer">
                                    <div className="checkpost">
                                        <img src={checkIcon} className="checkimg" />
                                        {/* <div className="checkimg">
                        <Oval
                          vertical="top"
                          horizontal="center"
                          color="#00BFFF"
                          height={30}
                          width={30} />
                      </div> */}

                                        <div className="checkposttext">
                                            <div className="heading">initializing</div>
                                            <div className="description"></div>
                                        </div>
                                    </div>
                                    <div className="checkpost">
                                        {/* <img src={success} className="checkimg" /> */}
                                        <div className="checkimg">
                                            <Oval
                                                vertical="top"
                                                horizontal="center"
                                                color="#00BFFF"
                                                height={30}
                                                width={30} />
                                        </div>

                                        <div className="checkposttext">
                                            <div className="heading">Creating NFT</div>
                                            <div className="description"></div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
