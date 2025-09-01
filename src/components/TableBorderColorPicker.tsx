import { useState, useCallback } from "react";
import { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface TableBorderColorPickerProps {
  editor: Editor;
}

const TableBorderColorPicker: React.FC<TableBorderColorPickerProps> = ({
  editor,
}) => {
  const { theme } = useTheme();
  const [currentColor, setCurrentColor] = useState("gray");

  const colors = [
    { name: "Gray", value: "gray", hex: "#4b5563" },
    { name: "Red", value: "red", hex: "#ef4444" },
    { name: "Orange", value: "orange", hex: "#f97316" },
    { name: "Yellow", value: "yellow", hex: "#eab308" },
    { name: "Green", value: "green", hex: "#22c55e" },
    { name: "Blue", value: "blue", hex: "#3b82f6" },
    { name: "Purple", value: "purple", hex: "#8b5cf6" },
    { name: "Pink", value: "pink", hex: "#ec4899" },
    { name: "Black", value: "black", hex: "#000000" },
    { name: "White", value: "white", hex: "#ffffff" },
  ];

  const applyBorderColor = useCallback(
    (colorValue: string) => {
      if (editor && editor.isActive("table")) {
        const selectedColor = colors.find((c) => c.value === colorValue);
        if (selectedColor) {
          setCurrentColor(colorValue);

          // Apply border color to the table using CSS custom properties
          const tableElement = editor.view.dom.querySelector(
            "table:not(.borderless-table)"
          ) as HTMLElement;
          if (tableElement) {
            tableElement.style.setProperty(
              "--table-border-color",
              selectedColor.hex
            );
            tableElement.classList.add("custom-border-color");
          }
        }
      }
    },
    [editor, colors]
  );

  const getCurrentColorHex = () => {
    return colors.find((c) => c.value === currentColor)?.hex || "#4b5563";
  };

  return (
    <Select value={currentColor} onValueChange={applyBorderColor}>
      <SelectTrigger className="w-24 h-8 text-xs select-trigger">
        <div className="flex items-center gap-1">
          <SelectValue />
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
        {colors.map((color) => (
          <SelectItem
            key={color.value}
            value={color.value}
            className="select-item"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border border-gray-400"
                style={{ backgroundColor: color.hex }}
              />
              {color.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TableBorderColorPicker;
