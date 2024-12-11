import axios from "axios"

export default class ProblemService{
    getByTopic(topicId){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Problem/getbytopic?topicId="+topicId)
    }

    getById(problemId){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Problem/getbyid?id="+problemId)
    }

    addProblem(problem){
        return axios.post("https://www.practical-shirley.89-252-187-226.plesk.page/api/Problem/add",problem)
    }

    getAll(){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Problem/getall")
    }

    getBySender(senderId){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Problem/getbysender?senderId="+senderId)
    }

    getIsHighligted(){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Problem/getishighlighted")
    }

    deleteProblem(id){
        return axios.delete("https://www.practical-shirley.89-252-187-226.plesk.page/api/Problem/delete?id="+id)
    }

    updateProblem(problem){
        return axios.post("https://www.practical-shirley.89-252-187-226.plesk.page/api/Problem/update",problem)
    }

}