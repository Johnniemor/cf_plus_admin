import React from 'react';
import { iconAddRounded, iconEdit, iconSearch, iconTrash, iconTrashRounded } from '@/configs/icon';

interface TableActionProps {
  id?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  onSearch?: () => void;
}

export const TableAction: React.FC<TableActionProps> = ({ onEdit, onDelete, onAdd, onSearch }) => {
  return (
    <div className={`grid w-[100px] grid-cols-2`}>
      {onAdd && (
        <button className="w-6 rounded-full" onClick={onAdd}>
          {iconAddRounded}
        </button>
      )}
      {onSearch && <button onClick={onSearch}>{iconSearch}</button>}
      {onEdit && <button onClick={onEdit}>{iconEdit}</button>}
      {onDelete && (
        <button onClick={onDelete} className="text-red-600 hover:text-red-800">
          {iconTrashRounded}
        </button>
      )}
    </div>
  );
};
