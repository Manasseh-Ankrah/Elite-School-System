import React, { useEffect, useState } from "react";
import "../../css/EventModal.css";
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
import { useStateValue } from "../../State/StateProvider";
import axios from "../../axios";

// import axios from "./axios";
// import Pusher from "pusher-js";

// Course Category select Object

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

const EventModal = ({ id, completed }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   NEW
  // const [pending, setPending] = React.useState(false);
  const [{ adminToken, admin, eventState }, dispatch] = useStateValue();


  // const changePending = () => {
  //   // setPending(true);
  //   handleClose();
  // };


  const onUpdate = (e) => {
    e.preventDefault();

    // console.log(requiredState);
    // console.log(completed);
    const editEvent =   
    {
      completed: true,
    }

    axios({
      method: "patch",
      url: `event/${id}`,
      data: editEvent,
    });

    let state = [...eventState];
    let requiredState = state.filter((event) => event._id === id);
    requiredState[0].completed= true;

    dispatch({
      type: "GET_EVENT_DATA",
      item: {
        eventState: state
      },
    });

    handleClose();
  };

  return (
    <div>
       {completed ? 
            <div>
            <div className="btn_search">
              <Button
                onClick={handleOpen}
                variant="contained"
                style={{
                  backgroundColor: completed ? "gray" : "#1976d2",
                }}
                className="pay"
              >
                {completed ? "Completed" : "Pending"}
              </Button>
            </div>
            </div>
      : 
     <div>
      <div className="btn_search">
        <Button
          onClick={handleOpen}
          variant="contained"
          style={{
            backgroundColor: completed ? "gray" : "#1976d2",
          }}
          className="pay"
        >
          {completed ? "Completed" : "Pending"}
        </Button>
      </div>

      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Paper className="event_modal_paper">
          <Typography
            style={{ marginTop: 20, marginBottom: 20 }}
            variant="h5"
            component="h2"
            className="event_h2"
          >
            Mark Event as Completed
          </Typography>

          <Button variant="contained" onClick={onUpdate}>
            Done
          </Button>
        </Paper>
      </StyledModal>
      </div>
      }
    </div>
  );
};

export default EventModal;
