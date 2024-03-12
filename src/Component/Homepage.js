import React, { component,useState } from "react";
import { Container, Navbar, Tab, Tabs} from "react-bootstrap";
import Headerlogo from "../Images/Headerlogo4.png";
import "../CSS/Homepage.css";
import Automation from "./Automation";
import Dashboard from "./Dashboard";
import { FaUserTie } from "react-icons/fa6";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  useMsal
} from "@azure/msal-react";
function Home() {
 
  const [userData,setUserData] =useState([])
  const { instance } = useMsal();

    const handleLogoutRedirect = () => {
      sessionStorage.clear();
        instance.logoutRedirect();
       
    };

  
  return (
    <>
      <div className="Home">
        <div className="headerbar">
          
          <Navbar>
        
            <Container>
             
              <Navbar.Brand>
                <img src={Headerlogo} className="Headerlogo container" />
              </Navbar.Brand>
            </Container>
            <h2><FaUserTie  className="usernameicon"/></h2>
            <h4 className="namedashbord"> {sessionStorage.getItem("username")}</h4>
            <button type="button" onClick={handleLogoutRedirect} className="Signoutbutton">
                  Sign out
                </button>          
          </Navbar>
        </div>
        
        <div className="CAD-header">    
          <Tabs defaultActiveKey="Automation" className="myClass">
            <Tab eventKey="Automation"  title="PowerSoak Configurator">
              <Automation userData={userData} />
            </Tab>
            {(process.env.REACT_APP_ISDESIGN_USER =="true" || sessionStorage.getItem("userEmailId") == process.env.REACT_APP_ADMIN_EMAIL)  && 
            <Tab eventKey="Dashboard" title="PowerSoak Dashboard">
              <Dashboard setUserData={setUserData}   />


            </Tab>
             }
          </Tabs>
          
        </div>
      </div>
    </>
  );
}

export default Home;
<Container>
<Row>
  <Col>1 of 2</Col>
  <Col>2 of 2</Col>
</Row>
<Row>
  <Col>1 of 3</Col>
  <Col>2 of 3</Col>
  <Col>3 of 3</Col>
</Row>
</Container>