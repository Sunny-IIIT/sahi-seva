"use client";

import { useState } from "react";
import { BookingRatingModal } from "@/components/BookingRatingModal";

export default function TestRatingPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">UI Component Preview</h1>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
          Test the Post-Service Rating & Smart Grievance Mechanism by triggering the modal below.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:bg-indigo-700 active:scale-95 transition-all"
        >
          Simulate Job Completion
        </button>
      </div>

      {showModal && (
        <BookingRatingModal
          bookingId="test-booking-id-123"
          workerName="Sunil M. (Plumber)"
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            alert("Success! Review/Ticket saved to DB.");
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
