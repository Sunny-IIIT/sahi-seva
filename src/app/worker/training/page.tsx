"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CloudUpload, CheckCircle, AlertCircle, Clock, ShieldCheck, X } from "lucide-react";

type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED';
const AVAILABLE_SKILLS = ["Plumber", "Electrician", "Carpenter", "AC Repair", "Mason", "Painter", "Cleaning", "RO Repair"];

export default function WorkerVerificationPage() {
  const [status, setStatus] = useState<VerificationStatus>('UNVERIFIED');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      if (selected.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(selected));
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedSkills.length === 0) {
      alert("Please select at least one skill.");
      return;
    }
    if (!file) {
      alert("Please upload a certificate.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('skills', JSON.stringify(selectedSkills));

      const res = await fetch('/api/worker/verify', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        setStatus('PENDING');
      } else {
        const err = await res.json();
        alert(err.error || "Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 sm:py-8">
      <div className="max-w-md mx-auto bg-white min-h-screen sm:min-h-[850px] sm:rounded-[40px] shadow-2xl relative flex flex-col border sm:border-slate-300 overflow-hidden">
        
        {/* HEADER */}
        <header className="bg-slate-900 text-white px-6 pt-12 pb-10 rounded-b-3xl shadow-md relative z-10">
          <h1 className="text-2xl font-bold tracking-tight mb-4">Skill Profiling</h1>
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${
              status === 'UNVERIFIED' ? 'bg-red-500/20 border-red-500/30 text-red-100' :
              status === 'PENDING' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-100' :
              'bg-emerald-500/20 border-emerald-500/30 text-emerald-100'
            }`}
          >
            {status === 'UNVERIFIED' && <AlertCircle size={20} className="text-red-400" />}
            {status === 'PENDING' && <Clock size={20} className="text-yellow-400" />}
            {status === 'VERIFIED' && <ShieldCheck size={20} className="text-emerald-400" />}
            
            <span className="font-bold text-sm tracking-wide">
              {status === 'UNVERIFIED' && 'Unverified - Action Required'}
              {status === 'PENDING' && 'Pending Admin Approval'}
              {status === 'VERIFIED' && 'Govt Certified Professional'}
            </span>
          </motion.div>
        </header>

        <main className="flex-1 px-6 -mt-6 relative z-20 space-y-8 pb-10 overflow-y-auto">
          
          {status === 'UNVERIFIED' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 bg-white p-2">
              
              {/* SKILLS SELECTOR */}
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-lg">Select Your Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SKILLS.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                          isSelected 
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {skill}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* UPLOAD ZONE */}
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-lg">Upload Certificate</h3>
                <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-200 rounded-2xl bg-indigo-50/50 hover:bg-indigo-50 transition-colors cursor-pointer overflow-hidden group">
                  <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                  
                  {preview ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-bold flex items-center gap-2"><CheckCircle size={20} /> File Selected</span>
                      </div>
                    </div>
                  ) : file ? (
                    <div className="text-center text-indigo-700 font-bold px-4">
                      <CheckCircle size={32} className="mx-auto mb-2 text-indigo-500" />
                      <p className="truncate">{file.name}</p>
                    </div>
                  ) : (
                    <div className="text-center px-4">
                      <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <CloudUpload size={28} className="text-indigo-600" />
                      </div>
                      <p className="text-sm font-bold text-slate-700">Tap to upload ITI Diploma</p>
                      <p className="text-xs text-slate-500 mt-1">or Experience Certificate (PDF/Image)</p>
                    </div>
                  )}
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-slate-800 active:scale-[0.98] transition-all flex justify-center items-center"
              >
                {isSubmitting ? 'Uploading...' : 'Submit for Verification'}
              </button>

            </motion.div>
          )}

          {status === 'PENDING' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Clock size={48} className="text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Review in Progress</h2>
              <p className="text-slate-500">Your documents have been securely sent to the local Cooperative Admin. You will be notified once verified.</p>
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
}
