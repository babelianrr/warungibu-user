import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'

export default function useServerPagination(query, onChangePage = () => {}) {
  const [page, setPage] = useState(1)

  const queryResult = useQuery(query.key, query.fn, query.option)
  const pageLimit = queryResult?.data?.totalPage

  useEffect(() => {
    onChangePage(page)
  }, [page])

  function goTo(page) {
    if (page >= 1 && page <= pageLimit) {
      setPage(page)
    }
  }

  function goToNext() {
    goTo(page + 1)
  }

  function goToPrev() {
    goTo(page - 1)
  }

  return {
    paginationFn: {
      page,
      isFirstPage: page === 1,
      isLastPage: page === pageLimit,
      pageLimit,
      goTo,
      goToNext,
      goToPrev,
    },
    ...queryResult,
  }
}
