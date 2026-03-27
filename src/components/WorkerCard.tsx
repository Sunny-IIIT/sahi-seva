import { Star, MapPin, Phone, ShieldCheck, BadgeCheck, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { PaymentModal } from "./PaymentModal";

interface WorkerCardProps {
  worker: {
    id: string;
    name: string;
    photo: string;
    category: string;
    trust_score: number;
    verified: boolean;
    phone_number: string;
    price: string;
    ratings: number;
    profile_views: number;
  };
  hasTrustPass: boolean;
  onUnlockContact: () => void;
}

export function WorkerCard({ worker, hasTrustPass, onUnlockContact }: WorkerCardProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [unlockedPhone, setUnlockedPhone] = useState<string | null>(null);

  const handleUnlock = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setUnlockedPhone(worker.phone_number);
  };

  const displayPhone = hasTrustPass ? worker.phone_number : "XXXXX XXXXX";

  return (
    <div
      style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.22s ease' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = '0 12px 32px rgba(67,56,202,0.12)';
        el.style.borderColor = '#c7d2fe';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
        el.style.borderColor = '#e8eaf0';
      }}
    >
      {/* Card top strip */}
      <div style={{ height: 6, background: 'linear-gradient(90deg, #4338ca, #0891b2)' }} />

      <div style={{ padding: '20px 20px 18px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={worker.photo} alt={worker.name}
              style={{ width: 60, height: 60, borderRadius: 14, objectFit: 'cover', border: '2px solid #e8eaf0', display: 'block' }} />
            {worker.verified && (
              <div style={{ position: 'absolute', bottom: -3, right: -3, background: '#16a34a', borderRadius: '50%', border: '2px solid #fff', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={11} color="white" />
              </div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {worker.name}
              </h3>
              {/* Trust score pill */}
              <div style={{ flexShrink: 0, background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 8, padding: '2px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#4338ca', letterSpacing: '0.04em' }}>TRUST</div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#4338ca', lineHeight: 1.1 }}>{worker.trust_score}</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 8 }}>{worker.category}</p>

            {/* Rating + views */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 700, color: '#92400e' }}>
                <Star size={11} fill="#d97706" color="#d97706" />
                {worker.ratings.toFixed(1)}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>
                <CheckCircle2 size={12} /> {worker.profile_views} views
              </span>
            </div>
          </div>
        </div>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', border: '1px solid #e8eaf0', borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em' }}>PRICING</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{worker.price}</span>
        </div>

        {/* CTA button */}
        {hasTrustPass ? (
          <a href={`tel:${worker.phone_number}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '12px', background: '#16a34a', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 4px 12px rgba(22,163,74,0.25)' }}>
            <Phone size={15} /> Call: +91 {displayPhone}
          </a>
        ) : (
          /* Contact Logic */
          unlockedPhone ? (
            <a href={`tel:${unlockedPhone}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#16a34a', color: '#fff', borderRadius: 8, padding: '12px 0', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'background 0.2s', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)' }}>
              <Phone size={18} /> {unlockedPhone}
            </a>
          ) : (
            <button onClick={onUnlockContact || handleUnlock} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#0f172a', color: '#fff', borderRadius: 8, padding: '12px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'background 0.2s' }}>
              <Phone size={18} /> Unlock Contact
            </button>
          )
        )}
      </div>

      {/* Payment simulated Flow */}
      {showPayment && !unlockedPhone && (
        <PaymentModal 
          workerName={worker.name} 
          onClose={() => setShowPayment(false)} 
          onSuccess={handlePaymentSuccess} 
        />
      )}
    </div>
  );
}
