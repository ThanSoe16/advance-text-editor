import { useCallback } from "react";
import { Editor } from "@tiptap/react";
import { LinkIcon } from "./icons";

interface LinkControlsProps {
  editor: Editor;
}

const LinkControls: React.FC<LinkControlsProps> = ({ editor }) => {
  const addLink = useCallback(() => {
    const url = window.prompt("Enter URL:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  return (
    <button
      onClick={addLink}
      className={`toolbar-button ${editor.isActive("link") ? "active" : ""}`}
      title="Insert Link"
    >
      <LinkIcon />
    </button>
  );
};

export default LinkControls;