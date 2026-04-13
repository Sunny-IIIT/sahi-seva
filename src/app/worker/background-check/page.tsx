import { ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function generateMetadata() {
  return { title: 'Background Check Process | SahiSeva' };
}

export default function BackgroundCheckPage() {
  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh', background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
             <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Document <span style={{ color: '#16a34a' }}>Verification</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
              Why we need your Aadhaar and how we keep it 100% secure.
            </p>
          </div>

          <div style={{ background: '#fff', borderRadius: 24, padding: '40px', border: '1px solid #e2e8f0', marginBottom: 40 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Why Aadhaar?</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 30 }}>
              Customers invite you into their homes. To ensure their family's safety, they trust the <strong>SahiSeva Verified Badge</strong>. 
              By providing your Aadhaar, you prove your identity, which helps you get more jobs and earn more money.
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Is my data safe?</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                 <div style={{ color: '#16a34a', marginTop: 2 }}><CheckCircle2 size={24} /></div>
                 <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}><strong>Zero Raw Storage:</strong> We instantly convert your document into a secure digital token. We never store the actual photo of your Aadhaar card.</p>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                 <div style={{ color: '#16a34a', marginTop: 2 }}><CheckCircle2 size={24} /></div>
                 <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}><strong>DPDP Compliant:</strong> SahiSeva complies fully with the India Digital Personal Data Protection Act.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
