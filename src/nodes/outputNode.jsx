import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode.jsx';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'value' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="OUTPUT"
      colorBand="#f8a5a5"
      borderColor="#fde8e8"
      backgroundColor="#fffcfc"
      handles={handles}
    >
      <div style={{ marginBottom: '6px' }}>
        <label style={{ display: 'block', marginBottom: '3px', fontSize: '10px', fontWeight: '600' }}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            style={{ 
              width: '100%', 
              marginTop: '2px', 
              padding: '3px 6px',
              border: '1px solid #fee2e2',
              borderRadius: '4px',
              fontSize: '10px',
              backgroundColor: '#ffffff'
            }}
          />
        </label>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '10px', fontWeight: '600' }}>
          Type:
          <select 
            value={outputType} 
            onChange={handleTypeChange} 
            style={{ 
              width: '100%', 
              marginTop: '2px',
              padding: '3px 6px',
              border: '1px solid #fee2e2',
              borderRadius: '4px',
              fontSize: '10px',
              backgroundColor: '#ffffff'
            }}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};