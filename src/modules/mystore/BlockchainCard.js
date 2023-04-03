import React, { useEffect, useState } from "react"

const BlockchainCard = ({item, handleBlockchainsPush, handleBlockchainsPull, blockchains}) => {

    const [status, setStatus] = useState(false)

    useEffect(()=>{
        if(blockchains.length > 0) setStatus(blockchains.includes(item?.name))
    },[])

    return (
        <>
            <div className="blockChain">
                <div className="blockChainnameContainer">
                    <div className="blockChainiconContainer">
                        <img src={item?.cdnUrl} alt="ethereum" />
                    </div>
                    {item?.name}
                </div>
                {!status && (
                    <div
                        className="myStoreSocialMediaToggleButton"
                        onClick={() => {
                            handleBlockchainsPush(`${item?.name}`);
                            setStatus(true);
                        }}
                    >
                        <div className="myStoreSocialMediaToggler"></div>
                    </div>
                )}
                {status && (
                    <div
                        className="myStoreSocialMediaToggleButtonActive"
                        onClick={() => {
                            handleBlockchainsPull(`${item?.name}`);
                            setStatus(false);
                        }}
                    >
                        <div className="myStoreSocialMediaTogglerActive"></div>
                    </div>
                )}
            </div>
        </>
    )
}

export default React.memo(BlockchainCard)