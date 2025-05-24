interface IRowsPerPage {
  options: number[];
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
}

export default function RowsPerPage({
  options,
  rowsPerPage,
  onRowsPerPageChange,
}: IRowsPerPage) {
  return (
    <div className="flex items-center space-x-2">
      <label
        htmlFor="rowsPerPage"
        className="text-sm text-gray-700 dark:text-gray-300"
      >
        Rows per page:
      </label>
      <select
        id="rowsPerPage"
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        className="px-2 py-1.5 border rounded-md text-sm text-gray-700 dark:border-strokedark dark:bg-boxdark dark:text-gray-300"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
