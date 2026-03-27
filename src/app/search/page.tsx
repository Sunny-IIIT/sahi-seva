"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { WorkerCard } from "@/components/WorkerCard";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setWorkers(data.workers);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '80vh' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 13, fontWeight: 600, textDecoration: 'none', marginBottom: 16 }}>
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: '#eef2ff', color: '#4338ca', padding: 10, borderRadius: 12 }}>
              <Search size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Search results for "<span style={{ color: '#4338ca' }}>{query}</span>"
              </h1>
              <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>
                {loading ? 'Searching...' : `Found ${workers.length} professionals matching your search`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading professionals...</div>
        ) : workers.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {workers.map(worker => (
              <WorkerCard 
                key={worker.id}
                worker={worker}
                hasTrustPass={false} // Demo mode
                onUnlockContact={() => alert('Trust Pass purchase required. Proceed to login.')}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 24px', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', maxWidth: 400, margin: '0 auto' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>
              No workers found
            </h3>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>
              We couldn't find anyone matching "{query}". Try searching for categories like Maid, Plumber, or Electrician.
            </p>
            <Link href="/" style={{ display: 'inline-flex', padding: '10px 20px', background: '#eef2ff', color: '#4338ca', fontWeight: 700, borderRadius: 10, textDecoration: 'none', fontSize: 14 }}>
              Browse Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
