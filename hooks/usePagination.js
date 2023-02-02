import {useEffect, useState} from 'react'

export default function usePagination(data, {perPage = 3}) {
  const [initialData, setInitialData] = useState(chunkData(data, perPage))
  const [page, setPage] = useState(1)
  const [paginateData, setPaginateData] = useState([])
  const pageLimit = Math.ceil(data.length / perPage)

  // Bug, unlimited re-render, solved kalo sudah ada data aja
  // useEffect(() => {
  //   setInitialData(chunkData(data, perPage))
  //   setPage(1)
  // }, [data, perPage])

  useEffect(() => {
    setPaginateData(initialData[page - 1]) // Page start from 1 and index start from 0
  }, [page, initialData])

  function chunkData(data, perPage) {
    let result = []
    let inner = []
    let count = 0

    for (let i = 0; i < data.length; i++) {
      if (count === perPage) {
        result.push([...inner])
        inner = [data[i]]
        count = 1
      } else {
        inner.push(data[i])
        count++
      }
    }

    result.push(inner)
    return result
  }

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
    data: paginateData,
    page,
    isFirstPage: page === 1,
    isLastPage: page === pageLimit,
    pageLimit,
    goTo,
    goToNext,
    goToPrev,
  }
}
