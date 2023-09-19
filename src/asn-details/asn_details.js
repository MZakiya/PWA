import React, { useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './asn_details.css';
import BackIcon from '../images/back.svg';
import ShipmentDetails from "../shipment-details/shipment_details";
import AsnPoDetails from "../asn_po_details/asn_po_details";
import AsnOtherInfo from "../asn_other_info/asn_other_info";
import useQuery from '../hooks/query_params';
import { GET_ASN_CONTENT_URL, GET_ASN_URL } from "../constants";
import axios from "axios";
import { getUserInfoFromLocalStorage } from "../utils/localstorage";
import { useNavigate } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AsnDetails = () => {
  const [value, setValue] = React.useState(0);
  const [asnData, setAsnData] = useState({});
  const navigate = useNavigate();
  let query = useQuery();

  useEffect(() => {
    let scannedText = query.get('scannedText');
    if (scannedText && scannedText.indexOf('/asn?') != -1) {
      let encryptedText = scannedText.substring(scannedText.indexOf('/asn?') + 5);
      encryptedText = decodeURI(encryptedText);
      if (encryptedText) {
        getDecryptedText(encryptedText.trim());
      }
    }
  }, [])

  const getDecryptedText = async (encryptedText) => {
    let userId = getUserInfoFromLocalStorage('userId');
    let token = getUserInfoFromLocalStorage('token');
    let tenant = getUserInfoFromLocalStorage('tenant') || 'default';
    const response = await axios({
      method: "post",
      url: GET_ASN_CONTENT_URL,
      data: { encryptedText: encryptedText },
      headers: { "Content-Type": "application/json", tenant, 'Authorization': 'Bearer ' + token },
    })
    let decyptedText = response?.data?.resourceData;
    if (decyptedText) {
      const urlParams = new URLSearchParams(decyptedText);
      const asnNumber = urlParams.get('asnId');
      if(asnNumber) {
        getAsnDetails(asnNumber);
      }
    }
  }

  const getAsnDetails = async (asnNumber) => {
    let userId = getUserInfoFromLocalStorage('userId');
    let token = getUserInfoFromLocalStorage('token');
    let tenant = getUserInfoFromLocalStorage('tenant') || 'default';
    const response = await axios({
      method: "post",
      url: GET_ASN_URL,
      data: { asnNumber: asnNumber },
      headers: { "Content-Type": "application/json", tenant, 'Authorization': 'Bearer ' + token },
    })
    let asnRes = response?.data?.resourceData;
    if(asnRes) {
      setAsnData(asnRes);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="asn-details-page">
      <div className="asn-header-container">
        <div className="back-icon">
          <img src={BackIcon} onClick={() => navigate(-1)} alt="back" />
        </div>
        <div className="asn-number">{`${asnData?.asnNumber} -`}</div>
        <div className="supplier-name">{`${asnData?.supplier?.companyName}`}</div>
      </div>
      <div>

        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
          <Tab label="Item Details" {...a11yProps(0)} />
          <Tab label="Other Info" {...a11yProps(1)} />
        </Tabs>

        <CustomTabPanel value={value} index={0} className="shipment-panel">
          <ShipmentDetails asnData={asnData} />
          {
            asnData?.itemDataList && asnData?.itemDataList.length ? asnData?.itemDataList.map(itemData => <AsnPoDetails itemData={itemData}/>) : null
          }
          
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} className="other-info-panel">
          <AsnOtherInfo asnData={asnData}/>
        </CustomTabPanel>
      </div>

    </div>
  )
}

export default AsnDetails;