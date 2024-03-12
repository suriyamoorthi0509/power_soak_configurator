import React, { useEffect, useState } from "react";
import { Col, Form, Row, Container, Navbar } from "react-bootstrap";
import "../CSS/Automation.css";
import DisposerMakeCombo from "../json/DisposerMakeCombo.json";
import DisposerConeCombo from "../json/DisposerConeCombo.json";
import CollectorMasterCombo from "../json/CollectorMasterCombo.json";
import { selectedSinkConfig, calculateDrain } from "../Constants/global.js";
import { set, useForm, Controller } from "react-hook-form";

function Main(props) {
  const { handleSubmit } = useForm();
  const { selectedObject } = props;
  const { setCollectorChecked } = props;
  const { setPsdisposersinklengthValue } = props;
  const { model } = props;
  const { setmodel } = props;
  const { handlemodelchange } = props;
  const { psdisposersinklength } = props;
  const { coneSize } = props;
  const { setConeSize } = props;
  const { setDrainblengthsdwValue } = props;
  const { unitWidth } = props;
  const { soileddb } = props;
  const { lengthbtw } = props;
  const { setPssdsinklengthValue } = props;
  const { pssdsinklength } = props;
  const { setCleanDrain } = props;
  const { collectorLength } = props;
  const { setCollectorLength } = props;
  const { metaData } = props;
  const { selectedSinkConfig } = props;
  const { Orientation } = props;
  const { selectdata } = props;
  const { userlength } = props;
  const { setuserLength } = props;
  const { Rinsevalidation } = props;
  const { setPsscrapperdisposerunit } = props;
  const { psscrapperdisposerunit } = props;
  const { scrapchecked } = props;
  const { setScrapChecked } = props;
  const { configuration } = props;
  const { errors } = props;
  const { control } = props;
  const { register } = props;
  const{prerinsefaucet}=props
  const{setPrerinsefaucet}=props
 
  const [scrapunit, setScrapunit] = useState("");
  const [faucet, setFaucet] = useState("T&S");
  const [depth, setDepth] = useState("5.375");
  const [scrapdepth, setscrapdepth] = useState("4");
  const [waterinlet, setwaterinlet] = useState("");
  const [disposermake, setdisposermake] = useState("");
  const [make, setMake] = useState("");
  const [disposercollar, setdisposercollar] = useState("");
  const [Disposerlength, setDisposerLength] = useState("");
  const [val, setVal] = useState("");
  const [pscollectormakes, setPscollectormake] = useState("");
  const [diskoption, setDiskoption] = useState("");
  // const [psscrapperdisposerunit, setPsscrapperdisposerunit] = useState('ScrapSink');
  const [type, setType] = useState("");
  const [type2, setType2] = useState("");

  const result = (str) => /^[0-9]*$/.test(str);

  const [filtereDisposerMake, setFiltereDisposerMake] = useState(DisposerMakeCombo.INSINKERATOR);

  const [filtereDisposerCone, setFiltereDisposerCone] = useState(DisposerConeCombo.SALVAJOR);

  const [filterCollectorMaster, setFilterCollectorMaster] = useState(CollectorMasterCombo.SALVAJOR);
  const [scarptype, setscraptype] = useState();
  const [selectedSinkConfig1, setSelectedSinkConfig1] = useState({
    scrap: { psprerinsetype: "" }
  });


  useEffect(() => {
    if(unitWidth)
      widthupdate(unitWidth);
    if(props.imageselection)
      if(psscrapperdisposerunit !== "ScrapSink"){
        (psscrapperdisposerunit == "DisposerSink"||psscrapperdisposerunit == "DisposerCone") ? setDrainblengthsdwValue(!validateImageSelection(props.imageselection) ? 0 : 12) : setDrainblengthsdwValue(!validateImageSelection(props.imageselection) ? 0 : 13.5);
        selectedSinkConfig.scrap.psdbbtwscrapandwash = ((psscrapperdisposerunit == "DisposerSink"||psscrapperdisposerunit == "DisposerCone") ? (!validateImageSelection(props.imageselection) ? 0 : 12) : (!validateImageSelection(props.imageselection) ? 0 : 13.5));
      }
  }, [unitWidth, props.imageselection, psscrapperdisposerunit]);

  const customValueChangeDisposer = (e) => {
    setuserLength(e.target.value);
    const { value } = e.target;
    setPsdisposersinklengthValue(parseFloat(e.target.value));
    props.setSinkLength(parseFloat(e.target.value));
    selectedSinkConfig.scrap.psdisposersinklength = parseFloat(e.target.value);
    const cleandbValue = calculateDrain(
      selectedSinkConfig.psunitlength,
      selectedSinkConfig.top.psendsplashleft,
      selectedSinkConfig.top.psendsplashright,
      selectedSinkConfig.scrap.pssoildblength,
      0,
      selectedSinkConfig.scrap.psdbbtwscrapandwash,
      parseFloat(e.target.value),
      0,
      0,
      selectedSinkConfig.wash.pswashsinklength,
      selectedSinkConfig.rinse.psrinsesinklength,
      selectedSinkConfig.sanitize.pssanitizesinklength
    );
    setCleanDrain(cleandbValue);

    if (e.target.value == "24") {
      setScrapunit("Center(2in)");
      selectedSinkConfig.scrap.psscrapperdraintype = "Center(2in)";
    }
    if (process.env.REACT_APP_ISDESIGN_USER =="false" ) {
      setDepth(5.375);
      selectedSinkConfig.scrap.psdisposersinkdepth = 5.375;
    }

    if (result(value)) {
      setVal(value);
    }
  };

  const validateWaterInlet = (configuration) => {
    if (process.env.REACT_APP_ISDESIGN_USER =="true" )
      return {...register("waterinlet", {
        required: "Please select Water Inlet",
      })}
    return false;
  };

  function generateModel(
    lengthValue,
    widthValue,
    depthValue,
    waterValue,
    drainValue,
    disposerValue,
    draintypeValue,
    companyValue,
    prerinsefaucetValue,
    typeValue
  ) {
    const selectdata = {
      length: lengthValue,
      width: widthValue,
      depth: depthValue,
      water: waterValue,
      drain: drainValue,
      disposer: disposerValue,
      draintype: draintypeValue,
      company: companyValue,
      prerinsefaucet: prerinsefaucetValue,
      type: typeValue,
    };

    var validated = false;
  }

  useEffect(()=>{
    if(psscrapperdisposerunit == "none"){
      setPrerinsefaucet(false);
    }

  },[psscrapperdisposerunit == "none"])
 
  // autopopulated data
  function autopopulatescrap() {
    //scrap
    if (selectedObject?.scrap.psscrapperdisposerunit == "ScrapSink") {
      handleScrapSinkSelection();
    } else if (selectedObject?.scrap.psscrapperdisposerunit == "DisposerSink") {
      handleDisposerSinkSelection();
    } else if (selectedObject?.scrap.psscrapperdisposerunit == "DisposerCone") {
      handleDisposerConeSelection();
    } else if (
      selectedObject?.scrap.psscrapperdisposerunit == "CollectorMasterScrap"
    ) {
      handleCollectorMasterScrapSelection();
    }
    else if( selectedObject?.scrap.psscrapperdisposerunit == "none"){
      handleNoneScrapSelection();
    }
    selectedObject?.scrap?.pssdsinklength && handleLengthChange({
      target: { value: selectedObject?.scrap?.pssdsinklength },
    });
    setscrapdepth(selectedObject?.scrap?.pssdsinkdepth);
    selectedObject?.scrap?.psscrapperdraintype && handleDrainChange({
      target: { value: selectedObject?.scrap?.psscrapperdraintype },
    });

    //pre rinse
    setFaucet(selectedObject?.scrap?.psprerinsecompany);
    setscraptype(selectedObject?.scrap?.psprerinsetype);


    // if(document.getElementById("prerinsefaucet").checked == true){
    //   selectedSinkConfig.scrap.psprerinsetype="PRE-RINSE 1/2in SPRAY VALVE"
    //   console.log( selectedSinkConfig.scrap.psprerinsetype,"......>>")
    //   document.getElementById("PreRinseFaucetSection").hidden = false;
    //   setPrerinsefaucet(true);
    // }
    // else if(document.getElementById("prerinsefaucet").checked == false){
    //   selectedSinkConfig.scrap.psprerinsetype="NONE";
    //   console.log( selectedSinkConfig.scrap.psprerinsetype,"......>>123")
    //   document.getElementById("PreRinseFaucetSection").hidden = true;     
    //   setPrerinsefaucet(false);
    // }

    if (selectedObject?.scrap?.psprerinsetype == "NONE") {
      document.getElementById("prerinsefaucet").checked = false;
      document.getElementById("PreRinseFaucetSection").hidden = true;
      setPrerinsefaucet(false);
    } else {
      document.getElementById("prerinsefaucet").checked = true;
      document.getElementById("PreRinseFaucetSection").hidden = false;
      setPrerinsefaucet(true);
    }

    //disposer
    selectedObject?.scrap?.psdisposersinklength && handleDisposerLengthChange({
      target: { value: selectedObject?.scrap?.psdisposersinklength },
    });
    // type2 = selectedObject?.scrap.psdisposersinkwidth;
    setDepth(selectedObject?.scrap?.psdisposersinkdepth);
    // setwaterinlet( selectedObject?.scrap.pssdsinkwaterinlet)
    selectedObject?.scrap?.pssdsinkwaterinlet && handleWaterChange({
      target: { value: selectedObject?.scrap?.pssdsinkwaterinlet },
    });
    // handleDisposerMakeChange({ target: { value: selectedObject?.scrap.psdisposermake } })
    setdisposermake(selectedObject?.scrap?.psdisposermake);
    if (selectedObject?.scrap.psdisposermake === "SALVAJOR") {
      setFiltereDisposerMake(DisposerMakeCombo.SALVAJOR);
    } else if (selectedObject?.scrap.psdisposermake === "INSINKERATOR") {
      setFiltereDisposerMake(DisposerMakeCombo.INSINKERATOR);
    } else if (selectedObject?.scrap.psdisposermake === "HOBART") {
      setFiltereDisposerMake(DisposerMakeCombo.HOBART);
    }
    else if (selectedObject?.scrap.psdisposermake === "Salvajor") {
      setFiltereDisposerMake(DisposerMakeCombo.Salvajor);
    }
    selectedObject?.scrap?.psconemake && handleDisposerConeChange({
      target: { value: selectedObject?.scrap?.psconemake },
    });
    selectedObject?.scrap?.psconesize && handleDisposerConeSizeChange({
      target: { value: selectedObject?.scrap?.psconesize },
    });
    selectedObject?.scrap.psdisposersize && handleDisposerCollarSizeChange({
      target: { value: selectedObject?.scrap.psdisposersize },
    });
    selectedObject?.scrap?.psdbbtwscrapandwash?.toString() && handleDrainblengthsdwChange({
      target: { value: selectedObject?.scrap?.psdbbtwscrapandwash?.toString() },
    });
    selectedObject?.scrap?.psscrapperdisposerunit == "CollectorMasterScrap" && handleModelChangeFn({
      target: { value: selectedObject?.scrap?.pscollectorpartnumber},
    });
    selectedObject?.scrap.pscollectormake && handleDisposerCollarMakeChange({
      target: { value: selectedObject?.scrap.pscollectormake },
    });
    setmodel(selectedObject?.scrap.pscollectorpartnumber);

    widthupdate(
      selectedObject?.scrap.pssdsinkwidth,
      selectedObject?.scrap.psdisposersinkwidth,
      true
    );
    selectedSinkConfig.scrap.psdbbtwscrapandwash = parseFloat(
      selectedObject?.scrap?.psdbbtwscrapandwash
    );
    selectedSinkConfig.rinse.psrinsesinkdepth = parseFloat(
      selectedObject?.rinse.psrinsesinkdepth
    );
    selectedSinkConfig.sanitize.pssanitizesinkdepth = parseFloat(
      selectedObject?.sanitize.pssanitizesinkdepth
    );
    selectedObject?.scrap.psprerinsecompany && handleCompanyChange({
      target: { value: selectedObject?.scrap.psprerinsecompany },
    });
    selectedObject?.scrap.psprerinsetype && handleTypeChange({
      target: { value: selectedObject?.scrap.psprerinsetype },
    });
    selectedObject?.scrap?.psdisposersinklength && customValueChangeDisposer({
      target: { value: selectedObject?.scrap?.psdisposersinklength },
    });

    if (selectedObject?.scrap?.psdisposersinklength > 0) {
      setScrapChecked(
        !metaData?.DisposerSinkLength?.some(
          (o) => Number(o.value) == selectedObject?.scrap?.psdisposersinklength
        )
      );
      
    } else {
      setScrapChecked(false);
    }
  }

  useEffect(() => {
    if (selectedObject) {
      autopopulatescrap();
    }
    if(!Orientation){
      // setLengthValue(e.target.value);
      setPssdsinklengthValue("");
      
      // for calculation purpose
      props.setSinkLength("");
      // for calculation purpose

      setScrapunit("");
      props.setValue("scrapdraintype", "");
    }
  }, [selectedObject, Orientation]);

  const handleClick = (e) => {
    if (e.target.checked) {
      setScrapChecked(true);
    } else if (!e.target.checked) {
      setVal("");
      setuserLength("");
      selectedSinkConfig.scrap.psdisposersinklength = "";
      setScrapChecked(false);
    }
  };

  const widthupdate = (unitWidth, psdisposersinkwidth, auto = false) => {
    let type = null;
    let type2 = null;
    if (auto) {
      selectedSinkConfig.scrap.pssdsinkwidth = unitWidth;
      selectedSinkConfig.scrap.psdisposersinkwidth = psdisposersinkwidth;
      type = unitWidth ? (unitWidth).toString() : "";
      type2 = psdisposersinkwidth ? (psdisposersinkwidth).toString() : "";
    }

    if (unitWidth === "30") {
      type = '18.75"';
      selectedSinkConfig.scrap.pssdsinkwidth = 18.75;
      type2 = '24.75"';
      selectedSinkConfig.scrap.psdisposersinkwidth = 24.75;
    } else if (unitWidth === "34") {
      type = '22.75"';
      selectedSinkConfig.scrap.pssdsinkwidth = 22.75;
      type2 = '28.75"';
      selectedSinkConfig.scrap.psdisposersinkwidth = 28.75;
    } else if (unitWidth === "37") {
      type = '24.75"';
      selectedSinkConfig.scrap.pssdsinkwidth = 24.75;
      type2 = '31.75"';
      selectedSinkConfig.scrap.psdisposersinkwidth = 31.75;
    }
    setType(type);
    setType2(type2);
  };

  function resetScrapSink() {
    selectedSinkConfig.scrap.pssdsinklength = 0;
    // selectedSinkConfig.scrap.pssdsinkwidth = 0;
    selectedSinkConfig.scrap.pssdsinkdepth = 4;
    selectedSinkConfig.scrap.pssdsinkwaterinlet = "NONE";
    selectedSinkConfig.scrap.psscrapperdraintype = "NONE";
    setPssdsinklengthValue(0);
    // for calculation purpose
    props.setSinkLength(0);
    // for calculation purpose
  }

  function resetDisposersink() {
    setPsdisposersinklengthValue(0);
    setDepth(0);
    setVal("");
    setuserLength("");
    setScrapChecked(false);
    setdisposermake("");
    setdisposercollar("");
    selectedSinkConfig.scrap.psdisposersinklength = 0;
    // selectedSinkConfig.scrap.psdisposersinkwidth = 0;
    selectedSinkConfig.scrap.psdisposersinkdepth = 5.375;
    selectedSinkConfig.scrap.psdisposermake = "NONE";
    selectedSinkConfig.scrap.psdisposersize = "NONE";
  }

  function resetDisposerCone() {
    selectedSinkConfig.scrap.psconemake = "NONE";
    selectedSinkConfig.scrap.psconesize = 0;
    setConeSize(0);
  }

  function resetCollectorMaster() {
    selectedSinkConfig.scrap.pscollectorpartnumber = "NONE";
    selectedSinkConfig.scrap.pscollectormake = "NONE";
    setCollectorLength(0);
  }

  const handleDrainblengthsdwChange = (e) => {
    const regex = /^\d*\.?\d*$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setDrainblengthsdwValue(e.target.value);
      if (e.target.value != null && e.target.value.length > 0) {
        selectedSinkConfig.scrap.psdbbtwscrapandwash = parseFloat(e.target.value);
      }
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
        selectedSinkConfig.sanitize.pssanitizesinklength
      );
      setCleanDrain(cleandbValue);
    }
  };

  const onBlurone = (e) => {
    if (
      selectedSinkConfig.pssoildblength > 0 &&
      selectedSinkConfig.pssoildblength <= 12
    ) {
    }
  };

  const handleLengthChange = (e) => {
    if (e.target.value === "") {
      setScrapunit("");
      props.setValue("scrapdraintype", "");
    } else if (e.target.value == 12 && Orientation == "Right Rear") {
      setScrapunit("Right Rear");
      selectedSinkConfig.scrap.psscrapperdraintype = "Right Rear";
      props.setValue("scrapdraintype", "Right Rear");
    } else if (e.target.value == 12 && Orientation == "Left Rear") {
      setScrapunit("Left Rear");
      selectedSinkConfig.scrap.psscrapperdraintype = "Left Rear";
      props.setValue("scrapdraintype", "Left Rear");
    } else {
      setScrapunit("Center(2in)");
      selectedSinkConfig.scrap.psscrapperdraintype = "Center(2in)";
      props.setValue("scrapdraintype", "Center(2in)");
    }

    if (process.env.REACT_APP_ISDESIGN_USER =="false" ) {
      selectedSinkConfig.scrap.pssdsinkdepth = 4;
    }

    // setLengthValue(e.target.value);
    setPssdsinklengthValue(e.target.value);
    
    // for calculation purpose
    props.setSinkLength(parseFloat(e.target.value));
    // for calculation purpose
    selectedSinkConfig.scrap.pssdsinklength = parseFloat(e.target.value);
    const cleandbValue = calculateDrain(
      selectedSinkConfig.psunitlength,
      selectedSinkConfig.top.psendsplashleft,
      selectedSinkConfig.top.psendsplashright,
      selectedSinkConfig.scrap.pssoildblength,
      parseFloat(e.target.value),
      0,
      0,
      0,
      0,
      selectedSinkConfig.wash.pswashsinklength,
      selectedSinkConfig.rinse.psrinsesinklength,
      selectedSinkConfig.sanitize.pssanitizesinklength
    );
    setCleanDrain(cleandbValue);

    if (e.target.value == "24") {
      setScrapunit("Center(2in)");
      selectedSinkConfig.scrap.psscrapperdraintype = "Center(2in)";
    }
  };

  const handleDisposerLengthChange = (e) => {
    setPsdisposersinklengthValue(parseFloat(e.target.value));
    // for calculation purpose
  
    props.setSinkLength(parseFloat(e.target.value,e.target.name));
    // for calculation purpose
    selectedSinkConfig.scrap.psdisposersinklength = parseFloat(e.target.value);
    const cleandbValue = calculateDrain(
      selectedSinkConfig.psunitlength,
      selectedSinkConfig.top.psendsplashleft,
      selectedSinkConfig.top.psendsplashright,
      selectedSinkConfig.scrap.pssoildblength,
      0,
      selectedSinkConfig.scrap.psdbbtwscrapandwash,
      parseFloat(e.target.value),
      0,
      0,
      selectedSinkConfig.wash.pswashsinklength,
      selectedSinkConfig.rinse.psrinsesinklength,
      selectedSinkConfig.sanitize.pssanitizesinklength
    );
    setCleanDrain(cleandbValue);

    if (e.target.value == "24") {
      setScrapunit("Center(2in)");
      selectedSinkConfig.scrap.psscrapperdraintype = "Center(2in)";
    }
    if (process.env.REACT_APP_ISDESIGN_USER =="false" ) {
      setDepth(5.375);
      selectedSinkConfig.scrap.psdisposersinkdepth = 5.375;
    }
  };

  const handleDepthChange = (e) => {
    setDepth(e.target.value);

    selectedSinkConfig.scrap.psdisposersinkdepth = parseFloat(e.target.value);
    if (process.env.REACT_APP_ISDESIGN_USER =="false" ) {
      setDepth(4);
      selectedSinkConfig.scrap.psdisposersinkdepth = 4;
    }
  };

  const handleScrapSinkDepthChange = (e) => {
    setscrapdepth(e.target.value);

    selectedSinkConfig.scrap.pssdsinkdepth = parseFloat(e.target.value);
  };

  const handleWidthChange = (e) => {
    //setWidthValue(e.target.value);
    selectedSinkConfig.scrap.pssdsinkwidth = parseFloat(e.target.value);
  };

  const handledisposerWidthChange = (e) => {
    //setWidthValue(e.target.value);
    selectedSinkConfig.scrap.psdisposersinkwidth = parseFloat(e.target.value);
  };

  const handleWaterChange = (e) => {
    setwaterinlet(e.target.value);
    selectedSinkConfig.scrap.pssdsinkwaterinlet = e.target.value;
  };

  const handleDrainChange = (e) => {
    setScrapunit(e.target.value);
    selectedSinkConfig.scrap.psscrapperdraintype = e.target.value;
  };

  const handleDisposerChange = (e) => {
    // setDisposerValue(e.target.value);
    selectedSinkConfig.scrap.psdisposerpstype = e.target.value;
  };

  const handleDrainTypeChange = (e) => {
    // setDrainTypeValue(e.target.value);
    selectedSinkConfig.scrap.psdisposerexttype = e.target.value;
  };

  const handleCompanyChange = (e) => {
    setFaucet(e.target.value);

    //selectedSinkConfig.psprerinsecompany = e.target.value;
    //  setCompanyValue(e.target.value);

    selectedSinkConfig.scrap.psprerinsecompany = e.target.value;
  };

  const handleTypeChange = (e) => {
    // setTypeValue(e.target.value);
    selectedSinkConfig.scrap.psprerinsetype = e.target.value;
    setscraptype(e.target.value);
  };

  const handleScrapSinkSelection = (e) => {
    setPsscrapperdisposerunit("ScrapSink");
    resetDisposersink();
    resetDisposerCone();
    resetCollectorMaster();
    setCollectorChecked(false);
    selectedSinkConfig.scrap.psdbbtwscrapandwash = 0;
    setDrainblengthsdwValue(0);

    // document.getElementById("drainboardlength").value = 0;

    selectedSinkConfig.scrap.psdbbtwscrapandwash = 0;

    selectedSinkConfig.scrap.psscrapperdisposerunit = "ScrapperUnit";
    widthupdate(
      selectedObject?.scrap?.pssdsinkwidth,
      selectedObject?.scrap?.psdisposersinkwidth,
      true
    );
  };
  
  const validateImageSelection = (image) => {
    if(configuration == "U"){
      if(image == "E1" || image == "F1"){
        return true;
      } else return false;
    } else return true;
  }

  const handleDisposerSinkSelection = (e) => {
    setPsscrapperdisposerunit("DisposerSink");
    selectedSinkConfig.scrap.psdbbtwscrapandwash = !validateImageSelection(props.imageselection) ? 0 : 12;
    selectedSinkConfig.scrap.psscrapperdisposerunit = "DisposerSink";
    //    else if (e.target.value == "DisposerSink") {
    resetScrapSink();
    resetDisposerCone();
    resetCollectorMaster();
    setCollectorChecked(false);
    setDrainblengthsdwValue(!validateImageSelection(props.imageselection) ? 0 : 12);
    widthupdate(
      selectedObject?.scrap?.pssdsinkwidth,
      selectedObject?.scrap?.psdisposersinkwidth,
      true
    );
    //document.getElementById("drainboardlength").value = 12;
  };

  const handleDisposerConeSelection = (e) => {
    setPsscrapperdisposerunit("DisposerCone");
    resetScrapSink();
    resetDisposersink();
    resetCollectorMaster();
    setCollectorChecked(false);
    setDrainblengthsdwValue(12);

    //document.getElementById("drainboardlength").value = 13.5; //Final to 14 on 21 11
    selectedSinkConfig.scrap.psscrapperdisposerunit = "DisposerCone";
    selectedSinkConfig.scrap.psdbbtwscrapandwash = 12;
  };

  const handleCollectorMasterScrapSelection = (e) => {
    setPsscrapperdisposerunit("CollectorMasterScrap");
    resetScrapSink();
    resetDisposersink();
    resetDisposerCone();
    setCollectorChecked(true);
    setDrainblengthsdwValue(13.5);

    //document.getElementById("drainboardlength").value = 13.5;
    selectedSinkConfig.scrap.psscrapperdisposerunit = "CollectorMasterScrap";
    selectedSinkConfig.scrap.psdbbtwscrapandwash = 13.5;
  };

  const handleNoneScrapSelection=()=>{
    setPsscrapperdisposerunit("none");
    resetScrapSink();
    resetDisposersink();
    resetDisposerCone();
    setCollectorChecked(true);
    selectedSinkConfig.scrap.psscrapperdisposerunit = "none";
  }
  const handleDisposerMakeChange = (e) => {
    setdisposermake(e.target.value);
    selectedSinkConfig.scrap.psdisposermake = e.target.value;
    if (e.target.value === "SALVAJOR") {
      setFiltereDisposerMake(DisposerMakeCombo.SALVAJOR);
    } else if (e.target.value === "INSINKERATOR(ISE)") {
      setFiltereDisposerMake(DisposerMakeCombo.INSINKERATOR);
    } else if (e.target.value === "HOBART") {
      setFiltereDisposerMake(DisposerMakeCombo.HOBART);
    }
    else if (e.target.value === "Salvajor") {
      setFiltereDisposerMake(DisposerMakeCombo.Salvajor);
    }
  };

  const handleDisposerConeChange = (e) => {
    selectedSinkConfig.scrap.psconemake = e.target.value;
    setMake(e.target.value);
    if (e.target.value === "INSINKERATOR") {
      setFiltereDisposerCone(DisposerConeCombo.INSINKERATOR);
    }
    else if (e.target.value === "SALVAJOR") {
      setFiltereDisposerCone(DisposerConeCombo.SALVAJOR);
    } else if (e.target.value === "HOBART") {
      setFiltereDisposerCone(DisposerConeCombo.HOBART);
    } 
    // else if (e.target.value === "INSINKERATOR") {
    //   setFiltereDisposerCone(DisposerConeCombo.INSINKERATOR);
    // }
     else if (e.target.value === " REDGOAT") {
      setFiltereDisposerCone(DisposerConeCombo.REDGOAT);
    } else if (e.target.value === "SOMAT") {
      setFiltereDisposerCone(DisposerConeCombo.SOMAT);
    } else if (e.target.value === " WASTEKING") {
      setFiltereDisposerCone(DisposerConeCombo.WASTEKING);
    } else if (e.target.value === "MASTER") {
      setFiltereDisposerCone(DisposerConeCombo.MASTER);
    }
   else if (e.target.value === "Salvajor") {
     setFiltereDisposerCone(DisposerConeCombo.Salvajor);
  }
  };
  

  const handleDisposerConeSizeChange = (e) => {
    setConeSize(e.target.value);
    // for calculation purpose
    props.setSinkLength(parseFloat(e.target.value));
    // for calculation purpose
    selectedSinkConfig.scrap.psconesize = parseFloat(e.target.value);
    const cleandbValue = calculateDrain(
      selectedSinkConfig.psunitlength,
      selectedSinkConfig.top.psendsplashleft,
      selectedSinkConfig.top.psendsplashright,
      selectedSinkConfig.scrap.pssoildblength,
      0,
      selectedSinkConfig.scrap.psdbbtwscrapandwash,
      0,
      parseFloat(e.target.value),
      0,
      selectedSinkConfig.wash.pswashsinklength,
      selectedSinkConfig.rinse.psrinsesinklength,
      selectedSinkConfig.sanitize.pssanitizesinklength
    );
    setCleanDrain(cleandbValue);
  };

  const handleDisposerCollarMakeChange = (e) => {
    setPscollectormake(e.target.value);
    selectedSinkConfig.scrap.pscollectormake = e.target.value;
    if(e.target.value == "Salvajor"){
      setFilterCollectorMaster(CollectorMasterCombo.Salvajor);
    }
    else if (e.target.value =="SALVAJOR") {
      setFilterCollectorMaster(CollectorMasterCombo.SALVAJOR);
    } 
   
    // else {
    //   setFilterCollectorMaster([]);
    // }
  };

  const handleDisposerCollarSizeChange = (e) => {
    selectedSinkConfig.scrap.psdisposersize = e.target.value;
    setdisposercollar(e.target.value);
  };
  

    const handlePrerinsefaucetChange = (e) => {
    setPrerinsefaucet(e.target.checked);
 
    if (e.target.checked) {
      document.getElementById("PreRinseFaucetSection").hidden = false;
      selectedSinkConfig.scrap.psprerinsetype="PRE-RINSE 1/2in SPRAY VALVE";
      setPrerinsefaucet(true);
      console.log( selectedSinkConfig.scrap.psprerinsetype,".......>>")
    } else {
      document.getElementById("PreRinseFaucetSection").hidden = true;
      selectedSinkConfig.scrap.psprerinsetype = "NONE";
      setPrerinsefaucet(false);
      console.log( selectedSinkConfig.scrap.psprerinsetype,".......>>1213")
    }
  };

  const modelDict = (value) => {
    const dict = {P914: 35.75, S914: 24.125, PSM: 45.5, SM: 36.5}
    return dict[value];
  }
  const handleModelChangeFn = (e) => {
    handlemodelchange(e);
    // for calculation purpose
    props.setSinkLength(modelDict(e.target.value));
    // for calculation purpose
  }
  return (
    <>
      <form name="scrapDSink">
        <div className="Tappart">
          <div className="subpart">
            <div className="section1">
              <Container fluid>
                <Row>
                  <Col lg={2} xs={12} sm={12} md={6} >
                    <Form.Check
                      className="formradio"
                      label="Scrap Sink"
                      type="radio"
                      name="group2"
                      id="ScrapSink"
                      value="ScrapSink"
                      checked={psscrapperdisposerunit == "ScrapSink"}
                      onChange={handleScrapSinkSelection}
                    />
                  </Col>
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Check
                      type="radio"
                      name="group2"
                      id="DisposerSink"
                      label="Disposer Sink"
                      value="DisposerSink"
                      checked={psscrapperdisposerunit == "DisposerSink"}
                      onChange={handleDisposerSinkSelection}
                    />
                  </Col>
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Check
                      type="radio"
                      name="group2"
                      id="DisposerCone"
                      label="Disposer Cone​​​"
                      value="DisposerCone"
                      checked={psscrapperdisposerunit == "DisposerCone"}
                      onChange={handleDisposerConeSelection}
                      disabled={(soileddb == 0 || soileddb == "NONE") && !props.checkConfig(configuration)}
                    />
                  </Col>
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Check
                      type="radio"
                      name="group2"
                      id="CollectorMasterScrap"
                      label="Collector/MasterScrap​"
                      value="CollectorMasterScrap"
                      checked={psscrapperdisposerunit == "CollectorMasterScrap"}
                      onChange={handleCollectorMasterScrapSelection}
                      disabled={(soileddb == 0 || soileddb == "NONE") && !props.checkConfig(configuration)}
                    />
                  </Col>
                  { (configuration === "Straight 2PC" ||
                      configuration === "Straight 1PC")?
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Check
                      type="radio"
                      name="group2"
                      id="none"
                      label="None​"
                       value="none"
                      checked={psscrapperdisposerunit == "none"}
                      onChange={handleNoneScrapSelection}
                    />
                  </Col>:""}

                </Row>
              </Container>
            </div>
            {psscrapperdisposerunit == "ScrapSink" ? (
              <>
                <div className="section1" id="ScrapSinkSection">
                  {/* <div className="section1" id="ScrapSinkSection"> */}
                  <Form.Group as={Row}>
                    <Col lg={2} xs={12} sm={12} md={6}>
                      <Form.Label className="labelbox">Length:</Form.Label>
                    </Col>
                    <Col lg={5} xs={12} sm={12} md={6}>
                      <Controller
                        name="scrapsinklengths"
                        control={control}
                        render={({ field }) => (
                          <Form.Select
                            {...register("scrapsinklengths", {
                              required: "Please select Length",
                            })}
                            id="ScrapSinkLength"
                            name="scrapsinklengths"
                            aria-label="Default select example"
                            onChange={(e) => {
                              handleLengthChange(e);
                              field.onChange(e);
                            }}
                            disabled={!Orientation}
                            value={pssdsinklength}
                            className={
                              errors.scrapsinklengths
                                ? "form-select-error"
                                : "form-select"
                            }
                          >
                            <option value="">Select</option>
                            {process.env.REACT_APP_ISDESIGN_USER =="true" 
                              ? metaData?.ScrapSinkLength?.map(
                                  (element, index) => (
                                    <option key={index} value={element.value}>
                                      {element.desc}
                                    </option>
                                  )
                                )
                              : metaData?.ScrapSinkLengthcustomer?.map(
                                  (element, index) => (
                                    <option key={index} value={element.value}>
                                      {element.desc}
                                    </option>
                                  )
                                )}
                          </Form.Select>
                        )}
                      />
                      {
                        <p style={{ color: "red", fontSize: 11 }}>
                          {errors.scrapsinklengths?.message}
                        </p>
                      }
                    </Col>
                  </Form.Group>
                  <Form.Group
                    hidden={process.env.REACT_APP_ISDESIGN_USER =="false" }
                    as={Row}
                  >
                    <Col lg={2} xs={12} sm={12} md={6}>
                      <Form.Label className="labelbox">
                        Front to Back:
                      </Form.Label>
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
                        id="scrapdepth"
                        name="scrapdepths"
                        aria-label="Default select example"
                        onChange={handleScrapSinkDepthChange}
                        value={scrapdepth}
                      >
                        {metaData?.ScrapSinkDepth?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>

                  <Form.Group
                    hidden={process.env.REACT_APP_ISDESIGN_USER =="false" }
                    as={Row}
                  >
                    <Col lg={2} xs={12} sm={12} md={6}>
                      <Form.Label id="scrapperdraintype" className="labelbox">
                        Scrapper Drain type:
                      </Form.Label>
                    </Col>
                    <Col lg={5} xs={12} sm={12} md={6}>

                      <Controller
                            name="scrapdraintype"
                            control={control}
                            render={({ field }) => (
                              <Form.Select
                                // {...register("scrapdraintype", {
                                //   required: "Please select Scrapper Drain type",
                                // })}
                                aria-label="Default select example"
                                name="scrapdraintype"
                                onChange={(e) => {
                                  handleDrainChange(e);
                                  field.onChange(e);
                                }}
                                disabled={true}
                                value={scrapunit}
                                // className={
                                //   errors.scrapdraintype
                                //     ? "form-select-error"
                                //     : "form-select"
                                // }
                              >
                                <option value="">Select</option>
                                {metaData?.ScrapSPanRack42inkDrain?.map(
                                  (element, index) => (
                                    <option key={index} value={element.value}>
                                      {element.desc}
                                    </option>
                                  )
                                )}
                              </Form.Select>
                            )}
                      />
                      {/* <p style={{ color: "red", fontSize: 11 }}>
                          {errors.scrapdraintype?.message}
                        </p> */}
                    </Col>
                  </Form.Group>
                </div>
              </>
            ) : (
              <></>
            )}
            {psscrapperdisposerunit == "DisposerSink" ? (
              <>
                <div className="section1">
                  {/* <div className="section1" hidden={true} id="DisposerSinkSection"> */}
                  <Form.Group as={Row}>
                    <Col lg={2} xs={12} sm={12} md={6}>
                      <Form.Label className="labelbox">Length:</Form.Label>
                    </Col>
                    <Col lg={5} xs={12} sm={12} md={6}>
                      {scrapchecked ? (
                        <div>
                          <Form.Control
                            value={val}
                            onChange={customValueChangeDisposer}
                          ></Form.Control>
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
                        <div>
                          <Controller
                            name="dispsinklengths"
                            control={control}
                            render={({ field }) => (
                              <Form.Select
                                {...register("dispsinklengths", {
                                  required: "Please select Length",
                                })}
                                aria-label="Default select example"
                                name="dispsinklengths"
                                onChange={(e) => {
                                  handleDisposerLengthChange(e);
                                  field.onChange(e);
                                }}
                                value={psdisposersinklength}
                                className={
                                  errors.dispsinklengths
                                    ? "form-select-error"
                                    : "form-select"
                                }
                              >
                                <option value="">Select</option>
                                {metaData?.DisposerSinkLength?.map(
                                  (element, index) => (
                                    <option key={index} value={element.value}>
                                      {element.desc}
                                    </option>
                                  )
                                )}
                              </Form.Select>
                            )}
                          />
                        </div>
                      )}
                      {
                        <p style={{ color: "red", fontSize: 11 }}>
                          {errors.dispsinklengths?.message}
                        </p>
                      }
                    </Col>
                    <Form.Group as={Col}>
                      <Col lg={7} xs={12} sm={12} md={6}>
                        <Form.Check
                          type="checkbox"
                          label="Custom Value"
                          name="Custom value"
                          onClick={handleClick}
                          checked={scrapchecked}
                        />
                      </Col>
                    </Form.Group>
                  </Form.Group>
                  <Form.Group
                    hidden={process.env.REACT_APP_ISDESIGN_USER =="false" }
                    as={Row}
                  >
                    {" "}
                    {/*to be hidden*/}
                    <Col lg={2} xs={12} sm={12} md={6}>
                      <Form.Label className="labelbox">
                        Front to Back:
                      </Form.Label>
                    </Col>
                    <Col lg={5} xs={12} sm={12} md={6}>
                      {/* <Form.Control id="DisposerSinkfrontback" value={type} /> */}
                      <Form.Control
                        type="text"
                        className="disablebtn"
                        value={type2}
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
                        id="DisposerSinkDepth"
                        name="dispdepth"
                        aria-label="Default select example"
                        onChange={handleDepthChange}
                        value={depth}
                      >
                        {metaData?.DisposerDepth?.map((element, index) => (
                          <option key={index} value={element.value}>
                            {element.desc}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    </Form.Group>
                    {process.env.REACT_APP_ISDESIGN_USER =="true"  && <Form.Group
                      hidden={process.env.REACT_APP_ISDESIGN_USER =="false" }
                      as={Row}
                    >
                      <Col lg={2} xs={12} sm={12} md={6}>
                        <Form.Label id="waterinlet" className="labelbox">
                          Water Inlet:
                        </Form.Label>
                      </Col>
                      <Col lg={5} xs={12} sm={12} md={6}>
                        <Controller
                          name="waterinlet"
                          control={control}
                          render={({ field }) => (
                            <Form.Select
                              {...validateWaterInlet()}
                              name="waterinlet"
                              aria-label="Default select example"
                              onChange={(e) => {
                                handleWaterChange(e);
                                field.onChange(e);
                              }}
                              value={waterinlet}
                              className={
                                errors.waterinlet
                                  ? "form-select-error"
                                  : "form-select"
                              }
                            >
                              <option value="">Select</option>

                              {metaData?.SinkWaterInlet?.map(
                                (element, index) => (
                                  <option key={index} value={element.value}>
                                    {element.desc}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          )}
                        />
                        {
                          <p style={{ color: "red", fontSize: 11 }}>
                            {errors.waterinlet?.message}
                          </p>
                        }
                      </Col>
                    </Form.Group>
                    }
                  
                  <Form.Group
                    // hidden={process.env.REACT_APP_ISDESIGN_USER =="false" }
                    as={Row}
                  >
                    <Col lg={2} xs={12} sm={12} md={6}>
                      <Form.Label className="labelbox">
                        Disposer Make:
                      </Form.Label>
                    </Col>
                    <Col lg={5} xs={12} sm={12} md={6}>
                      <Controller
                        name="disposermake"
                        control={control}
                        render={({ field }) => (
                          <Form.Select
                            {...register("disposermake", {
                              required: "Please select Disposer Make",
                            })}
                            aria-label="Default select example"
                            name="disposermake"
                            id="DisposerMake"
                            onChange={(e) => {
                              handleDisposerMakeChange(e);
                              field.onChange(e);
                            }}
                            value={disposermake}
                            className={
                              errors.disposermake
                                ? "form-select-error"
                                : "form-select"
                            }
                          >
                            <option value="">Select</option>

                            {metaData?.DisposerMake?.map((element, index) => (
                              <option key={index} value={element.value}>
                                {element.desc}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                      />
                      {
                        <p style={{ color: "red", fontSize: 11 }}>
                          {errors.disposermake?.message}
                        </p>
                      }
                        <p className="CustomerService-Text ">Reach out to Customer Service for specific requirements</p>
                    </Col>
                  </Form.Group>
                
                  <Form.Group
                    // hidden={process.env.REACT_APP_ISDESIGN_USER =="false" }
                    as={Row}
                  >
                    <Col lg={2} xs={12} sm={12} md={6}>
                      <Form.Label className="labelbox">
                        Disposer Collar Size:
                      </Form.Label>
                    </Col>
                    <Col lg={5} xs={12} sm={12} md={6}>
                      <Controller
                        name="disposercollarsize"
                        control={control}
                        render={({ field }) => (
                          <Form.Select
                            {...register("disposercollarsize", {
                              required: "Please select Disposer Collar Size",
                            })}
                            name="disposercollarsize"
                            aria-label="Default select example"
                            id="DisposerCollarSize"
                            onChange={(e) => {
                              handleDisposerCollarSizeChange(e);
                              field.onChange(e);
                            }}
                            value={disposercollar}
                            className={
                              errors.disposercollarsize
                                ? "form-select-error"
                                : "form-select"
                            }
                          >
                            <option value="">Select</option>

                            {filtereDisposerMake?.map((element, index) => (
                              <option key={index} value={element.value}>
                                {element.desc}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                      />
                      {
                        <p style={{ color: "red", fontSize: 11 }}>
                          {errors.disposercollarsize?.message}
                        </p>
                      }
                       <p className="CustomerService-Text ">Reach out to Customer Service for specific requirements</p>
                    </Col>
                  </Form.Group>
                </div>
              </>
            ) : (
              <></>
            )}
            {psscrapperdisposerunit == "DisposerCone" ? (
              <>
                <div className="section1">
                  {/* <div className="section1" hidden={true} id="DisposerConeSection"> */}
                  <Form.Group as={Row}>
                    <Col lg={2} xs={12} sm={12} md={6}>
                      <Form.Label className="labelbox">
                        Disposer Make:
                      </Form.Label>
                    </Col>
                    <Col lg={5} xs={12} sm={12} md={6}>
                      <Controller
                        name="disposerconemake"
                        control={control}
                        render={({ field }) => (
                          <Form.Select
                            {...register("disposerconemake", {
                              required: "Please select Disposer Make",
                            })}
                            aria-label="Default select example"
                            name="disposerconemake"
                            id="DisposerConeMake"
                            onChange={(e) => {
                              handleDisposerConeChange(e);
                              field.onChange(e);
                            }}
                            value={make}
                            className={
                              errors.disposerconemake
                                ? "form-select-error"
                                : "form-select"
                            }
                          >
                            <option value="">Select</option>

                            {metaData?.DisposerConeMake?.map(
                              (element, index) => (
                                <option key={index} value={element.value}>
                                  {element.desc}
                                </option>
                              )
                            )}
                            
                          </Form.Select>
                        )}
                      />
                      {
                        <p style={{ color: "red", fontSize: 11 }}>
                          {errors.disposerconemake?.message}
                        </p>
                      }
                       <p className="CustomerService-Text ">Reach out to Customer Service for specific requirements</p>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col lg={2} xs={12} sm={12} md={6}>
                      <Form.Label className="labelbox">
                        Disposer Cone Size:
                      </Form.Label>
                    </Col>
                    <Col lg={5} xs={12} sm={12} md={6}>
                      <Controller
                        name="disposerconesize"
                        control={control}
                        render={({ field }) => (
                          <Form.Select
                            {...register("disposerconesize", {
                              required: "Please select Disposer Cone Size",
                            })}
                            name="disposerconesize"
                            aria-label="Default select example"
                            id="DisposerConerSize"
                            onChange={(e) => {
                              handleDisposerConeSizeChange(e);
                              field.onChange(e);
                            }}
                            value={coneSize}
                            className={
                              errors.disposerconesize
                                ? "form-select-error"
                                : "form-select"
                            }
                          >
                            <option value="">Select</option>

                            {filtereDisposerCone?.map((element, index) => (
                              <option key={index} value={element.value}>
                                {element.desc}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                      />
                      {
                        <p style={{ color: "red", fontSize: 11 }}>
                          {errors.disposerconesize?.message}
                        </p>
                      }
                       <p className="CustomerService-Text ">Reach out to Customer Service for specific requirements</p>
                    </Col>
                  </Form.Group>
                </div>
              </>
            ) : (
              <></>
            )}
            {psscrapperdisposerunit == "CollectorMasterScrap" ? (
              <>
                <div className="section1">
                  {/* <div
              className="section1"
              hidden={true}
              id="DisposerCollectorSection"
            > */}
                  <Form.Group as={Row}>
                    <Col lg={2} xs={12} sm={12} md={6}>
                      <Form.Label className="labelbox">Make:</Form.Label>
                    </Col>
                    <Col lg={5} xs={12} sm={12} md={6}>
                      <Controller
                        name="collectormakes"
                        control={control}
                        render={({ field }) => (
                          <Form.Select
                            {...register("collectormakes", {
                              required: "Please select Collector Make",
                            })}
                            aria-label="Default select example"
                            name="collectormakes"
                            id="DisposerCollectorMake"
                            value={pscollectormakes}
                            onChange={(e) => {
                              handleDisposerCollarMakeChange(e);
                              field.onChange(e);
                            }}
                            className={
                              errors.collectormakes
                                ? "form-select-error"
                                : "form-select"
                            }
                          >
                            <option value="">Select</option>

                            {metaData?.CollectorMake?.map((element, index) => (
                              <option key={index} value={element.value}>
                                {element.desc}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                      />
                      {
                        <p style={{ color: "red", fontSize: 11 }}>
                          {errors.collectormakes?.message}
                        </p>
                      }
                       <p className="CustomerService-Text ">Reach out to Customer Service for specific requirements</p>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col lg={2} xs={12} sm={12} md={6}>
                      <Form.Label className="labelbox">Model:</Form.Label>
                    </Col>
                    <Col lg={5} xs={12} sm={12} md={6}>
                      <Controller
                        name="collectormodel"
                        control={control}
                        render={({ field }) => (
                          <Form.Select
                            {...register("collectormodel", {
                              required: "Please select Collector Model",
                            })}
                            aria-label="Default select example"
                            name="collectormodel"
                            id="DisposerCollectorModel"
                            onChange={(e) => {
                              handleModelChangeFn(e);
                              field.onChange(e);
                            }}
                            value={model}
                            className={
                              errors.collectormodel
                                ? "form-select-error"
                                : "form-select"
                            }
                          >
                            <option value="">Select</option>

                            {filterCollectorMaster?.map((element, index) => (
                              <option key={index} value={element.value}>
                                {element.desc}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                      />
                      {
                        <p style={{ color: "red", fontSize: 11 }}>
                          {errors.collectormodel?.message}
                        </p>
                      }
                       <p className="CustomerService-Text ">Reach out to Customer Service for specific requirements</p>
                    </Col>
                  </Form.Group>
                </div>
              </>
            ) : (
              <></>
            )}
            <div hidden={true} className="section1">
              {" "}
              {/*to be hidden*/}
              <Container>
                <Row>
                  <Col lg={4} xs={12} sm={12} md={12} className="sectionbox">
                    <Navbar.Brand className="sectionheader">
                      Scrapper Unit{" "}
                    </Navbar.Brand>
                    <Form>
                      <Form.Group>
                        <Form.Label className="sectionlabel">
                          Drain Type:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          id="ScrapperUnitDrainType"
                          //onChange={handleDrainChange}
                          //  value={scrapunit}
                          value={Orientation}
                        >
                          {/* <option value="select">Select</option> */}

                          {metaData?.ScrapSinkDrain?.map((element, index) => (
                            <option key={index} value={element.value}>
                              {element.desc}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Col>

                  <Col lg={4} xs={12} sm={12} md={12} className="sectionbox">
                    <Navbar.Brand className="sectionheader">
                      Disposer Unit (PS)
                    </Navbar.Brand>
                    <Form>
                      <Form.Group>
                        <Form.Label className="sectionlabel">
                          Disposer Type:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          id="DisposerUnitPSDrainType"
                          onChange={handleDisposerChange}
                        >
                          <option value="select">Select</option>

                          {metaData?.DisposerSinkDrain?.map(
                            (element, index) => (
                              <option key={index} value={element.value}>
                                {element.desc}
                              </option>
                            )
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Col>

                  <Col lg={4} xs={12} sm={12} md={12} className="sectionbox">
                    <Navbar.Brand className="sectionheader">
                      Disposer Unit (EXT)
                    </Navbar.Brand>
                    <Form>
                      <Form.Group>
                        <Form.Label className="sectionlabel">
                          Disposer Make:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          id="DisposerUnitExtDrainType"
                          onChange={handleDrainTypeChange}
                        >
                          <option value="select">Select</option>

                          {metaData?.DisposerExtDrain?.map((element, index) => (
                            <option key={index} value={element.value}>
                              {element.desc}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>

            {/* <Form.Group as={Row} className="p-" id="SoiledDrainBoardSection">
            <Col lg={2} xs={12} sm={12} md={6}>
              <Form.Label className="Drainlabel">Soiled Drain Board Length:</Form.Label>
            </Col>
            <Col lg={5} xs={12} sm={12} md={6}>
              <Form.Control
                value={soildblengthValue}
                onChange={handleSoildblengthChange}
                onBlur={onBlurone}

              />
            </Col>
          </Form.Group> */}
            {psscrapperdisposerunit == "DisposerSink" ||
            psscrapperdisposerunit == "DisposerCone" ||
            psscrapperdisposerunit == "CollectorMasterScrap" ? (
              <>
                {process.env.REACT_APP_ISDESIGN_USER =="false"  &&
                (props.checkConfig(configuration)) ? (
                  <></>
                ) : (
                  <Form>
                    {/* <Form.Group as={Row} hidden={true} id="DrainBoardSectionDiff"> */}
                    <Form.Group as={Row}>
                      <Col lg={2} xs={12} sm={12} md={6}>
                        <Form.Label className="labelbox">
                          Drain Board Length b/w Scrapper/Disposer Unit and Wash
                          Sink:
                        </Form.Label>
                      </Col>
                      <Col lg={5} xs={12} sm={12} md={6} className="ms-2 ">
                        <Form.Control
                          id="drainboardlength"
                          onChange={handleDrainblengthsdwChange}
                          value={lengthbtw}
                          disabled={!validateImageSelection(props.imageselection)}
                        />
                        {lengthbtw < 12 &&
                          psscrapperdisposerunit == "DisposerSink" && validateImageSelection(props.imageselection) ? (
                          <p  style={{ color: "red", fontSize: 11 }}>
                            Drain Board Length b/w Scrapper/Disposer Unit and
                            Wash Sink should be greater than/Equal to 12 inches.
                          </p>
                        ) : null}

                        {lengthbtw < 12 &&
                        ((psscrapperdisposerunit == "DisposerCone" )) && validateImageSelection(props.imageselection) ? (
                          <p  style={{ color: "red", fontSize: 11 }}>
                            Drain Board Length b/w Scrapper/Disposer Unit and
                            Wash Sink Should be greater than/Equal to 12
                            inches.
                          </p>
                        ) : null}
                        {lengthbtw < 13.5 &&
                        ((
                            psscrapperdisposerunit == "CollectorMasterScrap")) && validateImageSelection(props.imageselection) ? (
                          <p style={{ color: "red", fontSize: 11 ,}}>
                            Drain Board Length b/w Scrapper/Disposer Unit and
                            Wash Sink Should be greater than/Equal to 13.5
                            inches.
                          </p>
                        ) : null}
                      </Col>
                    </Form.Group>
                  </Form>
                )}
              </>
            ) : (
              <></>
            )}
            {psscrapperdisposerunit == "ScrapSink"||psscrapperdisposerunit == "DisposerSink" ||
            psscrapperdisposerunit == "DisposerCone" ||
            psscrapperdisposerunit == "CollectorMasterScrap"?<>(
            <Row>
              <Col lg={3}> </Col>
              <Col lg={1}> </Col>
              <Col lg={3}>
                <div>
                  {/* <div className="section1"> */}
                  <Form.Check
                    className="formradio"
                    type="checkbox"
                    label="Pre-Rinse Faucet"
                    id="prerinsefaucet" 
                     checked={prerinsefaucet}              
                     onChange={handlePrerinsefaucetChange}                    
                  />
                </div>
              </Col>
            </Row>
            )</>:<></>
}
{psscrapperdisposerunit == "ScrapSink"||psscrapperdisposerunit == "DisposerSink" ||
            psscrapperdisposerunit == "DisposerCone" ||
            psscrapperdisposerunit == "CollectorMasterScrap"?<>(
              <div id="PreRinseFaucetSection" hidden={true} className="show">
                <Form.Group as={Row}>
                  <Col lg={2} xs={12} sm={12} md={6}>
                    <Form.Label className="labelbox">FaucetMake:</Form.Label>
                  </Col>
                  <Col lg={5} xs={12} sm={12} md={6}>
                    <Form.Select
                      name="faucetmake"
                      aria-label="Default select example"
                      onChange={(e) => {
                        handleCompanyChange(e);
                      }}
                      value={faucet}
                    >
                      {metaData?.PreRinseCompany?.map((element, index) => (
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
                    <Form.Select
                      name="faucettype"
                      aria-label="Default select example"
                      onChange={(e) => {
                        handleTypeChange(e);
                      }}
                      value={scarptype}
                    >
                      {metaData?.PreRinseFaucet?.map((element, index) => (
                        <option key={index} value={element.value}>
                          {element.desc}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </div>
)</>:<></>}
          </div>
        </div>
      </form>
    </>
  );
}

export default Main;
