<?php

namespace App\Filament\Resources\CompanyResource\RelationManagers;

use App\Filament\Resources\JobResource;
use App\Models\Job;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class JobsRelationManager extends RelationManager
{
    protected static string $relationship = 'jobs';

    public function form(Form $form): Form
    {
        // Form ini umumnya tidak digunakan di sini, karena pembuatan/pengeditan Job
        // lebih baik dilakukan melalui JobResource-nya sendiri untuk kelengkapan data.
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->label('Judul Pekerjaan'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->label('Judul Pekerjaan'),
                Tables\Columns\TextColumn::make('location')
                    ->searchable()
                    ->label('Lokasi'),
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->label('Tipe'),
                Tables\Columns\TextColumn::make('salary')
                    ->money('IDR')
                    ->sortable()
                    ->label('Gaji'),
                Tables\Columns\TextColumn::make('applications_count')
                    ->counts('applications')
                    ->label('Jumlah Pelamar')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                // Menonaktifkan tombol "Create" di sini adalah praktik yang baik
                // untuk memaksa pembuatan Job melalui menu utamanya.
                // Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                // Arahkan tombol View ke halaman View di JobResource
                Tables\Actions\ViewAction::make()
                    ->url(fn (Job $record): string => JobResource::getUrl('view', ['record' => $record])),
                // Arahkan tombol Edit ke halaman Edit di JobResource
                Tables\Actions\EditAction::make()
                     ->url(fn (Job $record): string => JobResource::getUrl('edit', ['record' => $record])),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
