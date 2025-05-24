export const formatUTCDate = (split: boolean = true) => {
  const date = new Date();
  const formattedDate = date.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'UTC',
  });

  const [datePart, timePart] = formattedDate.split(', ');

  return (
    <>
      {datePart}
      {split ? (
        <>
          <br />
          <p className="text-sm">{timePart}</p>
        </>
      ) : (
        <span> - {timePart}</span>
      )}
    </>
  );
};
