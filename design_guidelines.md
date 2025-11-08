# Multiplayer Infinite Canvas Design Guidelines

## Design Philosophy

This multiplayer infinite canvas application embraces **minimalist professionalism** with a focus on the collaborative drawing experience. The design prioritizes:

- **Canvas-First Approach**: UI elements should never compete with the canvas content
- **Floating & Contextual UI**: Toolbars and controls appear contextually, keeping the canvas clean
- **Neutral Sophistication**: Professional color palette that doesn't distract from user-created content
- **Instant Clarity**: Users should understand functionality immediately without tutorials
- **Collaborative Awareness**: Visual cues for real-time collaboration (cursors, selections, presence)

---

## GRADIENT RESTRICTION RULE

**NEVER** use dark/saturated gradient combos (e.g., purple/pink, blue-purple) on any UI element.
**NEVER** let gradients cover more than 20% of the viewport.
**NEVER** apply gradients to text-heavy content or reading areas.
**NEVER** use gradients on small UI elements (<100px width).
**NEVER** stack multiple gradient layers in the same viewport.

### ENFORCEMENT RULE
IF gradient area exceeds 20% of viewport OR impacts readability
THEN fallback to solid colors or simple, two-color gradients.

### ALLOWED GRADIENT USAGE
- Subtle background accents (optional, minimal use)
- Loading states or progress indicators
- Decorative elements only (not functional UI)

---

## Color System

### Primary Palette (Neutral Professional)

```css
:root {
  /* Canvas & Backgrounds */
  --canvas-bg: #FAFAFA;              /* Soft off-white canvas */
  --ui-bg: #FFFFFF;                  /* Pure white for UI panels */
  --ui-bg-secondary: #F5F5F5;        /* Secondary UI backgrounds */
  
  /* Slate Gray System */
  --slate-900: #1E293B;              /* Primary text, icons */
  --slate-700: #334155;              /* Secondary text */
  --slate-500: #64748B;              /* Tertiary text, disabled states */
  --slate-300: #CBD5E1;              /* Borders, dividers */
  --slate-200: #E2E8F0;              /* Hover states, subtle backgrounds */
  --slate-100: #F1F5F9;              /* Very subtle backgrounds */
  
  /* Accent Blue (Minimal Use) */
  --accent-blue-600: #2563EB;        /* Primary actions, selections */
  --accent-blue-500: #3B82F6;        /* Hover states */
  --accent-blue-100: #DBEAFE;        /* Selection backgrounds */
  --accent-blue-50: #EFF6FF;         /* Very subtle highlights */
  
  /* Functional Colors */
  --success: #10B981;                /* Success states */
  --warning: #F59E0B;                /* Warning states */
  --error: #EF4444;                  /* Error states, destructive actions */
  
  /* Shadows & Overlays */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-floating: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  --overlay-light: rgba(0, 0, 0, 0.05);
  --overlay-medium: rgba(0, 0, 0, 0.15);
  --overlay-dark: rgba(0, 0, 0, 0.4);
}
```

### Color Usage Guidelines

