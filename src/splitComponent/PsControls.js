import React, {useEffect, useState} from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import SelectOptions from "../commonComponent/SelectOptions";
export default function PsControls(props) {
    const { errors, control, handlePsxChange, metaData, Psx, handleMotorChange, motorhpValue,
        voltageValue, handleVoltageChange, genValue, handleGenChange, psheaterpower, handleHeaterChange,
        legValue, handleCrossChange, handleFootChange, footValue, cornerdblength, handlecornerdbChange,
        leftcornerdblength, handleleftcornerdbChange, rightcornerdblength, handlerightcornerdbChange,
        soildblengthValue, handleSoildblengthChange, onBlurone, heaterValue, configuration,
        validate, Rinsevalidation, cornerdbval, OrientationValue, checkOrientation, register, widthValue,imageselection,Orientation,psscrapperdisposerunit
         } = { ...props }

       
         useEffect(()=>{
            LandUshapeSoidDBErrorMessage();
            LeftCornerDbErrorMessage();
            RightCornerDbErrorMessage();
         },[configuration ,imageselection,Orientation,psscrapperdisposerunit])
         console.log(psscrapperdisposerunit,"psscrapperdisposerunit=PScontrol")
         console.log(soildblengthValue,"soildblengthValue")
            const LandUshapeSoidDBErrorMessage =()=>{
            var text= "";
            if(Orientation === "Right Rear" && configuration === "L" &&imageselection === "B1" ){
              text = "Soiled Drain board Length cannot be empty or negative.Please increase the  Unit length or decrease the Scrap, Wash sink length."
            }
            else if(Orientation === "Right Rear" && configuration === "L" &&imageselection === "D1" ){ 
             text = "Soiled Drain board Length cannot be empty or negative. Please increase the  Right wing length or decrease the Scrap, Wash sink length."
            }
            else if(Orientation === "Left Rear" && configuration === "L" &&imageselection === "A1" ){ 
                text = "Soiled Drain board length cannot be empty or negative. Please increase the  Left wing length or decrease the Scrap, Wash sink length."
               
               }
               else if(Orientation === "Left Rear" && configuration === "L" &&imageselection === "C1" ){ 
                text = "Soiled Drain board Length cannot be empty or negative. Please increase the  Unit length or decrease the Scrap, Wash sink length." 
               }
               else if(Orientation === "Right Rear" && configuration === "U" &&imageselection === "B1" ){
                text = "Soiled Drain board Length cannot be empty or negative.Please increase the  Right wing length or decrease the Scrap sink length."
              }
              else if(Orientation === "Right Rear" && configuration === "U" &&imageselection === "D1" ){ 
               text = "Soiled Drain board Length cannot be empty or negative.Please increase the  Right wing length or decrease the Scrap sink length."
              }
              else if(Orientation === "Right Rear" && configuration === "U" &&imageselection === "F1" ){ 
                  text = "Soiled Drain board length cannot be empty or negative.Please increase the  Right wing length."
                 
                 }
                 else if(Orientation === "Right Rear" && configuration === "U" &&imageselection === "H1" ){ 
                  text = "Soiled Drain board length cannot be empty or negative.Please increase the  Right wing length or decrease the Scrap sink length." 
                 }
  
  
               else if(Orientation === "Left Rear" && configuration === "U" &&imageselection === "A1" ){
                  text = "Soiled Drain board length cannot be empty or negative.Please increase the  Left wing length or decrease the Scrap, Wash sink length."
                }
                else if(Orientation === "Left Rear" && configuration === "U" &&imageselection === "C1" ){ 
                 text = "Soiled Drain board Length cannot be empty or negative.Please increase the  Unit length or decrease the Scrap, Wash sink length."
                }
                else if(Orientation === "Left Rear" && configuration === "U" &&imageselection === "E1" ){ 
                    text = "Soiled Drain board length cannot be empty or negative.Please increase the  Left wing length."
                   
                   }
                   else if(Orientation === "Left Rear" && configuration === "U" &&imageselection === "G1" ){ 
                    text= "Soiled Drain board length cannot be empty or negative.Please increase the  Left wing length or decrease the Scrap sink length." 
                   }
                   else if(psscrapperdisposerunit ==="none"&& soildblengthValue>12 ||configuration === "Straight 2PC" ||configuration === "Straight 1PC"){
                    text= "Soiled Drain board length must be at least 12."
                    console.log(text,"text")
                   }
            return text;
          }
        
          const LeftCornerDbErrorMessage=()=>{
            var LeftCornerDbErrorMessagetext= "";  
           
             if( imageselection==="B1"){
                LeftCornerDbErrorMessagetext=`Left Corner Drainboard must be atleast ${!checkOrientation(OrientationValue) ? widthValue : cornerdbval}.Please increase the  Unit length or decrease the Wash sink or Right Corner Drain Board length .`
            }
            
            else if( imageselection==="D1") {
                LeftCornerDbErrorMessagetext=`Left Corner Drainboard must be atleast ${!checkOrientation(OrientationValue) ? widthValue : cornerdbval}.Please increase the  Unit length or decrease the Wash, Rinse sink or Right Corner Drain Board length .`
            }
            else if( imageselection==="F1") {
                LeftCornerDbErrorMessagetext=`Left Corner Drainboard must be atleast ${!checkOrientation(OrientationValue) ? widthValue : cornerdbval}.Please increase the  Unit length or decrease the Scrap, Wash, Rinse, sanitize sink or Right Corner Drain Board length.`
            }
            else if( imageselection==="H1") {
                LeftCornerDbErrorMessagetext=`Left Corner Drainboard must be atleast ${!checkOrientation(OrientationValue) ? widthValue : cornerdbval}.Please increase the  Unit length or decrease the Wash, Rinse, sanitize sink or Left Corner Drain Board length. `
            }
            return LeftCornerDbErrorMessagetext;
          }
     const RightCornerDbErrorMessage =()=>{
        var rightCornerDbErrorMessageText="";
         if( imageselection==="A1") {
            rightCornerDbErrorMessageText=`Right Corner Drainboard must be atleast ${checkOrientation(OrientationValue) ? widthValue : cornerdbval}.Please increase the  Unit length or decrease the Wash sink or Left Corner Drain Board length. `
        }
        else if( imageselection==="C1") {
            rightCornerDbErrorMessageText=`Right Corner Drainboard must be atleast ${checkOrientation(OrientationValue) ? widthValue : cornerdbval}.Please increase the  Unit length or decrease the Wash, Rinse sink or Left Corner Drain Board length. `
        }
        else if( imageselection==="E1") {
            rightCornerDbErrorMessageText=`Right Corner Drainboard must be atleast ${checkOrientation(OrientationValue) ? widthValue : cornerdbval}.Please increase the  Unit length or decrease the Scrap, Wash, Rinse, sanitize sink or Left Corner Drain Board length. `
        }
        else if( imageselection==="G1") {
            rightCornerDbErrorMessageText=`Right Corner Drainboard must be atleast ${checkOrientation(OrientationValue) ? widthValue : cornerdbval}.Please increase the  Unit length or decrease the Wash, Rinse, sanitize sink or Left Corner Drain Board length. `
        }
        return rightCornerDbErrorMessageText;
     }

    return (
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
                                     {...field}
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
                                        <SelectOptions data={metaData?.PSXXX}/>
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
                                        <SelectOptions noSelect={true} data={metaData?.MotorHPwithoutHeater}/>
                                    </Form.Select>
                                ) : (
                                    <Form.Select
                                        id="motorhp"
                                        aria-label="Default select example"
                                        onChange={handleMotorChange}
                                        value={motorhpValue}
                                    >
                                        <SelectOptions noSelect={true} data={metaData?.MotorHPwithHeater}/>
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
                                    <SelectOptions data={metaData?.VoltagewithoutHeater}/>
                                </Form.Select>
                            ) : motorhpValue == "3HP" ? (
                                <Form.Select
                                    id="voltage"
                                    aria-label="Default select example"
                                    value={voltageValue}
                                    // onChange={handleVoltageChange}

                                    onChange={handleVoltageChange}
                                >
                                    <SelectOptions data={metaData?.Voltage3HP}/>
                                </Form.Select>
                            ) : (
                                <Form.Select
                                    id="voltage"
                                    aria-label="Default select example"
                                    onChange={handleVoltageChange}
                                    value={voltageValue}
                                >
                                    <SelectOptions data={metaData?.VoltagewithoutHeater}/>
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
                                <SelectOptions noSelect={true} data={metaData?.Generation}/>
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
                        <Col lg={8} xs={12} sm={12} md={6} className="mb-2">
                            {heaterValue == "ON" ? (
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleHeaterChange}
                                    value={psheaterpower}
                                >
                                    <SelectOptions noSelect={true} data={metaData?.Heater}/>
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
                                <SelectOptions noSelect={true} data={metaData?.CrossRails}/>
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
                                <SelectOptions noSelect={true} data={metaData?.FootType}/>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    {configuration == "L" ? (
                        <Form.Group
                            as={Row}
                            className="p-"
                            id="cornerdblength"
                        >
                            <Col lg={4} xs={12} sm={12} md={6}>
                                <Form.Label className="Drainlabel">
                                    Corner Drain Board:
                                </Form.Label>
                            </Col>
                            <Col lg={8} xs={12} sm={12} md={6}>
                                <Controller
                                    name="cornerdblength"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Form.Control
                                        // 
                                        // {...field}
                                            as="input"
                                            type="number"
                                            style={{
                                                borderColor: errors.cornerdblength
                                                    ? "red"
                                                    : "",
                                            }}
                                            value={cornerdblength}
                                            onChange={(e) => {
                                                handlecornerdbChange(e);
                                                field.onChange(e);
                                            }}
                                            onBlur={onBlurone}
                                        />
                                    )}
                                    rules={{
                                        required: "Corner DB Length required",
                                    }}
                                />
                                {cornerdblength >= cornerdbval ? (
                                    Rinsevalidation
                                ) : (
                                    <>
                                        {cornerdblength && <p style={{ color: "red", fontSize: 11 }}>
                                           Corner DB must be at least {cornerdbval}
                                        </p>}
                                    </>
                                )}
                                <p style={{ color: "red", fontSize: 10 }}>
                                    {errors.cornerdblength?.message}
                                </p>
                            </Col>
                        </Form.Group>) : (configuration == "U" ? (
                            <>
                                <Form.Group
                                    as={Row}
                                    className="p-"
                                    id="leftcornerdblength"
                                >
                                    <Col lg={4} xs={12} sm={12} md={6}>
                                        <Form.Label className="Drainlabel">
                                            Left Corner Drain Board:
                                        </Form.Label>
                                    </Col>
                                    <Col lg={8} xs={12} sm={12} md={6}>
                                        <Controller
                                            name="leftcornerdblength"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { onChange, value } }) => (
                                                <Form.Control
                                                    {...register("leftcornerdblength",{min:!checkOrientation(OrientationValue) ? widthValue : cornerdbval})}
                                                    as="input"
                                                    type="text"
                                                    disabled={!checkOrientation(OrientationValue)}
                                                    style={{
                                                        borderColor: errors.leftcornerdblength
                                                            ? "red"
                                                            : "",
                                                    }}
                                                    value={leftcornerdblength}
                                                    onChange={(e) => {
                                                        handleleftcornerdbChange(e);
                                                        onChange(e);
                                                    }}
                                                    onBlur={onBlurone}
                                                />
                                            )}
                                            rules={{
                                                required: "Left Corner DB Length required",
                                                // min: `Left Corner DB must be at least ${!checkOrientation(OrientationValue) ? widthValue : cornerdbval}`
                                            }}
                                        />
                                         {(checkOrientation(OrientationValue) ? leftcornerdblength >= cornerdbval : leftcornerdblength >= widthValue) ? ( 
                                             Rinsevalidation
                                         ) : (   
                                            <>
                                                {LeftCornerDbErrorMessage() ?  <p style={{ color: "red", fontSize: 11 }}>{LeftCornerDbErrorMessage()}</p> : leftcornerdblength ?(<p style={{ color: "red", fontSize: 11 }}>
                                                Left Corner Drainboard must be at least {!checkOrientation(OrientationValue) ? widthValue : cornerdbval}  
                                                </p> ):" "}
                                              
                                            </>
                                         )}
                                          
                                        <p style={{ color: "red", fontSize: 10 }}>
                                            {errors.leftcornerdblength?.message}
                                        </p>
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="p-"
                                    id="rightcornerdblength"
                                >
                                    <Col lg={4} xs={12} sm={12} md={6}>
                                        <Form.Label className="Drainlabel">
                                            Right Corner Drain Board:
                                        </Form.Label>
                                    </Col>
                                    <Col lg={8} xs={12} sm={12} md={6}>
                                        <Controller
                                            name="rightcornerdblength"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { onChange, value } }) => (
                                                <Form.Control
                                                    {...register("rightcornerdblength", {min:checkOrientation(OrientationValue) ? widthValue : cornerdbval})}
                                                    as="input"
                                                    disabled={checkOrientation(OrientationValue)}
                                                    type="text"
                                                    style={{
                                                        borderColor: errors.rightcornerdblength
                                                            ? "red"
                                                            : "",
                                                    }}
                                                    value={rightcornerdblength}
                                                    onChange={(e) => {
                                                        handlerightcornerdbChange(e);
                                                        onChange(e);
                                                    }}
                                                    onBlur={onBlurone}
                                                />
                                            )}
                                            rules={{
                                                required: "Right Corner DB Length required",
                                                //  min:checkOrientation(OrientationValue) ? widthValue : cornerdbval
                                            }}
                                        />
                                        {(!checkOrientation(OrientationValue) ? rightcornerdblength >= cornerdbval : rightcornerdblength >= widthValue) ? ( 
                                             Rinsevalidation
                                         ) : (   
                                            <>
                                                {RightCornerDbErrorMessage() ?  <p style={{ color: "red", fontSize: 11 }}>{RightCornerDbErrorMessage()}</p> : rightcornerdblength ?(<p style={{ color: "red", fontSize: 11 }}>
                                                 Right Corner Drainboard must be at least {checkOrientation(OrientationValue) ? widthValue : cornerdbval}  
                                                
                                                </p> ):" "}
                                              
                                            </>
                                         )}
                                        <p style={{ color: "red", fontSize: 10 }}>
                                            {errors.rightcornerdblength?.message}
                                        </p>
                                    </Col>
                                </Form.Group>
                            </>
                        ) : (
                            <></>
                        ))}
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
                                defaultValue={soildblengthValue}

                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <Form.Control
                                            {...register("SoiledDrainBoard", {required: "Soiled Drain DB Required", min: 0 })}
                                            as="input"
                                            type="text"
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
                                            disabled={configuration == "L" || configuration == "U" ? true : false}
                                        />
                                    )
                                }}
                                rules={{
                                    min: `Right Corner DB must be at least`
                                }}
                            />
                            {(soildblengthValue>12 && psscrapperdisposerunit ==="none") ?  <p style={{ color: "red", fontSize: 11 }}>
                            {LandUshapeSoidDBErrorMessage()}
                            </p>:(soildblengthValue < 0) &&(configuration=="L"||configuration=="U")? <>
                                <p style={{ color: "red", fontSize: 11 }}>
                                {LandUshapeSoidDBErrorMessage()}
                                </p>
                            </> :""}

                          
                            {errors.SoiledDrainBoard &&
                                <p style={{ color: "red", fontSize: 10 }}>
                                    {errors.SoiledDrainBoard?.message ? errors.SoiledDrainBoard?.message : LandUshapeSoidDBErrorMessage()}
                                </p>
                            }
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}