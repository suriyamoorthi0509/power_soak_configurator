import React from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import ReactHintFactory from "react-hint";
import Popup from "reactjs-popup";
import SelectOptions from "../commonComponent/SelectOptions";
export default function OrientationPanel(props) {
    const ReactHint = ReactHintFactory(React);
    const { control, OrientationValue, errors, handleOrientationChange, metaData, Drying_Rack,
        configuration, handleConfigurationChange, jobName, handleProjectName, consultantname, handleConsultantName } = { ...props }
    return (<Container fluid>
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
                                    {...field}
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
                                    <SelectOptions data={metaData?.Orientation}/>
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
                                    {...field}
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
                                    <SelectOptions data={metaData?.Configuration}/>
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
                            name="jobName"

                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Form.Control
                                    name="jobName"
                                    {...field}
                                    value={jobName}
                                    onChange={(e) => {
                                        handleProjectName(e);
                                        field.onChange(e);
                                    }}
                                   
                                    style={{ borderColor: errors.jobName ? "red" : "" }}
                                />
                            )}
                            rules={{ required: "Jobname name required" }}
                        />
                        <p style={{ color: "red", fontSize: 10 }}>
                            {errors.jobName?.message}
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
                                    {...field}
                                    value={consultantname}
                                    onChange={(e) => {
                                        handleConsultantName(e);
                                        field.onChange(e);
                                    }}
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
    </Container>)
}