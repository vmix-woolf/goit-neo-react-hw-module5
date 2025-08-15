import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
    return (
        <main className={styles.wrapper}>
            <h1 className={styles.title}>404 — Page Not Found</h1>
            <p className={styles.text}>
                На жаль, така сторінка не існує. Повернутися на головну?
            </p>
            <Link to="/" className={styles.link}>Go Home</Link>
        </main>
    )
}

