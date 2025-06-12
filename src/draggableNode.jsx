import { useState } from 'react';

export const DraggableNode = ({ type, label }) => {
  const [hovered, setHovered] = useState(false);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node ${type} ${hovered ? 'hovered' : ''}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
