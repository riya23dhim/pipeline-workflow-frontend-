// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, { 
  Background,
  Controls,
  MiniMap,
  Panel
} from 'reactflow';
import { useStore } from './store.jsx';
import { InputNode } from './nodes/inputNode.jsx';
import { LLMNode } from './nodes/llmNode.jsx';
import { OutputNode } from './nodes/outputNode.jsx';
import { TextNode } from './nodes/textNode.jsx';
import { BackgroundNode } from './nodes/backgroundNode.jsx';
import { ThemeNode } from './nodes/themeNode.jsx';
import { HandleNode } from './nodes/handleNode.jsx';
import { AnimationNode } from './nodes/animationNode.jsx';
import { DataFlowNode } from './nodes/dataFlowNode.jsx';
import { GlobalNodeProvider } from './context/GlobalNodeContext.jsx';

import 'reactflow/dist/style.css';

const gridSize = 10;
const proOptions = { hideAttribution: true };

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const getNodeID = useStore((state) => state.getNodeID);
    const addNode = useStore((state) => state.addNode);
    const onNodesChange = useStore((state) => state.onNodesChange);
    const onEdgesChange = useStore((state) => state.onEdgesChange);
    const onConnect = useStore((state) => state.onConnect);

    const nodeTypes = useMemo(() => ({
      customInput: InputNode,
      llm: LLMNode,
      customOutput: OutputNode,
      text: TextNode,
      background: BackgroundNode,
      theme: ThemeNode,
      handle: HandleNode,
      animation: AnimationNode,
      dataFlow: DataFlowNode,
    }), []);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();

          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }

            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };

            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
      <GlobalNodeProvider>
      <div className="glow-overlay"></div>
        <div ref={reactFlowWrapper} style={{width: '100%', height: '100%'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                fitView
            >
                <Panel position="top-right">
                    <Controls />
                </Panel>
                <Panel position="bottom-right">
                    <MiniMap  nodeColor={() => '#919191'} style={{position:'fixed',bottom:'1rem'}} />
                </Panel>
                <Background color="#aaa" gap={gridSize} />
            </ReactFlow>
        </div>
        </GlobalNodeProvider>
    )
}