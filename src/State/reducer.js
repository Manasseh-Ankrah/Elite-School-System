export const initialState = {
  adminToken: "",
  admin: {},
  studentState: [],
  staffState: [],
  courseState: [],
  eventState: [],
  feeSetupState: [],
  feeState: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CURRENT_ADMIN":
      return {
        ...state,
        adminToken: action.item.adminToken,
        admin: action.item.admin,
      };
    case "GET_STUDENT_DATA":
      return {
        ...state,
        studentState: action.item.studentState,
      };
    case "GET_STAFF_DATA":
      return {
        ...state,
        staffState: action.item.staffState,
      };
    case "GET_COURSE_DATA":
      return {
        ...state,
        courseState: action.item.courseState,
      };
    case "GET_EVENT_DATA":
      return {
        ...state,
        eventState: action.item.eventState,
      };
    case "GET_FEESETUP_DATA":
      return {
        ...state,
        feeSetupState: action.item.feeSetupState,
      };
    case "GET_FEES_DATA":
      return {
        ...state,
        feeState: action.item.feeState,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
