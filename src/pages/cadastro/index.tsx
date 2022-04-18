import { useState , FormEvent, useContext} from 'react';

import Head from 'next/head'
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo4.png'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import {AuthContext} from '../../contexts/AuthContext'
import { toast} from 'react-toastify'

import Link from 'next/link'

export default function Cadastro() {
  const {signUp} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleCadastro(event: FormEvent ) {
    event.preventDefault();

    if(name == ' ' || email  == ' ' || password  == ' '){
      toast.error("Campos obrigatórios")
      return;
    }

    setLoading (true)

    let data ={
      name,
      email,
      password,
    }

    await signUp(data)

    setLoading(false)
  }


  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo FocusCourse" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form onSubmit={handleCadastro}>
            <Input placeholder="Digite seu nome"
              type="text"
              value={name}    
              onChange={(e) => setName(e.target.value)}
            />
            <Input placeholder="Digite seu e-mail"
              type="text"
              value={email}    
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input placeholder="Digite sua senha"
              type="password"
              value={password}    
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" 
            loading={loading}
            >
              Cadastrar
            </Button>
          </form>
          <Link href={'/'}>
            <a className={styles.text}>Já possui uma conta? Faça seu login</a>
          </Link>
        </div>
      </div>
    </>

  )
}
