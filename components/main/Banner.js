import React, {useState} from 'react'
import Carousel from 'react-multi-carousel'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/outline'
import 'react-multi-carousel/lib/styles.css'

export default function Banner({banners}) {
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

  const ButtonGroup = ({next, previous}) => {
    return (
      <>
        <button onClick={() => previous()} className="absolute hidden left-1 top-1/2 -mt-10 z-10">
          <ChevronLeftIcon className="absolute left-1 sm:left-8 top-1/2 p-3 stroke-current z-10 text-dnr-slider-orange bg-white rounded-full shadow w-10 h-10 hover:text-white hover:bg-dnr-slider-orange" />
        </button>

        <button onClick={() => next()} className="absolute hidden right-1 top-1/2 -mt-10 z-10">
          <ChevronRightIcon className="absolute right-1 sm:right-8 top-1/2 p-3 stroke-current z-10 text-dnr-slider-orange bg-white rounded-full shadow w-10 h-10 hover:text-white hover:bg-dnr-slider-orange" />
        </button>
      </>
    )
  }

  const CustomRightArrow = ({onClick, ...rest}) => {
    return (
      <button onClick={() => onClick()}>
        <ChevronRightIcon className="absolute -right-4 top-1/2 p-2 stroke-current z-10 text-dnr-green bg-gray-100 rounded-full w-8 h-8 hover:text-dnr-orange hover:bg-dnr-green" />
      </button>
    )
  }

  const CustomLeftArrow = ({onClick, ...rest}) => {
    return (
      <button onClick={() => onClick()}>
        <ChevronLeftIcon className="absolute left-1 sm:left-16 top-1/2 p-2 stroke-current z-10 text-dnr-green bg-gray-100 rounded-full w-8 h-8 hover:text-dnr-orange hover:bg-dnr-green" />
      </button>
    )
  }

  return (
    <section className="my-3 px-3 sm:my-8">
      <div
        style={{
          position: 'relative',
        }} 
        className="pb-5 sm:pb-8"
      >
        <Carousel
          responsive={{
            desktop: {
              breakpoint: {max: 3000, min: 1024},
              items: 1,
            },
            tablet: {
              breakpoint: {max: 1024, min: 464},
              items: 1,
            },
            mobile: {
              breakpoint: {max: 464, min: 0},
              items: 1,
              paritialVisibilityGutter: 30,
              slidesToSlide: 1, // optional, default to 1.
            },
          }}
          swipeable={false}
          draggable={false}
          showDots={true}
          infinite={true}
          autoPlay={true} // later change to true
          renderDotsOutside={true}
          autoPlaySpeed={8000}
          transitionDuration={2000}
          customDot={<CustomDot />}
          customButtonGroup={<ButtonGroup />}
          renderButtonGroupOutside={true}
          arrows={false}
          // customRightArrow={<CustomRightArrow />}
          // customLeftArrow={<CustomLeftArrow />}
          containerClass="mx-auto h-full w-full sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl rounded-lg shadow-lg"
        >
          {banners.map((image) => (
            <div key={image.id}>
              <img
                className="w-full h-full object-fill object-center rounded-md shadow-lg"
                alt={image.id}
                src={image.image}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
