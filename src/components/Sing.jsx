

import styles from '../styles/pages/sing.module.scss'
import Header from './Header'

export default function singup({children}) {
    return (
        <>
            <main className={styles.sing}>

                <section className={styles.containerForm}>
                    <div>
                        {children}
                    </div>
                </section>
            </main>
        </>
    )
}