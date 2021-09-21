import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

// import image404 from '../assets/image/pagenotfound.svg'
import styles from '../styles/pages/404.module.scss'

export default function NotFound() {
    return (
        <div className={styles.main}>
            <Head>
                <title>
                    Página não encontrada
                </title>
            </Head>
            <Image
                src="/pagenotfound.svg"
                alt="Imagem de erro 404"
                width={900}
                height={350}
            />
            <h3>Está perdido? <Link href='/'>Volte para onde tudo começou!</Link></h3>
        </div>
    )
}