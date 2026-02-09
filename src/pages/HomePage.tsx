import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Assignment</h1>
        <p>Choose the component to explore more</p>

        <div className="card-grid">
          <div className="nav-card tree d-flex flex-column justify-content-between" onClick={() => navigate("/tree")}>
            <h2> Tree Component</h2>
            <p>
              Expandable tree view with lazy loading, editing,
              drag & drop, and hierarchy management.
            </p>
            <button>Go to Tree View</button>
          </div>

          <div className="nav-card kanban d-flex flex-column justify-content-between" onClick={() => navigate("/kanban")}>
            <h2> Kanban Board</h2>
            <p>
              Drag and drop task management with
              Todo, In Progress, and Done columns.
            </p>
            <button>Go to Kanban Board</button>
          </div>
        </div>
      </div>
    </div>
  );
}
