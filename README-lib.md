# Advanced Text Editor React Library

A feature-rich TipTap-based React text editor with advanced formatting options, perfect for content management systems, blogs, documentation, and any application requiring rich text editing capabilities.

## 🚀 Installation

```bash
npm install adv-editor
# or
yarn add adv-editor
# or
pnpm add adv-editor
```

## 📖 Quick Start

### Basic Usage

```tsx
import React, { useState } from 'react';
import { AdvancedTipTapEditor } from 'adv-editor';
import 'adv-editor/styles';

function App() {
  const [content, setContent] = useState('<p>Hello world!</p>');

  return (
    <AdvancedTipTapEditor
      value={content}
      onChange={setContent}
      placeholder="Start writing your content..."
      theme="dark"
    />
  );
}
```

### With Theme Provider (Recommended)

```tsx
import React, { useState } from 'react';
import { AdvancedTipTapEditor, ThemeProvider } from 'adv-editor';
import 'adv-editor/styles';

function App() {
  const [content, setContent] = useState('');

  return (
    <ThemeProvider>
      <div className="min-h-screen p-4">
        <h1>My Rich Text Editor</h1>
        <AdvancedTipTapEditor
          value={content}
          onChange={setContent}
          placeholder="Start writing..."
        />
      </div>
    </ThemeProvider>
  );
}
```

## 📋 API Reference

### AdvancedTipTapEditor Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `string` | Yes | - | HTML content of the editor |
| `onChange` | `(value: string) => void` | Yes | - | Callback when content changes |
| `theme` | `'light' \| 'dark'` | No | `'dark'` | Editor theme (overrides ThemeProvider) |
| `placeholder` | `string` | No | `'Start writing...'` | Placeholder text when editor is empty |

### ThemeProvider

Wrap your app or editor component to provide theme context:

```tsx
import { ThemeProvider, useTheme } from 'adv-editor';

// Custom theme controls
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## ✨ Features

### Text Formatting
- **Basic formatting**: Bold, italic, underline, strikethrough
- **Advanced typography**: Superscript, subscript
- **Headings**: H1-H6 with dropdown selector
- **Text alignment**: Left, center, right, justify
- **Line spacing**: Custom line height controls
- **Colors**: Text color picker with custom colors
- **Highlighting**: Multi-color text highlighting

### Lists and Structure
- **Bullet lists**: Unordered lists with custom styling
- **Numbered lists**: Ordered lists with proper numbering
- **Task lists**: Interactive checkboxes and nested tasks
- **Blockquotes**: Styled quote blocks
- **Code blocks**: Syntax-highlighted code sections

### Media and Embeds
- **Image upload**: Drag-and-drop or click to upload
- **Image controls**: Resize, align, and style uploaded images
- **Iframe embedding**: Embed videos, maps, and other content
- **Responsive design**: All media scales properly on mobile

### Tables
- **Table creation**: Insert tables with custom rows/columns
- **Table editing**: Add/remove rows and columns dynamically
- **Cell formatting**: Format individual table cells
- **Resizable columns**: Drag to resize table columns

### Advanced Features
- **Undo/redo**: Full history management
- **Link insertion**: Add and edit hyperlinks
- **Theme switching**: Built-in dark/light mode toggle
- **Content clearing**: One-click content reset
- **Responsive design**: Works on desktop, tablet, and mobile

## 🎨 Styling

The editor comes with built-in styles that work out of the box. Import the CSS:

```tsx
import 'adv-editor/styles';
```

### Custom Styling

The editor uses CSS classes that you can override:

```css
/* Override editor container */
.prose {
  /* Your custom prose styles */
}

/* Override toolbar buttons */
.toolbar-button {
  /* Your custom button styles */
}

/* Override specific elements */
.editor-image {
  /* Your custom image styles */
}

.editor-link {
  /* Your custom link styles */
}
```

## 🔧 Advanced Usage

### Individual Components

You can also import and use individual components for custom toolbars:

```tsx
import { 
  TextFormattingTools,
  ColorPicker,
  AlignmentTools,
  TableControls,
  ImageControls 
} from 'adv-editor';
```

### Custom Extensions

The editor is built on TipTap, so you can extend it with custom functionality:

```tsx
// Access the editor instance through refs if needed
const editorRef = useRef();
```

## 🎯 Use Cases

- **Content Management Systems**: Blog posts, articles, documentation
- **Note-taking Apps**: Rich notes with images and formatting
- **Comment Systems**: Enhanced commenting with media support
- **Documentation**: Technical docs with code blocks and tables
- **Email Composers**: Rich HTML email editing
- **Forms**: Rich text input fields

## 🔒 Security

- Content is properly sanitized
- XSS protection built-in
- Safe HTML parsing
- No script execution in content

## 🌟 Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📦 Bundle Size

- Gzipped: ~45KB
- Dependencies: TipTap ecosystem + React

## 🤝 Contributing

Found a bug or want to contribute? Check out the [GitHub repository](https://github.com/ThanSoe16/advance-text-editor).

## 📄 License

MIT License - see LICENSE file for details.