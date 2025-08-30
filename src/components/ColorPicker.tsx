import { useState, useRef, useEffect, useCallback } from "react";
import { Editor } from "@tiptap/react";

interface ColorPickerProps {
  editor: Editor;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ editor }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showColorPicker]);

  const setColor = useCallback(
    (color: string) => {
      if (editor) {
        editor.chain().focus().setColor(color).run();
        setCurrentColor(color);
        setShowColorPicker(false);
      }
    },
    [editor]
  );

  const colors = [
    "#ffffff",
    "#f8f9fa",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#6c757d",
    "#495057",
    "#343a40",
    "#212529",
    "#000000",
    "#dc3545",
    "#fd7e14",
    "#ffc107",
    "#28a745",
    "#20c997",
    "#17a2b8",
    "#6f42c1",
    "#e83e8c",
    "#6610f2",
    "#007bff",
    "#0056b3",
  ];

  return (
    <div className="relative" ref={colorPickerRef}>
      <button
        onClick={() => setShowColorPicker(!showColorPicker)}
        className="toolbar-button flex items-center gap-1"
        title="Text Color"
      >
        <span
          className="inline-block w-4 h-4 rounded border border-gray-500"
          style={{ backgroundColor: currentColor }}
        ></span>
        <span className="text-xs">A</span>
      </button>
      {showColorPicker && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-gray-800 rounded-lg shadow-xl border border-gray-600 z-50 min-w-[200px]">
          <div className="text-white text-sm font-medium mb-2">Text Color</div>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setColor(color)}
                className={`w-7 h-7 rounded border-2 hover:border-purple-400 transition-colors ${
                  currentColor === color
                    ? "border-purple-400 ring-2 ring-purple-400 ring-opacity-30"
                    : "border-gray-600"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-600">
            <button
              onClick={() => {
                editor?.chain().focus().unsetColor().run();
                setCurrentColor("#ffffff");
                setShowColorPicker(false);
              }}
              className="w-full text-left px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
            >
              Remove Color
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;