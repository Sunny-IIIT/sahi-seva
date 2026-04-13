export default function GlobalLoading() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ textAlign: 'center' }}>
        {/* Logo pulse */}
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: 'linear-gradient(135deg, #4338ca, #0891b2)',
          margin: '0 auto 20px',
          animation: 'sahiPulse 1.5s ease-in-out infinite'
        }} />
        <p style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.03em' }}>Loading SahiSeva...</p>
      </div>
      <style>{`
        @keyframes sahiPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.92); }
        }
      `}</style>
    </div>
  );
}
