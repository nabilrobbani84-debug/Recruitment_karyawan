<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CompanyResource\Pages;
use App\Filament\Resources\CompanyResource\RelationManagers;
use App\Models\Company;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

/**
 * @mixin \App\Models\Company
 */
class CompanyResource extends Resource
{
    protected static ?string $model = Company::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static ?string $navigationGroup = 'Manajemen Rekrutmen';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Informasi Perusahaan')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Nama Perusahaan'),
                                Forms\Components\TextInput::make('website')
                                    ->url()
                                    ->maxLength(255)
                                    ->label('Situs Web'),
                                // Menggunakan MarkdownEditor untuk deskripsi yang lebih fleksibel
                                Forms\Components\MarkdownEditor::make('description')
                                    ->columnSpanFull()
                                    ->label('Deskripsi Perusahaan'),
                            ])->columns(2),

                        Forms\Components\Section::make('Alamat')
                            ->schema([
                                Forms\Components\TextInput::make('address')
                                    ->label('Alamat Lengkap'),
                                Forms\Components\TextInput::make('city')
                                    ->label('Kota'),
                                Forms\Components\TextInput::make('state')
                                    ->label('Provinsi'),
                                Forms\Components\TextInput::make('postal_code')
                                    ->label('Kode Pos'),
                            ])->columns(2),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Meta')
                            ->schema([
                                Forms\Components\FileUpload::make('logo')
                                    ->image()
                                    ->directory('company-logos')
                                    ->imageEditor()
                                    ->label('Logo Perusahaan'),
                                Forms\Components\Select::make('user_id')
                                    ->relationship('user', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->required()
                                    ->label('Pemilik (User Employer)'),
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Status Aktif')
                                    ->default(true)
                                    ->helperText('Nonaktifkan untuk menyembunyikan perusahaan dari daftar publik.'),
                            ]),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('logo')
                    ->label('Logo')
                    ->circular(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->label('Nama Perusahaan'),
                Tables\Columns\TextColumn::make('user.name')
                    ->searchable()
                    ->sortable()
                    ->label('Pemilik'),
                Tables\Columns\TextColumn::make('jobs_count')
                    ->counts('jobs')
                    ->label('Jumlah Lowongan')
                    ->sortable(),
                // --- PERBAIKAN UTAMA DI SINI ---
                // Menghilangkan closure yang tidak perlu, karena Filament bisa menanganinya secara otomatis.
                // Ini juga memperbaiki peringatan "Undefined property".
                Tables\Columns\TextColumn::make('website')
                    ->url(fn (Company $record): ?string => $record->website)
                    ->openUrlInNewTab()
                    ->label('Situs Web')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean()
                    ->sortable(),
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
            RelationManagers\JobsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            // Menggunakan halaman Manage standar yang sudah mencakup Create, Edit, List.
            // 'index' => Pages\ListCompanies::route('/'),
            // 'create' => Pages\CreateCompany::route('/create'),
            // 'edit' => Pages\EditCompany::route('/{record}/edit'),
        ];
    }
}
