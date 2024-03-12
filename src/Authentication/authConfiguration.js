import { LogLevel } from "@azure/msal-browser";
export const b2cPolicies = {
    names: {
        signUpSignIn: process.env.REACT_APP_b2CPOlICIES_SIGNUPSIGNIN_AUTHORITY,
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://eprstaging.b2clogin.com/eprstaging.onmicrosoft.com/'+ process.env.REACT_APP_b2CPOlICIES_SIGNUPSIGNIN_AUTHORITY,
        }
    },
    authorityDomain: process.env.REACT_APP_AUTHORITY_DOMAIN,
}

export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_B2C_CLIENTID ,
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: process.env.REACT_APP_AUTH_REDIRECT,
        postLogoutRedirectUri:"/",
        navigateToLoginRequestUrl:false   
    },
    cache: {
        cacheLocation: "sessionStorage", 
        storeAuthStateInCookie: false, 
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }	
            }	
        }	
    }
};
export const protectedResources = {
      //endpoint: process.env.REACT_APP_protectedResources_endpoint,
    apiPowerSoak: {
        scopes: {
            read: [process.env.REACT_APP_APIPOWERSOAK_SCOPES_READ],
            write: [process.env.REACT_APP_APIPOWERSOAK_SCOPES_WRITE],
        },
    },
};

export const loginRequest = {
    //...protectedResources.apiPowerSoak.scopes.read,...protectedResources.apiPowerSoak.scopes.write
    scopes: []
};

