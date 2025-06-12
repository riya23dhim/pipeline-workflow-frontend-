
import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode.jsx';

export const DataFlowNode = ({ id, data }) => {
  const [flowRate, setFlowRate] = useState(data?.flowRate || 'medium');
  const [isFlowing, setIsFlowing] = useState(false);
  const [dataCount, setDataCount] = useState(0);
  
  const flowRates = [
    { name: 'Slow', value: 'slow', speed: 2000 },
    { name: 'Medium', value: 'medium', speed: 1000 },
    { name: 'Fast', value: 'fast', speed: 500 }
  ];

  useEffect(() => {
    if (isFlowing) {
      const currentRate = flowRates.find(r => r.value === flowRate);
      const interval = setInterval(() => {
        setDataCount(prev => prev + 1);
      }, currentRate.speed);
      
      return () => clearInterval(interval);
    }
  }, [isFlowing, flowRate]);

  const toggleFlow = () => {
    setIsFlowing(!isFlowing);
    if (!isFlowing) setDataCount(0);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'input', style: { top: '30%' } },
    { type: 'target', position: Position.Left, id: 'control', style: { top: '70%' } },
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="DATA FLOW"
      colorBand="#00b894"
      borderColor="#00cec9"
      backgroundColor="#f0fffe"
      handles={handles}
    >
      <div>
        <div style={{ marginBottom: '6px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '3px', 
            color: '#00b894', 
            fontSize: '10px', 
            fontWeight: '600' 
          }}>
            Flow Rate:
          </label>
          <select 
            value={flowRate}
            onChange={(e) => setFlowRate(e.target.value)}
            style={{
              width: '100%',
              padding: '3px 6px',
              border: '1px solid #00cec9',
              borderRadius: '4px',
              fontSize: '10px',
              backgroundColor: '#ffffff'
            }}
          >
            {flowRates.map(rate => (
              <option key={rate.value} value={rate.value}>
                {rate.name}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={toggleFlow}
          style={{
            width: '100%',
            padding: '4px',
            backgroundColor: isFlowing ? '#e17055' : '#00b894',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '9px',
            cursor: 'pointer',
            fontWeight: '600',
            marginBottom: '4px'
          }}
        >
          {isFlowing ? 'Stop' : 'Start'} Flow
        </button>
        
        <div style={{
          textAlign: 'center',
          fontSize: '8px',
          color: '#00b894',
          fontWeight: '500'
        }}>
          Processed: {dataCount} items
        </div>
      </div>
    </BaseNode>
  );
};
