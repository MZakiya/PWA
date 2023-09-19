import React, { useState } from "react";
import './login.css';
import LogoImg from '../logo.svg';
import { Button } from "@mui/base";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../redux/snackbarSlice";
import axios from "axios";
import { GET_TENANT_URL, LOGIN_URL, PROFILE_IMG_URL, publicKeyRSA, USER_DETAILS_URL } from "../constants";
import JSEncrypt from 'jsencrypt';
import { getUserInfoFromLocalStorage, setUserInfoInLocalStorage } from "../utils/localstorage";

function Login() {
    // const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const getTenantInfo = async () => {
        const reqBody = { id: email }
        const response = await axios.post(GET_TENANT_URL, reqBody);
        return response;
    }

    const login = async () => {
        // encrypt password
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKeyRSA);
        const passwordEnc = encrypt.encrypt(password);

        // hostname
        let baseURL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const hostName = btoa(baseURL);

        // timezone
        let TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timeZone = btoa(TZ);

        let tenant = getUserInfoFromLocalStorage('tenant') || 'default';

        var bodyFormData = new FormData();
        bodyFormData.append('grant_type', 'password');
        bodyFormData.append('username', email);
        bodyFormData.append('password', passwordEnc);
        bodyFormData.append('roleId', 1);
        bodyFormData.append('host', hostName);
        bodyFormData.append('tz', timeZone);
        bodyFormData.append('tfa_code', undefined);
        bodyFormData.append('tfa_token', undefined);

        const response = await axios({
            method: "post",
            url: LOGIN_URL,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data", tenant },
        })
        return response;
    }

    const getUserDetails = async () => {
        let userId = getUserInfoFromLocalStorage('userId');
        let token = getUserInfoFromLocalStorage('token');
        let tenant = getUserInfoFromLocalStorage('tenant') || 'default';
        const response = await axios({
            method: "get",
            url: USER_DETAILS_URL + 'userId=' + userId,
            headers: { "Content-Type": "application/json", tenant, 'Authorization': 'Bearer ' + token },
        })
        return response;
    }

    const getUserAvatar = async () => {
        let userId = getUserInfoFromLocalStorage('userId');
        let token = getUserInfoFromLocalStorage('token');
        let tenant = getUserInfoFromLocalStorage('tenant') || 'default';
        const response = await axios({
            method: "get",
            url: PROFILE_IMG_URL + 'userId=' + userId + '&userIdForImage=' + userId,
            headers: { "Content-Type": "application/json", tenant, 'Authorization': 'Bearer ' + token },
        })
        return response;
    }

    const initiateLogin = async () => {
        if (!email || !password) {
            dispatch(showSnackBar({ message: 'Please enter email and password', severity: 'error' }));
            return;
        }
        try {
            // retrieve tenant info then make login call
            let tenantResponse = await getTenantInfo();

            let userOrgDomainInfo = tenantResponse?.data?.resourceData;
            setUserInfoInLocalStorage('tenant', userOrgDomainInfo?.tenant || userOrgDomainInfo?.orgName || 'default');

            // making login call
            let loginResponse = await login();
            let token = loginResponse?.data?.access_token;
            let userId = loginResponse?.data?.id;
            setUserInfoInLocalStorage('token', token);
            setUserInfoInLocalStorage('userId', userId);

            if (token) {
                // retrive user details
                let userDetailsResponse = await getUserDetails();
                let userDetailsData = userDetailsResponse?.data?.resourceData;
                if (userDetailsData) {
                    let addressDetail = userDetailsData?.addressDetail;
                    let buyerId = userDetailsData?.buyerId;
                    let companyName = userDetailsData?.companyName;
                    let email = userDetailsData?.email;
                    let fullName = userDetailsData?.fullName;
                    let supplierId = userDetailsData?.supplierId;
                    let contactNo = userDetailsData?.contactNo;
                    setUserInfoInLocalStorage('addressDetail', addressDetail);
                    setUserInfoInLocalStorage('buyerId', buyerId);
                    setUserInfoInLocalStorage('companyName', companyName);
                    setUserInfoInLocalStorage('email', email);
                    setUserInfoInLocalStorage('fullName', fullName);
                    setUserInfoInLocalStorage('supplierId', supplierId);
                    setUserInfoInLocalStorage('contactNo', contactNo);

                    // retrieve user avatar
                    let avatarResponse = await getUserAvatar();
                    let avatarBase64 = avatarResponse?.data?.resourceData?.profilePhotoURL;
                    setUserInfoInLocalStorage('avatar', avatarBase64);
                    console.log(avatarBase64);
                }
            }
            navigate("/asn");
        } catch(e) {
            dispatch(showSnackBar({message: 'Unable to login', severity: 'error'}))
        }
        
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    return (
        <div className="login-page">
            <div className="bg-div">
                <div className="bg-div-row1">
                    <div className="bg-div1">
                        &nbsp;
                    </div>
                    <div className="bg-div2">
                        &nbsp;
                    </div>
                </div>
                <div className="bg-div-row2">
                    <div className="bg-div3">
                        &nbsp;
                    </div>
                    <div className="bg-div4">
                        &nbsp;
                    </div>
                </div>
            </div>
            <div className="login-container">
                <div className="logo">
                    <img src={LogoImg} />
                </div>
                <div className="signin-text1">
                    Log in with email
                </div>
                <div className="signin-text2">
                    Sign in with registered email
                </div>
                <div className="signin-text3">
                    address to continue
                </div>
                <div className="form-container">

                    <div className="email-field">
                        <div className="email-container">
                            <div className="label-container">
                                <label className="labelText" htmlFor="user-email">Email</label>
                            </div>
                            <input
                                id="user-email"
                                aria-describedby="user-email"
                                className="user-email-input"
                                placeholder="Enter Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                    </div>

                    <div className="password-field">
                        <div className="password-container">
                            <div className="label-container">
                                <label className="labelText" htmlFor="user-password">Password</label>
                            </div>
                            <input
                                id="user-password"
                                aria-describedby="user-password"
                                type="password"
                                className="user-password-input"
                                placeholder="Enter Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>

                    </div>
                    <button className="signin-btn" onClick={() => initiateLogin()} >Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
