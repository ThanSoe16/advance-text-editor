"use client";

import { useCallback, useState, useRef } from "react";

interface UploadAreaProps {
  onUpload: (files: File[]) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, []);

  const handleFiles = useCallback(async (files: File[]) => {
    // Filter and validate files
    const validFiles = files.filter(file => {
      const isValidImage = file.type.startsWith('image/');
      const isValidVideo = file.type.startsWith('video/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidImage && !isValidVideo) {
        console.warn(`File ${file.name} is not a valid image or video`);
        return false;
      }
      
      if (!isValidSize) {
        console.warn(`File ${file.name} is too large (max 5MB)`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length > 3) {
      alert('Maximum 3 files allowed');
      return;
    }

    if (validFiles.length === 0) {
      alert('No valid files selected');
      return;
    }

    setIsUploading(true);
    
    try {
      // Simulate upload progress
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpload(validFiles);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [onUpload]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div
      className={`
        border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
        ${isDragOver 
          ? 'border-purple-400 bg-purple-900/20' 
          : 'border-gray-600 bg-gray-700/30'
        }
        ${isUploading ? 'pointer-events-none opacity-50' : 'hover:border-purple-400 hover:bg-purple-900/10'}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {isUploading ? (
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-white font-medium">Uploading...</p>
          <p className="text-gray-400 text-sm">Please wait</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 mb-4 text-gray-400">
            📁
          </div>
          <p className="text-white font-medium mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-gray-400 text-sm">
            Maximum 3 files, 5MB each
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Supports: JPG, PNG, GIF, WebP, MP4, WebM
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadArea;