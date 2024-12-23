import axios from "axios";

export default class SolutionService{
    getByProblem(problemId){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Solution/getbyproblem?problemId="+problemId)
    }

    addSolution(solution){
        return axios.post("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Solution/add",solution)
    }

    getAll(){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Solution/getall")
    }

    getBySender(senderId){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Solution/getbysender?senderId="+senderId)
    }

    getIsHighligted(){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Solution/getishighlighted")
    }

    deleteSolution(id){
        return axios.delete("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Solution/delete?id="+id)
    }

    updateSolution(solution){
        return axios.post("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Solution/update",solution)
    }
}