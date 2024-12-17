import axios from "axios"

export default class ProblemService{
    getByTopic(topicId){
        return axios.get("https://localhost:44305/api/Problem/getbytopic?topicId="+topicId)
    }

    getById(problemId){
        return axios.get("https://localhost:44305/api/Problem/getbyid?id="+problemId)
    }

    addProblem(problem){
        return axios.post("https://localhost:44305/api/Problem/add",problem)
    }

    getAll(){
        return axios.get("https://localhost:44305/api/Problem/getall")
    }

    getBySender(senderId){
        return axios.get("https://localhost:44305/api/Problem/getbysender?senderId="+senderId)
    }

    getIsHighligted(){
        return axios.get("https://localhost:44305/api/Problem/getishighlighted")
    }

    deleteProblem(id){
        return axios.delete("https://localhost:44305/api/Problem/delete?id="+id)
    }

    updateProblem(problem){
        return axios.post("https://localhost:44305/api/Problem/update",problem)
    }

}