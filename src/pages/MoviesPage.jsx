import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import MovieList from '../components/MovieList/MovieList'
import SearchForm from '../components/SearchForm/SearchForm'

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
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjZiMGY5YzZjYWJhNmM3OTViMTE4NjE2MDU4NWFhMSIsIm5iZiI6MTc1NTI3MTM1Ny45NCwic3ViIjoiNjg5ZjUwYmQ5OTNhNWU5Nzc3MjY5N2VkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.IX9fIlVzNuwzLwIRa6OR8abprNFtJtxZS7SjNFzpUnw'
                    }
                }
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
                    options
                )
                setMovies(response.data.results)
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Failed to fetch movies')
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [query])

    const handleSearchSubmit = value => {
        setSearchParams({ query: value })
    }

    return (
        <main>
            <h1>Search Movies</h1>
            <SearchForm onSubmit={handleSearchSubmit} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </main>
    )
}

