import axios, {AxiosInstance} from "axios"
import IVagasResponse from "../Interfaces/IVagasResponse";
import IEditalResponse from "../Interfaces/IEditalResponse";
import IProximaOpcaoResponse from "../Interfaces/IProximaOpcaoResponse";
import IInscricaoRequest from "../Interfaces/IInscricaoRequest";
import IInscricaoResponse from "../Interfaces/IInscricaoResponse";
import IAutenticacaoResponse from "../Interfaces/IAutenticacaoResponse";

const criarRequest = (token: String): AxiosInstance => {
    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export const getVagasPorEdital = (token: String, idEdital: Number): Promise<IVagasResponse> => {
    let request = criarRequest(token)
    return request.get('/vagas/' + idEdital)
}

export const getEditalAtivo = (token: String): Promise<IEditalResponse> => {
    let request = criarRequest(token)
    return request.get('/editais/ativo')
}

export const getProximaOpcao = (token: String): Promise<IProximaOpcaoResponse> => {
    let request = criarRequest(token)
    return request.get('/inscricoes/proxima_opcao')
}

export const postInscricao = (token: String, body: IInscricaoRequest): Promise<IInscricaoResponse> => {
    let request = criarRequest(token)
    return request.post('/inscricoes', body)
}

export const postAutenticar = (login: string, senha: String): Promise<IAutenticacaoResponse> => {
    let request = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return request.post('/auth', {login, senha})
}