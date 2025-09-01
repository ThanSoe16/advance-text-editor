import { useCallback } from "react";
import { Editor } from "@tiptap/react";
import { VideoIcon } from "./icons";

interface VideoControlsProps {
  editor: Editor;
}

const VideoControls: React.FC<VideoControlsProps> = ({ editor }) => {
  const addVideoLink = useCallback(() => {
    const url = window.prompt("Enter video URL (YouTube, TikTok, Facebook, Vimeo):");
    if (url && editor) {
      let embedUrl = url;
      let isValidVideo = false;
      
      // YouTube
      if (url.includes('youtube.com/watch') && url.includes('v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
          isValidVideo = true;
        }
      } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
          isValidVideo = true;
        }
      }
      // TikTok
      else if (url.includes('tiktok.com') && url.includes('/video/')) {
        const videoId = url.split('/video/')[1]?.split('?')[0];
        if (videoId) {
          embedUrl = `https://www.tiktok.com/embed/v2/${videoId}`;
          isValidVideo = true;
        }
      }
      // Facebook
      else if (url.includes('facebook.com') || url.includes('fb.watch')) {
        const encodedUrl = encodeURIComponent(url);
        embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false`;
        isValidVideo = true;
      }
      // Vimeo
      else if (url.includes('vimeo.com/')) {
        const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
        if (videoId && !isNaN(Number(videoId))) {
          embedUrl = `https://player.vimeo.com/video/${videoId}`;
          isValidVideo = true;
        }
      }
      
      if (!isValidVideo) {
        alert("Invalid video URL. Please use YouTube, TikTok, Facebook, or Vimeo links.");
        return;
      }
      
      const width = window.prompt("Enter width (%):", "100") || "100";
      const height = window.prompt("Enter height (px):", "315") || "315";
      
      const finalWidth = String(width).includes('%') ? width : `${width}%`;
      const iframeHtml = `<iframe src="${embedUrl}" width="${finalWidth}" height="${height}" frameborder="0" allowfullscreen style="max-width: 100%; border-radius: 8px; margin: 1rem 0; width: ${finalWidth}; height: ${height}px;"></iframe>`;
      editor.chain().focus().insertContent(iframeHtml).run();
    }
  }, [editor]);

  return (
    <button
      onClick={addVideoLink}
      className="toolbar-button"
      title="Insert Video"
    >
      <VideoIcon />
    </button>
  );
};

export default VideoControls;