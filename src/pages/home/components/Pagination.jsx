import getVisiblePageNumbers from '../../../helper/getVisiblePageNumbers'
import left from '../../../assets/Expand_left.png'
import right from '../../../assets/Expand_right.png'

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
