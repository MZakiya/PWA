import React from "react";
import './asn_other_info.css';
import PdfIcon from '../images/pdf-icon.svg';
import { FREGHT_DATE_FIELDS, FREIGHT_LABELS } from "../constants";
import { downloadBase64File, formatDate } from "../utils/utils";

const AsnOtherInfo = (props) => {
    const { asnData } = props;
    return (
        <div className="asn-other-info-container">
            <div className="asn-other-info-wrapper">
                <div className="asn-orgs-info">
                    <div className="asn-org">
                        <div className="asn-org-name-row">
                            <div className="asn-org-name">{`${asnData?.supplier?.companyName}`}</div>
                            <div className="asn-org-chip-container"><div className="asn-org-chip">Supplier</div></div>
                        </div>
                        <div className="asn-org-address">
                            {`${asnData?.supplier?.addresses && asnData?.supplier?.addresses.length ? asnData?.supplier?.addresses[0]['address'] : '-'}`}
                        </div>
                        <div className="asn-gst-row">
                            <div className="asn-gst-text">GST No: </div>
                            <div className="asn-gst-val">{`${asnData?.supplierGST}`}</div>
                        </div>
                        <div className="asn-ship-from-container">
                            <div className="asn-ship-from-text">Ship From: </div>
                            <div className="asn-ship-from-val">{`${asnData?.shipFrom}`}</div>
                        </div>
                        <div className="asn-user-container">
                            <div className="asn-user">{`${asnData?.createdBySupplierUser?.firstName || ''} ${asnData?.createdBySupplierUser?.lastName || ''}`}</div>
                            <div className="asn-user-contact">{`${asnData?.createdBySupplierUser?.mobile || '-'} | ${asnData?.createdBySupplierUser?.email || ''}`}</div>
                        </div>
                    </div>
                    <div className="asn-org">
                        <div className="asn-org-name-row">
                            <div className="asn-org-name">{`${asnData?.buyer?.companyName}`}</div>
                            <div className="asn-org-chip-container"><div className="asn-org-chip">Buyer</div></div>
                        </div>
                        <div className="asn-org-address">
                            {`${asnData?.buyer?.addresses && asnData?.buyer?.addresses.length ? asnData?.buyer?.addresses[0]['address'] : '-'}`}
                        </div>
                        <div className="asn-gst-row">
                            <div className="asn-gst-text">GST No: </div>
                            <div className="asn-gst-val">{`${asnData?.buyerGST}`}</div>
                        </div>
                        <div className="asn-ship-from-container">
                            <div className="asn-ship-from-text">Ship From: </div>
                            <div className="asn-ship-from-val">{`${asnData?.shipFrom}`}</div>
                        </div>
                        <div className="asn-user-container">
                            <div className="asn-user">{''}</div>
                            <div className="asn-user-contact">{ }</div>
                        </div>
                    </div>
                </div>
                <div className="asn-freight-forward-info">
                    <div className="asn-freight-forward-title">Freight Forward Info</div>
                    {
                        asnData?.asnFreightForwardInfoList && asnData?.asnFreightForwardInfoList.length ?
                            asnData?.asnFreightForwardInfoList.map(asnFreightItem => (
                                <table className="freight-table">
                                    {
                                        Object.keys(asnFreightItem).map(key => (
                                            <tr>
                                                <td className="freight-h">{FREIGHT_LABELS[key]}</td>
                                                <td className="freight-v">{asnFreightItem[key] ? (FREGHT_DATE_FIELDS.includes(key) ? formatDate(new Date(asnFreightItem[key])) : asnFreightItem[key]) : '-'}</td>
                                            </tr>
                                        ))
                                    }
                                </table>
                            )) : null
                    }

                </div>
                {
                    asnData?.asnFileInfoList && asnData?.asnFileInfoList.length ? asnData?.asnFileInfoList.map(fileItem =>
                        (<div className="asn-files-container">
                            <div className="asn-file-info-row" onClick={() => downloadBase64File(fileItem?.mediaURL, fileItem?.fileName) }>
                                <div className="asn-file-col">
                                    <div><img src={PdfIcon} /></div>
                                </div>
                                <div className="asn-file-col">
                                    <div className="asn-file-name">{fileItem?.fileName}</div>
                                    <div className="asn-file-creator">{`${asnData?.createdByName || '-'} ${asnData?.createdTime ? formatDate(new Date(asnData?.createdTime)) : ''}`}</div>
                                </div>
                            </div>
                        </div>)
                    ) : null
                }

            </div>
        </div>
    );
}

export default AsnOtherInfo;