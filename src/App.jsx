import { PipelineToolbar } from './toolbar.jsx';
import { PipelineUI } from './ui.jsx';
import { SubmitButton } from './submit.jsx';
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <ReactFlowProvider>
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{ 
          display: 'flex', 
          flex: 1,
          position: 'relative'
        }}>
       
          <div style={{
           width: '140px',
           zIndex: 10,
           overflow: 'auto',
      
           backdropFilter: 'blur(16px)',
           WebkitBackdropFilter: 'blur(16px)',
           background:'rgb(238, 236, 241)', 
           border: '1px solid rgba(84, 69, 93, 0.11)',
           boxShadow: '2px 6px 30px rgba(35, 8, 41, 0.16)'
          }}>
            <PipelineToolbar />
          </div>

          {/* Main ReactFlow area */}
          <div style={{ flex: 1, position: 'relative' }}>
            <PipelineUI />
          </div>
        </div>
        
        {/* Submit button at bottom */}
        <div >
          <SubmitButton />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App; 