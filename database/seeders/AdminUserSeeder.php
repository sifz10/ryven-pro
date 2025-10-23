<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Lead;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create Customer User
        $customer = User::create([
            'name' => 'Customer User',
            'email' => 'customer@example.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'email_verified_at' => now(),
        ]);

        // Create some sample leads for the customer
        Lead::create([
            'user_id' => $customer->id,
            'name' => 'John Doe',
            'email' => 'customer@example.com',
            'phone' => '+1234567890',
            'company' => 'Tech Solutions Inc',
            'project_type' => 'web-app',
            'project_description' => 'We need a comprehensive web application with user authentication, dashboard, and reporting features.',
            'requirements' => [
                'User authentication system',
                'Admin dashboard',
                'Reporting module',
                'Responsive design',
                'API integration'
            ],
            'status' => 'completed',
            'budget' => ['range' => '$10,000 - $20,000'],
            'timeline' => ['weeks' => 12],
        ]);

        Lead::create([
            'user_id' => $customer->id,
            'name' => 'Jane Smith',
            'email' => 'customer@example.com',
            'phone' => '+1234567891',
            'company' => 'Digital Marketing Pro',
            'project_type' => 'mobile-app',
            'project_description' => 'Mobile app for iOS and Android with real-time notifications and social features.',
            'requirements' => [
                'iOS and Android apps',
                'Push notifications',
                'Social media integration',
                'User profiles',
                'In-app messaging'
            ],
            'status' => 'in_progress',
            'budget' => ['range' => '$20,000 - $30,000'],
            'timeline' => ['weeks' => 16],
        ]);

        Lead::create([
            'user_id' => $customer->id,
            'name' => 'Bob Johnson',
            'email' => 'customer@example.com',
            'phone' => '+1234567892',
            'company' => 'E-Commerce Plus',
            'project_type' => 'e-commerce',
            'project_description' => 'Full-featured e-commerce platform with payment processing and inventory management.',
            'requirements' => [
                'Product catalog',
                'Shopping cart',
                'Payment gateway',
                'Inventory management',
                'Order tracking'
            ],
            'status' => 'pending',
            'budget' => ['range' => '$30,000 - $50,000'],
            'timeline' => ['weeks' => 20],
        ]);

        echo "✓ Admin user created: admin@example.com / password\n";
        echo "✓ Customer user created: customer@example.com / password\n";
        echo "✓ Sample proposals created\n";
    }
}
