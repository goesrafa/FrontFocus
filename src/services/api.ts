import axios, {AxiosError} from 'axios'
import {parseCookies} from 'nookies'
import {AuthTokenError} from './errors/AuthTokenError'

import {signOut} from '../contexts/AuthContext'

export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Autorization: `Bearer ${cookies['@tocourses.token']}`
        }
    })
    
    api.interceptors.response.use(response =>{
        return response
    }, (error: AxiosError) => {
        if(error.response.status === 401){
            //Com qualquer erro 401, deslogar o usuário
            if(typeof window !== undefined){
                //Chamada da funcção para deslogar o usuário
                signOut()
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error)

    })

    return api

}