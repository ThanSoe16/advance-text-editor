import { useState, useCallback } from "react";
import { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "../contexts/ThemeContext";

interface ColorPickerProps {
  editor: Editor;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ editor }) => {
  const { theme } = useTheme();
  const [currentColor, setCurrentColor] = useState("#ffffff");

  const setColor = useCallback(
    (color: string) => {
      if (editor) {
        if (editor.state.selection.empty) {
          // No text selected - set color for typing
          editor.chain().focus().setMark("textStyle", { color }).run();
        } else {
          // Text selected - apply color to selection
          editor.chain().focus().setColor(color).run();
        }
        setCurrentColor(color);
      }
    },
    [editor]
  );

  const colors = [
    { name: "White", value: "#ffffff" },
    { name: "Light Grey", value: "#f8f9fa" },
    { name: "Grey", value: "#6c757d" },
    { name: "Dark Grey", value: "#495057" },
    { name: "Charcoal", value: "#343a40" },
    { name: "Black", value: "#000000" },
    { name: "Bright Red", value: "#ff3333" },
    { name: "Red", value: "#dc3545" },
    { name: "Dark Red", value: "#c82333" },
    { name: "Bright Orange", value: "#ff8c00" },
    { name: "Orange", value: "#fd7e14" },
    { name: "Dark Orange", value: "#e5690a" },
    { name: "Bright Yellow", value: "#ffff00" },
    { name: "Yellow", value: "#ffc107" },
    { name: "Gold", value: "#ffd700" },
    { name: "Lime", value: "#32cd32" },
    { name: "Green", value: "#28a745" },
    { name: "Dark Green", value: "#1e7e34" },
    { name: "Mint", value: "#00ffaa" },
    { name: "Teal", value: "#20c997" },
    { name: "Cyan", value: "#00bcd4" },
    { name: "Sky Blue", value: "#87ceeb" },
    { name: "Blue", value: "#007bff" },
    { name: "Dark Blue", value: "#0056b3" },
    { name: "Indigo", value: "#4b0082" },
    { name: "Purple", value: "#6f42c1" },
    { name: "Violet", value: "#8a2be2" },
    { name: "Magenta", value: "#ff00ff" },
    { name: "Pink", value: "#e83e8c" },
    { name: "Hot Pink", value: "#ff1493" },
  ];

  const getCurrentColorName = () => {
    const colorObj = colors.find((c) => c.value === currentColor);
    return colorObj ? colorObj.name : "White";
  };

  return (
    <Select value={currentColor} onValueChange={setColor}>
      <SelectTrigger
        className={`w-10 h-8 text-sm p-1 ${
          theme === "dark"
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        <span
          className="w-4 h-4 rounded border border-gray-500"
          style={{ backgroundColor: currentColor }}
        />
      </SelectTrigger>
      <SelectContent
        className={`p-3 ${theme === "dark" ? "bg-gray-800 " : "bg-white"}`}
      >
        <div
          className={`text-xs mb-3 font-medium ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Text Color
        </div>
        <div className="grid grid-cols-6 gap-2">
          {colors.map((color) => (
            <SelectItem
              key={color.value}
              value={color.value}
              className="p-0 h-auto"
            >
              <button
                className={`w-7 h-7 rounded border-2 transition-colors ${
                  currentColor === color.value
                    ? theme === "dark"
                      ? "border-purple-400 ring-2 ring-purple-400 ring-opacity-30"
                      : "border-blue-400 ring-2 ring-blue-400 ring-opacity-30"
                    : theme === "dark"
                    ? "border-gray-600 hover:border-purple-400"
                    : "border-gray-300 hover:border-blue-400"
                }`}
                style={{ backgroundColor: color.value }}
              />
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
};

export default ColorPicker;
