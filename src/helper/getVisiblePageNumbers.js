/**
 * Calculates an array of visible page numbers based on the current page, total pages, and visible page count.
 *
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {number} visiblePageCount - The count of visible page numbers in the array.
 *
 * @returns {number[]} - Returns an array of visible page numbers.
 */
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

  //Returns an array
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )
}

export default getVisiblePageNumbers
