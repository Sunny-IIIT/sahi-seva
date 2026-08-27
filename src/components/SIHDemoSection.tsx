'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, BarChart3, Users, Mic } from 'lucide-react';
import BulkUpload from './BulkUpload';
import DisputeModal from './DisputeModal';
import VoiceSearchBar from './VoiceSearchBar';

export function SIHDemoSection() {
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-indigo-900 sm:text-4xl">
            🏆 SIH 2026: Hackathon Features Showcase
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
            Test the newly built enterprise components (Problem Statement ID: 26089 - Ministry of Cooperation).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: UI Components */}
          <div className="space-y-8">
            
            {/* Voice Search Demo */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
              <div className="flex items-center mb-4 text-indigo-700">
                <Mic className="mr-2" />
                <h3 className="text-xl font-bold">Voice-First Accessibility Search</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">Test the native Web Speech API (Hindi/English) by clicking the microphone.</p>
              <VoiceSearchBar />
            </div>

            {/* Grievance Redressal Demo */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex flex-col items-start justify-center">
              <div className="flex items-center mb-4 text-red-600">
                <ShieldAlert className="mr-2" />
                <h3 className="text-xl font-bold">Grievance Redressal (Tickets)</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">Test the dispute modal that submits complaints securely to the database.</p>
              <button 
                onClick={() => setIsDisputeModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm"
              >
                Simulate a Dispute / Grievance
              </button>
            </div>

          </div>

          {/* Right Column: Dashboards & Bulk Upload */}
          <div className="space-y-8">
            
            {/* Admin Dashboards Link */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
              <div className="flex items-center mb-4 text-indigo-700">
                <BarChart3 className="mr-2" />
                <h3 className="text-xl font-bold">Cooperative Admin Dashboards</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">View AI demand forecasting, live analytics, and society welfare metrics.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard/federation" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm text-center">
                  View Federation (Super Admin)
                </Link>
                <Link href="/dashboard/society" className="flex-1 bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200 font-bold py-3 px-6 rounded-lg transition-colors shadow-sm text-center">
                  View Society (Local Admin)
                </Link>
              </div>
            </div>

            {/* Bulk Upload Demo */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
               <div className="flex items-center mb-4 text-indigo-700">
                <Users className="mr-2" />
                <h3 className="text-xl font-bold">Society Bulk Onboarding</h3>
              </div>
              <BulkUpload />
            </div>

          </div>

        </div>

      </div>

      {/* Render the Dispute Modal when triggered */}
      <DisputeModal 
        isOpen={isDisputeModalOpen} 
        onClose={() => setIsDisputeModalOpen(false)} 
        bookingId="SIH-DEMO-BOOKING-999"
        userType="CUSTOMER"
        userId="demo-customer-id"
      />
    </section>
  );
}
