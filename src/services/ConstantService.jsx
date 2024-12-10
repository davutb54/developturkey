import axios from "axios"

export default class ConstantService{
    getGenders(){
        return axios.get("https://localhost:44305/api/Constant/genders")
    }

    getCities(){
        return axios.get("https://localhost:44305/api/Constant/cities")
    }
}