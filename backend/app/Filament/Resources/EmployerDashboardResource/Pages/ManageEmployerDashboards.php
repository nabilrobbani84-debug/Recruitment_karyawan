<?php

namespace App\Filament\Resources\EmployerDashboardResource\Pages;

use App\Filament\Resources\EmployerDashboardResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageEmployerDashboards extends ManageRecords
{
    protected static string $resource = EmployerDashboardResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
