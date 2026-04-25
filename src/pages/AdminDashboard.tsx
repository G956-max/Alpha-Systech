import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Activity,
  ArrowRight,
  Plus,
  Package,
  UserPlus,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';



interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  isUp: boolean;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ title, value, trend, isUp, icon: Icon, color }: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={color.replace('bg-', 'text-')} size={20} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
        {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {trend}
      </div>
    </div>
    <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
  </div>
);

export default function AdminDashboard() {
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Orders and calculate stats
    const qOrders = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
      const ordersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      setTotalOrders(ordersList.length);
      
      const revenue = ordersList.reduce((sum, order: any) => sum + (order.total || 0), 0);
      setTotalRevenue(revenue);
      
      setRecentOrders(ordersList.slice(0, 5).map((o: any) => ({
        id: o.id.slice(0, 8).toUpperCase(),
        customer: o.customerName || o.customerEmail || 'Unknown',
        date: o.createdAt?.toDate ? o.createdAt.toDate().toLocaleDateString() : 'Just now',
        status: o.status || 'Processing',
        amount: `$${(o.total || 0).toFixed(2)}`
      })));

      // Chart Data
      const monthlyData = Array.from({ length: 12 }, (_, i) => {
        const d = new Date();
        d.setMonth(i);
        return { name: d.toLocaleString('default', { month: 'short' }), revenue: 0 };
      });

      ordersList.forEach((o: any) => {
        if (o.createdAt?.toDate) {
          const month = o.createdAt.toDate().getMonth();
          monthlyData[month].revenue += (o.total || 0);
        }
      });
      setChartData(monthlyData);
      
      const uniqueEmails = new Set(ordersList.map((o: any) => o.customerEmail).filter(Boolean));
      setTotalCustomers(uniqueEmails.size);
    });

    // Fetch low stock products
    const qProducts = query(collection(db, 'products'), orderBy('availableQuantity', 'asc'), limit(5));
    const unsubscribeProducts = onSnapshot(qProducts, (snapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLowStockProducts(products.filter((p: any) => (p.availableQuantity || 0) < 10));
    });

    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      if (snapshot.size > 0) {
        setTotalCustomers(snapshot.size);
      }
    }, (err) => console.warn('Users index may not exist:', err));

    return () => {
      unsubscribeOrders();
      unsubscribeProducts();
      unsubscribeUsers();
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Overview</h1>
          <p className="text-sm text-gray-500">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <button className="px-3 py-1.5 text-xs font-bold text-[#2C2C2C] bg-gray-100 rounded-md">Today</button>
          <button className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-md transition-colors">7 Days</button>
          <button className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-md transition-colors">30 Days</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
          trend="+20.1%" 
          isUp={true} 
          icon={DollarSign} 
          color="bg-[#1a202c]"
        />
        <StatCard 
          title="Orders" 
          value={totalOrders.toString()} 
          trend="+12.5%" 
          isUp={true} 
          icon={ShoppingBag} 
          color="bg-[#1a202c]"
        />
        <StatCard 
          title="Customers" 
          value={totalCustomers.toString()} 
          trend="+18.2%" 
          isUp={true} 
          icon={Users} 
          color="bg-[#1a202c]"
        />
        <StatCard 
          title="Store Activity" 
          value="High" 
          trend="+2.4%" 
          isUp={true} 
          icon={Activity} 
          color="bg-[#1a202c]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-[#2C2C2C]">Revenue Overview</h3>
            <select className="text-xs font-bold text-gray-500 bg-gray-50 border-none rounded-md focus:ring-0">
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94A3B8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94A3B8' }}
                />
                <Tooltip 
                  cursor={{ fill: '#FAF9F6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                />
                <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === new Date().getMonth() ? '#2C2C2C' : '#E5E7EB'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Inventory */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-[#2C2C2C] mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                to="/admin/products/add"
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 text-[#2C2C2C] hover:bg-gray-100 transition-colors group border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Plus size={20} />
                  <span className="text-sm font-bold">Upload New Product</span>
                </div>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
              <button className="flex items-center justify-between p-4 rounded-lg bg-gray-50 text-[#2C2C2C] hover:bg-gray-100 transition-colors w-full group border border-gray-100">
                <div className="flex items-center gap-3">
                  <UserPlus size={20} />
                  <span className="text-sm font-bold">Add Customer</span>
                </div>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#2C2C2C]">Inventory Alerts</h3>
              <Link to="/admin/products" className="text-xs font-bold text-gray-500 hover:text-[#2C2C2C] hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 overflow-hidden border border-gray-100">
                        <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#2C2C2C] line-clamp-1">{product.name}</p>
                        <p className="text-[10px] font-bold text-red-500 uppercase">{product.availableQuantity || 0} in stock</p>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-red-50 rounded text-[10px] font-bold text-red-600">Low Stock</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <AlertCircle className="mx-auto text-gray-300 mb-2" size={24} />
                  <p className="text-xs text-gray-500">No inventory alerts</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-[#2C2C2C]">Recent Orders</h3>
          <button className="text-xs font-bold text-gray-500 hover:text-[#2C2C2C] transition-colors">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-[#2C2C2C]">{order.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                      order.status === 'Processing' ? 'bg-gray-100 text-gray-600' :
                      order.status === 'Shipped' ? 'bg-gray-50 text-gray-500' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-[#2C2C2C] transition-colors">
                      <ArrowRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
