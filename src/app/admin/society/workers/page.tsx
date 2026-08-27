import React from 'react';
import BulkUpload from '@/components/BulkUpload';

export default function WorkersDirectoryPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Worker Directory</h1>
        <p className="text-gray-500 mt-1">Manage onboarding and verify worker credentials.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Batch Registration</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-3xl">
          Use the bulk upload tool to securely onboard multiple workers into the cooperative database. Ensure the CSV conforms to the standard e-Shram format requirements.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <BulkUpload />
        </div>
      </div>
    </div>
  );
}
