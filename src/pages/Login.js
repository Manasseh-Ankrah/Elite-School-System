import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "../axios";
import { Alert, Button, Divider, Paper, Typography } from "@mui/material";
import { useStateValue } from "../State/StateProvider";
import Logo from "../images/ncc_logo.png";
// import ErrorNotice from "./ErrorNotice";
import "../css/Login.css";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const [{ adminToken, admin }, dispatch] = useStateValue();
  const history = useNavigate();

  // useEffect(() => {
  //   console.log(admin);

  //   if (admin.id) {
  //     history("/dashboard");
  //   }
  // }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter Login Credentials");
    } else {
      setLoader(true);

      try {
        const loginAdmin = { email, password };
        const loginResponse = await axios
          .post("admin/login", loginAdmin)
          .then((res) => {
            setLoader(true);

            dispatch({
              type: "GET_CURRENT_ADMIN",
              item: {
                adminToken: res.data.token,
                admin: res.data.admin,
              },
            });

            localStorage.setItem("auth-token", res.data.token);
            history("/dashboard");
          })
          .catch((err) => {
            alert("No account has been created with these credentials");
            history("/");
            setLoader(false);
            setPassword("");
          });
          
          console.log(adminToken, admin);
        } catch (err) {
          history("/");
          console.log(err);
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <div className="login">
      <Paper className="login__card" elevation={3}>
        <div className="login__container">
          <Typography
            className="login__text"
            style={{ marginBottom: 20 }}
            variant="h5"
            component="h4"
          >
            Elite School System
          </Typography>
          {/* <Divider />

          {/* <img src={Logo} alt="logo" /> */}

          <div className="login__form">
            <TextField
              className="email"
              required={true}
              id="outlined"
              label="Email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className="pass"
              id="outlined-password-input"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className="login__btn"
              variant="contained"
              style={{
                marginTop: 20,
                width: 200,
                height: 50,
              }}
              onClick={submit}
            >
              {loader ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alighItems: "center",
                    marginRight: 20,
                    marginTop: 4,
                  }}
                >
                  <div>
                    <CircularProgress
                      style={{
                        color: "white",
                        width: 20,
                        height: 20,
                        marginRight: 20,
                      }}
                    />
                  </div>
                  Login
                </div>
              ) : (
                <p> Login</p>
              )}
            </Button>
            {/* <p className="login__text__register">
              Don't have an account ? ... <Link to="/register">Register</Link>
            </p> */}
          </div>
        </div>
      </Paper>
    </div>
  );
}
export default Login;
