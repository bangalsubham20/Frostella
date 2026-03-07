import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { role, isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated || role !== 'ADMIN') {
    return <div className="py-24 text-center text-xl text-red-500 font-medium">Access Denied. Admin privileges required.</div>;
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-heading text-accent mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-primary bg-opacity-10 p-6 rounded-2xl border border-primary border-opacity-20">
          <h3 className="text-lg font-medium text-accent mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-primary">₹12,450</p>
        </div>
        <div className="bg-secondary p-6 rounded-2xl">
          <h3 className="text-lg font-medium text-accent mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-accent">24</p>
        </div>
        <div className="bg-secondary p-6 rounded-2xl">
          <h3 className="text-lg font-medium text-accent mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-accent">18</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-secondary pb-4">
          <h2 className="text-2xl font-heading text-accent">Recent Orders</h2>
          <button className="text-sm font-medium text-primary hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-accent opacity-70 border-b border-secondary">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '1001', name: 'Rahul Sen', date: '2023-11-20', amount: 850, status: 'PENDING' },
                { id: '1002', name: 'Priya Das', date: '2023-11-19', amount: 1400, status: 'PROCESSING' },
                { id: '1003', name: 'Amit Roy', date: '2023-11-18', amount: 650, status: 'DELIVERED' },
              ].map(order => (
                <tr key={order.id} className="border-b border-secondary border-opacity-50">
                  <td className="py-4 font-medium text-accent">#{order.id}</td>
                  <td className="py-4 text-accent">{order.name}</td>
                  <td className="py-4 text-accent">{order.date}</td>
                  <td className="py-4 font-medium text-primary">₹{order.amount}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-sm text-accent font-medium hover:underline">Update</button>
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
