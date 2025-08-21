'use client';

import React, { useState, useRef } from 'react';
import { profileService } from '@/services/profileService';
import { FileText, Upload, Download, Loader2 } from 'lucide-react';

interface CVUploadProps {
  currentCV?: string; // URL CV yang sudah ada
}

export const CVUpload: React.FC<CVUploadProps> = ({ currentCV }) => {
  const [cvUrl, setCvUrl] = useState(currentCV);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const result = await profileService.uploadCv(file);
      setCvUrl(result.cvUrl);
      alert('CV berhasil diunggah!');
    } catch (error) {
      alert('Gagal mengunggah CV.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getFileNameFromUrl = (url: string) => {
    try {
      return new URL(url).pathname.split('/').pop() || 'file_cv.pdf';
    } catch {
      return 'file_cv.pdf';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-blue-600" />
        <div>
          <p className="font-semibold text-gray-800">
            {cvUrl ? getFileNameFromUrl(cvUrl) : 'Belum ada CV yang diunggah'}
          </p>
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <Download size={14} />
              Unduh CV
            </a>
          )}
        </div>
      </div>

      <div className="mt-4 sm:mt-0">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx"
        />
        <button
          onClick={handleUploadClick}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 text-sm font-semibold rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
          <span>{isLoading ? 'Mengunggah...' : 'Ganti CV'}</span>
        </button>
      </div>
    </div>
  );
};