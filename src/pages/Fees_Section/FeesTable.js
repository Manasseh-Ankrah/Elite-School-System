import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import DeleteIcon from "@mui/icons-material/Delete";
import StudentModal from "../Student_Section/StudentModal"; 
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
import FeesModal from './FeesModal';

// StudentTable props { customers, ...rest }
export const FeesTable = ({ students, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [{ adminToken, admin, feeState }, dispatch] = useStateValue();

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    if (event.target.checked) {
      newSelectedCustomerIds = students.map((student) => student._id);
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
    const deleteCourse = (id) => {
      dispatch({
        type: "GET_FEES_DATA",
        item: {
          feeState: feeState.filter((fee) => fee._id !== id),
        },
      });
    };

      // function responsible for DELETE request
  const onDelete = (id) => {
    console.log("Clicked");
    console.log(id);
    axios({
      method: "delete",
      url: `/fees/${id}`,
    });
    deleteCourse(id);
  };

  return (
    <Card {...students}>
      <PerfectScrollbar>
        <Box className='tbl_box' >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                Name
                </TableCell>
                <TableCell>
                Level
                </TableCell>
                <TableCell>
                Reg.Fee
                </TableCell>
                <TableCell>
                Remaining
                </TableCell>
                <TableCell>
                Balance
                </TableCell>
                <TableCell>
                Pay Fees
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.slice(0, limit).map((student) => (
                <TableRow
                  hover
                  key={student._id}
                  selected={selectedCustomerIds.indexOf(student._id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={student.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(student.fName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {student.fName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {student.level}
                  </TableCell>
                  <TableCell>
                    {student.regFees}
                  </TableCell>
                  <TableCell>
                    {student.remaining}
                  </TableCell>
                  <TableCell>
                    {student.balance}
                  </TableCell>
                  <TableCell align="left">
                    <div className="option_btn">
                    <Tooltip title="Delete staff">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "red" }}
                        onClick={()=> onDelete(student._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      </Tooltip>
                      {/* <Tooltip title="Edit staff"> */}
                      <FeesModal
                        id={student._id}
                        courseName={student.courseTitle}
                        category={student.courseCategory}
                        // role={staff.role}
                        // qualification={staff.qualification}
                        // salary={staff.salary}
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
        count={students.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

FeesTable.propTypes = {
    students: PropTypes.array.isRequired
};
