"use client";

import { useState } from "react";
import { DollarSign, FileCheck, Users, Ban, XCircle, CheckCircle2, Activity } from "lucide-react";

const PENDING_BGV = [
  { id: "WRK-9001", name: "Suresh", category: "Electricians", token: "TOKEN_8Y3D1P" },
  { id: "WRK-9002", name: "Geeta",  category: "Cooks",        token: "TOKEN_4C9X2A" },
];

const KPI = [
  { label: "Total Revenue", value: "₹1,24,500", sub: "+18% this month", Icon: DollarSign, color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { label: "Pending BGV",    value: "2",          sub: "Needs review",    Icon: FileCheck,  color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  { label: "Active Workers", value: "4,892",      sub: "Across India",    Icon: Users,      color: "#4338ca", bg: "#eef2ff", border: "#c7d2fe" },
];

export default function AdminDashboard() {
  const [bgvList, setBgvList] = useState(PENDING_BGV);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 60 }}>

      {/* Top Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '28px 24px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(67,56,202,0.15)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 5 }}>SAHISEVA</p>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 4 }}>
              ⚡ God Mode
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Admin Dashboard — Full Control</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '8px 14px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>System Online</span>
            <Activity size={14} color="rgba(255,255,255,0.5)" />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', marginTop: -44, position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {KPI.map(k => (
            <div key={k.label} style={{ background: '#fff', border: `1px solid ${k.border}`, borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 13, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: k.color, flexShrink: 0 }}>
                <k.Icon size={24} />
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 3 }}>{k.label}</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1 }}>{k.value}</p>
                <p style={{ fontSize: 11, color: k.color, fontWeight: 700, marginTop: 4 }}>{k.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 20 }}>

          {/* BGV Queue */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 22px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>BGV Clearance Queue</h3>
                <p style={{ fontSize: 12, color: '#94a3b8' }}>Verify tokenized Aadhaar uploads</p>
              </div>
              <span style={{ background: bgvList.length > 0 ? '#fffbeb' : '#f0fdf4', color: bgvList.length > 0 ? '#d97706' : '#16a34a', border: `1px solid ${bgvList.length > 0 ? '#fde68a' : '#bbf7d0'}`, borderRadius: 9999, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>
                {bgvList.length} pending
              </span>
            </div>
            <div>
              {bgvList.length === 0 ? (
                <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                  <p style={{ fontWeight: 700, color: '#16a34a', fontSize: 14 }}>All caught up!</p>
                  <p style={{ color: '#94a3b8', fontSize: 13 }}>No pending verifications</p>
                </div>
              ) : bgvList.map(w => (
                <div key={w.id} style={{ padding: '16px 22px', borderBottom: '1px solid #f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: 14, marginBottom: 3 }}>
                      {w.name} <span style={{ color: '#64748b', fontWeight: 500 }}>· {w.category}</span>
                    </p>
                    <p style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', background: '#f8fafc', padding: '2px 8px', borderRadius: 5, display: 'inline-block' }}>
                      Ref: {w.token}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => setBgvList(bgvList.filter(x => x.id !== w.id))}
                      style={{ padding: '7px', background: '#fff0f0', border: '1px solid #fecaca', borderRadius: 8, cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center' }}>
                      <XCircle size={18} />
                    </button>
                    <button onClick={() => setBgvList(bgvList.filter(x => x.id !== w.id))}
                      style={{ padding: '7px 14px', background: '#16a34a', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#fff', fontWeight: 700, fontSize: 13, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle2 size={15} /> Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Moderation */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 22px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>User Moderation</h3>
                <p style={{ fontSize: 12, color: '#94a3b8' }}>Ban or deactivate reported accounts</p>
              </div>
              <input type="text" placeholder="Search Phone / ID…" className="input" style={{ width: 180, fontSize: 13, padding: '7px 12px' }} />
            </div>

            <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Reported user row */}
              <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://i.pravatar.cc/150?u=reported1" alt="Rakesh" style={{ width: 42, height: 42, borderRadius: 10, objectFit: 'cover', border: '2px solid #fecaca' }} />
                  <div>
                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: 14 }}>Rakesh M. (Mechanic)</p>
                    <p style={{ fontSize: 12, color: '#dc2626', fontWeight: 600 }}>⚠️ Reported 3 times today</p>
                  </div>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#dc2626', border: 'none', borderRadius: 8, padding: '8px 14px', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                  <Ban size={14} /> Instant Ban
                </button>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>
                Search an account to manage status
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
