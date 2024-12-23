import axios from "axios"

export default class TopicService{
    getTopics(){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Topic/getall")
    }

}