**Canvas Area:**
- Background: `--canvas-bg` (#FAFAFA) - soft off-white that reduces eye strain
- Grid (if used): `--slate-200` with 0.3 opacity for subtle guidance

**UI Panels & Toolbars:**
- Background: `--ui-bg` (#FFFFFF) with `--shadow-floating` for depth
- Borders: `--slate-300` for clear separation
- Hover states: `--slate-100` background

**Text Hierarchy:**
- Primary text: `--slate-900` (high contrast)
- Secondary text: `--slate-700` (labels, descriptions)
- Tertiary text: `--slate-500` (hints, metadata)
- Disabled text: `--slate-500` with 0.5 opacity

**Interactive Elements:**
- Primary actions: `--accent-blue-600` background, white text
- Secondary actions: `--slate-200` background, `--slate-900` text
- Hover: Darken by 10% or use next shade
- Active/Selected: `--accent-blue-600` with `--accent-blue-100` background
- Focus ring: `--accent-blue-500` with 2px offset

**Collaborative Elements:**
- User cursors: Assign from a predefined set of vibrant colors (not from main palette)
- Selections: Semi-transparent overlays using user's assigned color
- Presence indicators: Small colored dots using user's assigned color

---

## Typography System

### Font Families

```css
:root {
  /* Primary Font: Inter - Clean, modern, excellent readability */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Monospace: For technical info, coordinates, dimensions */
  --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}
```

**Google Fonts Import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale & Hierarchy

```css
/* Headings (Rare in canvas apps) */
.text-h1 {
  font-size: 1.5rem;      /* 24px */
  line-height: 2rem;      /* 32px */
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--slate-900);
}

.text-h2 {
  font-size: 1.25rem;     /* 20px */
  line-height: 1.75rem;   /* 28px */
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--slate-900);
}

/* Body Text */
.text-base {
  font-size: 0.875rem;    /* 14px - Primary UI text size */
  line-height: 1.25rem;   /* 20px */
  font-weight: 400;
  color: var(--slate-700);
}

.text-sm {
  font-size: 0.8125rem;   /* 13px - Secondary labels */
  line-height: 1.125rem;  /* 18px */
  font-weight: 400;
  color: var(--slate-700);
}

.text-xs {
  font-size: 0.75rem;     /* 12px - Hints, metadata */
  line-height: 1rem;      /* 16px */
  font-weight: 400;
  color: var(--slate-500);
}

/* Special Text Styles */
.text-label {
  font-size: 0.75rem;     /* 12px */
  line-height: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--slate-500);
}

.text-mono {
  font-family: var(--font-mono);
  font-size: 0.8125rem;   /* 13px */
  line-height: 1.125rem;
  color: var(--slate-700);
}
```

### Typography Usage

- **Toolbar Labels**: `.text-xs` with medium weight (500)
- **Button Text**: `.text-sm` with medium weight (500)
- **Input Fields**: `.text-base` with regular weight (400)
- **Tooltips**: `.text-xs` with regular weight (400)
- **Status Messages**: `.text-sm` with regular weight (400)
- **Coordinates/Dimensions**: `.text-mono` for technical precision

---

## Layout & Spacing System

### Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

### Application Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Top Toolbar (Floating, Optional)                       │
│  [Logo] [Tools] [Zoom] [Share] [User Avatar]           │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│                  INFINITE CANVAS                        │
│                  (tldraw component)                     │
│                                                         │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
┌──────────┐
│ Floating │  ← Left Toolbar (Floating)
│ Toolbar  │     [Select] [Draw] [Shape] [Text] [Eraser]
│          │
└──────────┘
```

### Layout Principles

1. **Canvas-First**: The tldraw canvas should occupy 100% of viewport
2. **Floating UI**: All toolbars float above canvas with subtle shadows
3. **Minimal Chrome**: No persistent sidebars or panels
4. **Responsive Positioning**: Toolbars adapt to screen size
5. **Collapsible**: UI elements can be hidden for full canvas focus

### Toolbar Specifications

**Top Toolbar:**
- Position: Fixed top, centered or full-width
- Height: 56px (--space-14)
- Padding: --space-3 horizontal, --space-2 vertical
- Background: var(--ui-bg) with var(--shadow-md)
- Border-radius: 12px (if centered/floating)
- Gap between items: --space-4

**Left Toolbar (Tool Palette):**
- Position: Fixed left, vertically centered
- Width: 56px
- Padding: --space-2
- Background: var(--ui-bg) with var(--shadow-floating)
- Border-radius: 12px
- Gap between tools: --space-2
- Margin from edge: --space-4

**Spacing Guidelines:**
- Icon buttons: 40x40px with --space-2 padding
- Button groups: --space-1 gap between related buttons
- Sections: --space-4 gap between unrelated groups
- Panel padding: --space-4 to --space-6
- Modal padding: --space-6 to --space-8

---

## Component Specifications

### Buttons

**Primary Button (Main Actions):**
```jsx
<button 
  data-testid="primary-action-button"
  className="
    px-4 py-2 
    bg-[var(--accent-blue-600)] 
    text-white 
    text-sm font-medium 
    rounded-lg 
    shadow-sm
    hover:bg-[var(--accent-blue-500)]
    active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue-500)] focus:ring-offset-2
    transition-colors duration-150
    disabled:opacity-50 disabled:cursor-not-allowed
  "
>
  Share Canvas
