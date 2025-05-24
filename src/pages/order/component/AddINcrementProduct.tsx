const QtyControl = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex h-8 items-center">
      <button
        onClick={handleDecrement}
        className="flex h-full w-6 items-center justify-center rounded-l bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-strokedark"
      >
        -
      </button>
      <div className="flex h-full min-w-[40px] items-center justify-center border-y border-gray-200 bg-white px-2 text-center text-sm dark:border-strokedark dark:bg-strokedark">
        {value}
      </div>
      <button
        onClick={handleIncrement}
        className="flex h-full w-6 items-center justify-center rounded-r bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-strokedark"
      >
        +
      </button>
    </div>
  );
};

export default QtyControl;
