import { http } from './config'

export default {
    listarPaises:() => {
        return http.get('countries')
    },
    listarCasosPorPais:(SelecaoPaises) => {
        return http.get('country/' + SelecaoPaises + '/status/confirmed')
    }
}