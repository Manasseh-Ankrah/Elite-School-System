import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "../../axios";
import Box from "@mui/material/Box";
import Login from "../Login";
import "../../css/RegisterStudent.css";
import TextField from "@mui/material/TextField";
import M from "materialize-css";
import {
  Alert,
  Button,
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { PhotoCamera } from "@mui/icons-material";
import Save from "@mui/icons-material/Save";

import { styled } from "@mui/material/styles";
import { useStateValue } from "../../State/StateProvider";

// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import MobileDatePicker from "@mui/lab/MobileDatePicker";

// Gender select Object
const genders = [
  {
    value: "Male",
  },
  {
    value: "Female",
  },
];

// Course select Object
const courses = [
  {
    value: "Database",
  },
  {
    value: "Software Eng.",
  },
  {
    value: "Computer Science",
  },
  {
    value: "Networking",
  },
  {
    value: "Web Development",
  },
  {
    value: "Cyber Security",
  },
];

// Level select Object
const levels = [
  {
    value: "Diploma",
  },
  {
    value: "Advanced Diploma",
  },
  {
    value: "NCC-Level 3",
  },
  {
    value: "NCC-Level 4",
  },
  {
    value: "NCC-Level 5",
  },
  {
    value: "NCC-Level 6",
  },
];

// Duration select Object
const durations = [
  {
    value: "3 Months",
  },
  {
    value: "6 Months",
  },
  {
    value: "1 Year",
  },
  {
    value: "2 Years",
  },
];

// Duration select Object
const courseCodes = [
  {
    value: "001101",
  },
  {
    value: "001102",
  },
  {
    value: "001103",
  },
  {
    value: "001104",
  },
  {
    value: "001105",
  },
  {
    value: "001106",
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [dateValue, setDateValue] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [{ adminToken, admin, studentState }, dispatch] = useStateValue();


  // Biodata Tabpanel State
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [date, setDate] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [regFees, setRegFees] = React.useState(0);
  const [image, setImage] = React.useState("");

  // Course Tabpanel State
  const [courseTitle, setCourseTitle] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [courseCode, setCourseCode] = React.useState("");

  // Course Tabpanel State
  const [sponsorFName, setSponsorFName] = React.useState("");
  const [sponsorLName, setSponsorLName] = React.useState("");
  const [sponsorEmail, setSponsorEmail] = React.useState("");
  const [sponsorTelephone, setSponsorTelephone] = React.useState("");

  // Onchange Event Handlers for Biodata Tabpanel
  const changeFName = (event) => {
    setFName(event.target.value);
  };

  const changeLName = (event) => {
    setLName(event.target.value);
  };

  const changeGender = (event) => {
    setGender(event.target.value);
  };

  const changeDate = (event) => {
    setDate(event.target.value);
  };

  const changeNationality = (event) => {
    setNationality(event.target.value);
  };

  const changeAddress = (event) => {
    setAddress(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changeTelephone = (event) => {
    setTelephone(event.target.value);
  };

  const changeFees = (event) => {
    setRegFees(event.target.value);
  };

  const changeImage = (event) => {
    setImage(event.target.value);
  };

  // Onchange Event handlers for Course
  const changeCourseTitle = (event) => {
    setCourseTitle(event.target.value);
  };

  const changeLevel = (event) => {
    setLevel(event.target.value);
  };

  const changeDuration = (event) => {
    setDuration(event.target.value);
  };

  const changeCourseCode = (event) => {
    setCourseCode(event.target.value);
  };

  // Onchange Event handlers for Sponsor
  const changeSponsorFName = (event) => {
    setSponsorFName(event.target.value);
  };

  const changeSponsorLName = (event) => {
    setSponsorLName(event.target.value);
  };

  const changeSponsorEmail = (event) => {
    setSponsorEmail(event.target.value);
  };

  const changeSponsorTelephone = (event) => {
    setSponsorTelephone(event.target.value);
  };

// onSubmit
const onSubmit = async (e) => {
  e.preventDefault();
  if (      
    !fName ||
    !lName ||
    !gender ||
    !date ||
    !nationality ||
    !address ||
    !email ||
    !telephone ||
    !regFees ||
    !courseTitle ||
    !courseCode ||
    !level ||
    !duration ||
    !sponsorFName ||
    !sponsorLName ||
    !sponsorEmail ||
    !sponsorTelephone ) {
    alert("Fill all the form");
  } else if (!email.includes("@")) {
    alert("Enter a valid email for Student");
  } else if (!sponsorEmail.includes("@")) {
    alert("Enter a valid email for Sponsor");
  }  else {
    try {
      const newStudent = { 
        "fName": fName,
        "lName": lName,
        "gender": gender,
        "date": date,
        "nationality": nationality,
        "address": address,
        "email": email,
        "telephone": telephone,
        "regFees": regFees,
        "remaining": 0, 
        "balance": 0,
        "courseTitle": courseTitle,
        "courseCode": courseCode,
        "level": level,
        "duration": duration,
        "sponsorFName": sponsorFName,
        "sponsorLName": sponsorLName,
        "sponsorEmail": sponsorEmail,
        "sponsorTelephone": sponsorTelephone, 
        };
      await axios.post("/student/register", newStudent).then(()=> {
        dispatch({
          type: "GET_STUDENT_DATA",
          item: {
            studentState: [...studentState,newStudent],
          },
        });
        alert("Registration Successful !!");
        // <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
        // M.toast({html:"Registration Successful !!"});

        setFName("");
        setLName("");
        setGender("");
        setDate("");
        setNationality("");
        setAddress("");
        setEmail("");
        setTelephone("");
        setRegFees("");
        setImage("");
        setCourseCode("");
        setCourseTitle("");
        setDuration("");
        setLevel("");
        setSponsorTelephone("");
        setSponsorLName("");
        setSponsorFName("");
        setSponsorEmail("");
      }).catch((err)=> {
        alert(err);
      })
    } catch (err) {
      console.log(err);
    }
  }
};

  // Clear handler
  const onCancel = () => {
    setFName("");
    setLName("");
    setGender("");
    setDate("");
    setNationality("");
    setAddress("");
    setEmail("");
    setTelephone("");
    setRegFees("");
    setImage("");
    setCourseCode("");
    setCourseTitle("");
    setDuration("");
    setLevel("");
    setSponsorTelephone("");
    setSponsorLName("");
    setSponsorFName("");
    setSponsorEmail("");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const dataHandler = (newValue) => {
    setDateValue(newValue);
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <Box className="tabbox" sx={{ bgcolor: "background.paper" }}>
      <AppBar position="static" className="appbar">
        <Tabs
          className="tabpanel_element"
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Biodata" {...a11yProps(0)} />
          <Tab label="Course" {...a11yProps(1)} />
          <Tab label="Sponsor" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          // className="tabpanel_element"
          value={value}
          index={0}
          dir={theme.direction}
          // className="swipable_element"
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="box_row_1"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="First Name"
                id="outlined-size-normal"
                value={fName}
                className="input_1"
                onChange={changeFName}
              />
            </div>
            <div>
              <TextField
                label="Last Name"
                id="outlined-size-normal"
                value={lName}
                className="input_1"
                onChange={changeLName}
              />
            </div>
          </Box>
          {/* Second row */}
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="box_row_1"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Gender"
                value={gender}
                onChange={changeGender}
                // helperText="Please select your currency"
                className="input_1"
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                id="outlined-size-normal"
                value={date}
                type="date"
                className="input_1"
                onChange={changeDate}
              />
            </div>
          </Box>

          {/* Third row */}
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="box_row_1"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Nationality"
                id="outlined-size-normal"
                value={nationality}
                className="input_1"
                onChange={changeNationality}
              />
            </div>
            <div>
              <TextField
                label="Address"
                id="outlined-size-normal"
                value={address}
                className="input_1"
                onChange={changeAddress}
              />
            </div>
          </Box>
          {/* Fourth row */}

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="box_row_1"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Email"
                type="email"
                id="outlined-size-normal"
                value={email}
                className="input_1"
                onChange={changeEmail}
              />
            </div>
            <div>
              <TextField
                label="Telephone"
                id="outlined-size-normal"
                value={telephone}
                className="input_1"
                onChange={changeTelephone}
              />
            </div>
          </Box>

          {/* Fifth row */}

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="box_row_1"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Reg. Fee ($)"
                id="outlined-size-normal"
                value={regFees}
                className="input_1"
                onChange={changeFees}
                // style={{marginRight: 25}}
              />
            </div>
            {/* <div className="input_1">
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  value={image}
                  onChange={changeImage}
                />

                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                >
                  Upload Picture
                </Button>
              </label>
            </div> */}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="box_row_1 box_padding"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Course Title"
                value={courseTitle}
                onChange={changeCourseTitle}
                // helperText="Please select your currency"
                className="input_1"
              >
                {courses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Course Code"
                value={courseCode}
                onChange={changeCourseCode}
                // helperText="Please select your currency"
                className="input_1"
              >
                {courseCodes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>

          {/* Second row */}

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="box_row_1"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Level"
                value={level}
                onChange={changeLevel}
                // helperText="Please select your currency"
                className="input_1"
              >
                {levels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Duration"
                value={duration}
                onChange={changeDuration}
                // helperText="Please select your currency"
                className="input_1"
              >
                {durations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="box_row_1"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="First Name"
                id="outlined-size-normal"
                value={sponsorFName}
                className="input_1"
                onChange={changeSponsorFName}
              />
            </div>
            <div>
              <TextField
                label="Last Name"
                id="outlined-size-normal"
                value={sponsorLName}
                className="input_1"
                onChange={changeSponsorLName}
              />
            </div>
          </Box>

          {/* second row */}
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="box_row_1"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Email"
                type="email"
                id="outlined-size-normal"
                value={sponsorEmail}
                className="input_1"
                onChange={changeSponsorEmail}
              />
            </div>
            <div>
              <TextField
                label="Telephone"
                id="outlined-size-normal"
                value={sponsorTelephone}
                className="input_1"
                onChange={changeSponsorTelephone}
              />
            </div>
          </Box>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="icon_div"
            noValidate
            autoComplete="off"
          >
            <div className="btn_register">
            <Tooltip title="Save Details">
              <Button
                onClick={onSubmit}
                variant="contained"
                startIcon={<Save />}
                className="save"
                // color="success"
              >
                Save
              </Button>
              </Tooltip>
            </div>
            <div className="btn_cancel">
            <Tooltip title="Discard all Details">
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                className="cancel"
                onClick={onCancel}
              >
                Discard
              </Button>
              </Tooltip>
            </div>
          </Box>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
