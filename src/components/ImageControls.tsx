import { Editor } from "@tiptap/react";
import { ImageIcon } from "./icons";

interface ImageControlsProps {
  editor: Editor;
  onAddImage?: () => void;
}

const ImageControls: React.FC<ImageControlsProps> = ({ editor, onAddImage }) => {
  return (
    <button
      onClick={onAddImage}
      className="toolbar-button"
      title="Add Images"
    >
      <ImageIcon />
    </button>
  );
};

export default ImageControls;