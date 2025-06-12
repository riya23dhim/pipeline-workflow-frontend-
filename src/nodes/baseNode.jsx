import { Handle, Position } from 'reactflow';
import { useGlobalNodeStyle } from '../context/GlobalNodeContext.jsx';

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  colorBand, 
  borderColor, 
  backgroundColor, 
  children, 
  handles = [],
  style = {}
}) => {
  const { globalStyle } = useGlobalNodeStyle();

  const getHandleStyle = (handleSpecificStyle) => {
    
    if (handleSpecificStyle && Object.keys(handleSpecificStyle).length > 0) {
      return handleSpecificStyle;
    }

    switch(globalStyle.handleStyle) {
      case 'square':
        return { borderRadius: '1px', backgroundColor: '#ff7675' };
      case 'diamond':
        return { borderRadius: '0', transform: 'rotate(45deg)', backgroundColor: '#fd79a8' };
      default:
        // This is the 'circle' default, now it only sets color and border-radius
        return { borderRadius: '50%', backgroundColor: '#74b9ff' };
    }
  };

  const getAnimationStyle = () => {
    if (!globalStyle.isAnimating) return {};
    
    switch(globalStyle.animation) {
      case 'pulse':
        return { animation: 'pulse 1s ease-in-out' };
      case 'bounce':
        return { animation: 'bounce 1s ease-in-out' };
      case 'fade':
        return { animation: 'fade 1s ease-in-out' };
      default:
        return {};
    }
  };

  
  const finalColorBand = globalStyle.theme ? globalStyle.theme.band : colorBand;
  const finalBorderColor = globalStyle.theme ? globalStyle.theme.border : borderColor;
  const finalBackgroundColor = globalStyle.theme ? globalStyle.theme.bg : backgroundColor;
  const globalBg = globalStyle.backgroundColor || '#ffffff';
  
  return (
    <div style={{ 
      width: 180, // Set a default width, will be overridden by style prop if passed
      minHeight: 0, // Set to 0 to allow minHeight from style prop to take full control
      border: `1px solid ${finalBorderColor}`, 
      borderRadius: '10px', 
      backgroundColor: globalBg, 
      overflow: 'hidden',
      boxShadow: '0 3px 12px rgba(0, 0, 0, 0.08)',
      backdropFilter: 'blur(20px)',
           WebkitBackdropFilter: 'blur(16px)',
      fontSize: '13px',
      ...getAnimationStyle(),
      ...style // Apply the passed style prop here (will override width/minHeight if present)
    }}>
      <div style={{ 
        backgroundColor: finalColorBand,
        color: '#ffffff',
        padding: '6px 10px',
        fontWeight: '600',
        fontSize: '11px',
        textAlign: 'center',
        marginBottom: '0'
      }}>
        {title}
      </div>
      <div style={{
        padding: '6px',
        backgroundColor: globalBg
      }}>
        <div style={{
          backgroundColor: globalBg,
          padding: '6px',
          borderRadius: '6px',
          border: `1px solid ${finalBorderColor}`,
          color: '#374151'
        }}>
          {children}
        </div>
      </div>
      
      {/* Render handles */}
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || index}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={getHandleStyle(handle.style)}
        />
      ))}
    </div>
  );
};
