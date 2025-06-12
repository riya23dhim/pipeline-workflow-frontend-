import { Position } from 'reactflow';
import { BaseNode } from './baseNode.jsx';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'system',  },
    { type: 'target', position: Position.Left, id: 'prompt',  },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      colorBand="#c4a1e0"
      borderColor="#f3e8ff"
      backgroundColor="#fefbff"
      handles={handles}
    >
      <div style={{ 
        fontSize: '10px',
        lineHeight: '1.4',
        fontWeight: '500'
      }}>
        Large Language Model for text processing and generation.
      </div>
    </BaseNode>
  );
};