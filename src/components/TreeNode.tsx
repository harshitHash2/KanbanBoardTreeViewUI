import React, { useState } from "react";
import type { TreeNodeModel } from "../types/Node";
import { fetchChildNodes } from "../utils/mockApi";

interface Props {
  node: TreeNodeModel;
  onUpdate: (node: TreeNodeModel) => void;
  onDelete: (id: string) => void;
}

const TreeNode: React.FC<Props> = ({ node, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(node.name);
  const [loading, setLoading] = useState(false);
// Just the hints from AI and my previous experience with React, nothing fancy
  const toggleExpand = async () => {
    if (!node.isExpanded && node.hasChildren && !node.children) {
      setLoading(true);
      const children = await fetchChildNodes(node.id);
      onUpdate({ ...node, children, isExpanded: true });
      setLoading(false);
    } else {
      onUpdate({ ...node, isExpanded: !node.isExpanded });
    }
  };
// Just the hints from AI and my previous experience with React, nothing fancy
  const addChild = () => {
    const childName = prompt("Enter node name");
    if (!childName) return;

    const newChild: TreeNodeModel = {
      id: Date.now().toString(),
      name: childName
    };

    onUpdate({
      ...node,
      isExpanded: true,
      children: [...(node.children || []), newChild]
    });
  };

  const saveEdit = () => {
    onUpdate({ ...node, name });
    setEditing(false);
  };

  return (
  <div className={`tree-node ${!node.id.includes("-") ? "tree-node-root" : ""}`}>
    <div className="node-row">
      {node.hasChildren && (
        <button className="expand-btn" onClick={toggleExpand}>
          {node.isExpanded ? "−" : "+"}
        </button>
      )}

      <div className="node-pill">
        <div className={`node-circle level-${node.name.slice(-1).toLowerCase()}`}>
          {node.name.slice(-1)}
        </div>

        {editing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={saveEdit}
            autoFocus
          />
        ) : (
          <span onDoubleClick={() => setEditing(true)}>
            {node.name}
          </span>
        )}

        <div className="node-actions">
          <button style={{margin: "2px"}} onClick={addChild}>+</button>
          <button style={{margin: "2px"}}
            onClick={() => {
              if (window.confirm("Delete this node?")) {
                onDelete(node.id);
              }
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    {loading && <div className="loading">Loading...</div>}

    {node.isExpanded &&
      node.children?.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          onUpdate={(updated) => {
            const updatedChildren = node.children!.map((c) =>
              c.id === updated.id ? updated : c
            );
            onUpdate({ ...node, children: updatedChildren });
          }}
          onDelete={(id) => {
            onUpdate({
              ...node,
              children: node.children!.filter((c) => c.id !== id)
            });
          }}
        />
      ))}
  </div>
);

};

export default TreeNode;
