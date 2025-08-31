import { useCallback } from "react";
import { Editor } from "@tiptap/react";

interface TableControlsProps {
  editor: Editor;
}

const TableControls: React.FC<TableControlsProps> = ({ editor }) => {
  const addTable = useCallback(
    (rows: number = 3, cols: number = 3, withHeaderRow: boolean = false) => {
      if (editor) {
        editor.chain().focus().insertTable({ rows, cols, withHeaderRow }).run();
      }
    },
    [editor]
  );

  const addRowAbove = useCallback(() => {
    if (editor) {
      editor.chain().focus().addRowBefore().run();
    }
  }, [editor]);

  const addRowBelow = useCallback(() => {
    if (editor) {
      editor.chain().focus().addRowAfter().run();
    }
  }, [editor]);

  const deleteTableRow = useCallback(() => {
    if (editor) {
      editor.chain().focus().deleteRow().run();
    }
  }, [editor]);

  const addColumnLeft = useCallback(() => {
    if (editor) {
      editor.chain().focus().addColumnBefore().run();
    }
  }, [editor]);

  const addColumnRight = useCallback(() => {
    if (editor) {
      editor.chain().focus().addColumnAfter().run();
    }
  }, [editor]);

  const deleteTableColumn = useCallback(() => {
    if (editor) {
      editor.chain().focus().deleteColumn().run();
    }
  }, [editor]);

  const deleteTable = useCallback(() => {
    if (editor) {
      editor.chain().focus().deleteTable().run();
    }
  }, [editor]);

  const toggleHeaderRow = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleHeaderRow().run();
    }
  }, [editor]);

  return (
    <>
      {/* Table Insert Dropdown */}
      <div className="relative group">
        <button
          onClick={() => addTable(3, 3, false)}
          className="toolbar-button"
          title="Insert Table"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18"/>
            <path d="M3 15h18"/>
            <path d="M9 3v18"/>
            <path d="M15 3v18"/>
          </svg>
        </button>

        {/* Table Dropdown Menu */}
        <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-gray-800 rounded-lg shadow-lg border border-gray-600 p-2 z-50 min-w-48">
          <div className="text-white text-sm font-medium mb-2 px-2">
            Insert Table
          </div>
          <div className="space-y-1">
            <button
              onClick={() => addTable(2, 2, false)}
              className="w-full text-left px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
            >
              2×2 Table
            </button>
            <button
              onClick={() => addTable(3, 3, false)}
              className="w-full text-left px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
            >
              3×3 Table
            </button>
            <button
              onClick={() => addTable(4, 4, false)}
              className="w-full text-left px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
            >
              4×4 Table
            </button>
            <button
              onClick={() => addTable(3, 3, true)}
              className="w-full text-left px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
            >
              3×3 with Header
            </button>
            <button
              onClick={() => addTable(1, 2, false)}
              className="w-full text-left px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
            >
              2 Column Layout
            </button>
            <button
              onClick={() => addTable(1, 3, false)}
              className="w-full text-left px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
            >
              3 Column Layout
            </button>
          </div>
        </div>
      </div>

      {/* Table Editing Controls - Show when in table */}
      {editor.isActive("table") && (
        <>
          <div className="toolbar-separator"></div>
          <div className="flex items-center gap-1 bg-gray-700 rounded px-2 py-1">
            <span className="text-xs text-gray-300 mr-2">Table:</span>
            <button
              onClick={addRowAbove}
              className="toolbar-button text-xs"
              title="Insert Row Above"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="4" y="10" width="16" height="3"/>
                <rect x="4" y="13" width="16" height="3"/>
                <rect x="4" y="16" width="16" height="3"/>
                <path d="M12 5v5" stroke-width="2"/>
                <path d="M9 7h6" stroke-width="2"/>
              </svg>
            </button>
            <button
              onClick={addRowBelow}
              className="toolbar-button text-xs"
              title="Insert Row Below"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="4" y="5" width="16" height="3"/>
                <rect x="4" y="8" width="16" height="3"/>
                <rect x="4" y="11" width="16" height="3"/>
                <path d="M12 14v5" stroke-width="2"/>
                <path d="M9 17h6" stroke-width="2"/>
              </svg>
            </button>
            <button
              onClick={addColumnLeft}
              className="toolbar-button text-xs"
              title="Insert Column Left"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="10" y="4" width="3" height="16"/>
                <rect x="13" y="4" width="3" height="16"/>
                <rect x="16" y="4" width="3" height="16"/>
                <path d="M5 12h5" stroke-width="2"/>
                <path d="M7 9v6" stroke-width="2"/>
              </svg>
            </button>
            <button
              onClick={addColumnRight}
              className="toolbar-button text-xs"
              title="Insert Column Right"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="5" y="4" width="3" height="16"/>
                <rect x="8" y="4" width="3" height="16"/>
                <rect x="11" y="4" width="3" height="16"/>
                <path d="M14 12h5" stroke-width="2"/>
                <path d="M17 9v6" stroke-width="2"/>
              </svg>
            </button>
            <button
              onClick={deleteTableRow}
              className="toolbar-button text-xs text-red-400 hover:text-red-300"
              title="Delete Row"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="4" y="6" width="16" height="3"/>
                <rect x="4" y="12" width="16" height="3" fill="currentColor" opacity="0.3"/>
                <rect x="4" y="15" width="16" height="3"/>
                <path d="M9 13h6" stroke-width="2"/>
              </svg>
            </button>
            <button
              onClick={deleteTableColumn}
              className="toolbar-button text-xs text-red-400 hover:text-red-300"
              title="Delete Column"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="6" y="4" width="3" height="16"/>
                <rect x="12" y="4" width="3" height="16" fill="currentColor" opacity="0.3"/>
                <rect x="15" y="4" width="3" height="16"/>
                <path d="M10 12h6" stroke-width="2"/>
              </svg>
            </button>
            <button
              onClick={toggleHeaderRow}
              className={`toolbar-button text-xs ${
                editor.isActive("tableHeader") ? "active" : ""
              }`}
              title="Toggle Header Row"
            >
              Header
            </button>
            <button
              onClick={deleteTable}
              className="toolbar-button text-xs text-red-400 hover:text-red-300"
              title="Delete Table"
            >
              🗑
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default TableControls;