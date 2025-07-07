import React, { useState } from 'react';

const DraggableWrapper = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      className="absolute cursor-move"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ left: position.x, top: position.y }}
    >
        <div
          onMouseDown={handleMouseDown}
          className="bg-white shadow-lg rounded-lg w-64 border border-gray-300 p-4"
        >
          <h2 className="text-lg font-semibold mb-2">🧲 Drag Me</h2>
          <p className="text-sm text-gray-600">You can click and move this box around the screen.</p>
        </div>

    </div>
  );
};

export default DraggableWrapper;


const initialBoxes = [
  { id: 1, x: 1000, y: 100 },
  { id: 2, x: 300, y: 200 },
  { id: 3, x: 500, y: 100 },
];

export const MultiDraggable = () => {
  const [boxes, setBoxes] = useState(initialBoxes);
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, id, box) => {
    setDraggingId(id);
    setOffset({
      x: e.clientX - box.x,
      y: e.clientY - box.y,
    });
  };

  const handleMouseMove = (e) => {
    if (draggingId === null) return;

    setBoxes(prev =>
      prev.map(box =>
        box.id === draggingId
          ? {
              ...box,
              x: e.clientX - offset.x,
              y: e.clientY - offset.y,
            }
          : box
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  return (
    <div
      className="relative w-screen h-screen bg-gray-100 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {boxes.map((box) => (
        <div
          key={box.id}
          className="absolute w-64 p-4 rounded-lg shadow-md border bg-white cursor-move"
          style={{ left: box.x, top: box.y }}
          onMouseDown={(e) => handleMouseDown(e, box.id, box)}
        >
          <h2 className="font-semibold text-lg mb-1">📦 Box {box.id}</h2>
          <p className="text-sm text-gray-600">Drag this box anywhere.</p>
        </div>
      ))}
    </div>
  );
};


