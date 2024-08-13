import { useState } from 'react'

const useCarousel = (images: string[]) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex(index => {
            if (index === images.length - 1) return 0
            return index + 1
        })
    }

    const prevSlide = () => {
        setCurrentIndex(index => {
            if (index === 0) return images.length - 1
            return index - 1
        })
    }

    return {
        currentIndex,
        setCurrentIndex,
        prevSlide,
        nextSlide
    }
}

export default useCarousel