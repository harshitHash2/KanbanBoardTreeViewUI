import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Column";
import type { ColumnModel } from "../types/kanban";
import "../styles/kanban.css";

const initialData: ColumnModel[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [
      { id: "t1", title: "Create initial project plan" },
      { id: "t2", title: "Design landing page" }
    ]
  },
  {
    id: "progress",
    title: "In Progress",
    cards: [
      { id: "p1", title: "Implement authentication" }
    ]
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "d1", title: "Write API documentation" }
    ]
  }
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnModel[]>(initialData);

  // Not any rocket science just the documentation only
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const [fromCol, toCol] = [
      active.data.current?.columnId,
      over.data.current?.columnId
    ];

    if (!fromCol || !toCol) return;

    if (fromCol === toCol && active.id === over.id) return;

    setColumns((prev) => {
      const source = prev.find((c) => c.id === fromCol)!;
      const destination = prev.find((c) => c.id === toCol)!;

      const card = source.cards.find((c) => c.id === active.id)!;

      return prev.map((col) => {
        if (col.id === fromCol) {
          return { ...col, cards: col.cards.filter(c => c.id !== card.id) };
        }
        if (col.id === toCol) {
          return { ...col, cards: [...col.cards, card] };
        }
        return col;
      });
    });
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            setColumns={setColumns}
          />
        ))}
      </div>
    </DndContext>
  );
}
