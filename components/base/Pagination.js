import {ArrowCircleLeftIcon, ArrowCircleRightIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/outline'

export default function Pagination({paginationFn}) {
  function goToNext() {
    if (!paginationFn.isLastPage) {
      paginationFn.goToNext()
    }
  }

  function goToPrev() {
    if (!paginationFn.isFirstPage) {
      paginationFn.goToPrev()
    }
  }

  function goTo(page) {
    return function () {
      paginationFn.goTo(page)
    }
  }

  return (
    <div className="flex justify-center items-center space-x-8 text-base mb-8">
      {!paginationFn.isFirstPage ? (
        <ChevronLeftIcon
          className={`w-8 h-8 p-1.5 text-blue-500 rounded-full border border-blue-500 shadow hover:text-white hover:bg-wi-blue ${
            paginationFn.isFirstPage
              ? 'text-blue-500 cursor-not-allowed'
              : 'cursor-pointer'
          }`}
          onClick={goToPrev}
        />
      ) : null}

      {Array.from({length: paginationFn.pageLimit}).map((item, index) => (
        <span
          className={`font-normal ${
            paginationFn.page === index + 1 ? 'text-dnr-blue font-normal' : 'text-gray-600'
          } cursor-pointer hover:text-dnr-blue`}
          key={index}
          onClick={goTo(index + 1)}
        >
          {index + 1}
        </span>
      ))}
      {!paginationFn.isLastPage ? (
        <ChevronRightIcon
          className={`w-8 h-8 p-1.5 text-blue-500 rounded-full border border-blue-500 shadow hover:text-white hover:bg-wi-blue ${
            paginationFn.isLastPage
              ? 'text-blue-500 cursor-not-allowed'
              : 'cursor-pointer'
          }`}
          onClick={goToNext}
        />
      ) : null}
    </div>
  )
}
