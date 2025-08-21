<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogResource\Pages;
use App\Models\Blog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class BlogResource extends Resource
{
    protected static ?string $model = Blog::class;

    protected static ?string $navigationIcon = 'heroicon-o-pencil-square';
    protected static ?string $navigationGroup = 'Konten';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Konten Utama')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null)
                                    ->label('Judul Postingan'),

                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->unique(Blog::class, 'slug', ignoreRecord: true)
                                    ->disabled()
                                    ->dehydrated(),

                                Forms\Components\RichEditor::make('content')
                                    ->required()
                                    ->columnSpanFull()
                                    ->label('Isi Konten'),
                            ])->columns(2),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Meta Informasi')
                            ->schema([
                                Forms\Components\FileUpload::make('thumbnail')
                                    ->image()
                                    ->directory('blog-thumbnails')
                                    ->label('Gambar Utama (Thumbnail)'),

                                Forms\Components\Select::make('category_id')
                                    ->relationship('category', 'name')
                                    ->required()
                                    ->searchable()
                                    ->preload()
                                    ->label('Kategori'),

                                Forms\Components\Select::make('author_id')
                                    ->relationship('author', 'name')
                                    ->required()
                                    ->searchable()
                                    ->preload()
                                    ->default(auth()->id())
                                    ->label('Penulis'),

                                Forms\Components\Toggle::make('is_published')
                                    ->label('Publikasikan')
                                    ->helperText('Artikel yang dipublikasikan akan tampil di halaman blog.')
                                    ->default(true),

                                Forms\Components\DateTimePicker::make('published_at')
                                    ->label('Tanggal Publikasi')
                                    ->default(now()),
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
                Tables\Columns\ImageColumn::make('thumbnail')
                    ->label('Gambar'),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->label('Judul'),
                Tables\Columns\TextColumn::make('category.name')
                    ->searchable()
                    ->sortable()
                    ->badge(),
                Tables\Columns\TextColumn::make('author.name')
                    ->searchable()
                    ->sortable()
                    ->label('Penulis'),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean()
                    ->label('Published'),
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->label('Tanggal Publikasi'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')
                    ->relationship('category', 'name')
                    ->label('Filter Kategori')
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

    public static function getPages(): array
    {
        return [
            // 'index' => Pages\ListBlogs::route('/'),
            // 'create' => Pages\CreateBlog::route('/create'),
            // 'edit' => Pages\EditBlog::route('/{record}/edit'),
        ];
    }
}
