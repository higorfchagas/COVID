import { http } from './config'
import axios from 'axios'

export default {
    listarPaises:() => {
        return http.get('countries')
    },
    verificarStatusApi:() => {
        const httpStatusApi = axios.create({
            baseURL: 'https://covid19-brazil-api.now.sh/api/'
        });
        return httpStatusApi.get('status/v1')
    },


    
}