/**
 * @file Carrusel de películas destacadas.
 * Muestra un slider con las películas populares usando Swiper.js.
 */

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useGetPopularMoviesQuery } from '../api/moviesApi'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/** Carrusel principal con animaciones y autoplay */
export function FeaturedCarousel() {
    const { data, isLoading, error } = useGetPopularMoviesQuery(1)

    if (isLoading)
        return <p className="text-center py-10 text-gray-400">Cargando...</p>

    if (error)
        return (
            <p className="text-center py-10 text-red-500">
                Error al cargar el carrusel 😞
            </p>
        )

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-10"
        >
            <h2 className="text-2xl font-bold text-center mb-4">
                🎬 Películas destacadas
            </h2>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1.2}
                loop
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3.2 },
                }}
                className="rounded-lg overflow-hidden"
            >
                {data?.results.slice(0, 8).map((movie: any) => (
                    <SwiperSlide key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                            <div className="relative group">
                                <img
                                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                                    alt={movie.title}
                                    className="rounded-lg w-full h-60 object-cover group-hover:opacity-80 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <h3 className="text-white text-lg font-semibold mb-3 text-center px-3">
                                        {movie.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    )
}
