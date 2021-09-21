import Head from 'next/head'

import { getAllPost } from '../lib/datocms'

import Header from '../components/Header'
import Post from '../components/Post'

import styles from '../styles/pages/Home.module.scss'
import { SuggestedPosts } from '../components/SuggestedPosts'


export default function Home({headline, posts}) {

    return (
        <>
            <Head>
                <meta name="description" content="Opinião PDH é um lugar de opiniões feita por amadores"/>
                <meta property="og:image" content="https://www.mozilla.org/media/protocol/img/logos/firefox/browser/og.4ad05d4125a5.png">
                <title>
                    Opnião PDH+
                </title>
            </Head>
            <Header />
            <main className={styles.main}>
                {
                    headline && <Post idPost={headline.id} createdAt={headline._updatedAt} postContent={headline.postcontent} />
                }
                <section className={styles.more_content}>
                    {
                        posts && (
                            <SuggestedPosts createdAt={headline.createdAt} posts={posts} category="css" />
                        )
                    }
                </section>
            </main>
        </>
    )
}


export async function getStaticProps() {
    const response = await getAllPost()
    const posts = response.allPosts
    const headline = response.allPosts[0]
    console.log(headline, posts)

    return {
        props: {
            headline,
            posts
        },
        revalidate: 60
    }
}