import {useState} from 'react'
import {StarIcon} from '@heroicons/react/solid'
import {Pagination, HorizontalDivider} from '@/components/base'

import usePagination from 'hooks/usePagination'
import useServerPagination from 'hooks/useServerPagination'
import {fetchGet} from 'helpers/fetch'
import {formatSimpleDate} from 'helpers/formatDate'

function UserReview({review}) {
  return (
    <li className="flex space-x-14 py-4">
      <div className="flex space-x-2 w-1/6">
        {review.user.photo_url ? (
          <img
            src={process.env.NEXT_PUBLIC_URL + review.user.photo_url}
            alt="User Profile"
            className="rounded-full w-14 h-14 object-cover items-center"
          />
        ) : (
          <img
            src="https://nrcqmmgoobssxyudfvxm.supabase.in/storage/v1/object/public/dnr-asset/user.png"
            alt="User Profile"
            className="rounded-full w-14 h-14 object-cover items-center"
          />
        )}

        <div>
          <p className="text-gray-900 font-semibold mb-1">{review.user.name}</p>
          <p>{formatSimpleDate(review.created_at)}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-3">
        <div className="flex space-x-0.5 mr-8">
          {Array.from({length: 5}).map((_, index) => (
            <StarIcon
              key={index}
              className={`w-5 h-5 ${index + 1 <= review.rating ? 'text-yellow-500' : 'text-gray-500'} `}
            />
          ))}
        </div>
        <span className="leading-6">{review.notes}</span>
      </div>
    </li>
  )
}

export default function Review({slug, count}) {
  const [page, setPage] = useState(1)

  const {
    data,
    isLoading: loadingReview,
    paginationFn,
  } = useServerPagination(
    {
      key: ['review', slug],
      fn: () => fetchGet(`product_reviews/${slug}?page=${page}&limit=10`),
      option: {
        keepPreviousData: 1,
        enabled: Boolean(slug),
      },
      perPage: 10,
    },
    (page) => setPage(page)
  )
  return (
    <div>
      {loadingReview ? (
        <p className="py-4 text-gray-700 text-center text-base font-light">Proses Pengambilan Data</p>
      ) : data?.reviews?.length === 0 && page === 1 ? (
        <h5 className="text-gray-700 leading-8 font-light">Belum ada Penilaian</h5>
      ) : (
        <>
          <h4 className="text-sm text-gray-900 font-normal leading-6 mb-2">Total Penilaian ({count})</h4>

          <HorizontalDivider className="mb-6" />

          <ul className="divide-y divide-opacity-30 divide-dnr-dark-orange text-sm font-light text-gray-600 mb-6">
            {data?.reviews.map((review) => (
              <UserReview key={review.id} review={review} />
            ))}
          </ul>

          <Pagination paginationFn={paginationFn} />
        </>
      )}
    </div>
  )
}
