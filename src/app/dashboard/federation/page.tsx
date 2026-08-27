import React from 'react';
import prisma from '@/lib/prisma';
import { Building2, TrendingUp, Activity, ShieldCheck } from 'lucide-react';
import DemandAnalytics from '@/components/DemandAnalytics';

export default async function FederationAdminDashboard() {
  // In a real app, we would get the logged-in admin's federation ID from their session/JWT.
  const federation = await prisma.federation.findFirst({
    include: {
      societies: {
        include: {
          workers: true
        }
      }
    }
  });

  if (!federation) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-800">No Federation Found</h2>
        <p className="text-gray-600 mt-2">Please seed the database with at least one federation.</p>
      </div>
    );
  }

  // Aggregate metrics across all societies in this federation
  let totalWorkers = 0;
  let totalWelfareFund = 0;
  let totalJobsDone = 0;
  let govtCertifiedCount = 0;

  federation.societies.forEach(society => {
    totalWorkers += society.workers.length;
    society.workers.forEach(w => {
      totalWelfareFund += w.welfareFundContribution;
      totalJobsDone += w.jobsDone;
      if (w.isGovtCertified) govtCertifiedCount++;
    });
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Federation Command Center</h1>
            <p className="text-gray-600 mt-1">{federation.name} | {federation.district}, {federation.state}</p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-purple-200">
              Super Admin Level
            </span>
          </div>
        </div>

        {/* Global Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                <Building2 size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Member Societies</p>
                <p className="text-2xl font-semibold text-gray-900">{federation.societies.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <Activity size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Workforce</p>
                <p className="text-2xl font-semibold text-gray-900">{totalWorkers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
                <TrendingUp size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Consolidated Welfare</p>
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
                <p className="text-sm font-medium text-gray-500">Govt Certified</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {govtCertifiedCount} <span className="text-sm text-gray-400 font-normal">/ {totalWorkers}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Analytics Dashboards (Recharts) */}
        <DemandAnalytics />

        {/* Society Breakdown Table */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Society Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                  <th className="px-6 py-3 font-medium">Society Name</th>
                  <th className="px-6 py-3 font-medium">Pin Code</th>
                  <th className="px-6 py-3 font-medium text-center">Workers</th>
                  <th className="px-6 py-3 font-medium text-right">Fund Generated</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                {federation.societies.map((society) => {
                  const socWelfare = society.workers.reduce((s, w) => s + w.welfareFundContribution, 0);
                  return (
                    <tr key={society.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{society.name}</td>
                      <td className="px-6 py-4">{society.pinCode}</td>
                      <td className="px-6 py-4 text-center">{society.workers.length}</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">₹{socWelfare.toFixed(0)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {federation.societies.length === 0 && (
                <div className="p-8 text-center text-gray-500">No societies enrolled yet.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
