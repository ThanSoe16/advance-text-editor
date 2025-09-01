import { Editor } from "@tiptap/react";

interface TextFormattingToolsProps {
  editor: Editor;
}

const TextFormattingTools: React.FC<TextFormattingToolsProps> = ({
  editor,
}) => {

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

    </>
  );
};

export default TextFormattingTools;
