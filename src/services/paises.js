import { http } from './config'

export default {
    listarPaises:() => {
        return http.get('countries')
    },
}