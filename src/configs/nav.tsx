import { useTranslation } from 'react-i18next';
import {
  iconBox,
  iconCard,
  iconCart,
  iconCarts,
  iconClock,
  iconDocumentDetail,
  iconGroup,
  iconHome,
  iconHomeOutline,
  iconInventory,
  iconPage,
  iconPersonOutline,
  iconPoll,
} from './icon';

type IMenu = {
  name: string;
  path: string;
  icon: any;
  subs?: Array<IMenu>;
};
export const MENU = (t: any): Array<IMenu> => [
  {
    name: t('sidebar.dashboard'),
    path: '/',
    icon: iconHome,
  },
  {
    name: t('sidebar.list_product'),
    path: '/product',
    icon: iconDocumentDetail,
    subs: [
      {
        name: t('sidebar.list_product_all'),
        path: '/product/all',
        icon: '',
      },
      {
        name: t('sidebar.list_product_create'),
        path: '/product/create',
        icon: '',
      },
      {
        name: t('sidebar.list_product_category'),
        path: '/product/category',
        icon: '',
      },
      {
        name: t('sidebar.list_product_unit'),
        path: '/product/units',
        icon: '',
      },
      {
        name: t('sidebar.list_product_supplier'),
        path: '/product/supplier',
        icon: '',
      },
    ],
  },
  {
    name: t('sidebar.stock_products'),
    path: '/stock',
    icon: iconInventory,
  },
  {
    name: t('sidebar.order'),
    path: '/order',
    icon: iconPoll,
    subs: [
      {
        name: t('sidebar.order_all'),
        path: '/order/all',
        icon: '',
      },
      {
        name: t('sidebar.order_create'),
        path: '/order/create',
        icon: '',
      },
    ],
  },
  {
    name: t('sidebar.manage_page'),
    path: '/page',
    icon: iconPage,
  },
  {
    name: t('sidebar.manage_group'),
    path: '/group',
    icon: iconGroup,
  },
  {
    name: t('sidebar.manage_staff'),
    path: '/employee',
    icon: iconPersonOutline,
  },
  // {
  //   name: t('sidebar.manage_store'),
  //   path: '/sang',
  //   icon: iconBox,
  // },
  {
    name: t('sidebar.merchant'),
    path: '/merchant',
    icon: iconBox,
  },
  {
    name: t('sidebar.pos_order'),
    path: '/posOrder',
    icon: iconBox,
  },
];

export const SETTING = (t: any): Array<IMenu> => [
  {
    name: t('sidebar.no_cf_post'),
    path: '/setting/post',
    icon: iconCard,
  },
  {
    name: t('sidebar.shop'),
    path: '/setting/shop',
    icon: iconHomeOutline,
  },
  {
    name: t('sidebar.ask_for_help'),
    path: '/setting/support',
    icon: iconClock,
  },
];
