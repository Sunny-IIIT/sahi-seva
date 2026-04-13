import { Headphones, GraduationCap, HandHeart } from "lucide-react";
import Link from "next/link";

export function generateMetadata() {
  return { title: 'Training & Support | SahiSeva' };
}

export default function TrainingSupportPage() {
  return (
    <>
      <div style={{ minHeight: '80vh', background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
             <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
              We Are Here <span style={{ color: '#4f46e5' }}>For You</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
              SahiSeva stands with its professionals. Get the support and upskilling you need.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 24, marginBottom: 50 }}>
             <div style={{ background: '#fff', padding: '32px', borderRadius: 20, display: 'flex', gap: 24, border: '1px solid #e2e8f0' }}>
               <div style={{ color: '#4f46e5', flexShrink: 0 }}><Headphones size={36} /></div>
               <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>24/7 Helpline</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.6 }}>Got into a dispute with a customer? Need help with payment terms? Call our worker support line anytime at <strong>1800-123-4567</strong>.</p>
               </div>
             </div>
             
             <div style={{ background: '#fff', padding: '32px', borderRadius: 20, display: 'flex', gap: 24, border: '1px solid #e2e8f0' }}>
               <div style={{ color: '#4f46e5', flexShrink: 0 }}><GraduationCap size={36} /></div>
               <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Skill Workshops (Coming Soon)</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.6 }}>We will soon be launching free Saturday workshops to help you learn advanced appliance repair, cooking specialized cuisines, and better communication skills.</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </>
  );
}
