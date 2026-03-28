"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CATEGORIES, MOCK_CUSTOMER } from "@/lib/mock";
import { WorkerCard } from "@/components/WorkerCard";
import { PaymentModal } from "@/components/PaymentModal";
import { CheckCircle2, LockKeyhole, MapPin, Users, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const id = params.id as string;

  const category = CATEGORIES.find(c => c.id === id);
  
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasTrustPass, setHasTrustPass] = useState(
    new Date(MOCK_CUSTOMER.trust_pass_expiry) > new Date()
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    // Fetch real status from database
    fetch('/api/customer/status')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHasTrustPass(data.hasTrustPass);
        }
      })
      .catch(err => console.error("Status fetch failed", err));

    if (category) {
      setLoading(true);
      fetch(`/api/workers?category=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setWorkers(data.workers);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [category, id]);

  const handlePaymentSuccess = () => {
    setPaying(false);
    setShowPaymentModal(false);
    setHasTrustPass(true);
    alert("Payment Successful! Trust Pass Activated");
  };

  if (!category) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Category not found</h1>
        <Link href="/" style={{ color: '#4338ca', fontWeight: 600, textDecoration: 'none' }}>← Back to Home</Link>
      </div>
    );
  }

  const cat = category as typeof category & { image?: string; desc?: string };

  return (
    <>
      {/* Top banner */}
      <div style={{ background: 'linear-gradient(135deg, #4338ca 0%, #3730a3 100%)', padding: '36px 24px 36px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, textDecoration: 'none', marginBottom: 16 }}>
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            {cat.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cat.image} alt={cat.name} style={{ width: 64, height: 64, borderRadius: 14, objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)' }} />
            )}
            <div>
              <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', marginBottom: 5 }}>
                Verified {category.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Users size={13} /> {loading ? '...' : workers.length} professionals found
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <MapPin size={13} /> Pan India
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Star size={13} /> BGV Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Pass banner (if no pass) */}
      {!hasTrustPass && (
        <div style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '14px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <LockKeyhole size={16} color="#d97706" />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#92400e' }}>
                Unlock contact details with Trust Pass — just <strong>₹20 for 10 days</strong>
              </span>
            </div>
            <button onClick={() => setShowPaymentModal(true)} style={{ background: '#d97706', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
              Get Trust Pass
            </button>
          </div>
        </div>
      )}

      {/* Workers grid */}
      <div style={{ background: '#f8fafc', minHeight: '60vh', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {loading ? (
             <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading {category.name}...</div>
          ) : workers.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {workers.map(worker => (
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  hasTrustPass={hasTrustPass}
                  onUnlockContact={() => setShowPaymentModal(true)}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 24px', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>
                No {category.name} found yet
              </h3>
              <p style={{ color: '#64748b', fontSize: 14 }}>
                We're expanding our network. Check back soon!
              </p>
              <Link href="/" style={{ display: 'inline-flex', marginTop: 16, color: '#4338ca', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
                ← Browse other categories
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Info Modal */}
      {showPaymentModal && !paying && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in-up" style={{ background: '#fff', borderRadius: 20, padding: '32px 28px', maxWidth: 420, width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 60, height: 60, background: '#eef2ff', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#4338ca' }}>
              <LockKeyhole size={28} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: 6, letterSpacing: '-0.02em' }}>Unlock Trust Pass</h2>
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
              Pay ₹20 to unlock <strong>unlimited verified contacts</strong> across all categories for 10 days.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
              {[
                'Access to 500+ verified workers',
                'Zero commission on bookings',
                '100% Aadhaar verified profiles',
              ].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#334155', fontWeight: 500 }}>
                  <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowPaymentModal(false)}
                style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: 700, color: '#475569', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 }}>
                Cancel
              </button>
              <button onClick={() => setPaying(true)}
                style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: '#4338ca', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, boxShadow: '0 4px 14px rgba(67,56,202,0.3)' }}>
                Pay ₹20 →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Actual Mock Payment Gateway */}
      {paying && (
        <PaymentModal 
          price={20}
          onClose={() => { setPaying(false); setShowPaymentModal(false); }}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}
