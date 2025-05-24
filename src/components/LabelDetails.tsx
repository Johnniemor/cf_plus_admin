interface TLabelDetails {
  label: string;
  data?: string | number;
  className?: string;
  icon?: React.ReactNode;
}

function LabelDetails({ label, data, className, icon }: TLabelDetails) {
  return (
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
        {icon && <span className="icon flex-shrink-0">{icon}</span>}
        {label}
      </label>
      <b className={`text-gray-900 dark:text-white ${className}`}>
        {data || 'N/A'}
      </b>
    </div>
  );
}

export default LabelDetails;
