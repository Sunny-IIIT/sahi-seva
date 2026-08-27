import React from 'react';
import prisma from '@/lib/prisma';
import { Users, CreditCard, Star, AlertTriangle } from 'lucide-react';

export default async function SocietyAdminDashboard() {
  // In a real app, we would get the logged-in admin's society ID from their session/JWT.
  // For the SIH prototype, we will fetch the first society as a demo.
  const society = await prisma.society.findFirst({
    include: {
      workers: {
        orderBy: { jobsDone: 'desc' },
      }
    }
  });

  if (!society) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-800">No Society Found</h2>
        <p className="text-gray-600 mt-2">Please seed the database with at least one cooperative society.</p>
      </div>
    );
  }

  const activeWorkers = society.workers.filter(w => w.status === 'APPROVED');
  const totalWelfareFund = society.workers.reduce((sum, w) => sum + w.welfareFundContribution, 0);
  const avgRatingOverall = society.workers.length > 0 
    ? (society.workers.reduce((sum, w) => sum + w.avgRating, 0) / society.workers.length).toFixed(1) 
    : 'N/A';

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Society Admin Portal</h1>
            <p className="text-gray-600 mt-1">Managing: {society.name} ({society.pinCode})</p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Status: Active
            </span>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Workers</p>
                <p className="text-2xl font-semibold text-gray-900">{society.workers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <CreditCard size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Welfare Fund</p>
                <p className="text-2xl font-semibold text-gray-900">₹{totalWelfareFund.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-50 text-yellow-600">
                <Star size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Rating</p>
                <p className="text-2xl font-semibold text-gray-900">{avgRatingOverall}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-50 text-red-600">
                <AlertTriangle size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {society.workers.filter(w => w.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Worker Roster Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Worker Roster</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Jobs Done</th>
                  <th className="px-6 py-3 font-medium">Govt Cert.</th>
                  <th className="px-6 py-3 font-medium">Insurance</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                {society.workers.map((worker) => (
                  <tr key={worker.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{worker.name}</td>
                    <td className="px-6 py-4">{worker.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        worker.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                        worker.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {worker.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{worker.jobsDone}</td>
                    <td className="px-6 py-4">
                      {worker.isGovtCertified ? (
                        <span className="text-blue-600 font-semibold text-xs border border-blue-200 bg-blue-50 px-2 py-1 rounded">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs ${worker.insuranceStatus === 'ACTIVE' ? 'text-green-600' : 'text-red-500'}`}>
                        {worker.insuranceStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-900 font-medium text-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {society.workers.length === 0 && (
               <div className="p-8 text-center text-gray-500">No workers enrolled in this society yet.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
