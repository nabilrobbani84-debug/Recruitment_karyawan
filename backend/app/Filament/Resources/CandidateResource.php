<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CandidateResource\Pages;
use App\Models\Candidate;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class CandidateResource extends Resource
{
    protected static ?string $model = Candidate::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationGroup = 'Manajemen Pengguna';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Akun Pengguna')
                    ->description('Data login dan email yang terhubung dengan kandidat.')
                    ->schema([
                        Forms\Components\TextInput::make('user.name')
                            ->label('Nama Lengkap')
                            ->disabled(),
                        Forms\Components\TextInput::make('user.email')
                            ->label('Alamat Email')
                            ->disabled(),
                    ])->columns(2),

                Forms\Components\Section::make('Detail Profil Kandidat')
                    ->schema([
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('profile.phone')
                                    ->label('Nomor Telepon'),
                                Forms\Components\TextInput::make('profile.address')
                                    ->label('Alamat'),
                                Forms\Components\Textarea::make('profile.bio')
                                    ->label('Bio Singkat')
                                    ->columnSpanFull(),
                                Forms\Components\FileUpload::make('profile.resume')
                                    ->label('CV / Resume')
                                    ->directory('resumes')
                                    ->openable()
                                    ->downloadable(),
                            ]),
                    ]),

                Forms\Components\Section::make('Keahlian')
                    ->schema([
                        Forms\Components\Select::make('skills')
                            ->relationship('skills', 'name')
                            ->multiple()
                            ->preload()
                            ->searchable()
                            ->label('Daftar Keahlian'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->searchable()
                    ->sortable()
                    ->label('Nama Kandidat'),
                Tables\Columns\TextColumn::make('user.email')
                    ->searchable()
                    ->label('Email'),
                Tables\Columns\TextColumn::make('profile.phone')
                    ->searchable()
                    ->label('Telepon'),
                Tables\Columns\TextColumn::make('skills.name')
                    ->badge()
                    ->label('Keahlian'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // Filter bisa ditambahkan di sini, contohnya filter berdasarkan keahlian
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Jika ada relasi yang ingin ditampilkan sebagai tab, tambahkan di sini
        ];
    }

        public static function getPages(): array
    {
        return [
            'index' => Pages\ManageCandidates::route('/'), 
        ];
    }
}