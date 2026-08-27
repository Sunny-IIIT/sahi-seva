'use client';

import React, { useState } from 'react';
import { AlertCircle, X, CheckCircle, Loader2 } from 'lucide-react';

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  userType: 'CUSTOMER' | 'WORKER';
  userId: string;
}

const DISPUTE_REASONS = {
  CUSTOMER: [
    'Worker did not arrive',
    'Unprofessional behavior',
    'Payment issue / Overcharged',
    'Work quality unsatisfactory',
    'Other'
  ],
  WORKER: [
    'Customer unavailable',
    'Scope of work changed',
    'Payment refused or delayed',
    'Safety concern',
    'Other'
  ]
};

export default function DisputeModal({ isOpen, onClose, bookingId, userType, userId }: DisputeModalProps) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject) return;

    setStatus('submitting');
    
    try {
      const payload = {
        bookingId,
        subject,
        description,
        ...(userType === 'CUSTOMER' ? { customerId: userId } : { workerId: userId })
      };

      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to submit');
      
      setStatus('success');
      setTimeout(() => {
        onClose();
        // Reset state after closing
        setTimeout(() => {
          setStatus('idle');
          setSubject('');
          setDescription('');
        }, 500);
      }, 2000);
      
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <div className="flex items-center text-red-600">
            <AlertCircle size={20} className="mr-2" />
            <h3 className="font-semibold text-lg">Raise a Grievance</h3>
          </div>
          <button 
            onClick={onClose}
            disabled={status === 'submitting'}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <CheckCircle size={48} className="text-green-500 mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Ticket Submitted</h4>
            <p className="text-gray-500 text-sm">
              Your grievance has been logged securely. Our cooperative resolution team will review this within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5">
            <div className="space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Booking ID
                </label>
                <input 
                  type="text" 
                  value={bookingId} 
                  disabled 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-500 rounded-lg px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Dispute <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-2.5 text-sm outline-none transition-all"
                >
                  <option value="" disabled>Select an issue</option>
                  {DISPUTE_REASONS[userType].map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Details
                </label>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide any additional context..."
                  className="w-full bg-white border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-600 font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={status === 'submitting'}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!subject || status === 'submitting'}
                className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 rounded-lg transition-colors flex items-center shadow-sm"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Ticket'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
