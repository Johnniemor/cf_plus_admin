import React from 'react';
import { iconCancelRounded, iconNotification } from '@/configs/icon';

interface ActionButtonProps {
  id: string;
  onNotification: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ id, onDelete, onNotification }) => {
  return (
    <div className={`grid w-[50px] grid-cols-2 gap-4`}>
      <button onClick={() => onNotification(id)} className="">
        {iconNotification}
      </button>
      <button onClick={() => onDelete(id)} className="text-red-600 hover:text-red-800">
        {iconCancelRounded}
      </button>
    </div>
  );
};
