<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInterviewsTable extends Migration
{
    public function up()
    {
        Schema::create('interviews', function (Blueprint $table) {
            $table->id(); // auto-incrementing primary key
            $table->foreignId('application_id')->constrained()->onDelete('cascade'); // assuming this is referencing the applications table
            $table->date('interview_date');
            $table->time('interview_time');
            $table->string('interview_location');
            $table->string('status'); // store the status of the interview
            $table->timestamps(); // created_at and updated_at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('interviews');
    }
}
