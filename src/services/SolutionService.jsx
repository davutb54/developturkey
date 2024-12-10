import axios from "axios";

export default class SolutionService{
    getByProblem(problemId){
        return axios.get("https://localhost:44305/api/Solution/getbyproblem?problemId="+problemId)
    }

    addSolution(solution){
        return axios.post("https://localhost:44305/api/Solution/add",solution)
    }

    getAll(){
        return axios.get("https://localhost:44305/api/Solution/getall")
    }

    getBySender(senderId){
        return axios.get("https://localhost:44305/api/Solution/getbysender?senderId="+senderId)
    }

    getIsHighligted(){
        return axios.get("https://localhost:44305/api/Solution/getishighlighted")
    }

    deleteSolution(id){
        return axios.delete("https://localhost:44305/api/Solution/delete?id="+id)
    }

    updateSolution(solution){
        return axios.post("https://localhost:44305/api/Solution/update",solution)
    }
}