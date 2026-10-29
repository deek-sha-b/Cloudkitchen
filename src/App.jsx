import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import KitchenBoard from './pages/KitchenBoard';
import Delivery from './pages/Delivery';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('kitchenflow_auth');
  return isAuth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="kitchen-board" element={<KitchenBoard />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
