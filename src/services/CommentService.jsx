import axios from "axios";

export default class CommentService {
  getBySolution(solutionId) {
    return axios.get(
      "https://api.turkiyeyigelistirmeplatformu.com.tr/api/Comment/getbysolution?solutionId=" +
        solutionId
    );
  }

  addComment(comment) {
    return axios.post("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Comment/add", comment);
  }

  getAll() {
    return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Comment/getall");
  }

  getByParentComment(parentCommentId) {
    return axios.get(
      "https://api.turkiyeyigelistirmeplatformu.com.tr/api/Comment/getbyparentcommentid?parentCommentId=" +
        parentCommentId
    );
  }

  deleteComment(id) {
    return axios.delete(
      "https://api.turkiyeyigelistirmeplatformu.com.tr/api/Comment/delete?id=" + id
    );
  }

  updateComment(comment) {
    return axios.post("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Comment/update", comment);
  }
}
