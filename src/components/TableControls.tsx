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

  const addTableRow = useCallback(() => {
    if (editor) {
      editor.chain().focus().addRowAfter().run();
    }
  }, [editor]);

  const deleteTableRow = useCallback(() => {
    if (editor) {
      editor.chain().focus().deleteRow().run();
    }
  }, [editor]);

  const addTableColumn = useCallback(() => {
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
          ⊞
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
              onClick={addTableRow}
              className="toolbar-button text-xs"
              title="Add Row"
            >
              +Row
            </button>
            <button
              onClick={deleteTableRow}
              className="toolbar-button text-xs"
              title="Delete Row"
            >
              -Row
            </button>
            <button
              onClick={addTableColumn}
              className="toolbar-button text-xs"
              title="Add Column"
            >
              +Col
            </button>
            <button
              onClick={deleteTableColumn}
              className="toolbar-button text-xs"
              title="Delete Column"
            >
              -Col
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