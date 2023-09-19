import React from "react";
import MobileHeader from "../mobile-header/mobile-header";
import './asn_homepage.css';
import AsnCardImg from '../images/asn_tracker_card.png';
import { useNavigate } from "react-router-dom";

const Asn = () => {

    const navigate = useNavigate();

    const scanQr = () => {
        console.log('navigating');
        navigate("/qr");
    }

    return (
        <div className="asn-home-container">
            <MobileHeader />
            <div className="asn-home">
                <img onClick={scanQr} className="asnCardImg" src={AsnCardImg} />
            </div>
        </div>
    )
}

export default Asn;