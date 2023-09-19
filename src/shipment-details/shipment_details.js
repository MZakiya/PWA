import React from "react";
import { formatDate } from "../utils/utils";
import './shipment_details.css';

const ShipmentDetails = (props) => {
    const {asnData} = props;
    return (
        <div className="shipment-details-container">
            <div className="shipment-details-wrapper">
            <div className="shipment-heading">Shipment Details</div>
            <div className="wt-vol-row">
                <div className="wt-vol-col">
                    <div className="wt-vol-h">Tot. gr. wt.</div>
                    <div className="wt-vol-v">{`${asnData?.asnShipmtDetails?.totalGrossWeight || '-'} ${asnData?.asnShipmtDetails?.grossWeightUnits || ''}`}</div>
                </div>
                <div className="wt-vol-col">
                    <div className="wt-vol-h">Tot. net. wt.</div>
                    <div className="wt-vol-v">{`${asnData?.asnShipmtDetails?.totalNetWeight || '-'} ${asnData?.asnShipmtDetails?.netWeightUnits || ''}`}</div>
                </div>
                <div className="wt-vol-col">
                    <div className="wt-vol-h">Total Vol.</div>
                    <div className="wt-vol-v">{`${asnData?.asnShipmtDetails?.totalVolume || '-'} ${asnData?.asnShipmtDetails?.volumeUnits || ''}`}</div>
                </div>
            </div>
            <div className="dates-row">
                <div className="dates-col">
                    <div className="dates-h">Delivery Date</div>
                    <div className="dates-v">{asnData?.asnShipmtDetails?.deliveryDateETA ? formatDate(new Date(asnData?.asnShipmtDetails?.deliveryDateETA)) : '-'}</div>
                </div>
                <div className="dates-col">
                    <div className="dates-h">Shipping Date</div>
                    <div className="dates-v">{asnData?.asnShipmtDetails?.shippingDate ? formatDate(new Date(asnData?.asnShipmtDetails?.shippingDate)) : '-'}</div>
                </div>
                
            </div>
            </div>
            
        </div>
    )
}

export default ShipmentDetails;