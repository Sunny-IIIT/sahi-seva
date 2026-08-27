'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

export default function BulkUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    setUploadStatus('idle');
    setErrorMessage('');
    
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      setErrorMessage('Please upload a valid CSV file.');
      return;
    }
    
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploadStatus('uploading');
    
    // Create form data for upload
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Mocking the API endpoint for bulk registration
      // In a real implementation, you would hit POST /api/workers/bulk-register
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setUploadStatus('success');
      setFile(null);
      
      // Reset after a few seconds
      setTimeout(() => setUploadStatus('idle'), 4000);
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Failed to process the CSV file. Please check the format.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Bulk Worker Onboarding</h2>
        <p className="text-sm text-gray-500">Upload a CSV file to register multiple workers to your society at once.</p>
      </div>

      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 
          file ? 'border-green-300 bg-green-50' : 
          'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".csv" 
          className="hidden" 
        />
        
        {file ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
              <FileText size={32} />
            </div>
            <p className="font-medium text-gray-800">{file.name}</p>
            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
            <button 
              className="text-xs font-semibold text-red-500 hover:text-red-700 mt-2"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setUploadStatus('idle');
              }}
            >
              Remove file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-3 bg-gray-100 text-gray-500 rounded-full">
              <UploadCloud size={32} />
            </div>
            <p className="font-medium text-gray-700">Click or drag and drop a CSV file here</p>
            <p className="text-xs text-gray-500">Required columns: Name, Phone, Category, Aadhaar</p>
          </div>
        )}
      </div>

      {uploadStatus === 'error' && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-start">
          <AlertTriangle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {uploadStatus === 'success' && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center">
          <CheckCircle className="text-green-500 mr-2" size={16} />
          <p className="text-sm text-green-700 font-medium">CSV successfully processed! Workers are being added.</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          disabled={!file || uploadStatus === 'uploading' || uploadStatus === 'success'}
          onClick={handleUpload}
          className={`px-6 py-2 rounded-lg font-medium flex items-center transition-colors ${
            !file 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
          }`}
        >
          {uploadStatus === 'uploading' ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Processing...
            </>
          ) : (
            'Upload & Register'
          )}
        </button>
      </div>
    </div>
  );
}
