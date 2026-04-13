import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '40px 24px', background: '#f8fafc'
    }}>
      <div style={{
        textAlign: 'center', maxWidth: 440, background: '#fff',
        borderRadius: 20, padding: '48px 32px',
        border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 18, background: '#eef2ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', color: '#4338ca'
        }}>
          <SearchX size={30} />
        </div>
        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#e2e8f0', lineHeight: 1, marginBottom: 12 }}>404</div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
          Page not found
        </h1>
        <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 28 }}>
          The page you're looking for doesn't exist. Try searching for a worker instead.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/search" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 20px', background: '#4338ca', color: '#fff',
            borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: 'none'
          }}>
            Search Workers
          </Link>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '12px 20px', background: '#f1f5f9', color: '#475569',
            borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: 'none'
          }}>
            ← Home
          </Link>
        </div>
      </div>
    </div>
  );
}
