import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode.jsx';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    { type: 'source', position: Position.Right, id: 'value' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="INPUT"
      colorBand="#a8c5f0"
      borderColor="#e8e9f3"
      backgroundColor="#fcfdff"
      handles={handles}
    >
      <div style={{ marginBottom: '6px' }}>
        <label style={{ display: 'block', marginBottom: '3px', color: '#6366f1', fontSize: '10px', fontWeight: '600' }}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            style={{ 
              width: '100%', 
              marginTop: '2px', 
              padding: '3px 6px',
              border: '1px solid #e0e7ff',
              borderRadius: '4px',
              fontSize: '10px',
              backgroundColor: '#ffffff'
            }}
          />
        </label>
      </div>
      <div>
        <label style={{ display: 'block', color: '#6366f1', fontSize: '10px', fontWeight: '600' }}>
          Type:
          <select 
            value={inputType} 
            onChange={handleTypeChange} 
            style={{ 
              width: '100%', 
              marginTop: '2px',
              padding: '3px 6px',
              border: '1px solid #e0e7ff',
              borderRadius: '4px',
              fontSize: '10px',
              backgroundColor: '#ffffff'
            }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};