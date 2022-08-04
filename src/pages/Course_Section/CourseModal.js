import React, { useEffect, useState } from "react";
import "../../css/StudentModal.css";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import {
  Button,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../../axios";
import { useStateValue } from "../../State/StateProvider";

// Course Category select Object
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

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

// const style = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   width: 600,
//   bgcolor: "background.paper",
//   border: "1px solid #000",
//   p: 2,
//   px: 4,
//   pb: 3,
// };

const CourseModal = ({ id, courseName, category, courseCode }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   NEW
  const [updateCourse, setUpdateCourse] = React.useState(courseName);
  const [updateCategory, setUpdateCategory] = React.useState(category);
  const [{ adminToken, admin, courseState }, dispatch] = useStateValue();

  const changeCourse = (event) => {
    setUpdateCourse(event.target.value);
  };
  const changeCategory = (event) => {
    setUpdateCategory(event.target.value);
  };

  const onUpdate = (e) => {
    e.preventDefault();

    console.log(courseState);
    const editCourse =   
    {
      courseTitle: updateCourse,
      courseCategory: updateCategory,
  }

    axios({
      method: "patch",
      url: `course/${id}`,
      data: editCourse,
    });

    let state = [...courseState];
    let requiredState = state.filter((course) => course._id === id);
    requiredState[0].courseTitle= updateCourse;
    requiredState[0].courseCategory = updateCategory;

    console.log(requiredState);

    dispatch({
      type: "GET_COURSE_DATA",
      item: {
        courseState: state
      },
    });

    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="edit"
        style={{ color: "turquoise" }}
        onClick={handleOpen}
      >
        <EditIcon />
      </IconButton>

      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Paper className="modal__paper">
          {/* <h2 id="unstyled-modal-title">Text in a modal</h2> */}
          {/* <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p> */}
          <Typography
            style={{ marginTop: 20, marginBottom: 20 }}
            variant="h5"
            component="h2"
          >
            Edit Details
          </Typography>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="modal_box"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Course Name"
                id="outlined-size-normal"
                value={updateCourse}
                className="modal_input"
                onChange={changeCourse}
              />
            </div>

            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Course Category"
                value={updateCategory}
                onChange={changeCategory}
                className="modal_input"
              >
                {courseCats.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
          <Button variant="contained" onClick={onUpdate}>
            Save
          </Button>
        </Paper>
      </StyledModal>
    </div>
  );
};

export default CourseModal;
