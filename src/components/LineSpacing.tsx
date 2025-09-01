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

interface LineSpacingProps {
  editor: Editor;
}

const LineSpacing: React.FC<LineSpacingProps> = ({ editor }) => {
  const { theme } = useTheme();
  const [currentSpacing, setCurrentSpacing] = useState("1.5");

  const setLineSpacing = useCallback(
    (spacing: string) => {
      if (editor) {
        const editorElement = editor.view.dom;
        editorElement.style.lineHeight = spacing;
        setCurrentSpacing(spacing);
      }
    },
    [editor]
  );

  const spacingOptions = [
    { name: "1.0", value: "1.0" },
    { name: "1.15", value: "1.15" },
    { name: "1.5", value: "1.5" },
    { name: "2.0", value: "2.0" },
    { name: "2.5", value: "2.5" },
    { name: "3.0", value: "3.0" },
  ];

  return (
    <Select value={currentSpacing} onValueChange={setLineSpacing}>
      <SelectTrigger className="w-20 h-8 text-sm select-trigger">
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        className={cn(
          theme === "dark"
            ? "bg-gray-800 text-gray-300"
            : "bg-white text-gray-900",
          "select-content"
        )}
      >
        {spacingOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="select-item"
          >
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LineSpacing;
