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
import { Highlight } from "@tiptap/extension-highlight";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Node } from "@tiptap/core";
import { useCallback, useState, useEffect } from "react";
import UploadArea from "./UploadArea";
import ImageControls from "./ImageControls";
import IframeControls from "./IframeControls";
import ColorPicker from "./ColorPicker";
import HighlightPicker from "./HighlightPicker";
import LineSpacing from "./LineSpacing";
import TableControls from "./TableControls";
import TextFormattingTools from "./TextFormattingTools";
import AlignmentTools from "./AlignmentTools";
import { Undo2, Redo2, RotateCcw, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdvancedTipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  theme?: 'light' | 'dark';
  placeholder?: string;
}

const IframeExtension = Node.create({
  name: "iframe",
  group: "block",
  atom: true,
  selectable: true,
  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: 560,
      },
      height: {
        default: 315,
      },
      frameborder: {
        default: 0,
      },
      allowfullscreen: {
        default: true,
      },
      style: {
        default: "max-width: 100%; border-radius: 8px; margin: 1rem 0;",
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "iframe",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["iframe", HTMLAttributes];
  },
  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      const iframe = document.createElement("iframe");

      // Set all attributes
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          iframe.setAttribute(key, value);
        }
      });

      // Disable iframe interaction to make it easier to select
      iframe.style.pointerEvents = "none";

      // Make it selectable by wrapping in a div
      const wrapper = document.createElement("div");
      wrapper.style.cssText =
        "position: relative; display: block; margin: 1rem 0; cursor: pointer;";
      wrapper.contentEditable = "false";
      wrapper.appendChild(iframe);

      return {
        dom: wrapper,
      };
    };
  },
});

