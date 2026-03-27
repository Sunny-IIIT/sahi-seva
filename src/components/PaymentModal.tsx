"use client";
import { useState } from "react";
import { X, Lock, ShieldCheck, CreditCard, Smartphone } from "lucide-react";

export function PaymentModal({ 
  workerName, 
  price = 20,
  onClose, 
  onSuccess 
}: { 
  workerName?: string;
  price?: number;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/payment/mock-verify', {
        method: 'POST',
      });
      const data = await res.json();
      
      // Simulate real processing time feeling
      setTimeout(() => {
        if (data.success) {
          onSuccess();
        } else {
          setError(data.message || 'Payment verification failed.');
          setLoading(false);
        }
      }, 1500);

    } catch (err) {
      setTimeout(() => {
        setError('Network error during payment processing.');
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* Fake Razorpay Checkout UI */}
      <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 400, maxHeight: '90vh', overflowY: 'auto', overflowX: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', animation: 'slideUp 0.3s ease-out' }}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '50%', padding: 4, display: 'flex', zIndex: 10 }}>
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #4338ca)', padding: '30px 24px', color: '#fff', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: 9999, marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>SahiSeva MockPay™</span>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>₹{price}.00</h2>
          <p style={{ opacity: 0.9, fontSize: 14 }}>Secure your checkout</p>
        </div>

        {/* Body */}
        <div style={{ padding: 24 }}>
          {error && (
            <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', fontWeight: 500 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f0fdf4', color: '#16a34a', padding: '12px 16px', borderRadius: 10, marginBottom: 24, border: '1px solid #bbf7d0' }}>
            <ShieldCheck size={20} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>100% Secure Transaction</span>
          </div>

          <p style={{ fontSize: 14, color: '#64748b', marginBottom: 16, fontWeight: 500 }}>Select Payment Method</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button disabled={loading} onClick={handlePayment} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: '#fff', cursor: 'pointer', transition: 'all 0.2s', opacity: loading ? 0.5 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: '#f8fafc', padding: 8, borderRadius: 8, color: '#334155' }}><Smartphone size={20} /></div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 15 }}>UPI / QR</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Google Pay, PhonePe, Paytm</div>
                </div>
              </div>
            </button>
            <button disabled={loading} onClick={handlePayment} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: '#fff', cursor: 'pointer', transition: 'all 0.2s', opacity: loading ? 0.5 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: '#f8fafc', padding: 8, borderRadius: 8, color: '#334155' }}><CreditCard size={20} /></div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 15 }}>Card</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Visa, Mastercard, RuPay</div>
                </div>
              </div>
            </button>
          </div>

          {loading && (
            <div style={{ marginTop: 20, textAlign: 'center', color: '#4338ca', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Lock size={16} /> Processing Payment...
            </div>
          )}
        </div>
        
        <div style={{ background: '#f8fafc', padding: '14px 24px', textAlign: 'center', borderTop: '1px solid #e2e8f0', fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Lock size={12} /> Secured by SahiSeva Payments
        </div>
      </div>
    </div>
  );
}
