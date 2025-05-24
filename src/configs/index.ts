export const APP_NAME = 'CF_PLUS';

export const ENDPOINT_API = 'https://staging-apicf.singha.cc';
// export const ENDPOINT_API = 'http://localhost:3000';

export const HMAC_SECRET = 'G2R7UbX2iHY4EB74';

export const FACEBOOK_APP_ID = '1322809388959711';

export const FORMAT_DATE = '{dd}/{MM}/{yyyy}';

export const FORMAT_MONTH = '{MMMM}';

export const FORMAT_YEAR = '{yyyy}';

export const FORMAT_DATETIME = '{dd}/{MM}/{yyyy} {HH}:{mm}:{ss}';

export const ROLE_OPTIONS = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'staff', label: 'Staff' },
];

export const ROW_PER_PAGE = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export enum OrderStatus {
  InCart = 'in_cart',
  Pending = 'pending',
  Verified = 'verified',
  Packed = 'packed',
  OnDelivery = 'on_delivery',
  DeliverySuccess = 'delivery_success',
  Success = 'success',
  Cancel = 'cancel',
  Expired = 'expired',
}

export function getNextStatuses(status: OrderStatus): OrderStatus[] {
  switch (status) {
    case OrderStatus.InCart:
      return [OrderStatus.Pending, OrderStatus.Verified, OrderStatus.Expired, OrderStatus.Cancel];
    case OrderStatus.Pending:
      return [OrderStatus.Verified, OrderStatus.Cancel];
    case OrderStatus.Verified:
      return [OrderStatus.Packed, OrderStatus.Cancel];
    case OrderStatus.Packed:
      return [OrderStatus.OnDelivery, OrderStatus.Cancel];
    case OrderStatus.OnDelivery:
      return [OrderStatus.DeliverySuccess, OrderStatus.Success];
    case OrderStatus.DeliverySuccess:
      return [OrderStatus.Success];
    case OrderStatus.Success:
      return [OrderStatus.Expired, OrderStatus.Cancel];
    case OrderStatus.Cancel:
    case OrderStatus.Expired:
      return [];
    default:
      console.error(`Unexpected status: ${status}`);
      return [];
  }
}

export enum NOTIFICATION_TYPE {
  newOrder = 'new_order',
  confirm_order = 'confirm_order',
  product_out_stock = 'product_out_of_stock',
  announcement = 'announcement',
  report = 'report',
  user_package_expired_soon = 'user_package_expired_soon',
  direct_user = 'direct_user',
}
