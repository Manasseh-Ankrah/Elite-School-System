import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import DeleteIcon from "@mui/icons-material/Delete";
// import StudentModal from "../Student_Section/StudentModal"; 
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
import StaffModal from './StaffModal';

// StudentTable props { customers, ...rest }
export const StaffTable = ({ staff, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [{ adminToken, admin, staffState }, dispatch] = useStateValue();

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    if (event.target.checked) {
      newSelectedCustomerIds = staff.map((staff) => staff._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
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

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

    // Delete Student function
    const deleteStaff = (id) => {
      dispatch({
        type: "GET_STAFF_DATA",
        item: {
          staffState: staffState.filter((staff) => staff._id !== id),
        },
      });
    };

      // function responsible for DELETE request
  const onDelete = (id) => {
    console.log("Clicked");
    console.log(id);
    axios({
      method: "delete",
      url: `/staff/${id}`,
    });
    deleteStaff(id);
  };

  return (
    <Card {...staff}>
      <PerfectScrollbar>
        <Box className='tbl_box' >
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                First
                </TableCell>
                <TableCell>
                Last
                </TableCell>
                <TableCell>
                Role
                </TableCell>
                <TableCell>
                Qual.
                </TableCell>
                <TableCell>
                Salary
                </TableCell>
                <TableCell>
                Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staff.slice(0, limit).map((staff) => (
                <TableRow
                  hover
                  key={staff._id}
                  selected={selectedCustomerIds.indexOf(staff._id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
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
                        src={staff.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(staff.fName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {staff.fName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {staff.lName}
                  </TableCell>
                  <TableCell>
                    {staff.date}
                  </TableCell>
                  <TableCell>
                    {staff.qualification}
                  </TableCell>
                  <TableCell>
                  {staff.salary}
                  </TableCell>
                  <TableCell align="left">
                    <div className="option_btn">
                    <Tooltip title="Delete staff">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "red" }}
                        onClick={()=> onDelete(staff._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      </Tooltip>
                      {/* <Tooltip title="Edit staff"> */}
                      <StaffModal
                        id={staff._id}
                        fName={staff.fName}
                        lName={staff.lName}
                        role={staff.role}
                        qualification={staff.qualification}
                        salary={staff.salary}
                      />
                      {/* </Tooltip> */}
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
        count={staff.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

StaffTable.propTypes = {
  staff: PropTypes.array.isRequired
};
