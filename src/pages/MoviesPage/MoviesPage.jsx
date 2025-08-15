import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import MovieList from '../../components/MovieList/MovieList.jsx'
import SearchForm from '../../components/SearchForm/SearchForm.jsx'
import styles from './MoviesPage.module.css'

export default function MoviesPage() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('query') ?? ''

    useEffect(() => {
        if (!query) return

        const fetchMovies = async () => {
            setLoading(true)
            setError(null)
            try {
                const options = {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
                    }
                }
                const resp = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
                    options
                )
                setMovies(resp.data.results)
            } catch {
                setError('Не вдалося виконати пошук фільмів')
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [query])

    const handleSubmit = value => {
        setSearchParams({ query: value })
    }

    return (
        <main className={styles.wrapper}>
            <h1 className={styles.title}>Search Movies</h1>
            <div className={styles.form}>
                <SearchForm onSubmit={handleSubmit} />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </main>
    )
}

