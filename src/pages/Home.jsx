import { Link } from 'react-router-dom';
import { MdKitchen, MdAnalytics, MdDeliveryDining, MdOutlineStorefront, MdArrowForward } from 'react-icons/md';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-primary selection:text-white overflow-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <MdKitchen size={24} />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              KitchenFlow
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block text-gray-600 hover:text-primary font-medium transition-colors">
              Sign In
            </Link>
            <Link 
              to="/login" 
              className="bg-primary hover:bg-[#e65c2b] text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              Get Started <MdArrowForward />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-8 animate-bounce-slow">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            The Ultimate Cloud Kitchen OS
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
            One Dashboard.<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500"> Every Order. Every Brand.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed">
            Stop juggling tablets. KitchenFlow aggregates Swiggy, Zomato, and direct orders into a single, lightning-fast Kanban board designed specifically for cloud kitchens.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/login" 
              className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-gray-900/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Access Dashboard <MdArrowForward size={24} />
            </Link>
            <a 
              href="#features" 
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              See Features
            </a>
          </div>

          {/* Hero Image Mockup */}
          <div className="mt-20 relative mx-auto max-w-5xl group perspective">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent z-10 h-32 bottom-0 top-auto"></div>
            <div className="rounded-2xl shadow-2xl shadow-gray-200 overflow-hidden border border-gray-100 transform transition-transform duration-700 group-hover:scale-[1.02]">
              <div className="h-8 bg-gray-100 border-b flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="bg-white aspect-video relative flex">
                <div className="w-1/4 h-full bg-gray-50 border-r border-gray-100 p-4">
                  <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-10 bg-white rounded shadow-sm border border-gray-100"></div>
                    ))}
                  </div>
                </div>
                <div className="w-3/4 h-full p-8 flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 w-32 bg-primary/20 rounded-lg"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                     {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-24 bg-gray-50 rounded-xl border border-gray-100"></div>
                    ))}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to scale</h2>
            <p className="text-xl text-gray-600">Built by operators, for operators. KitchenFlow removes the chaos from your kitchen.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <MdOutlineStorefront size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Multi-Brand Aggregation</h3>
              <p className="text-gray-600 leading-relaxed">
                Manage Pizza Palace, Burger Hub, and Biryani Express all from one screen. Say goodbye to tablet hell.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <MdDeliveryDining size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Digital Kitchen Board</h3>
              <p className="text-gray-600 leading-relaxed">
                A real-time Kanban board that tracks every order from New to Preparing, Ready, Packed, and Out for Delivery.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <MdAnalytics size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Live Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track revenue, platform performance, and top-selling brands in real-time with beautiful, interactive charts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to streamline your kitchen?</h2>
          <p className="text-xl text-gray-400 mb-10">Join the next generation of cloud kitchens operating with KitchenFlow.</p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 bg-primary hover:bg-[#e65c2b] text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl shadow-primary/30 transition-all hover:scale-105"
          >
            Go to Admin Dashboard <MdArrowForward size={24} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-100 text-center text-gray-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MdKitchen size={20} className="text-gray-400" />
          <span className="font-semibold text-gray-700">KitchenFlow</span>
        </div>
        <p>© {new Date().getFullYear()} KitchenFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
