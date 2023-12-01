import getVisiblePageNumbers from '../../../helper/getVisiblePageNumbers'
import left from '../../../assets/Expand_left.png'
import right from '../../../assets/Expand_right.png'

/**
 * Functional component representing a pagination control.
 *
 * @param {Object} props - Properties passed to the Pagination component.
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPage - The total number of pages.
 * @param {function} props.handlePageChange - Callback function triggered on page change.
 *
 * @returns {JSX.Element} - Returns JSX representing the Pagination component.
 */

const Pagination = ({ currentPage, totalPage, handlePageChange }) => {
  return (
    <div>
      <div className="pageWrapper">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={left} alt="left" />
        </button>
        {getVisiblePageNumbers(currentPage, totalPage, 5).map((page) => (
          <p
            key={page}
            onClick={() => handlePageChange(page)}
            style={{ color: page === currentPage ? '#0696FF' : 'initial' }}
          >
            {page}
          </p>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          <img src={right} alt="right" />
        </button>
      </div>
    </div>
  )
}

export default Pagination
