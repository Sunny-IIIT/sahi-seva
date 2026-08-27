'use client';

import { useEffect } from 'react';
import { AlertOctagon, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service securely in production
    console.error('System Exception Caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-full text-red-600">
            <AlertOctagon size={48} strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
          Service Temporarily Unavailable
        </h1>
        
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          The SahiSeva Cooperative network is experiencing a temporary disruption while processing your request. Our engineering team has been notified of this incident.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <RefreshCcw size={18} className="mr-2" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center w-full px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <Home size={18} className="mr-2 text-gray-400" />
            Return to Homepage
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs font-mono text-gray-400">
            Reference ID: {error.digest || 'ERR-SYS-UNEXPECTED'}
          </p>
        </div>
      </div>
    </div>
  );
}
