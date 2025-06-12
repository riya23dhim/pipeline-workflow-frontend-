import { Position } from 'reactflow';
import { BaseNode } from './baseNode.jsx';
import { useGlobalNodeStyle } from '../context/GlobalNodeContext.jsx';

export const BackgroundNode = ({ id, data }) => {
  const { globalStyle, updateGlobalStyle } = useGlobalNodeStyle();

  const backgroundColors = [
    { name: 'Snow', value: '#fffafa' },
    { name: 'Cream', value: '#f5f5dc' },
    { name: 'Mint', value: '#f0fff0' },
    { name: 'Lavender', value: '#f8f8ff' }
  ];

  const handleColorChange = (color) => {
    updateGlobalStyle({ backgroundColor: color });
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="BACKGROUND"
      colorBand="#a8b8c8"
      borderColor="#e1e5e9"
      backgroundColor="#fafbfc"
      handles={handles}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
        {backgroundColors.map(color => (
          <button
            key={color.value}
            onClick={() => handleColorChange(color.value)}
            style={{
              padding: '6px',
              backgroundColor: color.value,
              border: globalStyle.backgroundColor === color.value ? '2px solid #22d3ee' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              color: '#555'
            }}
          >
            {color.name}
          </button>
        ))}
      </div>
    </BaseNode>
  );
};