import { Editor } from "@tiptap/react";

interface AlignmentToolsProps {
  editor: Editor;
}

const AlignmentTools: React.FC<AlignmentToolsProps> = ({ editor }) => {
  return (
    <>
      {/* Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`toolbar-button ${
          editor.isActive({ textAlign: "left" }) ? "active" : ""
        }`}
        title="Align Left"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="15" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="15" y2="18"/>
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`toolbar-button ${
          editor.isActive({ textAlign: "center" }) ? "active" : ""
        }`}
        title="Align Center"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="6" y1="6" x2="18" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="6" y1="18" x2="18" y2="18"/>
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`toolbar-button ${
          editor.isActive({ textAlign: "right" }) ? "active" : ""
        }`}
        title="Align Right"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="9" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="9" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`toolbar-button ${
          editor.isActive({ textAlign: "justify" }) ? "active" : ""
        }`}
        title="Justify"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </>
  );
};

export default AlignmentTools;