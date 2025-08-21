// src/app/(dashboard-employer)/candidates/page.tsx
'use client';

import SectionTitle from "@/component/common/SectionTitle";
import { Search } from "lucide-react";

// Placeholder data, mirip dengan data pelamar
const candidateDatabase = [
     { id: 'cand-1', name: 'Budi Santoso', title: 'Frontend Developer', skills: ['React', 'Vue', 'TypeScript'], location: 'Jakarta', avatar: '/images/avatar-1.png' },
     { id: 'cand-2', name: 'Citra Lestari', title: 'UI/UX Designer', skills: ['Figma', 'Sketch', 'Prototyping'], location: 'Bandung', avatar: '/images/avatar-2.png' },
     { id: 'cand-3', name: 'Agus Wijaya', title: 'Backend Developer', skills: ['Go', 'PostgreSQL', 'Docker'], location: 'Surabaya', avatar: '/images/avatar-3.png' },
]

// Komponen Candidate Card
const CandidateResultCard = ({ candidate }: { candidate: any }) => (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-4">
            <img src={candidate.avatar} alt={candidate.name} className="h-14 w-14 rounded-full" />
            <div>
                <h3 className="font-bold text-lg text-primary">{candidate.name}</h3>
                <p className="text-gray-600 text-sm">{candidate.title}</p>
                <p className="text-gray-500 text-xs">{candidate.location}</p>
            </div>
        </div>
        <div className="mt-4">
            <h4 className="font-semibold text-sm mb-2">Keahlian Utama:</h4>
            <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill: string) => (
                    <span key={skill} className="bg-primary-light/20 text-primary-dark text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
         <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
             <button className="text-sm font-medium text-primary hover:underline">Lihat Profil Lengkap</button>
         </div>
    </div>
)


export default function SearchCandidatesPage() {
    return (
        <div>
            <SectionTitle
                title="Temukan Kandidat Terbaik"
                subtitle="Gunakan filter untuk mencari kandidat yang paling sesuai dengan kebutuhan Anda."
            />

            {/* Filter Pencarian */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input type="text" placeholder="Posisi atau Keahlian..." className="md:col-span-2 form-input"/>
                    <input type="text" placeholder="Lokasi" className="form-input"/>
                    <button className="w-full bg-primary text-white font-bold rounded-lg flex items-center justify-center">
                        <Search size={20} className="mr-2"/> Cari
                    </button>
                </div>
            </div>

            {/* Hasil Pencarian */}
            <div className="mt-8">
                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Menampilkan {candidateDatabase.length} hasil</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {candidateDatabase.map(candidate => (
                         <CandidateResultCard key={candidate.id} candidate={candidate} />
                     ))}
                 </div>
            </div>
        </div>
    );
}