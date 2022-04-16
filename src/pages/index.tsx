import Head from 'next/head'
import Image from 'next/image';
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/logo3.png'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>FocusCourses - Bem vindo ao login!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo FocusCourse" />

        <div className={styles.login}>
          <form>
            <Input placeholder='Digite seu e-mail' type="text" />
            <Input placeholder='Digite sua senha' type="password" />
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
