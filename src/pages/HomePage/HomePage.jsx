import { useEffect, useState } from 'react'
import axios from 'axios'
import MovieList from '../../components/MovieList/MovieList'
import styles from './HomePage.module.css'

export default function HomePage() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true)
            setError(null)
            try {
                const options = {
                    headers: {
                        Authorization: import.meta.env.VITE_TMDB_TOKEN
                    }
                }
                const resp = await axios.get(
                    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
                    options
                )
                setMovies(resp.data.results)
            } catch {
                setError('Не вдалося отримати список фільмів')
            } finally {
                setLoading(false)
            }
        }

        fetchTrending()
    }, [])

    return (
        <main className={styles.wrapper}>
            <h1 className={styles.title}>Trending Today</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </main>
    )
}


