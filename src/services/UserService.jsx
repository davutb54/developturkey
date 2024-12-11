import axios from "axios";

export default class UserService {
  getById(id) {
    return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/User/getbyid?id=" + id);
  }
  getByUsername(username) {
    return axios.get(
      "https://www.practical-shirley.89-252-187-226.plesk.page/api/User/getbyusername?username=" + username
    );
  }

  addUser(user) {
    return axios.post("https://www.practical-shirley.89-252-187-226.plesk.page/api/User/add", user);
  }

  updateUser(user) {
    return axios.post("https://www.practical-shirley.89-252-187-226.plesk.page/api/User/update", user);
  }

  updatePassword(id, oldPassword, newPassword) {
    return axios.post(
      `https://www.practical-shirley.89-252-187-226.plesk.page/api/User/updatepassword?id=${id}&oldPassword=${oldPassword}&newPassword=${newPassword}`
    );
  }

  checkUserExists(request) {
    return axios.post(
      `https://www.practical-shirley.89-252-187-226.plesk.page/api/User/checkuserexists`,
      request
    );
  }
}
