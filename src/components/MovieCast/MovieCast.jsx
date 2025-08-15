import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './MovieCast.module.css'

const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'

export default function MovieCast() {
    const { movieId } = useParams()
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!movieId) return

        const fetchCast = async () => {
            setLoading(true)
            setError(null)
            try {
                const options = {
                    headers: {
                        Authorization: import.meta.env.VITE_TMDB_TOKEN
                    }
                }
                const resp = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
                    options
                )
                setCast(resp.data.cast)
            } catch (err) {
                setError('Не вдалося отримати акторський склад')
            } finally {
                setLoading(false)
            }
        }

        fetchCast()
    }, [movieId])

    if (loading) return <p>Loading...</p>
    if (error) return <p className={styles.error}>{error}</p>
    if (cast.length === 0) return <p>No cast information available</p>

    return (
        <ul className={styles.list}>
            {cast.map(actor => (
                <li key={actor.cast_id} className={styles.item}>
                    <img
                        src={
                            actor.profile_path
                                ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                : defaultImg
                        }
                        alt={actor.name}
                        className={styles.photo}
                    />
                    <p className={styles.name}>{actor.name}</p>
                    {actor.character && (
                        <p className={styles.character}>as {actor.character}</p>
                    )}
                </li>
            ))}
        </ul>
    )
}
