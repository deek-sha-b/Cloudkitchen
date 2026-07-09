import { useState, useEffect, useRef } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../services/api';
import toast from 'react-hot-toast';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';

const MENU_DATA = {
  "Pizza Palace": [
    { name: "Margherita Pizza", price: 250 },
    { name: "Farmhouse Pizza", price: 350 },
    { name: "Veg Supreme Pizza", price: 400 },
    { name: "Pepperoni Pizza", price: 450 },
    { name: "Chicken Tikka Pizza", price: 480 },
    { name: "Paneer Pizza", price: 380 },
    { name: "Cheese Burst Pizza", price: 420 },
    { name: "Garlic Bread", price: 120 },
    { name: "Stuffed Garlic Bread", price: 180 },
    { name: "French Fries", price: 100 },
    { name: "Cheese Fries", price: 150 },
    { name: "Coke", price: 50 },
    { name: "Pepsi", price: 50 }
  ],
  "Burger Hub": [
    { name: "Veg Burger", price: 150 },
    { name: "Chicken Burger", price: 220 },
    { name: "Cheese Burger", price: 250 },
    { name: "Double Chicken Burger", price: 320 },
    { name: "Paneer Burger", price: 210 },
    { name: "Crispy Chicken Burger", price: 280 },
    { name: "French Fries", price: 100 },
    { name: "Peri Peri Fries", price: 140 },
    { name: "Cheese Fries", price: 160 },
    { name: "Chicken Nuggets", price: 180 },
    { name: "Onion Rings", price: 120 },
    { name: "Coke", price: 50 },
    { name: "Sprite", price: 50 }
  ],
  "Biryani Express": [
    { name: "Chicken Biryani", price: 200 },
    { name: "Mutton Biryani", price: 280 },
    { name: "Veg Biryani", price: 160 },
    { name: "Paneer Biryani", price: 220 },
    { name: "Egg Biryani", price: 180 },
    { name: "Hyderabadi Chicken Biryani", price: 260 },
    { name: "Family Pack Chicken Biryani", price: 650 },
    { name: "Chicken Kebab", price: 180 },
    { name: "Raita", price: 30 },
    { name: "Gulab Jamun", price: 60 },
    { name: "Coke", price: 50 }
  ],
  "Chinese Wok": [
    { name: "Veg Fried Rice", price: 170 },
    { name: "Chicken Fried Rice", price: 220 },
    { name: "Schezwan Fried Rice", price: 210 },
    { name: "Veg Noodles", price: 180 },
    { name: "Chicken Noodles", price: 230 },
    { name: "Hakka Noodles", price: 220 },
    { name: "Gobi Manchurian", price: 180 },
    { name: "Chicken Manchurian", price: 250 },
    { name: "Spring Rolls", price: 160 },
    { name: "Chilli Chicken", price: 280 },
    { name: "Momos", price: 180 },
    { name: "Coke", price: 50 }
  ],
  "South Spice": [
    { name: "Masala Dosa", price: 90 },
    { name: "Plain Dosa", price: 70 },
    { name: "Ghee Roast", price: 140 },
    { name: "Idli", price: 50 },
    { name: "Vada", price: 40 },
    { name: "Pongal", price: 90 },
    { name: "Poori Bhaji", price: 100 },
    { name: "Lemon Rice", price: 120 },
    { name: "Curd Rice", price: 110 },
    { name: "Filter Coffee", price: 40 }
  ]
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBrand, setFilterBrand] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialFormData = {
    customerName: '', phone: '', brand: '', foodItem: '', quantity: 1, price: '', source: '', status: 'New'
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  const inputRefs = {
    customerName: useRef(null),
    phone: useRef(null),
    brand: useRef(null),
    source: useRef(null),
    foodItem: useRef(null),
    quantity: useRef(null),
    price: useRef(null),
    status: useRef(null)
  };

  const fetchOrders = async () => {
    try {
      const params = {};
      if (filterBrand) params.brand = filterBrand;
      if (filterStatus) params.status = filterStatus;
      const { data } = await getOrders(params);
      setOrders(data);
    } catch (error) {
      toast.error('Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filterBrand, filterStatus]);

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setFormData({
      ...formData,
      brand: selectedBrand,
      foodItem: '',
      price: ''
    });
  };

  const handleFoodItemChange = (e) => {
    const selectedFoodName = e.target.value;
    if (!formData.brand) return;
    const foodDetails = MENU_DATA[formData.brand]?.find(item => item.name === selectedFoodName);
    setFormData({
      ...formData,
      foodItem: selectedFoodName,
      price: foodDetails ? foodDetails.price : ''
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { customerName, phone, brand, source, foodItem, quantity, price, status } = formData;

    const trimmedName = customerName.trim();
    if (!trimmedName || !/^[a-zA-Z\s]{3,50}$/.test(trimmedName)) {
      newErrors.customerName = 'Please enter a valid customer name.';
    }

    const trimmedPhone = phone.trim();
    if (!trimmedPhone || !/^\d{10}$/.test(trimmedPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!brand || !Object.keys(MENU_DATA).includes(brand)) {
      newErrors.brand = 'Please select a brand.';
    }

    if (!source || !['Swiggy', 'Zomato', 'Uber Eats', 'Website', 'Walk-in'].includes(source)) {
      newErrors.source = 'Please select an order source.';
    }

    if (!foodItem || !brand || !MENU_DATA[brand]?.some(item => item.name === foodItem)) {
      newErrors.foodItem = 'Please select a valid food item.';
    }

    const q = Number(quantity);
    if (!quantity || !Number.isInteger(q) || q < 1 || q > 20) {
      newErrors.quantity = 'Quantity must be between 1 and 20.';
    }

    const p = Number(price);
    if (!price || isNaN(p) || p <= 0 || p > 10000) {
      newErrors.price = 'Enter a valid price.';
    }

    if (!status || !['New', 'Preparing', 'Ready', 'Packed', 'Out for Delivery', 'Delivered'].includes(status)) {
      newErrors.status = 'Please select a valid order status.';
    }

    setErrors(newErrors);
    
    // Focus first error field
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      if (inputRefs[firstErrorKey] && inputRefs[firstErrorKey].current) {
        inputRefs[firstErrorKey].current.focus();
      }
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Format data before sending
    const submitData = {
      ...formData,
      customerName: formData.customerName.trim(),
      phone: formData.phone.trim(),
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      totalAmount: Number(formData.quantity) * Number(formData.price)
    };

    try {
      if (editingId) {
        await updateOrder(editingId, submitData);
        toast.success('Order updated successfully.');
      } else {
        await createOrder(submitData);
        toast.success('Order created successfully.');
      }
      
      // Reset form fields
      setFormData({
        ...initialFormData,
        brand: formData.brand, // keep brand selected
        source: formData.source // keep source selected
      });
      setErrors({});
      
      // Close modal and refresh UI instantly
      setShowModal(false);
      setEditingId(null);
      fetchOrders();
      setIsSubmitting(false);
      
    } catch (error) {
      setIsSubmitting(false);
      if (error.response) {
        toast.error(error.response?.data?.message || 'Failed to create order.');
      } else {
        toast.error('Unable to connect to server.');
      }
    }
  };

  const handleEdit = (order) => {
    setFormData({
      customerName: order.customerName,
      phone: order.phone,
      brand: order.brand,
      foodItem: order.foodItem,
      quantity: order.quantity,
      price: order.price,
      source: order.source,
      status: order.status
    });
    setErrors({});
    setEditingId(order._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id);
        toast.success('Order deleted');
        fetchOrders();
      } catch (error) {
        toast.error('Failed to delete order');
      }
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'New': 'bg-blue-100 text-blue-800',
      'Preparing': 'bg-amber-100 text-amber-800',
      'Ready': 'bg-emerald-100 text-emerald-800',
      'Out for Delivery': 'bg-indigo-100 text-indigo-800',
      'Delivered': 'bg-gray-100 text-gray-800',
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || colors['New']}`}>{status}</span>;
  };

  const totalAmount = (Number(formData.quantity) || 0) * (Number(formData.price) || 0);

  const handleNumberInputKeyDown = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Orders Management</h2>
        <button 
          onClick={() => { setFormData(initialFormData); setEditingId(null); setErrors({}); setShowModal(true); }}
          className="bg-primary hover:bg-[#e65c2b] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <MdAdd /> Add Order
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)} className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto">
          <option value="">All Brands</option>
          {Object.keys(MENU_DATA).map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto">
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Packed">Packed</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="text-center py-10">Loading orders...</div>
        ) : (
          <div className="min-w-max">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b">
                  <th className="p-4 font-semibold">Customer</th>
                  <th className="p-4 font-semibold">Food Item</th>
                  <th className="p-4 font-semibold">Brand</th>
                  <th className="p-4 font-semibold">Source</th>
                  <th className="p-4 font-semibold">Total Amount</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-gray-800">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{order.phone}</p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">{order.foodItem} x{order.quantity}</td>
                    <td className="p-4"><span className="font-medium">{order.brand}</span></td>
                    <td className="p-4"><span className="text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm">{order.source}</span></td>
                    <td className="p-4 font-semibold">₹{order.totalAmount || (order.price * order.quantity)}</td>
                    <td className="p-4">{getStatusBadge(order.status)}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleEdit(order)} className="text-blue-500 hover:text-blue-700 mx-2 p-1"><MdEdit size={20}/></button>
                      <button onClick={() => handleDelete(order._id)} className="text-red-500 hover:text-red-700 p-1"><MdDelete size={20}/></button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan="7" className="text-center py-8 text-gray-500">No orders found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">{editingId ? 'Edit Order' : 'Create Order'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">Customer Name <span className="text-red-500">*</span></label>
                  <input 
                    ref={inputRefs.customerName}
                    type="text" 
                    value={formData.customerName} 
                    onChange={e => setFormData({...formData, customerName: e.target.value})} 
                    className={`w-full border rounded-lg p-2.5 outline-none transition-colors ${errors.customerName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary'}`} 
                  />
                  {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                </div>
                
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number <span className="text-red-500">*</span></label>
                  <input 
                    ref={inputRefs.phone}
                    type="text"
                    maxLength="10"
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} 
                    className={`w-full border rounded-lg p-2.5 outline-none transition-colors ${errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary'}`} 
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                
                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium mb-1">Brand <span className="text-red-500">*</span></label>
                  <select 
                    ref={inputRefs.brand}
                    value={formData.brand} 
                    onChange={handleBrandChange} 
                    className={`w-full border rounded-lg p-2.5 outline-none transition-colors ${errors.brand ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary'}`}
                  >
                    <option value="" disabled>Select a Brand</option>
                    {Object.keys(MENU_DATA).map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
                </div>
                
                {/* Source */}
                <div>
                  <label className="block text-sm font-medium mb-1">Source <span className="text-red-500">*</span></label>
                  <select 
                    ref={inputRefs.source}
                    value={formData.source} 
                    onChange={e => setFormData({...formData, source: e.target.value})} 
                    className={`w-full border rounded-lg p-2.5 outline-none transition-colors ${errors.source ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary'}`}
                  >
                    <option value="" disabled>Select an Order Source</option>
                    <option value="Swiggy">Swiggy</option>
                    <option value="Zomato">Zomato</option>
                    <option value="Uber Eats">Uber Eats</option>
                    <option value="Website">Website</option>
                    <option value="Walk-in">Walk-in</option>
                  </select>
                  {errors.source && <p className="text-red-500 text-xs mt-1">{errors.source}</p>}
                </div>
                
                {/* Food Item */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Food Item <span className="text-red-500">*</span></label>
                  <select 
                    ref={inputRefs.foodItem}
                    value={formData.foodItem} 
                    onChange={handleFoodItemChange} 
                    disabled={!formData.brand}
                    className={`w-full border rounded-lg p-2.5 outline-none transition-colors ${errors.foodItem ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary'} ${!formData.brand ? 'bg-gray-100 text-gray-400' : 'bg-white'}`}
                  >
                    <option value="" disabled>Select a Food Item</option>
                    {formData.brand && MENU_DATA[formData.brand]?.map(item => (
                      <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                  {errors.foodItem && <p className="text-red-500 text-xs mt-1">{errors.foodItem}</p>}
                </div>
                
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity <span className="text-red-500">*</span></label>
                  <input 
                    ref={inputRefs.quantity}
                    type="number" 
                    min="1" max="20" step="1"
                    onKeyDown={handleNumberInputKeyDown}
                    value={formData.quantity} 
                    onChange={e => setFormData({...formData, quantity: e.target.value})} 
                    className={`w-full border rounded-lg p-2.5 outline-none transition-colors ${errors.quantity ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary'}`} 
                  />
                  {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                </div>
                
                {/* Price (Read-only) */}
                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹) <span className="text-red-500">*</span></label>
                  <input 
                    ref={inputRefs.price}
                    type="number" 
                    readOnly
                    value={formData.price} 
                    className={`w-full border rounded-lg p-2.5 outline-none bg-gray-100 text-gray-700 ${errors.price ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300'}`} 
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
                
                {/* Status */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Status <span className="text-red-500">*</span></label>
                  <select 
                    ref={inputRefs.status}
                    value={formData.status} 
                    onChange={e => setFormData({...formData, status: e.target.value})} 
                    className={`w-full border rounded-lg p-2.5 outline-none transition-colors ${errors.status ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary'}`}
                  >
                    <option value="New">New</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Packed">Packed</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                </div>

              </div>

              {/* Real-time Total Amount */}
              <div className="bg-gray-50 p-4 rounded-lg mt-4 flex justify-between items-center border border-gray-100">
                <span className="font-medium text-gray-700">Total Amount:</span>
                <span className="text-xl font-bold text-primary">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 font-medium rounded-lg transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-[#e65c2b] transition-colors disabled:opacity-50 flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : (editingId ? 'Update Order' : 'Save Order')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
