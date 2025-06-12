import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode.jsx';


export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const [inputHandles, setInputHandles] = useState([]);
  const [textAreaHeight, setTextAreaHeight] = useState(50);
  const [nodeWidth, setNodeWidth] = useState(180); 
  const textAreaRef = useRef(null); 


  

  const updateInputHandles = (text) => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}?/g;
    const matches = [...text.matchAll(regex)];
    const uniqueVars = [...new Set(matches.map((match) => match[1]))];

    const newHandles = uniqueVars.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: variable,
     
      style: { top: `${(index + 1) * (100 / (uniqueVars.length + 1))}%`, borderRadius: '50%', backgroundColor: '#74b9ff' },
    }));

    setInputHandles(newHandles);
  };

  useEffect(() => {
    updateInputHandles(currText);


    if (textAreaRef.current) {
      if (textAreaRef.current) {
        const newHeight = Math.max(50, textAreaRef.current.scrollHeight);
        setTextAreaHeight(newHeight);
      } 
      
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };


  const allHandles = [
    ...inputHandles,
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
   
    },
  ];

 
  const titleBarHeight = 25; 
  const contentPadding = 12;
  const labelMarginBottom = 8; 
  const textAreaMarginTop = 2; 
  

  const staticContentCalculatedHeight = titleBarHeight + contentPadding + labelMarginBottom + textAreaHeight + textAreaMarginTop;

  const handleBuffer = 5; 

  const calculatedNodeMinHeight = Math.max(
    staticContentCalculatedHeight + 20, 

    inputHandles.length > 0 ? (staticContentCalculatedHeight + inputHandles.length * handleBuffer) : staticContentCalculatedHeight + 20
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="TEXT"
      colorBand="#86d3a5"
      borderColor="#d1fae5"
      backgroundColor="#fdfffe"
      handles={allHandles}
    
      style={{ minHeight: `${calculatedNodeMinHeight}px`, width: `${nodeWidth}px` }}
    >
      <div style={{ marginBottom: '8px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '3px',
            fontSize: '10px',
            fontWeight: '600',
          }}
        >
          Text:
          <textarea
            ref={textAreaRef} 
            value={currText}
            onChange={handleTextChange}
            style={{
              width: '100%',
              height: `${textAreaHeight}px`,
              marginTop: '2px',
              resize: 'none',
              padding: '3px 6px',
              border: '1px solid #d1fae5',
              borderRadius: '4px',
              fontSize: '10px',
              fontFamily: 'inherit',
              backgroundColor: '#ffffff',
              overflow:'hidden'
            }}
            placeholder="Enter text with variables like {{input}}"
          />
        </label>
      </div>
    </BaseNode>
  );
};