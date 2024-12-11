import axios from "axios"

export default class TopicService{
    getTopics(){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Topic/getall")
    }

}