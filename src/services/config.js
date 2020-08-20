import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://api.covid19api.com/'
})