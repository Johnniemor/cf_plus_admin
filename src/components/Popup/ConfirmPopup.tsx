import React, { useEffect, useRef } from 'react';
import Button, { ButtonVariant } from '@/components/Button';

interface ConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProcess: () => void;
  title: string;
  description: string;
  closeLabel: string;
  processLabel: string;
  processColor: ButtonVariant;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  isOpen,
  onClose,
  onProcess,
  title,
  description,
  closeLabel,
  processLabel,
  processColor,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleProcess = () => {
    onProcess();
    onClose();
  };

  return (
    <div className="z-9999 fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center">
      <div
        ref={popupRef}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-lg min-w-[250px] w-full max-w-xl p-6"
      >
        <div className="flex justify-between items-center">
          <h2
            className="text-xl font-semibold text-slate-800 dark:text-white"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <button
            onClick={onClose}
            className="text-slate-900 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white"
          >
            <span className="text-3xl">&times;</span>
          </button>
        </div>
        <div
          className="mt-4 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={onClose} variant="secondary">
            {closeLabel}
          </Button>
          <Button onClick={handleProcess} variant={processColor}>
            {processLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
