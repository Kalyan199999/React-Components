import React, { useState } from 'react';

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter(file => file.type.startsWith('image/'));

    const newPreviews = validImages.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(prev => [...prev, ...newPreviews]);
  };

  const handleRemove = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleImageClick = (img) => {
    setSelectedImage(img.preview);
    setZoom(1); // Reset zoom when opening
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.2, 1));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Upload Multiple Images</h2>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="mb-4"
      />

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((img, index) => (
            <div key={index} className="relative group cursor-pointer">
              <img
                src={img.preview}
                alt={`Preview ${index}`}
                className="w-full h-28 object-cover rounded border"
                onClick={() => handleImageClick(img)}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-3xl w-full p-4 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded"
            >
              X
            </button>

            {/* Zoom Controls */}
            <div className="flex justify-center gap-3 mb-3">
              <button
                onClick={handleZoomOut}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              >
                − Zoom Out
              </button>
              <button
                onClick={handleZoomIn}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              >
                + Zoom In
              </button>
            </div>

            {/* Image Preview */}
            <div className="overflow-auto flex justify-center">
              <img
                src={selectedImage}
                alt="Selected"
                style={{ transform: `scale(${zoom})` }}
                className="transition-transform duration-200 max-h-[80vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
