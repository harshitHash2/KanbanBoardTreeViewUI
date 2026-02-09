

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import 'bootstrap/dist/css/bootstrap.min.css';
import TreePage from './pages/TreePage';
import KanbanPage from './pages/KanbanPage';
import HomePage from './pages/HomePage';

function App() {
  

  return (
    <>
    {/* <div className="d-flex">
      <div className='col-6'>
      <h2>Tree View Component</h2>
      <TreeView />
    </div>
    <div className='col-6'>
       <KanbanBoard />;
    </div>
    </div> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tree" element={<TreePage />} />
        <Route path="/kanban" element={<KanbanPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
