const StatCard = ({ title, value, icon, color, bgClass }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${bgClass} text-white mr-4 shadow-inner`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
