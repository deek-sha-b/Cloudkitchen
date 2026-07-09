import { NavLink, useNavigate } from 'react-router-dom';
import { 
  MdDashboard, 
  MdReceipt, 
  MdKitchen, 
  MdDeliveryDining, 
  MdAnalytics, 
  MdSettings, 
  MdLogout 
} from 'react-icons/md';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('kitchenflow_auth');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <MdDashboard size={24} /> },
    { name: 'Orders', path: '/orders', icon: <MdReceipt size={24} /> },
    { name: 'Kitchen Board', path: '/kitchen-board', icon: <MdKitchen size={24} /> },
    { name: 'Delivery', path: '/delivery', icon: <MdDeliveryDining size={24} /> },
    { name: 'Analytics', path: '/analytics', icon: <MdAnalytics size={24} /> },
    { name: 'Settings', path: '/settings', icon: <MdSettings size={24} /> },
  ];

  return (
    <div className="w-64 bg-dark text-white h-full flex flex-col shadow-xl">
      <div className="p-6 text-2xl font-bold flex items-center gap-2 text-primary">
        <MdKitchen size={32} />
        <span>KitchenFlow</span>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path}
                className={({isActive}) => 
                  `flex items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-800 ${
                    isActive ? 'bg-gray-800 border-r-4 border-primary text-primary' : 'text-gray-300'
                  }`
                }
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-full"
        >
          <MdLogout size={24} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
