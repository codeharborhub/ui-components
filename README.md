# UI Components Library

A modern, accessible React component library built with TypeScript, Tailwind CSS, and best practices for production use.

## Features

- 🎨 **Modern Design System** - Consistent colors, typography, and spacing
- ♿ **Accessibility First** - WCAG compliant with ARIA attributes and keyboard navigation
- 📱 **Responsive Design** - Mobile-first approach with proper breakpoints
- 🎭 **Smooth Animations** - Framer Motion powered micro-interactions
- 📚 **Storybook Documentation** - Interactive component documentation
- 🔧 **TypeScript Support** - Full type safety and IntelliSense
- 🎯 **Tree Shakeable** - Import only what you need
- 🧪 **Battle Tested** - Used in production TaskFlow application

## Quick Start

### Installation

```bash
npm install @codeharborhub/ui-components
```

### Setup

Import the CSS file in your main application file:

```tsx
import '@codeharborhub/ui-components/styles.css';
```

### Basic Usage

```tsx
import { Button, Input, Card, Modal } from '@codeharborhub/ui-components';

function App() {
  return (
    <Card>
      <h1>Welcome!</h1>
      <Input label="Email" type="email" placeholder="Enter your email" />
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

## Components

### Button
Versatile button component with multiple variants and states.

```tsx
<Button variant="primary" size="md" leftIcon={<Plus />}>
  Add Item
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- `leftIcon`, `rightIcon`: ReactNode

### Input
Form input with validation, icons, and helper text.

```tsx
<Input
  label="Password"
  type="password"
  error="Password is required"
  leftIcon={<Lock />}
  required
/>
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`, `rightIcon`: ReactNode

### Card
Flexible container with header, content, and footer sections.

```tsx
<Card variant="elevated" hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Modal
Accessible modal dialog with animations.

```tsx
<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure?</p>
  <ModalFooter>
    <Button variant="outline">Cancel</Button>
    <Button variant="danger">Delete</Button>
  </ModalFooter>
</Modal>
```

### Badge
Status and category indicators.

```tsx
<Badge variant="success">Completed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Failed</Badge>
```

## Demo Application

The TaskFlow application demonstrates real-world usage of all components:

- **Authentication System** - Login, signup, and password reset
- **Task Management** - Create, edit, delete, and organize tasks
- **Real-time Updates** - Supabase integration for data persistence
- **Responsive Design** - Works on mobile, tablet, and desktop

### Running the Demo

```bash
npm run dev
```

Visit `http://localhost:5173` to see the TaskFlow demo application.

## Storybook Documentation

View interactive component documentation:

```bash
npm run storybook
```

Visit `http://localhost:6006` to explore all components with live examples.

## Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Emerald (#10B981)
- **Accent**: Violet (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)

### Spacing
8px base unit system (8, 16, 24, 32, 40, 48px)

### Typography
- **Headings**: 120% line height
- **Body**: 150% line height
- **Weights**: Regular (400), Medium (500), Semibold (600)

## Accessibility Features

- ✅ **ARIA Attributes** - Proper labeling and roles
- ✅ **Keyboard Navigation** - Full keyboard support
- ✅ **Focus Management** - Visible focus indicators
- ✅ **Color Contrast** - WCAG AA compliant
- ✅ **Screen Reader Support** - Semantic markup
- ✅ **Error Handling** - Clear error messages

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook

# Build library
npm run build:lib

# Lint code
npm run lint
```

## License

MIT © CodeHJarborHub

## Support

- 📖 [Documentation](#)
- 🐛 [Issues](https://github.com/codeharborhub/ui-components/issues)
- 💬 [Discussions](https://github.com/codeharborhub/ui-components/discussions)