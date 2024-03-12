import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PublicClientApplication,EventType} from '@azure/msal-browser';
import { msalConfig } from './Authentication/authConfiguration';
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from 'react';
const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback( async (event) => {
  msalInstance.enableAccountStorageEvents();
  if (
      (event.eventType === EventType.LOGIN_SUCCESS ||
          event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
          event.eventType === EventType.SSO_SILENT_SUCCESS) &&
      event.payload.account
  ) {
      msalInstance.setActiveAccount(event.payload.account);
      console.log(event.payload.account
        ,"event.payload.account");
      window.sessionStorage.setItem("TokenId",event.payload.idToken);
      window.sessionStorage.setItem("userEmailId",event.payload.idTokenClaims.emails[0]);
       window.sessionStorage.setItem("useraud",event.payload.idTokenClaims.aud);
       window.sessionStorage.setItem("username",event.payload.idTokenClaims.given_name)
  }

});


 ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
     <App instance ={msalInstance}/>
     </BrowserRouter>
     </StrictMode>,
   document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
