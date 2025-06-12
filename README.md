# Pipeline Workflow Frontend

A modern, interactive web application for building and visualizing pipeline workflows using React Flow. This project provides an intuitive drag-and-drop interface for creating, managing, and validating pipeline workflows.

## Features

- 🎨 Interactive drag-and-drop interface
- 🔄 Real-time pipeline visualization
- 📊 Multiple node types support
- 🔗 Dynamic edge connections
- ✅ Pipeline validation
- 🎯 DAG (Directed Acyclic Graph) validation
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast and responsive design

## Tech Stack

### Frontend
- React 18
- React Flow
- Tailwind CSS
- NextUI Components
- Zustand (State Management)
- React Hook Form
- Zod (Validation)

### Backend
- FastAPI
- NetworkX (Graph validation)
- Pydantic (Data validation)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.9+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/riya23dhim/pipeline-workflow-frontend-.git
cd pipeline-workflow-frontend-
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### Running the Application

1. Start the frontend development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`

2. Start the backend server:
```bash
cd src/backend
uvicorn main:app --reload
```
The backend API will be available at `http://localhost:8000`

## Project Structure

```
pipeline-workflow-frontend/
├── src/
│   ├── backend/         # FastAPI backend
│   ├── nodes/           # Custom node components
│   ├── context/         # React context providers
│   ├── lib/            # Utility functions
│   └── components/     # Reusable UI components
├── public/             # Static assets
└── package.json        # Frontend dependencies
```

## Features in Detail

### Node Types
- Input Nodes
- Output Nodes
- Data Flow Nodes
- LLM Nodes
- Animation Nodes
- Background Nodes
- Text Nodes
- Theme Nodes

### Pipeline Validation
- DAG validation
- Node connection validation
- Data flow validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Flow for the amazing visualization library
- FastAPI for the robust backend framework
- Tailwind CSS for the beautiful UI components