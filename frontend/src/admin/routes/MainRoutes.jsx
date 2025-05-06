import { lazy } from 'react';
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const OrderPage = Loadable(lazy(() => import('../views/orderManagement/Order')));
const FinancePage = Loadable(lazy(() => import('../views/finacialManagement/Finance')));
const InventoryPage = Loadable(lazy(() => import('../views/inventoryManagement/Inventory')));
const SupplierPage = Loadable(lazy(() => import('../views/supplierManagement/Supplier')));
const InventoryUpdatePage = Loadable(lazy(() => import('../views/inventoryManagement/InventoryUpdate')));
const InventoryAddPage = Loadable(lazy(() => import('../views/inventoryManagement/InventoryAdd')));
const MainRoutes = {
  path: '/',
  element: <MainLayout />, // This renders the admin header + sidebar
  children: [
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'adminorder',
      element: <OrderPage />
    },
    {
      path: 'finance',
      element: <FinancePage />
    },
    {
      path: 'inventory',
      element: <InventoryPage />
    },
    {
      path: 'adminsupplier',
      element: <SupplierPage />
    },
    {
      path: 'update_service/:id',
      element: <InventoryUpdatePage />
    },
    {
      path: 'add_inventory',
      element: <InventoryAddPage />
    },
  ]
};

export default MainRoutes;
