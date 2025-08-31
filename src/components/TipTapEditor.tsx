"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Image } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { useCallback } from "react";

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing...",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
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
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none",
        "data-placeholder": placeholder,
      },
    },
  });

  const addImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
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
    };

    input.click();
  }, [editor]);

  const addTable = useCallback(
    (rows: number = 1, cols: number = 2) => {
      if (editor) {
        editor
          .chain()
          .focus()
          .insertTable({ rows, cols, withHeaderRow: false })
          .run();
      }
    },
    [editor]
  );

  if (!editor) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="h-12 bg-gray-100 rounded-lg mb-4 animate-pulse"></div>
        <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Simple Floating Toolbar */}
      <div className="flex items-center gap-1 p-1 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("bold")
              ? "bg-gray-100 text-black font-semibold"
              : "text-gray-600"
          }`}
          title="Bold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("italic")
              ? "bg-gray-100 text-black"
              : "text-gray-600"
          }`}
          title="Italic"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("strike")
              ? "bg-gray-100 text-black"
              : "text-gray-600"
          }`}
          title="Strikethrough"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-3 py-2 text-sm font-medium rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-100 text-black"
              : "text-gray-600"
          }`}
          title="Heading 1"
        >
          H1
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-2 text-sm font-medium rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-100 text-black"
              : "text-gray-600"
          }`}
          title="Heading 2"
        >
          H2
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("bulletList")
              ? "bg-gray-100 text-black"
              : "text-gray-600"
          }`}
          title="Bullet List"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("orderedList")
              ? "bg-gray-100 text-black"
              : "text-gray-600"
          }`}
          title="Numbered List"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-600"
          title="Add Image"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        </button>

        <button
          onClick={() => addTable(1, 2)}
          className="px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors text-gray-600"
          title="2 Columns"
        >
          2 Col
        </button>

        <button
          onClick={() => addTable(1, 3)}
          className="px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors text-gray-600"
          title="3 Columns"
        >
          3 Col
        </button>

        {editor.isActive("table") && (
          <>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button
              onClick={() => editor.chain().focus().deleteTable().run()}
              className="p-2 rounded hover:bg-red-50 transition-colors text-red-600"
              title="Delete Table"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Editor */}
      <div className="min-h-[400px] p-6 bg-white border border-gray-200 rounded-lg focus-within:border-gray-300 transition-colors">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;
