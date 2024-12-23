import axios from "axios"

export default class ProblemService{
    getByTopic(topicId){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Problem/getbytopic?topicId="+topicId)
    }

    getById(problemId){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Problem/getbyid?id="+problemId)
    }

    addProblem(problem){
        return axios.post("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Problem/add",problem)
    }

    getAll(){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Problem/getall")
    }

    getBySender(senderId){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Problem/getbysender?senderId="+senderId)
    }

    getIsHighligted(){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Problem/getishighlighted")
    }

    deleteProblem(id){
        return axios.delete("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Problem/delete?id="+id)
    }

    updateProblem(problem){
        return axios.post("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Problem/update",problem)
    }

}