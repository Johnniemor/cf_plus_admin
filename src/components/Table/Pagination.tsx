import { useTranslation } from 'react-i18next';

interface ITablePagination {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  options?: number[];
  rowsPerPage?: number;
  onRowsPerPageChange?: (rows: number) => void;
}

export default function TablePagination({
  totalPages,
  currentPage,
  onPageChange,
  options = [10, 20, 30],
  rowsPerPage = 10,
  onRowsPerPageChange = () => {},
}: ITablePagination) {
  const { t } = useTranslation();
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 3;
    let startPage = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisible + 1, 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <li key="start-ellipsis">
          <button
            onClick={() => onPageChange(1)}
            className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:border-strokedark dark:bg-boxdark dark:hover:bg-gray-700 dark:hover:text-white"
          >
            1
          </button>
        </li>,
      );

      if (startPage > 2) {
        pageNumbers.push(
          <li key="ellipsis-start" className="px-2">
            ...
          </li>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => onPageChange(i)}
            className={`flex h-8 items-center justify-center border px-3 leading-tight dark:border-strokedark dark:bg-boxdark ${
              currentPage === i
                ? 'border-blue-300 bg-blue-100 hover:bg-blue-100 hover:text-white dark:bg-blue-600'
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            }`}
          >
            {currentPage} / {totalPages}
          </button>
        </li>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <li key="ellipsis-end" className="px-2">
            ...
          </li>,
        );
      }

      pageNumbers.push(
        <li key="end-ellipsis">
          <button
            onClick={() => onPageChange(totalPages)}
            className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:border-strokedark dark:bg-boxdark dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {totalPages}
          </button>
        </li>,
      );
    }

    return pageNumbers;
  };

  const handlePrevClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="my-4">
      <div className="flex items-center justify-end px-4">
        {/* <h1>
          Showing {currentPage} - {totalPages} of {totalPages} entries
        </h1> */}
        <div className="flex items-center gap-6 px-2 py-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">{t('label_row_per_page')} </span>
            <select
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
              className="rounded-md border px-2 py-1.5 text-sm text-gray-700 dark:border-strokedark dark:bg-boxdark dark:text-gray-300"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <ul className="flex h-8 list-none items-center justify-end -space-x-px text-sm">
            <li>
              <button
                onClick={handlePrevClick}
                disabled={currentPage === 1}
                className={`} flex h-8 items-center justify-center rounded-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-strokedark dark:bg-boxdark dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-2.5 w-2.5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>
            {/* {renderPageNumbers()} */}
            <div className="px-2">
              {currentPage}/{totalPages}
            </div>
            <li>
              <button
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
                className={`flex h-8 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-strokedark dark:bg-boxdark dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === totalPages && 'cursor-not-allowed opacity-50'
                }`}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-2.5 w-2.5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
