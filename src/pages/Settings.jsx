import { useState } from 'react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    kitchenName: 'KitchenFlow HQ',
    email: 'admin@kitchenflow.com',
    phone: '+91 9876543210',
    address: '123 Cloud Street, Food City, Bangalore',
    openTime: '10:00',
    closeTime: '23:00',
    autoAssign: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Settings updated successfully');
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Kitchen Settings</h2>
      
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kitchen Name</label>
                <input type="text" value={settings.kitchenName} onChange={e => setSettings({...settings, kitchenName: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input type="text" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location Address</label>
                <input type="text" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Operating Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opening Time</label>
                <input type="time" value={settings.openTime} onChange={e => setSettings({...settings, openTime: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Closing Time</label>
                <input type="time" value={settings.closeTime} onChange={e => setSettings({...settings, closeTime: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Preferences</h3>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="autoAssign"
                checked={settings.autoAssign}
                onChange={e => setSettings({...settings, autoAssign: e.target.checked})}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
              <label htmlFor="autoAssign" className="ml-3 text-gray-700 font-medium">
                Auto-assign delivery partners when order is Ready
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#e65c2b] transition-all">
              Save Settings
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Settings;
