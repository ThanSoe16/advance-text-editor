import { useCallback, useState, useEffect } from "react";
import { Editor } from "@tiptap/react";

interface IframeControlsProps {
  editor: Editor;
  isIframeSelected: boolean;
}

const IframeControls: React.FC<IframeControlsProps> = ({
  editor,
  isIframeSelected,
}) => {
  const [iframeWidth, setIframeWidth] = useState("");
  const [iframeHeight, setIframeHeight] = useState("");

  // Update input values when iframe is selected
  useEffect(() => {
    if (!editor || !isIframeSelected) return;

    const { state } = editor;
    const { selection } = state;
    
    state.doc.nodesBetween(selection.from, selection.to, (node) => {
      if (node.type.name === "iframe") {
        const currentWidth = String(node.attrs.width || "100");
        const currentHeight = String(node.attrs.height || "315");
        
        // Remove % or px from width for display
        const widthValue = currentWidth.replace('%', '').replace('px', '');
        const heightValue = currentHeight.replace('px', '');
        
        setIframeWidth(widthValue);
        setIframeHeight(heightValue);
        return false;
      }
    });
  }, [editor, isIframeSelected]);

  const updateIframeSize = useCallback(() => {
    if (!editor || !isIframeSelected) return;

    if (iframeWidth && iframeHeight) {
      const widthStr = String(iframeWidth);
      const width = widthStr.includes('%') ? widthStr : `${widthStr}%`;
      const height = `${iframeHeight}px`;
      
      editor
        .chain()
        .updateAttributes("iframe", {
          width: width,
          height: height,
          style: `max-width: 100%; border-radius: 8px; margin: 1rem 0; width: ${width}; height: ${height};`
        })
        .run();
    }
  }, [editor, isIframeSelected, iframeWidth, iframeHeight]);

  // Auto-apply when dimensions change
  useEffect(() => {
    if (isIframeSelected && iframeWidth && iframeHeight) {
      updateIframeSize();
    }
  }, [iframeWidth, iframeHeight, isIframeSelected, updateIframeSize]);

  const deleteIframe = useCallback(() => {
    if (!editor || !isIframeSelected) return;

    const { state } = editor;
    const { selection } = state;
    
    // Find and delete the selected iframe
    state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
      if (node.type.name === "iframe") {
        editor
          .chain()
          .focus()
          .deleteRange({ from: pos, to: pos + node.nodeSize })
          .run();
        return false;
      }
    });
  }, [editor, isIframeSelected]);

  if (!isIframeSelected) return null;

  return (
    <>
      <div className="toolbar-separator"></div>
      <div className="flex items-center gap-2 bg-gray-700 rounded px-2 py-1">
        <span className="text-xs text-gray-300">Video:</span>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">W:</span>
          <input
            type="text"
            placeholder="100"
            value={iframeWidth}
            onChange={(e) => setIframeWidth(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateIframeSize()}
            className="w-12 h-6 px-1 text-xs bg-gray-800 text-white border border-gray-600 rounded"
            title="Width as percentage (e.g., 100 for 100%)"
          />
          <span className="text-xs text-gray-400">%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">H:</span>
          <input
            type="text"
            placeholder="315"
            value={iframeHeight}
            onChange={(e) => setIframeHeight(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateIframeSize()}
            className="w-12 h-6 px-1 text-xs bg-gray-800 text-white border border-gray-600 rounded"
            title="Height in pixels"
          />
          <span className="text-xs text-gray-400">px</span>
        </div>
        <button
          onClick={deleteIframe}
          className="toolbar-button text-red-400 hover:text-red-300 ml-1"
          title="Delete Video"
        >
          🗑️
        </button>
      </div>
    </>
  );
};

export default IframeControls;