import {useRef, useState} from 'react'
import Carousel from 'react-multi-carousel'
import Skeleton from 'react-loading-skeleton'
import {Card} from '@/components/base'

import 'react-multi-carousel/lib/styles.css'

const responsive = {
  mobile: {
    breakpoint: {max: 500, min: 0},
    items: 1,
  },
}

function CustomDot({active, onClick}) {
  return (
    <div className="flex justify-center sm:hidden space-x-2">
      <button
        onClick={onClick}
        className={`w-2 h-2 rounded-full mx-0.5 ${active ? 'bg-dnr-dark-turqoise' : 'bg-gray-200'}`}
      ></button>
    </div>
  )
}

export default function ProductImage({images = dummyImages}) {
  const carouselRef = useRef(null)
  const [active, setActive] = useState(0)

  function goToNext() {
    const newActive = active + 1 === images.length ? 0 : active + 1
    setActive(newActive)
    return carouselRef.current.goToSlide(newActive)
  }

  return (
    <div
      style={{
        paddingBottom: '30px',
        position: 'relative',
      }}
    >
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        swipeable
        draggable
        showDots
        renderDotsOutside
        removeArrowOnDeviceType={['mobile']}
        customDot={<CustomDot />}
      >
        {images.map((image) => (
          <Card key={image.id} className="bg-white rounded-md shadow p-0" onClick={goToNext}>
            {/* {isLoading || !product ? (
            <Skeleton className="w-full sm:h-80 object-cover" />
          ) : (
            )} */}
            <img src={image.image} alt="Product Image" className="w-full sm:h-80 object-cover" />
          </Card>
        ))}
      </Carousel>
    </div>
  )
}
