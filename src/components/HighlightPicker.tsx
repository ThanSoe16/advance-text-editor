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

interface HighlightPickerProps {
  editor: Editor;
}

const HighlightPicker: React.FC<HighlightPickerProps> = ({ editor }) => {
  const { theme } = useTheme();
  const [currentHighlight, setCurrentHighlight] = useState("");

  const setHighlight = useCallback(
    (color: string) => {
      if (editor) {
        if (color === "none") {
          editor.chain().focus().unsetHighlight().run();
          setCurrentHighlight("");
        } else {
          editor.chain().focus().setHighlight({ color }).run();
          setCurrentHighlight(color);
        }
      }
    },
    [editor]
  );

  const colors = [
    { name: "None", value: "none" },
    { name: "Yellow", value: "#ffff00" },
    { name: "Green", value: "#90ee90" },
    { name: "Blue", value: "#87ceeb" },
    { name: "Pink", value: "#ffb6c1" },
    { name: "Orange", value: "#ffd700" },
    { name: "Purple", value: "#dda0dd" },
    { name: "Red", value: "#ffa0a0" },
    { name: "Cyan", value: "#afeeee" },
    { name: "Lime", value: "#98fb98" },
    { name: "Lavender", value: "#e6e6fa" },
    { name: "Peach", value: "#ffdab9" },
  ];

  return (
    <Select value={currentHighlight || "none"} onValueChange={setHighlight}>
      <SelectTrigger className={`w-10 h-8 text-sm p-1 ${
        theme === 'dark' 
          ? 'bg-gray-700 border-gray-600 text-gray-300' 
          : 'bg-white border-gray-300 text-gray-900'
      }`}>
        <span
          className="w-4 h-4 rounded border border-gray-500"
          style={{ 
            backgroundColor: currentHighlight || "#transparent",
            backgroundImage: currentHighlight ? "none" : "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
            backgroundSize: currentHighlight ? "auto" : "4px 4px",
            backgroundPosition: currentHighlight ? "auto" : "0 0, 0 2px, 2px -2px, -2px 0px"
          }}
        />
      </SelectTrigger>
      <SelectContent className={`p-3 ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-600 text-gray-300'
          : 'bg-white border-gray-300 text-gray-900'
      }`}>
        <div className={`text-xs mb-3 font-medium ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>Highlight Color</div>
        <div className="grid grid-cols-6 gap-2">
          {colors.map((color) => (
            <SelectItem key={color.value} value={color.value} className="p-0 h-auto">
              <button
                className={`w-7 h-7 rounded border-2 transition-colors ${
                  (currentHighlight || "none") === color.value
                    ? theme === 'dark'
                      ? "border-purple-400 ring-2 ring-purple-400 ring-opacity-30"
                      : "border-blue-400 ring-2 ring-blue-400 ring-opacity-30"
                    : theme === 'dark'
                      ? "border-gray-600 hover:border-purple-400"
                      : "border-gray-300 hover:border-blue-400"
                }`}
                style={{ 
                  backgroundColor: color.value === "none" ? "transparent" : color.value,
                  backgroundImage: color.value === "none" ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)" : "none",
                  backgroundSize: color.value === "none" ? "4px 4px" : "auto",
                  backgroundPosition: color.value === "none" ? "0 0, 0 2px, 2px -2px, -2px 0px" : "auto"
                }}
              />
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
};

export default HighlightPicker;