import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://covid19-brazil-api.now.sh/api/report/v1/'
})