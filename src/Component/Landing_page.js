import React ,{useRef}from "react";
import { Container, Navbar, Tab, Tabs, Nav, Row, Col } from "react-bootstrap";
import Headerlogo from "../Images/Electrolux Logo white.png";
import iconimg from "../Images/Power Soak Configurator Logo.png";
import "../CSS/Landing_page.css";
import sinkimage from "../Images/Power-Soak-Teaser-Image.png";
import Carousel from "react-bootstrap/Carousel";
import { loginRequest, b2cPolicies } from '../Authentication/authConfiguration';
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import pdf1 from "../Images/PowerSoak_Automation.pdf"
import {
    useMsal,
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
  } from "@azure/msal-react";

import { useEffect } from 'react'; 

function LangingPage() {
  const { instance, inProgress } = useMsal();
  const ref = useRef(null);
  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest);
  };


  const handlePdfLinkClick = () => {
    window.open(pdf1);
  };


  return (
    <>
      <div className="Landing-page">
        <Navbar>
          <Container>
            <div className="header">
              <img src={Headerlogo} className="Headerlogo" alt="logo" />
            </div>
          </Container>
        </Navbar>
        <Container fluid>
          <Row>
            <div>
              <Row>
                <Col lg={12} xs={12} sm={12} md={12}>
                  <div className="icon-title">
                    <h1 className="title ">
                      <img className="img" src={iconimg} />
                      Power Soak Configurator
                    </h1>
                  </div>
                </Col>
              </Row>

              <div>
                <Row>
                  <Col lg={7} xs={12} sm={12} md={7}>
                    <div className="content-page">
                      <h2 className="title-2">
                        Tailer Power Soak to perfectly match your kitchen's
                        needs!
                      </h2>
                      <p className="paragraph mt-3 pt-3">
                        Here is our user-friendly product configurator - A tool
                        to tailor your product to perfection, aligning
                        seamlessly with your kitchen's unique specifications.
                        With our configurator, you now have the power to
                        personalize and adapt the product to your requirements,
                        ensuring a flawless fit for your kitchen.
                      </p>
                    </div>
                    <div className="buttons" >
                      {/* <button>REGISTRATION</button> */}
                      <button className="btn btn-warning" onClick={handleLoginRedirect}>Get Started</button>
                      {/* <button  onClick={handleLogoutRedirect}>SIGN OUT</button> */}
                    </div>
                  </Col>
                  <Col lg={5} xs={12} sm={12} md={5}>
                    <div className="sinkimages">
                      <Carousel data-bs-theme="dark " className="dark ">
                      {/* interval={500} */}
                        <Carousel.Item   >
                          <img
                            src={sinkimage}
                            className="d-block  "
                            alt="..."
                          />
                        </Carousel.Item>
                       
                        <Carousel.Item  >
                          <img
                            src={sinkimage}
                             className="d-block"
                            alt="..."
                          />
                        </Carousel.Item>
                        <Carousel.Item  >
                          <img
                            src={sinkimage}
                            className="d-block "
                            alt="..."
                          />
                        </Carousel.Item>
                      </Carousel>
                    </div>

                  
                    <footer>
                      <Container>
                        <Nav className="footerpage">
                          <div
                            className="footer"
                            // style={{ position: "relative" }}
                          >
                            <div className="footer1 me-1 mb-2">
                              <a href="mailto:cseast2_inbox@electroluxprofessional.com">Contact Us</a>
                            </div>
                            <div className="footer2 mb-2">
                              <a href="#" onClick={handlePdfLinkClick} >User Manual</a>
                            </div>
                            <div className="footer3 mb-2">
                              <a
                                href="https://www.linkedin.com/company/electrolux-professional-group"
                                className="me-4 text-reset"
                              >
                              <FaLinkedinIn  className="social-media-icons"/>
                              </a>
                              <a
                                href="https://twitter.com/ElectroluxPro"
                                className="me-4 text-reset"
                              >
                               <FaXTwitter  className="social-media-icons"/>
                              </a>
                              <a
                                href="https://www.facebook.com/electroluxprofessional"
                                className="me-4 text-reset"
                              >
                             <FaFacebookF  className="social-media-icons"/>
                              </a>
                              <a
                                href="https://www.instagram.com/electroluxpro/"
                                className="me-4 text-reset"
                              >
                                <FaInstagram className="social-media-icons"/>
                              </a>
                              <a
                                href="https://www.youtube.com/c/electroluxprofessionalglobal"
                                className="me-4 text-reset"
                              >                           
                                <FaYoutube  className="social-media-icons" />
                              </a>
                             
                            </div>
                          </div>
                        </Nav>
                      </Container>
                    </footer>
                  </Col>
                </Row>            
              </div>
            </div>
          
          </Row>
        </Container>
      </div>
    </>
  );
}

export default LangingPage;
