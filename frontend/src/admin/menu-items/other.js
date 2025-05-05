// assets
import { IconPackage,        
  IconTruck,          
  IconBuildingWarehouse,        
  IconCurrencyDollar } from '@tabler/icons-react';

// constant
const icons = {  IconPackage,
  IconTruck,
  IconBuildingWarehouse,
  IconCurrencyDollar };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    
    {
      id: 'order-page',
      title: 'Manage Orders',
      type: 'item',
      url: '/admin/adminorder',
      icon: icons.IconPackage,
      breadcrumbs: false
    },
    {
      id: 'supplier-page',
      title: 'Manage Suppliers',
      type: 'item',
      url: '/admin/adminsupplier',
      icon: icons.IconTruck,
      breadcrumbs: false
    },
    {
      id: 'inventory-page',
      title: 'Inventory Control',
      type: 'item',
      url: '/admin/inventory',
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false
    },
    {
      id: 'Financials-page',
      title: 'Financials',
      type: 'item',
      url: '/admin/finance',
      icon: icons.IconCurrencyDollar,
      breadcrumbs: false
    },
    
  ]
};

export default other;
