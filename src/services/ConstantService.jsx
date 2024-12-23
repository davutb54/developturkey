import axios from "axios"

export default class ConstantService{
    getGenders(){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Constant/genders")
    }

    getCities(){
        return axios.get("https://api.turkiyeyigelistirmeplatformu.com.tr/api/Constant/cities")
    }
}