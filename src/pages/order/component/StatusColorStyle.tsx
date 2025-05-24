import StatusBadge from '@/components/Status/StatusBage';
import React from 'react';

interface ColorStateProps {
  status: string;
}

const ColorState: React.FC<ColorStateProps> = ({ status }) => {
  const stateStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-50 text-orange-500';
      case 'expired':
      case 'cancel':
        return 'bg-red-50 text-red-500';
      case 'in_cart':
        return 'bg-blue-50 text-blue-500';
      case 'packed':
        return 'bg-purple-50 text-purple-500';
      case 'verified':
      case 'delivery_success':
      case 'success':
        return 'bg-green-50 text-green-500';
      case 'on_delivery':
        return 'bg-yellow-50 text-yellow-500';
      default:
        return '';
    }
  };

  return <StatusBadge className={stateStatusColor(status)} status={status} />;
};

export default ColorState;
