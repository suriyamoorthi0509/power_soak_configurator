import React from "react";
import { Card, Col, Row,InputGroup,Form } from "react-bootstrap";
import "../CSS/Dashboard.css";
import { useState, useEffect } from "react";
import Refresh from "../Images/Refresh.png";
import JSON_ICON from "../Images/json_icon.svg";
import LOG_ICON from "../Images/log_icon.svg";
import ZIP_ICON from "../Images/zip_icon.svg";
import DWG_ICON from "../Images/dwg_icon.svg";
import PDF_ICON from "../Images/pdf_icon.svg";
import XLSX_ICON from "../Images/xlsx-icon.svg";
import { getPSAJobList } from "../services/dashboardService";
import { Pagination } from "react-bootstrap";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSync } from "react-icons/ai";
import ApiErrorMessage from "../Component/ErrorMessagePopUp";

const SECRET_PASS = CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916");

function Dashboard(props) {
  const [Users, fetchUsers] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const[itemsPerPage ,setitemsPerPage] =useState(20)
  const [isLoading, setIsloding] = useState(false);
  const useremail = sessionStorage.getItem("userEmailId");
  const accessToken = sessionStorage.getItem("TokenId");


  const handleClick = (id, format) => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    };

    fetch(
      `${process.env.REACT_APP_CURRENT_SERVER_URL}/api/PsautoJobs/DownloadFile/${id}/${format}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Network response was not ok.");
        }
      })

      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${id}.${format}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
       ApiErrorMessage(error)
      });
  };

  const pendingData= () => {
    var config = {
      method: "GET",
      url:
        sessionStorage.getItem("userEmailId") ==
        process.env.REACT_APP_ADMIN_EMAIL
          ? process.env.REACT_APP_CURRENT_SERVER_URL +
            `/api/PsautoJobs/GetAllUsersPsautoJobs`
          : process.env.REACT_APP_CURRENT_SERVER_URL +
            `/api/PsautoJobs/GetUserPsautoJobs/${useremail}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      data: {
        useremail: sessionStorage.getItem("userEmailId"),
      },
    };
    setIsloding(true);
    axios(config) 
      .then(function (response) {
        var getAllUserdata = response.data;
        setIsloding(false)
        const DecryptedgetAllUserdata = CryptoJS.AES.decrypt(
          getAllUserdata,
          SECRET_PASS,
          {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          }
        ).toString(CryptoJS.enc.Utf8);
        var DecrypteData = JSON.parse(DecryptedgetAllUserdata);

        if (DecrypteData.length > 0) {
          fetchUsers(DecrypteData);
        }
        if (props?.setUserData) {
          props?.setUserData(DecrypteData);
          setData(DecrypteData);
        }
      })
      
      .catch(function (error) {
        ApiErrorMessage(error)
      });
  };
 
   const totalPages = Math.ceil(data.length / itemsPerPage);
 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //filterdata
  const filteredData =data.filter(item=>item.jobId.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  //paginate no


const PaginationPages = () => {
  const pageNumbers = [];
  const maxPage = Math.ceil(filteredData.length / itemsPerPage);
  
  let startPage = Math.max(currentPage -1,1);
  let endPage = Math.min(currentPage + 2, maxPage);
 
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
 
  return (
    <>
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      ))}
    </>
  );
};

  useEffect(() => {
    pendingData();
  }, []);

  const handleRefreshButton =()=>{
    setSearchTerm("");
    pendingData();
  }
  return (
    <>
      {/* <div className="first-row"> */}
      <div className="first-row d-flex justify-content-end align-item-end  ">
        {" "}
        <Row >
        
         
         <Col  >
         <InputGroup className="mb-3 d-flex searchInput">        
         <Form.Control
           aria-label="Username"
           aria-describedby="basic-addon1"
           type="search"
           placeholder="Search"
           value={searchTerm}
           onChange={(e) => {
            setSearchTerm(e.target.value)
           }}
           onClick={handleRefreshButton}
         
         />
          <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
       </InputGroup>
         </Col>
         <Col  >
          <button className=" btn RefershButton"  value="reload" onClick={() =>  handleRefreshButton()} >
       
         
         Refresh Jobs <AiOutlineSync className="refershicon1" />
        </button>
        </Col>
         <Col  >
        {/* pagination */}
        <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            {currentPage > 1 ? (
              <Pagination.Prev
                onClick={() =>
                  handlePageChange(
                    currentPage > 1 ? currentPage - 1 : currentPage
                  )
                }
              />
            ) : (
              ""
            )}
            {PaginationPages()}

            {currentPage < totalPages ? (
              <Pagination.Next
                onClick={() =>
                  handlePageChange(
                    currentPage < totalPages ? currentPage + 1 : currentPage
                  )
                }
                
              />
            ) : (
              ""
            )}
            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>

        </Col>
        </Row> 
      </div>
  

      <div className="Jobs">
        <Row>
          
        {isLoading && (
        <div className="  justify-content-center">
              <button className="btn btn-primary " type="button" disabled>
          <span className="spinner-border spinner-border-sm text-center" role="status" aria-hidden="true"></span>
                  Loading...
                  </button>
          </div>
            )}
          {currentItems&&
          
          currentItems
              .map((item, index) => (
                <Col lg={3} xs={12} sm={12} md={6}>
                  <Col>
                    <Card>
                      <Row>
                        <Col xs={8} md={8}>
                          <Card.Text className="JobId">
                            Job ID: {item.jobId}
                          </Card.Text>
                        </Col>
                        <Col xs={4} md={4}>
                          <label
                            className="dashboardbutton"
                            style={{
                              backgroundColor:
                                item.jobStatus === "Completed"
                                  ? "#31a642"
                                  : item.jobStatus === "Failed"
                                  ? "#FC100D"
                                  : item.jobStatus === "Pending"
                                  ? "#f49026"
                                  : "#004b8e",
                            }}
                          >
                            {item.jobStatus}
                          </label>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={12}>
                          <Card.Text className="Final">
                            {" "}
                            {item.jobRequestedDate}
                          </Card.Text>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "12px" }}>
                        <Col xs={2} md={2}>
                          <a
                            onClick={(e) => {
                              handleClick(item.jobId, "json", e);
                            }}
                            title="Download JSON"
                            rel="noreferrer noopener"
                            download={"json"}
                          >
                            <img src={JSON_ICON} className="pdf" />
                          </a>
                        </Col>
                        <Col xs={2} md={2}>
                          <a
                            onClick={(e) => {
                              handleClick(item.jobId, "log", e);
                            }}
                            target=""
                            title="Download LOG"
                            rel="noreferrer noopener"
                            style={{
                              pointerEvents:
                                item.jobStatus === "Completed"
                                  ? "auto"
                                  : item.jobStatus === "Failed"
                                  ? "auto"
                                  : "none",
                            }}
                          >
                            <img
                              src={LOG_ICON}
                              alt=""
                              className="pdf"
                              style={{
                                opacity:
                                  item.jobStatus === "Completed"
                                    ? 1
                                    : item.jobStatus === "Failed"
                                    ? 1
                                    : 0.2,
                              }}
                            />
                          </a>
                        </Col>
                        <Col xs={2} md={2}>
                          <a
                            onClick={(e) => {
                              handleClick(item.jobId, "zip", e);
                            }}
                            title="Download ZIP"
                            rel="noreferrer noopener"
                            style={{
                              pointerEvents:
                                item.jobStatus === "Completed"
                                  ? "auto"
                                  : "none",
                            }}
                          >
                            <img
                              src={ZIP_ICON}
                              alt=""
                              className="pdf"
                              style={{
                                opacity:
                                  item.jobStatus === "Completed" ? 1 : 0.2,
                              }}
                            />
                          </a>
                        </Col>
                        <Col xs={2} md={2}>
                          <a
                            onClick={(e) => {
                              handleClick(item.jobId, "dwg", e);
                            }}
                            title="Download DWG"
                            rel="noreferrer noopener"
                            style={{
                              pointerEvents:
                                item.jobStatus === "Completed"
                                  ? "auto"
                                  : "none",
                            }}
                          >
                            <img
                              src={DWG_ICON}
                              className="pdf"
                              style={{
                                opacity:
                                  item.jobStatus === "Completed" ? 1 : 0.2,
                              }}
                            />
                          </a>
                        </Col>
                        <Col xs={2} md={2}>
                          <a
                            onClick={(e) => {
                              handleClick(item.jobId, "pdf", e);
                            }}
                            title="Download PDF"
                            rel="noreferrer noopener"
                            style={{
                              pointerEvents:
                                item.jobStatus === "Completed"
                                  ? "auto"
                                  : "none",
                            }}
                            download
                          >
                            <img
                              src={PDF_ICON}
                              className="pdf"
                              style={{
                                opacity:
                                  item.jobStatus === "Completed" ? 1 : 0.2,
                              }}
                            />
                          </a>
                        </Col>

                        <Col xs={2} md={2}>
                          <a
                            onClick={(e) => {
                              handleClick(item.jobId, "xlsx", e);
                            }}
                            title="Download BOM"
                            rel="noreferrer noopener"
                            style={{
                              pointerEvents:
                                item.jobStatus === "Completed"
                                  ? "auto"
                                  : "none",
                            }}
                            download
                          >
                            <img
                              src={XLSX_ICON}
                              className="pdf"
                              style={{
                                opacity:
                                  item.jobStatus === "Completed" ? 1 : 0.2,
                              }}
                            />
                          </a>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Col>
              ))}
              
          
                            
        </Row>
      </div>
    </>
  );
}
export default Dashboard;
