import { ChangeEvent, useState } from "react";

import Head from "next/head";
import styles from './styles.module.scss'
import { Header } from "../../components/Header";

import { canSSRAuth } from '../../utils/canSSRAuth'

import {setupAPIClient} from '../../services/api'

import { FiUpload } from 'react-icons/fi'

type ItemProps = {
    id:string
    name:string
}

interface CategoryProps{
    categoryList: ItemProps[]
}

export default function Couses({categoryList} :CategoryProps) {



    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files){
            return
        }

        const image = e.target.files[0]
        if(image){
            return
        }

       if(image.type == 'image/jpg' || image.type === 'image/png')  {
           setImageAvatar(image)
           setAvatarUrl(URL.createObjectURL(e.target.files[0]))
       }

    }
    return (
        <>
            <Head>
                <title>Novo Produto - ToFocus</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Novo Produto</h1>
                    <form className={styles.form}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={25} color='#fff' />
                            </span>

                            <input type="file" accept="image/png, image/jpg" onChange={handleFile} />

                            {avatarUrl && (
                                <img
                                className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto ilustrativa do curso"
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label>

                        <select >
                            <option>
                                Exatas
                            </option>
                            <option>
                                Humanas
                            </option>
                        </select>

                        <input
                            type="text"
                            placeholder="Digite o nome do curso"
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Digite o nome do professor"
                            className={styles.input}
                        />

                        <textarea
                            placeholder="Descrição do curso"
                            className={styles.input}
                        />

                        <button className={styles.buttonAdd} type="submit">
                            Cadastrar
                        </button>

                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)
  
    const response = await apliClient.get('/category');
    //console.log(response.data);
  
    return {
      props: {
        categoryList: response.data
      }
    }
  })