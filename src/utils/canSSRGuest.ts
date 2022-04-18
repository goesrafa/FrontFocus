//Não logados
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next'
import { parseCookies} from 'nookies'

//Função de acesso para não logados (visitantes)
export function canSSRGuest<P>(fn:GetServerSideProps <P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{

        const cookies = parseCookies(ctx)

        //Tentativa de acesso, com login salvo, fazer o redirecionamento
        if(cookies['@tocourses.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }

        return await fn(ctx)
    }
}