import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'

import Header from "../../components/Header";
import Card from "../../components/Card"

import { getAllPost } from "../../lib/datocms";

import styles from '../../styles/pages/categories.module.scss'

export default function Category({postsByCategory}) {

    const router = useRouter()

    const category = router.query.category ? router.query.category.toUpperCase() : ''

    return (
        <>
        <Head>
            <title>
                BlogTech | {category}
            </title>
        </Head>
        <Header />
        <main className={styles.main}>
            {
                postsByCategory && postsByCategory.length ? (
                    <div className={styles.container_post}>
                        <h1>Todos posts sobre {category}</h1>
                        {
                            postsByCategory.map( ({createdAt, id, postcontent}) => {
                                const author = postcontent.filter( item => item._modelApiKey === 'author')[0]
                                const title = postcontent.filter( item => item._modelApiKey === 'title').map(item => item.titulo)
                                const thumb = postcontent.filter( item => item._modelApiKey === 'thumb').map(item => item.thumb)[0]
                                return (
                                    <Card
                                        key={id}
                                        idPost={id}
                                        title={title}
                                        author={author}
                                        thumb={thumb}
                                        createdAt={createdAt}
                                    />
                                )
                            })
                        }
                    </div>
                )
                : (
                    <div>
                        <Image  
                            src="/notcomments.svg"
                            alt="Ainda não há comentátarios"
                            width={900}
                            height={350}
                        />
                        {router.query.category && <h3 className={styles.not_posts}>Ainda não há post sobre {category}</h3>}
                    </div>
                )
            }
        </main>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const category = context.params.category
    const response = await getAllPost()
    const posts = response.allPosts
    const postsByCategory = posts.filter( ({postcontent})  => postcontent.find((item) => item.categorias === category))

    return {
        props: {
            postsByCategory
        },
        revalidate: 1
    }
}

//  ... on CategoryRecord {
//         id
//         categorias
//         _modelApiKey
//       }