import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "../axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, Button, Divider, Paper, Typography } from "@mui/material";
import { useStateValue } from "../State/StateProvider";
import Logo from "../images/ncc_logo.png";
// import ErrorNotice from "./ErrorNotice";
import "../css/Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [displayName, setDisplayName] = useState("");
  const history = useNavigate();
  const [{ adminToken, admin }, dispatch] = useStateValue();
  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   console.log(admin.displayName);
  //   if (admin.displayName) {
  //     history("/home");
  //   }
  // }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password || !passwordCheck || !displayName) {
      alert("Fill all the form");
    } else if (!email.includes("@")) {
      alert("Enter a valid email address");
    } else if (password !== passwordCheck) {
      alert("Enter the same password twice for verification");
    } else if (password.length < 5 || passwordCheck.length < 5) {
      alert("Password should not be less than 5 characters");
    } else {
      try {
        const newAdmin = { email, password, passwordCheck, displayName } ;
        const registerResponse = await axios.post("/admin/register", newAdmin)
          .then((res) => {
            // setLoader(true);
            alert("New account was sucessful");
            setEmail("");
            setPassword("");
            setPasswordCheck("");
            setDisplayName("");
            // setLoader(false);
          })
          .catch((err) => {
            alert("Registeration was not Successful");
            setLoader(false);
            // setPassword("");
          });

        // history("/home");
      } catch (err) {
        console.log(err);
        setLoader(false);
      }
    }
  };
  console.log(adminToken, admin);

  return (
    <div className="register">
      <Paper className="register__card" elevation={3}>
        <div className="register__container">
          {/* <Typography className="register__text" variant="h5" component="h5">
            Results Checker
          </Typography>
          <Divider />

          <img src={Logo} alt="logo" /> */}

          <div className="register__form">
            <TextField
              className="register__input"
              required
              id="outlined"
              label="Email"
              value={email}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className="register__input"
              id="outlined-password-input"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              className="register__input"
              id="outlined-password-input"
              label="Repeat Password"
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <TextField
              className="register__input"
              required
              id="outlined"
              label="Username"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <Button
              className="register__btn"
              variant="contained"
              style={{
                marginTop: 20,
                width: 200,
                height: 50,
              }}
              onClick={submit}
            >
              <p> Save</p>
            </Button>
            {/* <p className="login__text__login">
              Already have an account ? ... <Link to="/">Login</Link>
            </p> */}
          </div>
        </div>
      </Paper>
    </div>
  );
}
export default Register;
