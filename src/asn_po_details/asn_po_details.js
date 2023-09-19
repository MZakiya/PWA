import React from "react";
import './asn_po_details.css';

const AsnPoDetails = (props) => {
    const {itemData} = props;
    return(
        <div className="po-details-wrapper">
            <div className="po-heading-row">
                <div className="po-num">{`${itemData?.poNumber || '-'}`}</div>
                <div className="po-val">{`${itemData?.customerQty || '-'}`}</div>
            </div>
            <div className="po-part-num">
            {`${itemData?.partNum || '-'}`}
            </div>
            <div className="po-part-desc">
            {`${itemData?.partDesc || '-'}`}
            </div>
            <div className="part-details-wrapper">
                <div className="part-details-row">
                    <div className="part-details-col">
                        <div className="part-details-subrow">
                            <div className="part-details-subrow-h">Tot. gr. wt.</div>
                            <div className="part-details-subrow-v">{`${itemData?.grossWt || '-'} ${itemData?.grossWtUnit || ''}`}</div>
                        </div>
                        <div className="part-details-subrow">
                            <div className="part-details-subrow-h">Tot. net. wt.</div>
                            <div className="part-details-subrow-v">{`${itemData?.netWt || '-'} ${itemData?.netWtUnit || ''}`}</div>
                        </div>
                    </div>
                    <div className="part-details-col">
                        <div className="part-details-subrow">
                            <div className="part-details-subrow-h">C. Batch No</div>
                            <div className="part-details-subrow-v">{`${itemData?.customerBatchNumber || '-'}`}</div>
                        </div>
                        <div className="part-details-subrow">
                            <div className="part-details-subrow-h">S. Batch No.</div>
                            <div className="part-details-subrow-v">{`${itemData?.supplierBatchNumber || '-'}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AsnPoDetails;