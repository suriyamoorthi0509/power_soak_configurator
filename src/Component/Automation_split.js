import React, { useEffect, useState, useCallback } from "react";
import { Container, Navbar, Col, Row, Form } from "react-bootstrap";
import { Tab } from "bootstrap";
import Tabs from "react-bootstrap/Tabs";
import ScrapDSink from "../Pages/ScrapDSink";
import WashSink from "../Pages/WashSink";
import PDF from "../Images/PDF.png";
import "../CSS/Automation.css";
import RinseSink from "../Pages/RinseSink";
import SanitizeSink from "../Pages/SanitizeSink";
import { useStoreActions, useStoreState } from "easy-peasy";
import axios from "axios";
import ReactHintFactory from "react-hint";
import Undershelf from "../Images/Undershelf.png";
import Drying_Rack from "../Images/Drying_Rack.png";
//import OvershelfImage from "../Images/Overshelf.png";
import WashLengthCombo from "../json/WashLengthCombo.json";
//import PsxxCombo from "../json/PsxxCombo.json";
import FrontWashSheet from "../json/FrontWashSheet.json";
import Popup from "reactjs-popup";
import SinglePot from "../Images/SinglePot.png";
import DoublePot from "../Images/DoublePot.png";
import WithoutPot from "../Images/Overshelf Without Pot_Rack.png";
import DryingWithout from "../Images/Drying_Shelf Without_Pot_Rack.png";
import DryingShelfRack from "../Images/DryingShelfRack.png";
import LshapesRtoL1 from "../Images/L shapes R-L 1.png";
import LshapesRtoL2 from "../Images/L shapes R-L 2.png";
import LshapesLtoR1 from "../Images/L shapes L-R 1.png";
import LshapesLtoR2 from "../Images/L shaoes L-R 2.png";
import UshapesLtoR1 from "../Images/UshapeL-R1.png";
import UshapesLtoR2 from "../Images/UshapeL-R2.png";
import UshapesLtoR3 from "../Images/UshapeL-R3.png";
import UshapesLtoR4 from "../Images/UshapeL-R4.png";
import UshapesRtoL1 from "../Images/UshapeR-L1.png";
import UshapesRtoL2 from "../Images/UshapeR-L2.png";
import UshapesRtoL3 from "../Images/UshapeR-L3.png";
import UshapesRtoL4 from "../Images/UshapeR-L4.png";
import Select from "react-select";

import { Link } from "react-router-dom";
import {
  calculateDrain,
  selectedSinkConfig,
  selectedTabSinkConfig,
  calculateOvershelf,
} from "../Constants/global.js";
import { filterjson } from "../Constants/filterjson.js";
import { psjoblist } from "../Constants/psjoblist.js";
import { referencedata } from "../Constants/referencedata.js";
import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";
import { render } from "@testing-library/react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import PsxxCombo from "../json/PsxxCombo.json";

