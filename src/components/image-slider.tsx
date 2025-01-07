import { useEffect, useState } from 'react'

const images = [
  'https://i.imgur.com/gHfP5jj.jpg',
  'https://i.imgur.com/tXzeznZ.jpg',
  'https://i.imgur.com/zqaHiCt.jpg',
  'https://i.imgur.com/gHfP5jj.jpg',
  'https://i.imgur.com/tXzeznZ.jpg',
  'https://i.imgur.com/zqaHiCt.jpg',
  'https://i.imgur.com/NS6IDHe.png',
  'https://i.imgur.com/iuIJqeS.jpg',
  'https://i.imgur.com/guNYu4a.jpg',
  'https://i.imgur.com/5W5T7RZ.jpg',
  'https://i.imgur.com/2d6sa1O.jpg',
  'https://i.imgur.com/T15vtRl.jpg',
  'https://i.imgur.com/IirzUC1.jpg',
  'https://i.imgur.com/ZEpfF9B.jpg'
]

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 2000) // Change slide every 2 seconds

    return () => clearInterval(interval)
  }, [])

  if (isError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-900 rounded-lg">
        <p className="text-white">Failed to load images</p>
      </div>
    )
  }

  return (
    <div className="relative h-[450px] w-full overflow-hidden rounded-lg bg-gray-900">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute h-full w-full transition-all duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="h-[450px] w-full object-cover"
            onError={() => setIsError(true)}
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-[#FFD700]' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

