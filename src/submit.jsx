// submit.js
import { Bounce, Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { Button } from "@nextui-org/react";
import { useCallback } from "react";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = useCallback(async () => {
    try {
      const response = await fetch(
        "http://0.0.0.0:8000/pipelines/parse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nodes, edges }),
        }
      );

      const result = await response.json();

      toast.success(
        <div className="flex flex-col p-1 text-base gap-1">
          <span>
            <b>Nodes:</b> {result.num_nodes}
          </span>
          <span>
            <b>Edges: </b>
            {result.num_edges}
          </span>
          <span>
            <b>Is DAG: </b>
            {result.is_dag ? "Yes" : "No"}
          </span>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    } catch (error) {
      console.error("Error submitting the pipeline:", error);
      toast.error("Submission failed! Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [nodes, edges]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      bottom: '30px',
      left: '0',
      right: '0'
    }}>
      <Button 
        onPress={handleSubmit} 
        color="primary" 
        size="lg" 
        disableRipple
        type="submit" 
        style={{
          backgroundColor: 'rgba(181, 162, 211, 0.73)',
          padding: '12px 50px',
          borderRadius: '10px',
          border:'1px solid rgba(195, 177, 208, 0.81)',
          fontSize:'17px',
          outline:'none'
        }}
      >
        Submit
      </Button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};