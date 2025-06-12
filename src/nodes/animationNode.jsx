
import { Position } from 'reactflow';
import { BaseNode } from './baseNode.jsx';
import { useGlobalNodeStyle } from '../context/GlobalNodeContext.jsx';

export const AnimationNode = ({ id, data }) => {
  const { globalStyle, updateGlobalStyle, triggerGlobalAnimation } = useGlobalNodeStyle();
  
  const animations = [
    { name: 'None', value: 'none' },
    { name: 'Pulse', value: 'pulse' },
    { name: 'Bounce', value: 'bounce' },
    { name: 'Fade', value: 'fade' }
  ];

  

  const handles = [
    { type: 'target', position: Position.Left, id: 'trigger' },
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="ANIMATION"
      colorBand="#a29bfe"
      borderColor="#e17055"
      backgroundColor="#f8f7ff"
      handles={handles}
    >
      <div>
        <select 
          value={globalStyle.animation}
          onChange={(e) => updateGlobalStyle({ animation: e.target.value })}
          style={{
            width: '100%',
            padding: '4px 6px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '10px',
            backgroundColor: '#ffffff',
            marginBottom: '6px'
          }}
        >
          {animations.map(anim => (
            <option key={anim.value} value={anim.value}>
              {anim.name}
            </option>
          ))}
        </select>
        <button
          onClick={triggerGlobalAnimation}
          style={{
            width: '100%',
            padding: '4px',
            backgroundColor: '#a29bfe',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '9px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Test Animation
        </button>
      </div>
    </BaseNode>
  );
};
