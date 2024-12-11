import axios from "axios";

export default class CommentService {
  getBySolution(solutionId) {
    return axios.get(
      "https://www.practical-shirley.89-252-187-226.plesk.page/api/Comment/getbysolution?solutionId=" +
        solutionId
    );
  }

  addComment(comment) {
    return axios.post("https://www.practical-shirley.89-252-187-226.plesk.page/api/Comment/add", comment);
  }

  getAll() {
    return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Comment/getall");
  }

  getByParentComment(parentCommentId) {
    return axios.get(
      "https://www.practical-shirley.89-252-187-226.plesk.page/api/Comment/getbyparentcommentid?parentCommentId=" +
        parentCommentId
    );
  }

  deleteComment(id) {
    return axios.delete(
      "https://www.practical-shirley.89-252-187-226.plesk.page/api/Comment/delete?id=" + id
    );
  }

  updateComment(comment) {
    return axios.post("https://www.practical-shirley.89-252-187-226.plesk.page/api/Comment/update", comment);
  }
}
