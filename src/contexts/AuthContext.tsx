import { createContext, ReactNode, useState } from 'react'

import {destroyCookie} from 'nookies'
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
        console.log("Logar", email)
        console.log("Senha", password)
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}