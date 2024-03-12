import { useEffect ,useState } from "react";
import "./App.css";
import { StoreProvider, createStore } from "easy-peasy";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Component/Homepage";
import Login from "./Component/Login";
import Swal from "sweetalert2";
import models from "./models";
import RequireAuth from "./Component/RequireAuth";
import Dashboard from "./Component/Dashboard";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import LangingPage from "./Component/Landing_page";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { PageLayout } from "./Component/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
const storeModel = createStore(models);
const Pages = () => {
  const { instance, accounts } = useMsal();  
  const [logoutTime, setLogoutTime] = useState(true);
  const TIMEOUT = 30 * 60 * 1000;
  const SessionExpiredPopup = () => {
    Swal.fire({
      position: "center",
      icon: "warning",
      customClass: {
        icon: 'warningError',
      },
      title: "Session Expired ",
      showConfirmButton: false,
     showConfirmButton: true,
      width: "600px",
    }).then((result) => {
      sessionStorage.clear();
      instance.logoutRedirect();
    });
  };
useEffect (()=>{
 let timeout
 const currentAccount = instance.getActiveAccount();
 if(currentAccount){
 }

if(sessionStorage.getItem("TokenId")){
 const resetTimer =()=>{
  clearTimeout(timeout)
   timeout = setTimeout(()=>{
    SessionExpiredPopup();
    },TIMEOUT)
 }
 const handleUserActivity = ()=>{
  if(!logoutTime){
  setLogoutTime(true);
  }
  resetTimer();
 }
 window.addEventListener('mousemove', handleUserActivity);
  window.addEventListener('mousedown', handleUserActivity);
  window.addEventListener('keypress' , handleUserActivity);
  window.addEventListener('scroll' , handleUserActivity);
 resetTimer();
 return () => {
  window.removeEventListener('mousemove', handleUserActivity);
  window.removeEventListener('mousedown', handleUserActivity);
  window.addEventListener('keypress' , handleUserActivity);
  window.addEventListener('scroll' , handleUserActivity);
  clearTimeout(timeout);
  }
}
},[instance.idTokenClaims, sessionStorage.getItem("TokenId"), logoutTime, TIMEOUT])

 


  return (
    <StoreProvider store={storeModel}>
{sessionStorage.getItem("TokenId")?
      <Routes>
        <Route
          exact
          path="/"
          element={
            <UnauthenticatedTemplate>
              <LangingPage />
            </UnauthenticatedTemplate>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/homepage"
          element={
            <AuthenticatedTemplate>
              <Homepage />
            </AuthenticatedTemplate>
          }
        />

      </Routes>
      :
      <Routes>
        <Route
          exact
          path="*"
          element={
            <UnauthenticatedTemplate>
              <LangingPage />
            </UnauthenticatedTemplate>
          }
        ></Route>
        </Routes>
}
       
    </StoreProvider>
  );
};

function useAccessToken() {    
  const { instance, accounts } = useMsal();  
    const [accessToken, setAccessToken] = useState(null);
    if (accounts.length > 0) { 
      const request = {scopes: ["User.Read"],   account: accounts[0]    };    
          instance.acquireTokenSilent(request).then(response => {  setAccessToken(response.accessToken);   }).
          catch(error => { if (error instanceof InteractionRequiredAuthError) 
             instance.acquireTokenPopup(request)
            .then(response => {   setAccessToken(response.accessToken);  });  } )}
    return accessToken
}

function App({ instance }) {
  return (
    <>
      <MsalProvider instance={instance}>
        <PageLayout>
          <Pages />
        </PageLayout>
      </MsalProvider>
    </>
  );
}

export default App;
