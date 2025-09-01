import { useState, useCallback } from "react";
import { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HighlightPickerProps {
  editor: Editor;
}

const HighlightPicker: React.FC<HighlightPickerProps> = ({ editor }) => {
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
      <SelectTrigger className="w-10 h-8 bg-gray-700 border-gray-600 text-gray-300 text-sm p-1">
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
      <SelectContent className="bg-gray-800 border-gray-600 text-gray-300 p-3">
        <div className="text-xs text-gray-400 mb-3 font-medium">Highlight Color</div>
        <div className="grid grid-cols-6 gap-2">
          {colors.map((color) => (
            <SelectItem key={color.value} value={color.value} className="p-0 h-auto">
              <button
                className={`w-7 h-7 rounded border-2 hover:border-purple-400 transition-colors ${
                  (currentHighlight || "none") === color.value
                    ? "border-purple-400 ring-2 ring-purple-400 ring-opacity-30"
                    : "border-gray-600"
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