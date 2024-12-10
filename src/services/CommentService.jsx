import axios from "axios";

export default class CommentService {
  getBySolution(solutionId) {
    return axios.get(
      "https://localhost:44305/api/Comment/getbysolution?solutionId=" +
        solutionId
    );
  }

  addComment(comment) {
    return axios.post("https://localhost:44305/api/Comment/add", comment);
  }

  getAll() {
    return axios.get("https://localhost:44305/api/Comment/getall");
  }

  getByParentComment(parentCommentId) {
    return axios.get(
      "https://localhost:44305/api/Comment/getbyparentcommentid?parentCommentId=" +
        parentCommentId
    );
  }

  deleteComment(id) {
    return axios.delete(
      "https://localhost:44305/api/Comment/delete?id=" + id
    );
  }

  updateComment(comment) {
    return axios.post("https://localhost:44305/api/Comment/update", comment);
  }
}
