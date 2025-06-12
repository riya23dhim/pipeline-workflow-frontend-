from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 
from typing import List, Dict
import networkx as nx

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str
    type: str
    data: Dict

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    # Number of nodes and edges
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)


    G = nx.DiGraph()


    for node in pipeline.nodes:
        G.add_node(node.id)


    for edge in pipeline.edges:
        G.add_edge(edge.source, edge.target)

   
    is_dag = nx.is_directed_acyclic_graph(G)


    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
