import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navigation from './components/Navigation/Navigation.jsx'

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'))
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.jsx'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.jsx'))

const MovieCast = lazy(() => import('./components/MovieCast/MovieCast.jsx'))
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews.jsx'))

export default function App() {
    return (
        <div className="container">
            <Navigation />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                        <Route path="cast" element={<MovieCast />} />
                        <Route path="reviews" element={<MovieReviews />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </div>
    )
}
