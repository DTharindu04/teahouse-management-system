import { Routes, Route } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes'; // assuming it's correctly exporting `MainLayout` with children
import NavigationScroll from './layout/NavigationScroll';
import ThemeCustomization from './themes';

export default function AdminApp() {
  return (
    <ThemeCustomization>
      <NavigationScroll>
        <Routes>
          <Route path="/" element={MainRoutes.element}>
            {MainRoutes.children.map((route, idx) => (
              <Route key={idx} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </NavigationScroll>
    </ThemeCustomization>
  );
}
