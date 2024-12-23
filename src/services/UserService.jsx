import axios from "axios";

export default class UserService {
  getById(id) {
    return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/User/getbyid?id=" + id);
  }

  register(request) {
    return axios.post("https://api.turkiyeyigelistirmeplatformu.com.tr/api/User/register", request);
  }

  login(request) {
    return axios.post("https://api.turkiyeyigelistirmeplatformu.com.tr/api/User/login", request);
  }

  updateUser(user) {
    return axios.post("https://api.turkiyeyigelistirmeplatformu.com.tr/api/User/updatedetails", user);
  }

  updatePassword(request) {
    return axios.post(
      "https://api.turkiyeyigelistirmeplatformu.com.tr/api/User/updatepassword",
      request
    );
  }

  checkUserExists(request) {
    return axios.post(
      "https://api.turkiyeyigelistirmeplatformu.com.tr/api/User/checkuserexists",
      request
    );
  }
}
