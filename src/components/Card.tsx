import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import type { CardModel, ColumnModel } from "../types/kanban";
import { Trash } from 'lucide-react';
interface Props {
  card: CardModel;
  columnId: string;
  setColumns: React.Dispatch<React.SetStateAction<ColumnModel[]>>;
}

export default function Card({ card, columnId, setColumns }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
    data: { columnId }
  });

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(card.title);

  const style = {
    transform: CSS.Transform.toString(transform)
  };
// Not any rocket science just the documentation only
  const deleteCard = () => {
    setColumns((prev) =>
      prev.map((c) =>
        c.id === columnId
          ? { ...c, cards: c.cards.filter((x) => x.id !== card.id) }
          : c
      )
    );
  };
// Not any rocket science just the documentation only
  const save = () => {
    setColumns((prev) =>
      prev.map((c) =>
        c.id === columnId
          ? {
              ...c,
              cards: c.cards.map((x) =>
                x.id === card.id ? { ...x, title: text } : x
              )
            }
          : c
      )
    );
    setEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="card" {...attributes} {...listeners}>
      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setEditing(true)}>{card.title}</span>
      )}
      <button className="btn btn-secondary" onClick={deleteCard}><Trash /></button>
    </div>
  );
}
