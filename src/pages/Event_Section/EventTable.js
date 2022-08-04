import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../axios";


import "../../css/StaffTable.css"
// import {customers} from './customerData';

// import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/getInitials';
import { useStateValue } from '../../State/StateProvider';
import EventModal from './EventModal';

// StudentTable props { customers, ...rest }
export const EventTable = ({ events, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [{ adminToken, admin, eventState }, dispatch] = useStateValue();

  const handleSelectAll = (e) => {
    let newSelectedCustomerIds;
    if (e.target.checked) {
      newSelectedCustomerIds = e.map((event) => event._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (e, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

    // Delete Student function
    const deleteEvent = (id) => {
      dispatch({
        type: "GET_EVENT_DATA",
        item: {
          eventState: eventState.filter((event) => event._id !== id),
        },
      });
    };

      // function responsible for DELETE request
  const onDelete = (id) => {
    console.log("Clicked");
    console.log(id);
    axios({
      method: "delete",
      url: `/event/${id}`,
    });
    deleteEvent(id);
  };

  return (
    <Card {...events}>
      <PerfectScrollbar>
        <Box className='tbl_box' >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                Event
                </TableCell>
                <TableCell>
                Date
                </TableCell>
                <TableCell>
                Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.slice(0, limit).map((eventObj) => (
                <TableRow
                  hover
                  key={eventObj._id}
                  selected={selectedCustomerIds.indexOf(eventObj._id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(e) => handleSelectOne(e, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={eventObj.event}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(eventObj.event)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {eventObj.event}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {eventObj.eventDate}
                  </TableCell>
                  <TableCell align="left">
                    <div className="option_btn">
                    <Tooltip title="Delete Course">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "red" }}
                        onClick={()=> onDelete(eventObj._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      </Tooltip>
                      {/* Event Modal */}
                      <EventModal
                        id={eventObj._id}
                        completed={eventObj.completed}
                        // date={eventObj.eventDate}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={events.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

EventTable.propTypes = {
  events: PropTypes.array.isRequired
};