</button>
```

**Secondary Button (Less Emphasis):**
```jsx
<button 
  data-testid="secondary-action-button"
  className="
    px-4 py-2 
    bg-[var(--slate-200)] 
    text-[var(--slate-900)] 
    text-sm font-medium 
    rounded-lg
    hover:bg-[var(--slate-300)]
    active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-[var(--slate-400)] focus:ring-offset-2
    transition-colors duration-150
  "
>
  Export
</button>
```

**Icon Button (Toolbar Tools):**
```jsx
<button 
  data-testid="tool-select-button"
  className="
    w-10 h-10 
    flex items-center justify-center
    text-[var(--slate-700)]
    rounded-lg
    hover:bg-[var(--slate-100)]
    active:bg-[var(--slate-200)]
    focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue-500)]
    transition-colors duration-150
    data-[active=true]:bg-[var(--accent-blue-100)]
    data-[active=true]:text-[var(--accent-blue-600)]
  "
  data-active={isActive}
>
  <svg className="w-5 h-5" />
</button>
```

**Ghost Button (Minimal):**
```jsx
<button 
  data-testid="ghost-action-button"
  className="
    px-3 py-1.5 
    text-[var(--slate-700)] 
    text-sm font-medium 
    rounded-md
    hover:bg-[var(--slate-100)]
    active:bg-[var(--slate-200)]
    focus:outline-none focus:ring-2 focus:ring-[var(--slate-400)]
    transition-colors duration-150
  "
>
  Cancel
</button>
```

### Input Fields

**Text Input:**
```jsx
<input 
  data-testid="canvas-name-input"
  type="text"
  className="
    w-full px-3 py-2
    bg-white
    border border-[var(--slate-300)]
    text-[var(--slate-900)] text-base
    rounded-lg
    placeholder:text-[var(--slate-500)]
    focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue-500)] focus:border-transparent
    transition-shadow duration-150
    disabled:bg-[var(--slate-100)] disabled:cursor-not-allowed
  "
  placeholder="Enter canvas name..."
/>
```

### Tooltips

Use shadcn Tooltip component from `/app/frontend/src/components/ui/tooltip.jsx`

```jsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';

<TooltipProvider delayDuration={300}>
  <Tooltip>
    <TooltipTrigger asChild>
      <button data-testid="tool-button">
        <PencilIcon />
      </button>
    </TooltipTrigger>
    <TooltipContent 
      side="right" 
      className="
        bg-[var(--slate-900)] 
        text-white 
        text-xs 
        px-2 py-1 
        rounded-md
        shadow-lg
      "
    >
      <p>Draw (D)</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Dropdown Menu

Use shadcn DropdownMenu from `/app/frontend/src/components/ui/dropdown-menu.jsx`

```jsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button data-testid="export-menu-trigger">Export</button>
  </DropdownMenuTrigger>
  <DropdownMenuContent 
    className="
      bg-white 
      border border-[var(--slate-300)] 
      rounded-lg 
      shadow-lg 
      p-1
      min-w-[160px]
    "
  >
    <DropdownMenuItem 
      data-testid="export-png-option"
      className="
        px-3 py-2 
        text-sm text-[var(--slate-900)]
        rounded-md
        hover:bg-[var(--slate-100)]
        cursor-pointer
      "
    >
      Export as PNG
    </DropdownMenuItem>
    <DropdownMenuItem 
      data-testid="export-svg-option"
      className="
        px-3 py-2 
        text-sm text-[var(--slate-900)]
        rounded-md
        hover:bg-[var(--slate-100)]
        cursor-pointer
      "
    >
      Export as SVG
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Avatar (User Presence)

Use shadcn Avatar from `/app/frontend/src/components/ui/avatar.jsx`

```jsx
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';

<Avatar 
  className="
    w-8 h-8 
    border-2 border-white 
    shadow-sm
    ring-2 ring-[var(--accent-blue-600)]
  "
  data-testid="user-avatar"
>
  <AvatarImage src={user.avatar} alt={user.name} />
  <AvatarFallback 
    className="
      bg-[var(--accent-blue-600)] 
      text-white 
      text-xs 
      font-medium
    "
  >
    {user.initials}
  </AvatarFallback>
</Avatar>
```

### Badge (Status Indicators)

Use shadcn Badge from `/app/frontend/src/components/ui/badge.jsx`

```jsx
import { Badge } from './components/ui/badge';

