
import { Position } from 'reactflow';
import { BaseNode } from './baseNode.jsx';
import { useGlobalNodeStyle } from '../context/GlobalNodeContext.jsx';

export const ThemeNode = ({ id, data }) => {
  const { globalStyle, updateGlobalStyle } = useGlobalNodeStyle();
  
  const themes = [
    { name: 'Light', value: 'light', band: '#ffd93d', bg: '#fffef7' },
    { name: 'Dark', value: 'dark', band: '#6c5ce7', bg: '#f8f7ff' },
    { name: 'Warm', value: 'warm', band: '#fd79a8', bg: '#fff5f8' },
    { name: 'Cool', value: 'cool', band: '#74b9ff', bg: '#f7fbff' }
  ];

  const selectedTheme = themes.find(t => t.value === globalStyle.theme?.name?.toLowerCase()) || themes[0];

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="THEME"
      colorBand={selectedTheme.band}
      borderColor="#e9ecef"
      backgroundColor={selectedTheme.bg}
      handles={handles}
    >
      <select 
        value={globalStyle.theme?.name?.toLowerCase() || 'light'}
        onChange={(e) => {
          const selectedTheme = themes.find(t => t.value === e.target.value);
          updateGlobalStyle({ 
            theme: {
              name: selectedTheme.name,
              band: selectedTheme.band,
              bg: selectedTheme.bg,
              border: selectedTheme.value === 'light' ? '#e8e9f3' : 
                     selectedTheme.value === 'dark' ? '#e0e7ff' :
                     selectedTheme.value === 'warm' ? '#fde8e8' : '#e0f2fe'
            }
          });
        }}
        style={{
          width: '100%',
          padding: '4px 6px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '10px',
          backgroundColor: '#ffffff'
        }}
      >
        {themes.map(theme => (
          <option key={theme.value} value={theme.value}>
            {theme.name} Theme
          </option>
        ))}
      </select>
      <div style={{
        marginTop: '6px',
        padding: '4px',
        backgroundColor: globalStyle.theme?.band || '#ffd93d',
        borderRadius: '3px',
        textAlign: 'center',
        color: 'white',
        fontSize: '8px',
        fontWeight: '600'
      }}>
        Active: {globalStyle.theme?.name || 'Light'}
      </div>
    </BaseNode>
  );
};
