import { useEffect, useState } from 'react'
import axios from 'axios'
import MovieList from '../components/MovieList/MovieList'

export default function HomePage() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            setLoading(true)
            setError(null)

            try {
                const options = {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjZiMGY5YzZjYWJhNmM3OTViMTE4NjE2MDU4NWFhMSIsIm5iZiI6MTc1NTI3MTM1Ny45NCwic3ViIjoiNjg5ZjUwYmQ5OTNhNWU5Nzc3MjY5N2VkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.IX9fIlVzNuwzLwIRa6OR8abprNFtJtxZS7SjNFzpUnw'
                    }
                }

                const response = await axios.get(
                    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
                    options
                )
                setMovies(response.data.results)
            } catch (err) {
                setError('Failed to fetch trending movies')
            } finally {
                setLoading(false)
            }
        }

        fetchTrendingMovies()
    }, [])

    return (
        <main>
            <h1>Trending Today</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </main>
    )
}

