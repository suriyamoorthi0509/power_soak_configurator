import React, { component } from "react";
import "../CSS/Login.css";
import usericon from "../Images/user-icon.png";
import lockicon from "../Images/lock-icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

function Login() {
  const Navigation = useNavigate();
  var isinternaluser = JSON.parse(process.env.REACT_APP_INTERNAL_USER);
  // var isinternaluser = true

  let history = useNavigate();
  const initialvalues = { emailaddress: "", password: "" };
  const [formValues, setFormvalues] = useState(initialvalues);
  const [fromErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [invalid, setInvalid] = useState("");
  const [loginShow, setLoginShow] = useState(true);
  const [Otp, setOTP] = useState("");
  const [otpValues, setOtpValues] = useState({});
  const [responceOtp, setResponceOtp] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleRegister = () => setShow(true);
  // const handleRegister = () => {
  //   Navigation("/New")
  // }

  const handleinput = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

   
// empty validation registration.....
    if (formValues.firstName == null || formValues.firstName == "") {
      alert("Please Enter First Name");

      return;
    } else if (formValues.lastName == null || formValues.lastName == "") {
      alert("Please Enter Last Name");

      return;
    } else if (
      formValues.registerEmailaddress == null ||
      formValues.registerEmailaddress == ""
    ) {
      alert("Please Enter Email Address");
      return;
    } else if (
      formValues.registerPassword == null ||
      formValues.registerPassword == ""
    ) {
      alert("Please Enter Password ");
      return;
    } else if (formValues.password == null || formValues.password == "") {
      alert("Please Enter Confirm Password");
      return;
    } else if (formValues.password !== formValues.registerPassword) {
      alert("Both Password and Confirm Password should be same");
      return;
    }

    var config = {
      method: "post",
      url: process.env.REACT_APP_CURRENT_SERVER_URL+':5000/api/PSA/CheckEmail',
      headers: {
        "Content-type": "application/json",
      },
      data: {
        useremail: formValues.registerEmailaddress,
      },
    };
    axios(config).then(function (response) {
      if (response?.data?.EmailData == "Email Not Exists") {
        alert(
          `An OTP sent to your Registered Mail id. Please click "OK" to enter the OTP`
        );
        setOtpValues(formValues);
        setShow(false);
        setLoginShow(false);
        ValidateEmail(formValues);
      
      } else {
        alert("Email Already Exists");
        setShow(false);
      }
    });
    // isinternal user cheking 
    // if (isinternaluser) {
    //   if (
    //     formValues.registerEmailaddress.includes("@electroluxprofessional.com")
    //   ) {
    //     // alert("Registration completed successfully");
    //     registeruser(formValues);
    //   } else {
    //     alert("Please Enter Valid Email");
    //   }
    // } else {
    //   alert("Registration completed successfully");
    //   registeruser(formValues);
    // }
  };

  useEffect(() => {
    if (Object.keys(fromErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [fromErrors]);

  const registeruser = (values) => {
    var config = {
      method: "post",   
       url:  process.env.REACT_APP_CURRENT_SERVER_URL+':5000/api/PSA/registeruser',
      headers: {
        "Content-type": "application/json",
      },
      data: {
        
        useremail: formValues.registerEmailaddress,
        userpassword: formValues.registerPassword,
        userfname: formValues.firstName,
        userlname: formValues.lastName,
        role: formValues.role,
        isinternaluser: JSON.parse(process.env.REACT_APP_INTERNAL_USER),
        // isinternaluser:false
      },
     
    };

    console.log(formValues.registerEmailaddress,"formValues.registerEmailaddress")

    axios(config)
      .then(function (response) {
        if (
          (response.status == 200 && response.data == "Invalid user") ||
          response.data == "Invalid user Exception"
        ) {
          setInvalid("Invalid Register Details");
        }
        if (
          response.status == 200 &&
          response.data == "User Added successfully"
        ) {
          // alert("User Created Successfully")
          handleClose();
        } else {
          // alert(response.data);
        }
      })
      .catch(function (error) {
        console.log("Invalid Details");
        handleClose();
      });
  };

  // otp validation by asan
  const ValidateEmail = () => {
    var config = {
      method: "post",
       url: process.env.REACT_APP_CURRENT_SERVER_URL+':5000/api/PSA/ValidateEmail',
      headers: {
        "Content-type": "application/json",
      },
      data: {
        useremail: formValues.registerEmailaddress,
        userfname: formValues.firstName,
        userlname: formValues.lastName,
      },
    };
    axios(config).then((response) => {
      setResponceOtp(response?.data?.ValidationData);
    });
  };

  // check opt done by asan
  const handleOtpValidator = () => {
    if (Otp === responceOtp) {
      var config = {
        method: "post",
        url: process.env.REACT_APP_CURRENT_SERVER_URL +':5000/api/PSA/ValidateEmail',
        headers: {
          "Content-type": "application/json",
        },
        data: {
          Input: otpValues?.registerEmailaddress,
          firstname: otpValues?.firstName,
          lastname: otpValues?.lastName,
          Response: Otp,
        },
      };
      axios(config).then((responce) => {
        if (responce?.status === 200) {
          setLoginShow(true);
          alert("Register Sucessfully");
        }
      });
      registeruser();
    } else {
      alert("Please enter the correct OTP");
    }
  };

  const loginps = (values) => {
    var config = {
      method: "post",
       url: process.env.REACT_APP_CURRENT_SERVER_URL+':5000/api/PSA/login',
      headers: {
        "Content-type": "application/json",
      },
      data: {
        useremail: formValues.emailaddress,
        userpassword: formValues.password,
      },
    };
    axios(config)
      .then(function (response) {
        if (
          response.status == 200 &&
          (response.data.LoginData == "Invalid user" ||
            response.data.LoginData == "Invalid user Exception")
        ) {
          setInvalid("Invalid Login Details");
        } else if (
          response.status == 200 &&
          response.data != null &&
          response.data.LoginData != null &&
          response.data.LoginData.role != null
        ) {
          setInvalid(
            "Valid user - Is Internal user: " +
              response.data.LoginData.isinternaluser
          );
          localStorage.setItem(
            "isinternaluser",
            response.data.LoginData.isinternaluser
          );
          localStorage.setItem("useremail", response.data.LoginData.useremail);
          history("/homepage");
        }
      })
      .catch(function (error) {
        console.log("Invalid config");
      });
  };
  const validate = (values) => {
    const errors = {};

    if (!values.emailaddress) {
      errors.emailaddress = "Email Address is required!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
  };

  return (
    <>
      <div className="signinbackground">
        {loginShow ? (
          <div className="box">
            <div className="welcomenote">
              <h5>Welcome Back</h5>
              <p className="credential">
                Enter your credentials to access your account
              </p>
            </div>
            <form onSubmit={handleSubmit} style={{ margintop: "2rem" }}>
              <div className="form-group">
                <label className="label">Email Address</label>
                <input
                  type="text"
                  name="emailaddress"
                  className="form-control"
                  placeholder="Enter your Email Address"
                  value={formValues.emailaddress}
                  onChange={handleinput}
                />
                <img src={usericon} className="usericon" />
              </div>
              <p className="error">{fromErrors.emailaddress}</p>
              <div className="form-group">
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={handleinput}
                />
                <img src={lockicon} className="lockicon" />
              </div>
              <p className="error">{fromErrors.password}</p>
              <div className="parentButton">
                <button
                  type="button"
                  onClick={loginps}
                  className="Signinbutton"
                >
                  Sign In
                </button>
              </div>
              <div className="Button1">
                <button
                  type="button"
                  onClick={handleRegister}
                  className="Signinbutton"
                >
                  Register
                </button>
              </div>
              <div className="welcomeerror">{invalid}</div>
            </form>

            {/* Registeration Popup  */}

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              centered
              className="modal"
            >
              <Modal.Body>
                <div>
                  <h2 className="welcomenote ">Register</h2>

                  <form onSubmit={handleSubmit1} style={{ margintop: "2rem" }}>
                    <div className="User">
                      <label className="label">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="Enter your First Name"
                        value={formValues.firstName}
                        onChange={handleinput}
                      />
                      <img src={usericon} className="usericon1" />
                    </div>
                    {/* <p className="error">{fromErrors.emailaddress}</p> */}

                    <div className="User">
                      <label className="label">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Enter your Last Name"
                        value={formValues.lastName}
                        onChange={handleinput}
                      />
                      <img src={usericon} className="usericon1" />
                    </div>

                    <div className="User">
                      <label className="label">Email Address</label>
                      <input
                        type="text"
                        name="registerEmailaddress"
                        className="form-control"
                        placeholder="Enter your Email Address"
                        value={formValues.registerEmailaddress}
                        onChange={handleinput}
                        pattern=""
                      />
                      <img src={usericon} className="usericon1" />
                    </div>
                    <div className="User">
                      <label className="label">Password</label>
                      <input
                        type="password"
                        name="registerPassword"
                        className="form-control"
                        placeholder="Enter your Password"
                        value={formValues.registerPassword}
                        onChange={handleinput}
                      />
                      <img src={lockicon} className="lockicon1" />
                    </div>
                    <div className="User">
                      <label className="label">Confirm Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={formValues.confirmPassword}
                        onChange={handleinput}
                      />
                      <img src={lockicon} className="lockicon1" />
                    </div>
                    <div className="parentButton">
                      <button
                        disabled={!formValues}
                        type="button"
                        onClick={handleSubmit1}
                        className="Signinbutton"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </Modal.Body>
            </Modal>

            {/* <UserRegister/> */}
          </div>
        ) : (
          <div className="box1">
            <div className="EmailShow">
              Your Email id is : {formValues.registerEmailaddress}
            </div>
            <input
              type="text"
              name="OTP"
              className="form-control"
              placeholder="Enter Your OTP"
              value={Otp}
              onChange={(e) => setOTP(e.target.value)}
            />
            <div className="Button2">
              <button
                type="button"
                className="Signinbutton"
                onClick={handleOtpValidator}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Login;
