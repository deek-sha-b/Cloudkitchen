import { useState, useEffect } from 'react';
import { getAnalyticsData } from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

const Analytics = () => {
  const [data, setData] = useState(null);
  const COLORS = ['#FF6B35', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAnalyticsData();
        setData(res.data);
      } catch (error) {
        console.error('Failed to load analytics', error);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div className="flex h-full items-center justify-center">Loading analytics...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & Reports</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue by Brand */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold mb-4">Revenue by Brand</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="revenue" fill="#FF6B35" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders by Platform */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold mb-4">Orders by Platform</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.platformData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label>
                  {data.platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold mb-4">Order Status Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.statusData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
