# Advanced TipTap Text Editor Specification

## Overview
This document outlines the requirements for building an advanced TipTap-based text editor that replicates the shown UI design with comprehensive media handling, S3 integration, and social media embedding capabilities.

## UI Design Requirements

### 1. Editor Layout & Styling
- **Theme**: Dark theme with rounded corners
- **Background**: Dark gray/black (#1a1a1a or similar)
- **Border**: Rounded corners (border-radius: 12px)
- **Padding**: Generous internal padding
- **Typography**: Clean, modern font (Inter, Poppins, or similar)

### 2. Toolbar Design
The toolbar should match the reference image exactly:

#### Top Toolbar Layout (Left to Right):
1. **Undo/Redo**: ↶ ↷ icons
2. **Separator**: Vertical line
3. **Heading Dropdown**: "H1 ↓" with purple accent
4. **List Controls**: 
   - Bullet list (≡)
   - Numbered list (≡)
5. **Table Insert**: Grid icon
6. **Separator**: Vertical line
7. **Text Formatting**:
   - Bold (B)
   - Italic (I)  
   - Strikethrough (S)
   - Code (`</>`)
   - Underline (U)
8. **Color Picker**: Color palette icon
9. **Link**: Chain link icon
10. **Superscript**: x² 
11. **Subscript**: x₂
12. **Separator**: Vertical line
13. **Alignment Controls**:
    - Left align
    - Center align  
    - Right align
    - Justify
14. **Add Button**: "+ Add" button (prominent, likely for media)
15. **History/Reset**: Circular arrow (right side)

#### Toolbar Styling:
```css
.toolbar {
  background: rgba(40, 40, 40, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-separator {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
}

.toolbar-button {
  color: rgba(255, 255, 255, 0.8);
  background: transparent;
  border: none;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toolbar-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.toolbar-button.active {
  background: rgba(168, 85, 247, 0.2);
  color: #a855f7;
}
```

## Core Features Implementation

### 1. Standard Rich Text Editor Features
- **Text Formatting**: Bold, Italic, Underline, Strikethrough
- **Headings**: H1-H6 dropdown selector with preview
- **Lists**: Bullet and numbered lists with nesting support
- **Text Alignment**: Left, Center, Right, Justify
- **Links**: Insert/edit hyperlinks with URL validation
- **Code**: Inline code and code blocks
- **Colors**: Text and background color picker
- **Super/Subscript**: Mathematical and chemical notation support
- **Tables**: Insert and manage tables
- **Undo/Redo**: Complete history management

### 2. File Upload System

#### 2.1 Upload Interface (as shown in image)
```javascript
const uploadAreaConfig = {
  style: {
    border: '2px dashed rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    padding: '40px',
    textAlign: 'center',
    background: 'rgba(40, 40, 40, 0.5)',
    minHeight: '200px'
  },
  text: {
    primary: 'Click to upload or drag and drop',
    secondary: 'Maximum 3 files, 5MB each.',
    uploadIcon: '📁' // Upload folder icon
  }
}
```

#### 2.2 Image Handling
- **S3 Upload**: Direct upload to AWS S3 bucket
- **Supported Formats**: JPEG, PNG, GIF, WebP
- **Size Adjustment**: 
  - Drag handles for manual resize
  - Percentage options (25%, 50%, 75%, 100%)
  - Custom width/height input
  - Maintain aspect ratio toggle
- **Multiple Images**: Support for 2+ images side by side
- **Alignment**: Left, Center, Right, Full-width
- **Responsive**: Auto-adjust for mobile screens

#### 2.3 Video Handling
- **S3 Upload**: Direct video upload with processing queue
- **Supported Formats**: MP4, WebM, OGG
- **Auto-responsive**: Maintain aspect ratio
- **Size Control**: Custom dimensions with auto-height
- **Poster Generation**: Auto-generate video thumbnails

### 3. Social Media Embed System

#### 3.1 Supported Platforms
- **YouTube**: Regular videos and Shorts
- **Facebook**: Video posts and Watch content  
- **TikTok**: Standard video links
- **Vimeo**: Public and private videos
- **Instagram**: Video posts (when API allows)

#### 3.2 URL Processing Pipeline
```javascript
const embedProcessor = {
  youtube: {
    regex: /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
    apiEndpoint: 'https://www.googleapis.com/youtube/v3/videos',
    embedTemplate: 'https://www.youtube.com/embed/{videoId}'
  },
  tiktok: {
    regex: /tiktok\.com\/@[\w.-]+\/video\/(\d+)/,
    apiEndpoint: 'https://www.tiktok.com/oembed',
    embedTemplate: '<iframe src="https://www.tiktok.com/embed/{videoId}"></iframe>'
  },
  facebook: {
    regex: /facebook\.com\/watch\/?\?v=(\d+)|facebook\.com\/[\w.-]+\/videos\/(\d+)/,
    apiEndpoint: 'https://graph.facebook.com/v18.0/oembed_video',
    embedTemplate: '<iframe src="https://www.facebook.com/plugins/video.php?href={url}"></iframe>'
  }
}
```

#### 3.3 Validation & Error Handling
- **URL Validation**: Real-time validation of embed URLs
- **API Verification**: Check if content exists and is embeddable
- **Error States**: Clear error messages for invalid/unavailable content
- **Fallback**: Show link if embedding fails

### 4. Advanced Features

#### 4.1 Content Block System
- **Drag & Drop**: Reorder content blocks
- **Block Types**: Text, Image, Video, Embed, Table
- **Block Controls**: Duplicate, delete, move up/down
- **Block Styling**: Individual styling per block

#### 4.2 Responsive Design
```css
@media (max-width: 768px) {
  .editor-toolbar {
    flex-wrap: wrap;
    gap: 4px;
  }
  
  .editor-content {
    padding: 16px;
  }
  
  .upload-area {
    padding: 20px;
    min-height: 120px;
  }
}
```

### 5. Technical Implementation

#### 5.1 Required TipTap Extensions
```javascript
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

// Custom Extensions Needed:
import CustomImage from './extensions/CustomImage'
import CustomVideo from './extensions/CustomVideo'
import SocialEmbed from './extensions/SocialEmbed'
import FileUpload from './extensions/FileUpload'
```

#### 5.2 S3 Upload Configuration
```javascript
const s3Config = {
  region: 'your-region',
  bucket: 'your-bucket-name',
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-key',
  // Or use IAM roles/temporary credentials
  uploadPath: 'editor-uploads/',
  allowedTypes: {
    images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    videos: ['video/mp4', 'video/webm', 'video/ogg']
  },
  maxFileSizes: {
    image: 10 * 1024 * 1024, // 10MB
    video: 100 * 1024 * 1024  // 100MB
  }
}
```

#### 5.3 Component Structure
```
components/
├── TipTapEditor/
│   ├── Editor.jsx              # Main editor component
│   ├── Toolbar.jsx             # Toolbar component
│   ├── UploadArea.jsx          # File upload interface
│   ├── extensions/
│   │   ├── CustomImage.js      # Enhanced image extension
│   │   ├── CustomVideo.js      # Video handling extension
│   │   ├── SocialEmbed.js      # Social media embedding
│   │   └── FileUpload.js       # File upload handling
│   ├── utils/
│   │   ├── s3Upload.js         # S3 upload utilities
│   │   ├── urlValidator.js     # URL validation
│   │   └── embedProcessor.js   # Social media processing
│   └── styles/
│       └── editor.css          # Editor styling
```

## Implementation Notes

### 1. State Management
- Use React state or Redux for editor state
- Separate state for upload progress
- Cache embedded content to avoid re-fetching

### 2. Performance Optimization
- Lazy load large media files
- Implement virtual scrolling for long content
- Compress images before upload
- Use CDN for faster media delivery

### 3. Accessibility
- Proper ARIA labels for all buttons
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

### 4. Error Handling
- Network failure recovery
- File upload error states
- Invalid URL handling
- Content parsing errors

This specification provides a complete blueprint for building the advanced TipTap editor shown in your reference image, with all the requested features implemented.