import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "./axios";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";
import { useStateValue } from "./State/StateProvider";
import NotFound from "./pages/NotFound";
import RegisterStudent from "./pages/Student_Section/RegisterStudent";
import RegisterStaff from "./pages/Staff_Section/RegisterStaff";

import ViewStudent from "./pages/Student_Section/ViewStudent";
import Level from "./pages/Student_Section/Level";
import NewSidebar from "./component/NewSidebar";
import ViewStaff from "./pages/Staff_Section/ViewStaff";
import ViewCourse from "./pages/Course_Section/ViewCourse";
import ViewFees from "./pages/Fees_Section/ViewFees";
import ViewEvent from "././pages/Event_Section/ViewEvent";
import AdjustFees from "././pages/Fees_Section/AdjustFees";

// import {StudentTable} from "./pages/Student_Section/StudentTable";

function App() {
  const [{ adminToken, admin, student }, dispatch] = useStateValue();
  // const history = useNavigate();
  // console.log(adminToken, admin);

  // Checked Login Function
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }
    const tokenResponse = await axios.post("admin/tokenIsValid", null, {
      headers: { "x-auth-token": token },
    });

    console.log(tokenResponse.data);

    if (tokenResponse.data) {
      const userRes = await axios.get("admin", {
        headers: { "x-auth-token": token },
      });

      dispatch({
        type: "GET_CURRENT_ADMIN",
        item: {
          adminToken: token,
          admin: userRes.data,
        },
      });
    }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  // const navigate = useNavigate();
  // const PrivateRoute = ({ element: Element, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={(props) => (user ? <Element {...props} /> : navigate("/"))}
  //   />
  // );

  let token = localStorage.getItem("auth-token");
  console.log(token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<NewSidebar page={<Home />} />} />
        {/* <Route path="/" element={<StudentTable />} /> */}
        {/* <Route path="/dashboard" element={<NewSidebar page={<Home />} />} /> */}
        <Route
          path="/register_student"
          element={<NewSidebar page={<RegisterStudent />} />}
        />
        <Route
          path="/view_student"
          element={<NewSidebar page={<ViewStudent />} />}
        />
        {/* <Route path="/level" element={<NewSidebar page={<Level />} />} /> */}
        <Route
          path="/register_staff"
          element={<NewSidebar page={<RegisterStaff />} />}
        />
        <Route
          path="/view_staff"
          element={<NewSidebar page={<ViewStaff />} />}
        />
        <Route
          path="/add_course"
          element={<NewSidebar page={<ViewCourse />} />}
        />
        <Route path="/pay_fees" element={<NewSidebar page={<ViewFees />} />} />
        <Route path="/set_fees" element={<NewSidebar page={<AdjustFees />} />} />
        <Route path="/events" element={<NewSidebar page={<ViewEvent />} />} />
        <Route
          path="/add_account"
          element={<NewSidebar page={<Register />} />}
        />
        <Route path="*" element={<NotFound />} />
        {/* <Route exact path="/upcoming/:user" element={<Upcoming />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
