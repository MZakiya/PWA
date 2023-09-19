import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Login from './login/login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Asn from './asn/asn_homepage';
import Qrscan from './qr-scan/qr_scan';
import AsnQrReader from './asn/asn_qr';
import QrScanner from './qr-scan/qr_scan';
import AsnDetails from './asn-details/asn_details';
import { Provider } from 'react-redux'
import store from './store';
import SimpleSnackbar from './snackbar/snackbar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/asn",
    element: <Asn />,
  },
  {
    path: "/qr",
    element: <QrScanner />,
  },
  {
    path: '/asndetails',
    element: <AsnDetails />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <SimpleSnackbar />
      <RouterProvider router={router} />
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
