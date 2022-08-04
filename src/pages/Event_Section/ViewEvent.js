import React, { useEffect } from "react";
import "../../css/ViewEvent.css";
import { Paper, Button, IconButton, Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Save from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EventModal from "./EventModal";
import axios from "../../axios";
import { useStateValue } from "../../State/StateProvider";
import { EventTable } from "./EventTable";

function ViewEvent() {
  const [event, setEvent] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [completed, setCompleted] = React.useState(false);
  const [{ adminToken, admin, eventState }, dispatch] = useStateValue();
  

  const getEventData = async () => {
    const req = await axios.get("/event/");
    dispatch({
      type: "GET_EVENT_DATA",
      item: {
        eventState: req.data,
      },
    });
  };
  useEffect(() => {
    getEventData()  
  }, [])
  console.log(eventState);
  



  const changeEvent = (event) => {
    setEvent(event.target.value);
  };
  const changeDate = (event) => {
    setEventDate(event.target.value);
  };

  // onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!event || !eventDate ) {
      alert("Fill all the form");
    } else if (!event) {
      alert("Enter a event");
    } else if (!eventDate) {
      alert("Select a date");
    }  else {
      try {
        const newEvent = { 
           "event": event,
           "eventDate": eventDate, 
           "completed":completed 
          };
        await axios.post("/event/register", newEvent).then((res)=> {
          dispatch({
            type: "GET_EVENT_DATA",
            item: {
              eventState: [...eventState,res.data],
            },
          });
          // alert("Inserted a new object >>",newEvent)
          setEvent("");
          setEventDate("");
        }).catch((err)=> {
          alert(err);

        })
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className="viewEvent">
      <Paper className="viewEvent_paper" elevetion={3}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          className="viewEvent_box"
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Event"
              id="outlined-size-normal"
              value={event}
              className="viewEvent_input"
              onChange={changeEvent}
            />
          </div>
          <div>
            <TextField
              id="outlined-size-normal"
              value={eventDate}
              type="date"
              className="viewEvent_input"
              onChange={changeDate}
            />
          </div>{" "}
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

      <div className="viewEvent_results">
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="results_text"
        >
          Events List
        </Typography>
      </div>



      {eventState === null ? 
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
     <EventTable events={eventState} />
   </Box>
 </Container>
</Box>
 </div>
  }
    </div>
  );
}

export default ViewEvent;
