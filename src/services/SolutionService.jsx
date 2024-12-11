import axios from "axios";

export default class SolutionService{
    getByProblem(problemId){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Solution/getbyproblem?problemId="+problemId)
    }

    addSolution(solution){
        return axios.post("https://www.practical-shirley.89-252-187-226.plesk.page/api/Solution/add",solution)
    }

    getAll(){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Solution/getall")
    }

    getBySender(senderId){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Solution/getbysender?senderId="+senderId)
    }

    getIsHighligted(){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Solution/getishighlighted")
    }

    deleteSolution(id){
        return axios.delete("https://www.practical-shirley.89-252-187-226.plesk.page/api/Solution/delete?id="+id)
    }

    updateSolution(solution){
        return axios.post("https://www.practical-shirley.89-252-187-226.plesk.page/api/Solution/update",solution)
    }
}