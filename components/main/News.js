import {useState} from 'react'
import Carousel from 'react-multi-carousel'
import {ArrowCircleRightIcon, ArrowCircleLeftIcon} from '@heroicons/react/outline'

import Header from '@/components/main/utils/Header'
import 'react-multi-carousel/lib/styles.css'

const posts = [
  {
    title: 'Boost your conversion rate',
    href: '#',
    category: {name: 'Article', href: '#'},
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '6 min',
    author: {
      name: 'Roel Aufderehar',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    category: {name: 'Video', href: '#'},
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '4 min',
    author: {
      name: 'Brenna Goyette',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: {name: 'Case Study', href: '#'},
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: {name: 'Case Study', href: '#'},
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: {name: 'Case Study', href: '#'},
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function News() {
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
        <ArrowCircleRightIcon className="absolute right-0 top-1/3 w-12 h-12 text-dnr-dark-orange bg-white rounded-full" />
      </button>
    )
  }
  const CustomLeftArrow = ({onClick, ...rest}) => {
    return (
      <button onClick={() => onClick()}>
        <ArrowCircleLeftIcon className="absolute left-0 top-1/3 w-12 h-12 text-dnr-dark-orange bg-white rounded-full" />
      </button>
    )
  }
  return (
    <section className="mt-4">
      <div className="border-b border-dnr-blue mb-12"></div>

      <Header text="Berita Hari Ini" />

      <div className="bg-gray-50 mb-10">
        <div className="relative">
          <div className="mt-12">
            <Carousel
              responsive={{
                desktop: {
                  breakpoint: {max: 3000, min: 1024},
                  items: 3,
                },
                tablet: {
                  breakpoint: {max: 1024, min: 464},
                  items: 3,
                },
                mobile: {
                  breakpoint: {max: 464, min: 0},
                  items: 1,
                  slidesToSlide: 1, // optional, default to 1.
                },
              }}
              swipeable={false}
              draggable={false}
              showDots={true}
              infinite={false}
              autoPlay={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={true}
              transitionDuration={500}
              customDot={<CustomDot />}
              customRightArrow={<CustomRightArrow />}
              customLeftArrow={<CustomLeftArrow />}
            >
              {posts.map((post) => (
                <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden mx-4 h-96 mb-10">
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={post.imageUrl} alt="" />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <a href={post.href} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                      </a>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex text-sm text-gray-500 justify-between w-full">
                        <time dateTime={post.datetime}>{post.date}</time>
                        <a href={post.href}>
                          <p className="text-sm text-dnr-dark-turqoise">Baca Selengkapnya</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
