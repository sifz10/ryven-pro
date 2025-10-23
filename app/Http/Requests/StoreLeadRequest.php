<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'company' => ['nullable', 'string', 'max:255'],
            'project_type' => ['nullable', 'string', 'max:255'],
            'project_description' => ['nullable', 'string'],
            'requirements' => ['nullable', 'array'],
            'budget' => ['nullable', 'array'],
            'timeline' => ['nullable', 'array'],
            'metadata' => ['nullable', 'array'],
        ];
    }
}


