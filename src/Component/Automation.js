import React, { useEffect, useState, useCallback ,} from "react";
import { Container, Navbar, Col, Row, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Tab } from "bootstrap";
import OrientationPanel from "../splitComponent/Orientation";
import UnitFeature from "../splitComponent/UnitFeatures";
import Tabs from "react-bootstrap/Tabs";
import ScrapDSink from "../Pages/ScrapDSink";
import WashSink from "../Pages/WashSink";
import PDF from "../Images/PDF.png";
import "../CSS/Automation.css";
import RinseSink from "../Pages/RinseSink";
import SanitizeSink from "../Pages/SanitizeSink";
import { useStoreActions, useStoreState } from "easy-peasy";
import axios from "axios";
// import ReactHintFactory from "react-hint";
import Undershelf from "../Images/Undershelf.png";
import Drying_Rack from "../Images/Drying_Rack.png";
//import OvershelfImage from "../Images/Overshelf.png";
// import WashLengthCombo from "../json/WashLengthCombo.json";
//import PsxxCombo from "../json/PsxxCombo.json";
// import FrontWashSheet from "../json/FrontWashSheet.json";
import Popup from "reactjs-popup";
import SinglePot from "../Images/SinglePot.png";
import DoublePot from "../Images/DoublePot.png";
import WithoutPot from "../Images/Overshelf Without Pot_Rack.png";
import DryingWithout from "../Images/Drying_Shelf Without_Pot_Rack.png";
import DryingShelfRack from "../Images/DryingShelfRack.png";
import ApiErrorMessage from "../Component/ErrorMessagePopUp.js"
import CryptoJS from "crypto-js";

import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { AiOutlineSync } from "react-icons/ai";
import LA from "../Images/LA1.png";
import LB from "../Images/LB1.png";
import LC from "../Images/LC1.png";
import LD from "../Images/LD1.png";

import A1 from "../Images/UA1.png";
import B1 from "../Images/UB1.png";
import C1 from "../Images/UC1.png";
import D1 from "../Images/UD1.png";
import E1 from "../Images/UE1.png";
import F1 from "../Images/UF1.png";
import G1 from "../Images/UG1.png";
import H1 from "../Images/UH1.png";

import LA1largeimage from "../Images/LA1 large image.png";
import LB1largeimage from "../Images/LB1  large image.png";
import LC1largeimage from "../Images/LC1  large image.png";
import LD1largeimage from "../Images/LD1  large image.png";

import UA1largeimage from "../Images/UA1  large image.png";
import UB1largeimage from "../Images/UB1  large image.png";
import UC1largeimage from "../Images/UC1  large image.png";
import UD1largeimage from "../Images/UD1  large image.png";
import UE1largeimage from "../Images/UE1 large image.png";
import UF1largeimage from "../Images/UF1  large image.png";
import UG1largeimage from "../Images/UG1 large image.png";
import UH1largeimage from "../Images/UH1  large image.png";

import Select from "react-select";
import {
  calculateDrain,
  selectedSinkConfig,
  selectedTabSinkConfig,
  calculateOvershelf,
} from "../Constants/global.js";
import { filterjson } from "../Constants/filterjson.js";
import { psjoblist } from "../Constants/psjoblist.js";
import { referencedata } from "../Constants/referencedata.js";
import { useForm, Controller } from "react-hook-form";
import PsControls from "../splitComponent/PsControls";
import { MsalProvider, useMsal } from "@azure/msal-react";





