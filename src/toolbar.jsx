// toolbar.js

import { DraggableNode } from './draggableNode.jsx';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <h3 style={{ 
                margin: '0 0 12px 0', 
                color: '#333',
                fontSize: '15px',
                fontWeight: '600',
            
            }}>
                Components
            </h3>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px' 
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='background' label='Background' />
                <DraggableNode type='theme' label='Theme' />
                <DraggableNode type='handle' label='Handles' />
                <DraggableNode type='animation' label='Animation' />
                <DraggableNode type='dataFlow' label='Data Flow' />
            </div>
        </div>
    );
};