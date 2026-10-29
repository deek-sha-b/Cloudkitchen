import { useState } from 'react';
import { MdNotifications, MdSearch } from 'react-icons/md';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <div className="relative">
          {/* <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary w-64"
          /> */}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-500 font-medium">
          {today}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MdNotifications size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-800">Notifications</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">2 New</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                  <p className="text-sm font-semibold text-gray-800">New Order Received 🔔</p>
                  <p className="text-xs text-gray-500 mt-1">Swiggy order #4092 just arrived.</p>
                  <p className="text-xs text-gray-400 mt-2">Just now</p>
                </div>
                <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <p className="text-sm font-semibold text-gray-800">Order Ready for Pickup</p>
                  <p className="text-xs text-gray-500 mt-1">Zomato order #9182 is ready.</p>
                  <p className="text-xs text-gray-400 mt-2">5 mins ago</p>
                </div>
              </div>
              <div className="p-3 border-t border-gray-100 text-center bg-gray-50">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-sm font-semibold text-primary hover:text-[#e65c2b]"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Kitchen Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
