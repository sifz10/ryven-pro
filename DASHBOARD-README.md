# Role-Based Dashboard System

## Overview

This application now features a modern, role-based dashboard system with two user roles:

1. **Admin** - Full system access for managing users and all proposals
2. **Customer** - Limited access to manage their own profile and proposals

## Features

### 🔐 Authentication & Authorization

- Role-based middleware protection
- Automatic role assignment on registration (default: customer)
- Admin-only routes and controllers
- Customer-scoped data access

### 📊 Modern Dashboard UI

#### Admin Dashboard
- Total customers count
- Total proposals across all users
- Pending proposals count
- Completed proposals count
- Recent proposals from all users
- Quick action cards for user and proposal management

#### Customer Dashboard
- Personal proposal count
- Personal pending proposals
- Personal completed proposals
- Recent personal proposals
- Quick action cards for viewing proposals and profile

### 👥 Admin Features

#### User Management
- View all users with pagination
- Search users by name or email
- Create new users (admin or customer)
- Edit user details and roles
- Delete users
- View proposal count per user

#### Proposal Management
- View all proposals from all customers
- Filter by status (pending, in_progress, completed, rejected)
- Search by name, email, or company
- Update proposal status
- View detailed proposal information
- Delete proposals
- See customer information for each proposal

### 🎯 Customer Features

#### My Proposals
- View only their own proposals
- Filter by status
- View detailed proposal information
- Download PDF estimates (when available)
- Track proposal timeline
- Access support information

### 🎨 UI/UX Enhancements

- Modern, clean interface with Tailwind CSS
- Color-coded status badges
- Responsive design for mobile and desktop
- Hover effects and smooth transitions
- Empty states with helpful messages
- Loading states and form validation
- Intuitive navigation with role-based menu items

## Database Structure

### Users Table
```
- id
- name
- email
- password
- role (admin/customer) - default: customer
- email_verified_at
- remember_token
- timestamps
```

### Leads Table
```
- id
- user_id (foreign key to users) - nullable
- name
- email
- phone
- company
- project_type
- project_description
- requirements (JSON)
- budget (JSON)
- timeline (JSON)
- metadata (JSON)
- status (pending/in_progress/completed/rejected)
- estimate_pdf_path
- timestamps
```

## Routes

### Public Routes
- `GET /` - Welcome page
- `GET /estimate` - Lead capture form

### Authenticated Routes
- `GET /dashboard` - Role-based dashboard
- `GET /profile` - User profile management

### Admin Routes (Requires admin role)
- `GET /admin/users` - User list
- `GET /admin/users/create` - Create user form
- `POST /admin/users` - Store new user
- `GET /admin/users/{user}/edit` - Edit user form
- `PATCH /admin/users/{user}` - Update user
- `DELETE /admin/users/{user}` - Delete user
- `GET /admin/proposals` - All proposals list
- `GET /admin/proposals/{proposal}` - View proposal
- `PATCH /admin/proposals/{proposal}/status` - Update proposal status
- `DELETE /admin/proposals/{proposal}` - Delete proposal

### Customer Routes (Authenticated users)
- `GET /my/proposals` - Personal proposals list
- `GET /my/proposals/{proposal}` - View own proposal

## Getting Started

### 1. Run Migrations
```bash
php artisan migrate
```

### 2. Seed Database
```bash
php artisan db:seed
```

This creates:
- **Admin User**: admin@example.com / password
- **Customer User**: customer@example.com / password
- **Sample Proposals**: 3 sample proposals for the customer

### 3. Build Frontend Assets
```bash
npm run build
# or for development
npm run dev
```

### 4. Start Development Server
```bash
php artisan serve
```

## Usage

### Admin Access
1. Navigate to `/login`
2. Login with: `admin@example.com` / `password`
3. Access:
   - Dashboard with system-wide statistics
   - Users menu to manage all users
   - All Proposals menu to manage all proposals

### Customer Access
1. Navigate to `/login`
2. Login with: `customer@example.com` / `password`
3. Access:
   - Dashboard with personal statistics
   - My Proposals menu to view own proposals
   - Profile management

### Creating New Admin Users
1. Login as an existing admin
2. Navigate to Users → Add New User
3. Fill in the form and select "Admin" role
4. Submit

### Proposal Status Flow
1. **Pending** - Initial status when created
2. **In Progress** - Being worked on
3. **Completed** - Finished and ready
4. **Rejected** - Not approved

## Components

### Reusable React Components
- `StatsCard` - Dashboard statistics cards
- `Badge` - Status badges with color variants
- `EmptyState` - Empty state displays
- Standard form components (TextInput, InputLabel, etc.)

### Layouts
- `AuthenticatedLayout` - Main app layout with role-based navigation
- `GuestLayout` - Public pages layout

## Security Features

- Role-based middleware (`admin` middleware)
- Customer data isolation (users can only see their own proposals)
- CSRF protection on all forms
- Password hashing
- Email verification support
- Session management

## Customization

### Adding New Roles
1. Update the `role` field validation in User model
2. Add middleware if needed
3. Update navigation in `AuthenticatedLayout.jsx`
4. Create role-specific controllers and views

### Changing Theme Colors
Edit `tailwind.config.js` to customize colors, or update the color classes in components.

### Adding More Stats
Update `DashboardController.php` to add more statistics, then update the Dashboard page to display them.

## Best Practices

1. **Admin users** should manage user roles carefully
2. **Keep passwords secure** - Change default passwords immediately
3. **Regular backups** - Back up the database regularly
4. **Monitor activity** - Track admin actions in production
5. **Update dependencies** - Keep packages up to date

## Troubleshooting

### Issue: Can't access admin pages
**Solution**: Make sure your user has `role = 'admin'` in the database

### Issue: Proposals not showing
**Solution**: Check if `user_id` is properly set on leads

### Issue: Navigation not updating
**Solution**: Clear browser cache and rebuild assets with `npm run build`

### Issue: 403 Forbidden on admin routes
**Solution**: Verify middleware is registered in `bootstrap/app.php`

## Future Enhancements

Potential features to add:
- Activity logs for admin actions
- Email notifications for status changes
- Bulk operations (delete, update status)
- Advanced filtering and sorting
- Data export (CSV, Excel)
- User avatar uploads
- Comments/notes on proposals
- Team collaboration features

## Support

For issues or questions:
- Check the Laravel documentation: https://laravel.com/docs
- Check the Inertia.js documentation: https://inertiajs.com
- Review the code comments in controllers and components

