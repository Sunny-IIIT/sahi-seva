import React from 'react';
import prisma from '@/lib/prisma';
import DemandAnalytics from '@/components/DemandAnalytics';
import { Activity, ShieldCheck, TrendingUp, Users } from 'lucide-react';

export default async function SocietyAdminDashboard() {
  // Simulating the current society context
  const society = await prisma.society.findFirst({
    include: {
      workers: true
    }
  });

  if (!society) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">No Society Associated</h2>
        <p className="text-gray-500 mt-2">Please contact the Federation Administrator.</p>
      </div>
    );
  }

  let totalWelfareFund = 0;
  let govtCertifiedCount = 0;

  society.workers.forEach(w => {
    totalWelfareFund += w.welfareFundContribution;
    if (w.isGovtCertified) govtCertifiedCount++;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to your Cooperative Dashboard</h1>
        <p className="text-gray-500 mt-1">{society.name} | Pin Code: {society.pinCode}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Workforce</p>
              <p className="text-2xl font-semibold text-gray-900">{society.workers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
              <TrendingUp size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Society Welfare Fund</p>
              <p className="text-2xl font-semibold text-gray-900">₹{totalWelfareFund.toFixed(0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-50 text-orange-600">
              <ShieldCheck size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Verified by Govt</p>
              <p className="text-2xl font-semibold text-gray-900">{govtCertifiedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <Activity size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Platform Status</p>
              <p className="text-xl font-semibold text-green-600 mt-1">Operational</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Service Demand Analytics</h2>
        <p className="text-sm text-gray-500">Live forecasting data from the regional federation API.</p>
      </div>
      
      {/* Analytics Component */}
      <DemandAnalytics />
    </div>
  );
}
