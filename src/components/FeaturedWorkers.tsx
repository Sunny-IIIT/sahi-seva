"use client";

import { useEffect, useState } from "react";
import { WorkerCard } from "./WorkerCard";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function FeaturedWorkers() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/workers?limit=4')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setWorkers(data.workers);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!loading && workers.length === 0) return null;

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

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: 320, background: '#f8fafc', borderRadius: 18, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
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
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </section>
  );
}
