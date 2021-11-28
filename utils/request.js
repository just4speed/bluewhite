import axios from "axios";

const server = "https://chance-auth-server.herokuapp.com";

const instance = axios.create({
    withCredentials: true,
    baseURL: server,
})

export const request = async (url, method = "GET", body = null) => {
    return new Promise((resolve, reject) => {
        instance({
            method,
            url,
            data: body
        }).then(function(response){
            if(response){
                resolve(response);
            }
        }).catch(e => {
            if(e){
                reject(e);
            }
        })
    })
}