import { useCallback, useState, useEffect } from "react";
import { Editor } from "@tiptap/react";

interface ImageControlsProps {
  editor: Editor;
  isImageSelected: boolean;
}

const ImageControls: React.FC<ImageControlsProps> = ({ editor, isImageSelected }) => {
  const [imageWidth, setImageWidth] = useState("");

  const setImageSize = useCallback(
    (size: "small" | "medium" | "large" | "full") => {
      if (editor) {
        // Get current image attributes to preserve other properties
        const { state } = editor;
        const { selection } = state;

        let currentAttrs = {};
        state.doc.nodesBetween(selection.from, selection.to, (node) => {
          if (node.type.name === "image") {
            currentAttrs = node.attrs;
            return false;
          }
        });

        // Set the input field value based on preset size
        let widthValue = "";

        switch (size) {
          case "small":
            widthValue = "200";
            break;
          case "medium":
            widthValue = "400";
            break;
          case "large":
            widthValue = "600";
            break;
          case "full":
            widthValue = "100";
            break;
        }

        // Update the input field
        setImageWidth(widthValue);

        // Clear custom dimensions and set data-size
        const updates = {
          ...currentAttrs,
          "data-size": size,
          width: null, // Remove custom width
          height: null, // Remove custom height
        };

        editor.chain().updateAttributes("image", updates).run();
      }
    },
    [editor]
  );

  const setCustomImageSize = useCallback(() => {
    if (editor && isImageSelected) {
      // Get current image attributes
      const { state } = editor;
      const { selection } = state;

      let currentAttrs = {};
      state.doc.nodesBetween(selection.from, selection.to, (node) => {
        if (node.type.name === "image") {
          currentAttrs = node.attrs;
          return false;
        }
      });

      const updates: any = { ...currentAttrs };

      // Clear data-size to override preset sizes when custom value is set
      if (imageWidth && imageWidth.trim() !== "") {
        updates["data-size"] = null;
      }

      // Set width if provided, otherwise remove
      if (imageWidth && imageWidth.trim() !== "") {
        if (imageWidth === "100" || imageWidth === "100%") {
          updates.width = "100%";
        } else if (!isNaN(Number(imageWidth))) {
          updates.width = `${imageWidth}px`;
        }
        updates["data-custom-size"] = "width-only";
      } else {
        updates.width = null;
        updates["data-custom-size"] = null;
      }

      // Always set height to auto for aspect ratio maintenance
      updates.height = null;

      // Don't focus the editor to avoid stealing focus from inputs
      editor.chain().updateAttributes("image", updates).run();
    }
  }, [editor, imageWidth, isImageSelected]);

  // Auto-apply when width changes
  useEffect(() => {
    if (isImageSelected) {
      setCustomImageSize();
    }
  }, [imageWidth, isImageSelected, setCustomImageSize]);

  if (!isImageSelected) return null;

  return (
    <>
      <div className="toolbar-separator"></div>
      <div className="flex items-center gap-2 bg-gray-700 rounded px-2 py-1">
        <span className="text-xs text-gray-300">Size:</span>
        <button
          onClick={() => setImageSize("small")}
          className="toolbar-button text-xs"
          title="Small (200px)"
        >
          S
        </button>
        <button
          onClick={() => setImageSize("medium")}
          className="toolbar-button text-xs"
          title="Medium (400px)"
        >
          M
        </button>
        <button
          onClick={() => setImageSize("large")}
          className="toolbar-button text-xs"
          title="Large (600px)"
        >
          L
        </button>
        <button
          onClick={() => setImageSize("full")}
          className="toolbar-button text-xs"
          title="Full Width"
        >
          Full
        </button>

        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-gray-600">
          <span className="text-xs text-gray-300">Custom:</span>
          <input
            type="text"
            placeholder="Size"
            value={imageWidth}
            onChange={(e) => setImageWidth(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setCustomImageSize()}
            className="w-16 h-10 px-1 py-0.5 text-xs bg-gray-800 text-white border border-gray-600 rounded"
            title="Width in pixels (100 for full width)"
          />
          <span className="text-xs text-gray-400">px</span>
        </div>
      </div>
    </>
  );
};

export default ImageControls;