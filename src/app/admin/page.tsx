"use client";
import { useEffect, useState } from "react";
import { ShieldCheck, CheckCircle2, XCircle, Search, Clock, Fingerprint } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function AdminDashboard() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [secret, setSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWorkers(secret);
  };

  const fetchWorkers = async (key: string) => {
    setLoading(true);
    const res = await fetch(`/api/admin/workers?key=${key}`);
    if (res.ok) {
      const data = await res.json();
      setWorkers(data.workers);
      setIsAuthenticated(true);
    } else {
      alert("Invalid Admin Secret");
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    if (!confirm(`Are you sure you want to ${newStatus} this worker?`)) return;
    
    setWorkers(workers.map(w => w.id === id ? { ...w, status: newStatus } : w));
    
    await fetch(`/api/admin/workers/${id}?key=${secret}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
        <form onSubmit={handleLogin} style={{ background: '#1e293b', padding: 40, borderRadius: 20, textAlign: 'center', width: 400 }}>
          <ShieldCheck size={48} color="#4f46e5" style={{ marginBottom: 20 }} />
          <h1 style={{ color: '#fff', fontSize: 24, marginBottom: 20, fontWeight: 700 }}>Admin Portal</h1>
          <input 
            type="password" 
            placeholder="Enter Admin Secret"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#fff', marginBottom: 20, outline: 'none' }}
          />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 14, borderRadius: 10, background: '#4f46e5', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ background: '#0f172a', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ShieldCheck size={28} color="#4f46e5" />
          <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>SahiSeva Backoffice</h1>
        </div>
        <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>← Back to Website</Link>
      </div>

      {/* Main */}
      <div style={{ padding: 40, maxWidth: 1200, margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 30 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Worker Applications</h2>
            <p style={{ color: '#64748b' }}>Review KYC documents and approve workers for the live directory.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', padding: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#475569', padding: '6px 12px', background: '#f1f5f9', borderRadius: 6 }}>Total: {workers.length}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#b45309', padding: '6px 12px', background: '#fffbeb', borderRadius: 6 }}>Pending: {workers.filter(w => w.status === 'PENDING').length}</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Worker Info</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category & Area</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>KYC Document</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {workers.map(w => (
                <tr key={w.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s', ...(w.status === 'PENDING' ? {background: '#fdfcbc'} : {}) }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15, marginBottom: 4 }}>{w.name}</div>
                    <div style={{ fontSize: 13, color: '#64748b', fontFamily: 'monospace' }}>{w.phone}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 600, color: '#4f46e5', fontSize: 14 }}>{w.category}</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{w.area || 'N/A'}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {w.aadhaarToken ? (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#16a34a', fontWeight: 600, background: '#dcfce7', padding: '4px 10px', borderRadius: 6 }}>
                        <Fingerprint size={14} /> Aadhaar Logged
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: '#ef4444', fontWeight: 600 }}>Missing KYC</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {w.status === 'APPROVED' && <span style={{ color: '#16a34a', background: '#dcfce7', padding: '4px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content' }}><CheckCircle2 size={14} /> LIVE</span>}
                    {w.status === 'PENDING' && <span style={{ color: '#d97706', background: '#fef3c7', padding: '4px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content' }}><Clock size={14} /> REVIEW</span>}
                    {w.status === 'REJECTED' && <span style={{ color: '#ef4444', background: '#fee2e2', padding: '4px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content' }}><XCircle size={14} /> REJECTED</span>}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    {w.status !== 'APPROVED' && (
                      <button onClick={() => updateStatus(w.id, 'APPROVED')} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: 12, marginRight: 8 }}>Approve</button>
                    )}
                    {w.status !== 'REJECTED' && (
                      <button onClick={() => updateStatus(w.id, 'REJECTED')} style={{ background: '#fee2e2', color: '#ef4444', border: '1px solid #f87171', padding: '5px 14px', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: 12 }}>Reject</button>
                    )}
                  </td>
                </tr>
              ))}
              {workers.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: 60, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>No workers found in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
