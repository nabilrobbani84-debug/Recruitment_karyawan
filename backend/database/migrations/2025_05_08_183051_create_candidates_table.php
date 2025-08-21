<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string('candidate_id')->unique(); // Unique identifier for the candidate
            $table->string('user_id');
            $table->text('address');
            $table->string('phone_number');
            $table->string('cv')->nullable(); // This will store the path to the CV file
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations (drop the 'candidates' table).
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('candidates');
    }
};
