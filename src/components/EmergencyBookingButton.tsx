'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface EmergencyBookingButtonProps {
  workerId: string;
  customerId: string;
  onSuccess?: () => void;
}

export default function EmergencyBookingButton({ workerId, customerId, onSuccess }: EmergencyBookingButtonProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleEmergencyBooking = async () => {
    setLoading(true);
    setStatus('idle');
    try {
      // Create a booking with isEmergency: true
      // Note: We haven't built the standard POST /api/bookings route yet in this snippet, 
      // but this illustrates how the frontend would trigger it.
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workerId,
          customerId,
          isEmergency: true
        })
      });

      if (!res.ok) throw new Error('Booking failed');
      
      setStatus('success');
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleEmergencyBooking}
        disabled={loading || status === 'success'}
        className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${
          status === 'success' 
            ? 'bg-green-600 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg'
        }`}
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2" size={20} />
        ) : status === 'success' ? (
          <CheckCircle2 className="mr-2" size={20} />
        ) : (
          <AlertCircle className="mr-2 animate-pulse" size={20} />
        )}
        
        {loading ? 'Processing...' : status === 'success' ? 'Emergency Request Sent!' : 'Book Now — Emergency'}
      </button>
      
      {status === 'idle' && !loading && (
        <p className="text-xs text-center text-gray-500 mt-2">
          Emergency bookings prioritize matching you with the nearest available worker instantly.
        </p>
      )}
      {status === 'error' && (
        <p className="text-xs text-center text-red-500 mt-2">
          Failed to send emergency request. Please try again or call support.
        </p>
      )}
    </div>
  );
}
