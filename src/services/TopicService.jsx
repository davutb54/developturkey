import axios from "axios"

export default class TopicService{
    getTopics(){
        return axios.get("https://localhost:44305/api/Topic/getall")
    }

}