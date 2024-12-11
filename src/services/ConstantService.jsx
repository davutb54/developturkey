import axios from "axios"

export default class ConstantService{
    getGenders(){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Constant/genders")
    }

    getCities(){
        return axios.get("https://www.practical-shirley.89-252-187-226.plesk.page/api/Constant/cities")
    }
}