import Image from 'next/image'
import Router from 'next/router'

import styles from '../styles/components/card.module.scss'
import formatCreatedAt from '../utils/formatCreatedAt'


export default function Card({createdAt, idPost, title, thumb, author}) {

    function handleRedirectPagePost() {
        const titleReplace = title[0].toLowerCase().replaceAll(' ', '_')
        Router.push(`/post/${titleReplace}&${idPost}`)
    }

    return (
        <article onClick={handleRedirectPagePost} className={styles.card}>
            <Image
                src={thumb.url}
                alt="Capa do card"
                width={300}
                height={150}
            />
            <div className={styles.card_footer}>
                <h1 className={styles.title}>
                    {title}
                </h1>
                <div className={styles.info}>
                    <Image
                        alt="Imagem do autor"
                        src={author.imagem.url}
                        width={80}
                        height={80}
                    />
                    <div>
                        <div className={styles.article__author_info}>
                            <span className={styles.author_name}>{author.nome}</span>
                            <span className={styles.article_createdAt}>{formatCreatedAt(Date.parse(createdAt))}</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}