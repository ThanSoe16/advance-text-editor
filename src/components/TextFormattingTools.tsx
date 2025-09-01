import { useCallback } from "react";
import { Editor } from "@tiptap/react";

interface TextFormattingToolsProps {
  editor: Editor;
  onAddImage?: () => void;
}

const TextFormattingTools: React.FC<TextFormattingToolsProps> = ({
  editor,
  onAddImage,
}) => {
  const addLink = useCallback(() => {
    const url = window.prompt("Enter URL:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const addVideoLink = useCallback(() => {
    const url = window.prompt("Enter video URL (YouTube, TikTok, Facebook, Vimeo):");
    if (url && editor) {
      let embedUrl = url;
      let isValidVideo = false;
      
      // YouTube
      if (url.includes('youtube.com/watch') && url.includes('v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
          isValidVideo = true;
        }
      } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
          isValidVideo = true;
        }
      }
      // TikTok
      else if (url.includes('tiktok.com') && url.includes('/video/')) {
        const videoId = url.split('/video/')[1]?.split('?')[0];
        if (videoId) {
          embedUrl = `https://www.tiktok.com/embed/v2/${videoId}`;
          isValidVideo = true;
        }
      }
      // Facebook
      else if (url.includes('facebook.com') || url.includes('fb.watch')) {
        const encodedUrl = encodeURIComponent(url);
        embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false`;
        isValidVideo = true;
      }
      // Vimeo
      else if (url.includes('vimeo.com/')) {
        const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
        if (videoId && !isNaN(Number(videoId))) {
          embedUrl = `https://player.vimeo.com/video/${videoId}`;
          isValidVideo = true;
        }
      }
      
      if (!isValidVideo) {
        alert("Invalid video URL. Please use YouTube, TikTok, Facebook, or Vimeo links.");
        return;
      }
      
      const width = window.prompt("Enter width (%):", "100") || "100";
      const height = window.prompt("Enter height (px):", "315") || "315";
      
      const finalWidth = String(width).includes('%') ? width : `${width}%`;
      const iframeHtml = `<iframe src="${embedUrl}" width="${finalWidth}" height="${height}" frameborder="0" allowfullscreen style="max-width: 100%; border-radius: 8px; margin: 1rem 0; width: ${finalWidth}; height: ${height}px;"></iframe>`;
      editor.chain().focus().insertContent(iframeHtml).run();
    }
  }, [editor]);

  return (
    <>
      {/* Text Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`toolbar-button font-bold ${
          editor.isActive("bold") ? "active" : ""
        }`}
        title="Bold"
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`toolbar-button italic ${
          editor.isActive("italic") ? "active" : ""
        }`}
        title="Italic"
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`toolbar-button ${
          editor.isActive("strike") ? "active" : ""
        }`}
        title="Strikethrough"
      >
        S
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`toolbar-button ${editor.isActive("code") ? "active" : ""}`}
        title="Code"
      >
        &lt;/&gt;
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`toolbar-button underline ${
          editor.isActive("underline") ? "active" : ""
        }`}
        title="Underline"
      >
        U
      </button>

      {/* Super/Subscript */}
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={`toolbar-button ${
          editor.isActive("superscript") ? "active" : ""
        }`}
        title="Superscript"
      >
        x²
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={`toolbar-button ${
          editor.isActive("subscript") ? "active" : ""
        }`}
        title="Subscript"
      >
        x₂
      </button>

      {/* Media - Link, Video, Image */}
      <button
        onClick={addLink}
        className={`toolbar-button ${editor.isActive("link") ? "active" : ""}`}
        title="Insert Link"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      </button>
      <button
        onClick={addVideoLink}
        className="toolbar-button"
        title="Insert Video"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M7 3v18"/>
          <path d="M3 7.5h4"/>
          <path d="M3 12h18"/>
          <path d="M3 16.5h4"/>
          <path d="M17 3v18"/>
          <path d="M17 7.5h4"/>
          <path d="17 16.5h4"/>
        </svg>
      </button>
      <button
        onClick={onAddImage}
        className="toolbar-button"
        title="Add Images"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
      </button>
    </>
  );
};

export default TextFormattingTools;
