import axios from "axios";

export default class UserService {
  getById(id) {
    return axios.get("https://localhost:44305/api/User/getbyid?id=" + id);
  }
  getByUsername(username) {
    return axios.get(
      "https://localhost:44305/api/User/getbyusername?username=" + username
    );
  }

  addUser(user) {
    return axios.post("https://localhost:44305/api/User/add", user);
  }

  updateUser(user) {
    return axios.post("https://localhost:44305/api/User/update", user);
  }

  updatePassword(id, oldPassword, newPassword) {
    return axios.post(
      `https://localhost:44305/api/User/updatepassword?id=${id}&oldPassword=${oldPassword}&newPassword=${newPassword}`
    );
  }

  checkUserExists(request) {
    return axios.post(
      `https://localhost:44305/api/User/checkuserexists`,
      request
    );
  }
}
