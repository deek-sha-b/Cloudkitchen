import { useState, useEffect } from 'react';
import { getOrders, updateOrder } from '../services/api';
import toast from 'react-hot-toast';
import { MdAccessTime, MdStorefront } from 'react-icons/md';

const COLUMNS = ['New', 'Preparing', 'Ready', 'Packed', 'Out for Delivery', 'Delivered'];

const KitchenBoard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await getOrders();
      setOrders(data.filter(o => o.status !== 'Cancelled'));
    } catch (error) {
      toast.error('Failed to load board');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 8000);
    return () => clearInterval(interval);
  }, []);

  const moveNext = async (order) => {
    const currentIndex = COLUMNS.indexOf(order.status);
    if (currentIndex < COLUMNS.length - 1) {
      const nextStatus = COLUMNS[currentIndex + 1];
      try {
        await updateOrder(order._id, { status: nextStatus });
        toast.success(`Moved to ${nextStatus}`);
        fetchOrders();
      } catch (error) {
        toast.error('Failed to update status');
      }
    }
  };

  const getBrandColor = (brand) => {
    switch (brand) {
      case 'Pizza Palace': return 'bg-red-100 text-red-800 border-red-200';
      case 'Burger Hub': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Biryani Express': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Kitchen Board</h2>
          <p className="text-gray-500">Kanban view of all active orders</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-max pb-4">
          {COLUMNS.map((column) => (
            <div key={column} className="w-80 bg-gray-100 rounded-xl p-4 flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">{column}</h3>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm font-semibold">
                  {orders.filter(o => o.status === column).length}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {orders.filter(o => o.status === column).map(order => (
                  <div key={order._id} className={`bg-white p-4 rounded-lg shadow-sm border ${getBrandColor(order.brand)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-gray-900">#{order._id.slice(-4).toUpperCase()}</span>
                      <span className="text-xs font-semibold px-2 py-1 bg-white/50 rounded">{order.source}</span>
                    </div>
                    
                    <h4 className="font-bold text-lg mb-1">{order.foodItem} x{order.quantity}</h4>
                    <p className="text-sm font-medium mb-3">{order.customerName}</p>
                    
                    <div className="flex items-center gap-4 text-xs font-medium opacity-80 mb-4">
                      <div className="flex items-center gap-1"><MdStorefront /> {order.brand}</div>
                      <div className="flex items-center gap-1"><MdAccessTime /> {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>

                    {column !== 'Delivered' && (
                      <button 
                        onClick={() => moveNext(order)}
                        className="w-full bg-white/80 hover:bg-white text-gray-800 font-bold py-2 rounded shadow-sm transition-colors"
                      >
                        Move to {COLUMNS[COLUMNS.indexOf(column) + 1]}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitchenBoard;
