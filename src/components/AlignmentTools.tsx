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
        ⬅
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`toolbar-button ${
          editor.isActive({ textAlign: "center" }) ? "active" : ""
        }`}
        title="Align Center"
      >
        ↔
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`toolbar-button ${
          editor.isActive({ textAlign: "right" }) ? "active" : ""
        }`}
        title="Align Right"
      >
        ➡
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`toolbar-button ${
          editor.isActive({ textAlign: "justify" }) ? "active" : ""
        }`}
        title="Justify"
      >
        ⬌
      </button>
    </>
  );
};

export default AlignmentTools;