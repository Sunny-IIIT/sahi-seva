"use client";

import { useEffect, useState } from "react";
import { WorkerCard } from "./WorkerCard";
import Link from "next/link";
import { ArrowRight, Sparkles, AlertCircle } from "lucide-react";

export function FeaturedWorkers() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/workers?limit=4')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setWorkers(data.workers);
        } else {
          setError(data.error || 'Failed to load workers');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Could not connect to database. Please try again.');
        setLoading(false);
      });
  }, []);

  // Show nothing silently only on success with 0 workers — show error if fetch failed
  if (!loading && !error && workers.length === 0) return null;

  return (
    <section style={{ padding: '80px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4338ca', fontWeight: 700, fontSize: 13, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Sparkles size={16} /> Featured Professionals
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>
              Recently Joined <span style={{ color: '#4338ca' }}>Experts</span>
            </h2>
          </div>
          <Link href="/search" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4338ca', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            View all 100+ workers <ArrowRight size={16} />
          </Link>
        </div>

        {error ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12, padding: '16px 20px', color: '#9a3412' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>{error}</span>
          </div>
        ) : loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: 320, background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)', backgroundSize: '200% 100%', borderRadius: 18, animation: 'shimmer 1.5s infinite' }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {workers.map(worker => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                hasTrustPass={false}
                onUnlockContact={() => {}}
              />
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}