function Automation(props) {

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    register,
    reset,
    watch,
    clearErrors,
    setFocus,
    setValue,
  } = useForm();
  // const ReactHint = ReactHintFactory(React);
  const [imageSelectionError, setImageSelectionError] = useState(false);
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
  const [deckValue, setDeckValue] = useState("");
  const [footValue, setFootValue] = useState("Bullet Foot");
  const [dryValue, setDryValue] = useState("None");
  const [undershelf, setUndershelf] = useState("No Undershelf");
  const [overshelf, setOvershelf] = useState("No Overshelf");
  const [motorhpValue, setMotorHP] = useState("");
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
  const [jobName, setJobName] = useState("");
  const [leftshape, setLeftshape] = useState(false);
  const [rightshape, setRightshape] = useState(false);
  const [textbox, setTextbox] = useState(false);
  const [imageselection, setImageselection] = useState("");
  const [rightwinglength, setRightwinglength] = useState("");
  const [leftwinglength, setLeftwinglength] = useState("");
  const [cornerdblength, setCornerdblength] = useState("");
  const [leftcornerdblength, setLeftcornerdblength] = useState("");
  const [rightcornerdblength, setRightcornerdblength] = useState("");
  const [cornerdbval, setCornerdbval] = useState("");
  const [washSinkLength, setWashSinkLength] = useState();
  const [rinselength, setrinselength] = useState();
  const [sanitizelength, setSanitizeLength] = useState();
  const [ushapeunitlength, setUshapeunitlength] = useState("");
  const [autoCleandrainDB, setAutoCleandrainDB] = useState();
  const [validPopUp, setValidPopUp] = useState(false);
  
  

  const cleanDrainValue = useStoreState(
    (state) => state.psconfig.cleanDrainValue
  );
  const calculateDrainStore = useStoreActions(
    (actions) => actions.psconfig.calculateDrainStore
  );
  const [pssdsinklength, setPssdsinklengthValue] = useState();

  const [sinkLength, setSinkLength] = useState(0);
  const { intertaluser } = props;
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const hour = ("0" + now.getHours()).slice(-2);
  const minute = ("0" + now.getMinutes()).slice(-2);
  const seconds = ("0" + now.getSeconds()).slice(-2);
  const formattedDate = `${year}${month}${day}${hour}${minute}${seconds}`;
  const firstThree = sessionStorage.getItem("userEmailId").substring(0, 3);
  const [jobname, setJobname] = useState("");
  const [userlength, setuserLength] = useState("");
  const [checked, setChecked] = useState(false);
  const [scrapchecked, setScrapChecked] = useState(false);
  const [sanitizechecked, setSanitizechecked] = useState(false);
  const [backsplashHeight ,setbacksplashHeight] =useState("")

  const { instance, accounts } = useMsal();  
  const accessToken = sessionStorage.getItem("TokenId");
  const SECRET_PASS = CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916");

  const Rinsevalidation = userlength > 12 && userlength < 36;
  const OverSelfValidation =
    parseInt(OvershelflengthValue) + parseInt(OvershelfdistanceValue);
  const [psscrapperdisposerunit, setPsscrapperdisposerunit] = useState("");
  const [prerinsefaucet, setPrerinsefaucet] =useState("");
  // console.log(prerinsefaucet,"prerinsefaucetusestate")

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
        "/api/PSA/GetCustomerReferenceData?isinternaluser=" +
        true;
    } else {
      selectedSinkConfig.psusermodule = "CUSTOMER";
      url =
        process.env.REACT_APP_EXTERNAL_SERVER_URL +
        "/api/PSA/GetCustomerReferenceData?isinternaluser=" +
        false;
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setFilteredWashLength(res.WashSinkLength);
        setFilteredDryingRack(res.DryingRack);
      });
  };

  const customerRefData = () => {
    fetch(
      process.env.REACT_APP_EXTERNAL_SERVER_URL +
        "/api/PSA/GetCustomerReferenceData"
    )
      .then((res) => res.json())
      .then((res) => {
        setcustomerrefData(res);
      });
  };

  useEffect(() => {
    if (userData.length > 0) {
      const arrayData = [];
      userData &&
        userData.forEach((row) => {
          arrayData.push({ label: row.JobId, value: row.JobId, ...row });
        });
      setData(arrayData);
    }
  }, [userData]);

  //  external user data
  const fetchJson2 = async () => {
    var config = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      url:
        process.env.REACT_APP_EXTERNAL_SERVER_URL +"/api/PsautoJobs/GetAllUsersPsautoJobIDs/false",
    };
    axios(config)
      .then(function (response) {
        var data = response.data;
        const CryptoDecryptedData12 = CryptoJS.AES.decrypt(data, SECRET_PASS, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);
        const decryptData = JSON.parse(CryptoDecryptedData12);
        if (decryptData.length > 0) {
          const arrayData = [];
          decryptData.forEach((row) => {
            arrayData.push({ label: row.jobId, value: row.jobId, ...row });
          });
          setExternalData(arrayData);
        }
      })
      .catch(function (error) {
       ApiErrorMessage(error)
      });
  };
  const pendingInternal = () => {
    var config = {
      method: "GET",
      url: process.env.REACT_APP_CURRENT_SERVER_URL +"/api/PsautoJobs/GetAllUsersPsautoJobIDs/true",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    
    };
    axios(config)
      .then(function (response) {
        var value = response.data;
        const CryptoDecryptedData = CryptoJS.AES.decrypt(value, SECRET_PASS, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);
        const pendingInternalDecryptdata = JSON.parse(CryptoDecryptedData);     
        if (pendingInternalDecryptdata.length > 0) {
          const arrayData = [];
          pendingInternalDecryptdata.forEach((row) => {
            arrayData.push({ label: row.jobId, value: row.jobId, ...row });
          });
          setData(arrayData);
        }
      })
      .catch(function (error) {
        ApiErrorMessage(error)
      });
  };

 
  useEffect(() => {
    if (process.env.REACT_APP_ISDESIGN_USER =="true") {
      setTimeout(() => {      
        pendingInternal();
      }, 1000);
    
      fetchJson2();
    } 
  }, []);

  useEffect(() => {
    if (configuration == "U") {
      commoncornerautovalue();
    }
    AutocalcvalueforSoiledDB();
    AutoCalcCleandb();
  }, [
    washSinkLength,
    rinselength,
    sinkLength,
    sanitizelength,
    widthValue,
    length,
    leftwinglength,
    rightwinglength,
    cornerdblength,
    leftcornerdblength,
    rightcornerdblength,
    splashRight,
    splashleft,
    soildblengthValue,
    lengthbtw,
    dryValue,
    psscrapperdisposerunit,
  ]);

  const handleJSONChange = (e) => {
    if (!e) {
      setEnteredJSON({});
      return;
    }
    setEnteredJSON(e);
  };

  const entered = enteredJSON.jobId;
  const handleSearchClick = async (e) => {
    e.preventDefault();
    var config = {
      method: "GET",
      url:
        Object.keys(enteredJSON).length > 0 && enteredJSON?.isinternaluser
          ? process.env.REACT_APP_CURRENT_SERVER_URL +`/api/PsautoJobs/GetPsautoJobPayload/${entered}`
          : process.env.REACT_APP_EXTERNAL_SERVER_URL +`/api/PsautoJobs/GetPsautoJobPayload/${entered}`,
      
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      data: {
        useremail: sessionStorage.getItem("userEmailId"),
        JobId: enteredJSON?.JobId,
      },
    };
    axios(config)
      .then(function (response) {
        var getAlJobPayloaddata = response.data;
        const DecryptedgetJobPayloaddata = CryptoJS.AES.decrypt(
          getAlJobPayloaddata,
          SECRET_PASS,
          {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          }
        ).toString(CryptoJS.enc.Utf8);
        var JobPayloadDecrypteData = JSON.parse(DecryptedgetJobPayloaddata);
        
        if (JobPayloadDecrypteData !== "Invalid JobId") {
          setSelectedObject(JobPayloadDecrypteData);
          if (JobPayloadDecrypteData?.psconfiguration == "L") {
            setImageselection(JobPayloadDecrypteData?.lunit?.psassemblytype);
            handleImageSelection({
              target: {
                name: JobPayloadDecrypteData?.lunit?.psassemblytype,
                configuration: JobPayloadDecrypteData?.psconfiguration,
              },
            });
          } else {
            setConfiguration(JobPayloadDecrypteData?.psconfiguration);
            setImageselection(JobPayloadDecrypteData?.uunit?.psassemblytype);
          }
          if (
            JobPayloadDecrypteData?.lunit?.psassemblytype == "A1" ||
            JobPayloadDecrypteData?.lunit?.psassemblytype == "B1"
          ) {
            selectedSinkConfig.lunit.pscornerdb = parseFloat(
              JobPayloadDecrypteData?.lunit?.pscornerdb
            );
            selectedSinkConfig.lunit.pswinglength = parseFloat(
              JobPayloadDecrypteData?.lunit?.pswinglength
            );
            setLeftwinglength(JobPayloadDecrypteData?.lunit?.pswinglength);
            setCornerdblength(JobPayloadDecrypteData?.lunit?.pscornerdb);
          } else if (
            JobPayloadDecrypteData?.lunit?.psassemblytype == "C1" ||
            JobPayloadDecrypteData?.lunit?.psassemblytype == "D1"
          ) {
            selectedSinkConfig.lunit.pscornerdb = parseFloat(
              JobPayloadDecrypteData?.lunit?.pscornerdb
            );
            selectedSinkConfig.lunit.pswinglength = parseFloat(
              JobPayloadDecrypteData?.lunit?.pswinglength
            );
            setRightwinglength(JobPayloadDecrypteData?.lunit?.pswinglength);
            setCornerdblength(JobPayloadDecrypteData?.lunit?.pscornerdb);
          } else {
            setLeftwinglength(JobPayloadDecrypteData?.uunit?.psleftwinglength);
            setRightwinglength(
              JobPayloadDecrypteData?.uunit?.psrightwinglength
            );
            selectedSinkConfig.uunit.psleftwinglength = parseFloat(
              JobPayloadDecrypteData?.uunit?.psleftwinglength
            );
            selectedSinkConfig.uunit.psrightwinglength = parseFloat(
              JobPayloadDecrypteData?.uunit?.psrightwinglength
            );
            selectedSinkConfig.uunit.pscornerdb = parseFloat(
              JobPayloadDecrypteData?.uunit?.pscornerdb
            );

            if (JobPayloadDecrypteData?.psconfiguration == "U") {
              setImageselection(JobPayloadDecrypteData?.uunit?.psassemblytype);
              handleImageSelection({
                target: {
                  name: JobPayloadDecrypteData?.uunit?.psassemblytype,
                  configuration: JobPayloadDecrypteData?.psconfiguration,
                },
              });
            } else {
              setConfiguration(JobPayloadDecrypteData?.psconfiguration);
              setImageselection(JobPayloadDecrypteData?.lunit?.psassemblytype);
            }

            if (
              JobPayloadDecrypteData?.uunit?.psassemblytype == "A1" ||
              JobPayloadDecrypteData?.uunit?.psassemblytype == "C1" ||
              JobPayloadDecrypteData?.uunit?.psassemblytype == "E1" ||
              JobPayloadDecrypteData?.uunit?.psassemblytype == "G1"
            ) {
              selectedSinkConfig.uunit.psrightwinglength = parseFloat(
                JobPayloadDecrypteData?.uunit?.psrightwinglength
              );
              setLeftcornerdblength(JobPayloadDecrypteData?.uunit?.pscornerdb);
            } else {
              setRightcornerdblength(JobPayloadDecrypteData?.uunit?.pscornerdb);
            }
          }
          setInternaldata(
            Object.keys(enteredJSON).length > 0 && enteredJSON?.isinternaluser
          );
        }
      })
      .catch((error) => {
        ApiErrorMessage(error)
        // console.log("external job error", error);
      });
  };

  const checkLUnit_Or_UUnit = () => {
    return (
      !selectedObject.lunit.psassemblytype ||
      selectedObject.lunit.psassemblytype !== "NONE"
    );
  };

  // autopopulated values in JSON
  function autopopulate() {
    var autocompletobj = {
      Orientation: selectedObject?.psorientation,
      Configuration: selectedObject?.psconfiguration,
      FrontRim: selectedObject?.top?.psrims,
      BackSplash: selectedObject?.top?.psbacksplash,
      EndSplashRight: selectedObject?.top?.psendsplashright,
      EndSplashLeft: selectedObject?.top?.psendsplashleft,
      FronttoBack: selectedObject?.psunitwidth,
      length: selectedObject?.psunitlength,
      deckValue: selectedObject?.psdeckheight,
      JointType: selectedObject?.psjointtype,
      PSXXX: selectedObject?.electricals?.psxxx,
      voltage: selectedObject?.electricals?.psvoltage,
      SoiledDrainBoard: selectedObject?.scrap?.pssoildblength,
      ConsultantName: selectedObject?.drawingdetails?.psconsultant,
      jobName: selectedObject?.drawingdetails?.psprojectname,
      OvershelfDistance: selectedObject?.overshelf?.psovershelfdistance,
      OvershelfLength: selectedObject?.overshelf?.psovershelflength,
      cornerdblength: checkLUnit_Or_UUnit()
        ? selectedObject?.lunit?.pscornerdb
        : null,
      leftwinglength: checkLUnit_Or_UUnit()
        ? selectedObject?.lunit?.pswinglength
        : selectedObject?.uunit?.psleftwinglength,
      rightwinglength: checkLUnit_Or_UUnit()
        ? selectedObject?.lunit?.pswinglength
        : selectedObject?.uunit?.psrightwinglength,
      rightcornerdblength:
        !checkLUnit_Or_UUnit() && !checkOrientation(OrientationValue)
          ? selectedObject?.uunit?.pscornerdb
          : null,
      leftcornerdblength:
        !checkLUnit_Or_UUnit() && !checkOrientation(OrientationValue)
          ? selectedObject?.uunit?.pscornerdb
          : null,
    };
    reset(autocompletobj);
    setPssdsinklengthValue(selectedObject?.scrap?.pssdsinklength);
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

    handleConfigurationChange({
      target: { value: selectedObject?.psconfiguration },
    });
    handleRimChange({ target: { value: selectedObject?.top?.psrims } });
    handleBacksplashChange({
      target: { value: selectedObject?.top?.psbacksplash },
    });
    handleSplashrightChange({
      target: { value: selectedObject?.top?.psendsplashright },
    });
    handleSplashleftChange({
      target: { value: selectedObject?.top?.psendsplashleft },
    });
    selectedObject?.top?.psendsplashleft && handleLengthChange({
      target: { value:selectedObject?.top?.psendsplashleft },
    });
    selectedObject?.top?.psbacksplashheight && handleBacksplashheight({
      target: { value: selectedObject?.top?.psbacksplashheight },
    });
    // handleBacksplashheight({target: {value: selectedObject?.top?.psbacksplashheight}});

    handleWidthChange({ target: { value: selectedObject?.psunitwidth } });
    handleLengthChange({ target: { value: selectedObject?.psunitlength } });
    handleDepthChange({ target: { value: selectedObject?.psdeckheight } });
    handleJointtypeChange({ target: { value: selectedObject?.psjointtype } });
    handlePsxChange({ target: { value: selectedObject?.electricals?.psxxx } });
    handleMotorChange({
      target: { value: selectedObject?.electricals?.psmotor },
    });
    handleVoltageChange({
      target: { value: selectedObject?.electricals?.psvoltage },
    });
    handleGenChange({ target: { value: selectedObject?.wash?.psgeneration } });
    setHeaterPower(selectedObject?.electricals?.psheaterpower);
    handleCrossChange({
      target: { value: selectedObject?.legassembly?.pscrossrails },
    });
    setFootValue(selectedObject?.legassembly?.psfoottype);
    handleFootChange({
      target: { value: selectedObject?.legassembly?.psfoottype },
    });
    handleSoildblengthChange({
      target: { value: selectedObject?.scrap?.pssoildblength },
    });
    handleDryingChange({
      target: { value: selectedObject?.accessories?.psdryingrack },
    });
    setUndershelf(selectedObject?.accessories?.psundershelf);
    handleUndershelfChange({
      target: { value: selectedObject?.accessories?.psundershelf },
    });
    handleOvershelfChange({
      target: { value: selectedObject?.overshelf?.psovershelf },
    });
    handleOvershelfdistanceChange({
      target: { value: selectedObject?.overshelf?.psovershelfdistance },
    });
    handleOvershelflengthChange({
      target: { value: selectedObject?.overshelf?.psovershelflength },
    });
    setOvershelfHeight(selectedObject?.overshelf?.psovershelfheight);
    handlemodelchange({
      target: { value: selectedObject?.scrap?.pscollectorpartnumber },
    });
    handleUtensilbasketChange({
      target: { value: selectedObject?.accessories?.psutensilbasket },
    });
    setUtensilbasketValue(selectedObject.accessories.psutensilbasket)
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
    const toolTip = document.getElementById("overshelftooltip");
    const shelfLength = document.getElementById("overshelflength");
    const shelfHeight = document.getElementById("overshelfheight");
    const shelfDistance = document.getElementById("overshelfdistancefromedge");
    if (
      selectedObject?.overshelf.psovershelf === "NONE" ||
      selectedObject?.overshelf.psovershelf === "No Overshelf"
    ) {
      if (toolTip) toolTip.hidden = true;
      if (shelfLength) shelfLength.hidden = true;
      if (shelfHeight) shelfHeight.hidden = true;
      if (shelfDistance) shelfDistance.hidden = true;
    } else {
      if (toolTip) toolTip.hidden = false;
      if (shelfLength) shelfLength.hidden = false;
      if (shelfHeight) shelfHeight.hidden = false;
      if (shelfDistance) shelfDistance.hidden = false;
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
    if (selectedObject?.accessories.psvacuumbreaker === "OFF") {
      document.getElementById("PsVacBreaker").checked = false;
    } else {
      document.getElementById("PsVacBreaker").checked = true;
    }

    handleDualtemperingChange({
      target: { value: selectedObject?.accessories.psdualtempering },
    });
    handleChemicaldispenserChange({
      target: { value: selectedObject?.accessories.pschemicaldispenser },
    });
    handlePsVacBreakerChange({
      target: { value: selectedObject?.accessories.psvacuumbreaker },
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
    // filterData();

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
    setMotorHP("2HP");
    setPsscrapperdisposerunit("ScrapSink");
  }, []);

  const handleLengthChange = (e) => {
    // const regex = /^[0-9]+$/;
    const regex = /^\d*\.?\d*$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
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
      const cleanDrainDBValue = calculateDrain(
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
      setCleanDrain(cleanDrainDBValue);
    }
  };
  const handleDepthChange = (e) => {
    setDeckValue(e.target.value);
    selectedSinkConfig.psdeckheight = parseFloat(e.target.value);
    setValue("Deckheight", e.target.value);
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
    if (configuration == "U") {
      setUshapeunitlength(2 * parseFloat(e.target.value) + 30);
      setCornerdbval(parseFloat(e.target.value) + 8);
    } else if (configuration == "L") {
      setUshapeunitlength(parseFloat(e.target.value) + 30);
      setCornerdbval(parseFloat(e.target.value));
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
    if(selectedSinkConfig.top.psbacksplash =="Up Bs"){
      setbacksplashHeight(9.5);
      selectedSinkConfig.top.psbacksplashheight=9.5
      setValue("Backsplashheight",9.5)
    }
    else if(selectedSinkConfig.top.psbacksplash =="Down Bs"){
      setbacksplashHeight(selectedSinkConfig.top.psbacksplashheight=8);
      setValue("Backsplashheight",8)
    }
  };
  const handleSplashrightChange = (e) => {
    setSplashright(e.target.value);
    selectedSinkConfig.top.psendsplashright = e.target.value;
    const cleanDrainDBValue = calculateDrain(
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
    setCleanDrain(cleanDrainDBValue);
  };
  const handleSplashleftChange = (e) => {
    setSplashleft(e.target.value);
    selectedSinkConfig.top.psendsplashleft = e.target.value;
    const cleanDrainDBValue = calculateDrain(
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
    setCleanDrain(cleanDrainDBValue);
  };

  const handleBacksplashheight=(e)=>{
    setbacksplashHeight(e.target.value)
    selectedSinkConfig.top.psbacksplashheight =e.target.value;
    console.log( selectedSinkConfig.top.psbacksplashheight," selectedSinkConfig.top.psbacksplashheight ===3")
  }
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
      e.target.value == "PS-225 CONTROL, ULTRA-BRIGHT ALERT SYSTEM W/HEAT" ||
      e.target.value == "PS-100 CONTROL W/HEAT"
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
      setVoltageValue("208V/1P");
      selectedSinkConfig.electricals.psvoltage = "208V/1P";
    } else {
      setVoltageValue("208V/3P");
      selectedSinkConfig.electricals.psvoltage = "208V/3P";
    }
  };

  const handleMotorChange = (e) => {
    setMotorHP(e.target.value);
    if (e.target.value == "3HP") {
      setVoltageValue("230V/3P");
      selectedSinkConfig.electricals.psvoltage = "230V/3P";
    }
    selectedSinkConfig.electricals.psmotor = e.target.value;
    handleWashLengthFilter();
  };

  const handleVoltageChange = (e) => {
    setVoltageValue(e.target.value);
    selectedSinkConfig.electricals.psvoltage = e.target.value;

    handleWashLengthFilter();
  };

  const handleCleandrainboardChange = (e) => {
    // const regex = /^[0-9]+$/;
    const regex = /^\d*\.?\d*$/;
    if (e.target.value === "" || regex.test(e.target.value))
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
    // const regex = /^[0-9]+$/;
    const regex = /^\d*\.?\d*$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setSoildblengthValue(e.target.value);
      const cleanDrainDBValue = calculateDrain(
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
      setCleanDrain(cleanDrainDBValue);
      selectedSinkConfig.scrap.pssoildblength = parseFloat(e.target.value);
    }
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
  const checkedfunc = (checked, scrapchecked, sanitizechecked) => {
    return (
      checked ||
      scrapchecked ||
      sanitizechecked ||
      (checked && scrapchecked) ||
      (checked && sanitizechecked) ||
      (scrapchecked && sanitizechecked) ||
      (checked && sanitizechecked && scrapchecked)
    );
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
    if (e.target.value == "NONE") {
      document.getElementById("dryingracktooltip").hidden = true;
    }
  };
  const handleUndershelfChange = (e) => {
    setUndershelf(e.target.value);
    selectedSinkConfig.accessories.psundershelf = e.target.value;
    document.getElementById("undershelftooltip").hidden = true;
    if (e.target.value != "select" && e.target.value !== "None") {
      document.getElementById("undershelftooltip").hidden = false;
    }
    if (e.target.value == "NONE") {
      document.getElementById("undershelftooltip").hidden = true;
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
    } else {
      setOrientation("");
      setConfiguration("");
      setLeftshape("");
      setRightshape("");
    }
    // solution for Bug 124
    setLeftcornerdblength("");
    setRightcornerdblength("");
    selectedSinkConfig.uunit.pscornerdb = 0;
    // end solution for Bug 124
    selectedSinkConfig.psorientation = e.target.value;
  };
  const handleConfigurationChange = (e) => {
    setConfiguration(e.target.value);
    selectedSinkConfig.psconfiguration = parseFloat(e.target.value);

    if (e.target.value == "Straight 2PC") {
      setTextbox(true);
      setLeftshape(false);
      setRightshape(false);
      //selectedSinkConfig.psjointtype = "JBZ";
      //selectedSinkConfig.psjointtype = "Field Weld";
    } else if (e.target.value === "U") {
      setTextbox(true);
      setLeftshape(true);
      setRightshape(true);
      //selectedSinkConfig.psjointtype = "JBZ";
      //selectedSinkConfig.psjointtype = "Field Weld";
    } else if (e.target.value === "L") {
      setTextbox(true);
      setLeftshape(false);
      setRightshape(false);
      //selectedSinkConfig.psjointtype = "JBZ";
      //selectedSinkConfig.psjointtype = "Field Weld";
    } else {
      setLeftshape(false);
      setRightshape(false);
      setTextbox(false);
      selectedSinkConfig.psjointtype = "1PC"; //Default 1pc as joint type
    }
    selectedSinkConfig.psconfiguration = e.target.value;

    // reset the values
    setLeftwinglength("");
    selectedSinkConfig.uunit.psleftwinglength = 0;
    setRightwinglength("");
    selectedSinkConfig.uunit.psrightwinglength = 0;
    selectedSinkConfig.lunit.pswinglength = 0;
    setImageselection("");
    setlength("");
    selectedSinkConfig.psunitlength = 0;
    // end of reset Values
    if (e.target.value == "L") {
      selectedSinkConfig.lunit.psassemblytype = e.target.value;
      selectedSinkConfig.uunit.psassemblytype = "NONE";
    } else if (e.target.value == "U") {
      selectedSinkConfig.uunit.psassemblytype = e.target.value;
      selectedSinkConfig.lunit.psassemblytype = "NONE";
    } else {
      selectedSinkConfig.uunit.psassemblytype = "NONE";
      selectedSinkConfig.lunit.psassemblytype = "NONE";
    }

    setWidthValue("");
    setCornerdbval("");
    selectedSinkConfig.psunitwidth = 0;
  };

  const handleReferenceChange = (e) => {};
  const handleProjectName = (e) => {
    selectedSinkConfig.drawingdetails.psprojectname = e.target.value;
    setprojectname(e.target.value);
    setJobName(e.target.value);
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
useEffect(()=>{
if(!prerinsefaucet==true){
  document.getElementById("PsVacBreaker").checked=false
 
}
else if(psscrapperdisposerunit == "ScrapSink"|| psscrapperdisposerunit == "none"){
  document.getElementById("PsVacBreaker").checked= false
  }
else{
  document.getElementById("PsVacBreaker").disabled=false
}
},[prerinsefaucet,psscrapperdisposerunit ])
  // useEffect (()=>{
  //   if(psscrapperdisposerunit == "ScrapSink"){
  //   document.getElementById("PsVacBreaker").checked=false
  //   }

  // },[psscrapperdisposerunit == "ScrapSink"])
  const handlePsVacBreakerChange =(e)=>{
    if (e.target.checked) {
      selectedSinkConfig.accessories.psvacuumbreaker = 
    "ON";
    } else {
      selectedSinkConfig.accessories.psvacuumbreaker = "OFF";
      
    }

     
  }
 

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
    const toolTip = document.getElementById("overshelftooltip");
    const shelfLength = document.getElementById("overshelflength");
    const shelfHeight = document.getElementById("overshelfheight");
    const shelfDistance = document.getElementById("overshelfdistancefromedge");

    if (toolTip) toolTip.hidden = false;
    if (shelfLength) shelfLength.hidden = false;
    if (shelfHeight) shelfHeight.hidden = false;
    if (shelfDistance) shelfDistance.hidden = false;

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
      if (toolTip) toolTip.hidden = true;
      if (shelfLength) shelfLength.hidden = true;
      if (shelfHeight) shelfHeight.hidden = true;
      if (shelfDistance) shelfDistance.hidden = true;
    } else {
      setOvershelfImage();
      if (toolTip) toolTip.hidden = true;
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
    // const regex = /^[0-9]+$/;
    const regex = /^\d*\.?\d*$/;
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

    var scrapSinkLength = "",
      preRinseCenterPosition = "",
      rinseCenterPosition = "",
      sanitizeCenterPosition = "";

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

      //  shelfRestrictedValue.push(`${Math.round(rinseStartValue + shelfEndstoPoleAxisDis - validatedDistance)}`);

      //  shelfRestrictedValue.push( `  to  ${ Math.round(rinseEndValue + shelfEndstoPoleAxisDis - validatedDistance)} `);

      // shelfRestrictedValue.push( `  and  ${Math.round(sanitizeStartValue + shelfEndstoPoleAxisDis - validatedDistance )}`);

      //  shelfRestrictedValue.push( `  to  ${Math.round(  sanitizeEndValue + shelfEndstoPoleAxisDis - validatedDistance ) }`);

      if (shelfRestrictedValue[2] - shelfRestrictedValue[1] < 5) {
        shelfRestrictedValue.splice(1, 2);
      }
      if (shelfRestrictedValue.length == "2") {
        shelfRestrictedValue.push(
          `${Math.round(
            rinseStartValue + shelfEndstoPoleAxisDis - validatedDistance
          )}`
        );
        shelfRestrictedValue.push(
          `  to  ${Math.round(
            rinseEndValue + shelfEndstoPoleAxisDis - validatedDistance
          )} `
        );
      } else {
        shelfRestrictedValue.push(
          `${Math.round(
            rinseStartValue + shelfEndstoPoleAxisDis - validatedDistance
          )}`
        );
        shelfRestrictedValue.push(
          `  to  ${Math.round(
            rinseEndValue + shelfEndstoPoleAxisDis - validatedDistance
          )} `
        );
        shelfRestrictedValue.push(
          `  and  ${Math.round(
            sanitizeStartValue + shelfEndstoPoleAxisDis - validatedDistance
          )}`
        );
        shelfRestrictedValue.push(
          `  to  ${Math.round(
            sanitizeEndValue + shelfEndstoPoleAxisDis - validatedDistance
          )}`
        );
      }
      const shelfRestrictedJionValue = shelfRestrictedValue.join("");
      setShelfvalue(shelfRestrictedJionValue);


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
    // const regex = /^[0-9]+$/;
    const regex = /^\d*\.?\d*$/;
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

  const handleImageSelection = (e) => {
    e.target.value = e.target.name;
    const config = e.target.configuration
      ? e.target.configuration
      : configuration;
    if (
      (e.target.value == "C1" && config == "L") ||
      (e.target.value == "D1" && config == "L")
    ) {
      setImageselection(e.target.value);
      selectedSinkConfig.lunit.psassemblytype = e.target.value;
      setRightshape(true);
      setLeftshape(false);
    } else if (
      (e.target.value == "A1" && config == "L") ||
      (e.target.value == "B1" && config == "L")
    ) {
      setImageselection(e.target.value);
      selectedSinkConfig.lunit.psassemblytype = e.target.value;
      setLeftshape(true);
      setRightshape(false);
    } else {
      setImageselection(e.target.value);
      selectedSinkConfig.uunit.psassemblytype = e.target.value;
    }
    imageSelectionError && setImageSelectionError(false);
  };
  const handleLeftWingLengthChange = (e) => {
    // const regex = /^[0-9]+$/;
    const regex = /^\d*\.?\d*$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      if (rightshape == true && leftshape == true) {
        setLeftwinglength(e.target.value);
        selectedSinkConfig.uunit.psleftwinglength = parseFloat(e.target.value);
      } else if (rightshape == true || leftshape == true) {
        setLeftwinglength(e.target.value);
        selectedSinkConfig.lunit.pswinglength = parseFloat(e.target.value);
      }
    }
  };
  const handleRightWingLengthChange = (e) => {
    // alert(e.target.value)
    const regex = /^\d*\.?\d*$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      if (rightshape == true && leftshape == true) {
        setRightwinglength(e.target.value);
        selectedSinkConfig.uunit.psrightwinglength = parseFloat(e.target.value);
      } else if (rightshape == true || leftshape == true) {
        setRightwinglength(e.target.value);
        selectedSinkConfig.lunit.pswinglength = parseFloat(e.target.value);
      }
    }
  };
  const handlecornerdbChange = (e) => {
    setCornerdblength(e.target.value);
    selectedSinkConfig.lunit.pscornerdb = parseFloat(e.target.value);
    // setCornerdbval(parseFloat(widthValue)+8);
  };
  const handleleftcornerdbChange = (e) => {
    // const regex = /^[0-9]+$/;
    const regex = /^\d*\.?\d*$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setLeftcornerdblength(e.target.value);
      selectedSinkConfig.uunit.pscornerdb = parseFloat(e.target.value);
    }
  };
  const handlerightcornerdbChange = (e) => {
    // const regex = /^[0-9]+$/;
    const regex = /^\d*\.?\d*$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setRightcornerdblength(e.target.value);
      selectedSinkConfig.uunit.pscornerdb = parseFloat(e.target.value);
    }
  };
  const commoncornerautovalue = () => {
    let rightCorDB = "";
    let leftCorDB = "";
    const backSplashWidth = 2.0;
    if (imageselection == "A1" && washSinkLength != "") {
      rightCorDB =
        parseFloat(length) -
        (parseFloat(leftcornerdblength) +
          parseFloat(washSinkLength) +
          backSplashWidth * 2);
    } else if (imageselection == "B1" && washSinkLength != "") {
      leftCorDB =
        parseFloat(length) -
        (parseFloat(rightcornerdblength) +
          parseFloat(washSinkLength) +
          backSplashWidth * 2);
    } else if (
      imageselection == "C1" &&
      washSinkLength != "" &&
      rinselength != ""
    ) {
      rightCorDB =
        parseFloat(length) -
        (parseFloat(leftcornerdblength) +
          parseFloat(washSinkLength) +
          parseFloat(rinselength) +
          backSplashWidth * 2);
    } else if (
      imageselection == "D1" &&
      washSinkLength != "" &&
      rinselength != ""
    ) {
      leftCorDB =
        parseFloat(length) -
        (parseFloat(rightcornerdblength) +
          parseFloat(washSinkLength) +
          parseFloat(rinselength) +
          backSplashWidth * 2);
    } else if (
      imageselection == "E1" &&
      washSinkLength != "" &&
      rinselength != "" &&
      sinkLength != "" &&
      sanitizelength != ""
    ) {
      rightCorDB =
        parseFloat(length) -
        (parseFloat(leftcornerdblength) +
          parseFloat(sinkLength) +
          parseFloat(lengthbtw) +
          parseFloat(washSinkLength) +
          parseFloat(rinselength) +
          parseFloat(sanitizelength) +
          backSplashWidth * 2);
    } else if (
      imageselection == "F1" &&
      washSinkLength != "" &&
      rinselength != "" &&
      sinkLength != "" &&
      sanitizelength != ""
    ) {
      leftCorDB =
        parseFloat(length) -
        (parseFloat(rightcornerdblength) +
          parseFloat(sinkLength) +
          parseFloat(lengthbtw) +
          parseFloat(washSinkLength) +
          parseFloat(rinselength) +
          parseFloat(sanitizelength) +
          backSplashWidth * 2);
    } else if (
      imageselection == "G1" &&
      washSinkLength != "" &&
      rinselength != "" &&
      sanitizelength != ""
    ) {
      rightCorDB =
        parseFloat(length) -
        (parseFloat(leftcornerdblength) +
          parseFloat(washSinkLength) +
          parseFloat(rinselength) +
          parseFloat(sanitizelength) +
          backSplashWidth * 2);
    } else if (
      imageselection == "H1" &&
      washSinkLength != "" &&
      rinselength != "" &&
      sanitizelength != ""
    ) {
      leftCorDB =
        parseFloat(length) -
        (parseFloat(rightcornerdblength) +
          parseFloat(washSinkLength) +
          parseFloat(rinselength) +
          parseFloat(sanitizelength) +
          backSplashWidth * 2);
    }
    if (rightCorDB) {
      setRightcornerdblength(rightCorDB);
      setValue("rightcornerdblength", rightCorDB);
    } else if (leftCorDB) {
      setLeftcornerdblength(leftCorDB);
      setValue("leftcornerdblength", leftCorDB);
    }
  };

  const AutocalcvalueforSoiledDB = () => {
    const backSplashWidth = 2.0;
    let soidDBElength = "";
    if (configuration == "L") {
      if (
        imageselection == "A1" &&
        leftwinglength &&
        washSinkLength &&
        widthValue &&
        sinkLength
      ) {
        soidDBElength =
          parseFloat(leftwinglength) -
          (parseFloat(widthValue) - 1.5) -
          parseFloat(washSinkLength) -
          parseFloat(lengthbtw) -
          parseFloat(sinkLength) -
          calculateFlashLength(splashleft);
      } else if (
        imageselection == "B1" &&
        length &&
        washSinkLength &&
        sinkLength &&
        cornerdblength
      ) {
        soidDBElength =
          parseFloat(length) -
          backSplashWidth -
          parseFloat(cornerdblength) -
          parseFloat(washSinkLength) -
          parseFloat(lengthbtw) -
          parseFloat(sinkLength) -
          calculateFlashLength(splashRight);
      } else if (
        imageselection == "C1" &&
        length &&
        washSinkLength &&
        sinkLength &&
        cornerdblength
      ) {
        soidDBElength =
          parseFloat(length) -
          backSplashWidth -
          parseFloat(cornerdblength) -
          parseFloat(washSinkLength) -
          parseFloat(lengthbtw) -
          parseFloat(sinkLength) -
          calculateFlashLength(splashleft);
      } else if (
        imageselection == "D1" &&
        rightwinglength &&
        washSinkLength &&
        sinkLength &&
        cornerdblength
      ) {
        soidDBElength =
          parseFloat(rightwinglength) -
          (parseFloat(widthValue) - 1.5) -
          parseFloat(washSinkLength) -
          parseFloat(lengthbtw) -
          parseFloat(sinkLength) -
          calculateFlashLength(splashRight);
      }
      setSoildblengthValue(soidDBElength);
      setValue("SoiledDrainBoard", soidDBElength);
      selectedSinkConfig.scrap.pssoildblength = parseFloat(soidDBElength);
    } else if (configuration == "U") {
      if (
        imageselection == "A1" &&
        widthValue &&
        sinkLength &&
        leftwinglength
      ) {
        soidDBElength =
          psscrapperdisposerunit == "DisposerCone"
            ? parseFloat(leftwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashleft) -
              11
            : parseFloat(leftwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashleft);
      } else if (
        imageselection == "B1" &&
        widthValue &&
        sinkLength &&
        rightwinglength
      ) {
        soidDBElength =
          psscrapperdisposerunit == "DisposerCone"
            ? parseFloat(rightwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashRight) -
              11
            : parseFloat(rightwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashleft);
      } else if (
        imageselection == "C1" &&
        widthValue &&
        sinkLength &&
        leftwinglength
      ) {
        soidDBElength =
          psscrapperdisposerunit == "DisposerCone"
            ? parseFloat(leftwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashleft) -
              11
            : parseFloat(leftwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashleft);
      } else if (
        imageselection == "D1" &&
        widthValue &&
        sinkLength &&
        rightwinglength
      ) {
        soidDBElength =
          psscrapperdisposerunit == "DisposerCone"
            ? parseFloat(rightwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashRight) -
              11
            : parseFloat(rightwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashleft);
      } else if (imageselection == "E1" && widthValue && leftwinglength) {
        soidDBElength =
          parseFloat(leftwinglength) -
          (parseFloat(widthValue) - 1.5) -
          calculateFlashLength(splashleft);
      } else if (imageselection == "F1" && widthValue && rightwinglength) {
        soidDBElength =
          parseFloat(rightwinglength) -
          (parseFloat(widthValue) - 1.5) -
          calculateFlashLength(splashRight);
      } else if (
        imageselection == "G1" &&
        widthValue &&
        sinkLength &&
        leftwinglength
      ) {
        soidDBElength =
          psscrapperdisposerunit == "DisposerCone"
            ? parseFloat(leftwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashleft) -
              11
            : parseFloat(leftwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashleft);
      } else if (
        imageselection == "H1" &&
        widthValue &&
        sinkLength &&
        rightwinglength
      ) {
        soidDBElength =
          psscrapperdisposerunit == "DisposerCone"
            ? parseFloat(rightwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashRight) -
              11
            : parseFloat(rightwinglength) -
              (parseFloat(widthValue) - 1.5) -
              parseFloat(sinkLength) -
              calculateFlashLength(splashleft);
      } else if (
        imageselection == "C1" &&
        length &&
        washSinkLength &&
        sinkLength &&
        cornerdblength
      ) {
        soidDBElength =
          parseFloat(length) -
          backSplashWidth -
          parseFloat(cornerdblength) -
          parseFloat(washSinkLength) -
          parseFloat(lengthbtw) -
          parseFloat(sinkLength) -
          calculateFlashLength(splashleft);
      } else if (
        imageselection == "D1" &&
        leftwinglength &&
        washSinkLength &&
        sinkLength &&
        cornerdblength
      ) {
        soidDBElength =
          parseFloat(leftwinglength) -
          (parseFloat(widthValue) - 1.5) -
          parseFloat(washSinkLength) -
          parseFloat(lengthbtw) -
          parseFloat(sinkLength) -
          calculateFlashLength(splashRight);
      }
      setSoildblengthValue(soidDBElength);
      setValue("SoiledDrainBoard", soidDBElength);
      selectedSinkConfig.scrap.pssoildblength = parseFloat(soidDBElength);
    }
    if (soidDBElength >= 0) {
      clearErrors("SoiledDrainBoard");
    }
  };

  const AutoCalcCleandb = () => {
    let cleanDB = "";
    const backSplashWidth = 2.0;
    if (configuration == "L") {
      if (imageselection == "A1") {
        cleanDB =
          parseFloat(length) -
          backSplashWidth -
          parseFloat(cornerdblength) -
          parseFloat(rinselength) -
          parseFloat(sanitizelength) -
          calculateFlashLength(splashRight);
      } else if (imageselection == "B1") {
        cleanDB =
          parseFloat(leftwinglength) -
          (parseFloat(widthValue) - 1.5) -
          parseFloat(rinselength) -
          parseFloat(sanitizelength);
      } else if (imageselection == "C1") {
        cleanDB =
          parseFloat(rightwinglength) -
          (parseFloat(widthValue) - 1.5) -
          parseFloat(rinselength) -
          parseFloat(sanitizelength) -
          calculateFlashLength(splashRight);
      } else if (imageselection == "D1") {
        cleanDB =
          parseFloat(length) -
          backSplashWidth -
          parseFloat(cornerdblength) -
          parseFloat(rinselength) -
          parseFloat(sanitizelength) -
          calculateFlashLength(splashleft);
      }
      setAutoCleandrainDB(!isNaN(cleanDB) ? cleanDB : "");
      setCleanDrain(!isNaN(cleanDB) ? cleanDB : "");
    } else if (configuration == "U") {
      if (imageselection == "A1") {
        cleanDB =
          parseFloat(rightwinglength) -
          (parseFloat(widthValue) - 1.5) -
          parseFloat(sanitizelength) -
          parseFloat(rinselength) -
          calculateFlashLength(splashRight);
      } else if (imageselection == "B1") {
        cleanDB =
          parseFloat(leftwinglength) -
          (parseFloat(widthValue) - 1.5) -
          parseFloat(sanitizelength) -
          parseFloat(rinselength) -
          calculateFlashLength(splashleft);
      } else if (imageselection == "C1") {
        cleanDB =
          parseFloat(rightwinglength) -
          (parseFloat(widthValue) - 1.5) -
          parseFloat(sanitizelength) -
          calculateFlashLength(splashRight);
      } else if (imageselection == "D1") {
        cleanDB =
          parseFloat(leftwinglength) -
          (parseFloat(widthValue) - 1.5) -
          parseFloat(sanitizelength) -
          calculateFlashLength(splashleft);
      } else if (imageselection == "E1") {
        cleanDB =
          parseFloat(rightwinglength) -
          (parseFloat(widthValue) - 1.5) -
          calculateFlashLength(splashRight);
      } else if (imageselection == "F1") {
        cleanDB =
          parseFloat(leftwinglength) -
          (parseFloat(widthValue) - 1.5) -
          calculateFlashLength(splashleft);
      } else if (imageselection == "G1") {
        cleanDB =
          parseFloat(rightwinglength) -
          (parseFloat(widthValue) - 1.5) -
          calculateFlashLength(splashRight);
      } else if (imageselection == "H1") {
        cleanDB =
          parseFloat(leftwinglength) -
          (parseFloat(widthValue) - 1.5) -
          calculateFlashLength(splashleft);
      }
      setAutoCleandrainDB(!isNaN(cleanDB) ? cleanDB : "");
      setCleanDrain(!isNaN(cleanDB) ? cleanDB : "");
    }
  };
  // sinks components validate
  const isValidData = Object.keys(selectedTabSinkConfig).every((key) => {
    const section = selectedTabSinkConfig[key];
    return Object.keys(section).every((prop) => {
      const value = section[prop];
      return value !== "" && value != null && value !== "NONE" && value !== 0;
    });
  });

  useEffect(() => {
    LandUshapeCleanDBErrorMessage();
  }, []);
  const LandUshapeCleanDBErrorMessage = () => {
    var textCleanDB = "";
    if (configuration === "Straight 2PC" || configuration === "Straight 1PC") {
      textCleanDB =
        "  Clean Drain board Length cannot be empty or negative.Please increase the unit length or decrease the Scrap, Wash, rinse and Sanitize sink length.";
    } else if (
      Orientation === "Right Rear" &&
      configuration === "L" &&
      imageselection === "B1"
    ) {
      textCleanDB =
        " Clean Drain board Length cannot be empty or negative.Please increase the Left wing length or decrease the rinse and Sanitize sink length.";
    } else if (
      Orientation === "Right Rear" &&
      configuration === "L" &&
      imageselection === "D1"
    ) {
      textCleanDB =
        "Clean Drain board Length cannot be empty or negative.Please increase the Unit length or decrease the rinse and Sanitize sink length.";
    } else if (
      Orientation === "Left Rear" &&
      configuration === "L" &&
      imageselection === "A1"
    ) {
      textCleanDB =
        " Clean Drain board length cannot be empty or negative.Please increase the unit length or decrease the rinse and Sanitize sink length.";
    } else if (
      Orientation === "Left Rear" &&
      configuration === "L" &&
      imageselection === "C1"
    ) {
      textCleanDB =
        " Clean Drain board Length cannot be empty or negative.Please increase the Right wing length or decrease the rinse and Sanitize sink length.";
    } else if (
      Orientation === "Right Rear" &&
      configuration === "U" &&
      imageselection === "B1"
    ) {
      textCleanDB =
        " Clean Drain board Length cannot be empty or negative.Please increase the Left wing length or decrease the rinse and Sanitize sink length.";
    } else if (
      Orientation === "Right Rear" &&
      configuration === "U" &&
      imageselection === "D1"
    ) {
      textCleanDB =
        "Clean Drain board Length cannot be empty or negative.Please increase the Left wing length or decrease the Sanitize sink length.";
    } else if (
      Orientation === "Right Rear" &&
      configuration === "U" &&
      imageselection === "F1"
    ) {
      textCleanDB =
        " Clean Drain board Length cannot be empty or negative.Please increase the Left wing length.";
    } else if (
      Orientation === "Right Rear" &&
      configuration === "U" &&
      imageselection === "H1"
    ) {
      textCleanDB =
        "Clean Drain board Length cannot be empty or negative.Please increase the Left wing length.";
    } else if (
      Orientation === "Left Rear" &&
      configuration === "U" &&
      imageselection === "A1"
    ) {
      textCleanDB =
        " Clean Drain board Length cannot be empty or negative.Please increase the Right wing length or decrease the rinse and Sanitize sink length.";
    } else if (
      Orientation === "Left Rear" &&
      configuration === "U" &&
      imageselection === "C1"
    ) {
      textCleanDB =
        "Clean Drain board Length cannot be empty or negative.Please increase the Right wing length or decrease the Sanitize sink length.";
    } else if (
      Orientation === "Left Rear" &&
      configuration === "U" &&
      imageselection === "E1"
    ) {
      textCleanDB =
        "Clean Drain board Length cannot be empty or negative.Please increase the Right wing length.";
    } else if (
      Orientation === "Left Rear" &&
      configuration === "U" &&
      imageselection === "G1"
    ) {
      textCleanDB =
        "Clean Drain board Length cannot be empty or negative.Please increase the Right wing length.";
    }
    return textCleanDB;
  };

  const ErrorvalidtionMessage = () => {
    if (isValid) {
      setValidPopUp(false);
      setImageSelectionError(false);
    } else {
      !imageselection && setImageSelectionError(true);
      Swal.fire({
        position: "top",
        icon: "error",
        text: Object.keys(errors)[0]
          ? `Please fill this ${Object.keys(errors)[0]} field`
          : `Please fill all the fields`,
        showConfirmButton: false,
        timer: 2000,
        color: "red",
        customClass: {
          content: "custom-text-size",
        },
      });
    }
  };
  const SubmitPopMessage = () => {
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Configuration successfully submitted",
      showConfirmButton: false,
      showConfirmButton: true,
      // timer: 1500,
      width: "600px",
    }).then((result) => {
        //window.location.reload()
    });
  };
  const handlePouupSelection = (e) => {
    const imagepopup = e;

    Swal.fire({
      position: "center",
      showConfirmButton: false,
      imageUrl: imagepopup,
      imageWidth: 800,
      imageHeight: 600,
      width: "900px",
      showCloseButton: true,
      className: "closebutton",
    });
  };

  const reloadPage = () => {
    window.location.reload();
  };
  const RedirectDesignPagePopup = () => {
    Swal.fire({
      position: 'center',
      title: "Unauthorized User, Please Check With Admin. Email: cseast2_inbox@electroluxprofessional.com",
      showConfirmButton: true,
      height: '200px',
      width: '650px',
      icon: 'warning', 
      customClass: {
        icon: 'warningicon',
        title:'titlepopup'
      },
      
    }).then((result) => {
      sessionStorage.clear();
      instance.logoutRedirect();
    });
 
   };
   const SinkErrorPopup = () => {
    Swal.fire({
      position: 'center',
      title: "Configuration submission failed. Please check all Sinks fields!",
      showConfirmButton: true,
      height: '200px',
      width: '650px',
      icon: 'warning', 
      customClass: {
        icon: 'warningicon',
        title:'titlepopup'
      },
      
    })
 
   };

  const RedirectDesignPage =()=>{
    if(process.env.REACT_APP_ISDESIGN_USER =="true" && sessionStorage.getItem("userEmailId").includes("@electroluxprofessional.com")){     
      RedirectDesignPagePopup();
    }

  }
