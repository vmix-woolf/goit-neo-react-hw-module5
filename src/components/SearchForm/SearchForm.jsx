import { useState } from 'react'
import styles from './SearchForm.module.css'

export default function SearchForm({ onSubmit }) {
    const [value, setValue] = useState('')

    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (value.trim() === '') return
        onSubmit(value.trim())
        setValue('')
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Search movies..."
                className={styles.input}
            />
            <button type="submit" className={styles.button}>
                Search
            </button>
        </form>
    )
}
