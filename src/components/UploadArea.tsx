"use client";

import { useCallback, useState, useRef } from "react";

interface FilePreview {
  file: File;
  src: string;
  type: 'image';
}

interface UploadAreaProps {
  onUpload: (files: File[]) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState<FilePreview[]>([]);
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

  const handleFiles = useCallback(async (files: File[]) => {
    // For initial upload, only take the first file
    const file = files[0];
    if (!file) return;

    // Validate file
    const isValidImage = file.type.startsWith('image/');
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
    
    if (!isValidImage) {
      alert('Please select a valid image file');
      return;
    }
    
    if (!isValidSize) {
      alert('File is too large (max 5MB)');
      return;
    }

    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      const preview = await new Promise<FilePreview>((resolve) => {
        reader.onload = () => {
          resolve({
            file,
            src: reader.result as string,
            type: 'image'
          });
        };
        reader.readAsDataURL(file);
      });
      
      // If no previews exist, add the first one. Otherwise append to existing
      if (previews.length === 0) {
        setPreviews([preview]);
      } else {
        setPreviews(prev => [...prev, preview]);
      }
    } catch (error) {
      console.error('Preview generation failed:', error);
      alert('Preview generation failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [previews.length]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [handleFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, [handleFiles]);

  const handleClick = useCallback(() => {
    // Clear the input value to allow selecting the same files again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }, []);

  const handleAddMore = useCallback(() => {
    // Create a new input for adding more files
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        handleFiles(files);
      }
    };
    input.click();
  }, [handleFiles]);

  const handleUploadPreviews = useCallback(() => {
    if (previews.length > 0) {
      onUpload(previews.map(p => p.file));
      setPreviews([]);
    }
  }, [previews, onUpload]);

  const removePreview = useCallback((index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearPreviews = useCallback(() => {
    setPreviews([]);
  }, []);

  return (
    <div className="space-y-4">
      {/* Hidden file input - always present in DOM */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {previews.length === 0 ? (
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
          
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-white font-medium">Processing...</p>
              <p className="text-gray-400 text-sm">Generating previews</p>
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
                Select one image, 5MB max
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Supports: JPG, PNG, GIF, WebP
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Preview Section */}
          <div className="bg-gray-700/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Preview ({previews.length} files)</h4>
              <button
                onClick={clearPreviews}
                className="text-gray-400 hover:text-white text-sm"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
              {previews.map((preview, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-3 flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <img
                      src={preview.src}
                      alt={preview.file.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {preview.file.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      image • {(preview.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  
                  <button
                    onClick={() => removePreview(index)}
                    className="flex-shrink-0 text-red-400 hover:text-red-300 p-1"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleUploadPreviews}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Insert Image{previews.length > 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;