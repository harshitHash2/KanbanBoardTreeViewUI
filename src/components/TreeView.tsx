import React, { useState } from "react";
import TreeNode from "./TreeNode";
import type { TreeNodeModel } from "../types/Node";
import "../styles/tree.css";
const initialData: TreeNodeModel[] = [
  {
    id: "A",
    name: "Level A",
    hasChildren: true
  }
];

const TreeView: React.FC = () => {
  const [tree, setTree] = useState<TreeNodeModel[]>(initialData);
// Just the hints from AI and my previous experience with React, nothing fancy
  const updateNode = (updated: TreeNodeModel) => {
    const updateRecursive = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
      nodes.map((n) =>
        n.id === updated.id
          ? updated
          : {
              ...n,
              children: n.children
                ? updateRecursive(n.children)
                : n.children
            }
      );

    setTree(updateRecursive(tree));
  };
// Just the hints from AI and my previous experience with React, nothing fancy
  const deleteNode = (id: string) => {
    const deleteRecursive = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
      nodes
        .filter((n) => n.id !== id)
        .map((n) => ({
          ...n,
          children: n.children ? deleteRecursive(n.children) : undefined
        }));

    setTree(deleteRecursive(tree));
  };

  return (
    <div>
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onUpdate={updateNode}
          onDelete={deleteNode}
        />
      ))}
    </div>
  );
};

export default TreeView;
