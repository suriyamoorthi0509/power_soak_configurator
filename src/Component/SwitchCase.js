
switch(imageselction) {
    case "A1":
      if(configuration == "U"){
        setSoildblengthValue(parseFloat(leftwinglength)-(parseFloat(pssdsinklength)+parseFloat(widthValue)+calculateFlashLength(splashleft)+2.0)+(1.5*1.5));
        setAutoCleandrainDB(parseFloat(rightwinglength)-(parseFloat(sanitizelength)+parseFloat(rinselength)+parseFloat(widthValue)+parseFloat(splashRight)+2.0)+(1.5*1.5));
      }else if(configuration == "L"){
        setSoildblengthValue(parseFloat(leftwinglength)-(parseFloat(pssdsinklength)+parseFloat(lengthbtw)+parseFloat(washSinkLength)+parseFloat(widthValue)+calculateFlashLength(splashleft)+2.0)+(1.5*1.5));
        setAutoCleandrainDB(parseFloat(length)-(parseFloat(cornerdblength)+parseFloat(rinselength)+parseFloat(sanitizelength)+calculateFlashLength(splashRight)+2.0));
      }
      break;
    case "B1":
      if(configuration == "U"){
        setSoildblengthValue(parseFloat(rightwinglength)-(parseFloat(pssdsinklength)+parseFloat(widthValue)+calculateFlashLength(splashRight)+2.0)+(1.5*1.5));
        setAutoCleandrainDB(parseFloat(leftwinglength)-(parseFloat(sanitizelength)+parseFloat(rinselength)+parseFloat(widthValue)+parseFloat(splashleft)+2.0)+(1.5*1.5));
      }else if(configuration =="L"){
        setSoildblengthValue(parseFloat(length)-(parseFloat(cornerdblength)+parseFloat(washSinkLength)+parseFloat(lengthbtw)+parseFloat(pssdsinklength)+calculateFlashLength(splashRight)+2.0));
        setAutoCleandrainDB(parseFloat(leftwinglength)-(parseFloat(sanitizelength)+parseFloat(rinselength)+parseFloat(widthValue)+calculateFlashLength(splashleft)+2.0)+(1.5*1.5));
      }
      break;
    case "C1":
      if(configuration == "U"){
        setSoildblengthValue(parseFloat(leftwinglength)-(parseFloat(pssdsinklength)+parseFloat(widthValue)+calculateFlashLength(splashleft)+2.0)+(1.5*1.5));
        setAutoCleandrainDB(parseFloat(rightwinglength)-(parseFloat(sanitizelength)+parseFloat(widthValue)+parseFloat(splashRight)+2.0)+(1.5*1.5));
      }else if(configuration =="L"){
        setSoildblengthValue(parseFloat(length)-(parseFloat(cornerdblength)+parseFloat(washSinkLength)+parseFloat(lengthbtw)+parseFloat(pssdsinklength)+calculateFlashLength(splashleft)+2.0));
        setAutoCleandrainDB(parseFloat(rightwinglength)-(parseFloat(sanitizelength)+parseFloat(rinselength)+parseFloat(widthValue)+calculateFlashLength(splashRight)+2.0)+(1.5*1.5));
      }
      break;
    case "D1":
      if(configuration == "U"){
        setSoildblengthValue(parseFloat(rightwinglength)-(parseFloat(pssdsinklength)+parseFloat(widthValue)+calculateFlashLength(splashRight)+2.0)+(1.5*1.5));
        setAutoCleandrainDB(parseFloat(leftwinglength)-(parseFloat(sanitizelength)+parseFloat(widthValue)+parseFloat(splashleft)+2.0)+(1.5*1.5));
      }else if(configuration =="L"){
        setSoildblengthValue(parseFloat(rightwinglength)-(parseFloat(pssdsinklength)+parseFloat(lengthbtw)+parseFloat(washSinkLength)+parseFloat(cornerdblength)+calculateFlashLength(splashRight)+2.0)+(1.5*1.5));
        setAutoCleandrainDB(parseFloat(length)-(parseFloat(cornerdblength)+parseFloat(rinselength)+parseFloat(sanitizelength)+calculateFlashLength(splashleft)+2.0));
      }
      break;
    case "E1":
      if(configuration == "U"){
        setSoildblengthValue(parseFloat(leftwinglength)-(parseFloat(widthValue)+2.0+calculateFlashLength(splashleft)));
        setAutoCleandrainDB(parseFloat(rightwinglength)-(parseFloat(widthValue)+2.0+parseFloat(splashRight)));
      }
      break;
    case "F1":
        if(configuration == "U"){
            setSoildblengthValue(parseFloat(rightwinglength)-(parseFloat(widthValue)+2.0+calculateFlashLength(splashRight)));
            setAutoCleandrainDB(parseFloat(leftwinglength)-(parseFloat(widthValue)+2.0+parseFloat(splashleft)));
        }
        break;
    case "G1":
        if(configuration == "U"){
            setSoildblengthValue(parseFloat(leftwinglength)-(parseFloat(pssdsinklength)+parseFloat(widthValue)+calculateFlashLength(splashleft)+2.0)+(1.5*1.5));
            setAutoCleandrainDB(parseFloat(rightwinglength)-(parseFloat(widthValue)+2.0+parseFloat(splashRight)));
        }
        break;
    case "H1":
        if(configuration == "U"){
            setSoildblengthValue(parseFloat(rightwinglength)-(parseFloat(pssdsinklength)+parseFloat(widthValue)+calculateFlashLength(splashRight)+2.0)+(1.5*1.5));
            setAutoCleandrainDB(parseFloat(leftwinglength)-(parseFloat(widthValue)+2.0+parseFloat(splashleft)));
        }
        break;
    }