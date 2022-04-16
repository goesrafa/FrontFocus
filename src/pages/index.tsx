import Head from 'next/head'
import Image from 'next/image';
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/logo3.png'

import {Input} from '../components/ui/Input'

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
                <Input placeholder='Digite seu E-mail' type="text" />
                <Input placeholder='Digite sua senha' type="password"/>
              </form>
          </div>
      </div>
    </>

  )
}
