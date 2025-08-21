<?php

namespace App\Filament\Resources\EmployerResource\Pages;

use App\Filament\Resources\EmployerResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageEmployers extends ManageRecords
{
    protected static string $resource = EmployerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
