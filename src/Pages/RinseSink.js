import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "../CSS/Automation.css";
import {
  selectedSinkConfig,
  calculateDrain,
  selectedTabSinkConfig,
} from "../Constants/global.js";
import { set, useForm, Controller } from "react-hook-form";

const result = (str) => /^[0-9]*$/.test(str);

function RinseSink(props) {
  const { selectedObject } = props;
  const { unitWidth } = props;
  const { sinkDepth } = props;
  const { setSinkDepth } = props;
  const { setCleanDrain } = props;
  const { setrinselength } = props;
  const { rinselength } = props;
  const { handlesinkupdate } = props;
  const { collectorLength } = props;
  const { metaData } = props;
  const { userlength } = props;
  const { setuserLength } = props;
  const { Rinsevalidation } = props;
  const { checked } = props;
  const { setChecked } = props;
  const { errors } = props;
  const { control } = props;
  const { register } = props;

  const [faucet, setFaucet] = useState("T&S");
  const [overflow, setOverflow] = useState("");
  const [rinsedrain, setrinsedrain] = useState("");
  const [faucetType, setfaucetType] = useState("");
  const [val, setVal] = useState("");

  const customValueChange = (e) => {
    setuserLength(e.target.value);
    const { value } = e.target;
    selectedSinkConfig.rinse.psrinsesinklength = parseFloat(e.target.value);
    setrinselength(parseFloat(e.target.value));

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
      parseFloat(e.target.value),
      selectedSinkConfig.sanitize.pssanitizesinklength
    );
    setCleanDrain(cleandbValue);
    if (result(value)) {
      setVal(value);
    }
  };

  let type = null;
  if (unitWidth === "30") {
    type = '24.75"';
  } else if (unitWidth === "34") {
    type = '28.75"';
  } else if (unitWidth === "37") {
    type = '31.75"';
  } else if (selectedObject) {
    type = (selectedObject?.rinse?.psrinsesinkwidth)?.toString();
  }

  function generateModel(len, wid, dep, over, com, dra, type) {
    const selectdata = {
      length: len,
      width: wid,
      depth: dep,
      overflow: over,
      company: com,
      drain: dra,
      type: type,
    };

    var validated = false;
  }

  function autopopulaterinse() {
    handleLengthChange({
      target: { value: selectedObject?.rinse?.psrinsesinklength },
    });
    setSinkDepth(selectedObject?.rinse.psrinsesinkdepth);
    setOverflow(selectedObject?.rinse.psrinseoverflow);
    handleOverflowChange({
      target: { value: selectedObject?.rinse.psrinseoverflow },
    });
    setrinsedrain(selectedObject?.rinse.psrinsesinkdraintype);
    handleCompanyChange({
      target: { value: selectedObject?.rinse.psfillrinsecompany },
    });
    // setfaucetType(selectedObject?.rinse.psfillrinsetype);

    handleTypeChange({
      target: { value: selectedObject?.rinse.psfillrinsetype },
    });
    if (selectedObject?.rinse.psfillrinsetype === "NONE") {
      document.getElementById("fillfaucet").checked = false;
      document.getElementById("RinseFaucetSection").hidden = true;
    } else {
      document.getElementById("fillfaucet").checked = true;
      document.getElementById("RinseFaucetSection").hidden = false;
    }

    customValueChange({
      target: { value: selectedObject?.rinse.psrinsesinklength },
    });
    // setChecked(!metaData?.RinseSinklength?.some(o=>o.value==selectedObject?.rinse?.psrinsesinklength))

    if (selectedObject?.rinse?.psrinsesinklength > 0) {
      setChecked(
        !metaData?.RinseSinklength?.some(
          (o) => o.value == selectedObject?.rinse?.psrinsesinklength
        )
      );
      
    } else {
      setChecked(false);
    }
  }

  useEffect(() => {
    if (selectedObject) {
      autopopulaterinse();
    }
  }, [selectedObject]);

  const pendingData = () => {};

  useEffect(() => {
    pendingData();
    selectedSinkConfig.rinse.psfillrinsecompany = "T&S";

    selectedSinkConfig.rinse.psrinsesinkdraintype = "Standard Drain Ball Valve";
  }, []);

  const handleClick = (e) => {
  
    if (e.target.checked) {
      setChecked(true);
    } else if (!e.target.checked) {
      setuserLength("");
      setVal("");
      selectedSinkConfig.rinse.psrinsesinklength = "";
      setChecked(false);
    }
  };
  const handleLengthChange = (e) => {
    // setLengthValue(e.target.value);
    selectedSinkConfig.rinse.psrinsesinklength = parseFloat(e.target.value);
    setrinselength(parseFloat(e.target.value));

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
      parseFloat(e.target.value),
      selectedSinkConfig.sanitize.pssanitizesinklength
    );
    setCleanDrain(cleandbValue);
  };

  selectedSinkConfig.rinse.psrinsesinkwidth = parseFloat(type);

  const handleOverflowChange = (e) => {
    setOverflow(e.target.value);
    selectedSinkConfig.rinse.psrinseoverflow = e.target.value;
    setOverflow(e.target.value);
    if (e.target.value == "Central Overflow") {
      document.getElementById("rinsesinkdraintype").value =
        "Overflow Drain Ball Valve";
      selectedSinkConfig.rinse.psrinsesinkdraintype =
        "Overflow Drain Ball Valve";
    } else {
      document.getElementById("rinsesinkdraintype").value =
        "Standard Drain Ball Valve";
      selectedSinkConfig.rinse.psrinsesinkdraintype =
        "Standard Drain Ball Valve";
    }
  };

  const handleCompanyChange = (e) => {
    setFaucet(e.target.value);
    selectedSinkConfig.rinse.psfillrinsecompany = e.target.value;
  };

  const handleDrainChange = (e) => {
    setrinsedrain(e.target.value);
    selectedSinkConfig.rinse.psrinsesinkdraintype = e.target.value;
  };

  const handleTypeChange = (e) => {
    // setTypeValue(e.target.value);
    setfaucetType(e.target.value);
    selectedSinkConfig.rinse.psfillrinsetype = e.target.value;
  };

  const handleRinseffaucetChange = (e) => {
    if (e.target.checked) {
      document.getElementById("RinseFaucetSection").hidden = false;
      selectedSinkConfig.rinse.psfillrinsetype =
        "FAUCET 3/4in WALL MOUNT 12 SPOUT";
    } else {
      document.getElementById("RinseFaucetSection").hidden = true;
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
            {checked ? (
              <div>
                <Form.Control
                  value={val}
                  onChange={customValueChange}
                ></Form.Control>

                {val > 12 && val < 36 ? (
                  Rinsevalidation
                ) : (
                  <p style={{ color: "red", fontSize: 11 }}>
                    Custom length Should be greater than 12 & lesser than/Equal
                    to 36 inches.
                  </p>
                )}
              </div>
            ) : (
              <Controller
                name="rinseSinklengths"
                control={control}
                render={({ field }) => (
                  <Form.Select
                    {...register("rinseSinklengths", {
                      required: "Please select Length",
                    })}
                    name="rinseSinklengths"
                    id="customvalueselect"
                    aria-label="Default select example"
                    onChange={(e) => {
                      handleLengthChange(e);
                      field.onChange(e);
                    }}
                    value={rinselength}
                    className={
                      errors.rinseSinklengths
                        ? "form-select-error"
                        : "form-select"
                    }
                  >
                    <option value="">Select</option>

                    {metaData?.RinseSinklength?.map((element, index) => (
                      <option key={index} value={element.value}>
                        {element.desc}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
            )}
            {
              <p style={{ color: "red", fontSize: 11 }}>
                {errors.rinseSinklengths?.message}
              </p>
            }
          </Col>
          <Form.Group as={Col}>
            <Col lg={7} xs={12} sm={12} md={6}>
              <Form.Check
                type="checkbox"
                label="Custom Value"
                name="Custom value"
                id="Custom value"
                onClick={handleClick}
                checked={checked}
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
              type="text"
              readOnly
              value={type}
              className="disablebtn"
            />
            {/* <Form.Select
              aria-label="Default select example"
              onChange={handleWidthChange}
            >
              <option value="select">Select</option>

              {widthData.map((element, index) => (
                <option key={index} value={element.value}>{element.desc}</option>
              ))}
            </Form.Select> */}
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
              id="rinsesinkoverflow"
              aria-label="Default select example"
              onChange={handleOverflowChange}
              value={overflow}
            >
              {/* <option value={"select"}>Select</option> */}
              {metaData?.RinseOverflow?.map((element, index) => (
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
                id="rinsesinkdraintype"
                aria-label="Default select example"
                onChange={handleDrainChange}
                value={rinsedrain}
              >
                {/* <option value="select">Select</option> */}
                {metaData?.RinseDraincondition?.map((element, index) => (
                  <option key={index} value={element.value}>
                    {element.desc}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Form.Select
                id="rinsesinkdraintype"
                aria-label="Default select example"
                onChange={handleDrainChange}
                value={rinsedrain}
              >
                {/* <option value="select">Select</option> */}
                {metaData?.RinseDrain?.map((element, index) => (
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
              <Form.Check
                className="formradio"
                type="checkbox"
                label="Rinse Fill Faucet"
                id="fillfaucet"
                onChange={handleRinseffaucetChange}
              />
            </div>
          </Col>
        </Row>
      </div>
      {
        <div id="RinseFaucetSection" hidden={true} className="washsink">
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
                {metaData?.RinseCompany?.map((element, index) => (
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
                  value={faucetType}
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
                  value={faucetType}
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

export default RinseSink;