const AdvancedTipTapEditor: React.FC<AdvancedTipTapEditorProps> = ({
  value,
  onChange,
  theme: propTheme,
  placeholder = "Start writing...",
}) => {
  const context = useTheme();
  const theme = propTheme || context?.theme || 'dark';
  const toggleTheme = context?.toggleTheme;
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isIframeSelected, setIsIframeSelected] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        dropcursor: {
          color: "#8b5cf6",
        },
        bulletList: {
          HTMLAttributes: {
            class: "prose-bullet-list",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "prose-ordered-list",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "prose-list-item",
          },
        },
      }),
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
      TextStyle.configure({
        HTMLAttributes: {
          class: "text-style",
        },
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      IframeExtension,
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
      handleDOMEvents: {
        // Allow video elements to be rendered
      },
      transformPastedHTML: (html: string) => html, // Don't sanitize HTML
    },
    parseOptions: {
      preserveWhitespace: "full",
    },
    enablePasteRules: false,
    enableInputRules: false,
  });

  useEffect(() => {
    if (!editor) return;

    const updateSelection = () => {
      const { state } = editor;
      const { selection } = state;

      // Check if the selection includes an image or iframe node
      let hasImageSelected = false;
      let hasIframeSelected = false;

      // Check if current selection is on an image or iframe
      state.doc.nodesBetween(selection.from, selection.to, (node) => {
        if (node.type.name === "image") {
          hasImageSelected = true;
          return false; // Stop iteration
        }
        if (node.type.name === "iframe") {
          hasIframeSelected = true;
          return false; // Stop iteration
        }
      });

      // Also check for direct selection via DOM
      if (!hasImageSelected && !hasIframeSelected) {
        const selectedElement = document.querySelector(
          ".ProseMirror-selectednode"
        );
        hasImageSelected = selectedElement?.tagName === "IMG";
        hasIframeSelected = selectedElement?.tagName === "IFRAME";
      }

      setIsImageSelected(hasImageSelected);
      setIsIframeSelected(hasIframeSelected);
    };

    // Update on selection change and clicks
    editor.on("selectionUpdate", updateSelection);
    editor.on("transaction", updateSelection);
    editor.on("focus", updateSelection);

    // Also listen for clicks on the editor
    const editorElement = editor.view.dom;
    editorElement.addEventListener("click", updateSelection);

    // Initial check
    updateSelection();

    return () => {
      editor.off("selectionUpdate", updateSelection);
      editor.off("transaction", updateSelection);
      editor.off("focus", updateSelection);
      editorElement.removeEventListener("click", updateSelection);
    };
  }, [editor]);

  const handleFileUpload = useCallback(
    (files: File[]) => {
      if (!editor) {
        return;
      }

      files.forEach((file, index) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result && editor) {
              // Insert image using HTML with proper spacing
              const imageHtml = `<img src="${reader.result}" class="editor-image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0;" alt="uploaded image" />`;

              // Add paragraph break if this isn't the first image
              if (index > 0) {
                editor
                  .chain()
                  .focus()
                  .insertContent("<p></p>")
                  .insertContent(imageHtml)
                  .run();
              } else {
                editor.chain().focus().insertContent(imageHtml).run();
              }
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
    <div 
      className={`w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl ${
        theme === 'dark' 
          ? 'bg-gray-900' 
          : 'bg-white border border-gray-200'
      }`}
      data-theme={theme}
    >
      {/* Advanced Toolbar */}
      <div className={`bg-opacity-95 backdrop-blur-sm border-b p-3 ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center flex-wrap gap-2">
          {/* 4. UTILS */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="toolbar-button"
            title="Undo"
          >
            <Undo2 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="toolbar-button"
            title="Redo"
          >
            <Redo2 size={16} />
          </button>
          {/* 1. TEXT FUNCTIONS */}
          {/* Heading Dropdown */}
          <Select
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
            onValueChange={(value) => {
              const level = parseInt(value);
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
          >
            <SelectTrigger className="min-w-32 max-w-42 h-8 bg-gray-700 border-gray-600 text-gray-300 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-gray-300">
              <SelectItem
                value="0"
                className="text-gray-300 focus:bg-gray-700 focus:text-white"
              >
                Normal text
              </SelectItem>
              <SelectItem
                value="1"
                className="text-gray-300 focus:bg-gray-700 focus:text-white"
              >
                <span className="text-2xl font-bold">Heading 1</span>
              </SelectItem>
              <SelectItem
                value="2"
                className="text-gray-300 focus:bg-gray-700 focus:text-white"
              >
                <span className="text-xl font-bold">Heading 2</span>
              </SelectItem>
              <SelectItem
                value="3"
                className="text-gray-300 focus:bg-gray-700 focus:text-white"
              >
                <span className="text-lg font-bold">Heading 3</span>
              </SelectItem>
              <SelectItem
                value="4"
                className="text-gray-300 focus:bg-gray-700 focus:text-white"
              >
                <span className="text-base font-bold">Heading 4</span>
              </SelectItem>
              <SelectItem
                value="5"
                className="text-gray-300 focus:bg-gray-700 focus:text-white"
              >
                <span className="text-sm font-bold">Heading 5</span>
              </SelectItem>
              <SelectItem
                value="6"
                className="text-gray-300 focus:bg-gray-700 focus:text-white"
              >
                <span className="text-xs font-bold">Heading 6</span>
              </SelectItem>
            </SelectContent>
          </Select>

          <TextFormattingTools
            editor={editor}
            onAddImage={() => setShowUploadArea(true)}
          />

          <div className="toolbar-separator"></div>

          <ColorPicker editor={editor} />
          <HighlightPicker editor={editor} />
          <LineSpacing editor={editor} />

          <div className="toolbar-separator"></div>

          {/* Blockquote */}
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`toolbar-button ${
              editor.isActive("blockquote") ? "active" : ""
            }`}
            title="Blockquote"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
          </button>

          {/* Code Block */}
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`toolbar-button ${
              editor.isActive("codeBlock") ? "active" : ""
            }`}
            title="Code Block"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16,18 22,12 16,6" />
              <polyline points="8,6 2,12 8,18" />
            </svg>
          </button>

          <div className="toolbar-separator"></div>

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`toolbar-button ${
              editor.isActive("bulletList") ? "active" : ""
            }`}
            title="Bullet List"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`toolbar-button ${
              editor.isActive("orderedList") ? "active" : ""
            }`}
            title="Numbered List"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <path d="M4 6h1v4" />
              <path d="M4 10h2" />
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`toolbar-button ${
              editor.isActive("taskList") ? "active" : ""
            }`}
            title="Task List"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </button>

          <div className="toolbar-separator"></div>

          <AlignmentTools editor={editor} />

          <div className="toolbar-separator"></div>

          {/* 2. MEDIA FUNCTIONS (handled in TextFormattingTools now) */}
          <ImageControls editor={editor} isImageSelected={isImageSelected} />
          <IframeControls editor={editor} isIframeSelected={isIframeSelected} />

          {/* 3. TABLE FUNCTIONS */}
          <TableControls editor={editor} />

          {/* Theme Toggle */}
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="toolbar-button"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          {/* Reset/Clear */}
          <button
            onClick={() => editor.chain().focus().clearContent().run()}
            className="toolbar-button ml-auto"
            title="Clear Content"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Upload Area Modal */}
      {showUploadArea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-semibold">
                Upload Images
              </h3>
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
      <div className={`p-6 min-h-[400px] ${
        theme === 'dark' 
          ? 'bg-gray-900 text-white' 
          : 'bg-white text-gray-900'
      }`}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default AdvancedTipTapEditor;
