import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './MovieDetailsPage.module.css'

const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'

export default function MovieDetailsPage() {
    const { movieId } = useParams()
    const location = useLocation()
    const backLink = useRef(location.state?.from ?? '/movies')
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!movieId) return

        const fetchMovieDetails = async () => {
            setLoading(true)
            setError(null)
            try {
                const options = {
                    headers: {
                        // ⛔️ Встав свій API Read Access Token
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjZiMGY5YzZjYWJhNmM3OTViMTE4NjE2MDU4NWFhMSIsIm5iZiI6MTc1NTI3MTM1Ny45NCwic3ViIjoiNjg5ZjUwYmQ5OTNhNWU5Nzc3MjY5N2VkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.IX9fIlVzNuwzLwIRa6OR8abprNFtJtxZS7SjNFzpUnw',
                    },
                }
                const resp = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                    options
                )
                setMovie(resp.data)
            } catch (err) {
                setError('Не вдалося отримати деталі фільму')
            } finally {
                setLoading(false)
            }
        }

        fetchMovieDetails()
    }, [movieId])

    return (
        <main className={styles.wrapper}>
            <Link to={backLink.current} className={styles.back}>
                ← Go back
            </Link>

            {loading && <p>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {movie && (
                <>
                    <section className={styles.header}>
                        <img
                            className={styles.poster}
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                    : defaultImg
                            }
                            alt={movie.title}
                            width={250}
                        />

                        <div className={styles.meta}>
                            <h1 className={styles.title}>
                                {movie.title}{' '}
                                {movie.release_date ? (
                                    <span className={styles.year}>
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                                ) : null}
                            </h1>

                            <p className={styles.score}>
                                User score: {Math.round((movie.vote_average || 0) * 10)}%
                            </p>

                            {movie.overview && (
                                <>
                                    <h2 className={styles.subhead}>Overview</h2>
                                    <p className={styles.overview}>{movie.overview}</p>
                                </>
                            )}

                            {movie.genres?.length > 0 && (
                                <>
                                    <h3 className={styles.subhead}>Genres</h3>
                                    <p className={styles.genres}>
                                        {movie.genres.map(g => g.name).join(', ')}
                                    </p>
                                </>
                            )}
                        </div>
                    </section>

                    <section className={styles.extra}>
                        <h3 className={styles.subhead}>Additional information</h3>
                        <nav className={styles.subnav}>
                            <NavLink
                                to="cast"
                                className={({ isActive }) =>
                                    isActive ? `${styles.sublink} ${styles.active}` : styles.sublink
                                }
                                state={{ from: backLink.current }}
                            >
                                Cast
                            </NavLink>
                            <NavLink
                                to="reviews"
                                className={({ isActive }) =>
                                    isActive ? `${styles.sublink} ${styles.active}` : styles.sublink
                                }
                                state={{ from: backLink.current }}
                            >
                                Reviews
                            </NavLink>
                        </nav>
                    </section>

                    <section className={styles.outlet}>
                        <Outlet />
                    </section>
                </>
            )}
        </main>
    )
}

