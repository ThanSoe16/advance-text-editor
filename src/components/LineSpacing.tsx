import { useState, useCallback } from "react";
import { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LineSpacingProps {
  editor: Editor;
}

const LineSpacing: React.FC<LineSpacingProps> = ({ editor }) => {
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
      <SelectTrigger className="w-20 h-8 bg-gray-700 border-gray-600 text-gray-300 text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-600 text-gray-300">
        {spacingOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-gray-300 focus:bg-gray-700 focus:text-white"
          >
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LineSpacing;
