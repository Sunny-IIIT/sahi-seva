"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, AlertTriangle, User, Loader2 } from 'lucide-react';

interface BookingRatingModalProps {
  bookingId: string;
  workerName?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingRatingModal({ bookingId, workerName = "Your Pro", onClose, onSuccess }: BookingRatingModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [issueType, setIssueType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDispute = rating > 0 && rating <= 2;
  const isGood = rating >= 4;

  const handleSubmit = async () => {
    if (isDispute && !issueType) {
      alert("Please select an issue type.");
      return;
    }
    if (isDispute && !comment.trim()) {
      alert("Please describe the problem.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          rating,
          comment,
          issueType: isDispute ? issueType : undefined
        })
      });
      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        alert("Failed to submit review.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-colors duration-500 ${isDispute ? 'bg-red-50/30' : ''}`}
      >
        {/* Dynamic Theme Banner */}
        <AnimatePresence>
          {isDispute && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-0 left-0 w-full bg-red-500 text-white text-xs font-bold text-center py-1 flex items-center justify-center gap-1"
            >
              <AlertTriangle size={14} /> Grievance Mode Activated
            </motion.div>
          )}
          {isGood && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-0 left-0 w-full bg-emerald-500 text-white text-xs font-bold text-center py-1 flex items-center justify-center gap-1"
            >
              <CheckCircle2 size={14} /> Excellent Service
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-center pt-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm mb-4">
            <User size={32} className="text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 text-center">How was your service?</h2>
          <p className="text-slate-500 text-sm mb-6 text-center">Rate your experience with {workerName}</p>

          {/* Interactive Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileTap={{ scale: 0.8 }}
                onClick={() => setRating(star)}
                className="p-1 focus:outline-none"
              >
                <Star
                  size={44}
                  strokeWidth={1.5}
                  className={`transition-colors duration-300 ${
                    rating >= star
                      ? isDispute
                        ? 'fill-red-500 text-red-500'
                        : 'fill-yellow-400 text-yellow-400'
                      : 'fill-slate-100 text-slate-200'
                  }`}
                />
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            {rating > 0 && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-4"
              >
                {isDispute ? (
                  // DISPUTE FORM (1-2 STARS)
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-bold text-red-900 mb-1">Select Issue *</label>
                      <select
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                        className="w-full bg-white border border-red-200 rounded-xl p-4 text-slate-800 focus:ring-2 focus:ring-red-500 outline-none text-lg appearance-none shadow-sm"
                      >
                        <option value="" disabled>Choose a reason...</option>
                        <option value="Unprofessional Behavior">Unprofessional Behavior</option>
                        <option value="Incomplete Work">Incomplete Work</option>
                        <option value="Overcharged">Overcharged</option>
                        <option value="No Show / Late">Late Arrival</option>
                        <option value="Other">Other Problem</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-red-900 mb-1">Describe the problem *</label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Please provide details so we can investigate..."
                        className="w-full bg-white border border-red-200 rounded-xl p-4 text-slate-800 focus:ring-2 focus:ring-red-500 outline-none resize-none h-28 shadow-sm"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all text-white font-bold text-lg p-4 rounded-xl flex justify-center items-center gap-2 shadow-lg shadow-red-200"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Review & Raise Ticket'}
                    </button>
                  </motion.div>
                ) : (
                  // GOOD/NEUTRAL FORM (3-5 STARS)
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Optional Compliments</label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What did they do well?"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none resize-none h-24"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all text-white font-bold text-lg p-4 rounded-xl flex justify-center items-center shadow-lg"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Review'}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Close button for when they don't want to rate immediately */}
          <button 
            onClick={onClose}
            className="mt-4 text-slate-400 hover:text-slate-600 text-sm font-medium p-2"
          >
            Skip for now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
