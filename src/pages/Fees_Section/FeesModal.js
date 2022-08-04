import React, { useEffect, useState } from "react";
import "../../css/FeesModal.css";
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
import MoneyIcon from "@mui/icons-material/AttachMoney";
import axios from "../../axios";
import { useStateValue } from "../../State/StateProvider";

// Level select Object
const methods = [
  {
    value: "Cheque",
  },
  {
    value: "Cash",
  },
  {
    value: "Momo",
  },
];

// Course select Object
const courses = [
  {
    value: "Database",
  },
  {
    value: "Software-Eng.",
  },
  {
    value: "Computer-Science",
  },
  {
    value: "Networking",
  },
  {
    value: "Web-Development",
  },
  {
    value: "Cyber-Security",
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

const FeesModal = ({ fName, lName, id, dob, course, level }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   NEW
  const [date, setDate] = React.useState("");
  const [amount, setAmount] = React.useState();
  const [words, setWords] = React.useState();
  const [method, setMethod] = React.useState();
  const [paidFees, setPaidFees] = React.useState(false);
  const [{ adminToken, admin, studentState }, dispatch] = useStateValue();


  const changeDate = (event) => {
    setDate(event.target.value);
  };

  const changeAmount = (event) => {
    setAmount(event.target.value);
  };
  //   const changeDate = (event) => {
  //     setUpdateDate(event.target.value);
  //   };
  const changeWords = (event) => {
    setWords(event.target.value);
  };
  const changeMethod = (event) => {
    setMethod(event.target.value);
  };

  const onUpdate = (e) => {
    e.preventDefault();

    const editfees =   
    {
      fees: amount,
    }

    axios({
      method: "patch",
      url: `fees/${id}`,
      data: editfees,
    });

    let state = [...studentState];
    console.log("StudentState",state );
    const requiredState = state.filter((stud) => stud._id === id);
    // let finalFees = requiredState[0].regFees + amount;


    dispatch({
      type: "GET_STUDENT_DATA",
      item: {
        studentState: requiredState[0].regFees + Number(amount)
      },
    });

    handleClose();

  };

  return (
    <div>
      <div className="btn_search">
        <Button
          onClick={handleOpen}
          variant="contained"
          startIcon={<MoneyIcon style={{ fontSize: 15 }} />}
          style={{ backgroundColor: paidFees ? "green" : "red" }}
          className="pay"
          //   color={paidFees ? "success" : "danger"}
        >
          {paidFees ? "Paid" : "Pay"}
        </Button>
      </div>

      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Paper className="fees_modal_paper">
          {/* <h2 id="unstyled-modal-title">Text in a modal</h2> */}
          {/* <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p> */}
          <Typography
            style={{ marginTop: 20, marginBottom: 10, color: "gray" }}
            variant="h5"
            component="p"
          >
            {fName} {lName} - {level}
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
                id="outlined-size-normal"
                value={date}
                type="date"
                className="modal_input"
                onChange={changeDate}
              />
            </div>

            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Payment Method"
                value={method}
                onChange={changeMethod}
                // helperText="Please select your currency"
                className="modal_input"
              >
                {methods.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>

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
                label="Amount-Figure"
                id="outlined-size-normal"
                value={amount}
                className="modal_input"
                onChange={changeAmount}
              />
            </div>
            <div>
              <TextField
                label="Amount-Words"
                id="outlined-size-normal"
                value={words}
                className="modal_input"
                onChange={changeWords}
              />
            </div>
          </Box>

          <Button variant="contained" onClick={onUpdate}>
            Confirm Payment
          </Button>
        </Paper>
      </StyledModal>
    </div>
  );
};

export default FeesModal;
