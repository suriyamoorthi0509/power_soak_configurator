import React, { useEffect, useState } from "react";
import { Col, Form, FormControl, Row } from "react-bootstrap";
import { set, useForm, Controller } from "react-hook-form";
import "../CSS/Automation.css";
import {
  selectedSinkConfig,
  calculateDrain,
  selectedTabSinkConfig,
} from "../Constants/global.js";

function SanitizeSink(props) {
  const { selectedObject } = props;
  const { unitWidth } = props;
  const { handlesinkupdate } = props;
  const { sinkDepth } = props;
  const { setSinkDepth } = props;
  const { setCleanDrain } = props;
  const { collectorLength } = props;
  const { metaData } = props;
  const { userlength } = props;
  const { sanitizelength } = props;
  const { setSanitizeLength } = props;
  const { setuserLength } = props;
  const { Rinsevalidation } = props;
  const { sanitizechecked } = props;
  const { setSanitizechecked } = props;
  const { errors } = props;
  const { control } = props;
  const { register } = props;

  let type = null;

  if (unitWidth === "30") {
    type = '24.75"';
  } else if (unitWidth === "34") {
    type = '28.75"';
  } else if (unitWidth === "37") {
    type = '31.75"';
  } else if (selectedObject) {
    type = (selectedObject?.sanitize?.pssanitizesinkwidth)?.toString();
  }

  function generateModel(len, wid, dep, flow, com, typ, fill, dra) {
    const selectdata = {
      length: len,
      width: wid,
      depth: dep,
      overflow: flow,
      company: com,
      type: typ,
      fillfaucet: fill,
      drain: dra,
    };
  }

  const [faucet, setFaucet] = useState("T&S");
  const [overflow, setOverflow] = useState("");
  const [faucettype, setfaucettype] = useState("");
  const [draintype, setdraintype] = useState("");
  const [val, setVal] = useState("");

  const result = (str) => /^[0-9]*$/.test(str);

  const customValueChangeSanitize = (e) => {
    setuserLength(e.target.value);
    const { value } = e.target;
    selectedSinkConfig.sanitize.pssanitizesinklength = parseFloat(
      e.target.value
    );
    setSanitizeLength(parseFloat(e.target.value));
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
      selectedSinkConfig.wash.pswashsinklength,
      selectedSinkConfig.rinse.psrinsesinklength,
      parseFloat(e.target.value)
    );
    setCleanDrain(cleandbValue);
    if (result(value)) {
      setVal(value);
    }
  };
  // const SanitizwSinkValidation = userlength > 12 && userlength < 36;

  function autopopulatesanitize() {
    setSanitizeLength(selectedObject?.sanitize.pssanitizesinklength);
    const obj = {
      target: { value: selectedObject?.sanitize?.pssanitizesinklength },
    };
    handleLengthChange(obj);
    setSinkDepth(selectedObject?.sanitize.pssanitizesinkdepth);
    // setOverflow(selectedObject?.sanitize.pssanitizeoverflow);
    handleOverflowChange({
      target: { value: selectedObject?.sanitize.pssanitizeoverflow },
    });
    setdraintype(selectedObject?.sanitize.pssanitizesinkdraintype);
    //  handleDrainChange({target:{value:selectedObject?.sanitize.pssanitizesinkdraintype}})
    // setFaucet(selectedObject?.sanitize.psfillsanitizecompany);
    handleCompanyChange({
      target: { value: selectedObject?.sanitize.psfillsanitizecompany },
    });
    handleTypeChange({
      target: { value: selectedObject?.sanitize.psfillsanitizetype },
    });
    // setfaucettype(selectedObject?.sanitize.psfillsanitizetype);
    if (selectedObject?.sanitize.psfillsanitizetype == "NONE") {
      document.getElementById("Sanitizefillfaucet").checked = false;
      document.getElementById("SanitizeFaucetSection").hidden = true;
    } else {
      document.getElementById("Sanitizefillfaucet").checked = true;
      document.getElementById("SanitizeFaucetSection").hidden = false;
    }

    customValueChangeSanitize({
      target: { value: selectedObject?.sanitize.pssanitizesinklength },
    });

    //  sanitizechecked (!metaData?.SanitizeSinkLength?.some(o=>o.value==selectedObject?.sanitize?.pssanitizesinklength))

    if (selectedObject?.sanitize?.pssanitizesinklength > 0) {
      setSanitizechecked(
        !metaData?.SanitizeSinkLength?.some(
          (o) => o.value == selectedObject?.sanitize?.pssanitizesinklength
        )
      );
    } else {
      setSanitizechecked(false);
    }
  }
  useEffect(() => {
    if (selectedObject) {
      autopopulatesanitize();
    }
  }, [selectedObject]);

  const pendingData = () => {};

  useEffect(() => {
    pendingData();
    selectedSinkConfig.sanitize.psfillsanitizecompany = "T&S";
    selectedSinkConfig.sanitize.pssanitizesinkdraintype =
      "Standard Drain Ball Valve";
  }, []);

  const handleClick = (e) => {
    if (e.target.checked) {
      setSanitizechecked(true);
    } else if (!e.target.checked) {
      setuserLength("");
      setVal("");
      selectedSinkConfig.sanitize.pssanitizesinklength = "";
      setSanitizechecked(false);

    }
  };

  const handleLengthChange = (e) => {
    // setLengthValue(e.target.value);
    selectedSinkConfig.sanitize.pssanitizesinklength = parseFloat(
      e.target.value
    );
    setSanitizeLength(parseFloat(e.target.value));
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
      selectedSinkConfig.wash.pswashsinklength,
      selectedSinkConfig.rinse.psrinsesinklength,
      parseFloat(e.target.value)
    );
    setCleanDrain(cleandbValue);
  };
  // const handleDepthChange = (e) => {
  //   // setDepthValue(e.target.value, depthVa
  // setSinkDepth(e.target.value);
  // handlesinkupdate(e);
  // };

  selectedSinkConfig.sanitize.pssanitizesinkwidth = parseFloat(type);

  const handleOverflowChange = (e) => {
    setOverflow(e.target.value);
    selectedSinkConfig.sanitize.pssanitizeoverflow = e.target.value;
    if (e.target.value == "Central Overflow") {
      document.getElementById("sanitizedraintype").value =
        "Overflow Drain Ball Valve";
      selectedSinkConfig.sanitize.pssanitizesinkdraintype =
        "Overflow Drain Ball Valve";
    } else {
      document.getElementById("sanitizedraintype").value =
        "Standard Drain Ball Valve";
      selectedSinkConfig.sanitize.pssanitizesinkdraintype =
        "Standard Drain Ball Valve";
    }
  };

  const handleCompanyChange = (e) => {
    setFaucet(e.target.value);

    // selectedSinkConfig.psfillsanitizecompany = e.target.value;
    // setCompanyValue(e.target.value);
    selectedSinkConfig.sanitize.psfillsanitizecompany = e.target.value;
  };

  const handleTypeChange = (e) => {
    // setTypeValue(e.target.value);
    selectedSinkConfig.sanitize.psfillsanitizetype = e.target.value;
    setfaucettype(e.target.value);
  };

  const handleFillfaucetChange = (e) => {
    // setFillfaucetValue(e.target.value);
    if (e.target.checked) {
      //selectedSinkConfig.sanitize.pssanitizefillfaucet  = "ON";
      document.getElementById("SanitizeFaucetSection").hidden = false;
      selectedSinkConfig.sanitize.psfillsanitizetype =
        "FAUCET 3/4in WALL MOUNT 12 SPOUT";
    } else {
      //selectedSinkConfig.sanitize.pssanitizefillfaucet  = "OFF";
      document.getElementById("SanitizeFaucetSection").hidden = true;
    }
  };

  const handleDrainChange = (e) => {
    // setDrainValue(e.target.value);
    selectedSinkConfig.sanitize.pssanitizesinkdraintype = e.target.value;
    setdraintype(e.target.value);
  };
  return (
    <>
      <div className="washsink">
        <Form.Group as={Row}>
          <Col lg={2} xs={12} sm={12} md={6}>
            <Form.Label className="labelbox">Length:</Form.Label>
          </Col>
          <Col lg={5} xs={12} sm={12} md={6}>
                {sanitizechecked ? (
                  <div>
                    <FormControl
                      value={val}
                      onChange={customValueChangeSanitize}
                    ></FormControl>
                    {val > 12 && val < 36 ? (
                      Rinsevalidation
                    ) : (
                      <p style={{ color: "red", fontSize: 11 }}>
                        Custom length Should be greater than 12 & lesser
                        than/Equal to 36 inches.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="customvalueselect">
              <Controller
              name="sanitizesinklengths"
              control={control}
              render={({ field }) =>(
                    <Form.Select
                      {...register('sanitizesinklengths', {
                        required: "Please select Length",
                      })}
                      id="customvalueselect"
                      name="sanitizesinklengths"
                      aria-label="Default select example"
                      onChange={(e) => {
                        handleLengthChange(e);
                        field.onChange(e);
                      }}
                      value={sanitizelength}
                      className={
                        errors.sanitizesinklengths
                          ? "form-select-error"
                          : "form-select"
                      }
                    >
                      <option value="">Select</option>

                      {metaData?.SanitizeSinkLength?.map((element, index) => (
                        <option key={index} value={element.value}>
                          {element.desc}
                        </option>
                      ))}
                    </Form.Select>
                )}
                />
                {
              <p style={{ color: "red", fontSize: 11 }}>
                {errors.sanitizesinklengths?.message}
              </p>
            }
                  </div>
)}
            
          </Col>

          <Form.Group as={Col}>
            <Col lg={7} xs={12} sm={12} md={6}>
              <Form.Check
                type="checkbox"
                label="Custom Value"
                name="Custom value"
                id="Custom value"
                onClick={handleClick}
                checked={sanitizechecked}
              />
            </Col>
          </Form.Group>
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
              id="width"
              type="text"
              disabled
              value={type}
              className="disablebtn"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col lg={2} xs={12} sm={12} md={6}>
            <Form.Label className="labelbox">Depth:</Form.Label>
          </Col>
          <Col lg={5} xs={12} sm={12} md={6}>
            <Form.Select
              aria-label="Default select example"
              onChange={handlesinkupdate}
              value={sinkDepth}
            >
              {/* <option value="select">Select</option> */}

              {metaData?.SanitizeSinkDepth?.map((element, index) => (
                <option key={index} value={element.value}>
                  {element.desc}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col lg={2} xs={12} sm={12} md={6}>
            <Form.Label className="labelbox">Overflow:</Form.Label>
          </Col>
          <Col lg={5} xs={12} sm={12} md={6}>
            <Form.Select
              id="sanitizeoverflow"
              aria-label="Default select example"
              onChange={handleOverflowChange}
              value={overflow}
            >
              {/* <option value={"select"}>Select</option> */}
              {metaData?.SanitizeOverflow?.map((element, index) => (
                <option key={index} value={element.value}>
                  {element.desc}
                </option>
              ))}
            </Form.Select>
          </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col lg={2} xs={12} sm={12} md={6}>
              <Form.Label className="labelbox">Drain Type:</Form.Label>
            </Col>
            <Col lg={5} xs={12} sm={12} md={6}>
              {overflow == "yes" ? (
                <Form.Select
                  id="sanitizedraintype"
                  aria-label="Default select example"
                  onChange={handleDrainChange}
                  value={draintype}
                >
                  {/* <option value="select">Select</option> */}
                  {metaData?.SanitizeDrainyes?.map((element, index) => (
                    <option key={index} value={element.value}>
                      {element.desc}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Select
                  id="sanitizedraintype"
                  aria-label="Default select example"
                  onChange={handleDrainChange}
                >
                  {/* <option value="select">Select</option> */}
                  {metaData?.SanitizeDrain?.map((element, index) => (
                    <option key={index} value={element.value}>
                      {element.desc}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Col>
          </Form.Group>
       

        <Row>
          <Col lg={3}> </Col>
          <Col lg={1}> </Col>
          <Col lg={3}>
            <div>
              {/* <div className="section1"> */}
              <Form.Check
                className="formradio"
                type="checkbox"
                label="Sanitize Fill Faucet"
                id="Sanitizefillfaucet"
                onChange={handleFillfaucetChange}
              />
            </div>
          </Col>
        </Row>
      </div>
      {
        <div id="SanitizeFaucetSection" hidden={true} className="washsink">
          <Form.Group as={Row}>
            <Col lg={2} xs={12} sm={12} md={6}>
              <Form.Label className="labelbox">FaucetMake:</Form.Label>
            </Col>
            <Col lg={5} xs={12} sm={12} md={6}>
              <Form.Select
                aria-label="Default select example"
                onChange={handleCompanyChange}
                value={faucet}
              >
                {metaData?.SanitizeCompany?.map((element, index) => (
                  <option key={index} value={element.value}>
                    {element.desc}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col lg={2} xs={12} sm={12} md={6}>
              <Form.Label className="labelbox">Type:</Form.Label>
            </Col>
            <Col lg={5} xs={12} sm={12} md={6}>
              {faucet == "T&S" ? (
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleTypeChange}
                  value={faucettype}
                >
                  {metaData?.RinseFaucet?.map((element, index) => (
                    <option key={index} value={element.value}>
                      {element.desc}
                    </option>
                  ))}
                </Form.Select>
              ) : faucet == "Encore" ? (
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleTypeChange}
                  value={faucettype}
                >
                  {metaData?.SanitizeFaucet?.map((element, index) => (
                    <option key={index} value={element.value}>
                      {element.desc}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleTypeChange}
                >
                  {metaData?.SanitizeFaucet?.map((element, index) => (
                    <option key={index} value={element.value}>
                      {element.desc}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Col>
          </Form.Group>
        </div>
      }
    </>
  );
}

export default SanitizeSink;
