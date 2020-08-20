import { http } from './config'

export default {
    listarPaises:() => {
        return http.get('countries')
    },
    listarCasosPorPais:(SelecaoPaises) => {
        return http.get('country/' + SelecaoPaises + '/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z')
    }
}