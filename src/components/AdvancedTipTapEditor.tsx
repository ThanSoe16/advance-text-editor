"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Image } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { Link } from "@tiptap/extension-link";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { useCallback, useState, useEffect } from "react";
import UploadArea from "./UploadArea";
import ImageControls from "./ImageControls";
import ColorPicker from "./ColorPicker";
import TableControls from "./TableControls";
import TextFormattingTools from "./TextFormattingTools";
import AlignmentTools from "./AlignmentTools";

interface AdvancedTipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const AdvancedTipTapEditor: React.FC<AdvancedTipTapEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing...",
}) => {
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "editor-link",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "borderless-table",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Superscript,
      Subscript,
      Underline,
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none editor-content",
        "data-placeholder": placeholder,
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const updateImageSelection = () => {
      const { state } = editor;
      const { selection } = state;

      // Check if the selection includes an image node
      let hasImageSelected = false;

      // Check if current selection is on an image
      state.doc.nodesBetween(selection.from, selection.to, (node) => {
        if (node.type.name === "image") {
          hasImageSelected = true;
          return false; // Stop iteration
        }
      });

      // Also check for direct image selection via DOM
      if (!hasImageSelected) {
        const selectedElement = document.querySelector(
          ".ProseMirror-selectednode"
        );
        hasImageSelected = selectedElement?.tagName === "IMG";
      }

      setIsImageSelected(hasImageSelected);
    };

    // Update on selection change and clicks
    editor.on("selectionUpdate", updateImageSelection);
    editor.on("transaction", updateImageSelection);
    editor.on("focus", updateImageSelection);

    // Also listen for clicks on the editor
    const editorElement = editor.view.dom;
    editorElement.addEventListener("click", updateImageSelection);

    // Initial check
    updateImageSelection();

    return () => {
      editor.off("selectionUpdate", updateImageSelection);
      editor.off("transaction", updateImageSelection);
      editor.off("focus", updateImageSelection);
      editorElement.removeEventListener("click", updateImageSelection);
    };
  }, [editor]);

  const handleFileUpload = useCallback(
    (files: File[]) => {
      files.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result && editor) {
              editor
                .chain()
                .focus()
                .setImage({ src: reader.result as string })
                .run();
            }
          };
          reader.readAsDataURL(file);
        }
      });
      setShowUploadArea(false);
    },
    [editor]
  );

  if (!editor) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-gray-900 rounded-xl p-6">
        <div className="h-16 bg-gray-800 rounded-lg mb-4 animate-pulse"></div>
        <div className="h-96 bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
      {/* Advanced Toolbar */}
      <div className="bg-gray-800 bg-opacity-95 backdrop-blur-sm border-b border-gray-700 p-3">
        <div className="flex items-center flex-wrap gap-2">
          {/* Undo/Redo */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="toolbar-button"
            title="Undo"
          >
            ↶
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="toolbar-button"
            title="Redo"
          >
            ↷
          </button>

          <div className="toolbar-separator"></div>

          {/* Heading Dropdown */}
          <select
            className="bg-gray-700 text-white px-3 py-1 rounded border-none text-sm"
            onChange={(e) => {
              const level = parseInt(e.target.value);
              if (level) {
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: level as any })
                  .run();
              } else {
                editor.chain().focus().setParagraph().run();
              }
            }}
            value={
              editor.isActive("heading", { level: 1 })
                ? "1"
                : editor.isActive("heading", { level: 2 })
                ? "2"
                : editor.isActive("heading", { level: 3 })
                ? "3"
                : editor.isActive("heading", { level: 4 })
                ? "4"
                : editor.isActive("heading", { level: 5 })
                ? "5"
                : editor.isActive("heading", { level: 6 })
                ? "6"
                : "0"
            }
          >
            <option value="0">Normal</option>
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
            <option value="4">H4</option>
            <option value="5">H5</option>
            <option value="6">H6</option>
          </select>

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`toolbar-button ${
              editor.isActive("bulletList") ? "active" : ""
            }`}
            title="Bullet List"
          >
            ≡
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`toolbar-button ${
              editor.isActive("orderedList") ? "active" : ""
            }`}
            title="Numbered List"
          >
            ≡
          </button>

          <TableControls editor={editor} />

          <div className="toolbar-separator"></div>

          <TextFormattingTools editor={editor} />

          <ColorPicker editor={editor} />

          <div className="toolbar-separator"></div>

          <AlignmentTools editor={editor} />

          <ImageControls editor={editor} isImageSelected={isImageSelected} />

          {/* Add Button */}
          <button
            onClick={() => setShowUploadArea(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm font-medium transition-colors"
            title="Add Media"
          >
            + Add
          </button>

          {/* Reset/Clear */}
          <button
            onClick={() => editor.chain().focus().clearContent().run()}
            className="toolbar-button ml-auto"
            title="Clear Content"
          >
            ↻
          </button>
        </div>
      </div>

      {/* Upload Area Modal */}
      {showUploadArea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-semibold">Upload Files</h3>
              <button
                onClick={() => setShowUploadArea(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <UploadArea onUpload={handleFileUpload} />
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="p-6 min-h-[400px] bg-gray-900 text-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default AdvancedTipTapEditor;