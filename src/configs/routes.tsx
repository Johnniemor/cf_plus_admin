import { ReactElement } from 'react';
import Register from '@/pages/Authentication/Register';
import Home from '@/pages/Home';
import Login from '@/pages/Authentication/Login';
import CategoryPage from '@/pages/inventory_product/CategotyPage';
import CreateCategory from '@/pages/inventory_product/component/CreateCategory';
import CreateUnit from '@/pages/inventory_product/component/CreateUnit';
import ProductPage from '@/pages/inventory_product/ProductPage';
import Supplier from '@/pages/inventory_product/SupplierPage';
import UnitPage from '@/pages/inventory_product/UnitPage';
import CreateSupplier from '@/pages/inventory_product/component/CreateSupplier';
import CreateProduct from '@/pages/inventory_product/component/CreateProduct';
import ProductDetail from '@/pages/inventory_product/component/ProductDetail';
import OrderPage from '@/pages/order/Order';
import CreateOrder from '@/pages/order/component/CreateOrder';
import PaymentBill from '@/pages/cart/PaymentBill';
import ConfirmLocation from '@/pages/cart/ConfirmLocation';
import OrderCart from '@/pages/cart/OrderCart';
import Employee from '@/pages/employee/Employee';
import CreateEmployee from '@/pages/employee/component/CreateEmployee';
import Sang from '@/pages/sang/Sang';
import VerifyEmail from '@/pages/Authentication/VerifyEmail';
import StockPage from '@/pages/stock/Stock';
import CreateStock from '@/pages/stock/CreateStock';
import ForgotPassword from '@/pages/Authentication/ForgotPassword';
import ResetPassword from '@/pages/Authentication/ResetPassword';
import ChangePassword from '@/pages/Profile/ChangePassword';
import GroupPage from '@/pages/group/GroupPage';
import ShopPage from '@/pages/shop_page/ShopPage';
import CreateGroup from '@/pages/group/component/CreateGroup';
import GroupDetail from '@/pages/group/component/GroupDetail';
import CreateGroupDetail from '@/pages/group/component/CreateGroupDetail';
import Onboarding from '@/pages/Onboarding';
import NoCFPage from '@/pages/no_cf/NoCfPage';
import MerchantPage from '@/pages/merchant/MerchatPage';
import CreateMerchant from '@/pages/merchant/component/CreateMerchant';
import MessagePage from '@/pages/shop_page/component/Message';
import PosOrderPage from '@/pages/pos_order/PosOrderPage';
import CreatePosOrder from '@/pages/pos_order/component/CreatePosOrder';
import CreateInventory from '@/pages/inventory_product/component/CreateInventory';
import PosDetail from '@/pages/pos_order/component/PosDetailOrder';
import InventoryPage from '@/pages/merchant/component/Inventory';
import CreateProductMerchant from '@/pages/merchant/component/CreateProductMerchant';

