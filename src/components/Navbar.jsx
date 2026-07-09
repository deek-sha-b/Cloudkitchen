import { MdNotifications, MdSearch } from 'react-icons/md';

const Navbar = () => {
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

        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <MdNotifications size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>

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
