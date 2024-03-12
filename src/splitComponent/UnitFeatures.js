import React, { useEffect } from "react";
import { Container, Navbar, Col, Row, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import "../CSS/Automation.css";
import SelectOptions from "../commonComponent/SelectOptions";

function UnitFeature(props) {
  const {
    control,
    FrontRim,
    handleRimChange,
    errors,
    metaData,
    BackSplash,
    handleBacksplashChange,
    splashRight,
    handleSplashrightChange,
    splashleft,
    handleSplashleftChange,
    widthValue,
    handleWidthChange,
    length,
    handleLengthChange,
    ushapeunitlength,
    Rinsevalidation,
    deckValue,
    handleDepthChange,
    textbox,
    JointType,
    handleJointtypeChange,
    leftshape,
    leftwinglength,
    handleLeftWingLengthChange,
    rightshape,
    rightwinglength,
    handleRightWingLengthChange,
    handleBacksplashheight,
    backsplashHeight,
  } = { ...props };

  const filterData = (type, type_2) => {
    const dict = {
      "Roll Rim": "Square Channel Rim",
      "SQR Rim": "Rolled Rim",
      "Up Bs": 'Turned Down 2" End Splash',
      "Down Bs": 'Turned Up 2" End Splash',
    }
    return metaData?.EndSplashRight?.filter((item) => {
      if(item.desc !== dict[type] && item.desc !== dict[type_2]){
        return item;
      }
    })
  }
  useEffect(()=>{
    BacksplashheightErrorMessage();
  },[]);

  const BacksplashheightErrorMessage =()=>{
    var text =""
    if(BackSplash=="Up Bs"&& backsplashHeight<9.5){
      text ="Backsplashheight must be atleast minmum  value 9.5";
    }
    else if((BackSplash=="Up Bs"|| BackSplash=="Down Bs")&& backsplashHeight>15){
      text ="Backsplashheight must be atleast maxmium value 15";
    }
    else if(BackSplash=="Down Bs"&& backsplashHeight<8){
      text ="Backsplashheight must be atleast minmum  value 8"
    }
    else if((BackSplash=="Up Bs"|| BackSplash=="Down Bs") && backsplashHeight<=0){
      text="Please enter the value"
    }
    return text;
    
  }

  return (
    <div className="part1">
      <Navbar className="Unit">
        <Navbar.Brand>Unit Features</Navbar.Brand>
      </Navbar>
      <Row>
        <Col lg={6} xs={12} sm={12} md={6} style={{ padding: " 1.5rem " }}>
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
                      errors.FrontRim ? "form-select-error" : "form-select"
                    }
                    aria-label="Default select example"
                    onChange={(e) => {
                      handleRimChange(e);
                      field.onChange(e);
                    }}
                  >
                    <SelectOptions data={metaData?.Rim}/>
                   
                  </Form.Select>
                )}
                rules={{ required: "Please select front trim" }}
              />
              <p style={{ color: "red", fontSize: 10, marginTop: 1 }}>
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
                    className={
                      errors.BackSplash ? "form-select-error" : "form-select"
                    }
                    onChange={(e) => {
                      handleBacksplashChange(e);
                      field.onChange(e);
                    }}
                  >
                    <SelectOptions data={metaData?.BackSplash}/>
                  
                  </Form.Select>
                )}
                rules={{ required: "Please select Back Splash" }}
              />
              <p style={{ color: "red", fontSize: 10, marginTop: 1 }}>
                {errors.BackSplash?.message}
              </p>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col lg={3} xs={12} sm={12} md={6} className="mb-3">
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
                    <SelectOptions data={filterData(FrontRim, BackSplash)}/>
                  
                  </Form.Select>
                )}
                rules={{
                  required: "Please select End Splash Right",
                }}
              />
              <p style={{ color: "red", fontSize: 10, marginTop: 1 }}>
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
                      errors.EndSplashLeft ? "form-select-error" : "form-select"
                    }
                    onChange={(e) => {
                      handleSplashleftChange(e);
                      field.onChange(e);
                    }}
                  >
                      <SelectOptions data={filterData(FrontRim, BackSplash)}/>
                  
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

          <Form.Group as={Row}>
            <Col lg={3} xs={12} sm={12} md={6}>
              <Form.Label> Backsplash height:</Form.Label>
            </Col>
            <Col lg={6} xs={12} sm={12} md={6}>
              <Controller
                name="Backsplashheight"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    type="number"
                    value={backsplashHeight}
                    onChange={(e) => {
                      field.onChange(e);
                      handleBacksplashheight(e);
                    }}
                    style={{
                      borderColor: errors.Backsplashheight ? "red" : "",
                    }}
                  />
                )}
                 rules={{ required: "Please fill the length Backsplash height" }}
              />
                  { backsplashHeight<=0 ?<p style={{ color: "red", fontSize: 10,marginTop:5 }}>
                {errors.Backsplashheight?.message}
              </p>: 
                <p style={{ color: "red", fontSize: 11 }}>
                                {BacksplashheightErrorMessage()}
                                </p>        
}     
               {/* <p style={{ color: "red", fontSize: 10,marginTop:5 }}>
                {errors.Backsplashheight?.message}
              </p>:"" */}
            </Col>
          </Form.Group>
        </Col>

        <Col lg={5} xs={12} sm={12} md={6} style={{ padding: "1.5rem " }}>
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
                      errors.FronttoBack ? "form-select-error" : "form-select"
                    }
                    onChange={(e) => {
                      handleWidthChange(e);
                      field.onChange(e);
                    }}
                  >
                    <SelectOptions data={metaData?.UnitWidth}/>
                    
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
              <Form.Label> Unit Length:</Form.Label>
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
              {length >= ushapeunitlength ? (
                Rinsevalidation
              ) : (
                <p style={{ color: "red", fontSize: 11 }}>
                 Length must be at least  {ushapeunitlength}.
                </p>
              )}
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.length?.message}
              </p>
              {/* <Form.Control onChange={handleLengthChange}  value={val}  /> */}
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-1">
            <Col lg={3} xs={12} sm={12} md={6}>
              <Form.Label>Deck Height:</Form.Label>
            </Col>
            <Col lg={6} xs={12} sm={12} md={6}>
              <Controller
                name="Deckheight"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Select
                    value={deckValue} 
                    aria-label="Default select example"
                    className={
                      errors.Deckheight ? "form-select-error" : "form-select"
                    }
                    onChange={(e) => {
                      handleDepthChange(e);
                      field.onChange(e);
                    }}
                  >
                    <SelectOptions data={metaData?.Deckheight}/>
                  </Form.Select>
                )}
                rules={{ required: "Please select Deck height" }}
              />
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.Deckheight?.message}
              </p>
            </Col>
          </Form.Group>
          {textbox ? (
            <div>
              <Form.Group as={Row} className="mb-1">
                <Col lg={3} xs={12} sm={12} md={6}>
                  <Form.Label>Joint Type:</Form.Label>
                </Col>
                <Col lg={6} xs={12} sm={12} md={6}>
              <Controller
                name="JointType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Select
                    value={JointType} 
                    aria-label="Default select example"
                    className={
                      errors.JointType ? "form-select-error" : "form-select"
                    }
                    onChange={(e) => {
                      handleJointtypeChange(e);
                      field.onChange(e);
                    }}
                  >
                    <SelectOptions data={metaData?.JointType}/>
                  </Form.Select>
                )}
                rules={{ required: "Please select Joint Type" }}
              />
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.JointType?.message}
              </p>
            </Col>
              </Form.Group>
            </div>
          ) : (
            <></>
          )}
          <div id="shape">
            {leftshape ? (
              <Form.Group as={Row}>
                <Col lg={3} xs={12} sm={12} md={6}>
                  <Form.Label>Left Wing Length:</Form.Label>
                </Col>
                <Col lg={6} xs={12} sm={12} md={6}>
                  <Controller
                    name="leftwinglength"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Form.Control
                        type="number"
                        value={leftwinglength}
                        onChange={(e) => {
                          field.onChange(e);
                          handleLeftWingLengthChange(e);
                        }}
                        style={{
                          borderColor: errors.leftwinglength ? "red" : "",
                        }}
                      />
                    )}
                    rules={{ required: "Please fill the length" }}
                  />
                  <p style={{ color: "red", fontSize: 10 }}>
                    {errors.leftwinglength?.message}
                  </p>
                </Col>
              </Form.Group>
            ) : (
              <></>
            )}
            {rightshape ? (
              <Form.Group as={Row}>
                <Col lg={3} xs={12} sm={12} md={6}>
                  <Form.Label>Right Wing Length:</Form.Label>
                </Col>
                <Col lg={6} xs={12} sm={12} md={6}>
                  <Controller
                    name="rightwinglength"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Form.Control
                        type="number"
                        value={rightwinglength}
                        onChange={(e) => {
                          field.onChange(e);
                          handleRightWingLengthChange(e);
                        }}
                        style={{
                          borderColor: errors.rightwinglength ? "red" : "",
                        }}
                      />
                    )}
                    rules={{ required: "Please fill the length" }}
                  />
                  <p style={{ color: "red", fontSize: 10 }}>
                    {errors.rightwinglength?.message}
                  </p>
                </Col>
              </Form.Group>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default UnitFeature;
