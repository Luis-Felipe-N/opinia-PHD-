import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import Head from 'next/head'

import { getAllPost, getPost } from '../../lib/datocms'

import Header from "../../components/Header";
import Post from '../../components/Post'
import { SuggestedPosts } from "../../components/SuggestedPosts";

export default function PostPost({posts}) {
    const [ post, setPost ] = useState()

    const router = useRouter()
 
    useEffect(() => {
        const postId =  router.query.id.split('&')[1]
        console.log(postId)
        if (posts) {
            const parsedPost = posts.filter( post => post.id == postId)[0]

            if (parsedPost) {
                setPost(parsedPost)
            } else {
                router.push('/404')
            }
        }
    }, [posts])
    
    return (
        <>
                <Header />
            {
                post && (
                    <>
                        <Head>
                            <meta property="og:type" content="website"/>
                            <meta property="og:locale" content="pt_BR"/>
                            <meta name="og:description" content={post.postcontent.filter( item => item._modelApiKey === 'subtitle').map(item => item.subtitulo)}/>
                            <meta property="og:title" content={post.postcontent.filter( item => item._modelApiKey === 'title').map(item => item.titulo)}/>
                            <meta property="og:image" content={post.postcontent.filter( item => item._modelApiKey === "thumb").map(item => item.thumb.url)}/>
                            <title>
                            {
                                post.postcontent.filter( item => item._modelApiKey === 'title').map(item => item.titulo)
                            }
                            </title>
                        </Head>
                        <Post idPost={post.id} createdAt={post.createdAt} postContent={post.postcontent} />
                        <SuggestedPosts posts={posts} category="css" />
                    </>
                )
            }
            
        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}


export async function getStaticProps() {
    const responseAllPost = await getAllPost()
    const posts = await responseAllPost.allPosts
    return {
        props: {
            posts
        },
    }
}