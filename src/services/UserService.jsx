import axios from "axios";

export default class UserService {
  getById(id) {
    return axios.get("https://localhost:44305/api/User/getbyid?id=" + id);
  }

  register(request) {
    return axios.post("https://localhost:44305/api/User/register", request);
  }

  login(request) {
    return axios.post("https://localhost:44305/api/User/login", request);
  }

  updateUser(user) {
    return axios.post("https://localhost:44305/api/User/updatedetails", user);
  }

  updatePassword(request) {
    return axios.post(
      "https://localhost:44305/api/User/updatepassword",
      request
    );
  }

  checkUserExists(request) {
    return axios.post(
      "https://localhost:44305/api/User/checkuserexists",
      request
    );
  }
}
