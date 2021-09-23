import { useEffect, useState } from "react"

import { FaQuoteLeft } from 'react-icons/fa'

import styles from '../styles/components/opinionauthor.module.scss'
import { CommentUser } from "./CommentUser"

export function OpinionAuthor() {
    const [ opinionAuthor, setOpinionAuthor ] = useState()

    useEffect(() => {
        setOpinionAuthor({
            author: 'Luis Felipe',
            created: new Date(),
            content: 'Lorem ipsum dolor sit amet0. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ullamLorem ipsum dolor sit amet0. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ulla Lorem ipsum dolor sit amet0. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ullam'
        })
    }, [])

    if (opinionAuthor) {
        return (
            <aside className={styles.opinionContainer}>
                <FaQuoteLeft size="2rem" className={styles.icon} />
                <header>
                    <h3>Opinião - {opinionAuthor.author}</h3>
                </header>
                <p>{opinionAuthor.content}</p>
                <div className={styles.answers}>
                    <h4>Respostas</h4>

                    <ul>
                        <CommentUser
                            author={{
                                name: 'Luis'
                            }}
                            content="Muito foda" 
                            createdAt={new Date()}
                            idComment="1"
                        />

                        <CommentUser
                            author={{
                                name: 'Anna'
                            }}
                            content="Concordo!!" 
                            createdAt={new Date()}
                            idComment="2"
                        />
                    </ul>
                </div>
            </aside>
        )
    } else {
        return null
    }
}