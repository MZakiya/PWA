export const LOCAL_URL = "http://localhost:8572";
export const QA_URL = "https://qa.zumen.com";
export const MRP_URL = "https://mrp.zumen.com";
export const PROD_URL = 'https://'+window.location.hostname;
export const BASE_URL = PROD_URL;
export const LOGIN_URL = BASE_URL + "/userauth/oauth/token";
export const PROFILE_IMG_URL = BASE_URL + "/api/v1/user/profile/image?";
export const USER_DETAILS_URL = BASE_URL + "/api/v1/user/login/details?";
export const GET_ASN_URL = BASE_URL + "/api/v1/asn/get/asn";
export const GET_ASN_CONTENT_URL = BASE_URL + "/api/v1/asn/decrypt";
export const GET_TENANT_URL = BASE_URL + "/api/v1/free/public/get/orgdomaininfo";
export const LOGOUT_URL = BASE_URL + "/userauth/oauth/revokeToken/1/";

export const publicKeyRSA = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCb6UbdaP7pIGCjWDWFxyUk/MZp0LW1aheUQ2Ggbn7Kw4QYGFK3dH5yjcIm8whjnx2qim0wreTv0KqbmGHZSHjL/Gu9mnY9bZL1CPx4mEZ8Q5qCCiU0eK/5VkDA5bwPmX2JGt0TIv3uCy7Kb6ts6CNCKyYqQK8hh81aigy2k/rZdQIDAQAB';
export const FREIGHT_LABELS = {
    'bol_awb_number': 'BOL# / AWB#',
    'bookingDate': 'Booking Date',
    'carrierParty': 'Carrier Party',
    'carrierSCAC': 'Carrier SCAC',
    'containerLoadCategory': 'Container Load Category',
    'destination': 'Destination',
    'etaFinalDestination': 'ETA Final Destination',
    'etaPort': 'ETA Port',
    'etd': 'ETD',
    'freightInvoiceNumber': 'Freight Invoice Number',
    'hbl_awb_number': 'HBL / AWB#',
    'port': 'Port',
    'readyDateByShipper': 'Ready Date By Shipper',
    'remarks': 'Remarks',
    'shipFrom': 'Ship From',
    'shipmentMode': 'Shipment Mode',
    'shipmentRecievedDate': 'Shipment Received Date',
    'shipperName': 'Shipper Name',
    'shipperRefNumber': 'Shipper Ref No.',
    'status': 'Status',
    'vesselName': 'Vessel Name',
};

export const FREGHT_DATE_FIELDS = ['bookingDate', 'etaFinalDestination', 'etaPort', 'etd', 'readyDateByShipper', 'shipmentRecievedDate']

