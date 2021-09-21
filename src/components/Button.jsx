import styles from '../styles/components/button.module.scss'

export function Button({isInverse = false, children, ...props}) {
   
    return (
        <button className={isInverse ? styles.button_inverse : styles.button} {...props} >{children}</button>    )
}

