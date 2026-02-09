import KanbanBoard from "../components/KanbanBoard";

export default function KanbanPage() {
  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-center" style={{color: "#fff"}}>Kanban Board</h2>
      <KanbanBoard />
    </div>
  );
}