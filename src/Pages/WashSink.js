import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "../CSS/Automation.css";
import {
  selectedSinkConfig,
  selectedTabSinkConfig,
  calculateDrain,
} from "../Constants/global.js";

import { Component } from "react";
import Select from "react-select";
import Sheet_pan from "../Images/Sheet_pan.png";
import AdvanceWash from "../Images/AdvanceWash.png";
import Popup from "reactjs-popup";
import FrontWashSheet from "../json/FrontWashSheet.json";
import { set, useForm, Controller } from "react-hook-form";

function Main(props) {
  const { selectedObject } = props;
  const { unitWidth } = props;
  const { widthValue } = props;
  const { heaterValue } = props;
  const { setWashSinkLength } = props;
  const { washSinkLength } = props;
  const { motorhpValue } = props;
  const { setCleanDrain } = props;
  const { collectorLength } = props;
  const { checkboxValue } = props;
  const { metaData } = props;
  const { filteredWashLength } = props;
  const [filteredPanRack, setFilteredPanRack] = useState(metaData.PanRack);
  const { filterCombo } = props;
  const { errors } = props;
  const { control } = props;
  const { register } = props;

  let type = "";

  if (unitWidth === "30") {
    type = '24.75"';
  } else if (unitWidth === "34") {
    type = '28.75"';
  } else if (unitWidth === "37") {
    type = '31.75"';
  } else if (selectedObject) {
    type = (selectedObject?.wash?.pswashsinkwidth)?.toString();
  }

  const [depth, setDepth] = useState("21");
  const [draintype, setDraintype] = useState("");
  const [sheet, setSheet] = useState("Complete Rack Assembly");

  function autopopulatewash() {
    handleLengthChange({
      target: { value: selectedObject?.wash?.pswashsinklength },
    });
    handleDepthChange({
      target: { value: selectedObject?.wash.pswashsinkdepth },
    });
    if (selectedObject?.wash.psadvancedwashinsert === "OFF") {
      document.getElementById("sssheetpanrack").hidden = false;
      document.getElementById("sssheetpanracklabel").hidden = false;
      document.getElementById("sssheetpanracktip").hidden = false;
      setSheet(selectedObject?.wash.pssheetpanrack);
    } else if (selectedObject?.wash.psadvancedwashinsert === "ON") {
      document.getElementById("awisheetpanrack").hidden = true;
      document.getElementById("awisheetpanracktooltip").hidden = false;
      document.getElementById("sssheetpanrack").hidden = true;
      document.getElementById("sssheetpanracklabel").hidden = true;
      document.getElementById("sssheetpanracktip").hidden = true;
      setSheet("NONE");
      
    }
    setDraintype(selectedObject?.wash.pswashsinkdraintype);
    //  handleDrainChange({target:{value:selectedObject?.wash.pswashsinkdraintype}})
    handleAwashinsertChange({
      target: { value: selectedObject?.wash.psadvancedwashinsert },
    });
  }

  useEffect(() => {
    if (selectedObject) {
      autopopulatewash();
    }
  }, [selectedObject]);

  const handlePanRackFilter = () => {
    if (
      filterCombo &&
      filterCombo.PanRack &&
      filterCombo.PanRack[
        selectedSinkConfig.wash.psadvancedwashinsert +
          "_" +
          selectedSinkConfig.wash.pswashsinklength +
          "_" +
          unitWidth
      ]
    ) {
      setFilteredPanRack(
        filterCombo.PanRack[
          selectedSinkConfig.wash.psadvancedwashinsert +
            "_" +
            selectedSinkConfig.wash.pswashsinklength +
            "_" +
            unitWidth
        ]
      );
    } else {
      setFilteredPanRack(metaData.PanRack);
    }
  };

  const partMap = [];
  const handleLengthChange = (e) => {
    setWashSinkLength(e.target.value);

    selectedSinkConfig.wash.pswashsinklength = parseFloat(e.target.value);
    selectedTabSinkConfig.wash.pswashsinklength = parseFloat(e.target.value);
    handlePanRackFilter();

    const cleandbValue = calculateDrain(
      selectedSinkConfig.psunitlength,
      selectedSinkConfig.top.psendsplashleft,
      selectedSinkConfig.top.psendsplashright,
      selectedSinkConfig.scrap.pssoildblength,
      selectedSinkConfig.scrap.pssdsinklength,
      selectedSinkConfig.scrap.psdbbtwscrapandwash,
      selectedSinkConfig.scrap.psdisposersinklength,
      selectedSinkConfig.scrap.psconesize,
      collectorLength,
      parseFloat(e.target.value),
      selectedSinkConfig.rinse.psrinsesinklength,
      selectedSinkConfig.sanitize.pssanitizesinklength
    );
    setCleanDrain(cleandbValue);
  };

  selectedSinkConfig.wash.pswashsinkwidth = parseFloat(type);

  const handleDepthChange = (e) => {
    setDepth(e.target.value);
    selectedSinkConfig.pswashsinkdepth = e.target.value;
    selectedSinkConfig.wash.pswashsinkdepth = parseFloat(e.target.value);
  };

  const handleWaterChange = (e) => {
    // setWaterValue(e.target.value);
    selectedSinkConfig.wash.pssdsinkwaterinlet = e.target.value;
  };

  const handleDrainChange = (e) => {
    setDraintype(e.target.value);
    selectedSinkConfig.wash.pswashsinkdraintype = e.target.value;
  };

  //selectedSinkConfig.wash.pssheetpanrack = "No Rack Assembly";
  const handleStackChange = (e) => {
    selectedSinkConfig.wash.pssheetpanrack = e.target.value;
    setSheet(e.target.value);
    selectedSinkConfig.wash.psadvancedwashinsert = "OFF";
    if (  e.target.value != "select"  && e.target.value !== "None") {
      document.getElementById("sssheetpanracktip").hidden = false;
    }
    if(e.target.value =="NONE"){
      document.getElementById("sssheetpanracktip").hidden = true;

    }
    
  };

  useEffect(() => {
    if (unitWidth == "30") {
      selectedSinkConfig.wash.pssheetpanrack = "NONE";
      setSheet("NONE");
    } else {
      selectedSinkConfig.wash.pssheetpanrack = sheet;
    }
  }, [unitWidth]);

  const handleAWISheetSpanRackChange = (e) => {
    if (!e.target.checked) {
    }
  };

  const handleAwashinsertChange = (e) => {
    if (e.target.checked) {
      selectedSinkConfig.wash.psadvancedwashinsert = "ON";
      selectedSinkConfig.wash.pssheetpanrack = "NONE";

      document.getElementById("awisheetpanrack").hidden = true;

      document.getElementById("awisheetpanracktooltip").hidden = false;

      document.getElementById("sssheetpanrack").hidden = true;

      document.getElementById("sssheetpanracklabel").hidden = true;

      document.getElementById("sssheetpanracktip").hidden = true;

      document.getElementById("utensilbasket").disabled = true;

      document.getElementById("utensilbasket").checked = false;
    } else if (!e.target.checked && unitWidth == "30") {
      selectedSinkConfig.wash.pssheetpanrack = "NONE";
      selectedSinkConfig.wash.psadvancedwashinsert = "OFF";

      document.getElementById("awisheetpanrack").hidden = true;

      document.getElementById("awisheetpanracktooltip").hidden = true;

      document.getElementById("sssheetpanrack").hidden = true;

      document.getElementById("sssheetpanracklabel").hidden = true;

      document.getElementById("sssheetpanracktip").hidden = true;

      document.getElementById("utensilbasket").disabled = false;
    } else if (!e.target.checked && checkboxValue === "PS3") {
      selectedSinkConfig.wash.psadvancedwashinsert = "OFF";
      selectedSinkConfig.wash.pssheetpanrack = sheet;

      document.getElementById("awisheetpanrack").hidden = true;

      document.getElementById("awisheetpanracktooltip").hidden = true;

      document.getElementById("sssheetpanrack").hidden = false;

      document.getElementById("sssheetpanracklabel").hidden = false;

      document.getElementById("sssheetpanracktip").hidden = false;

      document.getElementById("utensilbasket").disabled = true;
    } else {
      selectedSinkConfig.wash.psadvancedwashinsert = "OFF";
      selectedSinkConfig.wash.pssheetpanrack = sheet;
      document.getElementById("awisheetpanrack").hidden = true;

      document.getElementById("awisheetpanracktooltip").hidden = true;

      document.getElementById("sssheetpanrack").hidden = false;

      document.getElementById("sssheetpanracklabel").hidden = false;

      document.getElementById("sssheetpanracktip").hidden = false;

      document.getElementById("utensilbasket").disabled = false;
    }
    if (document.getElementById("AWI").checked == false) {
      selectedSinkConfig.wash.psadvancedwashinsert = "OFF";
    }
  };

  return (
    <>
      <div className="washsink">
        <Form.Group as={Row}>
          <Col lg={2} xs={12} sm={12} md={6}>
            <Form.Label className="labelbox">Length:</Form.Label>
          </Col>
          <Col lg={5} xs={12} sm={12} md={6}>
            <Controller
              name="washsinklength"
              control={control}
              render={({ field }) => (
                <Form.Select
                  {...register("washsinklength", {
                    required: "Please select Length",
                  })}
                  id="washsinklength"
                  name="washsinklength"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleLengthChange(e);
                    field.onChange(e);
                  }}
                  value={washSinkLength}
                  className={
                    errors.washsinklength ? "form-select-error" : "form-select"
                  }
                >
                  <option value="">Select</option>
                  {heaterValue == "OFF"
                    ? metaData?.WashSinkLength?.map((element, index) => (
                        <option key={index} value={element.value}>
                          {element.desc}
                        </option>
                      ))
                    : heaterValue == "ON" && motorhpValue == "3HP"
                    ? metaData?.WashSinkLengthTwo?.map((element, index) => (
                        <option key={index} value={element.value}>
                          {element.desc}
                        </option>
                      ))
                    : metaData?.WashSinkLength?.map((element, index) => (
                        <option key={index} value={element.value}>
                          {element.desc}
                        </option>
                      ))}
                </Form.Select>
              )}
            />
            {
              <p style={{ color: "red", fontSize: 11 }}>
                {errors.washsinklength?.message}
              </p>
            }
          </Col>
        </Form.Group>
        <Form.Group
          hidden={process.env.REACT_APP_ISDESIGN_USER =="false" }
          as={Row}
        >
          <Col lg={2} xs={12} sm={12} md={6}>
            <Form.Label className="labelbox">Front to Back:</Form.Label>
          </Col>
          <Col lg={5} xs={12} sm={12} md={6}>
            <Form.Control
              type="text"
              className="disablebtn"
              value={type}
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group
          hidden={process.env.REACT_APP_ISDESIGN_USER =="false" }
          as={Row}
        >
          <Col lg={2} xs={12} sm={12} md={6}>
            <Form.Label className="labelbox">Depth:</Form.Label>
          </Col>
          <Col lg={5} xs={12} sm={12} md={6}>
                <Form.Select
                  id="washsinkdepth"
                  name="washsinkdepth"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleLengthChange(e);
                
                  }}
                  value={depth}
                 
                >
                  <option value="">Select</option>

                  {metaData?.WashSinkDepth?.map((element, index) => (
                    <option key={index} value={element.value}>
                      {element.desc}
                    </option>
                  ))}
                </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col lg={2} xs={12} sm={12} md={6}>
            <Form.Label id="sssheetpanracklabel" className="labelbox">
              SS Sheet Pan Rack:
            </Form.Label>
          </Col>
          <Col lg={5} xs={12} sm={12} md={6}>
            {washSinkLength == "30" ? (
              <Form.Select
                id="sssheetpanrack"
                aria-label="Default select example"
                onChange={handleStackChange}
                value={sheet}
              >
                {" "}
                {metaData?.PanRack30?.map((element, index) => (
                  <option key={index} value={element.value}>
                    {element.desc}
                  </option>
                ))}
              </Form.Select>
            ) : washSinkLength == "36" ? (
              <Form.Select
                id="sssheetpanrack"
                aria-label="Default select example"
                onChange={handleStackChange}
                value={sheet}
              >
                {" "}
                {metaData?.PanRack36?.map((element, index) => (
                  <option key={index} value={element.value}>
                    {element.desc}
                  </option>
                ))}
              </Form.Select>
            ) : washSinkLength == "42" ? (
              <Form.Select
                id="sssheetpanrack"
                aria-label="Default select example"
                onChange={handleStackChange}
                value={sheet}
              >
                {" "}
                {metaData?.PanRack42?.map((element, index) => (
                  <option key={index} value={element.value}>
                    {element.desc}
                  </option>
                ))}
              </Form.Select>
            ) : washSinkLength == "48" ? (
              <Form.Select
                id="sssheetpanrack"
                aria-label="Default select example"
                onChange={handleStackChange}
                value={sheet}
              >
                {" "}
                {metaData?.PanRack48?.map((element, index) => (
                  <option key={index} value={element.value}>
                    {element.desc}
                  </option>
                ))}
              </Form.Select>
            ) : washSinkLength == "54" ? (
              <Form.Select
                id="sssheetpanrack"
                aria-label="Default select example"
                onChange={handleStackChange}
                value={sheet}
              >
                {" "}
                {metaData?.PanRack54?.map((element, index) => (
                  <option key={index} value={element.value}>
                    {element.desc}
                  </option>
                ))}
              </Form.Select>
            ) : washSinkLength == "60" ? (
              <Form.Select
                id="sssheetpanrack"
                aria-label="Default select example"
                onChange={handleStackChange}
                value={sheet}
              >
                {" "}
                {metaData?.PanRack60?.map((element, index) => (
                  <option key={index} value={element.value}>
                    {element.desc}
                  </option>
                ))}
              </Form.Select>
            ) : washSinkLength == "66" ? (
              <Form.Select
                id="sssheetpanrack"
                aria-label="Default select example"
                onChange={handleStackChange}
                value={sheet}
              >
                {" "}
                {metaData?.PanRack66?.map((element, index) => (
                  <option key={index} value={element.value}>
                    {element.desc}
                  </option>
                ))}
              </Form.Select>
            ) : washSinkLength == "72" ? (
              <Form.Select
                id="sssheetpanrack"
                aria-label="Default select example"
                onChange={handleStackChange}
                value={sheet}
              >
                {" "}
                {metaData?.PanRack72?.map((element, index) => (
                  <option key={index} value={element.value}>
                    {element.desc}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Form.Select
                id="sssheetpanrack"
                aria-label="Default select example"
                onChange={handleStackChange}
                value={sheet}
              >
                {" "}
                {/* {metaData?.PanRack?.map((element, index) => ( */}
                {metaData?.PanRack?.map((element, index) => (
                  <option key={index} value={element.value}>
                    {element.desc}
                  </option>
                ))}
              </Form.Select>
            )}
          </Col>

          <Col id="sssheetpanracktip" style={{ flex: 0 }}>
            <Popup
              trigger={
                <div className="sub-hover">
                  <img
                    src="https://img.icons8.com/color/50/000000/info.png"
                    width={20}
                  />
                </div>
              }
              position="right top"
              on="hover"
              closeOnDocumentClick
              mouseLeaveDelay={300}
              mouseEnterDelay={0}
              contentStyle={{ padding: "0px", border: "none" }}
              arrow={false}
            >
              <img src={Sheet_pan} width={450} height={300} />
            </Popup>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col lg={2} xs={12} sm={12} md={6}>
            <Form.Label className="labelbox">Drain Type:</Form.Label>
          </Col>
          <Col lg={5} xs={12} sm={12} md={6}>
            <Form.Select
              id="washsinkdraintype"
              aria-label="Default select example"
              onChange={handleDrainChange}
              Value={draintype}
            >
              {/* <option value="select">Select</option> */}
              {metaData?.WashDrain?.map((element, index) => (
                <option key={index} value={element.value}>
                  {element.desc}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Row>
          <Col lg={3}> </Col>
          <Col lg={1}> </Col>
          <Col lg={3}>
            <div>
              <Form.Check
                className="formradio"
                type="checkbox"
                label="Advanced Wash Insert"
                onChange={handleAwashinsertChange}
                id="AWI"
              />
            </div>
          </Col>
          <Col id="awisheetpanrack" hidden={true} lg={3}>
            <Form.Select
              aria-label="Default select example"
              onChange={handleAWISheetSpanRackChange}
            >
              <option value="select">Select</option>
              {metaData?.AWISheetPanRack?.map((element, index) => (
                <option key={index} value={element.value}>
                  {element.desc}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col id="awisheetpanracktooltip" hidden={true} style={{ flex: 0 }}>
            <Popup
              trigger={
                <div className="sub-hover">
                  <img
                    src="https://img.icons8.com/color/50/000000/info.png"
                    width={20}
                  />
                </div>
              }
              position="right top"
              on="hover"
              closeOnDocumentClick
              mouseLeaveDelay={300}
              mouseEnterDelay={0}
              contentStyle={{ padding: "0px", border: "none" }}
              arrow={false}
            >
              <img src={AdvanceWash} className="AdvanceWash" />
            </Popup>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Main;
