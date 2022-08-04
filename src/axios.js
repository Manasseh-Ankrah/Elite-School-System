import axios from "axios";

const instance = axios.create({
  baseURL: "https://school-mgt-backend.herokuapp.com/",
  // baseURL: "https://school-mgt-server.herokuapp.com/",
});
export default instance;

// export function deleteCard(id) {
//   axios.delete({
//     baseURL: `http://localhost:8001/tinder/cards/:${id}`,
//   });
// }
