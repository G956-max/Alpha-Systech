import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { BarChart3 } from 'lucide-react';

const COLORS = ['#2C2C2C', '#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6'];
const STATUS_COLORS: Record<string, string> = {
  'Delivered': '#10B981', // green
  'Shipped': '#3B82F6', // blue
  'Processing': '#F59E0B', // yellow
  'Cancelled': '#EF4444' // red
};

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'orders'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => doc.data());

      // 1. Sales Data (Grouped by Month)
      const monthly = Array.from({ length: 12 }, (_, i) => {
        const d = new Date();
        d.setMonth(i);
        return { name: d.toLocaleString('default', { month: 'short' }), sales: 0 };
      });

      // 2. Status Data
      const statusCounts: Record<string, number> = {};

      // 3. Category Data (Revenue by Category)
      const categoryRev: Record<string, number> = {};

      orders.forEach((o: any) => {
        // Sales
        if (o.createdAt?.toDate) {
          const month = o.createdAt.toDate().getMonth();
          monthly[month].sales += (o.total || 0);
        }

        // Status
        const status = o.status || 'Processing';
        statusCounts[status] = (statusCounts[status] || 0) + 1;

        // Category Revenue
        if (o.items && Array.isArray(o.items)) {
          o.items.forEach((item: any) => {
            const cat = item.category || 'Uncategorized';
            categoryRev[cat] = (categoryRev[cat] || 0) + (item.price * item.quantity);
          });
        }
      });

      setSalesData(monthly);

      setStatusData(Object.entries(statusCounts).map(([name, value]) => ({ name, value })));

      setCategoryData(
        Object.entries(categoryRev)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
      );

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2C2C2C]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500">Deep dive into your store's performance metrics.</p>
        </div>
      </div>

      {ordersAreEmpty(salesData) ? (
        <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-gray-400 gap-3">
          <BarChart3 size={48} strokeWidth={1} />
          <p className="text-sm font-medium">No sales data available to analyze yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Trend */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2">
            <h3 className="font-bold text-[#2C2C2C] mb-6">Sales Trend (Monthly Revenue)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#2C2C2C" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue by Category */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-[#2C2C2C] mb-6">Revenue by Category</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F3F5" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 500 }} />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                    cursor={{ fill: '#F9FAFB' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders by Status */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-[#2C2C2C] mb-6">Order Status Distribution</h3>
            <div className="h-[300px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value, 'Orders']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ordersAreEmpty(salesData: any[]) {
  // If all months have 0 sales, there are no orders
  return salesData.every(d => d.sales === 0);
}
