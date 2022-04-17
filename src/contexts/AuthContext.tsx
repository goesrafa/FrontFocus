import { createContext, ReactNode, useState } from 'react'

import {api } from '../services/apiClient'
import {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from 'next/router'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SigInProps) => Promise<void>
    signOut: () => void
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SigInProps = {
    email: string;
    password: string
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try {
        destroyCookie(undefined, '@tocourses.token')
        Router.push('/')
    } catch {
        console.log('Erro ao sair')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    async function signIn({email, password} :SigInProps ) {
       try {
            const response  = await api.post('/login', {
                email,
                password
            })

            //console.log(response.data)

            const {id, name, token} = response.data

            setCookie(undefined, ' @tocourses.token', token, {
                maxAge: 60 * 60 * 24 * 30 ,//expiração em 1 mês
                path: "/" //caminhos com acesso ao cookie
            })

            setUser({
                id, name, email
            })

            //Passar para as outras reuisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //Redirecionando para o /dashboard
            Router.push('/dashboard')

       } catch (err){
            console.log("erro ao acessasr", err)
       }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}