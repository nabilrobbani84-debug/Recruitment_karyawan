<?php

namespace App\Filament\Resources;

use App\Filament\Resources\JobResource\Pages;
use App\Filament\Resources\JobResource\RelationManagers;
use App\Models\Job;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class JobResource extends Resource
{
    protected static ?string $model = Job::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';
    protected static ?string $navigationGroup = 'Manajemen Rekrutmen';
    protected static ?int $navigationSort = 3;

    
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Detail Lowongan')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null)
                                    ->label('Judul Lowongan'),

                                Forms\Components\TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated()
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(Job::class, 'slug', ignoreRecord: true),

                                Forms\Components\MarkdownEditor::make('description')
                                    ->required()
                                    ->columnSpanFull()
                                    ->label('Deskripsi Pekerjaan'),
                            ])->columns(2),

                        Forms\Components\Section::make('Informasi Tambahan')
                            ->schema([
                                Forms\Components\TextInput::make('location')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Lokasi'),
                                Forms\Components\Select::make('type')
                                    ->options([
                                        'Full-time' => 'Full-time',
                                        'Part-time' => 'Part-time',
                                        'Contract' => 'Contract',
                                        'Internship' => 'Internship',
                                    ])
                                    ->required()
                                    ->label('Tipe Pekerjaan'),
                                Forms\Components\TextInput::make('salary_range')
                                    ->maxLength(255)
                                    ->label('Rentang Gaji (Opsional)'),
                            ])->columns(3),
                    ])->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Status')
                            ->schema([
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Aktif')
                                    ->helperText('Lowongan aktif akan tampil di halaman publik.')
                                    ->default(true),
                            ]),
                        Forms\Components\Section::make('Relasi')
                            ->schema([
                                Forms\Components\Select::make('company_id')
                                    ->relationship('company', 'name')
                                    ->searchable()
                                    ->required()
                                    ->label('Perusahaan'),
                                Forms\Components\Select::make('category_id')
                                    ->relationship('category', 'name')
                                    ->searchable()
                                    ->required()
                                    ->label('Kategori'),
                                Forms\Components\Select::make('skills')
                                    ->relationship('skills', 'name')
                                    ->multiple()
                                    ->preload()
                                    ->searchable()
                                    ->label('Skill yang Dibutuhkan'),
                            ]),
                    ])->columnSpan(['lg' => 1]),
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul Lowongan')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('company.name')
                    ->label('Perusahaan')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('applications_count')
                    ->counts('applications')
                    ->label('Jumlah Pelamar')
                    ->sortable(),
                Tables\Columns\TextColumn::make('type')
                    ->label('Tipe')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
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
            // PERBAIKAN: Baris ini menyebabkan error jika file-nya belum ada.
            // Untuk membuatnya, jalankan perintah di terminal:
            // php artisan make:filament-relation-manager JobResource applications candidate_id
            // Setelah itu, Anda bisa hapus komentar di baris berikut.
            // RelationManagers\ApplicationsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            // 'index' => Pages\ListJobs::route('/'),
            // 'create' => Pages\CreateJob::route('/create'),
            // 'edit' => Pages\EditJob::route('/{record}/edit'),
            // 'view' => Pages\ViewJob::route('/{record}'),
        ];
    }
}
