import React from "react";
import './view_finder.css';
import BackIcon from '../images/back.svg'
import { useNavigate } from "react-router-dom";

const ViewFinder = () => {
    const navigate = useNavigate();

    return (
        <div className="view-finder-container">
            <div className="qrplace-text">
                <div>
                    <div className="back-icon">
                        <img src={BackIcon} onClick={() => navigate(-1)} alt="back" />
                    </div>
                </div>
                <div>
                    <div className="qrplace-text1">Place the QR code inside the area</div>
                    <div className="qrplace-text2">scannig will start automatically</div>
                </div>

            </div>
            <div className='view-finder'>&nbsp;</div>
            <div className="scan-qr-text">
                Scan the QR code and get the ASN details
            </div>
        </div>

    )
}

export default ViewFinder;