useEffect (()=>{
  RedirectDesignPage()
},[process.env.REACT_APP_ISDESIGN_USER =="true"])


  // .................onsubmit function.............

  const onSubmit = (data, e) => {
    e.preventDefault();

    ErrorvalidtionMessage();
    (process.env.REACT_APP_ISDESIGN_USER =="true" )
      ? (selectedSinkConfig.psusermodule = "DESIGN")
      : (selectedSinkConfig.psusermodule = "CUSTOMER");
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

   

    if (Object.keys(enteredJSON).length > 0 && enteredJSON?.jobId !== "") {
      selectedSinkConfig.psjobid = enteredJSON?.jobId;
      // post Call make update call
      var configCreateAndUpdateApi = {
      
        method: internaldata ? "PUT" : "POST",

        url: internaldata
          ? process.env.REACT_APP_CURRENT_SERVER_URL +`/api/PsautoJobs/PutPsautoJob/${enteredJSON.jobId}`
          :process.env.REACT_APP_CURRENT_SERVER_URL +"/api/PsautoJobs/PostPsautoJob",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
        data: {
          EncryptedData: CryptoJS.AES.encrypt(
            JSON.stringify(selectedSinkConfig),
            SECRET_PASS,
            {
              mode: CryptoJS.mode.ECB,
              padding: CryptoJS.pad.Pkcs7,
            }
          ).toString(),
        }
      };

      
      if (isValidData) {
        axios(configCreateAndUpdateApi)
          .then(function (response) {
            if (
              response.data== "Job updated successfully" ||
              response.data == "Job requested successfully"||response.status==200||response.statusText=="OK"
            ) {
              SubmitPopMessage();
            } else {
              Swal.fire({
                position: 'center',
                title: "Configuration submission failed.",
                showConfirmButton: true,
                height: '200px',
                width: '650px',
                icon: 'warning', 
                customClass: {
                  icon: 'warningicon',
                  title:'titlepopup'
                },
                
              })
              
            }
          })
          .catch(function (error) {             
            ApiErrorMessage(error)
            });
        
        return;
      } else {
        SinkErrorPopup();
      }

      return;
    }


    var configCreateAPI = {
       method: "post",
      url:
        process.env.REACT_APP_CURRENT_SERVER_URL +"/api/PsautoJobs/PostPsautoJob",
      headers: {
         "Authorization": `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      data:{
        EncryptedData: CryptoJS.AES.encrypt(
          JSON.stringify(selectedSinkConfig),
          SECRET_PASS,
          {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          }
        ).toString(),
      },
      
    };
  
   
     if (isValidData) {
      axios(configCreateAPI)
        .then(function (response) {
           SubmitPopMessage();     
        })
        .catch((error)=> {  
          ApiErrorMessage(error)

        });
       return;
      } else {
        SinkErrorPopup();
      }
   
  };

  useEffect(() => {
    if (cleanDrain < 31) {
      selectedSinkConfig.accessories.psdryingrack = "NONE";
    }
    setValue("cleandrainboard", cleanDrain);
  }, [cleanDrain]);

  const handleEmail = (e) => {
    const emailAddress = e.target.getAttribute("href").replace("mailto:", "");
    window.location.href = `mailto:${emailAddress}`;
  };

  const checkConfig = (configuration) => {
    return configuration == "L" || configuration == "U";
  };

  const checkConfigForValidation = (configuration) => {
    return configuration == "L" || configuration == "U" || configuration == "";
  };

  const validate = (configuration) => {
    if (!checkConfigForValidation(configuration))
      return {
        ...register("SoiledDrainBoard", {
          required: "Soiled Drain Board Length required",
        }),
      };
    return false;
  };
  const soiledDrainBoardWatch = watch("SoiledDrainBoard", soildblengthValue);
  const cornerdblengthWatch = watch("cornerdblength", cornerdblength);
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  const checkOrientation = (ori) => {
    return ori == "Left to Right";
  };

  const setLengthSink = (value) => {
    setSinkLength(value);
  };

  const underShelfForU = () => {
    let underShelfData = metaData?.NoUndershelf;
    if (imageselection == "A1" || imageselection == "C1") {
      underShelfData =
        soildblengthValue <= 50 || collectorChecked === true
          ? metaData?.UndershelfRightSide
          : metaData?.Undershelf;
    } else if (imageselection == "B1" || imageselection == "D1") {
      underShelfData =
        soildblengthValue <= 50 || collectorChecked === true
          ? metaData?.UndershelfLeftSide
          : metaData?.Undershelf;
    } else if (imageselection == "E1" || imageselection == "G1") {
      if (
        (cleanDrain <= 50 && soildblengthValue <= 50) ||
        collectorChecked === true
      ) {
        underShelfData = metaData?.UndershelfRightSide;
      } else if (
        (cleanDrain > 50 && soildblengthValue <= 50) ||
        collectorChecked === true
      ) {
        underShelfData = metaData?.UndershelfRightSide;
      } else if (
        (cleanDrain <= 50 && soildblengthValue > 50) ||
        collectorChecked === true
      ) {
        underShelfData = metaData?.UndershelfLeftSide;
      } else if (
        (cleanDrain > 50 && soildblengthValue > 50) ||
        collectorChecked === true
      ) {
        underShelfData = metaData?.Undershelf;
      }
    } else if (imageselection == "F1" || imageselection == "H1") {
      if (
        (cleanDrain <= 50 && soildblengthValue <= 50) ||
        collectorChecked === true
      ) {
        underShelfData = metaData?.UndershelfLeftSide;
      } else if (
        (cleanDrain > 50 && soildblengthValue <= 50) ||
        collectorChecked === true
      ) {
        underShelfData = metaData?.UndershelfLeftSide;
      } else if (
        (cleanDrain <= 50 && soildblengthValue > 50) ||
        collectorChecked === true
      ) {
        underShelfData = metaData?.UndershelfRightSide;
      } else if (
        (cleanDrain > 50 && soildblengthValue > 50) ||
        collectorChecked === true
      ) {
        underShelfData = metaData?.Undershelf;
      }
    }
    return underShelfData;
  };

  return (
    <>
    <div>
      <Container fluid>
      <form
        onSubmit={handleSubmit(onSubmit)}
        name="unitfeatureform"
        id="unitfeatureform"
      >
        
        <div className="powersoak">
          <Container fluid>
            <Row>
              <Col lg={11} xs={12} sm={12} md={11}>
                <Form.Group as={Row}>
                  <Col lg={2} xs={12} sm={12} md={2}>
                    {process.env.REACT_APP_ISDESIGN_USER =="true"  && (                   
                      <Form.Label>
                        <p style={{ fontSize: 15 }}>Previous Configuration</p>
                      </Form.Label>
                    )}
                  </Col>
                  <Col lg={3} xs={12} sm={12} md={3} className="mb-2">
                    {process.env.REACT_APP_ISDESIGN_USER =="true"  && (
                      <div>
                        <Select
                          options={[...myData, ...externalData]}
                          styles={colourStyles}
                          isClearable
                          placeholder="Enter Previous Configuration"
                          onChange={handleJSONChange}
                          value={
                            enteredJSON?.jobId
                              ? [
                                  {
                                    label: enteredJSON?.jobId,
                                    value: enteredJSON?.jobId,
                                  },
                                ]
                              : ""
                          }
                        ></Select>
                      </div>
                    )}
                  </Col>
                  <Col lg={1} xs={12} sm={12} md={1}>
                    {process.env.REACT_APP_ISDESIGN_USER =="true"  && (
                      <button className="btn Searchbtn" onClick={handleSearchClick}>
                        Search
                      </button>
                    )}
                  </Col>
                  <Col lg={6} xs={12} sm={12} md={6}>  </Col>
                </Form.Group>
              </Col>
              <Col lg={1} xs={12} sm={12} md={1}>
                <Form.Group >
                    <button
                      type="button"
                      className=" btn Searchbtn"
                      onClick={reloadPage}
                      value="reload"
                    >
                      Reset Fields  <AiOutlineSync className="refershicon" />
                    </button>
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <OrientationPanel
            control={control}
            OrientationValue={OrientationValue}
            errors={errors}
            handleOrientationChange={handleOrientationChange}
            metaData={metaData}
            Drying_Rack={Drying_Rack}
            configuration={configuration}
            handleConfigurationChange={handleConfigurationChange}
            jobName={jobName}
            handleProjectName={handleProjectName}
            consultantname={consultantname}
            handleConsultantName={handleConsultantName}
          />
        </div>
        <div className="shape">
          <Container fluid className="gg">
            {Orientation !== "" && checkConfig(configuration) ? (
              <h2 className="imageheading mb-3">
                Choose Sub-Configuration(Click on image):
              </h2>
            ) : (
              <></>
            )}
            <div className="lshapes">
              <Row>
                <Col lg={6} xs={12} sm={12} md={6}>
                  {Orientation === "Right Rear" && configuration === "L" ? (
                    <div
                      className={`${
                        imageSelectionError ? "borderHeadRed" : "borderhead"
                      }`}
                    >
                      <Row>
                        {/* <Col lg={2} xs={4} sm={4} md={2} className="Lshapes"></Col> */}
                        <Col
                          lg={6}
                          xs={12}
                          sm={12}
                          md={6}
                          className="Lshapes hoverClass"
                        >
                          <div class="overlay">
                            <a class="icon" title="Click here to view image">
                              <HiMiniViewfinderCircle
                                onClick={(e) =>
                                  handlePouupSelection(LB1largeimage)
                                }
                              />
                            </a>
                          </div>
                          <img
                            src={LB}
                            name="B1"
                            className={`LshapesRtoL first-img ${
                              imageselection === "B1" ? "selected" : ""
                            }`}
                            //onMouseOver={handleMouseover}
                            onClick={(e) => handleImageSelection(e)}
                            alt={configuration}
                          />
                        </Col>
                        <Col
                          lg={6}
                          xs={12}
                          sm={12}
                          md={6}
                          className="Lshapes hoverClass"
                        >
                          <img
                            src={LD}
                            name="D1"
                            className={`LshapesRtoL ${
                              imageselection === "D1" ? "selected" : ""
                            }`}
                            onClick={(e) => handleImageSelection(e)}
                          />
                          <div class="overlay">
                            <a class="icon" title="Click here to view image">
                              <HiMiniViewfinderCircle
                                onClick={(e) =>
                                  handlePouupSelection(LD1largeimage)
                                }
                              />
                            </a>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  {Orientation === "Left Rear" && configuration === "L" ? (
                    <div
                      className={`${
                        imageSelectionError ? "borderHeadRed" : "borderhead"
                      }`}
                    >
                      <Row>
                        <Col
                          lg={6}
                          xs={12}
                          sm={12}
                          md={6}
                          className="Lshapes hoverClass"
                        >
                          <img
                            src={LA}
                            name="A1"
                            className={`LshapesRtoL first-img ${
                              imageselection === "A1" ? "selected" : ""
                            }`}
                            onClick={(e) => handleImageSelection(e)}
                          />
                          <div class="overlay">
                            <a class="icon" title="Click here to view image">
                              <HiMiniViewfinderCircle
                                onClick={(e) =>
                                  handlePouupSelection(LA1largeimage)
                                }
                              />
                            </a>
                          </div>
                        </Col>
                        <Col
                          lg={6}
                          xs={12}
                          sm={12}
                          md={6}
                          className="Lshapes hoverClass"
                        >
                          <img
                            src={LC}
                            name="C1"
                            className={`LshapesRtoL ${
                              imageselection === "C1" ? "selected" : ""
                            }`}
                            onClick={(e) => handleImageSelection(e)}
                          />
                          <div class="overlay">
                            <a class="icon" title="Click here to view image">
                              <HiMiniViewfinderCircle
                                onClick={(e) =>
                                  handlePouupSelection(LC1largeimage)
                                }
                              />
                            </a>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                </Col>
              </Row>
            </div>

            <div className="ushapes">
              {Orientation === "Right Rear" && configuration === "U" ? (
                <div>
                  <div
                    className={`${
                      imageSelectionError ? "borderHeadRed" : "borderhead"
                    } `}
                  >
                    <Row>
                      <Col
                        lg={3}
                        xs={3}
                        sm={3}
                        md={3}
                        className="shapes hoverClass"
                      >
                        <img
                          src={B1}
                          name="B1"
                          className={`UshapesRtoL first-img ${
                            imageselection === "B1" ? "selected" : ""
                          }`}
                          onClick={(e) => handleImageSelection(e)}
                        />
                        <div class="overlay">
                          <a class="icon" title="Click here to view image">
                            <HiMiniViewfinderCircle
                              onClick={(e) =>
                                handlePouupSelection(UB1largeimage)
                              }
                            />
                          </a>
                        </div>
                      </Col>
                      <Col
                        lg={3}
                        xs={3}
                        sm={3}
                        md={3}
                        className="shapes hoverClass"
                      >
                        <img
                          src={D1}
                          name="D1"
                          className={`UshapesRtoL ${
                            imageselection === "D1" ? "selected" : ""
                          }`}
                          onClick={(e) => handleImageSelection(e)}
                        />
                        <div class="overlay">
                          <a class="icon" title="Click here to view image">
                            <HiMiniViewfinderCircle
                              onClick={(e) =>
                                handlePouupSelection(UD1largeimage)
                              }
                            />
                          </a>
                        </div>
                      </Col>

                      <Col
                        lg={3}
                        xs={3}
                        sm={3}
                        md={3}
                        className="shapes hoverClass"
                      >
                        <img
                          src={F1}
                          name="F1"
                          className={`UshapesRtoL ${
                            imageselection === "F1" ? "selected" : ""
                          }`}
                          onClick={(e) => handleImageSelection(e)}
                        />
                        <div class="overlay">
                          <a class="icon" title="Click here to view image">
                            <HiMiniViewfinderCircle
                              onClick={(e) =>
                                handlePouupSelection(UF1largeimage)
                              }
                            />
                          </a>
                        </div>
                      </Col>
                      <Col
                        lg={3}
                        xs={3}
                        sm={3}
                        md={3}
                        className="shapes hoverClass"
                      >
                        <img
                          src={H1}
                          name="H1"
                          className={`UshapesRtoL last-img ${
                            imageselection === "H1" ? "selected" : ""
                          }`}
                          onClick={(e) => handleImageSelection(e)}
                        />
                        <div class="overlay">
                          <a class="icon" title="Click here to view image">
                            <HiMiniViewfinderCircle
                              onClick={(e) =>
                                handlePouupSelection(UH1largeimage)
                              }
                            />
                          </a>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              ) : null}
              {Orientation === "Left Rear" && configuration === "U" ? (
                <div
                  className={`${
                    imageSelectionError ? "borderHeadRed" : "borderhead"
                  }`}
                >
                  <Row>
                    <Col
                      lg={3}
                      xs={3}
                      sm={3}
                      md={3}
                      className="shapes hoverClass"
                    >
                      <img
                        src={A1}
                        name="A1"
                        className={`UshapesRtoL first-img ${
                          imageselection === "A1" ? "selected" : ""
                        }`}
                        onClick={(e) => handleImageSelection(e)}
                      />
                      <div class="overlay">
                        <a class="icon" title="Click here to view image">
                          <HiMiniViewfinderCircle
                            onClick={(e) => handlePouupSelection(UA1largeimage)}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      lg={3}
                      xs={3}
                      sm={3}
                      md={3}
                      className="shapes hoverClass"
                    >
                      <img
                        src={C1}
                        name="C1"
                        className={`UshapesRtoL ${
                          imageselection === "C1" ? "selected" : ""
                        }`}
                        onClick={(e) => handleImageSelection(e)}
                      />
                      <div class="overlay">
                        <a class="icon" title="Click here to view image">
                          <HiMiniViewfinderCircle
                            onClick={(e) => handlePouupSelection(UC1largeimage)}
                          />
                        </a>
                      </div>
                    </Col>

                    <Col
                      lg={3}
                      xs={3}
                      sm={3}
                      md={3}
                      className="shapes hoverClass"
                    >
                      <img
                        src={E1}
                        name="E1"
                        className={`UshapesRtoL ${
                          imageselection === "E1" ? "selected" : ""
                        }`}
                        onClick={(e) => handleImageSelection(e)}
                      />
                      <div class="overlay">
                        <a class="icon" title="Click here to view image">
                          <HiMiniViewfinderCircle
                            onClick={(e) => handlePouupSelection(UE1largeimage)}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      lg={3}
                      xs={3}
                      sm={3}
                      md={3}
                      className="shapes hoverClass"
                    >
                      <img
                        src={G1}
                        name="G1"
                        className={`UshapesRtoL last-img ${
                          imageselection === "G1" ? "selected" : ""
                        }`}
                        onClick={(e) => handleImageSelection(e)}
                      />
                      <div class="overlay">
                        <a class="icon" title="Click here to view image">
                          <HiMiniViewfinderCircle
                            onClick={(e) => handlePouupSelection(UG1largeimage)}
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : null}
            </div>
            {configuration === "U" ? (
              <div>
                {Orientation !== "" && checkConfig(configuration) ? (
                  <p className="hyperlinkaccess">
                    If any other configurations required, Kindly reach out to
                    Electrolux Professional Customer Service team for assistance
                    ,{" "}
                    <a
                      href="cseast2_inbox@electroluxprofessional.com"
                      onClick={handleEmail}
                    >
                      cseast2_inbox@electroluxprofessional.com
                    </a>
                  </p>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <Row>
                <Col lg={6} xs={6} sm={6} md={6}>
                  {Orientation !== "" && checkConfig(configuration) ? (
                    <p className="hyperlinkaccess">
                      If any other configurations required, Kindly reach out to
                      Electrolux Professional Customer Service team for
                      assistance
                      <a
                        href="cseast2_inbox@electroluxprofessional.com"
                        onClick={handleEmail}
                      >
                        cseast2_inbox@electroluxprofessional.com
                      </a>
                    </p>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            )}
          </Container>
        </div>
        <div className="dropdown">
          <Container fluid>
            <Row>
              <Col lg={12} xs={12} sm={12} md={12}>
                <UnitFeature
                  control={control}
                  FrontRim={FrontRim}
                  handleRimChange={handleRimChange}
                  errors={errors}
                  metaData={metaData}
                  BackSplash={BackSplash}
                  handleBacksplashChange={handleBacksplashChange}
                  splashRight={splashRight}
                  handleSplashrightChange={handleSplashrightChange}
                  splashleft={splashleft}
                  handleSplashleftChange={handleSplashleftChange}
                  widthValue={widthValue}
                  handleWidthChange={handleWidthChange}
                  length={length}
                  handleLengthChange={handleLengthChange}
                  ushapeunitlength={ushapeunitlength}
                  Rinsevalidation={Rinsevalidation}
                  deckValue={deckValue}
                  handleDepthChange={handleDepthChange}
                  textbox={textbox}
                  JointType={JointType}
                  handleJointtypeChange={handleJointtypeChange}
                  leftshape={leftshape}
                  leftwinglength={leftwinglength}
                  handleLeftWingLengthChange={handleLeftWingLengthChange}
                  rightshape={rightshape}
                  rightwinglength={rightwinglength}
                  handleRightWingLengthChange={handleRightWingLengthChange}
                  handleBacksplashheight={handleBacksplashheight}
                  backsplashHeight={backsplashHeight}
                />
                <PsControls
                  Orientation={Orientation}
                  imageselection={imageselection}
                  errors={errors}
                  control={control}
                  handlePsxChange={handlePsxChange}
                  metaData={metaData}
                  Psx={Psx}
                  handleMotorChange={handleMotorChange}
                  motorhpValue={motorhpValue}
                  voltageValue={voltageValue}
                  handleVoltageChange={handleVoltageChange}
                  handleGenChange={handleGenChange}
                  genValue={genValue}
                  handleHeaterChange={handleHeaterChange}
                  psheaterpower={psheaterpower}
                  handleCrossChange={handleCrossChange}
                  legValue={legValue}
                  handleFootChange={handleFootChange}
                  footValue={footValue}
                  cornerdblength={cornerdblength}
                  handlecornerdbChange={handlecornerdbChange}
                  leftcornerdblength={leftcornerdblength}
                  handleleftcornerdbChange={handleleftcornerdbChange}
                  handlerightcornerdbChange={handlerightcornerdbChange}
                  rightcornerdblength={rightcornerdblength}
                  soildblengthValue={soildblengthValue}
                  handleSoildblengthChange={handleSoildblengthChange}
                  onBlurone={onBlurone}
                  heaterValue={heaterValue}
                  configuration={configuration}
                  validate={validate}
                  cornerdbval={cornerdbval}
                  Rinsevalidation={Rinsevalidation}
                  register={register}
                  checkOrientation={checkOrientation}
                  OrientationValue={OrientationValue}
                  widthValue={widthValue}
                  psscrapperdisposerunit={psscrapperdisposerunit}
                />
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
                          imageselection={imageselection}
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
                          configuration={configuration}
                          setScrapChecked={setScrapChecked}
                          scrapchecked={scrapchecked}
                          errors={errors}
                          control={control}
                          register={register}
                          watch={watch}
                          checkConfig={checkConfig}
                          setSinkLength={setSinkLength}
                          setValue={setValue}
                          setPrerinsefaucet={setPrerinsefaucet}
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
                          setWashSinkLength={setWashSinkLength}
                          washSinkLength={washSinkLength}
                          errors={errors}
                          control={control}
                          register={register}
                          watch={watch}
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
                          setrinselength={setrinselength}
                          rinselength={rinselength}
                          checked={checked}
                          setChecked={setChecked}
                          errors={errors}
                          control={control}
                          register={register}
                          watch={watch}
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
                          setSanitizeLength={setSanitizeLength}
                          sanitizelength={sanitizelength}
                          sanitizechecked={sanitizechecked}
                          setSanitizechecked={setSanitizechecked}
                          errors={errors}
                          control={control}
                          register={register}
                          watch={watch}
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
                    <Controller
                      name="cleandrainboard"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <Form.Control
                          className="disablebtn"
                          id="cleandrainboard"
                          onChange={handleCleandrainboardChange}
                          value={cleanDrain}
                          type="text"
                          readOnly
                          {...register("cleandrainboard", {
                            required: "Clean Drain DB Required",
                            min: 0,
                          })}
                        />
                      )}
                      rules={{
                        min: "Clean Drain DB Required",
                      }}
                    />
                    {cleanDrain < 0 &&
                    (configuration === "L" ||
                      configuration === "U" ||
                      configuration === "Straight 2PC" ||
                      configuration === "Straight 1PC") ? (
                      <>
                        <p style={{ color: "red", fontSize: 11 }}>
                          {LandUshapeCleanDBErrorMessage()}
                        </p>
                      </>
                    ) : (
                      " "
                    )}
                    {errors.cleandrainboard && (
                      <p style={{ color: "red", fontSize: 10 }}>
                        {errors.cleandrainboard?.message
                          ? errors.cleandrainboard?.message
                          : LandUshapeCleanDBErrorMessage()}
                      </p>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mt-1">
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Label>Drying Rack:</Form.Label>
                  </Col>
                  <Col lg={5} xs={12} sm={12} md={6}>
                    {cleanDrain < 14 ? (
                      <Form.Select
                        aria-label="Default select example"
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
                    {configuration === "U" || configuration === "L" ? (
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {underShelfForU()?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : Orientation === "Right Rear" &&
                      cleanDrain < 12 &&
                      (collectorChecked === true ||
                        Number(soildblengthValue) +
                          Number(pssdsinklength) +
                          Number(psdisposersinklength) +
                          Number(coneSize) +
                          Number(collectorLength) +
                          Number(lengthbtw) <
                        12) ? (
                      <Form.Select
                        id="underself"
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
                      cleanDrain < 12 &&
                      (collectorChecked === true ||
                        Number(soildblengthValue) +
                          Number(pssdsinklength) +
                          Number(psdisposersinklength) +
                          Number(coneSize) +
                          Number(collectorLength) +
                          Number(lengthbtw) <
                          12) ? (
                      <Form.Select
                        id="underself"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {metaData?.NoUndershelf?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : Orientation === "Right Rear" &&
                      cleanDrain > 12 &&
                      (collectorChecked === true ||
                        Number(soildblengthValue) +
                          Number(pssdsinklength) +
                          Number(psdisposersinklength) +
                          Number(coneSize) +
                          Number(collectorLength) +
                          Number(lengthbtw) <
                          12) ? (
                      <Form.Select
                        id="underself"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {metaData?.UndershelfLeftSide?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : Orientation === "Left Rear" &&
                      cleanDrain > 12 &&
                      (collectorChecked === true ||
                        Number(soildblengthValue) +
                          Number(pssdsinklength) +
                          Number(psdisposersinklength) +
                          Number(coneSize) +
                          Number(collectorLength) +
                          Number(lengthbtw) <
                          12) ? (
                      <Form.Select
                        id="underself"
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
                      cleanDrain < 12 &&
                      (collectorChecked === false ||
                        Number(soildblengthValue) +
                          Number(pssdsinklength) +
                          Number(psdisposersinklength) +
                          Number(coneSize) +
                          Number(collectorLength) +
                          Number(lengthbtw) <
                          12) ? (
                      <Form.Select
                        id="underself"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {metaData?.UndershelfLeftSide?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : Orientation === "Left Rear" && cleanDrain < 12 ? (
                      <Form.Select
                        id="underself"
                        onChange={handleUndershelfChange}
                        value={undershelf}
                      >
                        {metaData?.UndershelfLeftSide?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    ) : Orientation === "Right Rear" && cleanDrain < 12 ? (
                      <Form.Select
                        id="underself"
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
                {checkConfig(configuration) ? (
                  <></>
                ) : (
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

                    <Col
                      id="overshelftooltip"
                      hidden={true}
                      style={{ flex: 0 }}
                    >
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
                )}
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
                              }}
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
                            }}
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
                      <p
                        style={{
                          color: "#004b8e",
                          fontSize: 12,
                          marginTop: "4px",
                        }}
                      >
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
                            disabled={
                              checkConfig(configuration) && sinkDepth > 18
                            }
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
                            onChange={handleSpecialcratingChange}
                          />
                          <Form.Check
                            type="checkbox"
                            label="PsVacBreaker"
                            name="group2"
                            id="PsVacBreaker"
                            className="radiodi"
                            // value={psVacBreaker}
                             disabled={((psscrapperdisposerunit == "DisposerSink"||psscrapperdisposerunit == "DisposerCone"||psscrapperdisposerunit == "CollectorMasterScrap")&&(prerinsefaucet==true))?false:true}
                             onChange={handlePsVacBreakerChange}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div
                  hidden={ process.env.REACT_APP_ISDESIGN_USER !="true" 
                    
                  }
                  className="mt-5"
                >
                  <Row>
                    <Col lg={6} xs={12} sm={12} md={6}>
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
                            onChange={handleDrawnBy}
                            value={drawnby}
                          />
                        </Col>
                      </Form.Group>
                    

                      <Form.Group as={Row} className="mt-2">
                        <Col lg={4} xs={12} sm={12} md={6}>
                          <Form.Label>
                            JSON#:<span className="pickbox-details">(BOM)</span>
                          </Form.Label>
                        </Col>
                        <Col lg={6} xs={12} sm={12} md={6}>
                          <Form.Control                          
                            onChange={handleJSON}                          
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
          {process.env.REACT_APP_ISDESIGN_USER =="true"  &&
            Object.keys(enteredJSON).length == 0 && (
              <button
                type="submit"
                onMouseOver={testmouse}            
                className=" btn Assembly1"
                onClick={ErrorvalidtionMessage}
                disabled={
                  cleanDrain < 0 ||
                  (checked && !Rinsevalidation) ||
                  OverSelfValidation > length                 
                }
              >
                Create Drawing
              </button>
            )}
          {process.env.REACT_APP_ISDESIGN_USER =="true"  &&
            Object.keys(enteredJSON).length > 0 && (
              <button
                type="submit"
                onMouseOver={testmouse}
                //onClick={generateModel}
                className=" btn Assembly1"
                onClick={ErrorvalidtionMessage}
              >
                Update Drawing
              </button>
            )}

          {process.env.REACT_APP_ISDESIGN_USER =="false"  && (
            <button
              onMouseOver={testmouse}
              className=" btn Assembly2"
              disabled={cleanDrain < 0}
              onClick={ErrorvalidtionMessage}
            >
              Create Drawing & Email
            </button>
          )}
        </div>
     
      </form>
      </Container>
      </div>
    </>
  );
}

export default Automation;
