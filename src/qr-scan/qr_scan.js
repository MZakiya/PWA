import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import './qr_scan.css';
import ViewFinder from './view_finder';


const QrScanner = (props) => {
  const [data, setData] = useState('No result');
  const [facingMode, setFacingMode] = useState('environment');

  const navigate = useNavigate();

  const toggleFacingMode = e => {
      setFacingMode(facingMode == 'environment' ? 'user' : 'environment');
  }


  return (
    <div className='qr-reader-container'>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            navigate('/asndetails?scannedText=' + (encodeURIComponent(result?.text)));
            // navigate('/asndetails?scannedText=' + (encodeURIComponent("http://localhost:3000/asn?henXpEPXfLyfNMqcZxfP884ZWX+j5z6ehxz6VJNjINE0hcf2hvZdqvc5pL98SBio7AltyNJNhwSuhXJTSk/0dTe6Q40oD3YYv/W0quZdw1xJ+4IYC0VDwkFi58pYYIHZMaDdXmceeOx+GD/LDPUm6bR94N5iAXw2I1ZtLcw00xA=")))
          }
        }}
        constraints={{facingMode: facingMode}}
        style={{ width: '100%', height: '100%' }}
        ViewFinder={ViewFinder}
      />
    </div>
  );
};

export default QrScanner;