import {useState} from 'react'
import Carousel from 'react-multi-carousel'
import {ArrowCircleRightIcon, ArrowCircleLeftIcon} from '@heroicons/react/outline'

import Header from '@/components/main/utils/Header'
import 'react-multi-carousel/lib/styles.css'

export default function Brand() {
  const [brands, setBrands] = useState([
    {
      id: 1,
      name: 'Bayer',
      imageUrl: '/assets/bayer.png',
    },
    {
      id: 2,
      name: 'Sidomuncul',
      imageUrl: '/assets/sidomuncul.png',
    },
    {
      id: 3,
      name: 'Wyeth Nutrition',
      imageUrl: '/assets/wyeth.png',
    },
    {
      id: 4,
      name: `Helmig's`,
      imageUrl: '/assets/helmig.png',
    },
    {
      id: 5,
      name: 'S-26',
      imageUrl: '/assets/s-26.png',
    },
    {
      id: 6,
      name: 'Actavis',
      imageUrl: '/assets/actavis.png',
    },
  ])

  const CustomDot = ({onClick, active, ...rest}) => {
    return (
      <button
        className={`w-2 h-2 rounded-full mx-0.5
        ${active ? 'bg-dnr-dark-turqoise' : 'bg-gray-200'}
      `}
        onClick={() => onClick()}
      ></button>
    )
  }

  const CustomRightArrow = ({onClick, ...rest}) => {
    return (
      <button onClick={() => onClick()}>
        <div className="absolute right-1 top-1/3 bg-gray-50 hover:text-white hover:bg-dnr-slider-orange border-orange rounded-full shadow w-10 h-10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    )
  }
  const CustomLeftArrow = ({onClick, ...rest}) => {
    return (
      <button onClick={() => onClick()}>
        <div className="absolute left-1 top-1/3 bg-gray-50 hover:text-white hover:bg-dnr-slider-orange border-orange rounded-full shadow w-10 h-10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button>
    )
  }

  return (
    <section className="my-4 mt-20 hidden sm:block">
      <Header text="By Company" />

      <div className="relative pb-4">
        <Carousel
          responsive={{
            desktop: {
              breakpoint: {max: 3000, min: 1024},
              items: 5,
            },
            tablet: {
              breakpoint: {max: 1024, min: 464},
              items: 5,
            },
            mobile: {
              breakpoint: {max: 464, min: 0},
              items: 1,
              slidesToSlide: 1, // optional, default to 1.
            },
          }}
          swipeable={false}
          draggable={false}
          showDots={false}
          infinite={true}
          autoPlay={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={true}
          autoPlaySpeed={3000}
          transitionDuration={500}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          {brands.map((brand) => (
            <div key={brand.name + brand.id}>
              <img className="flex-shrink-0 py-1 px-6" alt={brand.name} src={brand.imageUrl} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
