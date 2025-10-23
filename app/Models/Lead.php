<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'company',
        'project_type',
        'project_description',
        'requirements',
        'budget',
        'timeline',
        'metadata',
        'status',
        'estimate_pdf_path',
    ];

    protected $casts = [
        'requirements' => 'array',
        'budget' => 'array',
        'timeline' => 'array',
        'metadata' => 'array',
    ];

    /**
     * Get the user that owns the lead
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


