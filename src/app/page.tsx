"use client";

import { useState } from "react";
import AdvancedTipTapEditor from "@/components/AdvancedTipTapEditor";
import "../styles/tiptap.css";

export default function Home() {
  const [content, setContent] = useState("");

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Advanced TipTap Editor
          </h1>
          <p className="text-gray-400 text-lg">
            Professional rich-text editor with dark theme, media upload & social embeds
          </p>
        </div>

        <AdvancedTipTapEditor 
          value={content}
          onChange={setContent}
          placeholder="Start writing your masterpiece..."
        />

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Features: Rich formatting • File upload • Social media embeds • Tables • Code blocks
          </p>
        </div>
      </div>
    </div>
  );
}
