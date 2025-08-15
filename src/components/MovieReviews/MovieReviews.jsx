import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './MovieReviews.module.css'

export default function MovieReviews() {
    const { movieId } = useParams()
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!movieId) return

        const fetchReviews = async () => {
            setLoading(true)
            setError(null)
            try {
                const options = {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjZiMGY5YzZjYWJhNmM3OTViMTE4NjE2MDU4NWFhMSIsIm5iZiI6MTc1NTI3MTM1Ny45NCwic3ViIjoiNjg5ZjUwYmQ5OTNhNWU5Nzc3MjY5N2VkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.IX9fIlVzNuwzLwIRa6OR8abprNFtJtxZS7SjNFzpUnw'
                    }
                }
                const resp = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
                    options
                )
                setReviews(resp.data.results)
            } catch (err) {
                setError('Не вдалося отримати відгуки')
            } finally {
                setLoading(false)
            }
        }

        fetchReviews()
    }, [movieId])

    if (loading) return <p>Loading...</p>
    if (error) return <p className={styles.error}>{error}</p>
    if (reviews.length === 0) return <p>No reviews available</p>

    return (
        <ul className={styles.list}>
            {reviews.map(review => (
                <li key={review.id} className={styles.item}>
                    <h4 className={styles.author}>Author: {review.author}</h4>
                    <p className={styles.content}>{review.content}</p>
                </li>
            ))}
        </ul>
    )
}
