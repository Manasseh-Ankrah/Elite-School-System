import React, { useEffect } from "react";
import "../../css/ViewCourse.css";
import { Paper, Button, CircularProgress, IconButton, Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Search from "@mui/icons-material/Search";
import Pen from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CourseModal from "./CourseModal";
import { useStateValue } from "../../State/StateProvider";
import Save from "@mui/icons-material/Save";
import axios from "../../axios";
import {CourseTable} from "../Course_Section/CourseTable";
import Random from "random-number";

// import Paper from "@mui/material/Paper";
// import TableInfo from "./TableInfo";

const courseCats = [
  {
    value: "Science",
  },
  {
    value: "Mathematics",
  },
  {
    value: "Social Sience",
  },
];

function ViewCourse() {
  const [courseTitle, setCourseTitle] = React.useState("");
  const [courseCategory, setCourseCategory] = React.useState("");
  const [courseCode, setCourseCode] = React.useState("001");
  const [{ adminToken, admin,courseState }, dispatch] = useStateValue();


  const getCourseData = async () => {
    const req = await axios.get("/course/");
    // console.log(req);
    dispatch({
      type: "GET_COURSE_DATA",
      item: {
        courseState: req.data,
      },
    });
  };
  useEffect(() => {
    getCourseData();
  }, []);
  console.log(courseState);



  const changeCourse = (event) => {
    setCourseTitle(event.target.value);
  };
  const changeCourseCat = (event) => {
    setCourseCategory(event.target.value);
  };

// onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!courseTitle || !courseCategory ) {
      alert("Fill all the form");
    } else if (!courseTitle) {
      alert("Enter a course");
    } else if (!courseCategory) {
      alert("Select a Category");
    }  else {
      try {
        const newCourse = { 
           "courseTitle": courseTitle,
           "courseCategory": courseCategory, 
           "courseCode": courseCode + courseState.length
          };
        await axios.post("/course/register", newCourse).then((res)=> {
          // console.log(res.data);
          dispatch({
            type: "GET_COURSE_DATA",
            item: {
              courseState: [...courseState,res.data],
            },
          });
          // alert("Registration Succesful!!")
          setCourseTitle("");
          setCourseCategory("");
        }).catch((err)=> {
          alert(err);
        })
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className="viewCourse">
      <Paper className="viewCourse_paper" elevetion={3}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          className="viewCourse_box "
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Course Name"
              id="outlined-size-normal"
              value={courseTitle}
              className="viewCourse_input"
              onChange={changeCourse}
            />
          </div>

          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Course Category"
              value={courseCategory}
              onChange={changeCourseCat}
              className="viewCourse_input"
            >
              {courseCats.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="btn_search">
            <Button
              onClick={onSubmit}
              variant="contained"
              startIcon={<Save />}
              className="save"
              // color="success"
            >
              Save
            </Button>
          </div>
        </Box>
      </Paper>

      <div className="viewCourse_results">
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="results_text"
        >
          Saved Courses
        </Typography>
      </div>


      {courseState === null ? 
<div style={{textAlign:"center", marginTop:50}}>
    {/* import CircularProgress from "@mui/material/CircularProgress"; */}
   {/* <CircularProgress /> */}
   {/* <img src={Loader}/> */}
   <p>Fetching Data from server....</p>
  </div>
  :
  <div>
  <Box
 component="main"
 >
 <Container maxWidth={false} className="Tbl-box">
   <Box >
     <CourseTable courses={courseState} />
   </Box>
 </Container>
</Box>
 </div>
  }
    </div>
  );
}

export default ViewCourse;