<Badge 
  data-testid="online-status-badge"
  className="
    bg-[var(--success)] 
    text-white 
    text-xs 
    px-2 py-0.5 
    rounded-full
    font-medium
  "
>
  Online
</Badge>
```

### Dialog/Modal

Use shadcn Dialog from `/app/frontend/src/components/ui/dialog.jsx`

```jsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <button data-testid="share-dialog-trigger">Share</button>
  </DialogTrigger>
  <DialogContent 
    className="
      bg-white 
      rounded-xl 
      shadow-2xl 
      p-6 
      max-w-md
    "
    data-testid="share-dialog"
  >
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-[var(--slate-900)]">
        Share Canvas
      </DialogTitle>
      <DialogDescription className="text-sm text-[var(--slate-700)] mt-2">
        Anyone with the link can view and edit this canvas
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

### Toast Notifications

Use Sonner from `/app/frontend/src/components/ui/sonner.jsx`

```jsx
import { toast } from 'sonner';

// Success toast
toast.success('Canvas saved successfully', {
  description: 'All changes have been synced',
  duration: 3000,
});

// Error toast
toast.error('Failed to save canvas', {
  description: 'Please check your connection and try again',
  duration: 5000,
});

// Info toast
toast.info('User joined the canvas', {
  description: 'John Doe is now collaborating',
  duration: 3000,
});
```

**Toaster Setup in App:**
```jsx
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--ui-bg)',
            color: 'var(--slate-900)',
            border: '1px solid var(--slate-300)',
          },
        }}
      />
      {/* Rest of app */}
    </>
  );
}
```

### Separator

Use shadcn Separator from `/app/frontend/src/components/ui/separator.jsx`

```jsx
import { Separator } from './components/ui/separator';

<Separator 
  className="bg-[var(--slate-300)]" 
  orientation="vertical" 
/>
```

---

## Micro-Interactions & Motion

### Animation Principles

1. **Subtle & Fast**: Animations should be quick (150-250ms) and subtle
2. **Purpose-Driven**: Every animation should communicate state or provide feedback
3. **Performance**: Use CSS transforms and opacity for smooth 60fps animations
4. **Reduced Motion**: Respect `prefers-reduced-motion` media query

### Standard Transitions

```css
/* Button Interactions */
.btn-transition {
  transition: background-color 150ms ease, transform 100ms ease, box-shadow 150ms ease;
}

.btn-transition:hover {
  transform: translateY(-1px);
}

.btn-transition:active {
  transform: scale(0.98);
}

/* Toolbar Appearance */
.toolbar-enter {
  animation: slideIn 200ms ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tooltip Appearance */
.tooltip-enter {
  animation: fadeIn 150ms ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Modal/Dialog */
.modal-overlay {
  animation: overlayFadeIn 200ms ease-out;
}

.modal-content {
  animation: modalSlideIn 250ms ease-out;
}

@keyframes overlayFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Loading Spinner */
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Pulse for presence indicators */
.presence-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

### Hover States

- **Buttons**: Background color change + subtle lift (translateY(-1px))
- **Icon Buttons**: Background color change only
- **Toolbar Items**: Background color change + scale(1.02)
- **Links**: Color change + underline
- **Cards**: Shadow increase + subtle lift

### Focus States

- **All Interactive Elements**: 2px ring with `--accent-blue-500` color, 2px offset
- **Keyboard Navigation**: Clear focus indicators always visible
- **Skip Links**: For accessibility, hidden until focused

### Loading States

- **Button Loading**: Spinner icon + disabled state + "Loading..." text
- **Canvas Loading**: Centered spinner with "Loading canvas..." message
- **Skeleton Screens**: Use shadcn Skeleton component for loading placeholders

```jsx
import { Skeleton } from './components/ui/skeleton';

