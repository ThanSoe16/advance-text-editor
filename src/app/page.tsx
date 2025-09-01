"use client";

import { useState } from "react";
import AdvancedTipTapEditor from "@/components/AdvancedTipTapEditor";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import "../styles/tiptap.css";

function HomeContent() {
  const { theme } = useTheme();
  const [content, setContent] = useState("");

  return (
    <div className={`min-h-screen py-8 ${
      theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Advanced TipTap Editor
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Professional rich-text editor with theme support, media upload & social embeds
          </p>
        </div>

        <AdvancedTipTapEditor 
          value={content}
          onChange={setContent}
          placeholder="Start writing your masterpiece..."
        />

        <div className="mt-8 text-center">
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Features: Rich formatting • File upload • Social media embeds • Tables • Code blocks
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
