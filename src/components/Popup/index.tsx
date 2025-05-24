import React, { createContext, useContext, useState, ReactNode } from 'react';
import ConfirmPopup from './ConfirmPopup';
import { ButtonVariant } from '@/components/Button';

type TOpenConfirm = {
  title: string;
  description: string;
  closeLabel?: string;
  processLabel?: string;
  processColor?: ButtonVariant;
  callback?: () => void;
};

interface PopupContextProps {
  openConfirm: (args: TOpenConfirm) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
  const [popupCloseLabel, setPopupCloseLabel] = useState('');
  const [popupProcessLabel, setPopupProcessLabel] = useState('');
  const [popupProcessColor, setPopupProcessColor] =
    useState<ButtonVariant>('error');
  const [popupCallback, setPopupCallback] = useState<() => void>(
    () => () => {},
  );

  const openConfirm = (args: TOpenConfirm) => {
    const {
      title,
      description,
      closeLabel,
      processLabel,
      processColor,
      callback,
    } = args;
    setPopupTitle(title);
    setPopupDescription(description);
    setPopupCloseLabel(closeLabel || 'Close');
    setPopupProcessLabel(processLabel || 'Confirm');
    setPopupProcessColor(processColor || 'error');
    setPopupCallback(() => callback);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setPopupTitle('');
    setPopupDescription('');
    setPopupCloseLabel('');
    setPopupProcessLabel('');
    setPopupCallback(() => () => {});
  };

  return (
    <PopupContext.Provider value={{ openConfirm, closePopup }}>
      {children}
      <ConfirmPopup
        isOpen={isOpen}
        onClose={closePopup}
        title={popupTitle}
        description={popupDescription}
        closeLabel={popupCloseLabel}
        processLabel={popupProcessLabel}
        processColor={popupProcessColor}
        onProcess={popupCallback}
      />
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
