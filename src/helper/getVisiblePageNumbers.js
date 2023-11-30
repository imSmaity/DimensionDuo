const getVisiblePageNumbers = (currentPage, totalPages, visiblePageCount) => {
  const halfVisible = Math.floor(visiblePageCount / 2)
  let startPage = currentPage - halfVisible
  let endPage = currentPage + halfVisible

  if (startPage < 1) {
    startPage = 1
    endPage = Math.min(visiblePageCount, totalPages)
  }

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, totalPages - visiblePageCount + 1)
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )
}

export default getVisiblePageNumbers
