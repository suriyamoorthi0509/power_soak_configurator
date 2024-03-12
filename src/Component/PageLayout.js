import { useEffect } from "react";
import { NavigationBar } from "./NavigationBar";
import {
    useMsal,
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
  } from "@azure/msal-react";
export const PageLayout = (props) => {
    const { instance, inProgress } = useMsal();
    return (
        <>
          {/* <NavigationBar /> */}
         
            {props.children} 
        </>
    );
}