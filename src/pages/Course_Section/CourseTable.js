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
import CourseModal from './CourseModal';

// StudentTable props { customers, ...rest }
export const CourseTable = ({ courses, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [{ adminToken, admin, courseState }, dispatch] = useStateValue();

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    if (event.target.checked) {
      newSelectedCustomerIds = courses.map((course) => course._id);
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
        type: "GET_COURSE_DATA",
        item: {
          courseState: courseState.filter((course) => course._id !== id),
        },
      });
    };

      // function responsible for DELETE request
  const onDelete = (id) => {
    console.log("Clicked");
    console.log(id);
    axios({
      method: "delete",
      url: `/course/${id}`,
    });
    deleteCourse(id);
  };

  return (
    <Card {...courses}>
      <PerfectScrollbar>
        <Box className='tbl_box' >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                Course
                </TableCell>
                <TableCell>
                Category
                </TableCell>
                <TableCell>
                Code
                </TableCell>
                <TableCell>
                Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.slice(0, limit).map((course) => (
                <TableRow
                  hover
                  key={course._id}
                  selected={selectedCustomerIds.indexOf(course._id) !== -1}
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
                        src={course.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(course.courseTitle)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {course.courseTitle}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {course.courseCategory}
                  </TableCell>
                  <TableCell>
                    {course.courseCode}
                  </TableCell>
                  <TableCell align="left">
                    <div className="option_btn">
                    <Tooltip title="Delete staff">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "red" }}
                        onClick={()=> onDelete(course._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      </Tooltip>
                      {/* <Tooltip title="Edit staff"> */}
                      <CourseModal
                        id={course._id}
                        courseName={course.courseTitle}
                        category={course.courseCategory}
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
        count={courses.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CourseTable.propTypes = {
  courses: PropTypes.array.isRequired
};
