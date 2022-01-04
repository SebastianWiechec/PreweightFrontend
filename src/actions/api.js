import axios from "axios";

export const API_TYPES = {
    USER: "http://localhost:7000/User",
    DONE: "http://localhost:7000/Done",
    MATERIAL: "http://localhost:7000/Material",
    PLAN: "http://localhost:7000/Plan",
    PREWEIGHT: "http://localhost:7000/Preweight",
    RECIPE: "http://localhost:7000/Recipe",
    WAREHOUSE: "http://localhost:7000/Warehouse",
}

/**
 * 
 */
export default {

    request(url) {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: (urlEnd,newRecord) => axios.post(url+urlEnd, newRecord),
            update: (id, updatedRecord) => axios.put(url + "/" + id, updatedRecord),
            delete: id => axios.delete(url + id),
            userLogin: user => axios.post(url + "/login", user),
            userRegister: (password, user) => axios.post(url + `/register?password=${password}`, user)
        }
    }
}
