import React, { useEffect } from "react";
import "../../css/AdjustFees.css";
import { Paper, Button, CircularProgress, IconButton, Container, FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
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
// import CourseModal from "./CourseModal";
import { useStateValue } from "../../State/StateProvider";
import Save from "@mui/icons-material/Save";
import axios from "../../axios";
// import {CourseTable} from "../Course_Section/CourseTable";
import Random from "random-number";
import { AdjustFeesTable } from "./AdjustFeesTable";

// import Paper from "@mui/material/Paper";
// import TableInfo from "./TableInfo";

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

function AdjustFees() {
  const [level, setLevel] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [{ adminToken, admin,feeSetupState }, dispatch] = useStateValue();


  const getFeeSetupData = async () => {
    const req = await axios.get("/fee_setup/");
    // console.log(req);
    dispatch({
      type: "GET_FEESETUP_DATA",
      item: {
        feeSetupState: req.data,
      },
    });
  };
  useEffect(() => {
    getFeeSetupData();
  }, []);
//   console.log(feeSetupState);



  const changeLevel = (event) => {
    setLevel(event.target.value);
  };
  const changeAmount = (event) => {
    setAmount(event.target.value);
  };

// onSubmit
  const onSubmit = async (e) => {
    //   console.log(level);
    //   console.log(amount);
    e.preventDefault();
    if (!level || !amount ) {
      alert("Fill all the form");
    } else if (!level) {
      alert("Enter a course");
    } else if (!amount) {
      alert("Select a Category");
    }  else {
      try {
        const newSetup = { 
           "level": level,
           "amount": amount, 
          };
        await axios.post("/fee_setup/register", newSetup).then((res)=> {
          dispatch({
            type: "GET_FEESETUP_DATA",
            item: {
              feeSetupState: [...feeSetupState,res.data],
            },
          });
          setLevel("");
          setAmount("");
        }).catch((err)=> {
          alert(err);
        })
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className="AdjustFees">
      <Paper className="AdjustFees_paper" elevetion={3}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          className="AdjustFees_box "
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
              className="AdjustFees_input"
            >
              {levels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>

        <FormControl className="AdjustFees_input">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={amount}
            onChange={changeAmount}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>

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

      <div className="AdjustFees_results">
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="results_text"
        >
          Fees Setup
        </Typography>
      </div>


      {feeSetupState === null ? 
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
     <AdjustFeesTable setups={feeSetupState} />
   </Box>
 </Container>
</Box>
 </div>
  }
    </div>
  );
}

export default AdjustFees;
