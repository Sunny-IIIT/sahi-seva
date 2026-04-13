"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error monitoring service (e.g. Sentry) here
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <div style={{
      minHeight: '70vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '40px 24px', background: '#f8fafc'
    }}>
      <div style={{
        textAlign: 'center', maxWidth: 480, background: '#fff',
        borderRadius: 20, padding: '48px 32px',
        border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 18, background: '#fff7ed',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', color: '#ea580c'
        }}>
          <AlertTriangle size={30} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: 10, letterSpacing: '-0.02em' }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 28 }}>
          We hit an unexpected error. This has been logged. Please try again or go back to the homepage.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 20px', background: '#4338ca', color: '#fff',
              border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14,
              cursor: 'pointer', fontFamily: 'inherit'
            }}
          >
            <RefreshCw size={15} /> Try Again
          </button>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 20px', background: '#f1f5f9', color: '#475569',
            borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: 'none'
          }}>
            ← Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