function Automation(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const ReactHint = ReactHintFactory(React);
  const [metaData, setMetaData] = useState(true);
  const [customerrefData, setcustomerrefData] = useState(true);
  const { userData } = props;
  const [widthValue, setWidthValue] = useState("");
  const [filterCombo, setFilterCombo] = useState();
  const [Orientation, setOrientation] = useState("");
  const [configuration, setConfiguration] = useState("");
  const [cleanDrain, setCleanDrain] = useState(0);
  const [heaterValue, setHeaterValue] = useState("");
  const [sinkDepth, setSinkDepth] = useState("14");
  const [psdisposersinklength, setPsdisposersinklengthValue] = useState();
  const [coneSize, setConeSize] = useState();
  const [psswashsinklengthValue, setPswashsinklengthValue] = useState("");
  const [soildblengthValue, setSoildblengthValue] = useState("");
  const [collectorChecked, setCollectorChecked] = useState(false);
  const [genValue, setGenValue] = useState("PS6");
  const [legValue, setLegValue] = useState("Brace Mount");
  const [deckValue, setDeckValue] = useState("35");
  const [footValue, setFootValue] = useState("Bullet Foot");
  const [dryValue, setDryValue] = useState("None");
  const [undershelf, setUndershelf] = useState("");
  const [overshelf, setOvershelf] = useState("No Overshelf");
  const [motorhpValue, setMotorHP] = useState("2HP");
  const [overshelfImage, setOvershelfImage] = useState();
  const [val, setVal] = useState("");
  const [vals, setVals] = useState("");
  const [values, setValues] = useState("");
  const [event, setEvent] = useState("");
  const [FrontRim, setfrontrim] = useState();
  const [overshelfHeight, setOvershelfHeight] = useState("");
  const [drawnDate, setDrawnDate] = useState();
  const [filteredWashLength, setFilteredWashLength] = useState();
  const [filteredDryingRack, setFilteredDryingRack] = useState();
  const [isdisable, setIsdisable] = useState(false);
  const [lengthbtw, setDrainblengthsdwValue] = useState(0);
  const [collectorLength, setCollectorLength] = useState(0);
  const [validatedDistance, setValidatedDistance] = useState("");
  const [shelfvalue, setShelfvalue] = useState("");
  const [OrientationValue, setOrientationValue] = useState("");
  const [JointType, setJointType] = useState();
  const [BackSplash, setBacksplash] = useState();
  const [splashRight, setSplashright] = useState();
  const [splashleft, setSplashleft] = useState();
  const [length, setlength] = useState("");
  const [Psx, setPsxValue] = useState();
  const [voltageValue, setVoltageValue] = useState();
  const [heaterpower, setHeaterPower] = useState();
  const [projectname, setprojectname] = useState();
  const [workorder, setworkorder] = useState();
  const [saleorder, setsaleorder] = useState();
  const [consultantname, setconsultantname] = useState();
  const [dealername, setdealername] = useState();
  const [itemnumber, setitemnumber] = useState();
  const [econumber, seteconumber] = useState();
  const [drawnby, setdrawnby] = useState();
  const [etonumber, setetonumber] = useState();
  const [notes, setnotes] = useState();
  const [myData, setData] = useState([]);
  const [externalData, setExternalData] = useState([]);
  const [enteredJSON, setEnteredJSON] = useState({});
  const [selectedObject, setSelectedObject] = useState("");
  const [OvershelflengthValue, setOvershelflengthValue] = useState("");
  const [OvershelfdistanceValue, setOvershelfdistanceValue] = useState("");
  const [psheaterpower, setPsheaterpower] = useState("");
  const [utensilbasketValue, setUtensilbasketValue] = useState("");
  const [handleUtensilBasket, setHandleUtensilBasket] = useState(false);
  const [internaldata, setInternaldata] = useState(false);

  const cleanDrainValue = useStoreState(
    (state) => state.psconfig.cleanDrainValue
  );
  const calculateDrainStore = useStoreActions(
    (actions) => actions.psconfig.calculateDrainStore
  );
  const [pssdsinklength, setPssdsinklengthValue] = useState(
    selectedSinkConfig.scrap.pssdsinklength
  );

  const { intertaluser } = props;

  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const hour = ("0" + now.getHours()).slice(-2);
  const minute = ("0" + now.getMinutes()).slice(-2);
  const formattedDate = `${year}${month}${day}${hour}${minute}`;
  const firstThree = sessionStorage.getItem("userEmailId").substring(0, 3);
  const [jobname, setJobname] = useState("");
  const [userlength, setuserLength] = useState("");
  const [checked, setChecked] = useState(false);
  const [sanitizechecked, setSanitizechecked] = useState(false);

  const Rinsevalidation = userlength > 12 && userlength < 36;
  const OverSelfValidation =
    parseInt(OvershelflengthValue) + parseInt(OvershelfdistanceValue);
  const [psscrapperdisposerunit, setPsscrapperdisposerunit] =
    useState("ScrapSink");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      maxWidth: "350px",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: "black",
      };
    },
  };

  const pendingData = (intertaluser) => {
    var url = "";
    if (intertaluser == "true") {
      selectedSinkConfig.psusermodule = "DESIGN";
      url =
        process.env.REACT_APP_CURRENT_SERVER_URL +
        ":5000/api/PSA/GetCustomerReferenceData?isinternaluser=" +
        true;
    } else {
      selectedSinkConfig.psusermodule = "CUSTOMER";
      url =
        process.env.REACT_APP_EXTERNAL_SERVER_URL +
        ":5000/api/PSA/GetCustomerReferenceData?isinternaluser=" +
        false;
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setFilteredWashLength(res.WashSinkLength);
        setFilteredDryingRack(res.DryingRack);
      });
  };

  useEffect(() => {
    let intertaluser = sessionStorage.getItem("useraud");
    if (intertaluser !== undefined || intertaluser !== null) {
      pendingData(intertaluser);
    }
  }, [intertaluser]);

  const filterData = () => {
    fetch(
      process.env.REACT_APP_CURRENT_SERVER_URL +
        ":5000/api/PSA/GetFilterData"
    )
      .then((res) => res.json())
      .then((res) => {
        setFilterCombo(res);
      });
  };

  const customerRefData = () => {
    fetch(
      process.env.REACT_APP_EXTERNAL_SERVER_URL +
        ":5000/api/PSA/GetCustomerReferenceData"
    )
      .then((res) => res.json())
      .then((res) => {
        setcustomerrefData(res);
      });
  };

  useEffect(() => {
    if (userData.length > 0) {
      const arrayData = [];
      userData.forEach((row) => {
        arrayData.push({ label: row.JobId, value: row.JobId, ...row });
      });
      setData(arrayData);
    }
  }, [userData]);

  //  external user data
  const fetchJson2 = async () => {
    // try {

    //   const response = await fetch(
    //    process.env.REACT_APP_EXTERNAL_SERVER_URL + ':5000/api/PSA/GetPSAJobIDList',{
    //       data: { useremail: "", isinternaluser: false},
    //     }
    //   );

    //   const result = await response.json();
    //   if (result.length > 0) {
    //     const arrayData = [];
    //     result.forEach((row) => {
    //       arrayData.push({ label: row.JobId, value: row.JobId, ...row });
    //     });
    //     setExternalData(arrayData);
    //   }
    // } catch (error) {
    //   console.log("external job error", error);
    // }
    var config = {
      method: "post",
      url:
        process.env.REACT_APP_EXTERNAL_SERVER_URL +
        ":5000/api/PSA/GetPSAJobIDList",
      headers: {
        "Content-type": "application/json",
      },
      data: { useremail: localStorage.getItem(""), isinternaluser: false },
    };
    axios(config)
      .then(function (response) {
        var data = response.data;
        if (data.length > 0) {
          const arrayData = [];
          data.forEach((row) => {
            arrayData.push({ label: row.JobId, value: row.JobId, ...row });
          });
          setExternalData(arrayData);
        }
      })
      .catch(function (error) {
        console.log("Invalid config internal", error);
      });
  };

  // internal user data
  const pendingInternal = () => {
    var config = {
      method: "post",
      url:
        process.env.REACT_APP_CURRENT_SERVER_URL +
        ":5000/api/PSA/GetPSAJobIDList",
      headers: {
        "Content-type": "application/json",
      },
      data: {
        useremail: sessionStorage.getItem("userEmailId"),
        isinternaluser: true,
      },
    };
    axios(config)
      .then(function (response) {
        var value = response.data;
        if (value.length > 0) {
          const arrayData = [];
          value.forEach((row) => {
            arrayData.push({ label: row.JobId, value: row.JobId, ...row });
          });
          setData(arrayData);
        }
      })
      .catch(function (error) {
        console.log("Invalid config internal", error);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("useraud")==process.env.REACT_APP_DESIGN_AUD_ID) {
      setTimeout(() => {
        pendingInternal();
      }, 5000);

      fetchJson2();
    }
  }, []);

  const handleJSONChange = (e) => {
    if (!e) {
      setEnteredJSON({});
      return;
    }
    setEnteredJSON(e);
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();
    var config = {
      method: "post",
      url:
        Object.keys(enteredJSON).length > 0 && enteredJSON?.isinternaluser
          ? process.env.REACT_APP_CURRENT_SERVER_URL +
            ":5000/api/PSA/GetPSAJobPayLoad"
          : process.env.REACT_APP_EXTERNAL_SERVER_URL +
            ":5000/api/PSA/GetPSAJobPayLoad",
      headers: {
        "Content-type": "application/json",
      },
      data: {
        useremail: sessionStorage.getItem("userEmailId"),
        JobId: enteredJSON?.JobId,
      },
    };
    axios(config)
      .then(function (response) {
        setSelectedObject(response.data);
        setInternaldata(
          Object.keys(enteredJSON).length > 0 && enteredJSON?.isinternaluser
        );
      })
      .catch((error) => {
        console.log("external job error", error);
      });
  };

  // autopopulated values in JSON
  function autopopulate() {
    var autocompletobj = {
      Orientation: selectedObject?.psorientation,
      Configuration: selectedObject?.psconfiguration,
      FrontRim: selectedObject?.top.psrims,
      BackSplash: selectedObject?.top.psbacksplash,
      EndSplashRight: selectedObject?.top.psendsplashright,
      EndSplashLeft: selectedObject?.top.psendsplashleft,
      FronttoBack: selectedObject?.psunitwidth,
      length: selectedObject?.psunitlength,
      deckValue: selectedObject?.psdeckheight,
      JointType: selectedObject?.psjointtype,
      PSXXX: selectedObject?.electricals.psxxx,
      voltage: selectedObject?.electricals.psvoltage,
      SoiledDrainBoard: selectedObject?.scrap.pssoildblength,
      ConsultantName: selectedObject?.drawingdetails.psconsultant,
      jobname: "NONE",
      OvershelfDistance: selectedObject?.overshelf.psovershelfdistance,
      OvershelfLength: selectedObject?.overshelf.psovershelflength,
    };
    reset(autocompletobj);
    handleOrientationChange({
      target: { value: selectedObject?.psorientation },
    });
    if (selectedObject?.psorientation === "Left to Right") {
      selectedSinkConfig.scrap.psscrapperdraintype = "Left Rear";
      setOrientation("Left Rear");
    } else if (selectedObject?.psorientation === "Right to Left") {
      selectedSinkConfig.scrap.psscrapperdraintype = "Right Rear";
      setOrientation("Right Rear");
    }
    setConfiguration(selectedObject?.psconfiguration);
    handleConfigurationChange({
      target: { value: selectedObject?.psconfiguration },
    });
    handleRimChange({ target: { value: selectedObject?.top.psrims } });
    handleBacksplashChange({
      target: { value: selectedObject?.top?.psbacksplash },
    });
    handleSplashrightChange({
      target: { value: selectedObject?.top?.psendsplashright },
    });
    handleSplashleftChange({
      target: { value: selectedObject?.top?.psendsplashleft },
    });
    handleWidthChange({ target: { value: selectedObject?.psunitwidth } });
    handleLengthChange({ target: { value: selectedObject?.psunitlength } });
    setDeckValue(selectedObject?.psdeckheight);
    handleJointtypeChange({ target: { value: selectedObject?.psjointtype } });
    handlePsxChange({ target: { value: selectedObject?.electricals.psxxx } });
    handleMotorChange({
      target: { value: selectedObject?.electricals.psmotor },
    });
    handleVoltageChange({
      target: { value: selectedObject?.electricals.psvoltage },
    });
    handleGenChange({ target: { value: selectedObject?.wash.psgeneration } });
    setHeaterPower(selectedObject?.electricals.psheaterpower);
    handleCrossChange({
      target: { value: selectedObject?.legassembly.pscrossrails },
    });
    setFootValue(selectedObject?.legassembly.psfoottype);
    handleFootChange({
      target: { value: selectedObject?.legassembly.psfoottype },
    });
    handleSoildblengthChange({
      target: { value: selectedObject?.scrap.pssoildblength },
    });
    handleDryingChange({
      target: { value: selectedObject?.accessories.psdryingrack },
    });
    setUndershelf(selectedObject?.accessories.psundershelf);
    handleUndershelfChange({
      target: { value: selectedObject?.accessories.psundershelf },
    });
    handleOvershelfChange({
      target: { value: selectedObject?.overshelf.psovershelf },
    });
    handleOvershelfdistanceChange({
      target: { value: selectedObject?.overshelf.psovershelfdistance },
    });
    handleOvershelflengthChange({
      target: { value: selectedObject?.overshelf.psovershelflength },
    });
    setOvershelfHeight(selectedObject?.overshelf.psovershelfheight);
    handlemodelchange({
      target: { value: selectedObject.scrap.pscollectorpartnumber },
    });
    handleUtensilbasketChange({
      target: { value: selectedObject.accessories.psutensilbasket },
    });
    // setUtensilbasketValue(selectedObject.accessories.psutensilbasket)
    setDrainblengthsdwValue(selectedObject?.scrap?.psdbbtwscrapandwash);
    setConeSize(selectedObject?.scrap.psconesize);
    // handleSpecialcratingChange({target:{value:selectedObject?.psspecialcrating}})
    if (selectedObject?.electricals.psheater == "ON") {
      handleHeaterChange({
        target: { value: selectedObject?.electricals.psheaterpower + " KW" },
      });
    } else {
      handleHeaterChange({
        target: { value: "" },
      });
    }
    selectedSinkConfig.accessories.psutensilbasket =
      selectedObject?.accessories.psutensilbasket;

    if (
      selectedObject?.overshelf.psovershelf === "NONE" ||
      selectedObject?.overshelf.psovershelf === "No Overshelf"
    ) {
      document.getElementById("overshelftooltip").hidden = true;
      document.getElementById("overshelflength").hidden = true;
      document.getElementById("overshelfheight").hidden = true;
      document.getElementById("overshelfdistancefromedge").hidden = true;
    } else {
      document.getElementById("overshelftooltip").hidden = false;
      document.getElementById("overshelflength").hidden = false;
      document.getElementById("overshelfheight").hidden = false;
      document.getElementById("overshelfdistancefromedge").hidden = false;
    }
    if (selectedObject?.accessories.psdualtempering === "OFF") {
      document.getElementById("dualtemper").checked = false;
    } else {
      document.getElementById("dualtemper").checked = true;
    }
    if (selectedObject?.accessories.pschemicaldispenser === "OFF") {
      document.getElementById("chemdispenser").checked = false;
    } else {
      document.getElementById("chemdispenser").checked = true;
    }
    if (selectedObject?.accessories.psutensilbasket === "OFF") {
      document.getElementById("utensilbasket").checked = false;
    } else {
      document.getElementById("utensilbasket").checked = true;
    }
    handleDualtemperingChange({
      target: { value: selectedObject?.accessories.psdualtempering },
    });
    handleChemicaldispenserChange({
      target: { value: selectedObject?.accessories.pschemicaldispenser },
    });
    //drawing details
    handleProjectName({
      target: { value: selectedObject?.drawingdetails.psprojectname },
    });
    handleJobNumber({
      target: { value: selectedObject?.drawingdetails.psworkordernumber },
    });
    handleSaleOrderNumber({
      target: { value: selectedObject?.drawingdetails.pssaleordernumber },
    });
    handleConsultantName({
      target: { value: selectedObject?.drawingdetails.psconsultant },
    });
    handleDealerName({
      target: { value: selectedObject?.drawingdetails.psdealer },
    });
    handleItemNumber({
      target: { value: selectedObject?.drawingdetails.psitemnumber },
    });
    handleEcoNumber({
      target: { value: selectedObject?.drawingdetails.pseconumber },
    });
    handleDrawnBy({
      target: { value: selectedObject?.drawingdetails.psdrawnby },
    });
    handleEtoNumber({
      target: { value: selectedObject?.bomdetails.psetonumber },
    });
    handledrawndate({
      target: { value: selectedObject?.bomdetails.psdrawndate },
    });
    handleCustomnotesChange({
      target: { value: selectedObject?.drawingdetails.psspecialnotes },
    });
  }

  useEffect(() => {
    if (selectedObject) {
      autopopulate();
    }
  }, [selectedObject]);

  useEffect(() => {
    filterData();

    setFilterCombo(filterjson);
    setMetaData(referencedata);

    selectedSinkConfig.wash.psgeneration = "PS6";

    selectedSinkConfig.legassembly.pscrossrails = "Brace Mount";
    selectedSinkConfig.psdeckheight = 35;
    selectedSinkConfig.legassembly.psfoottype = "Bullet Foot";
    selectedSinkConfig.accessories.psdryingrack = "NONE";
    selectedSinkConfig.accessories.psundershelf = "NONE";
    selectedSinkConfig.overshelf.psovershelf = "NONE";
    selectedSinkConfig.electricals.psheater = "OFF";
    selectedSinkConfig.electricals.psmotor = "2HP";
    document.getElementById("AWI").disabled = true;
    document.getElementById("utensilbasket").checked = true;
    document.getElementById("dualtemper").checked = false;
    document.getElementById("chemdispenser").checked = false;
  }, []);

  const handleLengthChange = (e) => {
    const regex = /^[0-9]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setlength(e.target.value);
    }
    selectedSinkConfig.psunitlength = parseFloat(e.target.value);
    setlength(e.target.value);

    calculateDrainStore({
      unitLength: e.target.value,
      leftEndSplash: selectedSinkConfig.top.psendsplashleft,
      rightEndSplash: selectedSinkConfig.top.psendsplashright,
      soildDrainBoard: selectedSinkConfig.scrap.pssoildblength,
      scrapLength: selectedSinkConfig.scrap.pssdsinklength,
      distanceBtwSandD: selectedSinkConfig.scrap.psdbbtwscrapandwash,
      disposerLength: selectedSinkConfig.scrap.psdisposersinklength,
      disposerCone: selectedSinkConfig.scrap.psconesize,
      collectorLength: collectorLength,
      washLength: selectedSinkConfig.wash.pswashsinklength,
      rinseLength: selectedSinkConfig.rinse.psrinsesinklength,
      sanitizeLength: selectedSinkConfig.sanitize.pssanitizesinklength,
    });
    calculateDrain(
      e.target.value,
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
      selectedSinkConfig.sanitize.pssanitizesinklength
    );
    setCleanDrain(document.getElementById("cleandrainboard").value);
  };
  const handleDepthChange = (e) => {
    setDeckValue(e.target.value);
    selectedSinkConfig.psdeckheight = parseFloat(e.target.value);
  };
  const handleWidthChange = (e) => {
    setWidthValue(e.target.value);
    selectedSinkConfig.psunitwidth = parseFloat(e.target.value);
    if (e.target.value == "30") {
      document.getElementById("sssheetpanrack").hidden = true;
      document.getElementById("sssheetpanracklabel").hidden = true;
      document.getElementById("sssheetpanracktip").hidden = true;
    } else {
      document.getElementById("sssheetpanrack").hidden = false;
      document.getElementById("sssheetpanracklabel").hidden = false;
      document.getElementById("sssheetpanracktip").hidden = false;
    }
  };
  const [model, setmodel] = useState();
  const handlemodelchange = (e) => {
    if (e.target.value == "S914") {
      setCollectorLength(24.125);
    } else if (e.target.value == "P914") {
      setCollectorLength(35.75);
    } else if (e.target.value == "PSM") {
      setCollectorLength(45.5);
    } else if (e.target.value == "SM") {
      setCollectorLength(36.5);
    } else {
      setCollectorLength(0);
    }
    selectedSinkConfig.scrap.pscollectorpartnumber = e.target.value;
    setmodel(e.target.value);
  };

  const handlesinkupdate = (e) => {
    setSinkDepth(e.target.value);
    selectedSinkConfig.rinse.psrinsesinkdepth = parseFloat(e.target.value);
    selectedSinkConfig.sanitize.pssanitizesinkdepth = parseFloat(
      e.target.value
    );
  };
  const handleRimChange = (e) => {
    setfrontrim(e.target.value);
    selectedSinkConfig.top.psrims = e.target.value;
  };
  const handleBacksplashChange = (e) => {
    setBacksplash(e.target.value);
    selectedSinkConfig.top.psbacksplash = e.target.value;
  };
  const handleSplashrightChange = (e) => {
    setSplashright(e.target.value);
    selectedSinkConfig.top.psendsplashright = e.target.value;
    calculateDrain(
      selectedSinkConfig.psunitlength,
      selectedSinkConfig.top.psendsplashleft,
      e.target.value,
      selectedSinkConfig.scrap.pssoildblength,
      selectedSinkConfig.scrap.pssdsinklength,
      selectedSinkConfig.scrap.psdbbtwscrapandwash,
      selectedSinkConfig.scrap.psdisposersinklength,
      selectedSinkConfig.scrap.psconesize,
      selectedSinkConfig.wash.pswashsinklength,
      selectedSinkConfig.rinse.psrinsesinklength,
      selectedSinkConfig.sanitize.pssanitizesinklength
    );
    setCleanDrain(document.getElementById("cleandrainboard").value);
  };
  const handleSplashleftChange = (e) => {
    setSplashleft(e.target.value);
    selectedSinkConfig.top.psendsplashleft = e.target.value;
    calculateDrain(
      selectedSinkConfig.psunitlength,
      e.target.value,
      selectedSinkConfig.top.psendsplashright,
      selectedSinkConfig.scrap.pssoildblength,
      selectedSinkConfig.scrap.pssdsinklength,
      selectedSinkConfig.scrap.psdbbtwscrapandwash,
      selectedSinkConfig.scrap.psdisposersinklength,
      selectedSinkConfig.scrap.psconesize,
      collectorLength,
      selectedSinkConfig.wash.pswashsinklength,
      selectedSinkConfig.rinse.psrinsesinklength,
      selectedSinkConfig.sanitize.pssanitizesinklength
    );
  };

  const onRenderContent = (e) => {
    return (
      <div>
        <img src={PDF} width={240} />
        <button>Ok</button>
      </div>
    );
  };
  const handleWashLengthFilter = () => {
    if (
      filterCombo &&
      filterCombo.WashSinkLength &&
      filterCombo.WashSinkLength[
        selectedSinkConfig.electricals.psxxx +
          "_" +
          selectedSinkConfig.electricals.psmotor +
          "_" +
          selectedSinkConfig.electricals.psvoltage +
          "_" +
          selectedSinkConfig.wash.psgeneration
      ]
    ) {
      setFilteredWashLength(
        filterCombo.WashSinkLength[
          selectedSinkConfig.electricals.psxxx +
            "_" +
            selectedSinkConfig.electricals.psmotor +
            "_" +
            selectedSinkConfig.electricals.psvoltage +
            "_" +
            selectedSinkConfig.wash.psgeneration
        ]
      );
    } else {
      setFilteredWashLength([]);
    }
  };
  const handlePsxChange = (e) => {
    setPsxValue(e.target.value);
    selectedSinkConfig.electricals.psxxx = e.target.value;
    if (
      e.target.value ==
        "PS-275 CONTROL, ULTRA-BRIGHT, DEEP CLEAN/HIGH TEMP ALERT" ||
      e.target.value == "PS-200 STANDARD CONTROL W/HEAT" ||
      e.target.value == "PS-225 CONTROL, ULTRA-BRIGHT ALERT SYSTEM W/HEAT"
    ) {
      setHeaterValue("ON");
      selectedSinkConfig.electricals.psheater = "ON";
      selectedSinkConfig.electricals.psheaterpower = 7;
    } else {
      setHeaterValue("OFF");
      selectedSinkConfig.electricals.psheater = "OFF";
    }

    handleWashLengthFilter();
    if (e.target.value == "PS-50 CONTROL, NO HEAT") {
      document.getElementById("voltage").value = "208V/1P";
      selectedSinkConfig.electricals.psvoltage = "208V/1P";
    } else {
      document.getElementById("voltage").value = "208V/3P";
      selectedSinkConfig.electricals.psvoltage = "208V/3P";
    }
  };

  const handleMotorChange = (e) => {
    setMotorHP(e.target.value);
    selectedSinkConfig.electricals.psmotor = e.target.value;
    handleWashLengthFilter();
  };

  const handleVoltageChange = (e) => {
    setVoltageValue(e.target.value);
    selectedSinkConfig.electricals.psvoltage = e.target.value;
    handleWashLengthFilter();
  };

  const handleCleandrainboardChange = (e) => {
    handleDryingRackCombo(e.target.value);
  };

  const handleDryingRackCombo = (e) => {
    if (e < 17) {
      setFilteredDryingRack(filterCombo.DryingRack[15]);
    } else if (e < 20) {
      setFilteredDryingRack(filterCombo.DryingRack[17]);
    } else if (e < 21) {
      setFilteredDryingRack(filterCombo.DryingRack[20]);
    } else if (e < 23) {
      setFilteredDryingRack(filterCombo.DryingRack[21]);
    } else if (e < 25) {
      setFilteredDryingRack(filterCombo.DryingRack[23]);
    } else if (e < 27) {
      setFilteredDryingRack(filterCombo.DryingRack[25]);
    } else if (e < 31) {
      setFilteredDryingRack(filterCombo.DryingRack[27]);
    } else {
      setFilteredDryingRack(filterCombo.DryingRack[31]);
    }
  };

  const handleSoildblengthChange = (e) => {
    const regex = /^[0-9]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setSoildblengthValue(e.target.value);
    }
    setSoildblengthValue(e.target.value);

    calculateDrain(
      selectedSinkConfig.psunitlength,
      selectedSinkConfig.top.psendsplashleft,
      selectedSinkConfig.top.psendsplashright,
      parseFloat(e.target.value),
      selectedSinkConfig.scrap.pssdsinklength,
      selectedSinkConfig.scrap.psdbbtwscrapandwash,
      selectedSinkConfig.scrap.psdisposersinklength,
      selectedSinkConfig.scrap.psconesize,
      collectorLength,
      selectedSinkConfig.wash.pswashsinklength,
      selectedSinkConfig.rinse.psrinsesinklength,
      selectedSinkConfig.sanitize.pssanitizesinklength
    );
    setCleanDrain(document.getElementById("cleandrainboard").value);
    selectedSinkConfig.scrap.pssoildblength = parseFloat(e.target.value);
  };

  const onBlurone = (e) => {
    if (
      selectedSinkConfig.scrap.pssoildblength > 0 &&
      selectedSinkConfig.scrap.pssoildblength <= 12
    ) {
    }
  };

  const handleGenChange = (e) => {
    setGenValue(e.target.value);
    selectedSinkConfig.wash.psgeneration = e.target.value;
    selectedTabSinkConfig.wash.psgeneration = e.target.value;
    if (e.target.value === "PS6") {
      document.getElementById("utensilbasket").checked = true;
      document.getElementById("utensilbasket").disabled = false;
      document.getElementById("AWI").checked = false;
      selectedSinkConfig.accessories.psutensilbasket = "ON";
      selectedSinkConfig.wash.psadvancedwashinsert = "OFF";
    } else if (e.target.value === "PS3") {
      document.getElementById("utensilbasket").disabled = true;
      document.getElementById("utensilbasket").checked = false;
      document.getElementById("AWI").checked = true;
      document.getElementById("AWI").disabled = false;
      document.getElementById("awisheetpanrack").hidden = true;
      document.getElementById("awisheetpanracktooltip").hidden = false;
      document.getElementById("sssheetpanrack").hidden = true;
      document.getElementById("sssheetpanracklabel").hidden = true;
      document.getElementById("sssheetpanracktip").hidden = true;
      selectedSinkConfig.accessories.psutensilbasket = "OFF";
      selectedSinkConfig.wash.psadvancedwashinsert = "ON";
      selectedSinkConfig.wash.pssheetpanrack = "NONE";
    }

    handleWashLengthFilter();
  };

  const handleCrossChange = (e) => {
    setLegValue(e.target.value);
    selectedSinkConfig.legassembly.pscrossrails = e.target.value;
  };

  const handleHeaterChange = (e) => {
    setPsheaterpower(e.target.value);
    if (e.target.value == "7 KW") {
      selectedSinkConfig.electricals.psheater = "ON";
      selectedSinkConfig.electricals.psheaterpower = 7;
      setHeaterValue("ON");
    } else if (e.target.value == "2.5 KW") {
      selectedSinkConfig.electricals.psheater = "ON";
      selectedSinkConfig.electricals.psheaterpower = 2.5;
      setHeaterValue("ON");
    } else if (e.target.value == "Select") {
      setHeaterValue("ON");
    } else {
      selectedSinkConfig.electricals.psheater = "OFF";
      selectedSinkConfig.electricals.psheaterpower = 0;
      setHeaterValue("OFF");
    }
    handleWashLengthFilter();
  };

  const handleFootChange = (e) => {
    setFootValue(e.target.value);
    selectedSinkConfig.legassembly.psfoottype = e.target.value;
    selectedSinkConfig.legassembly.psfoottype = e.target.value;
  };
  const handleDryingChange = (e) => {
    setDryValue(e.target.value);
    selectedSinkConfig.accessories.psdryingrack = e.target.value;
    document.getElementById("dryingracktooltip").hidden = true;
    if (e.target.value != "select" && e.target.value != "None") {
      document.getElementById("dryingracktooltip").hidden = false;
    }
  };
  const handleUndershelfChange = (e) => {
    setUndershelf(e.target.value);
    selectedSinkConfig.accessories.psundershelf = e.target.value;
    document.getElementById("undershelftooltip").hidden = true;
    if (e.target.value != "No Undershelf" && e.target.value != "select") {
      document.getElementById("undershelftooltip").hidden = false;
    }
  };
  const handleOrientationChange = (e) => {
    setOrientationValue(e.target.value);
    if (e.target.value === "Left to Right") {
      selectedSinkConfig.scrap.psscrapperdraintype = "Left Rear";
      setOrientation("Left Rear");
    } else if (e.target.value === "Right to Left") {
      selectedSinkConfig.scrap.psscrapperdraintype = "Right Rear";
      setOrientation("Right Rear");
    }

    selectedSinkConfig.psorientation = e.target.value;
  };
  const handleConfigurationChange = (e) => {
    setConfiguration(e.target.value);
    selectedSinkConfig.psconfiguration = parseFloat(e.target.value);

    if (e.target.value === "Straight 2PC") {
      document.getElementById("jointtype").style.display = "block";
      selectedSinkConfig.psjointtype = "JBZ";
      selectedSinkConfig.psjointtype = "Field Weld";
    } else {
      if (e.target.value === "Straight 1PC") {
        selectedSinkConfig.psjointtype = "1PC"; //Default 1pc as joint type
      }

      document.getElementById("jointtype").style.display = "none";
    }
    selectedSinkConfig.psconfiguration = e.target.value;
  };

  const handleReferenceChange = (e) => {};
  const handleProjectName = (e) => {
    selectedSinkConfig.drawingdetails.psprojectname = e.target.value;
    setprojectname(e.target.value);
  };
  const handleJobNumber = (e) => {
    //selectedSinkConfig.drawingdetails.psworkordernumber = parseInt(e.target.value);
    selectedSinkConfig.drawingdetails.psworkordernumber = e.target.value;
    setworkorder(e.target.value);
  };

  const handleSaleOrderNumber = (e) => {
    //selectedSinkConfig.drawingdetails.pssaleordernumber = parseInt(e.target.value);
    selectedSinkConfig.drawingdetails.pssaleordernumber = e.target.value;
    setsaleorder(e.target.value);
  };

  const handleConsultantName = (e) => {
    selectedSinkConfig.drawingdetails.psconsultant = e.target.value;
    setconsultantname(e.target.value);
  };

  const handleDealerName = (e) => {
    selectedSinkConfig.drawingdetails.psdealer = e.target.value;
    setdealername(e.target.value);
  };
  const handleItemNumber = (e) => {
    selectedSinkConfig.drawingdetails.psitemnumber = e.target.value;
    setitemnumber(e.target.value);
  };
  const handleEcoNumber = (e) => {
    selectedSinkConfig.drawingdetails.pseconumber = e.target.value;
    seteconumber(e.target.value);
  };
  const handleDrawnBy = (e) => {
    selectedSinkConfig.drawingdetails.psdrawnby = e.target.value;
    setdrawnby(e.target.value);
  };

  const handleJSON = (e) => {
    //selectedSinkConfig.json = e.target.value;
  };
  const handleEtoNumber = (e) => {
    selectedSinkConfig.bomdetails.psetonumber = e.target.value;
    setetonumber(e.target.value);
  };

  const handledrawndate = (e) => {
    setDrawnDate(e.target.value);
    selectedSinkConfig.bomdetails.psdrawndate = e.target.value;
  };

  const handleJointtypeChange = (e) => {
    selectedSinkConfig.psjointtype = e.target.value;
    setJointType(e.target.value);
  };

  const handleDualtemperingChange = (e) => {
    selectedSinkConfig.accessories.psdualtempering =
      e.target.value.toUpperCase();
  };
  const handleChemicaldispenserChange = (e) => {
    //  setChemicaldispenserValue(e.target.value);
    selectedSinkConfig.accessories.pschemicaldispenser =
      e.target.value.toUpperCase();
  };
  const handleUtensilbasketChange = (e) => {
    setUtensilbasketValue(e.target.value);
    setHandleUtensilBasket(true);
    if (e.target.checked) {
      selectedSinkConfig.accessories.psutensilbasket = "ON";
      document.getElementById("AWI").disabled = true;
      document.getElementById("AWI").checked = false;
    } else {
      document.getElementById("AWI").disabled = false;
      selectedSinkConfig.accessories.psutensilbasket = "OFF";
    }
  };

  const handleSpecialcratingChange = (e) => {
    // setSpecialcratingValue(e.target.value);
    selectedSinkConfig.psspecialcrating = e.target.value;
  };

  const handleCustomnotesChange = (e) => {
    selectedSinkConfig.drawingdetails.psspecialnotes = e.target.value;
    setnotes(e.target.value);
  };

  const handleOvershelfChange = (e) => {
    selectedSinkConfig.overshelf.psovershelf = e.target.value;

    if (e.target.value == "No Overshelf") {
      selectedSinkConfig.overshelf.psovershelf = "NONE";

      selectedSinkConfig.overshelf.psovershelfdistance = 0;
      selectedSinkConfig.overshelf.psovershelflength = 0;
      setEvent(0);
      setValues(0);
    }
    setOvershelf(e.target.value);
    document.getElementById("overshelftooltip").hidden = false;
    document.getElementById("overshelflength").hidden = false;
    document.getElementById("overshelfheight").hidden = false;
    document.getElementById("overshelfdistancefromedge").hidden = false;

    if (
      e.target.value == "Texas-Slotted Over Shelf with Double Pot Rack" ||
      e.target.value == "Non Texas-Slotted Over Shelf with Double Pot Rack"
    ) {
      setOvershelfImage(DoublePot);
    } else if (
      e.target.value == "Texas-Slotted Over Shelf with Single Pot Rack" ||
      e.target.value == "Non Texas-Slotted Over Shelf with Single Pot Rack"
    ) {
      setOvershelfImage(SinglePot);
    } else if (e.target.value == "Drying Shelf with Pot Rack") {
      setOvershelfImage(DryingShelfRack);
    } else if (
      e.target.value == "Non Texas-Slotted Over Shelf without Pot Rack" ||
      e.target.value == "Texas-Slotted Over Shelf without Pot Rack"
    ) {
      setOvershelfImage(WithoutPot);
    } else if (e.target.value == "Drying Shelf without Pot Rack") {
      setOvershelfImage(DryingWithout);
    } else if (e.target.value == "No Overshelf") {
      document.getElementById("overshelftooltip").hidden = true;
      document.getElementById("overshelflength").hidden = true;
      document.getElementById("overshelfheight").hidden = true;
      document.getElementById("overshelfdistancefromedge").hidden = true;
    } else {
      setOvershelfImage();
      document.getElementById("overshelftooltip").hidden = true;
    }

    const handleOvershelfheightChange = (e) => {
      // if (e.target.value == "No Overshelf" || e.target.value == "select") {
      document.getElementById("").hidden = true;
      document.getElementById("overshelfheight").hidden = true;
      document.getElementById("overshelfdistancefromedge").hidden = true;
    };
    if (
      e.target.value == "Texas-Slotted Over Shelf with Double Pot Rack" ||
      e.target.value == "Non Texas-Slotted Over Shelf with Double Pot Rack" ||
      e.target.value == "Drying shelf with Double pot rack"
    ) {
      setOvershelfHeight(82);
      selectedSinkConfig.overshelf.psovershelfheight = 82;
    } else if (
      e.target.value == "Texas-Slotted Over Shelf with Single Pot Rack" ||
      e.target.value == "Drying Shelf with Pot Rack" ||
      e.target.value == "Non Texas-Slotted Over Shelf with Single Pot Rack"
    ) {
      setOvershelfHeight(84);
      selectedSinkConfig.overshelf.psovershelfheight = 84;
    } else if (
      e.target.value == "Non Texas-Slotted Over Shelf without Pot Rack" ||
      e.target.value == "Texas-Slotted Over Shelf without Pot Rack" ||
      e.target.value == "Drying Shelf without Pot Rack"
    ) {
      setOvershelfHeight(58);
      selectedSinkConfig.overshelf.psovershelfheight = 58;
    } else {
      setOvershelfHeight(0);
      selectedSinkConfig.overshelf.psovershelfheight = 0;
    }
  };

  const handleOvershelflengthChange = (e) => {
    selectedSinkConfig.overshelf.psovershelflength = parseFloat(e.target.value);
    setOvershelflengthValue(e.target.value);
    const regex = /^[0-9]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setOvershelflengthValue(e.target.value);
    }
  };
  const testmouse = () => {};

  // Overshelf Distance From Edge:
  const calculateFlashLength = (Splash) => {
    switch (Splash) {
      case "SQR Es":
        return 1.5;
        break;
      case "Roll Es":
        return 1.5;
        break;
      case "Up Es":
        return 2;
        break;
      case "Down Es":
        return 2;
        break;
      case "1 Es":
        return 1;
        break;
      default:
        return 0;
        break;
    }
  };

  var calculateOvershelf = (
    unitLength,
    leftEndSplash,
    rightEndSplash,
    scrapLength,
    disposerLength,
    disposerCone,
    psdbbtwscrapandwash,
    collectorLength,
    washLength,
    rinseLength,
    sanitizeLength,
    soildDrainBoard,
    psovershelf,
    psovershelfdistance,
    psovershelflength,
    preRinseCenterPosition,
    rinseCenterPosition,
    sanitizeCenterPosition,
    shelfEndstoPoleAxisDis,
    faucetClearanceDistance,
    faucetOtoODistance,
    lastPoleCenterPosition,
    firstPoleCenterPosition
  ) => {
    var shelfRestrictedValue = [];

    var scrapSinkLength = "";
    var preRinseCenterPosition = "";
    var rinseCenterPosition = "";
    var sanitizeCenterPosition = "";

    if (
      leftEndSplash != null &&
      leftEndSplash != "" &&
      rightEndSplash != null &&
      rightEndSplash != ""
    ) {
      let leftsplashLength = calculateFlashLength(leftEndSplash);
      let rightsplashLength = calculateFlashLength(rightEndSplash);

      scrapSinkLength =
        scrapLength + disposerLength + disposerCone + collectorLength;

      preRinseCenterPosition = Math.round(
        leftsplashLength + soildDrainBoard + scrapSinkLength / 2,
        3
      );
      rinseCenterPosition = Math.round(
        leftsplashLength +
          soildDrainBoard +
          scrapSinkLength +
          psdbbtwscrapandwash +
          washLength +
          rinseLength / 2,
        3
      );
      sanitizeCenterPosition = Math.round(
        leftsplashLength +
          soildDrainBoard +
          scrapSinkLength +
          psdbbtwscrapandwash +
          washLength +
          rinseLength +
          sanitizeLength / 2,
        3
      );

      var shelfEndstoPoleAxisDis = 4.251;
      if (psovershelf.includes("Drying")) {
        shelfEndstoPoleAxisDis = 5.25;
      }

      var faucetCtoCDistance = 8;
      var faucetOtoODistance = 10;
      var faucetClearanceDistance = 2;

      firstPoleCenterPosition = Math.round(
        psovershelfdistance + shelfEndstoPoleAxisDis,
        3
      );

      var firstPoleOrientation = PolePosition(
        firstPoleCenterPosition,
        preRinseCenterPosition,
        faucetOtoODistance,
        faucetClearanceDistance
      );

      if (
        firstPoleOrientation == "AFTER" ||
        firstPoleOrientation == "CENTER" ||
        firstPoleOrientation == "BEFORE"
      ) {
        firstPoleCenterPosition = Math.round(
          preRinseCenterPosition +
            faucetOtoODistance / 2 +
            faucetClearanceDistance,
          3
        );
      }

      var validatedShelfStartDistance = Math.ceil(
        firstPoleCenterPosition - shelfEndstoPoleAxisDis
      );
      setValidatedDistance(validatedShelfStartDistance);

      lastPoleCenterPosition = Math.round(
        validatedShelfStartDistance +
          psovershelflength -
          shelfEndstoPoleAxisDis,
        3
      );

      var rinseStartValue = Math.round(
        rinseCenterPosition - faucetOtoODistance / 2 - faucetClearanceDistance,
        3
      );

      var rinseEndValue = Math.round(
        rinseCenterPosition + faucetOtoODistance / 2 + faucetClearanceDistance,
        3
      );

      var preRinseStartValue = Math.round(
        preRinseCenterPosition -
          faucetOtoODistance / 2 -
          faucetClearanceDistance,
        3
      );
      var preRinseEndValue = Math.round(
        preRinseCenterPosition +
          faucetOtoODistance / 2 +
          faucetClearanceDistance,
        3
      );

      var sanitizeStartValue = Math.round(
        sanitizeCenterPosition -
          faucetOtoODistance / 2 -
          faucetClearanceDistance,
        3
      );

      var sanitizeEndValue = Math.round(
        sanitizeCenterPosition +
          faucetOtoODistance / 2 +
          faucetClearanceDistance,
        3
      );

      shelfRestrictedValue.push(
        Math.round(rinseStartValue + shelfEndstoPoleAxisDis - validatedDistance)
      );

      shelfRestrictedValue.push(
        Math.round(rinseEndValue + shelfEndstoPoleAxisDis - validatedDistance)
      );

      shelfRestrictedValue.push(
        Math.round(
          sanitizeStartValue + shelfEndstoPoleAxisDis - validatedDistance
        )
      );

      shelfRestrictedValue.push(
        Math.round(
          sanitizeEndValue + shelfEndstoPoleAxisDis - validatedDistance
        )
      );

      if (shelfRestrictedValue[2] - shelfRestrictedValue[1] < 5) {
        shelfRestrictedValue.splice(1, 2);
      }
      setShelfvalue(shelfRestrictedValue);

      function PolePosition(
        poleCenterPosition,
        faucetCenterPosition,
        faucetOtoODistance,
        faucetClearanceDistance
      ) {
        if (
          poleCenterPosition > faucetCenterPosition &&
          poleCenterPosition <=
            faucetCenterPosition +
              faucetOtoODistance / 2 +
              faucetClearanceDistance
        )
          return "AFTER";
        else if (
          poleCenterPosition < faucetCenterPosition &&
          poleCenterPosition >=
            faucetCenterPosition -
              faucetOtoODistance / 2 -
              faucetClearanceDistance
        )
          return "BEFORE";
        else if (poleCenterPosition == faucetCenterPosition) return "CENTER";
        else return "NO INTERFERENCE";
      }
    }
  };

  const handleOvershelfdistanceChange = (e) => {
    selectedSinkConfig.overshelf.psovershelfdistance = parseFloat(
      e.target.value
    );
    setOvershelfdistanceValue(e.target.value);
    const regex = /^[0-9]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setOvershelfdistanceValue(e.target.value);
    }
    calculateOvershelf(
      selectedSinkConfig.psunitlength,
      selectedSinkConfig.top.psendsplashleft,
      selectedSinkConfig.top.psendsplashright,
      selectedSinkConfig.scrap.pssdsinklength,
      selectedSinkConfig.scrap.psdisposersinklength,
      selectedSinkConfig.scrap.psconesize,
      selectedSinkConfig.scrap.psdbbtwscrapandwash,
      collectorLength,
      selectedSinkConfig.wash.pswashsinklength,
      selectedSinkConfig.rinse.psrinsesinklength,
      selectedSinkConfig.sanitize.pssanitizesinklength,
      selectedSinkConfig.scrap.pssoildblength,
      selectedSinkConfig.overshelf.psovershelf,
      selectedSinkConfig.overshelf.psovershelfdistance,
      selectedSinkConfig.overshelf.psovershelflength
    );
  };
  // L shape left to right
  const handleLshapelefttorightandleftimg = () => {
    alert("left img");
  };

  const handleLshapelefttorightandrightimg = () => {
    alert("right img");
  };
  // L shape right to left
  const handleLshaperighttoleftandleftimg = () => {
    alert("left img");
  };

  const handleLshaperighttoleftandrightimg = () => {
    alert("right img");
  };
  // U shape letf to right
  const handleUshapelefttorightandleftimg = () => {
    alert("left img");
  };

  const handleUshapelefttorightandleftbottomimg = () => {
    alert("left bottom img");
  };

  const handleUshapelefttorightandrightimg = () => {
    alert("right img");
  };

  const handleUshapelefttorightandrightbottomimg = () => {
    alert("right bottom img");
  };

  // U shape right to left
  const handleUshaperighttoleftandleftimg = () => {
    alert("left img");
  };

  const handleUshaperighttoleftandleftbottomimg = () => {
    alert("left bottom img");
  };

  const handleUshaperighttoleftandrightimg = () => {
    alert("right img");
  };

  const handleUshaperighttoleftandrightbottomimg = () => {
    alert("right bottom img");
  };

  // sinks components validate
  const isValid = Object.keys(selectedTabSinkConfig).every((key) => {
    const section = selectedTabSinkConfig[key];
    return Object.keys(section).every((prop) => {
      const value = section[prop];
      return value !== "" && value != null && value !== "NONE" && value !== 0;
    });
  });

  // .................onsubmit function.............

  const onSubmit = (data, e) => {
    console.log(selectedSinkConfig.scrap.pssdsinkwaterinlet, "data");

    selectedSinkConfig.psjobrequesteduser = sessionStorage.getItem("userEmailId");
    selectedSinkConfig.psjobid = formattedDate + "_" + firstThree;

    if (selectedSinkConfig.scrap.psdisposermake == "NONE") {
      selectedSinkConfig.scrap.psdisposermake = selectedObject?.scrap
        ?.psdisposermake
        ? selectedObject?.scrap?.psdisposermake
        : "NONE";
    }

    if (selectedSinkConfig.scrap.pscollectormake == "NONE") {
      selectedSinkConfig.scrap.pscollectormake = selectedObject?.scrap
        ?.pscollectormake
        ? selectedObject?.scrap?.pscollectormake
        : "NONE";
    }
    if (selectedSinkConfig.scrap.pssdsinkwaterinlet == "NONE") {
      selectedSinkConfig.scrap.pssdsinkwaterinlet = selectedObject?.scrap
        ?.pssdsinkwaterinlet
        ? selectedObject?.scrap?.pssdsinkwaterinlet
        : "NONE";
    }
    // console.log(!handleUtensilBasket, selectedSinkConfig?.accessories.psutensilbasket == "ON");
    //     if (handleUtensilBasket) {
    //       selectedSinkConfig.accessories.psutensilbasket = "ON"
    //     }

    if (Object.keys(enteredJSON).length > 0 && enteredJSON?.JobId !== "") {
      selectedSinkConfig.psjobid = enteredJSON?.JobId;
      // post Call make update call

      var config = {
        method: "post",
        url: internaldata
          ? process.env.REACT_APP_CURRENT_SERVER_URL +
            ":5000/api/PSA/UpdateJobRequest"
          : process.env.REACT_APP_CURRENT_SERVER_URL + ":5000/api/PSA",
        headers: {
          "Content-type": "application/json",
        },
        data: selectedSinkConfig,
      };

      if (isValid) {
        axios(config)
          .then(function (response) {
            alert("Configuration successfully submitted");
          })
          .catch(function (error) {
            alert("Configuration submission failed. Please check all fields!");
          });
        return;
      } else {
        alert(
          "Configuration submission failed. Please check all Sinks fields!"
        );
      }

      return;
    }
    var config = {
      method: "post",
      url: process.env.REACT_APP_CURRENT_SERVER_URL + ":5000/api/PSA",
      headers: {
        "Content-type": "application/json",
      },
      data: selectedSinkConfig,
    };

    if (isValid) {
      axios(config)
        .then(function (response) {
          alert("Configuration successfully submitted");
        })
        .catch(function (error) {
          alert("Configuration submission failed. Please check all fields!");
        });
      return;
    } else {
      alert("Configuration submission failed. Please check all Sinks fields!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} name="unitfeatureform">
        <div className="powersoak">
          <Container fluid>
            <Row>
              <Col xs={2}>
                
                {sessionStorage.getItem("useraud")==process.env.REACT_APP_DESIGN_AUD_ID && (
                  <Form.Label>
                    <p style={{ fontSize: 15 }}>Previous Configuration</p>
                  </Form.Label>
                )}
              </Col>
              <Col xs={4}>
                {sessionStorage.getItem("useraud")==process.env.REACT_APP_DESIGN_AUD_ID && (
                  <div>
                    <Select
                      options={[...myData, ...externalData]}
                      styles={colourStyles}
                      isClearable
                      placeholder="Enter Previous Configuration"
                      onChange={handleJSONChange}
                      value={
                        enteredJSON?.JobId
                          ? [
                              {
                                label: enteredJSON?.JobId,
                                value: enteredJSON?.JobId,
                              },
                            ]
                          : ""
                      }
                    ></Select>
                  </div>
                )}
              </Col>
              <Col xs={2}>
                {sessionStorage.getItem("useraud")==process.env.REACT_APP_DESIGN_AUD_ID && (
                  <button className="Searchbtn" onClick={handleSearchClick}>
                    Search
                  </button>
                )}
              </Col>
            </Row>
          </Container>

          <Container fluid>
            <Row>
              <Col lg={3} xs={12} sm={12} md={6}>
                <Form.Group as={Row}>
                  <Col lg={4} xs={12} sm={12} md={6}>
                    <Form.Label>Orientation:</Form.Label>
                  </Col>
                  <Col lg={8} xs={12} sm={12} md={6}>
                    <Controller
                      name="Orientation"
                      control={control}
                      render={({ field }) => (
                        <Form.Select
                          name="Orientation"
                          value={OrientationValue}
                          id="PowerSoakOrientation"
                          aria-label="Default select example"
                          className={
                            errors.Orientation
                              ? "form-select-error"
                              : "form-select"
                          }
                          onChange={(e) => {
                            handleOrientationChange(e);
                            field.onChange(e);
                          }}
                        >
                          <option value="">Select</option>

                          {metaData?.Orientation?.map((element, index) => (
                            <option key={index} value={element.value}>
                              {element.desc}{" "}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                      rules={{ required: "Please select Orientation" }}
                    />

                    {errors &&
                      errors.Orientation &&
                      !!errors.Orientation?.message && (
                        <p style={{ color: "red", fontSize: 10 }}>
                          {errors.Orientation?.message}
                        </p>
                      )}
                  </Col>
                </Form.Group>
              </Col>

              <Col hidden={true} style={{ flex: 0 }}>
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
                  mouseLeaveDelay={0}
                  mouseEnterDelay={0}
                  contentStyle={{ padding: "0px", border: "none" }}
                  arrow={false}
                >
                  <img src={Drying_Rack} width={450} height={300} k />
                </Popup>
              </Col>

              <Col lg={3} xs={12} sm={12} md={6}>
                <Form.Group as={Row}>
                  <Col lg={4} xs={12} sm={12} md={6}>
                    <Form.Label>Configuration:</Form.Label>
                  </Col>
                  <Col lg={8} xs={12} sm={12} md={6}>
                    <Controller
                      name="Configuration"
                      control={control}
                      render={({ field }) => (
                        <Form.Select
                          name="Configuration"
                          className={
                            errors.Configuration
                              ? "form-select-error"
                              : "form-select"
                          }
                          value={configuration}
                          aria-label="Default selectce  example"
                          onChange={(e) => {
                            handleConfigurationChange(e);
                            field.onChange(e);
                          }}
                          // onChange={()=>{handleConfigurationChange}}
                        >
                          <option value="">Select</option>
                          {metaData?.Configuration?.map((element, index) => (
                            <option key={index} value={element.value}>
                              {element.desc}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                      rules={{ required: "Please select Configuration" }}
                    />
                    <p style={{ color: "red", fontSize: 10 }}>
                      {errors.Configuration?.message}
                    </p>
                  </Col>

                  <ReactHint autoPosition />
                  <ReactHint
                    autoPosition
                    events
                    // onRenderContent={onRenderContent}
                    onRenderContent={(target) => (
                      <div>
                        <p>Test</p>
                      </div>
                    )}
                  />
                </Form.Group>
              </Col>
              <Col lg={3} xs={12} sm={12} md={6}>
                <Form.Group as={Row}>
                  <Col lg={5} xs={12} sm={12} md={6}>
                    <Form.Label>Job Name:</Form.Label>
                  </Col>
                  <Col lg={7} xs={12} sm={12} md={6}>
                    <Controller
                      name="jobname"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <Form.Control
                          name="jobname"
                          value={value}
                          onChange={onChange}
                          style={{ borderColor: errors.jobname ? "red" : "" }}
                        />
                      )}
                      rules={{ required: "Jobname name required" }}
                    />
                    <p style={{ color: "red", fontSize: 10 }}>
                      {errors.jobname?.message}
                    </p>
                  </Col>
                </Form.Group>
              </Col>
              <Col lg={3} xs={12} sm={12} md={6}>
                <Form.Group as={Row}>
                  <Col lg={5} xs={12} sm={12} md={6}>
                    <Form.Label>Consultant Name:</Form.Label>
                  </Col>
                  <Col lg={7} xs={12} sm={12} md={6}>
                    <Controller
                      name="ConsultantName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Form.Control
                          name="ConsultantName"
                          value={consultantname}
                          onChange={field.onChange}
                          style={{
                            borderColor: errors.ConsultantName ? "red" : "",
                          }}
                        />
                      )}
                      rules={{ required: "Consultant Name required" }}
                    />
                    <p style={{ color: "red", fontSize: 10 }}>
                      {errors.ConsultantName?.message}
                    </p>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="dropdown">
          <Container fluid>
            <Row>
              <Col lg={12} xs={12} sm={12} md={12}>
                <div className="part1">
                  <Navbar className="Unit">
                    <Navbar.Brand>Unit Features</Navbar.Brand>
                  </Navbar>

                  <Row>
                    <Col
                      lg={6}
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ padding: " 1.5rem " }}
                    >
                      <Form.Group as={Row}>
                        <Col lg={3} xs={12} sm={12} md={6}>
                          <Form.Label>Front Rim:</Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Controller
                            name="FrontRim"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Select
                                value={FrontRim}
                                className={
                                  errors.FrontRim
                                    ? "form-select-error"
                                    : "form-select"
                                }
                                aria-label="Default select example"
                                onChange={(e) => {
                                  handleRimChange(e);
                                  field.onChange(e);
                                }}
                              >
                                <option value="">Select</option>
                                {metaData?.Rim?.map((element, index) => (
                                  <option key={index} value={element.value}>
                                    {element.desc}
                                  </option>
                                ))}
                              </Form.Select>
                            )}
                            rules={{ required: "Please select front trim" }}
                          />
                          <p
                            style={{ color: "red", fontSize: 10, marginTop: 1 }}
                          >
                            {errors.FrontRim?.message}
                          </p>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Col lg={3} xs={12} sm={12} md={6}>
                          <Form.Label>Back Splash:</Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Controller
                            name="BackSplash"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Select
                                value={BackSplash}
                                // aria-label="Default select example"
                                className={
                                  errors.BackSplash
                                    ? "form-select-error"
                                    : "form-select"
                                }
                                onChange={(e) => {
                                  handleBacksplashChange(e);
                                  field.onChange(e);
                                }}
                              >
                                <option value="">Select</option>
                                {metaData?.BackSplash?.map((element, index) => (
                                  <option key={index} value={element.value}>
                                    {element.desc}
                                  </option>
                                ))}
                              </Form.Select>
                            )}
                            rules={{ required: "Please select Back Splash" }}
                          />
                          <p
                            style={{ color: "red", fontSize: 10, marginTop: 1 }}
                          >
                            {errors.BackSplash?.message}
                          </p>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Col lg={3} xs={12} sm={12} md={6}>
                          <Form.Label>End Splash Right:</Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Controller
                            name="EndSplashRight"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Select
                                value={splashRight}
                                aria-label="Default select example"
                                className={
                                  errors.EndSplashRight
                                    ? "form-select-error"
                                    : "form-select"
                                }
                                onChange={(e) => {
                                  handleSplashrightChange(e);
                                  field.onChange(e);
                                }}
                              >
                                <option value="">Select</option>
                                {metaData?.EndSplashRight?.map(
                                  (element, index) => (
                                    <option key={index} value={element.value}>
                                      {element.desc}
                                    </option>
                                  )
                                )}
                              </Form.Select>
                            )}
                            rules={{
                              required: "Please select End Splash Right",
                            }}
                          />
                          <p
                            style={{ color: "red", fontSize: 10, marginTop: 1 }}
                          >
                            {errors.EndSplashRight?.message}
                          </p>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Col lg={3} xs={12} sm={12} md={6}>
                          <Form.Label>End Splash Left:</Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Controller
                            name="EndSplashLeft"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Select
                                value={splashleft}
                                aria-label="Default select example"
                                className={
                                  errors.EndSplashLeft
                                    ? "form-select-error"
                                    : "form-select"
                                }
                                onChange={(e) => {
                                  handleSplashleftChange(e);
                                  field.onChange(e);
                                }}
                              >
                                <option value="">Select</option>
                                {metaData?.EndSplashLeft?.map(
                                  (element, index) => (
                                    <option key={index} value={element.value}>
                                      {element.desc}
                                    </option>
                                  )
                                )}
                              </Form.Select>
                            )}
                            rules={{
                              required: "Please select End Splash Left",
                            }}
                          />
                          <p style={{ color: "red", fontSize: 10 }}>
                            {errors.EndSplashLeft?.message}
                          </p>
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col
                      lg={5}
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ padding: "1.5rem " }}
                    >
                      <Form.Group as={Row}>
                        <Col lg={3} xs={12} sm={12} md={6}>
                          <Form.Label>Front to Back: </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Controller
                            name="FronttoBack"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Select
                                value={widthValue}
                                // id="UnitFronttoBack"
                                aria-label="Default select example"
                                className={
                                  errors.FronttoBack
                                    ? "form-select-error"
                                    : "form-select"
                                }
                                onChange={(e) => {
                                  handleWidthChange(e);
                                  field.onChange(e);
                                }}
                              >
                                <option value="">Select</option>

                                {metaData?.UnitWidth?.map((element, index) => (
                                  <option key={index} value={element.value}>
                                    {element.desc}
                                  </option>
                                ))}
                              </Form.Select>
                            )}
                            rules={{ required: "Please select Front to Back" }}
                          />
                          <p style={{ color: "red", fontSize: 10 }}>
                            {errors.FronttoBack?.message}
                          </p>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-1">
                        <Col lg={3} xs={12} sm={12} md={6}>
                          <Form.Label>Length:</Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Controller
                            name="length"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Control
                                type="number"
                                value={length}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleLengthChange(e);
                                }}
                                style={{
                                  borderColor: errors.length ? "red" : "",
                                }}
                              />
                            )}
                            rules={{ required: "Please fill the length" }}
                          />
                          <p style={{ color: "red", fontSize: 10 }}>
                            {errors.length?.message}
                          </p>
                          {/* <Form.Control onChange={handleLengthChange}  value={val}  /> */}
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Col lg={3} xs={12} sm={12} md={6}>
                          <Form.Label>Deck Height:</Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Select
                            value={deckValue}
                            aria-label="Default select example"
                            onChange={handleDepthChange}
                          >
                            {metaData?.Deckheight?.map((element, index) => (
                              <option key={index} value={element.value}>
                                {element.desc}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Form.Group>
                      <div id="jointtype" className="jointtype">
                        <Form.Group as={Row}>
                          <Col lg={3} xs={12} sm={12} md={6}>
                            <Form.Label>Joint Type:</Form.Label>
                          </Col>
                          <Col lg={6} xs={12} sm={12} md={6}>
                            <Form.Select
                              aria-label="Default select example"
                              name="JointType"
                              control={control}
                              defaultValue=""
                              onChange={handleJointtypeChange}
                              value={JointType}
                            >
                              <option value="">Select</option>
                              {metaData?.JointType?.map((element, index) => (
                                <option key={index} value={element.value}>
                                  {element.desc}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="rightpart">
                  <Row>
                    <Col lg={5} xs={12} sm={12} md={6}>
                      <Form.Group as={Row}>
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>PSXXX Controls:</Form.Label>
                        </Col>
                        <Col lg={8} xs={12} sm={12} md={6}>
                          <Controller
                            name="PSXXX"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Select
                                id="PSXXX"
                                aria-label="Default select example"
                                value={Psx}
                                className={
                                  errors.PSXXX
                                    ? "form-select-error"
                                    : "form-select"
                                }
                                onChange={(e) => {
                                  handlePsxChange(e);
                                  field.onChange(e);
                                }}
                              >
                                <option value="">Select</option>
                                {metaData?.PSXXX?.map((element, index) => (
                                  <option key={index} value={element.value}>
                                    {element.value}
                                  </option>
                                ))}
                              </Form.Select>
                            )}
                            rules={{ required: "Please select PSXXX" }}
                          />
                          <p style={{ color: "red", fontSize: 10 }}>
                            {errors.PSXXX?.message}
                          </p>
                        </Col>
                      </Form.Group>

                      {
                        <Form.Group as={Row}>
                          <Col lg={4} xs={12} sm={12} md={6}>
                            <Form.Label>Motor HP</Form.Label>
                          </Col>
                          <Col lg={8} xs={12} sm={12} md={6}>
                            {heaterValue == "OFF" ? (
                              <Form.Select
                                id="motorhp"
                                name="MotorHP"
                                aria-label="Default select example"
                                // value={value}

                                onChange={handleMotorChange}
                                value={motorhpValue}
                              >
                                {/* <option value=""></option> */}
                                {metaData?.MotorHPwithoutHeater?.map(
                                  (element, index) => (
                                    <option key={index} value={element.value}>
                                      {element.desc}
                                    </option>
                                  )
                                )}
                              </Form.Select>
                            ) : (
                              <Form.Select
                                id="motorhp"
                                aria-label="Default select example"
                                onChange={handleMotorChange}
                                value={motorhpValue}
                              >
                                {metaData?.MotorHPwithHeater?.map(
                                  (element, index) => (
                                    <option key={index} value={element.value}>
                                      {element.desc}
                                    </option>
                                  )
                                )}
                              </Form.Select>
                            )}
                            {motorhpValue == "3HP" ? (
                              <p
                                style={{ color: "black", fontSize: 10, mb: 1 }}
                              >{`Wash sinks available for 3HP: 54",60", 66" & 72" only`}</p>
                            ) : (
                              <p
                                style={{ color: "black", fontSize: 10 }}
                              >{`Wash sinks available for 2HP: 30",36",42" & 48" only`}</p>
                            )}
                          </Col>
                        </Form.Group>
                      }

                      <Form.Group as={Row}>
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>Voltage/Phase/Hz:</Form.Label>
                        </Col>
                        <Col lg={8} xs={12} sm={12} md={6}>
                          {motorhpValue == "2HP" ? (
                            <Form.Select
                              id="voltage"
                              aria-label="Default select example"
                              // onChange={handleVoltageChange}
                              value={voltageValue}
                              onChange={handleVoltageChange}
                            >
                              <option value="">Select</option>
                              {metaData?.VoltagewithoutHeater?.map(
                                (element, index) => (
                                  <option key={index} value={element.value}>
                                    {element.desc}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          ) : motorhpValue == "3HP" ? (
                            <Form.Select
                              id="voltage"
                              aria-label="Default select example"
                              value={voltageValue}
                              // onChange={handleVoltageChange}

                              onChange={handleVoltageChange}
                            >
                              <option value="">Select</option>
                              {metaData?.Voltage3HP?.map((element, index) => (
                                <option key={index} value={element.value}>
                                  {element.desc}
                                </option>
                              ))}
                            </Form.Select>
                          ) : (
                            <Form.Select
                              id="voltage"
                              aria-label="Default select example"
                              onChange={handleVoltageChange}
                              value={voltageValue}
                            >
                              <option value="">Select</option>
                              {metaData?.VoltagewithoutHeater?.map(
                                (element, index) => (
                                  <option key={index} value={element.value}>
                                    {element.desc}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          )}
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>PS3/6:</Form.Label>
                        </Col>
                        <Col lg={8} xs={12} sm={12} md={6}>
                          <Form.Select
                            id="PS3or6"
                            aria-label="Default select example"
                            onChange={handleGenChange}
                            value={genValue}
                          >
                            {/* <option value="">Select</option> */}
                            {metaData?.Generation?.map((element, index) => (
                              <option key={index} value={element.value}>
                                {" "}
                                {element.desc}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Form.Group>

                      <Form.Group hidden={true} as={Row}>
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>Heater Available:</Form.Label>
                        </Col>
                        <Col lg={8} xs={12} sm={12} md={6}>
                          <Form.Control />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>Heater:</Form.Label>
                        </Col>
                        <Col lg={8} xs={12} sm={12} md={6}>
                          {heaterValue == "ON" ? (
                            <Form.Select
                              aria-label="Default select example"
                              onChange={handleHeaterChange}
                              value={psheaterpower}
                            >
                              {metaData?.Heater?.map((element, index) => (
                                <option key={index} value={element.value}>
                                  {element.desc}
                                </option>
                              ))}
                            </Form.Select>
                          ) : (
                            <Form.Control
                              // className="disablebtn"
                              type="text"
                              value="NO"
                              readOnly
                            />
                          )}
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>Leg Rails:</Form.Label>
                        </Col>
                        <Col lg={8} xs={12} sm={12} md={6}>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={handleCrossChange}
                            value={legValue}
                          >
                            {/* <option value="">Select</option> */}
                            {metaData?.CrossRails?.map((element, index) => (
                              <option key={index} value={element.value}>
                                {element.desc}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>Foot Type:</Form.Label>
                        </Col>
                        <Col lg={8} xs={12} sm={12} md={6}>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={handleFootChange}
                            value={footValue}
                          >
                            {/* <option value="">Select</option> */}
                            {metaData?.FootType?.map((element, index) => (
                              <option key={index} value={element.value}>
                                {element.desc}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="p-"
                        id="SoiledDrainBoardSection"
                      >
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label className="Drainlabel">
                            Soiled Drain Board Length:
                          </Form.Label>
                        </Col>
                        <Col lg={8} xs={12} sm={12} md={6}>
                          <Controller
                            name="SoiledDrainBoard"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                              <Form.Control
                                as="input"
                                type="number"
                                style={{
                                  borderColor: errors.SoiledDrainBoard
                                    ? "red"
                                    : "",
                                }}
                                value={soildblengthValue}
                                onChange={(e) => {
                                  handleSoildblengthChange(e);
                                  onChange(e);
                                }}
                                onBlur={onBlurone}
                              />
                            )}
                            rules={{
                              required: "Soiled Drain Board Length required",
                            }}
                          />
                          <div style={{ color: "black", fontSize: 10 }}>
                            {
                              "For Disposer Cone and Collector, Soiled drainboard cannot be ZERO/EMPTY."
                            }
                          </div>
                          <p style={{ color: "red", fontSize: 10 }}>
                            {errors.SoiledDrainBoard?.message}
                          </p>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col lg={7} xs={12} sm={12} md={6}>
                      {Orientation === "Right Rear" &&
                      configuration === "L Shape" ? (
                        <div className="borderhead">
                          <Row>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="Lshapes"
                            >
                              <img
                                src={LshapesRtoL1}
                                className="LshapesRtoL"
                                onClick={(e) =>
                                  handleLshaperighttoleftandleftimg()
                                }
                              />
                            </Col>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="Lshapes"
                            >
                              <img
                                src={LshapesRtoL2}
                                className="LshapesRtoL"
                                onClick={(e) =>
                                  handleLshaperighttoleftandrightimg()
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                      ) : null}
                      {Orientation === "Left Rear" &&
                      configuration === "L Shape" ? (
                        <div className="borderhead">
                          <Row>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="Lshapes"
                            >
                              <img
                                src={LshapesLtoR2}
                                className="LshapesRtoL"
                                onClick={(e) =>
                                  handleLshapelefttorightandleftimg()
                                }
                              />
                            </Col>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="Lshapes"
                            >
                              <img
                                src={LshapesLtoR1}
                                className="LshapesRtoL"
                                onClick={(e) =>
                                  handleLshapelefttorightandrightimg()
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                      ) : null}
                      {Orientation === "Right Rear" &&
                      configuration === "U Shape" ? (
                        <div className="borderhead">
                          <Row>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="shapes"
                            >
                              <img
                                src={UshapesRtoL1}
                                className="UshapesRtoL"
                                onClick={(e) =>
                                  handleUshaperighttoleftandleftimg()
                                }
                              />
                            </Col>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="shapes"
                            >
                              <img
                                src={UshapesRtoL2}
                                className="UshapesRtoL"
                                onClick={(e) =>
                                  handleUshaperighttoleftandrightimg()
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="shapes"
                            >
                              <img
                                src={UshapesRtoL3}
                                className="UshapesRtoL"
                                onClick={(e) =>
                                  handleUshaperighttoleftandleftbottomimg()
                                }
                              />
                            </Col>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="shapes"
                            >
                              <img
                                src={UshapesRtoL4}
                                className="UshapesRtoL"
                                onClick={(e) =>
                                  handleUshaperighttoleftandrightbottomimg()
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                      ) : null}
                      {Orientation === "Left Rear" &&
                      configuration === "U Shape" ? (
                        <div className="borderhead">
                          <Row>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="shapes"
                            >
                              <img
                                src={UshapesLtoR1}
                                className="UshapesRtoL"
                                onClick={(e) =>
                                  handleUshapelefttorightandleftimg()
                                }
                              />
                            </Col>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="shapes"
                            >
                              <img
                                src={UshapesLtoR2}
                                className="UshapesRtoL"
                                onClick={(e) =>
                                  handleUshapelefttorightandrightimg()
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="shapes"
                            >
                              <img
                                src={UshapesLtoR3}
                                className="UshapesRtoL"
                                onClick={(e) =>
                                  handleUshapelefttorightandleftbottomimg()
                                }
                              />
                            </Col>
                            <Col
                              lg={6}
                              xs={12}
                              sm={12}
                              md={6}
                              className="shapes"
                            >
                              <img
                                src={UshapesLtoR4}
                                className="UshapesRtoL"
                                onClick={(e) =>
                                  handleUshapelefttorightandrightbottomimg()
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </div>
                {/* </Col> */}

                {/* <Col lg={7} xs={12} sm={12} md={12}> */}
                <div className="sinks">
                  <Navbar className="Unit">
                    <Navbar.Brand>Sinks</Navbar.Brand>
                  </Navbar>

                  <div className="tabsink">
                    <Tabs
                      defaultActiveKey="first"
                      id="uncontrolled-tab-example"
                      className="style1"
                    >
                      <Tab
                        eventKey="first"
                        title="Scrap/Disposer Sink"
                        // className="style2"
                      >
                        <ScrapDSink
                          selectedObject={selectedObject}
                          unitWidth={widthValue}
                          setPsdisposersinklengthValue={
                            setPsdisposersinklengthValue
                          }
                          psdisposersinklength={psdisposersinklength}
                          coneSize={coneSize}
                          setConeSize={setConeSize}
                          setCollectorChecked={setCollectorChecked}
                          setPssdsinklengthValue={setPssdsinklengthValue}
                          pssdsinklength={pssdsinklength}
                          lengthbtw={lengthbtw}
                          model={model}
                          setmodel={setmodel}
                          handlemodelchange={handlemodelchange}
                          setDrainblengthsdwValue={setDrainblengthsdwValue}
                          setCleanDrain={setCleanDrain}
                          soileddb={soildblengthValue}
                          collectorLength={collectorLength}
                          setCollectorLength={setCollectorLength}
                          metaData={metaData}
                          Orientation={Orientation}
                          selectedSinkConfig={selectedSinkConfig}
                          userlength={userlength}
                          setuserLength={setuserLength}
                          Rinsevalidation={Rinsevalidation}
                          psscrapperdisposerunit={psscrapperdisposerunit}
                          setPsscrapperdisposerunit={setPsscrapperdisposerunit}
                        />
                      </Tab>
                      <Tab
                        eventKey="second"
                        title="Wash 
                      Sink"
                        // className="style2"
                      >
                        <WashSink
                          selectedObject={selectedObject}
                          unitWidth={widthValue}
                          heaterValue={heaterValue}
                          motorhpValue={motorhpValue}
                          setCleanDrain={setCleanDrain}
                          collectorLength={collectorLength}
                          filterCombo={filterCombo}
                          metaData={metaData}
                          filteredWashLength={filteredWashLength}
                          selectedSinkConfig={selectedSinkConfig}
                          checkboxValue={genValue}
                        />
                      </Tab>
                      <Tab
                        eventKey="third"
                        title="Rinse 
                      Sink"
                        // className="style2"
                      >
                        <RinseSink
                          selectedObject={selectedObject}
                          unitWidth={widthValue}
                          setSinkDepth={setSinkDepth}
                          sinkDepth={sinkDepth}
                          setCleanDrain={setCleanDrain}
                          collectorLength={collectorLength}
                          metaData={metaData}
                          selectedSinkConfig={selectedSinkConfig}
                          handlesinkupdate={handlesinkupdate}
                          userlength={userlength}
                          setuserLength={setuserLength}
                          Rinsevalidation={Rinsevalidation}
                          checked={checked}
                          setChecked={setChecked}
                        />
                      </Tab>
                      <Tab
                        eventKey="fourth"
                        title="Sanitize 
                      Sink"
                        // className="style2"
                      >
                        <SanitizeSink
                          selectedObject={selectedObject}
                          unitWidth={widthValue}
                          setSinkDepth={setSinkDepth}
                          sinkDepth={sinkDepth}
                          setCleanDrain={setCleanDrain}
                          collectorLength={collectorLength}
                          metaData={metaData}
                          selectedSinkConfig={selectedSinkConfig}
                          handlesinkupdate={handlesinkupdate}
                          userlength={userlength}
                          setuserLength={setuserLength}
                          Rinsevalidation={Rinsevalidation}
                          sanitizechecked={sanitizechecked}
                          setSanitizechecked={setSanitizechecked}
                        />
                      </Tab>
                    </Tabs>
                  </div>
                </div>
                <Navbar className="Unit">
                  <Navbar.Brand>Optional Features</Navbar.Brand>
                </Navbar>
                <Col
                  lg={6}
                  xs={12}
                  sm={12}
                  md={6}
                  style={{ padding: " 1rem " }}
                ></Col>
                <Form.Group as={Row} className="mt-1">
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Label>Clean Drain Board Length:</Form.Label>
                  </Col>
                  <Col lg={5} xs={12} sm={12} md={6}>
                    <Form.Control
                      className="disablebtn"
                      id="cleandrainboard"
                      onChange={handleCleandrainboardChange}
                      value={cleanDrainValue}
                      type="text"
                      readOnly
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mt-1">
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Label>Drying Rack:</Form.Label>
                  </Col>
                  <Col lg={5} xs={12} sm={12} md={6}>
                    {cleanDrain < 14 ? (
                      <Form.Select
                        onChange={handleDryingChange}
                        value={dryValue}
                      >
                        {metaData?.DryingRack14?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : cleanDrain < 17 ? (
                      <Form.Select
                        onChange={handleDryingChange}
                        value={dryValue}
                      >
                        {metaData?.DryingRack17?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : cleanDrain < 20 ? (
                      <Form.Select
                        onChange={handleDryingChange}
                        value={dryValue}
                      >
                        {metaData?.DryingRack20?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : cleanDrain < 21 ? (
                      <Form.Select
                        onChange={handleDryingChange}
                        value={dryValue}
                      >
                        {metaData?.DryingRack21?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : cleanDrain < 23 ? (
                      <Form.Select
                        onChange={handleDryingChange}
                        value={dryValue}
                      >
                        {metaData?.DryingRack23?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : cleanDrain < 25 ? (
                      <Form.Select
                        onChange={handleDryingChange}
                        value={dryValue}
                      >
                        {metaData?.DryingRack25?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : cleanDrain < 27 ? (
                      <Form.Select
                        onChange={handleDryingChange}
                        value={dryValue}
                      >
                        {metaData?.DryingRack27?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : cleanDrain < 31 ? (
                      <Form.Select
                        onChange={handleDryingChange}
                        value={dryValue}
                      >
                        {metaData?.DryingRack31?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      <Form.Select
                        onChange={handleDryingChange}
                        value={dryValue}
                      >
                        {metaData?.DryingRack?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  </Col>
                  <Col id="dryingracktooltip" hidden={true} style={{ flex: 0 }}>
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
                      mouseLeaveDelay={0}
                      mouseEnterDelay={0}
                      contentStyle={{ padding: "0px", border: "none" }}
                      arrow={false}
                    >
                      <img src={Drying_Rack} width={450} height={300} />
                    </Popup>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Label>Undershelf:</Form.Label>
                  </Col>
                  <Col lg={5} xs={12} sm={12} md={6}>
                    {Orientation === "Right Rear" &&
                    cleanDrain < 24 &&
                    (collectorChecked === true ||
                      Number(soildblengthValue) +
                        Number(pssdsinklength) +
                        Number(psdisposersinklength) +
                        Number(coneSize) +
                        Number(collectorLength) +
                        Number(lengthbtw) <
                        24) ? (
                      <Form.Select
                        id="underself"
                        aria-label="Default select example"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {metaData?.NoUndershelf?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : Orientation === "Left Rear" &&
                      cleanDrain < 24 &&
                      (collectorChecked === true ||
                        Number(soildblengthValue) +
                          Number(pssdsinklength) +
                          Number(psdisposersinklength) +
                          Number(coneSize) +
                          Number(collectorLength) +
                          Number(lengthbtw) <
                          24) ? (
                      <Form.Select
                        id="underself"
                        aria-label="Default select example"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {metaData?.NoUndershelf?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : Orientation === "Left Rear" &&
                      cleanDrain > 24 &&
                      (collectorChecked === true ||
                        Number(soildblengthValue) +
                          Number(pssdsinklength) +
                          Number(psdisposersinklength) +
                          Number(coneSize) +
                          Number(collectorLength) +
                          Number(lengthbtw) <
                          24) ? (
                      <Form.Select
                        id="underself"
                        aria-label="Default select example"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {metaData?.UndershelfRightSide?.map(
                          (element, index) => (
                            <option key={index} value={element.value}>
                              {element.desc}
                            </option>
                          )
                        )}
                      </Form.Select>
                    ) : Orientation === "Left Rear" &&
                      cleanDrain < 24 &&
                      (collectorChecked === false ||
                        Number(soildblengthValue) +
                          Number(pssdsinklength) +
                          Number(psdisposersinklength) +
                          Number(coneSize) +
                          Number(collectorLength) +
                          Number(lengthbtw) <
                          24) ? (
                      <Form.Select
                        id="underself"
                        aria-label="Default select example"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {metaData?.UndershelfLeftSide?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : Orientation === "Left Rear" && cleanDrain < 24 ? (
                      <Form.Select
                        id="underself"
                        aria-label="Default select example"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {metaData?.UndershelfLeftSide?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : Orientation === "Right Rear" && cleanDrain < 24 ? (
                      <Form.Select
                        id="underself"
                        aria-label="Default select example"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {metaData?.UndershelfRightSide?.map(
                          (element, index) => (
                            <option key={index} value={element.value}>
                              {element.desc}
                            </option>
                          )
                        )}
                      </Form.Select>
                    ) : (
                      <Form.Select
                        id="underself"
                        aria-label="Default select example"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {metaData?.Undershelf?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  </Col>
                  <Col id="undershelftooltip" hidden={true} style={{ flex: 0 }}>
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
                      mouseLeaveDelay={0}
                      mouseEnterDelay={0}
                      contentStyle={{ padding: "0px", border: "none" }}
                      arrow={false}
                    >
                      <img src={Undershelf} width={450} height={300} />
                    </Popup>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mt-1">
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Label>Overshelf:</Form.Label>
                  </Col>
                  <Col lg={5} xs={12} sm={12} md={6}>
                    <Form.Select
                      id="overshelf"
                      aria-label="Default select example"
                      onChange={handleOvershelfChange}
                      value={overshelf}
                    >
                      {metaData?.Overshelf?.map((element, index) => (
                        <option
                          onMouseOver={testmouse}
                          key={index}
                          value={element.desc}
                        >
                          {element.desc}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col id="overshelftooltip" hidden={true} style={{ flex: 0 }}>
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
                      mouseLeaveDelay={0}
                      mouseEnterDelay={0}
                      contentStyle={{ padding: "0px", border: "none" }}
                      arrow={false}
                    >
                      <img
                        src={overshelfImage}
                        width={500}
                        height={300}
                        className="over"
                      />
                    </Popup>
                  </Col>
                </Form.Group>
                <Form.Group
                  id="overshelfdistancefromedge"
                  hidden={true}
                  as={Row}
                  className="mt-1"
                >
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Label>Overshelf Distance From Edge:</Form.Label>
                  </Col>
                  <Col lg={5} xs={12} sm={12} md={6}>
                    {" "}
                    {overshelf !== "No Overshelf" ? (
                      <div>
                        {" "}
                        <Controller
                          name="OvershelfDistance"
                          control={control}
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <Form.Control
                              type="number"
                              style={{
                                borderColor: errors.OvershelfDistance
                                  ? "red"
                                  : "",
                              }} //  onChange={handleOvershelfdistanceChange}
                              onChange={(e) => {
                                handleOvershelfdistanceChange(e);
                                onChange(e);
                              }}
                              value={OvershelfdistanceValue}
                            />
                          )}
                          rules={{
                            required: "Overshelf Distance required",
                          }}
                        />{" "}
                      </div>
                    ) : (
                      <div>
                        {" "}
                        <Form.Control
                          type="number"
                          onChange={handleOvershelfdistanceChange}
                          value={OvershelfdistanceValue}
                        />{" "}
                      </div>
                    )}{" "}
                    {errors.OvershelfDistance?.message == undefined ? (
                      <p style={{ color: "black", fontSize: 11 }}>
                        {" "}
                        {selectedSinkConfig.overshelf.psovershelfdistance &&
                        selectedSinkConfig.overshelf.psovershelfdistance !==
                          validatedDistance
                          ? `Overshelf pole lies between faucet holes .we recommend you to use above ${validatedDistance} inches.`
                          : ""}{" "}
                      </p>
                    ) : (
                      <p style={{ color: "red", fontSize: 10 }}>
                        {" "}
                        {errors.OvershelfDistance?.message}{" "}
                      </p>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group
                  id="overshelflength"
                  hidden={true}
                  as={Row}
                  className="mt-1"
                >
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Label>Overshelf Length:</Form.Label>
                  </Col>
                  <Col lg={5} xs={12} sm={12} md={6}>
                    {overshelf !== "No Overshelf" ? (
                      <Controller
                        name="OvershelfLength"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange } }) => (
                          <Form.Control
                            type="number"
                            style={{
                              borderColor: errors.OvershelfLength ? "red" : "",
                            }}
                            onChange={(e) => {
                              handleOvershelflengthChange(e);
                              onChange(e);
                            }} // onChange={handleOvershelflengthChange}
                            value={OvershelflengthValue}
                          />
                        )}
                        rules={{
                          required: "Overshelf Length required",
                        }}
                      />
                    ) : (
                      <Form.Control
                        type="number"
                        onChange={handleOvershelflengthChange}
                        value={OvershelflengthValue}
                      />
                    )}
                    {errors.OvershelfLength?.message == undefined ? (
                      <p style={{ color: "red", fontSize: 11 }}>
                        {(selectedSinkConfig.overshelf.psovershelflength &&
                          selectedSinkConfig.overshelf.psovershelflength !==
                            "" &&
                          selectedSinkConfig.overshelf.psoverself) ||
                        OverSelfValidation > length
                          ? `Sum of Overshelf length and start distance should not exceeds more than unit length ${val} `
                          : `Please enter a value outside the range of ${shelfvalue}`}
                      </p>
                    ) : (
                      <p style={{ color: "red", fontSize: 10 }}>
                        {errors.OvershelfLength?.message}
                      </p>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group
                  id="overshelfheight"
                  hidden={true}
                  as={Row}
                  className="mt-1"
                >
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Label>Overshelf Height:</Form.Label>
                  </Col>
                  <Col lg={5} xs={12} sm={12} md={6}>
                    <Form.Control
                      type="text"
                      style={{ backgroundColor: "#d3d3d3" }}
                      value={overshelfHeight}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <div className="radioscreen2">
                  <Container>
                    <Row>
                      <Col lg={6} xs={12} sm={12} md={12}>
                        <div className="radiodis">
                          <Form.Check
                            type="checkbox"
                            label="Dual Tempering"
                            name="group2"
                            className="radiodi"
                            id="dualtemper"
                            onChange={handleDualtemperingChange}
                          />
                          <Form.Check
                            type="checkbox"
                            label="Chemical Dispenser"
                            name="group2"
                            className="radiodi"
                            id="chemdispenser"
                            onChange={handleChemicaldispenserChange}
                            disabled={cleanDrain < 15}
                          />

                          {/* </div>
                      </Col>

                      <Col lg={6} xs={12} sm={12} md={12}>
                        <div className="radiodis"> */}
                          <Form.Check
                            type="checkbox"
                            label="Utensil Basket"
                            name="group2"
                            id="utensilbasket"
                            className="radiodi"
                            onChange={handleUtensilbasketChange}
                          />
                          <Form.Check
                            type="checkbox"
                            label="Export Crating"
                            name="group2"
                            className="radiodi"
                            // id="radio3"
                            onChange={handleSpecialcratingChange}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div
                  hidden={sessionStorage.getItem("useraud") != "true"}
                  className="mt-5"
                >
                  <Row>
                    <Col
                      lg={6}
                      xs={12}
                      sm={12}
                      md={6}
                      // style={{ padding: " 1rem " }}
                    >
                      <Form.Group as={Row} className="mt-2">
                        <Col lg={5} xs={12} sm={12} md={6}>
                          <Form.Label>
                            Project Name:
                            <span className="pickbox-details">
                              (Production & Sales dwg)
                            </span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            //  id="cleandrainboard"
                            onChange={handleProjectName}
                            value={projectname}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mt-2">
                        <Col lg={5} xs={12} sm={12} md={6}>
                          <Form.Label>
                            Job Number/Work Order Number:
                            <span className="pickbox-details">
                              (Production dwg)
                            </span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            //  id="cleandrainboard"
                            onChange={handleJobNumber}
                            value={workorder}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mt-2">
                        <Col lg={5} xs={12} sm={12} md={6}>
                          <Form.Label>
                            Sale Order Number:
                            <span className="pickbox-details">
                              (Production & Sales dwg)
                            </span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            //  id="cleandrainboard"
                            onChange={handleSaleOrderNumber}
                            value={saleorder}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mt-2">
                        <Col lg={5} xs={12} sm={12} md={6}>
                          <Form.Label>
                            Consultant Name:
                            <span className="pickbox-details">
                              (Production & Sales dwg)
                            </span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            name="ConsultantName"
                            //  id="cleandrainboard"
                            onChange={handleConsultantName}
                            value={consultantname}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mt-2">
                        <Col lg={5} xs={12} sm={12} md={6}>
                          <Form.Label>
                            Dealer Name:
                            <span className="pickbox-details">
                              (Production & Sales dwg)
                            </span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            //  id="cleandrainboard"
                            onChange={handleDealerName}
                            value={dealername}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mt-2">
                        <Col lg={5} xs={12} sm={12} md={6}>
                          <Form.Label>
                            Item Number:
                            <span className="pickbox-details">
                              (Production & Sales dwg)
                            </span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            //  id="cleandrainboard"
                            onChange={handleItemNumber}
                            value={itemnumber}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col
                      lg={6}
                      xs={12}
                      sm={12}
                      md={6}
                      // style={{ padding: " 1rem " }}
                    >
                      <Form.Group as={Row} className="mt-2">
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>
                            ECO Number:
                            <span className="pickbox-details">
                              (Production dwg)
                            </span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            //  id="cleandrainboard"
                            onChange={handleEcoNumber}
                            value={econumber}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mt-2">
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>
                            Drawn By:
                            <span className="pickbox-details">
                              (Production & Sales dwg)
                            </span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            //  id="cleandrainboard"
                            onChange={handleDrawnBy}
                            value={drawnby}
                          />
                        </Col>
                      </Form.Group>

                      {/* <Form.Group as={Row} className="mt-2">
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>Job Item Number:</Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            //  id="cleandrainboard"
                            onChange={handleJobItemNumber}
                            // value={cleanDrainValue}
                          />
                        </Col>
                      </Form.Group> */}

                      <Form.Group as={Row} className="mt-2">
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>
                            JSON#:<span className="pickbox-details">(BOM)</span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            //  id="cleandrainboard"
                            onChange={handleJSON}
                            // value={cleanDrainValue}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mt-2">
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>
                            ETO Number:
                            <span className="pickbox-details">(BOM)</span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            //  id="cleandrainboard"
                            onChange={handleEtoNumber}
                            value={etonumber}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mt-2">
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>
                            Drawn Date:
                            <span className="pickbox-details">
                              (Production & Sales dwg)
                            </span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control
                            type="date"
                            id="my-date"
                            value={drawnDate}
                            onChange={handledrawndate}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className="mt-5">
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Custom Notes"
                    className="notes"
                    onChange={handleCustomnotesChange}
                    value={notes}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="button1">
          {/* <button onClick={generateModel} className="Assembly1">
              Assembly
            </button> */}

          {sessionStorage.getItem("useraud")==process.env.REACT_APP_DESIGN_AUD_ID &&
            Object.keys(enteredJSON).length == 0 && (
              <button
                type="submit"
                onMouseOver={testmouse}
                //onClick={generateModel}
                className="Assembly1"
                disabled={
                  cleanDrain < 0 ||
                  (checked && !Rinsevalidation) ||
                  OverSelfValidation > length ||
                  (lengthbtw < 12 &&
                    psscrapperdisposerunit == "DisposerSink") ||
                  (lengthbtw < 13.5 &&
                    psscrapperdisposerunit == "DisposerCone") ||
                  (lengthbtw < 13.5 &&
                    psscrapperdisposerunit == "CollectorMasterScrap")
                }
              >
                Create Drawing
              </button>
            )}

          {sessionStorage.getItem("useraud")==process.env.REACT_APP_DESIGN_AUD_ID &&
            Object.keys(enteredJSON).length > 0 && (
              <button
                type="submit"
                onMouseOver={testmouse}
                //onClick={generateModel}
                className="Assembly1"
                disabled={
                  cleanDrain < 0 ||
                  (lengthbtw < 12 &&
                    psscrapperdisposerunit == "DisposerSink") ||
                  (lengthbtw < 13.5 &&
                    psscrapperdisposerunit == "DisposerCone") ||
                  (lengthbtw < 13.5 &&
                    psscrapperdisposerunit == "CollectorMasterScrap")
                }
              >
                Update Drawing
              </button>
            )}

          {sessionStorage.getItem("useraud") == process.env.REACT_APP_CUSTOMER_AUD_ID && (
            <button
              onMouseOver={testmouse}
              //onClick={generateModel}
              className="Assembly2"
              disabled={cleanDrain < 0}
            >
              Create Drawing & Email
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default Automation;
