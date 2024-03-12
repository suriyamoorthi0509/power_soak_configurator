import Automation from "../Component/Automation";
import { useStoreActions, useStoreState } from "easy-peasy";
const Url = "http://localhost:5000";
const themeDefault = "dark";
const namesOfModes = ["dark", "moonlight", "eclipse", "light"];

var selectedTabSinkConfig = {
  wash: {
    pswashsinklength: 0,
  },
};

var selectedSinkConfig = {
  psjobid: "",
  psjobrequesteduser: "",
  psrevision: "1",
  psusermodule: "",
  psconfiguration: "",
  psjointtype: "",
  psorientation: "",
  psunitlength: 0,
  psunitwidth: 0,
  psdeckheight: 35,
  lunit: {
    psassemblytype: "NONE", //Default value is NONE, to be filled with A1 or B1 or C1 or D1
    pswinglength: 0,
    pscornerdb: 0,
  },
  uunit: {
    psassemblytype: "NONE", //Default value is NONE, to be filled with A1 or B1 or C1 or D1 or E1 or F1 or G1 or H1
    psleftwinglength: 0,
    psrightwinglength: 0,
    pscornerdb: 0,
  },
  electricals: {
    psxxx: "",
    psheater: "OFF",
    psvoltage: "",
    psmotor: "2HP",
    psheaterpower: 0,
  },
  top: {
    psrims: "",
    psbacksplash: "",
    psendsplashleft: "",
    psendsplashright: "",
    psbacksplashheight:"",
  },
  scrap: {
    pssoildblength: 0,
    psdbbtwscrapandwash: 0,
    pssdsinklength: 0,
    pssdsinkwidth: 0,
    pssdsinkdepth: 4,
    psscrapperdisposerunit: "ScrapperUnit",
    psscrapperdraintype: "Center(2in)",
    psdisposersinkwidth: 0,
    psdisposersinklength: 0,
    psdisposersinkdepth: 5.375,
    psdisposermake: "NONE",
    psdisposersize: "NONE",
    psconemake: "NONE",
    psconesize: 0,
    pscollectormake: "NONE",
    pscollectorpartnumber: "NONE",
    pssdsinkwaterinlet: "NONE",
    psprerinsecompany: "T&S",
    psprerinsetype: "NONE",
  },
  wash: {
    pswashsinklength: 0,
    pswashsinkwidth: 0,
    pswashsinkdepth: 21,
    pswashsinkdraintype: "Standard Drain Ball Valve",
    pssheetpanrack: "Complete Rack Assembly",
    psadvancedwashinsert: "OFF",
    psgeneration: "",
  },
  rinse: {
    psrinsesinklength: 0,
    psrinsesinkwidth: 0,
    psrinsesinkdepth: 14,
    psrinsesinkdraintype: "",
    psrinseoverflow: "NONE",
    psfillrinsecompany: "NONE",
    psfillrinsetype: "NONE",
  },
  sanitize: {
    pssanitizesinklength: 0,
    pssanitizesinkwidth: 0,
    pssanitizesinkdepth: 14,
    pssanitizesinkdraintype: "",
    pssanitizeoverflow: "NONE",
    psfillsanitizecompany: "NONE",
    psfillsanitizetype: "NONE",
    // pssanitizefillfaucet: "OFF",
  },
  legassembly: {
    pscrossrails: "",
    psfoottype: "",
  },
  overshelf: {
    psovershelf: "NONE",
    psovershelflength: 0,
    psovershelfdistance: 0,
    psovershelfheight: 0,
  },
  accessories: {
    pschemicaldispenser: "OFF",
    psdualtempering: "OFF",
    psutensilbasket: "ON",
    psdryingrack: "NONE",
    psundershelf: "NONE",
    psvacuumbreaker: "OFF",
    
  },
  drawingdetails: {
    psconsultant: "NONE",
    psdealer: "NONE",
    psprojectname: "NONE",
    pssaleordernumber: "NONE",
    psworkordernumber: "NONE",
    psdrawnby: "NONE",
    psitemnumber: "NONE",
    pseconumber: "NONE",
    psspecialnotes: "NONE",
  },
  bomdetails: {
    psdrawndate: "NONE",
    // psjobitemnumber: "NONE",
    psetonumber: "NONE",
  },
};

var calculateDrain = (
  unitLength,
  leftEndSplash,
  rightEndSplash,
  soildDrainBoard,
  scrapLength,
  distanceBtwSandD,
  disposerLength,
  disposerCone,
  collectorLength,
  washLength,
  rinseLength,
  sanitizeLength
) => {
  let cleanDrainboardlength = "";
  if (
    leftEndSplash != null &&
    leftEndSplash != "" &&
    rightEndSplash != null &&
    rightEndSplash != ""
  ) {
    let leftsplashLength = calculateFlashLength(leftEndSplash);
    let rightsplashLength = calculateFlashLength(rightEndSplash);
    if (
      unitLength != null &&
      soildDrainBoard != null &&
      washLength != null &&
      rinseLength != null &&
      sanitizeLength != null
    ) {
      cleanDrainboardlength =
        unitLength -
        (leftsplashLength +
          rightsplashLength +
          soildDrainBoard +
          scrapLength +
          distanceBtwSandD +
          disposerLength +
          disposerCone +
          collectorLength +
          washLength +
          rinseLength +
          sanitizeLength);
      // document.getElementById("cleandrainboard").value = cleanDrainboardlength;
      return cleanDrainboardlength;
    }
  }
};

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

export {
  calculateDrain,
  selectedSinkConfig,
  calculateFlashLength,
  selectedTabSinkConfig,
};
