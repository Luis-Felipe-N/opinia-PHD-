import formatCreatedAt from '../utils/formatCreatedAt.js'

import useAuth from '../hooks/useAuth'

import { RiDeleteBin2Line } from 'react-icons/ri'

import styles from '../styles/components/commentuser.module.scss'

export function CommentUser({author, content, createdAt, idComment}) {

    const {user} = useAuth()

    return (
        <li className={styles.comment} key={idComment}>
            <span className={styles.author_name}>
                <span>
                    {author.name}
                </span>
                {
                    '1' === idComment && (
                    <button onClick={() => handleDeleteComment(idComment)}>
                        <RiDeleteBin2Line
                        size='20px'
                        color='red'
                            />
                    </button>)
                }
            </span>
            <span className={styles.content}>{content}</span>
            <span className={styles.createdAt}>{formatCreatedAt(createdAt)}</span>
        </li>
    )
}