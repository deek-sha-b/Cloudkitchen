import { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/api';
import StatCard from '../components/StatCard';
import { 
  MdReceipt, 
  MdKitchen, 
  MdCheckCircle, 
  MdDeliveryDining, 
  MdAttachMoney, 
  MdPendingActions 
} from 'react-icons/md';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    preparing: 0,
    ready: 0,
    delivered: 0,
    revenueToday: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Simulate real-time updates every 10 seconds
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const dummyBrandData = [
    { name: 'Pizza Palace', value: 400 },
    { name: 'Burger Hub', value: 300 },
    { name: 'Biryani Express', value: 300 },
  ];

  const dummyPlatformData = [
    { name: 'Swiggy', value: 45 },
    { name: 'Zomato', value: 35 },
    { name: 'Website', value: 10 },
    { name: 'Uber Eats', value: 10 },
  ];

  const COLORS = ['#FF6B35', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'];

  if (loading) {
    return <div className="flex h-full items-center justify-center">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard title="Total Orders" value={stats.totalOrders} icon={<MdReceipt size={24} />} bgClass="bg-blue-500" />
        <StatCard title="Preparing" value={stats.preparing} icon={<MdKitchen size={24} />} bgClass="bg-amber-500" />
        <StatCard title="Ready" value={stats.ready} icon={<MdCheckCircle size={24} />} bgClass="bg-emerald-500" />
        <StatCard title="Delivered" value={stats.delivered} icon={<MdDeliveryDining size={24} />} bgClass="bg-purple-500" />
        <StatCard title="Revenue Today" value={`₹${stats.revenueToday}`} icon={<MdAttachMoney size={24} />} bgClass="bg-primary" />
        <StatCard title="Pending" value={stats.pendingOrders} icon={<MdPendingActions size={24} />} bgClass="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Orders by Brand</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dummyBrandData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {dummyBrandData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Orders by Platform</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dummyPlatformData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {dummyPlatformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
