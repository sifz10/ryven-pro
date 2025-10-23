<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('email')->index();
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->string('project_type')->nullable();
            $table->text('project_description')->nullable();
            $table->json('requirements')->nullable();
            $table->json('budget')->nullable();
            $table->json('timeline')->nullable();
            $table->json('metadata')->nullable();
            $table->string('status')->default('pending');
            $table->string('estimate_pdf_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};


