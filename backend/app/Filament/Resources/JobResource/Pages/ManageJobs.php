<?php

namespace App\Filament\Resources\JobResource\Pages;

use App\Filament\Resources\JobResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageJobs extends ManageRecords
{
    protected static string $resource = JobResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
