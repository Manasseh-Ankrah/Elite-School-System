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

// Level Category select Object
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

const AdjustFeesModal = ({ id, level, amount}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   NEW
  const [updateLevel, setUpdateLevel] = React.useState(level);
  const [updateAmount, setUpdateAmount] = React.useState(amount);
  const [{ adminToken, admin, feeSetupState }, dispatch] = useStateValue();

  const changeLevel = (event) => {
    setUpdateLevel(event.target.value);
  };
  const changeAmount = (event) => {
    setUpdateAmount(event.target.value);
  };

  const onUpdate = (e) => {
    e.preventDefault();

    console.log(feeSetupState);
    const editFeeSetup =   
    {
      level: updateLevel,
      amount: updateAmount,
  }

    axios({
      method: "patch",
      url: `fee_setup/${id}`,
      data: editFeeSetup,
    });

    let state = [...feeSetupState];
    let requiredState = state.filter((setup) => setup._id === id);
    requiredState[0].level= updateLevel;
    requiredState[0].amount = updateAmount;

    console.log(requiredState);

    dispatch({
      type: "GET_FEESETUP_DATA",
      item: {
        feeSetupState: state
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

            {/* <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Course Category"
                value={updateAmount}
                onChange={changeCategory}
                className="modal_input"
              >
                {courseCats.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div> */}

<div>
            <TextField
              id="outlined-select-currency"
              select
              label="Level"
              value={updateLevel}
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


            <div>
              <TextField
                label="Amount"
                id="outlined-size-normal"
                value={updateAmount}
                className="modal_input"
                onChange={changeAmount}
              />
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

export default AdjustFeesModal;
