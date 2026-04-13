import { Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function generateMetadata() {
  return { title: 'Customer Reviews | SahiSeva' };
}

const reviews = [
  { name: "Anjali Gupta", area: "Andheri, Mumbai", text: "Finding a reliable maid was a nightmare until I found SahiSeva. The verified badge gave me confidence, and Geeta has been working with us perfectly for 3 months now.", rating: 5 },
  { name: "Rahul Verma", area: "Gurugram", text: "Got a plumber within an hour on a Sunday. Directly called him, fixed the price over the phone, no hidden platform fees. Excellent service model.", rating: 5 },
  { name: "Priya Sharma", area: "Vesu, Surat", text: "The Trust Pass is totally worth it. I unlocked 5 cooks' numbers, interviewed them, and finalized the best fit without paying any agency commission.", rating: 4 },
  { name: "Vikram Reddy", area: "Koramangala, Bangalore", text: "The Aadhaar verification requirement for workers is a brilliant feature. It ensures safety for our family. Highly recommended for finding nannies.", rating: 5 },
];

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh', background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
             <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
              18,000+ Happy <span style={{ color: '#eab308' }}>Customers</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
              Read what homeowners across India have to say about finding their trusted professionals on SahiSeva.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, marginBottom: 60 }}>
            {reviews.map((review, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '32px', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16, color: '#eab308' }}>
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p style={{ color: '#334155', lineHeight: 1.7, fontSize: '1.05rem', fontStyle: 'italic', flex: 1 }}>
                  "{review.text}"
                </p>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
                  <p style={{ fontWeight: 700, color: '#0f172a', margin: 0 }}>{review.name}</p>
                  <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0 0' }}>{review.area}</p>
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