<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>
```

---

## Collaborative Features Design

### User Cursors

**Cursor Design:**
- Custom SVG cursor with user's assigned color
- User name label appears on hover or when active
- Smooth interpolation for cursor movement (use CSS transitions)
- Cursor should be visible above all canvas elements

**Cursor Colors (Predefined Set):**
```javascript
const cursorColors = [
  '#EF4444', // Red
  '#F59E0B', // Amber
  '#10B981', // Green
  '#3B82F6', // Blue
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
];
```

**Cursor Component:**
```jsx
<div 
  data-testid={`user-cursor-${userId}`}
  className="absolute pointer-events-none z-50 transition-all duration-100"
  style={{
    left: `${x}px`,
    top: `${y}px`,
  }}
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M5.65376 12.3673L13.1844 4.83666C13.5263 4.49474 14.0789 4.49474 14.4208 4.83666L19.3544 9.77023C19.6963 10.1121 19.6963 10.6648 19.3544 11.0067L11.8237 18.5373C11.4818 18.8792 10.9292 18.8792 10.5872 18.5373L5.65376 13.6037C5.31184 13.2618 5.31184 12.7092 5.65376 12.3673Z"
      fill={userColor}
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
  <div 
    className="
      absolute top-6 left-6 
      bg-[var(--slate-900)] 
      text-white 
      text-xs 
      px-2 py-1 
      rounded-md 
      whitespace-nowrap
      shadow-md
    "
    style={{ backgroundColor: userColor }}
  >
    {userName}
  </div>
</div>
```

### Selection Indicators

When a user selects an object:
- Outline with user's color (2px solid)
- Semi-transparent fill overlay (user color at 10% opacity)
- User name badge in top-right corner of selection

### Presence Indicators

**Active Users List:**
```jsx
<div 
  data-testid="active-users-list"
  className="flex items-center gap-1"
>
  {users.map(user => (
    <Avatar 
      key={user.id}
      data-testid={`user-avatar-${user.id}`}
      className="w-8 h-8 border-2 border-white shadow-sm"
      style={{ borderColor: user.color }}
    >
      <AvatarFallback style={{ backgroundColor: user.color }}>
        {user.initials}
      </AvatarFallback>
    </Avatar>
  ))}
  {users.length > 5 && (
    <div 
      className="
        w-8 h-8 
        flex items-center justify-center 
        bg-[var(--slate-200)] 
        text-[var(--slate-700)] 
        text-xs 
        font-medium 
        rounded-full
      "
    >
      +{users.length - 5}
    </div>
  )}
</div>
```

### Real-Time Feedback

- **User Joined**: Toast notification with user name and avatar
- **User Left**: Subtle toast notification
- **Connection Lost**: Warning banner at top of canvas
- **Reconnecting**: Loading indicator with "Reconnecting..." message
- **Changes Saved**: Subtle checkmark animation in toolbar

---

## Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
:root {
  --breakpoint-sm: 640px;   /* Small devices */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Laptops */
  --breakpoint-xl: 1280px;  /* Desktops */
  --breakpoint-2xl: 1536px; /* Large desktops */
}
```

### Mobile Adaptations (< 768px)

**Layout Changes:**
- Top toolbar becomes bottom toolbar (easier thumb access)
- Tool palette collapses into a drawer/sheet
- Zoom controls become floating action button
- User presence list shows only count, expands on tap

**Touch Interactions:**
- Increase button sizes to minimum 44x44px
- Add more spacing between interactive elements (--space-4 minimum)
- Use Sheet component for mobile menus instead of dropdowns

**Mobile Toolbar:**
```jsx
<div 
  data-testid="mobile-toolbar"
  className="
    fixed bottom-0 left-0 right-0 
    bg-white 
    border-t border-[var(--slate-300)] 
    shadow-lg 
    p-2
    flex items-center justify-around
    md:hidden
  "
>
  <button className="w-12 h-12">Select</button>
  <button className="w-12 h-12">Draw</button>
  <button className="w-12 h-12">Shape</button>
  <button className="w-12 h-12">More</button>
</div>
```

### Tablet (768px - 1024px)

- Hybrid approach: floating toolbars with more compact spacing
- Tool palette remains visible but slightly smaller
- Two-column layouts for dialogs/modals

### Desktop (> 1024px)

- Full floating toolbar experience
- Keyboard shortcuts prominently displayed in tooltips
- More generous spacing and larger click targets

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Text on white background: Minimum 4.5:1 ratio (use --slate-700 or darker)
- Large text (18px+): Minimum 3:1 ratio
- UI components: Minimum 3:1 ratio against background
- Test all color combinations with contrast checker

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Logical tab order (left to right, top to bottom)
- Visible focus indicators (2px ring, high contrast)
- Keyboard shortcuts for common actions:
  - `V` or `1`: Select tool
  - `D` or `2`: Draw tool
  - `S` or `3`: Shape tool
  - `T` or `4`: Text tool
  - `E` or `5`: Eraser tool
  - `Cmd/Ctrl + Z`: Undo
  - `Cmd/Ctrl + Shift + Z`: Redo
  - `Cmd/Ctrl + S`: Save (if applicable)
  - `Space + Drag`: Pan canvas
  - `+/-`: Zoom in/out

