// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };


const dashboard = {
  id: 'dashboard',
  type: 'group',
  children: [
    {
      id: 'dashbord',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
