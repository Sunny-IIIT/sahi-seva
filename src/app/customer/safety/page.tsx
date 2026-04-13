import { Shrub, FileCheck, Lock, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export function generateMetadata() {
  return { title: 'Safety & Verification | SahiSeva' };
}

export default function SafetyPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '80vh', background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
             <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Trust is <span style={{ color: '#16a34a' }}>Guaranteed</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
              Your family's safety is our highest priority. Learn how we verify every single professional on SahiSeva.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 60 }}>
            {[
              {
                icon: FileCheck,
                title: "100% Aadhaar Verified",
                desc: "We mandate government ID checks for every professional. Nobody joins our platform without submitting authentic identity proofs.",
                color: '#16a34a', bg: '#dcfce7'
              },
              {
                icon: Lock,
                title: "Bank-Grade Data Security",
                desc: "Uploaded IDs are securely tokenized and immediately encrypted. We do not store raw images, ensuring zero risk of document misuse according to the DPDP Act.",
                color: '#4f46e5', bg: '#eef2ff'
              },
              {
                icon: ShieldAlert,
                title: "Community Backed Reviews",
                desc: "Our ratings are generated directly by previous customers. This crowd-sourced feedback loop ensures bad actors are immediately deactivated.",
                color: '#e11d48', bg: '#ffe4e6'
              }
            ].map((feature, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '32px', borderRadius: 20, display: 'flex', gap: 24, alignItems: 'flex-start', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ background: feature.bg, color: feature.color, padding: 16, borderRadius: 16, flexShrink: 0 }}>
                  <feature.icon size={32} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>{feature.title}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '1.05rem', margin: 0 }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
}