export interface IRoute {
  path: string;
  title: string;
  permissions?: Array<string>;
  component: ReactElement;
}
export const ROUTES: IRoute[] = [
  // require token
  {
    path: '/',
    title: 'CF+',
    component: <Home />,
  },
  {
    path: '/change-password',
    title: 'change password | CF+',
    component: <ChangePassword />,
  },
  {
    path: '/product/all',
    title: 'Inventory | CF+',
    component: <ProductPage />,
  },
  {
    path: '/product/create',
    title: 'Create Product | CF+',
    component: <CreateProduct />,
  },
  {
    path: '/product/edit/:id',
    title: 'Edit Product | CF+',
    component: <CreateProduct />,
  },
  {
    path: '/product/detail/:id',
    title: 'Create Product | CF+',
    component: <ProductDetail />,
  },
  {
    path: '/inventory/:id',
    title: 'Create Product | CF+',
    component: <InventoryPage />,
  },
  {
    path: '/inventory/create/:id',
    title: 'Create Inventory | CF+',
    component: <CreateProductMerchant />,
  },
  {
    path: '/inventory/edit/:id',
    title: 'Edit inventory | CF+',
    component: <CreateInventory />,
  },

  {
    path: '/product/category',
    title: 'Category | CF+',
    component: <CategoryPage />,
  },
  {
    path: '/product/category/create',
    title: 'Create Category | CF+',
    component: <CreateCategory />,
  },
  {
    path: '/product/category/edit/:id',
    title: 'Edit Category | CF+',
    component: <CreateCategory />,
  },
  {
    path: '/product/units',
    title: 'Units | CF+',
    component: <UnitPage />,
  },
  {
    path: '/product/units/create',
    title: 'Create Units | CF+',
    component: <CreateUnit />,
  },
  {
    path: '/product/units/edit/:id',
    title: 'Edit Units | CF+',
    component: <CreateUnit />,
  },
  {
    path: '/product/supplier',
    title: 'Supplier | CF+',
    component: <Supplier />,
  },
  {
    path: '/product/supplier/create',
    title: 'Create Supplier | CF+',
    component: <CreateSupplier />,
  },
  {
    path: '/product/supplier/edit/:id',
    title: 'Edit Supplier | CF+',
    component: <CreateSupplier />,
  },
  {
    path: '/order/all',
    title: 'Order | CF+',
    component: <OrderPage />,
  },
  {
    path: '/order/detail:id',
    title: 'Order | CF+',
    component: <OrderPage />,
  },
  {
    path: '/order/create',
    title: 'Order Create | CF+',
    component: <CreateOrder />,
  },

  {
    path: '/cart/payment',
    title: 'Payment | CF+',
    component: <PaymentBill />,
  },
  {
    path: '/cart/location',
    title: 'Confirm Location | CF+',
    component: <ConfirmLocation />,
  },
  {
    path: '/employee',
    title: 'Employee | CF+',
    component: <Employee />,
  },
  {
    path: '/employee/create',
    title: 'Create Employee | CF+',
    component: <CreateEmployee />,
  },
  {
    path: '/employee/update/:id',
    title: 'update Employee | CF+',
    component: <CreateEmployee />,
  },
  // {
  //   path: '/sang',
  //   title: 'Sang | CF+',
  //   component: <Sang />,
  // },
  {
    path: '/stock',
    title: 'Stock | CF+',
    component: <StockPage />,
  },
  {
    path: '/stock/create',
    title: 'Stock Create | XMTechnovator',
    component: <CreateStock />,
  },
  {
    path: '/group',
    title: 'Group | XMTechnovator',
    component: <GroupPage />,
  },
  {
    path: '/group/create',
    title: 'Group Create | XMTechnovator',
    component: <CreateGroup />,
  },
  {
    path: '/group/update/:id',
    title: 'Group Update | XMTechnovator',
    component: <CreateGroup />,
  },
  {
    path: '/group/detail/:id',
    title: 'Group Detail | XMTechnovator',
    component: <GroupDetail />,
  },
  {
    path: '/group/detail/create/:id',
    title: 'Group Detail create | XMTechnovator',
    component: <CreateGroupDetail />,
  },

  {
    path: '/page',
    title: 'Page | XMTechnovator',
    component: <ShopPage />,
  },
  {
    path: '/page/message/:id',
    title: 'Page Message | XMTechnovator',
    component: <MessagePage />,
  },
  // {
  //   path: '/page/message',
  //   title: 'Page Message | XMTechnovator',
  //   component: <MessagePageAll />,
  // },
  {
    path: '/onboarding',
    title: 'Onboarding | XMTechnovator',
    component: <Onboarding />,
  },
  {
    path: '/setting/post',
    title: 'No CF | XMTechnovator',
    component: <NoCFPage />,
  },
  {
    path: '/merchant',
    title: 'merchant | XMTechnovator',
    component: <MerchantPage />,
  },
  {
    path: '/merchant/create',
    title: 'Create merchant | XMTechnovator',
    component: <CreateMerchant />,
  },
  {
    path: '/merchant/edit/:id',
    title: 'Update merchant | XMTechnovator',
    component: <CreateMerchant />,
  },
  {
    path: '/posOrder',
    title: 'PosOrder | XMTechnovator',
    component: <PosOrderPage />,
  },
  {
    path: '/posOrder/create',
    title: 'PosOrder Create | XMTechnovator',
    component: <CreatePosOrder />,
  },
  {
    path: '/posOrder/detail/:id',
    title: 'PosOrder detail | XMTechnovator',
    component: <PosDetail />,
  },
];

export const AUTH_ROUTES: IRoute[] = [
  // free
  {
    path: '/auth',
    title: 'Login | CF+',
    component: <Login />,
  },
  {
    path: '/auth/register',
    title: 'Register | CF+',
    component: <Register />,
  },
  {
    path: '/auth/forgot-password',
    title: 'Forgot Password | CF+',
    component: <ForgotPassword />,
  },
  {
    path: '/auth/set-password',
    title: 'Set Password | CF+',
    component: <ResetPassword />,
  },
  {
    path: '/auth/verify-email',
    title: 'Verify Email | CF+',
    component: <VerifyEmail />,
  },
];
