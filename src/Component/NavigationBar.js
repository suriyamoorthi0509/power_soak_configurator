import { Nav, Navbar, Dropdown, DropdownButton, Button } from 'react-bootstrap';
// import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest, b2cPolicies } from '../Authentication/authConfiguration';
import {
    useMsal,
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
  } from "@azure/msal-react";
import { useEffect } from 'react'; 

export const NavigationBar = () => {

    const { instance, inProgress } = useMsal();
   
    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest).catch((error) => console.log(error));  
    };
    const handleLogoutRedirect = () => {
        instance.logoutRedirect();
    };
    
    return (
        <>
           <Navbar bg="primary" variant="dark" className="navbarStyle">
                <a className="navbar-brand" href="/">
                    Microsoft identity platform
                </a>
                {/* <AuthenticatedTemplate> */}
                    <div className="collapse navbar-collapse justify-content-end">
                        <DropdownButton
                            variant="warning"
                            drop="start"
                            //title={activeAccount && activeAccount.username ? activeAccount.username : 'Unknown'}
                        >
                            <Dropdown.Item as="button" onClick={handleLogoutRedirect}>
                                Sign out using Redirect
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                {/* </AuthenticatedTemplate> */}
                <UnauthenticatedTemplate>
                    <div className="collapse navbar-collapse justify-content-end">
                        <DropdownButton variant="secondary" className="ml-auto" drop="start" title="Sign In">
                            <Dropdown.Item as="button" onClick={handleLoginRedirect}>
                                Sign in using Redirect
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </UnauthenticatedTemplate>
            </Navbar>
        </>
    );
};
