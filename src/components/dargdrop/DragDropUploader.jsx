import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const MAX_IMAGES = 5;

const DragDropUploader = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const currentCount = files.length;
    const validImages = Array.from(selectedFiles).filter(file => file.type.startsWith('image/'));

    if (currentCount + validImages.length > MAX_IMAGES) {
      toast.warn(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const newPreviews = validImages.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles(prev => [...prev, ...newPreviews]);
    toast.success(`${newPreviews.length} image(s) added!`);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };

  const removeImage = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
    toast.info('Image removed.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <div
        className="w-full max-w-xl h-52 border-4 border-dashed border-blue-400 flex flex-col items-center justify-center text-gray-600 text-lg rounded-lg cursor-pointer hover:bg-blue-50 transition"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
      >
        <p className="font-medium">Drag & Drop Images Here</p>
        <p className="text-sm">or click to select manually</p>
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* Image Previews */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {files.map((item, idx) => (
          <div key={idx} className="relative group">
            <img
              src={item.preview}
              alt={`upload-${idx}`}
              className="h-40 w-40 object-cover rounded-md shadow-md"
            />
            <button
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-transparent text-red-500 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition hover:bg-red-600 hover:text-white"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDropUploader;