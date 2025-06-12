
import { Handle, Position } from 'reactflow';
import { useGlobalNodeStyle } from '../context/GlobalNodeContext.jsx';

export const HandleNode = ({ id, data }) => {
  const { globalStyle, updateGlobalStyle } = useGlobalNodeStyle();
  
  const handleStyles = [
    { name: 'Circle', value: 'circle' },
    { name: 'Square', value: 'square' },
    { name: 'Diamond', value: 'diamond' }
  ];

  const getHandleStyle = (style) => {
    const baseStyle = {
      width: '8px',
      height: '8px',
      border: '1px solid #fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    switch(style) {
      case 'square':
        return { ...baseStyle, borderRadius: '2px', backgroundColor: '#ff7675' };
      case 'diamond':
        return { ...baseStyle, borderRadius: '0', transform: 'rotate(45deg)', backgroundColor: '#fd79a8' };
      default:
        return { ...baseStyle, borderRadius: '50%', backgroundColor: '#74b9ff' };
    }
  };

  return (
    <div style={{ 
      width: 180, 
      minHeight: 100, 
      border: '1px solid #ffeaa7', 
      borderRadius: '10px', 
      backgroundColor: '#ffffff', 
      overflow: 'hidden',
      boxShadow: '0 3px 12px rgba(0, 0, 0, 0.08)',
      fontSize: '13px'
    }}>
      <div style={{ 
        backgroundColor: '#fdcb6e',
        color: '#ffffff',
        padding: '6px 10px',
        fontWeight: '600',
        fontSize: '11px',
        textAlign: 'center',
        marginBottom: '0'
      }}>
        HANDLES
      </div>
      <div style={{
        padding: '8px',
        backgroundColor: '#fffbf0'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: '6px',
          borderRadius: '6px',
          border: '1px solid #ffeaa7'
        }}>
          <div style={{ marginBottom: '6px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '3px', 
              color: '#e17055', 
              fontSize: '10px', 
              fontWeight: '600' 
            }}>
              Handle Style:
            </label>
            <select 
              value={globalStyle.handleStyle}
              onChange={(e) => updateGlobalStyle({ handleStyle: e.target.value })}
              style={{
                width: '100%',
                padding: '3px 6px',
                border: '1px solid #ffeaa7',
                borderRadius: '4px',
                fontSize: '10px',
                backgroundColor: '#ffffff'
              }}
            >
              {handleStyles.map(style => (
                <option key={style.value} value={style.value}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{
            textAlign: 'center',
            fontSize: '8px',
            color: '#e17055',
            fontWeight: '500'
          }}>
            Preview: {handleStyles.find(s => s.value === globalStyle.handleStyle)?.name}
          </div>
        </div>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        style={getHandleStyle(globalStyle.handleStyle)}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={getHandleStyle(globalStyle.handleStyle)}
      />
    </div>
  );
};
