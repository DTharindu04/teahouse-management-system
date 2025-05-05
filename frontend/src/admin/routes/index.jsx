import { createBrowserRouter } from 'react-router-dom';



import MainRoutes from './MainRoutes';



const router = createBrowserRouter([MainRoutes], {
  basename: process.env.REACT_APP_BASE_NAME
});

export default router;
