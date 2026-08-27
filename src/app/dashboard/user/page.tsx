'use client';

import React, { useState } from 'react';
import { ShieldAlert, Clock, MapPin, CheckCircle, Search } from 'lucide-react';
import DisputeModal from '@/components/DisputeModal';

// Mock data for the user dashboard
const MOCK_BOOKINGS = [
  {
    id: 'BKG-2026-8901',
    service: 'Plumber',
    workerName: 'Rajesh Kumar',
    date: '15 Oct 2026',
    status: 'COMPLETED',
    amount: 450,
  },
  {
    id: 'BKG-2026-8944',
    service: 'Electrician',
    workerName: 'Amit Singh',
    date: '18 Oct 2026',
    status: 'PENDING',
    amount: 0,
  }
];

export default function UserDashboard() {
  const [disputeBookingId, setDisputeBookingId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-500 mt-2">Manage your past and upcoming service requests.</p>
        </div>

        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {MOCK_BOOKINGS.map((booking) => (
              <li key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{booking.service}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        booking.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Worker: {booking.workerName} • {booking.date}</p>
                    <p className="text-xs text-gray-400 mt-1 font-mono">ID: {booking.id}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {booking.status === 'COMPLETED' && (
                      <button 
                        onClick={() => setDisputeBookingId(booking.id)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                      >
                        <ShieldAlert size={16} className="mr-2" />
                        Report Issue
                      </button>
                    )}
                    <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-100">
                      View Details
                    </button>
                  </div>

                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {disputeBookingId && (
        <DisputeModal 
          isOpen={true} 
          onClose={() => setDisputeBookingId(null)} 
          bookingId={disputeBookingId}
          userType="CUSTOMER"
          userId="curr-customer-id"
        />
      )}
    </div>
  );
}