**Screen Reader Support:**
- Semantic HTML elements (button, nav, main, etc.)
- ARIA labels for icon-only buttons
- ARIA live regions for real-time updates (user joined, etc.)
- Alt text for all images and icons
- Descriptive link text (avoid "click here")

**Example Accessible Button:**
```jsx
<button
  data-testid="select-tool-button"
  aria-label="Select tool (V)"
  aria-pressed={isActive}
  className="..."
>
  <SelectIcon aria-hidden="true" />
</button>
```

**Focus Management:**
- Trap focus in modals/dialogs
- Return focus to trigger element when closing modals
- Skip links for keyboard users to bypass navigation

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Icons

### Icon Library

**Use Lucide React** (already installed in package.json)

```bash
npm install lucide-react
```

**Common Icons:**
```jsx
import {
  MousePointer2,    // Select tool
  Pencil,           // Draw tool
  Square,           // Shape tool
  Type,             // Text tool
  Eraser,           // Eraser tool
  ZoomIn,           // Zoom in
  ZoomOut,          // Zoom out
  Download,         // Export
  Share2,           // Share
  Users,            // Collaborators
  Settings,         // Settings
  MoreVertical,     // More options
  X,                // Close
  Check,            // Confirm
  ChevronDown,      // Dropdown
  Undo2,            // Undo
  Redo2,            // Redo
} from 'lucide-react';
```

**Icon Sizing:**
- Small: 16px (w-4 h-4)
- Medium: 20px (w-5 h-5) - Default for toolbar
- Large: 24px (w-6 h-6)

**Icon Usage:**
```jsx
<Pencil 
  className="w-5 h-5 text-[var(--slate-700)]" 
  strokeWidth={2}
  aria-hidden="true"
/>
```

---

## Image Assets

### Hero/Marketing Images (Optional)

If you need to add a landing page or marketing section:

**Collaboration/Workspace Images:**
1. `https://images.unsplash.com/photo-1560821630-1a7c45c3286e` - Minimal workspace with team
2. `https://images.unsplash.com/photo-1416339442236-8ceb164046f8` - Clean desk setup
3. `https://images.unsplash.com/photo-1536158614364-49b81421db1b` - Designer at work

**Usage:**
- Hero section backgrounds (with overlay for text readability)
- About/features section illustrations
- Testimonial section backgrounds

**Image Treatment:**
- Apply subtle grayscale filter (10-20%) for consistency
- Use overlay: `rgba(0, 0, 0, 0.4)` for text readability
- Lazy load images for performance

---

## Component Paths Reference

### Shadcn UI Components (Available)

Located in `/app/frontend/src/components/ui/`:

**Layout & Structure:**
- `separator.jsx` - Dividers between sections
- `scroll-area.jsx` - Custom scrollbars
- `resizable.jsx` - Resizable panels (if needed)

**Navigation:**
- `dropdown-menu.jsx` - Dropdown menus for actions
- `menubar.jsx` - Menu bar (if needed)
- `navigation-menu.jsx` - Navigation menus
- `breadcrumb.jsx` - Breadcrumb navigation

**Overlays:**
- `dialog.jsx` - Modals/dialogs
- `sheet.jsx` - Side sheets (mobile menus)
- `drawer.jsx` - Bottom drawers (mobile)
- `popover.jsx` - Popovers for contextual info
- `hover-card.jsx` - Hover cards for previews
- `tooltip.jsx` - Tooltips for hints
- `context-menu.jsx` - Right-click context menus

**Forms:**
- `input.jsx` - Text inputs
- `textarea.jsx` - Multi-line text
- `button.jsx` - Buttons
- `checkbox.jsx` - Checkboxes
- `radio-group.jsx` - Radio buttons
- `select.jsx` - Select dropdowns
- `switch.jsx` - Toggle switches
- `slider.jsx` - Range sliders
- `form.jsx` - Form wrapper with validation
- `label.jsx` - Form labels

