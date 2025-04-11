"use client";
import React, { useState } from 'react';

export default function UploadNotes() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload-notes', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUploadedUrl(data.url);
      } else {
        setUploadError(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 min-h-screen p-4 pt-16">
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 w-full sm:w-96 transition-all">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6 mt-0 tracking-tight">
          📄 Upload Notes
        </h2>
        <div className="space-y-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-800 bg-white/90 border border-gray-300 rounded-lg p-2 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition"
          />
          {uploadError && (
            <p className="text-red-500 text-sm text-center">{uploadError}</p>
          )}
          <button
            onClick={handleFileUpload}
            disabled={uploading}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              uploading
                ? 'bg-indigo-400 cursor-wait'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Notes'}
          </button>
          {uploadedUrl && (
            <div className="mt-4 text-center">
              <p className="text-green-600 font-medium">✅ File uploaded successfully!</p>
              <a
                href={uploadedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 underline hover:text-indigo-900 transition"
              >
                View the uploaded file
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
