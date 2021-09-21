import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import styles from '../styles/components/Header.module.scss'

export default function NavLink({to, children}) {

    const {asPath} = useRouter()
    console.log(asPath)
    const className = asPath == to ? styles.active : ''
    
    return (
        <Link href={to}>
            <a className={className}>
                {children}
            </a>
        </Link>
    )
}