**Feedback:**
- `toast.jsx` & `toaster.jsx` - Toast notifications (use Sonner instead)
- `sonner.jsx` - Modern toast notifications (PREFERRED)
- `alert.jsx` - Alert messages
- `alert-dialog.jsx` - Confirmation dialogs
- `progress.jsx` - Progress bars
- `skeleton.jsx` - Loading skeletons

**Data Display:**
- `card.jsx` - Card containers
- `badge.jsx` - Status badges
- `avatar.jsx` - User avatars
- `table.jsx` - Data tables
- `tabs.jsx` - Tab navigation
- `accordion.jsx` - Collapsible sections
- `collapsible.jsx` - Collapsible content

**Other:**
- `calendar.jsx` - Date picker (if needed)
- `carousel.jsx` - Image carousels
- `pagination.jsx` - Pagination controls
- `toggle.jsx` & `toggle-group.jsx` - Toggle buttons
- `command.jsx` - Command palette (Cmd+K)
- `aspect-ratio.jsx` - Aspect ratio containers

---

## Additional Libraries & Installation

### Required Libraries

**1. tldraw (Core Canvas Library)**
```bash
npm install tldraw
```

**Usage:**
```jsx
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

function Canvas() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw />
    </div>
  );
}
```

**2. Lucide React (Icons)**
```bash
npm install lucide-react
```

**3. Sonner (Toast Notifications)**
Already available in shadcn components.

### Optional Libraries

**1. Framer Motion (Advanced Animations)**
```bash
npm install framer-motion
```

**Usage for smooth cursor animations:**
```jsx
import { motion } from 'framer-motion';

<motion.div
  animate={{ x, y }}
  transition={{ type: 'spring', damping: 30, stiffness: 200 }}
>
  {/* Cursor */}
</motion.div>
```

**2. React Use (Utility Hooks)**
```bash
npm install react-use
```

**Useful hooks:**
- `useWindowSize` - Responsive layout adjustments
- `useDebounce` - Debounce user input
- `useLocalStorage` - Persist user preferences

---

## Instructions to Main Agent

### Implementation Priority

**Phase 1: Core Setup**
1. Install tldraw and lucide-react
2. Set up color system in index.css (CSS variables)
3. Import Inter font from Google Fonts
4. Create basic layout with tldraw canvas

**Phase 2: UI Components**
1. Create top toolbar with logo, zoom controls, share button
2. Create floating left toolbar with tool buttons
3. Implement user presence indicators (avatars)
4. Add tooltips to all toolbar buttons

**Phase 3: Collaborative Features**
1. Implement WebSocket connection for real-time sync
2. Add user cursor rendering with colors
3. Add user join/leave notifications (toast)
4. Implement selection indicators

**Phase 4: Polish**
1. Add all micro-interactions and hover states
2. Implement responsive design for mobile
3. Add keyboard shortcuts
4. Test accessibility features

### Key Implementation Notes

**Canvas Integration:**
- tldraw provides the entire canvas functionality
- Wrap tldraw component in a container that fills the viewport
- Overlay custom UI elements (toolbars) on top of tldraw
- Use tldraw's API for tool selection, zoom, export, etc.

**Real-Time Sync:**
- Use FastAPI WebSocket endpoint for real-time communication
- Send cursor positions, selections, and drawing data
- Implement conflict-free replicated data types (CRDTs) or operational transforms
- Handle connection loss gracefully with reconnection logic

**State Management:**
- Use React Context or Zustand for global state (user info, connection status)
- Keep tldraw state separate (managed by tldraw library)
- Sync only necessary data over WebSocket (not entire canvas state)

**Performance:**
- Throttle cursor position updates (60fps max)
- Debounce text input and other frequent updates
- Use React.memo for components that don't need frequent re-renders
- Lazy load modals and dialogs

**Testing:**
- All interactive elements have `data-testid` attributes
- Test keyboard navigation thoroughly
- Test with screen readers
- Test on mobile devices (touch interactions)

### File Structure Recommendation

