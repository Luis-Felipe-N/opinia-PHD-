import { useEffect, useState } from "react"
import  Card from '../components/Card'
import styles from '../styles/components/suggestedpost.module.scss'

export function SuggestedPosts({posts, category}) {
    const [ suggestedPosts, setSuggestedPosts ] = useState([])
    useEffect(() => {
        const postsByCategory = posts.filter( ({postcontent})  => postcontent.find((item) => item.categorias === category))

        const postsNotInCategories = posts.filter( ({postcontent})  => postcontent.find((item) => item.categorias !== category))
        for (let index = 0; index <= 3; index++) {
            const elem = postsNotInCategories[index]
            if (elem && !postsByCategory.includes(elem)) {
                postsByCategory.push(elem)
            }
        }

        setSuggestedPosts([...postsByCategory])
        console.log(postsByCategory)
    }, [])


    return (
        <section className={styles.main} >  
        <h2 className={styles.more_posts}>Continue lendo:</h2>
        <div className={styles.container_card}>
            {   suggestedPosts &&
                suggestedPosts.map( ({_updatedAt, id, postcontent}) => {
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
                            createdAt={_updatedAt}
                        />
                    )
                })
            }
        </div> 
        </section >  
    )
}