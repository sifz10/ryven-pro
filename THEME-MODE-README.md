# Dark/Light Mode Implementation

## Overview

The dashboard now features a complete dark/light mode theming system using your brand colors (#4FFA69 bright green) and logo.

## Features Implemented

### 🎨 Theme System
- **Context-based theme management** - Uses React Context API for global state
- **Local storage persistence** - Theme preference is saved and restored
- **System preference detection** - Automatically detects OS dark mode preference
- **Smooth transitions** - All color changes are animated
- **Brand color integration** - #4FFA69 (Ryven green) used as accent throughout

### 🌓 Theme Toggle Component
- Animated sun/moon icons
- Accessible button with proper ARIA labels
- Positioned in both desktop and mobile navigation
- Smooth rotation animation on toggle

### 🎨 Updated Components with Dark Mode

#### Navigation
- **Logo**: Uses Ryven logo from `/logo/logo.png`
- **Navigation links**: Active state uses brand green
- **Hover states**: Smooth transition to brand green
- **Backdrop blur effect**: Modern glassmorphism design

#### Dashboard
- **Stats cards**: Border animations on hover with brand color
- **Badges**: Different colors for different statuses
- **Recent proposals**: Card hover effects with brand accent
- **Quick action cards**: Group hover animations
- **All text colors**: Properly adapted for both themes

#### Components Updated
- `StatsCard` - Dark mode compatible with brand colors
- `Badge` - Color-coded status badges
- `EmptyState` - Themed backgrounds
- `NavLink` - Active/hover states with brand green
- `ResponsiveNavLink` - Mobile-optimized theme support
- `ThemeToggle` - New animated toggle button

### 🎯 Color Scheme

#### Light Mode
- Background: White (#FFFFFF)
- Text: Dark gray (#0A0A0A)
- Border: Light gray (#E5E5E5)
- Accent: Brand green (#4FFA69)

#### Dark Mode
- Background: Near black (#0A0A0A)
- Text: Near white (#FAFAFA)
- Border: Dark gray (#262626)
- Accent: Brand green (#4FFA69)

### 📱 Responsive Design
- Theme toggle available on both desktop and mobile
- Proper spacing and positioning across all screen sizes
- Touch-friendly toggle button on mobile

## Usage

### For Users

1. **Toggle Theme**:
   - Click the sun/moon icon in the top navigation bar
   - Theme preference is automatically saved

2. **Theme Persistence**:
   - Your theme choice is remembered across sessions
   - Stored in browser's local storage

3. **Default Behavior**:
   - First-time visitors see their OS preference
   - Falls back to light mode if no preference detected

### For Developers

#### Theme Context
```javascript
import { useTheme } from '@/Contexts/ThemeContext';

function MyComponent() {
    const { theme, toggleTheme } = useTheme();
    // theme is 'light' or 'dark'
    // toggleTheme() switches between themes
}
```

#### Adding Theme Support to Components
Use Tailwind's semantic color classes:
```javascript
// Good (automatic dark mode)
<div className="bg-background text-foreground">

// Instead of
<div className="bg-white text-gray-900">
```

#### Semantic Color Classes
- `bg-background` - Page background
- `bg-card` - Card backgrounds
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `border-border` - Borders
- `bg-accent` - Hover backgrounds
- `text-[#4FFA69]` - Brand accent color

## Files Modified/Created

### New Files
- `resources/js/Contexts/ThemeContext.jsx` - Theme state management
- `resources/js/Components/ThemeToggle.jsx` - Toggle button component
- `THEME-MODE-README.md` - This documentation

### Modified Files
- `resources/js/app.jsx` - Added ThemeProvider wrapper
- `resources/js/Layouts/AuthenticatedLayout.jsx` - Logo, theme toggle, semantic colors
- `resources/js/Components/NavLink.jsx` - Brand color and dark mode support
- `resources/js/Components/ResponsiveNavLink.jsx` - Brand color and dark mode support
- `resources/js/Components/StatsCard.jsx` - Dark mode with brand colors
- `resources/js/Components/Badge.jsx` - Status-specific dark mode colors
- `resources/js/Components/EmptyState.jsx` - Semantic color classes
- `resources/js/Pages/Dashboard.jsx` - Complete dark mode support

### Existing Theme Configuration
- `resources/css/app.css` - Already had dark mode CSS variables
- `tailwind.config.js` - Already configured with `darkMode: ['class']`

## Customization

### Changing Brand Color
Replace `#4FFA69` with your new brand color in:
1. Update `text-[#4FFA69]` and `bg-[#4FFA69]` throughout components
2. Modify `resources/js/app.jsx` progress color
3. Update Tailwind config if needed

### Adding More Themes
Extend the `ThemeContext` to support more than 2 themes:
```javascript
const themes = ['light', 'dark', 'blue', 'purple'];
```

### Custom Color Schemes
Modify CSS variables in `resources/css/app.css`:
```css
.dark {
  --background: YOUR_COLOR;
  --foreground: YOUR_COLOR;
  // ... etc
}
```

## Browser Support
- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance
- **No flash of unstyled content (FOUC)** - Theme loads before render
- **Optimized re-renders** - Context prevents unnecessary updates
- **Local storage caching** - Instant theme restoration

## Accessibility
- **ARIA labels** on theme toggle button
- **Keyboard navigation** fully supported
- **High contrast** in both modes
- **Reduced motion** respects system preferences

## Testing Theme

### Manual Testing
1. Login to dashboard
2. Click theme toggle in navigation
3. Refresh page - theme should persist
4. Test all pages (Dashboard, Users, Proposals)
5. Test mobile responsive menu
6. Check hover states on cards

### Browser DevTools
1. Open DevTools
2. Toggle theme
3. Inspect `<html>` element - should have `class="dark"` or `class="light"`
4. Check localStorage - should have `theme` key

## Troubleshooting

### Theme not persisting
- Check browser localStorage
- Ensure JavaScript is enabled
- Clear browser cache

### Colors not updating
- Rebuild assets: `npm run build`
- Hard refresh browser (Ctrl+Shift+R)
- Check if Tailwind classes are correct

### Flash of wrong theme
- ThemeProvider is wrapping the entire app
- Local storage is checked before first render

## Future Enhancements

Potential additions:
- Auto-switch based on time of day
- Multiple theme presets
- Custom color picker
- Theme animation effects
- Per-page theme overrides

