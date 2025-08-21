<?php

namespace App\Policies;

use App\Models\Application;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ApplicationPolicy
{
    /**
     * Menentukan apakah pengguna bisa melihat lamaran.
     */
    public function view(User $user, Application $application): bool
    {
        // Kandidat bisa melihat lamarannya sendiri.
        // PERBAIKAN: Gunakan primary key 'candidate_id' dari model Candidate.
        if ($user->candidate && $user->candidate->candidate_id === $application->candidate_id) {
            return true;
        }

        // Employer bisa melihat lamaran untuk pekerjaan di perusahaannya.
        if ($user->company && $user->company->id === $application->job->company_id) {
            return true;
        }

        return false;
    }

    /**
     * Menentukan apakah pengguna bisa memperbarui lamaran (mengubah status).
     */
    public function update(User $user, Application $application): bool
    {
        // Hanya employer pemilik pekerjaan yang bisa mengubah status lamaran.
        return $user->company && $user->company->id === $application->job->company_id;
    }

    /**
     * Menentukan apakah pengguna bisa menghapus lamaran (menarik lamaran).
     */
    public function delete(User $user, Application $application): bool
    {
        // Hanya kandidat yang membuat lamaran yang bisa menariknya.
        // PERBAIKAN: Gunakan primary key 'candidate_id' dari model Candidate.
        return $user->candidate && $user->candidate->candidate_id === $application->candidate_id;
    }
}