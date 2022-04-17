import { FormEvent, useContext, useState } from 'react';

import Head from 'next/head'
import Image from 'next/image';
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/logo4.png'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import {AuthContext} from '../contexts/AuthContext'

import Link from 'next/link'

export default function Home() {
  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent){
    event.preventDefault()

    let data = {
     email,
     password
    }
    await signIn(data)
  }
  return (
    <>
      <Head>
        <title>FocusCourses - Bem vindo ao login!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo FocusCourse" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder='Digite seu e-mail' 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
             />
            <Input placeholder='Digite sua senha' 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      />
            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>
          <Link href={'/cadastro'}>
            <a className={styles.text}>Não possui conta? Clique aqui</a>
          </Link>
        </div>
      </div>
    </>

  )
}
