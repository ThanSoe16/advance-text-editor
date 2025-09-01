import { useCallback } from "react";
import { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableIcon } from "./icons";
import {
  AddRowAboveIcon,
  AddRowBelowIcon,
  AddColumnLeftIcon,
  AddColumnRightIcon,
  DeleteRowIcon,
  DeleteColumnIcon,
} from "./icons/TableIcons";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface TableControlsProps {
  editor: Editor;
}

const TableControls: React.FC<TableControlsProps> = ({ editor }) => {
  const { theme } = useTheme();
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
      {/* Table Insert Select */}
      <Select
        onValueChange={(value) => {
          switch (value) {
            case "2x2":
              addTable(2, 2, false);
              break;
            case "3x3":
              addTable(3, 3, false);
              break;
            case "4x4":
              addTable(4, 4, false);
              break;
            case "3x3-header":
              addTable(3, 3, true);
              break;
            case "2-col":
              addTable(1, 2, false);
              break;
            case "3-col":
              addTable(1, 3, false);
              break;
          }
        }}
      >
        <SelectTrigger className="w-44 h-8 text-sm select-trigger">
          <div className="flex items-center gap-2">
            <TableIcon />
            <SelectValue placeholder="Table" />
          </div>
        </SelectTrigger>
        <SelectContent
          className={cn(
            theme === "dark"
              ? "bg-gray-800 text-gray-300"
              : "bg-white text-gray-900",
            "select-content"
          )}
        >
          <SelectItem value="2x2" className="select-item">
            2×2 Table
          </SelectItem>
          <SelectItem value="3x3" className="select-item">
            3×3 Table
          </SelectItem>
          <SelectItem value="4x4" className="select-item">
            4×4 Table
          </SelectItem>
          <SelectItem value="3x3-header" className="select-item">
            3×3 with Header
          </SelectItem>
          <SelectItem value="2-col" className="select-item">
            2 Column Layout
          </SelectItem>
          <SelectItem value="3-col" className="select-item">
            3 Column Layout
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Table Editing Controls - Show when in table */}
      {editor.isActive("table") && (
        <>
          <div className="toolbar-separator"></div>
          <div className="flex items-center gap-1 table-controls-container rounded px-2 py-1">
            <span className="text-xs table-controls-label mr-2">Table:</span>
            <button
              onClick={addRowAbove}
              className="toolbar-button text-xs"
              title="Insert Row Above"
            >
              <AddRowAboveIcon />
            </button>
            <button
              onClick={addRowBelow}
              className="toolbar-button text-xs"
              title="Insert Row Below"
            >
              <AddRowBelowIcon />
            </button>
            <button
              onClick={addColumnLeft}
              className="toolbar-button text-xs"
              title="Insert Column Left"
            >
              <AddColumnLeftIcon />
            </button>
            <button
              onClick={addColumnRight}
              className="toolbar-button text-xs"
              title="Insert Column Right"
            >
              <AddColumnRightIcon />
            </button>
            <button
              onClick={deleteTableRow}
              className="toolbar-button text-xs text-red-400 hover:text-red-300"
              title="Delete Row"
            >
              <DeleteRowIcon />
            </button>
            <button
              onClick={deleteTableColumn}
              className="toolbar-button text-xs text-red-400 hover:text-red-300"
              title="Delete Column"
            >
              <DeleteColumnIcon />
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