```
/app/frontend/src/
├── components/
│   ├── ui/                    # Shadcn components (already exists)
│   ├── Canvas/
│   │   ├── Canvas.jsx         # Main tldraw wrapper
│   │   ├── Toolbar.jsx        # Top toolbar
│   │   ├── ToolPalette.jsx    # Left floating toolbar
│   │   └── UserCursor.jsx     # Collaborative cursor
│   ├── Collaboration/
│   │   ├── UserPresence.jsx   # Active users list
│   │   ├── ConnectionStatus.jsx
│   │   └── ShareDialog.jsx
│   └── Layout/
│       └── AppLayout.jsx      # Main layout wrapper
├── hooks/
│   ├── useWebSocket.js        # WebSocket connection
│   ├── useCollaboration.js    # Collaborative features
│   └── useCanvas.js           # Canvas state management
├── utils/
│   ├── colors.js              # User color assignment
│   └── cursors.js             # Cursor utilities
├── App.js
├── App.css
└── index.css                  # Global styles with CSS variables
```

### CSS Variables Setup

Add to `/app/frontend/src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Canvas & Backgrounds */
    --canvas-bg: #FAFAFA;
    --ui-bg: #FFFFFF;
    --ui-bg-secondary: #F5F5F5;
    
    /* Slate Gray System */
    --slate-900: #1E293B;
    --slate-700: #334155;
    --slate-500: #64748B;
    --slate-300: #CBD5E1;
    --slate-200: #E2E8F0;
    --slate-100: #F1F5F9;
    
    /* Accent Blue */
    --accent-blue-600: #2563EB;
    --accent-blue-500: #3B82F6;
    --accent-blue-100: #DBEAFE;
    --accent-blue-50: #EFF6FF;
    
    /* Functional Colors */
    --success: #10B981;
    --warning: #F59E0B;
    --error: #EF4444;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-floating: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    
    /* Spacing */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;
  }
  
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-[var(--canvas-bg)] text-[var(--slate-900)];
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

### Common Mistakes to Avoid

**Don't:**
- ❌ Use dark gradients (purple/pink) anywhere
- ❌ Center-align all text (disrupts reading flow)
- ❌ Use emoji icons (use Lucide React instead)
- ❌ Apply `transition: all` (breaks transforms)
- ❌ Forget `data-testid` attributes on interactive elements
- ❌ Use fixed positioning for canvas (use absolute or relative)
- ❌ Overcomplicate the UI (keep it minimal)
- ❌ Ignore mobile responsiveness
- ❌ Skip accessibility features

**Do:**
- ✅ Keep UI minimal and floating
- ✅ Use neutral color palette (slate grays + blue accent)
- ✅ Add tooltips with keyboard shortcuts
- ✅ Implement smooth micro-interactions
- ✅ Test on mobile devices
- ✅ Ensure keyboard navigation works
- ✅ Add proper focus states
- ✅ Use semantic HTML
- ✅ Implement real-time collaboration features
- ✅ Handle connection loss gracefully

---

## Design Checklist

Before considering the design complete, verify:

- [ ] Color system implemented with CSS variables
- [ ] Inter font loaded from Google Fonts
- [ ] All interactive elements have hover states
- [ ] All interactive elements have focus states
- [ ] All buttons have `data-testid` attributes
- [ ] Tooltips added to all toolbar buttons
- [ ] Mobile responsive design implemented
- [ ] Keyboard shortcuts work
- [ ] Screen reader labels added
- [ ] Color contrast meets WCAG AA standards
- [ ] Reduced motion preferences respected
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Toast notifications work
- [ ] User presence indicators visible
- [ ] Collaborative cursors render correctly
- [ ] Connection status visible
- [ ] Canvas fills entire viewport
- [ ] UI elements float above canvas
- [ ] No dark gradients used
- [ ] No emoji icons used

---

## Summary

This design system creates a **minimal, professional, collaborative canvas application** that:

1. **Prioritizes the canvas** - All UI is floating and non-intrusive
2. **Uses neutral colors** - Slate grays with blue accents for a professional look
3. **Emphasizes collaboration** - Clear visual indicators for multiple users
4. **Maintains accessibility** - WCAG AA compliant with keyboard navigation
5. **Performs smoothly** - Optimized animations and real-time updates
6. **Adapts to devices** - Responsive design for mobile, tablet, and desktop

The design is inspired by modern collaborative tools like Figma, Miro, and Excalidraw, but maintains its own minimal identity focused on the infinite canvas experience.

---

**Design Guidelines Version:** 1.0  
**Last Updated:** 2024  
**File Location:** `/app/design_guidelines.md`
