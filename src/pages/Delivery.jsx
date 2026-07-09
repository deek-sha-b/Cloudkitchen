import { useState, useEffect } from 'react';
import { getOrders, updateOrder, createOrder } from '../services/api';
import toast from 'react-hot-toast';

const Delivery = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  const fetchOrders = async () => {
    try {
      const { data } = await getOrders();
      setOrders(data.filter(o => ['Ready', 'Packed', 'Out for Delivery'].includes(o.status)));
    } catch (error) {
      toast.error('Failed to load delivery orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleAssignDriver = async (orderId, driver) => {
    try {
      await updateOrder(orderId, { deliveryPartner: driver, status: 'Out for Delivery' });
      toast.success(`Assigned to ${driver}`);
      fetchOrders();
    } catch (error) {
      toast.error('Failed to assign driver');
    }
  };

  const handleMarkDelivered = async (orderId) => {
    try {
      await updateOrder(orderId, { status: 'Delivered' });
      toast.success('Order marked as delivered');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Simulation Logic
  useEffect(() => {
    let simInterval;
    if (simulating) {
      simInterval = setInterval(async () => {
        const brands = ['Pizza Palace', 'Burger Hub', 'Biryani Express'];
        const foods = ['Margherita Pizza', 'Classic Burger', 'Chicken Biryani'];
        const sources = ['Swiggy', 'Zomato', 'Uber Eats'];
        const mockNames = ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Reddy', 'Vikram Singh', 'Neha Gupta'];
        
        const newOrder = {
          customerName: mockNames[Math.floor(Math.random() * mockNames.length)],
          phone: '9999999999',
          brand: brands[Math.floor(Math.random() * brands.length)],
          foodItem: foods[Math.floor(Math.random() * foods.length)],
          quantity: 1,
          price: 250,
          totalAmount: 250,
          source: sources[Math.floor(Math.random() * sources.length)],
          status: 'Packed'
        };
        
        try {
          await createOrder(newOrder);
          toast.success(`New ${newOrder.source} Order Received!`, {
            icon: '🔔',
            style: { borderRadius: '10px', background: '#333', color: '#fff' }
          });
          fetchOrders();
        } catch (e) {
          console.error(e);
        }
      }, 8000);
    }
    return () => clearInterval(simInterval);
  }, [simulating]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Delivery Management</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setSimulating(!simulating)}
              className={`px-4 py-2 rounded-lg font-bold text-white transition-colors ${simulating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {simulating ? 'Stop Simulation' : 'Start Simulation'}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 border-b">
                <th className="p-4">Customer</th>
                <th className="p-4">Food</th>
                <th className="p-4">Status</th>
                <th className="p-4">Driver</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-b">
                  <td className="p-4 font-medium">{order.customerName}</td>
                  <td className="p-4">{order.foodItem}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-bold">{order.status}</span>
                  </td>
                  <td className="p-4">
                    {order.deliveryPartner ? (
                      <span className="font-semibold text-gray-700">{order.deliveryPartner}</span>
                    ) : (
                      <select 
                        onChange={(e) => handleAssignDriver(order._id, e.target.value)}
                        className="border rounded p-1 text-sm bg-gray-50"
                        defaultValue=""
                      >
                        <option value="" disabled>Assign...</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Amit">Amit</option>
                        <option value="Sneha">Sneha</option>
                        <option value="Priya">Priya</option>
                      </select>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {order.status === 'Out for Delivery' && (
                      <button 
                        onClick={() => handleMarkDelivered(order._id)}
                        className="bg-primary text-white px-3 py-1 rounded text-sm font-bold"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No active deliveries.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
