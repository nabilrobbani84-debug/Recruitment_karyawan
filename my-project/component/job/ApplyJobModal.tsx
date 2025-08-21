// src/components/job/ApplyJobModal.tsx

'use client';

import React, { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, UploadCloud, Send, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Job, ApplicationFormData } from '@/lib/types';
// import { applicationService } from '@/services/applicationService'; // Aktifkan saat service siap

/**
 * Enumerasi untuk mengelola berbagai state di dalam modal.
 * Ini adalah pendekatan FSM (Finite State Machine) sederhana untuk UI yang andal.
 */
type FormState = 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';

interface ApplyJobModalProps {
  /**
   * State untuk mengontrol visibilitas modal.
   */
  isOpen: boolean;
  /**
   * Fungsi untuk mengubah state visibilitas modal dari komponen induk.
   */
  setIsOpen: (isOpen: boolean) => void;
  /**
   * Objek data pekerjaan yang sedang dilamar.
   */
  job: Job;
}

/**
 * Komponen Modal yang canggih dan interaktif untuk proses melamar pekerjaan.
 * Mengelola state internal untuk memberikan feedback yang jelas kepada pengguna,
 * mulai dari pengisian form, proses pengiriman, hingga pesan sukses atau error.
 */
export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ isOpen, setIsOpen, job }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [formState, setFormState] = useState<FormState>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  
  const inputFileRef = useRef<HTMLInputElement>(null);

  /**
   * Mereset semua state form ke kondisi awal.
   */
  const resetFormState = () => {
    setCoverLetter('');
    setCvFile(null);
    setFormState('IDLE');
    setErrorMessage('');
  };
  
  /**
   * Menutup modal dan mereset state setelah animasi transisi selesai.
   */
  const handleCloseModal = () => {
    if (formState === 'SUBMITTING') return; // Mencegah penutupan saat proses kirim
    setIsOpen(false);
  };

  /**
   * Menangani perubahan pada input file dan melakukan validasi.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi ukuran file (misal: maks 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Ukuran file tidak boleh melebihi 5MB.");
        setCvFile(null);
        return;
      }
      // Validasi tipe file
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setErrorMessage("Format file tidak didukung. Harap unggah PDF, DOC, atau DOCX.");
        setCvFile(null);
        return;
      }
      // Jika valid, reset pesan error dan set file
      setErrorMessage('');
      setCvFile(file);
    }
  };

  /**
   * Mengirim data lamaran ke backend.
   */
  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setErrorMessage("Harap unggah CV Anda terlebih dahulu.");
      return;
    }
    setFormState('SUBMITTING');
    setErrorMessage('');

    const formData: ApplicationFormData = { coverLetter, cvFile };

    try {
      // Aktifkan baris ini saat service siap
      // await applicationService.applyToJob(job.id, formData);
      
      // Simulasi panggilan API
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Uncomment baris di bawah untuk mensimulasikan kondisi error
      // throw new Error("Koneksi ke server gagal. Silakan coba beberapa saat lagi.");

      setFormState('SUCCESS');
    } catch (err: unknown) {
      setFormState('ERROR');
      setErrorMessage(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui.');
    }
  };

  /**
   * Render konten dinamis berdasarkan state form.
   */
  const renderModalContent = () => {
    switch (formState) {
      case 'SUCCESS':
        return (
          <div className="text-center p-4 sm:p-8">
            <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
            <h3 className="mt-4 text-2xl font-bold text-gray-900">Lamaran Terkirim!</h3>
            <p className="mt-2 text-gray-600">
              Lamaran Anda untuk posisi <strong>{job.title}</strong> telah berhasil kami teruskan ke <strong>{job.companyName}</strong>.
            </p>
            <button
              type="button"
              onClick={handleCloseModal}
              className="mt-8 w-full inline-flex justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Luar Biasa!
            </button>
          </div>
        );
      case 'ERROR':
        return (
          <div className="text-center p-4 sm:p-8">
            <AlertTriangle className="mx-auto h-20 w-20 text-red-500" />
            <h3 className="mt-4 text-2xl font-bold text-gray-900">Terjadi Kesalahan</h3>
            <div className="mt-2 text-sm text-red-700 bg-red-100 p-3 rounded-md">
                <p>{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setFormState('IDLE')}
              className="mt-8 w-full inline-flex justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Coba Lagi
            </button>
          </div>
        );
      default: // IDLE & SUBMITTING
        return (
          <>
            <div className="flex justify-between items-start">
              <div>
                <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900">
                  Lamar Posisi: {job.title}
                </Dialog.Title>
                <p className="text-sm text-gray-500 mt-1">di {job.companyName}</p>
              </div>
              <button onClick={handleCloseModal} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmitApplication} className="mt-6 space-y-6">
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-800">Surat Lamaran (Opsional)</label>
                <textarea id="coverLetter" rows={5} value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary transition" placeholder="Tulis pesan singkat yang menonjolkan kenapa Anda cocok untuk posisi ini..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Unggah CV/Resume (Wajib)</label>
                <div onClick={() => inputFileRef.current?.click()} className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 hover:border-primary cursor-pointer transition-colors bg-gray-50 hover:bg-white">
                  {cvFile ? (
                    <div className="text-center">
                      <FileText className="mx-auto h-12 w-12 text-green-500" />
                      <p className="mt-2 font-semibold text-gray-800 truncate max-w-xs">{cvFile.name}</p>
                      <p className="text-xs text-gray-500">{(cvFile.size / 1024).toFixed(2)} KB</p>
                      <span className="mt-2 text-sm font-medium text-primary hover:underline">Klik untuk ganti file</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600"><span className="font-semibold text-primary">Pilih file</span> atau seret dan lepas</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (Maks. 5MB)</p>
                    </div>
                  )}
                  <input ref={inputFileRef} id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                </div>
                {errorMessage && !cvFile && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
              </div>
              <div className="pt-4 text-right">
                <button type="submit" disabled={formState === 'SUBMITTING' || !cvFile} className="inline-flex min-w-[180px] justify-center items-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all">
                  {formState === 'SUBMITTING' ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : (
                    <><Send size={18} className="mr-2"/> Kirim Lamaran</>
                  )}
                </button>
              </div>
            </form>
          </>
        );
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleCloseModal}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95" afterLeave={resetFormState}>
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 sm:p-8 text-left align-middle shadow-xl transition-all">
                {renderModalContent()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ApplyJobModal;
