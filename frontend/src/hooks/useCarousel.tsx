import { useState } from 'react'

const useCarousel = (images: string[]) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const getImageIndex = (index: number) => {
        return (index + images.length) % images.length;
    };

    return {
        currentIndex,
        prevSlide,
        nextSlide,
        getImageIndex
    }
}

export default useCarousel