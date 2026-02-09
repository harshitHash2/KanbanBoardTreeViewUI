import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";
import type { ColumnModel } from "../types/kanban";
import { Plus } from 'lucide-react';
interface Props {
  column: ColumnModel;
  setColumns: React.Dispatch<React.SetStateAction<ColumnModel[]>>;
}

export default function Column({ column, setColumns }: Props) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { columnId: column.id }
  });
// Not any rocket science just the documentation only
  const addCard = () => {
    const title = prompt("Card title");
    if (!title) return;

    setColumns((prev) =>
      prev.map((c) =>
        c.id === column.id
          ? {
              ...c,
              cards: [...c.cards, { id: Date.now().toString(), title }]
            }
          : c
      )
    );
  };

  return (
    <div className="column">
      <div className={`column-header ${column.id}`}>
        <span>{column.title}</span>
        <button className="btn btn-primary" onClick={addCard} style={{borderRadius: "20px"}}><Plus style={{marginTop: "5px"}}/></button>
      </div>

      <div ref={setNodeRef} className="column-body">
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            columnId={column.id}
            setColumns={setColumns}
          />
        ))}
      </div>
    </div>
  );
}
